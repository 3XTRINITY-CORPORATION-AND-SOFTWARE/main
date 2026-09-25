import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import PptxGenJS from "pptxgenjs";
import { BUS_DROPS, BUS_OBJECTS, BUS_WAVE, busGazette } from "./bus";
import { EXTRA_IDS } from "./theory";
import { downloadBlob } from "@/lib/utils";

const INK = "0c0c0e";
const MUTE = "6a6e72";
const LIVE = "3d9a8c";
const PAPER = "f3eee4";

export async function exportBusPdf() {
  const g = busGazette();
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const page = doc.addPage([612, 792]);
  const ink = rgb(0.05, 0.05, 0.055);
  const mute = rgb(0.42, 0.43, 0.45);
  const live = rgb(0.24, 0.6, 0.55);
  let y = 740;
  page.drawText("STEEL  BUS", { x: 54, y, size: 11, font: bold, color: live });
  y -= 28;
  page.drawText(`Wave ${g.wave}  ·  extras ${g.extrasCount}  ·  objects ${BUS_OBJECTS.length}`, {
    x: 54,
    y,
    size: 16,
    font: bold,
    color: ink,
  });
  y -= 22;
  page.drawText(g.fiveX, { x: 54, y, size: 10, font, color: mute });
  y -= 28;
  page.drawText("Drops (brief only — no ffmpeg)", { x: 54, y, size: 11, font: bold, color: ink });
  y -= 16;
  for (const d of g.drops) {
    page.drawText(`${d.id}  ${d.hasSeed ? "seed locked" : "tags"}  ${d.brief.slice(0, 70)}`, {
      x: 54,
      y,
      size: 9,
      font,
      color: ink,
    });
    y -= 14;
  }
  y -= 10;
  page.drawText("Named objects", { x: 54, y, size: 11, font: bold, color: ink });
  y -= 16;
  for (const o of BUS_OBJECTS) {
    page.drawText(`${o.id.padEnd(14)}  ${o.door}  ${o.why.slice(0, 64)}`, {
      x: 54,
      y,
      size: 8,
      font,
      color: ink,
    });
    y -= 12;
  }
  y -= 8;
  page.drawText(`Extras  ${EXTRA_IDS.join("  ")}`, { x: 54, y, size: 8, font, color: mute });
  y -= 16;
  page.drawText("clone false · extra11 false · geo ip-api only · command-block forwards", {
    x: 54,
    y,
    size: 8,
    font,
    color: live,
  });
  const bytes = await doc.save();
  const copy = new Uint8Array(bytes);
  downloadBlob(new Blob([copy], { type: "application/pdf" }), `steel-bus-wave-${BUS_WAVE}.pdf`);
}

export async function exportBusDocx() {
  const g = busGazette();
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun({ text: `STEEL bus · wave ${g.wave}`, color: INK, bold: true })],
          }),
          new Paragraph({ children: [new TextRun({ text: g.fiveX, color: MUTE, size: 20 })] }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "Drops", color: LIVE })],
          }),
          ...g.drops.map(
            (d) =>
              new Paragraph({
                children: [
                  new TextRun({ text: `${d.id} · ${d.hasSeed ? "seed locked" : "tags"} · ${d.brief}`, size: 20 }),
                ],
              }),
          ),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "Objects", color: LIVE })],
          }),
          ...BUS_OBJECTS.map(
            (o) =>
              new Paragraph({
                children: [new TextRun({ text: `${o.id} · ${o.door} · ${o.why}`, size: 18 })],
              }),
          ),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [new TextRun({ text: `Extras ${EXTRA_IDS.join(" · ")}`, size: 18, color: MUTE })],
          }),
        ],
      },
    ],
  });
  const blob = await Packer.toBlob(doc);
  downloadBlob(blob, `steel-bus-wave-${BUS_WAVE}.docx`);
}

export async function exportBusPptx() {
  const g = busGazette();
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: "STEEL", width: 13.333, height: 7.5 });
  pptx.layout = "STEEL";
  pptx.title = `STEEL bus wave ${g.wave}`;
  const s = pptx.addSlide();
  s.background = { color: PAPER };
  s.addText("STEEL BUS", { x: 0.7, y: 0.5, w: 12, h: 0.3, fontSize: 12, color: LIVE, bold: true, charSpacing: 3 });
  s.addText(`Wave ${g.wave}`, { x: 0.7, y: 1.0, w: 12, h: 0.7, fontSize: 32, fontFace: "Georgia", color: INK, bold: true });
  s.addText(g.fiveX, { x: 0.7, y: 1.8, w: 12, h: 0.4, fontSize: 14, color: MUTE });
  s.addText(
    g.drops.map((d) => `${d.id}  ${d.hasSeed ? "seed" : "tags"}  ${d.brief}`).join("\n"),
    { x: 0.7, y: 2.4, w: 12, h: 1.2, fontSize: 14, color: INK },
  );
  s.addText(BUS_OBJECTS.map((o) => o.id).join("   "), {
    x: 0.7,
    y: 4.0,
    w: 12,
    h: 1.6,
    fontSize: 12,
    color: INK,
  });
  s.addText("clone false · extra 11 false · geo isolated · chain forwards", {
    x: 0.7,
    y: 6.5,
    w: 12,
    h: 0.3,
    fontSize: 12,
    color: LIVE,
  });
  const blob = (await pptx.write({ outputType: "blob" })) as Blob;
  downloadBlob(blob, `steel-bus-wave-${BUS_WAVE}.pptx`);
}
