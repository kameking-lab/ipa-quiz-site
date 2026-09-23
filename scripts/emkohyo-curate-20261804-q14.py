"""Pin the concentration and transmittance calculation to MHLW definitions."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261804-q11-15-draft.json"
data = json.loads(path.read_text(encoding="utf-8"))
item = data["questions"]["emkohyo-EM20261804-q14"]
url = "https://www.mhlw.go.jp/web/t_doc?dataId=00tb7934&dataType=1&pageNo=1"
item["overlay"]["sources"] = [
    {"title": "厚生労働省 医薬部外品原料規格 紫外可視吸光度測定法", "url": url}
]
item["sourceEvidence"] = [
    {
        "url": url,
        "excerpt": "T＝I／I 0 ×100＝100t　A＝log(I 0 ／I)",
        "choiceNumbers": [1, 2, 3, 4, 5],
    },
    {
        "url": url,
        "excerpt": "吸光度(A)は，溶液の濃度(c)及び層長(l)に比例する",
        "choiceNumbers": [1, 2, 3, 4, 5],
    },
]
item["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
