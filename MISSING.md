# MISSING — blockers / gaps for fully runnable STEEL canonical

## Not blocking structural merge
- Original TypeScript sources for desk `engine.ts` / full `store.ts` are not in git history (single webpack commit). **Recovered** from compiled `routes-DFtXkjIc.mjs` into `src/lib/desk/engine.ts` (`@ts-nocheck`) + typed `store.ts`. Prefer replacing with upstream `.ts` when available.
- Zip `src/routes/index.tsx` was StudioShell-centric; replaced by root AppShell index. Legacy `src/components/studio/**` + `useStudio` remain for compatibility but are not the OS-target home route.

## Likely runtime / typecheck gaps
- Desk engine is recovered JS-in-TS: expect typecheck noise unless excluded; behavior should match last App Builder build.
- `npm install` / `npm run typecheck` may fail on environment (node modules size, pglite, nitro) — see BUILD.md / RESULT.
- No `index.html` at repo root — TanStack Start / Vite plugin generates entry (same as zip); cold `vite` without Start may confuse.
- CI still misaligned upstream (`webpack.yml` vs Vite) — out of scope for this tree restore (Pipeline handoff).
- Browser-smoke Desk cases (TOP5 P2-5) not added yet.
- Export smoke cases (four formats magic-byte) not wired into `browser-smoke.mjs` yet — fixtures present.

## Intentionally not invented
- No fake audio graph beyond the recovered compiled desk engine.
- Export draft stub `auditWorkflow` **not** used to overwrite zip’s real `src/lib/audit/engine.ts`.

## Dual-source leftovers
- Flat repo files remain under `/workspace/steel-audit-ops/repo` as reference copies; do not treat them as SoT after this merge.


## Environment notes (2026-09-17)
- Box Node is `v20.19.2`; TanStack Start packages want `>=22.12.0` (EBADENGINE warnings on `npm install`). Typecheck still passed on Node 20.
- Prefer Node 22+ before `npm run build` / `npm run dev` for Abraham compile.
