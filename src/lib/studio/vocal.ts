import { armedCurve, type BankCurve } from "./banks";
import { measureVoice, mimicAllowed, pitchRatioToward, type VoiceCap } from "./caps";
import { getContext, getVocalBuffer, previewOnce } from "./engine";
import { KIND_DSP, type VocalKind } from "./night";
import { useStudio } from "./store";
import type { FxChain } from "./types";

const MINOR = [0, 2, 3, 5, 7, 8, 10];
const MAJOR = [0, 2, 4, 5, 7, 9, 11];
const PHRYG = [0, 1, 3, 5, 7, 8, 10];

function scaleSet(scale: BankCurve["scale"]) {
  if (scale === "major") return MAJOR;
  if (scale === "phrygian") return PHRYG;
  if (scale === "chromatic") return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return MINOR;
}

function snapHz(hz: number, key: number, scale: BankCurve["scale"]) {
  if (hz < 70 || hz > 900) return hz;
  const midi = 69 + 12 * Math.log2(hz / 440);
  const set = scaleSet(scale);
  let best = midi;
  let bestD = 99;
  const base = Math.round(midi);
  for (let d = -12; d <= 12; d++) {
    const n = base + d;
    const pc = ((n - key) % 12 + 12) % 12;
    if (!set.includes(pc)) continue;
    const dist = Math.abs(n - midi);
    if (dist < bestD) {
      bestD = dist;
      best = n;
    }
  }
  return 440 * Math.pow(2, (best - 69) / 12);
}

/**
 * AIVocalProcessor — dual-buffer vocal chain.
 * Autotune snaps to the armed bank scale; analog-mirror keeps the container.
 * Gen 3 mimic is DSP toward measured scalars, never a stored print.
 */
export class AIVocalProcessor {
  async quantize(buffer: AudioBuffer, bpm: number, grid = 16): Promise<AudioBuffer> {
    const ctx = getContext() ?? new AudioContext();
    const sr = buffer.sampleRate;
    const step = 60 / bpm / (grid / 4);
    const hop = Math.max(64, Math.floor(sr * 0.01));
    const ch = buffer.getChannelData(0);
    const energies: number[] = [];
    for (let i = 0; i + hop < ch.length; i += hop) {
      let e = 0;
      for (let j = 0; j < hop; j += 4) e += ch[i + j] * ch[i + j];
      energies.push(e);
    }
    const onsets: number[] = [];
    for (let i = 1; i < energies.length; i++) {
      const flux = energies[i] - energies[i - 1];
      if (flux > 0.002 && energies[i] > 0.001) onsets.push((i * hop) / sr);
    }
    const snapped: Array<{ t: number; src: number }> = [];
    for (const t of onsets) {
      const q = Math.round(t / step) * step;
      snapped.push({ t: Math.max(0, q), src: t });
    }
    const out = ctx.createBuffer(buffer.numberOfChannels, buffer.length, sr);
    const grain = Math.floor(sr * step);
    for (const hit of snapped) {
      const dst = Math.floor(hit.t * sr);
      const src = Math.floor(hit.src * sr);
      for (let c = 0; c < buffer.numberOfChannels; c++) {
        const a = buffer.getChannelData(c);
        const b = out.getChannelData(c);
        for (let i = 0; i < grain; i++) {
          if (dst + i >= b.length || src + i >= a.length) break;
          const w = 0.5 - 0.5 * Math.cos((Math.PI * i) / grain);
          b[dst + i] += a[src + i] * w;
        }
      }
    }
    return out;
  }

  async restore(buffer: AudioBuffer): Promise<AudioBuffer> {
    return this.analogMirror(buffer, null);
  }

  async analogMirror(buffer: AudioBuffer, curve: BankCurve | null): Promise<AudioBuffer> {
    const offline = new OfflineAudioContext(buffer.numberOfChannels, buffer.length, buffer.sampleRate);
    const src = offline.createBufferSource();
    src.buffer = buffer;
    const hp = offline.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = curve?.hp ?? 90;
    const scoop = offline.createBiquadFilter();
    scoop.type = "peaking";
    scoop.frequency.value = curve?.scoopHz ?? 320;
    scoop.Q.value = 0.9;
    scoop.gain.value = curve?.scoopDb ?? -2.5;
    const presence = offline.createBiquadFilter();
    presence.type = "peaking";
    presence.frequency.value = curve?.presenceHz ?? 3200;
    presence.Q.value = 1.1;
    presence.gain.value = curve?.presenceDb ?? 3.5;
    const air = offline.createBiquadFilter();
    air.type = "highshelf";
    air.frequency.value = curve?.airHz ?? 8000;
    air.gain.value = curve?.airDb ?? 1.5;
    const shaper = offline.createWaveShaper();
    const sat = curve?.sat ?? 0.2;
    const curveArr = new Float32Array(1024);
    for (let i = 0; i < 1024; i++) {
      const x = (i / 1023) * 2 - 1;
      curveArr[i] = Math.tanh(x * (1 + sat * 3.2)) / Math.tanh(1 + sat * 3.2);
    }
    shaper.curve = curveArr;
    const comp = offline.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 3.2;
    comp.attack.value = 0.008;
    comp.release.value = 0.12;
    src.connect(hp);
    hp.connect(scoop);
    scoop.connect(presence);
    presence.connect(air);
    air.connect(shaper);
    shaper.connect(comp);
    comp.connect(offline.destination);
    src.start(0);
    return offline.startRendering();
  }

  async autotune(buffer: AudioBuffer, curve: BankCurve | null, amount: number): Promise<AudioBuffer> {
    const sr = buffer.sampleRate;
    const src = buffer.getChannelData(0);
    const hop = 512;
    const win = 1024;
    const pitches: number[] = [];
    for (let i = 0; i + win < src.length; i += hop) {
      pitches.push(this.detectHz(src, i, win, sr));
    }
    const key = curve?.key ?? 0;
    const scale = curve?.scale ?? "minor";
    const out = (getContext() ?? new AudioContext()).createBuffer(buffer.numberOfChannels, buffer.length, sr);
    for (let c = 0; c < buffer.numberOfChannels; c++) {
      const a = buffer.getChannelData(c);
      const b = out.getChannelData(c);
      for (let i = 0; i < a.length; i++) {
        const frame = Math.min(pitches.length - 1, Math.floor(i / hop));
        const hz = pitches[Math.max(0, frame)] ?? 0;
        const target = hz > 0 ? snapHz(hz, key, scale) : hz;
        const ratio = hz > 0 && target > 0 ? 1 + (target / hz - 1) * amount : 1;
        const srcI = i * ratio;
        const i0 = Math.floor(srcI);
        const i1 = Math.min(a.length - 1, i0 + 1);
        const t = srcI - i0;
        const dry = a[i];
        const wet = i0 >= 0 && i0 < a.length ? a[i0] * (1 - t) + a[i1] * t : dry;
        b[i] = dry * (1 - amount) + wet * amount;
      }
    }
    return out;
  }

  detectHz(buf: Float32Array, start: number, n: number, sr: number) {
    let e = 0;
    for (let i = 0; i < n; i++) e += buf[start + i] * buf[start + i];
    if (Math.sqrt(e / n) < 0.012) return 0;
    const minP = Math.floor(sr / 720);
    const maxP = Math.floor(sr / 80);
    let best = 1e9;
    let bestP = minP;
    for (let p = minP; p < maxP; p += 2) {
      let s = 0;
      const m = n - p;
      for (let i = 0; i < m; i += 3) {
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

  async harmony(buffer: AudioBuffer, semitones = [3, 7]): Promise<AudioBuffer> {
    const sr = buffer.sampleRate;
    const offline = new OfflineAudioContext(2, buffer.length, sr);
    const dry = offline.createBufferSource();
    dry.buffer = buffer;
    const dryG = offline.createGain();
    dryG.gain.value = 0.85;
    dry.connect(dryG);
    dryG.connect(offline.destination);
    dry.start(0);
    for (const st of semitones) {
      const rate = Math.pow(2, st / 12);
      const src = offline.createBufferSource();
      src.buffer = buffer;
      src.playbackRate.value = rate;
      const g = offline.createGain();
      g.gain.value = 0.38;
      const pan = offline.createStereoPanner();
      pan.pan.value = st > 5 ? 0.35 : -0.35;
      src.connect(g);
      g.connect(pan);
      pan.connect(offline.destination);
      src.start(0);
    }
    return offline.startRendering();
  }

  async choir(buffer: AudioBuffer): Promise<AudioBuffer> {
    return this.harmony(buffer, [-5, 3, 7, 12]);
  }

  async applyChain(buffer: AudioBuffer, chain: FxChain): Promise<AudioBuffer> {
    const sr = buffer.sampleRate;
    const offline = new OfflineAudioContext(2, buffer.length + Math.floor(sr * 1.2), sr);
    const src = offline.createBufferSource();
    src.buffer = buffer;
    const input = offline.createGain();
    src.connect(input);
    const delay = offline.createDelay(1.2);
    const fb = offline.createGain();
    const mix = offline.createGain();
    const filter = offline.createBiquadFilter();
    filter.type = "lowpass";
    if (chain === "hard-delay") {
      delay.delayTime.value = 0.375 * (60 / 150);
      fb.gain.value = 0.38;
      mix.gain.value = 0.32;
      filter.frequency.value = 4200;
    } else if (chain === "club-verb") {
      delay.delayTime.value = 0.09;
      fb.gain.value = 0.62;
      mix.gain.value = 0.42;
      filter.frequency.value = 5200;
    } else if (chain === "radio") {
      mix.gain.value = 0;
      const hp = offline.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 280;
      const lp = offline.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 3800;
      input.connect(hp);
      hp.connect(lp);
      lp.connect(offline.destination);
    } else if (chain === "trap-space") {
      delay.delayTime.value = 0.5 * (60 / 140);
      fb.gain.value = 0.42;
      mix.gain.value = 0.38;
      filter.frequency.value = 4800;
    } else {
      mix.gain.value = 0;
      fb.gain.value = 0;
      delay.delayTime.value = 0.1;
      filter.frequency.value = 8000;
    }
    input.connect(offline.destination);
    input.connect(delay);
    delay.connect(filter);
    filter.connect(fb);
    fb.connect(delay);
    filter.connect(mix);
    mix.connect(offline.destination);
    src.start(0);
    return offline.startRendering();
  }

  /**
   * DSP stand-in for a recorded take. Formant / grit / grain — not a voice-print clone.
   * Apply only if the user has rapped or spoken into the slot.
   */
  async styleKind(buffer: AudioBuffer, kind: VocalKind): Promise<AudioBuffer> {
    const spec = KIND_DSP[kind];
    if (kind === "choir") return this.choir(buffer);
    if (spec.grains) return this.quantize(buffer, useStudio.getState().bpm, 32);
    if (kind === "opera") {
      const hall = await this.applyChain(buffer, "club-verb");
      return this.paintKind(hall, spec);
    }
    return this.paintKind(buffer, spec);
  }

  async paintKind(buffer: AudioBuffer, spec: (typeof KIND_DSP)[VocalKind]): Promise<AudioBuffer> {
    const offline = new OfflineAudioContext(Math.max(2, buffer.numberOfChannels), buffer.length, buffer.sampleRate);
    const src = offline.createBufferSource();
    src.buffer = buffer;
    const hp = offline.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = spec.hp;
    const scoop = offline.createBiquadFilter();
    scoop.type = "peaking";
    scoop.frequency.value = spec.scoopHz;
    scoop.Q.value = 0.9;
    scoop.gain.value = spec.scoopDb;
    const presence = offline.createBiquadFilter();
    presence.type = "peaking";
    presence.frequency.value = spec.presenceHz;
    presence.Q.value = 1.05;
    presence.gain.value = spec.presenceDb;
    const air = offline.createBiquadFilter();
    air.type = "highshelf";
    air.frequency.value = 7500;
    air.gain.value = spec.airDb;
    const shaper = offline.createWaveShaper();
    const curveArr = new Float32Array(1024);
    for (let i = 0; i < 1024; i++) {
      const x = (i / 1023) * 2 - 1;
      curveArr[i] = Math.tanh(x * (1 + spec.sat * 3.4)) / Math.tanh(1 + spec.sat * 3.4);
    }
    shaper.curve = curveArr;
    const g = offline.createGain();
    g.gain.value = spec.gain;
    src.connect(hp);
    hp.connect(scoop);
    scoop.connect(presence);
    presence.connect(air);
    air.connect(shaper);
    shaper.connect(g);
    g.connect(offline.destination);
    src.start(0);
    return offline.startRendering();
  }

  /**
   * Sit a TTS stand-in in the user's measured F0 / centroid.
   * Scalars only. Refuses when the take was never rapped.
   */
  async formantToward(buffer: AudioBuffer, cap: VoiceCap): Promise<AudioBuffer> {
    if (!mimicAllowed(cap) || cap.f0Hz < 70) return buffer;
    const srcCap = measureVoice(buffer);
    const ratio = pitchRatioToward(srcCap.f0Hz || 160, cap.f0Hz);
    const duration = Math.max(1, Math.floor(buffer.length / ratio));
    const offline = new OfflineAudioContext(Math.max(2, buffer.numberOfChannels), duration, buffer.sampleRate);
    const src = offline.createBufferSource();
    src.buffer = buffer;
    src.playbackRate.value = ratio;
    const presence = offline.createBiquadFilter();
    presence.type = "peaking";
    presence.frequency.value = Math.max(800, Math.min(5200, cap.centroidHz || 2200));
    presence.Q.value = 0.9;
    presence.gain.value = 2.2;
    const g = offline.createGain();
    g.gain.value = 1;
    src.connect(presence);
    presence.connect(g);
    g.connect(offline.destination);
    src.start(0);
    return offline.startRendering();
  }
}

export const vocalProcessor = new AIVocalProcessor();

export async function processCurrent(
  kind: "quantize" | "restore" | "harmony" | "choir" | "fx" | "tune" | "mirror" | "kind",
) {
  const buf = getVocalBuffer();
  if (!buf) return null;
  const s = useStudio.getState();
  const curve = armedCurve(s.recs);
  if (kind === "quantize") return vocalProcessor.quantize(buf, s.bpm);
  if (kind === "restore") return vocalProcessor.restore(buf);
  if (kind === "harmony") return vocalProcessor.harmony(buf);
  if (kind === "choir") return vocalProcessor.choir(buf);
  if (kind === "tune") return vocalProcessor.autotune(buf, curve, s.tuneAmount);
  if (kind === "mirror") return vocalProcessor.analogMirror(buf, curve);
  if (kind === "kind") {
    if (!mimicAllowed(s.voiceCap)) return null;
    const styled = await vocalProcessor.styleKind(buf, s.vocalKind);
    return vocalProcessor.formantToward(styled, s.voiceCap);
  }
  return vocalProcessor.applyChain(buf, s.fxChain);
}

/**
 * Hear a kind on the current take without writing the slot.
 * Refuses unless the user rapped. Scalars only — no print.
 */
export async function auditionKind(kind: VocalKind): Promise<"ok" | "empty" | "rap"> {
  const buf = getVocalBuffer();
  if (!buf) return "empty";
  const s = useStudio.getState();
  if (!mimicAllowed(s.voiceCap)) return "rap";
  const styled = await vocalProcessor.styleKind(buf, kind);
  const toward = await vocalProcessor.formantToward(styled, s.voiceCap);
  await previewOnce(toward, 3.2);
  return "ok";
}
