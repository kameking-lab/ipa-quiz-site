"""Pin clean Opus direct reviews and write Denko1 batch coverage receipts.

Usage: py -3.12 scripts/denko1-finalize.py

For every question the newest direct review receipt whose input hashes match
the current candidate, official row crop, figures and law receipt, and which
marks the question PASS with no open issue, is pinned in
docs/evidence/denko1-final/<paper>.json. A batch coverage receipt is
`accepted` only when all ten of its questions are pinned. Nothing here edits
review receipts or candidates; the strict gate re-verifies every pin.
"""

from datetime import datetime, timezone
from hashlib import sha256
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAPER = "20260401"
REVIEW_MODEL = "claude-opus-5-5"
BATCHES = ROOT / "data/raw_pdfs/denko1/review/batches"
REVIEWED = ROOT / "data/questions/denko1/reviewed"
INDEPENDENT = ROOT / "docs/evidence/denko1-independent"
COVERAGE = ROOT / "docs/evidence/denko1-coverage"
FINAL = ROOT / "docs/evidence/denko1-final"
LAW = ROOT / "docs/evidence/denko1-law"


def rel(path: Path) -> str:
    return str(path.relative_to(ROOT)).replace("\\", "/")


def canonical(value) -> str:
    return sha256(json.dumps(value, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()


def text_digest(path: Path) -> str:
    return sha256(path.read_bytes().replace(b"\r\n", b"\n").replace(b"\r", b"\n")).hexdigest()


def pending_fields(assessment: dict) -> list[str]:
    return [key for key, value in assessment.items()
            if key.endswith(("Issues", "NeedsExternalCheck", "Check")) and isinstance(value, list) and value]


def main() -> None:
    candidates = {}
    for path in sorted(REVIEWED.glob(f"{PAPER}-q*.json")):
        for item in json.loads(path.read_text(encoding="utf-8")):
            candidates[item["number"]] = item
    reviews = []
    for path in INDEPENDENT.glob(f"{PAPER}-*-opus-review-*.json"):
        reviews.append((path.stat().st_mtime, path, json.loads(path.read_text(encoding="utf-8"))))
    reviews.sort(key=lambda entry: entry[0], reverse=True)
    pins, coverage_by_batch = [], {}
    for batch_path in sorted(BATCHES.glob(f"{PAPER}-q??-??.json")):
        batch = json.loads(batch_path.read_text(encoding="utf-8"))
        accepted, receipts, missing = [], set(), []
        for source in batch["questions"]:
            number = source["number"]
            candidate = candidates.get(number)
            if candidate is None or candidate.get("officialAnswer") != source["officialAnswer"]:
                missing.append(number)
                continue
            row_sha = sha256((ROOT / source["reviewCrop"]).read_bytes()).hexdigest()
            figures = {rel(ROOT / "public" / url.lstrip("/")): sha256((ROOT / "public" / url.lstrip("/")).read_bytes()).hexdigest()
                       for url in candidate.get("imageUrls", []) + list(candidate.get("choiceImageUrls", {}).values())}
            law_path = LAW / f"{PAPER}-q{number:02}.json"
            laws = {rel(law_path): text_digest(law_path)} if law_path.exists() else {}
            chosen = None
            for _, path, review in reviews:
                hashes = review.get("inputHashes", {})
                if (review.get("reviewModel") != REVIEW_MODEL or
                        hashes.get("candidateSha256", {}).get(str(number)) != canonical(candidate) or
                        hashes.get("rowSha256", {}).get(str(number)) != row_sha or
                        any(hashes.get("figureSha256", {}).get(k) != v for k, v in figures.items()) or
                        any(hashes.get("legalReceiptSha256", {}).get(k) != v for k, v in laws.items())):
                    continue
                matches = [item for item in review.get("assessment", []) if item.get("number") == number]
                if len(matches) == 1 and matches[0].get("status") == "PASS" and not pending_fields(matches[0]):
                    chosen = path
                break  # only the newest review of the current inputs counts
            if chosen is None:
                missing.append(number)
                continue
            pin = {
                "number": number,
                "status": "clean-direct-pass",
                "officialAnswer": source["officialAnswer"],
                "currentCandidateSha256": canonical(candidate),
                "originalRowSha256": row_sha,
                "figureSha256": figures,
                "directReviewReceipt": rel(chosen),
                "directReviewSha256": text_digest(chosen),
            }
            if laws:
                pin["lawReceipt"] = {"path": rel(law_path), "sha256": laws[rel(law_path)]}
            pins.append(pin)
            accepted.append(number)
            receipts.add(rel(chosen))
        numbers = [item["number"] for item in batch["questions"]]
        coverage_by_batch[batch_path.name] = {
            "schemaVersion": 1,
            "batch": batch_path.stem,
            "status": "accepted" if not missing else "pending",
            "sourceTitle": batch.get("sourceTitle"),
            "questionOriginalVisualQc": len(accepted),
            "choiceTextOriginalVisualQc": 4 * len(accepted),
            "choiceExplanationQc": 4 * len(accepted),
            "figureAndPhotoQc": sum(1 for n in accepted if candidates[n].get("imageUrls") or candidates[n].get("choiceImageUrls")),
            "governmentSourceQc": sum(1 for n in accepted if (LAW / f"{PAPER}-q{n:02}.json").exists()),
            "independentVisionReview": {"model": REVIEW_MODEL, "passedQuestions": len(accepted),
                                        "totalQuestions": len(numbers), "receipts": sorted(receipts)},
            "reviewMethod": "公式問題PDFの設問行画像・公開用の図・一次法令照合receiptを添付し、Opusが問題文・四肢・公式正答・全肢解説を独立に照合。PASSかつ全issue配列が空の問だけ採用。",
            "reviewedQuestionNumbers": numbers,
            "unresolved": [f"Q{n}" for n in missing],
        }
    FINAL.mkdir(parents=True, exist_ok=True)
    COVERAGE.mkdir(parents=True, exist_ok=True)
    (FINAL / f"{PAPER}.json").write_text(json.dumps({
        "schemaVersion": 1, "paper": PAPER, "finalizedAtUtc": datetime.now(timezone.utc).isoformat(),
        "reviewModel": REVIEW_MODEL, "assessment": sorted(pins, key=lambda pin: pin["number"]),
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for name, receipt in coverage_by_batch.items():
        (COVERAGE / name).write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"pinned": len(pins), "pending": {k: v["unresolved"] for k, v in coverage_by_batch.items() if v["unresolved"]}},
                     ensure_ascii=False))


if __name__ == "__main__":
    main()
