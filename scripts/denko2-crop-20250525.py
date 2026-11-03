"""Render only the official 2025 upper academic figures and choice photos.

Question wording and choices remain transcribed text in reviewed JSON. These
coordinates are pixels in the 2x original-PDF row PNGs; the source hash is
checked before regenerating any public image.
"""

from hashlib import sha256
import json
from pathlib import Path

import fitz
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts/denko2-source-manifest.json"
CACHE = ROOT / "data/raw_pdfs/denko2"
ROWS = CACHE / "review/20250525"
OUTPUT = ROOT / "public/images/denko2/2025-first"

FIGURES = {
    1: (125, 114, 480, 285),
    4: (55, 150, 480, 345),
    5: (20, 70, 480, 450),
    6: (20, 245, 480, 705),
    7: (20, 100, 480, 390),
    9: (20, 150, 480, 370),
    16: (70, 48, 480, 280),
    17: (70, 55, 480, 400),
    18: (70, 50, 480, 370),
    27: (170, 125, 325, 190),
}
CHOICE_COLUMNS = ((310, 520), (535, 740), (752, 958), (972, 1190))
CHOICE_ROWS = {
    10: (75, 275),
    25: None,
    41: (5, 405),
    42: (5, 475),
    43: (5, 272),
    44: (5, 230),
    45: (5, 275),
    46: (5, 230),
    47: (5, 328),
    48: (5, 360),
    49: (5, 265),
    50: (5, 495),
}


def crop(source: Image.Image, bounds: tuple[int, int, int, int], name: str) -> None:
    left, top, right, bottom = bounds
    if not (0 <= left < right <= source.width and 0 <= top < bottom <= source.height):
        raise ValueError(f"Outside source: {name}: {bounds} / {source.size}")
    source.crop(bounds).save(OUTPUT / name)


def main() -> None:
    paper = next(item for item in json.loads(MANIFEST.read_text(encoding="utf-8"))["papers"]
                 if item["date"] == "2025-05-25")
    pdf_path = CACHE / "20250525_q01.pdf"
    if sha256(pdf_path.read_bytes()).hexdigest() != paper["questionSha256"]:
        raise ValueError("2025-05-25 official question PDF SHA mismatch")
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for number, bounds in FIGURES.items():
        with Image.open(ROWS / f"q{number:02}.png") as source:
            crop(source, bounds, f"q{number}.png")
    for number, vertical in CHOICE_ROWS.items():
        with Image.open(ROWS / f"q{number:02}.png") as source:
            for label, (left, right) in zip(("i", "ro", "ha", "ni"), CHOICE_COLUMNS):
                if number == 10:
                    bounds = {
                        "i": (505, 75, 675, 275),
                        "ro": (680, 75, 850, 275),
                        "ha": (855, 75, 1025, 275),
                        "ni": (1030, 75, 1195, 275),
                    }[label]
                elif number == 25:
                    bounds = {
                        "i": (505, 20, 835, 210),
                        "ro": (870, 20, 1195, 210),
                        "ha": (505, 252, 835, 440),
                        "ni": (870, 252, 1195, 440),
                    }[label]
                else:
                    top, bottom = vertical
                    bounds = (left, top, right, bottom)
                crop(source, bounds, f"q{number}-{label}.png")
    page = fitz.open(pdf_path)[14]
    pixmap = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    original = Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)
    crop(original, (110, 145, 1375, 1980), "wiring-main.png")
    print(f"Rendered {len(FIGURES)} stem figures, {len(CHOICE_ROWS) * 4} choice figures and shared wiring diagram")


if __name__ == "__main__":
    main()
