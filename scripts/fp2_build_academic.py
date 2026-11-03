"""Assemble the four official FP2 academic papers after explanation review.

This script never fetches or invents answers. It stops unless every official
question has one four-choice explanation draft, and emits a coverage receipt.
"""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / "docs/evidence/fp2-two-year"
RAW = EVIDENCE / "gakka-extraction.json"
DRAFTS = EVIDENCE / "explanation-drafts"
FIGURES = ROOT / "data/questions/fp2/academic-figures-2024-2025.json"
OUTPUT = ROOT / "data/questions/fp2/academic-2024-2025.json"
RECEIPT = EVIDENCE / "academic-coverage.json"
KEYS = "アイウエ"
EDITIONS = {
    "202405": (2024, "may", "2024年5月"),
    "202409": (2024, "september", "2024年9月"),
    "202501": (2025, "january", "2025年1月"),
    "202505": (2025, "published", "2025年5月公表"),
}
CATEGORIES = (
    "ライフプランニングと資金計画",
    "リスク管理",
    "金融資産運用",
    "タックスプランニング",
    "不動産",
    "相続・事業承継",
)
LAW_REFERENCES = (
    (("健康保険", "傷病手当金"), "211AC0000000070"),
    (("雇用保険", "基本手当"), "349AC0000000116"),
    (("労働者災害補償保険", "労災保険", "障害補償給付"), "322AC0000000050"),
    (("国民年金", "老齢基礎年金", "障害基礎年金"), "334AC0000000141"),
    (("厚生年金", "老齢厚生年金", "加給年金"), "329AC0000000115"),
    (("後期高齢者医療",), "357AC0000000080"),
    (("介護保険",), "409AC0000000123"),
    (("確定拠出年金", "企業型DC", "個人型年金"), "413AC0000000088"),
    (("金融商品取引法",), "323AC0000000025"),
    (("金融サービス提供法", "金融サービスの提供及び利用環境"), "412AC0000000101"),
    (("預金保険制度", "預金保険法"), "346AC0000000034"),
    (("個人情報",), "415AC0000000057"),
    (("著作権",), "345AC0000000048"),
    (("所得税", "給与所得", "雑所得", "生命保険料控除", "地震保険料控除"), "340AC0000000033"),
    (("法人税", "法人を契約者", "法人に対する生命保険"), "340AC0000000034"),
    (("消費税", "適格請求書"), "363AC0000000108"),
    (("相続税", "贈与税"), "325AC0000000073"),
    (("住宅ローン控除", "特別控除", "小規模宅地等", "NISA"), "332AC0000000026"),
    (("地震保険",), "341AC0000000073"),
    (("自動車損害賠償責任保険", "自賠責保険"), "330AC0000000097"),
    (("建築基準法", "建蔽率", "容積率"), "325AC0000000201"),
    (("都市計画", "用途地域"), "343AC0000000100"),
    (("宅地建物取引", "宅建業者"), "327AC1000000176"),
    (("借地", "借家", "賃貸借"), "403AC0000000090"),
    (("区分所有", "マンションの共用部分"), "337AC0000000069"),
    (("不動産登記", "登記申請"), "416AC0000000123"),
    (("不動産の登記",), "416AC0000000123"),
    (("不動産取得税",), "325AC0000000226"),
    (("民法", "法定相続人", "代襲相続", "遺産分割", "遺留分"), "129AC0000000089"),
    (("任意後見",), "411AC0000000150"),
    (("会社法",), "417AC0000000086"),
)


def government_links(text: str, law_date: str) -> list[str]:
    date = law_date.replace("-", "")
    links = [f"https://laws.e-gov.go.jp/law/{law}?occasion_date={date}"
             for keywords, law in LAW_REFERENCES if any(keyword in text for keyword in keywords)]
    if "不動産鑑定評価基準" in text:
        links.append("https://www.mlit.go.jp/common/001037626.pdf")
    return links


def clean(text: str) -> str:
    footer = r"\n\s*(?:-\d+終-|2級\s*学科試験\([^)]*\)|正解\s*[1-4]\))\s*$"
    while re.search(footer, text):
        text = re.sub(footer, "", text)
    # A source PDF can place the diagram's accessible text after a choice.
    # The original layout is provided as an image instead of flattening that
    # diagram into an answer choice.
    text = re.split(r"\n\s*<親族関係図>", text, maxsplit=1)[0]
    text = re.sub(r"(?<!\n)\n(?!\n)", "", text)
    text = re.sub(r"\n{2,}", "\n", text)
    return re.sub(r"[ \t]+", " ", text).strip()


def load_records(directory: Path) -> dict[str, dict[int, dict]]:
    result = {edition: {} for edition in EDITIONS}
    for path in sorted(directory.glob("*.json")):
        edition = path.name[:6]
        if edition not in result:
            raise ValueError(f"unexpected explanation batch {path.name}")
        for item in json.loads(path.read_text(encoding="utf-8")):
            number = item["number"]
            if number in result[edition]:
                raise ValueError(f"duplicate explanation {edition} Q{number}")
            result[edition][number] = item
    return result


def main() -> None:
    raw = json.loads(RAW.read_text(encoding="utf-8"))
    figures = json.loads(FIGURES.read_text(encoding="utf-8"))
    drafts = load_records(DRAFTS)
    reviews = load_records(EVIDENCE / "academic-independent-review")
    corrections = load_records(EVIDENCE / "academic-corrections")
    questions = []
    receipt = {"scope": "2024–2025 official FP2 academic papers", "editions": [], "total": 0}
    for edition, (year, season, label) in EDITIONS.items():
        data = raw[edition]
        originals = data["questions"]
        explanation_map = drafts[edition]
        if len(originals) != 60 or len(explanation_map) != 60:
            raise ValueError(f"{edition}: expected 60 originals and 60 explanation drafts, got {len(originals)}, {len(explanation_map)}")
        manifest = json.loads((EVIDENCE / "manifest.json").read_text(encoding="utf-8"))
        source = next(x for x in manifest["editions"] if x["edition"] == edition)
        pdf = source["files"]["gakkaQuestion"]["url"]
        answer_pdf = source["files"]["gakkaAnswer"]["url"] if "gakkaAnswer" in source["files"] else pdf
        for original in originals:
            number = original["number"]
            if not 1 <= number <= 60 or not 1 <= original["answer"] <= 4:
                raise ValueError(f"{edition} invalid Q{number}")
            draft = explanation_map[number]
            review = reviews[edition].get(number)
            correction = corrections[edition].get(number)
            if len(original["choices"]) != 4 or set(draft["choiceExplanations"]) != set(KEYS):
                raise ValueError(f"{edition} Q{number} missing choice or explanation")
            stem = clean(original["stem"])
            choices = {key: clean(choice) for key, choice in zip(KEYS, original["choices"], strict=True)}
            effective = correction or draft
            if set(effective["choiceExplanations"]) != set(KEYS):
                raise ValueError(f"{edition} Q{number} missing corrected choice explanation")
            if any(not value for value in [stem, *choices.values(), effective["explanation"], *effective["choiceExplanations"].values()]):
                raise ValueError(f"{edition} Q{number} blank field")
            panels = figures.get(edition, {}).get(str(number), [])
            references = government_links(stem + " ".join(choices.values()) + effective["explanation"], data["lawReferenceDate"])
            questions.append({
                "id": f"fp2-{edition}-gakka-q{number}",
                "exam": "fp2",
                "session": "gakka",
                "year": year,
                "season": season,
                "qNumber": number,
                "type": "multiple-choice",
                "category": CATEGORIES[(number - 1) // 10],
                "topicTags": [CATEGORIES[(number - 1) // 10]],
                "difficulty": 2,
                "question": stem,
                "choices": choices,
                "answer": KEYS[original["answer"] - 1],
                "explanation": effective["explanation"],
                "choiceExplanations": effective["choiceExplanations"],
                "hasImage": bool(panels),
                **({"imageUrls": [panel["url"] for panel in panels]} if panels else {}),
                "sourcePdfUrl": pdf,
                "sourceAnswerUrl": answer_pdf,
                "sourceAttribution": f"出典：日本FP協会 2級ファイナンシャル・プランニング技能検定 学科試験（{label}）。改行・空白を整形し、選択肢番号1〜4をア〜エへ置換。図表は原典の該当箇所を画像化。",
                **({"officialReferenceUrls": references} if references else {}),
                "license": "JAFP-reuse-with-attribution",
                "lawReferenceDate": data["lawReferenceDate"],
                "needsReview": (not correction["cleared"] if correction else
                                bool(draft.get("needsReview", False) or not review or not review["approved"])),
                "lastUpdated": "2026-09-23",
            })
        receipt["editions"].append({
            "edition": edition,
            "academicQuestions": 60,
            "choices": 240,
            "officialAnswers": 60,
            "choiceExplanations": 240,
            "independentlyReviewed": len(reviews[edition]),
            "corrected": len(corrections[edition]),
            "reviewQueue": sum(q["needsReview"] for q in questions[-60:]),
            "figureQuestions": len(figures.get(edition, {})),
            "governmentLinkedQuestions": sum(bool(q.get("officialReferenceUrls")) for q in questions[-60:]),
        })
    receipt["total"] = len(questions)
    OUTPUT.write_text(json.dumps(questions, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    RECEIPT.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(receipt, ensure_ascii=False))


if __name__ == "__main__":
    main()
