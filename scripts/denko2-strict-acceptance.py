"""Validate every accepted 2025 upper question against its referenced receipt.

A reviewer status of PASS is insufficient when an issue/check field is nonempty.
"""

from hashlib import sha256
import json
from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parents[1]
LEDGER = ROOT / "docs/evidence/denko2-independent/20250525-acceptance-ledger.json"
REVIEWED = ROOT / "data/questions/denko2/reviewed"
REVIEWS = ROOT / "docs/evidence/denko2-independent"


def digest(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def is_issue_field(key: str) -> bool:
    value = key.lower()
    return value.endswith("issues") or value.endswith("needsexternalcheck") or value.endswith("check")


def unresolved(assessment: dict) -> dict:
    return {key: value for key, value in assessment.items() if is_issue_field(key) and value not in ([], None, False, "")}


def latest_independent_receipts() -> dict[int, tuple[Path, dict]]:
    """Only reviewer receipts count; an acceptance ledger is never a review."""
    latest = {}
    final_map = ROOT / "docs/evidence/denko2-final/20250525-review-map.json"
    if final_map.exists():
        mapping = json.loads(final_map.read_text(encoding="utf-8"))
        for label, relative in mapping.items():
            path = ROOT / relative
            receipt = json.loads(path.read_text(encoding="utf-8"))
            number = int(label)
            assessment = next(item for item in receipt["assessment"] if item["number"] == number)
            latest[number] = (path, assessment)
        return latest
    paths = sorted(
        REVIEWS.glob("20250525-*-opus-review-part*.json"),
        key=lambda path: (path.stat().st_mtime_ns, path.name),
    )
    for path in paths:
        receipt = json.loads(path.read_text(encoding="utf-8"))
        if receipt.get("reviewModel") != "claude-opus-5-5":
            continue
        for assessment in receipt.get("assessment", []):
            latest[assessment["number"]] = (path, assessment)
    return latest


def report_latest() -> None:
    latest = latest_independent_receipts()
    missing = sorted(set(range(1, 51)) - set(latest))
    pending = {
        number: (path, assessment)
        for number, (path, assessment) in latest.items()
        if assessment.get("status") != "PASS" or unresolved(assessment)
    }
    print(f"Latest independent receipts: {50 - len(missing) - len(pending)}/50 clean; pending={len(pending)}; missing={len(missing)}")
    for number, (path, assessment) in sorted(pending.items()):
        keys = ", ".join(sorted(unresolved(assessment))) or assessment.get("status", "unknown")
        print(f"Q{number:02}: {keys}; {path.name}")
    if missing:
        print(f"Missing: {missing}")
    if (pending or missing) and "--report-only" not in sys.argv:
        raise SystemExit(1)


def main() -> None:
    if "--latest-receipts" in sys.argv:
        report_latest()
        return
    ledger = json.loads(LEDGER.read_text(encoding="utf-8"))
    rows = {}
    for path in sorted(REVIEWED.glob("20250525-q??-??.json")):
        for row in json.loads(path.read_text(encoding="utf-8")):
            number = row["number"]
            if number in rows:
                raise ValueError(f"Duplicate question {number}")
            rows[number] = row
    if set(rows) != set(range(1, 51)):
        raise ValueError("Missing reviewed questions")
    failures = {}
    final_path = ROOT / ledger["finalReceipt"]
    if digest(final_path) != ledger["finalReceiptSha256"]:
        raise ValueError("Final acceptance receipt changed")
    final = json.loads(final_path.read_text(encoding="utf-8"))
    final_rows = {item["number"]: item for item in final["assessment"]}
    if len(final_rows) != 50 or final.get("cleanQuestionCount") != 50:
        raise ValueError("Final receipt lacks 50 clean rows")
    for item in ledger["questions"]:
        number = item["number"]
        row = rows[number]
        receipt = json.loads((ROOT / item["reviewReceipt"]).read_text(encoding="utf-8"))
        hashes = receipt.get("inputHashes", {})
        assessment = next((result for result in receipt["assessment"] if result["number"] == number), None)
        reasons = []
        if assessment is None or assessment.get("status") != "PASS":
            reasons.append("latest referenced receipt is not PASS")
        if assessment is not None and unresolved(assessment):
            reasons.append("nonempty reviewer fields: " + ", ".join(sorted(unresolved(assessment))))
        candidate_hash = sha256(json.dumps(row, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()
        if candidate_hash != item["currentCandidateSha256"]:
            reasons.append("candidate changed since ledger")
        if hashes.get("candidateSha256", {}).get(str(number)) != candidate_hash:
            reasons.append("candidate was not directly reviewed")
        if digest(ROOT / row["reviewedFromCrop"]) != item["originalRowSha256"]:
            reasons.append("original official crop changed")
        if hashes.get("rowSha256", {}).get(str(number)) != item["originalRowSha256"]:
            reasons.append("original row not pinned in direct review")
        for image_path, expected in item["publishedFigureSha256"].items():
            if digest(ROOT / image_path) != expected:
                reasons.append(f"published figure changed: {image_path}")
            if (hashes.get("detailFigureSha256", {}).get(image_path) != expected and
                    hashes.get("sharedFigureSha256", {}).get(image_path) != expected):
                reasons.append(f"published figure not reviewed: {image_path}")
        if item.get("sourcePack"):
            source = item["sourcePack"]
            if digest(ROOT / source["path"]) != source["sha256"]:
                reasons.append("source pack changed")
            if hashes.get("sourcePackSha256", {}).get(str(number)) != source["sha256"]:
                reasons.append("source pack was not directly reviewed")
        if digest(ROOT / item["reviewReceipt"]) != item["directReviewSha256"]:
            reasons.append("direct review receipt changed")
        if final_rows.get(number, {}).get("directReviewSha256") != item["directReviewSha256"]:
            reasons.append("final receipt/ledger disagree")
        if row["officialAnswer"] != item["officialAnswer"]:
            reasons.append("answer changed since ledger")
        if reasons:
            failures[number] = reasons
    if len(ledger["questions"]) != 50:
        raise ValueError("Ledger lacks 50 entries")
    if len({item["number"] for item in ledger["questions"]}) != 50:
        raise ValueError("Duplicate ledger question")
    print(f"Strict acceptance: {50-len(failures)}/50 clean; pending={len(failures)}")
    for number, reasons in sorted(failures.items()):
        print(f"Q{number:02}: {'; '.join(reasons)}")
    if failures and "--report-only" not in sys.argv:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
