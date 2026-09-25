# Command block schema

A command block is a **sealed packet**. It is not a theory-mirror extra, not a
voice-print, not a chat merge. School and security apps stay off this pipe.
ip-api-lookup is geo only.

Read this file when the emit script or the SKILL is ambiguous.

## Shape

```json
{
  "v": 1,
  "id": "steel.night.impulse",
  "kind": "impulse",
  "cond": "always",
  "needs": "armed",
  "profile": "dev",
  "lane": "night",
  "seed": "",
  "seed_locked": true,
  "commands": [
    { "i": 0, "kind": "impulse", "cond": "always", "op": "THEORY_EMIT", "facing": 1, "activated": true }
  ],
  "skipped": [],
  "extras": ["MI44OR-5GEM", "WHISP3RER", "DIRT-COL", "CLEAR-COL", "THEORY-SPINE", "ENERGY-MATCH", "TAKT-LOCK", "GYRATOR-AIR", "PRESHAPE-SAT", "STEREO-MX"],
  "hear_first": ["TAKT-LOCK", "ENERGY-MATCH", "STEREO-MX"],
  "clone": false,
  "voice_print": false,
  "upsample": false,
  "sessions_merged": false,
  "chain": { "same_tick": true, "forward_on_skip": true, "once_per_tick": true, "default_unconditional": true }
}
```

## Kinds (Minecraft analog → STEEL)

| Kind | Minecraft | STEEL |
| --- | --- | --- |
| `impulse` | fire once when powered | one starter. Triggers the block it faces. |
| `chain` | fire when the previous block faces it | same tick, arrow order. Default is **unconditional**. |
| `repeat` | every tick while active | crew watch; duty-capped; never lock `processing` |

Chain is **not** "only if previous ok". That is `cond=ok`. Minecraft default chain is unconditional.

## Chain mechanics (locked)

1. **Arrow order, same tick.** Impulse (or any triggered block) faces the next chain block. That block attempts execution in the same tick, then faces the next.
2. **Forward always.** Whether the command ran, succeeded, failed, or was skipped (conditional / inactive), the chain **signal still goes to `facing`**. Geo timeout cannot kill MOTOR.
3. **Conditional skips the command, not the wire.** `cond=ok` runs only if the block behind had success count > 0. `cond=fail` is the recovery branch (Minecraft has no native else — we added fail so STANDIN can recover).
4. **Behind ≠ previous in the list if you fork.** Behind is the block whose `facing` points here. Linear packets use `facing: i+1`.
5. **Once per tick.** If a block already fired this tick, do not enter it again. Loops execute each block once. (`UpdateLastExecution=false` is not used.)
6. **Inactive still forwards.** `activated=false` (needs redstone / not armed) does not execute; it still triggers `facing`.
7. **Success count.** 1 if the command ran and returned ok. 0 on skip, fail, or inactive. Geo fail → 0, `lock_processing` stays false.
8. **No 11th extra.** 5x is the body inside MI44OR-5GEM.

Night default chain:

```
impulse THEORY_EMIT always
  → chain RHYME_LOCK cond=seed     (empty seed: skip + tags, forward)
  → chain GEO_LOOKUP always        (fail: success 0, geoBusy only, forward)
  → chain MOTOR always             (runs even after both misses)
```

## Conditions (`cond`)

| Value | Fire the command when |
| --- | --- |
| `always` | no gate (Minecraft unconditional — default) |
| `ok` | predecessor success count > 0 |
| `fail` | predecessor success count = 0 (recovery) |
| `seed` | locked seed is non-empty |
| `rap` | Gen 3 take was rapped |
| `armed` | engine is armed |

Empty seed + `RHYME_LOCK` → **tags only**, success 0, wire continues. Do not invent a stock club bar.

## Profiles

Ops not in the profile are skipped at emit time, not invented.

- `dev` — full verb set including install and git
- `ci` — no git, no mimic
- `release` — write and motor only
- `archive` — CREATE_DIR / MOVE / DELETE

Source of the profile filter: the attached ProfileEngine (`dev` / `ci` / `release` / `archive`).

## Verbs

| Op | Rule |
| --- | --- |
| `GEO_LOOKUP` | `geoBusy` only. 8s timeout. Failure must not set global `processing`. Chain still forwards. |
| `RHYME_LOCK` | Seed stays verbatim. Keep alphabet (ET õäöüšž, RU Cyrillic, ES accents). No A–Z fold. No stock reaction. Empty → tags, success 0, forward. |
| `THEORY_EMIT` | Extras stay exactly ten. Night hear-first: TAKT-LOCK, ENERGY-MATCH, STEREO-MX. 5x is the body inside MI44OR-5GEM, not an 11th extra. |
| `EQ_WRITE` | Probe first. Keep sample rate and bit depth. No trophy upsample. Loudness does not restyle the house. |
| `MOTOR` | Play / arm independent of geo. Put this on `always` so a miss upstream cannot mute it. |
| `STANDIN` | Night back-vox MP3. Not a clone. Useful on `fail` as recovery. |
| `MEASURE` | Scalars only. Never store a print. |
| `MIMIC` | Only if `rap`. DSP toward measured F0 / centroid. Refuse otherwise. |

Refuse a URL as a file path. Never feed `http://` or `https://` into ffmpeg.

## Order of work (when the packet asks for theory)

```
read_drop → theory_spine → rulebreaker_score → infer_intent
→ emit extras → hear-first → rhyme-lock → equalizer write if asked → motor
```

Python pipe: `scripts/tracktrio_runtime_order.py`. Do not merge chats into that file.

## Emit / run

```bash
python3 .grok/skills/command-block/scripts/emit_block.py \
  --kind impulse \
  --lane night \
  --op THEORY_EMIT \
  --op seed:RHYME_LOCK \
  --op always:GEO_LOOKUP \
  --op always:MOTOR \
  --geo-fail \
  --run --json
```

`--selftest` checks: empty seed skip+forward, geo fail does not lock processing, motor still fires, loop once per tick, fail-branch recovery.

`--seed` empty keeps tags. `--file` must be a local path.

## Healthy packet / chain

- `extras.length == 10`
- `clone == false` and `voice_print == false`
- `upsample == false`
- `sessions_merged == false`
- geo ops never list `processing` as a lock target
- empty seed ⇒ no invented lyric
- skip still sets `forwarded: true`
- MOTOR on `always` after geo
