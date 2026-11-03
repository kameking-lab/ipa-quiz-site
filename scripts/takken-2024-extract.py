"""Extract the 2024 RETIO takken paper from a pinned official PDF.

This is an ingestion aid, not a publication step. Each extracted question still
requires a visual/source review and accepted explanation before publication.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path

import fitz

SOURCE_SHA256 = "82a95815f991567ebc4982b05a15a71f6ec942bd6794c3bafe3bcf9c2e985bae"
SOURCE_URL = "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf"
ANSWER_NUMBERS = [
    1, 4, 3, 4, 2, 4, 1, 1, 2, 4,
    3, 3, 1, 3, 4, 1, 2, 2, 3, 2,
    1, 4, 2, 2, 3, 3, 4, 2, 4, 4,
    1, 3, 3, 3, 2, 4, 3, 4, 4, 2,
    1, 2, 4, 1, 2, 1, 4, 1, 2, 3,
]
HEADING_RE = re.compile(r"(?m)^[ \t]*【問[ \t　]*(\d{1,2})[ \t　]*】")
CHOICE_RE = re.compile(r"(?m)^[ \t]*([1-4])[ \t]*　[^\n]")


def clean_display_text(value: str) -> str:
    """Remove PDF ruby artefacts without changing the question's substance."""
    return (
        value.replace("瑕\nか\n疵\nし\n", "瑕疵")
        .replace("錆\nせい\n", "錆")
        .strip()
    )


def extract(path: Path) -> dict:
    actual_hash = hashlib.sha256(path.read_bytes()).hexdigest()
    if actual_hash != SOURCE_SHA256:
        raise ValueError(f"official PDF SHA mismatch: {actual_hash}")
    document = fitz.open(path)
    if len(document) != 29:
        raise ValueError(f"expected 29 pages, got {len(document)}")
    published_answers = [
        int(value.translate(str.maketrans("１２３４", "1234")))
        for value in document[28].get_text(sort=False).splitlines()
        if re.fullmatch(r"[1234１-４]", value.strip())
    ]
    if published_answers != ANSWER_NUMBERS:
        raise ValueError(f"official answer table mismatch: {published_answers}")
    pages = [document[index].get_text(sort=False) for index in range(2, 27)]
    # The answer sheet and answer table are deliberately excluded from question text.
    full_text = "\n".join(pages)
    headings = list(HEADING_RE.finditer(full_text))
    if [int(match.group(1)) for match in headings] != list(range(1, 51)):
        raise ValueError(f"question headings are not 1–50: {[m.group(1) for m in headings]}")
    questions = []
    for index, heading in enumerate(headings):
        q_number = index + 1
        end = headings[index + 1].start() if index + 1 < len(headings) else len(full_text)
        body = full_text[heading.end():end]
        # The isolated printed page number sits between questions.
        body = re.sub(r"(?m)^\s*\d{1,2}\s*$", "", body).strip()
        choices = list(CHOICE_RE.finditer(body))
        if [int(match.group(1)) for match in choices] != [1, 2, 3, 4]:
            raise ValueError(f"Q{q_number}: choice markers {[m.group(1) for m in choices]}")
        prompt = clean_display_text(body[:choices[0].start()])
        option_texts = []
        for option_index, marker in enumerate(choices):
            option_end = choices[option_index + 1].start() if option_index < 3 else len(body)
            option = body[marker.start():option_end].strip()
            option = re.sub(r"^[1-4]\s+", "", option, count=1).strip()
            option_texts.append(clean_display_text(option))
        if not prompt or any(not option for option in option_texts):
            raise ValueError(f"Q{q_number}: empty question or option")
        page_start = full_text[:heading.start()].count("\n")
        page_index = 2
        for candidate_page in pages:
            if page_start < candidate_page.count("\n") + 1:
                break
            page_start -= candidate_page.count("\n") + 1
            page_index += 1
        questions.append({
            "qNumber": q_number,
            "pdfPage": page_index + 1,
            "question": prompt,
            "choices": option_texts,
            "officialAnswerNumber": ANSWER_NUMBERS[index],
        })
    return {
        "sourcePdfUrl": SOURCE_URL,
        "sourceSha256": actual_hash,
        "lawReferenceDate": "2024-04-01",
        "count": len(questions),
        "questions": questions,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("output", type=Path)
    arguments = parser.parse_args()
    payload = extract(arguments.pdf)
    arguments.output.parent.mkdir(parents=True, exist_ok=True)
    arguments.output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"extracted {payload['count']} official questions from {payload['sourceSha256']}")


if __name__ == "__main__":
    main()
