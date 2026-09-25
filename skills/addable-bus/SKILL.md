---
name: addable-bus
description: >
  Coordinator for STEEL named bus objects (wave 26/27). Promote facts onto
  theory-mirror, rhyme-lock, equalizer, ip-api-lookup, and command-block.
  Does not mint an 11th extra or a second motor. Use when the user says
  promote, addable-bus, bus map, wave 26, wave 27, HOST-FACE, ENJAMB-NOTE,
  STAGE-NOTE, FILE-DATE. Coordinates never enter extras.
metadata:
  short-description: "STEEL bus coordinator: named objects, 10 extras, promote not clone"
user-invocable: false
---

# Addable bus

Coordinator. Not a runtime extra. Packager stays skill-creator. Ten extras
stay ten. 5x is the closed loop, not a plugin.

Read [references/bus.md](references/bus.md). Catalog: [assets/manifest.json](assets/manifest.json).
Check: `python3 .grok/skills/addable-bus/scripts/check_manifest.py`.

## Promote

A promote is a **named fact** on the bus.

- Audio / paste / brief → theory-mirror (10 extras). URL is a brief, never ffmpeg.
- Locked bars → rhyme-lock (seed verbatim, ENJAMB-NOTE vs TAKT-LOCK).
- Extras + CURVE / METER / STAGE / STAB → equalizer write (keep rate + depth). TAG-WRITE metadata only.
- ipv4 / ipv6 / domain → ip-api-lookup. FILE-DATE is a date. GEO-MMDB fallback, same mask.
- docs / wave / promote → this skill + command-block.

Do not clone a performer. Do not add extra 11. Do not guess next-watch papers.

## Gazette

once-only geo · field-mask · no hidden port · language follows seed · live vs fallback · no second motor.
