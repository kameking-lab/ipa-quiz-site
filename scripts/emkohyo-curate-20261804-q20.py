"""Ground the five radioactivity choices in JAEA and Environment Ministry text."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261804-q16-20-draft.json"
data = json.loads(path.read_text(encoding="utf-8"))
item = data["questions"]["emkohyo-EM20261804-q20"]
jaea = "https://atomica.jaea.go.jp/dic/detail/dic_detail_237.html"
env = "https://www.env.go.jp/chemi/rhm/current/01-02-07.html"
item["overlay"]["sources"] = [
    {"title": "日本原子力研究開発機構 ATOMICA・壊変定数", "url": jaea},
    {"title": "環境省 放射線による健康影響等に関する統一的な基礎資料・半減期と放射能の減衰", "url": env},
]
item["overlay"]["choices"][1]["reason"] = (
    "文自体は正しい。壊変定数は核種に固有で、核種が異なると単位時間当たりの壊変確率も異なる。"
    "環境省の例でもヨウ素131は約8日、セシウム134は約2年、セシウム137は約30年と半減期が違う。"
    "同じ原子数なら、壊変定数が大きい核種ほど単位時間に壊変する原子数が多くなる。"
)
item["sourceEvidence"] = [
    {"url": jaea, "excerpt": "核種に固有な定数", "choiceNumbers": [2, 4]},
    {"url": jaea, "excerpt": "温度、圧力などの影響をまったく受けることなく", "choiceNumbers": [3]},
    {"url": jaea, "excerpt": "dN = −λNdt", "choiceNumbers": [1, 2, 4]},
    {"url": jaea, "excerpt": "λ = ln2/T(1/2)", "choiceNumbers": [4]},
    {"url": env, "excerpt": "半減期分の時間が経過するたびに放射能が半分", "choiceNumbers": [1, 5]},
    {"url": env, "excerpt": "ヨウ素131の半減期は約８日、セシウム134の半減期は約２年、セシウム137の半減期は約30年", "choiceNumbers": [2]},
    {"url": env, "excerpt": "指数関数的に減る", "choiceNumbers": [1]},
]
item["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
