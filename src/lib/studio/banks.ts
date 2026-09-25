import type { Genre } from "./types";

export const PLUGIN_IDS = ["edge-cut", "mud-void", "presence-iron", "sat-plate", "air-well"] as const;
export type PluginId = (typeof PLUGIN_IDS)[number];

export type RecId = "r1" | "r2" | "r3" | "r4" | "r5" | "r6";
export const REC_IDS: RecId[] = ["r1", "r2", "r3", "r4", "r5", "r6"];

export type ScaleId = "minor" | "major" | "chromatic" | "phrygian";

export interface BankCurve {
  hp: number;
  scoopHz: number;
  scoopDb: number;
  presenceHz: number;
  presenceDb: number;
  airHz: number;
  airDb: number;
  sat: number;
  delay: number;
  space: number;
  retune: number;
  amount: number;
  formant: number;
  width: number;
  dirt: number;
  clear: number;
  key: number;
  scale: ScaleId;
  genre: Genre;
}

export interface SoundBank {
  id: string;
  name: string;
  lane: "rap" | "hard";
  noteEt: string;
  noteEn: string;
  curve: BankCurve;
}

const r = (
  id: string,
  name: string,
  lane: "rap" | "hard",
  noteEt: string,
  noteEn: string,
  curve: BankCurve,
): SoundBank => ({ id, name, lane, noteEt, noteEn, curve });

/** Original STEEL banks — style recipes, not artist clones. */
export const BANKS: SoundBank[] = [
  r("glasswire", "GLASSWIRE", "rap", "Õhuline auto, kõrge sosin, digiruum.", "Airy auto, high whisper, digital space.", {
    hp: 90, scoopHz: 280, scoopDb: -3.5, presenceHz: 3400, presenceDb: 4.2, airHz: 9000, airDb: 2.4,
    sat: 0.12, delay: 0.22, space: 0.38, retune: 0.018, amount: 0.86, formant: 1.12, width: 0.62, dirt: 0.22, clear: 0.7, key: 9, scale: "minor", genre: "trap",
  }),
  r("graveink", "GRAVEINK", "rap", "Tume lõuna, tükeldatud 808, porine vokaal.", "Dark south, chopped 808, grimy vocal.", {
    hp: 70, scoopHz: 320, scoopDb: -1.5, presenceHz: 2200, presenceDb: 2.2, airHz: 7000, airDb: -0.8,
    sat: 0.42, delay: 0.08, space: 0.22, retune: 0.08, amount: 0.45, formant: 0.92, width: 0.38, dirt: 0.78, clear: 0.28, key: 4, scale: "minor", genre: "trap",
  }),
  r("blockiron", "BLOCKIRON", "rap", "Kõva 808, tänava takt, kuiv kesk.", "Hard 808, street takt, dry mid.", {
    hp: 80, scoopHz: 250, scoopDb: -2.8, presenceHz: 2800, presenceDb: 3.6, airHz: 8200, airDb: 0.6,
    sat: 0.28, delay: 0.12, space: 0.16, retune: 0.05, amount: 0.58, formant: 1.0, width: 0.44, dirt: 0.55, clear: 0.48, key: 7, scale: "minor", genre: "rap",
  }),
  r("nightvein", "NIGHTVEIN", "rap", "Öine moll, märg ruum, pikk saba.", "Night minor, wet space, long tail.", {
    hp: 85, scoopHz: 360, scoopDb: -2.2, presenceHz: 3100, presenceDb: 3.0, airHz: 10000, airDb: 3.2,
    sat: 0.16, delay: 0.34, space: 0.55, retune: 0.06, amount: 0.72, formant: 1.08, width: 0.7, dirt: 0.32, clear: 0.62, key: 2, scale: "minor", genre: "trap",
  }),
  r("razorlung", "RAZORLUNG", "rap", "Moonutatud kops, lai, metalliline serv.", "Distorted lung, wide, metallic edge.", {
    hp: 110, scoopHz: 400, scoopDb: -4.0, presenceHz: 3800, presenceDb: 5.5, airHz: 11000, airDb: 1.8,
    sat: 0.72, delay: 0.1, space: 0.28, retune: 0.03, amount: 0.64, formant: 0.84, width: 0.78, dirt: 0.88, clear: 0.22, key: 11, scale: "phrygian", genre: "trap",
  }),
  r("rapidlock", "RAPIDLOCK", "rap", "Tihe siseriim, kuiv ette, lühike delay.", "Dense internal rhyme, dry-forward, short delay.", {
    hp: 95, scoopHz: 300, scoopDb: -3.2, presenceHz: 3600, presenceDb: 4.8, airHz: 8500, airDb: 1.1,
    sat: 0.14, delay: 0.14, space: 0.12, retune: 0.04, amount: 0.38, formant: 1.0, width: 0.32, dirt: 0.18, clear: 0.82, key: 0, scale: "minor", genre: "rap",
  }),
  r("queenscold", "QUEENSCOLD", "rap", "Boom bap, tolmune, napp ruum.", "Boom bap, dusty, sparse room.", {
    hp: 75, scoopHz: 270, scoopDb: -1.8, presenceHz: 2400, presenceDb: 2.8, airHz: 6500, airDb: -0.4,
    sat: 0.24, delay: 0.06, space: 0.18, retune: 0.14, amount: 0.22, formant: 0.96, width: 0.28, dirt: 0.6, clear: 0.4, key: 5, scale: "minor", genre: "rap",
  }),
  r("westgrid", "WESTGRID", "rap", "Rääkiv-laul, terav kohalolu, ründav.", "Talk-sung, sharp presence, aggressive.", {
    hp: 88, scoopHz: 310, scoopDb: -2.4, presenceHz: 3000, presenceDb: 4.0, airHz: 7800, airDb: 0.8,
    sat: 0.22, delay: 0.1, space: 0.14, retune: 0.07, amount: 0.34, formant: 1.04, width: 0.4, dirt: 0.48, clear: 0.55, key: 7, scale: "minor", genre: "rap",
  }),
  r("highwire", "HIGHWIRE", "rap", "Kõrge nina, bounce, lühike noot.", "High nasal, bounce, short notes.", {
    hp: 120, scoopHz: 340, scoopDb: -3.8, presenceHz: 4200, presenceDb: 5.0, airHz: 9200, airDb: 1.6,
    sat: 0.18, delay: 0.16, space: 0.2, retune: 0.035, amount: 0.5, formant: 1.18, width: 0.48, dirt: 0.35, clear: 0.6, key: 9, scale: "major", genre: "rap",
  }),
  r("vowfire", "VOWFIRE", "rap", "Pikk noot, soe kesk, õhuline saba.", "Long notes, warm mid, airy tail.", {
    hp: 70, scoopHz: 240, scoopDb: -2.0, presenceHz: 2600, presenceDb: 3.4, airHz: 8800, airDb: 2.8,
    sat: 0.2, delay: 0.2, space: 0.42, retune: 0.16, amount: 0.4, formant: 0.98, width: 0.52, dirt: 0.3, clear: 0.68, key: 2, scale: "minor", genre: "rap",
  }),
  r("eastmirror", "EASTMIRROR", "rap", "Mellic moll, raske auto, peegelruum.", "Melodic minor, heavy auto, mirror space.", {
    hp: 92, scoopHz: 300, scoopDb: -2.6, presenceHz: 3300, presenceDb: 3.8, airHz: 9600, airDb: 2.6,
    sat: 0.15, delay: 0.28, space: 0.48, retune: 0.022, amount: 0.9, formant: 1.06, width: 0.66, dirt: 0.26, clear: 0.74, key: 4, scale: "minor", genre: "trap",
  }),
  r("punchgale", "PUNCHGALE", "hard", "Euforiline reverse, lai vokaal, 150.", "Euphoric reverse, wide vocal, 150.", {
    hp: 100, scoopHz: 380, scoopDb: -3.0, presenceHz: 3500, presenceDb: 4.4, airHz: 10500, airDb: 3.0,
    sat: 0.26, delay: 0.18, space: 0.4, retune: 0.05, amount: 0.7, formant: 1.1, width: 0.72, dirt: 0.28, clear: 0.72, key: 7, scale: "major", genre: "hardstyle",
  }),
  r("ironcrest", "IRONCREST", "hard", "Screech-anthem, pitch-üles, raud.", "Screech anthem, pitch-up, iron.", {
    hp: 105, scoopHz: 400, scoopDb: -3.4, presenceHz: 3700, presenceDb: 5.0, airHz: 11200, airDb: 2.2,
    sat: 0.34, delay: 0.14, space: 0.32, retune: 0.04, amount: 0.76, formant: 1.14, width: 0.68, dirt: 0.4, clear: 0.6, key: 11, scale: "minor", genre: "hardstyle",
  }),
  r("icefound", "ICEFOUND", "hard", "Toores/euforiline hübriid, formant.", "Raw/euphoric hybrid, formant.", {
    hp: 108, scoopHz: 360, scoopDb: -3.6, presenceHz: 3900, presenceDb: 4.6, airHz: 10800, airDb: 1.8,
    sat: 0.4, delay: 0.12, space: 0.3, retune: 0.03, amount: 0.8, formant: 0.9, width: 0.6, dirt: 0.52, clear: 0.5, key: 9, scale: "minor", genre: "rawstyle",
  }),
  r("warplate", "WARPLATE", "hard", "Toored kickid, tööstuslik plaat.", "Raw kicks, industrial plate.", {
    hp: 95, scoopHz: 280, scoopDb: -2.0, presenceHz: 2500, presenceDb: 3.2, airHz: 8000, airDb: 0.4,
    sat: 0.55, delay: 0.08, space: 0.18, retune: 0.09, amount: 0.42, formant: 0.88, width: 0.36, dirt: 0.82, clear: 0.24, key: 4, scale: "phrygian", genre: "rawstyle",
  }),
  r("fistcore", "FISTCORE", "hard", "Gabber-serv, kõva lagi, lühike.", "Gabber edge, hard ceiling, short.", {
    hp: 115, scoopHz: 420, scoopDb: -4.2, presenceHz: 4100, presenceDb: 5.2, airHz: 9000, airDb: 0.2,
    sat: 0.68, delay: 0.05, space: 0.1, retune: 0.06, amount: 0.48, formant: 0.86, width: 0.3, dirt: 0.9, clear: 0.18, key: 0, scale: "chromatic", genre: "rawstyle",
  }),
  r("rawhive", "RAWHIVE", "hard", "Rawstyle drive, kärg, kitsas kick.", "Rawstyle drive, hive, tight kick.", {
    hp: 102, scoopHz: 340, scoopDb: -3.1, presenceHz: 3600, presenceDb: 4.0, airHz: 9800, airDb: 1.2,
    sat: 0.48, delay: 0.1, space: 0.22, retune: 0.045, amount: 0.66, formant: 0.94, width: 0.5, dirt: 0.7, clear: 0.38, key: 7, scale: "minor", genre: "rawstyle",
  }),
  r("altarraw", "ALTARRAW", "hard", "Tume raw, altar, madal õhk.", "Dark raw, altar, low air.", {
    hp: 90, scoopHz: 260, scoopDb: -2.2, presenceHz: 2700, presenceDb: 3.5, airHz: 7400, airDb: -0.6,
    sat: 0.5, delay: 0.16, space: 0.26, retune: 0.055, amount: 0.6, formant: 0.91, width: 0.46, dirt: 0.76, clear: 0.3, key: 3, scale: "phrygian", genre: "rawstyle",
  }),
  r("zancut", "ZANCUT", "hard", "Klassikaline hardstyle lead, lõige.", "Classic hardstyle lead, cut.", {
    hp: 98, scoopHz: 370, scoopDb: -2.8, presenceHz: 3400, presenceDb: 4.3, airHz: 10200, airDb: 2.0,
    sat: 0.3, delay: 0.15, space: 0.28, retune: 0.05, amount: 0.68, formant: 1.05, width: 0.58, dirt: 0.36, clear: 0.64, key: 5, scale: "major", genre: "hardstyle",
  }),
  r("nightpeak", "NIGHTPEAK", "hard", "Peak-time techno, öine lagi.", "Peak-time techno, night ceiling.", {
    hp: 85, scoopHz: 300, scoopDb: -2.5, presenceHz: 2900, presenceDb: 3.3, airHz: 8600, airDb: 1.4,
    sat: 0.38, delay: 0.09, space: 0.2, retune: 0.1, amount: 0.3, formant: 0.97, width: 0.42, dirt: 0.58, clear: 0.46, key: 2, scale: "minor", genre: "techno",
  }),
];

export const BANK_BY_ID: Record<string, SoundBank> = Object.fromEntries(BANKS.map((b) => [b.id, b]));

export interface RecLane {
  id: RecId;
  bankId: string | null;
  loaded: boolean;
  armed: boolean;
  gain: number;
  edit: Partial<BankCurve>;
}

export function emptyRecs(): Record<RecId, RecLane> {
  const out = {} as Record<RecId, RecLane>;
  for (const id of REC_IDS) {
    out[id] = { id, bankId: null, loaded: false, armed: id === "r1", gain: 0.86, edit: {} };
  }
  return out;
}

export function resolvedCurve(lane: RecLane): BankCurve | null {
  if (!lane.bankId || !lane.loaded) return null;
  const bank = BANK_BY_ID[lane.bankId];
  if (!bank) return null;
  return { ...bank.curve, ...lane.edit };
}

export function armedCurve(recs: Record<RecId, RecLane>): BankCurve | null {
  const armed = REC_IDS.map((id) => recs[id]).find((r) => r.armed && r.loaded);
  if (armed) return resolvedCurve(armed);
  const any = REC_IDS.map((id) => recs[id]).find((r) => r.loaded);
  return any ? resolvedCurve(any) : null;
}

export const PLUGIN_META: Record<PluginId, { et: string; en: string }> = {
  "edge-cut": { et: "EDGE-CUT · kõrgpääs", en: "EDGE-CUT · high-pass" },
  "mud-void": { et: "MUD-VOID · mudaauk", en: "MUD-VOID · mud scoop" },
  "presence-iron": { et: "PRESENCE-IRON · kohalolu", en: "PRESENCE-IRON · presence" },
  "sat-plate": { et: "SAT-PLATE · küllastus", en: "SAT-PLATE · saturation" },
  "air-well": { et: "AIR-WELL · ruum", en: "AIR-WELL · space" },
};
