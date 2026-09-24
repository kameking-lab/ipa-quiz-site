"""Pin the variance formulas and preserve the original-image verification gate."""

import json
from pathlib import Path


root = Path(__file__).resolve().parents[1]
file = root / "data/exam-library/emkohyo-review/emkohyo-EM20261804-q01-05-draft.json"
draft = json.loads(file.read_text(encoding="utf-8"))
question = draft["questions"]["emkohyo-EM20261804-q2"]
jaea = "https://rpg.jaea.go.jp/else/rpd/others/study/materials/44th-rpd-seminar_yamamoto.pdf"
aist = "https://unit.aist.go.jp/riem/ds-rg/uncertainty/club/club13-1.pdf"
question["overlay"]["sources"] = [
    {"title": "日本原子力研究開発機構 不確かさ評価の基礎 pp.19-20", "url": jaea},
    {"title": "産業技術総合研究所 不確かさセミナー p.42", "url": aist},
]
question["sourceEvidence"] = [
    {"url": jaea, "excerpt": "n 回の実効増倍率の分散は、以下のように計算できる。これを標本分散という。",
     "choiceNumbers": [1, 2, 3, 4, 5]},
    {"url": jaea, "excerpt": "分散は、以下の式により推定可能である。これを不偏分散という。",
     "choiceNumbers": [1, 2, 3, 4, 5]},
    {"url": aist, "excerpt": "自由度\n(n-1)で割って算出した標本分散は，不偏分散とも呼ばれ",
     "choiceNumbers": [1, 2, 3, 4, 5]},
]
question["reviewIssues"] = [
    "公式PDFの式画像とpresentationの文字起こしは目視照合済み。独立Opus再審査までは公開保留。"
]
file.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
