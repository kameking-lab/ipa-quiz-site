"""Write the ten-question acceptance receipt after both independent image reviews pass."""

from hashlib import sha256
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BATCH = ROOT / "data/raw_pdfs/denko2/review/batches/20251026-q11-20.json"
REVIEWED = ROOT / "data/questions/denko2/reviewed"
REVIEW = ROOT / "docs/evidence/denko2-independent"
OUTPUT = ROOT / "docs/evidence/denko2-coverage/20251026-q11-20.json"

batch = json.loads(BATCH.read_text(encoding="utf-8"))
all_questions = []
review_paths = []
for first, last, part in ((11, 15, 1), (16, 20, 2)):
    questions = json.loads((REVIEWED / f"20251026-q{first:02}-{last:02}.json").read_text(encoding="utf-8"))
    review_path = REVIEW / f"20251026-q11-20-opus-review-part{part:02}.json"
    review = json.loads(review_path.read_text(encoding="utf-8"))
    digest = sha256(json.dumps(questions, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()
    if review["inputHashes"]["draftSha256"] != digest:
        raise ValueError(f"Stale independent review: {review_path}")
    if [item["number"] for item in questions] != list(range(first, last + 1)):
        raise ValueError("Reviewed numbering changed")
    if [(item["number"], item["status"]) for item in review["assessment"]] != [
        (number, "PASS") for number in range(first, last + 1)
    ]:
        raise ValueError(f"Independent review not fully PASS: {review_path}")
    for item in questions:
        source = next(source for source in batch["questions"] if source["number"] == item["number"])
        if item["officialAnswer"] != source["officialAnswer"]:
            raise ValueError(f"Official answer mismatch: {item['number']}")
        row_hash = sha256((ROOT / source["reviewCrop"]).read_bytes()).hexdigest()
        if review["inputHashes"]["rowSha256"][str(item["number"])] != row_hash:
            raise ValueError(f"Official row image changed: {item['number']}")
    all_questions.extend(questions)
    review_paths.append(str(review_path.relative_to(ROOT)).replace("\\", "/"))

government_source_questions = [11, 12, 20]
for number in government_source_questions:
    item = next(item for item in all_questions if item["number"] == number)
    if not item.get("officialReferenceUrls"):
        raise ValueError(f"Official government source missing: {number}")

receipt = {
    "schemaVersion": 1,
    "batch": BATCH.stem,
    "status": "accepted",
    "publishGate": "notification-required-and-two-full-years-required",
    "questionOriginalVisualQc": 10,
    "choiceTextOriginalVisualQc": 40,
    "choiceExplanationQc": 40,
    "figureAndPhotoQc": sum(len(item.get("imageUrls", [])) + len(item.get("choiceImageUrls", {})) for item in all_questions),
    "governmentSourceQc": len(government_source_questions),
    "governmentSourceApplicableQuestions": government_source_questions,
    "independentVisionReview": {
        "model": "claude-opus-5-5",
        "passedQuestions": 10,
        "totalQuestions": 10,
        "receipts": review_paths,
        "lawChecksResolvedSeparately": government_source_questions,
    },
    "reviewMethod": "公式設問行画像、全文・四肢・正答・各肢解説を個別照合。写真Q16～18は写真部分だけを切り出した。Q11は電技解釈第161条、Q12は経産省電技解釈解説の絶縁体温度区分、Q20は第158条第3項第七号を一次資料で確認。Q19の組合せは試験センターの公式正答と照合。",
    "reviewedQuestionNumbers": list(range(11, 21)),
    "unresolved": [],
    "sourceDate": batch["date"],
    "sourceQuestionPdfSha256": batch["questionPdfSha256"],
    "sourceAnswerPdfSha256": batch["answerPdfSha256"],
    "sourceQuestionNumbers": list(range(11, 21)),
    "sourceOfficialAnswerCount": 10,
    "visionDraftQuestionCount": 10,
}
OUTPUT.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Accepted {len(all_questions)} questions / {len(all_questions) * 4} choices; figures {receipt['figureAndPhotoQc']}")
