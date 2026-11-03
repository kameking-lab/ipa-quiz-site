"""Stage source-limited EM explanations without changing official answers.

The 201 independently reviewed overlays remain byte-for-byte unchanged. A
provisional overlay is staged only from an existing complete candidate whose
official question/answer and display structure pass deterministic checks.
Known answer conflicts stay outside the public overlay map.
"""

from collections import Counter
from copy import deepcopy
import json
from pathlib import Path
import sys

from emkohyo_choice_launch_gate import candidate_launch_issues, government_sources


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/exam-library"
REVIEW = DATA / "emkohyo-review"
OVERLAYS = DATA / "choice-explanations.json"
HOLD_LEDGER = ROOT / "docs/evidence/emkohyo-choice-sources/hold-ledger-20260924.json"
RELEASE_LEDGER = ROOT / "docs/evidence/emkohyo-provisional-launch-20260925.json"
CHECKED_AT = "2026-09-25"


def load(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def main() -> None:
    catalog = [p for p in load(DATA / "official-catalog.json")
               if p["group"] == "emkohyo" and p["date"][:4] in ("2025", "2026")]
    answer_keys = {p["paperId"]: p["answers"] for p in load(DATA / "reviewed-answer-keys.json")}
    hold_rows = load(HOLD_LEDGER)["items"]
    held = {item["id"]: item for item in hold_rows}
    if len(held) != 159 or len(hold_rows) != 159:
        raise ValueError("Hold ledger is not the pinned 159 unique questions")
    original = load(OVERLAYS)
    staged = deepcopy(original)
    expected = set()
    excluded = []
    errors = []
    source_filter = Counter()
    for paper in catalog:
        pid = paper["id"]
        rows = load(DATA / "papers" / f"{pid}.json")
        for row in rows:
            if row["answerAuthority"] != "official" or row["choiceCount"] != 5:
                continue
            id_ = row["id"]
            expected.add(id_)
            if answer_keys[pid][row["number"] - 1] != row["correctChoice"]:
                errors.append(f"{id_}: official answer key mismatch")
                continue
            if id_ not in held:
                if id_ not in original or original[id_].get("provisionalReview"):
                    errors.append(f"{id_}: strict accepted overlay changed or missing")
                continue
            item = held[id_]
            if item["category"] == "answerConflict":
                if id_ in original:
                    errors.append(f"{id_}: known answer conflict is already public")
                excluded.append({"id": id_, "reason": "answerConflict", "detail": item["note"]})
                continue
            if item["category"] != "missingGovernmentSource":
                errors.append(f"{id_}: unknown hold category {item['category']}")
                continue
            n = row["number"]
            first = (n - 1) // 5 * 5 + 1
            draft = load(REVIEW / f"{pid}-q{first:02}-{first+4:02}-draft.json")["questions"].get(id_)
            if not draft or not isinstance(draft.get("overlay"), dict):
                errors.append(f"{id_}: missing complete existing draft")
                continue
            overlay = deepcopy(draft["overlay"])
            original_sources = overlay.get("sources", [])
            overlay["sources"] = government_sources(original_sources)
            source_filter["removedNonGovernment"] += len(original_sources) - len(overlay["sources"])
            overlay["provisionalReview"] = True
            overlay["lastCheckedAt"] = CHECKED_AT
            issues = candidate_launch_issues(row, overlay)
            if issues:
                errors.append(f"{id_}: {','.join(issues)}")
                continue
            if id_ in original and original[id_] != overlay:
                errors.append(f"{id_}: existing public overlay differs from staged candidate")
                continue
            staged[id_] = overlay
    if len(expected) != 360:
        errors.append("Target IDs differ from the 360-question contract")
    if set(held) - expected:
        errors.append("Hold ledger contains IDs outside the 360-question target")
    strict_count = sum(id_ in original for id_ in expected if id_ not in held)
    provisional_count = sum(staged.get(id_, {}).get("provisionalReview") is True for id_ in expected)
    launch_ready = sum(id_ in staged for id_ in expected)
    report = {
        "checkedAt": CHECKED_AT,
        "expectedQuestions": len(expected),
        "strictReviewed": strict_count,
        "provisionalReview": provisional_count,
        "launchReady": launch_ready,
        "excluded": excluded,
        "sourceFilter": dict(source_filter),
        "errors": errors,
    }
    if errors:
        print(json.dumps(report, ensure_ascii=False, indent=2))
        raise SystemExit(1)
    if "--write" in sys.argv:
        OVERLAYS.write_text(json.dumps(staged, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        RELEASE_LEDGER.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
