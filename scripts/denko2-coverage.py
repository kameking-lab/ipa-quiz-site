"""Maintain per-ten-question acceptance receipts without inflating draft progress."""

import json
from pathlib import Path
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
BATCHES = ROOT / "data/raw_pdfs/denko2/review/batches"
RECEIPTS = ROOT / "docs/evidence/denko2-coverage"
REVIEWED = ROOT / "data/questions/denko2/reviewed"


def read_vision_count(path: Path) -> int:
    items = []
    for part in sorted(path.parent.glob(path.stem + "-vision-part[0-9][0-9].json")):
        items.extend(json.loads(part.read_text(encoding="utf-8")))
    return len({item.get("number") for item in items})


def main() -> None:
    RECEIPTS.mkdir(parents=True, exist_ok=True)
    required = [path for path in sorted(BATCHES.glob("*-q??-??.json")) if path.name[:4] in {"2024", "2025"}]
    accepted = 0
    for path in required:
        batch = json.loads(path.read_text(encoding="utf-8"))
        output = RECEIPTS / path.name
        receipt = json.loads(output.read_text(encoding="utf-8")) if output.exists() else {
            "schemaVersion": 1,
            "batch": path.stem,
            "status": "source-verified-draft-pending",
            "questionOriginalVisualQc": 0,
            "choiceTextOriginalVisualQc": 0,
            "choiceExplanationQc": 0,
            "figureAndPhotoQc": 0,
            "governmentSourceQc": 0,
            "reviewedQuestionNumbers": [],
            "unresolved": ["原本画像での全問・全肢・解説・図表の個別照合が未完了"],
        }
        numbers = [item["number"] for item in batch["questions"]]
        if numbers != list(range(numbers[0], numbers[0] + 10)):
            raise ValueError(f"Non-contiguous source batch: {path.name}")
        receipt.update({
            "sourceDate": batch["date"],
            "sourceQuestionPdfSha256": batch["questionPdfSha256"],
            "sourceAnswerPdfSha256": batch["answerPdfSha256"],
            "sourceQuestionNumbers": numbers,
            "sourceOfficialAnswerCount": len(batch["questions"]),
            "visionDraftQuestionCount": read_vision_count(path),
        })
        if receipt["status"] == "accepted":
            if (receipt["questionOriginalVisualQc"] != 10 or
                receipt["choiceTextOriginalVisualQc"] != 40 or
                receipt["choiceExplanationQc"] != 40 or
                sorted(receipt["reviewedQuestionNumbers"]) != numbers or
                receipt["unresolved"]):
                raise ValueError(f"Incomplete accepted receipt: {output}")
            reviewed_numbers = set()
            for reviewed_file in REVIEWED.glob(path.name[:8] + "-*.json"):
                reviewed_numbers.update(item["number"] for item in json.loads(reviewed_file.read_text(encoding="utf-8")))
            if not set(numbers).issubset(reviewed_numbers):
                raise ValueError(f"Accepted receipt lacks reviewed content: {output}")
            independent = receipt.get("independentVisionReview", {})
            if independent.get("passedQuestions") != 10 or independent.get("totalQuestions") != 10:
                raise ValueError(f"Accepted receipt lacks full independent review: {output}")
            independent_numbers = set()
            for relative in independent.get("receipts", []):
                review = json.loads((ROOT / relative).read_text(encoding="utf-8"))
                for item in review["assessment"]:
                    if item["status"] != "PASS":
                        raise ValueError(f"Independent review not passed: {relative} Q{item['number']}")
                    independent_numbers.add(item["number"])
            if independent_numbers != set(numbers):
                raise ValueError(f"Independent review coverage differs: {output}")
            accepted += 10
        output.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    strict = subprocess.run([sys.executable, str(ROOT / "scripts/denko2-strict-coverage.py")],
                            capture_output=True, text=True, check=True)
    counts = json.loads(strict.stdout)
    print(f"Required 200 questions / 800 choices; strict-clean {counts['strictCleanAcademic']} / 200; "
          f"legacy batch-marked {accepted} / 200; pending {counts['pendingReview']}; "
          f"unfinished {counts['unfinished']}; batch receipts {len(required)}")


if __name__ == "__main__":
    main()
