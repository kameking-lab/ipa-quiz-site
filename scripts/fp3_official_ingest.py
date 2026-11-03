"""Download and extract the two complete published FP3 sets for 2024–2025.

Run: py -3.12 scripts/fp3_official_ingest.py
Requires requests and PyMuPDF. Outputs are review inputs until every item is
independently compared with the official PDFs.
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
CACHE = ROOT / ".cache" / "fp3-official"
OUTPUT = ROOT / "docs" / "evidence" / "fp3-two-year"
BASE = "https://www.jafp.or.jp/exam/mohan/files/"
EDITIONS = [
    ("202405", "2024-05", "2023-04-01"),
    ("202505", "2025-05", "2024-04-01"),
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
    return re.sub(r"\n{3,}", "\n\n", text).strip()


def extract_gakka(edition: str, doc: fitz.Document) -> list[dict]:
    text = "\n".join(page.get_text() for page in doc)
    pattern = re.compile(r"(?m)^\s*問\s*([0-9０-９]+)\s*$")
    found = list(pattern.finditer(text))
    numbers = [int(unicodedata.normalize("NFKC", m.group(1))) for m in found]
    if numbers != list(range(1, 61)):
        raise ValueError(f"{edition}: academic numbers differ from 1..60: {numbers}")
    page_by_number: dict[int, int] = {}
    for page_number, page in enumerate(doc, start=1):
        for match in pattern.finditer(page.get_text()):
            page_by_number[int(unicodedata.normalize("NFKC", match.group(1)))] = page_number
    result = []
    for index, match in enumerate(found):
        number = index + 1
        body = text[match.end() : found[index + 1].start() if index < 59 else len(text)]
        if number <= 30:
            answer_match = re.search(r"正解\s*([○×〇])", body)
            if not answer_match:
                raise ValueError(f"{edition} academic Q{number}: missing official true/false answer")
            stem = tidy(body[: answer_match.start()])
            choices = ["正しい（○）", "誤っている（×）"]
            answer = 1 if answer_match.group(1) in {"○", "〇"} else 2
        else:
            answer_match = re.search(r"正解\s*([1-3])\)", body)
            if not answer_match:
                raise ValueError(f"{edition} academic Q{number}: missing official answer")
            choice_body = body[: answer_match.start()]
            markers = list(re.finditer(r"(?m)^\s*([1-3])\)", choice_body))
            if len(markers) != 3:
                raise ValueError(f"{edition} academic Q{number}: expected 3 choices, got {len(markers)}")
            stem = tidy(choice_body[: markers[0].start()])
            choices = []
            for i, marker in enumerate(markers):
                end = markers[i + 1].start() if i + 1 < len(markers) else len(choice_body)
                choice = choice_body[marker.end() : end]
                choices.append(tidy(choice))
            answer = int(answer_match.group(1))
        result.append({
            "number": number,
            "stem": stem,
            "choices": choices,
            "answer": answer,
            "sourcePage": page_by_number[number],
        })
    return result


def practical_answers(doc: fitz.Document) -> dict[int, str]:
    text = "\n".join(page.get_text() for page in doc)
    answers: dict[int, str] = {}
    blocks = re.findall(r"((?:問[0-9０-９]+\s*){10})\s*((?:[1-3１-３]\s*){10})", text)
    for labels, digits in blocks:
        numbers = [int(unicodedata.normalize("NFKC", value)) for value in re.findall(r"問([0-9０-９]+)", labels)]
        values = [unicodedata.normalize("NFKC", value) for value in re.findall(r"[1-3１-３]", digits)]
        answers.update(zip(numbers, values, strict=True))
    if sorted(answers) != list(range(1, 21)):
        raise ValueError(f"Practical answer map incomplete: {sorted(answers)}")
    return answers


def extract_jitsugi(edition: str, qdoc: fitz.Document, adoc: fitz.Document) -> list[dict]:
    text = "\n".join(page.get_text() for page in qdoc)
    pattern = re.compile(r"(?m)^\s*問\s*([0-9０-９]+)\s*$")
    found = list(pattern.finditer(text))
    numbers = [int(unicodedata.normalize("NFKC", m.group(1))) for m in found]
    if numbers != list(range(1, 21)):
        raise ValueError(f"{edition}: practical numbers differ from 1..20: {numbers}")
    page_by_number: dict[int, int] = {}
    for page_number, page in enumerate(qdoc, start=1):
        for match in pattern.finditer(page.get_text()):
            page_by_number[int(unicodedata.normalize("NFKC", match.group(1)))] = page_number
    answers = practical_answers(adoc)
    result = []
    for index, match in enumerate(found):
        number = index + 1
        body = unicodedata.normalize("NFKC", text[match.end() : found[index + 1].start() if index < 19 else len(text)])
        markers = list(re.finditer(r"(?m)^\s*([1-3])\.(?!\d)\s*", body))
        if len(markers) != 3:
            markers = list(re.finditer(r"(?m)^\s*([1-3])\)", body))
        if len(markers) != 3:
            raise ValueError(f"{edition} practical Q{number}: expected 3 choices, got {len(markers)}")
        stem = tidy(body[: markers[0].start()])
        choices = []
        for i, marker in enumerate(markers):
            end = markers[i + 1].start() if i + 1 < len(markers) else len(body)
            choice = tidy(body[marker.end() : end])
            # PDF reading order often appends the page footer or a diagram's
            # extracted labels after the last option. They are separated from
            # the option text by a blank line and belong in the figure panel.
            choices.append(choice.split("\n\n", 1)[0])
        result.append({
            "number": number,
            "stem": stem,
            "choices": choices,
            "answer": int(answers[number]),
            "sourcePage": page_by_number[number],
            "sourcePageContainsRaster": bool(qdoc[page_by_number[number] - 1].get_images()),
        })
    return result


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    manifest = {
        "sourceIndex": "https://www.jafp.or.jp/exam/mohan/",
        "reuseTerms": BASE + "exam_riyou.pdf",
        "scope": "2024-2025 complete official published FP3 academic and practical sets",
        "editions": [],
    }
    academic: dict[str, object] = {}
    practical: dict[str, object] = {}
    for edition, published, law_date in EDITIONS:
        files = {
            "gakka": f"g3_{edition}_qa.pdf",
            "jitsugiQuestion": f"j3_{edition}_q.pdf",
            "jitsugiAnswer": f"j3_{edition}_a.pdf",
        }
        docs = {key: fitz.open(stream=pdf_bytes(name), filetype="pdf") for key, name in files.items()}
        gakka = extract_gakka(edition, docs["gakka"])
        jitsugi = extract_jitsugi(edition, docs["jitsugiQuestion"], docs["jitsugiAnswer"])
        academic[edition] = {"lawReferenceDate": law_date, "questions": gakka}
        practical[edition] = {"lawReferenceDate": law_date, "questions": jitsugi}
        manifest["editions"].append({
            "edition": edition,
            "published": published,
            "lawReferenceDate": law_date,
            "expectedAcademicQuestions": 60,
            "extractedAcademicQuestions": len(gakka),
            "expectedPracticalQuestions": 20,
            "extractedPracticalQuestions": len(jitsugi),
            "files": {
                key: {
                    "url": BASE + name,
                    "sha256": hashlib.sha256(pdf_bytes(name)).hexdigest(),
                    "bytes": len(pdf_bytes(name)),
                    "pages": len(docs[key]),
                }
                for key, name in files.items()
            },
        })
    (OUTPUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (OUTPUT / "gakka-extraction.json").write_text(json.dumps(academic, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (OUTPUT / "jitsugi-extraction.json").write_text(json.dumps(practical, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("FP3 academic 120/120 and practical 40/40 extracted with official answers.")


if __name__ == "__main__":
    main()
