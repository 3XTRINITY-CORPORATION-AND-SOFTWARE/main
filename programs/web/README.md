# STEEL — Web (PWA) program surface

**Program:** STEEL (Studio / Desk / Kernel OS-target)  
**Surface:** Web PWA  
**Org:** 3XTRINITY CORPORATION AND SOFTWARE

## Boundary

STEEL is a **separate product program** from **TrinityWayve**. The web PWA is STEEL’s browser surface — not a TrinityWayve hub and not under `trinitywayve-*` project naming.

| Program | Role |
|---------|------|
| **STEEL** | Studio / Desk / Kernel — sound + host |
| **AURA** | Visualizer sibling (`aura-3xtrinity.vercel.app` target) |
| **TrinityWayve** | Omni mesh / Command Center / marketing |

## This surface

- **Web PWA** — Vite app at repo root (`src/`, `public/`, service-worker / Grok PWA scripts as present).
- This is the **current primary ship path** for STEEL until OS packaging and Android (Capacitor) land.
- Documented here so fleet ops treat `programs/web` as the STEEL web lane even while sources remain at root.

## Deploy / subdomain

| Target | Status |
|--------|--------|
| **`steel-3xtrinity.vercel.app`** | **Canonical production hub for STEEL web** |
| `steel.vercel.app` | **Foreign — do not deploy here** (unrelated product) |

Production should target Vercel project / alias **`steel-3xtrinity`**. Compare and debug against TrinityWayve hubs only as external links, not as shared deploy roots.

## Related

- Sibling surfaces: [`../os`](../os/), [`../android`](../android/)
- Repo root Vite app = this surface’s implementation today
