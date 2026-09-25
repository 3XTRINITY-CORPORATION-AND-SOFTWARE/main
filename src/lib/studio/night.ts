import type { VocalLang } from "./types";

/** Ten vocal kinds, scream → opera. DSP / TTS stand-in — not a voice-print. */
export const VOCAL_KINDS = [
  "scream",
  "growl",
  "belt",
  "rap",
  "chop",
  "speak",
  "whisper",
  "air",
  "choir",
  "opera",
] as const;

export type VocalKind = (typeof VOCAL_KINDS)[number];

export const VOCAL_LANGS: VocalLang[] = ["en", "ru", "es", "et", "de"];

export const KIND_VOICE: Record<VocalKind, string> = {
  scream: "perseus",
  growl: "atlas",
  belt: "rex",
  rap: "zagan",
  chop: "lux",
  speak: "helix",
  whisper: "luna",
  air: "aurora",
  choir: "orion",
  opera: "helios",
};

export const KIND_LABEL: Record<VocalKind, string> = {
  scream: "SCREAM",
  growl: "GROWL",
  belt: "BELT",
  rap: "RAP",
  chop: "CHOP",
  speak: "SPEAK",
  whisper: "WHISP",
  air: "AIR",
  choir: "CHOIR",
  opera: "OPERA",
};

export interface KindDsp {
  hp: number;
  presenceHz: number;
  presenceDb: number;
  airDb: number;
  sat: number;
  gain: number;
  scoopHz: number;
  scoopDb: number;
  grains: boolean;
  stack: boolean;
}

export const KIND_DSP: Record<VocalKind, KindDsp> = {
  scream: { hp: 140, presenceHz: 4200, presenceDb: 6, airDb: 2, sat: 0.72, gain: 1.15, scoopHz: 280, scoopDb: -2, grains: false, stack: true },
  growl: { hp: 70, presenceHz: 1800, presenceDb: 2, airDb: -1, sat: 0.64, gain: 1.05, scoopHz: 420, scoopDb: 1.5, grains: false, stack: true },
  belt: { hp: 90, presenceHz: 2800, presenceDb: 5, airDb: 1.5, sat: 0.28, gain: 1.12, scoopHz: 320, scoopDb: -1.5, grains: false, stack: true },
  rap: { hp: 80, presenceHz: 2200, presenceDb: 3, airDb: 0.5, sat: 0.22, gain: 1.0, scoopHz: 300, scoopDb: -2, grains: false, stack: false },
  chop: { hp: 100, presenceHz: 2600, presenceDb: 2, airDb: 1, sat: 0.18, gain: 0.95, scoopHz: 350, scoopDb: -1, grains: true, stack: false },
  speak: { hp: 90, presenceHz: 1600, presenceDb: 1, airDb: 0, sat: 0.08, gain: 0.92, scoopHz: 280, scoopDb: -1, grains: false, stack: false },
  whisper: { hp: 380, presenceHz: 3600, presenceDb: 1.5, airDb: 5, sat: 0.04, gain: 0.42, scoopHz: 240, scoopDb: -3, grains: false, stack: false },
  air: { hp: 180, presenceHz: 4800, presenceDb: 3, airDb: 6, sat: 0.1, gain: 0.7, scoopHz: 300, scoopDb: -2.5, grains: false, stack: false },
  choir: { hp: 110, presenceHz: 2400, presenceDb: 2, airDb: 3, sat: 0.12, gain: 0.78, scoopHz: 280, scoopDb: -1.5, grains: false, stack: true },
  opera: { hp: 85, presenceHz: 3100, presenceDb: 4.5, airDb: 3.5, sat: 0.16, gain: 1.08, scoopHz: 260, scoopDb: -1, grains: false, stack: true },
};

export const NIGHT_HEAR_FIRST = ["TAKT-LOCK", "ENERGY-MATCH", "STEREO-MX"] as const;

export const NIGHT_STANDIN_URL = "/night_backvox_standin.mp3";

export const LANG_NAME: Record<VocalLang, string> = {
  en: "English",
  ru: "Russian",
  es: "Spanish",
  et: "Estonian",
  de: "German",
};

export const HOOK_PLACEHOLDER: Record<VocalLang, string> = {
  et: "Kirjuta suund või jäta tühjaks…",
  en: "Write a direction, or leave blank…",
  ru: "Направление или пусто…",
  es: "Dirección, o déjalo vacío…",
  de: "Richtung, oder leer lassen…",
};

export function isVocalLang(v: unknown): v is VocalLang {
  return v === "en" || v === "ru" || v === "es" || v === "et" || v === "de";
}

export function isVocalKind(v: unknown): v is VocalKind {
  return typeof v === "string" && (VOCAL_KINDS as readonly string[]).includes(v);
}
