# WAVE 3 — useStudio → useRack migrate PLAN

**Agent:** Steel Studio · **WIP=1** · **PLAN ONLY** · **No UI redesign** · **No PR** · **AuditReport UNCHANGED**  
**Date:** 2026-09-17 (Europe/Tallinn)  
**Depends on:** `/workspace/steel-studio-ops/WAVE2-CONTRACT-LOCK.md` (store winner `useRack`; F1–F5)  
**SoT:** `/workspace/steel-canonical/SOURCE-OF-TRUTH.md` · `/workspace/steel-canonical/MISSING.md`

> This wave produces a **migrate plan**, not a code rewrite. App source under `steel-canonical/src` is **not** edited here. Only this markdown is created under `steel-studio-ops/`.

---

## 0. Contract reminder (WAVE2)

| Lock | Implication for migrate |
|------|-------------------------|
| **Winner store = `useRack`** | OS-target Studio / AppShell / place nav already on `useRack`; do not grow `useStudio`. |
| **`useStudio` deprecated** | Legacy zip-era mixer + `components/studio/**` + crew/studio engine until migrated. |
| **Desk ↔ rack fields OK** | Mix/lyrics/EQ/playing live on **`useDesk`**, not on `useRack`. |
| **Shell prefs** | `lang` / steel `host` / `buffer` / `armed` live on **`useSteel`** (`steel-desk-v1`). |
| **F1** | Migrate `studio/engine.ts`, `vocal.ts`, `runtime.ts`, `crew/runtime.ts`, `components/studio/**` off `useStudio` → desk/steel/rack **as appropriate**. |
| **F2** | Keep `steel-studio-v1` readable one release; OS-target must **not** write new keys under it. Pins = `steel-atlas-pins-v1`; steel prefs = `steel-desk-v1`. |
| **No HostId merge** | Studio `HostId` (`standalone`/`logic`) ≠ steel `HostId` (`generic`). |
| **AuditReport frozen** | Out of scope entirely. |

**Critical sizing note:** `useRack` (`StudioRack`) is **not** a 1:1 replacement for `StudioState`. It owns place / paste / seed / rhyme / geo / chain / spine / extras / pins. Mix + transport-adjacent fields migrate to **`useDesk`**; shell prefs to **`useSteel`**. Studio-only mixer state (channels, steps, recs, visuals, vocal processing, `StudioTab`, `ComputePath`, …) stays on `useStudio` until the legacy tree is retired or given a dedicated owner — **do not dump it into `useRack`**.

---

## 1. Inventory — every file that imports / uses `useStudio`

Canonical scan: `rg useStudio|hydrateStudio|watchStudioPersist` under `/workspace/steel-canonical/src` (excl. `node_modules`).

### 1.1 Definition / persist site (not a “consumer”, but must change last)

| Path | Role |
|------|------|
| `/workspace/steel-canonical/src/lib/studio/store.ts` | Defines `useStudio`, `hydrateStudio()`, `watchStudioPersist()`; persist key **`steel-studio-v1`**; re-exports `useRack` from `./rack-store` |

### 1.2 Lib consumers (4 files)

| # | Absolute path | How it uses `useStudio` |
|---|---------------|-------------------------|
| 1 | `/workspace/steel-canonical/src/lib/studio/engine.ts` | Heavy: `getState()` / `patch` for arm/play/record/meters/buffers/genre/path/voiceCap — **legacy audio engine** |
| 2 | `/workspace/steel-canonical/src/lib/studio/vocal.ts` | `getState().bpm` + full state for process/audition |
| 3 | `/workspace/steel-canonical/src/lib/studio/runtime.ts` | Watch loop: `armed`, `recs`, `sampleRate`, `bufferSize`, `voices`, `path` → `pushAll` / vault |
| 4 | `/workspace/steel-canonical/src/lib/crew/runtime.ts` | `lang`, `path`, `bufferSize`, `visFps`, `armed`, `patch` (also mirrors some writes to `useSteel`) |

### 1.3 Legacy UI consumers — `components/studio/**` (13 files)

| # | Absolute path | Selectors / calls (summary) |
|---|---------------|------------------------------|
| 5 | `/workspace/steel-canonical/src/components/studio/shell.tsx` | **Only hydrator site:** `hydrateStudio()` + `watchStudioPersist()`; also `tab`/`setTab`/`lang`/`armed`/`playing`/`path`/`patch`; starts crew + studio watch |
| 6 | `/workspace/steel-canonical/src/components/studio/transport.tsx` | `lang`, `playing`, `armed`, `recording`, `bpm`, `peak`, `rms`, `processing`, `patch` |
| 7 | `/workspace/steel-canonical/src/components/studio/desk.tsx` | Mix desk: `genre`, `channels`, `steps`, `master`, `width`/`drive`/`glue`/`swing`, meters, `setChannel`/`toggleStep` |
| 8 | `/workspace/steel-canonical/src/components/studio/theory-box.tsx` | Overlap with rack: `theoryPaste`, `rhymeSeed`/`rhymeOut`, `geo*`, `chainLog` + desk-like `genre`/`bpm`/`lyrics` + studio-only recs/vocal |
| 9 | `/workspace/steel-canonical/src/components/studio/vocals.tsx` | Vocal bank / FX / hook / mic / tune / `voiceCap` |
| 10 | `/workspace/steel-canonical/src/components/studio/visuals.tsx` | `visualStyle`/`visualPrompt`/`stillUrl`/`visFps`/`lyrics` |
| 11 | `/workspace/steel-canonical/src/components/studio/monitor.tsx` | Studio `host`, `bufferSize`, `sampleRate`, `cpu`, `armed`, `radarNote` |
| 12 | `/workspace/steel-canonical/src/components/studio/matrix.tsx` | Engine meters + `translate`/`path`/`ceiling`/`width` |
| 13 | `/workspace/steel-canonical/src/components/studio/banks.tsx` | `recs`/`activeRec`/`setRec`/`setChannel` |
| 14 | `/workspace/steel-canonical/src/components/studio/crew.tsx` | `path`, `signalScore`, `cores`, `memoryGb`, `connection`, `bufferSize`, `visFps` |
| 15 | `/workspace/steel-canonical/src/components/studio/kernel-bay.tsx` | `path`, `signalScore`, `bufferSize` |
| 16 | `/workspace/steel-canonical/src/components/studio/film.tsx` | `lyrics`, `bpm`, `peak` |
| 17 | `/workspace/steel-canonical/src/components/studio/keyboard.tsx` | `lastNote` |

**Consumer file count (import/use sites): 17**  
(Definition-only: `store.ts` = +1 module; non-users in same folder: `fader.tsx`, `meter.tsx` — no `useStudio`.)

### 1.4 OS-target status (SoT / MISSING)

- Home route mounts **`AppShell` → `SteelStudio`**, not `StudioShell` (`routes/index.tsx`).
- **`StudioShell` is never imported** outside its own file → entire `components/studio/**` tree is **legacy / unmounted** on OS-target.
- **`startCrew` / `hydrateStudio` only from `StudioShell`** → crew + studio engine watch are dormant on OS-target unless something re-mounts them.
- Ops evidence (`steel-studio-ops/raw`, `steel-desk-ops/raw`) matches: live shell uses **`useRack` only**.

---

## 2. Inventory — `useRack` / desk bridge touchpoints (what migrants call instead)

### 2.1 Winner store definition

| Path | Notes |
|------|-------|
| `/workspace/steel-canonical/src/lib/studio/rack-store.ts` | `useRack` / `StudioRack` / `PlacePins`; persist **`steel-atlas-pins-v1`** (pins only) |
| `/workspace/steel-canonical/src/lib/studio/store.ts` L355 | `export { useRack, type StudioRack, type PlacePins } from "./rack-store"` |

**Authoritative fields:** `place`, `paste`, `seed`, `rhymeOut`, `geoLine`, `geoBusy`, `geoQuery`, `chainLog`, `spine`, `extras`, `note`, `busy`, `pins`, `set`, `togglePin`.

### 2.2 Live OS-target `useRack` consumers (already correct — do not regress)

| Absolute path | Usage |
|---------------|--------|
| `/workspace/steel-canonical/src/components/app-shell.tsx` | Sync `useRack.place` via `placeForTab(tab)` on tab change |
| `/workspace/steel-canonical/src/components/place-bar.tsx` | `place` + `set` |
| `/workspace/steel-canonical/src/components/steel-studio.tsx` | Full rack UI + **desk bridge** (`useDesk` lyrics/bpm/eq/palve) + `useSteel.lang` |
| `/workspace/steel-canonical/src/components/steel-kernel.tsx` | `pins` |
| `/workspace/steel-canonical/src/components/steel-atlas.tsx` | `pins` + `togglePin` |
| `/workspace/steel-canonical/src/lib/studio/rack.ts` | Chain ops: read/write `useRack` + **`useDesk`** (genre/bpm/lyrics/palve/eq/playing) + **`useSteel`** (armed) |

Evidence copies (same contracts):  
`/workspace/steel-studio-ops/raw/{app-shell,steel-studio,rack}.tsx|ts`,  
`/workspace/steel-desk-ops/raw/{app-shell,place-bar,steel-kernel,steel-studio,store}.tsx|ts`.

### 2.3 Desk bridge (migrants for mix / lyrics / EQ)

**Module:** `/workspace/steel-canonical/src/lib/desk/store.ts` — `useDesk` / `DeskState`.

Fields already used by rack / SteelStudio (WAVE2 §5):  
`genre`, `bpm`, `lyrics`, `palve`, `kare`, `drive`, `glue`, `width`, `autoTakt`, `applyMix`, `eq`, `playing`.

### 2.4 Steel bridge (migrants for shell prefs)

**Module:** `/workspace/steel-canonical/src/lib/steel/store.ts` — `useSteel`; persist **`steel-desk-v1`**.

Fields for migrants: `tab` (`SteelTab` incl. `"studio"`), `lang` (`et|en|ru`), `armed`, `host` (steel union), `os`, `buffer`, `sampleRate`-adjacent prefs, meters as owned by steel engine.

### 2.5 Field redirect map (useStudio → target)

| `useStudio` concern | Call instead | Notes |
|---------------------|--------------|-------|
| Shell tab / place | `useSteel.tab` + `useRack.place` + `placeForTab` | Never `useStudio.tab` (`StudioTab`) |
| `lang` | `useSteel.lang` | Studio `Lang` is `et\|en` only; steel/i18n has `ru` (WAVE2 F5) |
| `genre`, `bpm`, `lyrics`, `drive`, `glue`, `width`, `playing` | `useDesk` | Already bridged in `rack.ts` / `steel-studio.tsx` |
| `theoryPaste` → `paste`; `rhymeSeed` → `seed`; `rhymeOut`; `geoLine`/`geoBusy`; `chainLog` | `useRack.set` / selectors | Direct overlap with `StudioRack` |
| `bufferSize` → `buffer`; `armed` (shell) | `useSteel` | Crew already dual-writes some buffer/armed |
| `host` | **steel** `HostId` for OS; keep studio `HostId` only if legacy monitor stays | Do not collapse unions (WAVE2 B) |
| channels / steps / recs / visuals / vocalKind / voiceCap / `path` / `ComputePath` / `StudioTab` | **No rack dump** | Stay on `useStudio` until legacy UI+engine retired, or later dedicated modules |

---

## 3. Smallest change set (P0 → Pn) — risk-ordered

Implement in a **later** wave. Each step lists exact files + what changes (imports / selectors / persist). No UI redesign.

### P0 — Freeze OS-target + deprecate export (lowest risk)

| File | Change |
|------|--------|
| `/workspace/steel-canonical/src/lib/studio/store.ts` | Add `@deprecated` JSDoc on `useStudio` / `hydrateStudio` / `watchStudioPersist`; **keep** `useRack` re-export. **Do not** remove body. |
| `/workspace/steel-canonical/src/components/app-shell.tsx` | **Verify only** — no `hydrateStudio`; keep `useRack` place sync. No functional edit if already clean. |
| `/workspace/steel-canonical/src/routes/index.tsx` | **Verify only** — mounts `SteelStudio`, not `StudioShell`. |

**Persist:** Ensure no new code path writes `steel-studio-v1` from AppShell (already true).  
**Risk:** Near-zero. Documents winner; prevents accidental growth.

### P1 — Theory/geo/rhyme overlap → `useRack` (if legacy theory UI is touched)

| File | Change |
|------|--------|
| `/workspace/steel-canonical/src/components/studio/theory-box.tsx` | Import `useRack` (+ keep/replace): map `theoryPaste`→`paste`, `rhymeSeed`→`seed`, `rhymeOut`, `geoLine`/`geoBusy`, `chainLog` via `useRack` selectors/`set`. Map `genre`/`bpm`/`lyrics` → `useDesk`; `lang`/`armed` → `useSteel`. Leave vocal/recs on `useStudio` until P4/P5. |

**Persist:** None new; rack pins unchanged. Stop dual-writing rhyme/geo into `steel-studio-v1` when this file migrates.  
**Risk:** Low if StudioShell unmounted; medium if someone remounts legacy shell mid-migrate.

### P2 — Shell-pref readers → `useSteel` (crew + monitor/matrix/kernel-bay/shell)

| File | Change |
|------|--------|
| `/workspace/steel-canonical/src/lib/crew/runtime.ts` | Prefer `useSteel` for `lang`, `buffer`/`armed`; drop `useStudio.lang` helper where steel covers it. Keep studio-only `path`/`visFps` on `useStudio` until ComputePath ownership decided (or gate crew behind legacy shell only). |
| `/workspace/steel-canonical/src/components/studio/shell.tsx` | If still needed: hydrate **`useSteel`** (already AppShell’s job) — **remove** `hydrateStudio`/`watchStudioPersist` from any path that could become OS-reachable; `lang` from `useSteel`. |
| `/workspace/steel-canonical/src/components/studio/monitor.tsx` | `bufferSize`/`sampleRate`/`armed` → `useSteel`; **do not** map studio `host` onto steel `host` without explicit HostId adapter (F4 alias optional). |
| `/workspace/steel-canonical/src/components/studio/matrix.tsx` | Prefs/meters that exist on steel → `useSteel`; mix width/ceiling → `useDesk` where fields exist. |
| `/workspace/steel-canonical/src/components/studio/kernel-bay.tsx` | `bufferSize` → `useSteel.buffer`; leave `path`/`signalScore` until owner clear. |
| `/workspace/steel-canonical/src/components/studio/transport.tsx` | `lang`→`useSteel`; `bpm`/`playing`→`useDesk`; recording/peak may stay studio-engine until P3. |

**Persist:** Writers must use `steel-desk-v1` via existing steel watch — **not** `steel-studio-v1`.  
**Risk:** Medium — dual-write windows if both stores still updated.

### P3 — Mix / transport fields → `useDesk` (+ desk engine, not studio engine)

| File | Change |
|------|--------|
| `/workspace/steel-canonical/src/components/studio/desk.tsx` | Prefer `useDesk` for drive/glue/width/genre/playing; **channels/steps** remain studio-only (no desk equivalent) — either leave or quit mounting this panel. |
| `/workspace/steel-canonical/src/components/studio/film.tsx` | `lyrics`/`bpm` → `useDesk`. |
| `/workspace/steel-canonical/src/components/studio/vocals.tsx` | Shared lyrics/genre → `useDesk`; vocal-specific stays until engine migrate. |
| `/workspace/steel-canonical/src/lib/studio/rack.ts` | **Already correct** — reference implementation; no change unless drift found. |
| `/workspace/steel-canonical/src/components/steel-studio.tsx` | **Already correct** — reference UI; no redesign. |

**Persist:** Desk store is in-memory (no `localStorage` in desk store). Mix rows stay `steel_rows` via steel/rows — unchanged.  
**Risk:** Medium — two mix UIs (SteelDesk vs legacy studio desk) must not fight.

### P4 — Studio audio engine / vocal / runtime (highest code risk)

| File | Change |
|------|--------|
| `/workspace/steel-canonical/src/lib/studio/engine.ts` | Long-term: either (A) retire with `components/studio/**`, or (B) rebind `patch`/`getState` reads for shared fields to `useDesk`/`useSteel` and keep a **thin** studio-local store for channels/recs/voiceCap. **Do not** move AudioContext graph into `useRack`. |
| `/workspace/steel-canonical/src/lib/studio/vocal.ts` | BPM from `useDesk.bpm`; other process state follows engine decision. |
| `/workspace/steel-canonical/src/lib/studio/runtime.ts` | Watch loop: `armed` from `useSteel`; bank vault may stay studio-local or stop when legacy shell dies. |

**Persist:** When engine no longer patches persisted StudioState keys, `watchStudioPersist` becomes no-op → safe to stop writing `steel-studio-v1` (F2).  
**Risk:** High — audio regressions; isolate behind feature flag / keep legacy path until SteelDesk+steel engine cover parity.

### P5 — Retire leftover studio-only UI + stub `useStudio`

| File | Change |
|------|--------|
| Remaining `/workspace/steel-canonical/src/components/studio/{banks,crew,visuals,keyboard,vocals}.tsx` | Migrate only if product still needs them under AppShell; else leave unmounted and delete in a cleanup wave. |
| `/workspace/steel-canonical/src/lib/studio/store.ts` | After zero importers: stub `useStudio` or remove; keep `useRack` re-export. |
| `/workspace/steel-canonical/src/lib/crew/runtime.ts` | Final pass: zero `useStudio` imports (WAVE2: crew may lag — OK until this step). |

**Persist:** One release with **read-only** `hydrateStudio` for `steel-studio-v1` (optional one-shot import of lyrics/bpm/genre into `useDesk` if product wants); then stop reading. Never migrate pins from studio key (pins never lived there).  
**Risk:** High only if product still ships StudioShell.

---

## 4. localStorage migration notes (WAVE2 F2)

| Key | Owner | Shape / role | Migrate rule |
|-----|-------|--------------|--------------|
| **`steel-atlas-pins-v1`** | `useRack` (`rack-store.ts`) | `PlacePins`: `{ os, web, host: number[] }` | **Keep forever** for OS-target. No rename. No merge from studio key. |
| **`steel-desk-v1`** | `useSteel` | Steel prefs: host/os/buffer/sampleRate/kernel/addons/gains/EQ/…/lang | **Keep.** OS-target already hydrates via AppShell. Migrants that need lang/buffer/host write here. |
| **`steel-studio-v1`** | `useStudio` | Large `Persisted` pick: lang/genre/bpm/swing/buffer/host/channels/master/FX/visuals/vocals/recs/theory/lyrics/hook… | **Leave readable** for one release if any UI still calls `hydrateStudio`. **OS-target must not write new keys under it.** After P4/P5: optional one-shot map `genre`/`bpm`/`lyrics`/`drive`/`glue`/`width` → `useDesk.set(...)` then ignore key. Do **not** copy channels/recs into rack. |

**Do not invent** a fourth persist key.  
**Do not** move atlas pins into `steel-desk-v1` or `steel-studio-v1`.

---

## 5. What NOT to do (this wave and implement wave)

1. **No UI redesign** — no new tabs, restyles, or PlaceBar/SteelStudio layout changes.
2. **No `AuditReport` / Export API changes** — frozen (WAVE2 E).
3. **No PR** this wave; implement wave should stay smallest diffs, still no drive-by redesign.
4. **Do not** expand `useRack` into a full mixer (`channels`, `steps`, `recs`, visuals, vocal processing).
5. **Do not** merge steel vs studio `HostId` unions.
6. **Do not** delete `useStudio` source until importers hit zero (deprecate first).
7. **Do not** call `hydrateStudio` from `app-shell.tsx`.
8. **Do not** flatten `store.ts`/`types.ts`/`engine.ts` at repo root (WAVE1/WAVE2).
9. **Do not** treat ops `raw/` or flat `steel-audit-ops/repo` as SoT — canonical wins.

---

## 6. Acceptance checklist (later implement wave)

- [ ] `rg useStudio` under `/workspace/steel-canonical/src` shows **zero** hits outside `studio/store.ts` (or only a deprecated stub).
- [ ] OS-target path (`app-shell`, `place-bar`, `steel-studio`, `steel-kernel`, `steel-atlas`, `rack.ts`) still imports **`useRack`** only from `@/lib/studio/store` — no regressions.
- [ ] No file under OS-target calls `hydrateStudio` / `watchStudioPersist`.
- [ ] New writes: pins → `steel-atlas-pins-v1` only; steel prefs → `steel-desk-v1` only; **no new writes** to `steel-studio-v1`.
- [ ] Desk bridge fields used by `rack.ts` / `SteelStudio` still on `useDesk` (genre/bpm/lyrics/palve/kare/drive/glue/width/autoTakt/applyMix/eq/playing).
- [ ] Steel `HostId` vs studio `HostId` still separate types.
- [ ] `AuditReport` + `export/{pdf,docx,xlsx,pptx}` signatures unchanged.
- [ ] No PlaceBar / SteelStudio / AppShell visual redesign in the PR diff.
- [ ] `components/studio/**` either migrated or explicitly left unmounted with comment pointing at this plan.
- [ ] Typecheck / smoke: AppShell → Studio tab → rack chain still runs (desk+rack+steel); legacy StudioShell not required for green OS path.

---

## 7. Suggested implement order (one PR series, later)

1. P0 deprecate + verify AppShell (docs/comment-only).  
2. P1 theory-box rack overlap (optional if legacy kept dark).  
3. P2 steel prefs in crew + legacy chrome.  
4. P3 desk field redirects in legacy mix panels.  
5. P4 engine/vocal/runtime — only with audio test plan.  
6. P5 stub/remove `useStudio` + localStorage read window close.

---

## HANDOFF
RESULT: WAVE 3 migrate PLAN from useStudio → useRack (plus desk/steel as appropriate) written per WAVE2-CONTRACT-LOCK; 17 useStudio consumer files inventoried; OS-target already on useRack; smallest P0–P5 change set listed without code/PR/UI redesign.
FILES: /workspace/steel-studio-ops/WAVE3-USERACK-MIGRATE.md
CHANGED: Created WAVE3-USERACK-MIGRATE.md only under steel-studio-ops/ (WIP=1); no app source edits; no PR.
TEST: Read WAVE2 + STORE-TYPES-BOUNDARY + SoT/MISSING; rg useStudio/hydrateStudio/useRack across steel-canonical/src + studio/desk ops raw; mapped StudioState fields to useRack/useDesk/useSteel; confirmed StudioShell unmounted from routes/index.
PASS: Deliverable at exact path; full consumer inventory with absolute paths; useRack/desk/steel touchpoints listed; P0→Pn file-level change set; localStorage notes for three keys; NOT-to-do + acceptance checklist; HANDOFF block present.
FAIL: none for plan delivery
BLOCKERS: none for planning. Implement later blocked only by product choice on P4 (retire vs rebind studio engine) and optional HostId adapter (WAVE2 F4) if legacy monitor must show steel hosts.
NEXT: Implement wave executes P0 first (deprecate + verify OS path), then P1–P3 for field redirects; defer P4/P5 until audio/crew ownership decided. Keep AuditReport frozen; no UI redesign.
