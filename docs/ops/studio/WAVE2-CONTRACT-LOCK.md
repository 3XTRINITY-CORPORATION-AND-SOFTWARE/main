# WAVE 2 — Studio contract lock

**Agent:** Steel Studio · **WIP=1** · **No UI redesign** · **AuditReport UNCHANGED**  
**Date:** 2026-09-17 (Europe/Tallinn)  
**Depends on:** Kernel Eng SoT at `/workspace/steel-canonical/SOURCE-OF-TRUTH.md` (now present)

---

## 1. SoT references (versions / paths / sections used)

| Ref | Path | Sections / facts used |
|-----|------|------------------------|
| SoT tree | `/workspace/steel-canonical/SOURCE-OF-TRUTH.md` | Tree SoT: `src/lib/steel/types.ts` (**synthesized** `"studio"` on `SteelTab`); `src/lib/studio/store.ts` = zip `useStudio` + root-overlay `useRack` via `rack-store.ts` re-export; `src/lib/desk/store.ts` **recovered**; `src/lib/audit/*` zip (real AuditReport); routes/index + app-shell **root-overlay** (Steel tabs incl. studio); `places.ts` / `atlas.ts` root-overlay |
| SoT post-merge glue | same file § Post-merge glue | `"studio"` on `SteelTab`; `store.ts` re-exports `useRack`; audit fixtures aligned to zip `AuditReport` |
| SoT MISSING | `/workspace/steel-canonical/MISSING.md` | Legacy `components/studio/**` + `useStudio` remain for compatibility; **not** OS-target home route |
| SoT BUILD | `/workspace/steel-canonical/BUILD.md` | `@/*` → `./src/*` (layout restored in canonical) |
| WAVE 1 inventory | `/workspace/steel-studio-ops/STORE-TYPES-BOUNDARY.md` | Dual-era useRack vs useStudio; zip SteelTab omission; dual HostId; desk field gap G4; Export AuditReport paths |
| Kernel status (context only) | `/workspace/steel-kernel-ops/FIRST-OUTCOME-kernel-status.md` | Cited by SoT as architecture ground — not re-scanned |

**Canonical type/store files verified this wave:**

- `/workspace/steel-canonical/src/lib/steel/types.ts`
- `/workspace/steel-canonical/src/lib/studio/types.ts`
- `/workspace/steel-canonical/src/lib/studio/store.ts` (+ re-export)
- `/workspace/steel-canonical/src/lib/studio/rack-store.ts`
- `/workspace/steel-canonical/src/lib/studio/rack.ts`
- `/workspace/steel-canonical/src/lib/studio/places.ts`
- `/workspace/steel-canonical/src/lib/desk/store.ts`
- `/workspace/steel-canonical/src/lib/audit/types.ts`
- `/workspace/steel-canonical/src/lib/export/{pdf,docx,xlsx,pptx}.ts`
- `/workspace/steel-canonical/src/components/export-menu.tsx`
- `/workspace/steel-canonical/src/routes/index.tsx`
- `/workspace/steel-canonical/src/components/app-shell.tsx`

**Zip contrast (omission evidence):** `/workspace/steel-studio-ops/extracted-from-zip/src/lib/steel/types.ts`, `…/desk/store.ts`  
**Live consumer evidence:** `/workspace/steel-studio-ops/raw/{app-shell,steel-studio,rack}.tsx|ts`, `/workspace/steel-desk-ops/raw/{store,place-bar,steel-kernel,app-shell}.tsx|ts`  
**Export evidence (unchanged contract):** `/workspace/steel-export-evidence/{pdf,docx,xlsx,pptx,export-menu}.ts(x)`

---

## 2. Decision table

| Topic | Lock | Rationale | Evidence paths |
|-------|------|-----------|----------------|
| **A. SteelTab** | Authoritative union **includes `"studio"`**: `"console" \| "desk" \| "studio" \| "aura" \| "pipeline" \| "hosts" \| "kernel" \| "audit"` | SoT marks zip+synthesized extension; root-overlay shell/places/index require `"studio"`; zip omitted it — **reconcile by preferring SoT synthesize over zip omission** | SoT `src/lib/steel/types.ts` row + post-merge glue; canonical `types.ts` L3; `places.ts` `PLACE_TABS.web` + `placeForTab`; `app-shell.tsx` web group; `routes/index.tsx` `tab === "studio"`; zip extract **omits** `"studio"` |
| **B. HostId ownership** | **Canonical shell/host ID = steel `HostId`** (`"fl" \| "ableton" \| "generic"`) owned by `@/lib/steel/types`. Studio `HostId` (`"standalone" \| "fl" \| "ableton" \| "logic"`) is a **separate namespaced type** in `@/lib/studio/types` for legacy `useStudio.host` / studio monitor only. Desk/Export/Kernel/shell **must import steel `HostId`**. Never collapse the two into one union. | Steel hosts catalog + `useSteel.host` persist use steel union; studio monitor lists standalone/logic; SoT keeps both type modules | steel `types.ts` L1; steel `hosts.ts` / `store.ts`; studio `types.ts` L9; studio `store.ts` `host: HostId` (studio); WAVE1 G3 |
| **C. Studio store winner** | **Winner: `useRack`** (`StudioRack` in `rack-store.ts`, re-exported from `studio/store.ts`). **`useStudio` deprecated** for OS-target Studio / AppShell / place navigation — remain only as legacy zip-era mixer store until crew/studio-engine consumers migrate. | SoT: live shell is AppShell + useRack; MISSING: useStudio not OS-target home; all ops-raw consumers import `useRack`; no AppShell `hydrateStudio` | SoT studio `store.ts` row + MISSING; `rack-store.ts`; `store.ts` L355 re-export; raw `app-shell` / `steel-studio` / `place-bar` / `steel-kernel` / `rack.ts`; crew + `studio/engine.ts` still call `useStudio` (legacy) |
| **D. Desk ↔ rack fields** | Recovered canonical `DeskState` **must expose** the rack-bridge fields listed in §5. Against zip desk store those were gaps; against **canonical recovered** desk store they are **present** (G4 closed in SoT tree). | SoT desk `store.ts` recovered from `routes-DFtXkjIc.mjs`; `rack.ts` reads/writes those fields | canonical `desk/store.ts`; `studio/rack.ts`; zip desk store (slim); WAVE1 G4 |
| **E. Export AuditReport** | **FROZEN / UNCHANGED.** Exporters continue to take `AuditReport` from `@/lib/audit/types`. No field adds/renames in this wave. | SoT: zip real AuditReport not stubbed; fixtures aligned to zip | SoT audit row + post-merge fixtures; canonical `audit/types.ts`; `export/{pdf,docx,xlsx,pptx}.ts`; `export-menu.tsx`; export-evidence copies |

---

## 3. Authoritative type / store snippets (cite, don't invent)

### 3.1 SteelTab (+ studio) — `/workspace/steel-canonical/src/lib/steel/types.ts`

```ts
export type HostId = "fl" | "ableton" | "generic";
export type OsId = "win8" | "win10" | "win11" | "linux";
export type SteelTab = "console" | "desk" | "studio" | "aura" | "pipeline" | "hosts" | "kernel" | "audit";
```

**Zip omission (do not prefer):**  
`/workspace/steel-studio-ops/extracted-from-zip/src/lib/steel/types.ts` — `SteelTab` without `"studio"`.

**Places reconciliation:** `/workspace/steel-canonical/src/lib/studio/places.ts` — `PLACE_TABS.web: ["desk", "studio"]`; `placeForTab` treats `tab === "studio"` as web.

### 3.2 Dual HostId (do not merge)

| Namespace | Path | Union |
|-----------|------|-------|
| **steel (canonical for shell)** | `@/lib/steel/types` | `"fl" \| "ableton" \| "generic"` |
| **studio (legacy mixer only)** | `@/lib/studio/types` | `"standalone" \| "fl" \| "ableton" \| "logic"` |

Import rule after lock: `import type { HostId } from "@/lib/steel/types"` in Desk/Kernel/Export/shell. Studio-local code that still touches `useStudio.host` must use `import type { HostId as StudioHostId } from "@/lib/studio/types"` (or path-qualified) — **name collision is intentional, ownership is not shared**.

### 3.3 Winner store — `useRack` / `StudioRack`

**Path:** `/workspace/steel-canonical/src/lib/studio/rack-store.ts`  
**Re-export:** `/workspace/steel-canonical/src/lib/studio/store.ts` → `export { useRack, type StudioRack, type PlacePins } from "./rack-store"`

Fields (authoritative): `place`, `paste`, `seed`, `rhymeOut`, `geoLine`, `geoBusy`, `geoQuery`, `chainLog`, `spine`, `extras`, `note`, `busy`, `pins`, `set`, `togglePin`.

**Persist:** pins only → localStorage key **`steel-atlas-pins-v1`** (`PlacePins`: `{ os, web, host: number[] }`).

### 3.4 Deprecated store — `useStudio` / `StudioState`

**Path:** same `studio/store.ts` (zip body retained).  
**Persist key:** **`steel-studio-v1`** (large `Persisted` pick: lang/genre/bpm/swing/buffer/host/channels/master/FX/visuals/vocals/recs/theory/lyrics/hook…).  
**Hydrators:** `hydrateStudio()` / `watchStudioPersist()` — **not** called from OS-target `app-shell` (shell hydrates **`useSteel`** via `steel-desk-v1` + uses `useRack` for place).

### 3.5 AuditReport (frozen) — `/workspace/steel-canonical/src/lib/audit/types.ts`

```ts
export interface AuditReport {
  name: string;
  score: number;
  grade: Grade;
  summary: string;
  findings: Finding[];
  stats: {
    jobs: number;
    steps: number;
    triggers: string[];
    hasPermissions: boolean;
    usesGithubToken: boolean;
    usesAppToken: boolean;
  };
  yaml: string;
  auditedAt: string;
}
```

Exporter signatures (unchanged): `exportPdf|Docx|Xlsx|Pptx(report: AuditReport)`; `ExportMenu({ report }: { report: AuditReport })`.

---

## 4. Import / ownership boundary after lock

```
@/lib/steel/*     Kernel owns: SteelTab (+studio), steel HostId, useSteel, rows, MIDI, engine, isolate
@/lib/desk/*      Desk owns: useDesk / DeskState (recovered full), desk engine/eq/fx/clips/…
@/lib/studio/*    Studio owns: useRack (winner), places/atlas/rack/chain/theory/banks/…
                  useStudio = legacy only (crew / studio/engine / components/studio/**)
@/lib/audit/*     Audit owns: AuditReport + engine/store (Export consumes)
@/lib/export/*    Export owns: Attest pdf/docx/xlsx/pptx — input AuditReport only
```

**Rules locked this wave:**

1. Shell tab navigation: `useSteel.tab: SteelTab` (includes `"studio"`) + `useRack.place` sync via `placeForTab` — not `useStudio.tab` (`StudioTab` is internal legacy UI tabs).
2. Studio OS-target UI (`SteelStudio`, `PlaceBar`, `SteelKernel` pins, `rack.ts`) imports **`useRack` from `@/lib/studio/store`** — never introduce a second rack store.
3. New Studio feature work does **not** grow `useStudio`; migrate readers off it when touching those files.
4. Export must not import Studio rack/UI; Studio bank/bus exporters stay under `@/lib/studio/*` (already true).
5. Do not flatten `store.ts` / `types.ts` / `engine.ts` at repo root (WAVE1 §4.3 / Desk TOP5) — canonical tree already namespaced.

---

## 5. Desk ↔ rack field alignment matrix

Rack bridge consumers: `/workspace/steel-canonical/src/lib/studio/rack.ts`, `/workspace/steel-canonical/src/components/steel-studio.tsx`.

| Field needed by rack / SteelStudio | Op (evidence) | Zip desk store | Canonical recovered desk | Status |
|------------------------------------|---------------|----------------|---------------------------|--------|
| `genre` | read (`studioGenre` / THEORY_EMIT, EQ_WRITE) | **MISSING** | present (`GenreId`) | **OK in SoT** |
| `bpm` | read (spine, rhyme) | present | present | OK |
| `lyrics` | read/write (RHYME_LOCK, seed) | **MISSING** | present | **OK in SoT** |
| `palve` | read (paste/seed fallback) | **MISSING** | present | **OK in SoT** |
| `kare` | write (`applyExtras`) | **MISSING** | present | **OK in SoT** |
| `drive` | write (`applyExtras`) | present | present | OK |
| `glue` | write (`applyExtras`) | present | present | OK |
| `width` | write (`applyExtras`) | present | present | OK |
| `autoTakt` | write (`applyExtras`) | **MISSING** | present | **OK in SoT** |
| `applyMix` | write (`applyExtras`) | **MISSING** | present | **OK in SoT** |
| `eq` | read/write (EQ_WRITE, SteelStudio sliders) | **MISSING** | present (`EqGains`) | **OK in SoT** |
| `playing` | read (MOTOR) | present | present | OK |

**Gap vs WAVE1 G4:** Closed in `/workspace/steel-canonical/src/lib/desk/store.ts` (SoT recovered). Residual: desk engine is `@ts-nocheck` recovered JS (MISSING.md) — behavior match expected; prefer upstream `.ts` when available (**follow-up**, not contract change).

**Not required by rack bridge (Desk-owned, listed for clarity):** `regions`, `delay`/`reverb` mixes, `videoPrompt`, `female`/`backs`, meters (`peak`/`rms`/…), mix-row payload numbers — Desk/Export serialization unchanged from WAVE1 §5.3.

---

## 6. What stays out of scope

- **No UI redesign** — this deliverable is contract lock only (no component restyle, no new tabs beyond SoT `"studio"` already present).
- **`AuditReport` frozen** — no schema edits, no stub swap, no Export API invention.
- No merge of steel vs studio `HostId` unions into one type.
- No deletion of `useStudio` source in this wave (deprecate + migrate notes only).
- No Aura/crew store redesign; crew may keep reading `useStudio` until a later migration wave.
- No flat-root `/workspace/steel-audit-ops/repo` promotion — canonical wins (SoT leftovers).

---

## 7. Residual DEPENDS / follow-ups

| ID | Item | Owner hint |
|----|------|------------|
| F1 | Migrate `studio/engine.ts`, `vocal.ts`, `runtime.ts`, `crew/runtime.ts`, `components/studio/**` off `useStudio` → desk/steel/rack as appropriate; then remove or stub `useStudio` | Studio / Crew |
| F2 | localStorage: leave `steel-studio-v1` readable for one release if F1 ships UI that still hydrates; OS-target must not write new keys under it. Pins stay on `steel-atlas-pins-v1`; steel prefs on `steel-desk-v1` | Studio |
| F3 | Replace recovered desk `engine.ts` (`@ts-nocheck`) with upstream TS when available | Desk / Kernel Eng |
| F4 | Optional: export `StudioHostId` alias in studio types to reduce bare-name collision | Studio types hygiene |
| F5 | Lang `ru` first-class in steel persist vs studio `Lang` `"et"\|"en"` — still dual; i18n already `"et"\|"en"\|"ru"` — not locked this wave beyond HostId/SteelTab | shared / Kernel |

**No blocker** on Kernel SoT presence (G0 from WAVE1 **cleared**).

---

## HANDOFF
RESULT: WAVE 2 contracts locked against Kernel Eng SoT — SteelTab includes "studio" (zip omission reconciled); steel HostId is canonical for shell/Desk/Export; useRack is single Studio store winner with useStudio deprecated for OS-target; desk↔rack fields aligned to recovered DeskState; AuditReport explicitly unchanged; no UI redesign.
FILES: /workspace/steel-studio-ops/WAVE2-CONTRACT-LOCK.md
CHANGED: Created WAVE2-CONTRACT-LOCK.md only (WIP=1); no source/UI edits.
TEST: Read SoT + canonical steel/studio/desk/audit/export modules; contrasted zip extracts; rg consumers for useRack vs useStudio and AuditReport signatures; desk field matrix vs rack.ts/steel-studio.tsx.
PASS: Exact path written; each lock cites SoT and/or verified evidence; one studio store winner (useRack); SteelTab and HostId ownership unambiguous; AuditReport frozen; no UI redesign as work product.
FAIL: none
BLOCKERS: none for contract lock (SoT present). Residual follow-ups F1–F5 are non-blocking migrations/hygiene.
NEXT: Other agents may implement against locks (migrate off useStudio; keep Export Attest on frozen AuditReport). Studio WAVE 3 only if tasked — not started.
