"""Pin the official-answer-aligned copper mass calculation to source definitions."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261804-q11-15-draft.json"
data = json.loads(path.read_text(encoding="utf-8"))
item = data["questions"]["emkohyo-EM20261804-q11"]
concentration = "https://radioactivity.nra.go.jp/cont/ja/docs/reps/rad-dist/research-results-part2/5600_201203131000_report2-2.pdf"
molar_mass = "https://www.aist.go.jp/aist_j/new_research/2012/nr20120227/nr20120227.html"
item["overlay"]["sources"] = [
    {"title": "原子力規制委員会 モル濃度の定義", "url": concentration},
    {"title": "産業技術総合研究所 モル質量の定義", "url": molar_mass},
]
item["sourceEvidence"] = [
    {
        "url": concentration,
        "excerpt": "M (mol/L)はモル濃度であり、溶液1L 中の溶質をそのモル数で表した単位",
        "choiceNumbers": [1, 2, 3, 4, 5],
    },
    {
        "url": molar_mass,
        "excerpt": "物質1モルあたりの質量を表す物理量",
        "choiceNumbers": [1, 2, 3, 4, 5],
    },
]
item["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
