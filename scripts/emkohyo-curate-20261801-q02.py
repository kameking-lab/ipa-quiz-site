"""Transcribe Q2 pictogram choices and source each reason from MHLW pages."""

import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
presentation_path = root / "data/exam-library/presentation/emkohyo-EM20261801.json"
presentation = json.loads(presentation_path.read_text(encoding="utf-8"))
question = presentation["emkohyo-EM20261801-q2"]
labels = {
    1: "㋑ 健康有害性 ／ ㋺ どくろ ／ ㋩ 腐食性",
    2: "㋑ 健康有害性 ／ ㋺ 腐食性 ／ ㋩ どくろ",
    3: "㋑ どくろ ／ ㋺ 腐食性 ／ ㋩ 感嘆符",
    4: "㋑ どくろ ／ ㋺ 健康有害性 ／ ㋩ 感嘆符",
    5: "㋑ どくろ ／ ㋺ 健康有害性 ／ ㋩ 腐食性",
}
for choice in question["choices"]:
    choice["text"] = labels[choice["number"]]
presentation_path.write_text(json.dumps(presentation, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

path = root / "data/exam-library/emkohyo-review/emkohyo-EM20261801-q01-05-draft.json"
data = json.loads(path.read_text(encoding="utf-8"))
item = data["questions"]["emkohyo-EM20261801-q2"]
overlay = item["overlay"]
overlay["summary"] = "原図の5組を文字でも照合。急性毒性1～3はどくろ、反復ばく露の特定標的臓器毒性は健康有害性、軽度の刺激性等は感嘆符で、どくろを付ける場合は感嘆符を省く。"
reasons = {
    1: "原図の肢1は㋑健康有害性・㋺どくろ・㋩腐食性。急性毒性区分1～3の㋑はどくろ、反復ばく露の特定標的臓器毒性の㋺は健康有害性であり、㋩も感嘆符であるべきなので、三つとも指定の位置と一致しない。",
    2: "原図の肢2は㋑健康有害性・㋺腐食性・㋩どくろ。急性毒性区分1～3はどくろ、反復ばく露の特定標的臓器毒性は健康有害性、区分4などは感嘆符に対応するため、三欄とも本問の条件に合わない。",
    3: "原図の肢3は㋑どくろ・㋺腐食性・㋩感嘆符。㋑と㋩は指定の種類と一致するが、反復ばく露による特定標的臓器毒性の㋺は人体の胸部に印がある健康有害性であり、手と金属を侵す腐食性ではない。",
    4: "原図の肢4は㋑どくろ・㋺健康有害性・㋩感嘆符。厚生労働省の対応表と一致し、急性毒性区分1～3のどくろを表示する場合は、区分4や刺激性を示す感嘆符を実際のラベルから省くという優先規則にも合う。",
    5: "原図の肢5は㋑どくろ・㋺健康有害性・㋩腐食性。前二つは一致するが、設問の㋩は急性毒性区分4や皮膚・眼刺激性の感嘆符を指す。腐食性は別の有害性を表すため、㋩の図柄が異なる。",
}
for choice in overlay["choices"]:
    choice["reason"] = reasons[choice["number"]]
overlay["sources"] = [
    {"title": "厚生労働省 職場のあんぜんサイト・GHS分類早見表", "url": "https://anzeninfo.mhlw.go.jp/user/anzen/kag/ghs_class.html"},
    {"title": "厚生労働省 山梨労働局・GHS絵表示の優先順位", "url": "https://jsite.mhlw.go.jp/yamanashi-roudoukyoku/kantoku/roudoukijun/25.html"},
]
item["sourceEvidence"] = [
    {"url": "https://jsite.mhlw.go.jp/yamanashi-roudoukyoku/kantoku/roudoukijun/25.html", "excerpt": "「どくろ」で表示する急性毒性は区分1から区分3、「感嘆符」で表示する急性毒性は区分4", "choiceNumbers": [1, 2, 3, 4, 5]},
    {"url": "https://jsite.mhlw.go.jp/yamanashi-roudoukyoku/kantoku/roudoukijun/25.html", "excerpt": "「腐食性」「どくろ」「健康有害性」は、「感嘆符」より優先します", "choiceNumbers": [4]},
    {"url": "https://anzeninfo.mhlw.go.jp/user/anzen/kag/ghs_class.html", "excerpt": "特定標的臓器・全身毒性（反復ばく露） 1 健康有害性", "choiceNumbers": [1, 2, 3, 4, 5]},
]
item["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
