import { VOCAL_KINDS, type VocalKind } from "./night";

/** Gen 3 scalars only. Never a voice-print, never embeddings, never a waveform. */
export interface VoiceCap {
  gen: 3;
  hasTake: boolean;
  rapped: boolean;
  durationS: number;
  f0Hz: number;
  f0Min: number;
  f0Max: number;
  rms: number;
  peak: number;
  crestDb: number;
  centroidHz: number;
  flux: number;
  hnr: number;
  scores: Record<VocalKind, number>;
}

type KindRange = {
  f0: [number, number];
  cent: [number, number];
  rms: [number, number];
  flux: [number, number];
  hnr: [number, number];
};

const KIND_RANGE: Record<VocalKind, KindRange> = {
  scream: { f0: [280, 800], cent: [2800, 6000], rms: [0.1, 0.45], flux: [3, 18], hnr: [0.15, 0.55] },
  growl: { f0: [70, 160], cent: [600, 2000], rms: [0.08, 0.4], flux: [2, 10], hnr: [0.1, 0.45] },
  belt: { f0: [180, 500], cent: [1800, 4000], rms: [0.1, 0.4], flux: [1, 8], hnr: [0.4, 0.85] },
  rap: { f0: [80, 220], cent: [1200, 3200], rms: [0.04, 0.25], flux: [3, 16], hnr: [0.25, 0.7] },
  chop: { f0: [90, 260], cent: [1600, 4000], rms: [0.04, 0.22], flux: [6, 22], hnr: [0.2, 0.6] },
  speak: { f0: [85, 220], cent: [1000, 2800], rms: [0.03, 0.18], flux: [2, 10], hnr: [0.3, 0.75] },
  whisper: { f0: [120, 280], cent: [2500, 5500], rms: [0.008, 0.06], flux: [1, 6], hnr: [0.05, 0.35] },
  air: { f0: [140, 320], cent: [3000, 7000], rms: [0.01, 0.08], flux: [0.5, 5], hnr: [0.1, 0.4] },
  choir: { f0: [140, 400], cent: [1400, 3600], rms: [0.04, 0.2], flux: [0.5, 4], hnr: [0.45, 0.9] },
  opera: { f0: [220, 700], cent: [1800, 4200], rms: [0.08, 0.35], flux: [0.4, 4], hnr: [0.5, 0.95] },
};

const ZERO_SCORES = Object.fromEntries(VOCAL_KINDS.map((k) => [k, 0])) as Record<VocalKind, number>;

export const EMPTY_CAP: VoiceCap = {
  gen: 3,
  hasTake: false,
  rapped: false,
  durationS: 0,
  f0Hz: 0,
  f0Min: 0,
  f0Max: 0,
  rms: 0,
  peak: 0,
  crestDb: 0,
  centroidHz: 0,
  flux: 0,
  hnr: 0,
  scores: { ...ZERO_SCORES },
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function inRangeScore(v: number, lo: number, hi: number) {
  if (v >= lo && v <= hi) return 1;
  const span = hi - lo || 1;
  const d = v < lo ? lo - v : v - hi;
  return clamp(1 - d / span, 0, 1);
}

function coverScore(lo: number, hi: number, tLo: number, tHi: number) {
  const overlap = Math.max(0, Math.min(hi, tHi) - Math.max(lo, tLo));
  const span = tHi - tLo || 1;
  const hit = hi >= tLo && lo <= tHi ? 0.2 : 0;
  return clamp(overlap / span + hit, 0, 1);
}

function detectHz(buf: Float32Array, start: number, n: number, sr: number) {
  let e = 0;
  for (let i = 0; i < n; i++) e += buf[start + i] * buf[start + i];
  if (Math.sqrt(e / n) < 0.01) return 0;
  const minP = Math.floor(sr / 620);
  const maxP = Math.floor(sr / 70);
  let best = 1e9;
  let bestP = minP;
  for (let p = minP; p < maxP; p += 3) {
    let s = 0;
    const m = n - p;
    for (let i = 0; i < m; i += 4) {
      const d = buf[start + i] - buf[start + i + p];
      s += d * d;
    }
    if (s < best) {
      best = s;
      bestP = p;
    }
  }
  return sr / bestP;
}

function kindScores(cap: Omit<VoiceCap, "scores" | "gen">): Record<VocalKind, number> {
  const out = { ...ZERO_SCORES };
  const fLo = cap.f0Min || cap.f0Hz * 0.85;
  const fHi = cap.f0Max || cap.f0Hz * 1.15;
  for (const id of VOCAL_KINDS) {
    const r = KIND_RANGE[id];
    const s =
      0.32 * coverScore(fLo, fHi, r.f0[0], r.f0[1]) +
      0.22 * inRangeScore(cap.centroidHz, r.cent[0], r.cent[1]) +
      0.18 * inRangeScore(cap.rms, r.rms[0], r.rms[1]) +
      0.16 * inRangeScore(cap.flux, r.flux[0], r.flux[1]) +
      0.12 * inRangeScore(cap.hnr, r.hnr[0], r.hnr[1]);
    out[id] = Math.round(s * 100) / 10;
  }
  return out;
}

/**
 * Measure a take. Returns scalars for the 10-kind map.
 * Call only on a buffer the user recorded or loaded — never to build a print.
 */
export function measureVoice(buffer: AudioBuffer): VoiceCap {
  const sr = buffer.sampleRate;
  const ch = buffer.getChannelData(0);
  const durationS = ch.length / sr;
  if (ch.length < sr * 0.25) return { ...EMPTY_CAP, durationS };

  const hop = 2048;
  const win = 1024;
  const maxN = Math.min(ch.length, Math.floor(sr * 6));
  let peak = 0;
  let sumSq = 0;
  let centNum = 0;
  let centDen = 0;
  let harm = 0;
  let noise = 0;
  const pitches: number[] = [];
  const energies: number[] = [];

  for (let i = 0; i + win < maxN; i += hop) {
    let e = 0;
    let mag = 0;
    for (let j = 0; j < win; j++) {
      const x = ch[i + j];
      e += x * x;
      const ax = Math.abs(x);
      if (ax > peak) peak = ax;
      mag += ax;
    }
    sumSq += e;
    energies.push(e);
    const rmsW = Math.sqrt(e / win);
    if (rmsW > 0.01) {
      const hz = detectHz(ch, i, win, sr);
      if (hz > 70 && hz < 700) pitches.push(hz);
    }
    // coarse spectral centroid via folded abs diffs (high-freq proxy)
    let hi = 0;
    for (let j = 1; j < win; j += 2) hi += Math.abs(ch[i + j] - ch[i + j - 1]);
    centNum += hi * (sr / 2);
    centDen += mag + 1e-8;
    const odd = hi;
    const even = mag - hi;
    harm += even;
    noise += odd;
  }

  const n = Math.max(1, Math.floor(maxN));
  const rms = Math.sqrt(sumSq / n);
  const crestDb = peak > 1e-6 && rms > 1e-6 ? 20 * Math.log10(peak / rms) : 0;
  const centroidHz = clamp(centDen > 0 ? centNum / centDen / win : 1800, 200, 8000);
  const hnr = clamp(harm / (harm + noise + 1e-8), 0, 1);

  let fluxHits = 0;
  for (let i = 1; i < energies.length; i++) {
    const flux = energies[i] - energies[i - 1];
    if (flux > 0.002 && energies[i] > 0.0008) fluxHits += 1;
  }
  const flux = fluxHits / Math.max(0.4, durationS);

  const voiced = pitches.slice().sort((a, b) => a - b);
  const f0Hz = voiced.length
    ? voiced[Math.floor(voiced.length / 2)]
    : 0;
  const f0Min = voiced.length ? voiced[Math.floor(voiced.length * 0.1)] : 0;
  const f0Max = voiced.length ? voiced[Math.floor(voiced.length * 0.9)] : 0;

  const hasTake = durationS >= 0.4 && rms >= 0.008;
  const speechLike = f0Hz >= 70 && f0Hz <= 420 && rms >= 0.016;
  const rapped = hasTake && durationS >= 1.15 && (flux >= 1.35 || speechLike);

  const base = {
    hasTake,
    rapped,
    durationS: Math.round(durationS * 100) / 100,
    f0Hz: Math.round(f0Hz),
    f0Min: Math.round(f0Min),
    f0Max: Math.round(f0Max),
    rms: Math.round(rms * 1000) / 1000,
    peak: Math.round(peak * 1000) / 1000,
    crestDb: Math.round(crestDb * 10) / 10,
    centroidHz: Math.round(centroidHz),
    flux: Math.round(flux * 10) / 10,
    hnr: Math.round(hnr * 100) / 100,
  };
  return { gen: 3, ...base, scores: kindScores(base) };
}

export function mimicAllowed(cap: VoiceCap | null | undefined) {
  return Boolean(cap?.rapped && cap.hasTake);
}

export function pitchRatioToward(fromHz: number, toHz: number) {
  if (fromHz < 70 || toHz < 70) return 1;
  return clamp(toHz / fromHz, 0.72, 1.35);
}
