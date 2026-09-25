# STEEL Attest — Hardening Pass Plan

**Audience:** Theodor Künnapuu / STEEL maintainers  
**Scope:** Defensive hardening for steel-audit, jwt-lab, permissions, github-scan  
**Date:** 2026-09-17 (Europe/Tallinn)  
**Constraint:** Guidance and checklists only — no exploits, payloads, or attack reproduction steps.

---

## 1. Executive summary

STEEL Attest is a TanStack Start / React app that helps operators **attest GitHub Actions least privilege**: paste or fetch workflow YAML, grade findings client-side, compose permission maps, and educate on GitHub App JWTs (`jose`, RS256, ≤10-minute lifetime).

The product already encodes strong *teaching* controls (explicit permissions, pin-to-SHA, avoid `pull_request_target` + untrusted checkout, env-based interpolation, Bearer for App JWTs). The hardening pass should close **platform gaps**: unauthenticated server functions that touch GitHub/DB, missing public vulnerability-reporting docs, JWT-lab UX that could invite production PEM pastes, and dogfooding the audit engine on this repo’s own workflows.

**Outcome of this pack:** prioritized backlog (P0–P2), UX notes, implementation order, and paste-ready `SECURITY.md` / checklist inputs under `/workspace/steel-audit-ops/`.

---

## 2. Surface map (summary)

| Surface | Exists? | Primary artifacts |
|---|---|---|
| **steel-audit** | Yes | `src/components/steel-audit.tsx`, `audit-workspace.tsx`, `src/lib/audit/engine.ts`, `store.ts`, `samples.ts`, `findings-panel.tsx` |
| **jwt-lab** | Yes | `src/components/jwt-lab.tsx`, `src/lib/jwt/github-app.ts` |
| **permissions** | Yes (GHA scopes UX) | `permission-builder.tsx`, `src/lib/audit/permissions.ts` |
| **github scan** | Yes (public workflow fetch) | `src/lib/audit/github.ts` embedded in audit workspace |
| **SECURITY.md** | **Missing** | Draft in this pack |
| **Secret / dep scan UI** | **Not found** | Out of scope except future P2 |

Full inventory: [`SURFACE_MAP.md`](./SURFACE_MAP.md).

---

## 3. Prioritized backlog

### P0 — fix before wider public trust

1. **Bind mutating / listing server functions to authenticated, least-privilege context**  
   - Apply `authMiddleware` (or equivalent verified session) to `createSteelRow` / `listSteelRows` (`src/lib/steel/rows.ts`).  
   - Scope rows by `user_id` (schema + queries); reject anonymous writes when auth is enabled.  
   - Keep fail-closed behavior when `DATABASE_URL` is set and auth is off (`verify.server.ts` already documents this pattern).  
   - **Acceptance:** Signed-out callers cannot insert/list audit rows on a deployed auth-on instance; queries never return another user’s rows.

2. **Harden GitHub scan server functions against anonymous abuse**  
   - `scanGithubRepo` / `fetchGithubWorkflow` currently have validators but **no auth middleware**, no app-level rate budget, and always call unauthenticated `api.github.com`.  
   - Require session (or signed anonymous quota cookie) + per-user / per-IP rate limits; retain owner/repo/path allowlists; keep host pinned to GitHub API only.  
   - Optional: honor a server-only `GITHUB_TOKEN` / App installation token with **read-only metadata/contents** for higher rate limits — never expose the token to the client.  
   - **Acceptance:** Unauthenticated flood cannot exhaust shared egress; path traversal outside `.github/workflows/*.ya?ml` remains rejected; responses never include Authorization secrets.

3. **Publish vulnerability reporting path**  
   - Add public `SECURITY.md` (use [`SECURITY.md.draft`](./SECURITY.md.draft)).  
   - Enable private reporting (GitHub Security Advisories / email).  
   - **Acceptance:** `SECURITY.md` reachable from repo root; reporting channel tested by maintainers.

4. **JWT lab: production-key hygiene UX (defensive)**  
   - Prominent “demo / throwaway keys only — never paste a production App private key” banner; clear-on-tab-leave; discourage screenshots of PEM/JWT; prefer `mintDemoKey` path.  
   - Keep signing algorithm fixed to **RS256 allowlist** (already set in `mintGithubAppJwt`); document that HMAC/`none` are rejected by design for App JWTs.  
   - Short-lived tokens already (≈10 min); surface expiry in UI.  
   - **Acceptance:** User cannot miss the warning; demo flow works without pasting external PEM; UI shows `exp` / remaining lifetime.

5. **Dogfood: harden this repo’s CI workflow**  
   - `.github/workflows/webpack.yml` lacks `permissions:`, uses tag-pinned `actions/checkout@v4` / `setup-node@v4`, runs `npm install` + webpack.  
   - Apply Attest recommendations: explicit least-privilege `permissions`, pin actions to full SHAs, prefer `npm ci` when lockfile exists.  
   - **Acceptance:** Workflow re-audited to grade B+ / no critical-high engine findings for permissions/pinning (or documented exceptions).

### P1 — next sprint

6. **Permission builder defaults & warnings**  
   - Offer presets: “read-only CI”, “issues bot”, “OIDC deploy”.  
   - Warn on `contents: write`, `id-token: write`, `security-events: write`; default new maps to `contents: read` only.  
   - **Acceptance:** Cold start does not suggest write scopes without an explicit choice.

7. **Audit UX pass** (see §4) — severity filters, SARIF/JSON export, copy-remediation, empty/error states for GitHub miss/rate.

8. **Wire or remove unused `library` tab** in `AppTab` (`store.ts`) for consistency.

9. **Content Security / cookie posture review** for deployed auth (`HttpOnly`, `Secure`, `SameSite`, `__Host-` where applicable) — align with existing `isolation.server.ts` + gate session comments; no new client-held long-lived secrets.

10. **Document public-only GitHub scan** in UI and SECURITY scope (no expectation of private-repo secret scanning).

### P2 — backlog

11. Optional authenticated private-repo workflow attest (installation token, least privilege, audited).  
12. Dependabot / CodeQL / secret-scanning **repo** enablement (platform), not a new attack UI.  
13. Engine rule coverage: `workflow_call` reusable workflows, `permissions: {}` empty map, composite actions.  
14. Client-side finding suppression with signed rationale for enterprise reports.  
15. Accessibility pass on permission radio grid and findings list.

---

## 4. UX pass notes — audit UI

| Area | Today | Hardening / UX goal |
|---|---|---|
| Paste YAML | Large textarea; Ctrl/⌘+Enter runs | Confirm “stays in browser” + size limit toast if paste huge |
| Samples | Five didactic workflows | Keep; label **dangerous** samples clearly (already in blurb for pr-target) |
| Findings | Severity sort + Fix paragraph | Add filter chips; deep-link `#F-00N`; copy remediation |
| Score | Grade A–F | Explain scoring weights (`SEVERITY_WEIGHT`) in a “How scoring works” drawer |
| Save row | `createSteelRow` | Only when signed in; show ownership |
| Export | PDF/Office | Strip any accidental secrets from exported YAML snippets; watermark “demo/lab” |
| GitHub scan | Spec + presets | Disable while busy; show rate-limit guidance; never ask for PAT in the browser |
| Tabs | audit / jwt / permissions | Persist tab in URL query for shareable safe demos (no tokens in URL) |

---

## 5. Suggested implementation order

1. Schema + `authMiddleware` on `rows.ts` (P0-1).  
2. Rate limit + session gate on `github.ts` server fns (P0-2).  
3. Land `SECURITY.md` + advisory channel (P0-3).  
4. JWT lab warnings + expiry display (P0-4).  
5. Fix `.github/workflows/webpack.yml` and re-run Attest (P0-5).  
6. Permission presets / warnings (P1-6).  
7. Audit UX polish + library tab (P1-7/8).  
8. P2 items as capacity allows.

---

## 6. Out of scope (this pass)

- Writing exploits, bypasses, or CTF-style PoCs against Attest, GitHub, or sibling tenants.  
- Building a general secret-exfiltration or credential-theft feature.  
- Changing Grok auth broker / Better Auth core beyond applying existing middleware patterns.  
- Pushing commits or opening PRs from this review environment (local docs only).  
- Full penetration test / red team.

---

## 7. References inside this pack

- [`SURFACE_MAP.md`](./SURFACE_MAP.md) — file inventory  
- [`SECURITY_CHECKLIST.md`](./SECURITY_CHECKLIST.md) — actionable checks  
- [`SECURITY.md.draft`](./SECURITY.md.draft) — community health input  
- [`README.md`](./README.md) — how to use the pack  
