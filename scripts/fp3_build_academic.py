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
# Link only a primary source that actually matches the question's subject.
# A category-wide link is misleading (for example, an employment-insurance
# question must not point at the pension top page), so unmatched questions keep
# the official exam PDF as their sole authority.
LAW_REFERENCES = (
    (("健康保険", "傷病手当金", "高額療養費"), "211AC0000000070"),
    (("雇用保険", "基本手当"), "349AC0000000116"),
    (("国民年金", "老齢基礎年金", "障害基礎年金", "国民年金基金"), "334AC0000000141"),
    (("厚生年金", "老齢厚生年金", "加給年金"), "329AC0000000115"),
    (("後期高齢者医療",), "357AC0000000080"),
    (("介護保険",), "409AC0000000123"),
    (("確定拠出年金", "個人型年金", "企業型年金"), "413AC0000000088"),
    (("金融商品取引法", "適合性の原則"), "323AC0000000025"),
    (("個人情報", "守秘義務"), "415AC0000000057"),
    (("著作権",), "345AC0000000048"),
    (("所得税", "給与所得", "雑所得", "退職所得", "譲渡所得", "医療費控除"), "340AC0000000033"),
    (("法人税",), "340AC0000000034"),
    (("消費税", "適格請求書"), "363AC0000000108"),
    (("相続税", "贈与税"), "325AC0000000073"),
    (("住宅ローン控除", "小規模宅地等"), "332AC0000000026"),
    (("建築基準法", "建蔽率", "建ぺい率", "容積率", "セットバック"), "325AC0000000201"),
    (("都市計画", "用途地域", "市街化区域"), "343AC0000000100"),
    (("宅地建物取引", "宅建業者"), "327AC1000000176"),
    (("借地", "借家", "賃貸借"), "403AC0000000090"),
    (("区分所有", "マンションの共用部分"), "337AC0000000069"),
    (("不動産登記", "登記事項証明書"), "416AC0000000123"),
    (("法定相続", "代襲相続", "遺産分割", "遺留分", "相続放棄"), "129AC0000000089"),
)


def government_links(text: str, law_date: str) -> list[str]:
    date = law_date.replace("-", "")
    return [
        f"https://laws.e-gov.go.jp/law/{law}?occasion_date={date}"
        for keywords, law in LAW_REFERENCES
        if any(keyword in text for keyword in keywords)
    ]


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
            searchable = item["stem"] + " " + " ".join(item["choices"]) + " " + draft["explanation"]
            references = government_links(searchable, values["lawReferenceDate"])
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
                **({"officialReferenceUrls": references} if references else {}),
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
