"""Pin 2025 upper candidates to clean, source-aware direct Opus reviews."""

from hashlib import sha256
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REVIEWED = ROOT / "data/questions/denko2/reviewed"
BATCHES = ROOT / "data/raw_pdfs/denko2/review/batches"
FINAL = ROOT / "docs/evidence/denko2-final"


def digest(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def canonical(value) -> str:
    return sha256(json.dumps(value, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()


def save(path: Path, value) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    paper = "20250525"
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
        hashes = review.get("inputHashes", {})
        if hashes.get("candidateSha256", {}).get(label) != canonical(candidate):
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
        source_pack = ROOT / f"docs/evidence/denko2-sources/{paper}/q{number:02}.json"
        law = None
        source_figure = None
        if source_pack.exists():
            key = str(source_pack.relative_to(ROOT)).replace("\\", "/")
            actual = digest(source_pack)
            if hashes.get("sourcePackSha256", {}).get(label) != actual:
                raise ValueError(f"Q{number} source pack not verified in direct review")
            proof = json.loads(source_pack.read_text(encoding="utf-8"))
            if proof.get("unresolved"):
                raise ValueError(f"Q{number} source pack has unresolved item")
            for entry in proof.get("officialSources", []):
                if not entry.get("url", "").startswith("https://"):
                    raise ValueError(f"Q{number} source pack has invalid official URL")
                if entry.get("localPath"):
                    original = ROOT / entry["localPath"]
                    if original.exists() and digest(original) != entry["sha256"]:
                        raise ValueError(f"Q{number} official source PDF changed: {original}")
            if proof.get("sourceFigurePath"):
                source_figure = {"path": proof["sourceFigurePath"],
                                 "sha256": digest(ROOT / proof["sourceFigurePath"])}
                if hashes.get("sourceFigureSha256", {}).get(label) != source_figure["sha256"]:
                    raise ValueError(f"Q{number} source figure not verified in direct review")
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
            "sourceFigure": source_figure,
        })
    output = FINAL / f"{paper}.json"
    save(output, {"schemaVersion": 1, "paper": paper, "status": "partial" if len(result) < 50 else "complete",
                  "cleanQuestionCount": len(result), "assessment": result})
    if len(result) == 50:
        legacy_path = ROOT / f"docs/evidence/denko2-independent/{paper}-acceptance-ledger.json"
        old = json.loads(legacy_path.read_text(encoding="utf-8"))
        rows = []
        for record in result:
            candidate = candidates[record["number"]]
            rows.append({
                "number": record["number"], "status": "PASS", "reviewModel": "claude-opus-5-5",
                "reviewReceipt": record["directReviewReceipt"],
                "directReviewSha256": record["directReviewSha256"],
                "officialAnswer": record["officialAnswer"],
                "currentCandidateSha256": record["currentCandidateSha256"],
                "originalRowSha256": record["originalRowSha256"],
                "publishedFigureSha256": record["figureSha256"],
                "sourcePack": record["lawReceipt"],
                "officialReferenceUrls": candidate.get("officialReferenceUrls", []),
                "editorialCaveatRetained": bool(candidate.get("editorialReviewNotes")),
            })
        save(legacy_path, {"exam": old["exam"], "paper": old["paper"],
                           "status": "50-of-50-independent-pass",
                           "sourceQuestionPdfSha256": old["sourceQuestionPdfSha256"],
                           "sourceAnswerPdfSha256": old["sourceAnswerPdfSha256"],
                           "reviewedQuestions": 50, "reviewedChoices": 200,
                           "strictCurrentHashPinned": True,
                           "finalReceipt": str(output.relative_to(ROOT)).replace("\\", "/"),
                           "finalReceiptSha256": digest(output), "questions": rows})
        for start in range(1, 51, 10):
            batch = f"{paper}-q{start:02}-{start+9:02}"
            subset = rows[start-1:start+9]
            aggregate = ROOT / f"docs/evidence/denko2-independent/{batch}-acceptance.json"
            save(aggregate, {"reviewModel": "claude-opus-5-5",
                             "sourceReceipts": sorted({row["reviewReceipt"] for row in subset}),
                             "strictCurrentHashPinned": True, "assessment": subset})
            coverage = ROOT / f"docs/evidence/denko2-coverage/{batch}.json"
            receipt = json.loads(coverage.read_text(encoding="utf-8"))
            receipt["strictCurrentHashPinned"] = True
            receipt["finalReceipt"] = str(output.relative_to(ROOT)).replace("\\", "/")
            receipt["finalReceiptSha256"] = digest(output)
            receipt["reviewMethod"] = "公式行画像・全肢・正答・解説・図表・一次資料をOpus独立再照合。各問の現候補、原図、図表、資料、最終direct receiptのSHA一致と未解決配列0を確認。"
            save(coverage, receipt)
    print(f"{paper}: pinned {len(result)}/50 candidate-row-direct-review pairs")


if __name__ == "__main__":
    main()
