"""Accept a 2025 lower academic ten-pack only with clean, current Opus reviews."""

from hashlib import sha256
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
BATCHES = ROOT / "data/raw_pdfs/denko2/review/batches"
REVIEWED = ROOT / "data/questions/denko2/reviewed"
REVIEWS = ROOT / "docs/evidence/denko2-independent"
COVERAGE = ROOT / "docs/evidence/denko2-coverage"


def digest(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def candidate_digest(items: list[dict]) -> str:
    return sha256(json.dumps(items, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()


def require_clean(assessment: dict) -> None:
    if assessment.get("status") != "PASS":
        raise ValueError(f"Q{assessment['number']} not PASS")
    for key, value in assessment.items():
        if key.endswith(("Issues", "NeedsExternalCheck", "Check")) and isinstance(value, list) and value:
            raise ValueError(f"Q{assessment['number']} has pending {key}: {value}")


def main() -> None:
    if len(sys.argv) != 2 or sys.argv[1] not in {"20251026-q21-30", "20251026-q31-40", "20251026-q41-50"}:
        raise SystemExit("Usage: denko2-accept-reviewed-batch.py 20251026-q21-30|20251026-q31-40|20251026-q41-50")
    name = sys.argv[1]
    batch = json.loads((BATCHES / f"{name}.json").read_text(encoding="utf-8"))
    numbers = [item["number"] for item in batch["questions"]]
    if len(numbers) != 10 or numbers != list(range(numbers[0], numbers[0] + 10)):
        raise ValueError("Batch must hold ten consecutive official questions")
    accepted = []
    review_paths = []
    legal = set()
    figure_count = 0
    for part in (1, 2):
        first, last = numbers[(part - 1) * 5], numbers[part * 5 - 1]
        path = REVIEWED / f"20251026-q{first:02}-{last:02}.json"
        items = json.loads(path.read_text(encoding="utf-8"))
        if [item["number"] for item in items] != list(range(first, last + 1)):
            raise ValueError(f"Reviewed numbering changed: {path}")
        suffix = f"-fix-q{'-'.join(str(number) for number in range(first, last + 1))}" if name.endswith("q41-50") else ""
        review_path = REVIEWS / f"{name}-opus-review-part{part:02}{suffix}.json"
        review = json.loads(review_path.read_text(encoding="utf-8"))
        hashes = review["inputHashes"]
        if hashes["draftSha256"] != candidate_digest(items):
            raise ValueError(f"Stale candidate review: {review_path}")
        by_number = {item["number"]: item for item in review["assessment"]}
        if sorted(by_number) != list(range(first, last + 1)):
            raise ValueError(f"Incomplete independent review: {review_path}")
        for item in items:
            number = item["number"]
            original = next(source for source in batch["questions"] if source["number"] == number)
            require_clean(by_number[number])
            if item.get("uncertainty"):
                raise ValueError(f"Q{number} candidate uncertainty remains")
            if item["officialAnswer"] != original["officialAnswer"]:
                raise ValueError(f"Q{number} official answer mismatch")
            if hashes["rowSha256"].get(str(number)) != digest(ROOT / original["reviewCrop"]):
                raise ValueError(f"Q{number} official row changed")
            if set(item["choices"]) != {"イ", "ロ", "ハ", "ニ"} or set(item["choiceExplanations"]) != {"イ", "ロ", "ハ", "ニ"}:
                raise ValueError(f"Q{number} missing choice or explanation")
            for url in item.get("imageUrls", []) + list(item.get("choiceImageUrls", {}).values()):
                image = ROOT / "public" / url.lstrip("/")
                if not image.is_file():
                    raise ValueError(f"Q{number} missing figure {url}")
                relative = str(image.relative_to(ROOT)).replace("\\", "/")
                recorded = hashes.get("detailFigureSha256", {}).get(relative) or hashes.get("sharedFigureSha256", {}).get(relative)
                if recorded != digest(image):
                    raise ValueError(f"Q{number} figure changed without re-review: {url}")
                figure_count += 1
            law_path = ROOT / f"docs/evidence/denko2-law/20251026-q{number:02}.json"
            if law_path.exists():
                relative = str(law_path.relative_to(ROOT)).replace("\\", "/")
                if hashes.get("legalReceiptSha256", {}).get(relative) != digest(law_path):
                    raise ValueError(f"Q{number} law receipt changed without re-review")
                law = json.loads(law_path.read_text(encoding="utf-8"))
                if law.get("unresolved"):
                    raise ValueError(f"Q{number} legal issue unresolved")
                legal.add(number)
            accepted.append(item)
        for relative, recorded in hashes.get("sharedFigureSha256", {}).items():
            if digest(ROOT / relative) != recorded:
                raise ValueError(f"Shared figure changed: {relative}")
        if "commonInstructionsSha256" in hashes:
            common = REVIEWS / "20251026-common-instructions.png"
            if digest(common) != hashes["commonInstructionsSha256"]:
                raise ValueError("Official common instructions changed")
        review_paths.append(str(review_path.relative_to(ROOT)).replace("\\", "/"))
    receipt = {
        "schemaVersion": 1,
        "batch": name,
        "status": "accepted",
        "publishGate": "notification-required-and-two-full-years-required",
        "questionOriginalVisualQc": 10,
        "choiceTextOriginalVisualQc": 40,
        "choiceExplanationQc": 40,
        "figureAndPhotoQc": figure_count,
        "governmentSourceQc": len(legal),
        "governmentSourceApplicableQuestions": sorted(legal),
        "independentVisionReview": {"model": "claude-opus-5-5", "passedQuestions": 10,
                                    "totalQuestions": 10, "receipts": review_paths},
        "reviewMethod": "公式設問画像と図表部分のみの公開cropを別々に照合。全文・四肢・正答・各肢解説をOpus独立視認。法令を述べる設問は経産省又はe-Gov一次資料の原文句と照合。",
        "reviewedQuestionNumbers": numbers,
        "unresolved": [],
        "sourceDate": batch["date"],
        "sourceQuestionPdfSha256": batch["questionPdfSha256"],
        "sourceAnswerPdfSha256": batch["answerPdfSha256"],
        "sourceQuestionNumbers": numbers,
        "sourceOfficialAnswerCount": 10,
        "visionDraftQuestionCount": 10,
    }
    output = COVERAGE / f"{name}.json"
    output.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Accepted {name}: 10 questions, 40 explanations, {figure_count} figure references, {len(legal)} primary-law checks")


if __name__ == "__main__":
    main()
