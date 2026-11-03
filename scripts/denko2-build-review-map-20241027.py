"""Select current clean direct reviews for each 2024 lower academic question.

Only direct Opus receipts are eligible. The finalizer independently checks all
candidate, original-row, figure and source-receipt hashes after this mapping.
"""

from hashlib import sha256
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAPER = "20241027"
REVIEWED = ROOT / "data/questions/denko2/reviewed"
RECEIPTS = ROOT / "docs/evidence/denko2-independent"
FINAL = ROOT / "docs/evidence/denko2-final"


def canonical(value) -> str:
    return sha256(json.dumps(value, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()


def clean(assessment: dict) -> bool:
    return assessment.get("status") == "PASS" and not any(
        value for key, value in assessment.items()
        if key.endswith(("Issues", "NeedsExternalCheck", "Check")) and isinstance(value, list)
    )


def main() -> None:
    candidates = {
        item["number"]: item
        for path in REVIEWED.glob(f"{PAPER}-q*.json")
        for item in json.loads(path.read_text(encoding="utf-8"))
    }
    selected = {}
    for path in sorted(RECEIPTS.glob(f"{PAPER}-*-opus-review-part*.json")):
        receipt = json.loads(path.read_text(encoding="utf-8"))
        assessments = receipt.get("assessment", [])
        if not assessments or not all(item["number"] in candidates for item in assessments):
            continue
        hashes = receipt.get("inputHashes", {})
        group = [candidates[item["number"]] for item in assessments]
        for item in assessments:
            number = item["number"]
            candidate_hash = hashes.get("candidateSha256", {}).get(str(number))
            if candidate_hash is not None and candidate_hash != canonical(candidates[number]):
                continue
            if candidate_hash is None and hashes.get("draftSha256") != canonical(group):
                continue
            if clean(item):
                # A targeted re-review takes precedence over an older group
                # when both still describe exactly the same current candidate.
                priority = ("-fix-" in path.stem, path.stat().st_mtime_ns)
                old = selected.get(number)
                if old is None or priority > old[0]:
                    selected[number] = (priority, str(path.relative_to(ROOT)).replace("\\", "/"))
    count = 0
    while count + 1 in selected:
        count += 1
    if set(selected) != set(range(1, count + 1)):
        gaps = sorted(set(range(1, max(selected) + 1)) - set(selected))
        raise ValueError(f"Non-consecutive clean receipts; missing {gaps}")
    mapping = {str(number): selected[number][1] for number in range(1, count + 1)}
    FINAL.mkdir(parents=True, exist_ok=True)
    (FINAL / f"{PAPER}-review-map.json").write_text(json.dumps(mapping, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"20241027: {count}/50 current clean Opus reviews mapped")


if __name__ == "__main__":
    main()
