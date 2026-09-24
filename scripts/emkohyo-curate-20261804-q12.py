"""Pin the ethylene and ethane combustion ratios to JST's worked equations."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261804-q11-15-draft.json"
data = json.loads(path.read_text(encoding="utf-8"))
item = data["questions"]["emkohyo-EM20261804-q12"]
url = "https://koushien.jst.go.jp/koushien-Jr/pastexam/2017/files/2017_hikki_03.pdf"
item["overlay"]["sources"] = [
    {"title": "科学技術振興機構 第5回科学の甲子園ジュニア筆記競技・解答例と解説", "url": url}
]
item["sourceEvidence"] = [
    {
        "url": url,
        "excerpt": "2C2H6　＋　7O2　→　4CO2　＋　6H2O",
        "choiceNumbers": [2, 4, 5],
    },
    {
        "url": url,
        "excerpt": "C2H4　＋　3O2　→　2CO2　＋　2H2O",
        "choiceNumbers": [1, 3],
    },
]
item["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
