#!/usr/bin/env python3
"""Rasterize the leather-cover seal into PWA icons and a flat in-app stamp."""

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "brand" / "cover-source.jpg"
PUBLIC = ROOT / "public"

OXBLOOD = (0x82, 0x11, 0x11)
GOLD_HI = (0xC9, 0xA1, 0x5B)
GOLD_LO = (0x8C, 0x60, 0x2A)


def load_square() -> tuple[Image.Image, tuple[int, int, int]]:
    im = Image.open(SRC).convert("RGB")
    a = np.array(im)
    r = a[:, :, 0].astype(int)
    g = a[:, :, 1].astype(int)
    b = a[:, :, 2].astype(int)
    luma = a.mean(axis=2)
    leatherish = (r > g + 15) & (r > b + 15) & (luma < 210)
    goldish = (r > 90) & (g > 60) & (b < r * 0.7) & (luma < 220) & (r > b + 20)
    book = leatherish | goldish
    ys, xs = np.where(book)
    x0, x1 = int(xs.min()), int(xs.max())
    y0, y1 = int(ys.min()), int(ys.max())
    side = min(x1 - x0, y1 - y0)
    cx = (x0 + x1) / 2
    cy = (y0 + y1) / 2 - (y1 - y0) * 0.015
    left = int(round(cx - side / 2))
    top = int(round(cy - side / 2))
    left = max(0, min(left, a.shape[1] - side))
    top = max(0, min(top, a.shape[0] - side))
    crop = a[top : top + side, left : left + side].copy()
    lh, lw = crop.shape[:2]
    patch = crop[int(lh * 0.42) : int(lh * 0.58), int(lw * 0.16) : int(lw * 0.30)]
    leather = tuple(int(x) for x in np.median(patch.reshape(-1, 3), axis=0))
    paper = (crop[:, :, 0] > 236) & (crop[:, :, 1] > 236) & (crop[:, :, 2] > 236)
    crop[paper] = leather
    return Image.fromarray(crop), leather


def _morph(mask: np.ndarray, max_k: int, min_k: int, max_k2: int) -> np.ndarray:
    img = Image.fromarray((mask.astype(np.uint8) * 255))
    if max_k:
        img = img.filter(ImageFilter.MaxFilter(max_k))
    if min_k:
        img = img.filter(ImageFilter.MinFilter(min_k))
    if max_k2:
        img = img.filter(ImageFilter.MaxFilter(max_k2))
    return np.array(img) > 127


def stamp(master: Image.Image, size: int) -> Image.Image:
    """Oxblood tile + gold TL-cross. For the top bar, not the home screen."""
    a = np.array(master)
    h, w = a.shape[:2]
    z = 0.50
    m = int(h * (1 - z) / 2)
    inner = a[m : h - m, m : w - m].copy().astype(np.float32)
    rr, gg, bb = inner[:, :, 0], inner[:, :, 1], inner[:, :, 2]
    lu = inner.mean(axis=2)
    gold = (lu > 72) & (rr > bb + 20) & (gg > 44)
    gold = _morph(gold, 3, 5, 3)

    ox = np.array(OXBLOOD, dtype=np.float32)
    hi = np.array(GOLD_HI, dtype=np.float32)
    lo = np.array(GOLD_LO, dtype=np.float32)
    field_lu = np.median(lu[~gold]) if (~gold).any() else 40
    grain = np.clip((lu - field_lu) / 90.0, -0.18, 0.18)
    field = ox[None, None, :] + grain[:, :, None] * np.array([22.0, 6.0, 5.0])
    field = np.clip(field, 0, 255)

    if gold.any():
        gmin, gmax = np.percentile(lu[gold], [10, 90])
        t = np.clip((lu - gmin) / max(gmax - gmin, 1), 0, 1)
        foil = lo[None, None, :] * (1 - t[:, :, None]) + hi[None, None, :] * t[:, :, None]
        foil = hi[None, None, :] * 0.4 + foil * 0.6
    else:
        foil = hi[None, None, :] * np.ones_like(inner)

    out = np.where(gold[:, :, None], foil, field).astype(np.uint8)
    im = Image.fromarray(out)
    im = im.filter(ImageFilter.GaussianBlur(0.45))
    im = im.resize((size, size), Image.Resampling.LANCZOS)
    if size <= 192:
        im = im.filter(ImageFilter.UnsharpMask(radius=0.9, percent=85, threshold=3))
    return im


def fit(master: Image.Image, leather: tuple[int, int, int], size: int, pad: float = 0.0) -> Image.Image:
    canvas = Image.new("RGB", (size, size), leather)
    inner = max(1, int(round(size * (1 - 2 * pad))))
    img = master.resize((inner, inner), Image.Resampling.LANCZOS)
    if size <= 192:
        img = img.filter(ImageFilter.UnsharpMask(radius=1.05, percent=120, threshold=2))
    ox = (size - inner) // 2
    canvas.paste(img, (ox, ox))
    return canvas


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"missing {SRC}")
    master, leather = load_square()
    PUBLIC.mkdir(exist_ok=True)
    (PUBLIC / "__grok").mkdir(exist_ok=True)
    stamp(master, 192).save(PUBLIC / "seal.png", "PNG", optimize=True)
    print("wrote", PUBLIC / "seal.png")
    jobs = [
        (512, 0.0, PUBLIC / "icon-512.png"),
        (192, 0.0, PUBLIC / "icon-192.png"),
        (180, 0.0, PUBLIC / "apple-touch-icon.png"),
        (180, 0.0, PUBLIC / "__grok" / "icon-180.png"),
        (512, 0.14, PUBLIC / "icon-512-maskable.png"),
    ]
    for size, pad, path in jobs:
        fit(master, leather, size, pad).save(path, "PNG", optimize=True)
        print("wrote", path)
    stamp(master, 32).save(PUBLIC / "favicon.png", "PNG", optimize=True)
    stamp(master, 48).save(PUBLIC / "favicon-48.png", "PNG", optimize=True)
    print("wrote", PUBLIC / "favicon.png")


if __name__ == "__main__":
    main()
