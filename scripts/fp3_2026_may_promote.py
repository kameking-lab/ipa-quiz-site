"""Promote only independently accepted FP3 2026 academic questions."""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

from fp3_2026_may_review import KEYS, EVIDENCE, parse_result, verified


ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / "data" / "questions" / "fp3" / "academic-2026-05.json"
LEDGER = EVIDENCE / "acceptance-ledger.json"
SOURCE_URL = "https://www.jafp.or.jp/exam/mohan/files/g3_202605_qa.pdf"
SOURCE_PDF = ROOT / ".cache" / "fp3-official" / "g3_202605_qa.pdf"


def main() -> None:
    source = json.loads((EVIDENCE / "gakka-extraction.json").read_text(encoding="utf-8"))["202605"]
    manifest = json.loads((EVIDENCE / "manifest.json").read_text(encoding="utf-8"))
    source_sha = hashlib.sha256(SOURCE_PDF.read_bytes()).hexdigest()
    if source_sha != manifest["files"]["gakka"]["sha256"]:
        raise ValueError("Official PDF SHA changed")
    accepted = []
    ledger = []
    for first, last in ((1, 10),):
        stem = f"gakka-q{first:02d}-{last:02d}"
        receipts = {}
        for kind in ("solve", "explain"):
            path = EVIDENCE / "receipts" / f"{stem}-{kind}.json"
            raw = json.loads(path.read_text(encoding="utf-8"))
            if not verified(raw):
                raise ValueError(f"Unverified Opus receipt: {path}")
            receipts[kind] = parse_result(raw)
        questions = source["questions"][first - 1 : last]
        for question, solved, draft in zip(questions, receipts["solve"], receipts["explain"], strict=True):
            number = question["number"]
            keys = KEYS[: len(question["choices"])]
            answer = keys[question["answer"] - 1]
            is_accepted = (
                solved["number"] == draft["number"] == number
                and solved["answer"] == answer
                and solved["confident"] is True
                and draft["needsReview"] is False
                and set(draft["choiceExplanations"]) == set(keys)
                and all(draft["choiceExplanations"].values())
                and bool(draft["explanation"])
            )
            evidence = {
                "number": number,
                "sourcePage": question["sourcePage"],
                "sourcePdfSha256": source_sha,
                "extractedQuestionSha256": hashlib.sha256(json.dumps(question, ensure_ascii=False, sort_keys=True).encode()).hexdigest(),
                "officialAnswer": answer,
                "blindAnswer": solved["answer"],
                "status": "accepted" if is_accepted else "HOLD",
            }
            ledger.append(evidence)
            if not is_accepted:
                continue
            accepted.append({
                "id": f"fp3-2026-published-gakka-q{number}",
                "exam": "fp3",
                "session": "gakka",
                "year": 2026,
                "season": "published",
                "qNumber": number,
                "type": "multiple-choice",
                "category": "ライフプランニングと資金計画" if number <= 5 else "リスク管理",
                "topicTags": ["ライフプランニングと資金計画" if number <= 5 else "リスク管理"],
                "difficulty": 2,
                "question": question["stem"],
                "choices": dict(zip(keys, question["choices"], strict=True)),
                "answer": answer,
                "explanation": draft["explanation"],
                "choiceExplanations": draft["choiceExplanations"],
                "hasImage": False,
                "sourcePdfUrl": SOURCE_URL,
                "sourceAnswerUrl": SOURCE_URL,
                "sourceAttribution": "出典：日本FP協会 3級ファイナンシャル・プランニング技能検定 学科試験（2026年5月公表分）。改行・空白と選択肢記号をWeb表示向けに整えています。",
                "license": "JAFP-reuse-with-attribution",
                "needsReview": False,
                "lastUpdated": "2026-09-25",
                "lawReferenceDate": source["lawReferenceDate"],
            })
    if len(accepted) != 10 or [row["qNumber"] for row in accepted] != list(range(1, 11)):
        raise ValueError(f"First release requires verified Q1..10, got {len(accepted)}")
    TARGET.write_text(json.dumps(accepted, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    LEDGER.write_text(json.dumps({"target": 80, "academicTarget": 60, "practicalTarget": 20, "acceptedAcademic": 10, "acceptedPractical": 0, "rows": ledger}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Promoted FP3 2026 academic 10/60; practical 0/20")


if __name__ == "__main__":
    main()
