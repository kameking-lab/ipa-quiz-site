"""Count only clean final original-PDF reviews as accepted Denko2 content.

Historical `status: accepted` receipts are not sufficient: older review models
sometimes returned PASS while also leaving unresolved issue/check arrays.
"""

from hashlib import sha256
import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
BATCHES = ROOT / "data/raw_pdfs/denko2/review/batches"
COVERAGE = ROOT / "docs/evidence/denko2-coverage"
REVIEWED = ROOT / "data/questions/denko2/reviewed"


def read(relative: str) -> dict:
    path = ROOT / relative
    if not path.is_file():
        raise ValueError(f"Missing referenced receipt: {relative}")
    return json.loads(path.read_text(encoding="utf-8"))


def pending_fields(assessment: dict) -> list[str]:
    pending = []
    for key, value in assessment.items():
        if key.endswith(("Issues", "NeedsExternalCheck", "Check")) and isinstance(value, list) and value:
            pending.append(key)
    return pending


def final_assessment(assessment: dict, number: int) -> tuple[dict, str]:
    source = assessment.get("reviewReceipt") or assessment.get("sourceReceipt")
    if not source:
        return assessment, ""
    original = read(source)
    matches = [item for item in original.get("assessment", []) if item.get("number") == number]
    if len(matches) != 1:
        raise ValueError(f"Source receipt does not uniquely cover Q{number}: {source}")
    return matches[0], source


def main() -> None:
    candidates = {}
    for path in sorted(REVIEWED.glob("*.json")):
        paper = path.name[:8]
        for item in json.loads(path.read_text(encoding="utf-8")):
            key = (paper, item["number"])
            if key in candidates:
                raise ValueError(f"Duplicate reviewed question: {key}")
            candidates[key] = item

    required = sorted(path for path in BATCHES.glob("*-q??-??.json") if path.name[:4] in {"2024", "2025"})
    clean, pending, unfinished = [], [], []
    for batch_path in required:
        batch = json.loads(batch_path.read_text(encoding="utf-8"))
        paper = batch_path.name[:8]
        receipt_path = COVERAGE / batch_path.name
        receipt = json.loads(receipt_path.read_text(encoding="utf-8")) if receipt_path.exists() else {}
        numbers = [item["number"] for item in batch["questions"]]
        if receipt.get("status") != "accepted":
            unfinished.extend(f"{paper} Q{number}" for number in numbers)
            continue
        if (receipt.get("questionOriginalVisualQc") != 10 or
            receipt.get("choiceTextOriginalVisualQc") != 40 or
            receipt.get("choiceExplanationQc") != 40 or
            receipt.get("unresolved") or
            sorted(receipt.get("reviewedQuestionNumbers", [])) != numbers):
            pending.extend(f"{paper} Q{number}: incomplete batch receipt" for number in numbers)
            continue
        reviews = receipt.get("independentVisionReview", {}).get("receipts", [])
        by_number = {}
        for relative in reviews:
            for assessment in read(relative).get("assessment", []):
                if assessment.get("number") in numbers:
                    by_number[assessment["number"]] = (assessment, relative)
        for source_item in batch["questions"]:
            number = source_item["number"]
            label = f"{paper} Q{number}"
            candidate = candidates.get((paper, number))
            if candidate is None:
                pending.append(f"{label}: no reviewed question")
                continue
            if candidate.get("officialAnswer") != source_item["officialAnswer"] or candidate.get("uncertainty"):
                pending.append(f"{label}: answer mismatch or unresolved candidate uncertainty")
                continue
            current = by_number.get(number)
            if current is None:
                pending.append(f"{label}: no referenced final review")
                continue
            aggregate, relative = current
            source, source_relative = final_assessment(aggregate, number)
            issues = pending_fields(aggregate) + pending_fields(source)
            if aggregate.get("status") != "PASS" or source.get("status") != "PASS" or issues:
                pending.append(f"{label}: {relative} / {source_relative or 'direct'} pending {','.join(sorted(set(issues)))}")
                continue
            original_sha = sha256((ROOT / source_item["reviewCrop"]).read_bytes()).hexdigest()
            recorded_sha = aggregate.get("originalRowSha256") or read(source_relative or relative).get("inputHashes", {}).get("rowSha256", {}).get(str(number))
            if recorded_sha and recorded_sha != original_sha:
                pending.append(f"{label}: original row hash changed")
                continue
            clean.append(label)

    catalog = (ROOT / "lib/qualifications/catalog.ts").read_text(encoding="utf-8")
    match = re.search(r'\bexamCode:\s*"denko2"(?P<body>.*?)(?:\n\s*\},)', catalog, re.S)
    live = bool(match and re.search(r'\bstatus:\s*"live"', match.group("body")))
    result = {
        "requiredAcademic": 200,
        "strictCleanAcademic": len(clean),
        "pendingReview": len(pending),
        "unfinished": len(unfinished),
        "pendingDetails": pending,
        "live": live,
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    if len(clean) + len(pending) + len(unfinished) != 200:
        raise ValueError("Question accounting must total 200")
    if live and (len(clean) != 200 or pending or unfinished):
        raise ValueError("Live Denko2 requires 200/200 strictly clean academic reviews")
    if "--require-complete" in sys.argv and (len(clean) != 200 or pending or unfinished):
        raise ValueError("Denko2 is not strictly complete")


if __name__ == "__main__":
    main()
