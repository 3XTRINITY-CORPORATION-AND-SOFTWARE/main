import type { AuraPalette, Palette } from "./types";

export const PALETTES: Palette[] = [
  {
    id: "ice",
    label: "Ice",
    bg: [17, 18, 16],
    lo: [90, 110, 120],
    mid: [154, 167, 176],
    hi: [232, 228, 216],
  },
  {
    id: "ember",
    label: "Ember",
    bg: [17, 18, 16],
    lo: [120, 50, 42],
    mid: [196, 92, 74],
    hi: [232, 200, 180],
  },
  {
    id: "tide",
    label: "Tide",
    bg: [17, 18, 16],
    lo: [40, 90, 70],
    mid: [106, 165, 111],
    hi: [210, 230, 214],
  },
  {
    id: "rose",
    label: "Rose",
    bg: [17, 18, 16],
    lo: [110, 55, 70],
    mid: [180, 110, 124],
    hi: [232, 210, 214],
  },
  {
    id: "mono",
    label: "Mono",
    bg: [17, 18, 16],
    lo: [70, 70, 66],
    mid: [160, 158, 148],
    hi: [232, 228, 216],
  },
];

export function paletteById(id: AuraPalette) {
  return PALETTES.find((p) => p.id === id) ?? PALETTES[0];
}

export function rgb(c: [number, number, number], a = 1) {
  return a >= 1 ? `rgb(${c[0]},${c[1]},${c[2]})` : `rgba(${c[0]},${c[1]},${c[2]},${a})`;
}

export function mix(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  const u = Math.min(1, Math.max(0, t));
  return [
    Math.round(a[0] + (b[0] - a[0]) * u),
    Math.round(a[1] + (b[1] - a[1]) * u),
    Math.round(a[2] + (b[2] - a[2]) * u),
  ];
}
