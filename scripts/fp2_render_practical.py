"""Render only the diagrams and tables in official FP2 practical papers.

Question text and model answers are already selectable site text. Repeating an
entire question as a PDF screenshot made the mobile page harder to read.
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
CACHE = ROOT / ".cache/fp2-official"
OUTPUT = ROOT / "public/fp2/practical"
RECEIPT = ROOT / "data/questions/fp2/practical-figures-2024-2025.json"
SOURCE = json.loads((ROOT / "data/questions/fp2/practical-2024-2025.json").read_text(encoding="utf-8"))


def headings(page: fitz.Page) -> dict[int, float]:
    positions = {}
    for word in page.get_text("words"):
        match = re.fullmatch(r"問([0-9０-９]+)", word[4])
        if match:
            positions[int(unicodedata.normalize("NFKC", match.group(1)))] = word[1]
    return positions


def inside(rect: fitz.Rect, top: float, bottom: float) -> bool:
    return rect.y0 >= top - 2 and rect.y1 <= bottom + 2 and rect.width >= 22 and rect.height >= 16


def overlaps(a: fitz.Rect, b: fitz.Rect) -> bool:
    return not (a.x1 < b.x0 or b.x1 < a.x0 or a.y1 < b.y0 or b.y1 < a.y0)


def visual_regions(page: fitz.Page, top: float, bottom: float) -> list[fitz.Rect]:
    tables = [fitz.Rect(table.bbox) for table in page.find_tables().tables]
    regions = [rect for rect in tables if inside(rect, top, bottom) and rect.width > 65 and rect.height > 28]
    for image in page.get_image_info():
        rect = fitz.Rect(image["bbox"])
        if inside(rect, top, bottom) and rect.height >= 45 and rect.width >= 60 and rect.get_area() > 2500 and not any(overlaps(rect, table) for table in regions):
            regions.append(rect)

    # Relation diagrams may be vector paths rather than images or ruled tables.
    # Ignore isolated text boxes; retain only substantial multi-path clusters.
    paths = [item["rect"] for item in page.get_drawings()
             if inside(item["rect"], top, bottom)
             and not any(overlaps(item["rect"], table) for table in regions)]
    clusters: list[list[fitz.Rect]] = []
    for path in sorted(paths, key=lambda rect: (rect.y0, rect.x0)):
        for cluster in clusters:
            bounds = fitz.Rect(cluster[0])
            for part in cluster[1:]:
                bounds |= part
            if overlaps(fitz.Rect(bounds.x0 - 12, bounds.y0 - 12, bounds.x1 + 12, bounds.y1 + 12), path):
                cluster.append(path)
                break
        else:
            clusters.append([path])
    for cluster in clusters:
        if len(cluster) < 3:
            continue
        bounds = fitz.Rect(cluster[0])
        for part in cluster[1:]:
            bounds |= part
        if bounds.width > 60 and bounds.height > 35 and not any(overlaps(bounds, region) for region in regions):
            regions.append(bounds)
    merged: list[fitz.Rect] = []
    for region in sorted(regions, key=lambda rect: (rect.y0, rect.x0)):
        for index, prior in enumerate(merged):
            x_overlap = min(prior.x1, region.x1) - max(prior.x0, region.x0)
            y_gap = region.y0 - prior.y1
            if x_overlap > min(prior.width, region.width) * 0.45 and -5 <= y_gap <= 16:
                merged[index] = prior | region
                break
        else:
            merged.append(region)
    return sorted(merged, key=lambda rect: (rect.y0, rect.x0))


def main() -> None:
    all_entries = {}
    for edition, entry in SOURCE.items():
        document = fitz.open(CACHE / f"j2_{edition}_q.pdf")
        positions = [headings(page) for page in document]
        by_question = {}
        for item in entry["questions"]:
            number = item["number"]
            first = item["sourcePage"] - 1
            last = entry["questions"][number]["sourcePage"] - 1 if number < 40 else len(document) - 1
            panels = []
            for page_index in range(first, last + 1):
                page = document[page_index]
                top = positions[page_index].get(number, 30) if page_index == first else 30
                bottom = positions[page_index].get(number + 1, page.rect.height - 30) if page_index == last else page.rect.height - 30
                for region in visual_regions(page, top, bottom):
                    clip = fitz.Rect(max(30, region.x0 - 1), max(top, region.y0 - 0.5),
                                     min(page.rect.width - 25, region.x1 + 1), min(bottom, region.y1 + 0.5))
                    if clip.is_empty:
                        continue
                    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), clip=clip, alpha=False)
                    image = Image.open(io.BytesIO(pix.tobytes("png")))
                    folder = OUTPUT / edition
                    folder.mkdir(parents=True, exist_ok=True)
                    name = f"q{number:02d}-{len(panels) + 1}.webp"
                    target = folder / name
                    image.save(target, "WEBP", quality=86, method=6)
                    panels.append({"url": f"/fp2/practical/{edition}/{name}", "pdfPage": page_index + 1,
                                   "width": image.width, "height": image.height, "bytes": target.stat().st_size})
            by_question[str(number)] = panels
        all_entries[edition] = by_question
    RECEIPT.write_text(json.dumps(all_entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    referenced = {ROOT / "public" / panel["url"].lstrip("/")
                  for edition in all_entries.values() for panels in edition.values() for panel in panels}
    for old in OUTPUT.rglob("*.webp"):
        if old not in referenced:
            old.unlink()
    print(f"Rendered {sum(bool(v) for e in all_entries.values() for v in e.values())} questions / "
          f"{sum(len(v) for e in all_entries.values() for v in e.values())} figure/table panels")


if __name__ == "__main__":
    main()
