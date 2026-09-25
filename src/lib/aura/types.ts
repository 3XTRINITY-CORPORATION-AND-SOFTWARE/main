export type AuraMode = "bars" | "ring" | "wave" | "bloom";
export type AuraPalette = "ice" | "ember" | "tide" | "rose" | "mono";
export type AuraSource = "demo" | "mic" | "file" | "steel";
export type BufferInc = 8 | 16 | 32 | 64 | 128;
export type QualityArm = 32 | 64 | 89 | 528;

export interface Palette {
  id: AuraPalette;
  label: string;
  bg: [number, number, number];
  lo: [number, number, number];
  mid: [number, number, number];
  hi: [number, number, number];
}

export interface CapsReport {
  gpu: string;
  maxTexture: number;
  cores: number;
  dpr: number;
  screen: string;
  refresh: number;
  audioRate: number;
  audioLatencyMs: number;
  maxChannels: number;
  webgl: boolean;
  mime: string;
  recordCeiling: { w: number; h: number; fps: number; arm: QualityArm };
  imax: string;
}

export const BUFFER_INCS: BufferInc[] = [8, 16, 32, 64, 128];
export const QUALITY_ARMS: QualityArm[] = [528, 32, 64, 89];

export function fftFromInc(inc: BufferInc) {
  if (inc === 8) return 256;
  if (inc === 16) return 512;
  if (inc === 32) return 1024;
  if (inc === 64) return 2048;
  return 4096;
}

export function profileForArm(arm: QualityArm, maxTexture: number) {
  const table: Record<QualityArm, { w: number; h: number; fps: number; label: string }> = {
    528: { w: 960, h: 528, fps: 30, label: "528p music video" },
    32: { w: 1280, h: 720, fps: 30, label: "720p" },
    64: { w: 1920, h: 1080, fps: 60, label: "1080p60" },
    89: { w: 2560, h: 1440, fps: 60, label: "1440p60" },
  };
  const p = table[arm];
  if (Math.max(p.w, p.h) > maxTexture) {
    return { w: 1280, h: 720, fps: 30, label: "720p (GPU clamped)", clamped: true };
  }
  return { ...p, clamped: false };
}
