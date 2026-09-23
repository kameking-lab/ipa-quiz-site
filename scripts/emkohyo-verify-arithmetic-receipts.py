"""Verify that private EM arithmetic notes still refer to current official rows.

This checks provenance and official answer consistency, not the formula itself
or publication readiness. Independent source and choice review is still needed.
"""

from hashlib import sha256
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / "docs/evidence/emkohyo-choice-sources"
PAPERS = ROOT / "data/exam-library/papers"
FILENAMES = (
    "EM20251805-q18-19-arithmetic-20260924.json",
    "EM-calculation-spotchecks-20260924.json",
    "EM2025-calculation-spotchecks-20260924.json",
    "EM2025-radiation-arithmetic-20260924.json",
    "EM2026-radiation-arithmetic-20260924.json",
)


def main() -> None:
    checked = set()
    for filename in FILENAMES:
        evidence = json.loads((EVIDENCE / filename).read_text(encoding="utf-8"))
        records = evidence["questions"]
        if isinstance(records, dict):
            records = [{"id": f"{evidence['paperId']}-q{number}", **item}
                       for number, item in records.items()]
        for record in records:
            question_id = record["id"]
            if question_id in checked:
                raise ValueError(f"Duplicate arithmetic note: {question_id}")
            checked.add(question_id)
            paper_id = question_id.rsplit("-q", 1)[0]
            rows = json.loads((PAPERS / f"{paper_id}.json").read_text(encoding="utf-8"))
            row = next((item for item in rows if item["id"] == question_id), None)
            if row is None:
                raise ValueError(f"Unknown official row: {question_id}")
            if row["correctChoice"] != record["officialChoice"]:
                raise ValueError(f"Answer changed: {question_id}")
            if sha256(row["text"].encode("utf-8")).hexdigest() != record["rowTextSha256"]:
                raise ValueError(f"Official row changed: {question_id}")
            image_hashes = record.get("officialImageSha256", {})
            if set(image_hashes) != set(row.get("images", [])):
                raise ValueError(f"Official image set changed: {question_id}")
            for image, expected in image_hashes.items():
                actual = sha256((ROOT / "public" / image.lstrip("/")).read_bytes()).hexdigest()
                if actual != expected:
                    raise ValueError(f"Official image changed: {question_id} {image}")
            if record["nearestChoice"] != record["officialChoice"]:
                raise ValueError(f"Arithmetic and answer differ: {question_id}")
    print(f"EM arithmetic provenance PASS: {len(checked)} distinct official questions; not choice acceptance")


if __name__ == "__main__":
    main()
