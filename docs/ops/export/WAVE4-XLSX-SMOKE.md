> **CLAIM & MERGE (2026-09-19):** Export XLSX Attest WAVE4 **PASS** landed to org STEEL.
> Artifact: `docs/ops/export/artifacts/attest-ci-yml.xlsx` · Runner: `scripts/attest-xlsx-smoke.mts`

# WAVE 4 — Export Attest smoke (XLSX path)

**Agent:** Export XLSX · **WIP=1** · **No UI redesign** · **AuditReport UNCHANGED** · **XLSX only**  
**Date:** 2026-09-19 06:07 EEST (Europe/Tallinn)  
**Tree:** `/workspace/steel-canonical`  
**Contract lock:** `/workspace/steel-studio-ops/WAVE2-CONTRACT-LOCK.md`  
  - §E / §3.5: **AuditReport FROZEN/UNCHANGED** — exporters take only canonical `@/lib/audit/types` `AuditReport` (includes `stats.hasPermissions` + `yaml`; `Grade`/`Finding` from same module).  
  - Export must not import studio rack/UI.  
  - Did **not** use older draft stubs from `/workspace/export-drafts/`.  
  - Pattern mirrors WAVE2 PDF + WAVE3 DOCX smokes (`wave2-export-smoke.ts` / `wave3-docx-smoke.ts`).

---

## What was tried

1. Cited WAVE2 contract lock: AuditReport frozen; real exporters at `src/lib/export/{pdf,docx,xlsx,pptx}.ts`.
2. Mirrored WAVE3 DOCX smoke for **XLSX** — same fixture, DOM-only stub, real `exportXlsx`.
3. Installed deps in `/workspace/steel-canonical` (`npm ci`) — tree previously lacked `node_modules` / `exceljs`.
4. Ran one-shot (`/workspace/steel-export-evidence/wave4-xlsx-smoke.ts`) that:
   - Imports **REAL** `exportXlsx` from `/workspace/steel-canonical/src/lib/export/xlsx.ts`
   - Imports **REAL** `FIXTURE_REPORT` from `/workspace/steel-canonical/src/lib/audit/fixtures.ts` (canonical contract; has `yaml` + `stats.hasPermissions`)
   - Stubs **only** the browser `downloadBlob` DOM surface (`document` / `URL.createObjectURL`) so Node can capture bytes — **no invented export format**, no stubbed AuditReport shape, no studio/rack imports.

## Command(s) run

```bash
cd /workspace/steel-canonical && npm ci --prefer-offline --no-audit --no-fund
cd /workspace/steel-canonical && npx --yes tsx /workspace/steel-export-evidence/wave4-xlsx-smoke.ts
```

Stdout (abridged): `fixture: ci.yml keys: auditedAt,findings,grade,name,score,stats,summary,yaml` → magic `50 4b 03 04` (PK\x03\x04) → `SMOKE_OK`.

## Format / path

| Item | Value |
|------|--------|
| Format | **XLSX** |
| Entry | `src/lib/export/xlsx.ts#exportXlsx` |
| Input | `src/lib/audit/fixtures.ts#FIXTURE_REPORT` → canonical `AuditReport` |
| UI | not exercised (`ExportMenu` left unchanged) |
| Studio | not imported |

**AuditReport used unchanged:** fixture keys match frozen contract (`name`, `score`, `grade`, `summary`, `findings`, `stats` incl. `hasPermissions`, `yaml`, `auditedAt`). No field adds/renames; not export-draft stubs.

## Evidence

| Artifact | Path | Size | Magic |
|----------|------|------|-------|
| Sample XLSX | `/workspace/steel-export-evidence/artifacts/attest-ci-yml.xlsx` | **9274** bytes | **`PK\x03\x04`** (`50 4b 03 04`) OOXML/ZIP |
| Smoke script | `/workspace/steel-export-evidence/wave4-xlsx-smoke.ts` | — | — |
| This report | `/workspace/steel-export-evidence/WAVE4-XLSX-SMOKE.md` | — | — |

Download filename captured from real `downloadBlob`: `attest-ci-yml.xlsx`  
Content-Type: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`

**Not claimed green:** PPTX / ExportMenu UI — only XLSX path proven this wave (PDF PASS in WAVE2, DOCX PASS in WAVE3).

## RESULT
- status: PASS
- format: XLSX
- entry: src/lib/export/xlsx.ts#exportXlsx
- evidence: /workspace/steel-export-evidence/WAVE4-XLSX-SMOKE.md
- notes: Real exportXlsx + FIXTURE_REPORT (canonical AuditReport per WAVE2-CONTRACT-LOCK); 9274B PK\x03\x04 OOXML; DOM stub only for downloadBlob; npm ci required (node_modules was missing)
