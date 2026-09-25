import ExcelJS from "exceljs";
import type { AuditReport } from "@/lib/audit/types";
import { downloadBlob, formatStampDate, slugify } from "@/lib/utils";

const INK = "FF161410";
const STAMP = "FF9A3412";
const PAPER = "FFF3EEE4";
const SAGE = "FF3F6212";
const MUTED = "FF6B6458";

export async function exportXlsx(report: AuditReport) {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Attest";
  wb.created = new Date(report.auditedAt);

  const cover = wb.addWorksheet("Cover", { views: [{ showGridLines: false }] });
  cover.columns = [{ width: 28 }, { width: 56 }, { width: 18 }];
  cover.mergeCells("A1:C1");
  cover.getCell("A1").value = "ATTEST";
  cover.getCell("A1").font = { name: "Arial", size: 14, bold: true, color: { argb: STAMP } };
  cover.mergeCells("A2:C2");
  cover.getCell("A2").value = report.name;
  cover.getCell("A2").font = { name: "Arial", size: 22, bold: true, color: { argb: INK } };
  cover.getCell("A4").value = "Verdict";
  cover.getCell("B4").value = report.grade;
  cover.getCell("B4").font = { name: "Arial", size: 28, bold: true, color: { argb: STAMP } };
  cover.getCell("A5").value = "Score";
  cover.getCell("B5").value = report.score;
  cover.getCell("B5").font = { name: "Arial", size: 18, color: { argb: INK } };
  cover.getCell("A6").value = "Audited";
  cover.getCell("B6").value = formatStampDate(new Date(report.auditedAt));
  cover.getCell("A8").value = "Summary";
  cover.mergeCells("B8:C10");
  cover.getCell("B8").value = report.summary;
  cover.getCell("B8").alignment = { wrapText: true, vertical: "top" };
  cover.getCell("A12").value = "Jobs";
  cover.getCell("B12").value = report.stats.jobs;
  cover.getCell("A13").value = "Steps";
  cover.getCell("B13").value = report.stats.steps;
  cover.getCell("A14").value = "Triggers";
  cover.getCell("B14").value = report.stats.triggers.join(", ");
  cover.getCell("A15").value = "GITHUB_TOKEN";
  cover.getCell("B15").value = report.stats.usesGithubToken ? "yes" : "no";
  cover.getCell("A16").value = "GitHub App token";
  cover.getCell("B16").value = report.stats.usesAppToken ? "yes" : "no";
  ["A4", "A5", "A6", "A8", "A12", "A13", "A14", "A15", "A16"].forEach((addr) => {
    cover.getCell(addr).font = { name: "Arial", size: 11, color: { argb: MUTED } };
  });

  const findings = wb.addWorksheet("Findings");
  findings.columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Severity", key: "severity", width: 12 },
    { header: "Title", key: "title", width: 42 },
    { header: "Location", key: "location", width: 28 },
    { header: "Rule", key: "rule", width: 24 },
    { header: "Detail", key: "detail", width: 56 },
    { header: "Remediation", key: "fix", width: 56 },
    { header: "Weight", key: "weight", width: 10 },
  ];
  const header = findings.getRow(1);
  header.font = { name: "Arial", bold: true, color: { argb: INK } };
  header.fill = { type: "pattern", pattern: "solid", fgColor: { argb: PAPER } };
  header.height = 22;

  const weightOf: Record<string, number> = {
    critical: 28,
    high: 16,
    medium: 8,
    low: 3,
    info: 0,
    pass: 0,
  };

  report.findings.forEach((f, i) => {
    const row = findings.addRow({
      id: `F-${String(i + 1).padStart(3, "0")}`,
      severity: f.severity,
      title: f.title,
      location: f.location ?? "workflow",
      rule: f.rule,
      detail: f.detail,
      fix: f.remediation,
      weight: weightOf[f.severity] ?? 0,
    });
    row.font = { name: "Arial", size: 10, color: { argb: INK } };
    row.alignment = { wrapText: true, vertical: "top" };
    row.height = 48;
    const sev = row.getCell("severity");
    sev.font = {
      name: "Arial",
      bold: true,
      color: { argb: f.severity === "pass" ? SAGE : f.severity === "info" ? MUTED : STAMP },
    };
  });

  const last = report.findings.length + 1;
  const summary = wb.addWorksheet("Summary");
  summary.columns = [{ width: 28 }, { width: 16 }, { width: 18 }];
  summary.getCell("A1").value = "Severity";
  summary.getCell("B1").value = "Count";
  summary.getCell("C1").value = "Share of findings";
  summary.getRow(1).font = { name: "Arial", bold: true };
  summary.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: PAPER } };
  const labels = ["critical", "high", "medium", "low", "info", "pass"];
  labels.forEach((label, i) => {
    const r = i + 2;
    summary.getCell(`A${r}`).value = label;
    summary.getCell(`B${r}`).value = { formula: `COUNTIF(Findings!B:B,A${r})` };
    summary.getCell(`C${r}`).value = {
      formula: `IF(SUM($B$2:$B$7)=0,0,B${r}/SUM($B$2:$B$7))`,
    };
    summary.getCell(`C${r}`).numFmt = "0.0%";
  });
  summary.getCell("A9").value = "Findings";
  summary.getCell("B9").value = { formula: "SUM(B2:B7)" };
  summary.getCell("A10").value = "Penalty points";
  summary.getCell("B10").value = { formula: "SUM(Findings!H2:H" + Math.max(last, 2) + ")" };
  summary.getCell("A11").value = "Score";
  summary.getCell("B11").value = { formula: "MAX(0,100-B10)" };
  summary.getCell("B11").font = { name: "Arial", size: 16, bold: true, color: { argb: STAMP } };
  summary.getCell("A13").value = "Source: Attest static analysis of workflow YAML";
  summary.getCell("A13").font = { name: "Arial", italic: true, color: { argb: MUTED }, size: 9 };

  const buf = await wb.xlsx.writeBuffer();
  downloadBlob(
    new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
    `attest-${slugify(report.name)}.xlsx`,
  );
}
