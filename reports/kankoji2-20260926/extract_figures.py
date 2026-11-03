"""Crop official figures from the SHA-pinned 2級管工事 question PDFs.

Clip rectangles are PDF points, checked against 2x renders of the official pages.
Usage: python extract_figures.py <dir-with-official-pdfs>
"""

from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

import fitz

SOURCES = {
    "2026-early": ("20260608k_mondai.pdf", "7E473038142BDB7EFAFDE7089D7C74A3D66D51286D812E44F2261C9EFBAD29B3",
                   {8: (3, (195, 390, 440, 575)), 30: (10, (180, 368, 450, 512))}),
    "2025-late": ("20251117k_mondaia.pdf", "E5101AFE8E76B244CA914EEA72BCADD409C1315556266891E644559F4757D14A",
                  {3: (2, (210, 120, 445, 265)), 8: (4, (225, 355, 445, 505)), 30: (11, (125, 395, 405, 545))}),
}
root = Path(__file__).resolve().parents[2]
pdf_dir = Path(sys.argv[1])
ledger = []
for edition, (name, sha, figures) in SOURCES.items():
    data = (pdf_dir / name).read_bytes()
    assert hashlib.sha256(data).hexdigest().upper() == sha, name
    doc = fitz.open(stream=data, filetype="pdf")
    out = root / "public" / "questions" / "kankoji2" / edition
    out.mkdir(parents=True, exist_ok=True)
    for number, (page_index, rect) in figures.items():
        pix = doc[page_index].get_pixmap(matrix=fitz.Matrix(2, 2), clip=fitz.Rect(rect), alpha=False)
        path = out / f"q{number}-official-figure.png"
        pix.save(path)
        ledger.append({"edition": edition, "number": number, "sourcePdfPage": page_index + 1, "clipRectPdfPoints": list(rect),
                       "publicPath": f"/questions/kankoji2/{edition}/q{number}-official-figure.png",
                       "sha256": hashlib.sha256(path.read_bytes()).hexdigest()})
(Path(__file__).resolve().parent / "figures.json").write_text(json.dumps(ledger, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps(ledger, ensure_ascii=False))
