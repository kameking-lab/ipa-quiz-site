"""Extract a small text-only 1級造園 pilot from the official, rubyless PDFs.

This script deliberately rejects records whose four numbered choices cannot be
found in order. Editorial explanations are added only after manual source review.
"""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / "docs/evidence/zoen1-2026"
OUTPUT = ROOT / "reports/zoen1-20260927/transcription-draft.json"
SELECTED = {"mondai-a": [1, 2, 3, 4, 5], "mondai-b": [3, 24, 25, 26]}


def normalize(text: str) -> str:
    text = re.sub(r"--- PDF page \d+ ---", "", text)
    text = re.sub(r"―\s*\d+\s*―", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    # PDF line wraps can split Japanese words; table cells use Katakana labels,
    # which remain separated for editorial review rather than merged here.
    return re.sub(r"(?<=[一-龯ぁ-ゖ]) (?=[一-龯ぁ-ゖ])", "", text)


def extract(session: str, numbers: list[int]) -> dict:
    suffix = "a" if session == "mondai-a" else "b"
    raw = (EVIDENCE / f"zoen1-2026-{suffix}-extract.txt").read_text(encoding="utf-8")
    matches = list(re.finditer(r"〔問題\s*(\d+)〕", raw))
    records = {}
    for index, match in enumerate(matches):
        number = int(match.group(1))
        if number not in numbers:
            continue
        end = matches[index + 1].start() if index + 1 < len(matches) else len(raw)
        block = raw[match.end():end]
        choices = list(re.finditer(r"(?m)^\(\s*([1-4])\s*[　 ]", block))
        if [int(choice.group(1)) for choice in choices] != [1, 2, 3, 4]:
            raise ValueError(f"{session} No.{number}: choice sequence is not 1..4")
        question = normalize(block[:choices[0].start()])
        options = [normalize(block[choice.end():choices[i + 1].start() if i < 3 else len(block)]) for i, choice in enumerate(choices)]
        if any(not option for option in options):
            raise ValueError(f"{session} No.{number}: empty choice")
        pdf_page = len(re.findall(r"--- PDF page \d+ ---", raw[:match.start()]))
        records[number] = {"number": number, "pdfPage": pdf_page, "question": question, "choices": options}
    if set(records) != set(numbers):
        raise ValueError(f"{session}: expected {numbers}, extracted {sorted(records)}")
    pdf = EVIDENCE / "input" / f"zoen1-2026-{suffix}.pdf"
    return {"questionPdfSha256": hashlib.sha256(pdf.read_bytes()).hexdigest(), "questions": [records[number] for number in numbers]}


def main() -> None:
    result = {session: extract(session, numbers) for session, numbers in SELECTED.items()}
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Extracted {sum(len(part['questions']) for part in result.values())} records into {OUTPUT}")


if __name__ == "__main__":
    main()
