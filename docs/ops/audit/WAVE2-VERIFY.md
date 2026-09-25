# WAVE 2 VERIFY — Evidence-only gate report

**Agent:** Steel Audit Guard  
**Date:** 2026-09-17 (Europe/Tallinn)  
**Mode:** Read evidence only — no full-repo rescan  
**Constraint:** No invented claims; PASS/FAIL only what the cited files support

---

## Evidence inputs (all present)

| # | Path | Present |
|---|------|---------|
| 1 | `/workspace/steel-canonical/SOURCE-OF-TRUTH.md` | YES |
| 2 | `/workspace/steel-abraham-compile/PATCH-NOTES.md` | YES |
| 3 | `/workspace/steel-studio-ops/WAVE2-CONTRACT-LOCK.md` | YES |
| 4 | `/workspace/steel-desk-ops/WAVE2-DESK-SMOKE.md` | YES |
| 5 | `/workspace/steel-export-evidence/WAVE2-EXPORT-SMOKE.md` | YES |
| 6 | `/workspace/steel-ci-drafts/LOCAL-DRY-RUN.md` | YES |

Spot-check (verify pass only): export PDF artifact `/workspace/steel-export-evidence/artifacts/attest-ci-yml.pdf` exists (1746 B); first 8 bytes `25 50 44 46 2d 31 2e 37` = `%PDF-1.7`. `gh auth status` → **not logged in**.

---

## Gate table

| Gate | Verdict | Evidence basis |
|------|---------|----------------|
| **G0 SoT present** | **PASS** | `SOURCE-OF-TRUTH.md` documents zip→overlay merge; audit libs marked real (not stubbed); leftovers called out. |
| **G1 Compile (typecheck + build)** | **PASS** | `PATCH-NOTES.md`: `npm run typecheck` PASS, `npm run build` PASS; `PATCH_DIFF: none`. Soft: Node 22+ preferred; desk engine `@ts-nocheck`. |
| **G2 Studio contract lock** | **PASS** | `WAVE2-CONTRACT-LOCK.md`: SteelTab includes `"studio"`; steel HostId canonical for shell; `useRack` winner; desk↔rack fields OK in recovered DeskState; **AuditReport FROZEN**; FAIL: none; BLOCKERS: none for lock. |
| **G3 Desk smoke** | **PASS** | `WAVE2-DESK-SMOKE.md`: RESULT **PASS**; typecheck exit 0; browser-smoke-verdict **40/40**; aligned to contract lock. Soft non-goals: interactive Desk browser path (P2), full `browser-smoke.mjs` not run (no live URL). |
| **G4 Export Attest smoke** | **PASS (PDF only)** | `WAVE2-EXPORT-SMOKE.md`: real `exportPdf` + canonical `FIXTURE_REPORT`; artifact `%PDF-1.7` 1746 B. **Not claimed:** DOCX / XLSX / PPTX / ExportMenu UI. |
| **G5 CI local dry-run** | **FAIL** | `LOCAL-DRY-RUN.md`: Install / Typecheck / Build **PASS** on Node 22; **`npm test` FAIL** exit 1 — 195 tests, **182 pass / 13 fail**. Wire-up ready?: **no**. |
| **G6 gh / remote PR path** | **BLOCKED** | `gh auth status` on this box: not logged into any GitHub hosts. Corroborated by evidence: PATCH-NOTES `NO_GH_RETRY: true` + “PRs still wait on `gh` auth”; Desk smoke “No gh”. |

---

## CI Test FAIL detail (honest)

From `LOCAL-DRY-RUN.md` only:

| Category | Count (as reported) | Notes |
|----------|---------------------|-------|
| Missing `.grok/skills/og/` | 4 | `brand-check` + `write-atomic` ENOENT |
| `grok-pwa-plugin` assertion mismatch | 8 | chrome title `STEEL STUDIO` vs expected app/og.grok.me patterns |
| `migration-plan` | 1 | expected `[]`, got `0002_steel_rows.sql` in glob |
| **Total** | **13** | Scripts suite fails; `src/lib/**/*.test.ts` never ran (`&&` after scripts) |

Also noted: Node 20 cannot expand `scripts/**/*.test.mjs` (CI draft pins Node 22 — correct for CI shape).

---

## Overall

| | |
|--|--|
| **OVERALL** | **FAIL** |
| **Why** | Product/compile/contract/desk/export-PDF gates are green per evidence, but **G5 CI Test is red** (`npm test` 13 failures). Merging `vite-ci.yml` as-is would fail CI. **G6 gh is BLOCKED**, so hardening-docs / community PRs cannot land from this environment until device auth completes. |
| **Would be PASS if** | CI Test gate fixed or quarantined **and** (for publish path) `gh` authenticated. |

---

## Soft / residual (not overall FAIL drivers)

- Node 20 vs 22 preference (EBADENGINE warnings; CI draft correctly pins 22).
- Desk `engine.ts` `@ts-nocheck` recovered (contract lock F3).
- Interactive Desk browser smoke still P2 follow-up.
- Export: only PDF proven; other formats not green.
- Studio F1–F5 migrations (useStudio deprecate path) — non-blocking for WAVE 2 lock.

---

## RESULT handoff (CoS)

```
RESULT: WAVE2 VERIFY COMPLETE
OVERALL: FAIL
FILE: /workspace/steel-audit-ops/WAVE2-VERIFY.md
PASS: G0 SoT, G1 typecheck+build, G2 contract lock, G3 desk smoke, G4 export PDF-only
FAIL: G5 CI npm test (13 failures; wire-up ready = no)
BLOCKED: G6 gh (not logged in — no PR/push from this box)
CHANGED: WAVE2-VERIFY.md only (evidence read; no source edits; no full rescan)
NEXT: Fix/quarantine failing script tests before vite-ci wire-up; Theodor finish gh device auth → then hardening-docs / SECURITY.md PR per prior hold
```
