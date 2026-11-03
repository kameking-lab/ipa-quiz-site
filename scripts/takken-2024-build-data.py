"""Build the 2024 takken set only after all fifty official items pass review."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

SOURCE_SHA = "82a95815f991567ebc4982b05a15a71f6ec942bd6794c3bafe3bcf9c2e985bae"
SOURCE_URL = "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf"
ANSWER_KEYS = "アイウエ"
REVIEW_BATCHES = ("01-10", "11-20", "21-30", "31-40", "41-50")

LAW_URLS = (
    ("宅地建物取引業法施行規則", "https://laws.e-gov.go.jp/law/332M50004000012"),
    ("宅地建物取引業法施行令", "https://laws.e-gov.go.jp/law/339CO0000000383"),
    ("宅地建物取引業法", "https://laws.e-gov.go.jp/law/327AC1000000176"),
    ("建物の区分所有等に関する法律", "https://laws.e-gov.go.jp/law/337AC0000000069"),
    ("宅地造成及び特定盛土等規制法", "https://laws.e-gov.go.jp/law/336AC0000000191"),
    ("不動産登記法", "https://laws.e-gov.go.jp/law/416AC0000000123"),
    ("借地借家法", "https://laws.e-gov.go.jp/law/403AC0000000090"),
    ("都市計画法", "https://laws.e-gov.go.jp/law/343AC0000000100"),
    ("建築基準法", "https://laws.e-gov.go.jp/law/325AC0000000201"),
    ("土地区画整理法", "https://laws.e-gov.go.jp/law/329AC0000000119"),
    ("登録免許税法", "https://laws.e-gov.go.jp/law/342AC0000000035"),
    ("生産緑地法", "https://laws.e-gov.go.jp/law/349AC0000000068"),
    ("国土利用計画法", "https://laws.e-gov.go.jp/law/349AC1000000092"),
    ("独立行政法人住宅金融支援機構法", "https://laws.e-gov.go.jp/law/417AC0000000082"),
    ("不当景品類及び不当表示防止法", "https://laws.e-gov.go.jp/law/337AC0000000134"),
    ("犯罪による収益の移転防止に関する法律", "https://laws.e-gov.go.jp/law/419AC0000000022"),
    ("特定住宅瑕疵担保責任の履行の確保等に関する法律", "https://laws.e-gov.go.jp/law/419AC0000000066"),
    ("住宅の品質確保の促進等に関する法律", "https://laws.e-gov.go.jp/law/411AC0000000081"),
    ("租税特別措置法", "https://laws.e-gov.go.jp/law/332AC0000000026"),
    ("地方税法", "https://laws.e-gov.go.jp/law/325AC0000000226"),
    ("農地法", "https://laws.e-gov.go.jp/law/327AC0000000229"),
    ("民法", "https://laws.e-gov.go.jp/law/129AC0000000089"),
)


def receipt_items(path: Path) -> list[dict]:
    receipt = json.loads(path.read_text(encoding="utf-8-sig"))
    usage = receipt.get("modelUsage", {}).get("claude-opus-5-5", {})
    if (receipt.get("is_error") or receipt.get("resolvedModel") != "claude-opus-5-5"
            or usage.get("provider") != "firstParty" or usage.get("canonicalModel") != "claude-opus-5-5"):
        raise ValueError(f"first-party claude-opus-5-5 receipt missing: {path}")
    value = receipt["result"].strip().removeprefix("```json").removesuffix("```").strip()
    return json.loads(value)["items"]


def clean(text: str, *, preserve_statements: bool = False) -> str:
    text = text.replace("梁\nはり\n", "梁")
    result = ""
    for line in text.splitlines():
        line = line.strip()
        if preserve_statements and re.match(r"^[アイウエ][\s\u3000]", line):
            result += "\n"
        result += line
    result = re.sub(r"(?<=\d)[ \u3000]+(?=[年月日戸円件%％])", "", result)
    return result.strip()


def category(q_number: int) -> str:
    if q_number <= 14:
        return "権利関係"
    if q_number <= 22:
        return "法令上の制限"
    if q_number <= 25:
        return "税・価格評定"
    if q_number <= 45:
        return "宅建業法"
    return "免除科目"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("report_dir", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    report = args.report_dir
    source = json.loads((report / "extracted.json").read_text(encoding="utf-8"))
    if source["sourceSha256"] != SOURCE_SHA or source["sourcePdfUrl"] != SOURCE_URL:
        raise ValueError("official source differs from pinned PDF")
    official = source["questions"]
    if [item["qNumber"] for item in official] != list(range(1, 51)):
        raise ValueError("official source missing or reordered questions")

    candidates = {}
    audits = {}
    for batch in REVIEW_BATCHES:
        for item in receipt_items(report / f"opus-receipt-{batch}.json"):
            candidates[item["qNumber"]] = item
        for item in receipt_items(report / f"opus-audit-receipt-{batch}.json"):
            audits[item["qNumber"]] = item
    revisions = {item["qNumber"]: item for item in receipt_items(
        report / "opus-revision-receipt-03-34-40-41.json"
    )}
    reaudited = {item["qNumber"]: item for item in receipt_items(
        report / "opus-revision-audit-receipt-03-34-40-41.json"
    )}
    if set(revisions) != {3, 34, 40, 41} or set(reaudited) != set(revisions):
        raise ValueError("all four HOLD revisions require independent review")
    if set(candidates) != set(range(1, 51)) or set(audits) != set(range(1, 51)):
        raise ValueError("not all 50 items have generation and independent review")

    questions = []
    for raw in official:
        number = raw["qNumber"]
        candidate = revisions.get(number, candidates[number])
        audit = reaudited.get(number, audits[number])
        if candidate["verdict"] != "PASS" or audit["verdict"] != "PASS":
            raise ValueError(f"Q{number} is on HOLD")
        reasons = candidate["choiceExplanations"]
        if set(reasons) != set(ANSWER_KEYS) or any(len(value.strip()) < 8 for value in reasons.values()):
            raise ValueError(f"Q{number} incomplete choice reasons")
        answer_number = raw["officialAnswerNumber"]
        if answer_number not in (1, 2, 3, 4):
            raise ValueError(f"Q{number} official answer invalid")
        references = [url for url in candidate["officialReferenceUrls"] if url.startswith(
            ("https://laws.e-gov.go.jp/", "https://www.mlit.go.jp/", "https://www.mof.go.jp/", SOURCE_URL)
        )]
        for name, url in LAW_URLS:
            if any(name in value for value in candidate["legalBasis"]) and url not in references:
                references.append(url)
        if SOURCE_URL not in references:
            references.insert(0, SOURCE_URL)
        references = [
            url.split("?", 1)[0] + "?occasion_date=20240401"
            if url.startswith("https://laws.e-gov.go.jp/law/") else url
            for url in references
        ]
        references = list(dict.fromkeys(references))
        explanation = candidate["explanation"].strip()
        q = {
            "id": f"takken-2024-october-gakka-q{number}",
            "exam": "takken",
            "session": "gakka",
            "year": 2024,
            "season": "october",
            "qNumber": number,
            "officialAnswerNumber": str(answer_number),
            "type": "multiple-choice",
            "category": category(number),
            "topicTags": [category(number)],
            "difficulty": 3,
            "question": clean(raw["question"], preserve_statements=True),
            "choices": {key: clean(value) for key, value in zip(ANSWER_KEYS, raw["choices"])},
            "answer": ANSWER_KEYS[answer_number - 1],
            "explanation": explanation,
            "choiceExplanations": {key: value.strip() for key, value in reasons.items()},
            "explanationCoverage": "full",
            "hasImage": False,
            "sourcePdfUrl": SOURCE_URL,
            "sourceAnswerUrl": SOURCE_URL,
            "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和6年度宅地建物取引士資格試験 問題・正解番号表。原文の行折りと選択肢番号をWeb表示向けに整えています。",
            "officialReferenceUrls": references,
            "license": "RETIO-reuse",
            "needsReview": False,
            "lastUpdated": "2026-09-26",
            "lawReferenceDate": "2024-04-01",
        }
        if not q["question"] or any(not choice for choice in q["choices"].values()):
            raise ValueError(f"Q{number} has empty source content")
        questions.append(q)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        'import type { Question } from "@/lib/questions/types";\n\n'
        f"// Source: RETIO 2024 question/answer PDF, SHA256 {SOURCE_SHA}.\n"
        "// Generated by scripts/takken-2024-build-data.py after first-party Opus review.\n"
        "export const TAKKEN_2024_QUESTIONS: Question[] = "
        + json.dumps(questions, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )
    print(f"accepted={len(questions)} held=0 source_sha={SOURCE_SHA}")


if __name__ == "__main__":
    main()
