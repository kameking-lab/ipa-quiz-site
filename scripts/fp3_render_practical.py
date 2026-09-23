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
CACHE = ROOT / ".cache" / "fp3-official"
OUTPUT = ROOT / "public" / "fp3" / "practical"
RECEIPT = ROOT / "data" / "questions" / "fp3" / "practical-figures-2024-2025.json"
SOURCE = json.loads((ROOT / "data" / "questions" / "fp3" / "practical-2024-2025.json").read_text(encoding="utf-8"))


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
        doc = fitz.open(CACHE / f"j3_{edition}_q.pdf")
        positions = [heading_positions(page) for page in doc]
        edition_receipt = {}
        for item in entry["questions"]:
            number = item["number"]
            start_page = item["sourcePage"] - 1
            end_page = entry["questions"][number]["sourcePage"] - 1 if number < 20 else len(doc) - 1
            panels = []
            for page_index in range(start_page, end_page + 1):
                page = doc[page_index]
                top = max(0, positions[page_index].get(number, 35) - 7) if page_index == start_page else 30
                next_number = number + 1
                bottom = positions[page_index].get(next_number, page.rect.height - 28) - 7 if page_index == end_page and number < 20 else page.rect.height - 28
                region = fitz.Rect(30, top, page.rect.width - 26, bottom)
                visual_rects = []
                for drawing in page.get_drawings():
                    rect = fitz.Rect(drawing["rect"]) & region
                    if not rect.is_empty and rect.width > 6 and rect.height > 6:
                        visual_rects.append(rect)
                for image_info in page.get_images(full=True):
                    for image_rect in page.get_image_rects(image_info[0]):
                        rect = fitz.Rect(image_rect) & region
                        if not rect.is_empty and rect.width > 6 and rect.height > 6:
                            visual_rects.append(rect)
                if not visual_rects:
                    continue
                clip = fitz.Rect(visual_rects[0])
                for rect in visual_rects[1:]:
                    clip |= rect
                clip = fitz.Rect(max(region.x0, clip.x0 - 12), max(region.y0, clip.y0 - 12),
                                 min(region.x1, clip.x1 + 12), min(region.y1, clip.y1 + 12))
                pix = page.get_pixmap(matrix=fitz.Matrix(1.8, 1.8), clip=clip, alpha=False)
                image = Image.open(io.BytesIO(pix.tobytes("png")))
                folder = OUTPUT / edition
                folder.mkdir(parents=True, exist_ok=True)
                name = f"q{number:02d}-{len(panels) + 1}.webp"
                target = folder / name
                image.save(target, "WEBP", quality=84, method=6)
                panels.append({"url": f"/fp3/practical/{edition}/{name}", "pdfPage": page_index + 1,
                               "width": image.width, "height": image.height, "bytes": target.stat().st_size})
            edition_receipt[str(number)] = panels
        entries[edition] = edition_receipt
    RECEIPT.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    referenced = {ROOT / "public" / panel["url"].lstrip("/")
                  for by_edition in entries.values() for panels in by_edition.values() for panel in panels}
    for old in OUTPUT.rglob("*.webp"):
        if old not in referenced:
            old.unlink()
    prompts = sum(1 for by_edition in entries.values() for panels in by_edition.values() if panels)
    print(f"Rendered figure-only panels for {prompts} practical prompts / {sum(len(p) for v in entries.values() for p in v.values())} panels")


if __name__ == "__main__":
    main()

