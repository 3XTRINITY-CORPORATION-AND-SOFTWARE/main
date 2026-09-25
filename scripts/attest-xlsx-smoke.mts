/**
 * WAVE4 Attest XLSX smoke — real exportXlsx + FIXTURE_REPORT (canonical AuditReport).
 * DOM stub only for downloadBlob. Run: npx tsx scripts/attest-xlsx-smoke.mts
 * Evidence: docs/ops/export/WAVE4-XLSX-SMOKE.md
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "../docs/ops/export/artifacts");
mkdirSync(outDir, { recursive: true });

type Captured = { blob: Blob | null; filename: string | null };
const captured: Captured = { blob: null, filename: null };

(globalThis as any).document = {
  createElement(tag: string) {
    if (tag !== "a") throw new Error("unexpected element " + tag);
    const el: any = {
      href: "",
      download: "",
      rel: "",
      click() {
        captured.filename = el.download || captured.filename;
      },
      remove() {},
    };
    return el;
  },
  body: { appendChild(_n: unknown) {} },
};
(globalThis as any).URL.createObjectURL = (blob: Blob) => {
  captured.blob = blob;
  return "blob:attest-xlsx-smoke";
};
(globalThis as any).URL.revokeObjectURL = () => {};
(globalThis as any).window = { setTimeout };

const { FIXTURE_REPORT } = await import("../src/lib/audit/fixtures.ts");
const { exportXlsx } = await import("../src/lib/export/xlsx.ts");

const keys = Object.keys(FIXTURE_REPORT).sort();
for (const k of ["name", "score", "grade", "summary", "findings", "stats", "yaml", "auditedAt"]) {
  if (!(k in FIXTURE_REPORT)) throw new Error("FIXTURE missing AuditReport field: " + k);
}
if (typeof FIXTURE_REPORT.stats.hasPermissions !== "boolean") {
  throw new Error("stats.hasPermissions missing — not canonical AuditReport");
}
if (typeof FIXTURE_REPORT.yaml !== "string") {
  throw new Error("yaml missing — not canonical AuditReport");
}

console.log("fixture:", FIXTURE_REPORT.name, "keys:", keys.join(","));
await exportXlsx(FIXTURE_REPORT);
if (!captured.blob) {
  console.error("FAIL: downloadBlob never received a blob");
  process.exit(1);
}

const bytes = Buffer.from(await captured.blob.arrayBuffer());
const outPath = join(outDir, "attest-ci-yml.xlsx");
writeFileSync(outPath, bytes);

const magic = bytes.subarray(0, 4);
const magicHex = [...magic].map((b) => b.toString(16).padStart(2, "0")).join(" ");
const isZip = magic[0] === 0x50 && magic[1] === 0x4b && magic[2] === 0x03 && magic[3] === 0x04;

console.log(JSON.stringify({
  filename: captured.filename,
  outPath,
  size: bytes.length,
  magicHex,
  isZip,
  contentType: captured.blob.type,
  hasPermissions: FIXTURE_REPORT.stats.hasPermissions,
}, null, 2));

if (!isZip || bytes.length < 100) {
  console.error("FAIL: bad XLSX output");
  process.exit(1);
}
console.log("SMOKE_OK");
