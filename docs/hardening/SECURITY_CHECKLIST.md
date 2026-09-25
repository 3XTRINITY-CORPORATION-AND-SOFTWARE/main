# STEEL Attest — Security Hardening Checklist

Defensive checks only. Mark items as you implement. Paths refer to the canonical `src/` layout (see `SURFACE_MAP.md`).

---

## A. steel-audit (audit UI / engine)

- [ ] **A1.** Confirm audit runs client-side only for pasted YAML (`useAudit` → `auditWorkflow`); no server round-trip of arbitrary YAML unless explicitly designed and authenticated.
- [ ] **A2.** Document size limits for pasted YAML and GitHub-fetched YAML (engine / fetch already slices to 80_000 chars — surface in UI).
- [ ] **A3.** Findings remediation text remains fix-oriented (least privilege, pin SHA, env interpolation) — no step-by-step abuse recipes in product copy.
- [ ] **A4.** Dangerous samples (`pr-target`) labeled as failing / educational in UI.
- [ ] **A5.** Export pipeline (`export-menu.tsx` + `lib/export/*`) does not embed PEMs, cookies, or Authorization headers; redact if present in pasted YAML.
- [ ] **A6.** “Save row” requires authenticated user and stores only summarized finding metadata (already truncates title/rules — verify after auth bind).
- [ ] **A7.** Wire or remove unused `library` `AppTab`.
- [ ] **A8.** Re-run Attest against repo’s own `.github/workflows/*` after CI hardening.
- [ ] **A9.** Severity filter + clear empty state when zero findings / parse error.

**Acceptance (audit):** Operator can attest a workflow end-to-end without sending secrets to the server; exports and saved rows contain no credentials.

---

## B. jwt-lab

- [ ] **B1.** Algorithm allowlist for signing remains **RS256 only** (`mintGithubAppJwt` / `importPKCS8(..., "RS256")`).
- [ ] **B2.** Token lifetime capped (iat skew ≤60s past, exp ≤10 minutes) — already in `github-app.ts`; show countdown in UI.
- [ ] **B3.** Banner: demo / throwaway keys only; never paste production App private keys or commit PEMs.
- [ ] **B4.** Prefer `mintDemoKey` (2048-bit RS256) over external PEM for demos.
- [ ] **B5.** Clear PEM + JWT from React state on tab change / navigation; avoid `localStorage` persistence of keys.
- [ ] **B6.** Clipboard copy of JWT warns that tokens are bearer credentials (short-lived but sensitive).
- [ ] **B7.** Snippets (`SNIPPETS`) keep placeholders (`YOUR_CLIENT_ID`, `YOUR_PATH_TO_PEM`) — no real secrets in repo.
- [ ] **B8.** If verify path is added later: reject `none` / HMAC algorithms for App JWT verification; use allowlisted `jose` APIs only.

**Acceptance (jwt):** Demo flow works without external PEM; UI makes production-key misuse obviously wrong; tokens remain short-lived RS256.

---

## C. permissions (GHA permission UX)

- [ ] **C1.** Default map is least privilege (`contents: read` only) or requires explicit opt-in for any `write`.
- [ ] **C2.** Warn before enabling `contents: write`, `id-token: write`, `actions: write`, `security-events: write`.
- [ ] **C3.** Generated YAML includes workflow-level and job-level `permissions:` (already via `permissionsToYaml`).
- [ ] **C4.** Checkout action in generated YAML remains SHA-pinned with version comment.
- [ ] **C5.** “Attest” path loads YAML into audit and runs engine (regression-test).
- [ ] **C6.** Presets: Read-only CI / Issues bot / OIDC publish — each documented.
- [ ] **C7.** Do not conflate GHA scopes with STEEL app RBAC in copy (clarify in UI lead text).

**Acceptance (permissions):** Cold-start YAML is safe-by-default; write scopes are deliberate; Attest round-trip works.

---

## D. github scan

- [ ] **D1.** Keep `parseRepoSpec` / `NAME` allowlist and `isWorkflowPath` restriction.
- [ ] **D2.** Fetch host remains `api.github.com` only (no user-controlled base URL).
- [ ] **D3.** Attach `authMiddleware` (or quota session) + rate limits to `scanGithubRepo` and `fetchGithubWorkflow`.
- [ ] **D4.** Any server GitHub credential is env-only, read-scoped, never sent to the browser.
- [ ] **D5.** Map GitHub 403/404 to safe user messages (already: rate / not-found) — no raw API bodies with tokens.
- [ ] **D6.** UI states “public files only” unless authenticated private mode is shipped and documented.
- [ ] **D7.** Cap listed files (already `.slice(0, 40)`) and concurrent grade fetches.
- [ ] **D8.** No browser prompt for PATs / App PEMs for scanning.

**Acceptance (github scan):** Authenticated or rate-limited; path-constrained; no client secrets; public-only unless explicitly designed otherwise.

---

## E. Cross-cutting auth / platform

- [ ] **E1.** `createSteelRow` / `listSteelRows` use `authMiddleware` + `user_id` isolation.
- [ ] **E2.** `assertSameSiteRequest` remains on authenticated server-function chokepoint.
- [ ] **E3.** Fail closed when `DATABASE_URL` set and auth disabled.
- [ ] **E4.** `npm run check:auth` / smoke covers `VITE_AUTH_ENABLED` invariant.
- [ ] **E5.** No secrets in client env (`VITE_*`); review `preview` client usage for deploy.
- [ ] **E6.** Publish `SECURITY.md` (from draft); enable private vulnerability reporting.
- [ ] **E7.** Pin and least-privilege this repo’s `.github/workflows/webpack.yml`.
- [ ] **E8.** Consider Dependabot + secret scanning at org/repo settings (ops, not product UI).

**Acceptance (platform):** Per-user data isolation; sibling isolation intact; public reporting path live; CI dogfoods Attest guidance.
