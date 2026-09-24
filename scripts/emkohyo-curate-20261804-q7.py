"""Identify all five volumetric glassware figures against the official image."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261804-q06-10-draft.json"
data = json.loads(path.read_text(encoding="utf-8"))
item = data["questions"]["emkohyo-EM20261804-q7"]
jst = "https://koushien.jst.go.jp/koushien/pastexam/2020/files/3-2.pdf"
mhlw = "https://www.mhlw.go.jp/web/t_doc?dataId=78334000&dataType=0&pageNo=64"
item["overlay"]["sources"] = [
    {"title": "科学技術振興機構 第10回科学の甲子園全国大会・実技競技②実験の手引き", "url": jst},
    {"title": "厚生労働省 食品、添加物等の規格基準・滴定法", "url": mhlw},
]
item["overlay"]["choices"][0]["reason"] = (
    "図1は底面に台座がある円筒状の目盛付き器具です。液面と側面の目盛で液量を読み取れますが、"
    "図2のような下端のコックと細い吐出口はありません。滴下量を調整して測るビュレットではないため誤答です。"
)
item["overlay"]["choices"][1]["reason"] = (
    "図2がビュレットです。長い細管に連続した目盛があり、下端には回転させるコックと細い吐出口があります。"
    "公的な実験の手引きでもビュレットを滴定中に滴下した体積を正確に測る器具と説明しており、"
    "図の構造と用途が一致します。"
)
item["overlay"]["choices"][2]["reason"] = (
    "図3は中央部が膨らみ、一本の標線を持つ細管です。液体を一定体積だけ分取する形で、"
    "図2のような連続した目盛や滴下量を調整するコックがありません。形状からビュレットとは区別できます。"
)
item["overlay"]["choices"][3]["reason"] = (
    "図4は細い直管に目盛が付いた器具です。複数の目盛で移し取る液量を選べますが、"
    "下端は細い先端のみで、図2のように滴定液の流れを制御するコックがありません。ビュレットではないため誤答です。"
)
item["overlay"]["choices"][4]["reason"] = (
    "図5は下に広がる胴と細い首を持ち、首に一本の標線がある容器です。"
    "標線まで液を入れる形で、底のコックも連続目盛もありません。"
    "ビュレットのように滴定液を少しずつ流して量る器具ではないため誤答です。"
)
item["sourceEvidence"] = [
    {
        "url": jst,
        "excerpt": "ビュレット（図１）は滴定操作において，滴下した溶液の体積を正確に測定する器具である。",
        "choiceNumbers": [1, 2, 3, 4, 5],
    },
    {
        "url": jst,
        "excerpt": "ストップコック（図２，以下コック）",
        "choiceNumbers": [1, 2, 3, 4, 5],
    },
    {
        "url": mhlw,
        "excerpt": "滴定量をビュレットの目盛りより読み取る。",
        "choiceNumbers": [2],
    },
]
item["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
