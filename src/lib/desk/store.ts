import { create } from "zustand";
import { emptyEq, type EqGains } from "./eq";
import type { GenreId } from "./fx";
import type { VocalClip } from "./clips";

export type TuneMode = 0 | 1 | 2;
export type SlotId = "beat" | "vocal";

export interface DeskState {
  beatName: string | null;
  vocalName: string | null;
  playing: boolean;
  recording: boolean;
  liveMic: boolean;
  amount: number;
  speed: number;
  tonic: number;
  mode: TuneMode;
  drive: number;
  ceiling: number;
  beatGain: number;
  vocalGain: number;
  width: number;
  glue: number;
  duck: number;
  peak: number;
  rms: number;
  pitch: number;
  clips: number;
  bpm: number;
  lufs: number;
  keyName: string;
  aiNote: string | null;
  aiBusy: boolean;
  error: string | null;
  regions: VocalClip[];
  selectedId: string | null;
  delay: string;
  reverb: string;
  delayMix: number;
  reverbMix: number;
  fade: number;
  genre: GenreId;
  applyMix: boolean;
  autoTakt: boolean;
  female: boolean;
  backs: boolean;
  micLabel: string | null;
  videoPrompt: string;
  videoBusy: boolean;
  kare: number;
  lyrics: string;
  palve: string;
  eq: EqGains;
  set: (p: Partial<DeskState>) => void;
}

export const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const useDesk = create<DeskState>((set) => ({
  beatName: null,
  vocalName: null,
  playing: false,
  recording: false,
  liveMic: false,
  amount: 0.72,
  speed: 0.42,
  tonic: 0,
  mode: 1,
  drive: 0.18,
  ceiling: 0.89,
  beatGain: 0.78,
  vocalGain: 0.92,
  width: 0.35,
  glue: 0.55,
  duck: 1,
  peak: 0,
  rms: 0,
  pitch: 0,
  clips: 0,
  bpm: 90,
  lufs: -70,
  keyName: "A min",
  aiNote: null,
  aiBusy: false,
  error: null,
  regions: [],
  selectedId: null,
  delay: "ping",
  reverb: "gated",
  delayMix: 0.18,
  reverbMix: 0.16,
  fade: 0.08,
  genre: "hardstyle",
  applyMix: true,
  autoTakt: true,
  female: false,
  backs: false,
  micLabel: null,
  videoPrompt: "",
  videoBusy: false,
  kare: 0.72,
  lyrics: "",
  palve: "",
  eq: emptyEq(),
  set: (p) => set(p),
}));
