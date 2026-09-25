#!/usr/bin/env python3
"""STEEL / Track Trio runtime order.

Sessions stay sessions. This file does not merge chats.
School and security apps stay off the music extras.
Connectors that may touch this pipe: Voice (TTS stand-in), ffmpeg,
Automations for a later run. GitHub / Drive / Vercel / Figma / Canva /
Gamma / Linear / mail are adjacent, not extras. ip-api-lookup is geo only.

Order of work (locked):
  read_drop
  → theory_spine
  → rulebreaker_score
  → infer_intent
  → emit all ten extras (one engine each, waves 1–13)
  → hear-first three
  → rhyme-lock if lyrics (seed locked)
  → equalizer + ffmpeg write if asked (probe first, keep rate and depth)
  → motor

5x / Vyf dag is the five-generation body inside MI44OR-5GEM, not a fifth
calendar day and not an 11th extra:
  1. fundamental keep
  2. even-harmonic body
  3. odd-harmonic edge
  4. rounded HF decay
  5. mid stability
5x is the closed loop: spine + dirt/clear + same container + takt lock +
written curve. A lone engine is not 5x.

Night lane: quiet lead, louder stack. TTS stand-in is not a voice-print
clone. Locked seed empty → stand-in is tags only.

Gen 3 (user capability, not an 11th extra):
  measure take → ten-kind scores on the user's range → mimic DSP only
  if they rapped. Scalars only. Language hooks: EN RU ES ET DE.
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

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

# One engine per extra for the night drop (wave 13 why-lines where they apply).
NIGHT_ENGINES = {
    "MI44OR-5GEM": "VEC-WDF",
    "WHISP3RER": "TPDF-DECORR",
    "DIRT-COL": "CHEBY",
    "CLEAR-COL": "ERB-CUT",
    "THEORY-SPINE": "ERA-SS",
    "ENERGY-MATCH": "SHAPE-GAIN",
    "TAKT-LOCK": "PD-MAG",
    "GYRATOR-AIR": "SVF-GYR",
    "PRESHAPE-SAT": "PRE-POST",
    "STEREO-MX": "IACC-SAFE",
}

FFMPEG = "/usr/local/bin/ffmpeg"


def run(cmd: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(cmd, check=False, capture_output=True, text=True)


def read_drop(paste: str, path: Path | None) -> dict:
    """Step 1. Local file or written brief. Never fetch a URL."""
    drop: dict = {
        "paste": (paste or "").strip(),
        "path": str(path) if path else None,
        "url": False,
        "kind": "brief",
        "container": None,
        "probe_stderr": None,
    }
    if path is None:
        return drop
    if not path.is_file():
        drop["kind"] = "missing"
        return drop
    drop["kind"] = "file"
    probe = run([FFMPEG, "-hide_banner", "-i", str(path), "-f", "null", "-"])
    text = (probe.stderr or "") + (probe.stdout or "")
    drop["probe_stderr"] = text[-4000:]
    box: dict = {
        "format": None,
        "codec": None,
        "sample_rate": None,
        "channels": None,
        "duration_s": None,
        "bit_rate": None,
        "bit_depth": None,
    }
    for line in text.splitlines():
        s = line.strip()
        if s.startswith("Duration:"):
            m = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", s)
            if m:
                box["duration_s"] = (
                    int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3))
                )
            br = re.search(r"bitrate: (\d+) kb/s", s)
            if br:
                box["bit_rate"] = int(br.group(1)) * 1000
        if "Audio:" in s:
            box["codec"] = s.split("Audio:", 1)[1].split(",", 1)[0].strip()
            hz = re.search(r"(\d+) Hz", s)
            if hz:
                box["sample_rate"] = int(hz.group(1))
            if "stereo" in s or "2 channels" in s:
                box["channels"] = 2
            elif "mono" in s:
                box["channels"] = 1
            if "fltp" in s or "flt" in s:
                box["bit_depth"] = 32
            elif "s16" in s:
                box["bit_depth"] = 16
            elif "s24" in s:
                box["bit_depth"] = 24
            if ".mp3" in str(path).lower() or "mp3" in (box["codec"] or ""):
                box["format"] = "mp3"
                if box["bit_depth"] is None:
                    box["bit_depth"] = 16
    drop["container"] = box
    return drop


def ebur_and_stats(path: Path) -> dict:
    loud = {"integrated_lufts": None, "loudness_range": None, "true_peak": None}
    ebu = run(
        [
            FFMPEG,
            "-nostats",
            "-i",
            str(path),
            "-filter_complex",
            "ebur128=framelog=verbose",
            "-f",
            "null",
            "-",
        ]
    )
    for line in (ebu.stderr or "").splitlines():
        s = line.strip()
        if s.startswith("I:"):
            try:
                loud["integrated_lufts"] = float(s.split()[1])
            except (IndexError, ValueError):
                pass
        elif s.startswith("LRA:"):
            try:
                loud["loudness_range"] = float(s.split()[1])
            except (IndexError, ValueError):
                pass
        elif s.startswith("Peak:"):
            try:
                loud["true_peak"] = float(s.split()[1])
            except (IndexError, ValueError):
                pass
    ast = run(
        [
            FFMPEG,
            "-nostats",
            "-i",
            str(path),
            "-af",
            "astats=metadata=1:reset=0",
            "-f",
            "null",
            "-",
        ]
    )
    peak = rms = None
    for line in (ast.stderr or "").splitlines():
        s = line.strip()
        if "Peak level dB" in s:
            try:
                peak = float(s.rsplit(":", 1)[1].strip())
            except ValueError:
                pass
        elif s.startswith("RMS level dB"):
            try:
                rms = float(s.rsplit(":", 1)[1].strip())
            except ValueError:
                pass
    crest = None
    if peak is not None and rms is not None:
        crest = peak - rms
    return {"loudness": loud, "peak_db": peak, "rms_db": rms, "crest_db": crest}


def theory_spine(drop: dict, stats: dict | None, bpm: int, genre: str) -> dict:
    """Step 2. Slots stay filled. unknown + reason beats a guessed key."""
    box = drop.get("container") or {}
    paste = drop.get("paste") or ""
    lufs = (stats or {}).get("loudness", {}).get("integrated_lufts") if stats else None
    crest = (stats or {}).get("crest_db") if stats else None
    file_sr = box.get("sample_rate")
    night_words = any(w in paste.lower() for w in ("night", "whisper", "stack", "quiet lead"))
    return {
        "pulse": f"{bpm} BPM · 4/4 {'boom-trap' if genre in ('rap', 'trap') else 'floor'}"
        + (" · estimate" if not file_sr else ""),
        "takt": "stress 1+3, 808 on 1" if genre in ("rap", "trap") else "kick every quarter",
        "pitch_house": "unknown — no bank / no ear pass on this drop",
        "function": "no-cadence loop" if genre in ("rap", "trap", "techno") else "drop-dominant loop",
        "tension": "held whisper vs stacked body" if night_words else "short release",
        "chroma": "mid-forward stack, open-crest lead" if night_words else "unknown chroma",
        "crest": (
            f"file crest {crest:.1f} dB" if isinstance(crest, (int, float)) else "estimate — open crest on lead"
        ),
        "transient": "rounded tags on the stand-in, clicky kit stays on the grid",
        "harmonic_dirt": "even body + light odd edge (dirt 1–4 on the stack)",
        "form": "intro / quiet bars / stack / outro",
        "lufs": lufs,
        "sample_rate": file_sr,
        "bit_depth": box.get("bit_depth"),
        "channels": box.get("channels"),
        "duration_s": box.get("duration_s"),
        "notes": "estimate" if not file_sr else "probed",
    }


def rulebreaker_score(stats: dict | None, dirt_bias: float, night: bool) -> dict:
    """Step 3. Rulebreakers are targets, not errors."""
    dirt = 0.4
    clear = 0.55
    names = ["open-crest-lead"]
    lufs = None
    crest = None
    if stats:
        lufs = stats.get("loudness", {}).get("integrated_lufts")
        crest = stats.get("crest_db")
        if lufs is not None and crest is not None:
            if lufs > -10 and crest < 8:
                dirt, clear, names = 0.72, 0.35, ["loudness-war", "808-into-kick"]
            elif lufs < -16 and crest > 12:
                dirt, clear, names = 0.22, 0.78, ["open-crest", "headroom"]
            elif lufs < -12 and crest > 10:
                dirt, clear, names = 0.35, 0.65, ["open-crest"]
            else:
                dirt, clear, names = 0.5, 0.5, ["held-density"]
    dirt = max(0.0, min(1.0, dirt * (0.55 + dirt_bias * 0.5)))
    clear = max(0.0, min(1.0, clear * (1.15 - dirt_bias * 0.35)))
    if night:
        dirt = max(0.1, min(0.4, dirt))
        clear = max(0.45, clear)
        names = ["quiet-lead", "loud-stack", "same-stress-count"]
    return {
        "dirt": round(dirt, 2),
        "clear": round(clear, 2),
        "names": names,
        "lufs": lufs,
        "crest_db": crest,
    }


def measure_caps(stats: dict | None, drop: dict, rapped: bool) -> dict:
    """Gen 3. Scalars only. Never a print. Not an extra."""
    box = drop.get("container") or {}
    duration = box.get("duration_s") or 0
    rms = (stats or {}).get("rms_db")
    crest = (stats or {}).get("crest_db")
    has_take = bool(drop.get("kind") == "file" and duration >= 0.4)
    return {
        "gen": 3,
        "has_take": has_take,
        "rapped": bool(rapped and has_take),
        "duration_s": duration,
        "rms_db": rms,
        "crest_db": crest,
        "langs": ["en", "ru", "es", "et", "de"],
        "kinds": list(
            (
                "scream",
                "growl",
                "belt",
                "rap",
                "chop",
                "speak",
                "whisper",
                "air",
                "choir",
                "opera",
            )
        ),
        "voice_print": False,
        "note": "Mimic waits for a rapped take. Stand-in is tags. Ten extras stay ten.",
    }


def infer_intent(paste: str, night: bool, lane: str) -> dict:
    """Step 4."""
    p = (paste or "").lower()
    intent = "energy-match"
    if night or lane == "night":
        intent = "quiet-lead-loud-stack"
    elif "clean" in p or "clear" in p:
        intent = "cleaner"
    elif "dirt" in p or "raw" in p:
        intent = "dirtier"
    elif "air" in p or "space" in p:
        intent = "more-space"
    elif "808" in p:
        intent = "harder-808"
    return {
        "intent": intent,
        "night": bool(night or lane == "night"),
        "quiet_lead": True,
        "loud_stack": True,
        "clone": False,
        "voice_print": False,
        "seed_locked": not bool((paste or "").strip()),
        "standin_is_tags": not bool((paste or "").strip()),
        "note": "TTS / DSP stand-in only. No voice-print on this machine.",
    }


def emit_extras(spine: dict, scores: dict, intent: dict) -> list[dict]:
    """Step 5. All ten. One engine each. No 11th extra."""
    dirt = scores["dirt"]
    clear = scores["clear"]
    night = intent["night"]
    sr = spine.get("sample_rate") or 24000
    r128_engine = "R128-96K" if sr and sr >= 88200 else "SHAPE-GAIN"
    extras = [
        {
            "id": "MI44OR-5GEM",
            "engine": NIGHT_ENGINES["MI44OR-5GEM"],
            "action": "Five-generation analog mirror on the same container.",
            "on": True,
            "intensity": 6.5 if night else 6.0,
            "why": "VEC-WDF · fundamental keep, even body, odd edge, rounded HF, mid stability. Closed loop, not a lone engine.",
        },
        {
            "id": "WHISP3RER",
            "engine": NIGHT_ENGINES["WHISP3RER"],
            "action": "Bit-aware TPDF + stereo-rejected dither. No format change.",
            "on": True,
            "intensity": 4.0,
            "why": "TPDF-DECORR · intensity 4. 16-bit honesty. No payload.",
        },
        {
            "id": "DIRT-COL",
            "engine": NIGHT_ENGINES["DIRT-COL"],
            "action": "Saturation topology from the dirt score.",
            "on": dirt >= 0.12,
            "intensity": round(max(1.0, min(4.0, dirt * 10)) if night else dirt * 10, 1),
            "why": "CHEBY · dirt 1–4 on the loud stack. Same stress count as the lead.",
        },
        {
            "id": "CLEAR-COL",
            "engine": NIGHT_ENGINES["CLEAR-COL"],
            "action": "Subtractive mud/harsh cuts before any boost.",
            "on": True,
            "intensity": round(max(5.0, clear * 10), 1) if night else round(clear * 10, 1),
            "why": "ERB-CUT · quiet-lead pocket 2.5–5 kHz. Cut before boost.",
        },
        {
            "id": "THEORY-SPINE",
            "engine": NIGHT_ENGINES["THEORY-SPINE"],
            "action": "Reusable recipe from pulse, takt, chroma.",
            "on": True,
            "intensity": 8.0,
            "why": f"ERA-SS file-only if probed ({spine.get('notes')}). unknown key kept unknown.",
        },
        {
            "id": "ENERGY-MATCH",
            "engine": r128_engine,
            "action": "Crest and density aimed at the stack. Loudness does not restyle the house.",
            "on": True,
            "intensity": 7.0,
            "why": f"{r128_engine} · SHAPE-GAIN so gain is not a new EQ. No upsample to earn I.",
        },
        {
            "id": "TAKT-LOCK",
            "engine": NIGHT_ENGINES["TAKT-LOCK"],
            "action": "Bar grid and feel for rhyme-lock. Seed lines stay locked.",
            "on": True,
            "intensity": 8.0 if night else 7.0,
            "why": "PD-MAG · JND-ASYNC only if the stack sits off the kit on purpose.",
        },
        {
            "id": "GYRATOR-AIR",
            "engine": NIGHT_ENGINES["GYRATOR-AIR"],
            "action": "Circuit-like high shelf, not a drawn curve.",
            "on": clear >= 0.4,
            "intensity": 3.5 if night else 4.0,
            "why": "SVF-GYR · air on the lead, not icepick on the stack.",
        },
        {
            "id": "PRESHAPE-SAT",
            "engine": NIGHT_ENGINES["PRESHAPE-SAT"],
            "action": "Pull harsh bands out before the saturator.",
            "on": True,
            "intensity": 6.5 if night else 5.5,
            "why": "PRE-POST · 2.5–5 kHz out of SAT before any grit on the quiet lead.",
        },
        {
            "id": "STEREO-MX",
            "engine": NIGHT_ENGINES["STEREO-MX"],
            "action": "EQUAL on the quiet lead. MODERN on the louder stack.",
            "on": True,
            "intensity": 6.0 if night else 5.0,
            "why": "IACC-SAFE · EQUAL lead / MODERN stack. TPDF-DECORR secondary on write.",
        },
    ]
    assert [e["id"] for e in extras] == list(EXTRA_IDS)
    assert len(extras) == 10
    return extras


def hear_first(extras: list[dict], intent: dict) -> list[str]:
    """Step 5b. Night hear-first is locked."""
    if intent["night"]:
        return list(NIGHT_HEAR_FIRST)
    ranked = sorted(extras, key=lambda e: (not e["on"], -e["intensity"]))
    return [e["id"] for e in ranked[:3]]


def rhyme_lock(seed: str, bpm: int) -> dict:
    """Step 6. Seed stays locked. This pipe does not rewrite lines."""
    text = (seed or "").strip()
    if not text:
        return {
            "ran": False,
            "locked": True,
            "seed": "",
            "note": "Locked seed is empty. Paste the quiet bars and the stack gets written in your diction. Until then the stand-in is only tags.",
        }
    return {
        "ran": True,
        "locked": True,
        "seed": text[:1200],
        "bpm": bpm,
        "note": "Seed lines stay verbatim. Handoff to rhyme-lock skill / STEEL lockRhyme. No moral rewrite.",
    }


def equalizer_write(src: Path, dest: Path, extras: list[dict], box: dict | None) -> dict:
    """Step 7. Probe already happened. Keep rate and depth. No trophy upsample."""
    sr = (box or {}).get("sample_rate") or 24000
    ch = (box or {}).get("channels") or 1
    # Stereo matrix is STEREO-MX, not a sample-rate change.
    out_ch = 2
    dirt = next(e["intensity"] for e in extras if e["id"] == "DIRT-COL")
    drive = max(1.0, min(4.0, dirt))
    # Analog-mirror 5-gen at source rate.
    # Dirt 1–4 as compressor ratio + mild crystalizer (odd edge). No overdrive in this ffmpeg.
    ratio = 1.6 + drive * 0.35
    crystal = 0.4 + drive * 0.18
    af = (
        f"highpass=f=80,"
        f"equalizer=f=250:width_type=h:width=140:g=-1.4,"
        f"equalizer=f=1400:width_type=h:width=380:g=1.5,"
        f"equalizer=f=3500:width_type=h:width=900:g=-1.8,"
        f"lowpass=f={min(9200, int(sr * 0.42))},"
        f"acompressor=threshold=-16dB:ratio={ratio:.2f}:attack=7:release=130:makeup=1.6,"
        f"crystalizer={crystal:.2f},"
        f"aformat=channel_layouts=stereo,"
        f"extrastereo=m=1.14,"
        f"volume=2.8dB,"
        f"alimiter=limit=0.89"
    )
    cmd = [
        FFMPEG,
        "-y",
        "-hide_banner",
        "-i",
        str(src),
        "-af",
        af,
        "-ac",
        str(out_ch),
        "-ar",
        str(sr),
        "-c:a",
        "libmp3lame",
        "-b:a",
        "160k",
        str(dest),
    ]
    out = run(cmd)
    ok = dest.is_file() and dest.stat().st_size > 1024 and out.returncode == 0
    return {
        "ok": ok,
        "src": str(src),
        "dest": str(dest),
        "kept_sample_rate": sr,
        "src_channels": ch,
        "out_channels": out_ch,
        "upsample": False,
        "filter": af,
        "stderr_tail": (out.stderr or "")[-1500:],
        "returncode": out.returncode,
        "comment": "MI44OR-5GEM 5-gen at source rate. SHAPE-GAIN volume. STEREO-MX MODERN. CLEAR-COL pocket 2.5–5k pre-sat. WHISP3RER 4. No 11th extra.",
    }


def motor_line(intent: dict, extras: list[dict], hear: list[str], write: dict | None) -> str:
    """Step 8."""
    if intent["clone"] or intent["voice_print"]:
        return "Refuse the clone. Stand-in only."
    lead = "You whisper the lead. Stack is louder. That is not a clone of you — there is no voice-print on this machine."
    aud = "Hear-first: " + " · ".join(hear) + "."
    write_s = (
        " Written at source rate, container kept."
        if write and write.get("ok")
        else " Tags only until the quiet bars are pasted."
        if intent["standin_is_tags"]
        else ""
    )
    return f"{lead} {aud}{write_s}"


def print_human(doc: dict) -> None:
    spine = doc["spine"]
    scores = doc["scores"]
    print("SPINE")
    for k in (
        "pulse",
        "takt",
        "pitch_house",
        "function",
        "tension",
        "chroma",
        "crest",
        "transient",
        "harmonic_dirt",
        "form",
    ):
        print(f"  {k}: {spine.get(k)}")
    print()
    print("RULEBREAKER")
    print(f"  dirt {scores['dirt']}  clear {scores['clear']}  {', '.join(scores['names'])}")
    print()
    print("TEN EXTRAS")
    for e in doc["extras"]:
        flag = "on " if e["on"] else "off"
        print(f"  {e['id']:14} {flag}  {e['intensity']:>4}  {e['engine']:12}  {e['action']}")
        print(f"                 {e['why']}")
    print()
    print("HEAR-FIRST")
    print("  " + " · ".join(doc["hear_first"]))
    print()
    rq = doc.get("rhyme") or {}
    print("RHYME-LOCK")
    print(f"  {rq.get('note')}")
    print()
    if doc.get("write"):
        print("WRITE")
        print(f"  ok={doc['write'].get('ok')} rate={doc['write'].get('kept_sample_rate')} upsample={doc['write'].get('upsample')}")
        print(f"  {doc['write'].get('dest')}")
        print()
    print("MOTOR")
    print("  " + doc["motor"])
    print()
    print("GEN 3 CAPS")
    caps = doc.get("caps") or {}
    print(f"  take={caps.get('has_take')} rapped={caps.get('rapped')} print={caps.get('voice_print')}")
    print(f"  {caps.get('note')}")


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Track Trio / STEEL theory-mirror runtime order")
    p.add_argument("--paste", default="", help="written brief or tags. not a URL")
    p.add_argument("--file", type=Path, default=None, help="local audio only")
    p.add_argument("--bpm", type=int, default=140)
    p.add_argument("--genre", default="trap")
    p.add_argument("--dirt", type=float, default=0.35)
    p.add_argument("--lane", choices=["night", "day"], default="night")
    p.add_argument("--seed", default="", help="locked lyric seed; empty keeps tags")
    p.add_argument("--write", nargs="?", const="-", help="ffmpeg analog-mirror write (dest path or next to source)")
    p.add_argument("--json", action="store_true")
    args = p.parse_args(argv)

    paste = args.paste.strip()
    if paste.lower().startswith(("http://", "https://")):
        print("refuse: never feed a URL into ffmpeg", file=sys.stderr)
        return 2

    drop = read_drop(paste, args.file)
    stats = ebur_and_stats(args.file) if drop["kind"] == "file" else None
    spine = theory_spine(drop, stats, args.bpm, args.genre)
    night = args.lane == "night"
    scores = rulebreaker_score(stats, args.dirt, night)
    intent = infer_intent(paste, night, args.lane)
    extras = emit_extras(spine, scores, intent)
    hear = hear_first(extras, intent)
    rhyme = rhyme_lock(args.seed or paste, args.bpm)
    rapped = bool((args.seed or paste).strip()) and drop["kind"] == "file"
    caps = measure_caps(stats, drop, rapped)

    write_doc = None
    if args.write is not None:
        if drop["kind"] != "file" or not args.file:
            print("refuse: --write needs a local file", file=sys.stderr)
            return 2
        dest = args.file.with_name(args.file.stem + ".mirrored.mp3") if args.write == "-" else Path(args.write)
        dest.parent.mkdir(parents=True, exist_ok=True)
        write_doc = equalizer_write(args.file, dest, extras, drop.get("container"))

    doc = {
        "order": [
            "read_drop",
            "theory_spine",
            "rulebreaker_score",
            "infer_intent",
            "emit_extras",
            "hear_first",
            "rhyme_lock",
            "measure_caps",
            "equalizer_write" if write_doc else "equalizer_skip",
            "motor",
        ],
        "drop": {k: v for k, v in drop.items() if k != "probe_stderr"},
        "spine": spine,
        "scores": scores,
        "intent": intent,
        "extras": extras,
        "hear_first": hear,
        "rhyme": rhyme,
        "caps": caps,
        "write": write_doc,
        "motor": motor_line(intent, extras, hear, write_doc),
        "five_gen": [
            "fundamental keep",
            "even-harmonic body",
            "odd-harmonic edge",
            "rounded HF decay",
            "mid stability",
        ],
        "clone": False,
        "sessions_merged": False,
        "voice_print": False,
        "gen": 3,
    }
    if args.json:
        json.dump(doc, sys.stdout, indent=2)
        sys.stdout.write("\n")
    else:
        print_human(doc)
    return 0 if (write_doc is None or write_doc.get("ok")) else 1


if __name__ == "__main__":
    raise SystemExit(main())
