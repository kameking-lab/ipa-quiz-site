"""Add verified shared tables and one complete diagram without altering live crops."""

from __future__ import annotations

import io
import json
from pathlib import Path

import fitz
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
RECEIPT = ROOT / "data/questions/fp2/practical-figures-2024-2025.json"
def make_panel(edition: str, document: fitz.Document, page_number: int,
               box: tuple[int, int, int, int], name: str) -> dict:
    target = ROOT / f"public/fp2/practical/{edition}/{name}"
    if not target.exists():
        pix = document[page_number - 1].get_pixmap(matrix=fitz.Matrix(2, 2), clip=fitz.Rect(*box), alpha=False)
        image = Image.open(io.BytesIO(pix.tobytes("png")))
        image.save(target, "WEBP", quality=88, method=6)
    with Image.open(target) as image:
        return {"url": f"/fp2/practical/{edition}/{name}", "pdfPage": page_number,
                "width": image.width, "height": image.height, "bytes": target.stat().st_size}


def main() -> None:
    with fitz.open(ROOT / ".cache/fp2-official/j2_202405_q.pdf") as document:
        # Official page 6 shows the full corner lot including the 4 m road.
        lot = make_panel("202405", document, 6, (55, 210, 540, 495), "q07-complete-lot-20260923.webp")
        # Official page 22 has the cash-flow table used by BOTH questions 23 and 24.
        cashflow = make_panel("202405", document, 22, (55, 120, 540, 660), "q23-q24-cashflow-20260923.webp")
    data = json.loads(RECEIPT.read_text(encoding="utf-8"))
    data["202405"]["7"] = [lot]
    data["202405"]["23"] = [cashflow]
    data["202405"]["24"] = [cashflow, *[panel for panel in data["202405"]["24"] if panel["url"] != cashflow["url"]]]
    for edition, questions in (("202409", (24, 25)), ("202501", (23, 24))):
        with fitz.open(ROOT / f".cache/fp2-official/j2_{edition}_q.pdf") as document:
            panel = make_panel(edition, document, 22, (55, 120, 540, 660),
                               f"q{questions[0]:02d}-q{questions[1]:02d}-cashflow-20260923.webp")
        for number in questions:
            data[edition][str(number)] = [panel, *[old for old in data[edition][str(number)] if old["url"] != panel["url"]]]
    with fitz.open(ROOT / ".cache/fp2-official/j2_202409_q.pdf") as document:
        zoning = make_panel("202409", document, 7, (55, 195, 540, 425), "q07-complete-zoning-20260923.webp")
    data["202409"]["7"] = [zoning]
    with fitz.open(ROOT / ".cache/fp2-official/j2_202501_q.pdf") as document:
        lot_202501 = make_panel("202501", document, 6, (55, 210, 540, 440), "q07-complete-lot-20260923.webp")
        calendar_202501 = make_panel("202501", document, 31, (55, 210, 540, 371), "q34-complete-calendar-20260923.webp")
    data["202501"]["7"] = [lot_202501]
    data["202501"]["34"] = [calendar_202501]
    with fitz.open(ROOT / ".cache/fp2-official/j2_202505_q.pdf") as document:
        lot_202505 = make_panel("202505", document, 4, (55, 375, 540, 647), "q08-complete-lot-20260923.webp")
    data["202505"]["8"] = [lot_202505]
    RECEIPT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Context panels added to 202405 Q7/Q23/Q24, 202409 Q7/Q24/Q25, 202501 Q7/Q23/Q24, 202505 Q8")


if __name__ == "__main__":
    main()
