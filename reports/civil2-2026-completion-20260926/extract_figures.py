"""Crop official vector diagrams from the SHA-pinned problem PDF.

Coordinates are page points and were checked against rendered official pages.
"""

from __future__ import annotations

import hashlib
from pathlib import Path

import fitz

PDF = Path(r"C:\Users\kanet\20260522\note-automation\tmp\pdfs\20260608d_mondai.pdf")
EXPECTED = "CF69CAA81A9F411513B9B763B61C21A15B43F327E220BB5FF3F336C0A6BA0792"
assert hashlib.sha256(PDF.read_bytes()).hexdigest().upper() == EXPECTED
doc = fitz.open(PDF)
root = Path(__file__).resolve().parents[2]
output = root / "public" / "questions" / "civil2" / "2026-early"
output.mkdir(parents=True, exist_ok=True)
figures = {
    1: (1, (120, 150, 470, 320)),
    2: (2, (125, 92, 530, 300)),
    3: (3, (70, 105, 500, 565)),
    4: (4, (130, 100, 485, 255)),
    5: (4, (195, 460, 470, 540)),
    48: (16, (205, 200, 455, 500)),
    50: (17, (185, 315, 450, 605)),
    62: (22, (150, 382, 485, 558)),
}
for number, (page_index, rect) in figures.items():
    pix = doc[page_index].get_pixmap(matrix=fitz.Matrix(2, 2), clip=fitz.Rect(rect), alpha=False)
    path = output / f"q{number}-official-figure.png"
    pix.save(path)
    print(number, path.stat().st_size, hashlib.sha256(path.read_bytes()).hexdigest().upper())
