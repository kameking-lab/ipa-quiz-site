"""Crop only circuit diagrams from the official 2026 first-term paper.

Usage: python scripts/crop-denko2-figures.py path/to/official-questions.pdf
The coordinates refer to the 946x1340 review render and are converted to PDF units.
"""

from pathlib import Path
import sys
import fitz


REVIEW_WIDTH = 946
REVIEW_HEIGHT = 1340
CROPS = {
    "q1": (4, (145, 256, 382, 361)),
    "q4": (4, (160, 805, 382, 915)),
    "q5": (4, (171, 1035, 391, 1213)),
    "q6": (5, (132, 254, 390, 378)),
    "q7": (5, (125, 583, 370, 772)),
    "q9": (5, (127, 1071, 390, 1190)),
    "q10-a": (6, (404, 149, 504, 260)),
    "q10-b": (6, (511, 149, 617, 260)),
    "q10-c": (6, (622, 149, 730, 260)),
    "q10-d": (6, (735, 149, 855, 260)),
}


def main() -> None:
    document = fitz.open(sys.argv[1])
    output = Path(__file__).resolve().parents[1] / "public/images/denko2/2026-first"
    output.mkdir(parents=True, exist_ok=True)
    for name, (index, (x0, y0, x1, y1)) in CROPS.items():
        page = document[index]
        rect = fitz.Rect(
            x0 * page.rect.width / REVIEW_WIDTH,
            y0 * page.rect.height / REVIEW_HEIGHT,
            x1 * page.rect.width / REVIEW_WIDTH,
            y1 * page.rect.height / REVIEW_HEIGHT,
        )
        page.get_pixmap(matrix=fitz.Matrix(3, 3), clip=rect, alpha=False).save(
            output / f"{name}.png"
        )


if __name__ == "__main__":
    main()
