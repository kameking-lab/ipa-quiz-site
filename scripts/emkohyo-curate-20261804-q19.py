"""Ground the X-ray diffraction choices in public Japanese methods."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261804-q16-20-draft.json"
data = json.loads(path.read_text(encoding="utf-8"))
item = data["questions"]["emkohyo-EM20261804-q19"]
pharmacopoeia = "https://www.mhlw.go.jp/content/11120000/001022457.pdf"
workplace = "https://www.mhlw.go.jp/file/05-Shingikai-11201000-Roudoukijunkyoku-Soumuka/0000162375.pdf"
asbestos = "https://www.ishiwata.mhlw.go.jp/pdf/content/001099405.pdf"
item["overlay"]["sources"] = [
    {"title": "厚生労働省 第十八改正日本薬局方第一追補・粉末X線回折測定法", "url": pharmacopoeia},
    {"title": "厚生労働省 粉じん濃度測定の分析方法・遊離けい酸のX線回折", "url": workplace},
    {"title": "厚生労働省 石綿分析における試料量とX線吸収補正", "url": asbestos},
]
item["overlay"]["choices"][0]["reason"] = (
    "文自体は正しい。粉末X線回折測定では、X線管から出る連続X線と特性X線のうち、"
    "通常は後者の特性X線を用いる。厚生労働省の日本薬局方の測定法にも、"
    "回折測定には通例、特性X線のみを用いると明記されている。"
)
item["overlay"]["choices"][1]["reason"] = (
    "文自体は正しい。回折線の強度は、試料中の結晶相の量を求める定量分析に用いられる。"
    "厚生労働省の資料でも、粉じんをろ紙に捕集した後、石英のX線回折強度を測り、"
    "吸収補正を施して石英の質量と遊離けい酸含有率を算出している。"
)
item["overlay"]["choices"][2]["reason"] = (
    "文自体は正しい。結晶相によって回折線が現れる角度は異なる。"
    "厚生労働省の日本薬局方の測定法では、回折線の角度と強度を結晶相の同定に用いると説明される。"
    "したがって測定物質を同定する際に回折角を調べるという記述は正しい。"
)
item["overlay"]["choices"][3]["reason"] = (
    "これが誤りの記述。0.1～1 mmは100～1000 μmであり、粉末X線回折の相の同定に向く粒子より粗い。"
    "日本薬局方の粉末X線回折測定法では、相の同定には通例50 μm程度の粒子径で十分とされる。"
    "作業環境測定でも、空気からろ紙に捕集した粉じんを分析対象とするので、"
    "この100～1000 μmを一般的な適正粒径とすることはできない。"
)
item["overlay"]["choices"][4]["reason"] = (
    "文自体は正しい。厚生労働省の作業場の粉じん分析資料では、ろ紙上の粉じん質量と、"
    "金属基底標準板・石英の回折強度を測定して、基底標準吸収補正法により石英の質量を求めている。"
    "石綿分析資料にも、試料量に分析可能な限界があり、試料による吸収を補正する手順が示される。"
)
item["sourceEvidence"] = [
    {"url": pharmacopoeia, "excerpt": "X線回折測定には，通例，特性X線のみが用いられる", "choiceNumbers": [1]},
    {"url": pharmacopoeia, "excerpt": "回折線の角度及び強度の測定は，結晶物質の結晶相の同定", "choiceNumbers": [2, 3]},
    {"url": pharmacopoeia, "excerpt": "相の同定であれば，通例，50 μm程度の粒子径によって十分な結果が得られる", "choiceNumbers": [4]},
    {"url": workplace, "excerpt": "基底標準吸収補正法により石英の質量を算出", "choiceNumbers": [2, 5]},
    {"url": workplace, "excerpt": "グラスファイバーろ紙上の粉じん質量を求めた後", "choiceNumbers": [5]},
    {"url": workplace, "excerpt": "グラスファイバーろ紙を併行測定用のろ紙として使用し、サンプリング後", "choiceNumbers": [4]},
    {"url": asbestos, "excerpt": "吸収によって小さくなった基底標", "choiceNumbers": [5]},
    {"url": asbestos, "excerpt": "適切に分析できる試料の量には限界", "choiceNumbers": [5]},
]
item["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
