"""Pin the government 5-repeat standard-gas quantification-limit method."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20251807-q16-20-draft.json"
draft = json.loads(path.read_text(encoding="utf-8"))
entry = draft["questions"]["emkohyo-EM20251807-q18"]
method = "https://www.mhlw.go.jp/file/05-Shingikai-11201000-Roudoukijunkyoku-Soumuka/kentou29_1_sankou3_1.pdf"
workplace = "https://www.mhlw.go.jp/content/11300000/001096484.pdf"
entry["overlay"]["sources"] = [
    {"title": "労働者の有害物によるばく露評価ガイドライン（PDF23頁）", "url": method},
    {"title": "厚生労働省・作業環境測定ガイドブックに準じた手順書（PDF24頁）", "url": workplace},
]
entry["overlay"]["choices"][0]["reason"] = "厚労省の作業環境測定手順書では、5回繰り返し分析した標準偏差σの3倍は検出下限値、10倍は定量下限値と区別する。問われている定量下限を3σとする肢1は誤り。"
entry["overlay"]["choices"][1]["reason"] = "厚労省のばく露評価ガイドラインは、標準試料ガス等を5回分析し、測定値の標準偏差σの10倍を定量下限とする。この資料で選ぶ基準は一次評価値で本問の管理濃度とは異なるが、繰返し測定から定量下限を求める式は10σである。"
entry["overlay"]["choices"][2]["reason"] = "cは5回分析で得た測定値の平均、σはその標準偏差である。政府資料の定量下限は10σであり、平均cからσを差し引く定義ではないため、c−σは誤り。"
entry["overlay"]["choices"][3]["reason"] = "c−3σは平均cからばらつきの3倍を差し引く式である。厚労省の手順書では3σは検出下限値、10σが定量下限値であり、平均cを差し引き計算に使わないため誤り。"
entry["overlay"]["choices"][4]["reason"] = "c−10σは平均cからばらつきの10倍を差し引く式だが、厚労省の資料は標準偏差の10倍そのものを定量下限値とする。平均cから差し引く定義ではないため誤り。"
entry["sourceEvidence"] = [
    {"url": method, "excerpt": "標準試料について、繰り返し５回分析し、その標準偏差（σ）の10倍（10σ）を定量下限とする。", "choiceNumbers": [1, 2, 3, 4, 5]},
    {"url": workplace, "excerpt": "標準液 の最小濃度(4 μg/L)を 5 回繰り返し分析して標準偏差(σ)を求め、検出下限値(３σ)及び定量下限値(１０σ)を算出した結果", "choiceNumbers": [1, 2, 3, 4, 5]},
    {"url": workplace, "excerpt": "作業環境測定ガイドブック(出版：(公社)日本作業環境測定協会)に準じた形式による手順書", "choiceNumbers": [1, 2, 3, 4, 5]},
]
entry["reviewIssues"] = []
path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
