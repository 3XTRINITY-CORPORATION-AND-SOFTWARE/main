import type { ChannelId, Genre } from "./types";
import { STEPS } from "./types";

export interface Pattern {
  genre: Genre;
  bpm: number;
  swing: number;
  steps: Record<ChannelId, number[]>;
  bassMidi: number[];
  leadMidi: number[];
}

function row(on: Array<number | [number, number]>): number[] {
  const out = Array.from({ length: STEPS }, () => 0);
  for (const item of on) {
    if (typeof item === "number") out[item] = 1;
    else out[item[0]] = item[1];
  }
  return out;
}

function midi(values: number[]): number[] {
  const out = Array.from({ length: STEPS }, () => 0);
  for (let i = 0; i < STEPS; i++) out[i] = values[i % values.length] ?? 0;
  return out;
}

const silent = () => Array.from({ length: STEPS }, () => 0);

export const PATTERNS: Record<Genre, Pattern> = {
  hardstyle: {
    genre: "hardstyle",
    bpm: 150,
    swing: 0,
    steps: {
      kick: row([0, 4, 8, 12]),
      bass: row([
        [2, 0.85],
        [6, 0.85],
        [10, 0.85],
        [14, 0.85],
      ]),
      hat: row([0, [1, 0.35], 2, [3, 0.3], 4, [5, 0.35], 6, [7, 0.3], 8, [9, 0.4], 10, [11, 0.3], 12, [13, 0.35], 14, [15, 0.45]]),
      perc: row([
        [4, 0.7],
        [12, 0.78],
      ]),
      lead: row([
        [8, 0.9],
        [9, 0.7],
        [10, 0.85],
        [11, 0.6],
        [12, 0.95],
        [13, 0.7],
        [14, 0.8],
        [15, 0.55],
      ]),
      vocal: silent(),
    },
    bassMidi: midi([36, 36, 36, 36, 36, 36, 36, 36, 39, 39, 39, 39, 34, 34, 36, 36]),
    leadMidi: midi([79, 79, 81, 79, 76, 76, 79, 81, 84, 84, 83, 81, 79, 76, 79, 81]),
  },
  rawstyle: {
    genre: "rawstyle",
    bpm: 160,
    swing: 0,
    steps: {
      kick: row([0, [3, 0.55], 4, 8, [11, 0.5], 12]),
      bass: row([
        [2, 0.9],
        [6, 0.9],
        [10, 0.9],
        [14, 0.9],
      ]),
      hat: row([0, 2, 4, 6, 8, 10, 12, 14]),
      perc: row([
        [4, 0.8],
        [7, 0.4],
        [12, 0.85],
      ]),
      lead: row([
        [0, 0.4],
        [8, 1],
        [9, 0.8],
        [10, 0.95],
        [12, 1],
        [14, 0.7],
      ]),
      vocal: silent(),
    },
    bassMidi: midi([35, 35, 35, 35, 35, 35, 38, 38, 31, 31, 35, 35, 38, 38, 35, 35]),
    leadMidi: midi([88, 88, 86, 84, 81, 81, 84, 86, 91, 91, 88, 86, 84, 81, 84, 86]),
  },
  techno: {
    genre: "techno",
    bpm: 145,
    swing: 0.08,
    steps: {
      kick: row([0, 4, 8, 12]),
      bass: row([0, [2, 0.7], 4, [6, 0.65], 8, [10, 0.7], 12, [14, 0.6]]),
      hat: row([
        [2, 0.7],
        [6, 0.7],
        [10, 0.75],
        [14, 0.7],
      ]),
      perc: row([
        [4, 0.55],
        [6, 0.35],
        [12, 0.6],
        [15, 0.4],
      ]),
      lead: row([
        [0, 0.35],
        [8, 0.55],
        [12, 0.4],
      ]),
      vocal: silent(),
    },
    bassMidi: midi([36, 36, 36, 36, 39, 39, 36, 36, 34, 34, 36, 36, 41, 41, 36, 36]),
    leadMidi: midi([72, 72, 75, 72, 67, 67, 72, 75, 79, 79, 75, 72, 67, 67, 72, 72]),
  },
  rap: {
    genre: "rap",
    bpm: 90,
    swing: 0.18,
    steps: {
      kick: row([0, [7, 0.7], 8, [10, 0.55]]),
      bass: row([0, [3, 0.5], 8, [11, 0.45]]),
      hat: row([0, [1, 0.4], 2, [3, 0.35], 4, [5, 0.45], 6, [7, 0.3], 8, [9, 0.4], 10, [11, 0.35], 12, [13, 0.5], 14, [15, 0.3]]),
      perc: row([
        [4, 0.85],
        [12, 0.9],
      ]),
      lead: row([
        [14, 0.4],
      ]),
      vocal: silent(),
    },
    bassMidi: midi([49, 49, 49, 49, 49, 49, 49, 49, 36, 36, 41, 41, 49, 49, 36, 36]),
    leadMidi: midi([64, 64, 67, 64, 60, 60, 64, 67, 69, 69, 67, 64, 60, 60, 64, 64]),
  },
  trap: {
    genre: "trap",
    bpm: 140,
    swing: 0.06,
    steps: {
      kick: row([0, [10, 0.85]]),
      bass: row([0, [8, 0.7]]),
      hat: row([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        [11, 0.7],
        [12, 1],
        [13, 0.55],
        [14, 0.85],
        [15, 0.4],
      ]),
      perc: row([
        [4, 0.8],
        [12, 0.88],
        [14, 0.35],
      ]),
      lead: row([
        [8, 0.45],
        [12, 0.35],
      ]),
      vocal: silent(),
    },
    bassMidi: midi([33, 33, 33, 33, 33, 33, 33, 33, 28, 28, 28, 28, 33, 33, 36, 31]),
    leadMidi: midi([76, 76, 79, 76, 72, 72, 76, 79, 81, 81, 79, 76, 72, 72, 76, 76]),
  },
};

export function flattenPattern(p: Pattern) {
  const pattern = new Float32Array(6 * STEPS);
  const order: ChannelId[] = ["kick", "bass", "hat", "perc", "lead", "vocal"];
  order.forEach((id, t) => {
    for (let s = 0; s < STEPS; s++) pattern[t * STEPS + s] = p.steps[id][s] ?? 0;
  });
  return {
    pattern,
    bassMidi: Float32Array.from(p.bassMidi),
    leadMidi: Float32Array.from(p.leadMidi),
  };
}

export function emptyMix(): Record<ChannelId, { gain: number; pan: number; mute: boolean; solo: boolean; send: number }> {
  return {
    kick: { gain: 0.92, pan: 0, mute: false, solo: false, send: 0.04 },
    bass: { gain: 0.8, pan: 0, mute: false, solo: false, send: 0.02 },
    hat: { gain: 0.42, pan: 0.18, mute: false, solo: false, send: 0.12 },
    perc: { gain: 0.48, pan: -0.22, mute: false, solo: false, send: 0.1 },
    lead: { gain: 0.55, pan: 0.08, mute: false, solo: false, send: 0.24 },
    vocal: { gain: 0.88, pan: 0, mute: false, solo: false, send: 0.32 },
  };
}
