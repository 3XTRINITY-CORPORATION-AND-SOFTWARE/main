import type { HostId } from "./types";

export interface HostProfile {
  id: HostId;
  name: string;
  since: string;
  clock: string;
  midi: string[];
  steps: string[];
  map: { cc: number; dest: string }[];
}

export const HOSTS: HostProfile[] = [
  {
    id: "fl",
    name: "FL Studio",
    since: "20.8 MIDI engine (the line you called FL 17+) · 21+ current",
    clock: "Link optional · internal 24 ppq",
    midi: [
      "Options → MIDI → Enable MIDI input / output",
      "Controller type: generic controller. Sync: send MIDI clock if Steel is master",
      "Route Steel MIDI Out to an FL input (loopMIDI on Windows, a2jmidid on Linux)",
      "Mixer: insert Steel as an audio input via ASIO4ALL / PipeASIO, not WASAPI shared",
    ],
    steps: [
      "Install ASIO4ALL 2.22 (Windows) or PipeWire JACK (Linux).",
      "Audio settings → Device: ASIO4ALL v2 / PipeASIO. Buffer 128–256 at 48 kHz.",
      "Create a loopback MIDI port named STEEL.",
      "In Steel, pick that port. Notes hit MIDI poly; clock follows the transport.",
    ],
    map: [
      { cc: 1, dest: "Mod → sat amount" },
      { cc: 7, dest: "Master" },
      { cc: 10, dest: "Input trim" },
      { cc: 74, dest: "EQ high" },
      { cc: 71, dest: "EQ mid" },
      { cc: 76, dest: "High-pass Hz" },
    ],
  },
  {
    id: "ableton",
    name: "Ableton Live 12",
    since: "Live 12.0 · Extensions SDK 12.4.5+",
    clock: "Ableton Link when the host is on ASIO / PipeASIO",
    midi: [
      "Settings → Link, Tempo & MIDI → MIDI Ports: track / sync in+out on the STEEL port",
      "Control Surface: None (Steel speaks CCs) or a generated v3 remote script",
      "Extensions SDK (Suite 12.4.5+) can open Steel as a right-click tool; MIDI still carries transport",
      "Linux: enable Link only after PipeASIO is the audio device",
    ],
    steps: [
      "Audio → Driver Type: ASIO. Device: ASIO4ALL v2 (Win) or PipeASIO (Linux).",
      "Buffer 128 at 48 kHz for tracking; 256 for large sessions.",
      "Arm Link if other peers need the same clock. Steel follows MIDI clock when present.",
      "Map CCs below — Steel applies them live on the kernel.",
    ],
    map: [
      { cc: 1, dest: "Mod → sat amount" },
      { cc: 7, dest: "Master" },
      { cc: 16, dest: "Compressor threshold" },
      { cc: 17, dest: "EQ low" },
      { cc: 18, dest: "EQ mid" },
      { cc: 19, dest: "EQ high" },
    ],
  },
  {
    id: "generic",
    name: "Any ASIO host",
    since: "ASIO 2.x · Reaper, Bitwig, Cubase, Studio One, Mixbus",
    clock: "MIDI clock in · Link only if the host is on ASIO / PipeASIO",
    midi: [
      "Create a loopback port named STEEL (loopMIDI, rtpMIDI, or a2jmidid)",
      "Enable that port as a MIDI input on Steel and as an output in the host",
      "Do not use WASAPI / DirectSound / Pulse shared mode for the round-trip",
    ],
    steps: [
      "Windows: ASIO4ALL 2.22 as the device if the interface has no vendor ASIO.",
      "Linux: PipeWire JACK or PipeASIO. Wine 7.5+ for Windows-only hosts.",
      "Match sample rate with Steel (48 kHz default). Buffer 128–256.",
      "Send notes and CCs to Steel; tap Web out if another page needs the stream.",
    ],
    map: [
      { cc: 1, dest: "Mod → sat amount" },
      { cc: 7, dest: "Master" },
      { cc: 10, dest: "Input trim" },
      { cc: 16, dest: "Compressor threshold" },
    ],
  },
];
