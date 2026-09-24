"""Combine independently accepted 2024 lower batches into one strict final pin.

The merged receipt is then checked by denko2-strict-coverage.py, which verifies
each current candidate, original row, figure, source pack and Opus provenance.
"""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FINAL = ROOT / "docs/evidence/denko2-final"


def load(name: str) -> dict:
    return json.loads((FINAL / name).read_text(encoding="utf-8"))


def main() -> None:
    first = load("20241027.json")
    middle = load("20241027-q31-40.json")
    last = load("20241027-q41-50-acceptance.json")
    parts = [first["assessment"][:30], middle["assessment"], last["assessment"]]
    expected = [list(range(1, 31)), list(range(31, 41)), list(range(41, 51))]
    for part, numbers in zip(parts, expected, strict=True):
        if [entry["number"] for entry in part] != numbers:
            raise ValueError(f"Batch numbers are not {numbers[0]}–{numbers[-1]}")
        if any(entry.get("status") != "clean-direct-pass" for entry in part):
            raise ValueError(f"Batch {numbers[0]}–{numbers[-1]} contains pending review")

    merged = []
    for entry in [item for part in parts for item in part]:
        pinned = dict(entry)
        source = pinned.get("sourcePack")
        if source and not pinned.get("lawReceipt"):
            pinned["lawReceipt"] = {"path": source["path"], "sha256": source["sha256"]}
        merged.append(pinned)

    first_map = load("20241027-review-map.json")
    middle_map = load("20241027-q31-40-review-map.json")
    mapping = {**{key: first_map[key] for key in map(str, range(1, 31))},
               **{key: middle_map[key] for key in map(str, range(31, 41))}}
    mapping.update({str(entry["number"]): entry["directReviewReceipt"] for entry in parts[2]})
    if sorted(map(int, mapping)) != list(range(1, 51)):
        raise ValueError("Review map lacks a question")
    if any(mapping[str(entry["number"])] != entry["directReviewReceipt"] for entry in merged):
        raise ValueError("Review map does not match final pin")

    (FINAL / "20241027-review-map.json").write_text(json.dumps(mapping, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (FINAL / "20241027.json").write_text(json.dumps({"schemaVersion": 1, "paper": "20241027", "status": "complete",
                                                       "cleanQuestionCount": 50, "assessment": merged}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("20241027: assembled 50/50 accepted question pins; run unified strict checker")


if __name__ == "__main__":
    main()
