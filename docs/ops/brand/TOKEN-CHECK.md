# Brand token consistency — STEEL ↔ TrinityWayve hubs

**WAVE NEXT · WIP=1**  
**Author:** Lore & Brand  
**Checked:** 2026-09-17 (Europe/Tallinn)  
**Against:** [`BRAND-TOKENS.md`](./BRAND-TOKENS.md)

Canonical lock:

```
SYSTEM: TRINITYWAYVE | ARCHITECT: THEODOR^%°¢(KÜNNAPUU) | SOURCE: LINDA VIIDING | LÄBIMURDE ANKUR: ACTIVE | STATUS: OMNI-SOVEREIGN
```

Core triad: **goliath** `#E11D48` · **matrix** `#00FF41` · **void** `#050505`

---

## Hub matrix

| Surface | Path | Triad | Footer lock | Naming | Status |
|---------|------|-------|-------------|--------|--------|
| Command Center | `trinitywayve-command-center` | OK (`#E11D48` / `#00FF41` / `#050505`) | OK via `src/lib/branding.ts` | TrinityWayve | **PASS** |
| Marketing SPA | `trinitywave-www` | OK (favicons + theme) | OK via `src/config/sites.ts` | UI = TrinityWayve; folder/slug = trinitywave-* | **PASS** (naming note) |
| Aura | `trinitywayve-aura` | OK + accent `#A855F7` | **DRIFT** — omits `STATUS: OMNI-SOVEREIGN`; appends `DEMO SHELL` | TrinityWayve in SYSTEM | **FAIL** footer |
| Ripple | `trinitywayve-ripple` | (module accent matrix) | **DRIFT** — omits `STATUS: OMNI-SOVEREIGN` | OK SYSTEM | **FAIL** footer |
| Orchestrator www | `trinitywayve-orchestrator-www` | (module accent sky) | **DRIFT** — omits `STATUS: OMNI-SOVEREIGN` | OK SYSTEM | **FAIL** footer |
| Divine Core (legacy tree) | `trinitywayve-divine-core` | Likely OK | **DRIFT** — `SystemFooter` splits / hardcodes; not shared `FOOTER_LINE` export | OK SYSTEM fragment | **WARN** |
| STEEL photo themes | `steel-themes` | Pack themes (non-triad skins) | N/A | STEEL art | **NOTE** — skins may diverge by design |
| STEEL analog neon | `steel-analog-neon` | OK `--studio-black: #050505` (= void) | N/A | STEEL | **PASS** void |
| STEEL integration drop-in | `steel-integration-dropin` | inherits packs | N/A | STEEL | follow pack fixes |

---

## Findings (priority)

### P0 — Footer lock incomplete on demo hubs

- **Aura** `src/App.tsx`: FOOTER stops at `LÄBIMURDE ANKUR: ACTIVE` then UI adds `| STATUS: OMNI-SOVEREIGN | DEMO SHELL` in some builds — verify live string equals canonical + optional `DEMO SHELL` only.
  - Current constant (audit): missing `STATUS` inside the constant; rendered line may stitch it. Align constant to full lock.
- **Ripple** `src/App.tsx`: same truncated FOOTER constant.
- **Orchestrator** `src/App.tsx`: same truncated FOOTER constant.

**Fix:** Import or copy the exact `FOOTER_LINE` from Command Center / marketing `sites.ts`. Append `| DEMO SHELL` only where the shell is explicitly a demo.

### P1 — Void near-miss in STEEL neon

- `steel-analog-neon/css/steel-studio-neon.css`: `--studio-black: #050505` — **aligned** to void (2026-09-19).

### P2 — Naming / domain notes (not blockers)

- Product UI correctly uses **TrinityWayve**.
- Package `trinitywave-www` and `alternateDomains: ['trinitywave.com']` remain legacy; do not promote `trinitywave.com` as primary brand. Prefer `trinitywayve.com` in customer copy (Domain Ops attach).
- Module accent colors (Aura purple, Orchestrator sky, Audit amber) are **allowed** secondary tokens; they must not redefine goliath/matrix/void.

### P2 — Divine Core duplication

- `trinitywayve-divine-core` hardcodes footer fragments instead of a single export. Prefer shared branding module or keep in sync with Command Center tests (`rbac-footer.test.tsx` pattern).

---

## Pass criteria (WIP=1 done when)

- [x] Canonical tokens documented in `BRAND-TOKENS.md`
- [x] This check file lists every major hub
- [x] Aura / Ripple / Orchestrator footers match full lock (see `P0-FOOTER-FIX.md` — local `/workspace` hubs updated 2026-09-17)
- [x] STEEL neon void `#050505` aligned (local packs 2026-09-19)
- [ ] Optional: shared `branding` snippet for all hubs

---

## Recommended next actions

1. **Hub owners:** one-line FOOTER constant sync on Aura, Ripple, Orchestrator.
2. **Steel Studio / Desk Ops:** flip `#050507` → `#050505` in neon CSS + repack drop-in if needed.
3. **Lore & Brand:** keep `BRAND-TOKENS.md` as the single source; re-run this check after hub PRs.

---

## Evidence anchors

| Token | Evidence |
|-------|----------|
| Footer lock | `trinitywayve-command-center/src/lib/branding.ts` |
| Marketing lock | `trinitywave-www/src/config/sites.ts` |
| Void / theme | Command Center `vite.config.ts` `theme_color: '#050505'`; Aura `--color-void` |
| Goliath / matrix | Command Center `src/index.css`; Aura `@theme` |
| Truncated FOOTER | Aura / Ripple / Orchestrator `src/App.tsx` |
| Void drift | `steel-analog-neon/css/steel-studio-neon.css` |

**Verdict:** Core triad is consistent on primary TrinityWayve shells. **Blocker for “full consistency”:** demo-hub footer truncation + STEEL neon void near-miss.
