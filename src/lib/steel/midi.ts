import { playNote, sendNote } from "./engine";
import { useSteel } from "./store";
import type { MidiPortInfo } from "./types";

let access: MIDIAccess | null = null;
let boundIn: MIDIInput | null = null;
const heldKeys = new Set<string>();

/** Ableton-style computer keyboard, C4–C5. */
export const COMPUTER_KEYS: Record<string, number> = {
  a: 60,
  w: 61,
  s: 62,
  e: 63,
  d: 64,
  f: 65,
  t: 66,
  g: 67,
  y: 68,
  h: 69,
  u: 70,
  j: 71,
  k: 72,
};

export const KEY_LABEL: Record<number, string> = Object.fromEntries(
  Object.entries(COMPUTER_KEYS).map(([k, n]) => [n, k.toUpperCase()]),
);

const NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function noteLabel(note: number) {
  return `${NAMES[note % 12]}${Math.floor(note / 12) - 1}`;
}

function listPorts(a: MIDIAccess): MidiPortInfo[] {
  const ports: MidiPortInfo[] = [];
  a.inputs.forEach((p) => {
    ports.push({
      id: p.id,
      name: p.name || "MIDI in",
      manufacturer: p.manufacturer || "",
      type: "in",
    });
  });
  a.outputs.forEach((p) => {
    ports.push({
      id: p.id,
      name: p.name || "MIDI out",
      manufacturer: p.manufacturer || "",
      type: "out",
    });
  });
  return ports;
}

function onMidi(ev: MIDIMessageEvent) {
  const data = ev.data;
  if (!data || data.length < 1) return;
  const status = data[0] & 0xf0;
  const note = data[1] ?? 0;
  const vel = (data[2] ?? 0) / 127;
  if (status === 0x90 && vel > 0) {
    sendNote(true, note, vel);
    useSteel.getState().patch({ lastNote: `${noteLabel(note)} · ${Math.round(vel * 127)}` });
  } else if (status === 0x80 || (status === 0x90 && vel === 0)) {
    sendNote(false, note);
  } else if (status === 0xb0) {
    const cc = data[1];
    const v = (data[2] ?? 0) / 127;
    const patch = useSteel.getState().patch;
    useSteel.getState().patch({ lastCc: `CC ${cc} · ${Math.round(v * 127)}` });
    if (cc === 7) patch({ master: v });
    else if (cc === 1) patch({ satAmt: v });
    else if (cc === 10) patch({ inGain: 0.2 + v * 1.8 });
    else if (cc === 74 || cc === 19) patch({ eqHi: 0.4 + v * 1.4 });
    else if (cc === 71 || cc === 18) patch({ eqMid: 0.4 + v * 1.4 });
    else if (cc === 17) patch({ eqLo: 0.4 + v * 1.4 });
    else if (cc === 16) patch({ thresh: 0.1 + v * 0.7 });
    else if (cc === 76) patch({ hpHz: 30 + v * 370 });
  }
}

function isTypingTarget(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA" || el.isContentEditable;
}

function onKeyDown(e: KeyboardEvent) {
  if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
  const tab = useSteel.getState().tab;
  if (tab === "aura" || tab === "desk" || tab === "audit") return;
  if (isTypingTarget(e.target)) return;
  const key = e.key.toLowerCase();
  const note = COMPUTER_KEYS[key];
  if (note == null) return;
  e.preventDefault();
  if (heldKeys.has(key)) return;
  heldKeys.add(key);
  useSteel.getState().patch({ lastNote: noteLabel(note) });
  void playNote(true, note, 0.85);
}

function onKeyUp(e: KeyboardEvent) {
  const key = e.key.toLowerCase();
  const note = COMPUTER_KEYS[key];
  if (note == null) return;
  heldKeys.delete(key);
  sendNote(false, note);
}

export function bindComputerKeys() {
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
}

export function unbindComputerKeys() {
  window.removeEventListener("keydown", onKeyDown);
  window.removeEventListener("keyup", onKeyUp);
  heldKeys.clear();
}

export async function enableMidi() {
  if (!navigator.requestMIDIAccess) return;
  access = await navigator.requestMIDIAccess({ sysex: false });
  useSteel.getState().patch({ midiPorts: listPorts(access) });
  access.onstatechange = () => {
    if (access) useSteel.getState().patch({ midiPorts: listPorts(access) });
  };
  const firstIn = [...access.inputs.values()][0];
  if (firstIn) selectMidiIn(firstIn.id);
}

export function selectMidiIn(id: string | null) {
  if (boundIn) {
    boundIn.onmidimessage = null;
    boundIn = null;
  }
  useSteel.getState().patch({ midiIn: id });
  if (!id || !access) return;
  const port = access.inputs.get(id);
  if (!port) return;
  boundIn = port;
  port.onmidimessage = onMidi;
}

export function selectMidiOut(id: string | null) {
  useSteel.getState().patch({ midiOut: id });
}
