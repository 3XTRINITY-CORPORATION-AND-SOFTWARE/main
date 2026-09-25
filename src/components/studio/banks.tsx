import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  BANKS,
  BANK_BY_ID,
  PLUGIN_IDS,
  PLUGIN_META,
  REC_IDS,
  armedCurve,
  type RecId,
} from "@/lib/studio/banks";
import { t } from "@/lib/studio/copy";
import { applyProcessedVocal, pushAll } from "@/lib/studio/engine";
import { saveVault } from "@/lib/studio/connectors";
import { downloadFilmPack } from "@/lib/studio/film-pack";
import { useStudio } from "@/lib/studio/store";
import { processCurrent } from "@/lib/studio/vocal";
import { cn } from "@/lib/utils";
import { Fader } from "./fader";

export function StudioBanks() {
  const lang = useStudio((s) => s.lang);
  const recs = useStudio((s) => s.recs);
  const activeRec = useStudio((s) => s.activeRec);
  const setRec = useStudio((s) => s.setRec);
  const setChannel = useStudio((s) => s.setChannel);
  const patch = useStudio((s) => s.patch);
  const processing = useStudio((s) => s.processing);
  const tuneAmount = useStudio((s) => s.tuneAmount);
  const lane = recs[activeRec];
  const bank = lane.bankId ? BANK_BY_ID[lane.bankId] : null;
  const curve = armedCurve(recs);

  function pick(id: RecId) {
    REC_IDS.forEach((rid) => setRec(rid, { armed: rid === id }));
    patch({ activeRec: id });
    pushAll();
  }

  function openBank(bankId: string) {
    const b = BANK_BY_ID[bankId];
    if (!b) return;
    setRec(activeRec, { bankId, loaded: true, armed: true });
    REC_IDS.forEach((rid) => {
      if (rid !== activeRec) setRec(rid, { armed: false });
    });
    setChannel("vocal", { gain: lane.gain });
    patch({
      tuneAmount: b.curve.amount,
      width: b.curve.width,
      drive: Math.min(0.9, 0.25 + b.curve.sat * 0.5),
      genre: b.curve.genre,
    });
    saveVault({
      banks: Object.values(useStudio.getState().recs)
        .map((r) => r.bankId)
        .filter(Boolean) as string[],
    });
    pushAll();
    toast.success(`${b.name} · 5`);
  }

  async function melt(kind: "tune" | "mirror") {
    patch({ processing: true });
    try {
      const buf = await processCurrent(kind);
      if (!buf) {
        toast.error(t(lang, "emptyVocal"));
        return;
      }
      await applyProcessedVocal(buf, `${kind}-${activeRec}`);
      toast.success(t(lang, kind === "tune" ? "tune" : "analogMirror"));
    } catch {
      toast.error(t(lang, "decodeFail"));
    } finally {
      patch({ processing: false });
    }
  }

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">{t(lang, "banksKicker")}</p>
        <h1 className="font-display text-3xl text-ink">{t(lang, "banksTitle")}</h1>
        <p className="max-w-2xl text-pretty text-muted">{t(lang, "banksLead")}</p>
      </header>

      <div className="nav-scroll">
        <div className="flex w-max gap-2">
          {REC_IDS.map((id, i) => (
            <button
              key={id}
              type="button"
              onClick={() => pick(id)}
              className={cn(
                "min-h-11 shrink-0 rounded-[var(--radius-sm)] px-3 text-sm ring-1 ring-rule",
                activeRec === id ? "bg-ink text-paper" : "text-muted",
              )}
            >
              {t(lang, "recLane")} {i + 1}
            </button>
          ))}
        </div>
      </div>

      <p className="font-mono text-2xs text-muted">
        {lane.loaded && bank ? `${bank.name} · ${t(lang, "loaded")}` : t(lang, "sealed")}
      </p>

      <div className="grid min-w-0 gap-2 sm:grid-cols-2">
        {BANKS.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => openBank(b.id)}
            className={cn(
              "min-h-11 rounded-[var(--radius-md)] px-3 py-3 text-left ring-1 ring-rule",
              lane.bankId === b.id && lane.loaded ? "bg-ink text-paper" : "bg-raised text-ink",
            )}
          >
            <p className="font-display tracking-wide">{b.name}</p>
            <p className={cn("mt-1 text-sm", lane.bankId === b.id && lane.loaded ? "text-paper/70" : "text-muted")}>
              {lang === "et" ? b.noteEt : b.noteEn}
            </p>
          </button>
        ))}
      </div>

      {lane.loaded && curve ? (
        <section className="rounded-[var(--radius-lg)] bg-raised p-4 ring-1 ring-rule">
          <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "plugins")}</p>
          <ul className="mt-3 divide-y divide-rule">
            {PLUGIN_IDS.map((id) => (
              <li key={id} className="flex items-baseline justify-between gap-3 py-2">
                <span>{lang === "et" ? PLUGIN_META[id].et : PLUGIN_META[id].en}</span>
                <span className="font-mono text-2xs text-live uppercase">{t(lang, "loaded")}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Fader
              label={t(lang, "tune")}
              value={tuneAmount}
              min={0}
              max={1}
              onChange={(v) => {
                patch({ tuneAmount: v });
                setRec(activeRec, { edit: { ...lane.edit, amount: v } });
                pushAll();
              }}
            />
            <Fader
              label="Formant"
              value={curve.formant}
              min={0.7}
              max={1.3}
              onChange={(v) => {
                setRec(activeRec, { edit: { ...lane.edit, formant: v } });
                pushAll();
              }}
            />
            <Fader
              label={t(lang, "melt")}
              value={lane.gain}
              min={0}
              max={1}
              onChange={(v) => {
                setRec(activeRec, { gain: v });
                setChannel("vocal", { gain: v });
                pushAll();
              }}
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" variant="live" disabled={processing} onClick={() => void melt("tune")}>
              {t(lang, "tune")}
            </Button>
            <Button type="button" variant="secondary" disabled={processing} onClick={() => void melt("mirror")}>
              {t(lang, "analogMirror")}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => void import("@/lib/studio/xlsx-banks").then((m) => m.exportBankBook())}
            >
              {t(lang, "downloadXlsx")}
            </Button>
            <Button type="button" variant="ghost" onClick={() => downloadFilmPack()}>
              {t(lang, "downloadPack")}
            </Button>
          </div>
        </section>
      ) : (
        <p className="text-sm text-muted">{t(lang, "sealed")}</p>
      )}
    </div>
  );
}
