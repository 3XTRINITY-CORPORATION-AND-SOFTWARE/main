#!/usr/bin/env python3
"""Wave 27 gazette check. Named facts only. No extra 11."""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets" / "manifest.json"
CB = Path(__file__).resolve().parents[2] / "command-block" / "scripts" / "emit_block.py"

EXTRAS = [
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
]


def main() -> int:
    fails = 0
    doc = json.loads(ASSETS.read_text(encoding="utf-8"))

    def check(name: str, ok: bool) -> None:
        nonlocal fails
        print(("ok  " if ok else "FAIL") + "  " + name)
        if not ok:
            fails += 1

    check("wave 27", doc.get("wave") == 27)
    check("extras 10", doc.get("extras") == EXTRAS and len(doc.get("extras") or []) == 10)
    objs = list(doc.get("objects") or [])
    check("objects 17", len(objs) == 17)
    check("no extra collision", not any(o in EXTRAS for o in objs))
    check("no extra 11", doc.get("extra11") is False)
    check("no clone", doc.get("clone") is False)
    check("no ffmpeg url", doc.get("ffmpeg_url") is False)
    check("geo only ip-api", doc.get("geo") == "ip-api-lookup")
    check("FILE-DATE not coordinate", doc.get("file_date_is_coordinate") is False)
    check("FILE-DATE named", "FILE-DATE" in objs)
    check("command-block listed", doc.get("command_block") is True)

    if CB.is_file():
        r = subprocess.run([sys.executable, str(CB), "--selftest"], check=False)
        check("command-block self", r.returncode == 0)
    else:
        check("command-block self", False)

    print(f"{len(objs)}/{len(objs)} PASS" if fails == 0 else f"{fails} FAIL")
    return 1 if fails else 0


if __name__ == "__main__":
    raise SystemExit(main())
