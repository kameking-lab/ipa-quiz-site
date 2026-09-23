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


def portable_digest(path: Path) -> str:
    """Hash text receipts independent of checkout newline mode; keep binaries raw."""
    raw = path.read_bytes()
    if path.suffix.lower() in {".json", ".md", ".txt", ".py"}:
        raw = raw.decode("utf-8").replace("\r\n", "\n").replace("\r", "\n").encode("utf-8")
    return sha256(raw).hexdigest()


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
    """Use direct Opus receipts only, with per-question candidate/source hashes."""
    current: dict[int, list[tuple[dict, str]]] = {}
    for path in sorted(INDEPENDENT.glob(f"{stem}-opus-review-part*.json")):
        review = json.loads(path.read_text(encoding="utf-8"))
        assessments = review.get("assessment", [])
        numbers = [item.get("number") for item in assessments]
        if not numbers or len(numbers) != len(set(numbers)) or not set(numbers).issubset(source_items):
            continue
        hashes = review.get("inputHashes", {})
        relative = str(path.relative_to(ROOT)).replace("\\", "/")
        for assessment in assessments:
            number = assessment["number"]
            candidate = candidates.get((stem[:8], number))
            if candidate is None:
                continue
            canonical = sha256(json.dumps(candidate, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()
            if hashes.get("candidateSha256"):
                if hashes["candidateSha256"].get(str(number)) != canonical:
                    continue
            else:
                group = [candidates.get((stem[:8], value)) for value in numbers]
                if any(item is None for item in group) or hashes.get("draftSha256") != sha256(
                    json.dumps(group, ensure_ascii=False, sort_keys=True).encode("utf-8")
                ).hexdigest():
                    continue
            crop = ROOT / source_items[number]["reviewCrop"]
            if hashes.get("rowSha256", {}).get(str(number)) != sha256(crop.read_bytes()).hexdigest():
                continue
            figures = [ROOT / "public" / url.lstrip("/") for url in candidate.get("imageUrls", []) + list(candidate.get("choiceImageUrls", {}).values())]
            if any(not path.is_file() or sha256(path.read_bytes()).hexdigest() not in {
                hashes.get("detailFigureSha256", {}).get(str(path.relative_to(ROOT)).replace("\\", "/")),
                hashes.get("sharedFigureSha256", {}).get(str(path.relative_to(ROOT)).replace("\\", "/")),
            } for path in figures):
                continue
            proof = ROOT / f"docs/evidence/denko2-law/{stem[:8]}-q{number:02}.json"
            if proof.exists():
                key = str(proof.relative_to(ROOT)).replace("\\", "/")
                if hashes.get("legalReceiptSha256", {}).get(key) not in {portable_digest(proof), sha256(proof.read_bytes()).hexdigest()}:
                    continue
            source_pack = ROOT / f"docs/evidence/denko2-sources/{stem[:8]}/q{number:02}.json"
            if source_pack.exists() and hashes.get("sourcePackSha256", {}).get(str(number)) not in {
                portable_digest(source_pack), sha256(source_pack.read_bytes()).hexdigest()
            }:
                continue
            current.setdefault(number, []).append((assessment, relative))
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
            if (not relative.startswith(("docs/evidence/denko2-independent/", "docs/evidence/denko2-final/direct/")) or
                not (ROOT / relative).is_file() or
                pinned.get("directReviewSha256") not in {
                    portable_digest(ROOT / relative), sha256((ROOT / relative).read_bytes()).hexdigest()
                }):
                pending.append(f"{label}: final direct Opus receipt missing or changed")
                continue
            figures = {str((ROOT / "public" / url.lstrip("/")).relative_to(ROOT)).replace("\\", "/"):
                       sha256((ROOT / "public" / url.lstrip("/")).read_bytes()).hexdigest()
                       for url in candidate.get("imageUrls", []) + list(candidate.get("choiceImageUrls", {}).values())}
            if pinned.get("figureSha256") != figures:
                pending.append(f"{label}: final figure hashes changed")
                continue
            law_path = ROOT / f"docs/evidence/denko2-law/{paper}-q{number:02}.json"
            source_pack = ROOT / f"docs/evidence/denko2-sources/{paper}/q{number:02}.json"
            law = pinned.get("lawReceipt")
            expected_proof = source_pack if source_pack.exists() else law_path if law_path.exists() else None
            if (expected_proof and (not law or law.get("path") != str(expected_proof.relative_to(ROOT)).replace("\\", "/") or
                                    law.get("sha256") != portable_digest(expected_proof))) or (not expected_proof and law):
                pending.append(f"{label}: final official-source proof changed")
                continue
            reviews = [item for item in by_number.get(number, []) if item[1] == relative]
            if relative.startswith("docs/evidence/denko2-final/direct/"):
                wrapper = json.loads((ROOT / relative).read_text(encoding="utf-8"))
                upstream_relative = wrapper.get("upstreamReviewReceipt", "")
                upstream = ROOT / upstream_relative
                if (wrapper.get("receiptKind") != "canonicalized-direct-review" or
                    not upstream_relative.startswith("docs/evidence/denko2-strict-") or
                    not upstream.is_file() or
                    wrapper.get("upstreamReviewSha256") != portable_digest(upstream)):
                    pending.append(f"{label}: canonical direct receipt upstream missing or changed")
                    continue
                upstream_data = json.loads(upstream.read_text(encoding="utf-8"))
                if upstream_data.get("inputHashes", {}).get("candidateSha256", {}).get(str(number)) != canonical:
                    pending.append(f"{label}: canonical direct upstream candidate mismatch")
                    continue
                matches = [item for item in upstream_data.get("assessment", []) if item.get("number") == number]
                if len(matches) != 1 or matches[0].get("status") != "PASS" or pending_fields(matches[0]):
                    pending.append(f"{label}: canonical direct upstream review pending")
                    continue
                if wrapper.get("assessment") != matches:
                    pending.append(f"{label}: canonical direct assessment differs from upstream")
                    continue
                if (wrapper.get("inputHashes", {}).get("draftSha256") != sha256(json.dumps([candidate], ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest() or
                    wrapper.get("inputHashes", {}).get("rowSha256", {}).get(str(number)) != original_sha or
                    wrapper.get("inputHashes", {}).get("detailFigureSha256") != figures or
                    wrapper.get("inputHashes", {}).get("legalReceiptSha256", {}) != (
                        {str(expected_proof.relative_to(ROOT)).replace("\\", "/"): portable_digest(expected_proof)} if expected_proof else {}
                    )):
                    pending.append(f"{label}: canonical direct input hashes changed")
                    continue
                reviews = [(matches[0], relative)]
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
