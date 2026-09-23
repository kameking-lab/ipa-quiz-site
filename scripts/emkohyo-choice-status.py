"""Read-only 2025/2026 EM structured-explanation coverage receipt.

Drafts and model PASS labels never become publication counts by themselves.
"""

from hashlib import sha256
import json
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/exam-library"
REVIEW = DATA / "emkohyo-review"


def gov(url: str) -> bool:
    return bool(re.fullmatch(r"https://(?:[A-Za-z0-9-]+\.)+go\.jp(?:/[^\s]*)?", url))


def candidate_problems(row: dict, candidate: dict) -> list[str]:
    overlay = candidate.get("overlay")
    if not isinstance(overlay, dict):
        return ["missing overlay"]
    errors = []
    if overlay.get("sourceHash") != sha256(row["text"].encode("utf-8")).hexdigest():
        errors.append("sourceHash")
    if overlay.get("correctChoice") != row["correctChoice"]:
        errors.append("correctChoice")
    if len(overlay.get("summary", "")) < 20:
        errors.append("summary")
    choices = overlay.get("choices")
    if not isinstance(choices, list) or len(choices) != 5:
        errors.append("choiceCount")
    else:
        if [c.get("number") for c in choices] != [1, 2, 3, 4, 5]:
            errors.append("choiceNumbers")
        for choice in choices:
            n = choice.get("number")
            if choice.get("verdict") != ("correct" if n == row["correctChoice"] else "incorrect"):
                errors.append(f"choice{n}Verdict")
            if len(choice.get("reason", "").strip()) < 55:
                errors.append(f"choice{n}ReasonUnder55")
    sources = overlay.get("sources")
    if not isinstance(sources, list) or not sources or any(not gov(s.get("url", "")) for s in sources):
        errors.append("governmentSources")
    return errors


def main() -> None:
    catalog = json.loads((DATA / "official-catalog.json").read_text(encoding="utf-8"))
    selected = [item for item in catalog if item["group"] == "emkohyo"
                and item["date"][:4] in {"2025", "2026"}]
    overlays = json.loads((DATA / "choice-explanations.json").read_text(encoding="utf-8"))
    receipt = {"expectedPapers": len(selected), "expectedQuestions": 0,
               "drafted": 0, "candidateStaticValid": 0, "candidateWithReviewIssues": 0,
               "publicOverlays": 0, "reviewedPassCurrentHash": 0, "papers": []}
    for paper in selected:
        rows = json.loads((DATA / "papers" / f"{paper['id']}.json").read_text(encoding="utf-8"))
        rows = [row for row in rows if row["answerAuthority"] == "official" and row["choiceCount"] == 5]
        receipt["expectedQuestions"] += len(rows)
        counter = {"paperId": paper["id"], "year": paper["date"][:4],
                   "expected": len(rows), "drafted": 0, "staticValid": 0,
                   "publicOverlays": 0, "blockedIds": []}
        for row in rows:
            first = (row["number"] - 1) // 5 * 5 + 1
            draft_file = REVIEW / f"{paper['id']}-q{first:02}-{first+4:02}-draft.json"
            candidate = None
            if draft_file.exists():
                draft = json.loads(draft_file.read_text(encoding="utf-8"))
                candidate = draft.get("questions", {}).get(row["id"])
            if candidate is not None:
                counter["drafted"] += 1
                receipt["drafted"] += 1
                issues = candidate_problems(row, candidate)
                if not issues:
                    counter["staticValid"] += 1
                    receipt["candidateStaticValid"] += 1
                if candidate.get("reviewIssues"):
                    receipt["candidateWithReviewIssues"] += 1
                    issues.append("reviewIssues")
                if issues:
                    counter["blockedIds"].append({"id": row["id"], "issues": issues})
            if row["id"] in overlays:
                counter["publicOverlays"] += 1
                receipt["publicOverlays"] += 1
        receipt["papers"].append(counter)
    receipt["complete"] = receipt["publicOverlays"] == receipt["expectedQuestions"]
    print(json.dumps(receipt, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
