"""Validate the unpublished 2024 Kansai tohan source candidate.

This checks extraction shape, the official key and the review manifest. It
cannot approve publication; rights and public attribution are separate gates.
"""

import json
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parent
# Independently transcribed from the official one-page "令和6年度正答" PDF,
# https://www.kouiki-kansai.jp/material/files/group/12/R06touhankaitou.pdf
OFFICIAL_KEY = (
    "3342111144" "4453352235" "4214314233" "2425555315"
    "3341544535" "1421423455" "2114141132" "2435324434"
    "3335421123" "5342445322" "5551322453" "1535421324"
)
questions = json.loads((ROOT / "extracted-questions.json").read_text(encoding="utf-8"))
receipt = json.loads((ROOT / "source-receipt.json").read_text(encoding="utf-8"))
reviews = json.loads((ROOT / "review-manifest.json").read_text(encoding="utf-8"))
progress = json.loads((ROOT / "qa-progress-20260928.json").read_text(encoding="utf-8"))

assert receipt["status"].startswith("HOLD_")
assert receipt["publishedCount"] == 0
assert receipt["review"]["releaseApproved"] is False
assert progress["releaseStatus"] == "HOLD"
assert len(questions) == receipt["candidateCount"] == 120
assert [q["number"] for q in questions] == list(range(1, 121))
assert [r["number"] for r in reviews] == list(range(1, 121))
assert all(
    r[field] == "REVIEWED"
    for r in reviews
    for field in ("transcription", "independentChoiceReasons", "guidelineAnswerCheck", "independentReview")
)
assert progress["independentReview"]["questions"] == list(range(1, 121))
assert progress["independentReview"]["choiceReasons"] == 600
assert "".join(str(q["officialAnswerNumber"]) for q in questions) == receipt["officialAnswerKey"]
assert len(receipt["officialAnswerKey"]) == 120
assert receipt["officialAnswerKey"] == OFFICIAL_KEY
assert Counter(q["section"] for q in questions) == {
    "医薬品に共通する特性と基本的な知識": 20,
    "主な医薬品とその作用": 40,
    "人体の働きと医薬品": 20,
    "薬事に関する法規と制度": 20,
    "医薬品の適正使用と安全対策": 20,
}
for q in questions:
    assert q["pdfPart"] == ("前半" if q["number"] <= 60 else "後半"), q["number"]
    assert len(q["choices"]) == 5, q["number"]
    assert all(isinstance(c, str) and c.strip() for c in q["choices"]), q["number"]
    assert q["question"].strip() and "選べ。" in q["question"], q["number"]
    assert q["pdfPages"] and all(isinstance(p, int) and p > 0 for p in q["pdfPages"]), q["number"]
    assert 1 <= q["officialAnswerNumber"] <= 5, q["number"]

print("PASS: 120 unpublished source candidates, 600 choices, 120 official answers; release remains HOLD")
