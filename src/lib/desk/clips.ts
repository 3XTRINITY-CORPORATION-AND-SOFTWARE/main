export type ClipKind = "main" | "adlib" | "back";

export type VocalClip = {
  id: string;
  start: number;
  end: number;
  offset: number;
  gain: number;
  muted: boolean;
  kind: ClipKind;
  score: number;
  pitchHz: number;
  pitchRatio: number;
};

let seq = 1;
function nid() {
  seq += 1;
  return `c${seq}`;
}

export function gridStep(bpm: number, div = 16) {
  const beat = 60 / Math.max(60, bpm);
  return beat * (4 / div);
}

export function snapTime(t: number, bpm: number, div = 16) {
  const step = gridStep(bpm, div);
  return Math.max(0, Math.round(t / step) * step);
}

function rmsRange(ch: Float32Array, a: number, b: number) {
  let s = 0;
  const n = Math.max(1, b - a);
  for (let i = a; i < b; i++) s += ch[i] * ch[i];
  return Math.sqrt(s / n);
}

/** AMDF pitch on a short window. Honest: not a tuner, enough to snap a take to a tonic. */
export function estimatePitch(ch: Float32Array, sr: number, a: number, b: number) {
  const n = Math.min(2048, Math.max(0, b - a));
  if (n < 256) return 0;
  let rms = 0;
  for (let i = 0; i < n; i++) rms += ch[a + i] * ch[a + i];
  rms = Math.sqrt(rms / n);
  if (rms < 0.01) return 0;
  const minP = Math.floor(sr / 520);
  const maxP = Math.min(Math.floor(sr / 80), Math.floor(n / 2));
  let best = 1e9;
  let bestP = minP;
  for (let p = minP; p < maxP; p++) {
    let s = 0;
    const m = n - p;
    for (let i = 0; i < m; i += 2) {
      const d = ch[a + i] - ch[a + i + p];
      s += d * d;
    }
    s /= Math.max(1, m);
    if (s < best) {
      best = s;
      bestP = p;
    }
  }
  return sr / bestP;
}

export function pitchToTonic(hz: number) {
  if (hz < 70 || hz > 900) return 0;
  const midi = 69 + 12 * Math.log2(hz / 440);
  return ((Math.round(midi) % 12) + 12) % 12;
}

export function detectClips(buffer: AudioBuffer): VocalClip[] {
  const ch = buffer.getChannelData(0);
  const sr = buffer.sampleRate;
  const win = Math.max(1, Math.floor(sr * 0.02));
  const thresh = 0.018;
  const minLen = 0.12;
  const clips: VocalClip[] = [];
  let on = -1;
  for (let i = 0; i < ch.length; i += win) {
    const e = rmsRange(ch, i, Math.min(ch.length, i + win));
    if (e > thresh && on < 0) on = i;
    if ((e <= thresh || i + win >= ch.length) && on >= 0) {
      const start = on / sr;
      const end = Math.min(buffer.duration, (i + win) / sr);
      if (end - start >= minLen) {
        const score = rmsRange(ch, on, Math.min(ch.length, i + win));
        clips.push({
          id: nid(),
          start,
          end,
          offset: start,
          gain: 1,
          muted: false,
          kind: "main",
          score,
          pitchHz: estimatePitch(ch, sr, on, Math.min(ch.length, i + win)),
          pitchRatio: 1,
        });
      }
      on = -1;
    }
  }
  if (!clips.length && buffer.duration > 0.05) {
    clips.push({
      id: nid(),
      start: 0,
      end: buffer.duration,
      offset: 0,
      gain: 1,
      muted: false,
      kind: "main",
      score: rmsRange(ch, 0, ch.length),
      pitchHz: estimatePitch(ch, sr, 0, Math.min(ch.length, 2048)),
      pitchRatio: 1,
    });
  }
  return clips;
}

/** Mains to the nearest beat; adlibs to the offbeat; backs a 16th after the downbeat. */
export function placeOnGrid(clips: VocalClip[], bpm: number): VocalClip[] {
  const beat = 60 / Math.max(60, bpm);
  const eighth = beat / 2;
  const step = beat / 4;
  return clips.map((c) => {
    if (c.muted) return c;
    let target = c.offset;
    if (c.kind === "main") target = Math.round(c.offset / beat) * beat;
    else if (c.kind === "adlib") {
      const q = Math.round(c.offset / eighth);
      target = q * eighth + (q % 2 === 0 ? eighth / 2 : 0);
    } else target = Math.round(c.offset / beat) * beat + step;
    return { ...c, offset: Math.max(0, target) };
  });
}

export function quantizeClips(clips: VocalClip[], bpm: number): VocalClip[] {
  return placeOnGrid(clips, bpm);
}

export function keepBestTakes(clips: VocalClip[]): VocalClip[] {
  const mains = clips.filter((c) => c.kind === "main");
  if (mains.length < 2) return clips;
  const scores = mains.map((c) => c.score).sort((a, b) => a - b);
  const med = scores[Math.floor(scores.length / 2)] ?? 0;
  const floor = Math.max(0.02, med * 0.5);
  return clips.map((c) => (c.kind === "main" && c.score < floor ? { ...c, muted: true } : c));
}

export function splitClip(clip: VocalClip, at: number): VocalClip[] {
  const t = Math.min(clip.end - 0.04, Math.max(clip.start + 0.04, at));
  if (t <= clip.start || t >= clip.end) return [clip];
  const a: VocalClip = { ...clip, id: nid(), end: t };
  const b: VocalClip = {
    ...clip,
    id: nid(),
    start: t,
    offset: clip.offset + (t - clip.start),
  };
  return [a, b];
}

export function splitClipOnGrid(clip: VocalClip, bpm: number): VocalClip[] {
  const mid = (clip.start + clip.end) / 2;
  const local = clip.start + snapTime(mid - clip.start, bpm);
  return splitClip(clip, local);
}

export function composeClips(
  src: AudioBuffer,
  clips: VocalClip[],
  lengthSec: number,
  ctx: BaseAudioContext,
  fadeSec = 0.012,
) {
  const sr = src.sampleRate;
  const len = Math.max(src.length, Math.floor(Math.max(0.5, lengthSec) * sr));
  const out = ctx.createBuffer(src.numberOfChannels, len, sr);
  for (const clip of clips) {
    if (clip.muted) continue;
    const ratio = clip.pitchRatio > 0.05 ? clip.pitchRatio : 1;
    const s0 = Math.max(0, Math.floor(clip.start * sr));
    const s1 = Math.min(src.length, Math.floor(clip.end * sr));
    const srcN = s1 - s0;
    if (srcN <= 0) continue;
    const outN = Math.floor(srcN / ratio);
    const d0 = Math.max(0, Math.floor(clip.offset * sr));
    const n = Math.min(outN, len - d0);
    if (n <= 0) continue;
    const g = clip.gain * (clip.kind === "back" ? 0.9 : clip.kind === "adlib" ? 0.85 : 1);
    const fade = Math.min(Math.floor(Math.max(0.004, fadeSec) * sr), Math.floor(n / 4));
    for (let c = 0; c < src.numberOfChannels; c++) {
      const a = src.getChannelData(c);
      const b = out.getChannelData(c);
      for (let i = 0; i < n; i++) {
        const srcPos = s0 + i * ratio;
        const i0 = Math.min(s1 - 1, Math.floor(srcPos));
        const i1 = Math.min(s1 - 1, i0 + 1);
        const frac = srcPos - i0;
        let x = a[i0] * (1 - frac) + a[i1] * frac;
        if (clip.kind === "adlib") x = Math.tanh(x * 2.2);
        let env = 1;
        if (i < fade) env = i / fade;
        else if (i > n - fade) env = (n - i) / fade;
        b[d0 + i] += x * g * env;
      }
    }
  }
  return out;
}

export function cloneAs(clip: VocalClip, kind: ClipKind, bpm: number): VocalClip {
  const step = gridStep(bpm, 8);
  return {
    ...clip,
    id: nid(),
    kind,
    offset: snapTime(clip.offset + (kind === "back" ? step * 0.5 : step), bpm),
    gain: kind === "back" ? 0.55 : 0.8,
    score: clip.score,
    pitchRatio: 1,
  };
}

/** Weak takes become shouted adlibs; the strongest take also throws a same-voice offbeat. */
export function makeAdlibClips(clips: VocalClip[], bpm: number): VocalClip[] {
  const mains = clips.filter((c) => c.kind === "main" && !c.muted);
  if (!mains.length) return clips;
  const ranked = [...mains].sort((a, b) => a.score - b.score);
  const weakN = Math.min(3, Math.max(1, Math.floor(ranked.length / 3) || 1));
  const weak = ranked.slice(0, weakN);
  const best = ranked[ranked.length - 1];
  const extra: VocalClip[] = weak.map((w) => ({
    ...cloneAs(w, "adlib", bpm),
    pitchRatio: 1.07 + 0.05 * (1 - Math.min(1, w.score * 8)),
    gain: 0.68,
  }));
  if (best) {
    extra.push({
      ...cloneAs(best, "adlib", bpm),
      pitchRatio: 1.04,
      gain: 0.6,
      offset: snapTime(best.offset + gridStep(bpm, 8), bpm),
    });
  }
  return [...clips, ...extra];
}

/** Unison thicken + a couple of octave-down pads from the longest takes. Same recording, not a clone. */
export function makeBackClips(clips: VocalClip[], bpm: number): VocalClip[] {
  const mains = clips
    .filter((c) => c.kind === "main" && !c.muted && c.score > 0.03)
    .sort((a, b) => b.end - b.start - (a.end - a.start))
    .slice(0, 4);
  const extra: VocalClip[] = [];
  mains.forEach((c, i) => {
    extra.push({
      ...cloneAs(c, "back", bpm),
      pitchRatio: 0.995,
      gain: 0.4,
    });
    if (i < 2) {
      extra.push({
        ...cloneAs(c, "back", bpm),
        pitchRatio: 0.5,
        gain: 0.28,
        offset: snapTime(c.offset + gridStep(bpm, 4) * 0.5, bpm),
      });
    }
  });
  return [...clips, ...extra];
}

export function timelineSpan(clips: VocalClip[], min = 4) {
  let m = min;
  for (const c of clips) m = Math.max(m, c.offset + (c.end - c.start));
  return m;
}
