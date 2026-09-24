"""Ground the X-ray diffraction particle-size and absorption explanations."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261804-q16-20-draft.json"
draft = json.loads(path.read_text(encoding="utf-8"))
entry = draft["questions"]["emkohyo-EM20261804-q19"]
pharm = "https://www.mhlw.go.jp/content/11120000/001022457.pdf"
dust = "https://www.mhlw.go.jp/file/05-Shingikai-11201000-Roudoukijunkyoku-Soumuka/0000162375.pdf"
asbestos = "https://www.ishiwata.mhlw.go.jp/pdf/content/001099405.pdf"
mortar = "https://www.mhlw.go.jp/new-info/kobetu/roudou/sekimen/mortar/dl/1_0004.pdf"
entry["overlay"]["choices"][2]["reason"] = (
    "結晶ごとに格子面間隔が異なり、ブラッグ条件に対応する回折角も異なる。"
    "第十八改正日本薬局方第一追補の粉末X線回折測定法は、回折ピークの位置が結晶格子の特性を示し、"
    "角度と強度から結晶相を同定すると説明する。したがって角度による同定は正しい。"
)
entry["overlay"]["choices"][3]["reason"] = (
    "0.1～1 mmは100～1000 μmである。厚労省が公表する天然鉱物中石綿のX線回折分析では、"
    "試料を75 μm以下に調製し、その粒度は遊離けい酸含有率のX線回折定性・定量に沿って設定したと明記する。"
    "日本薬局方も粒径を小さくして選択配向を抑えると説明する。100～1000 μmを一般的な適正粒径とする肢4は誤り。"
)
entry["overlay"]["choices"][4]["reason"] = (
    "捕集量が多いほど試料によるX線吸収が大きくなり、回折強度は試料量に単純比例しなくなる。"
    "厚労省掲載の石綿分析資料はこの理由で基底標準吸収補正法を説明する。粉じんの遊離けい酸測定を扱う審議会資料でも、"
    "捕集後のろ紙について亜鉛基底標準板と石英の回折強度を測り、補正して石英の質量を求め、"
    "その後に粉じん質量で割って含有率を算出する。吸収補正が必要という肢5は正しい。"
)
entry["overlay"]["sources"] = [
    {"title": "第十八改正日本薬局方第一追補・一般試験法2.58 粉末X線回折測定法（PDF33～36頁）", "url": pharm},
    {"title": "厚生労働省・天然鉱物中石綿含有率の分析方法（PDF16頁）", "url": mortar},
    {"title": "厚生労働省審議会資料・粉じん濃度測定の分析方法について（PDF8～9頁）", "url": dust},
    {"title": "厚生労働省石綿総合情報ポータル掲載・石綿分析資料（PDF431頁）", "url": asbestos},
]
entry["sourceEvidence"] = [
    {"url": pharm, "excerpt": "X線回折測定には，通例，特性X線のみが用いられる", "choiceNumbers": [1]},
    {"url": pharm, "excerpt": "回折線の角度及び強度の測定は，結晶物質の結晶相の同定", "choiceNumbers": [2, 3]},
    {"url": pharm, "excerpt": "回折ピーク(回折線，反射又はブラッグ反射とも呼ばれる)の位置は結晶格子", "choiceNumbers": [3]},
    {"url": pharm, "excerpt": "最良で最も簡便な方法は，粒子径を小さくすることである", "choiceNumbers": [4]},
    {"url": mortar, "excerpt": "採取した試料はそれぞれ目開き 75 μm 以下の篩下に調製し", "choiceNumbers": [4]},
    {"url": mortar, "excerpt": "試料の採取量、試料の粒度は、通常、遊離けい酸含有率の分析で行うＸ線回折分析における定性／定量分析の考え方に沿って設定した", "choiceNumbers": [4]},
    {"url": dust, "excerpt": "基底標準吸収補正法により石英の質量を算出", "choiceNumbers": [2, 5]},
    {"url": asbestos, "excerpt": "アスベストの量と回折強度は比例関係にならない。それを補正するために基底標準吸収補正法が採られる", "choiceNumbers": [5]},
]
entry["reviewIssues"] = []
path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
