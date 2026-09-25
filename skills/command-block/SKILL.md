---
name: command-block
description: >
  Emit and run a sealed command packet for STEEL STUDIO: impulse (starter),
  chain (same-tick arrow order), repeat (crew watch). Conditional skips the
  command, not the wire — geo/rhyme miss still forwards to MOTOR. Profile-gates
  ops. Hands off to theory-mirror, rhyme-lock, equalizer, ip-api-lookup, motor.
  Use when the user asks for a command block, chain mechanics, sealed packet,
  standing order, impulse/chain/repeat, or to lock a run so geo cannot jam the
  motor. Not an 11th extra. Not a voice-print. Triggers on "command-block",
  "command block", "chain command", "chain mechanics", "emit block",
  "sealed packet", "impulse", "chain block", "standing order".
metadata:
  short-description: "Sealed STEEL packets: impulse / chain / repeat. Signal always forwards."
user-invocable: false
---

# Command block

A **sealed packet** of ordered studio commands. Minecraft analog mapped onto
STEEL. This skill **emits** and can **run** the packet. It is not a theory extra.

Read [references/block.md](references/block.md) before changing chain rules.
Catalog: [assets/manifest.json](assets/manifest.json).

## Chain mechanics (do not weaken)

1. Impulse starts the tick and faces the next chain block.
2. Chain blocks run **same tick, arrow order**.
3. Default chain is **unconditional** (`always`). `cond=ok` / `cond=fail` is opt-in.
4. Conditional skips the **command**. The **signal still forwards**.
5. Each block fires **at most once per tick** (loops do not spin).
6. Inactive blocks forward without executing.
7. `GEO_LOOKUP` fail → success 0, `geoBusy` only, `processing` untouched, MOTOR still runs if it is `always`.

Night default:

`THEORY_EMIT` → `seed:RHYME_LOCK` → `always:GEO_LOOKUP` → `always:MOTOR`

## Do this

1. Infer `kind` (`impulse` starter, `chain` for after/then, `repeat` for watch / 24/7).
2. Infer `profile` (`dev` unless they said ci / release / archive).
3. Infer `lane` (`night` when they whisper / quiet lead / stand-in).
4. Collect `--op` verbs. Prefix `cond:` when needed (`seed:RHYME_LOCK`). Drop anything the profile forbids.
5. Emit with the script. `--run` to execute one tick. Do not hand-write JSON if the script can.
6. Empty seed → tags only. Do not call rhyme-lock / writeHook with a stock "dark steel club" prompt.
7. Geo stays on `geoBusy`. Never patch global `processing` for ip-api.
8. Mimic only after a rapped take. No voice-print.

```bash
python3 .grok/skills/command-block/scripts/emit_block.py \
  --lane night \
  --op THEORY_EMIT \
  --op seed:RHYME_LOCK \
  --op always:GEO_LOOKUP \
  --op always:MOTOR \
  --geo-fail --run --json
```

`--selftest` before you claim chain is healthy.

## Do not

- Treat chain as "only if previous ok". That is `cond=ok`, not the kind.
- Stop the wire on a skipped command.
- Merge chats into `scripts/tracktrio_runtime_order.py`.
- Add an 11th extra. 5x lives inside MI44OR-5GEM.
- Feed a URL to ffmpeg.
- Latinize ET / RU / ES seed text.
- Lock the motor on geo timeout.
- Invent a loop cadence. `/loop` is a different contract.
- Pull school or security apps onto this pipe.
- Treat this packet as a clone of the user.

## Adjacent skills (call, do not copy)

| Skill | Role |
| --- | --- |
| theory-mirror | ten extras, night hear-first TAKT-LOCK · ENERGY-MATCH · STEREO-MX |
| rhyme-lock | seed verbatim, real diction, no stock reaction |
| equalizer / peegeldus | keep rate and depth, no trophy upsample |
| ip-api-lookup | geo only, 8s abort, isolated busy |
| skill-creator | new skills; this file is already the command-block skill |

Python runtime order for a theory packet:

`read_drop → theory_spine → rulebreaker_score → infer_intent → extras → hear-first → rhyme-lock → eq write if asked → motor`

## Healthy

`extras == 10`, `clone == false`, `voice_print == false`, `upsample == false`, `sessions_merged == false`, skip still `forwarded`, geo cannot jam `processing`, MOTOR on `always` after geo.
