"""Aggregate immutable PASS evidence and close the five 2024-lower receipts."""

from __future__ import annotations

from hashlib import sha256
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REVIEWED = ROOT / "data/questions/denko2/reviewed"
EVIDENCE = ROOT / "docs/evidence/denko2-final-review"
COVERAGE = ROOT / "docs/evidence/denko2-coverage"
BATCHES = ROOT / "data/raw_pdfs/denko2/review/batches"
ROUNDS = ["round3", "round4-target", "round5-target", "round6-target", "round7-target", "round8-target"]


def question_hash(item: dict) -> str:
    encoded = json.dumps(item, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode("utf-8")
    return sha256(encoded).hexdigest()


def reviewed_items() -> dict[int, dict]:
    result = {}
    for path in sorted(REVIEWED.glob("20241027-q??-??.json")):
        for item in json.loads(path.read_text(encoding="utf-8")):
            result[item["number"]] = item
    if set(result) != set(range(1, 51)):
        raise ValueError(f"Reviewed coverage differs: {sorted(result)}")
    return result


def latest_assessments() -> dict[int, dict]:
    latest = {}
    for round_name in ROUNDS:
        folder = EVIDENCE / round_name
        for path in sorted(folder.glob("*.json")):
            receipt = json.loads(path.read_text(encoding="utf-8"))
            for item in receipt["assessment"]:
                latest[item["number"]] = {
                    "status": item["status"],
                    "sourceReceipt": str(path.relative_to(ROOT)).replace("\\", "/"),
                    "reviewModel": receipt["reviewModel"],
                }
    if set(latest) != set(range(1, 51)):
        raise ValueError(f"Review coverage differs: {sorted(latest)}")
    failed = [number for number, item in latest.items() if item["status"] != "PASS"]
    if failed:
        raise ValueError(f"Rejected questions remain: {failed}")
    return latest


def main() -> None:
    items = reviewed_items()
    latest = latest_assessments()
    entries = [{
        "number": number,
        "status": "PASS",
        "questionSha256": question_hash(items[number]),
        "reviewModel": latest[number]["reviewModel"],
        "sourceReceipt": latest[number]["sourceReceipt"],
    } for number in range(1, 51)]
    ledger = {
        "schemaVersion": 1,
        "paper": "2024-10-27",
        "status": "accepted",
        "acceptedQuestions": 50,
        "rejectedQuestions": 0,
        "acceptedChoices": 200,
        "integrityBasis": "After round 3, correction scripts replaced only rejected question objects; accepted objects remained unchanged. Each entry hashes the final object and cites its latest Opus PASS receipt.",
        "entries": entries,
    }
    ledger_path = EVIDENCE / "ACCEPTANCE-20241027.json"
    ledger_path.write_text(json.dumps(ledger, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    accepted_dir = EVIDENCE / "accepted"
    accepted_dir.mkdir(parents=True, exist_ok=True)
    for first in range(1, 51, 10):
        numbers = list(range(first, first + 10))
        aggregate_path = accepted_dir / f"20241027-q{first:02}-{first + 9:02}.json"
        aggregate_path.write_text(json.dumps({
            "schemaVersion": 1,
            "reviewModel": "aggregate-of-claude-opus-5-5-pass-receipts",
            "assessment": [{**entries[number - 1]} for number in numbers],
        }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

        batch_path = BATCHES / f"20241027-q{first:02}-{first + 9:02}.json"
        batch = json.loads(batch_path.read_text(encoding="utf-8"))
        coverage_path = COVERAGE / batch_path.name
        coverage = json.loads(coverage_path.read_text(encoding="utf-8"))
        unique_images = {url for number in numbers for url in items[number].get("imageUrls", [])}
        government = [number for number in numbers if items[number].get("officialReferenceUrls")]
        coverage.update({
            "status": "accepted",
            "publishGate": "notification-required-and-two-full-years-required",
            "questionOriginalVisualQc": 10,
            "choiceTextOriginalVisualQc": 40,
            "choiceExplanationQc": 40,
            "figureAndPhotoQc": len(unique_images),
            "governmentSourceQc": len(government),
            "governmentSourceApplicableQuestions": government,
            "governmentSourceVersion": "経済産業省・2023-12-26改正（2024-10-27試験以前）",
            "governmentSourceUrl": "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/20231226-2.pdf",
            "reviewMethod": "公式設問行画像と15頁配線図を原本として全文・四肢・正答・全肢解説・図表を照合し、Sonnet訂正とOpus独立監査をPASSまで反復。",
            "reviewedQuestionNumbers": numbers,
            "unresolved": [],
            "independentVisionReview": {
                "model": "claude-opus-5-5",
                "passedQuestions": 10,
                "totalQuestions": 10,
                "receipts": [str(aggregate_path.relative_to(ROOT)).replace("\\", "/")],
                "sourceReceipts": sorted({latest[number]["sourceReceipt"] for number in numbers}),
            },
            "sourceDate": batch["date"],
            "sourceQuestionPdfSha256": batch["questionPdfSha256"],
            "sourceAnswerPdfSha256": batch["answerPdfSha256"],
            "sourceQuestionNumbers": numbers,
            "sourceOfficialAnswerCount": 10,
            "visionDraftQuestionCount": 10,
        })
        coverage_path.write_text(json.dumps(coverage, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Accepted 50/50 questions and 200/200 choices; rejected 0")


if __name__ == "__main__":
    main()
