/**
 * Kärestik tunnelling — processing velocity.
 * V = S / T
 * S = signal (channels × sampleRate × active voices)
 * T = computational need (buffer / sampleRate) = latency in seconds
 */
export function karestik(sampleRate: number, buffer: number, voices: number, channels = 2) {
  const T = buffer / Math.max(1, sampleRate);
  const S = channels * sampleRate * Math.max(1, voices);
  const V = S / Math.max(1e-9, T);
  return {
    signal: S,
    need: T,
    velocity: V,
    latencyMs: T * 1000,
  };
}

export function formatVelocity(v: number) {
  const sign = v < 0 ? "−" : "";
  const a = Math.abs(v);
  if (a >= 1e9) return `${sign}${(a / 1e9).toFixed(2)} G`;
  if (a >= 1e6) return `${sign}${(a / 1e6).toFixed(2)} M`;
  if (a >= 1e3) return `${sign}${(a / 1e3).toFixed(1)} k`;
  return `${sign}${a.toFixed(0)}`;
}

export function hostLatencyOffset(host: "standalone" | "fl" | "ableton" | "logic", buffer: number, sampleRate: number) {
  const base = (buffer / sampleRate) * 1000;
  const extra =
    host === "fl" ? 1.2 : host === "ableton" ? 0.8 : host === "logic" ? 1.6 : 0;
  return base + extra;
}
