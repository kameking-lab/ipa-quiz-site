"""Ground the NaOH mass-percent conversion in the national education report."""

import json
from pathlib import Path


root = Path(__file__).resolve().parents[1]
file = root / "data/exam-library/emkohyo-review/emkohyo-EM20261804-q01-05-draft.json"
draft = json.loads(file.read_text(encoding="utf-8"))
question = draft["questions"]["emkohyo-EM20261804-q5"]
url = "https://www.nier.go.jp/18chousakekkahoukoku/report/data/18msci.pdf"
question["overlay"]["sources"] = [
    {"title": "国立教育政策研究所 全国学力・学習状況調査報告書 p.35", "url": url}
]
question["sourceEvidence"] = [
    {"url": url,
     "excerpt": "溶液（食塩水）の質量に対する溶質（食塩）の質量の割合（質量\nパーセント濃度）",
     "choiceNumbers": [1, 2, 3, 4, 5]}
]
question["overlay"]["choices"][0]["reason"] = (
    "0.5 mol/Lは溶液1 L中に0.5 mol含むという条件であり、0.5質量％を意味しない。"
    "溶質は0.5×40.0＝20 g、溶液は密度から1000 gなので、20÷1000×100＝2.0％となる。"
)
question["overlay"]["choices"][3]["reason"] = (
    "20％なら溶液1000 gに対する溶質は200 g必要だが、この設問では0.5 mol×40.0 g/mol＝20 gである。"
    "質量パーセント濃度は溶質20 gを溶液全体1000 gで割るため2.0％となり、20％ではない。"
)
question["overlay"]["choices"][4]["reason"] = (
    "40％なら溶液1000 gに対して溶質400 gが必要だが、設問のNaOHは0.5 mol×40.0 g/mol＝20 gである。"
    "40.0 g/molはモル質量であり濃度ではない。20÷1000×100＝2.0％となる。"
)
question["reviewIssues"] = ["政府原典の抜粋照合済み。独立Opus審査はセッション上限で未実施。公開保留。"]
file.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
