import { create } from "zustand";
import { emptyMix, PATTERNS } from "./patterns";
import { emptyRecs, REC_IDS, type RecId, type RecLane } from "./banks";
import { EMPTY_CAP, type VoiceCap } from "./caps";
import { isVocalKind, isVocalLang, type VocalKind } from "./night";
import type { ChainStep } from "./chain";
import type {
  ChannelId,
  ChannelMix,
  ComputePath,
  FxChain,
  Genre,
  HostId,
  Lang,
  MicProfile,
  StudioTab,
  Translate,
  VisualStyle,
  VocalLang,
  VoiceBank,
} from "./types";

export interface StudioState {
  tab: StudioTab;
  lang: Lang;
  genre: Genre;
  bpm: number;
  swing: number;
  playing: boolean;
  armed: boolean;
  recording: boolean;
  bufferSize: number;
  sampleRate: number;
  host: HostId;
  channels: Record<ChannelId, ChannelMix>;
  master: number;
  width: number;
  centerLock: boolean;
  drive: number;
  glue: number;
  ceiling: number;
  translate: Translate;
  fxChain: FxChain;
  tuneAmount: number;
  restoreOn: boolean;
  visualStyle: VisualStyle;
  visualPrompt: string;
  lyrics: string;
  stillUrl: string | null;
  peak: number;
  rms: number;
  voices: number;
  cpu: number;
  step: number;
  latency: number;
  signal: number;
  need: number;
  velocity: number;
  mid: number;
  side: number;
  pitch: number;
  mic: MicProfile | null;
  inputLive: boolean;
  vocalName: string | null;
  beatName: string | null;
  processing: boolean;
  processNote: string | null;
  error: string | null;
  lastNote: string;
  vocalLang: VocalLang;
  vocalKind: VocalKind;
  nightLane: boolean;
  voiceBank: VoiceBank;
  hook: string;
  radarNote: string | null;
  path: ComputePath;
  signalScore: number;
  visFps: number;
  visQuality: number;
  cores: number;
  memoryGb: number | null;
  connection: string;
  steps: Record<ChannelId, number[]>;
  bassMidi: number[];
  leadMidi: number[];
  recs: Record<RecId, RecLane>;
  activeRec: RecId;
  dirtBias: number;
  theoryPaste: string;
  rhymeSeed: string;
  rhymeOut: string;
  geoLine: string | null;
  geoBusy: boolean;
  chainLog: ChainStep[];
  voiceCap: VoiceCap;
  takeOwned: boolean;
  kindBusy: boolean;
  setTab: (tab: StudioTab) => void;
  patch: (partial: Partial<StudioState>) => void;
  setChannel: (id: ChannelId, mix: Partial<ChannelMix>) => void;
  toggleStep: (id: ChannelId, step: number) => void;
  setRec: (id: RecId, lane: Partial<RecLane>) => void;
}

const PERSIST_KEY = "steel-studio-v1";
const HARD = PATTERNS.hardstyle;

type Persisted = Pick<
  StudioState,
  | "lang"
  | "genre"
  | "bpm"
  | "swing"
  | "bufferSize"
  | "host"
  | "channels"
  | "master"
  | "width"
  | "centerLock"
  | "drive"
  | "glue"
  | "ceiling"
  | "translate"
  | "fxChain"
  | "tuneAmount"
  | "restoreOn"
  | "visualStyle"
  | "visualPrompt"
  | "vocalLang"
  | "vocalKind"
  | "nightLane"
  | "voiceBank"
  | "recs"
  | "activeRec"
  | "dirtBias"
  | "theoryPaste"
  | "rhymeSeed"
  | "lyrics"
  | "hook"
>;

/** @deprecated Legacy zip-era mixer store (`steel-studio-v1`). Winner for OS-target is `useRack` (see WAVE2-CONTRACT-LOCK, WAVE3-USERACK-MIGRATE). Do not grow new OS-path callers; keep until P4/P5 retire importers. */
export const useStudio = create<StudioState>((set) => ({
  tab: "desk",
  lang: "et",
  genre: "hardstyle",
  bpm: HARD.bpm,
  swing: HARD.swing,
  playing: false,
  armed: false,
  recording: false,
  bufferSize: 128,
  sampleRate: 48000,
  host: "standalone",
  channels: emptyMix(),
  master: 0.82,
  width: 0.55,
  centerLock: true,
  drive: 0.52,
  glue: 0.5,
  ceiling: 0.92,
  translate: "festival",
  fxChain: "hard-delay",
  tuneAmount: 0.7,
  restoreOn: true,
  visualStyle: "auto",
  visualPrompt: "",
  lyrics: "",
  stillUrl: null,
  peak: 0,
  rms: 0,
  voices: 0,
  cpu: 0,
  step: 0,
  latency: 2.7,
  signal: 0,
  need: 0,
  velocity: 0,
  mid: 0,
  side: 0,
  pitch: 0,
  mic: null,
  inputLive: false,
  vocalName: null,
  beatName: null,
  processing: false,
  processNote: null,
  error: null,
  lastNote: "—",
  vocalLang: "et",
  vocalKind: "whisper",
  nightLane: false,
  voiceBank: "lead",
  hook: "",
  radarNote: null,
  path: "hybrid",
  signalScore: 0.5,
  visFps: 60,
  visQuality: 1,
  cores: 4,
  memoryGb: null,
  connection: "unknown",
  steps: HARD.steps,
  bassMidi: HARD.bassMidi,
  leadMidi: HARD.leadMidi,
  recs: emptyRecs(),
  activeRec: "r1",
  dirtBias: 0.45,
  theoryPaste: "",
  rhymeSeed: "",
  rhymeOut: "",
  geoLine: null,
  geoBusy: false,
  chainLog: [],
  voiceCap: EMPTY_CAP,
  takeOwned: false,
  kindBusy: false,
  setTab: (tab) => set({ tab }),
  patch: (partial) => set(partial),
  setChannel: (id, mix) =>
    set((s) => ({ channels: { ...s.channels, [id]: { ...s.channels[id], ...mix } } })),
  toggleStep: (id, step) =>
    set((s) => {
      const next = s.steps[id].slice();
      next[step] = next[step] > 0.2 ? 0 : 1;
      return { steps: { ...s.steps, [id]: next } };
    }),
  setRec: (id, lane) =>
    set((s) => ({ recs: { ...s.recs, [id]: { ...s.recs[id], ...lane } } })),
}));

function slicePersist(s: StudioState): Persisted {
  return {
    lang: s.lang,
    genre: s.genre,
    bpm: s.bpm,
    swing: s.swing,
    bufferSize: s.bufferSize,
    host: s.host,
    channels: s.channels,
    master: s.master,
    width: s.width,
    centerLock: s.centerLock,
    drive: s.drive,
    glue: s.glue,
    ceiling: s.ceiling,
    translate: s.translate,
    fxChain: s.fxChain,
    tuneAmount: s.tuneAmount,
    restoreOn: s.restoreOn,
    visualStyle: s.visualStyle,
    visualPrompt: s.visualPrompt,
    vocalLang: s.vocalLang,
    vocalKind: s.vocalKind,
    nightLane: s.nightLane,
    voiceBank: s.voiceBank,
    recs: s.recs,
    activeRec: s.activeRec,
    dirtBias: s.dirtBias,
    theoryPaste: s.theoryPaste,
    rhymeSeed: s.rhymeSeed,
    lyrics: s.lyrics,
    hook: s.hook,
  };
}

/** @deprecated Reads `steel-studio-v1` into `useStudio`. OS-target must not call this (AppShell hydrates steel/desk only). See WAVE2-CONTRACT-LOCK F2 / WAVE3-USERACK-MIGRATE P0. */
export function hydrateStudio() {
  if (typeof localStorage === "undefined") return;
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw) as Partial<Persisted>;
    const next: Partial<StudioState> = {};
    if (saved.lang === "et" || saved.lang === "en") next.lang = saved.lang;
    if (saved.genre) next.genre = saved.genre;
    if (typeof saved.bpm === "number") next.bpm = saved.bpm;
    if (typeof saved.swing === "number") next.swing = saved.swing;
    if (saved.bufferSize) next.bufferSize = saved.bufferSize;
    if (saved.host) next.host = saved.host;
    if (saved.channels) next.channels = { ...emptyMix(), ...saved.channels };
    if (typeof saved.master === "number") next.master = saved.master;
    if (typeof saved.width === "number") next.width = saved.width;
    if (typeof saved.centerLock === "boolean") next.centerLock = saved.centerLock;
    if (typeof saved.drive === "number") next.drive = saved.drive;
    if (typeof saved.glue === "number") next.glue = saved.glue;
    if (typeof saved.ceiling === "number") next.ceiling = saved.ceiling;
    if (saved.translate) next.translate = saved.translate;
    if (saved.fxChain) next.fxChain = saved.fxChain;
    if (typeof saved.tuneAmount === "number") next.tuneAmount = saved.tuneAmount;
    if (typeof saved.restoreOn === "boolean") next.restoreOn = saved.restoreOn;
    if (saved.visualStyle) next.visualStyle = saved.visualStyle;
    if (typeof saved.visualPrompt === "string") next.visualPrompt = saved.visualPrompt;
    if (isVocalLang(saved.vocalLang)) next.vocalLang = saved.vocalLang;
    if (isVocalKind(saved.vocalKind)) next.vocalKind = saved.vocalKind;
    if (typeof saved.nightLane === "boolean") next.nightLane = saved.nightLane;
    if (saved.voiceBank) next.voiceBank = saved.voiceBank;
    if (saved.recs) {
      const recs = emptyRecs();
      for (const id of REC_IDS) {
        const row = (saved.recs as Partial<Record<RecId, RecLane>>)[id];
        if (row) recs[id] = { ...recs[id], ...row, id };
      }
      next.recs = recs;
    }
    if (saved.activeRec) next.activeRec = saved.activeRec;
    if (typeof saved.dirtBias === "number") next.dirtBias = saved.dirtBias;
    if (typeof saved.theoryPaste === "string") next.theoryPaste = saved.theoryPaste;
    if (typeof saved.rhymeSeed === "string") next.rhymeSeed = saved.rhymeSeed;
    if (typeof saved.lyrics === "string") next.lyrics = saved.lyrics;
    if (typeof saved.hook === "string") next.hook = saved.hook;
    useStudio.getState().patch(next);
  } catch {
    /* ignore */
  }
}

/** @deprecated Persists `useStudio` slice to `steel-studio-v1`. OS-target must not subscribe; legacy StudioShell only. See WAVE2-CONTRACT-LOCK F2 / WAVE3-USERACK-MIGRATE P0. */
export function watchStudioPersist() {
  return useStudio.subscribe((s, prev) => {
    if (
      s.peak !== prev.peak ||
      s.rms !== prev.rms ||
      s.voices !== prev.voices ||
      s.cpu !== prev.cpu ||
      s.step !== prev.step ||
      s.playing !== prev.playing ||
      s.armed !== prev.armed ||
      s.tab !== prev.tab ||
      s.latency !== prev.latency ||
      s.velocity !== prev.velocity ||
      s.path !== prev.path ||
      s.signalScore !== prev.signalScore ||
      s.visFps !== prev.visFps ||
      s.cores !== prev.cores ||
      s.processing !== prev.processing ||
      s.processNote !== prev.processNote ||
      s.rhymeOut !== prev.rhymeOut ||
      s.geoLine !== prev.geoLine ||
      s.geoBusy !== prev.geoBusy ||
      s.chainLog !== prev.chainLog ||
      s.kindBusy !== prev.kindBusy ||
      s.takeOwned !== prev.takeOwned ||
      s.voiceCap !== prev.voiceCap ||
      s.error !== prev.error ||
      s.pitch !== prev.pitch
    ) {
      return;
    }
    try {
      localStorage.setItem(PERSIST_KEY, JSON.stringify(slicePersist(s)));
    } catch {
      /* quota */
    }
  });
}

/** Winner store for OS-target place/paste/seed/rhyme/geo/chain/pins (`steel-atlas-pins-v1`). Re-export from `./rack-store` — prefer this over deprecated `useStudio`. */
export { useRack, type StudioRack, type PlacePins } from "./rack-store";
