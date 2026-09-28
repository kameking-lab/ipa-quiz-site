"""Stage 2025 lower Denko1 academic paper from ECEE's official PDFs.

Usage: python scripts/denko1-2025-lower-stage.py QUESTION.pdf ANSWER.pdf [--check]

The output is a review manifest, not Question[] data. PDF text extraction cannot
faithfully reproduce the diagrams, photos, equations, or figure choices. Keep
every row on publication HOLD until a separate full-choice primary review.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path
import sys

import fitz

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "data/raw_pdfs/denko1/review/batches"
QUESTION_URL = "https://www.shiken.or.jp/construction/upload/20251005_co_first_q01.pdf"
ANSWER_URL = "https://www.shiken.or.jp/construction/upload/20251005_co_first_a01.pdf"
KANA = {"イ", "ロ", "ハ", "ニ"}


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def answer_key(path: Path) -> dict[int, str]:
    doc = fitz.open(path)
    if len(doc) != 1:
        raise ValueError("Expected a one-page official answer table")
    tokens = [word[4] for word in doc[0].get_text("words")]
    answers: dict[int, str] = {}
    for index, token in enumerate(tokens[:-1]):
        if token.isdigit() and 1 <= int(token) <= 50 and tokens[index + 1] in KANA:
            number = int(token)
            if number in answers:
                raise ValueError(f"Duplicate answer for question {number}")
            answers[number] = tokens[index + 1]
    if set(answers) != set(range(1, 51)):
        raise ValueError(f"Incomplete answer table: {sorted(answers)}")
    return answers


def question_positions(doc: fitz.Document) -> dict[int, tuple[int, float]]:
    positions: dict[int, tuple[int, float]] = {}
    for page_index, page in enumerate(doc):
        if page_index not in {*range(2, 9), 10, 11, 13, 14}:
            continue
        for x0, y0, _x1, _y1, token, *_rest in page.get_text("words"):
            if not (token.isdigit() and 65 <= x0 <= 85 and 75 <= y0 < 950):
                continue
            number = int(token)
            if not 1 <= number <= 50:
                continue
            if number in positions:
                raise ValueError(f"Ambiguous question number {number}")
            positions[number] = (page_index, y0)
    if set(positions) != set(range(1, 51)):
        raise ValueError(f"Question rows incomplete: {sorted(positions)}")
    return positions


def stage(question_pdf: Path, answer_pdf: Path) -> list[tuple[Path, dict]]:
    doc = fitz.open(question_pdf)
    if len(doc) != 16:
        raise ValueError("Expected 16 official question pages")
    answers = answer_key(answer_pdf)
    positions = question_positions(doc)
    items = []
    for number in range(1, 51):
        page_index, top = positions[number]
        next_pos = positions.get(number + 1)
        bottom = next_pos[1] - 2 if next_pos and next_pos[0] == page_index else 960
        page = doc[page_index]
        start, split = (86, 276) if number >= 41 else (91, 302)
        question = page.get_text("text", clip=fitz.Rect(start, top - 3, split, bottom)).strip()
        choices = page.get_text("text", clip=fitz.Rect(split, top - 3, 665, bottom)).strip()
        if not question or not choices:
            raise ValueError(f"Missing extracted text for question {number}")
        if sum(choices.count(label + "．") for label in KANA) != 4:
            raise ValueError(f"Expected four choice labels for question {number}")
        items.append({
            "number": number,
            "page": page_index + 1,
            "rowY": [round(top - 3, 1), round(bottom, 1)],
            "questionRaw": question,
            "choicesRaw": choices,
            "officialAnswer": answers[number],
            "needsVisualReview": True,
            "choiceExplanationsStatus": "HOLD-not-authored",
            "sharedFigurePage": 10 if 30 <= number <= 34 else 13 if 41 <= number <= 50 else None,
        })
    output = []
    for start in range(1, 51, 10):
        path = OUTPUT / f"20251005-q{start:02}-{start + 9:02}.json"
        payload = {
            "date": "2025-10-05",
            "year": 2025,
            "season": "second",
            "sourceTitle": "令和7年度第一種電気工事士下期学科試験",
            "sourceAttribution": "出典：令和7年度下期第一種電気工事士学科試験（電気技術者試験センター）。PDF文字抽出のため改行・数式・図は原本で再照合する。",
            "questionPdfUrl": QUESTION_URL,
            "answerPdfUrl": ANSWER_URL,
            "questionPdfSha256": digest(question_pdf),
            "answerPdfSha256": digest(answer_pdf),
            "publicationStatus": "HOLD",
            "questions": items[start - 1:start + 9],
        }
        output.append((path, payload))
    return output


def main() -> None:
    if len(sys.argv) not in (3, 4) or (len(sys.argv) == 4 and sys.argv[3] != "--check"):
        raise SystemExit(__doc__)
    outputs = stage(Path(sys.argv[1]), Path(sys.argv[2]))
    for path, payload in outputs:
        rendered = json.dumps(payload, ensure_ascii=False, indent=2) + "\n"
        if "--check" in sys.argv:
            if not path.is_file() or path.read_text(encoding="utf-8") != rendered:
                raise ValueError(f"Manifest differs from official PDFs: {path}")
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(rendered, encoding="utf-8")
    print(json.dumps({"paper": "20251005", "questions": 50, "batches": len(outputs), "publicationStatus": "HOLD"}))


if __name__ == "__main__":
    main()
