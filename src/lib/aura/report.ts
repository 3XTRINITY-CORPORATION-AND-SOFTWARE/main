import type { CapsReport } from "./types";

export async function exportCapsXlsx(caps: CapsReport) {
  const ExcelJS = (await import("exceljs")).default;
  const wb = new ExcelJS.Workbook();
  wb.creator = "STEEL / AURA";
  const sheet = wb.addWorksheet("Caps");
  sheet.columns = [
    { header: "Field", width: 28 },
    { header: "Value", width: 72 },
  ];
  const rows: [string, string | number][] = [
    ["GPU", caps.gpu],
    ["WebGL", caps.webgl ? "yes" : "no"],
    ["Max texture", caps.maxTexture],
    ["Cores", caps.cores],
    ["DPR", caps.dpr],
    ["Screen", caps.screen],
    ["Refresh", `${caps.refresh} Hz`],
    ["Audio rate", `${caps.audioRate} Hz`],
    ["Audio RTL", `${caps.audioLatencyMs.toFixed(2)} ms`],
    ["Max channels", caps.maxChannels],
    ["Capture MIME", caps.mime],
    ["Record ceiling", `${caps.recordCeiling.w}×${caps.recordCeiling.h} @ ${caps.recordCeiling.fps}`],
    ["Quality arm", caps.recordCeiling.arm],
    ["IMAX", caps.imax],
    ["Audio target", "320 kbps · 44.1 kHz"],
    ["Latency target", "0.5 ms (overclock) — Web Audio quantum is larger"],
  ];
  rows.forEach((r) => sheet.addRow(r));
  const buf = await wb.xlsx.writeBuffer();
  const blob = new Blob([buf], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "aura-caps.xlsx";
  a.click();
  URL.revokeObjectURL(a.href);
}
