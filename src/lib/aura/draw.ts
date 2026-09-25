import { mix, rgb } from "./palettes";
import type { Palette } from "./types";
import type { AuraMode } from "./types";

const particles: { a: number; r: number; s: number; e: number }[] = [];
let rot = 0;

function ensureParticles() {
  if (particles.length) return;
  for (let i = 0; i < 96; i++) {
    particles.push({
      a: Math.random() * Math.PI * 2,
      r: 0.15 + Math.random() * 0.7,
      s: 0.002 + Math.random() * 0.01,
      e: Math.random(),
    });
  }
}

function energy(freq: Uint8Array, from: number, to: number) {
  let s = 0;
  const a = Math.max(0, from);
  const b = Math.min(freq.length, to);
  for (let i = a; i < b; i++) s += freq[i];
  return b > a ? s / ((b - a) * 255) : 0;
}

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  freq: Uint8Array,
  time: Uint8Array,
  mode: AuraMode,
  pal: Palette,
  sensitivity: number,
) {
  const bass = energy(freq, 0, 8) * sensitivity;
  const mid = energy(freq, 8, 32) * sensitivity;
  const high = energy(freq, 32, Math.min(freq.length, 96)) * sensitivity;
  ctx.fillStyle = rgb(pal.bg, mode === "wave" || mode === "bloom" ? 0.18 : 1);
  ctx.fillRect(0, 0, w, h);

  if (mode === "bars") drawBars(ctx, w, h, freq, pal, sensitivity);
  else if (mode === "ring") drawRing(ctx, w, h, freq, pal, sensitivity, bass);
  else if (mode === "wave") drawWave(ctx, w, h, time, pal, bass);
  else drawBloom(ctx, w, h, pal, bass, mid, high);

  rot += 0.004 + bass * 0.02;
}

function drawBars(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  freq: Uint8Array,
  pal: Palette,
  sensitivity: number,
) {
  const n = Math.min(64, freq.length);
  const gap = 2;
  const barW = w / (n * 2) - gap;
  const cx = w / 2;
  const base = h * 0.78;
  for (let i = 0; i < n; i++) {
    const v = Math.min(1, (freq[i] / 255) * sensitivity);
    const bh = v * h * 0.62;
    const col = mix(pal.lo, v > 0.6 ? pal.hi : pal.mid, v);
    ctx.fillStyle = rgb(col);
    const xR = cx + i * (barW + gap);
    const xL = cx - (i + 1) * (barW + gap);
    ctx.fillRect(xR, base - bh, barW, bh);
    ctx.fillRect(xL, base - bh, barW, bh);
  }
}

function drawRing(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  freq: Uint8Array,
  pal: Palette,
  sensitivity: number,
  bass: number,
) {
  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) * (0.22 + bass * 0.05);
  const n = Math.min(96, freq.length);
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);
  ctx.strokeStyle = rgb(pal.lo, 0.45);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.55, 0, Math.PI * 2);
  ctx.stroke();
  for (let i = 0; i < n; i++) {
    const v = Math.min(1, (freq[i] / 255) * sensitivity);
    const a = (i / n) * Math.PI * 2;
    const inner = radius;
    const outer = radius + v * Math.min(w, h) * 0.28;
    ctx.strokeStyle = rgb(mix(pal.mid, pal.hi, v));
    ctx.lineWidth = Math.max(2, (Math.PI * 2 * radius) / n - 1);
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner);
    ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer);
    ctx.stroke();
  }
  ctx.restore();
}

function drawWave(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: Uint8Array,
  pal: Palette,
  bass: number,
) {
  const midY = h * 0.5;
  ctx.lineWidth = 2 + bass * 4;
  ctx.strokeStyle = rgb(pal.hi);
  ctx.beginPath();
  const step = Math.max(1, Math.floor(time.length / w));
  for (let x = 0; x < w; x++) {
    const i = Math.min(time.length - 1, x * step);
    const v = (time[i] - 128) / 128;
    const y = midY + v * h * 0.28;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.strokeStyle = rgb(pal.mid, 0.4);
  ctx.beginPath();
  for (let x = 0; x < w; x++) {
    const i = Math.min(time.length - 1, x * step);
    const v = (time[i] - 128) / 128;
    const y = midY + v * h * 0.18;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function drawBloom(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  pal: Palette,
  bass: number,
  mid: number,
  high: number,
) {
  ensureParticles();
  const cx = w / 2;
  const cy = h / 2;
  const span = Math.min(w, h) * 0.48;
  const orb = span * (0.12 + bass * 0.18);
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb * 2);
  g.addColorStop(0, rgb(pal.hi, 0.9));
  g.addColorStop(0.4, rgb(pal.mid, 0.35));
  g.addColorStop(1, rgb(pal.bg, 0));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cy, orb * 2, 0, Math.PI * 2);
  ctx.fill();

  for (const p of particles) {
    p.a += p.s + bass * 0.02;
    const pulse = 0.65 + bass * 0.8 + mid * 0.3;
    const x = cx + Math.cos(p.a) * p.r * span * pulse;
    const y = cy + Math.sin(p.a * 1.13) * p.r * span * pulse * 0.72;
    const size = 1.2 + high * 4 + p.e * 2;
    ctx.fillStyle = rgb(mix(pal.lo, pal.hi, p.e * 0.8 + high), 0.55 + high * 0.4);
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}
