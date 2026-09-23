"""Render only official academic diagrams and tables as text supplements."""

from __future__ import annotations

import io
import json
from pathlib import Path

import fitz
from PIL import Image
from fp2_render_practical import visual_regions


ROOT = Path(__file__).resolve().parents[1]
SOURCE = json.loads((ROOT / "docs" / "evidence" / "fp2-two-year" / "gakka-extraction.json").read_text(encoding="utf-8"))
OUT = ROOT / "public" / "fp2" / "academic"
RECEIPT = ROOT / "data" / "questions" / "fp2" / "academic-figures-2024-2025.json"
FIGURE_NUMBERS = {
    "202405": [26, 29, 53],
    "202409": [25, 27],
    "202501": [26],
    "202505": [10, 28],
}


def heading_rect(page: fitz.Page, number: int, paper: bool):
    if paper:
        digit = "".join(chr(ord("０") + int(c)) for c in str(number))
        matches = page.search_for(f"問題 {digit}")
    else:
        matches = page.search_for(f"問{number}")
    return matches[0] if matches else None


def main() -> None:
    receipt = {}
    for edition, numbers in FIGURE_NUMBERS.items():
        paper = edition != "202505"
        path = ROOT / ".cache" / "fp2-official" / f"g2_{edition}_{'q' if paper else 'qa'}.pdf"
        doc = fitz.open(path)
        rows = SOURCE[edition]["questions"]
        edition_receipt = {}
        for number in numbers:
            start_page = rows[number - 1]["sourcePage"] - 1
            next_page = rows[number]["sourcePage"] - 1
            panels = []
            for page_index in range(start_page, next_page + 1):
                page = doc[page_index]
                start_rect = heading_rect(page, number, paper) if page_index == start_page else None
                end_rect = heading_rect(page, number + 1, paper) if page_index == next_page else None
                top = max(28, start_rect.y0) if start_rect else 28
                bottom = min(page.rect.height - 26, end_rect.y0) if end_rect else page.rect.height - 26
                regions = visual_regions(page, top, bottom)
                if edition == "202405" and number == 53:
                    labels = page.search_for("＜親族関係図＞")
                    choices = page.search_for("１．妻Ｃさん")
                    if not labels or not choices:
                        raise ValueError("Q53 family diagram bounds not found")
                    regions = [fitz.Rect(48, labels[-1].y0 - 2, page.rect.width - 45, choices[0].y0 - 8)]
                for region in regions:
                    clip = fitz.Rect(max(30, region.x0 - 1), max(top, region.y0 - .5),
                                     min(page.rect.width - 25, region.x1 + 1), min(bottom, region.y1 + .5))
                    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), clip=clip, alpha=False)
                    image = Image.open(io.BytesIO(pix.tobytes("png")))
                    directory = OUT / edition
                    directory.mkdir(parents=True, exist_ok=True)
                    name = f"q{number:02d}-{len(panels) + 1}.webp"
                    target = directory / name
                    image.save(target, "WEBP", quality=86, method=6)
                    panels.append({"url": f"/fp2/academic/{edition}/{name}", "pdfPage": page_index + 1,
                                   "width": image.width, "height": image.height})
            if not panels:
                raise ValueError(f"No diagram panel for {edition} Q{number}")
            edition_receipt[str(number)] = panels
        receipt[edition] = edition_receipt
    RECEIPT.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(sum(len(v) for v in receipt.values()), "diagram questions rendered")


if __name__ == "__main__":
    main()
