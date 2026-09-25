import { profileForArm, type CapsReport, type QualityArm } from "./types";

function gpuInfo() {
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl2") ||
    canvas.getContext("webgl") ||
    canvas.getContext("experimental-webgl");
  if (!gl || !(gl instanceof WebGLRenderingContext || (typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext))) {
    return { gpu: "No WebGL", maxTexture: 0, webgl: false };
  }
  const debug = gl.getExtension("WEBGL_debug_renderer_info");
  const gpu = debug
    ? String(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) || "GPU")
    : String(gl.getParameter(gl.RENDERER) || "GPU");
  const maxTexture = Number(gl.getParameter(gl.MAX_TEXTURE_SIZE) || 0);
  return { gpu, maxTexture, webgl: true };
}

function pickMime() {
  const candidates = [
    "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
    "video/mp4",
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
  ];
  for (const m of candidates) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(m)) return m;
  }
  return "video/webm";
}

function bestArm(maxTexture: number, refresh: number): { w: number; h: number; fps: number; arm: QualityArm } {
  const order: QualityArm[] = [89, 64, 32, 528];
  for (const arm of order) {
    const p = profileForArm(arm, maxTexture);
    if (p.clamped) continue;
    if (p.w * p.h > maxTexture * maxTexture * 0.25 && arm === 89) continue;
    return { w: p.w, h: p.h, fps: Math.min(p.fps, refresh || 60), arm };
  }
  return { w: 960, h: 528, fps: 30, arm: 528 };
}

export function probeCaps(): CapsReport {
  const { gpu, maxTexture, webgl } = gpuInfo();
  const refresh = Math.round((window.screen as Screen & { refreshRate?: number }).refreshRate || 60);
  const AudioCtx = window.AudioContext;
  let audioRate = 44100;
  let audioLatencyMs = 0;
  let maxChannels = 2;
  if (AudioCtx) {
    try {
      const ctx = new AudioCtx({ latencyHint: "interactive", sampleRate: 44100 });
      audioRate = ctx.sampleRate;
      audioLatencyMs = ((ctx.baseLatency || 0) + (ctx.outputLatency || 0)) * 1000;
      maxChannels = ctx.destination.maxChannelCount || 2;
      void ctx.close();
    } catch {
      /* keep defaults */
    }
  }
  const recordCeiling = bestArm(maxTexture, refresh);
  const imax =
    maxTexture >= 8192 && refresh >= 120
      ? "IMAX-class 8000p / 164 fps is not available in a browser. This GPU could feed a large canvas; capture still tops out at the record ceiling."
      : "IMAX-class 8000p / 164 fps is not available here. Browser capture cannot drive that raster or frame rate.";

  return {
    gpu,
    maxTexture,
    cores: navigator.hardwareConcurrency || 1,
    dpr: window.devicePixelRatio || 1,
    screen: `${window.screen.width}×${window.screen.height}`,
    refresh,
    audioRate,
    audioLatencyMs,
    maxChannels,
    webgl,
    mime: pickMime(),
    recordCeiling,
    imax,
  };
}

export function pickRecorderMime() {
  return pickMime();
}
