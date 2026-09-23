"""Join official FP2 practical answers with reviewed worked solutions."""

from __future__ import annotations

import json
import re
from pathlib import Path

from fp2_build_academic import government_links


ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "docs/evidence/fp2-two-year"
RAW = json.loads((ROOT / "data/questions/fp2/practical-2024-2025.json").read_text(encoding="utf-8"))
OUT = ROOT / "data/questions/fp2/practical-explanations-2024-2025.json"
RECEIPT = BASE / "practical-explanation-coverage.json"


def records(directory: str) -> dict[str, dict[int, dict]]:
    result: dict[str, dict[int, dict]] = {edition: {} for edition in RAW}
    for path in sorted((BASE / directory).glob("*.json")):
        edition = path.name[:6]
        if edition not in result:
            raise ValueError(f"unexpected edition in {directory}: {path.name}")
        for row in json.loads(path.read_text(encoding="utf-8")):
            number = row["number"]
            if number in result[edition]:
                raise ValueError(f"duplicate {edition} Q{number} in {directory}")
            result[edition][number] = row
    return result


def main() -> None:
    drafts = records("practical-explanation-drafts")
    reviews = records("practical-independent-review")
    corrections = records("practical-corrections")
    output: dict[str, dict[str, dict]] = {}
    receipt = {"scope": "FP2 practical official 2024–2025", "editions": [], "total": 0}
    for edition, paper in RAW.items():
        edition_output: dict[str, dict] = {}
        for question in paper["questions"]:
            number = question["number"]
            draft = drafts[edition].get(number)
            if not draft:
                continue
            review = reviews[edition].get(number)
            correction = corrections[edition].get(number)
            effective = correction or draft
            numeric = bool(re.fullmatch(r"[1-4]", question["modelAnswer"]))
            reasons = effective["choiceExplanations"]
            if numeric and set(reasons) != set("1234"):
                raise ValueError(f"{edition} Q{number} has incomplete choice reasons")
            if not numeric and any(not str(key).strip() for key in reasons):
                raise ValueError(f"{edition} Q{number} has malformed part reasons")
            if not effective["explanation"].strip() or (numeric and any(not value.strip() for value in reasons.values())):
                raise ValueError(f"{edition} Q{number} has blank solution")
            is_ready = (bool(correction["cleared"]) if correction else
                        bool(review and review["approved"] and not draft["needsReview"]))
            reference_text = question["body"] + " " + effective["explanation"]
            edition_output[str(number)] = {
                "explanation": effective["explanation"],
                "choiceExplanations": reasons,
                "governmentReferenceUrls": government_links(reference_text, paper["lawReferenceDate"]),
                "needsReview": not is_ready,
            }
        output[edition] = edition_output
        receipt["editions"].append({
            "edition": edition,
            "officialQuestions": len(paper["questions"]),
            "draftedSolutions": len(drafts[edition]),
            "independentlyReviewed": len(reviews[edition]),
            "corrected": len(corrections[edition]),
            "publishedSolutionCandidates": len(edition_output),
            "choiceReasons": sum(len(row["choiceExplanations"]) for row in edition_output.values()),
            "governmentLinkedQuestions": sum(bool(row["governmentReferenceUrls"]) for row in edition_output.values()),
            "reviewQueue": sum(row["needsReview"] for row in edition_output.values()),
        })
    receipt["total"] = sum(len(rows) for rows in output.values())
    OUT.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    RECEIPT.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(receipt, ensure_ascii=False))


if __name__ == "__main__":
    main()
