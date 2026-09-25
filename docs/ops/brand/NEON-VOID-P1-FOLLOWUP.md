# Neon void P1 — follow-up

`src/steel-art` full drop-in (placeMap/skins) is **not** in this PR — it failed typecheck without siblings.

This PR only ships:
- `public/themes/steel-analog-neon/**` with `--studio-black: #050505`
- `docs/ops/brand/*` SoT + compare

Wire `src/steel-art` in a follow-up PR via steel-integration-dropin copy script.
