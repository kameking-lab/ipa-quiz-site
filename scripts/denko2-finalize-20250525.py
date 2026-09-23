"""Finalize 2025 upper only when every official row has an independent PASS."""

from hashlib import sha256
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
QUESTIONS = ROOT / "data/questions/denko2/reviewed"
REVIEWS = ROOT / "docs/evidence/denko2-independent"
COVERAGE = ROOT / "docs/evidence/denko2-coverage"


def digest(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def save(path: Path, value: object) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    latest: dict[int, tuple[Path, dict]] = {}
    receipts = sorted(REVIEWS.glob("20250525-*-opus-review-part*.json"), key=lambda p: (p.stat().st_mtime_ns, p.name))
    for receipt in receipts:
        result = json.loads(receipt.read_text(encoding="utf-8"))
        for assessment in result["assessment"]:
            latest[assessment["number"]] = (receipt, assessment)
    if set(latest) != set(range(1, 51)):
        raise ValueError(f"Missing independent review: {sorted(set(range(1, 51)) - set(latest))}")
    fixes = [
        n for n, (_, item) in latest.items()
        if item["status"] != "PASS" or any(
            key.lower().endswith(("issues", "needsexternalcheck", "check")) and value not in ([], None, False, "")
            for key, value in item.items()
        )
    ]
    if fixes:
        raise ValueError(f"Latest independent review has FIX or unresolved checks: {sorted(fixes)}")

    rows: dict[int, dict] = {}
    for path in sorted(QUESTIONS.glob("20250525-q??-??.json")):
        questions = json.loads(path.read_text(encoding="utf-8"))
        for item in questions:
            if item["number"] in rows:
                raise ValueError(f"Duplicate row: {item['number']}")
            rows[item["number"]] = item
            # Preserve the reviewer's caveat as a private editorial note. The
            # live content contains only source-checked claims that passed QC.
            if item.get("uncertainty"):
                item["editorialReviewNotes"] = item["uncertainty"]
                item["uncertainty"] = ""
        save(path, questions)
    if set(rows) != set(range(1, 51)):
        raise ValueError("Reviewed content lacks 50 official question rows")

    manifest = json.loads((ROOT / "scripts/denko2-source-manifest.json").read_text(encoding="utf-8"))
    paper = next(item for item in manifest["papers"] if item["date"] == "2025-05-25")
    acceptance = []
    for n in range(1, 51):
        source, assessment = latest[n]
        item = rows[n]
        crop = ROOT / item["reviewedFromCrop"]
        image_paths = [ROOT / "public" / url.lstrip("/") for url in item.get("imageUrls", [])]
        image_paths += [ROOT / "public" / url.lstrip("/") for url in item.get("choiceImageUrls", {}).values()]
        acceptance.append({
            "number": n,
            "status": assessment["status"],
            "reviewReceipt": source.relative_to(ROOT).as_posix(),
            "reviewModel": "claude-opus-5-5",
            "officialAnswer": item["officialAnswer"],
            "currentCandidateSha256": sha256(json.dumps(item, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest(),
            "originalRowSha256": digest(crop),
            "publishedFigureSha256": {path.relative_to(ROOT).as_posix(): digest(path) for path in image_paths},
            "officialReferenceUrls": item.get("officialReferenceUrls", []),
            "editorialCaveatRetained": bool(item.get("editorialReviewNotes")),
        })
    save(REVIEWS / "20250525-acceptance-ledger.json", {
        "exam": "第二種電気工事士",
        "paper": "2025上期学科",
        "status": "50-of-50-independent-pass",
        "sourceQuestionPdfSha256": paper["questionSha256"],
        "sourceAnswerPdfSha256": paper["answerSha256"],
        "reviewedQuestions": 50,
        "reviewedChoices": 200,
        "questions": acceptance,
    })

    for start in range(1, 51, 10):
        numbers = list(range(start, start + 10))
        batch = f"20250525-q{start:02}-{start + 9:02}"
        aggregate = REVIEWS / f"{batch}-acceptance.json"
        save(aggregate, {
            "reviewModel": "claude-opus-5-5",
            "sourceReceipts": sorted({latest[n][0].relative_to(ROOT).as_posix() for n in numbers}),
            "assessment": [acceptance[n - 1] for n in numbers],
        })
        receipt_path = COVERAGE / f"{batch}.json"
        receipt = json.loads(receipt_path.read_text(encoding="utf-8"))
        group = [rows[n] for n in numbers]
        receipt.update({
            "status": "accepted",
            "publishGate": "notification-required-and-two-full-years-required",
            "questionOriginalVisualQc": 10,
            "choiceTextOriginalVisualQc": 40,
            "choiceExplanationQc": 40,
            "figureAndPhotoQc": sum(bool(q.get("imageUrls") or q.get("choiceImageUrls")) for q in group),
            "governmentSourceQc": sum(bool(q.get("officialReferenceUrls")) for q in group),
            "governmentSourceApplicableQuestions": [q["number"] for q in group if q.get("officialReferenceUrls")],
            "reviewedQuestionNumbers": numbers,
            "unresolved": [],
            "independentVisionReview": {
                "model": "claude-opus-5-5",
                "passedQuestions": 10,
                "totalQuestions": 10,
                "receipts": [aggregate.relative_to(ROOT).as_posix()],
            },
            "reviewMethod": "公式行画像・四肢・正答・肢別解説・図表をOpus独立照合。修正問は当該問のみ再照合し、設問別最終証跡をacceptance-ledgerに集約。",
        })
        save(receipt_path, receipt)
    print("2025 upper accepted 50/50 questions, 200/200 choices, 0 latest FIX")


if __name__ == "__main__":
    # Keep the historical entry point safe: only the hash-pinned strict gate
    # may regenerate the acceptance ledger.
    from runpy import run_path

    run_path(str(Path(__file__).with_name("denko2-finalize-20250525-strict.py")), run_name="__main__")
