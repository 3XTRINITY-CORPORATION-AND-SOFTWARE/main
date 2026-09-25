# Desk Ops Summary — STEEL

**Pack written:** `/workspace/steel-desk-ops/{INVENTORY,CHECKLIST,TOP5-FIXES,SUMMARY}.md`  
**Tree:** `/workspace/steel-desk-ops/tree.json` (from `/tmp/steel-tree.json`; API recursive tree rate-limited)  
**Sources:** `/workspace/steel-desk-ops/raw/` (+ reused `/tmp/file_*`)

---

## What Desk is

Desk is the **WEB remote mix** surface for STEEL’s three-place model (`places.ts`: OS motor / WEB remote / HOST DAW). Navigation is **not** multi-path routing: `routeTree.gen.ts` exposes **only `/`**; `index.tsx` mounts tab components inside `AppShell`.

Demo scripts (`/workspace/steel-demo-scripts/desk.md`, `hosts.md`, `console.md`) match code: Desk = slots + FX + bounce/`renderDeskVideo`; Hosts = profile + OS matrix; Console = arm/buffer/RTL.

---

## Surface count

| Kind | Count | List |
|------|------:|------|
| **URL routes** (`routeTree.gen.ts`) | **1** | `/` |
| **Places** | **3** (+ lab) | `os`, `web`, `host` (+ lab nav) |
| **Mounted tab surfaces** (`index.tsx`) | **8** | `desk`, `studio`, `console`, `aura`, `pipeline`, `hosts`, `kernel`, `audit` |
| **Desk-nested** | **1** | OLED (`steel-oled.tsx`) — not a tab |
| **Desk Ops primary focus** | **5** | Desk, OLED, Hosts, PlaceBar/AppShell, Adapt (`adapt.ts`) · Console adjacent for arm honesty |

---

## Layout verdict

**Confirmed: flat-root app + empty/missing `src/`.**  
Tooling (`tsconfig` `@/*` → `./src/*`, Vite/AGENTS/scaffold) expects `src/routes` + `src/lib` + `src/components`. Public tree has those modules as **root-level files** with **namespace collisions** (`engine`/`store`/`types`). This is the same structural break Export documented for Attest exporters.

### CoS / Kernel Eng alignment (2026-09-17)

- **Option A:** one structural `src/` restore PR covering **Desk slice + Export Attest** (not two PRs).
- **Sequence:** after community health PR.
- Desk P0-1 is the Desk half of that shared PR; coordinate with Kernel Eng + Export — do not open a Desk-only layout PR.

---

## Top 5 titles

1. **P0 — Restore `src/` Desk slice (flat root vs `@/*`)**  
2. **P0 — Unflatten colliding `engine` / `store` / `types` namespaces**  
3. **P0 — Align `routeTree.gen.ts` with real `routes/` files**  
4. **P1 — Fix `HostId` mismatch (`generic` vs studio union)**  
5. **P2 — Desk interaction coverage in `browser-smoke.mjs`**

---

## Fetch failures

| Item | Status |
|------|--------|
| GitHub API recursive tree | **403 rate limit** — substituted good `/tmp/steel-tree.json` |
| `desk.ts` | **404** (use `steel-desk.tsx` + `adapt.ts`) |
| `src/*`, `routes/*` paths | **404** (flat `__root.tsx` / `index.tsx` exist) |
| `main.tsx` / `App.tsx` / `index.html` / `client.tsx` / `steel-aura.tsx` | **404** |
| Priority Desk/shell raw files + reused `/tmp/file_*` | **OK** |

---

## Deliverable paths

- `/workspace/steel-desk-ops/INVENTORY.md`  
- `/workspace/steel-desk-ops/CHECKLIST.md`  
- `/workspace/steel-desk-ops/TOP5-FIXES.md`  
- `/workspace/steel-desk-ops/SUMMARY.md`  
- `/workspace/steel-desk-ops/tree.json`  
- `/workspace/steel-desk-ops/raw/` (working copies)

*STEEL Desk Ops pack — box draft, no PR.*
