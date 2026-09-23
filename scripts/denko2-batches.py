"""Split verified raw extraction into bounded review/generation batches.

Each batch retains the official answer and a screenshot path. Text extracted
from PDF diagrams/formulas is only a candidate and never auto-published.
"""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / "data/raw_pdfs/denko2/review"


def main() -> None:
    papers = json.loads((CACHE / "raw-extraction.json").read_text(encoding="utf-8"))
    batch_root = CACHE / "batches"
    batch_root.mkdir(parents=True, exist_ok=True)
    for paper in papers:
        date = paper["date"].replace("-", "")
        for first in range(1, 51, 10):
            payload = {
                "date": paper["date"], "year": paper["year"], "season": paper["season"],
                "questionPdfSha256": paper["questionSha256"],
                "answerPdfSha256": paper["answerSha256"],
                "questions": paper["rows"][first - 1:first + 9],
            }
            path = batch_root / f"{date}-q{first:02d}-{first + 9:02d}.json"
            path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Generated {len(list(batch_root.glob('*-q??-??.json')))} ten-question batches at {batch_root}")


if __name__ == "__main__":
    main()
