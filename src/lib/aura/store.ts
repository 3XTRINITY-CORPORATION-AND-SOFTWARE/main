import { create } from "zustand";
import type { AuraMode, AuraPalette, AuraSource, BufferInc, QualityArm } from "./types";

export interface AuraState {
  mode: AuraMode;
  palette: AuraPalette;
  source: AuraSource;
  playing: boolean;
  muted: boolean;
  volume: number;
  sensitivity: number;
  inc: BufferInc;
  arm: QualityArm;
  eq: number[];
  eqOpen: boolean;
  capsOpen: boolean;
  recording: boolean;
  recSec: number;
  fileName: string | null;
  error: string | null;
  fps: number;
  set: (partial: Partial<AuraState>) => void;
}

export const EQ_HZ = [60, 170, 350, 700, 1600, 3500, 8000, 12000];

export const useAura = create<AuraState>((set) => ({
  mode: "ring",
  palette: "ice",
  source: "demo",
  playing: false,
  muted: false,
  volume: 0.8,
  sensitivity: 1.15,
  inc: 32,
  arm: 64,
  eq: EQ_HZ.map(() => 0),
  eqOpen: false,
  capsOpen: false,
  recording: false,
  recSec: 0,
  fileName: null,
  error: null,
  fps: 0,
  set: (partial) => set(partial),
}));
