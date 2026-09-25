# POST-MERGE VERIFY — gh `main`

**Agent:** Steel Audit Guard  
**Date:** 2026-09-17 (Europe/Tallinn)  
**WIP:** 1 → complete this file  
**Mode:** Live `gh` main + local evidence cross-check. **No invented claims.**  
**Repo:** `antonioportfelli-boop/STEEL-3XTRINITY-CORPORATION-OFFICIAL-APP-`  
**HEAD:** `2a6fb8fac371` — *Merge pull request #3 from antonioportfelli-boop/restore/canonical-src* (2026-09-17T05:47:55Z)

---

## Merged PRs (evidence)

| PR | Title | Merged (UTC) | Merge SHA |
|----|-------|--------------|-----------|
| #2 | chore: community health pack (CoC, CONTRIBUTING, templates, SECURITY) | 2026-09-17T05:47:44Z | `cf74b93b205c` |
| #3 | restore: canonical src/public/scripts (Option A — Desk + Export + Vite CI) | 2026-09-17T05:47:55Z | `2a6fb8fac371` |

Local corroboration: `/workspace/steel-ci-drafts/PR3-ACTIONS.md` (PR #3 Vite CI success on branch); `/workspace/steel-community-health/README.md` (community pack payload).

---

## Gate table

| Gate | Verdict | Evidence |
|------|---------|----------|
| **G1 `src/` on main** | **PASS** | Root listing includes `src/`. Recursive tree includes audit/jwt/desk/export/steel surfaces (e.g. `src/components/steel-audit.tsx`, `jwt-lab.tsx`, `permission-builder.tsx`, `src/lib/audit/engine.ts`, `github.ts`, `src/lib/export/pdf.ts`, `src/lib/steel/types.ts`). Tree count 275, `truncated: false`. |
| **G2 `ci.yml` on main** | **PASS** | Only workflow on main: `.github/workflows/ci.yml` (829 B) — **Vite CI**, Node 22, steps: Install → Typecheck → Build → Test. `webpack.yml` **absent** from `.github/workflows/`. Push to main after PR #3: Actions run [35187155157](https://github.com/antonioportfelli-boop/STEEL-3XTRINITY-CORPORATION-OFFICIAL-APP-/actions/runs/35187155157) — **Vite CI success**. |
| **G3 Community files** | **PASS** | On main: `SECURITY.md` (5547), `CODE_OF_CONDUCT.md` (5514), `CONTRIBUTING.md` (3231), `LICENSE` (MIT), `README.md`, `.github/pull_request_template.md`, `.github/ISSUE_TEMPLATE/{config,bug_report,feature_request}.yml`, plus `docs/hardening/{HARDENING_PASS_PLAN,SECURITY_CHECKLIST,SURFACE_MAP,SECURITY.md.draft.source}.md`. |
| **G4 Community health 100%** | **PASS** | `GET /repos/.../community/profile` → **`health_percentage`: 100**. Description + documentation URL set. Files reported present: code_of_conduct, contributing, pull_request_template, license, readme. |

---

## Honest caveats (not FAIL of the four gates)

1. **Community API `files.issue_template`: `null`** even though YAML issue forms exist under `.github/ISSUE_TEMPLATE/`. GitHub still reports **health_percentage 100**; do not invent that issue templates are “missing” on disk — they are present. The null field is an API quirk to note, not a gate fail.
2. **`README.md` is 43 bytes** on main (minimal). Community checklist still 100%; richer product README remains a follow-up, not part of this gate set.
3. **PR #2 push** also fired legacy **NodeJS with Webpack** run [35187143655](https://github.com/antonioportfelli-boop/STEEL-3XTRINITY-CORPORATION-OFFICIAL-APP-/actions/runs/35187143655) → **failure**. That workflow is **gone** after PR #3; current main only has Vite CI (green). Historical red webpack on the community merge event is recorded, not counted as G2 fail.
4. **Hardening residual (out of post-merge scope):** `ci.yml` still uses tag pins `actions/checkout@v4` / `setup-node@v4` (no full SHA). Prior Audit Guard P0 dogfood item — not flipped here as inventing a new gate.

---

## Spot checks (gh)

```
gh auth: logged in as antonioportfelli-boop (scopes: gist, read:org, repo, workflow)
default_branch: main
community/profile.health_percentage: 100
workflows on main: ci.yml only
main Vite CI (post-PR#3): success
```

---

## Overall

| | |
|--|--|
| **OVERALL** | **PASS** |
| **Why** | All requested gates green on live `main`: `src/` present, Vite `ci.yml` present + green on main, community pack files present, GitHub community health **100%**. |
| **gh** | **LIVE** (no longer BLOCKED) |

---

## RESULT handoff (CoS)

```
RESULT: POST-MERGE VERIFY COMPLETE
OVERALL: PASS
FILE: /workspace/steel-audit-ops/POST-MERGE-VERIFY.md
PASS: G1 src/ on main; G2 .github/workflows/ci.yml (Vite CI green on main); G3 community files + docs/hardening; G4 community health_percentage 100
FAIL: (none for requested gates)
NOTES: issue_template API field null despite YAML templates present; README 43B; historical webpack fail on PR#2 event (workflow removed by PR#3); CI action tags still unpinned (hardening follow-up)
CHANGED: POST-MERGE-VERIFY.md only
NEXT: Optional — SHA-pin CI actions / expand README; Audit Guard available for hardening PR verify if tasked
```
