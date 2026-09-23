"""Bind the published neutralization calculation to government source excerpts."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-20260217-4-q11-15-draft.json"
data = json.loads(path.read_text(encoding="utf-8"))
item = data["questions"]["emkohyo-20260217-4-q11"]
url = "https://atomica.jaea.go.jp/dic/detail/dic_detail_2153.html"
item["overlay"]["choices"][1]["reason"] = (
    "1.0×10⁻⁷ mol/Lは水素イオン濃度と水酸化物イオン濃度が等しい中性の値です。"
    "本問の塩酸と水酸化ナトリウムでは、OH⁻が3.0×10⁻⁴−1.0×10⁻⁴＝2.0×10⁻⁴ mol残ります。"
    "混合液は塩基性なのでこの値にはなりません。"
)
item["overlay"]["choices"][4]["reason"] = (
    "1.0×10⁻¹⁶ mol/Lなら、水のイオン積から[OH⁻]＝1.0×10² mol/Lが必要になります。"
    "問題のNaOHは0.030 mol/Lを10 mLだけ用いており、混合後にそんな高濃度のOH⁻は存在しません。"
    "正しくは10⁻¹⁴を残存OH⁻濃度10⁻²で割ります。"
)
item["overlay"]["sources"] = [{"title": "日本原子力研究開発機構 ATOMICA pH", "url": url}]
item["sourceEvidence"] = [
    {
        "url": url,
        "excerpt": "水素イオン濃度［H + ］と水酸化物イオン濃度［OH - ］の積は一定値となる",
        "choiceNumbers": [1, 2, 3, 4, 5],
    },
    {
        "url": url,
        "excerpt": "室温では10 -14 となる",
        "choiceNumbers": [1, 2, 3, 4, 5],
    },
    {
        "url": url,
        "excerpt": "水酸化物イオンとの中和で）水素イオン濃度が低下",
        "choiceNumbers": [1, 2, 3, 4, 5],
    },
]
item["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
