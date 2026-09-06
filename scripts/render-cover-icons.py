#!/usr/bin/env python3
"""Rasterize the leather-cover seal into PWA / iOS / Android / in-app icons."""

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "brand" / "cover-source.jpg"
PUBLIC = ROOT / "public"


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
    jobs = [
        (192, 0.0, PUBLIC / "seal.png"),
        (512, 0.0, PUBLIC / "icon-512.png"),
        (192, 0.0, PUBLIC / "icon-192.png"),
        (180, 0.0, PUBLIC / "apple-touch-icon.png"),
        (180, 0.0, PUBLIC / "__grok" / "icon-180.png"),
        (512, 0.14, PUBLIC / "icon-512-maskable.png"),
        (32, 0.0, PUBLIC / "favicon.png"),
        (48, 0.0, PUBLIC / "favicon-48.png"),
    ]
    for size, pad, path in jobs:
        fit(master, leather, size, pad).save(path, "PNG", optimize=True)
        print("wrote", path)


if __name__ == "__main__":
    main()
