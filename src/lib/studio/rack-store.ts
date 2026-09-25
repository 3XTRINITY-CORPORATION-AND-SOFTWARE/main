import { create } from "zustand";
import type { ChainStep } from "./chain";
import type { ExtraRow, TheorySpine } from "./theory";
import type { PlaceId } from "./places";

const PIN_KEY = "steel-atlas-pins-v1";

export type PlacePins = Record<PlaceId, number[]>;

const EMPTY_PINS: PlacePins = { os: [], web: [], host: [] };

function readPins(): PlacePins {
  if (typeof localStorage === "undefined") return { ...EMPTY_PINS, os: [], web: [], host: [] };
  try {
    const raw = localStorage.getItem(PIN_KEY);
    if (!raw) return { os: [], web: [], host: [] };
    const saved = JSON.parse(raw) as Partial<PlacePins>;
    return {
      os: Array.isArray(saved.os) ? saved.os.filter((n) => typeof n === "number") : [],
      web: Array.isArray(saved.web) ? saved.web.filter((n) => typeof n === "number") : [],
      host: Array.isArray(saved.host) ? saved.host.filter((n) => typeof n === "number") : [],
    };
  } catch {
    return { os: [], web: [], host: [] };
  }
}

function writePins(pins: PlacePins) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(PIN_KEY, JSON.stringify(pins));
  } catch {
    /* quota */
  }
}

export interface StudioRack {
  place: PlaceId;
  paste: string;
  seed: string;
  rhymeOut: string;
  geoLine: string | null;
  geoBusy: boolean;
  geoQuery: string;
  chainLog: ChainStep[];
  spine: TheorySpine | null;
  extras: ExtraRow[];
  note: string | null;
  busy: boolean;
  pins: PlacePins;
  set: (p: Partial<StudioRack>) => void;
  togglePin: (place: PlaceId, i: number) => void;
}

export const useRack = create<StudioRack>((set) => ({
  place: "os",
  paste: "",
  seed: "",
  rhymeOut: "",
  geoLine: null,
  geoBusy: false,
  geoQuery: "",
  chainLog: [],
  spine: null,
  extras: [],
  note: null,
  busy: false,
  pins: readPins(),
  set: (p) => set(p),
  togglePin: (place, i) =>
    set((s) => {
      const cur = s.pins[place];
      const nextList = cur.includes(i) ? cur.filter((n) => n !== i) : [...cur, i].sort((a, b) => a - b);
      const pins = { ...s.pins, [place]: nextList };
      writePins(pins);
      return { pins };
    }),
}));

