"""Crop only required official figures. Usage: python ... /path/to/pdfs 1

Coordinates are in each original PDF's points, not rendered pixels.
"""
import sys
from pathlib import Path

import pdfplumber

root = Path(sys.argv[1])
rank = int(sys.argv[2])
figures = {
    1: [
        ("R6ACGZ-W.pdf", 2, (220, 280, 490, 440), "2024-gakushiki-q2-diagram"),
        ("R6ACGZ-W.pdf", 3, (385, 275, 615, 550), "2024-gakushiki-q3-diagram"),
        ("R7ACGZ-W.pdf", 2, (95, 265, 505, 435), "2025-gakushiki-q2-diagram"),
        ("R7ACGZ-W.pdf", 4, (70, 145, 535, 325), "2025-gakushiki-q4-table"),
        ("R6fy_03.pdf", 1, (120, 125, 490, 310), "2024-gakushiki-q2-answer-diagram"),
        ("R6ACGZK-W.pdf", 4, (205, 220, 540, 435), "2024-gakushiki-q2-blank-chart"),
    ],
    2: [
        ("R6ACHZ-W.pdf", 1, (175, 225, 535, 500), "2024-second-gakushiki-q1-chart"),
        ("R7ACHZ-W.pdf", 1, (120, 120, 480, 355), "2025-second-gakushiki-q1-chart"),
    ],
}
out = Path("public/questions/khk-reito")
out.mkdir(exist_ok=True)
for filename, page, bbox, name in figures[rank]:
    with pdfplumber.open(root / filename) as pdf:
        pdf.pages[page].crop(bbox).to_image(resolution=180, antialias=True).save(out / (name + ".png"))
