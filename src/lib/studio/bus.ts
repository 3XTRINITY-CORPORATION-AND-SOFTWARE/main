import { EXTRA_IDS } from "./theory";

/** Named facts on the bus. Not extras. Not a second motor. Wave 27. */
export const BUS_WAVE = 27;

export interface BusObject {
  id: string;
  wave: 26 | 27;
  door: "theory-mirror" | "rhyme-lock" | "equalizer" | "ip-api-lookup" | "command-block";
  why: string;
}

export const BUS_OBJECTS: BusObject[] = [
  { id: "HOST-FACE", wave: 26, door: "command-block", why: "Contract object only. Not a second motor." },
  { id: "STAB-NOTE", wave: 26, door: "theory-mirror", why: "Spine slot. Mid stability inside MI44OR-5GEM." },
  { id: "WRITE-LAYOUT", wave: 26, door: "equalizer", why: "Same compiled graph. Keep rate and depth." },
  { id: "FILE-DATE", wave: 26, door: "ip-api-lookup", why: "Date on disk. Not lat/lon. No third vendor." },
  { id: "ENJAMB-NOTE", wave: 27, door: "rhyme-lock", why: "Line-break vs TAKT-LOCK. Seed stays locked." },
  { id: "STAGE-NOTE", wave: 27, door: "equalizer", why: "Write constraint. LADDER-CORE stays the engine." },
  { id: "LADDER-EARLY", wave: 27, door: "equalizer", why: "When a write is thinned, keep earlier-stage nonlinearities first." },
  { id: "WDF-STATIC", wave: 27, door: "equalizer", why: "Same compiled graph we already name." },
  { id: "CV-GR", wave: 27, door: "equalizer", why: "Three numbers only. No fourth loudness pane." },
  { id: "METER-NOTE", wave: 27, door: "theory-mirror", why: "Crest / LUFS slot. Loudness does not restyle the house." },
  { id: "ONSET-NOTE", wave: 27, door: "theory-mirror", why: "PD magnitude into TAKT-LOCK. Not a pianist extra." },
  { id: "FORM-NOTE", wave: 27, door: "theory-mirror", why: "Form geometry, file-only. No timeline extra." },
  { id: "TSI-FORM", wave: 27, door: "theory-mirror", why: "File-only. α/β not printed." },
  { id: "GEO-MMDB", wave: 27, door: "ip-api-lookup", why: "Fallback when live dies. Same field mask." },
  { id: "R128-96K", wave: 27, door: "equalizer", why: "BS.1770-5 still in force. No fake I from upsample." },
  { id: "LANG-MIX", wave: 27, door: "rhyme-lock", why: "ET/EN/RU/ES/DE follows the seed. No A–Z fold." },
  { id: "TAG-WRITE", wave: 27, door: "equalizer", why: "Metadata only. PCM untouched." },
];

export interface BusDrop {
  id: "drop-a" | "drop-b";
  brief: string;
  seed: string;
  objects: string[];
  ffmpeg: false;
  clone: false;
}

/** Published lyrics from the promoted brief. Not a voice-print. URL never enters ffmpeg. */
export const BUS_DROPS: BusDrop[] = [
  {
    id: "drop-a",
    brief: "DEMXNS & ANGELS — sky, limits, angels fall. Brief only.",
    seed: [
      "In the sky, no ones watching us",
      "in the sky, no ones waiting",
      "the angels, will fall down",
      "the angels will fall",
      "",
      "how long can i pretend im fine, and my limits",
      "they’re all in my mind",
      "i dont know how much i can take",
      "i dont know how much i can take",
    ].join("\n"),
    objects: ["ENJAMB-NOTE", "TAKT-LOCK", "LANG-MIX", "STAGE-NOTE"],
    ffmpeg: false,
    clone: false,
  },
  {
    id: "drop-b",
    brief: "33rd glass — trap/boom stress. No published bars on the brief. Tags only.",
    seed: "",
    objects: ["ONSET-NOTE", "TAKT-LOCK", "DIRT-COL"],
    ffmpeg: false,
    clone: false,
  },
];

export function busGazette() {
  return {
    wave: BUS_WAVE,
    extras: [...EXTRA_IDS],
    extrasCount: EXTRA_IDS.length,
    objects: BUS_OBJECTS,
    drops: BUS_DROPS.map((d) => ({
      id: d.id,
      brief: d.brief,
      hasSeed: Boolean(d.seed.trim()),
      ffmpeg: false,
      clone: false,
    })),
    fiveX: "spine + dirt/clear + container honesty + takt lock + written curve",
    geo: "ip-api-lookup only. FILE-DATE is a date, not lat/lon.",
    commandBlock: "impulse → chain. Signal forwards. MOTOR always.",
    clone: false,
    extra11: false,
  };
}

export function assertBus() {
  if (EXTRA_IDS.length !== 10) throw new Error("extras must stay 10");
  if (BUS_OBJECTS.length !== 17) throw new Error("wave 27 lock is 17 named objects");
  if (BUS_OBJECTS.some((o) => (EXTRA_IDS as readonly string[]).includes(o.id))) {
    throw new Error("bus object must not collide with an extra id");
  }
}
