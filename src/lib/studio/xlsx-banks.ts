import ExcelJS from "exceljs";
import { BANKS, PLUGIN_IDS } from "./banks";
import { EXTRA_IDS } from "./theory";
import { downloadBlob } from "@/lib/utils";

export async function exportBankBook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = "STEEL STUDIO";
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
  extras.columns = [{ header: "id", width: 16 }, { header: "role", width: 48 }];
  for (const id of EXTRA_IDS) extras.addRow([id, "theory-mirror extra"]);

  const buf = await wb.xlsx.writeBuffer();
  downloadBlob(
    new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
    "steel-banks.xlsx",
  );
}
