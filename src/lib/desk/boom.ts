/** 90 BPM boom-bap bar, generated — no asset download. */
export function makeBoomBap(ctx: AudioContext, bars = 8): AudioBuffer {
  const bpm = 90;
  const sr = ctx.sampleRate;
  const beat = 60 / bpm;
  const dur = bars * 4 * beat;
  const n = Math.floor(sr * dur);
  const buf = ctx.createBuffer(2, n, sr);
  const L = buf.getChannelData(0);
  const R = buf.getChannelData(1);

  const noise = (len: number) => {
    const a = new Float32Array(len);
    for (let i = 0; i < len; i++) a[i] = Math.random() * 2 - 1;
    return a;
  };

  function add(at: number, samples: Float32Array, gain: number, pan = 0) {
    const start = Math.floor(at * sr);
    for (let i = 0; i < samples.length; i++) {
      const idx = start + i;
      if (idx >= n) break;
      const gL = gain * (1 - Math.max(0, pan));
      const gR = gain * (1 + Math.min(0, pan));
      L[idx] += samples[i] * gL;
      R[idx] += samples[i] * gR;
    }
  }

  function kick() {
    const len = Math.floor(sr * 0.28);
    const a = new Float32Array(len);
    for (let i = 0; i < len; i++) {
      const t = i / sr;
      const f = 120 * Math.exp(-t * 18) + 38;
      const env = Math.exp(-t * 14);
      a[i] = Math.sin(2 * Math.PI * f * t) * env;
    }
    return a;
  }

  function snare() {
    const len = Math.floor(sr * 0.18);
    const nz = noise(len);
    const a = new Float32Array(len);
    for (let i = 0; i < len; i++) {
      const t = i / sr;
      const env = Math.exp(-t * 22);
      const tone = Math.sin(2 * Math.PI * 180 * t) * Math.exp(-t * 16);
      a[i] = (nz[i] * 0.7 + tone * 0.4) * env;
    }
    return a;
  }

  function hat() {
    const len = Math.floor(sr * 0.05);
    const nz = noise(len);
    const a = new Float32Array(len);
    for (let i = 0; i < len; i++) {
      const t = i / sr;
      a[i] = nz[i] * Math.exp(-t * 70);
    }
    return a;
  }

  function bass(freq: number) {
    const len = Math.floor(sr * 0.42);
    const a = new Float32Array(len);
    for (let i = 0; i < len; i++) {
      const t = i / sr;
      const env = Math.min(1, t * 80) * Math.exp(-t * 4.2);
      a[i] = Math.sin(2 * Math.PI * freq * t) * env * 0.7;
      a[i] += Math.sin(2 * Math.PI * freq * 2 * t) * env * 0.12;
    }
    return a;
  }

  const k = kick();
  const s = snare();
  const h = hat();
  const notes = [49, 49, 36.7, 41.2];
  for (let bar = 0; bar < bars; bar++) {
    const t0 = bar * 4 * beat;
    add(t0, k, 0.95);
    add(t0 + 2 * beat, k, 0.88);
    add(t0 + beat, s, 0.55, 0.1);
    add(t0 + 3 * beat, s, 0.58, -0.05);
    for (let i = 0; i < 8; i++) add(t0 + i * (beat / 2), h, i % 2 ? 0.12 : 0.2, i % 2 ? 0.3 : -0.3);
    add(t0, bass(notes[bar % 4]), 0.55);
    add(t0 + 2 * beat, bass(notes[bar % 4]), 0.4);
  }
  let peak = 1e-6;
  for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  const g = 0.85 / peak;
  for (let i = 0; i < n; i++) {
    L[i] *= g;
    R[i] *= g;
  }
  return buf;
}

/** Short hummed line on the 90 BPM grid so clip detect has something without a mic. */
export function makeDemoVocal(ctx: AudioContext, bars = 4): AudioBuffer {
  const bpm = 90;
  const sr = ctx.sampleRate;
  const beat = 60 / bpm;
  const dur = bars * 4 * beat;
  const n = Math.floor(sr * dur);
  const buf = ctx.createBuffer(1, n, sr);
  const ch = buf.getChannelData(0);
  const notes = [
    { at: 0, hz: 220, len: 0.42 },
    { at: beat, hz: 246.94, len: 0.26 },
    { at: beat * 2, hz: 196, len: 0.5 },
    { at: beat * 4, hz: 220, len: 0.34 },
    { at: beat * 5.5, hz: 329.63, len: 0.2 },
    { at: beat * 8, hz: 196, len: 0.72 },
    { at: beat * 11, hz: 174.61, len: 0.4 },
  ];
  for (const note of notes) {
    const start = Math.floor(note.at * sr);
    const len = Math.floor(note.len * sr);
    for (let i = 0; i < len && start + i < n; i++) {
      const t = i / sr;
      const env = Math.min(1, i / (0.012 * sr)) * Math.exp(-t * 2.6);
      const vib = 1 + 0.007 * Math.sin(2 * Math.PI * 5.4 * t);
      ch[start + i] +=
        Math.sin(2 * Math.PI * note.hz * vib * t) * env * 0.38 +
        Math.sin(2 * Math.PI * note.hz * 2 * t) * env * 0.07;
    }
  }
  return buf;
}

export function bufferToWav(buffer: AudioBuffer): Blob {
  const ch = buffer.numberOfChannels;
  const sr = buffer.sampleRate;
  const len = buffer.length;
  const bytes = len * ch * 2;
  const ab = new ArrayBuffer(44 + bytes);
  const v = new DataView(ab);
  const w = (o: number, s: string) => {
    for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i));
  };
  w(0, "RIFF");
  v.setUint32(4, 36 + bytes, true);
  w(8, "WAVE");
  w(12, "fmt ");
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, ch, true);
  v.setUint32(24, sr, true);
  v.setUint32(28, sr * ch * 2, true);
  v.setUint16(32, ch * 2, true);
  v.setUint16(34, 16, true);
  w(36, "data");
  v.setUint32(40, bytes, true);
  let o = 44;
  for (let i = 0; i < len; i++) {
    for (let c = 0; c < ch; c++) {
      let s = buffer.getChannelData(c)[i];
      if (s > 1) s = 1;
      if (s < -1) s = -1;
      v.setInt16(o, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      o += 2;
    }
  }
  return new Blob([ab], { type: "audio/wav" });
}
