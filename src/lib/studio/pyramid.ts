/**
 * Signed Kärestik. V = S / T has no gravity — it does not command a place.
 * (+) is kernel velocity. (−) is the web reflection, exponentially reduced
 * toward the origin. When |+| ≈ |−| the pair cancels into a null, which is
 * still lawful: the equation holds, it just stops pointing.
 */
export function signedKarestik(sampleRate: number, buffer: number, voices: number, pathBias = 0) {
  const T = buffer / Math.max(1, sampleRate);
  const S = 2 * sampleRate * Math.max(1, voices);
  const V = S / Math.max(1e-9, T);
  const tiers = 5;
  const steps = Array.from({ length: tiers }, (_, i) => {
    const k = i / (tiers - 1);
    const plus = V * Math.exp(-k * 0.35) * (1 + Math.max(0, pathBias));
    const minus = -V * Math.exp(-k * 0.55) * (1 + Math.max(0, -pathBias));
    const sum = plus + minus;
    const cancel = Math.abs(plus + minus) / Math.max(1, Math.abs(plus) + Math.abs(minus));
    return { k, plus, minus, sum, cancel };
  });
  const nullAt = steps.reduce((best, s, i) => (s.cancel < steps[best].cancel ? i : best), 0);
  return { V, S, T, steps, nullAt };
}

export function pathBiasFrom(path: "kernel" | "web" | "hybrid") {
  if (path === "kernel") return 0.45;
  if (path === "web") return -0.45;
  return 0;
}
