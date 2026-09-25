export type ComputePath = "kernel" | "web" | "hybrid";

export interface SignalReport {
  score: number;
  path: ComputePath;
  cores: number;
  memoryGb: number | null;
  connection: string;
  downlink: number | null;
  worklet: boolean;
  gpu: "webgpu" | "webgl" | "none";
  reducedMotion: boolean;
  saveData: boolean;
  notes: string[];
  probedAt: number;
}

export interface PathPolicy {
  path: ComputePath;
  bufferSize: number;
  latencyHint: AudioContextLatencyCategory;
  fftSize: number;
  visFps: number;
  visQuality: number;
}

type Conn = {
  effectiveType?: string;
  downlink?: number;
  saveData?: boolean;
};

const CACHE_MS = 8000;
let cached: SignalReport | null = null;

function conn(): Conn {
  const nav = navigator as Navigator & { connection?: Conn };
  return nav.connection ?? {};
}

function gpuKind(): SignalReport["gpu"] {
  const nav = navigator as Navigator & { gpu?: unknown };
  if (nav.gpu) return "webgpu";
  try {
    const c = document.createElement("canvas");
    if (c.getContext("webgl2") || c.getContext("webgl")) return "webgl";
  } catch {
    /* headless */
  }
  return "none";
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export function probeSignal(force = false): SignalReport {
  if (!force && cached && performance.now() - cached.probedAt < CACHE_MS) return cached;
  const cores = navigator.hardwareConcurrency || 2;
  const memoryGb =
    typeof (navigator as Navigator & { deviceMemory?: number }).deviceMemory === "number"
      ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? null
      : null;
  const c = conn();
  const effective = (c.effectiveType || "unknown").toLowerCase();
  const downlink = typeof c.downlink === "number" ? c.downlink : null;
  const saveData = Boolean(c.saveData);
  const reducedMotion =
    typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const worklet = typeof AudioWorkletNode === "function";
  const gpu = gpuKind();

  let score = 0;
  const notes: string[] = [];

  if (cores >= 8) score += 0.24;
  else if (cores >= 4) score += 0.16;
  else if (cores >= 2) score += 0.08;
  else score += 0.03;

  if (memoryGb == null) score += 0.1;
  else if (memoryGb >= 8) score += 0.24;
  else if (memoryGb >= 4) score += 0.16;
  else if (memoryGb >= 2) score += 0.08;
  else {
    score += 0.03;
    notes.push("low-memory");
  }

  if (effective === "4g" || effective === "5g") score += 0.14;
  else if (effective === "3g") {
    score += 0.06;
    notes.push("slow-link");
  } else if (effective === "2g" || effective === "slow-2g") {
    score += 0.02;
    notes.push("very-slow-link");
  } else score += 0.1;

  if (worklet) score += 0.14;
  else notes.push("no-worklet");

  if (gpu === "webgpu") score += 0.14;
  else if (gpu === "webgl") score += 0.1;
  else {
    score += 0.02;
    notes.push("no-gpu");
  }

  if (saveData) {
    score -= 0.08;
    notes.push("save-data");
  }
  if (reducedMotion) {
    score -= 0.05;
    notes.push("reduced-motion");
  }

  score = clamp01(score);
  let path: ComputePath = "hybrid";
  if (score < 0.38 || !worklet) path = "web";
  else if (score >= 0.7) path = "kernel";

  if (path === "web") notes.push("web-heavy");
  if (path === "kernel") notes.push("kernel-heavy");

  cached = {
    score,
    path,
    cores,
    memoryGb,
    connection: effective,
    downlink,
    worklet,
    gpu,
    reducedMotion,
    saveData,
    notes,
    probedAt: performance.now(),
  };
  return cached;
}

export function policyFor(path: ComputePath, force?: ComputePath | null): PathPolicy {
  const p = force ?? path;
  if (p === "web") {
    return {
      path: p,
      bufferSize: 512,
      latencyHint: "playback",
      fftSize: 512,
      visFps: 30,
      visQuality: 0.45,
    };
  }
  if (p === "hybrid") {
    return {
      path: p,
      bufferSize: 256,
      latencyHint: "interactive",
      fftSize: 1024,
      visFps: 45,
      visQuality: 0.72,
    };
  }
  return {
    path: p,
    bufferSize: 128,
    latencyHint: "interactive",
    fftSize: 2048,
    visFps: 60,
    visQuality: 1,
  };
}

export function formatScore(n: number) {
  return `${Math.round(n * 100)}`;
}
