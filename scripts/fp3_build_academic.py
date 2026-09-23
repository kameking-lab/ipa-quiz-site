"""Build the FP3 academic TypeScript corpus from extracted official data and reviewed drafts."""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / "docs" / "evidence" / "fp3-two-year"
SOURCE = json.loads((EVIDENCE / "gakka-extraction.json").read_text(encoding="utf-8"))
TARGET = ROOT / "data" / "questions" / "fp3" / "index.ts"
KEYS = "アイウエオ"
CATEGORIES = [
    "ライフプランニングと資金計画",
    "リスク管理",
    "金融資産運用",
    "タックスプランニング",
    "不動産",
    "相続・事業承継",
]
REFERENCES = {
    "ライフプランニングと資金計画": ["https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/nenkin/nenkin/index.html"],
    "リスク管理": ["https://www.fsa.go.jp/ordinary/hoken.html"],
    "金融資産運用": ["https://www.fsa.go.jp/policy/nisa2/knowledge/index.html"],
    "タックスプランニング": ["https://www.nta.go.jp/taxes/shiraberu/taxanswer/index2.htm"],
    "不動産": ["https://www.mlit.go.jp/totikensangyo/const/1_6_bt_000268.html"],
    "相続・事業承継": ["https://www.nta.go.jp/taxes/shiraberu/taxanswer/sozoku/souzo.htm"],
}


def category_for(number: int) -> str:
    offset = number - 1 if number <= 30 else number - 31
    return CATEGORIES[offset // 5]


def load_drafts(edition: str) -> dict[int, dict]:
    rows: dict[int, dict] = {}
    for path in sorted((EVIDENCE / "explanation-drafts").glob(f"{edition}-gakka*-q*.json")):
        for row in json.loads(path.read_text(encoding="utf-8")):
            number = int(row["number"])
            if number in rows and rows[number] != row:
                raise ValueError(f"Conflicting academic explanation draft: {edition} Q{number}")
            rows[number] = row
    if sorted(rows) != list(range(1, 61)):
        raise ValueError(f"{edition}: expected explanation drafts Q1..60, got {sorted(rows)}")
    return rows


def main() -> None:
    questions = []
    for edition, values in SOURCE.items():
        drafts = load_drafts(edition)
        year = int(edition[:4])
        source = f"https://www.jafp.or.jp/exam/mohan/files/g3_{edition}_qa.pdf"
        for item in values["questions"]:
            number = item["number"]
            keys = KEYS[: len(item["choices"])]
            category = category_for(number)
            draft = drafts[number]
            questions.append({
                "id": f"fp3-{year}-published-gakka-q{number}",
                "exam": "fp3",
                "session": "gakka",
                "year": year,
                "season": "published",
                "qNumber": number,
                "type": "multiple-choice",
                "category": category,
                "topicTags": [category],
                "difficulty": 2,
                "question": item["stem"],
                "choices": dict(zip(keys, item["choices"], strict=True)),
                "answer": keys[item["answer"] - 1],
                "explanation": draft["explanation"],
                "choiceExplanations": draft["choiceExplanations"],
                "hasImage": False,
                "sourcePdfUrl": source,
                "sourceAnswerUrl": source,
                "sourceAttribution": f"出典：日本FP協会 3級ファイナンシャル・プランニング技能検定 学科試験（{year}年5月公表分）。改行・空白と選択肢記号をWeb表示向けに整えています。",
                "officialReferenceUrls": REFERENCES[category],
                "license": "JAFP-reuse-with-attribution",
                "needsReview": bool(draft["needsReview"]),
                "lastUpdated": "2026-09-23",
                "lawReferenceDate": values["lawReferenceDate"],
            })
    text = (
        'import type { Question } from "@/lib/questions/types";\n\n'
        "// Generated from official Japan FP Association 2024/2025 published sets.\n"
        "// Run scripts/fp3_official_ingest.py and scripts/fp3_build_academic.py to reproduce.\n"
        f"export const FP3_QUESTIONS: Question[] = {json.dumps(questions, ensure_ascii=False, indent=2)};\n"
    )
    TARGET.write_text(text, encoding="utf-8")
    review = sum(1 for q in questions if q["needsReview"])
    print(f"Wrote {len(questions)} FP3 academic questions; needsReview={review}.")


if __name__ == "__main__":
    main()
