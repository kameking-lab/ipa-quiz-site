"""Pin the ideal-gas equation used to verify every molecular-mass option."""

import json
from pathlib import Path


root = Path(__file__).resolve().parents[1]
file = root / "data/exam-library/emkohyo-review/emkohyo-EM20261804-q01-05-draft.json"
draft = json.loads(file.read_text(encoding="utf-8"))
question = draft["questions"]["emkohyo-EM20261804-q4"]
url = "https://koushien.jst.go.jp/koushien/pastexam/2013/files/1-3.A-hikki.pdf"
temperature_url = "https://unit.aist.go.jp/nmij/library/si-units/"
mass_url = "https://cger.nies.go.jp/cgernews/202209/382001.html"
question["overlay"]["sources"] = [
    {"title": "科学技術振興機構 科学の甲子園・筆記競技解答例と解説 p.19", "url": url},
    {"title": "産業技術総合研究所 国際単位系（SI）", "url": temperature_url},
    {"title": "国立環境研究所 酸素の観測を支える標準ガス", "url": mass_url},
]
question["sourceEvidence"] = [
    {"url": url, "excerpt": "PV＝nRT", "choiceNumbers": [1, 2, 3, 4, 5]},
    {"url": temperature_url, "excerpt": "t /°C = T /K － 273.15", "choiceNumbers": [1, 2, 3, 4, 5]},
    {"url": mass_url, "excerpt": "ガスの質量をモル質量で割るとガスの物質量が求まる", "choiceNumbers": [1, 2, 3, 4, 5]},
]
question["overlay"]["choices"][3]["reason"] = (
    "T＝97＋273＝370 K、n＝1.0×1.23÷(0.082×370)≒0.0405 mol、"
    "M＝2.3÷0.0405≒56.7となる。57 g/molで逆算した圧力も約1.0 atmで条件に合い、57が最も近い。"
)
question["reviewIssues"] = []
file.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
