"""Pin the government concentration formula and methanol molecular mass."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261803-q01-05-draft.json"
draft = json.loads(path.read_text(encoding="utf-8"))
entry = draft["questions"]["emkohyo-EM20261803-q1"]
formula = "https://www.mhlw.go.jp/houdou/0107/h0724-1c.html"
methanol = "https://anzeninfo.mhlw.go.jp/anzen/gmsds/67-56-1.html"
entry["overlay"]["sources"] = [
    {"title": "厚生労働省・室内空気中化学物質の濃度換算式", "url": formula},
    {"title": "厚生労働省・職場のあんぜんサイト、メタノールSDS", "url": methanol},
]
entry["overlay"]["choices"][3]["reason"] = "300 ppmを質量濃度に戻すと300×32.04÷24.45≒393 mg/m³で、問題の130 mg/m³の約3倍となる。換算した約99 ppmに最も近い値ではない。"
entry["sourceEvidence"] = [
    {"url": formula, "excerpt": "ppm ≒ mg/m3 × 24.45／分子量 （25℃）", "choiceNumbers": [1, 2, 3, 4, 5]},
    {"url": methanol, "excerpt": "分子式 (分子量) CH4O(32.04)", "choiceNumbers": [1, 2, 3, 4, 5]},
]
entry["reviewIssues"] = []
path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
