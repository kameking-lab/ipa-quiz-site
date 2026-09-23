"""Build one-question canonical receipts from the accepted 2024-first Opus reviews."""

from __future__ import annotations

from hashlib import sha256
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PAPER = "20240526"
REVIEWED = ROOT / "data/questions/denko2/reviewed"
BATCHES = ROOT / "data/raw_pdfs/denko2/review/batches"
STRICT = ROOT / "docs/evidence/denko2-strict-20240526"
FINAL = ROOT / "docs/evidence/denko2-final"
DIRECT = FINAL / "direct"


def canonical(value) -> str:
    return sha256(json.dumps(value, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()


def digest(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def clean(item: dict) -> bool:
    if item.get("status") != "PASS":
        return False
    return not any(isinstance(value, list) and value
                   for key, value in item.items()
                   if key.endswith(("Issues", "NeedsExternalCheck", "Check")))


def main() -> None:
    candidates = {item["number"]: item
                  for path in sorted(REVIEWED.glob(f"{PAPER}-q*.json"))
                  for item in json.loads(path.read_text(encoding="utf-8"))}
    candidate_paths = {item["number"]: path
                       for path in sorted(REVIEWED.glob(f"{PAPER}-q*.json"))
                       for item in json.loads(path.read_text(encoding="utf-8"))}
    sources = {item["number"]: item
               for path in sorted(BATCHES.glob(f"{PAPER}-q??-??.json"))
               for item in json.loads(path.read_text(encoding="utf-8"))["questions"]}
    if set(candidates) != set(range(1, 51)) or set(sources) != set(range(1, 51)):
        raise ValueError("20240526 candidate/source coverage is not 50/50")

    # Every question was re-reviewed directly against its current candidate,
    # official row crop and attached figures.  Include both the numbered rounds
    # and the finalpin targeted rounds, then select only a clean receipt whose
    # per-question input hash still equals the current canonical candidate.
    strict_receipts = []
    for path in STRICT.glob("*-opus.json"):
        review = json.loads(path.read_text(encoding="utf-8"))
        if isinstance(review.get("assessment"), list) and isinstance(
                review.get("inputHashes", {}).get("candidateSha256"), dict):
            strict_receipts.append((path.stat().st_mtime_ns, path, review))
    strict_receipts.sort(key=lambda item: (item[0], item[1].name), reverse=True)

    DIRECT.mkdir(parents=True, exist_ok=True)
    mapping = {}
    accepted = []
    for number in range(1, 51):
        candidate = candidates[number]
        selected_path = None
        selected_review = None
        selected_assessment = None
        proof = None
        for _, path, review in strict_receipts:
            assessment = next((item for item in review.get("assessment", [])
                               if item.get("number") == number and clean(item)), None)
            if assessment is None:
                continue
            if review.get("inputHashes", {}).get("candidateSha256", {}).get(str(number)) != canonical(candidate):
                continue
            selected_path, selected_review, selected_assessment = path, review, assessment
            proof = "current per-question candidate hash equals a clean source-aware direct Opus input hash"
            break
        if selected_path is None:
            raise ValueError(f"No current clean Opus receipt for Q{number}")

        crop = ROOT / sources[number]["reviewCrop"]
        figures = {}
        for url in candidate.get("imageUrls", []) + list(candidate.get("choiceImageUrls", {}).values()):
            path = ROOT / "public" / url.lstrip("/")
            if not path.is_file():
                raise ValueError(f"Q{number} missing figure {path}")
            figures[str(path.relative_to(ROOT)).replace("\\", "/")] = digest(path)
        relative_review = str(selected_path.relative_to(ROOT)).replace("\\", "/")
        wrapper = {
            "schemaVersion": 1,
            "receiptKind": "canonicalized-direct-review",
            "paper": PAPER,
            "reviewModel": selected_review.get("reviewModel", "claude-opus-5-5"),
            "upstreamReviewReceipt": relative_review,
            "upstreamReviewSha256": digest(selected_path),
            "candidateEquivalenceProof": proof,
            "inputHashes": {
                "draftSha256": canonical([candidate]),
                "rowSha256": {str(number): digest(crop)},
                "detailFigureSha256": figures,
                "sharedFigureSha256": {},
                "legalReceiptSha256": {},
            },
            "assessment": [selected_assessment],
        }
        output = DIRECT / f"{PAPER}-q{number:02}-opus.json"
        output.write_text(json.dumps(wrapper, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        rel_output = str(output.relative_to(ROOT)).replace("\\", "/")
        mapping[str(number)] = rel_output
        accepted.append({"number": number, "receipt": rel_output,
                         "candidateSha256": canonical(candidate),
                         "originalRowSha256": digest(crop)})

    (FINAL / f"{PAPER}-review-map.json").write_text(
        json.dumps(mapping, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (FINAL / f"{PAPER}-build-audit.json").write_text(json.dumps({
        "schemaVersion": 1, "paper": PAPER, "status": "complete",
        "acceptedQuestionCount": len(accepted), "assessment": accepted,
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{PAPER}: built {len(accepted)}/50 canonical direct receipts")


if __name__ == "__main__":
    main()
