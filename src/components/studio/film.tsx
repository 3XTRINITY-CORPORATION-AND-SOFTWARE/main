import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/studio/copy";
import { getAnalyser } from "@/lib/studio/engine";
import { downloadFilmPack } from "@/lib/studio/film-pack";
import { useStudio } from "@/lib/studio/store";
import { visemeAt, visemePath } from "@/lib/studio/viseme";
import { downloadBlob } from "@/lib/utils";
import { readTokens } from "@/lib/studio/vis";

const N = 1000;

export function StudioFilm() {
  const lang = useStudio((s) => s.lang);
  const lyrics = useStudio((s) => s.lyrics);
  const bpm = useStudio((s) => s.bpm);
  const peak = useStudio((s) => s.peak);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const recRef = useRef<MediaRecorder | null>(null);
  const [camOn, setCamOn] = useState(false);

  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const bins = new Float32Array(N);
    const loop = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        const tap = getAnalyser();
        if (ctx) {
          const tokens = readTokens(document.documentElement);
          const dpr = Math.min(2, window.devicePixelRatio || 1);
          const w = canvas.clientWidth;
          const h = canvas.clientHeight;
          if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
          }
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.fillStyle = tokens.paper;
          ctx.fillRect(0, 0, w, h);
          const wave = tap?.wave;
          if (wave && wave.length > 1) {
            for (let i = 0; i < N; i++) {
              const x = (i / (N - 1)) * (wave.length - 1);
              const i0 = x | 0;
              const i1 = Math.min(wave.length - 1, i0 + 1);
              bins[i] = (wave[i0] * (1 - (x - i0)) + wave[i1] * (x - i0)) / 128 - 1;
            }
          }
          ctx.beginPath();
          ctx.strokeStyle = tokens.ink;
          ctx.lineWidth = 1.25;
          for (let i = 0; i < N; i++) {
            const x = (i / (N - 1)) * w;
            const y = h * 0.62 + bins[i] * h * 0.18;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          const vid = videoRef.current;
          if (camOn && vid && vid.readyState >= 2) {
            const side = Math.min(w, h) * 0.42;
            ctx.globalAlpha = 0.88;
            ctx.drawImage(vid, (w - side) / 2, h * 0.08, side, side);
            ctx.globalAlpha = 1;
          }
          const vis = visemeAt(lyrics, (performance.now() - t0) / 1000, bpm, peak);
          const mouth = visemePath(vis);
          const cx = w / 2;
          const cy = h * 0.36;
          ctx.strokeStyle = tokens.live;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(cx, cy, mouth.w * 70, mouth.h * 70, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = tokens.muted;
          ctx.font = "11px ui-monospace, Menlo, monospace";
          ctx.fillText(`STEEL FILM · ${N} · ${vis}`, 16, 22);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [bpm, camOn, lyrics, peak]);

  async function onCam() {
    if (camOn) {
      const stream = videoRef.current?.srcObject as MediaStream | null;
      stream?.getTracks().forEach((tr) => tr.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
      setCamOn(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCamOn(true);
    } catch {
      toast.error(t(lang, "decodeFail"));
    }
  }

  function onRecord() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (recRef.current && recRef.current.state === "recording") {
      recRef.current.stop();
      return;
    }
    const stream = canvas.captureStream(30);
    const rec = new MediaRecorder(stream, { mimeType: "video/webm" });
    const chunks: Blob[] = [];
    rec.ondataavailable = (e) => {
      if (e.data.size) chunks.push(e.data);
    };
    rec.onstop = () => {
      downloadBlob(new Blob(chunks, { type: "video/webm" }), "steel-film.webm");
      recRef.current = null;
    };
    rec.start();
    recRef.current = rec;
    toast.message(t(lang, "recordFilm"));
  }

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">{t(lang, "filmKicker")}</p>
        <h1 className="font-display text-3xl text-ink">{t(lang, "filmTitle")}</h1>
        <p className="max-w-2xl text-pretty text-muted">{t(lang, "filmLead")}</p>
      </header>
      <div className="relative min-w-0 overflow-hidden rounded-[var(--radius-lg)] bg-raised ring-1 ring-rule">
        <canvas ref={canvasRef} className="block h-[52vh] w-full min-h-64" />
        <video ref={videoRef} className="pointer-events-none absolute h-0 w-0 opacity-0" playsInline muted />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" onClick={() => void onCam()}>
          {t(lang, "cam")}
        </Button>
        <Button type="button" variant="secondary" onClick={onRecord}>
          {t(lang, "recordFilm")}
        </Button>
        <Button type="button" variant="live" onClick={() => downloadFilmPack()}>
          {t(lang, "downloadPack")}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => void import("@/lib/studio/xlsx-banks").then((m) => m.exportBankBook())}
        >
          {t(lang, "downloadXlsx")}
        </Button>
      </div>
    </div>
  );
}
