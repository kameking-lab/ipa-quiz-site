"""Curate the official-answer-aligned acid-strength explanation for 2026 analysis Q6."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-20260217-4-q06-10-draft.json"
data = json.loads(path.read_text(encoding="utf-8"))
item = data["questions"]["emkohyo-20260217-4-q6"]
overlay = item["overlay"]

strong_hcl_hno3 = "https://atomica.jaea.go.jp/data/detail/dat_detail_09-04-03-26.html"
strong_hi = "https://jopss.jaea.go.jp/pdfdata/JAEA-Technology-2007-060.pdf"
weak_hf = "https://anzeninfo.mhlw.go.jp/anzen/gmsds/7664-39-3b.html"
ph_definition = "https://atomica.jaea.go.jp/dic/detail/dic_detail_2153.html"
ionization = "https://www.mext.go.jp/component/a_menu/education/detail/__icsFiles/afieldfile/2018/05/25/1398423_13.pdf"

overlay["summary"] = (
    "同濃度の酸では電離によって生じる水素イオンが少ないほどpHは大きい。"
    "政府資料で弱酸とされるフッ化水素酸を選ぶ。"
)
reasons = [
    "塩酸は日本原子力研究開発機構の資料で硝酸とともに強酸とされる。"
    "同じ物質量濃度の弱酸であるフッ化水素酸より水素イオンを多く生じるため、"
    "pHが最も大きい水溶液には当たらない。",
    "硝酸は日本原子力研究開発機構の資料で塩酸とともに強酸とされる。"
    "同じ0.1 mol/Lで比べると、弱酸のフッ化水素酸より水素イオン濃度が高くなるため、"
    "最大のpHを示す選択肢ではない。",
    "硫酸は日本原子力研究開発機構の技術報告でヨウ化水素酸とともに強酸と明記される。"
    "同じ0.1 mol/Lの弱酸フッ化水素酸より水素イオンを多く生じる側なので、"
    "pHが最も大きいという条件に合わない。",
    "厚生労働省のフッ化水素酸SDSは、この酸を弱酸と記す。"
    "文部科学省掲載の試験問題は強酸がほぼ完全に電離する性質を示す。"
    "同濃度では弱酸の電離による水素イオンが少なく、pH＝−log[H⁺]より最大となる。",
    "ヨウ化水素酸は日本原子力研究開発機構の資料で硫酸とともに強酸と明記される。"
    "同じ0.1 mol/Lの弱酸フッ化水素酸より多くの水素イオンを生じるため、"
    "pHが最大となるものではない。",
]
for choice, reason in zip(overlay["choices"], reasons, strict=True):
    choice["reason"] = reason
overlay["sources"] = [
    {"title": "日本原子力研究開発機構 ATOMICA ストロンチウムの放射化学分析と測定", "url": strong_hcl_hno3},
    {"title": "日本原子力研究開発機構 ISプロセス用高温継手機能評価試験結果", "url": strong_hi},
    {"title": "厚生労働省 職場のあんぜんサイト フッ化水素酸SDS", "url": weak_hf},
    {"title": "日本原子力研究開発機構 ATOMICA pH", "url": ph_definition},
    {"title": "文部科学省 高等学校卒業程度認定試験 化学基礎", "url": ionization},
]
item["sourceEvidence"] = [
    {"url": strong_hcl_hno3, "excerpt": "塩酸や硝酸のような強酸水溶液", "choiceNumbers": [1, 2, 4]},
    {"url": strong_hi, "excerpt": "強酸である硫酸やヨウ化水素酸", "choiceNumbers": [3, 4, 5]},
    {"url": weak_hf, "excerpt": "pH 弱酸（ICSC(2017)）", "choiceNumbers": [1, 2, 3, 4, 5]},
    {"url": ph_definition, "excerpt": "pH＝−log 10 ［H + ］", "choiceNumbers": [1, 2, 3, 4, 5]},
    {"url": ionization, "excerpt": "水溶液中でほぼ完全に電離する酸・塩基を強酸・強塩基という", "choiceNumbers": [1, 2, 3, 4, 5]},
]
item["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
