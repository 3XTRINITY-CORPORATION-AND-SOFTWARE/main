# STEEL Attest — Surface Map

**Repo:** https://github.com/antonioportfelli-boop/STEEL-3XTRINITY-CORPORATION-OFFICIAL-APP-  
**Clone:** `/workspace/steel-audit-ops/repo` (shallow, public HTTPS)  
**Canonical source tree:** also present inside `repo/grok-workspace.zip` under `src/` (extracted to `/workspace/steel-audit-ops/extracted/` for review). The GitHub root is a flattened App Builder dump (many basenames at repo root); prefer `src/...` paths below as the intended layout.

**Stack:** TanStack Start + React 19 + Vite, Zustand, Zod, `jose` (JWT), `better-auth`, YAML parser, PGLite/Postgres (`steel_rows`). Auth skill under `skills/auth/`. **No `SECURITY.md` found** in clone or zip.

---

## 1. steel-audit (audit UI / flows)

| Path (canonical) | Flattened / notes |
|---|---|
| `src/components/steel-audit.tsx` | `repo/steel-audit.tsx` — tab shell: Workflow / JWT / Permissions |
| `src/components/audit-workspace.tsx` | `repo/audit-workspace.tsx` — YAML paste, sample picker, GitHub scan embed, run, save row, export |
| `src/components/findings-panel.tsx` | `repo/findings-panel.tsx` — severity-ordered findings + remediation copy |
| `src/components/export-menu.tsx` | `repo/export-menu.tsx` — PDF/DOCX/XLSX/PPTX client export |
| `src/components/score-mark.tsx` | `repo/score-mark.tsx` — grade/score badge |
| `src/lib/audit/engine.ts` | **Not at repo root as audit engine** (root `engine.ts` is audio kernel). Present in zip / `extracted/src/lib/audit/engine.ts` |
| `src/lib/audit/store.ts` | `extracted/.../store.ts` — Zustand `useAudit`, tabs `audit \| permissions \| jwt \| library` |
| `src/lib/audit/types.ts` | Finding / Grade / PermissionScope types |
| `src/lib/audit/samples.ts` | Five sample workflows (open-issue, issue-on-push, app-token, pr-target, hardened) |
| Screenshots | `audit-dangerous.png`, `audit-hardened.png`, `audit-jwt.png`, `audit-pr-target.png`, etc. |

**Behavior today:** Client-side `auditWorkflow(yaml)` grades GITHUB Actions YAML (permissions, `pull_request_target`, script injection heuristics, unpinned actions, curl `--fail`, app-token notes, persist-credentials). Pasted YAML is described as browser-local; GitHub scan pulls public files via server functions.

**Gaps (high-level):** `library` tab declared in store but not rendered in `SteelAudit`; engine lives only in zip path in this dump; no SECURITY.md; own `.github/workflows/webpack.yml` is not dogfooded against the engine.

---

## 2. jwt-lab (JWT handling / lab)

| Path | Notes |
|---|---|
| `src/components/jwt-lab.tsx` | `repo/jwt-lab.tsx` — claim docs, language snippets, PEM paste, mint demo key, sign, copy JWT |
| `src/lib/jwt/github-app.ts` | `repo/github-app.ts` — `JWT_CLAIMS`, `SNIPPETS`, `mintDemoKey` (RS256 2048), `mintGithubAppJwt` (iat−60 / exp+600), `splitJwt` decode |
| Dep | `jose` ^6 in `package.json`; bundled `jose.mjs` |
| Screenshots | `jwt-signed.png`, `tab-jwt.png`, `audit-jwt.png` |

**Behavior today:** Educational GitHub App JWT lab. Hardcodes `alg: RS256` on sign. Demo key generated in-browser. Private key pasted into a textarea; compact JWT shown + header/payload JSON.

**Gaps:** Strong production-key warning / wipe-on-navigate UX incomplete; no algorithm allowlist on *verify* path (lab is sign-only); clipboard JWT handling; snippets show private-key file reads (expected for docs, needs “never commit PEM” callouts).

---

## 3. permissions (authz / RBAC / permission UX)

| Path | Notes |
|---|---|
| `src/components/permission-builder.tsx` | `repo/permission-builder.tsx` — scope table none/read/write → YAML → attest into audit tab |
| `src/lib/audit/permissions.ts` | `repo/permissions.ts` — `SCOPE_CATALOG`, `permissionsToYaml` |
| `src/lib/audit/types.ts` | `PERMISSION_SCOPES`, `AccessLevel` |
| Related product auth (not GHA RBAC) | `src/lib/auth/*` — better-auth, `authMiddleware`, `verify.server.ts`, `isolation.server.ts`, gate identity |
| Screenshot | `tab-permissions.png` |

**Behavior today:** UX for GitHub Actions `permissions:` maps (not app RBAC). Defaults: `contents: read`, `issues: write`. Pins checkout SHA in generated YAML. Sends YAML into audit engine via `setYaml` + `run` + `setTab("audit")`.

**Gaps:** Default `issues: write` may over-privilege demos; no “deny-by-default / contents: read only” preset; no warning when selecting `id-token: write` or `contents: write`; product `steel_rows` server fns lack `authMiddleware` (separate from GHA permissions UX).

---

## 4. github scan (GitHub scanning UX)

| Path | Notes |
|---|---|
| Embedded in `audit-workspace.tsx` | Spec input, presets (`actions/cache`, etc.), file list + per-file grades |
| `src/lib/audit/github.ts` | `repo/github.ts` — `parseRepoSpec`, `scanGithubRepo`, `fetchGithubWorkflow` (`createServerFn` POST) |
| Screenshots | `github-scan.png`, `github-grades.png` |

**Behavior today:** Server proxies **public** `api.github.com` contents under `.github/workflows/*.yml`. Owner/repo regex allowlist; path must match `^\.github/workflows/[A-Za-z0-9_.-]+\.(ya?ml)$`. YAML body truncated to 80_000 chars. Maps 404→not-found, 403→rate. No GitHub auth token attached. UI copy: public files only.

**Gaps:** Server functions have **no `authMiddleware`**, no app-level rate limit / abuse budget, no optional authenticated scan for private repos (by design today — document clearly). Repo’s own CI workflow unscanned.

---

## Supporting / auth / data

| Path | Notes |
|---|---|
| `src/lib/auth/middleware.ts` | `repo/middleware.ts` — bearer forward + `assertSameSiteRequest` + `requireUserId` |
| `src/lib/auth/verify.server.ts` | Session from cookie/bearer; fail-closed if `DATABASE_URL` + auth off |
| `src/lib/auth/isolation.server.ts` | Sec-Fetch-Site sibling isolation |
| `src/lib/steel/rows.ts` | `repo/rows.ts` — `createSteelRow` / `listSteelRows` **without** auth middleware or `user_id` scope |
| `0001_auth.sql`, `0002_steel_rows.sql` | Schema migrations |
| `scripts/check-auth-invariant.mjs` | Dev/build `VITE_AUTH_ENABLED` agreement |
| `.github/workflows/webpack.yml` | Sample Node/webpack CI — unpinned actions, no `permissions:` |
| `SECURITY.md` | **not found** |

---

## Not found / stubbed

- Dedicated secret-scanning or Dependabot UI module — **not found** (GitHub scan = workflow YAML list/grade only).
- Server-side JWT *verification* lab — **not found** (sign + decode only).
- App-level RBAC admin for STEEL users — **not found** (permissions tab = GHA scopes).
- `SECURITY.md`, Dependabot/CodeQL configs — **not found** in this clone.
