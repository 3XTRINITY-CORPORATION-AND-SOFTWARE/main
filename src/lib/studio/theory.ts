import { BANKS, type BankCurve, type SoundBank } from "./banks";
import { NIGHT_HEAR_FIRST } from "./night";
import type { Genre } from "./types";

export const EXTRA_IDS = [
  "MI44OR-5GEM",
  "WHISP3RER",
  "DIRT-COL",
  "CLEAR-COL",
  "THEORY-SPINE",
  "ENERGY-MATCH",
  "TAKT-LOCK",
  "GYRATOR-AIR",
  "PRESHAPE-SAT",
  "STEREO-MX",
] as const;

export type ExtraId = (typeof EXTRA_IDS)[number];

export interface ExtraRow {
  id: ExtraId;
  action: string;
  on: boolean;
  intensity: number;
  why: string;
}

export interface TheorySpine {
  pulse: string;
  takt: string;
  pitchHouse: string;
  fn: string;
  tension: string;
  chroma: string;
  crest: string;
  transient: string;
  harmonicDirt: string;
  form: string;
  dirt: number;
  clear: number;
  extras: ExtraRow[];
  hearFirst: ExtraId[];
}

function clamp10(n: number) {
  return Math.max(0, Math.min(10, Math.round(n * 10) / 10));
}

export function buildSpine(opts: {
  genre: Genre;
  bpm: number;
  bank: SoundBank | null;
  curve: BankCurve | null;
  paste: string;
  dirtBias: number;
  nightLane?: boolean;
}): TheorySpine {
  const curve = opts.curve;
  const dirt = curve ? curve.dirt * (0.5 + opts.dirtBias * 0.5) : 0.4;
  const clear = curve ? curve.clear * (1.2 - opts.dirtBias * 0.4) : 0.55;
  const bpm = opts.bpm;
  const genre = opts.genre;
  const paste = opts.paste.trim();
  const night = Boolean(opts.nightLane);
  const extras: ExtraRow[] = [
    {
      id: "MI44OR-5GEM",
      action: "Five-generation analog mirror on the same container.",
      on: true,
      intensity: clamp10(night ? 6.5 : 6 + (curve?.sat ?? 0) * 4),
      why: night
        ? "VEC-WDF · keep / even body / odd edge / rounded HF / mid stability."
        : "Target 5x body vs a free EQ dump.",
    },
    {
      id: "WHISP3RER",
      action: "Bit-aware dither in unused slack. No format change.",
      on: true,
      intensity: night ? 4 : clamp10(4 + clear * 3),
      why: night ? "TPDF-DECORR · intensity 4. No payload." : "Keeps the source bit depth honest.",
    },
    {
      id: "DIRT-COL",
      action: "Saturation topology from the dirt score.",
      on: dirt > 0.12,
      intensity: night ? clamp10(Math.max(1, Math.min(4, dirt * 10))) : clamp10(dirt * 10),
      why: night ? "CHEBY · dirt 1–4 on the loud stack." : paste || "Rulebreaker dirt kept as a target.",
    },
    {
      id: "CLEAR-COL",
      action: "Subtractive mud/harsh cuts before any boost.",
      on: clear > 0.35 || night,
      intensity: clamp10(night ? Math.max(5, clear * 10) : clear * 10),
      why: night ? "ERB-CUT · quiet-lead pocket 2.5–5 kHz." : "Cut before boost — analog-mirror law.",
    },
    {
      id: "THEORY-SPINE",
      action: "Reusable recipe from pulse, takt, chroma.",
      on: true,
      intensity: 8,
      why: night ? `${genre} @ ${bpm} · quiet lead / loud stack` : `${genre} @ ${bpm}`,
    },
    {
      id: "ENERGY-MATCH",
      action: "Crest and transient density aimed at the bank.",
      on: true,
      intensity: clamp10(5 + (curve?.sat ?? 0.3) * 5),
      why: night ? "SHAPE-GAIN · loudness does not restyle the house." : opts.bank?.name ?? "desk energy",
    },
    {
      id: "TAKT-LOCK",
      action: genre === "rap" || genre === "trap" ? "Trap/boom bar grid for rhyme-lock." : "Four-on-the-floor grid.",
      on: true,
      intensity: night ? 8 : 7,
      why: night ? `${bpm} BPM · PD-MAG. JND-ASYNC only if stack sits off the kit.` : `${bpm} BPM`,
    },
    {
      id: "GYRATOR-AIR",
      action: "Circuit-like high shelf, not a drawn curve.",
      on: (curve?.airDb ?? 0) > 0 || night,
      intensity: clamp10(night ? 3.5 : 4 + (curve?.airDb ?? 0)),
      why: night ? "SVF-GYR · air on the lead." : "Air well plugin.",
    },
    {
      id: "PRESHAPE-SAT",
      action: "Pull harsh bands out before the saturator.",
      on: true,
      intensity: clamp10(night ? 6.5 : 5 + (curve?.presenceDb ?? 3) * 0.4),
      why: night ? "PRE-POST · 2.5–5 kHz out of sat on the quiet lead." : "Stops hash on SAT-PLATE.",
    },
    {
      id: "STEREO-MX",
      action: night
        ? "EQUAL on the quiet lead. MODERN on the louder stack."
        : (curve?.width ?? 0.5) > 0.55
          ? "MODERN L/R matrix."
          : "EQUAL L/R matrix.",
      on: true,
      intensity: clamp10(night ? 6 : (curve?.width ?? 0.5) * 10),
      why: night ? "IACC-SAFE · EQUAL lead / MODERN stack." : "4D width after the melt.",
    },
  ];
  const hearFirst = night
    ? [...NIGHT_HEAR_FIRST]
    : extras
        .slice()
        .sort((a, b) => Number(b.on) - Number(a.on) || b.intensity - a.intensity)
        .slice(0, 3)
        .map((e) => e.id);
  return {
    pulse: `${bpm} BPM · ${genre === "rap" ? "4/4 boom-trap" : "4/4 floor"}`,
    takt: genre === "rap" || genre === "trap" ? "stress 1+3, 808 on 1" : "kick every quarter",
    pitchHouse: curve ? `key ${curve.key} ${curve.scale}` : "unknown — no bank loaded",
    fn: genre === "hardstyle" ? "drop-dominant loop" : "no-cadence loop",
    tension: dirt > 0.6 ? "held dissonance, late release" : "short release",
    chroma: clear > dirt ? "bright / mid-forward" : "dark / low-forward",
    crest: dirt > 0.7 ? "low crest, dense body" : "higher crest, clicky transients",
    transient: genre.includes("style") || genre === "techno" ? "clicky / gated" : "rounded",
    harmonicDirt: dirt > 0.5 ? "odd harmonics, tape smear" : "clean odd, light sat",
    form: "intro / hook gravity / drop / outro",
    dirt: Math.max(0, Math.min(1, dirt)),
    clear: Math.max(0, Math.min(1, clear)),
    extras,
    hearFirst,
  };
}

export function bankForGenre(genre: Genre): SoundBank {
  return BANKS.find((b) => b.curve.genre === genre) ?? BANKS[0];
}
