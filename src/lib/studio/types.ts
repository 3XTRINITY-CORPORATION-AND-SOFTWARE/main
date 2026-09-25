export type StudioTab = "desk" | "vocals" | "visuals" | "matrix" | "monitor" | "kernel" | "crew" | "audit" | "banks" | "film" | "theory";
export type Genre = "hardstyle" | "rawstyle" | "techno" | "rap" | "trap";
export type ChannelId = "kick" | "bass" | "hat" | "perc" | "lead" | "vocal";
export type FxChain = "dry" | "hard-delay" | "club-verb" | "radio" | "trap-space";
export type Translate = "phone" | "jbl" | "festival";
export type VisualStyle = "auto" | "rings" | "tunnel" | "scope" | "bars" | "film" | "lips";
export type VoiceBank = "lead" | "harmony" | "choir" | "adlib";
export type VocalLang = "et" | "en" | "ru" | "es" | "de";
export type HostId = "standalone" | "fl" | "ableton" | "logic";
export type Lang = "et" | "en";
export type ComputePath = "kernel" | "web" | "hybrid";

export const CHANNELS: ChannelId[] = ["kick", "bass", "hat", "perc", "lead", "vocal"];
export const STEPS = 16;

export const GENRE_META: Record<Genre, { bpm: number; label: string; drive: number }> = {
  hardstyle: { bpm: 150, label: "Hardstyle", drive: 0.52 },
  rawstyle: { bpm: 160, label: "Rawstyle", drive: 0.78 },
  techno: { bpm: 145, label: "Hard Techno", drive: 0.4 },
  rap: { bpm: 90, label: "Rap", drive: 0.22 },
  trap: { bpm: 140, label: "Trap", drive: 0.36 },
};

export interface ChannelMix {
  gain: number;
  pan: number;
  mute: boolean;
  solo: boolean;
  send: number;
}

export interface MicProfile {
  label: string;
  noiseFloor: number;
  sampleRate: number;
  channels: number;
  restore: boolean;
}

export interface MeterFrame {
  peak: number;
  rms: number;
  voices: number;
  step: number;
  cpu: number;
  latency: number;
  signal: number;
  need: number;
  velocity: number;
  mid: number;
  side: number;
  pitch: number;
}

export interface RadarItem {
  id: string;
  source: string;
  title: string;
  note: string;
  steel: string;
}
