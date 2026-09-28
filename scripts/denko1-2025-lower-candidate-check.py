"""Check isolated candidate coverage, official keys, media and HOLD state."""

from __future__ import annotations

import hashlib
import json
from pathlib import Path
import sys

import fitz

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "docs/evidence/denko1-2025-lower-hold/reviewed-candidate"
LABELS = {"イ", "ロ", "ハ", "ニ"}


def official_answers(path: Path) -> dict[int, str]:
    if hashlib.sha256(path.read_bytes()).hexdigest() != "f377a1db85db4544c7c0d5b443cb7d6c139ba90f87826523eb6444625c8c8a56":
        raise ValueError("Unexpected official answer PDF hash")
    doc = fitz.open(path)
    words = [w[4] for w in doc[0].get_text("words")]
    result = {int(words[i]): words[i + 1] for i in range(len(words) - 1)
              if words[i].isdigit() and 1 <= int(words[i]) <= 50 and words[i + 1] in LABELS}
    assert set(result) == set(range(1, 51))
    return result


def main(answer_pdf: Path) -> None:
    batches = [BASE / f"20251005-q{i:02}-{i + 9:02}.json" for i in range(1, 51, 10)]
    rows = [row for path in batches for row in json.loads(path.read_text(encoding="utf-8"))]
    assert [r["number"] for r in rows] == list(range(1, 51))
    official = official_answers(answer_pdf)
    image_count = 0
    for row in rows:
        number = row["number"]
        assert row["officialAnswer"] == official[number]
        assert set(row["choices"]) == set(row["choiceExplanations"]) == LABELS
        assert all(row["choices"][label] and row["choiceExplanations"][label] for label in LABELS)
        assert row["question"] and row["explanation"] and row["sourceAttribution"]
        assert row["publicationStatus"] == "HOLD" and row["normalizationStatus"] == "CANDIDATE_PENDING_FINAL_QA"
        assert (BASE / row["reviewedFromCrop"]).is_file()
        paths = [*row["imageUrls"], *row.get("choiceImageUrls", {}).values()]
        if number in {13, 25, 41, 42, 46, 49}:
            assert set(row["choiceImageUrls"]) == LABELS
        if 30 <= number <= 34:
            assert "media/shared-q30-34.png" in paths
        if 41 <= number <= 50:
            assert "media/shared-q41-50.png" in paths
        for rel in paths:
            assert (BASE / rel).is_file(), (number, rel)
        image_count += len(paths)
    assert "10⁻³" in rows[0]["question"] and rows[0]["officialAnswer"] == "ニ"
    assert "100 V" in rows[2]["question"] and "100 V" in rows[3]["question"]
    assert "100 μF" in rows[38]["choices"]["ハ"]
    assert len(list((BASE / "media").glob("*.png"))) == 76
    print(json.dumps({"questions": len(rows), "choices": sum(len(r["choices"]) for r in rows),
                      "officialAnswersMatched": 50, "mediaFiles": 76,
                      "imageReferences": image_count, "publicationApproval": 0, "status": "HOLD"}))


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit(f"Usage: python {Path(__file__).name} OFFICIAL_ANSWER.pdf")
    main(Path(sys.argv[1]))
