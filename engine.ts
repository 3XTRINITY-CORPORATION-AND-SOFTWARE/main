import { useSteel } from "./store";

type WorkletHandle = {
  ctx: AudioContext;
  node: AudioWorkletNode;
  master: GainNode;
  dest: MediaStreamAudioDestinationNode;
  mic: MediaStreamAudioSourceNode | null;
  stream: MediaStream | null;
  destOn: boolean;
};

let handle: WorkletHandle | null = null;

function addonFlag(id: string) {
  return useSteel.getState().addons[id] ? 1 : 0;
}

export function currentParams() {
  const s = useSteel.getState();
  return {
    inGain: s.inGain,
    outGain: s.outGain,
    master: s.master,
    hpf: addonFlag("hpf"),
    hpHz: s.hpHz,
    eqLo: s.eqLo,
    eqMid: s.eqMid,
    eqHi: s.eqHi,
    sat: addonFlag("sat"),
    satAmt: s.satAmt,
    comp: addonFlag("comp"),
    thresh: s.thresh,
    limit: addonFlag("limit"),
    synth: addonFlag("synth"),
    transient: addonFlag("transient"),
    transAmt: s.transAmt,
  };
}

export function pushParams() {
  handle?.node.port.postMessage({ type: "params", params: currentParams() });
}

export function sendNote(on: boolean, note: number, vel = 0.8) {
  handle?.node.port.postMessage({ type: on ? "noteOn" : "noteOff", note, vel });
}

export async function playNote(on: boolean, note: number, vel = 0.85) {
  if (!useSteel.getState().armed) {
    if (!on) return;
    try {
      await armKernel();
    } catch {
      return;
    }
    if (!useSteel.getState().armed) return;
  }
  sendNote(on, note, vel);
}

export function panic() {
  handle?.node.port.postMessage({ type: "panic" });
}

export function getWebStream() {
  return handle?.dest.stream ?? null;
}

export function setWebTap(on: boolean) {
  if (!handle) {
    useSteel.getState().patch({ webOut: on });
    return;
  }
  if (on && !handle.destOn) {
    handle.master.connect(handle.dest);
    handle.destOn = true;
  } else if (!on && handle.destOn) {
    try {
      handle.master.disconnect(handle.dest);
    } catch {
      /* already disconnected */
    }
    handle.destOn = false;
  }
  useSteel.getState().patch({ webOut: on });
}

async function tryMic(ctx: AudioContext, node: AudioWorkletNode) {
  if (!navigator.mediaDevices?.getUserMedia) return { mic: null, stream: null };
  try {
    const stream = await Promise.race([
      navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          channelCount: 1,
        },
      }),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("mic-timeout")), 900);
      }),
    ]);
    const mic = ctx.createMediaStreamSource(stream);
    mic.connect(node);
    return { mic, stream };
  } catch {
    return { mic: null, stream: null };
  }
}

export async function armKernel() {
  const { sampleRate, kernel, webOut, patch } = useSteel.getState();
  if (handle) await disarmKernel();

  const ctx = new AudioContext({
    sampleRate,
    latencyHint: "interactive",
  });
  await ctx.audioWorklet.addModule(`/worklets/steel-kernel.js?k=${encodeURIComponent(kernel)}`);
  const node = new AudioWorkletNode(ctx, "steel-kernel", {
    numberOfInputs: 1,
    numberOfOutputs: 1,
    outputChannelCount: [2],
  });
  const master = ctx.createGain();
  master.gain.value = 1;
  const dest = ctx.createMediaStreamDestination();
  node.connect(master);
  master.connect(ctx.destination);
  if (webOut) master.connect(dest);

  node.port.onmessage = (ev: MessageEvent) => {
    const data = ev.data as { type?: string; peak?: number; rms?: number; voices?: number };
    if (data?.type !== "meter") return;
    useSteel.getState().patch({
      peak: data.peak ?? 0,
      rms: data.rms ?? 0,
      voices: data.voices ?? 0,
      cpu: Math.min(100, (data.peak ?? 0) * 40 + (data.voices ?? 0) * 3),
    });
  };

  const { mic, stream } = await tryMic(ctx, node);

  handle = { ctx, node, master, dest, mic, stream, destOn: webOut };
  node.port.postMessage({ type: "params", params: currentParams() });
  await ctx.resume();
  patch({
    armed: true,
    running: ctx.state === "running",
    error: null,
    inputLive: Boolean(stream),
  });
}

export async function disarmKernel() {
  if (!handle) {
    useSteel.getState().patch({ armed: false, running: false, inputLive: false });
    return;
  }
  try {
    handle.node.port.onmessage = null;
    handle.node.disconnect();
    handle.master.disconnect();
    handle.mic?.disconnect();
    handle.stream?.getTracks().forEach((t) => t.stop());
    await handle.ctx.close();
  } catch {
    /* already closed */
  }
  handle = null;
  useSteel.getState().patch({
    armed: false,
    running: false,
    peak: 0,
    rms: 0,
    voices: 0,
    cpu: 0,
    inputLive: false,
  });
}

export async function toggleKernel() {
  if (useSteel.getState().armed) await disarmKernel();
  else await armKernel();
}

export function tapSteelMaster(): { ctx: AudioContext; master: GainNode } | null {
  if (!handle) return null;
  return { ctx: handle.ctx, master: handle.master };
}

export function measuredLatencyMs() {
  if (!handle) return null;
  const { ctx } = handle;
  const base = ctx.baseLatency || 0;
  const out = ctx.outputLatency || 0;
  return (base + out) * 1000;
}
