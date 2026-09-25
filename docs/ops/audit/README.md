# STEEL Attest — Defensive Hardening Pack

Local review artifacts for **Theodor Künnapuu / STEEL** covering four product surfaces in the public repo:

[https://github.com/antonioportfelli-boop/STEEL-3XTRINITY-CORPORATION-OFFICIAL-APP-](https://github.com/antonioportfelli-boop/STEEL-3XTRINITY-CORPORATION-OFFICIAL-APP-)

**Generated:** 2026-09-17 (Europe/Tallinn)  
**Mode:** Defensive only — hardening plans, checklists, and SECURITY.md inputs. No exploits or attack PoCs.

## Contents

| File | Purpose |
| --- | --- |
| [`HARDENING_PASS_PLAN.md`](./HARDENING_PASS_PLAN.md) | Executive summary, prioritized P0–P2 backlog, UX notes, implementation order, out-of-scope |
| [`SECURITY.md.draft`](./SECURITY.md.draft) | Paste-ready community SECURITY.md (fill email / version placeholders) |
| [`SECURITY_CHECKLIST.md`](./SECURITY_CHECKLIST.md) | Actionable checklist for audit / JWT / permissions / GitHub scan / platform |
| [`SURFACE_MAP.md`](./SURFACE_MAP.md) | File/path inventory with brief notes |
| [`README.md`](./README.md) | This index |

## Supporting directories

| Path | Purpose |
| --- | --- |
| `repo/` | Shallow public clone of the GitHub repository |
| `extracted/` | Selected `src/lib/audit`, `src/lib/jwt`, `src/lib/auth`, components extracted from `repo/grok-workspace.zip` (canonical tree; root dump is flattened) |

## How to use

1. Read **SURFACE_MAP** to see what exists today for each surface.  
2. Use **HARDENING_PASS_PLAN** to schedule P0 work first (auth on rows + GitHub scan, SECURITY.md, JWT hygiene, CI dogfood).  
3. Track execution with **SECURITY_CHECKLIST**.  
4. Hand **SECURITY.md.draft** to the Community Health agent / maintainers; replace `[SECURITY_EMAIL]` and supported-versions placeholders; publish as `SECURITY.md`.  
5. Do **not** commit secrets. Keep this pack local unless intentionally published as docs.

## Quick surface status

| Surface | Status |
| --- | --- |
| steel-audit | Present — client YAML auditor + findings/export |
| jwt-lab | Present — RS256 GitHub App JWT education lab |
| permissions | Present — GHA `permissions:` builder (not app RBAC) |
| github scan | Present — public `.github/workflows` fetch + grade |
| SECURITY.md in upstream | Missing — draft provided here |

## Constraints honored

- No exploit code, CTF repros, or credential-theft guidance.  
- No push / PR from this environment.  
- Missing or stubbed surfaces called out with target hardening state.
