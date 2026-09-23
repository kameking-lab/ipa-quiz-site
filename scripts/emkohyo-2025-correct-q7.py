"""Pin the Q7 conversion arithmetic to the two applicable MHLW rules."""

import json
from pathlib import Path


root = Path(__file__).resolve().parents[1]
file = root / "data/exam-library/emkohyo-review/emkohyo-EM20251805-q06-10-draft.json"
draft = json.loads(file.read_text(encoding="utf-8"))
question = draft["questions"]["emkohyo-EM20251805-q7"]
question["overlay"]["sources"] = [
    source for source in question["overlay"]["sources"]
    if source["url"] != "https://www.mhlw.go.jp/web/t_doc?dataId=74087000"
]
question["sourceEvidence"] = [
    {
        "url": "https://www.mhlw.go.jp/web/t_doc?dataId=74088000&dataType=0&pageNo=1",
        "excerpt": "C＝(C 1 ／E 1 )＋(C 2 ／E 2 )＋……",
        "choiceNumbers": [1, 2, 3, 4, 5],
    },
    {
        "url": "https://www.mhlw.go.jp/web/t_doc?dataId=00tb2159&dataType=1&pageNo=1",
        "excerpt": "換算値／併行測定点における検知管の指示値",
        "choiceNumbers": [1, 2, 3, 4, 5],
    },
]
question["reviewIssues"] = []
file.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
