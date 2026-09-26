"""Extract selected text-only 1級電気通信 questions from the official PDFs."""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / "docs/evidence/tsushin1-2026"
OUTPUT = ROOT / "reports/tsushin1-20260927/transcription.json"
SELECTED = {
    "mondai-a": [5, 8, 11, 12, 13, 14, 15, 16],
    "mondai-b": [1, 5, 6, 9],
}


def normalize(text: str) -> str:
    text = re.sub(r"--- PDF page \d+ ---", "", text)
    text = re.sub(r"―\s*\d+\s*―", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return re.sub(r"(?<=[一-龯ぁ-ゖァ-ヶー]) (?=[一-龯ぁ-ゖァ-ヶー])", "", text)


def extract(session: str, numbers: list[int]) -> dict:
    suffix = "a" if session == "mondai-a" else "b"
    raw = (EVIDENCE / f"tsushin1-2026-{suffix}-extract.txt").read_text(encoding="utf-8")
    matches = list(re.finditer(r"【No\.\s*(\d+)】", raw))
    records = {}
    for index, match in enumerate(matches):
        number = int(match.group(1))
        if number not in numbers:
            continue
        end = matches[index + 1].start() if index + 1 < len(matches) else len(raw)
        block = raw[match.end():end]
        choices = list(re.finditer(r"(?m)^⑴|^⑵|^⑶|^⑷", block))
        labels = [choice.group() for choice in choices]
        if labels != ["⑴", "⑵", "⑶", "⑷"]:
            raise ValueError(f"{session} No.{number}: choice sequence is not 1..4: {labels}")
        question = normalize(block[:choices[0].start()])
        options = [normalize(block[choice.end():choices[i + 1].start() if i < 3 else len(block)]) for i, choice in enumerate(choices)]
        if not question or any(not option for option in options):
            raise ValueError(f"{session} No.{number}: empty prompt or choice")
        pdf_page = len(re.findall(r"--- PDF page \d+ ---", raw[:match.start()]))
        records[number] = {"number": number, "pdfPage": pdf_page, "question": question, "choices": options}
    if set(records) != set(numbers):
        raise ValueError(f"{session}: expected {numbers}, extracted {sorted(records)}")
    pdf = EVIDENCE / "input" / f"tsushin1-2026-{suffix}.pdf"
    return {"questionPdfSha256": hashlib.sha256(pdf.read_bytes()).hexdigest(), "questions": [records[number] for number in numbers]}


if __name__ == "__main__":
    result = {session: extract(session, numbers) for session, numbers in SELECTED.items()}
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Extracted {sum(len(part['questions']) for part in result.values())} records into {OUTPUT}")
