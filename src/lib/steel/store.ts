import { create } from "zustand";
import type { Lang } from "@/lib/i18n";
import type { HostId, MidiPortInfo, OsId, SteelTab } from "./types";

export interface SteelState {
  tab: SteelTab;
  lang: Lang;
  armed: boolean;
  running: boolean;
  host: HostId;
  os: OsId;
  buffer: number;
  sampleRate: number;
  kernel: string;
  latest: string | null;
  updating: boolean;
  addons: Record<string, boolean>;
  inGain: number;
  outGain: number;
  master: number;
  hpHz: number;
  eqLo: number;
  eqMid: number;
  eqHi: number;
  satAmt: number;
  thresh: number;
  transAmt: number;
  peak: number;
  rms: number;
  voices: number;
  cpu: number;
  midiIn: string | null;
  midiOut: string | null;
  midiPorts: MidiPortInfo[];
  lastNote: string;
  lastCc: string;
  webOut: boolean;
  inputLive: boolean;
  error: string | null;
  setTab: (tab: SteelTab) => void;
  patch: (partial: Partial<SteelState>) => void;
}

const ADDON_DEFAULTS: Record<string, boolean> = {
  hpf: true,
  eq: true,
  sat: true,
  comp: true,
  limit: true,
  synth: true,
  transient: false,
};

const PERSIST_KEY = "steel-desk-v1";

type Persisted = Pick<
  SteelState,
  | "host"
  | "os"
  | "buffer"
  | "sampleRate"
  | "kernel"
  | "addons"
  | "inGain"
  | "outGain"
  | "master"
  | "hpHz"
  | "eqLo"
  | "eqMid"
  | "eqHi"
  | "satAmt"
  | "thresh"
  | "transAmt"
  | "webOut"
  | "lang"
>;

function slicePersist(s: SteelState): Persisted {
  return {
    host: s.host,
    os: s.os,
    buffer: s.buffer,
    sampleRate: s.sampleRate,
    kernel: s.kernel,
    addons: s.addons,
    inGain: s.inGain,
    outGain: s.outGain,
    master: s.master,
    hpHz: s.hpHz,
    eqLo: s.eqLo,
    eqMid: s.eqMid,
    eqHi: s.eqHi,
    satAmt: s.satAmt,
    thresh: s.thresh,
    transAmt: s.transAmt,
    webOut: s.webOut,
    lang: s.lang,
  };
}

export const useSteel = create<SteelState>((set) => ({
  tab: "desk",
  lang: "et",
  armed: false,
  running: false,
  host: "fl",
  os: "win10",
  buffer: 128,
  sampleRate: 48000,
  kernel: "3.4.0",
  latest: null,
  updating: false,
  addons: ADDON_DEFAULTS,
  inGain: 1,
  outGain: 0.85,
  master: 0.8,
  hpHz: 80,
  eqLo: 1,
  eqMid: 1,
  eqHi: 1,
  satAmt: 0.35,
  thresh: 0.35,
  transAmt: 0.4,
  peak: 0,
  rms: 0,
  voices: 0,
  cpu: 0,
  midiIn: null,
  midiOut: null,
  midiPorts: [],
  lastNote: "—",
  lastCc: "—",
  webOut: true,
  inputLive: false,
  error: null,
  setTab: (tab) => set({ tab }),
  patch: (partial) => set(partial),
}));

export function hydrateSteel() {
  if (typeof localStorage === "undefined") return;
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw) as Partial<Persisted>;
    const next: Partial<SteelState> = {};
    if (saved.host) next.host = saved.host;
    if (saved.os) next.os = saved.os;
    if (saved.buffer) next.buffer = saved.buffer;
    if (saved.sampleRate) next.sampleRate = saved.sampleRate;
    if (saved.kernel) next.kernel = saved.kernel;
    if (saved.addons) next.addons = { ...ADDON_DEFAULTS, ...saved.addons };
    if (typeof saved.inGain === "number") next.inGain = saved.inGain;
    if (typeof saved.outGain === "number") next.outGain = saved.outGain;
    if (typeof saved.master === "number") next.master = saved.master;
    if (typeof saved.hpHz === "number") next.hpHz = saved.hpHz;
    if (typeof saved.eqLo === "number") next.eqLo = saved.eqLo;
    if (typeof saved.eqMid === "number") next.eqMid = saved.eqMid;
    if (typeof saved.eqHi === "number") next.eqHi = saved.eqHi;
    if (typeof saved.satAmt === "number") next.satAmt = saved.satAmt;
    if (typeof saved.thresh === "number") next.thresh = saved.thresh;
    if (typeof saved.transAmt === "number") next.transAmt = saved.transAmt;
    if (typeof saved.webOut === "boolean") next.webOut = saved.webOut;
    if (saved.lang === "et" || saved.lang === "en") next.lang = saved.lang;
    useSteel.getState().patch(next);
  } catch {
    /* ignore corrupt desk */
  }
}

export function watchSteelPersist() {
  return useSteel.subscribe((s, prev) => {
    if (
      s.peak !== prev.peak ||
      s.rms !== prev.rms ||
      s.voices !== prev.voices ||
      s.cpu !== prev.cpu ||
      s.lastNote !== prev.lastNote ||
      s.lastCc !== prev.lastCc ||
      s.armed !== prev.armed ||
      s.running !== prev.running ||
      s.tab !== prev.tab
    ) {
      const sameSettings =
        s.host === prev.host &&
        s.os === prev.os &&
        s.buffer === prev.buffer &&
        s.sampleRate === prev.sampleRate &&
        s.kernel === prev.kernel &&
        s.addons === prev.addons &&
        s.inGain === prev.inGain &&
        s.outGain === prev.outGain &&
        s.master === prev.master &&
        s.hpHz === prev.hpHz &&
        s.eqLo === prev.eqLo &&
        s.eqMid === prev.eqMid &&
        s.eqHi === prev.eqHi &&
        s.satAmt === prev.satAmt &&
        s.thresh === prev.thresh &&
        s.transAmt === prev.transAmt &&
        s.webOut === prev.webOut &&
        s.lang === prev.lang;
      if (sameSettings) return;
    }
    try {
      localStorage.setItem(PERSIST_KEY, JSON.stringify(slicePersist(s)));
    } catch {
      /* quota */
    }
  });
}
