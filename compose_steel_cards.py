#!/usr/bin/env python3
"""Compose STEEL og.jpg (1200x630) and x-banner.jpg (1200x264) — editorial desk, exact type."""
from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

PAPER = (17, 18, 16)
RAISED = (26, 27, 24)
INK = (232, 228, 216)
MUTED = (141, 138, 126)
FAINT = (106, 103, 94)
RULE = (44, 45, 40)
STAMP = (196, 92, 74)
SAGE = (106, 165, 111)
STEEL = (154, 167, 176)

NARROW_B = "/usr/share/fonts/truetype/liberation/LiberationSansNarrow-Bold.ttf"
NARROW = "/usr/share/fonts/truetype/liberation/LiberationSansNarrow-Regular.ttf"
SANS = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
SANS_B = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def fill(im: Image.Image, color: tuple[int, int, int]) -> None:
    ImageDraw.Draw(im).rectangle((0, 0, im.width, im.height), fill=color)


def grain(im: Image.Image, amount: int = 8) -> Image.Image:
    import hashlib

    noise = Image.new("RGB", im.size)
    px = noise.load()
    w, h = im.size
    seed = hashlib.sha256(b"steel-og-v2").digest()
    n = 0
    for y in range(h):
        for x in range(w):
            v = seed[n % 32] ^ ((x * 13 + y * 31) & 255)
            n += 1
            g = v % (amount * 2 + 1) - amount
            px[x, y] = (g + 128, g + 128, g + 128)
    return Image.blend(im, noise, 0.035)


def ring(draw: ImageDraw.ImageDraw, cx: int, cy: int, r: float, color, width: int, start=0.0, end=360.0, steps=220) -> None:
    pts: list[tuple[float, float]] = []
    span = end - start
    for i in range(steps + 1):
        a = math.radians(start + span * i / steps)
        pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    if len(pts) > 1:
        draw.line(pts, fill=color, width=width, joint="curve")


def knob(draw: ImageDraw.ImageDraw, x: int, y: int, r: int, tick: float) -> None:
    draw.ellipse((x - r, y - r, x + r, y + r), fill=(32, 33, 30), outline=RULE, width=2)
    draw.ellipse((x - r + 4, y - r + 3, x + r - 6, y + r - 5), outline=(58, 59, 52), width=1)
    a = math.radians(tick)
    x2 = x + (r - 5) * math.cos(a)
    y2 = y + (r - 5) * math.sin(a)
    draw.line((x, y, x2, y2), fill=STEEL, width=2)
    draw.ellipse((x - 2, y - 2, x + 2, y + 2), fill=SAGE)


def waveform(draw: ImageDraw.ImageDraw, x0: int, x1: int, y: int, amp: int, color, width=2) -> None:
    pts = []
    for x in range(x0, x1, 2):
        t = (x - x0) / max(1, x1 - x0)
        s = math.sin(t * math.pi * 9.5) * math.exp(-((t - 0.5) ** 2) * 6)
        s += 0.28 * math.sin(t * math.pi * 28)
        pts.append((x, y + s * amp))
    draw.line(pts, fill=color, width=width, joint="curve")


def compose_og() -> Image.Image:
    w, h = 1200, 630
    im = Image.new("RGB", (w, h), PAPER)
    d = ImageDraw.Draw(im)
    # desk rails
    d.rectangle((48, 48, w - 48, h - 48), outline=RULE, width=2)
    d.rectangle((48, 48, w - 48, 78), fill=RAISED)
    d.rectangle((48, h - 78, w - 48, h - 48), fill=RAISED)
    # live pip
    d.ellipse((w - 86, 56, w - 66, 76), fill=SAGE)
    d.text((64, 56), "KERNEL  3.5", font=font(NARROW, 16), fill=FAINT)
    # phosphor ring, behind title
    glow = Image.new("RGB", (w, h), PAPER)
    gd = ImageDraw.Draw(glow)
    cx, cy = w // 2, h // 2 + 8
    for rad, col, wd in (
        (196, (42, 70, 48), 18),
        (168, SAGE, 5),
        (142, (72, 118, 78), 3),
    ):
        ring(gd, cx, cy, rad, col, wd, start=-18, end=342)
    glow = glow.filter(ImageFilter.GaussianBlur(6))
    im = Image.blend(im, glow, 0.55)
    d = ImageDraw.Draw(im)
    ring(d, cx, cy, 168, SAGE, 3, start=-22, end=338)
    ring(d, cx, cy, 148, (80, 90, 78), 1, start=40, end=300)
    waveform(d, cx - 150, cx + 150, cy + 4, 28, INK, 2)
    # knobs under lockup, inside rails
    for i, tick in enumerate((-70, -20, 40, 110, 160, 210)):
        knob(d, 210 + i * 156, 528, 18, tick)
    # stamp
    d.ellipse((92, 470, 168, 546), outline=STAMP, width=2)
    d.text((100, 496), "ATTEST", font=font(NARROW_B, 14), fill=STAMP)
    # lockup — centered, generous margins
    title = "STEEL"
    tf = font(NARROW_B, 128)
    bb = d.textbbox((0, 0), title, font=tf)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    tx = (w - tw) // 2
    ty = (h - th) // 2 - 36
    d.text((tx, ty), title, font=tf, fill=INK)
    tag = "PULT  ·  AURA  ·  ATTEST"
    sf = font(NARROW, 22)
    sb = d.textbbox((0, 0), tag, font=sf)
    sw = sb[2] - sb[0]
    d.text(((w - sw) // 2, ty + th + 18), tag, font=sf, fill=MUTED)
    return grain(im)


def compose_banner() -> Image.Image:
    w, h = 1200, 264
    im = Image.new("RGB", (w, h), PAPER)
    d = ImageDraw.Draw(im)
    d.rectangle((24, 20, w - 24, h - 20), outline=RULE, width=2)
    d.rectangle((24, 20, w - 24, 44), fill=RAISED)
    d.ellipse((w - 56, 24, w - 40, 40), fill=SAGE)
    d.text((36, 24), "KERNEL", font=font(NARROW, 13), fill=FAINT)
    # scenery on the right half
    glow = Image.new("RGB", (w, h), PAPER)
    gd = ImageDraw.Draw(glow)
    cx, cy = 860, 138
    ring(gd, cx, cy, 92, (42, 70, 48), 14, start=-30, end=300)
    ring(gd, cx, cy, 78, SAGE, 4, start=-30, end=300)
    glow = glow.filter(ImageFilter.GaussianBlur(5))
    im = Image.blend(im, glow, 0.5)
    d = ImageDraw.Draw(im)
    ring(d, cx, cy, 78, SAGE, 3, start=-28, end=305)
    waveform(d, 720, 1080, 138, 22, INK, 2)
    for i, tick in enumerate((-50, 20, 90, 150)):
        knob(d, 640 + i * 70, 208, 14, tick)
    # lockup: left half, above midline (132), not in bottom fifth
    title = "STEEL"
    tf = font(NARROW_B, 72)
    d.text((48, 58), title, font=tf, fill=INK)
    tag = "PULT  ·  AURA  ·  ATTEST"
    d.text((52, 138), tag, font=font(NARROW, 18), fill=MUTED)
    return grain(im, 6)


def main() -> None:
    out = Path("/workspace/.grok")
    compose_og().save(out / "og.png")
    compose_banner().save(out / "x-banner.png")
    print("wrote pngs")


if __name__ == "__main__":
    main()
