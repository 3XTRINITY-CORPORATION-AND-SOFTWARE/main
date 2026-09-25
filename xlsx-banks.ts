import ExcelJS from "exceljs";
import { downloadBlob } from "@/lib/utils";
import { ATLAS, ATLAS_COUNT } from "./atlas";
import { BANKS, PLUGIN_IDS } from "./banks";
import { BUS_OBJECTS } from "./bus";
import { EXPANSIONS, PLACES } from "./places";
import { EXTRA_IDS } from "./theory";

export async function exportBankBook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = "STEEL";
  wb.created = new Date();

  const sheet = wb.addWorksheet("Banks", { views: [{ state: "frozen", ySplit: 1 }] });
  sheet.columns = [
    { header: "id", width: 14 },
    { header: "name", width: 14 },
    { header: "lane", width: 8 },
    { header: "genre", width: 12 },
    { header: "hp", width: 8 },
    { header: "scoopHz", width: 10 },
    { header: "scoopDb", width: 10 },
    { header: "presenceHz", width: 12 },
    { header: "presenceDb", width: 12 },
    { header: "airHz", width: 10 },
    { header: "airDb", width: 8 },
    { header: "sat", width: 8 },
    { header: "delay", width: 8 },
    { header: "space", width: 8 },
    { header: "retune", width: 10 },
    { header: "amount", width: 10 },
    { header: "formant", width: 10 },
    { header: "width", width: 8 },
    { header: "dirt", width: 8 },
    { header: "clear", width: 8 },
    { header: "key", width: 8 },
    { header: "scale", width: 12 },
    { header: "note", width: 42 },
  ];
  for (const b of BANKS) {
    const c = b.curve;
    sheet.addRow([
      b.id, b.name, b.lane, c.genre, c.hp, c.scoopHz, c.scoopDb, c.presenceHz, c.presenceDb,
      c.airHz, c.airDb, c.sat, c.delay, c.space, c.retune, c.amount, c.formant, c.width,
      c.dirt, c.clear, c.key, c.scale, b.noteEn,
    ]);
  }

  const plug = wb.addWorksheet("Plugins");
  plug.columns = [{ header: "id", width: 18 }, { header: "loads after select", width: 28 }];
  for (const id of PLUGIN_IDS) plug.addRow([id, "yes — container sealed until pick"]);

  const extras = wb.addWorksheet("Extras");
  extras.columns = [{ header: "id", width: 16 }, { header: "os", width: 28 }, { header: "web", width: 28 }, { header: "host", width: 28 }];
  for (const lane of EXPANSIONS) extras.addRow([lane.extra, lane.os, lane.web, lane.host]);

  const places = wb.addWorksheet("Places");
  places.columns = [
    { header: "place", width: 10 },
    { header: "et", width: 18 },
    { header: "en", width: 18 },
    { header: "ru", width: 18 },
    { header: "note", width: 52 },
  ];
  for (const p of PLACES) places.addRow([p.id, p.et, p.en, p.ru, p.note]);

  const atlas = wb.addWorksheet("Atlas250", { views: [{ state: "frozen", ySplit: 1 }] });
  atlas.columns = [
    { header: "i", width: 6 },
    { header: "extra", width: 16 },
    { header: "kind", width: 10 },
    { header: "target", width: 16 },
    { header: "os", width: 36 },
    { header: "web", width: 36 },
    { header: "host", width: 36 },
  ];
  for (const c of ATLAS) atlas.addRow([c.i, c.extra, c.kind, c.target, c.os, c.web, c.host]);
  if (ATLAS.length !== ATLAS_COUNT) throw new Error("atlas sheet must be 250");

  const bus = wb.addWorksheet("Bus27");
  bus.columns = [
    { header: "id", width: 16 },
    { header: "wave", width: 8 },
    { header: "door", width: 18 },
    { header: "why", width: 52 },
  ];
  for (const o of BUS_OBJECTS) bus.addRow([o.id, o.wave, o.door, o.why]);

  const buf = await wb.xlsx.writeBuffer();
  downloadBlob(
    new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
    "steel-atlas-250.xlsx",
  );
}
