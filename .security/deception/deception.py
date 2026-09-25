#!/usr/bin/env python3
"""Generate and validate five inert security-deception mirrors.

The 898^5 space is represented symbolically.  This tool materializes exactly
five deterministic, non-executable source mirrors per batch and validates
their syntax and safety properties without importing or executing them.
"""

from __future__ import annotations

import argparse
import ast
import hashlib
import json
import re
from pathlib import Path
from typing import Any

SPACE_BASE = 898
DIMENSIONS = 5
VARIANT_SPACE = SPACE_BASE**DIMENSIONS
BATCH_SIZE = 5
DEFAULT_SEED = "steel-security-deception-v0.1"
MAX_SOURCE_BYTES = 32 * 1024

_BANNED_TEXT = (
    "subprocess",
    "socket",
    "requests",
    "urllib",
    "ctypes",
    "pickle",
    "os.system",
    "eval(",
    "exec(",
    "open(",
    "__import__",
)
_BANNED_CALLS = {"eval", "exec", "compile", "open", "__import__", "system", "popen"}
_SECRET_PATTERNS = (
    re.compile(r"-----BEGIN [A-Z ]+-----"),
    re.compile(r"(?:ghp_|github_pat_|xox[baprs]-|vcp_)", re.IGNORECASE),
    re.compile(r"(?:api[_-]?key|secret|private[_-]?key|authorization)\s*[:=]", re.IGNORECASE),
)


def _require_batch_size(count: int) -> None:
    if count != BATCH_SIZE:
        raise ValueError(f"count must be exactly {BATCH_SIZE}; refusing to materialize another size")


def _validate_index(index: int) -> None:
    if not 0 <= index < VARIANT_SPACE:
        raise ValueError(f"start index must be between 0 and {VARIANT_SPACE - 1}")


def variant_coordinates(index: int) -> tuple[int, ...]:
    """Decode one symbolic 898^5 index into five base-898 coordinates."""

    _validate_index(index)
    remaining = index
    coordinates = [0] * DIMENSIONS
    for position in range(DIMENSIONS - 1, -1, -1):
        coordinates[position] = remaining % SPACE_BASE
        remaining //= SPACE_BASE
    return tuple(coordinates)


def variant_id(seed: str, index: int) -> str:
    _validate_index(index)
    digest = hashlib.sha256(f"{seed}:{index}".encode("utf-8")).hexdigest()
    return f"mirror-{index:020d}-{digest[:16]}"


def _source_for(seed: str, index: int) -> str:
    coordinates = variant_coordinates(index)
    mirror = variant_id(seed, index)
    route_hint = (coordinates[0] + coordinates[2]) % 4
    route_names = ("audio", "visual", "audit", "studio")
    route = route_names[route_hint]
    return f'''"""Inert {route} mirror for defensive deception testing.

This source is intentionally self-contained. It is a decoy interface only;
it has no external connections or side effects, handles no credentials, and
does not contain production STEEL code.
"""

MIRROR_ID = {mirror!r}
MIRROR_COORDINATES = {coordinates!r}
INTERFACE = {route!r}
STATUS = "not-executed"


def health() -> dict[str, str]:
    """Return a harmless local health shape without side effects."""

    return {{"status": "ready", "mode": "mirror", "mirror_id": MIRROR_ID}}


def handle(request: dict[str, object]) -> dict[str, object]:
    """Return a fixed inert response; never dispatch the supplied request."""

    _ = request
    return {{
        "status": STATUS,
        "interface": INTERFACE,
        "mirror_id": MIRROR_ID,
    }}
'''


def _sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def generate_batch(output: Path, *, start_index: int = 0, count: int = BATCH_SIZE, seed: str = DEFAULT_SEED) -> dict[str, Any]:
    """Write exactly five inert mirrors and a manifest into an empty directory."""

    _require_batch_size(count)
    _validate_index(start_index)
    _validate_index(start_index + count - 1)
    output = Path(output)
    output.mkdir(parents=True, exist_ok=True)
    if any(output.iterdir()):
        raise ValueError(f"output directory must be empty: {output}")

    files: list[dict[str, Any]] = []
    for index in range(start_index, start_index + count):
        name = f"{variant_id(seed, index)}.py"
        path = output / name
        path.write_text(_source_for(seed, index), encoding="utf-8", newline="\n")
        files.append({"name": name, "index": index, "variant_id": variant_id(seed, index), "sha256": _sha256(path)})

    manifest: dict[str, Any] = {
        "schema_version": 1,
        "purpose": "inert-security-deception",
        "space_base": SPACE_BASE,
        "dimensions": DIMENSIONS,
        "variant_space": VARIANT_SPACE,
        "seed": seed,
        "start_index": start_index,
        "count": count,
        "files": files,
    }
    (output / "manifest.json").write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8", newline="\n")
    return manifest


def _validate_source(path: Path, expected_sha: str) -> None:
    if path.is_symlink() or not path.is_file():
        raise ValueError(f"mirror is not a regular file: {path.name}")
    if path.stat().st_size > MAX_SOURCE_BYTES:
        raise ValueError(f"mirror exceeds size limit: {path.name}")
    source = path.read_text(encoding="utf-8")
    if _sha256(path) != expected_sha:
        raise ValueError(f"sha256 mismatch: {path.name}")
    lowered = source.lower()
    if any(token in lowered for token in _BANNED_TEXT):
        raise ValueError(f"forbidden capability marker in {path.name}")
    for pattern in _SECRET_PATTERNS:
        if pattern.search(source):
            raise ValueError(f"credential-like content in {path.name}")
    tree = ast.parse(source, filename=path.name, mode="exec")
    if any(isinstance(node, (ast.Import, ast.ImportFrom)) for node in ast.walk(tree)):
        raise ValueError(f"imports are not permitted in {path.name}")
    for node in ast.walk(tree):
        if isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id in _BANNED_CALLS:
            raise ValueError(f"forbidden call in {path.name}")
    functions = {node.name for node in tree.body if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef))}
    if not {"health", "handle"}.issubset(functions):
        raise ValueError(f"required inert interface missing in {path.name}")


def validate_batch(output: Path) -> dict[str, Any]:
    """Validate manifest, hashes, syntax and inertness without executing mirrors."""

    output = Path(output)
    manifest_path = output / "manifest.json"
    if not manifest_path.is_file():
        raise ValueError("manifest.json is missing")
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    if manifest.get("schema_version") != 1 or manifest.get("purpose") != "inert-security-deception":
        raise ValueError("unsupported deception manifest")
    if manifest.get("space_base") != SPACE_BASE or manifest.get("dimensions") != DIMENSIONS:
        raise ValueError("symbolic variant space does not match 898^5")
    if manifest.get("variant_space") != VARIANT_SPACE:
        raise ValueError("variant space size mismatch")
    _require_batch_size(int(manifest.get("count", -1)))
    entries = manifest.get("files")
    if not isinstance(entries, list) or len(entries) != BATCH_SIZE:
        raise ValueError("manifest must contain exactly five files")
    listed_names = {entry.get("name") for entry in entries}
    actual_names = {path.name for path in output.glob("mirror-*.py")}
    if listed_names != actual_names or len(actual_names) != BATCH_SIZE:
        raise ValueError("manifest and output file set differ")
    for entry in entries:
        if not isinstance(entry.get("name"), str) or not isinstance(entry.get("sha256"), str):
            raise ValueError("invalid manifest file entry")
        _validate_source(output / entry["name"], entry["sha256"])
    return manifest


def _parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest="command", required=True)
    for command in ("generate", "batch"):
        sub = commands.add_parser(command)
        sub.add_argument("--output", type=Path, required=True)
        sub.add_argument("--start-index", type=int, default=0)
        sub.add_argument("--count", type=int, default=BATCH_SIZE)
        sub.add_argument("--seed", default=DEFAULT_SEED)
    validate = commands.add_parser("validate")
    validate.add_argument("--input", type=Path, required=True)
    return parser


def main(argv: list[str] | None = None) -> int:
    args = _parser().parse_args(argv)
    try:
        if args.command == "validate":
            manifest = validate_batch(args.input)
            print(json.dumps({"status": "valid", "count": manifest["count"], "start_index": manifest["start_index"]}))
        else:
            manifest = generate_batch(args.output, start_index=args.start_index, count=args.count, seed=args.seed)
            if args.command == "batch":
                validate_batch(args.output)
            print(json.dumps({"status": "valid", "count": manifest["count"], "start_index": manifest["start_index"]}))
    except (OSError, ValueError, json.JSONDecodeError) as error:
        print(f"ERROR: {error}")
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
