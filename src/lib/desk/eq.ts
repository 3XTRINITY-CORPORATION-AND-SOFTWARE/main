/** Ten ISO peaking bands. Keep rate and depth — no trophy upsample. */

export const EQ_HZ = [31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000] as const;
export const EQ_Q = 1.05;
export const EQ_MIN = -12;
export const EQ_MAX = 12;

export type EqGains = number[];

export function emptyEq(): EqGains {
  return EQ_HZ.map(() => 0);
}

export function clampEq(n: number) {
  return Math.max(EQ_MIN, Math.min(EQ_MAX, n));
}

export function nearestBand(hz: number) {
  let best = 0;
  let dist = Infinity;
  EQ_HZ.forEach((h, i) => {
    const d = Math.abs(Math.log2(h / Math.max(20, hz)));
    if (d < dist) {
      dist = d;
      best = i;
    }
  });
  return best;
}

export function labelHz(hz: number) {
  return hz >= 1000 ? `${hz / 1000}k` : `${hz}`;
}
