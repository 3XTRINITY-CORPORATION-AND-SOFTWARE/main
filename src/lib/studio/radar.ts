import type { RadarItem } from "./types";

/** Curated studio radar — not a live scrape. Honest, dated notes. */
export const RADAR: RadarItem[] = [
  {
    id: "fl-arrangement",
    source: "FL Studio",
    title: "Playlist clips follow the arrangement clock more tightly",
    note: "Recent FL playlist work emphasises clip start/end on the grid without stretching the audio file itself.",
    steel: "STEEL already snaps vocal grains to the 16-step grid. Next: clip envelopes per channel.",
  },
  {
    id: "ableton-mpe",
    source: "Ableton Live",
    title: "MPE expression on stock devices",
    note: "Live keeps pushing per-note slide and pressure into simpler devices, not only Push-era synths.",
    steel: "Web MIDI here is note + velocity. Pressure can ride the lead filter if a compatible controller is present.",
  },
  {
    id: "logic-stem",
    source: "Logic Pro",
    title: "Stem-split and bounce-in-place remain the mix-export path",
    note: "Logic’s stem workflow is still the reference for handing a vocal to video.",
    steel: "Bounce WAV is the web equivalent. Video stays on the visualizer clock, not a separate timeline yet.",
  },
];
