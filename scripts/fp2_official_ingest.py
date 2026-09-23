"""Download and extract Japan FP Association FP2 papers, preserving provenance.

Run: py -3.12 scripts/fp2_official_ingest.py
Requires requests and PyMuPDF. Outputs are review inputs, not publishable lessons.
"""

from __future__ import annotations

import hashlib
import json
import re
import unicodedata
from pathlib import Path

import fitz
import requests


ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / ".cache" / "fp2-official"
OUTPUT = ROOT / "docs" / "evidence" / "fp2-two-year"
BASE = "https://www.jafp.or.jp/exam/mohan/files/"
EDITIONS = [
    ("202405", "2024-05-26", "2023-10-01", "paper"),
    ("202409", "2024-09-08", "2024-04-01", "paper"),
    ("202501", "2025-01-26", "2024-10-01", "paper"),
    ("202505", "2025-05", "2024-04-01", "cbt-published"),
]


def pdf_bytes(name: str) -> bytes:
    CACHE.mkdir(parents=True, exist_ok=True)
    path = CACHE / name
    if not path.exists():
        response = requests.get(BASE + name, timeout=45)
        response.raise_for_status()
        if not response.content.startswith(b"%PDF"):
            raise ValueError(f"Not a PDF: {name}")
        path.write_bytes(response.content)
    return path.read_bytes()


def tidy(text: str) -> str:
    text = unicodedata.normalize("NFKC", text)
    text = re.sub(r"[ \t]+", " ", text)
    text = "\n".join(line.strip() for line in text.splitlines())
    text = re.sub(r"(?m)^\s*[−-]\s*\d+\s*[−-]\s*$", "", text)
    text = re.sub(r"\n[ \t]*\n+", "\n\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def paper_answers(text: str) -> dict[int, int]:
    answers: dict[int, int] = {}
    blocks = re.findall(
        r"((?:問[0-9０-９]+\s*){10})\s*((?:[1-4１-４]\s*){10})", text
    )
    for labels, digits in blocks:
        nums = [int(unicodedata.normalize("NFKC", x)) for x in re.findall(r"問([0-9０-９]+)", labels)]
        vals = [int(unicodedata.normalize("NFKC", x)) for x in re.findall(r"[1-4１-４]", digits)]
        answers.update(zip(nums, vals, strict=True))
    return answers


def extract_gakka(edition: str, paper: bool, question_doc: fitz.Document, answer_doc: fitz.Document) -> list[dict]:
    segments = []
    pattern = re.compile(r"(?m)^\s*(?:問題\s*([０-９0-9]+)|問\s*([０-９0-9]+))\s*$")
    for page_index, page in enumerate(question_doc):
        matches = list(pattern.finditer(page.get_text()))
        # Questions may span pages. Preserve the page number for figure review.
        for match in matches:
            segments.append((int(unicodedata.normalize("NFKC", match.group(1) or match.group(2))), page_index + 1))
    text = "\n".join(page.get_text() for page in question_doc)
    found = list(pattern.finditer(text))
    if len(found) != 60 or [int(unicodedata.normalize("NFKC", m.group(1) or m.group(2))) for m in found] != list(range(1, 61)):
        raise ValueError(f"{edition}: expected sequential questions 1..60, found {len(found)}")
    answers = paper_answers(answer_doc[0].get_text()) if paper else {}
    questions = []
    for index, match in enumerate(found):
        number = index + 1
        body = text[match.end() : found[index + 1].start() if index < 59 else len(text)]
        if paper:
            option_matches = list(re.finditer(r"(?m)^\s*([１２３４])．", body))
        else:
            option_matches = list(re.finditer(r"(?m)^\s*([1-4])\)", body))
        if len(option_matches) != 4:
            raise ValueError(f"{edition} Q{number}: expected 4 options, got {len(option_matches)}")
        stem = tidy(body[: option_matches[0].start()])
        choices = []
        for choice_index, option in enumerate(option_matches):
            end = option_matches[choice_index + 1].start() if choice_index < 3 else len(body)
            choice = body[option.end() : end]
            if not paper:
                choice = re.sub(r"\s*正解\s*[1-4]\)\s*$", "", choice)
            choices.append(tidy(choice))
        if paper:
            answer = answers.get(number)
        else:
            match_answer = re.search(r"正解\s*([1-4])\)", body)
            answer = int(match_answer.group(1)) if match_answer else None
        if answer not in (1, 2, 3, 4):
            raise ValueError(f"{edition} Q{number}: missing official answer")
        questions.append({"number": number, "stem": stem, "choices": choices, "answer": answer,
                          "sourcePage": segments[index][1]})
    return questions


def answer_heading_count(text: str) -> int:
    return len(re.findall(r"問\s*[0-9０-９]+", text))


def practical_question_count(doc: fitz.Document, paper: bool) -> int:
    text = "\n".join(page.get_text() for page in doc)
    if paper:
        # Excludes the cover sentence saying there are 40 questions.
        return len(re.findall(r"(?m)^\s*問[0-9０-９]+\s*$", text))
    return len(re.findall(r"(?m)^\s*問[0-9０-９]+\s*$", text))


def practical_answers(doc: fitz.Document) -> dict[int, str]:
    """Read each answer cell by geometry, retaining wrapped subpart values."""
    page = doc[0]
    answers: dict[int, str] = {}
    headings = []
    for word in page.get_text("words"):
        match = re.fullmatch(r"問([0-9０-９]+)", word[4])
        if match:
            headings.append((int(unicodedata.normalize("NFKC", match.group(1))), word[0], word[1]))
    for side in ("left", "right"):
        column = sorted((h for h in headings if (h[1] < 280) == (side == "left")), key=lambda h: h[2])
        if len(column) != 20:
            raise ValueError(f"Expected 20 {side} answer headings; got {len(column)}")
        x0, x1 = (58, 300) if side == "left" else (300, 550)
        for index, (number, _, y) in enumerate(column):
            next_y = column[index + 1][2] if index < 19 else min(page.rect.height, y + 45)
            cell = tidy(page.get_textbox(fitz.Rect(x0, y - 1, x1, next_y - 1)))
            cell = re.sub(r"^問[0-9０-９]+\s*", "", cell)
            answers[number] = cell.replace("(m2)", "(㎡)").replace("(m3)", "(㎥)")
    if len(answers) != 40 or any(not value for value in answers.values()):
        raise ValueError("Practical answer map incomplete")
    return answers


def extract_jitsugi(edition: str, question_doc: fitz.Document, answer_doc: fitz.Document) -> list[dict]:
    pattern = re.compile(r"(?m)^\s*問([0-9０-９]+)\s*$")
    text = "\n".join(page.get_text() for page in question_doc)
    found = list(pattern.finditer(text))
    numbers = [int(unicodedata.normalize("NFKC", m.group(1))) for m in found]
    if numbers != list(range(1, 41)):
        raise ValueError(f"{edition}: practical question numbers differ from 1..40: {numbers}")
    page_by_number = {}
    for page_number, page in enumerate(question_doc, start=1):
        for match in pattern.finditer(page.get_text()):
            page_by_number[int(unicodedata.normalize("NFKC", match.group(1)))] = page_number
    answers = practical_answers(answer_doc)
    result = []
    for index, match in enumerate(found):
        number = index + 1
        body = tidy(text[match.end() : found[index + 1].start() if index < 39 else len(text)])
        body = re.sub(r"(?m)^\s*2級 実技試験\([^\n]+\)\s*$", "", body)
        body = re.sub(r"(?m)^\s*【第[0-9０-９]+問】[^\n]*$", "", body)
        page_number = page_by_number[number]
        result.append({"number": number, "body": tidy(body), "modelAnswer": answers[number],
                       "sourcePage": page_number,
                       "sourcePageContainsRaster": bool(question_doc[page_number - 1].get_images())})
    return result


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    manifest = {"sourceIndex": "https://www.jafp.or.jp/exam/mohan/", "reuseTerms": BASE + "exam_riyou.pdf",
                "scope": "2024-2025 official published FP2 academic and practical papers", "editions": []}
    academic = {}
    practical = {}
    for edition, held, law_date, style in EDITIONS:
        paper = style == "paper"
        files = {
            "gakkaQuestion": f"g2_{edition}_{'q' if paper else 'qa'}.pdf",
            "jitsugiQuestion": f"j2_{edition}_q.pdf",
            "jitsugiAnswer": f"j2_{edition}_a.pdf",
        }
        if paper:
            files["gakkaAnswer"] = f"g2_{edition}_a.pdf"
        docs = {key: fitz.open(stream=pdf_bytes(name), filetype="pdf") for key, name in files.items()}
        items = extract_gakka(edition, paper, docs["gakkaQuestion"], docs.get("gakkaAnswer", docs["gakkaQuestion"]))
        practical_items = extract_jitsugi(edition, docs["jitsugiQuestion"], docs["jitsugiAnswer"])
        practical_count = practical_question_count(docs["jitsugiQuestion"], paper)
        practical_answer_count = answer_heading_count(docs["jitsugiAnswer"][0].get_text())
        if practical_count != 40 or practical_answer_count != 40:
            raise ValueError(f"{edition}: expected 40 practical prompts and answers; got {practical_count}/{practical_answer_count}")
        academic[edition] = {"lawReferenceDate": law_date, "questions": items}
        practical[edition] = {"lawReferenceDate": law_date, "questions": practical_items}
        manifest["editions"].append({
            "edition": edition, "heldOrPublished": held, "style": style, "lawReferenceDate": law_date,
            "expectedGakkaQuestions": 60, "extractedGakkaQuestions": len(items),
            "expectedJitsugiQuestions": 40, "detectedJitsugiQuestions": practical_count,
            "detectedJitsugiAnswers": practical_answer_count,
            "extractedJitsugiAnswers": len(practical_items),
            "files": {key: {"url": BASE + name, "sha256": hashlib.sha256(pdf_bytes(name)).hexdigest(),
                            "bytes": len(pdf_bytes(name)), "pages": len(docs[key])} for key, name in files.items()},
        })
    (OUTPUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (OUTPUT / "gakka-extraction.json").write_text(json.dumps(academic, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (OUTPUT / "jitsugi-extraction.json").write_text(json.dumps(practical, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Academic: 240/240 extracted with four choices and official answers. Practical: 160/160 questions with official model answers extracted.")


if __name__ == "__main__":
    main()
