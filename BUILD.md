# BUILD — steel-canonical

Observed from `package.json` (zip ≡ root).

## Prerequisites
- Node.js matching lockfile era (Vite 8 / React 19)
- From `/workspace/steel-canonical`:

```bash
npm install
```

## Commands

| Purpose | Command |
|---------|---------|
| Dev server | `npm run dev` → `node scripts/with-app-env.mjs vite dev --host 0.0.0.0 --port 8080` |
| Production build | `npm run build` → `node scripts/with-app-env.mjs vite build` (+ pglite copy + `npm run db:migrate`) |
| Dev-mode build | `npm run build:dev` |
| Preview | `npm run preview` / `npm run preview:restart` / `npm run preview:stop` |
| Typecheck | `npm run typecheck` → `tsc --noEmit` |
| Auth invariant | `npm run check:auth` |
| Tests | `npm test` |
| Lint / format | `npm run lint` / `npm run format` |
| DB migrate | `npm run db:migrate` → `node scripts/migrate.mjs` |

## Notes
- All Vite invocations go through `scripts/with-app-env.mjs`.
- `tsconfig` maps `@/*` → `./src/*`; `include`: `src`, `server`.
- App env: `.grok/app-env.json` / `app-env.json` as used by the with-app-env wrapper.

