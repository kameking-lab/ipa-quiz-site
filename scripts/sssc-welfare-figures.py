"""Crop the official figures used as answer choices (介護福祉士 第38回 問題49).

Usage: py -3.12 scripts/sssc-welfare-figures.py --cache DIR
Writes PNGs under public/questions/kaigo/2025-annual/ and prints their SHA-256.
Clip rectangles are PDF points on k_am_06_38.pdf page 6 (printed page 27); the
choice numbers printed above each drawing are excluded because the quiz shows them.
"""
from __future__ import annotations

import argparse
import hashlib
from pathlib import Path

import fitz

CLIPS = {
    1: (90.19, 393.87, 212.08, 483.41),
    2: (244.20, 393.87, 366.08, 483.41),
    3: (398.20, 393.87, 520.08, 483.41),
    4: (90.19, 530.91, 212.08, 620.45),
    5: (244.20, 530.91, 366.08, 620.45),
}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--cache", required=True)
    args = parser.parse_args()
    page = fitz.open(Path(args.cache) / "kaigo38/k_am_06_38.pdf")[5]
    out = Path("public/questions/kaigo/2025-annual")
    out.mkdir(parents=True, exist_ok=True)
    for number, rect in CLIPS.items():
        target = out / f"q49-choice{number}.png"
        page.get_pixmap(dpi=200, clip=fitz.Rect(*rect)).save(target)
        print(target.as_posix(), hashlib.sha256(target.read_bytes()).hexdigest())


if __name__ == "__main__":
    main()
