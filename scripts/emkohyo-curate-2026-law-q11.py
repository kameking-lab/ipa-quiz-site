"""Pin the official mixed-solvent evaluation formula for 2026 hygiene Q11."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261802-q11-15-draft.json"
draft = json.loads(path.read_text(encoding="utf-8"))
entry = draft["questions"]["emkohyo-EM20261802-q11"]
overlay = entry["overlay"]
standard = "https://www.mhlw.go.jp/web/t_doc?dataId=74088000"
overlay["summary"] = "作業環境評価基準第2条第4項の換算式はC＝Σ(Ci/Ei)。各有機溶剤の測定値をその管理濃度で割り、全成分を加算する肢2が正しい。"
overlay["choices"][2]["reason"] = "測定値の総和を管理濃度の総和で割ると、各Ci/EiをEi/ΣEiで重み付けした平均にしかならず、法定の比の『合計』と異なる。例としてC1=50、E1=100、C2=10、E2=20では60/120=0.5だが、正しい換算値は0.5+0.5=1.0。肢3は過小評価になる。"
overlay["choices"][3]["reason"] = "割合Riは1以下なので、各Ci/EiにRiを余分に掛けると換算値は正しい合計以下に縮む。C1=50、E1=100、C2=10、E2=20ならR1=5/6、R2=1/6で、(5/6)×0.5+(1/6)×0.5=0.5。法定式の1.0にならず、肢4は誤り。"
overlay["sources"] = [{"title": "厚生労働省・作業環境評価基準第2条第4項", "url": standard}]
entry["sourceEvidence"] = [
    {"url": standard, "excerpt": "(測定結果の評価) 第二条　労働安全衛生法第六十五条の二第一項の作業環境測定の結果の評価", "choiceNumbers": [1, 2, 3, 4, 5]},
    {"url": standard, "excerpt": "４　労働安全衛生法施行令別表第六の二第一号から第四十七号までに掲げる有機溶剤", "choiceNumbers": [1, 2, 3, 4, 5]},
    {"url": standard, "excerpt": "二種類以上含有する混合物に係る単位作業場所にあつては、測定点ごとに、次の式により計算して得た換算値", "choiceNumbers": [1, 2, 3, 4, 5]},
    {"url": standard, "excerpt": "管理濃度に相当する値は、一とするものとする。 C＝(C 1 ／E 1 )＋(C 2 ／E 2 )＋……", "choiceNumbers": [1, 2, 3, 4, 5]},
    {"url": standard, "excerpt": "C 1 、C 2 ……　有機溶剤の種類ごとの測定値 E 1 、E 2 ……　有機溶剤の種類ごとの管理濃度", "choiceNumbers": [1, 2, 3, 4, 5]},
]
entry["reviewIssues"] = []
path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
