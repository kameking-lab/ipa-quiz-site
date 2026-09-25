"""Crop the three official figures (tables / family diagram) of FP2 2026年5月公表 Q11-60 to webp."""

from __future__ import annotations

import io
import json
from pathlib import Path

import pymupdf
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
PDF = ROOT / ".cache" / "fp2-official" / "g2_202605_qa.pdf"
EXTRACTION = ROOT / "docs" / "evidence" / "fp2-2026-may" / "extraction.json"
OUT = ROOT / "public" / "fp2" / "academic" / "202605"
RECEIPT = ROOT / "data" / "questions" / "fp2" / "academic-figures-2026-may.json"

# (question, top anchor, bottom anchor) — the crop spans the anchor lines, not the whole page.
FIGURES = [
    (14, "〈資料〉所得税における生命保険料控除", "1) ８万円"),
    (55, "〈親族関係図〉", "1) 4,200万円"),
    (59, "宅地等の区分", "1) （ア）400"),
]


def anchor(page: pymupdf.Page, text: str, last: bool = False) -> pymupdf.Rect:
    hits = page.search_for(text)
    if not hits:
        raise ValueError(f"anchor not found on page {page.number + 1}: {text}")
    return hits[-1] if last else hits[0]


def main() -> None:
    doc = pymupdf.open(PDF)
    pages = {q["number"]: q["sourcePage"] for q in json.loads(EXTRACTION.read_text(encoding="utf-8"))["questions"]}
    OUT.mkdir(parents=True, exist_ok=True)
    receipt: dict[str, list[dict]] = {}
    for number, top_text, bottom_text in FIGURES:
        page = doc[pages[number] - 1]
        top = anchor(page, top_text, last=True)  # the stem may name the figure first
        bottom = anchor(page, bottom_text)
        clip = pymupdf.Rect(48, top.y0 - 4, page.rect.width - 48, bottom.y0 - 6)
        pix = page.get_pixmap(matrix=pymupdf.Matrix(2, 2), clip=clip, alpha=False)
        image = Image.open(io.BytesIO(pix.tobytes("png")))
        name = f"q{number:02d}-1.webp"
        image.save(OUT / name, "WEBP", quality=86, method=6)
        receipt[str(number)] = [{"url": f"/fp2/academic/202605/{name}", "pdfPage": pages[number],
                                 "width": image.width, "height": image.height}]
    RECEIPT.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(len(receipt), "figures rendered")


if __name__ == "__main__":
    main()
