"""Build data/questions/tohan/2024-kansai.json from the reviewed 2024 Kansai staging files.

Inputs (all in this folder):
- extracted-questions.json   : 120 questions transcribed from the official PDFs (image-checked, independently reviewed)
- draft-choice-reasons-*.json: original per-statement / per-choice reasons (independently reviewed 600/600)
- source-receipt.json         : official URLs, SHA-256 and the official answer key string
The official answer key is re-checked against officialAnswerKey; any mismatch aborts.
"""
from __future__ import annotations

import glob
import json
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
OUT = ROOT / "data/questions/tohan/2024-kansai.json"

TOPIC_OVERRIDES = {
    24: "かぜに用いる漢方処方製剤（体力虚弱）",
    30: "小児虚弱体質等に用いる漢方処方製剤",
    33: "鎮咳去痰に用いる漢方処方製剤",
    41: "貧血用薬の相談対応",
    44: "アレルギー性鼻炎の相談対応",
    51: "毛髪用薬の相談対応",
    56: "肥満症に用いる漢方処方製剤",
    66: "目",
    81: "医薬品医療機器等法の目的",
    87: "一般用医薬品等の直接の容器等の記載事項",
    94: "リスク区分に応じた情報提供",
    102: "添付文書の「してはいけないこと」",
    103: "添付文書の「相談すること」",
    97: "濫用等のおそれのある医薬品",
    98: "濫用等のおそれのある医薬品の販売時確認事項",
    110: "医薬品副作用被害救済制度の対象外",
    114: "乗物酔い防止薬の成分",
    115: "アレルギー既往者が使用しない成分",
    116: "基礎疾患と使用しない成分",
    117: "妊婦が使用しない成分",
    118: "服用後の運転等を避ける成分",
    119: "フェニレフリン塩酸塩配合鼻炎用内服薬の相談事項",
    120: "ロートエキス配合制酸薬の相談事項",
}


def topic_for(number: int, question: str) -> str:
    if number in TOPIC_OVERRIDES:
        return TOPIC_OVERRIDES[number]
    head = question.split("\n")[0]
    m = re.match(r"(.+?)(に関する|についての|について|に関し|の記述)", head)
    if not m or len(m.group(1)) > 30:
        raise SystemExit(f"topic needed for 問{number}: {head[:60]}")
    return m.group(1)


def main() -> None:
    questions = json.loads((HERE / "extracted-questions.json").read_text(encoding="utf-8"))
    receipt = json.loads((HERE / "source-receipt.json").read_text(encoding="utf-8"))
    reasons: dict[int, dict] = {}
    for path in sorted(glob.glob(str(HERE / "draft-choice-reasons-q*.json"))):
        for item in json.loads(Path(path).read_text(encoding="utf-8")):
            reasons[item["number"]] = item
    key = receipt["officialAnswerKey"]
    assert len(questions) == 120 and len(key) == 120 and sorted(reasons) == list(range(1, 121))

    records = []
    for q in questions:
        n = q["number"]
        r = reasons[n]
        ans = q["officialAnswerNumber"]
        assert ans == int(key[n - 1]), (n, ans, key[n - 1])
        assert len(q["choices"]) == 5 and len(r["choiceReasons"]) == 5, n
        flags = [c["correct"] for c in r["choiceReasons"]]
        assert flags.count(True) == 1 and flags.index(True) + 1 == ans, (n, flags, ans)

        lines = [f"正解は({ans})。"]
        if r.get("statementReviews"):
            lines.append("")
            for label, sr in r["statementReviews"].items():
                lines.append(f"- {label}（{sr['judgment']}）：{sr['reason']}")
        elif r.get("fillReviews"):
            lines.append("")
            for label, fr in r["fillReviews"].items():
                lines.append(f"- {label}：{fr['correct']}。{fr['reason']}")
        else:
            lines.append("")
            for c in r["choiceReasons"]:
                mark = "正" if c["correct"] else "誤"
                lines.append(f"- ({c['number']})（{mark}）：{c['reason']}")
        explanation = "\n".join(lines)

        choice_explanations = []
        for c in r["choiceReasons"]:
            combo = bool(r.get("statementReviews") or r.get("fillReviews"))
            if c["correct"]:
                prefix = "正しい組合せ。" if combo else "正解。"
            elif r.get("statementReviews"):
                prefix = "誤った組合せ。合わない点："
            elif r.get("fillReviews"):
                prefix = "誤った組合せ。合わない字句："
            else:
                prefix = "誤り。"
            choice_explanations.append(prefix + c["reason"].strip())

        records.append({
            "number": n,
            "pdfPart": q["pdfPart"],
            "pdfPage": q["pdfPages"][0],
            "category": q["section"],
            "topic": topic_for(n, q["question"]),
            "officialAnswerNumber": ans,
            "question": q["question"],
            "choices": q["choices"],
            "explanation": explanation,
            "choiceExplanations": choice_explanations,
            "tebikiPages": r["guidelinePdfPages"],
        })

    payload = {
        "year": 2024,
        "season": "kansai",
        "examDate": "2024-08-31",
        "administrator": "関西広域連合",
        "sourcePageUrl": receipt["sourcePageUrl"],
        "questionUrls": receipt["questionUrls"],
        "answerUrl": receipt["answerUrl"],
        "sha256": {k: receipt["sha256"][k] for k in ("前半", "後半", "解答")},
        "retrievedAt": "2026-11-06",
        "guideline": {
            "title": "試験問題の作成に関する手引き（令和6年4月）",
            "url": receipt["guidelineUrl"],
            "sha256": receipt["sha256"]["手引き"],
        },
        "questions": records,
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"wrote {len(records)} questions -> {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
