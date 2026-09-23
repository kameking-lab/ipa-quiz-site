"""Render each official practical prompt into cropped WebP source-layout panels.

The site also shows extracted text. Panels preserve graphs/tables that text
extraction cannot reliably express. The original PDFs remain the authority.
"""

from __future__ import annotations

import io
import json
import re
import unicodedata
from pathlib import Path

import fitz
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / ".cache" / "fp2-official"
OUTPUT = ROOT / "public" / "fp2" / "practical"
RECEIPT = ROOT / "data" / "questions" / "fp2" / "practical-figures-2024-2025.json"
SOURCE = json.loads((ROOT / "data" / "questions" / "fp2" / "practical-2024-2025.json").read_text(encoding="utf-8"))


def heading_positions(page: fitz.Page) -> dict[int, float]:
    positions = {}
    for word in page.get_text("words"):
        match = re.fullmatch(r"問([0-9０-９]+)", word[4])
        if match:
            number = int(unicodedata.normalize("NFKC", match.group(1)))
            positions[number] = word[1]
    return positions


def main() -> None:
    entries = {}
    for edition, entry in SOURCE.items():
        doc = fitz.open(CACHE / f"j2_{edition}_q.pdf")
        positions = [heading_positions(page) for page in doc]
        edition_receipt = {}
        for item in entry["questions"]:
            number = item["number"]
            start_page = item["sourcePage"] - 1
            end_page = entry["questions"][number]["sourcePage"] - 1 if number < 40 else len(doc) - 1
            panels = []
            for page_index in range(start_page, end_page + 1):
                page = doc[page_index]
                top = max(0, positions[page_index].get(number, 35) - 7) if page_index == start_page else 30
                next_number = number + 1
                bottom = positions[page_index].get(next_number, page.rect.height - 28) - 7 if page_index == end_page and number < 40 else page.rect.height - 28
                content_ends = [block[3] for block in page.get_text("blocks")
                                if block[1] >= top and block[3] <= bottom
                                and block[1] < page.rect.height - 58
                                and "2級 実技試験" not in str(block[4])]
                content_ends += [drawing["rect"].y1 for drawing in page.get_drawings()
                                 if drawing["rect"].y0 >= top and drawing["rect"].y1 <= bottom
                                 and drawing["rect"].y0 < page.rect.height - 58]
                if content_ends:
                    bottom = min(bottom, max(content_ends) + 16)
                if bottom - top < 55:
                    continue
                clip = fitz.Rect(34, top, page.rect.width - 28, bottom)
                pix = page.get_pixmap(matrix=fitz.Matrix(1.8, 1.8), clip=clip, alpha=False)
                image = Image.open(io.BytesIO(pix.tobytes("png")))
                folder = OUTPUT / edition
                folder.mkdir(parents=True, exist_ok=True)
                name = f"q{number:02d}-{len(panels) + 1}.webp"
                target = folder / name
                image.save(target, "WEBP", quality=84, method=6)
                panels.append({"url": f"/fp2/practical/{edition}/{name}", "pdfPage": page_index + 1,
                               "width": image.width, "height": image.height, "bytes": target.stat().st_size})
            if not panels:
                raise ValueError(f"No source-layout panel for {edition} Q{number}")
            edition_receipt[str(number)] = panels
        entries[edition] = edition_receipt
    RECEIPT.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    referenced = {ROOT / "public" / panel["url"].lstrip("/")
                  for by_edition in entries.values() for panels in by_edition.values() for panel in panels}
    for old in OUTPUT.rglob("*.webp"):
        if old not in referenced:
            old.unlink()
    print(f"Rendered {sum(len(v) for v in entries.values())} practical prompts / {sum(len(p) for v in entries.values() for p in v.values())} panels")


if __name__ == "__main__":
    main()
