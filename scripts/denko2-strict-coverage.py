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
INDEPENDENT = ROOT / "docs/evidence/denko2-independent"
FINAL = ROOT / "docs/evidence/denko2-final"


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


def current_direct_reviews(stem: str, source_items: dict[int, dict], candidates: dict) -> dict[int, list[tuple[dict, str]]]:
    """Ignore legacy aggregate PASS claims and verify direct Opus inputs afresh."""
    current: dict[int, list[tuple[dict, str]]] = {}
    for path in sorted(INDEPENDENT.glob(f"{stem}-opus-review-part*.json")):
        review = json.loads(path.read_text(encoding="utf-8"))
        assessments = review.get("assessment", [])
        numbers = [item.get("number") for item in assessments]
        if not numbers or len(numbers) != len(set(numbers)) or not set(numbers).issubset(source_items):
            continue
        items = [candidates.get((stem[:8], number)) for number in numbers]
        if any(item is None for item in items):
            continue
        hashes = review.get("inputHashes", {})
        digest = sha256(json.dumps(items, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()
        if hashes.get("draftSha256") != digest:
            continue
        if any(hashes.get("rowSha256", {}).get(str(number)) !=
               sha256((ROOT / source_items[number]["reviewCrop"]).read_bytes()).hexdigest()
               for number in numbers):
            continue
        proof_changed = False
        for field in ("sharedFigureSha256", "detailFigureSha256", "legalReceiptSha256"):
            for relative, recorded in hashes.get(field, {}).items():
                target = ROOT / relative
                if not target.is_file() or sha256(target.read_bytes()).hexdigest() != recorded:
                    proof_changed = True
        if hashes.get("commonInstructionsSha256"):
            common = INDEPENDENT / f"{stem[:8]}-common-instructions.png"
            if not common.is_file() or sha256(common.read_bytes()).hexdigest() != hashes["commonInstructionsSha256"]:
                proof_changed = True
        for number in numbers:
            law_path = ROOT / f"docs/evidence/denko2-law/{stem[:8]}-q{number:02}.json"
            if law_path.exists():
                relative = str(law_path.relative_to(ROOT)).replace("\\", "/")
                if hashes.get("legalReceiptSha256", {}).get(relative) != sha256(law_path.read_bytes()).hexdigest():
                    proof_changed = True
        if proof_changed:
            continue
        relative = str(path.relative_to(ROOT)).replace("\\", "/")
        for assessment in assessments:
            current.setdefault(assessment["number"], []).append((assessment, relative))
    return current


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
        source_items = {item["number"]: item for item in batch["questions"]}
        by_number = current_direct_reviews(batch_path.stem, source_items, candidates)
        final_path = FINAL / f"{paper}.json"
        final = json.loads(final_path.read_text(encoding="utf-8")) if final_path.exists() else {}
        final_items = {item["number"]: item for item in final.get("assessment", [])}
        if len(final_items) != len(final.get("assessment", [])):
            raise ValueError(f"Duplicate final question in {final_path}")
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
            pinned = final_items.get(number)
            if pinned is None:
                pending.append(f"{label}: no per-question final direct-review receipt")
                continue
            canonical = sha256(json.dumps(candidate, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()
            original_sha = sha256((ROOT / source_item["reviewCrop"]).read_bytes()).hexdigest()
            if (pinned.get("currentCandidateSha256") != canonical or
                pinned.get("originalRowSha256") != original_sha or
                pinned.get("officialAnswer") != source_item["officialAnswer"] or
                pinned.get("status") != "clean-direct-pass"):
                pending.append(f"{label}: final candidate/row/answer hash mismatch")
                continue
            relative = pinned.get("directReviewReceipt", "")
            if (not relative.startswith("docs/evidence/denko2-independent/") or
                "-opus-review-part" not in relative or
                not (ROOT / relative).is_file() or
                pinned.get("directReviewSha256") != sha256((ROOT / relative).read_bytes()).hexdigest()):
                pending.append(f"{label}: final direct Opus receipt missing or changed")
                continue
            figures = {str((ROOT / "public" / url.lstrip("/")).relative_to(ROOT)).replace("\\", "/"):
                       sha256((ROOT / "public" / url.lstrip("/")).read_bytes()).hexdigest()
                       for url in candidate.get("imageUrls", []) + list(candidate.get("choiceImageUrls", {}).values())}
            if pinned.get("figureSha256") != figures:
                pending.append(f"{label}: final figure hashes changed")
                continue
            law_path = ROOT / f"docs/evidence/denko2-law/{paper}-q{number:02}.json"
            law = pinned.get("lawReceipt")
            if (law_path.exists() and (not law or law.get("path") != str(law_path.relative_to(ROOT)).replace("\\", "/") or
                                      law.get("sha256") != sha256(law_path.read_bytes()).hexdigest())) or (not law_path.exists() and law):
                pending.append(f"{label}: final official-source proof changed")
                continue
            reviews = [item for item in by_number.get(number, []) if item[1] == relative]
            if not reviews:
                pending.append(f"{label}: direct Opus input hashes not current")
                continue
            dirty = [(assessment, relative) for assessment, relative in reviews
                     if assessment.get("status") != "PASS" or pending_fields(assessment)]
            if dirty:
                issues = sorted({field for assessment, _ in dirty for field in pending_fields(assessment)})
                paths = ",".join(relative for _, relative in dirty)
                pending.append(f"{label}: direct {paths} pending {','.join(issues) or 'status FIX'}")
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
