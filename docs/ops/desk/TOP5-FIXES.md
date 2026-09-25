# Top 5 Desk Fixes — STEEL

Prioritized for **playability** (can a user open WEB → Desk, load slots, play, bounce, read OLED / Hosts). Every item cites real paths.

---

## P0-1 — Restore `src/` Desk slice (flat root vs `@/*`)


> **CoS / Kernel Eng (2026-09-17):** Option A is one structural PR for Desk slice **and** Export Attest. Ship **after** community health PR. Do not open a Desk-only layout PR.

| | |
|--|--|
| **Why blocks playability** | `tsconfig.json` maps `@/*` → `./src/*` and includes only `["src","server"]`. Tree has **zero** `src/` blobs; Desk sources sit at flat root (`steel-desk.tsx`, `places.ts`, `app-shell.tsx`, …). Imports in `index.tsx` / `steel-desk.tsx` (`@/components/steel-desk`, `@/lib/desk/engine`, …) cannot resolve on a clean toolchain. |
| **Files** | `tsconfig.json`, `vite.config.ts` (comments expect `src/router.tsx` / `src/routes/`), `AGENTS.md`, `references/scaffold.md`, all Desk/shell sources currently at repo root |
| **Fix direction** | Prefer Export one-pager **Option A**: move Desk + shell + routes under `src/` (`src/components/steel-desk.tsx`, `src/lib/desk/*`, `src/routes/{__root,index}.tsx`, `src/router.tsx`, …). Do not ship dual root+src copies. Alias rewrite to `./*` is stopgap only. |

---

## P0-2 — Unflatten colliding `engine` / `store` / `types` namespaces

| | |
|--|--|
| **Why blocks playability** | Flat root collapses distinct modules into one filename. Fetched `engine.ts` is the **steel kernel** worklet (`useSteel`). Fetched `store.ts` is the **studio rack** (`useRack`). Fetched `types.ts` is **studio** types and has **no `SteelTab`**. Desk needs `@/lib/desk/engine` + `@/lib/desk/store`; shell needs `@/lib/steel/store` + `@/lib/steel/types`. Without path restore, Desk play/bounce and tab state cannot coexist. |
| **Files** | Flat `engine.ts`, `store.ts`, `types.ts`; consumers `steel-desk.tsx`, `steel-console.tsx`, `app-shell.tsx`, `isolate.ts`, `places.ts`, `steel-oled.tsx` |
| **Fix direction** | Restore directories: `src/lib/desk/{engine,store,…}.ts`, `src/lib/steel/{engine,store,types,hosts,asio,…}.ts`, `src/lib/studio/{places,store,…}.ts`. Recover missing steel/`SteelTab` types and desk engine/store from VCS history or bundles if flattened away. |

---

## P0-3 — Align `routeTree.gen.ts` with real route files

| | |
|--|--|
| **Why blocks playability** | Generated `routeTree.gen.ts` imports `./routes/__root` and `./routes/index`. Public tree only has root `__root.tsx` and `index.tsx` (no `routes/` dir). `__root.tsx` imports `../styles.css?url` (correct only under `src/routes/`). Router therefore cannot wire Home → `AppShell` → `SteelDesk`. |
| **Files** | `routeTree.gen.ts`, `__root.tsx`, `index.tsx`, `router.tsx`, `styles.css` |
| **Fix direction** | Place files at `src/routes/__root.tsx` and `src/routes/index.tsx`, regenerate route tree on `vite dev`/`build`. Keep **only** `/` as the file route; tabs stay state-driven in `index.tsx`. |

---

## P1-4 — Fix `HostId` mismatch (`generic` vs studio union)

| | |
|--|--|
| **Why blocks playability** | `hosts.ts` profiles use `id: "generic"` (Any ASIO host). Flat `types.ts` defines `HostId = "standalone" \| "fl" \| "ableton" \| "logic"`. `steel-hosts.tsx` patches `host` from `HOSTS`. After layout restore, Hosts tab typecheck/runtime chip selection breaks for the third profile. |
| **Files** | `hosts.ts`, `types.ts` (must become steel `HostId` under `src/lib/steel/types.ts`), `steel-hosts.tsx`, `asio.ts` |
| **Fix direction** | Steel `HostId` must include `"generic"` (and whatever `useSteel` persist expects). Do not reuse studio `HostId` (`standalone`/`logic`) for the Hosts mirror without an adapter. |

---

## P2-5 — Desk interaction coverage in `browser-smoke.mjs`

| | |
|--|--|
| **Why blocks playability** | Current `browser-smoke.mjs` only loads URL at two viewports, checks status/title/canvas/overflow/errors. It never opens Place **web**, tab **desk**, loads demo slots, plays, bounces, or asserts OLED canvas + Hosts. Cold-load green ≠ Desk playable (CoS-style honesty). |
| **Files** | `browser-smoke.mjs`, `browser-smoke-verdict.mjs`, `references/browser-qa.md`; targets `data-place="web"`, `data-tab="desk"` / `hosts` / `console` in `app-shell.tsx` / `place-bar.tsx` |
| **Fix direction** | Add optional Desk cases: click web→desk; demo beat; play; assert no pageErrors; OLED `canvas` present; resize/adapt path; hosts chip click; mobile overflow on Desk. Gate “Desk green” on those, not canvas-only brand check. |

---

## Out of scope for this list (tracked elsewhere)

- Export `AuditReport` / empty `src/lib/export` — Export one-pager (`/workspace/export-unblock-one-pager.md`); Desk only owns UI mount once layout lands.  
- Inventing path routes like `/desk` — **not** in `routeTree.gen.ts`; do not add without product decision.

---

*P0 = won’t boot/play · P1 = Hosts broken when typed · P2 = false-green smoke.*
