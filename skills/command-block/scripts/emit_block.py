#!/usr/bin/env python3
"""Emit and run a sealed STEEL command block.

Chain mechanics (Minecraft analog, STEEL mapping):
  - Impulse starts the tick.
  - Any block that is triggered faces the next chain block.
  - Same tick, arrow order.
  - Conditional skips the *command* when the block behind did not succeed.
  - Skip still forwards the chain signal. Motor does not die on geo/rhyme miss.
  - A block fires at most once per tick (loops do not spin).
  - Default chain is unconditional (always). cond=ok / cond=fail is opt-in.

Not an 11th extra. Not a voice-print. Sessions stay sessions.
School and security stay off this pipe. ip-api is geo only.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets" / "manifest.json"

EXTRA_IDS = (
    "MI44OR-5GEM",
    "WHISP3RER",
    "DIRT-COL",
    "CLEAR-COL",
    "THEORY-SPINE",
    "ENERGY-MATCH",
    "TAKT-LOCK",
    "GYRATOR-AIR",
    "PRESHAPE-SAT",
    "STEREO-MX",
)

NIGHT_HEAR_FIRST = ("TAKT-LOCK", "ENERGY-MATCH", "STEREO-MX")

KINDS = ("impulse", "chain", "repeat")
CONDS = ("always", "ok", "fail", "seed", "rap", "armed")
LANES = ("night", "day")
PROFILES = ("dev", "ci", "release", "archive")

PROFILE_OPS = {
    "dev": {
        "CREATE_DIR",
        "MOVE",
        "DELETE",
        "PY_INSTALL",
        "NODE_INSTALL",
        "GIT_INIT",
        "GIT_COMMIT_INITIAL",
        "GEO_LOOKUP",
        "RHYME_LOCK",
        "THEORY_EMIT",
        "EQ_WRITE",
        "MOTOR",
        "STANDIN",
        "MEASURE",
        "MIMIC",
    },
    "ci": {
        "CREATE_DIR",
        "MOVE",
        "DELETE",
        "PY_INSTALL",
        "NODE_INSTALL",
        "GEO_LOOKUP",
        "RHYME_LOCK",
        "THEORY_EMIT",
        "EQ_WRITE",
        "MOTOR",
        "STANDIN",
        "MEASURE",
    },
    "release": {
        "CREATE_DIR",
        "MOVE",
        "DELETE",
        "THEORY_EMIT",
        "EQ_WRITE",
        "MOTOR",
        "STANDIN",
    },
    "archive": {"CREATE_DIR", "MOVE", "DELETE"},
}

LOCK_PROCESSING = {
    "GEO_LOOKUP": False,
    "RHYME_LOCK": True,
    "THEORY_EMIT": False,
    "EQ_WRITE": True,
    "MOTOR": False,
    "STANDIN": False,
    "MEASURE": False,
    "MIMIC": False,
}

NEEDS_DEFAULT = {
    "impulse": "armed",
    "chain": "ok",
    "repeat": "watch",
}


def load_catalog() -> dict:
    if not ASSETS.is_file():
        return {}
    return json.loads(ASSETS.read_text(encoding="utf-8"))


def refuse_url(value: str | None) -> None:
    if not value:
        return
    low = value.strip().lower()
    if low.startswith("http://") or low.startswith("https://"):
        raise SystemExit("refuse: never feed a URL into a command block / ffmpeg")


def parse_op(raw: str) -> tuple[str, str]:
    text = raw.strip()
    if ":" in text:
        cond, op = text.split(":", 1)
        cond = cond.strip().lower()
        op = op.strip().upper().replace("-", "_")
        if cond not in CONDS:
            raise SystemExit(f"refuse: unknown cond {cond}")
        return cond, op
    return "always", text.strip().upper().replace("-", "_")


def emit(
    *,
    kind: str,
    cond: str,
    profile: str,
    lane: str,
    ops: list[str],
    seed: str,
    file_path: str | None,
    block_id: str,
) -> dict:
    allowed = PROFILE_OPS[profile]
    commands: list[dict] = []
    skipped: list[dict] = []
    parsed = [parse_op(raw) for raw in ops]
    for i, (op_cond, op) in enumerate(parsed):
        if op not in allowed:
            skipped.append({"op": op, "reason": f"profile {profile}"})
            continue
        item: dict = {
            "i": i,
            "kind": "impulse" if i == 0 else "chain",
            "cond": op_cond if i > 0 or op_cond != "always" else cond,
            "op": op,
            "facing": i + 1 if i + 1 < len(parsed) else None,
            "activated": True,
            "lock_processing": bool(LOCK_PROCESSING.get(op, False)) if op != "GEO_LOOKUP" else False,
            "busy": "geoBusy" if op == "GEO_LOOKUP" else None,
        }
        if op == "RHYME_LOCK":
            item["empty"] = "tags"
            item["rewrite"] = False
        if op == "THEORY_EMIT":
            item["extras"] = 10
        if op == "EQ_WRITE":
            item["keep_rate"] = True
            item["upsample"] = False
        if op == "MIMIC":
            item["requires"] = "rap"
            item["voice_print"] = False
        commands.append(item)

    seed_text = (seed or "").strip()
    needs = NEEDS_DEFAULT[kind]
    if cond == "seed":
        needs = "seed"
    elif cond == "rap":
        needs = "rap"

    return {
        "v": 1,
        "id": block_id,
        "kind": kind,
        "cond": cond,
        "needs": needs,
        "profile": profile,
        "lane": lane,
        "seed": seed_text,
        "seed_locked": True,
        "standin_is_tags": not bool(seed_text),
        "file": file_path,
        "commands": commands,
        "skipped": skipped,
        "extras": list(EXTRA_IDS),
        "hear_first": list(NIGHT_HEAR_FIRST) if lane == "night" else [],
        "five_gen": [
            "fundamental keep",
            "even-harmonic body",
            "odd-harmonic edge",
            "rounded HF decay",
            "mid stability",
        ],
        "clone": False,
        "voice_print": False,
        "upsample": False,
        "sessions_merged": False,
        "geo_locks_processing": False,
        "chain": {
            "same_tick": True,
            "forward_on_skip": True,
            "once_per_tick": True,
            "default_unconditional": True,
        },
        "order": [
            "read_drop",
            "theory_spine",
            "rulebreaker_score",
            "infer_intent",
            "emit_extras",
            "hear_first",
            "rhyme_lock",
            "equalizer_write",
            "motor",
        ],
    }


def gate(cond: str, prev_success: int, ctx: dict) -> tuple[bool, str]:
    if cond == "ok" and prev_success <= 0:
        return False, "cond ok — predecessor success 0"
    if cond == "fail" and prev_success > 0:
        return False, "cond fail — predecessor success > 0"
    if cond == "seed" and not (ctx.get("seed") or "").strip():
        return False, "tags — empty seed"
    if cond == "rap" and not ctx.get("rapped"):
        return False, "mimic waits for a rapped take"
    if cond == "armed" and not ctx.get("armed", True):
        return False, "needs arm"
    return True, "fire"


def exec_op(op: str, ctx: dict) -> tuple[bool, str]:
    if op == "RHYME_LOCK":
        if not (ctx.get("seed") or "").strip():
            return False, "tags — empty seed"
        return True, "seed locked verbatim"
    if op == "GEO_LOOKUP":
        if ctx.get("geo_ok", True):
            return True, "geoBusy only"
        return False, "geo fail — processing untouched"
    if op == "MIMIC":
        if not ctx.get("rapped"):
            return False, "refuse — no rapped take"
        return True, "dsp toward scalars"
    if op == "THEORY_EMIT":
        return True, "extras 10"
    if op == "MOTOR":
        return True, "motor independent of geo"
    if op == "STANDIN":
        return True, "stand-in tags, not a clone"
    if op == "MEASURE":
        return True, "scalars only"
    if op == "EQ_WRITE":
        return True, "keep rate, no upsample"
    return True, "ok"


def run_chain(commands: list[dict], ctx: dict) -> list[dict]:
    """Same-tick chain. Signal always forwards. Conditional only skips the command."""
    log: list[dict] = []
    if not commands:
        return log
    seen: set[int] = set()
    success = [0] * (max(c["i"] for c in commands) + 1)
    by_i = {c["i"]: c for c in commands}

    def trigger(i: int, prev_success: int) -> None:
        b = by_i.get(i)
        if b is None or i in seen:
            return
        seen.add(i)
        facing = b.get("facing")
        lock = False if b["op"] == "GEO_LOOKUP" else bool(b.get("lock_processing"))
        if not b.get("activated", True):
            success[i] = 0
            log.append(
                {
                    "i": i,
                    "op": b["op"],
                    "kind": b["kind"],
                    "cond": b["cond"],
                    "fired": False,
                    "forwarded": facing is not None,
                    "success": 0,
                    "note": "inactive — forward",
                    "lock_processing": lock,
                }
            )
            if facing is not None:
                trigger(facing, 0)
            return
        ok, note = gate(b["cond"], prev_success, ctx)
        if not ok:
            success[i] = 0
            log.append(
                {
                    "i": i,
                    "op": b["op"],
                    "kind": b["kind"],
                    "cond": b["cond"],
                    "fired": False,
                    "forwarded": facing is not None,
                    "success": 0,
                    "note": note,
                    "lock_processing": False,
                }
            )
            if facing is not None:
                trigger(facing, 0)
            return
        fired_ok, fired_note = exec_op(b["op"], ctx)
        success[i] = 1 if fired_ok else 0
        log.append(
            {
                "i": i,
                "op": b["op"],
                "kind": b["kind"],
                "cond": b["cond"],
                "fired": True,
                "forwarded": facing is not None,
                "success": success[i],
                "note": fired_note,
                "lock_processing": lock,
            }
        )
        if facing is not None:
            trigger(facing, success[i])

    trigger(commands[0]["i"], 1)
    return log


def selftest() -> int:
    fails = 0

    def check(name: str, cond: bool) -> None:
        nonlocal fails
        if not cond:
            print(f"FAIL {name}", file=sys.stderr)
            fails += 1
        else:
            print(f"ok   {name}")

    night = emit(
        kind="impulse",
        cond="always",
        profile="dev",
        lane="night",
        ops=["THEORY_EMIT", "seed:RHYME_LOCK", "always:GEO_LOOKUP", "always:MOTOR"],
        seed="",
        file_path=None,
        block_id="steel.night.chain",
    )
    log = run_chain(night["commands"], {"seed": "", "rapped": False, "armed": True, "geo_ok": False})
    by_op = {row["op"]: row for row in log}
    check("same tick 4 steps", len(log) == 4)
    check("theory fired", by_op["THEORY_EMIT"]["fired"] is True and by_op["THEORY_EMIT"]["success"] == 1)
    check("empty seed skipped, forwarded", by_op["RHYME_LOCK"]["fired"] is False and by_op["RHYME_LOCK"]["forwarded"] is True)
    check("geo fail still forwarded", by_op["GEO_LOOKUP"]["success"] == 0 and by_op["GEO_LOOKUP"]["forwarded"] is True)
    check("geo does not lock processing", by_op["GEO_LOOKUP"]["lock_processing"] is False)
    check("motor fired after geo fail", by_op["MOTOR"]["fired"] is True and by_op["MOTOR"]["success"] == 1)

    loop_ops = [
        {"i": 0, "kind": "impulse", "cond": "always", "op": "THEORY_EMIT", "facing": 1, "activated": True, "lock_processing": False},
        {"i": 1, "kind": "chain", "cond": "always", "op": "MOTOR", "facing": 0, "activated": True, "lock_processing": False},
    ]
    loop_log = run_chain(loop_ops, {"seed": "", "rapped": False, "armed": True, "geo_ok": True})
    check("loop once per tick", len(loop_log) == 2)

    fail_branch = emit(
        kind="impulse",
        cond="always",
        profile="dev",
        lane="night",
        ops=["GEO_LOOKUP", "fail:STANDIN", "always:MOTOR"],
        seed="",
        file_path=None,
        block_id="steel.fail",
    )
    flog = run_chain(fail_branch["commands"], {"seed": "", "rapped": False, "armed": True, "geo_ok": False})
    fops = {row["op"]: row for row in flog}
    check("fail branch runs on geo miss", fops["STANDIN"]["fired"] is True)
    check("unconditional motor always", fops["MOTOR"]["fired"] is True)

    cond_ok = emit(
        kind="impulse",
        cond="always",
        profile="dev",
        lane="night",
        ops=["GEO_LOOKUP", "ok:RHYME_LOCK", "always:MOTOR"],
        seed="quiet bars",
        file_path=None,
        block_id="steel.ok",
    )
    clog = run_chain(cond_ok["commands"], {"seed": "quiet bars", "rapped": False, "armed": True, "geo_ok": False})
    cops = {row["op"]: row for row in clog}
    check("cond ok skips after geo fail", cops["RHYME_LOCK"]["fired"] is False)
    check("signal still reaches motor", cops["MOTOR"]["fired"] is True)
    return 1 if fails else 0


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Emit / run a sealed STEEL command block")
    p.add_argument("--kind", choices=KINDS, default="impulse")
    p.add_argument("--cond", choices=CONDS, default="always")
    p.add_argument("--profile", choices=PROFILES, default="dev")
    p.add_argument("--lane", choices=LANES, default="night")
    p.add_argument("--op", action="append", dest="ops", default=[], help="OP or cond:OP")
    p.add_argument("--seed", default="", help="locked lyric seed; empty keeps tags")
    p.add_argument("--file", default=None, help="local audio only")
    p.add_argument("--id", dest="block_id", default="")
    p.add_argument("--out", type=Path, default=None)
    p.add_argument("--json", action="store_true")
    p.add_argument("--catalog", action="store_true", help="print assets/manifest.json and exit")
    p.add_argument("--run", action="store_true", help="execute the chain this tick")
    p.add_argument("--geo-ok", dest="geo_ok", action="store_true", default=True)
    p.add_argument("--geo-fail", dest="geo_ok", action="store_false")
    p.add_argument("--rapped", action="store_true")
    p.add_argument("--selftest", action="store_true")
    args = p.parse_args(argv)

    if args.selftest:
        return selftest()

    if args.catalog:
        json.dump(load_catalog(), sys.stdout, indent=2)
        sys.stdout.write("\n")
        return 0

    refuse_url(args.seed)
    refuse_url(args.file)
    if args.file:
        path = Path(args.file)
        if not path.is_file():
            print(f"refuse: missing local file {path}", file=sys.stderr)
            return 2

    ops = args.ops or ["THEORY_EMIT", "seed:RHYME_LOCK", "always:GEO_LOOKUP", "always:MOTOR"]
    block_id = args.block_id or f"steel.{args.lane}.{args.kind}"
    doc = emit(
        kind=args.kind,
        cond=args.cond,
        profile=args.profile,
        lane=args.lane,
        ops=ops,
        seed=args.seed,
        file_path=args.file,
        block_id=block_id,
    )

    if args.run:
        ctx = {
            "seed": args.seed,
            "rapped": bool(args.rapped),
            "armed": True,
            "geo_ok": bool(args.geo_ok),
        }
        doc["log"] = run_chain(doc["commands"], ctx)
        doc["processing_locked"] = any(
            row["op"] == "GEO_LOOKUP" and row.get("lock_processing") for row in doc["log"]
        )

    text = json.dumps(doc, indent=2)
    if args.out:
        args.out.parent.mkdir(parents=True, exist_ok=True)
        args.out.write_text(text + "\n", encoding="utf-8")
    if args.json or not args.out:
        sys.stdout.write(text + "\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
