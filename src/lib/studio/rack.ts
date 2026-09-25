import { applyGenre, playMix, pushParams, setEqGains } from "@/lib/desk/engine";
import { clampEq, emptyEq, nearestBand, type EqGains } from "@/lib/desk/eq";
import { useDesk } from "@/lib/desk/store";
import type { GenreId } from "@/lib/desk/fx";
import { playNote, pushParams as pushKernel } from "@/lib/steel/engine";
import { useSteel } from "@/lib/steel/store";
import { BANKS, type BankCurve } from "./banks";
import { nightChain, runChain, type ChainCtx, type ChainStep } from "./chain";
import { lookupHost } from "./geo";
import { lockRhyme } from "./rhyme";
import { useRack } from "./store";
import { buildSpine, type ExtraRow } from "./theory";
import type { Genre } from "./types";

function deskGenre(g: Genre): GenreId {
  if (g === "rawstyle") return "rawstyle";
  if (g === "techno") return "hardtechno";
  if (g === "hardstyle") return "hardstyle";
  return "commercial";
}

function studioGenre(g: GenreId): Genre {
  if (g === "rawstyle") return "rawstyle";
  if (g === "hardtechno") return "techno";
  if (g === "hardstyle") return "hardstyle";
  return "rap";
}

function curveToEq(curve: BankCurve): EqGains {
  const g = emptyEq();
  const scoop = nearestBand(curve.scoopHz);
  const presence = nearestBand(curve.presenceHz);
  const air = nearestBand(curve.airHz);
  g[scoop] = clampEq(curve.scoopDb);
  g[presence] = clampEq(curve.presenceDb);
  g[air] = clampEq(curve.airDb);
  if (g[2] === 0) g[2] = clampEq(curve.scoopDb * 0.35);
  return g;
}

function applyExtras(extras: ExtraRow[]) {
  const desk = useDesk.getState();
  const grab = (id: string) => extras.find((e) => e.id === id);
  const gem = grab("MI44OR-5GEM");
  const dirt = grab("DIRT-COL");
  const energy = grab("ENERGY-MATCH");
  const stereo = grab("STEREO-MX");
  const takt = grab("TAKT-LOCK");
  desk.set({
    kare: Math.min(1, Math.max(0.15, (gem?.intensity ?? 7) / 10)),
    drive: Math.min(1, (dirt?.on ? dirt.intensity : 2) / 12),
    glue: Math.min(1, (energy?.intensity ?? 5) / 10),
    width: Math.min(1, (stereo?.intensity ?? 5) / 10),
    autoTakt: Boolean(takt?.on),
    applyMix: true,
  });
  pushParams();
}

async function runOp(op: string, ctx: ChainCtx): Promise<{ ok: boolean; note: string }> {
  const rack = useRack.getState();
  const desk = useDesk.getState();

  if (op === "THEORY_EMIT") {
    const genre = studioGenre(desk.genre);
    const bank = BANKS.find((b) => b.curve.genre === genre) ?? BANKS[0];
    const spine = buildSpine({
      genre,
      bpm: desk.bpm,
      bank,
      curve: bank.curve,
      paste: rack.paste || desk.palve,
      dirtBias: 0.45,
      nightLane: true,
    });
    useRack.getState().set({ spine, extras: spine.extras });
    applyExtras(spine.extras);
    await applyGenre(deskGenre(genre));
    return { ok: true, note: `extras ${spine.extras.length}` };
  }

  if (op === "RHYME_LOCK") {
    const seed = (ctx.seed || rack.seed || desk.lyrics || desk.palve).trim();
    if (!seed) {
      useRack.getState().set({ rhymeOut: "", note: "tags — empty seed" });
      return { ok: false, note: "tags — empty seed" };
    }
    const lang = desk.lyrics.match(/[а-яё]/i) ? "ru" : desk.lyrics.match(/[õäöüšž]/i) ? "et" : "en";
    const res = await lockRhyme({ data: { seed, bpm: desk.bpm, lang, want: "fix" } });
    if (!res.ok) {
      useDesk.getState().set({ lyrics: seed });
      useRack.getState().set({ rhymeOut: seed, seed });
      return { ok: true, note: `verbatim · ${res.error}` };
    }
    useDesk.getState().set({ lyrics: res.text.slice(0, 2000) });
    useRack.getState().set({ rhymeOut: res.text, seed });
    return { ok: true, note: "seed locked verbatim" };
  }

  if (op === "GEO_LOOKUP") {
    useRack.getState().set({ geoBusy: true });
    try {
      const res = await lookupHost({ data: { query: rack.geoQuery || undefined } });
      if (res.ok) {
        useRack.getState().set({ geoLine: `${res.line} · ${res.isp}`, geoBusy: false });
        return { ok: true, note: "geoBusy only" };
      }
      useRack.getState().set({ geoLine: res.error, geoBusy: false });
      return { ok: false, note: `geo fail — processing untouched` };
    } catch {
      useRack.getState().set({ geoBusy: false, geoLine: "timeout" });
      return { ok: false, note: "geo fail — processing untouched" };
    }
  }

  if (op === "EQ_WRITE") {
    const genre = studioGenre(desk.genre);
    const bank = BANKS.find((b) => b.curve.genre === genre) ?? BANKS[0];
    const gains = curveToEq(bank.curve);
    useDesk.getState().set({ eq: gains });
    setEqGains(gains);
    return { ok: true, note: `keep rate · ${bank.name}` };
  }

  if (op === "MOTOR") {
    const steel = useSteel.getState();
    if (steel.armed) {
      pushKernel();
      void playNote(true, 36, 0.55);
      window.setTimeout(() => void playNote(false, 36), 120);
    }
    try {
      if (!useDesk.getState().playing) await playMix();
      return { ok: true, note: steel.armed ? "OS motor + web mix" : "web mix — OS not armed" };
    } catch {
      return { ok: true, note: steel.armed ? "OS motor · mix slots empty" : "motor ready — load mix slots" };
    }
  }

  return { ok: true, note: "ok" };
}

/** Night default, then execute each fired op. Skip still forwards. Geo never jams processing. */
export async function fireNightPacket(): Promise<ChainStep[]> {
  const rack = useRack.getState();
  const desk = useDesk.getState();
  const seed = (rack.seed || desk.lyrics || desk.palve).trim();
  const ctx: ChainCtx = {
    seed,
    rapped: false,
    armed: useSteel.getState().armed,
    geoOk: true,
  };
  const plan = runChain(nightChain(), ctx);
  const out: ChainStep[] = [];
  for (const step of plan) {
    if (!step.fired) {
      out.push(step);
      continue;
    }
    const result = await runOp(step.op, { ...ctx, seed });
    out.push({
      ...step,
      success: result.ok ? 1 : 0,
      note: result.note,
      lockProcessing: step.op === "GEO_LOOKUP" ? false : step.lockProcessing,
    });
  }
  useRack.getState().set({ chainLog: out, busy: false, place: "os" });
  return out;
}

export { curveToEq, deskGenre, studioGenre };
