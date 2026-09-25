/** SSD1315 logic we can actually use — Solomon Rev 1.0:
 *  128×64 GDDRAM in 8 pages (COM0–63), D0 = top of page,
 *  contrast command 81h (POR 7Fh), FR-timed blit, horizontal content scroll.
 *  Not I2C, not SPI, not Vcc / charge-pump, not an audio DSP. */

export const OLED_W = 128;
export const OLED_H = 64;
const PAGES = 8;
const COLS = 128;

type Glyph = number[];

const FONT: Record<string, Glyph> = {
  " ": [0, 0, 0, 0, 0],
  "0": [0x3e, 0x45, 0x49, 0x51, 0x3e],
  "1": [0x00, 0x21, 0x7f, 0x01, 0x00],
  "2": [0x23, 0x45, 0x49, 0x49, 0x31],
  "3": [0x22, 0x41, 0x49, 0x49, 0x36],
  "4": [0x0c, 0x14, 0x24, 0x7f, 0x04],
  "5": [0x72, 0x51, 0x51, 0x51, 0x4e],
  "6": [0x3e, 0x49, 0x49, 0x49, 0x26],
  "7": [0x40, 0x47, 0x48, 0x50, 0x60],
  "8": [0x36, 0x49, 0x49, 0x49, 0x36],
  "9": [0x32, 0x49, 0x49, 0x49, 0x3e],
  A: [0x3f, 0x48, 0x48, 0x48, 0x3f],
  B: [0x7f, 0x49, 0x49, 0x49, 0x36],
  C: [0x3e, 0x41, 0x41, 0x41, 0x22],
  D: [0x7f, 0x41, 0x41, 0x41, 0x3e],
  E: [0x7f, 0x49, 0x49, 0x49, 0x41],
  F: [0x7f, 0x48, 0x48, 0x48, 0x40],
  G: [0x3e, 0x41, 0x49, 0x49, 0x2e],
  H: [0x7f, 0x08, 0x08, 0x08, 0x7f],
  I: [0x00, 0x41, 0x7f, 0x41, 0x00],
  K: [0x7f, 0x08, 0x14, 0x22, 0x41],
  L: [0x7f, 0x01, 0x01, 0x01, 0x01],
  M: [0x7f, 0x20, 0x18, 0x20, 0x7f],
  N: [0x7f, 0x10, 0x08, 0x04, 0x7f],
  O: [0x3e, 0x41, 0x41, 0x41, 0x3e],
  P: [0x7f, 0x48, 0x48, 0x48, 0x30],
  R: [0x7f, 0x48, 0x4c, 0x4a, 0x31],
  S: [0x32, 0x49, 0x49, 0x49, 0x26],
  T: [0x40, 0x40, 0x7f, 0x40, 0x40],
  U: [0x7e, 0x01, 0x01, 0x01, 0x7e],
  V: [0x7c, 0x02, 0x01, 0x02, 0x7c],
  W: [0x7e, 0x01, 0x0e, 0x01, 0x7e],
  X: [0x63, 0x14, 0x08, 0x14, 0x63],
  Y: [0x60, 0x10, 0x0f, 0x10, 0x60],
  Z: [0x43, 0x45, 0x49, 0x51, 0x61],
  ":": [0x00, 0x36, 0x36, 0x00, 0x00],
  ".": [0x00, 0x03, 0x03, 0x00, 0x00],
  "/": [0x03, 0x04, 0x08, 0x10, 0x60],
  "-": [0x08, 0x08, 0x08, 0x08, 0x08],
  "=": [0x14, 0x14, 0x14, 0x14, 0x14],
  "+": [0x08, 0x08, 0x3e, 0x08, 0x08],
  "#": [0x14, 0x7f, 0x14, 0x7f, 0x14],
};

const ram = new Uint8Array(PAGES * COLS);

function glyph(ch: string): Glyph {
  return FONT[ch] ?? FONT[ch.toUpperCase()] ?? [0x7f, 0x41, 0x41, 0x41, 0x7f];
}

function writeByte(page: number, col: number, byte: number) {
  if (page < 0 || page >= PAGES || col < 0 || col >= COLS) return;
  ram[page * COLS + col] = byte & 0xff;
}

function writeText(page: number, col: number, s: string) {
  let x = col;
  for (const ch of s) {
    const gl = glyph(ch);
    for (let c = 0; c < 5; c++) writeByte(page, x++, gl[c] ?? 0);
    x++;
  }
  return x;
}

function writeBar(page: number, col: number, width: number, n: number, pattern: number) {
  const fill = Math.max(0, Math.min(width, Math.round(n * width)));
  for (let i = 0; i < width; i++) writeByte(page, col + i, i < fill ? pattern : 0x00);
}

function writeScroll(page: number, s: string, shiftPx: number) {
  const cols: number[] = [];
  for (const ch of s) {
    const gl = glyph(ch);
    for (let c = 0; c < 5; c++) cols.push(gl[c] ?? 0);
    cols.push(0);
  }
  if (!cols.length) return;
  const period = cols.length;
  const off = ((shiftPx % period) + period) % period;
  for (let x = 0; x < COLS; x++) writeByte(page, x, cols[(off + x) % period] ?? 0);
}

function hexRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim();
  if (h.length < 6) return [232, 120, 58];
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

/** Contrast register 81h. I_SEG = (Contrast/32) × I_REF. POR = 7Fh. */
export function contrast81h(frame: OledFrame) {
  const peak = Math.min(1, Math.max(0, frame.peak));
  const kare = Math.min(1, Math.max(0, frame.kare));
  const n = 0x4a + kare * 0x6a + peak * 0x38 + (frame.playing ? 0x18 : 0);
  return Math.max(1, Math.min(255, Math.round(n)));
}

export type OledFrame = {
  peak: number;
  lufs: number;
  bpm: number;
  kare: number;
  playing: boolean;
  key: string;
  crawl: string;
  t: number;
};

const PAGE_TONE: Array<"ember" | "ice"> = [
  "ice",
  "ember",
  "ember",
  "ice",
  "ember",
  "ice",
  "ice",
  "ember",
];

export function paintOled(
  ctx: CanvasRenderingContext2D,
  frame: OledFrame,
  emberHex: string,
  iceHex: string,
) {
  ram.fill(0);

  const contrast = contrast81h(frame);
  const hex = contrast.toString(16).toUpperCase().padStart(2, "0");
  const v = Math.max(0, Math.min(1, frame.kare));
  const loud = Math.min(1, Math.max(0, (frame.lufs + 70) / 70));
  const crawl = (frame.crawl || "KARESTIK").toUpperCase().replace(/[^A-Z0-9 :=./#+-]/g, " ");

  writeText(0, 1, "STEEL 1315");
  writeText(0, 92, `${hex}h`);
  writeText(1, 1, frame.playing ? "LIVE" : "IDLE");
  writeText(1, 40, `${frame.bpm}|${frame.key}`.slice(0, 12));
  writeBar(2, 1, 126, Math.min(1, frame.peak), 0x3c);
  writeBar(3, 1, 126, loud, 0x3c);
  writeText(4, 1, `V=S/T ${v.toFixed(2)}`);
  writeText(5, 1, "TUN MIRR NEST");
  writeText(6, 1, `FR ${hex}h 64MUX`);
  writeScroll(7, `${crawl}   ${crawl}   `, Math.floor(frame.t * 18));

  if (Math.floor(frame.t * 60) % 2 === 0) {
    writeByte(0, 126, 0x01);
    writeByte(0, 127, 0x01);
  }

  const img = ctx.createImageData(OLED_W, OLED_H);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] = 8;
    d[i + 1] = 9;
    d[i + 2] = 8;
    d[i + 3] = 255;
  }

  const em = hexRgb(emberHex);
  const ice = hexRgb(iceHex);
  const scale = Math.max(0.78, contrast / 255);
  for (let page = 0; page < PAGES; page++) {
    const tone = PAGE_TONE[page] === "ember" ? em : ice;
    const r = Math.round(tone[0] * scale);
    const g = Math.round(tone[1] * scale);
    const b = Math.round(tone[2] * scale);
    for (let col = 0; col < COLS; col++) {
      const byte = ram[page * COLS + col] ?? 0;
      if (!byte) continue;
      for (let bit = 0; bit < 8; bit++) {
        if (!(byte & (1 << bit))) continue;
        const y = page * 8 + bit;
        const i = (y * OLED_W + col) * 4;
        d[i] = r;
        d[i + 1] = g;
        d[i + 2] = b;
        d[i + 3] = 255;
      }
    }
  }

  ctx.putImageData(img, 0, 0);
}
