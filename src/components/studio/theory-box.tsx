import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BANKS, armedCurve } from "@/lib/studio/banks";
import { BUS_DROPS, BUS_OBJECTS, BUS_WAVE } from "@/lib/studio/bus";
import { exportBusDocx, exportBusPdf, exportBusPptx } from "@/lib/studio/bus-export";
import { nightChain, runChain } from "@/lib/studio/chain";
import { t } from "@/lib/studio/copy";
import { lookupHost } from "@/lib/studio/geo";
import { lockRhyme } from "@/lib/studio/rhyme";
import { useStudio } from "@/lib/studio/store";
import { buildSpine } from "@/lib/studio/theory";
import { cn } from "@/lib/utils";

export function StudioTheory() {
  const lang = useStudio((s) => s.lang);
  const genre = useStudio((s) => s.genre);
  const bpm = useStudio((s) => s.bpm);
  const recs = useStudio((s) => s.recs);
  const dirtBias = useStudio((s) => s.dirtBias);
  const theoryPaste = useStudio((s) => s.theoryPaste);
  const rhymeSeed = useStudio((s) => s.rhymeSeed);
  const rhymeOut = useStudio((s) => s.rhymeOut);
  const lyrics = useStudio((s) => s.lyrics);
  const vocalLang = useStudio((s) => s.vocalLang);
  const nightLane = useStudio((s) => s.nightLane);
  const processing = useStudio((s) => s.processing);
  const geoBusy = useStudio((s) => s.geoBusy);
  const geoLine = useStudio((s) => s.geoLine);
  const chainLog = useStudio((s) => s.chainLog);
  const armed = useStudio((s) => s.armed);
  const voiceCap = useStudio((s) => s.voiceCap);
  const patch = useStudio((s) => s.patch);
  const curve = armedCurve(recs);
  const loadedId = Object.values(recs).find((r) => r.loaded && r.bankId)?.bankId ?? null;
  const bank = loadedId ? BANKS.find((b) => b.id === loadedId) ?? null : null;
  const spine = buildSpine({ genre, bpm, bank, curve, paste: theoryPaste, dirtBias, nightLane });

  async function rhyme(want: "hook" | "verse" | "fix") {
    const seed = (rhymeSeed || lyrics).trim();
    if (!seed) {
      toast.error(t(lang, "lockSeed"));
      return;
    }
    patch({ processing: true, rhymeSeed: seed });
    try {
      const res = await lockRhyme({ data: { seed, bpm, lang: vocalLang, want } });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      patch({ rhymeOut: res.text, lyrics: want === "fix" ? seed : lyrics });
      if (want !== "fix") patch({ lyrics: res.text });
    } finally {
      patch({ processing: false });
    }
  }

  async function geo() {
    if (useStudio.getState().geoBusy) return;
    patch({ geoBusy: true });
    try {
      const res = await lookupHost({ data: {} });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      patch({ geoLine: `${res.line} · ${res.isp}` });
    } catch {
      toast.error(t(lang, "decodeFail"));
    } finally {
      patch({ geoBusy: false });
    }
  }

  function chain() {
    const log = runChain(nightChain(), {
      seed: (rhymeSeed || lyrics).trim(),
      rapped: Boolean(voiceCap.rapped),
      armed,
      geoOk: true,
    });
    patch({ chainLog: log });
  }

  function lockDrop(id: (typeof BUS_DROPS)[number]["id"]) {
    const drop = BUS_DROPS.find((d) => d.id === id);
    if (!drop) return;
    patch({ theoryPaste: drop.brief, rhymeSeed: drop.seed });
    toast.success(drop.seed.trim() ? t(lang, "lockSeed") : t(lang, "tagsOnly"));
  }

  async function busFile(kind: "pdf" | "docx" | "pptx") {
    try {
      if (kind === "pdf") await exportBusPdf();
      else if (kind === "docx") await exportBusDocx();
      else await exportBusPptx();
    } catch {
      toast.error(t(lang, "decodeFail"));
    }
  }

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">{t(lang, "theoryKicker")}</p>
        <h1 className="font-display text-3xl text-ink">{t(lang, "theoryTitle")}</h1>
        <p className="max-w-2xl text-pretty text-muted">{t(lang, "theoryLead")}</p>
      </header>

      <div className="rounded-[var(--radius-lg)] bg-raised p-4 ring-1 ring-rule">
        <div className="flex min-h-11 items-center justify-between gap-3">
          <span className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "nightLane")}</span>
          <button
            type="button"
            role="switch"
            aria-checked={nightLane}
            aria-label={t(lang, "nightLane")}
            onClick={() => patch({ nightLane: !nightLane, vocalKind: !nightLane ? "whisper" : useStudio.getState().vocalKind })}
            className={cn("h-7 w-12 rounded-full ring-1 ring-rule", nightLane ? "bg-live" : "bg-paper")}
          >
            <span className={cn("block size-6 rounded-full bg-ink", nightLane ? "translate-x-5" : "translate-x-0.5")} />
          </button>
        </div>
        <p className="mt-3 text-sm text-muted">{t(lang, "nightLead")}</p>
        {nightLane ? (
          <p className="mt-2 font-mono text-2xs tracking-wider text-live uppercase">
            TAKT-LOCK · ENERGY-MATCH · STEREO-MX
          </p>
        ) : null}
      </div>

      <label className="block">
        <span className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "pasteTrack")}</span>
        <textarea
          rows={3}
          value={theoryPaste}
          onChange={(e) => patch({ theoryPaste: e.target.value })}
          className="mt-2 w-full min-w-0 resize-y rounded-[var(--radius-sm)] bg-raised px-3 py-2 text-sm text-ink ring-1 ring-rule"
        />
      </label>
      <label className="block">
        <span className="flex justify-between font-mono text-2xs tracking-wider text-muted uppercase">
          <span>{t(lang, "dirtClear")}</span>
          <span className="tabular-nums text-ink">{dirtBias.toFixed(2)}</span>
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={dirtBias}
          onChange={(e) => patch({ dirtBias: Number(e.target.value) })}
          className="steel-range mt-2"
        />
      </label>

      <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
        <Item k="pulse" v={spine.pulse} />
        <Item k="takt" v={spine.takt} />
        <Item k="pitch" v={spine.pitchHouse} />
        <Item k="dirt" v={spine.dirt.toFixed(2)} />
        <Item k="clear" v={spine.clear.toFixed(2)} />
        <Item k="chroma" v={spine.chroma} />
      </dl>

      <section>
        <p className="mb-2 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "extras")}</p>
        <ul className="divide-y divide-rule rounded-[var(--radius-md)] bg-raised ring-1 ring-rule">
          {spine.extras.map((ex) => (
            <li key={ex.id} className="flex min-w-0 items-baseline justify-between gap-3 px-3 py-2">
              <div className="min-w-0">
                <p className={cn("font-mono text-2xs tracking-wider uppercase", ex.on ? "text-live" : "text-faint")}>
                  {ex.id}
                </p>
                <p className="text-sm text-muted">{ex.action}</p>
                <p className="truncate font-mono text-2xs text-faint">{ex.why}</p>
              </div>
              <span className="shrink-0 font-mono text-sm tabular-nums">{ex.intensity}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 font-mono text-2xs text-muted">
          {spine.hearFirst.join(" · ")}
        </p>
      </section>

      <section className="rounded-[var(--radius-md)] bg-raised p-4 ring-1 ring-rule">
        <p className="font-mono text-2xs tracking-wider text-muted uppercase">
          {t(lang, "bus")} · WAVE {BUS_WAVE} · {BUS_OBJECTS.length}/17
        </p>
        <p className="mt-2 text-sm text-muted">{t(lang, "busLead")}</p>
        <ul className="mt-3 flex flex-col gap-3">
          {BUS_DROPS.map((drop) => (
            <li key={drop.id} className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="min-w-0 text-sm text-ink">
                <span className="font-mono text-2xs tracking-wider text-muted uppercase">{drop.id}</span>
                <span className="mt-1 block text-pretty">{drop.brief}</span>
              </p>
              <Button type="button" variant="secondary" className="shrink-0" onClick={() => lockDrop(drop.id)}>
                {t(lang, "busLock")}
              </Button>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" variant="ghost" onClick={() => void busFile("pdf")}>
            {t(lang, "busPdf")}
          </Button>
          <Button type="button" variant="ghost" onClick={() => void busFile("docx")}>
            {t(lang, "busDoc")}
          </Button>
          <Button type="button" variant="ghost" onClick={() => void busFile("pptx")}>
            {t(lang, "busPpt")}
          </Button>
        </div>
      </section>

      <label className="block">
        <span className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "lockSeed")}</span>
        <textarea
          rows={5}
          value={rhymeSeed}
          onChange={(e) => patch({ rhymeSeed: e.target.value })}
          className="mt-2 w-full min-w-0 resize-y rounded-[var(--radius-sm)] bg-raised px-3 py-2 text-sm text-ink ring-1 ring-rule"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" disabled={processing} onClick={() => void rhyme("fix")}>
          {t(lang, "fixBars")}
        </Button>
        <Button type="button" variant="secondary" disabled={processing} onClick={() => void rhyme("hook")}>
          {t(lang, "writeHook")}
        </Button>
        <Button type="button" variant="live" disabled={processing} onClick={() => void rhyme("verse")}>
          {t(lang, "writeVerse")}
        </Button>
        <Button type="button" variant="ghost" disabled={geoBusy} onClick={() => void geo()}>
          {t(lang, "hostLookup")}
        </Button>
        <Button type="button" variant="secondary" onClick={chain}>
          {t(lang, "chainRun")}
        </Button>
      </div>
      {geoLine ? <p className="font-mono text-2xs text-muted">{geoLine}</p> : null}
      {chainLog.length ? (
        <section className="rounded-[var(--radius-md)] bg-raised p-4 ring-1 ring-rule">
          <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "chain")}</p>
          <p className="mt-1 text-sm text-muted">{t(lang, "chainLead")}</p>
          <ol className="mt-3 flex flex-col gap-2">
            {chainLog.map((row) => (
              <li key={`${row.i}-${row.op}`} className="flex min-w-0 items-baseline justify-between gap-3">
                <span className="font-mono text-2xs tracking-wider text-ink uppercase">
                  {row.i} {row.kind} {row.op}
                </span>
                <span className={cn("shrink-0 font-mono text-2xs tabular-nums", row.fired ? "text-live" : "text-faint")}>
                  {row.fired ? `fire · ${row.success}` : "skip"}
                  {row.forwarded ? " →" : ""}
                </span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
      {rhymeOut ? (
        <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-[var(--radius-md)] bg-raised p-3 text-sm text-ink ring-1 ring-rule">
          {rhymeOut}
        </pre>
      ) : null}
    </div>
  );
}

function Item({ k, v }: { k: string; v: string }) {
  return (
    <div className="min-w-0">
      <dt className="font-mono text-2xs tracking-wider text-muted uppercase">{k}</dt>
      <dd className="mt-1 truncate">{v}</dd>
    </div>
  );
}
