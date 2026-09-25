# MISSING burn-down — top 3 SoT gaps

**Source:** `/workspace/steel-canonical/MISSING.md` (no full tree rescan)  
**SoT:** `/workspace/steel-canonical` · **Wave:** NEXT · **Date:** 2026-09-17  
**Out of scope here:** webpack→Vite CI (Pipeline / PR #3), Node 22 soft prefer (Abraham compile already PASS)

---

## Rank 1 — Replace recovered Desk `engine` / `store` with real TypeScript

| | |
|--|--|
| **Gap** | `src/lib/desk/engine.ts` is recovered JS-in-TS (`@ts-nocheck`) from `routes-DFtXkjIc.mjs`; original `.ts` not in git history. Behavior matches last App Builder build but is fragile for typecheck/refactors. |
| **Evidence** | `MISSING.md` §Not blocking / §Likely runtime; `SOURCE-OF-TRUTH.md` → desk `engine.ts` / `store.ts` = **recovered** |
| **Owner** | **Steel Desk Ops** (primary) · Kernel Eng (SoT path / merge) |
| **Done when** | Typed `src/lib/desk/engine.ts` + complete `store.ts` without `@ts-nocheck`; `npm run typecheck` still green; Desk play/bounce path unchanged |
| **Effort** | M–L |
| **Unblocks** | Safe Desk edits, Hosts/OLED follow-ons, honest smoke assertions |

---

## Rank 2 — Desk playability cases in `browser-smoke.mjs` (TOP5 P2-5)

| | |
|--|--|
| **Gap** | Smoke still cold-loads URL / brand checks; never opens Place **web** → tab **desk**, demo slots, play, bounce, OLED canvas, Hosts. Cold-load green ≠ Desk playable. |
| **Evidence** | `MISSING.md` §Likely (“Browser-smoke Desk cases… not added”); Desk `TOP5-FIXES.md` P2-5 |
| **Owner** | **Steel Desk Ops** (cases) · Kernel Eng (smoke harness touch only if needed) |
| **Done when** | Optional Desk cases in `browser-smoke.mjs` / verdict: web→desk, demo beat, play, no pageErrors, OLED `canvas`, hosts chip; CoS “Desk green” gated on those |
| **Effort** | M |
| **Unblocks** | Honest Desk ship gate; stops false-green after PR #3 |

---

## Rank 3 — Export four-format magic-byte smoke

| | |
|--|--|
| **Gap** | Attest exporters + `audit/fixtures.ts` exist under SoT, but `browser-smoke.mjs` does not run fixture → `exportPdf|Docx|Xlsx|Pptx` → `%PDF` / `PK\x03\x04` asserts. |
| **Evidence** | `MISSING.md` §Likely (“Export smoke cases… not wired”); `export-unblock-one-pager.md` §Sequencing |
| **Owner** | **Steel Export** (primary) · Kernel Eng (layout already folded; no redesign) |
| **Done when** | Smoke cases call exporters with `FIXTURE_REPORT` and assert magic bytes; CoS may mark export green only after this |
| **Effort** | S–M |
| **Unblocks** | Export green gate; closes Attest slice after Option A restore |

---

## Parking / non-top-3 (tracked, not this burn-down)

| Item | Owner | Note |
|------|-------|------|
| Studio store winner lock (`useStudio` vs `useRack` / rack-store) | **Steel Studio** (Wave 2) | CoS-assigned; not Kernel WIP |
| Vite CI replace webpack | **Steel Pipeline CI** | PR #3 payload |
| Flat `/workspace/steel-audit-ops/repo` leftovers | Reference only | Not SoT |
| Prefer Node 22+ | Abraham / env | Soft; compile already PASS |

---

## Suggested sequence

1. Desk Ops: Rank 1 (or Rank 2 first if playability gate is hotter than typing the engine)  
2. Export: Rank 3 in parallel once fixtures stable  
3. Kernel: SoT merge only when owners land patches — no PR until CoS assigns

*Kernel Eng — WAVE NEXT · WIP closes when this file is accepted.*
