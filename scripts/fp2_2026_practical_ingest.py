"""Add the official 2026 May FP2 practical set without touching earlier editions.

Run: py -3.12 scripts/fp2_2026_practical_ingest.py
Requires PyMuPDF and Pillow. The output is a review candidate until figures
and all 40 official answers have been independently checked.
"""

from __future__ import annotations

import hashlib
import io
import json
import re
from pathlib import Path

import fitz
from PIL import Image

from fp2_official_ingest import extract_jitsugi
from fp2_render_practical import headings, visual_regions


ROOT = Path(__file__).resolve().parents[1]
EDITION = "202605"
CACHE = ROOT / ".cache" / "fp2-official"
SOURCE = ROOT / "data" / "questions" / "fp2" / "practical-2024-2025.json"
FIGURES = ROOT / "data" / "questions" / "fp2" / "practical-figures-2024-2025.json"
EVIDENCE = ROOT / "docs" / "evidence" / "fp2-2026-may-practical"
IMAGE_DIR = ROOT / "public" / "fp2" / "practical" / EDITION


def main() -> None:
    question_bytes = (CACHE / "j2_202605_q.pdf").read_bytes()
    answer_bytes = (CACHE / "j2_202605_a.pdf").read_bytes()
    question_doc = fitz.open(stream=question_bytes, filetype="pdf")
    answer_doc = fitz.open(stream=answer_bytes, filetype="pdf")
    questions = extract_jitsugi(EDITION, question_doc, answer_doc)
    assert [item["number"] for item in questions] == list(range(1, 41))
    # PDF text extraction appends positioned diagram labels after the prose.
    # The complete diagrams are rendered below as source-linked panels.
    visual_tail_markers = {
        23: "\n\n孫B\n",
        24: "\n\n配偶者\n長女\n被相続人",
        26: "\n\n(500m2)\n",
        38: "\n\n2日\n(水)\n",
    }
    for number, marker in visual_tail_markers.items():
        body = questions[number - 1]["body"]
        if marker not in body:
            raise ValueError(f"Q{number}: diagram text marker changed; review source before trimming")
        questions[number - 1]["body"] = body.split(marker, 1)[0].rstrip()
    source = json.loads(SOURCE.read_text(encoding="utf-8"))
    source[EDITION] = {
        # The practical PDF gives no single blanket legal reference date.
        "lawReferenceDate": "公式問題に一律の記載なし",
        "questions": questions,
    }
    SOURCE.write_text(json.dumps(source, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    positions = [headings(page) for page in question_doc]
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    by_question: dict[str, list[dict]] = {}
    for item in questions:
        number = item["number"]
        first = item["sourcePage"] - 1
        last = questions[number]["sourcePage"] - 1 if number < 40 else len(question_doc) - 1
        panels = []
        for page_index in range(first, last + 1):
            page = question_doc[page_index]
            top = positions[page_index].get(number, 30) if page_index == first else 30
            bottom = positions[page_index].get(number + 1, page.rect.height - 30) if page_index == last else page.rect.height - 30
            for region in visual_regions(page, top, bottom):
                clip = fitz.Rect(max(30, region.x0 - 1), max(top, region.y0 - 0.5),
                                 min(page.rect.width - 25, region.x1 + 1), min(bottom, region.y1 + 0.5))
                if clip.is_empty:
                    continue
                pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), clip=clip, alpha=False)
                image = Image.open(io.BytesIO(pix.tobytes("png")))
                name = f"q{number:02d}-{len(panels) + 1}.webp"
                target = IMAGE_DIR / name
                image.save(target, "WEBP", quality=88, method=6)
                panels.append({"url": f"/fp2/practical/{EDITION}/{name}", "pdfPage": page_index + 1,
                               "width": image.width, "height": image.height, "bytes": target.stat().st_size})
        by_question[str(number)] = panels
    # Automatic table detection omits the road width and calendar dates in
    # these vector drawings. Keep the complete official visual context.
    for number, page_number, box, name in (
        (8, 5, (55, 390, 540, 580), "q08-complete-lot.webp"),
        (38, 31, (55, 145, 540, 285), "q38-complete-calendar.webp"),
    ):
        page = question_doc[page_number - 1]
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), clip=fitz.Rect(*box), alpha=False)
        image = Image.open(io.BytesIO(pix.tobytes("png")))
        target = IMAGE_DIR / name
        image.save(target, "WEBP", quality=88, method=6)
        by_question[str(number)] = [{
            "url": f"/fp2/practical/{EDITION}/{name}", "pdfPage": page_number,
            "width": image.width, "height": image.height, "bytes": target.stat().st_size,
        }]
    figures = json.loads(FIGURES.read_text(encoding="utf-8"))
    figures[EDITION] = by_question
    FIGURES.write_text(json.dumps(figures, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    referenced = {Path(panel["url"]).name for panels in by_question.values() for panel in panels}
    for image in IMAGE_DIR.glob("*.webp"):
        if image.name not in referenced:
            image.unlink()

    EVIDENCE.mkdir(parents=True, exist_ok=True)
    manifest = {
        "edition": EDITION,
        "published": "2026-05",
        "publisher": "日本FP協会",
        "kind": "2級実技試験（資産設計提案業務）",
        "sourceIndex": "https://www.jafp.or.jp/exam/mohan/",
        "reuseTerms": "https://www.jafp.or.jp/exam/mohan/files/exam_riyou.pdf",
        "question": {"url": "https://www.jafp.or.jp/exam/mohan/files/j2_202605_q.pdf",
                     "sha256": hashlib.sha256(question_bytes).hexdigest(), "pages": len(question_doc)},
        "answer": {"url": "https://www.jafp.or.jp/exam/mohan/files/j2_202605_a.pdf",
                   "sha256": hashlib.sha256(answer_bytes).hexdigest(), "pages": len(answer_doc)},
        "questionCount": len(questions),
        "answersFound": sum(bool(q["modelAnswer"]) for q in questions),
        "figurePanels": sum(len(value) for value in by_question.values()),
        "figureQuestions": [int(key) for key, value in by_question.items() if value],
    }
    (EVIDENCE / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(manifest, ensure_ascii=False))


if __name__ == "__main__":
    main()
