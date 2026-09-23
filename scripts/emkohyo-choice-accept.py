"""Publish only explicitly selected, hash-current, independently reviewed EM overlays.

Usage: py -3.12 scripts/emkohyo-choice-accept.py emkohyo-EM20251805-q2 ...
"""

from hashlib import sha256
import json
from pathlib import Path
import runpy
import sys


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/exam-library"
REVIEW = DATA / "emkohyo-review"
OUT = DATA / "choice-explanations.json"
candidate_problems = runpy.run_path(str(ROOT / "scripts/emkohyo-choice-status.py"))["candidate_problems"]


def main() -> None:
    # Import shim keeps the dash-named command line files human-readable.
    if len(sys.argv) < 2:
        raise ValueError("Specify at least one explicitly accepted question ID")
    existing = json.loads(OUT.read_text(encoding="utf-8"))
    staged = {}
    for id_ in sys.argv[1:]:
        paper, number_text = id_.rsplit("-q", 1)
        number = int(number_text)
        first = (number - 1) // 5 * 5 + 1
        draft_file = REVIEW / f"{paper}-q{first:02}-{first+4:02}-draft.json"
        candidate = json.loads(draft_file.read_text(encoding="utf-8"))["questions"][id_]["overlay"]
        row = next(row for row in json.loads((DATA / "papers" / f"{paper}.json").read_text(encoding="utf-8"))
                   if row["id"] == id_)
        problems = candidate_problems(row, {"overlay": candidate})
        if problems:
            raise ValueError(f"Candidate gate failed {id_}: {problems}")
        review_files = sorted(REVIEW.glob(f"{paper}-q*-review.json"))
        receipts = [json.loads(file.read_text(encoding="utf-8")) for file in review_files]
        matching = [receipt for receipt in receipts if id_ in receipt.get("ids", [])]
        if len(matching) != 1:
            raise ValueError(f"Expected exactly one current direct review: {id_}")
        receipt = matching[0]
        assessment = receipt["assessment"].get(id_)
        keys = ("textIssues", "choiceIssues", "reasonIssues", "sourceIssues", "needsExternalCheck")
        if not assessment or assessment["status"] != "PASS" or any(assessment.get(k) for k in keys):
            raise ValueError(f"Direct review failed: {id_}")
        digest = sha256(json.dumps(candidate, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()
        if receipt["candidateSha256"].get(id_) != digest:
            raise ValueError(f"Stale candidate review: {id_}")
        if paper == "emkohyo-EM20251805" and number <= 3:
            pack = ROOT / "docs/evidence/emkohyo-2025-sources/EM20251805-q01-03.json"
        else:
            pack = ROOT / f"docs/evidence/emkohyo-choice-sources/{paper}-q{first:02}-{first+4:02}.json"
        if receipt["sourcePackSha256"] != sha256(pack.read_bytes()).hexdigest():
            raise ValueError(f"Stale source pack review: {id_}")
        if id_ in existing:
            raise ValueError(f"Already published: {id_}")
        staged[id_] = candidate
    data = OUT.read_text(encoding="utf-8")
    insert = ",\n".join(f"  {json.dumps(id_, ensure_ascii=False)}: "
                         + json.dumps(value, ensure_ascii=False, indent=2).replace("\n", "\n  ")
                         for id_, value in staged.items())
    if not data.endswith("\n}\n"):
        raise ValueError("Unexpected overlay file shape")
    OUT.write_text(data[:-3] + ",\n" + insert + "\n}\n", encoding="utf-8")
    print(f"Accepted {len(staged)} review-pinned EM choice explanations")


if __name__ == "__main__":
    main()
