# WAVE 3 — P0 DONE (deprecate useStudio + verify OS path on useRack)

**Agent:** Steel Studio · **WIP=1** · **P0 ONLY** · **No UI redesign** · **No PR** · **AuditReport UNCHANGED**  
**Date:** 2026-09-17 (Europe/Tallinn)  
**Plan:** `/workspace/steel-studio-ops/WAVE3-USERACK-MIGRATE.md` §3 P0  
**Depends on:** `/workspace/steel-studio-ops/WAVE2-CONTRACT-LOCK.md` (winner = `useRack`)

---

## What changed

### Files edited

| Path | Change |
|------|--------|
| `/workspace/steel-canonical/src/lib/studio/store.ts` | Added `@deprecated` JSDoc on `useStudio`, `hydrateStudio`, `watchStudioPersist` pointing at `useRack` / WAVE2-CONTRACT-LOCK / WAVE3-USERACK-MIGRATE. Added one-line winner note on `useRack` re-export. **Bodies unchanged** — store not deleted. |

### Diff summary

- **+4 comment lines only** (3× `@deprecated` + 1× winner re-export note).
- No functional / runtime / persist / type-body edits.
- No barrel `index.ts` exists under `lib/studio/` — optional barrel note N/A; winner note lives on the existing re-export in `store.ts`.

### Files verified only (no functional OS-path edits)

| Path | Result |
|------|--------|
| `/workspace/steel-canonical/src/components/app-shell.tsx` | Imports `useRack`; place sync via `useRack.getState().set`; **no** `hydrateStudio` / `watchStudioPersist` / `useStudio` |
| `/workspace/steel-canonical/src/routes/index.tsx` | Mounts `AppShell` → `SteelStudio` on `tab === "studio"`; **no** `StudioShell` |
| `/workspace/steel-canonical/src/components/steel-studio.tsx` | `useRack()` only from `@/lib/studio/store` |
| `/workspace/steel-canonical/src/components/place-bar.tsx` | `useRack` selectors/`set` |
| `/workspace/steel-canonical/src/components/steel-kernel.tsx` | `useRack` pins |
| `/workspace/steel-canonical/src/components/steel-atlas.tsx` | `useRack` pins + `togglePin` |
| `/workspace/steel-canonical/src/lib/studio/rack.ts` | `useRack` chain ops (+ desk/steel bridge — already correct) |

**Explicit:** P1–P5 **not** done. AuditReport / export types **untouched**. No UI redesign. No PR / no git push / no CloudAgent PR.

---

## Verification commands / results

### 1. OS-path must not reference useStudio / hydrate / watch

```bash
rg -n "useStudio|hydrateStudio|watchStudioPersist" \
  /workspace/steel-canonical/src/components/app-shell.tsx \
  /workspace/steel-canonical/src/routes/index.tsx \
  /workspace/steel-canonical/src/components/steel-studio.tsx \
  /workspace/steel-canonical/src/components/place-bar.tsx \
  /workspace/steel-canonical/src/components/steel-kernel.tsx \
  /workspace/steel-canonical/src/components/steel-atlas.tsx \
  /workspace/steel-canonical/src/lib/studio/rack.ts
```

**Result:** empty (exit 1 / no matches). OS-target does not call deprecated APIs.

### 2. OS-path stays on useRack

```bash
rg -n "useRack" \
  /workspace/steel-canonical/src/components/app-shell.tsx \
  /workspace/steel-canonical/src/components/steel-studio.tsx \
  /workspace/steel-canonical/src/components/place-bar.tsx \
  /workspace/steel-canonical/src/components/steel-kernel.tsx \
  /workspace/steel-canonical/src/components/steel-atlas.tsx \
  /workspace/steel-canonical/src/lib/studio/rack.ts
```

**Result (evidence):**

- `app-shell.tsx:14` `import { useRack } from "@/lib/studio/store"`; L64/L75 place sync
- `steel-studio.tsx:16` import; L32 `const rack = useRack()`
- `place-bar.tsx:5` import; L19–20 place/`set`
- `steel-kernel.tsx:11` import; L21 pins
- `steel-atlas.tsx:4` import; L10–11 pins/`togglePin`
- `rack.ts:11` import; multiple `useRack.getState()` chain writes

### 3. Routes mount SteelStudio, not StudioShell

```bash
rg -n "SteelStudio|StudioShell" /workspace/steel-canonical/src/routes/index.tsx
```

**Result:** `SteelStudio` import + `tab === "studio"` mount; **zero** `StudioShell`.

### 4. Deprecation markers present

```bash
rg -n "@deprecated|Winner store" /workspace/steel-canonical/src/lib/studio/store.ts
```

**Result:**

- L142 `@deprecated` on `useStudio`
- L267 `@deprecated` on `hydrateStudio`
- L318 `@deprecated` on `watchStudioPersist`
- L358 winner note on `useRack` re-export

### 5. AuditReport / export untouched

`stat` mtimes: `store.ts` updated 2026-09-17 06:05 UTC; `lib/export/{pdf,docx,xlsx,pptx}.ts` and audit modules remain 2026-09-13 — **not edited this wave**.

---

## Constraints reaffirmed

- **P0 ONLY** — P1–P5 not started (especially not P4/P5 engine/retire).
- **No UI redesign** — AppShell / PlaceBar / SteelStudio visuals untouched.
- **AuditReport contract frozen** — no export/audit type edits.
- **No PR / no git push / no CloudAgent PR**.
- Store body kept; deprecate-only (WAVE3 “do not delete yet”).

---

## HANDOFF

RESULT: P0 complete — `useStudio` / `hydrateStudio` / `watchStudioPersist` marked `@deprecated` in canonical `store.ts`; OS-target path verified on `useRack` with zero hydrate/watch/useStudio hits; DONE.md written.
FILES: /workspace/steel-studio-ops/WAVE3-P0-DONE.md ; /workspace/steel-canonical/src/lib/studio/store.ts
CHANGED: Comment-only deprecations + winner re-export note in store.ts; created WAVE3-P0-DONE.md under steel-studio-ops/. No OS-path functional edits; no P1–P5; no AuditReport; no UI redesign; no PR.
TEST: rg useStudio|hydrateStudio|watchStudioPersist on AppShell/routes/SteelStudio/place-bar/steel-kernel/steel-atlas/rack.ts → empty; rg useRack on same → all present; routes mounts SteelStudio not StudioShell; rg @deprecated on store.ts → 3 markers + winner note; export/audit mtimes unchanged.
PASS: Deprecations applied; OS path on useRack confirmed; deliverable at exact path with HANDOFF; constraints held.
FAIL: none
BLOCKERS: none for P0. Later waves still need product choice on P4 (retire vs rebind studio engine) and optional HostId adapter before P5 stub/remove.
NEXT: Optional P1 (theory-box rack overlap) only if legacy theory UI is touched; else skip to P2/P3 when ready. Defer P4/P5. Keep AuditReport frozen; no UI redesign; no PR unless product asks.
