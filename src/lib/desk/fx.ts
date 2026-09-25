export type DelayId = "off" | "1/4" | "1/8" | "1/16" | "1/32" | "dotted8" | "dotted4" | "slap" | "ping";
export type ReverbId = "off" | "plate" | "hall" | "gated" | "reverse" | "spring" | "room";
export type GenreId = "hardstyle" | "rawstyle" | "hardtechno" | "commercial";

export const DELAYS: { id: DelayId; et: string; en: string; ru: string }[] = [
  { id: "off", et: "Off", en: "Off", ru: "Выкл" },
  { id: "slap", et: "Slap", en: "Slap", ru: "Slap" },
  { id: "1/4", et: "1/4", en: "1/4", ru: "1/4" },
  { id: "1/8", et: "1/8", en: "1/8", ru: "1/8" },
  { id: "1/16", et: "1/16", en: "1/16", ru: "1/16" },
  { id: "1/32", et: "1/32", en: "1/32", ru: "1/32" },
  { id: "dotted8", et: "Punkt 1/8", en: "Dotted 1/8", ru: "Пункт 1/8" },
  { id: "dotted4", et: "Punkt 1/4", en: "Dotted 1/4", ru: "Пункт 1/4" },
  { id: "ping", et: "Ping-pong", en: "Ping-pong", ru: "Пинг-понг" },
];

export const REVERBS: { id: ReverbId; et: string; en: string; ru: string }[] = [
  { id: "off", et: "Off", en: "Off", ru: "Выкл" },
  { id: "room", et: "Tuba", en: "Room", ru: "Комната" },
  { id: "plate", et: "Plaat", en: "Plate", ru: "Плейт" },
  { id: "spring", et: "Vedru", en: "Spring", ru: "Пружина" },
  { id: "hall", et: "Saal", en: "Hall", ru: "Зал" },
  { id: "gated", et: "Gated", en: "Gated", ru: "Gated" },
  { id: "reverse", et: "Tagurpidi", en: "Reverse", ru: "Реверс" },
];

export const GENRES: { id: GenreId; et: string; en: string; ru: string }[] = [
  { id: "hardstyle", et: "Hardstyle", en: "Hardstyle", ru: "Hardstyle" },
  { id: "rawstyle", et: "Rawstyle", en: "Rawstyle", ru: "Rawstyle" },
  { id: "hardtechno", et: "Hard techno", en: "Hard techno", ru: "Hard techno" },
  { id: "commercial", et: "Commercial", en: "Commercial", ru: "Commercial" },
];

export function delaySeconds(id: DelayId, bpm: number) {
  const b = 60 / Math.max(60, bpm);
  if (id === "1/4") return b;
  if (id === "1/8" || id === "ping") return b / 2;
  if (id === "1/16") return b / 4;
  if (id === "1/32") return b / 8;
  if (id === "dotted8") return (b / 2) * 1.5;
  if (id === "dotted4") return b * 1.5;
  if (id === "slap") return 0.075;
  return 0.01;
}

function noiseIR(ctx: BaseAudioContext, seconds: number, decay: number, reverse: boolean) {
  const len = Math.max(32, Math.floor(ctx.sampleRate * seconds));
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const ch = buf.getChannelData(c);
    for (let i = 0; i < len; i++) {
      const t = reverse ? (len - 1 - i) / len : i / len;
      ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay);
    }
  }
  return buf;
}

export function irFor(ctx: BaseAudioContext, id: ReverbId) {
  if (id === "plate") return noiseIR(ctx, 0.9, 2.2, false);
  if (id === "hall") return noiseIR(ctx, 2.4, 1.6, false);
  if (id === "gated") return noiseIR(ctx, 0.28, 0.7, false);
  if (id === "reverse") return noiseIR(ctx, 0.7, 1.1, true);
  if (id === "spring") return noiseIR(ctx, 0.55, 2.8, false);
  if (id === "room") return noiseIR(ctx, 0.45, 2, false);
  return noiseIR(ctx, 0.12, 3, false);
}

export function genrePreset(g: GenreId) {
  if (g === "rawstyle")
    return { delay: "1/16" as DelayId, reverb: "gated" as ReverbId, delayMix: 0.22, reverbMix: 0.16, drive: 0.38, amount: 0.82 };
  if (g === "hardtechno")
    return { delay: "1/8" as DelayId, reverb: "plate" as ReverbId, delayMix: 0.18, reverbMix: 0.12, drive: 0.3, amount: 0.7 };
  if (g === "commercial")
    return { delay: "1/8" as DelayId, reverb: "hall" as ReverbId, delayMix: 0.12, reverbMix: 0.18, drive: 0.14, amount: 0.62 };
  return { delay: "ping" as DelayId, reverb: "gated" as ReverbId, delayMix: 0.2, reverbMix: 0.22, drive: 0.28, amount: 0.76 };
}

export function classifyMic(label: string) {
  const l = label.toLowerCase();
  if (/bluetooth|airpod|hands-?free/.test(l))
    return { tag: "bt", hpf: 150, presence: 6, hz: 3800, air: 4 };
  if (/usb|yeti|at2020|rode|scarlett|focusrite|shure|sm7|quadcast/.test(l))
    return { tag: "usb", hpf: 70, presence: 2.2, hz: 2800, air: 1.2 };
  if (/headset|headphone|earbud/.test(l))
    return { tag: "headset", hpf: 115, presence: 4.5, hz: 3500, air: 2.8 };
  return { tag: "built-in", hpf: 125, presence: 5, hz: 3400, air: 3.2 };
}

/** V = s/t — punch vs wash. High V: kick in the centre, short nest. */
export function kareFromV(v: number) {
  const n = Math.min(1, Math.max(0, v));
  return {
    nestSec: 0.055 + (1 - n) * 0.4,
    nestGain: 0.05 + (1 - n) * 0.2,
    tunnelGain: 0.4 + n * 0.55,
    mirrorSec: 0.007 + (1 - n) * 0.014,
    vocalPush: 0.92 + n * 0.14,
  };
}
