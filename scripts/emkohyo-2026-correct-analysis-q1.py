"""Pin all five SI-unit statements to the Japanese national metrology institute."""

import json
from pathlib import Path


root = Path(__file__).resolve().parents[1]
file = root / "data/exam-library/emkohyo-review/emkohyo-EM20261804-q01-05-draft.json"
draft = json.loads(file.read_text(encoding="utf-8"))
question = draft["questions"]["emkohyo-EM20261804-q1"]
url = "https://unit.aist.go.jp/nmij/library/si-units/"
question["overlay"]["sources"] = [{"title": "産業技術総合研究所 計量標準総合センター 国際単位系（SI）", "url": url}]
question["sourceEvidence"] = [
    {"url": url, "excerpt": "ケルビン (K)", "choiceNumbers": [1]},
    {"url": url, "excerpt": "6.022 140 76 × 10 23 /mol", "choiceNumbers": [2]},
    {"url": url, "excerpt": "Pa = kg m −1 s −2 N/m 2", "choiceNumbers": [3]},
    {"url": url, "excerpt": "N = kg m s −2", "choiceNumbers": [3]},
    {"url": url, "excerpt": "J = kg m 2 s −2 N m", "choiceNumbers": [4]},
    {"url": url, "excerpt": "C = A s", "choiceNumbers": [5]},
]
question["reviewIssues"] = []
file.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
