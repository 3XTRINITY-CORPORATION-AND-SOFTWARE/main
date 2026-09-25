# STEEL — Android program surface

**Program:** STEEL (Studio / Desk / Kernel OS-target)  
**Surface:** Android (Capacitor) — **later**  
**Org:** 3XTRINITY CORPORATION AND SOFTWARE

## Boundary

STEEL is a **separate product program** from **TrinityWayve**. Android packaging, when added, ships under the STEEL program — not as a TrinityWayve mobile shell.

| Program | Role |
|---------|------|
| **STEEL** | Studio / Desk / Kernel — sound + host |
| **AURA** | Visualizer sibling (Android later as well) |
| **TrinityWayve** | Brand mesh / CC / marketing |

## This surface

- **Android (Capacitor) — planned / later**
- Placeholder lane for Capacitor wrap of the STEEL web/OS-target app.
- No Capacitor project tree required in this PR; README establishes the program surface so fleet docs and CI can reference `programs/android` without inventing a TrinityWayve android path.

## Deploy / subdomain

Web/PWA and preview continue via:

| Target | Status |
|--------|--------|
| **`steel-3xtrinity.vercel.app`** | Canonical STEEL web hub (feeds future Capacitor WebView / asset sync) |
| `steel.vercel.app` | **Foreign — never use** |

Store / Play distribution is out of scope until Capacitor scaffold lands; subdomain rule still applies to any web-backed preview.

## Related

- Sibling surfaces: [`../os`](../os/), [`../web`](../web/)
- Implement Capacitor under this folder (or linked package) when Android work starts — keep STEEL branding and `steel-3xtrinity` identity
