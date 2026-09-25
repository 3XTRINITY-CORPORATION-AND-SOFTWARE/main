# Studio store / types boundary inventory (WAVE 1)

**Agent:** Steel Studio · **Constraint:** existing box evidence only · **No UI redesign · No invented APIs**  
**Date:** 2026-09-17 (Europe/Tallinn)

---

## 1. Evidence base

### Kernel Eng Source of Truth

| Check | Result |
|-------|--------|
| `/workspace/steel-canonical/SOURCE-OF-TRUTH.md` | **MISSING** |
| `/workspace/steel-canonical/` | **MISSING** |

**DEPENDS:** Kernel Eng SoT. All layout/merge priority claims below are grounded in zip + ops packs only; Kernel Eng must confirm canonical winners when SoT lands.

### Paths used (verified present)

| Source | Path |
|--------|------|
| Studio ops index | `/workspace/steel-studio-ops/_all_paths.txt`, `_hits.txt`, `raw/` |
| Desk ops | `/workspace/steel-desk-ops/{INVENTORY,SUMMARY,TOP5-FIXES}.md`, `raw/` |
| Kernel ops | `/workspace/steel-kernel-ops/FIRST-OUTCOME-kernel-status.md` |
| Export evidence | `/workspace/steel-export-evidence/{export-menu,docx,pdf,pptx,xlsx,xlsx-banks,report,utils,steel-audit,audit-workspace}.ts(x)` |
| Audit extract | `/workspace/steel-audit-ops/extracted/src/lib/audit/{store,types}.ts` |
| Repo + zip | `/workspace/steel-audit-ops/repo/` (+ `grok-workspace.zip`, `0002_steel_rows.sql`) |
| Export one-pager | `/workspace/export-unblock-one-pager.md` |
| Zip extracts (this wave) | `/workspace/steel-studio-ops/extracted-from-zip/src/lib/{steel,desk,studio,export,audit}/**` |

**Not used as SoT:** trinitywayve-divine-core, steel-integration-dropin (theme/art only — no Studio store boundary).

### Dual-era note (fact, not preference)

- **Zip layout** (`grok-workspace.zip`, dated 2026-09-13): `src/lib/{steel,desk,studio,export,audit}/…` with full `useSteel` / slim `useDesk` / large `useStudio`.
- **Flat-root / ops raw (newer consumers):** shell + Studio UI import **`useRack`** from `@/lib/studio/store`; flat `store.ts` / `types.ts` match rack + studio types. Steel `store.ts` / `types.ts` **absent at flat root** (Kernel status confirms).

---

## 2. Store inventory (cited paths)

### 2.1 `useSteel` — shell / Kernel / cross-surface tab + audio prefs

| | |
|--|--|
| **Canonical path (zip)** | `/workspace/steel-studio-ops/extracted-from-zip/src/lib/steel/store.ts` ← zip `src/lib/steel/store.ts` |
| **Types** | zip `src/lib/steel/types.ts` |
| **Hook API** | `useSteel`, `hydrateSteel()`, `watchSteelPersist()` |
| **State shape** | `SteelState`: `tab`, `lang`, arm/run, `host`/`os`, buffer/sampleRate/`kernel`, addon flags, gains/EQ/sat/thresh, meters, MIDI ports, `webOut`, `error`; mutators `setTab`, `patch` |
| **Persistence** | `localStorage` key **`steel-desk-v1`**; persists host/os/buffer/sampleRate/kernel/addons/gains/EQ/sat/thresh/transAmt/webOut/lang — **not** live meters/tab/armed |
| **Hydration site** | `/workspace/steel-studio-ops/raw/app-shell.tsx` (also desk-ops copy): `hydrateSteel()` + `watchSteelPersist()` on mount |
| **Flat root** | **MISSING** as distinct module (collision risk: see §4) |

### 2.2 `useDesk` — WEB remote mix surface

| | |
|--|--|
| **Canonical path (zip)** | `/workspace/steel-studio-ops/extracted-from-zip/src/lib/desk/store.ts` |
| **Hook API** | `useDesk`, exports `NOTE_NAMES`, `TuneMode`, `SlotId`, `DeskState` |
| **Zip state fields** | beat/vocal names, playing/recording/liveMic, amount/speed/tonic/mode, drive/ceiling/gains, width/glue/duck, meters, bpm/lufs/keyName, aiNote/aiBusy, error; mutator `set` |
| **No persistence in zip desk store** | in-memory zustand only (zip file has no `localStorage`) |
| **Consumers** | `/workspace/steel-studio-ops/raw/steel-desk.tsx`, `rack.ts`, zip `src/lib/desk/engine.ts` |
| **Gap vs consumers** | `rack.ts` / desk UI also touch **`genre`, `lyrics`, `palve`, `kare`, `eq`, `autoTakt`, `applyMix`, `width`** beyond zip `DeskState` — **DEPENDS** Kernel Eng SoT / newer desk store merge (desk engine at flat root may be steel engine collision; see Desk TOP5 P0-2) |

### 2.3 Studio stores — **two eras**

#### A. Live rack store `useRack` (what Studio UI + shell use today)

| | |
|--|--|
| **Evidence** | `/workspace/steel-desk-ops/raw/store.ts` (identical role to intended `@/lib/studio/store`) |
| **Hook** | `useRack` / interface `StudioRack` |
| **Fields** | `place`, paste/seed/rhymeOut, geo*, `chainLog`, `spine`, `extras`, note/busy, **`pins`**, `set`, `togglePin` |
| **Persistence** | pins only → `localStorage` **`steel-atlas-pins-v1`** (`PlacePins`: os/web/host number[]) |
| **Consumers** | `app-shell.tsx`, `steel-studio.tsx`, `rack.ts`, `steel-kernel.tsx`, `place-bar.tsx` |

#### B. Zip full studio store `useStudio` (older / parallel module in zip)

| | |
|--|--|
| **Evidence** | `/workspace/steel-studio-ops/extracted-from-zip/src/lib/studio/store.ts` |
| **Hook** | `useStudio`, `hydrateStudio()`, `watchStudioPersist()` |
| **Persistence** | **`steel-studio-v1`** (lang/genre/bpm/swing/buffer/host/channels/master/FX/visuals/vocals/recs/theory/lyrics/hook…) |
| **Live consumer usage in ops raw** | **None found** (`rg` shows `useRack` only in studio/shell raw) |
| **DEPENDS** | Kernel Eng SoT must say whether `useStudio` is retired, to be merged into rack, or restored alongside |

### 2.4 Adjacent stores (boundary-adjacent, not Studio-owned)

| Store | Path | Role |
|-------|------|------|
| `useAudit` | zip/audit extract `src/lib/audit/store.ts`; Export UI imports it | Audit tabs + report holding; Export Attest consumes |
| Aura/crew (zip only) | zip listing `src/lib/aura/store.ts`, `src/lib/crew/store.ts` | Out of Studio WAVE 1 scope; listed for namespace awareness |

### 2.5 Where Studio “state lives” (summary)

| Concern | Lives in | Persist |
|---------|----------|---------|
| App tab / place navigation | `useSteel.tab` + `useRack.place` | tab not persisted; place via rack set; steel prefs in `steel-desk-v1` |
| Atlas pins | `useRack.pins` | `steel-atlas-pins-v1` |
| Desk mix knobs / meters | `useDesk` | none in zip store; mix **rows** via DB (§5) |
| Full studio mixer (zip era) | `useStudio` | `steel-studio-v1` — **not wired in current shell** |
| MIDI selection | `useSteel` (midiIn/Out/ports) via `/workspace/steel-studio-ops/raw/midi.ts` → `./store` | via steel persist subset (ports themselves runtime) |

---

## 3. Shared types inventory (cited paths)

### 3.1 Steel kernel types — Desk + Export + shell must share

**Path:** `/workspace/steel-studio-ops/extracted-from-zip/src/lib/steel/types.ts`

| Symbol | Definition (evidence) |
|--------|----------------------|
| `HostId` | `"fl" \| "ableton" \| "generic"` |
| `OsId` | `"win8" \| "win10" \| "win11" \| "linux"` |
| `SteelTab` | `"console" \| "desk" \| "aura" \| "pipeline" \| "hosts" \| "kernel" \| "audit"` |
| `Addon`, `KernelManifest`, `MidiPortInfo`, `MeterFrame` | kernel/update/MIDI/meter contracts |

**Consumer:** `/workspace/steel-desk-ops/raw/places.ts` imports `SteelTab` from `@/lib/steel/types`.

**Known mismatch:** `PLACE_TABS.web` includes **`"studio"`**, and `placeForTab` handles `tab === "studio"`, but zip `SteelTab` **omits `"studio"`**. Desk TOP5 / Kernel status: flat `types.ts` is studio types and has **no `SteelTab`**. **DEPENDS** Kernel Eng SoT for authoritative `SteelTab` (+ `"studio"`).

### 3.2 Studio types

**Paths:**

- Zip: `/workspace/steel-studio-ops/extracted-from-zip/src/lib/studio/types.ts`
- Flat/ops: `/workspace/steel-desk-ops/raw/types.ts` (same content verified)

| Symbol | Notes |
|--------|-------|
| `StudioTab` | desk/vocals/visuals/matrix/… — **internal studio UI tabs**, not shell `SteelTab` |
| `Genre`, `ChannelId`, `FxChain`, `Translate`, `VisualStyle`, `VoiceBank`, `VocalLang` | studio domain |
| `HostId` | `"standalone" \| "fl" \| "ableton" \| "logic"` — **≠ steel `HostId`** |
| `Lang` | `"et" \| "en"` in studio types |
| `ChannelMix`, `MicProfile`, `MeterFrame`, `RadarItem` | shared shapes; `MeterFrame` **differs** from steel’s thinner meter |

### 3.3 Desk / clips / mix AI types (Desk ↔ Studio rack bridge)

| Type | Path | Shared with |
|------|------|-------------|
| `ClipKind`, `VocalClip` | `/workspace/steel-studio-ops/raw/clips.ts` (also desk-ops raw) | Desk timeline / clip tools |
| `MixSnapshot` | `/workspace/steel-studio-ops/raw/mix-ai.ts` | Desk → `suggestMix` server fn |
| `DeskAdapt`, `DeskTier` | `/workspace/steel-desk-ops/raw/adapt.ts` | Desk layout probe |
| `PlaceId` | `/workspace/steel-desk-ops/raw/places.ts` | shell + rack pins |
| `Genre` (studio) vs `GenreId` (`@/lib/desk/fx`) | bridged in `/workspace/steel-studio-ops/raw/rack.ts` (`deskGenre` / `studioGenre`) | Studio rack ↔ Desk engine |

### 3.4 i18n `Lang` (cross-cutting)

| Path | Union |
|------|-------|
| `/workspace/steel-desk-ops/raw/i18n.ts` | `"et" \| "en" \| "ru"` |
| steel store persist / studio types | often `"et" \| "en"` only |

**DEPENDS:** SoT for whether `ru` is first-class in `useSteel.lang` persist.

### 3.5 Export / audit types (Export must consume; Studio surfaces audit tab)

**Path:** `/workspace/steel-studio-ops/extracted-from-zip/src/lib/audit/types.ts` (same as audit extract + Export imports)

| Symbol | Role |
|--------|------|
| `AuditReport`, `Finding`, `Severity`, `Grade` | **required input** to pdf/docx/xlsx/pptx exporters |
| `ParsedWorkflow` / jobs / steps | audit engine side |
| `PermissionScope`, `AccessLevel` | permissions builder |

### 3.6 Persistence / ledger types

**Path:** `/workspace/steel-studio-ops/extracted-from-zip/src/lib/steel/rows.ts` + SQL `/workspace/steel-audit-ops/repo/0002_steel_rows.sql`

| Symbol | Role |
|--------|------|
| `RowKind` | `"mix" \| "audit"` |
| `SteelRow` | `{ id, kind, title, payloadJson, createdAt }` |
| SQL `steel_rows` | `kind`, `title`, `payload jsonb`, `created_at` — unowned ledger |

---

## 4. Import graph / boundary (Studio vs Desk vs Export vs Kernel)

### 4.1 Alias map (intended)

From consumers in ops raw / zip:

| Alias | Intended owner |
|-------|----------------|
| `@/lib/steel/*` | **Kernel** runtime + shell store/types/rows/MIDI/engine |
| `@/lib/desk/*` | **Desk** mix engine/store/clips/fx/eq/adapt/video/mix-ai |
| `@/lib/studio/*` | **Studio** rack/banks/chain/theory/geo/rhyme/xlsx-banks/bus* |
| `@/lib/export/*` | **Export** Attest pdf/docx/xlsx/pptx |
| `@/lib/audit/*` | **Audit** types/store/engine (Export + Audit UI) |
| `@/lib/i18n`, `@/lib/utils` | shared |
| `@/components/steel-*` | UI shells (Studio/Desk/Kernel tabs) |

### 4.2 Observed import directions (evidence)

```
AppShell
  → useSteel (steel/store) [hydrate/persist]
  → useRack (studio/store) [place sync]
  → PlaceBar / tab mounts

SteelDesk
  → desk/{engine,store,fx,clips,adapt,video,mix-ai}
  → steel/{rows,store}     [lang + mix row save]
  → i18n, utils, SteelOled

SteelStudio
  → desk/{eq,engine,store} [EQ write into desk]
  → steel/store            [lang]
  → studio/{bus,geo,places,rack,rhyme,store,xlsx-banks}

rack.ts (studio)
  → desk/{engine,eq,store,fx}
  → steel/{engine,store}
  → studio/{banks,chain,geo,rhyme,store,theory,types}

SteelPipeline / midi
  → steel/{engine,store,updates} ; midi → steel store + types.MidiPortInfo

ExportMenu / exporters
  → audit/types.AuditReport
  → export/{pdf,docx,xlsx,pptx}
  → utils.downloadBlob

AuditWorkspace / SteelAudit
  → audit/store
  → steel/{store,rows}     [lang + audit row save]
  → components/export-menu
```

### 4.3 Boundary rules (inferred from evidence — not new design)

1. **Kernel (`@/lib/steel`) owns** shell tab state, host/OS/kernel prefs, MIDI port types, `SteelRow` ledger API, worklet engine entry.
2. **Desk (`@/lib/desk`) owns** beat/vocal mix graph + desk zustand; Studio may **write** desk via `useDesk.getState().set` / `setEqGains` / `playMix` (rack bridge) but must not redefine Desk store.
3. **Studio (`@/lib/studio`) owns** rack/pins/theory/banks/bus exports; must not own Attest `AuditReport` exporters.
4. **Export (`@/lib/export`) consumes** `AuditReport` (+ utils); must not import Studio rack UI. Studio bank book (`exportBankBook`) and bus PDF/DOCX/PPTX live under **`@/lib/studio/*`**, not `@/lib/export/*`.
5. **Do not flatten** `store.ts` / `types.ts` / `engine.ts` at repo root — Desk TOP5 P0-2 + Kernel FIRST-OUTCOME: flat files collapse steel vs studio vs desk namespaces.

### 4.4 Layout break (shared blocker)

`tsconfig` `@/*` → `./src/*` with empty/missing `src/` on public tree; zip has the directories. Documented in Desk INVENTORY + Export one-pager Option A. **DEPENDS** Kernel Eng layout restore (SoT).

---

## 5. Serialization & export interfaces Desk + Export must consume

### 5.1 Attest exporters (Export primary)

| Function | Path | Input |
|----------|------|-------|
| `exportPdf(report)` | zip + `/workspace/steel-export-evidence/pdf.ts` | `AuditReport` |
| `exportDocx(report)` | zip + `…/docx.ts` | `AuditReport` (+ `Severity` in docx) |
| `exportXlsx(report)` | zip + `…/xlsx.ts` | `AuditReport` |
| `exportPptx(report)` | zip + `…/pptx.ts` | `AuditReport` |
| `ExportMenu({ report })` | zip + `…/export-menu.tsx` | `AuditReport` |
| Helpers | `…/utils.ts` | `downloadBlob`, `slugify`, `formatStampDate` |

**Contract:** Desk does not author `AuditReport`; Audit engine does. Export **must** resolve `@/lib/audit/types` + `@/lib/export/*` (one-pager: currently broken on empty `src/`).

### 5.2 Studio / Desk document & bank exports (Studio-owned; Desk/Studio UI call)

| Function | Path | Input / notes |
|----------|------|----------------|
| `exportBankBook()` | zip `src/lib/studio/xlsx-banks.ts`; also export-evidence copy | reads `BANKS` / `PLUGIN_IDS` / `EXTRA_IDS` — no store arg |
| `exportBusPdf/Docx/Pptx()` | zip `src/lib/studio/bus-export.ts` | bus gazette constants — no `AuditReport` |
| `zipStore(files)` | zip `src/lib/studio/zip.ts` | `{ name, text }[]` → `Blob` (film pack) |
| `exportCapsXlsx(caps)` | `/workspace/steel-export-evidence/report.ts` | `CapsReport` from `./types` (**Aura**; adjacent) |

### 5.3 Mix / row serialization (Desk ↔ Kernel ledger)

| Interface | Path | Desk consumption |
|-----------|------|------------------|
| `createSteelRow` / `listSteelRows` / `SteelRow` / `RowKind` | zip `src/lib/steel/rows.ts` | `steel-desk.tsx` save/load mix |
| Mix `payloadJson` fields (evidence) | `steel-desk.tsx` `onSaveRow` | `{ amount, speed, tonic, mode, drive, ceiling, beatGain, vocalGain, glue, bpm }` numbers only |
| SQL | `0002_steel_rows.sql` | `kind in ('mix','audit')`, jsonb payload |
| Audit rows | `audit-workspace.tsx` also `createSteelRow` | Export/Audit path |

### 5.4 Desk AI + clip + media blobs (Desk; Studio rack may trigger related)

| Interface | Path |
|-----------|------|
| `MixSnapshot` + `suggestMix` | `/workspace/steel-studio-ops/raw/mix-ai.ts` |
| `VocalClip` + clip ops | `/workspace/steel-studio-ops/raw/clips.ts` |
| `bounceWav` / `renderDeskVideo` | imported from `@/lib/desk/engine` / `@/lib/desk/video` in `steel-desk.tsx` (engine implementation in zip desk engine; video in desk-ops raw) |

### 5.5 localStorage schemas (cross-reload contracts)

| Key | Module | Shape (evidence) |
|-----|--------|------------------|
| `steel-desk-v1` | steel/store | `Persisted` pick of SteelState prefs |
| `steel-studio-v1` | zip studio/store | large StudioState pick — **unused by current AppShell** |
| `steel-atlas-pins-v1` | useRack store | `PlacePins` |

---

## 6. Gaps / DEPENDS markers

| ID | Gap | Marker |
|----|-----|--------|
| G0 | `/workspace/steel-canonical/SOURCE-OF-TRUTH.md` absent | **DEPENDS Kernel Eng SoT** |
| G1 | Flat root missing distinct `src/lib/steel/{store,types}.ts`; colliding root `store`/`types`/`engine` | **DEPENDS** Kernel layout restore (Option A) |
| G2 | `SteelTab` zip omits `"studio"` but `places.ts` requires it | **DEPENDS** SoT / type merge |
| G3 | Steel `HostId` (`generic`) ≠ Studio `HostId` (`standalone`/`logic`) | Desk TOP5 P1-4; **DEPENDS** SoT |
| G4 | Zip `useDesk` incomplete vs `rack.ts` / newer desk UI fields (`genre`, `lyrics`, `palve`, `kare`, `eq`, …) | **DEPENDS** newer desk store source |
| G5 | Zip `useStudio` vs live `useRack` — dual studio stores | **DEPENDS** SoT retirement/merge rule |
| G6 | `MeterFrame` / `Lang` / `HostId` duplicated across steel vs studio with incompatible shapes | shared-types hygiene; **DEPENDS** SoT |
| G7 | Export Attest blocked until `AuditReport` + `src/lib/export` resolve | Export one-pager; coordinate Option A |
| G8 | Desk mix payload is ad-hoc number map — no shared TS interface exported from steel/rows | optional harden; not inventing API here — **GAP only** |

---

## 7. Handoff

## HANDOFF
RESULT: WAVE 1 store/types boundary inventory written from box evidence only; Kernel SoT missing so DEPENDS marked; three live stores mapped (useSteel/useDesk/useRack) plus zip-era useStudio; shared types + Export/Desk serialization contracts cited.
FILES: /workspace/steel-studio-ops/STORE-TYPES-BOUNDARY.md ; supporting extracts under /workspace/steel-studio-ops/extracted-from-zip/src/lib/{steel,desk,studio,export,audit}/
CHANGED: Created/overwrote STORE-TYPES-BOUNDARY.md; extracted cited store/types/export files from existing grok-workspace.zip into steel-studio-ops/extracted-from-zip/ (no repo clone).
TEST: Path existence checks for all cited primary sources; rg/Read of store hooks, persist keys, import edges, export signatures, SteelRow payload fields.
PASS: Deliverable at exact path; SoT absence explicit; claims tied to verified paths; no UI redesign as main work.
FAIL: none for WAVE 1 file delivery
BLOCKERS: Kernel Eng SOURCE-OF-TRUTH.md missing; SteelTab/HostId/useStudio-vs-useRack/desk-store-field drift unresolved until SoT; empty src/ layout still blocks real alias resolution.
NEXT: WAVE 2 — after Kernel SoT, lock authoritative SteelTab (+studio), HostId ownership, and single Studio store winner (useRack vs useStudio); align desk store fields to rack bridge; keep Export AuditReport contract unchanged.
