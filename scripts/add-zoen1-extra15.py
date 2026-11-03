"""Append the reviewed 2026 1級造園 A-paper batch without altering the pilot."""

from __future__ import annotations

import json
from pathlib import Path

from extract_zoen1_pilot import extract


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data/questions/zoen1/2026-september.json"
EDITORIAL = ROOT / "reports/zoen1-20260927/extra15-editorial.json"
NUMBERS = [6, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18, 19, 22, 30, 34]


def main() -> None:
    data = json.loads(SOURCE.read_text(encoding="utf-8"))
    editorial = json.loads(EDITORIAL.read_text(encoding="utf-8"))
    assert sorted(int(key) for key in editorial) == NUMBERS
    paper = next(item for item in data["papers"] if item["session"] == "mondai-a")
    existing = {item["number"]: item for item in paper["questions"]}
    pilot = {1, 2, 3, 4, 5}
    assert set(existing) in (pilot, pilot | set(NUMBERS))
    official = json.loads((ROOT / "reports/zoen1-20260927/official-answers.json").read_text(encoding="utf-8"))
    extracted = extract("mondai-a", NUMBERS)
    assert paper["questionSha256"] == extracted["questionPdfSha256"]
    for item in extracted["questions"]:
        number = item["number"]
        if number in existing:
            assert {key: existing[number][key] for key in ("number", "pdfPage", "question", "choices")} == item
        item["officialAnswerNumbers"] = official["answers"]["mondai-a"][number - 1]
        item.update(editorial[str(number)])
        assert len(item["choices"]) == len(item["choiceExplanations"]) == 4
        existing[number] = item
    paper["questions"] = [existing[number] for number in sorted(existing)]
    paper["publishedCount"] = len(paper["questions"])
    assert paper["publishedCount"] == 20
    SOURCE.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Added {len(NUMBERS)} questions; paper A now has {paper['publishedCount']}")


if __name__ == "__main__":
    main()
