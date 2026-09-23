"""Transcribe official section prefaces shared by FP2 practical questions.

These pages precede the individual question pages, so extracting each 問N alone
silently dropped the family's data. Text remains selectable; only tabular layouts
are additionally rendered as source-page crops.
"""

from __future__ import annotations

import io
import json
import re
import sys
import unicodedata
from pathlib import Path

import fitz
from PIL import Image

from fp2_render_practical import visual_regions


ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / ".cache/fp2-official"
OUTPUT = ROOT / "data/questions/fp2/practical-shared-context-2024-2025.json"
IMAGE_ROOT = ROOT / "public/fp2/practical"

# (first question, last question, official shared-case page numbers)
GROUPS = {
    "202405": ((29, 34, (26, 27)), (35, 40, (34,))),
    "202409": ((30, 35, (26,)), (36, 40, (32, 33))),
    "202501": ((29, 34, (26,)), (35, 40, (32,))),
}
FACTOR_GROUPS = {"202405": (26, 28, 24), "202409": (27, 29, 24), "202501": (26, 28, 25)}


def clean_page(text: str) -> str:
    lines = []
    for line in unicodedata.normalize("NFKC", text).splitlines():
        stripped = line.strip()
        if re.fullmatch(r"[-－]?\d+[-－]?", stripped):
            continue
        if "級 実技試験(資産設計提案業務" in stripped:
            continue
        lines.append(stripped)
    return re.sub(r"\n{3,}", "\n\n", "\n".join(lines)).strip()


def panels(edition: str, document: fitz.Document, page_number: int, group_first: int,
           max_y: float | None = None) -> list[dict]:
    page = document[page_number - 1]
    result = []
    for index, rect in enumerate(visual_regions(page, 0, page.rect.height), 1):
        if max_y is not None and rect.y0 >= max_y:
            continue
        clip = fitz.Rect(max(30, rect.x0 - 1), max(35, rect.y0 - 1),
                         min(page.rect.width - 25, rect.x1 + 1), min(page.rect.height - 30, rect.y1 + 1))
        if clip.is_empty:
            continue
        name = f"case-q{group_first:02d}-p{page_number}-{index}-20260923.webp"
        target = IMAGE_ROOT / edition / name
        if not target.exists():
            pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), clip=clip, alpha=False)
            Image.open(io.BytesIO(pix.tobytes("png"))).save(target, "WEBP", quality=88, method=6)
        with Image.open(target) as image:
            result.append({"url": f"/fp2/practical/{edition}/{name}", "pdfPage": page_number,
                           "width": image.width, "height": image.height, "bytes": target.stat().st_size})
    return result


def main() -> None:
    data = {edition: {} for edition in ("202405", "202409", "202501", "202505")}
    for edition, groups in GROUPS.items():
        with fitz.open(CACHE / f"j2_{edition}_q.pdf") as document:
            for first, last, pages in groups:
                text_parts = []
                for page in pages:
                    source_text = clean_page(document[page - 1].get_text("text"))
                    if edition == "202409" and first == 36 and page == 33:
                        source_text = re.split(r"\n問36\s*\n", source_text, maxsplit=1)[0]
                    text_parts.append(source_text)
                context_text = "\n\n".join(text_parts)
                if len(context_text) < 200:
                    raise ValueError(f"{edition} Q{first}-{last}: shared text missing")
                images = [panel for page in pages for panel in panels(
                    edition, document, page, first,
                    max_y=400 if edition == "202409" and first == 36 and page == 33 else None,
                )]
                context = {"sourcePages": list(pages), "text": context_text, "panels": images}
                for number in range(first, last + 1):
                    data[edition][str(number)] = context
    for edition, (first, last, page_number) in FACTOR_GROUPS.items():
        with fitz.open(CACHE / f"j2_{edition}_q.pdf") as document:
            source = clean_page(document[page_number - 1].get_text("text"))
            match = re.search(r"下記の係数早見表.*?(?=\[係数早見表)", source, re.S)
            if not match:
                raise ValueError(f"{edition}: coefficient instructions missing")
            instruction = re.sub(r"\s+", " ", match.group()).strip()
            images = panels(edition, document, page_number, first)
            if len(images) != 1:
                raise ValueError(f"{edition}: expected one coefficient table, got {len(images)}")
            context = {"sourcePages": [page_number], "text": instruction, "panels": images}
            for number in range(first, last + 1):
                data[edition][str(number)] = context
    OUTPUT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Shared case context for {sum(len(rows) for rows in data.values())} questions")


if __name__ == "__main__":
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    main()
