"""Combine independently checked official transcription, answers and commentary."""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REPORTS = ROOT / "reports/zoen1-20260927"
OUTPUT = ROOT / "data/questions/zoen1/2026-september.json"


def read(name: str) -> dict:
    return json.loads((REPORTS / name).read_text(encoding="utf-8"))


def main() -> None:
    transcription = read("transcription-draft.json")
    answers = read("official-answers.json")
    editorial = read("explanation-draft.json")
    papers = []
    for session, label, count in (("mondai-a", "A", 36), ("mondai-b", "B", 29)):
        items = []
        for raw in transcription[session]["questions"]:
            number = raw["number"]
            answer_numbers = answers["answers"][session][number - 1]
            note = editorial[session][str(number)]
            assert len(raw["choices"]) == len(note["choiceExplanations"]) == 4
            assert all(1 <= answer_number <= 4 for answer_number in answer_numbers)
            if session == "mondai-a" or number < 24:
                assert len(answer_numbers) == 1
            item = {
                **raw,
                "officialAnswerNumbers": answer_numbers,
                **note,
            }
            items.append(item)
        papers.append({
            "session": session,
            "paper": label,
            "officialQuestionCount": count,
            "publishedCount": len(items),
            "questionUrl": answers["questionPdfUrls"][session],
            "questionSha256": transcription[session]["questionPdfSha256"],
            "questions": items,
        })
    source = {
        "exam": "zoen1",
        "year": 2026,
        "season": "september",
        "allQuestionsRequired": True,
        "appliedMultipleAnswerRange": answers["appliedMultipleAnswerRange"],
        "answerUrl": answers["answerPdfUrl"],
        "answerSha256": answers["answerPdfSha256"],
        "papers": papers,
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(source, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Built {sum(len(paper['questions']) for paper in papers)} zoen1 pilot questions into {OUTPUT}")


if __name__ == "__main__":
    main()
