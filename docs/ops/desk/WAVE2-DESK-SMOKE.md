# WAVE 2 — Desk smoke against canonical

**Agent:** Steel Desk Ops · **No UI redesign · No gh · No invented APIs**  
**Date:** 2026-09-17 (Europe/Tallinn)  
**Canonical:** `/workspace/steel-canonical`  
**Contracts consumed:**  
- `/workspace/steel-studio-ops/STORE-TYPES-BOUNDARY.md`  
- `/workspace/steel-studio-ops/WAVE2-CONTRACT-LOCK.md` (**mid-flight lock — authoritative**)  
**Prior pack:** `/workspace/steel-desk-ops/{INVENTORY,CHECKLIST,TOP5-FIXES,SUMMARY}.md`

---

## RESULT

**PASS** — Desk surfaces compile and resolve under canonical `src/` layout; `npm run typecheck` exits 0. Aligns to WAVE2-CONTRACT-LOCK: **useRack** winner, steel **HostId** (incl. `generic`), **SteelTab** includes `"studio"`, desk↔rack bridge fields present on recovered `DeskState`, **AuditReport** untouched. Interactive browser Desk cases (web→desk→play/bounce) remain TOP5 P2 — not gated this wave; cold-load `browser-smoke.mjs` needs a live URL and still does not assert Desk tabs.

---

## FILES

### Contract / ops (read)

| Path | Role |
|------|------|
| `/workspace/steel-studio-ops/WAVE2-CONTRACT-LOCK.md` | Locks useRack, steel HostId, SteelTab+studio, desk bridge fields, AuditReport frozen |
| `/workspace/steel-studio-ops/STORE-TYPES-BOUNDARY.md` | WAVE1 store/types inventory |
| `/workspace/steel-desk-ops/TOP5-FIXES.md` | 1-file-fix fold policy (none applied) |
| `/workspace/steel-canonical/SOURCE-OF-TRUTH.md` | Kernel Eng SoT (present) |

### Desk inventory — PRESENT in canonical (compile in-tree)

| Surface | Path |
|---------|------|
| Desk UI | `src/components/steel-desk.tsx` |
| OLED (nested) | `src/components/steel-oled.tsx` |
| Hosts | `src/components/steel-hosts.tsx` |
| Console (adjacent) | `src/components/steel-console.tsx` |
| App shell | `src/components/app-shell.tsx` |
| Place bar | `src/components/place-bar.tsx` |
| Route mount | `src/routes/index.tsx` (`tab === "desk"` → `<SteelDesk />`) |
| Root route | `src/routes/__root.tsx` |
| Router | `src/router.tsx`, `src/routeTree.gen.ts` (URL `/` only) |
| Desk store | `src/lib/desk/store.ts` (`useDesk`, full `DeskState` + bridge fields) |
| Desk engine | `src/lib/desk/engine.ts` (`@ts-nocheck` recovered — F3 follow-up) |
| Adapt / OLED / FX / clips / video / mix-ai / eq / boom | `src/lib/desk/{adapt,oled,fx,clips,video,mix-ai,eq,boom}.ts` |
| Steel types/store/hosts | `src/lib/steel/{types,store,hosts}.ts` |
| Places + rack | `src/lib/studio/{places,rack-store,rack,store}.ts` (`useRack` re-export) |
| Smoke scripts | `scripts/browser-smoke.mjs`, `scripts/browser-smoke-verdict.mjs` (+ `.test.mjs`) |

### MISSING / not used this wave

| Item | Notes |
|------|-------|
| Root `browser-smoke.mjs` | Only under `scripts/` |
| Desk unit tests under `src/lib/desk/*.test.*` | None |
| vitest Desk suite | package.json has no vitest; `test` is node --test auth/app-data |
| Flat-root Desk files | Superseded by canonical `src/` (TOP5 P0-1/2 closed in SoT tree) |

### Legacy (present but not Desk OS-target)

| Path | Notes per lock |
|------|----------------|
| `src/components/studio/desk.tsx` | Legacy `components/studio/**` — not AppShell home |
| `useStudio` in `src/lib/studio/store.ts` | **Deprecated** for OS-target; shell uses **useRack** |

---

## CHANGED

**None.** No source edits. Typecheck already green; TOP5 1-file compile fold not required.

Deliverable only: this file `/workspace/steel-desk-ops/WAVE2-DESK-SMOKE.md`.

---

## TEST

Commands run from `/workspace/steel-canonical`:

1. **Inventory** — `find` / path existence for Desk components, `src/lib/desk/*`, shell, places, rack, routes.  
2. **Contract reconcile** — Read WAVE2-CONTRACT-LOCK; `rg` for `useRack` / `useStudio` / `HostId` / `SteelTab` / desk bridge fields (`genre`, `lyrics`, `palve`, `kare`, `autoTakt`, `applyMix`, `eq`) on canonical paths.  
3. **`npm run typecheck`** (`tsc --noEmit`) — **exit 0** (~6.3s).  
4. **`node --test scripts/browser-smoke-verdict.test.mjs`** — **40/40 pass** (smoke helper unit tests; no live browser).  
5. **Not run:** full `scripts/browser-smoke.mjs` against a live URL (needs preview/dev; TOP5 P2 notes it still only cold-loads viewports — no web→desk interaction). No `gh`. No UI redesign.

### Contract checks (evidence)

| Lock item | Desk-relevant evidence |
|-----------|------------------------|
| **useRack winner** | `app-shell.tsx` / `place-bar.tsx` import `useRack` from `@/lib/studio/store`; `rack.ts` uses `useRack`; `store.ts` re-exports `useRack` from `rack-store.ts` |
| **steel HostId** | `src/lib/steel/types.ts`: `"fl" \| "ableton" \| "generic"`; `hosts.ts` imports steel `HostId`; `steel-hosts.tsx` uses `@/lib/steel/hosts` + `useSteel` — not studio HostId |
| **SteelTab + studio** | `types.ts` includes `"studio"`; `places.ts` `PLACE_TABS.web: ["desk","studio"]`; `index.tsx` mounts `SteelStudio` on `tab === "studio"` |
| **Desk ↔ rack fields** | Canonical `DeskState` has `genre`, `applyMix`, `autoTakt`, `kare`, `lyrics`, `palve`, `eq` (lock §5 OK) |
| **AuditReport frozen** | Desk tree does not import `AuditReport`; no export/audit schema edits |

### Manual open path (documented; not browser-automated this wave)

1. Boot canonical (`npm run dev` or preview of existing build).  
2. URL `/` only → `AppShell`.  
3. PlaceBar `data-place="web"` → home tab `desk` via `PLACE_HOME.web`.  
4. Nav `data-tab="desk"` → `<SteelDesk />`; OLED nested inside Desk.  
5. Place `host` / tab `hosts` → `<SteelHosts />` (steel HostId chips incl. `generic`).  
6. Shell syncs `useRack.place` with `placeForTab(tab)` — not `useStudio`.

---

## PASS

- WAVE2-DESK-SMOKE.md written with required sections.  
- Concrete PRESENT/MISSING inventory under `/workspace/steel-canonical/src/…`.  
- `npm run typecheck` **PASS** (Desk + shell + desk lib resolve).  
- Smoke verdict unit tests **PASS** (40).  
- Aligned to WAVE2-CONTRACT-LOCK (useRack, steel HostId, SteelTab+studio, bridge fields, AuditReport untouched).  
- No UI redesign; no gh; no invented APIs; zero source CHANGED.

---

## FAIL

- **None for WAVE2 compile/load proof.**  
- Explicit non-goals this wave (not counted as FAIL of deliverable): interactive Desk browser-smoke (TOP5 P2); replacing `@ts-nocheck` desk engine (lock F3).

---

## BLOCKERS

| ID | Item | Severity |
|----|------|----------|
| — | **None blocking** Desk compile/load against canonical SoT + contract lock. | — |
| B1 | Interactive Desk green (web→desk→demo→play→OLED assert) still needs TOP5 P2 smoke extension + live URL — follow-up, not WAVE2 gate. | Soft / P2 |
| B2 | `src/lib/desk/engine.ts` remains `@ts-nocheck` recovered JS (WAVE2-CONTRACT-LOCK F3) — behavior expected; prefer upstream TS later. | Soft / F3 |
| B3 | Full `browser-smoke.mjs` cold-load not executed this wave (no live URL spun for Desk). Typecheck + verdict unit tests used as smallest existing smoke. | Soft / process |

Kernel SoT absence (WAVE1 G0) **cleared** — SoT + WAVE2-CONTRACT-LOCK present.

---

## NEXT HANDOFF

1. **Desk / QA:** Optional — extend `scripts/browser-smoke.mjs` per TOP5 P2 (click `data-place="web"`, `data-tab="desk"`, assert no pageErrors, OLED canvas, hosts chip) against preview; gate “Desk green” on that, not canvas-only brand check.  
2. **Desk / Kernel Eng:** F3 — replace recovered desk `engine.ts` (`@ts-nocheck`) with upstream TS when available.  
3. **Studio:** Continue migrate off `useStudio` (lock F1); OS-target keeps **useRack** only.  
4. **Export:** Leave **AuditReport** frozen; Desk does not own Attest schema.  
5. **Do not** flatten `store`/`types`/`engine` at repo root; canonical namespaced layout is the SoT winner.

**Suggested one-liner for CoS:** Desk WAVE2 smoke PASS on canonical typecheck; contracts locked to useRack + steel HostId + SteelTab/studio; interactive browser Desk still P2 follow-up.
