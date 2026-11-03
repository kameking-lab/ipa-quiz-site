"""Pin the supplied calculation against official absorbance and gas conversion rules."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20251807-q01-05-draft.json"
draft = json.loads(path.read_text(encoding="utf-8"))
entry = draft["questions"]["emkohyo-EM20251807-q2"]
ratio = "https://www.pmda.go.jp/files/000240227.pdf"
formula = "https://www.mhlw.go.jp/houdou/0107/h0724-1c.html"
entry["overlay"]["summary"] = "吸光度の比から捕集液濃度を求め、分析に使った3.0 mLではなく全捕集量4.0 mLへ戻す。25℃のppm換算で約0.224 ppmとなり肢4が正しい。"
reasons = [
    "0.016 ppmは誤り。標準液との吸光度比0.125/0.400を用いると捕集液濃度は0.078125 µg/mL、全4.0 mLで0.3125 µgである。空気量1.0 Lと25℃換算から約0.224 ppmとなり、0.016とは一致しない。",
    "0.022 ppmは正しい計算値の約10分の1である。吸引量は0.10 L/分×10分＝1.0 Lであり、全捕集量0.3125 µgをこの空気量で割って25℃換算すると約0.224 ppmになる。",
    "0.16 ppmは全捕集量4.0 mLではなく、発色に用いた3.0 mLだけを数えた場合の約0.168 ppmに近い。捕集した溶液全体に戻して計算する必要がある。",
    "標準液との吸光度比から捕集液濃度は0.25×0.125/0.400＝0.078125 µg/mL。全量4.0 mLで0.3125 µg、空気量は1.0 Lだから0.3125 mg/m³。25℃の公式換算式で0.3125×24.45/34.1≒0.224 ppmとなり、0.22 ppmが最も近い。",
    "1.6 ppmは正しい計算値約0.224 ppmの約7倍である。標準液との比、全捕集量4.0 mL、空気量1.0 Lを順に使うと約0.224 ppmとなり、この選択肢にはならない。",
]
for choice, reason in zip(entry["overlay"]["choices"], reasons):
    choice["reason"] = reason
entry["overlay"]["sources"] = [
    {"title": "厚生労働省・医薬部外品原料規格2021『紫外可視吸光度測定法』PDF65頁", "url": ratio},
    {"title": "厚生労働省・室内空気中化学物質の25℃濃度換算式", "url": formula},
]
entry["sourceEvidence"] = [
    {"url": ratio, "excerpt": "吸光度（A）は，溶液の濃度（c）及び層長（l）に比例する．", "choiceNumbers": [1, 2, 3, 4, 5]},
    {"url": formula, "excerpt": "ppm ≒ mg/m3 × 24.45／分子量 （25℃）", "choiceNumbers": [1, 2, 3, 4, 5]},
]
entry["reviewIssues"] = []
path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
