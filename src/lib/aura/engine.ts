import { tapSteelMaster } from "@/lib/steel/engine";
import { pickRecorderMime } from "./caps";
import { EQ_HZ, useAura } from "./store";
import { fftFromInc, profileForArm, type AuraSource, type BufferInc, type QualityArm } from "./types";

type Handle = {
  ctx: AudioContext;
  master: GainNode;
  analyser: AnalyserNode;
  eq: BiquadFilterNode[];
  dest: MediaStreamAudioDestinationNode;
  mute: GainNode;
  steelTap: boolean;
};

let handle: Handle | null = null;
let extras: Array<AudioNode | OscillatorNode> = [];
let demoTimer = 0;
let fileBuffer: AudioBuffer | null = null;
let fileSource: AudioBufferSourceNode | null = null;
let micNode: MediaStreamAudioSourceNode | null = null;
let micStream: MediaStream | null = null;
let recorder: MediaRecorder | null = null;
let recChunks: Blob[] = [];
let recTick = 0;

function buildEq(ctx: AudioContext, input: AudioNode) {
  const bands: BiquadFilterNode[] = [];
  let prev: AudioNode = input;
  for (const hz of EQ_HZ) {
    const f = ctx.createBiquadFilter();
    f.type = "peaking";
    f.frequency.value = hz;
    f.Q.value = 1.1;
    f.gain.value = 0;
    prev.connect(f);
    bands.push(f);
    prev = f;
  }
  return { bands, out: prev };
}

async function ensureCtx(preferSteel: boolean): Promise<Handle> {
  if (preferSteel) {
    const tap = tapSteelMaster();
    if (tap) {
      if (handle && !handle.steelTap) await closeHandle();
      if (handle?.steelTap && handle.ctx === tap.ctx) return handle;
      const analyser = tap.ctx.createAnalyser();
      analyser.fftSize = fftFromInc(useAura.getState().inc);
      analyser.smoothingTimeConstant = 0.62;
      const mute = tap.ctx.createGain();
      mute.gain.value = 1;
      const dest = tap.ctx.createMediaStreamDestination();
      const dummy = tap.ctx.createGain();
      dummy.gain.value = 1;
      const { bands, out } = buildEq(tap.ctx, dummy);
      tap.master.connect(analyser);
      tap.master.connect(dest);
      handle = {
        ctx: tap.ctx,
        master: dummy,
        analyser,
        eq: bands,
        dest,
        mute,
        steelTap: true,
      };
      void dummy;
      void out;
      return handle;
    }
  }
  if (handle && !handle.steelTap && handle.ctx.state !== "closed") return handle;
  if (handle) await closeHandle();
  const ctx = new AudioContext({ latencyHint: "interactive", sampleRate: 44100 });
  const master = ctx.createGain();
  master.gain.value = useAura.getState().muted ? 0 : useAura.getState().volume ** 2;
  const mute = ctx.createGain();
  mute.gain.value = 1;
  const { bands, out } = buildEq(ctx, master);
  const analyser = ctx.createAnalyser();
  analyser.fftSize = fftFromInc(useAura.getState().inc);
  analyser.smoothingTimeConstant = 0.62;
  const dest = ctx.createMediaStreamDestination();
  out.connect(analyser);
  analyser.connect(mute);
  mute.connect(ctx.destination);
  mute.connect(dest);
  handle = { ctx, master, analyser, eq: bands, dest, mute, steelTap: false };
  await ctx.resume();
  return handle;
}

async function closeHandle() {
  stopDemo();
  stopMic();
  stopFile();
  if (handle && !handle.steelTap) {
    try {
      await handle.ctx.close();
    } catch {
      /* closed */
    }
  }
  handle = null;
}

function stopDemo() {
  if (demoTimer) {
    window.clearInterval(demoTimer);
    demoTimer = 0;
  }
  for (const n of extras) {
    try {
      if ("stop" in n && typeof (n as OscillatorNode).stop === "function") {
        (n as OscillatorNode).stop();
      }
      n.disconnect();
    } catch {
      /* already */
    }
  }
  extras = [];
}

function stopFile() {
  try {
    fileSource?.stop();
  } catch {
    /* already */
  }
  fileSource = null;
}

function stopMic() {
  micNode?.disconnect();
  micNode = null;
  micStream?.getTracks().forEach((t) => t.stop());
  micStream = null;
}

function pulse(ctx: AudioContext, dest: AudioNode, when: number) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(86, when);
  osc.frequency.exponentialRampToValueAtTime(38, when + 0.14);
  g.gain.setValueAtTime(0.7, when);
  g.gain.exponentialRampToValueAtTime(0.001, when + 0.22);
  osc.connect(g);
  g.connect(dest);
  osc.start(when);
  osc.stop(when + 0.24);

  const hat = ctx.createOscillator();
  const hg = ctx.createGain();
  hat.type = "square";
  hat.frequency.value = 2400 + Math.random() * 800;
  hg.gain.setValueAtTime(0.045, when + 0.25);
  hg.gain.exponentialRampToValueAtTime(0.001, when + 0.32);
  hat.connect(hg);
  hg.connect(dest);
  hat.start(when + 0.25);
  hat.stop(when + 0.34);
}

function startDemo(h: Handle) {
  stopDemo();
  const pad = h.ctx.createOscillator();
  const pg = h.ctx.createGain();
  pad.type = "sawtooth";
  pad.frequency.value = 110;
  pg.gain.value = 0.04;
  const lpf = h.ctx.createBiquadFilter();
  lpf.type = "lowpass";
  lpf.frequency.value = 420;
  pad.connect(lpf);
  lpf.connect(pg);
  pg.connect(h.master);
  pad.start();
  extras.push(pad, pg, lpf);

  const pad2 = h.ctx.createOscillator();
  pad2.type = "triangle";
  pad2.frequency.value = 164.8;
  const pg2 = h.ctx.createGain();
  pg2.gain.value = 0.03;
  pad2.connect(pg2);
  pg2.connect(h.master);
  pad2.start();
  extras.push(pad2, pg2);

  const beat = 0.5;
  const kick = () => {
    if (!handle) return;
    const t = handle.ctx.currentTime;
    pulse(handle.ctx, handle.master, t);
  };
  kick();
  demoTimer = window.setInterval(kick, beat * 1000);
}

export function applyEqGains(gains: number[]) {
  if (!handle) return;
  handle.eq.forEach((f, i) => {
    f.gain.setTargetAtTime(gains[i] ?? 0, handle!.ctx.currentTime, 0.03);
  });
}

export function setFft(inc: BufferInc) {
  if (handle) handle.analyser.fftSize = fftFromInc(inc);
}

export function setVolume(v: number, muted: boolean) {
  if (!handle || handle.steelTap) return;
  handle.master.gain.setTargetAtTime(muted ? 0 : v ** 2, handle.ctx.currentTime, 0.02);
}

export function getAnalyser() {
  return handle?.analyser ?? null;
}

export async function startSource(source: AuraSource, file?: File) {
  const h = await ensureCtx(source === "steel");
  stopDemo();
  stopFile();
  if (source !== "mic") stopMic();
  applyEqGains(useAura.getState().eq);
  setVolume(useAura.getState().volume, useAura.getState().muted);
  setFft(useAura.getState().inc);

  if (source === "demo") {
    startDemo(h);
    useAura.getState().set({ playing: true, source, error: null, fileName: null });
    return;
  }
  if (source === "steel") {
    if (!tapSteelMaster()) {
      useAura.getState().set({
        playing: false,
        error: "Arm the STEEL kernel first, then tap it from AURA.",
      });
      return;
    }
    useAura.getState().set({ playing: true, source, error: null });
    return;
  }
  if (source === "mic") {
    try {
      micStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      });
      micNode = h.ctx.createMediaStreamSource(micStream);
      micNode.connect(h.master);
      useAura.getState().set({ playing: true, source, error: null, fileName: null });
    } catch {
      useAura.getState().set({ playing: false, error: "Microphone blocked — use demo or a file." });
    }
    return;
  }
  if (source === "file" && file) {
    const buf = await file.arrayBuffer();
    fileBuffer = await h.ctx.decodeAudioData(buf.slice(0));
    const src = h.ctx.createBufferSource();
    src.buffer = fileBuffer;
    src.loop = true;
    src.connect(h.master);
    src.start();
    fileSource = src;
    useAura.getState().set({ playing: true, source, error: null, fileName: file.name });
  }
}

export async function stopSource() {
  stopDemo();
  stopFile();
  stopMic();
  if (handle && !handle.steelTap) {
    handle.master.gain.setTargetAtTime(0, handle.ctx.currentTime, 0.02);
  }
  useAura.getState().set({ playing: false });
}

export async function togglePlay() {
  const s = useAura.getState();
  if (s.playing) await stopSource();
  else await startSource(s.source);
}

export function readAnalyser(freq: Uint8Array, time: Uint8Array) {
  if (!handle) return false;
  handle.analyser.getByteFrequencyData(freq as Uint8Array<ArrayBuffer>);
  handle.analyser.getByteTimeDomainData(time as Uint8Array<ArrayBuffer>);
  return true;
}

export async function startCapture(canvas: HTMLCanvasElement, arm: QualityArm, maxTexture: number) {
  if (!handle) throw new Error("Start a source first");
  const p = profileForArm(arm, maxTexture);
  const fps = p.fps;
  const stream = canvas.captureStream(fps);
  const audio = handle.dest.stream.getAudioTracks();
  const mixed = new MediaStream([...stream.getVideoTracks(), ...audio]);
  const mime = pickRecorderMime();
  recChunks = [];
  recorder = new MediaRecorder(mixed, {
    mimeType: mime,
    audioBitsPerSecond: 320_000,
    videoBitsPerSecond: arm === 89 ? 12_000_000 : arm === 64 ? 8_000_000 : 4_000_000,
  });
  recorder.ondataavailable = (ev) => {
    if (ev.data.size) recChunks.push(ev.data);
  };
  recorder.start(250);
  useAura.getState().set({ recording: true, recSec: 0 });
  recTick = window.setInterval(() => {
    useAura.getState().set({ recSec: useAura.getState().recSec + 1 });
  }, 1000);
}

export async function stopCapture(): Promise<Blob | null> {
  if (!recorder) return null;
  const rec = recorder;
  recorder = null;
  window.clearInterval(recTick);
  const blob = await new Promise<Blob>((resolve) => {
    rec.onstop = () => resolve(new Blob(recChunks, { type: rec.mimeType || "video/webm" }));
    rec.stop();
  });
  useAura.getState().set({ recording: false });
  return blob;
}

export async function teardownAura() {
  if (recorder) await stopCapture();
  await closeHandle();
}
