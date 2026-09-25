# Analog Neon Grade — STEEL STUDIO

Neon-graded contact references for STEEL analog UI / instrument lighting.

## Palette (4 neon + black)

| Token | Hex | Role |
|-------|-----|------|
| `--neon-red` | `#ff2a4c` | Warm amber LEDs, clip/peak indicators |
| `--neon-green` (slim green) | `#39ff88` | Mint status lamps, level OK |
| `--neon-blue` | `#3ad0ff` | Cool instrument glow, meters |
| `--neon-pink` | `#ff4fd8` | Accent highlights, bright yellow remaps |
| `--studio-black` | `#050505` | Crushed shadows / chassis voids |

## Grade recipe

1. **Shadow crush** — darks pulled toward studio black `#050505`.
2. **Warm remap** — amber/yellow instrument lamps → neon red / neon pink.
3. **Mint remap** — pale greens → slim neon green `#39ff88`.
4. **Metals** — knobs/faceplates stay relatively neutral silver (desaturated, slight cool).
5. **Contrast + bloom** — contrast boost; bright lights get a soft bloom (blur bright mask, screen).

## Outputs

- `graded/analog-0N-graded.jpg` — six graded stills (JPEG q92)
- `preview/contact-graded.jpg` — 3×2 labeled contact sheet
- `generated/` — reserved for parent agent
- `css/steel-studio-neon.css` — CSS custom properties for STEEL integration
- `palette.json` — machine-readable palette

## CSS

See `css/steel-studio-neon.css` for `--neon-*` and `--studio-black` tokens.
