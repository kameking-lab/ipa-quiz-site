"""Build the first civil-engineering past-question set from reviewed receipts."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / "reports/civil2-2026-first-wave"
SOURCE = json.loads((REPORT / "source-transcription.json").read_text(encoding="utf-8"))
REVIEW = json.loads((REPORT / "opus-explanations.json").read_text(encoding="utf-8"))
RECEIPT = json.loads((REPORT / "opus-receipt.json").read_text(encoding="utf-8"))
OUT = ROOT / "data/questions/civil2/2026-early.json"

assert RECEIPT["requestedModel"] == "claude-opus-5-5"
assert RECEIPT["modelUsage"]["claude-opus-5-5"]["canonicalModel"] == "claude-opus-5-5"
assert RECEIPT["modelUsage"]["claude-opus-5-5"]["provider"] == "firstParty"
assert not RECEIPT["isError"] and RECEIPT["exitCode"] == 0
assert len(SOURCE["questions"]) == 11 == len(REVIEW["questions"])

by_number = {question["number"]: question for question in REVIEW["questions"]}
assert set(by_number) == set(range(6, 17))

refs = {
    8: ["https://www.mlit.go.jp/tec/constplan/content/001612921.pdf"],
    11: ["https://www.cgr.mlit.go.jp/ctc/pdf/technology/concrete/check.pdf"],
    12: [
        "https://www.mlit.go.jp/tec/r08dobokukoujikyoutsuusiyousyo/honbun01_syo03_setsu10.html",
        "https://www.kkr.mlit.go.jp/plan/happyou/thesises/2016/pdf03/01-23.pdf",
    ],
    13: ["https://www.mlit.go.jp/tec/r08dobokukoujikyoutsuusiyousyo/honbun01_syo03_setsu06.html"],
    14: ["https://www.mlit.go.jp/road/sign/kijyun/pdf/20170721hashikouka.pdf"],
    15: ["https://www.cgr.mlit.go.jp/kikaku/pdf/anzensekougijyutsusisin_R5.3.pdf"],
    16: ["https://www.mlit.go.jp/tec/r08dobokukoujikyoutsuusiyousyo/honbun03_syo02_setsu10.html"],
}

records = []
for source in SOURCE["questions"]:
    number = source["number"]
    review = by_number[number]
    assert review["status"] == "PASS", (number, review.get("issue"))
    assert len(source["choices"]) == len(review["choiceExplanations"]) == 4
    assert 1 <= source["officialAnswerNumber"] <= 4
    assert all(text.strip() for text in review["choiceExplanations"])
    record = {**source, "explanation": review["explanation"], "choiceExplanations": review["choiceExplanations"], "officialReferenceUrls": refs.get(number, [])}
    if number == 12:
        # Do not present a universal slump limit that the reviewed sources do not establish.
        record["choiceExplanations"][3] = (
            "この肢は、練混ぜ後に流動化剤を加えて流動性を高める流動化コンクリートの説明です。"
            "18cmという設問中の値を全工事共通の上限とは扱わず、実施工では適用仕様書を確認します。"
        )
    if number == 10:
        record["explanation"] = (
            "適当なものを選ぶ問題。公式正答は3。AE剤は多数の微細な独立気泡をコンクリート内に均等に連行します。"
            "減水剤・収縮低減剤・流動化剤とは主な目的が異なります。"
        )
    records.append(record)

payload = {
    "exam": "civil2",
    "year": 2026,
    "season": "early",
    "session": "gakka",
    "publishedCount": SOURCE["publishedCount"],
    "questionUrl": SOURCE["questionUrl"],
    "questionSha256": SOURCE["questionSha256"],
    "answerUrl": SOURCE["answerUrl"],
    "answerSha256": SOURCE["answerSha256"],
    "questions": records,
}
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Wrote {len(records)} reviewed questions to {OUT}")
