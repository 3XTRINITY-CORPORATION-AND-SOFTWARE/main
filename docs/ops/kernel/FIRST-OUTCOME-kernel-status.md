# FIRST OUTCOME — Kernel status report + top 3 stability fixes

**Repo:** https://github.com/antonioportfelli-boop/STEEL-3XTRINITY-CORPORATION-OFFICIAL-APP-  
**Source:** read-only `/workspace/steel-audit-ops/repo` (+ `grok-workspace.zip`, `export-unblock-one-pager.md`)  
**Date:** 2026-09-17 (Europe/Tallinn)

## Kernel status report

Checkout is a flat App Builder dump. Canonical tree also in `grok-workspace.zip` (`src/…`, `public/…`). Partial Attest extract at `/workspace/steel-audit-ops/extracted/src` (audit/auth only).

### Paths / entrypoints

| Role | Flattened (GitHub root) | Canonical (zip / intended) |
|------|-------------------------|----------------------------|
| Kernel UI | `steel-kernel.tsx` (`SteelKernel`) | `src/components/steel-kernel.tsx` |
| Audio worklet | `steel-kernel.js` | `public/worklets/steel-kernel.js` |
| Atlas model | `atlas.ts` (`ATLAS`, `buildAtlas`) | intended `src/lib/studio/atlas.ts` (root-only newer) |
| Atlas UI | `steel-atlas.tsx` | `src/components/steel-atlas.tsx` |
| Expansions | `places.ts` → `EXPANSIONS` (10) | `src/lib/studio/places.ts` |
| Steel runtime | `engine.ts`, `updates.ts`, `midi.ts`, `isolate.ts`, `asio.ts` | `src/lib/steel/*` |
| Steel store/types | **Missing at root** | zip `src/lib/steel/store.ts`, `types.ts` |
| Rack/pins store | root `store.ts` = `useRack` | intended studio store |
| Route / shell | `__root.tsx`, `index.tsx`, `router.tsx`, `app-shell.tsx` | `src/routes/*`, `src/router.tsx`, `src/components/app-shell.tsx` |
| Channel manifest | root `manifest.json` (newer) | `public/kernel/manifest.json` |

**`src/`, `public/`, `scripts/`, `server/`:** absent at checkout root.

### How they wire

Router → AppShell tabs → `SteelKernel` (atlas + EXPANSIONS + pins) → `armKernel` loads `/worklets/steel-kernel.js`; `checkChannel` loads `/kernel/manifest.json`. Atlas: 20 banks + 5 plugins + 10 extras = 250 cells.

### Health

- Layout/imports **broken** (`@/*` → empty src)
- Basename collisions **broken** (no `useSteel` / `KernelManifest` at root)
- Worklet/channel assets **broken** (no `public/`)
- Vite/scripts **broken** (scripts dir missing)
- CI **misaligned** (webpack.yml, no webpack config; app is Vite)
- Tests path-broken; no kernel/atlas unit tests
- Dual sources: zip (layout) vs root (newer kernel/atlas/expansions) — restore must **merge**

## Top 3 stability fixes

1. **Restore `src/` (merge zip + root OS-target)** — Effort **L** (Attest-only **M**). Highest impact.
2. **Restore `public/` worklet + channel manifest** — Effort **S**.
3. **Untangle steel/studio store+types + replace bogus CI** — Effort **M**.

Queued after community PR: Option A also folds Export Attest + Desk TOP5 P0-1/2/3.
