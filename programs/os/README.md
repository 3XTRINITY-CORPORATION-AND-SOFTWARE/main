# STEEL — OS program surface

**Program:** STEEL (Studio / Desk / Kernel OS-target)  
**Surface:** Desktop / OS shell  
**Org:** 3XTRINITY CORPORATION AND SOFTWARE

## Boundary

STEEL is a **separate product program** from **TrinityWayve** (Omni brand mesh / Command Center / marketing hubs). Do not fold STEEL into TrinityWayve app trees or `trinitywayve-*` Vercel hubs. TrinityWayve Command Center may **link out** to STEEL; it does not own STEEL sources or deploys.

| Program | Role |
|---------|------|
| **STEEL** | Studio / Desk / Kernel — sound + host OS-target |
| **AURA** | Visualizer / presence art synced with STEEL (sibling program) |
| **TrinityWayve** | Brand mesh / CC / marketing — keep under `trinitywayve-*` |

## This surface

- **OS shell** — desktop-oriented host: kernel worklets, desk, studio, MIDI/host paths.
- Canonical app code today lives at repo root (`src/`, `public/worklets/`, etc.); this folder documents the **OS program lane** as STEEL matures into explicit `programs/` layout.
- Pair with `programs/web` (PWA) and `programs/android` (Capacitor later).

## Deploy / subdomain

| Target | Status |
|--------|--------|
| **`steel-3xtrinity.vercel.app`** | **Canonical STEEL subdomain** — use this |
| `steel.vercel.app` | **Foreign / do not use** — unrelated “Steel Script Translator”; never overwrite or claim |

Vercel project alias expectation: `steel-3xtrinity` (not bare `steel`).

## Related

- Sibling surfaces: [`../web`](../web/), [`../android`](../android/)
- Fleet separation plan: `/workspace/program-split/SEPARATION-PLAN.md` (ops box)
- Source-of-truth notes: repo `SOURCE-OF-TRUTH.md`
