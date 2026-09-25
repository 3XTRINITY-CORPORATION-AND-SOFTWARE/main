# TrinityWayve + STEEL — Brand Tokens

**Owner:** Lore & Brand  
**SOURCE:** Linda Viiding  
**Architect:** Theodor Künnapuu  
**Updated:** 2026-09-17 (Europe/Tallinn)  
**Canonical code lock:** `trinitywayve-command-center/src/lib/branding.ts`

---

## Naming

| Use | Correct | Avoid |
|-----|---------|--------|
| Product / UI / voice | **TrinityWayve** | trinitywave, Trinity Wave |
| System footer SYSTEM field | `TRINITYWAYVE` (all caps) | mixed case in the lock string |
| Marketing package folder | `trinitywave-www` (legacy slug OK) | using folder slug as customer-facing name |
| Primary domain intent | `trinitywayve.com` (attach later) | treating `trinitywave.com` as the brand |
| Platform / art system | **STEEL** | Steel / steel as product name in customer copy |
| Kernel / audit flavor | **GOLIATH** | Goliath as a separate consumer brand |

Repo context: https://github.com/antonioportfelli-boop/STEEL-3XTRINITY-CORPORATION-OFFICIAL-APP-

---

## Core color triad (locked)

| Token | Role | Hex | Notes |
|-------|------|-----|-------|
| **goliath** / crimson | Primary action, threat, syntax keyword | `#E11D48` | GOLIATH crimson |
| **matrix** | Success, focus ring, signal, syntax string | `#00FF41` | Matrix green |
| **void** | Canvas / theme / PWA background | `#050505` | Near-black void |

CSS variable names used in hubs: `--color-goliath`, `--color-matrix`, `--color-void` (Aura); Tailwind-style `goliath` / `matrix` utilities in Command Center.

### Module accents (secondary — do not replace the triad)

| Hub | Accent | Hex |
|-----|--------|-----|
| Command / Divine Core | goliath | `#E11D48` |
| Ripple Wake | matrix | `#00FF41` |
| Aura | purple | `#A855F7` |
| Giga Orchestrator | sky | `#38BDF8` |
| Audit / Goliath Telemetry | amber | `#F59E0B` |

---

## Footer lock (immutable)

**Canonical string** (single line, exact characters):

```
SYSTEM: TRINITYWAYVE | ARCHITECT: THEODOR^%°¢(KÜNNAPUU) | SOURCE: LINDA VIIDING | LÄBIMURDE ANKUR: ACTIVE | STATUS: OMNI-SOVEREIGN
```

Rules:

1. Do not paraphrase, translate, or “clean” the Architect glyph run `THEODOR^%°¢(KÜNNAPUU)`.
2. Keep `SOURCE: LINDA VIIDING` and `LÄBIMURDE ANKUR: ACTIVE` verbatim.
3. Always end with `| STATUS: OMNI-SOVEREIGN` on production / marketing shells.
4. Demo-only shells may append `| DEMO SHELL` **after** the lock, never rewrite the lock.
5. Keep README / DEMO.md / tests in lockstep with the exported constant.

**Source of truth files**

- Command Center: `src/lib/branding.ts` → `FOOTER_LINE`
- Marketing SPA: `trinitywave-www/src/config/sites.ts` → `FOOTER_LINE`

---

## Voice

- Sovereign, precise, technical — short sentences, mono labels OK.
- Credit **SOURCE Linda Viiding** in seals, vaults, and footers; never omit on primary shells.
- Architect attribution stays Theodor Künnapuu / the lock glyph form above.
- Prefer **TrinityWayve** in headlines; reserve STEEL for art/skin/integration packs and engineering surfaces.

### Product short names

| Short | Full |
|-------|------|
| TrinityWayve Command Center | TrinityWayve Omni-Sovereign Command Center |
| TrinityWayve (marketing) | TrinityWayve Omni-Sovereign Platform |
| Build badge (CC) | `GOLIATH v12.1.2 · DIVINE_CORE v36.0 · PWA READY` |

---

## STEEL pack alignment

STEEL photo themes / atlas / analog-neon should treat `#050505` as void. Near-misses like `#050507` (studio-black in analog-neon) are flagged in `TOKEN-CHECK.md` for cleanup.

---

## Related

- Consistency audit: [`TOKEN-CHECK.md`](./TOKEN-CHECK.md)
