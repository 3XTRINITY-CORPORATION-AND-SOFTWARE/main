# SOURCE-OF-TRUTH — `/workspace/steel-canonical`

**Built:** 2026-09-17 (Europe/Tallinn) · Wave 1 Kernel Eng / CoS  
**Merge order:** zip layout FIRST → root OS-target OVERLAY → desk/export stubs folded  
**Ground truth for architecture:** `/workspace/steel-kernel-ops/FIRST-OUTCOME-kernel-status.md` (not rescanned)

Legend: **zip** = `grok-workspace.zip` · **root-overlay** = flat `/workspace/steel-audit-ops/repo` · **export-draft** = `/workspace/export-drafts` · **desk** = desk-ops guidance + flat desk libs · **recovered** = decompiled from `routes-DFtXkjIc.mjs` (compiled history) · **synthesized** = minimal glue only

## Tree SoT (path → winner)

### Config / tooling
| Path | Source |
|------|--------|
| `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `eslint.config.mjs` | zip |
| `scripts/*` (incl. `with-app-env.mjs`, migrate, preview, brand/smoke, grok-pwa) | zip |
| `server/*`, `migrations/*` | zip |
| `app-env.json` / `.grok/app-env.json` | zip (fallback root) |

### `public/`
| Path | Source |
|------|--------|
| `public/worklets/steel-kernel.js` | **root-overlay** (same size as zip; OS-target channel) |
| `public/worklets/steel-studio.js`, `steel-tune.js` | zip |
| `public/kernel/manifest.json` | **root-overlay** (3.6.0 OS-target; zip was 3.5.0) |
| `public/favicon.svg`, `public/__grok/**`, other static | zip |

### Routes / shell
| Path | Source |
|------|--------|
| `src/router.tsx`, `src/routeTree.gen.ts`, `src/styles.css` | zip |
| `src/routes/__root.tsx` | **root-overlay** (STEEL branding) |
| `src/routes/index.tsx` | **root-overlay** (AppShell + Steel tabs incl. studio) |
| `src/components/app-shell.tsx` | **root-overlay** |
| `src/components/place-bar.tsx` | **root-overlay** (absent in zip) |

### Kernel / atlas / OS-target UI
| Path | Source |
|------|--------|
| `src/components/steel-kernel.tsx` | **root-overlay** |
| `src/components/steel-atlas.tsx` | **root-overlay** (absent in zip) |
| `src/lib/studio/atlas.ts` | **root-overlay** (absent in zip) |
| `src/lib/studio/places.ts` | **root-overlay** (EXPANSIONS × 10; absent in zip) |
| `src/components/steel-studio.tsx` | **root-overlay** |
| `src/components/steel-oled.tsx` | **root-overlay** |
| `src/components/steel-desk.tsx` | **root-overlay** (newer/larger than zip) |
| `src/components/steel-hosts.tsx` | **root-overlay** |
| `src/lib/i18n.ts` | **root-overlay** (et/en/ru) |

### `src/lib/steel/*`
| Path | Source |
|------|--------|
| `types.ts` | zip + **synthesized** (`SteelTab` extended with `"studio"`) |
| `store.ts` | zip |
| `engine.ts` | zip (kept signal/probe latency path; root dump dropped it) |
| `isolate.ts` | **root-overlay** (studio-aware three-place isolate) |
| `asio.ts`, `hosts.ts`, `midi.ts`, `updates.ts`, `rows.ts` | zip (rows: root if differed) |

### `src/lib/studio/*`
| Path | Source |
|------|--------|
| Most modules (`banks`, `theory`, `engine`, `patterns`, …) | zip |
| `atlas.ts`, `places.ts` | **root-overlay** |
| `store.ts` | zip `useStudio` + **root-overlay** `useRack` via `rack-store.ts` re-export |
| `rack.ts` | **root-overlay** |
| `chain.ts` | **root-overlay** (slightly newer) |

### `src/lib/desk/*`
| Path | Source |
|------|--------|
| `adapt.ts`, `oled.ts`, `clips.ts`, `fx.ts`, `video.ts`, `eq.ts`, `mix-ai.ts`, `boom.ts` | **root-overlay** / **desk** |
| `store.ts` | **recovered** from `routes-DFtXkjIc.mjs` (zip store lacked kare/lyrics/eq/…) |
| `engine.ts` | **recovered** from `routes-DFtXkjIc.mjs` (zip engine lacked applyGenre/makeAdlibs/…); `@ts-nocheck` |

### `src/lib/audit/*` + `src/lib/export/*`
| Path | Source |
|------|--------|
| `audit/types.ts`, `engine.ts`, `github.ts`, `permissions.ts`, `samples.ts`, `store.ts` | zip (real AuditReport — **not** stubbed) |
| `audit/fixtures.ts` | **export-draft** |
| `export/{pdf,docx,xlsx,pptx}.ts` | zip (= root sizes) |
| `components/export-menu.tsx`, audit UI panels | zip |

### Other components / libs
| Path | Source |
|------|--------|
| `src/components/studio/**`, `ui/**`, aura/auth/app-data/crew/… | zip |
| Console / pipeline / audit / aura-stage (unless overlaid above) | zip |

## Leftovers outside the tree (reference only — NOT SoT)
- Flat dump `/workspace/steel-audit-ops/repo` — kept intact for other agents; **canonical wins**.
- Duplicate zip `zJVto2iGwzq54Fn0-grok-workspace.zip` — same payload as `grok-workspace.zip`.
- `/workspace/export-drafts/src/lib/audit/{types,engine}.ts` — stubs **not applied** (zip already has full audit).
- `/workspace/steel-desk-ops/raw` — partial flat curls; used as inventory only.


## Post-merge glue (minimal)
| Path | Source |
|------|--------|
| `src/lib/steel/types.ts` (`"studio"` on `SteelTab`) | synthesized |
| `src/lib/studio/store.ts` re-exports `useRack` from `rack-store.ts` | synthesized |
| `src/lib/audit/fixtures.ts` | export-draft aligned to zip `AuditReport` |
| `src/components/jwt-lab.tsx` (ru→en claim label fallback) | synthesized (Lang gained `ru` from root i18n) |
| `src/lib/desk/engine.ts` / `store.ts` | recovered from `routes-DFtXkjIc.mjs` |

## Not SoT / pruned build artifacts
- `.vercel/` (incl. `.vercel/output`) — **pruned** 2026-09-17; deploy/build output, not source. Gitignored.
- `node_modules/`, `dist/`, `.output/`, `.nitro/`, `.vinxi/`, `.turbo/`, `coverage/` — not SoT; gitignored (may exist locally for builds).
