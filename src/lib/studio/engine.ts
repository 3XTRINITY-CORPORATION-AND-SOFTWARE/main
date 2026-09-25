import { flattenPattern, PATTERNS } from "./patterns";
import { useStudio } from "./store";
import type { FxChain, Genre, MeterFrame, Translate } from "./types";
import { CHANNELS, GENRE_META, STEPS } from "./types";
import { bufferToWav, decodeAudio } from "./wav";
import { policyFor } from "@/lib/signal/probe";
import { armedCurve } from "./banks";
import { EMPTY_CAP, measureVoice } from "./caps";
import { KIND_DSP, NIGHT_STANDIN_URL } from "./night";

type Handle = {
  ctx: AudioContext;
  node: AudioWorkletNode;
  master: GainNode;
  vocalIn: GainNode;
  beatGain: GainNode;
  dest: MediaStreamAudioDestinationNode;
  analyser: AnalyserNode;
  freq: Uint8Array<ArrayBuffer>;
  wave: Uint8Array<ArrayBuffer>;
  mic: MediaStreamAudioSourceNode | null;
  micStream: MediaStream | null;
  vocalSource: AudioBufferSourceNode | null;
  beatSource: AudioBufferSourceNode | null;
  recDestOn: boolean;
};

let handle: Handle | null = null;
let vocalBuffer: AudioBuffer | null = null;
let beatBuffer: AudioBuffer | null = null;
let rec: MediaRecorder | null = null;
let recChunks: Blob[] = [];
let previewSrc: AudioBufferSourceNode | null = null;

const GENRE_IDX: Record<Genre, number> = {
  hardstyle: 0,
  rawstyle: 1,
  techno: 2,
  rap: 3,
  trap: 4,
};

const TRANSLATE_IDX: Record<Translate, number> = { phone: 1, jbl: 2, festival: 0 };

function fxParams(chain: FxChain) {
  switch (chain) {
    case "hard-delay":
      return { fxMix: 0.32, fxFb: 0.38 };
    case "club-verb":
      return { fxMix: 0.42, fxFb: 0.55 };
    case "radio":
      return { fxMix: 0.12, fxFb: 0.18 };
    case "trap-space":
      return { fxMix: 0.36, fxFb: 0.48 };
    default:
      return { fxMix: 0.08, fxFb: 0.12 };
  }
}

function mixArrays() {
  const s = useStudio.getState();
  const anySolo = CHANNELS.some((id) => s.channels[id].solo);
  const gain = new Float32Array(6);
  const pan = new Float32Array(6);
  const mute = new Float32Array(6);
  const send = new Float32Array(6);
  CHANNELS.forEach((id, i) => {
    const ch = s.channels[id];
    const silenced = ch.mute || (anySolo && !ch.solo);
    gain[i] = silenced ? 0 : ch.gain;
    pan[i] = ch.pan;
    mute[i] = silenced ? 1 : 0;
    send[i] = ch.send;
  });
  return { gain, pan, mute, send };
}

function patternArrays() {
  const s = useStudio.getState();
  const pattern = new Float32Array(6 * STEPS);
  CHANNELS.forEach((id, t) => {
    for (let i = 0; i < STEPS; i++) pattern[t * STEPS + i] = s.steps[id][i] ?? 0;
  });
  return {
    pattern,
    bassMidi: Float32Array.from(s.bassMidi),
    leadMidi: Float32Array.from(s.leadMidi),
  };
}

function meltGain() {
  const s = useStudio.getState();
  const armed = Object.values(s.recs).find((r) => r.armed && r.loaded);
  return armed?.gain ?? 0.86;
}

export function currentParams() {
  const s = useStudio.getState();
  const fx = fxParams(s.fxChain);
  const curve = armedCurve(s.recs);
  const scaleIdx = curve?.scale === "major" ? 1 : curve?.scale === "chromatic" ? 2 : curve?.scale === "phrygian" ? 3 : 0;
  return {
    bpm: s.bpm,
    swing: s.swing,
    genre: GENRE_IDX[s.genre],
    master: s.master,
    drive: s.drive,
    glue: s.glue,
    ceiling: s.ceiling,
    width: s.width,
    centerLock: s.centerLock ? 1 : 0,
    translate: TRANSLATE_IDX[s.translate],
    tuneAmt: s.tuneAmount,
    restore: s.restoreOn ? 1 : 0,
    inGain: 1,
    vocalHpf: curve?.hp ?? 80,
    formant: curve?.formant ?? 1,
    retune: curve?.retune ?? 0.05,
    scoopHz: curve?.scoopHz ?? 320,
    scoopDb: curve?.scoopDb ?? -2,
    presenceHz: curve?.presenceHz ?? 3200,
    presenceDb: curve?.presenceDb ?? 3,
    airHz: curve?.airHz ?? 8000,
    airDb: curve?.airDb ?? 1.2,
    bankSat: curve?.sat ?? 0.2,
    bankDelay: curve?.delay ?? 0.12,
    bankSpace: curve?.space ?? 0.2,
    melt: meltGain(),
    key: curve?.key ?? 0,
    scaleIdx,
    ...fx,
  };
}

export function pushAll() {
  if (!handle) return;
  handle.node.port.postMessage({ type: "params", params: currentParams() });
  handle.node.port.postMessage({ type: "mix", ...mixArrays() });
  handle.node.port.postMessage({ type: "pattern", ...patternArrays() });
}

export function getAnalyser() {
  if (!handle) return null;
  return { analyser: handle.analyser, freq: handle.freq, wave: handle.wave };
}

export function getContext() {
  return handle?.ctx ?? null;
}

function applyMeter(data: MeterFrame) {
  useStudio.getState().patch({
    peak: data.peak,
    rms: data.rms,
    voices: data.voices,
    step: data.step,
    cpu: data.cpu,
    latency: data.latency,
    signal: data.signal,
    need: data.need,
    velocity: data.velocity,
    mid: data.mid,
    side: data.side,
    pitch: data.pitch,
  });
}

export class AudioEngine {
  async arm() {
    return armEngine();
  }
  async disarm() {
    return disarmEngine();
  }
  play() {
    return play();
  }
  stop() {
    return stop();
  }
  note(on: boolean, midi: number, vel?: number) {
    return sendNote(on, midi, vel);
  }
}

export const audioEngine = new AudioEngine();

export async function armEngine() {
  if (handle && handle.ctx.state !== "closed") {
    if (handle.ctx.state === "suspended") await handle.ctx.resume();
    useStudio.getState().patch({ armed: true, error: null });
    return;
  }
  if (handle) await disarmEngine();
  const sampleRate = 48000;
  const policy = policyFor(useStudio.getState().path);
  const ctx = new AudioContext({ latencyHint: policy.latencyHint, sampleRate });
  void ctx.resume();
  await ctx.audioWorklet.addModule(`/worklets/steel-studio.js?v=3`);
  const node = new AudioWorkletNode(ctx, "steel-studio", {
    numberOfInputs: 1,
    numberOfOutputs: 1,
    outputChannelCount: [2],
  });
  const vocalIn = ctx.createGain();
  vocalIn.gain.value = 1;
  vocalIn.connect(node);
  const beatGain = ctx.createGain();
  beatGain.gain.value = 0.72;
  const master = ctx.createGain();
  master.gain.value = 1;
  const dest = ctx.createMediaStreamDestination();
  const analyser = ctx.createAnalyser();
  analyser.fftSize = policy.fftSize;
  analyser.smoothingTimeConstant = 0.62;
  node.connect(master);
  beatGain.connect(master);
  master.connect(ctx.destination);
  master.connect(analyser);
  master.connect(dest);
  node.port.onmessage = (ev: MessageEvent) => {
    const data = ev.data as MeterFrame & { type?: string };
    if (data?.type !== "meter") return;
    applyMeter(data);
  };
  handle = {
    ctx,
    node,
    master,
    vocalIn,
    beatGain,
    dest,
    analyser,
    freq: new Uint8Array(analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>,
    wave: new Uint8Array(analyser.fftSize) as Uint8Array<ArrayBuffer>,
    mic: null,
    micStream: null,
    vocalSource: null,
    beatSource: null,
    recDestOn: true,
  };
  useStudio.getState().patch({ armed: true, sampleRate: ctx.sampleRate, error: null });
  pushAll();
  await ctx.resume();
}

export async function disarmEngine() {
  stop();
  await stopMic();
  if (!handle) {
    useStudio.getState().patch({ armed: false, playing: false });
    return;
  }
  try {
    handle.node.port.postMessage({ type: "panic" });
    handle.node.disconnect();
    handle.master.disconnect();
    await handle.ctx.close();
  } catch {
    /* already closed */
  }
  handle = null;
  useStudio.getState().patch({ armed: false, playing: false, inputLive: false, peak: 0, rms: 0 });
}

export async function play() {
  const s = useStudio.getState();
  if (!s.armed) {
    try {
      useStudio.getState().patch({ processNote: "arm" });
      await armEngine();
    } catch (err) {
      const message = err instanceof Error ? err.message : "engine";
      useStudio.getState().patch({ error: message, processNote: null });
      throw err;
    }
  }
  if (!handle) return;
  if (handle.ctx.state === "suspended") await handle.ctx.resume();
  pushAll();
  handle.node.port.postMessage({ type: "play", on: true });
  restartBuffers(true);
  useStudio.getState().patch({ playing: true, error: null, processNote: null });
}

export function stop() {
  handle?.node.port.postMessage({ type: "play", on: false });
  if (handle?.vocalSource) {
    try {
      handle.vocalSource.stop();
    } catch {
      /* ended */
    }
    handle.vocalSource = null;
  }
  if (handle?.beatSource) {
    try {
      handle.beatSource.stop();
    } catch {
      /* ended */
    }
    handle.beatSource = null;
  }
  useStudio.getState().patch({ playing: false });
}

export async function togglePlay() {
  if (useStudio.getState().playing) stop();
  else await play();
}

export function sendNote(on: boolean, note: number, vel = 0.85) {
  const run = async () => {
    if (!useStudio.getState().armed) {
      if (!on) return;
      await armEngine();
    }
    handle?.node.port.postMessage({ type: on ? "noteOn" : "noteOff", note, vel });
    if (on) {
      const names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      useStudio.getState().patch({ lastNote: `${names[note % 12]}${Math.floor(note / 12) - 1}` });
    }
  };
  void run();
}

export function loadGenre(genre: Genre) {
  const p = PATTERNS[genre];
  const meta = GENRE_META[genre];
  useStudio.getState().patch({
    genre,
    bpm: p.bpm,
    swing: p.swing,
    drive: meta.drive,
    steps: p.steps,
    bassMidi: p.bassMidi,
    leadMidi: p.leadMidi,
  });
  const flat = flattenPattern(p);
  handle?.node.port.postMessage({ type: "pattern", ...flat });
  pushAll();
}

function restartBuffers(loop: boolean) {
  if (!handle) return;
  if (handle.vocalSource) {
    try {
      handle.vocalSource.stop();
    } catch {
      /* */
    }
    handle.vocalSource = null;
  }
  if (handle.beatSource) {
    try {
      handle.beatSource.stop();
    } catch {
      /* */
    }
    handle.beatSource = null;
  }
  if (vocalBuffer) {
    const src = handle.ctx.createBufferSource();
    src.buffer = vocalBuffer;
    src.loop = loop;
    src.connect(handle.vocalIn);
    src.start();
    handle.vocalSource = src;
  }
  if (beatBuffer) {
    const src = handle.ctx.createBufferSource();
    src.buffer = beatBuffer;
    src.loop = loop;
    src.connect(handle.beatGain);
    src.start();
    handle.beatSource = src;
  }
}

export async function setVocalBuffer(buf: AudioBuffer, name: string, opts?: { measure?: boolean }) {
  vocalBuffer = buf;
  const measure = opts?.measure !== false && !name.endsWith("-tts") && !name.endsWith("-kind");
  if (measure) {
    const cap = measureVoice(buf);
    useStudio.getState().patch({ vocalName: name, voiceCap: cap, takeOwned: cap.hasTake });
  } else {
    useStudio.getState().patch({ vocalName: name });
  }
  if (useStudio.getState().playing) restartBuffers(true);
}

export async function setBeatBuffer(buf: AudioBuffer, name: string) {
  beatBuffer = buf;
  useStudio.getState().patch({ beatName: name });
  if (useStudio.getState().playing) restartBuffers(true);
}

export async function loadNightStandin() {
  if (!handle) await armEngine();
  if (!handle) throw new Error("engine");
  const res = await fetch(NIGHT_STANDIN_URL);
  if (!res.ok) throw new Error("standin");
  const ab = await res.arrayBuffer();
  const buf = await handle.ctx.decodeAudioData(ab.slice(0));
  await setBeatBuffer(buf, "night_backvox_standin");
  const s = useStudio.getState();
  const whisper = KIND_DSP.whisper.gain;
  s.setChannel("vocal", { gain: Math.min(s.channels.vocal.gain, whisper) });
  s.patch({
    nightLane: true,
    vocalKind: "whisper",
    dirtBias: Math.min(s.dirtBias, 0.35),
    width: 0.48,
  });
  pushAll();
}

export async function loadVocalFile(file: File) {
  if (!handle) await armEngine();
  if (!handle) throw new Error("engine");
  const buf = await decodeAudio(file, handle.ctx);
  await setVocalBuffer(buf, file.name, { measure: true });
}

export async function loadBeatFile(file: File) {
  if (!handle) await armEngine();
  if (!handle) throw new Error("engine");
  const buf = await decodeAudio(file, handle.ctx);
  await setBeatBuffer(buf, file.name);
}

export async function startMic() {
  if (!handle) await armEngine();
  if (!handle) return;
  if (handle.mic) return;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        channelCount: 1,
      },
    });
    const mic = handle.ctx.createMediaStreamSource(stream);
    mic.connect(handle.vocalIn);
    handle.mic = mic;
    handle.micStream = stream;
    const track = stream.getAudioTracks()[0];
    const settings = track?.getSettings() ?? {};
    const noiseFloor = await estimateNoise(stream);
    const restore = noiseFloor > 0.02 || (settings.sampleRate ?? 48000) < 44100;
    useStudio.getState().patch({
      inputLive: true,
      restoreOn: restore || useStudio.getState().restoreOn,
      mic: {
        label: track?.label || "Microphone",
        noiseFloor,
        sampleRate: settings.sampleRate ?? handle.ctx.sampleRate,
        channels: settings.channelCount ?? 1,
        restore,
      },
    });
    pushAll();
  } catch {
    useStudio.getState().patch({ inputLive: false, error: "mic" });
  }
}

export async function stopMic() {
  if (!handle) return;
  if (handle.mic) {
    try {
      handle.mic.disconnect();
    } catch {
      /* */
    }
    handle.mic = null;
  }
  handle.micStream?.getTracks().forEach((t) => t.stop());
  handle.micStream = null;
  useStudio.getState().patch({ inputLive: false });
}

async function estimateNoise(stream: MediaStream): Promise<number> {
  try {
    const ctx = new AudioContext();
    const src = ctx.createMediaStreamSource(stream);
    const an = ctx.createAnalyser();
    an.fftSize = 512;
    src.connect(an);
    await new Promise((r) => setTimeout(r, 180));
    const data = new Float32Array(an.fftSize) as Float32Array<ArrayBuffer>;
    an.getFloatTimeDomainData(data);
    let e = 0;
    for (let i = 0; i < data.length; i++) e += data[i] * data[i];
    src.disconnect();
    await ctx.close();
    return Math.sqrt(e / data.length);
  } catch {
    return 0.03;
  }
}

export async function toggleVoiceRec(): Promise<"start" | "stop" | "idle"> {
  if (!handle) await armEngine();
  if (!handle) return "idle";
  if (rec && rec.state === "recording") {
    rec.stop();
    return "stop";
  }
  const dest = handle.ctx.createMediaStreamDestination();
  handle.vocalIn.connect(dest);
  const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
    ? "audio/webm;codecs=opus"
    : MediaRecorder.isTypeSupported("audio/webm")
      ? "audio/webm"
      : "";
  recChunks = [];
  rec = new MediaRecorder(dest.stream, mime ? { mimeType: mime } : undefined);
  rec.ondataavailable = (e) => {
    if (e.data.size) recChunks.push(e.data);
  };
  rec.onstop = async () => {
    try {
      handle?.vocalIn.disconnect(dest);
    } catch {
      /* */
    }
    const blob = new Blob(recChunks, { type: rec?.mimeType || "audio/webm" });
    rec = null;
    if (!handle || blob.size < 64) {
      useStudio.getState().patch({ recording: false });
      return;
    }
    const buf = await handle.ctx.decodeAudioData(await blob.arrayBuffer());
    await setVocalBuffer(buf, "take", { measure: true });
    useStudio.getState().patch({ recording: false });
  };
  rec.start();
  useStudio.getState().patch({ recording: true });
  return "start";
}

export async function bounceWav(seconds = 8): Promise<Blob | null> {
  try {
    const s = useStudio.getState();
    const sr = handle?.ctx.sampleRate ?? 48000;
    const offline = new OfflineAudioContext(2, Math.floor(sr * seconds), sr);
    await offline.audioWorklet.addModule(`/worklets/steel-studio.js?v=3`);
    const node = new AudioWorkletNode(offline, "steel-studio", {
      numberOfInputs: 1,
      numberOfOutputs: 1,
      outputChannelCount: [2],
    });
    node.connect(offline.destination);
    node.port.postMessage({ type: "params", params: currentParams() });
    node.port.postMessage({ type: "mix", ...mixArrays() });
    node.port.postMessage({ type: "pattern", ...patternArrays() });
    node.port.postMessage({ type: "play", on: true });
    if (vocalBuffer) {
      const src = offline.createBufferSource();
      src.buffer = vocalBuffer;
      src.connect(node);
      src.start(0);
    }
    if (beatBuffer) {
      const src = offline.createBufferSource();
      src.buffer = beatBuffer;
      src.connect(offline.destination);
      src.start(0);
    }
    const rendered = await offline.startRendering();
    void s;
    return bufferToWav(rendered);
  } catch {
    return null;
  }
}

export function getVocalBuffer() {
  return vocalBuffer;
}

/** Play a styled copy through master. Does not replace the take. Not a print. */
export async function previewOnce(buf: AudioBuffer, seconds = 3.2) {
  if (!handle) await armEngine();
  if (!handle) return;
  if (handle.ctx.state === "suspended") await handle.ctx.resume();
  try {
    previewSrc?.stop();
  } catch {
    /* ended */
  }
  const src = handle.ctx.createBufferSource();
  src.buffer = buf;
  const g = handle.ctx.createGain();
  g.gain.value = 0.92;
  src.connect(g);
  g.connect(handle.master);
  const dur = Math.min(seconds, buf.duration);
  src.start();
  src.stop(handle.ctx.currentTime + dur);
  previewSrc = src;
}

export function captureVoiceCap() {
  if (!vocalBuffer) {
    useStudio.getState().patch({ voiceCap: EMPTY_CAP, takeOwned: false });
    return EMPTY_CAP;
  }
  const cap = measureVoice(vocalBuffer);
  useStudio.getState().patch({ voiceCap: cap, takeOwned: cap.hasTake });
  return cap;
}

export async function applyProcessedVocal(buf: AudioBuffer, name: string) {
  await setVocalBuffer(buf, name, { measure: false });
}

export function onVisibility() {
  if (document.visibilityState === "visible" && handle?.ctx.state === "suspended") {
    void handle.ctx.resume();
  }
}
