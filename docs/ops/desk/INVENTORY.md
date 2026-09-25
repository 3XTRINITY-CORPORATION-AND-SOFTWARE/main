# Desk Ops Inventory — STEEL

**Repo:** `antonioportfelli-boop/STEEL-3XTRINITY-CORPORATION-OFFICIAL-APP-`  
**Tree:** `/workspace/steel-desk-ops/tree.json` (copied from good `/tmp/steel-tree.json`; GitHub API recursive tree was rate-limited on this box)  
**Raw sources:** `/workspace/steel-desk-ops/raw/`  
**Local demos (context):** `/workspace/steel-demo-scripts/{desk,hosts,console}.md` · layout notes `/workspace/export-unblock-one-pager.md`  
**Constraint:** claims grounded in fetched paths only. No invented URL routes.

---

## Layout fact (confirmed)

| Check | Evidence |
|-------|----------|
| **Flat root** | Tree has **0** blobs under `src/`. App `.ts`/`.tsx` live at repo root (`steel-desk.tsx`, `places.ts`, `app-shell.tsx`, `index.tsx`, `__root.tsx`, …). |
| **Empty / missing `src/`** | `tsconfig.json` maps `"@/*": ["./src/*"]` and `"include": ["src","server"]`. Vite comments (`vite.config.ts`) and `references/scaffold.md` / `AGENTS.md` expect `src/router.tsx`, `src/routes/`. |
| **Alias vs disk** | Source imports use `@/components/*`, `@/lib/desk/*`, `@/lib/steel/*`, `@/lib/studio/*` — but tree has **no** `components/`, `lib/`, `routes/`, or `src/` directories. |
| **Route files misplaced** | `routeTree.gen.ts` imports `./routes/__root` and `./routes/index`. Actual blobs are root `__root.tsx` and `index.tsx` (not under `routes/`). |

This matches Export’s one-pager: flat root + empty `src/` breaks `@/*` resolution.

---

## Router / entry (do not invent routes)

| Path | Role |
|------|------|
| `router.tsx` | `getRouter()` → TanStack `createRouter({ routeTree })` |
| `routeTree.gen.ts` | Generated tree: **only** fullPath `'/'` (Index under root) |
| `index.tsx` | `createFileRoute("/")` Home — **tab switcher**, not path routes |
| `__root.tsx` | Document shell + `AuthProvider` + `Outlet` (content assumes `../styles.css` as if under `src/routes/`) |

**URL routes present in `routeTree.gen.ts`:** `/` only.  
Place/module navigation is **in-app tab state** (`useSteel().tab`), not file routes.

---

## Places & tabs (from `places.ts` + `app-shell.tsx` + `index.tsx`)

### Places (`places.ts`)

| PlaceId | Home tab (`PLACE_HOME`) | Tabs (`PLACE_TABS`) | Purpose |
|---------|-------------------------|---------------------|---------|
| `os` | `kernel` | `kernel`, `console`, `pipeline` | ASIO / worklet motor |
| `web` | `desk` | `desk`, `studio` | Browser remote (mix + studio) |
| `host` | `hosts` | `hosts` | FL / Live / generic ASIO host mirror |
| `lab` | — | `aura`, `audit` | Lab extras (always shown in shell nav) |

`PlaceBar` (`place-bar.tsx`) switches place → `PLACE_HOME[id]` via `isolateForTab` + `setTab`.

### Tab → component mounts (`index.tsx` only)

| Tab | Component | Source file (flat root today) | Intended import alias |
|-----|-----------|-------------------------------|------------------------|
| `desk` | `SteelDesk` | `steel-desk.tsx` | `@/components/steel-desk` |
| `studio` | `SteelStudio` | `steel-studio.tsx` | `@/components/steel-studio` |
| `console` | `SteelConsole` | `steel-console.tsx` | `@/components/steel-console` |
| `aura` | `AuraStage` | `aura-stage.tsx` | `@/components/aura-stage` |
| `pipeline` | `SteelPipeline` | `steel-pipeline.tsx` | `@/components/steel-pipeline` |
| `hosts` | `SteelHosts` | `steel-hosts.tsx` | `@/components/steel-hosts` |
| `kernel` | `SteelKernel` | `steel-kernel.tsx` | `@/components/steel-kernel` |
| `audit` | `SteelAudit` | `steel-audit.tsx` | `@/components/steel-audit` |

**Surface count (mounted tabs):** **8**  
**OLED:** not a tab — nested inside Desk (`SteelOled` from `steel-oled.tsx`).

---

## Desk-owned surfaces (detail)

### 1. Desk — WEB remote mix (`steel-desk.tsx`)

- **Place:** `web` · **Entry:** tab `desk` via `AppShell` / `PlaceBar` home for web  
- **Purpose:** Beat/vocal slots, live mic / voice rec, play/stop, genre FX, delay/reverb, timeline clip tools, AI mix hint, bounce WAV, `renderDeskVideo`, steel-row save/load, embed OLED  
- **Key deps (aliases):** `@/lib/desk/engine`, `@/lib/desk/store`, `@/lib/desk/fx`, `@/lib/desk/clips`, `@/lib/desk/adapt`, `@/lib/desk/video`, `@/lib/desk/mix-ai`, `@/components/steel-oled`  
- **Flat files that belong under those aliases:** `adapt.ts`, `oled.ts`, `clips.ts`, `fx.ts`, `video.ts`, `mix-ai.ts`, plus a **desk** `engine`/`store` that are **not** distinguishable at flat root (see collisions)  
- **Adapt:** `probeDesk()` in `adapt.ts` — narrow ≤700px → `tier:"remote"` 1280×720; else desk 1920×1080  

### 2. OLED readout (`steel-oled.tsx` + `oled.ts`)

- **Not a route/tab.** Mounted near end of Desk UI (`<SteelOled />`)  
- **Purpose:** SSD1315-style 128×64 GDDRAM paint (`paintOled`, contrast `81h`) — peak/LUFS/BPM/key/crawl; honesty copy in `i18n.ts` (`oledNote`) — driver, not audio DSP  

### 3. Hosts — HOST mirror (`steel-hosts.tsx` + `hosts.ts`)

- **Place:** `host` · **Entry:** tab `hosts`  
- **Purpose:** Host profile chips (FL / Ableton / Any ASIO), since/clock/steps, OS matrix + driver note (`asio.ts` `OS_MATRIX`), CC map, MIDI notes  
- **Data:** `HOSTS` in `hosts.ts` — ids `fl`, `ableton`, **`generic`**  

### 4. Console — OS arm (adjacent, `steel-console.tsx`)

- **Place:** `os` · **Entry:** tab `console`  
- **Purpose:** Arm/disarm kernel, panic, buffer/sample-rate, measured RTL when armed, peak/clip, optional MIDI piano  
- **Isolation:** `isolate.ts` — leaving console (non-OS, non-remote) calls `panic()`; leaving remote stops mix/mic but does **not** disarm OS  

### 5. Shell chrome

| File | Role |
|------|------|
| `app-shell.tsx` | Sticky header, PlaceBar, primary+lab nav, lang cycle, teardown desk/aura/kernel on unmount |
| `place-bar.tsx` | OS / WEB / HOST place buttons (`data-place`) |
| `i18n.ts` | et/en/ru strings for desk/hosts/console/oled/places |
| `browser-smoke.mjs` | Playwright desktop+mobile load; canvas/overflow/errors — **no Desk tab/slot actions** |

### 6. Related WEB sibling

- `studio` tab → `SteelStudio` (`steel-studio.tsx`) — listed in `PLACE_TABS.web`; shares desk graph per `isolate.ts` comment (“Mix and Studio share the desk graph”).

---

## Filtered tree matches (Desk Ops keywords)

38 blob paths matched `desk|hosts|oled|console|steel-desk|steel-hosts|steel-oled|adapt|place-bar|places|app-shell|router|routeTree|i18n|browser-smoke` (plus steel- filename sweep). Notable **source** (non-PNG/bundle):

`adapt.ts`, `app-shell.tsx`, `browser-smoke.mjs`, `browser-smoke-verdict*.mjs`, `hosts.ts`, `i18n.ts`, `oled.ts`, `place-bar.tsx`, `places.ts`, `routeTree.gen.ts`, `router.tsx`, `steel-console.tsx`, `steel-desk.tsx`, `steel-hosts.tsx`, `steel-oled.tsx`

PNG evidence fixtures at root (`desk-*.png`, `hosts.png`, `oled-*.png`) — screenshots only, not runtime.

---

## Namespace collisions at flat root (playability)

| Flat file | What it actually is (from content) | What imports expect |
|-----------|------------------------------------|---------------------|
| `engine.ts` | Steel kernel worklet (`useSteel`, arm params) | Also `@/lib/desk/engine` (bounce/playMix/…) |
| `store.ts` | Studio rack / atlas pins (`useRack`) | Also `@/lib/desk/store`, `@/lib/steel/store` |
| `types.ts` | Studio types; `HostId = "standalone"\|"fl"\|"ableton"\|"logic"` — **no `SteelTab`** | `@/lib/steel/types` (`SteelTab`); hosts import `HostId` with id **`generic`** |

Until paths are restored under `src/`, TypeScript/`@/*` cannot tell these modules apart.

---

## Fetch notes

| Attempt | Result |
|---------|--------|
| `api.github.com/.../git/trees/HEAD?recursive=1` | **403 rate limit** — used `/tmp/steel-tree.json` → `/workspace/steel-desk-ops/tree.json` |
| `desk.ts` | **404** — desk UI is `steel-desk.tsx`; adapt in `adapt.ts` |
| `src/router.tsx`, `src/places.ts`, `routes/index.tsx`, `routes/__root.tsx` | **404** — flat counterparts exist |
| `main.tsx`, `App.tsx`, `index.html`, `client.tsx`, `steel-aura.tsx` | **404** — entry is TanStack Start + `aura-stage.tsx` for aura |
| Priority raw curls (`place-bar`, `places`, `app-shell`, `router`, `routeTree.gen`, `adapt`, `AGENTS`, `browser-qa`, …) | **200** |
| Reused `/tmp/file_steel-{desk,hosts,oled,console}.tsx`, `/tmp/file_{hosts,oled,package.json,README.md}` | OK |

---

*Desk Ops inventory — grounded in public tree + raw sources on box.*
