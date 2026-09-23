"""Pin current candidate/official-row hashes to clean direct Opus reviews per question."""

from hashlib import sha256
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
REVIEWED = ROOT / "data/questions/denko2/reviewed"
BATCHES = ROOT / "data/raw_pdfs/denko2/review/batches"
FINAL = ROOT / "docs/evidence/denko2-final"


def digest(path: Path) -> str:
    raw = path.read_bytes()
    if path.suffix.lower() in {".json", ".md", ".txt", ".py"}:
        raw = raw.decode("utf-8").replace("\r\n", "\n").replace("\r", "\n").encode("utf-8")
    return sha256(raw).hexdigest()


def canonical(value) -> str:
    return sha256(json.dumps(value, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()


def main() -> None:
    if len(sys.argv) != 2 or sys.argv[1] not in {"20240526", "20241027", "20250525", "20251026"}:
        raise SystemExit("Usage: denko2-finalize-academic.py YYYYMMDD")
    paper = sys.argv[1]
    map_path = FINAL / f"{paper}-review-map.json"
    mapping = json.loads(map_path.read_text(encoding="utf-8"))
    candidates = {item["number"]: item for path in sorted(REVIEWED.glob(f"{paper}-q*.json"))
                  for item in json.loads(path.read_text(encoding="utf-8"))}
    sources = {item["number"]: item for path in sorted(BATCHES.glob(f"{paper}-q??-??.json"))
               for item in json.loads(path.read_text(encoding="utf-8"))["questions"]}
    if set(mapping) != {str(number) for number in range(1, len(mapping) + 1)}:
        raise ValueError("Review map must cover consecutive questions from 1")
    result = []
    for label, relative in mapping.items():
        number = int(label)
        candidate, source = candidates[number], sources[number]
        direct = ROOT / relative
        review = json.loads(direct.read_text(encoding="utf-8"))
        assessments = review.get("assessment", [])
        group_numbers = [item["number"] for item in assessments]
        if len(group_numbers) != len(set(group_numbers)) or number not in group_numbers:
            raise ValueError(f"Q{number} absent/duplicated in direct review {relative}")
        current_group = [candidates[value] for value in group_numbers]
        hashes = review.get("inputHashes", {})
        if hashes.get("draftSha256") != canonical(current_group):
            raise ValueError(f"Q{number} direct review candidate hash stale: {relative}")
        if hashes.get("rowSha256", {}).get(label) != digest(ROOT / source["reviewCrop"]):
            raise ValueError(f"Q{number} original row hash stale")
        assessment = next(item for item in assessments if item["number"] == number)
        if assessment.get("status") != "PASS":
            raise ValueError(f"Q{number} direct review is not PASS")
        for key, value in assessment.items():
            if key.endswith(("Issues", "NeedsExternalCheck", "Check")) and isinstance(value, list) and value:
                raise ValueError(f"Q{number} direct review has pending {key}")
        if candidate.get("officialAnswer") != source["officialAnswer"] or candidate.get("uncertainty"):
            raise ValueError(f"Q{number} answer mismatch or candidate uncertainty")
        figures = {}
        for url in candidate.get("imageUrls", []) + list(candidate.get("choiceImageUrls", {}).values()):
            path = ROOT / "public" / url.lstrip("/")
            key = str(path.relative_to(ROOT)).replace("\\", "/")
            actual = digest(path)
            if hashes.get("detailFigureSha256", {}).get(key) != actual and hashes.get("sharedFigureSha256", {}).get(key) != actual:
                raise ValueError(f"Q{number} figure not verified in direct review: {key}")
            figures[key] = actual
        law_path = ROOT / f"docs/evidence/denko2-law/{paper}-q{number:02}.json"
        law = None
        if law_path.exists():
            key = str(law_path.relative_to(ROOT)).replace("\\", "/")
            actual = digest(law_path)
            if hashes.get("legalReceiptSha256", {}).get(key) not in {actual, sha256(law_path.read_bytes()).hexdigest()}:
                raise ValueError(f"Q{number} source proof not verified in direct review")
            if json.loads(law_path.read_text(encoding="utf-8")).get("unresolved"):
                raise ValueError(f"Q{number} source proof has unresolved item")
            law = {"path": key, "sha256": actual}
        result.append({
            "number": number,
            "status": "clean-direct-pass",
            "currentCandidateSha256": canonical(candidate),
            "originalRowSha256": digest(ROOT / source["reviewCrop"]),
            "officialAnswer": source["officialAnswer"],
            "directReviewReceipt": relative,
            "directReviewSha256": digest(direct),
            "figureSha256": figures,
            "lawReceipt": law,
        })
    output = FINAL / f"{paper}.json"
    output.write_text(json.dumps({"schemaVersion": 1, "paper": paper, "status": "partial" if len(result) < 50 else "complete",
                                  "cleanQuestionCount": len(result), "assessment": result}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{paper}: pinned {len(result)}/50 candidate-row-direct-review pairs")


if __name__ == "__main__":
    main()
