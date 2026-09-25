/** Grapheme → viseme for ET/EN/RU/ES/DE. Not A–Z only. Lip-lock from a locked seed. */
export type Viseme = "rest" | "closed" | "wide" | "round" | "teeth" | "open";

const MAP: Record<string, Viseme> = {
  a: "open",
  ä: "open",
  á: "open",
  à: "open",
  â: "open",
  e: "wide",
  é: "wide",
  è: "wide",
  ê: "wide",
  ë: "wide",
  i: "teeth",
  í: "teeth",
  ï: "teeth",
  y: "teeth",
  o: "round",
  ö: "round",
  õ: "round",
  ó: "round",
  ò: "round",
  u: "round",
  ü: "round",
  ú: "round",
  ù: "round",
  m: "closed",
  b: "closed",
  p: "closed",
  f: "teeth",
  v: "teeth",
  w: "round",
  l: "teeth",
  r: "open",
  s: "teeth",
  š: "teeth",
  ß: "teeth",
  z: "teeth",
  ž: "teeth",
  t: "teeth",
  d: "teeth",
  n: "teeth",
  ñ: "teeth",
  k: "open",
  g: "open",
  h: "open",
  j: "wide",
  q: "round",
  x: "teeth",
  c: "teeth",
  " ": "rest",
  ".": "rest",
  ",": "rest",
  ";": "rest",
  ":": "rest",
  "!": "rest",
  "?": "rest",
  "¿": "rest",
  "¡": "rest",
  "\n": "rest",
  // RU / UK
  а: "open",
  я: "open",
  э: "wide",
  е: "wide",
  є: "wide",
  и: "teeth",
  ы: "teeth",
  й: "teeth",
  і: "teeth",
  ї: "teeth",
  о: "round",
  ё: "round",
  у: "round",
  ю: "round",
  б: "closed",
  п: "closed",
  м: "closed",
  в: "teeth",
  ф: "teeth",
  с: "teeth",
  з: "teeth",
  ц: "teeth",
  ш: "teeth",
  ж: "teeth",
  щ: "teeth",
  ч: "teeth",
  т: "teeth",
  д: "teeth",
  н: "teeth",
  л: "teeth",
  р: "open",
  к: "open",
  г: "open",
  ґ: "open",
  х: "open",
  ь: "rest",
  ъ: "rest",
};

export function visemeAt(lyrics: string, t: number, bpm: number, rms: number): Viseme {
  const text = lyrics.trim();
  if (!text || rms < 0.02) return "rest";
  const chars = [...text.toLowerCase()];
  const spb = 60 / Math.max(60, bpm);
  const idx = Math.floor((t / (spb * 0.25)) % chars.length);
  const ch = chars[Math.max(0, idx)] ?? " ";
  let v = MAP[ch] ?? "open";
  if (rms > 0.28 && (v === "rest" || v === "closed")) v = "open";
  if (rms < 0.05) v = "closed";
  return v;
}

export function visemePath(v: Viseme): { w: number; h: number; rx: number } {
  switch (v) {
    case "closed":
      return { w: 0.42, h: 0.06, rx: 0.4 };
    case "wide":
      return { w: 0.72, h: 0.16, rx: 0.5 };
    case "round":
      return { w: 0.32, h: 0.32, rx: 0.5 };
    case "teeth":
      return { w: 0.58, h: 0.12, rx: 0.2 };
    case "open":
      return { w: 0.5, h: 0.38, rx: 0.45 };
    default:
      return { w: 0.36, h: 0.08, rx: 0.5 };
  }
}
