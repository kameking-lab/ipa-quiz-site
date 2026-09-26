"""Compare every published 1級電気通信 item with fresh official PDF extracts."""

from __future__ import annotations

import json
from pathlib import Path

from build_tsushin1_pilot import OFFICIAL_SELECTED, official_answer_rows
from extract_tsushin1_pilot import SELECTED, extract


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data/questions/tsushin1/2026-september.json"


def main() -> None:
    source = json.loads(SOURCE.read_text(encoding="utf-8"))
    rows = official_answer_rows()
    answers = {
        "mondai-a": {i + 1: answer for i, answer in enumerate(sum(rows[:4], []))},
        "mondai-b": {i + 1: answer for i, answer in enumerate(sum(rows[4:], []))},
    }
    assert source["exam"] == "tsushin1" and len(source["papers"]) == 2
    count = 0
    for paper in source["papers"]:
        session = paper["session"]
        extracted = extract(session, SELECTED[session])
        assert paper["questionSha256"] == extracted["questionPdfSha256"]
        assert paper["publishedCount"] == len(SELECTED[session]) == len(paper["questions"])
        assert [item["number"] for item in paper["questions"]] == SELECTED[session]
        for item, official in zip(paper["questions"], extracted["questions"]):
            for key in ["number", "pdfPage", "question", "choices"]:
                assert item[key] == official[key], f"{session} No.{item['number']} {key} differs from official PDF"
            answer = answers[session][item["number"]]
            assert answer == OFFICIAL_SELECTED[session][item["number"]]
            assert item["officialAnswerNumbers"] == [answer]
            assert len(item["choiceExplanations"]) == 4
            count += 1
    print(f"PASS {count}/{count} published prompts, four choices, and answers equal official PDFs")


if __name__ == "__main__":
    main()
