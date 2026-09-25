import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { detectLyrics, visualParams } from "@/lib/studio/ai";
import { t } from "@/lib/studio/copy";
import { getAnalyser } from "@/lib/studio/engine";
import { useStudio } from "@/lib/studio/store";
import { drawVisualizer, readTokens } from "@/lib/studio/vis";
import type { VisualStyle } from "@/lib/studio/types";
import { cn } from "@/lib/utils";

const STYLES: VisualStyle[] = ["auto", "rings", "tunnel", "scope", "bars", "film", "lips"];

export function StudioVisuals() {
  const lang = useStudio((s) => s.lang);
  const style = useStudio((s) => s.visualStyle);
  const prompt = useStudio((s) => s.visualPrompt);
  const lyrics = useStudio((s) => s.lyrics);
  const stillUrl = useStudio((s) => s.stillUrl);
  const processing = useStudio((s) => s.processing);
  const patch = useStudio((s) => s.patch);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stillRef = useRef<HTMLImageElement | null>(null);
  const recRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (!stillUrl) {
      stillRef.current = null;
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = stillUrl;
    stillRef.current = img;
  }, [stillUrl]);

  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    let last = 0;
    const loop = (now: number) => {
      const fps = useStudio.getState().visFps || 60;
      const minDt = 1000 / Math.max(12, fps);
      if (now - last >= minDt) {
        last = now;
        const canvas = canvasRef.current;
        if (canvas) {
          const tap = getAnalyser();
          if (tap) {
            tap.analyser.getByteFrequencyData(tap.freq);
            tap.analyser.getByteTimeDomainData(tap.wave);
          }
          const tokens = readTokens(document.documentElement);
          const empty = new Uint8Array(512);
          const s = useStudio.getState();
          drawVisualizer({
            canvas,
            freq: tap?.freq ?? empty,
            wave: tap?.wave ?? empty,
            tokens,
            style: s.visualStyle,
            genre: s.genre,
            peak: s.peak,
            rms: s.rms,
            bpm: s.bpm,
            step: s.step,
            playing: s.playing,
            lyrics: s.lyrics,
            still: stillRef.current,
            t: (performance.now() - t0) / 1000,
          });
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  async function onStill() {
    const p = prompt.trim();
    if (!p) return;
    patch({ processing: true });
    try {
      const res = await visualParams({ data: { prompt: p } });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      patch({ stillUrl: res.url });
    } finally {
      patch({ processing: false });
    }
  }

  async function onLyrics() {
    patch({ processing: true });
    try {
      const res = await detectLyrics({ data: { genre: useStudio.getState().genre, hint: prompt, lang } });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      patch({ lyrics: res.text });
    } finally {
      patch({ processing: false });
    }
  }

  function onRecord() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (recRef.current) {
      recRef.current.stop();
      recRef.current = null;
      return;
    }
    try {
      const stream = canvas.captureStream(30);
      const rec = new MediaRecorder(stream, { mimeType: "video/webm" });
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => {
        if (e.data.size) chunks.push(e.data);
      };
      rec.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "steel-visual.webm";
        a.click();
      };
      rec.start();
      recRef.current = rec;
      toast.message(t(lang, "recordVis"));
    } catch {
      toast.error(t(lang, "decodeFail"));
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-2">
        <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">STEEL · {t(lang, "visuals")}</p>
        <h1 className="font-display text-3xl text-ink">Locked to the grid.</h1>
      </header>
      <canvas
        ref={canvasRef}
        className="aspect-video w-full rounded-[var(--radius-lg)] bg-paper ring-1 ring-rule"
        aria-label="Visualizer"
      />
      <div className="flex flex-wrap gap-2">
        {STYLES.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => patch({ visualStyle: id })}
            className={cn(
              "min-h-11 rounded-[var(--radius-sm)] px-3 text-sm ring-1 ring-rule",
              style === id ? "bg-ink text-paper" : "text-muted",
            )}
          >
            {id === "film" ? t(lang, "filmStyle") : t(lang, id)}
          </button>
        ))}
      </div>
      <label className="flex flex-col gap-2">
        <span className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "prompt")}</span>
        <textarea
          value={prompt}
          maxLength={500}
          rows={3}
          onChange={(e) => patch({ visualPrompt: e.target.value })}
          className="rounded-[var(--radius-md)] border border-rule bg-raised p-3 text-sm text-ink"
        />
        <span className="text-xs text-muted">{t(lang, "promptHint")}</span>
      </label>
      <div className="flex flex-wrap gap-2">
        <Button type="button" disabled={processing} onClick={() => void onStill()}>
          {t(lang, "still")}
        </Button>
        <Button type="button" variant="secondary" disabled={processing} onClick={() => void onLyrics()}>
          {t(lang, "detectLyrics")}
        </Button>
        <Button type="button" variant="secondary" onClick={onRecord}>
          {t(lang, "recordVis")}
        </Button>
      </div>
      {lyrics ? (
        <p className="text-sm text-ink">{lyrics}</p>
      ) : null}
    </div>
  );
}
