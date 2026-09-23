"""Pin a delegated Denko2 academic batch without modifying other paper rows."""

from hashlib import sha256
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]


def digest(path: Path, *, text: bool = False) -> str:
    data = path.read_bytes()
    if text:
        data = data.replace(b"\r\n", b"\n").replace(b"\r", b"\n")
    return sha256(data).hexdigest()


def canonical(value) -> str:
    return sha256(json.dumps(value, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()


def main() -> None:
    if len(sys.argv) != 4:
        raise SystemExit("Usage: denko2-finalize-batch.py YYYYMMDD first last")
    paper, first, last = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
    suffix = f"{paper}-q{first:02}-{last:02}"
    evidence = ROOT / "docs/evidence/denko2-final"
    mapping = json.loads((evidence / f"{suffix}-review-map.json").read_text(encoding="utf-8"))
    expected = {str(number) for number in range(first, last + 1)}
    if set(mapping) != expected:
        raise ValueError("Review map must cover the exact delegated range")
    candidates = {
        item["number"]: item
        for path in sorted((ROOT / "data/questions/denko2/reviewed").glob(f"{paper}-q*.json"))
        for item in json.loads(path.read_text(encoding="utf-8"))
    }
    batch = json.loads((ROOT / f"data/raw_pdfs/denko2/review/batches/{suffix}.json").read_text(encoding="utf-8"))
    rows = {item["number"]: item for item in batch["questions"]}
    if set(rows) != {int(label) for label in expected}:
        raise ValueError("Official source batch has unexpected rows")
    result = []
    for label, relative in mapping.items():
        number = int(label)
        candidate, row = candidates[number], rows[number]
        receipt_path = ROOT / relative
        review = json.loads(receipt_path.read_text(encoding="utf-8"))
        assessments = review.get("assessment", [])
        group_numbers = [item["number"] for item in assessments]
        if len(group_numbers) != len(set(group_numbers)) or number not in group_numbers:
            raise ValueError(f"Q{number} missing or duplicated in direct receipt")
        hashes = review["inputHashes"]
        if hashes.get("draftSha256") != canonical([candidates[value] for value in group_numbers]):
            raise ValueError(f"Q{number} canonical candidate group changed")
        row_sha = digest(ROOT / row["reviewCrop"])
        if hashes.get("rowSha256", {}).get(label) != row_sha:
            raise ValueError(f"Q{number} official row changed")
        assessment = next(item for item in assessments if item["number"] == number)
        if assessment.get("status") != "PASS":
            raise ValueError(f"Q{number} direct review is not PASS")
        if any(value for key, value in assessment.items()
               if key.endswith(("Issues", "NeedsExternalCheck", "Check")) and isinstance(value, list)):
            raise ValueError(f"Q{number} direct review has unresolved issue/check")
        if candidate.get("officialAnswer") != row["officialAnswer"] or candidate.get("uncertainty"):
            raise ValueError(f"Q{number} answer mismatch or uncertainty")
        figures = {}
        for url in candidate.get("imageUrls", []) + list(candidate.get("choiceImageUrls", {}).values()):
            path = ROOT / "public" / url.lstrip("/")
            key, actual = str(path.relative_to(ROOT)).replace("\\", "/"), digest(path)
            if (hashes.get("detailFigureSha256", {}).get(key) != actual and
                    hashes.get("sharedFigureSha256", {}).get(key) != actual):
                raise ValueError(f"Q{number} figure not included in direct review: {key}")
            figures[key] = actual
        source_pack = ROOT / f"docs/evidence/denko2-sources/{paper}/q{number:02}.json"
        source = None
        if source_pack.exists():
            actual = digest(source_pack, text=True)
            if hashes.get("sourcePackSha256", {}).get(label) != actual:
                raise ValueError(f"Q{number} primary source pack changed")
            source_data = json.loads(source_pack.read_text(encoding="utf-8"))
            source = {"path": str(source_pack.relative_to(ROOT)).replace("\\", "/"), "sha256": actual,
                      "primaryDocuments": []}
            for document in source_data.get("officialSources", []):
                recorded = document.get("sha256")
                if recorded:
                    local = ROOT / document["localPath"]
                    if local.exists() and digest(local) != recorded:
                        raise ValueError(f"Q{number} primary document bytes changed: {local}")
                    source["primaryDocuments"].append({"url": document["url"], "sha256": recorded})
            figure_relative = source_data.get("sourceFigurePath")
            if figure_relative:
                figure_sha = digest(ROOT / figure_relative)
                if hashes.get("sourceFigureSha256", {}).get(label) != figure_sha:
                    raise ValueError(f"Q{number} primary source figure changed")
                source["figurePath"] = figure_relative
                source["figureSha256"] = figure_sha
        result.append({
            "number": number,
            "status": "clean-direct-pass",
            "currentCandidateSha256": canonical(candidate),
            "canonicalGroupSha256": hashes["draftSha256"],
            "originalRowSha256": row_sha,
            "officialAnswer": row["officialAnswer"],
            "directReviewReceipt": relative,
            "directReviewSha256": digest(receipt_path, text=True),
            "figureSha256": figures,
            "sourcePack": source,
        })
    output = evidence / f"{suffix}.json"
    output.write_text(json.dumps({"schemaVersion": 1, "paper": paper, "range": [first, last],
                                  "status": "complete-batch", "cleanQuestionCount": len(result),
                                  "assessment": result}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{suffix}: pinned {len(result)}/{last - first + 1} clean direct reviews")


if __name__ == "__main__":
    main()
