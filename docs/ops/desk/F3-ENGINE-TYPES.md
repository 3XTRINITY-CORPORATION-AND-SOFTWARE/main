# F3 — Desk engine types (`@ts-nocheck`)

**Agent:** Steel Desk Ops · **No UI redesign · No gh · No invented APIs**  
**Date:** 2026-09-17 (~09:10 Europe/Tallinn)  
**Canonical:** `/workspace/steel-canonical`  
**Contracts:** `/workspace/steel-studio-ops/WAVE2-CONTRACT-LOCK.md` (useRack, steel HostId, SteelTab+studio, AuditReport frozen, desk bridge fields)  
**Prior:** `/workspace/steel-desk-ops/WAVE2-DESK-SMOKE.md` (B2 / F3 follow-up)

---

## RESULT

**PASS** — Removed `@ts-nocheck` from `src/lib/desk/engine.ts` with a **minimal** patch: restored missing `./fx` + `./clips` + `makeDemoVocal` imports (nocheck had hidden free-name ReferenceErrors at runtime), added internal `DeskHandle` / `DeskSlot` + export/param annotations, kept graph logic unchanged. `npm run typecheck` exits **0**. No consumer rewires; no UI redesign; contracts untouched.

---

## FILES

| Path | Role |
|------|------|
| `src/lib/desk/engine.ts` | Desk Web Audio mix engine (recovered dump) — **edited** |
| `src/lib/desk/store.ts` | `DeskState` / `useDesk` / `TuneMode` — read only |
| `src/lib/desk/{fx,clips,boom,eq}.ts` | Typed helpers engine already called but did not import — read only |
| `src/components/steel-desk.tsx` (+ oled / studio / app-shell) | Named imports from engine — unchanged |
| `src/lib/studio/rack.ts`, `src/lib/steel/isolate.ts` | Engine consumers — unchanged |

---

## CHANGED

| Path | What |
|------|------|
| `/workspace/steel-canonical/src/lib/desk/engine.ts` | Drop `@ts-nocheck`; add imports from `./fx`, `./clips`, `makeDemoVocal` from `./boom`; `DeskHandle`/`DeskSlot`; typed module state; annotate exports/helpers; narrow `DelayId`/`ReverbId` at FX call sites; `Uint8Array<ArrayBuffer>` for analyser buffers (same pattern as studio engine); typed `Promise<Blob>` in `toggleVoiceRec`; optional args on `applyMicToGraph` |
| `/workspace/steel-desk-ops/F3-ENGINE-TYPES.md` | This deliverable |

**Not changed:** Desk UI, rack/store contracts, HostId, SteelTab, AuditReport, `store.ts` field shapes.

---

## APPROACH

1. **Probe:** Temporarily stripped `@ts-nocheck` → ~93 `tsc` errors. Majority were (a) implicit `any` on recovered JS, (b) **Cannot find name** for symbols that already exist as exports in sibling desk modules (`irFor`, `delaySeconds`, `kareFromV`, `genrePreset`, `classifyMic`, `composeClips`, `detectClips`, `placeOnGrid`, `keepBestTakes`, `splitClipOnGrid`, `makeAdlibClips`, `makeBackClips`, `pitchToTonic`, `makeDemoVocal`).
2. **Why nocheck was there:** File header states recovered/decompiled JS from App Builder dump; nocheck silenced both missing imports and untyped params so WAVE2 typecheck stayed green while hiding real free-name bugs.
3. **Smallest safe fix (chosen):** Restore the missing imports + add a local typed boundary (`DeskHandle`) + annotate public/export params enough for `strict` — **remove nocheck**. No separate wrapper module; consumers keep importing `@/lib/desk/engine` directly.
4. **Not done (intentionally):** Full rewrite to match `src/lib/studio/engine.ts` style; narrowing `DeskState.delay`/`reverb` from `string` to `DelayId`/`ReverbId` (would touch store contract); behavioral audio changes.

---

## TYPECHECK

```text
cd /workspace/steel-canonical && npm run typecheck
# tsc --noEmit → exit 0
```

Pre-patch baseline (WAVE2-DESK-SMOKE): green with nocheck.  
Post-patch: green **without** nocheck on desk engine.

---

## WHY-LEAVE

**Nocheck not left** — removed successfully after imports + types.

Residual honesty (not blockers for F3):

- Engine body remains recovered/decompiled structure (tabs, dense control flow); prefer upstream original `.ts` if VCS ever recovers (WAVE2-CONTRACT-LOCK F3 wording).
- `DeskState.delay` / `reverb` stay `string`; call sites cast to `DelayId` / `ReverbId` at FX boundaries rather than changing the locked desk bridge store shape.
- `DeskHandle` is file-private (typed boundary at the implementation edge, not a new public package API).

---

## BLOCKERS

None for F3 close. Interactive Desk browser-smoke (TOP5 P2) still separate.

---

## NEXT HANDOFF

1. **Desk Ops / QA:** Optional live path — web → desk → demo beat/vocal → play → bounce; confirm FX/IR/grid paths no longer throw `ReferenceError` on first use (imports now wired).
2. **Kernel Eng (optional):** If original desk engine TS surfaces from VCS, swap recovered body; keep public export names stable for `steel-desk` / `rack` / `isolate`.
3. **Studio Ops (optional, out of F3):** Consider typing `DeskState.delay`/`reverb` as `DelayId`/`ReverbId` in a later store pass — not required for this close.
4. Mark WAVE2-CONTRACT-LOCK **F3** follow-up satisfied for desk ops (nocheck cleared + typed handle boundary).

---

*F3 closed: `@ts-nocheck` removed; typecheck green; missing sibling imports restored.*
