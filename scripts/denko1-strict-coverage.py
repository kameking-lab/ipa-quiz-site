"""Count only clean, hash-pinned Opus reviews of the official rows as accepted Denko1 content.

Usage: python3 scripts/denko1-strict-coverage.py [--require-complete]

A question counts only when all of these hold:
- the batch manifest was built from the pinned official question/answer PDFs;
- the candidate's answer equals the official answer and it has four choices and
  four per-choice explanations, with no open uncertainty;
- the final pin (docs/evidence/denko1-final/<paper>.json) matches the current
  candidate, the official row crop, every published figure and law receipt;
- the pinned direct review receipt was produced by claude-opus-5-5 from the same
  input hashes and marks the question PASS with every issue array empty;
- every law receipt the question depends on is official-source-verified;
- the per-batch coverage receipt is accepted with 10 question / 40 choice /
  40 explanation checks and nothing unresolved.
When the catalog marks denko1 live, all 50 questions must be clean.
"""

from hashlib import sha256
import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
PAPER = "20260401"
REQUIRED = 50
QUESTION_PDF_SHA256 = "c6d5470d2aa8f504b20a1726df8a5200a71fd38b256b8852695eb4b8b0c1ba26"
ANSWER_PDF_SHA256 = "84c6413267ffecf78b5533dfe20fc1381a2447f161a1afbf22011e213a589a8a"
REVIEW_MODEL = "claude-opus-5-5"
BATCHES = ROOT / "data/raw_pdfs/denko1/review/batches"
COVERAGE = ROOT / "docs/evidence/denko1-coverage"
REVIEWED = ROOT / "data/questions/denko1/reviewed"
FINAL = ROOT / "docs/evidence/denko1-final" / f"{PAPER}.json"
LAW = ROOT / "docs/evidence/denko1-law"
KANA = ["イ", "ロ", "ハ", "ニ"]


def rel(path: Path) -> str:
    return str(path.relative_to(ROOT)).replace("\\", "/")


def canonical(value) -> str:
    return sha256(json.dumps(value, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()


def text_digest(path: Path) -> str:
    """Line-ending independent digest for committed text receipts."""
    return sha256(path.read_bytes().replace(b"\r\n", b"\n").replace(b"\r", b"\n")).hexdigest()


def file_digest(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def pending_fields(assessment: dict) -> list[str]:
    return [key for key, value in assessment.items()
            if key.endswith(("Issues", "NeedsExternalCheck", "Check")) and isinstance(value, list) and value]


def figure_hashes(candidate: dict) -> dict[str, str]:
    result = {}
    for url in candidate.get("imageUrls", []) + list(candidate.get("choiceImageUrls", {}).values()):
        path = ROOT / "public" / url.lstrip("/")
        if not path.is_file():
            raise ValueError(f"Missing published figure {url}")
        result[rel(path)] = file_digest(path)
    return result


def candidate_problems(candidate: dict, official: str) -> list[str]:
    problems = []
    if candidate.get("officialAnswer") != official:
        problems.append("answer differs from the official answer")
    if candidate.get("uncertainty"):
        problems.append("open uncertainty")
    if sorted(candidate.get("choices", {})) != sorted(KANA) or not all(str(v).strip() for v in candidate["choices"].values()):
        problems.append("choices incomplete")
    explanations = candidate.get("choiceExplanations", {})
    if sorted(explanations) != sorted(KANA) or not all(len(str(v).strip()) >= 15 for v in explanations.values()):
        problems.append("per-choice explanations incomplete")
    if len(str(candidate.get("explanation", "")).strip()) < 40:
        problems.append("explanation too short")
    return problems


def main() -> None:
    candidates: dict[int, dict] = {}
    for path in sorted(REVIEWED.glob(f"{PAPER}-q*.json")):
        for item in json.loads(path.read_text(encoding="utf-8")):
            if item["number"] in candidates:
                raise ValueError(f"Duplicate reviewed question Q{item['number']}")
            candidates[item["number"]] = item
    final = json.loads(FINAL.read_text(encoding="utf-8")) if FINAL.exists() else {}
    pins = {item["number"]: item for item in final.get("assessment", [])}
    if len(pins) != len(final.get("assessment", [])):
        raise ValueError("Duplicate final pin")

    clean, pending, unfinished = [], [], []
    batch_paths = sorted(BATCHES.glob(f"{PAPER}-q??-??.json"))
    for batch_path in batch_paths:
        batch = json.loads(batch_path.read_text(encoding="utf-8"))
        numbers = [item["number"] for item in batch["questions"]]
        if batch.get("questionPdfSha256") != QUESTION_PDF_SHA256 or batch.get("answerPdfSha256") != ANSWER_PDF_SHA256:
            pending.extend(f"Q{n}: batch not built from the pinned official PDFs" for n in numbers)
            continue
        receipt_path = COVERAGE / batch_path.name
        receipt = json.loads(receipt_path.read_text(encoding="utf-8")) if receipt_path.exists() else {}
        if receipt.get("status") != "accepted":
            unfinished.extend(f"Q{n}" for n in numbers)
            continue
        if (receipt.get("questionOriginalVisualQc") != len(numbers) or
                receipt.get("choiceTextOriginalVisualQc") != 4 * len(numbers) or
                receipt.get("choiceExplanationQc") != 4 * len(numbers) or
                receipt.get("unresolved") or
                sorted(receipt.get("reviewedQuestionNumbers", [])) != numbers):
            pending.extend(f"Q{n}: incomplete batch receipt" for n in numbers)
            continue
        for source in batch["questions"]:
            number = source["number"]
            label = f"Q{number}"
            candidate = candidates.get(number)
            if candidate is None:
                pending.append(f"{label}: no reviewed candidate")
                continue
            problems = candidate_problems(candidate, source["officialAnswer"])
            if problems:
                pending.append(f"{label}: {', '.join(problems)}")
                continue
            pin = pins.get(number)
            if pin is None:
                pending.append(f"{label}: no final pin")
                continue
            row_sha = file_digest(ROOT / source["reviewCrop"])
            figures = figure_hashes(candidate)
            if (pin.get("status") != "clean-direct-pass" or pin.get("currentCandidateSha256") != canonical(candidate) or
                    pin.get("originalRowSha256") != row_sha or pin.get("officialAnswer") != source["officialAnswer"] or
                    pin.get("figureSha256") != figures):
                pending.append(f"{label}: final pin does not match candidate/row/answer/figures")
                continue
            law_path = LAW / f"{PAPER}-q{number:02}.json"
            law_pin = pin.get("lawReceipt")
            if law_path.exists():
                law = json.loads(law_path.read_text(encoding="utf-8"))
                if (not law_pin or law_pin.get("path") != rel(law_path) or law_pin.get("sha256") != text_digest(law_path) or
                        law.get("status") != "official-source-verified" or law.get("unresolved")):
                    pending.append(f"{label}: law receipt missing, changed or unresolved")
                    continue
            elif law_pin:
                pending.append(f"{label}: pinned law receipt disappeared")
                continue
            review_rel = pin.get("directReviewReceipt", "")
            review_path = ROOT / review_rel
            if (not review_rel.startswith("docs/evidence/denko1-independent/") or not review_path.is_file() or
                    pin.get("directReviewSha256") != text_digest(review_path)):
                pending.append(f"{label}: direct review receipt missing or changed")
                continue
            review = json.loads(review_path.read_text(encoding="utf-8"))
            hashes = review.get("inputHashes", {})
            expected_laws = {rel(law_path): text_digest(law_path)} if law_path.exists() else {}
            if (review.get("reviewModel") != REVIEW_MODEL or
                    hashes.get("candidateSha256", {}).get(str(number)) != canonical(candidate) or
                    hashes.get("rowSha256", {}).get(str(number)) != row_sha or
                    any(hashes.get("figureSha256", {}).get(path) != digest for path, digest in figures.items()) or
                    any(hashes.get("legalReceiptSha256", {}).get(path) != digest for path, digest in expected_laws.items())):
                pending.append(f"{label}: direct review was not made by {REVIEW_MODEL} from the current inputs")
                continue
            matches = [item for item in review.get("assessment", []) if item.get("number") == number]
            if len(matches) != 1 or matches[0].get("status") != "PASS" or pending_fields(matches[0]):
                fields = ",".join(pending_fields(matches[0])) if len(matches) == 1 else "missing"
                pending.append(f"{label}: direct review not clean ({fields or 'status FIX'})")
                continue
            clean.append(label)

    catalog = (ROOT / "lib/qualifications/catalog.ts").read_text(encoding="utf-8")
    match = re.search(r'\bexamCode:\s*"denko1"(?P<body>.*?)(?:\n\s*\},)', catalog, re.S)
    live = bool(match and re.search(r'\bstatus:\s*"live"', match.group("body")))
    result = {
        "paper": PAPER,
        "requiredAcademic": REQUIRED,
        "strictCleanAcademic": len(clean),
        "pendingReview": len(pending),
        "unfinished": len(unfinished),
        "pendingDetails": pending,
        "live": live,
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    if len(clean) + len(pending) + len(unfinished) != REQUIRED:
        raise ValueError(f"Question accounting must total {REQUIRED}")
    if live and (len(clean) != REQUIRED or pending or unfinished):
        raise ValueError(f"Live Denko1 requires {REQUIRED}/{REQUIRED} strictly clean academic reviews")
    if "--require-complete" in sys.argv and (len(clean) != REQUIRED or pending or unfinished):
        raise ValueError("Denko1 is not strictly complete")


if __name__ == "__main__":
    main()
