"""Ground the sampler efficiency and significant-figure calculation."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-20260217-4-q01-05-draft.json"
data = json.loads(path.read_text(encoding="utf-8"))
item = data["questions"]["emkohyo-20260217-4-q2"]
item["overlay"]["choices"][2]["reason"] = (
    "この肢が正しいです。通気量は100 mL/分×60.0分＝6000 mL＝6 Lです。"
    "捕集効率75％だから実際に通過した物質量は50.30 µg÷0.75となり、"
    "濃度は約11.177 µg/Lです。乗除算の結果は有効数字の最少桁に合わせるため、"
    "75％の2桁で11 µg/Lを選びます。"
)
item["overlay"]["choices"][3]["reason"] = (
    "11.2は捕集効率を割り戻す計算の途中値約11.177 µg/Lを3桁に丸めたものです。"
    "補正の向きは合っていますが、問題の捕集効率75％は2桁です。"
    "乗除算の有効数字を最少の2桁にそろえると11となるため、この肢は最終表示の桁数が多すぎます。"
)
item["overlay"]["choices"][4]["reason"] = (
    "11.18は捕集効率で割り戻した途中値約11.177 µg/Lを4桁に丸めたものです。"
    "正しい計算方向でも、測定値の有効数字を超えて桁を残すことはできません。"
    "75％という2桁の効率を用いる乗除算なので、最終濃度は2桁の11 µg/Lで示します。"
)
item["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
