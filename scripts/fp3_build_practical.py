"""Merge reviewed FP3 practical explanations into runtime JSON."""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / "docs" / "evidence" / "fp3-two-year"
SOURCE = json.loads((EVIDENCE / "jitsugi-extraction.json").read_text(encoding="utf-8"))
TARGET = ROOT / "data" / "questions" / "fp3" / "practical-2024-2025.json"


def load_drafts(edition: str) -> dict[int, dict]:
    rows: dict[int, dict] = {}
    for path in sorted((EVIDENCE / "explanation-drafts").glob(f"{edition}-jitsug*-q*.json")):
        for row in json.loads(path.read_text(encoding="utf-8")):
            number = int(row["number"])
            if number in rows and rows[number] != row:
                raise ValueError(f"Conflicting practical explanation draft: {edition} Q{number}")
            rows[number] = row
    if sorted(rows) != list(range(1, 21)):
        raise ValueError(f"{edition}: expected practical explanation drafts Q1..20, got {sorted(rows)}")
    return rows


def main() -> None:
    output: dict[str, object] = {}
    for edition, values in SOURCE.items():
        drafts = load_drafts(edition)
        questions = []
        for item in values["questions"]:
            row = drafts[item["number"]]
            questions.append({
                **item,
                "explanation": row["explanation"],
                "choiceExplanations": row["choiceExplanations"],
                "needsReview": bool(row["needsReview"]),
            })
        output[edition] = {"lawReferenceDate": values["lawReferenceDate"], "questions": questions}
    TARGET.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    all_questions = [q for edition in output.values() for q in edition["questions"]]
    review = sum(bool(q["needsReview"]) for q in all_questions)
    print(f"Wrote {len(all_questions)} FP3 practical questions; needsReview={review}.")


if __name__ == "__main__":
    main()
