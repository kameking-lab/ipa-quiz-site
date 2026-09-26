"""Fail closed if any published 1級造園 question diverges from the official PDFs."""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

from extract_zoen1_pilot import EVIDENCE, SELECTED, extract


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data/questions/zoen1/2026-september.json"
ANSWERS = ROOT / "reports/zoen1-20260927/official-answers.json"


def main() -> None:
    data = json.loads(SOURCE.read_text(encoding="utf-8"))
    official = json.loads(ANSWERS.read_text(encoding="utf-8"))
    assert len(data["papers"]) == 2
    assert data["allQuestionsRequired"] is True
    assert data["appliedMultipleAnswerRange"] == {"paper": "mondai-b", "from": 24, "to": 29}
    pdf_hash = hashlib.sha256((EVIDENCE / "input/zoen1-2026-answers.pdf").read_bytes()).hexdigest()
    assert data["answerSha256"] == official["answerPdfSha256"] == pdf_hash
    checked = 0
    for paper in data["papers"]:
        session = paper["session"]
        assert paper["officialQuestionCount"] == (36 if session == "mondai-a" else 29)
        fresh = extract(session, SELECTED[session])
        assert paper["questionSha256"] == fresh["questionPdfSha256"]
        assert paper["publishedCount"] == len(paper["questions"]) == len(fresh["questions"])
        assert [item["number"] for item in paper["questions"]] == SELECTED[session]
        for item, source_item in zip(paper["questions"], fresh["questions"], strict=True):
            number = item["number"]
            assert {key: item[key] for key in ("number", "pdfPage", "question", "choices")} == source_item
            assert item["officialAnswerNumbers"] == official["answers"][session][number - 1]
            assert len(item["choiceExplanations"]) == len(item["choices"]) == 4
            assert item["explanation"].strip()
            checked += 1
    assert checked == 9
    print(f"PASS: {checked} published questions, choices and answers match official source PDFs")


if __name__ == "__main__":
    main()
