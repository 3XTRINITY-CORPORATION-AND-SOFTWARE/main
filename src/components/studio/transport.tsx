import { Circle, Square, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bounceWav, pushAll, togglePlay, toggleVoiceRec } from "@/lib/studio/engine";
import { t } from "@/lib/studio/copy";
import { downloadFilmPack } from "@/lib/studio/film-pack";
import { useStudio } from "@/lib/studio/store";
import { downloadBlob } from "@/lib/utils";
import { toast } from "sonner";
import { LevelMeter } from "./meter";

export function Transport() {
  const lang = useStudio((s) => s.lang);
  const playing = useStudio((s) => s.playing);
  const armed = useStudio((s) => s.armed);
  const recording = useStudio((s) => s.recording);
  const bpm = useStudio((s) => s.bpm);
  const peak = useStudio((s) => s.peak);
  const rms = useStudio((s) => s.rms);
  const processing = useStudio((s) => s.processing);
  const patch = useStudio((s) => s.patch);

  async function onBounce() {
    try {
      const blob = await bounceWav(8);
      if (blob) downloadBlob(blob, "steel-studio.wav");
    } catch {
      toast.error(t(lang, "decodeFail"));
    }
  }

  return (
    <div className="steel-transport shell-pad sticky bottom-0 z-30 border-t border-rule bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-2 py-2 sm:gap-3">
        <Button
          type="button"
          variant={playing ? "live" : "primary"}
          size="icon"
          className="shrink-0"
          aria-label={playing ? t(lang, "stop") : t(lang, "play")}
          onClick={() => {
            void togglePlay().catch((err: unknown) => {
              toast.error(err instanceof Error ? err.message : t(lang, "needArm"));
            });
          }}
        >
          {playing ? (
            <Square className="size-4 fill-current" />
          ) : (
            <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
              <path d="M8 5.5v13l11-6.5L8 5.5z" />
            </svg>
          )}
        </Button>
        <Button
          type="button"
          variant={recording ? "stamp" : "secondary"}
          size="icon"
          className="shrink-0"
          aria-label={t(lang, "recVoice")}
          onClick={() => {
            void toggleVoiceRec().then((state) => {
              if (state === "start") toast.message(t(lang, "recStart"));
              if (state === "stop") toast.message(t(lang, "recDone"));
            });
          }}
        >
          <Circle className="size-3.5 fill-current" />
        </Button>
        <label className="hidden min-w-0 items-center gap-2 sm:flex">
          <span className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "bpm")}</span>
          <input
            type="number"
            min={70}
            max={180}
            value={bpm}
            onChange={(e) => {
              patch({ bpm: Math.min(180, Math.max(70, Number(e.target.value) || 70)) });
              pushAll();
            }}
            className="h-11 w-16 rounded-[var(--radius-sm)] border border-rule bg-raised px-2 font-mono text-sm tabular-nums text-ink"
          />
        </label>
        <div className="min-w-0 flex-1">
          <LevelMeter peak={peak} rms={rms} />
          <p className="mt-1 hidden font-mono text-2xs tracking-wider text-muted uppercase sm:block">
            {armed ? t(lang, "armed") : t(lang, "arm")}
            {processing ? ` · ${t(lang, "processing")}` : ""}
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="shrink-0"
          aria-label={t(lang, "downloadPack")}
          onClick={() => downloadFilmPack()}
        >
          <Download className="size-4" strokeWidth={1.75} />
        </Button>
        <Button type="button" variant="secondary" size="sm" className="hidden sm:inline-flex" onClick={() => void onBounce()}>
          {t(lang, "bounce")}
        </Button>
      </div>
    </div>
  );
}
