"""Cite the correct general-use paragraph of the electrician regulation."""

import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
path = root / "data/questions/denko2/reviewed/20241027-q26-30.json"
items = json.loads(path.read_text(encoding="utf-8"))
q = next(item for item in items if item["number"] == 28)
q["explanation"] = (
    "一般用電気工作物等について、電気工事士法施行規則第2条第2項第1号イは、"
    "同条第1項第1号イ〜ヌ及びヲに掲げる作業を『軽微な作業』から除外する。"
    "配電盤を造営材に取り付ける作業は同条第1項第1号ヌ、電線管を曲げる作業は同号ヘにあり、"
    "いずれも第2項の除外対象である。施行令第1条の『軽微な工事』にも該当しないため、"
    "a・bとも電気工事士でなければ従事できない。"
)
q["choiceExplanations"]["イ"] = (
    "aの配電盤取付けは施行規則第2条第1項第1号ヌ、bの電線管曲げは同号ヘに掲げられ、"
    "一般用電気工作物等について同条第2項第1号イにより軽微な作業から除かれる。"
    "どちらも施行令第1条の軽微な工事ではないため、両方とも資格が必要。"
)
q["choiceExplanations"]["ハ"] = (
    "aの支持柱設置は施行令第1条第5号の軽微な工事で資格不要。bの電線管に電線を収める作業は"
    "施行規則第2条第1項第1号ニに掲げられ、一般用電気工作物等では同条第2項第1号イにより"
    "軽微な作業から除外されるため資格が必要。両方必須ではない。"
)
q["choiceExplanations"]["ニ"] = (
    "aの接地極埋設は、一般用電気工作物等について施行規則第2条第2項第1号ロにより軽微な作業から"
    "除かれるので資格が必要。bの125V差込み接続器へのコード接続は施行令第1条第1号の"
    "軽微な工事で資格不要。両方必須ではない。"
)
path.write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("Q28 regulation paragraph corrected")
