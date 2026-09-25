"""Extract the JAFP FP2 academic paper published 2026-05 (g2_202605_qa.pdf).

Run: python3 scripts/fp2_2026_may_extract.py
Requires PyMuPDF and Pillow. Writes review inputs only; publication happens in
data/questions/fp2 after the per-question gate in docs/evidence/fp2-2026-may.
"""

from __future__ import annotations

import hashlib
import io
import json
import re
from datetime import date
from pathlib import Path

import pymupdf
import requests
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / ".cache" / "fp2-official"
EVIDENCE = ROOT / "docs" / "evidence" / "fp2-2026-may"
FIGURES = ROOT / "public" / "fp2" / "academic" / "202605"
BASE = "https://www.jafp.or.jp/exam/mohan/files/"
PAPER = "g2_202605_qa.pdf"
TERMS = "exam_riyou.pdf"
KEYS = "アイウエ"
LAW_DATE_NOTICE = "2025 年４月１日\n現在施行の法令等"
# Visual blocks that cannot be transcribed as linear text without losing layout.
# Q28's two drawings are invisible rules around plain text, so it stays text-only.
FIGURE_QUESTIONS = {14, 55, 59}


def fetch(name: str) -> bytes:
    CACHE.mkdir(parents=True, exist_ok=True)
    path = CACHE / name
    if not path.exists():
        response = requests.get(BASE + name, timeout=45)
        response.raise_for_status()
        if not response.content.startswith(b"%PDF"):
            raise ValueError(f"Not a PDF: {name}")
        path.write_bytes(response.content)
    return path.read_bytes()


def join_lines(lines: list[str]) -> str:
    """Join PDF-wrapped lines; keep official paragraph and bullet breaks."""
    out: list[str] = []
    for raw in lines:
        line = raw.rstrip()
        if not line.strip():
            if out and out[-1] != "\n":
                out.append("\n")
            continue
        starts_paragraph = line.startswith((" ", "　", "・"))
        if out and out[-1] != "\n" and starts_paragraph:
            out.append("\n")
        out.append(line.strip())
    return re.sub(r"\n+", "\n", "".join(out)).strip()


def split_questions(doc: pymupdf.Document) -> list[dict]:
    text_by_page = [page.get_text() for page in doc]
    joined = "".join(f"\f{index + 1}\f{text}" for index, text in enumerate(text_by_page))
    parts = re.split(r"(?m)^問(\d+)\s*$", joined)
    questions = []
    for index in range(1, len(parts), 2):
        number = int(parts[index])
        body = parts[index + 1]
        page = next(i + 1 for i, text in enumerate(text_by_page) if re.search(rf"(?m)^問{parts[index]}\s*$", text))
        body = re.sub(r"\f\d+\f", "\n", body)
        body = re.sub(r"(?m)^\s*－\d+－\s*$", "", body)
        answer_match = re.search(r"正解\s*([1-4])\)", body)
        if not answer_match:
            raise ValueError(f"Q{number}: answer line missing")
        head, _, tail = body.partition(answer_match.group(0))
        choice_split = re.split(r"(?m)^([1-4])\)\s*", head)
        stem_lines = choice_split[0].splitlines()
        choices = {}
        for position in range(1, len(choice_split), 2):
            choices[int(choice_split[position])] = join_lines(choice_split[position + 1].splitlines())
        if sorted(choices) != [1, 2, 3, 4]:
            raise ValueError(f"Q{number}: choices {sorted(choices)}")
        questions.append({
            "number": number,
            "sourcePage": page,
            "stem": join_lines(stem_lines),
            "stemLines": stem_lines,
            "choices": [choices[i] for i in range(1, 5)],
            "answer": int(answer_match.group(1)),
            "trailingText": tail.strip(),
        })
    return questions


def figure_region(page: pymupdf.Page) -> pymupdf.Rect:
    rects = [pymupdf.Rect(d["rect"]) for d in page.get_drawings()]
    for image in page.get_images(full=True):
        rects.extend(page.get_image_rects(image[0]))
    return union(rects)


def union(rects: list[pymupdf.Rect]) -> pymupdf.Rect:
    region = pymupdf.Rect(rects[0])
    for rect in rects[1:]:
        region |= rect
    return region


def render_figures(doc: pymupdf.Document, questions: list[dict]) -> None:
    FIGURES.mkdir(parents=True, exist_ok=True)
    for question in questions:
        if question["number"] not in FIGURE_QUESTIONS:
            continue
        page = doc[question["sourcePage"] - 1]
        region = figure_region(page)
        if question["number"] == 55:
            # Q54 shares the page; start the clip at the diagram label, not at stray rules above it.
            label = page.search_for("〈親族関係図〉")[-1]
            rects = [pymupdf.Rect(d["rect"]) for d in page.get_drawings()]
            for image in page.get_images(full=True):
                rects.extend(page.get_image_rects(image[0]))
            region = union([label] + [r for r in rects if r.y0 >= label.y0 - 2])
        # Keep in-table text (e.g. headers) that sits just outside drawn rules.
        clip = pymupdf.Rect(region.x0 - 6, region.y0 - 6, region.x1 + 6, region.y1 + 6)
        # Grow to whole text lines the clip touches (e.g. Q14's caption) so nothing is cut mid-glyph.
        touched = [pymupdf.Rect(line["bbox"]) for block in page.get_text("dict")["blocks"]
                   for line in block.get("lines", []) if pymupdf.Rect(line["bbox"]).intersects(clip)
                   and "".join(s["text"] for s in line["spans"]).strip()]
        clip = union([clip] + touched)
        clip = pymupdf.Rect(clip.x0 - 2, clip.y0 - 2, clip.x1 + 2, clip.y1 + 2)
        pix = page.get_pixmap(matrix=pymupdf.Matrix(2, 2), clip=clip, alpha=False)
        image = Image.open(io.BytesIO(pix.tobytes("png")))
        name = f"q{question['number']:02d}-1.webp"
        target = FIGURES / name
        image.save(target, "WEBP", quality=86, method=6)
        figure_text = [
            text.strip()
            for _, y, text in [(0, line["bbox"][1], "".join(s["text"] for s in line["spans"]))
                               for block in page.get_text("dict")["blocks"]
                               for line in block.get("lines", [])
                               if pymupdf.Rect(line["bbox"]).intersects(clip)]
            if text.strip()
        ]
        question["figure"] = {
            "url": f"/fp2/academic/202605/{name}",
            "pdfPage": question["sourcePage"],
            "clip": [round(v, 2) for v in clip],
            "width": image.width,
            "height": image.height,
            "sha256": hashlib.sha256(target.read_bytes()).hexdigest(),
            "transcribedText": figure_text,
        }
        # The table/diagram is shown as the official image, so drop its flattened text from the stem.
        in_figure = set(figure_text)
        question["stem"] = join_lines([line for line in question["stemLines"] if line.strip() not in in_figure])
    for question in questions:
        question.pop("stemLines")


def main() -> None:
    paper = fetch(PAPER)
    terms = fetch(TERMS)
    doc = pymupdf.open(stream=paper, filetype="pdf")
    cover = doc[0].get_text()
    if LAW_DATE_NOTICE not in cover or "四答択一式60 問" not in cover:
        raise ValueError("Cover notice changed; re-check law reference date and format")
    questions = split_questions(doc)
    if [q["number"] for q in questions] != list(range(1, 61)):
        raise ValueError("Question numbers are not contiguous 1-60")
    render_figures(doc, questions)
    output = {
        "source": {
            "paperUrl": BASE + PAPER,
            "answerUrl": BASE + PAPER,
            "reuseTermsUrl": BASE + TERMS,
            "paperSha256": hashlib.sha256(paper).hexdigest(),
            "paperBytes": len(paper),
            "paperCreationDate": doc.metadata.get("creationDate"),
            "reuseTermsSha256": hashlib.sha256(terms).hexdigest(),
            "pageCount": doc.page_count,
            "retrievedOn": date.today().isoformat(),
        },
        "lawReferenceDate": "2025-04-01",
        "lawReferenceEvidence": "表紙注意事項2: 問題文に特に断りのない限り、2025年4月1日現在施行の法令等に基づいて解答",
        "format": "四答択一式60問（正解は各問末尾の「正解 n)」）",
        "attribution": "出典：日本FP協会 2級ファイナンシャル・プランニング技能検定 学科試験（2026年5月公表分）。改行・空白を整形し、選択肢番号1〜4をア〜エへ置換。",
        "figureAttributionSuffix": "図表は原典の該当箇所を画像化。",
        "choiceKeyMapping": {str(i + 1): key for i, key in enumerate(KEYS)},
        "questions": questions,
    }
    EVIDENCE.mkdir(parents=True, exist_ok=True)
    (EVIDENCE / "extraction.json").write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(len(questions), "questions;", sum("figure" in q for q in questions), "figures")


if __name__ == "__main__":
    main()
