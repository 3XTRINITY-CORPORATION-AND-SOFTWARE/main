import type { SteelTab } from "@/lib/steel/types";
import type { ExtraId } from "./theory";

/** Three-place app: OS kernel is the motor, web is the remote, host is FL/Live/Logic. */
export type PlaceId = "os" | "web" | "host";

export const PLACES: { id: PlaceId; et: string; en: string; ru: string; note: string }[] = [
  { id: "os", et: "OS tuum", en: "OS kernel", ru: "Ядро ОС", note: "ASIO / worklet. Motor lives here." },
  { id: "web", et: "Veeb kaugjuht", en: "Web remote", ru: "Веб-пульт", note: "This page. Packets and mix. Capable remote — the motor is OS." },
  { id: "host", et: "Host", en: "Host", ru: "Хост", note: "FL / Live / Logic on the machine. No disk scan." },
];

export const PLACE_HOME: Record<PlaceId, SteelTab> = {
  os: "kernel",
  web: "desk",
  host: "hosts",
};

export const PLACE_TABS: Record<PlaceId | "lab", SteelTab[]> = {
  os: ["kernel", "console", "pipeline"],
  web: ["desk", "studio"],
  host: ["hosts"],
  lab: ["aura", "audit"],
};

export function placeForTab(tab: SteelTab): PlaceId | "lab" {
  if (tab === "kernel" || tab === "console" || tab === "pipeline") return "os";
  if (tab === "desk" || tab === "studio") return "web";
  if (tab === "hosts") return "host";
  return "lab";
}

export type ExpansionLane = {
  extra: ExtraId;
  os: string;
  web: string;
  host: string;
};

/** 10 extras × 3 places — the 3-expansion map. Web never pretends to be the OS. */
export const EXPANSIONS: ExpansionLane[] = [
  { extra: "MI44OR-5GEM", os: "5-gen analog body", web: "kare + spine tags", host: "bank sat/width" },
  { extra: "WHISP3RER", os: "bit-aware dither", web: "fade / slack", host: "container depth" },
  { extra: "DIRT-COL", os: "sat topology", web: "drive write", host: "dirt curve" },
  { extra: "CLEAR-COL", os: "subtractive cut", web: "HPF / scoop", host: "mud-void plugin" },
  { extra: "THEORY-SPINE", os: "recipe in kernel", web: "theory-mirror", host: "genre map" },
  { extra: "ENERGY-MATCH", os: "crest target", web: "glue / LUFS", host: "loudness lane" },
  { extra: "TAKT-LOCK", os: "grid in motor", web: "auto-takt", host: "FL piano-roll grid" },
  { extra: "GYRATOR-AIR", os: "SVF high shelf", web: "8–16k EQ", host: "air-well" },
  { extra: "PRESHAPE-SAT", os: "pre-sat cut", web: "2–4k EQ", host: "presence-iron" },
  { extra: "STEREO-MX", os: "M/S matrix", web: "Kärestik width", host: "host stereo" },
];

export function placeLabel(id: PlaceId, lang: "et" | "en" | "ru") {
  const p = PLACES.find((x) => x.id === id) ?? PLACES[0];
  return p[lang];
}
