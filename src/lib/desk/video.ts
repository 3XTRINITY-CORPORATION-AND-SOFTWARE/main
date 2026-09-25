import { drawFrame } from "@/lib/aura/draw";
import { PALETTES } from "@/lib/aura/palettes";

function pickMime() {
  const cands = ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm", "video/mp4"];
  return cands.find((m) => MediaRecorder.isTypeSupported(m)) ?? "";
}

function clipWords(s: string, n = 70) {
  return s.trim().split(/\s+/).filter(Boolean).slice(0, n).join(" ");
}

async function loadImage(file: File): Promise<HTMLImageElement | HTMLVideoElement> {
  const url = URL.createObjectURL(file);
  if (file.type.startsWith("video/")) {
    const v = document.createElement("video");
    v.muted = true;
    v.playsInline = true;
    v.src = url;
    v.loop = true;
    await v.play().catch(() => undefined);
    await new Promise<void>((res) => {
      if (v.readyState >= 2) res();
      else v.onloadeddata = () => res();
    });
    return v;
  }
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;
  await img.decode();
  return img;
}

function bassEnergy(freq: Uint8Array) {
  let s = 0;
  const n = Math.min(8, freq.length);
  for (let i = 0; i < n; i++) s += freq[i];
  return n ? s / (n * 255) : 0;
}

export async function renderDeskVideo(opts: {
  files: File[];
  prompt: string;
  lyrics?: string;
  duration: number;
  bpm: number;
  analyser: AnalyserNode | null;
  audio: MediaStream | null;
  width?: number;
  height?: number;
  onTick?: (p: number) => void;
}): Promise<Blob> {
  if (!opts.files.length) throw new Error("media");
  const frames = await Promise.all(opts.files.slice(0, 8).map(loadImage));
  const canvas = document.createElement("canvas");
  const w = opts.width ?? 1920;
  const h = opts.height ?? 1080;
  canvas.width = w;
  canvas.height = h;
  const raw = canvas.getContext("2d");
  if (!raw) throw new Error("canvas");
  const ctx: CanvasRenderingContext2D = raw;
  const stream = canvas.captureStream(30);
  if (opts.audio) {
    for (const t of opts.audio.getAudioTracks()) stream.addTrack(t);
  }
  const mime = pickMime();
  const rec = new MediaRecorder(stream, mime ? { mimeType: mime, videoBitsPerSecond: 8_000_000 } : undefined);
  const chunks: Blob[] = [];
  rec.ondataavailable = (e) => {
    if (e.data.size) chunks.push(e.data);
  };
  const freq = new Uint8Array(opts.analyser ? opts.analyser.frequencyBinCount : 64);
  const time = new Uint8Array(opts.analyser ? opts.analyser.fftSize : 64);
  const pal = PALETTES[1];
  const dur = Math.min(24, Math.max(4, opts.duration));
  const prompt = clipWords(opts.prompt, 80);
  const lyrics = clipWords(opts.lyrics ?? "", 250);
  const beat = 60 / Math.max(60, opts.bpm);
  rec.start(200);
  const t0 = performance.now();
  let idx = 0;
  let lastCut = 0;
  await new Promise<void>((resolve) => {
    function tick() {
      const elapsed = (performance.now() - t0) / 1000;
      if (elapsed >= dur) {
        rec.stop();
        return;
      }
      opts.onTick?.(elapsed / dur);
      if (opts.analyser) {
        opts.analyser.getByteFrequencyData(freq as Uint8Array<ArrayBuffer>);
        opts.analyser.getByteTimeDomainData(time as Uint8Array<ArrayBuffer>);
      }
      const bass = opts.analyser ? bassEnergy(freq) : 0;
      const minGap = beat * 0.45;
      const hit = opts.analyser ? bass > 0.42 : elapsed - lastCut >= beat / 2;
      if (hit && elapsed - lastCut >= minGap) {
        idx = (idx + 1) % frames.length;
        lastCut = elapsed;
      }
      const media = frames[idx % frames.length];
      const zoom = 1.06 + bass * 0.12 + Math.sin(elapsed * 1.15) * 0.04;
      ctx.fillStyle = "#111210";
      ctx.fillRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.scale(zoom, zoom);
      ctx.drawImage(media, -w / 2, -h / 2, w, h);
      ctx.restore();
      ctx.globalCompositeOperation = "screen";
      drawFrame(ctx, w, h, freq, time, "bloom", pal, 1.2);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(17,18,16,0.52)";
      ctx.fillRect(0, h - 140, w, 140);
      ctx.fillStyle = "#e8e4d8";
      ctx.font = "500 28px 'IBM Plex Sans Condensed', system-ui";
      ctx.fillText(`STEEL · ${w}×${h} / 30`, 48, h - 92);
      ctx.fillStyle = "#4aa7d4";
      ctx.font = "18px 'IBM Plex Sans', system-ui";
      ctx.fillText(prompt || "no brief — engine cuts on the kick", 48, h - 58);
      if (lyrics) {
        const words = lyrics.split(/\s+/);
        const start = Math.floor(elapsed * 2) % Math.max(1, words.length);
        const line = words.slice(start, start + 12).join(" ");
        ctx.fillStyle = "#e8783a";
        ctx.font = "500 22px 'IBM Plex Sans Condensed', system-ui";
        ctx.fillText(line, 48, h - 24);
      }
      requestAnimationFrame(tick);
    }
    tick();
    rec.onstop = () => resolve();
  });
  return new Blob(chunks, { type: rec.mimeType || "video/webm" });
}
