"""Report whether each latest independent receipt pins the current Q candidate."""

from hashlib import sha256
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
REVIEWED = ROOT / "data/questions/denko2/reviewed"
RECEIPTS = ROOT / "docs/evidence/denko2-independent"


def canonical(value):
    return sha256(json.dumps(value, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()


def main():
    candidates = {item["number"]: item for path in REVIEWED.glob("20250525-q*.json")
                  for item in json.loads(path.read_text(encoding="utf-8"))}
    latest = {}
    final_map = ROOT / "docs/evidence/denko2-final/20250525-review-map.json"
    if final_map.exists():
        for label, relative in json.loads(final_map.read_text(encoding="utf-8")).items():
            path = ROOT / relative
            receipt = json.loads(path.read_text(encoding="utf-8"))
            row = next(item for item in receipt["assessment"] if item["number"] == int(label))
            latest[int(label)] = (path, receipt, row)
    else:
        for path in sorted(RECEIPTS.glob("20250525-*-opus-review-part*.json"),
                           key=lambda p: (p.stat().st_mtime_ns, p.name)):
            receipt = json.loads(path.read_text(encoding="utf-8"))
            for row in receipt.get("assessment", []):
                latest[row["number"]] = (path, receipt, row)
    counts = {"clean-pinned": 0, "clean-stale": 0, "pending": 0, "missing": 0}
    mapping = {}
    for number in range(1, 51):
        if number not in latest:
            status = "missing"
        else:
            _, receipt, review = latest[number]
            clean = review.get("status") == "PASS" and not any(
                key.endswith(("Issues", "NeedsExternalCheck", "Check")) and isinstance(value, list) and value
                for key, value in review.items()
            )
            if not clean:
                status = "pending"
            elif receipt.get("inputHashes", {}).get("candidateSha256", {}).get(str(number)) != canonical(candidates[number]):
                status = "clean-stale"
            else:
                status = "clean-pinned"
        counts[status] += 1
        if status == "clean-pinned":
            mapping[str(number)] = str(latest[number][0].relative_to(ROOT)).replace("\\", "/")
        if status != "clean-pinned":
            print(f"Q{number:02} {status}")
    print(counts)
    if "--write-map" in sys.argv:
        if counts != {"clean-pinned": 50, "clean-stale": 0, "pending": 0, "missing": 0}:
            raise SystemExit("Cannot write final map before 50 clean current-candidate receipts")
        path = ROOT / "docs/evidence/denko2-final/20250525-review-map.json"
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(mapping, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(path.relative_to(ROOT))


if __name__ == "__main__":
    main()
