import type { Genre, VisualStyle } from "./types";
import { visemeAt, visemePath } from "./viseme";

export type VisTokens = {
  paper: string;
  raised: string;
  ink: string;
  muted: string;
  rule: string;
  steel: string;
  live: string;
  clip: string;
  copper: string;
};

export function readTokens(el: HTMLElement): VisTokens {
  const s = getComputedStyle(el);
  const v = (name: string, fallback: string) => s.getPropertyValue(name).trim() || fallback;
  return {
    paper: v("--color-paper", "#0c0d0b"),
    raised: v("--color-raised", "#161714"),
    ink: v("--color-ink", "#e6e1d4"),
    muted: v("--color-muted", "#8a877c"),
    rule: v("--color-rule", "#2c2d28"),
    steel: v("--color-steel", "#8fa0ab"),
    live: v("--color-live", "#6aa56f"),
    clip: v("--color-clip", "#c45c4a"),
    copper: v("--color-copper", "#c47a4a"),
  };
}

function hexToRgb(hex: string): [number, number, number] {
  const raw = hex.trim();
  if (raw.startsWith("rgb")) {
    const m = raw.match(/[\d.]+/g);
    if (m && m.length >= 3) return [Number(m[0]), Number(m[1]), Number(m[2])];
  }
  const h = raw.replace("#", "");
  if (h.length === 3) {
    const n = parseInt(h.split("").map((c) => c + c).join(""), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  if (h.length >= 6 && /^[0-9a-fA-F]+$/.test(h.slice(0, 6))) {
    const n = parseInt(h.slice(0, 6), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  return [230, 225, 212];
}

function rgba(hex: string, a: number) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}

export function drawVisualizer(opts: {
  canvas: HTMLCanvasElement;
  freq: Uint8Array;
  wave: Uint8Array;
  tokens: VisTokens;
  style: VisualStyle;
  genre: Genre;
  peak: number;
  rms?: number;
  bpm?: number;
  step: number;
  playing: boolean;
  lyrics: string;
  still: HTMLImageElement | null;
  t: number;
}) {
  const { canvas, freq, wave, tokens, style, genre, peak, step, playing, lyrics, still, t } = opts;
  const rms = opts.rms ?? peak;
  const bpm = opts.bpm ?? 140;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
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

  if (still && still.complete && still.naturalWidth) {
    const scale = Math.max(w / still.naturalWidth, h / still.naturalHeight) * (1 + peak * 0.04);
    const dw = still.naturalWidth * scale;
    const dh = still.naturalHeight * scale;
    ctx.globalAlpha = 0.28 + peak * 0.22;
    ctx.drawImage(still, (w - dw) / 2, (h - dh) / 2, dw, dh);
    ctx.globalAlpha = 1;
  }

  const bass = avg(freq, 0, 8) / 255;
  const mid = avg(freq, 12, 40) / 255;
  const high = avg(freq, 60, 120) / 255;
  const resolved: VisualStyle =
    style === "auto"
      ? genre === "rap" || genre === "trap"
        ? "scope"
        : genre === "techno"
          ? "tunnel"
          : "rings"
      : style;

  if (resolved === "tunnel") drawTunnel(ctx, w, h, tokens, bass, mid, t, playing);
  else if (resolved === "bars") drawBars(ctx, w, h, freq, tokens, peak);
  else if (resolved === "scope") drawScope(ctx, w, h, wave, tokens, bass);
  else if (resolved === "film") drawFilm(ctx, w, h, wave, tokens, lyrics, t, bpm, rms);
  else if (resolved === "lips") drawLips(ctx, w, h, tokens, lyrics, t, bpm, rms, peak);
  else drawRings(ctx, w, h, tokens, bass, mid, high, peak, t);

  drawSteelOverlay(ctx, w, h, tokens, step, peak, lyrics, playing);
}

function avg(arr: Uint8Array, a: number, b: number) {
  const end = Math.min(arr.length, b);
  let s = 0;
  let n = 0;
  for (let i = a; i < end; i++) {
    s += arr[i];
    n++;
  }
  return n ? s / n : 0;
}

function drawRings(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  tokens: VisTokens,
  bass: number,
  mid: number,
  high: number,
  peak: number,
  t: number,
) {
  const cx = w / 2;
  const cy = h * 0.48;
  const maxR = Math.min(w, h) * 0.42;
  ctx.strokeStyle = rgba(tokens.rule, 0.9);
  ctx.lineWidth = 1;
  for (let i = 0; i < 7; i++) {
    const r = maxR * (0.18 + i * 0.12) * (1 + bass * 0.18);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.strokeStyle = rgba(tokens.steel, 0.85);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, maxR * (0.22 + bass * 0.55), 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = rgba(tokens.live, 0.55 + peak * 0.35);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, maxR * (0.4 + mid * 0.3), t * 0.4, t * 0.4 + Math.PI * (0.8 + high));
  ctx.stroke();
  if (peak > 0.55) {
    ctx.fillStyle = rgba(tokens.ink, 0.04 + (peak - 0.55) * 0.08);
    ctx.fillRect(0, 0, w, h);
  }
}

function drawTunnel(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  tokens: VisTokens,
  bass: number,
  mid: number,
  t: number,
  playing: boolean,
) {
  const cx = w / 2;
  const cy = h / 2;
  const speed = playing ? t * (0.6 + bass * 1.4) : t * 0.08;
  ctx.strokeStyle = rgba(tokens.steel, 0.55);
  ctx.lineWidth = 1;
  for (let i = 0; i < 14; i++) {
    const z = (i / 14 + speed) % 1;
    const s = 0.06 + z * 1.2;
    const rw = w * s * (0.28 + bass * 0.12);
    const rh = h * s * (0.22 + mid * 0.08);
    ctx.globalAlpha = 0.15 + z * 0.7;
    ctx.strokeRect(cx - rw / 2, cy - rh / 2, rw, rh);
  }
  ctx.globalAlpha = 1;
}

function drawBars(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  freq: Uint8Array,
  tokens: VisTokens,
  peak: number,
) {
  const n = 48;
  const gap = 2;
  const bw = (w - (n + 1) * gap) / n;
  for (let i = 0; i < n; i++) {
    const idx = Math.floor((i / n) * freq.length * 0.7);
    const v = freq[idx] / 255;
    const bh = Math.max(2, v * (h * 0.72));
    ctx.fillStyle = i % 8 === 0 ? rgba(tokens.steel, 0.9) : rgba(tokens.ink, 0.55 + v * 0.35);
    ctx.fillRect(gap + i * (bw + gap), h - bh - 28, bw, bh);
  }
  ctx.fillStyle = rgba(tokens.live, 0.8);
  ctx.fillRect(0, 8, w * Math.min(1, peak), 3);
}

function drawScope(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  wave: Uint8Array,
  tokens: VisTokens,
  bass: number,
) {
  ctx.strokeStyle = rgba(tokens.rule, 0.8);
  ctx.beginPath();
  ctx.moveTo(0, h / 2);
  ctx.lineTo(w, h / 2);
  ctx.stroke();
  ctx.strokeStyle = rgba(tokens.ink, 0.9);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  const n = wave.length;
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * w;
    const y = h / 2 + ((wave[i] - 128) / 128) * (h * 0.32) * (0.7 + bass);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

const FILM_N = 1000;

function resampleWave(wave: Uint8Array, out: Float32Array) {
  const n = wave.length;
  if (n < 2) {
    out.fill(0);
    return;
  }
  for (let i = 0; i < out.length; i++) {
    const x = (i / (out.length - 1)) * (n - 1);
    const i0 = x | 0;
    const i1 = Math.min(n - 1, i0 + 1);
    out[i] = (wave[i0] * (1 - (x - i0)) + wave[i1] * (x - i0)) / 128 - 1;
  }
}

function drawFilm(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  wave: Uint8Array,
  tokens: VisTokens,
  lyrics: string,
  t: number,
  bpm: number,
  rms: number,
) {
  const bins = new Float32Array(FILM_N);
  resampleWave(wave, bins);
  ctx.beginPath();
  ctx.strokeStyle = tokens.ink;
  ctx.lineWidth = 1.25;
  for (let i = 0; i < FILM_N; i++) {
    const x = (i / (FILM_N - 1)) * w;
    const y = h * 0.62 + bins[i] * h * 0.18;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  const vis = visemeAt(lyrics, t, bpm, rms);
  const mouth = visemePath(vis);
  ctx.strokeStyle = tokens.live;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(w / 2, h * 0.34, mouth.w * 70, mouth.h * 70, 0, 0, Math.PI * 2);
  ctx.stroke();
}

function drawLips(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  tokens: VisTokens,
  lyrics: string,
  t: number,
  bpm: number,
  rms: number,
  peak: number,
) {
  const vis = visemeAt(lyrics, t, bpm, rms);
  const mouth = visemePath(vis);
  const cx = w / 2;
  const cy = h * 0.48;
  const s = Math.min(w, h) * 0.42;
  ctx.strokeStyle = rgba(tokens.rule, 0.9);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(cx, cy, s * 0.72, s * 0.55, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = rgba(tokens.ink, 0.08 + peak * 0.12);
  ctx.beginPath();
  ctx.ellipse(cx, cy, mouth.w * s, mouth.h * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = tokens.live;
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.fillStyle = tokens.muted;
  ctx.font = "11px IBM Plex Mono, ui-monospace, monospace";
  ctx.fillText(vis.toUpperCase(), 16, h - 36);
}

function drawSteelOverlay(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  tokens: VisTokens,
  step: number,
  peak: number,
  lyrics: string,
  playing: boolean,
) {
  ctx.strokeStyle = rgba(tokens.rule, 0.9);
  ctx.strokeRect(8, 8, w - 16, h - 16);
  ctx.fillStyle = tokens.muted;
  ctx.font = "11px IBM Plex Mono, ui-monospace, monospace";
  ctx.fillText(playing ? `STEP ${String(step + 1).padStart(2, "0")} / 16` : "IDLE", 16, 26);
  ctx.fillText(`${Math.round(peak * 100)}%`, w - 52, 26);
  if (lyrics) {
    const line = lyrics.split("\n")[0]?.slice(0, 64) ?? "";
    ctx.fillStyle = tokens.ink;
    ctx.font = "500 14px IBM Plex Sans Condensed, sans-serif";
    ctx.fillText(line, 16, h - 18);
  }
}
