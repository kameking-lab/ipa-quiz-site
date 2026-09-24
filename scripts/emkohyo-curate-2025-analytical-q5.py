"""Correct the detector comparison against primary public sources."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20251807-q01-05-draft.json"
draft = json.loads(path.read_text(encoding="utf-8"))
entry = draft["questions"]["emkohyo-EM20251807-q5"]
jaea = "https://atomica.jaea.go.jp/data/detail/dat_detail_08-04-01-29.html"
maff = "https://www.maff.go.jp/pps/j/guidance/r_bulletin/pdf/rb015-003.pdf"
mhlw = "https://www.mhlw.go.jp/file/05-Shingikai-11201000-Roudoukijunkyoku-Soumuka/0000130871.pdf"
entry["overlay"]["choices"][0]["reason"] = (
    "アクリロニトリルはC₃H₃Nの非ハロゲン化物であり、未誘導体の通常の有機化合物をECDで高感度に測る組合せは適さない。"
    "JAEAはECDが電子を捕獲しやすいハロゲン化合物やニトロ化合物などに選択的で、通常の有機化合物には反応しにくいと説明する。"
    "厚労省のアクリロニトリル試験法でFIDを採用している事実だけからECD不適を結論してはいない。"
)
entry["overlay"]["choices"][2]["reason"] = (
    "臭化メチルはハロゲン化物だが、FIDで測れないとは限らない。農林水産省・植物防疫所の臭化メチルくん蒸研究は、"
    "ガス濃度をGLC（FID）で経時測定したと記す。よってこの組合せは実測例があり、不適当とはいえない。"
)
entry["overlay"]["choices"][4]["reason"] = (
    "厚労省の硫酸ジイソプロピル測定分析法検討資料は、既存の硫酸ジメチルの測定方法として、"
    "捕集・ジエチルエーテル脱着後にガスクロマトグラフのFPDで分析する作業環境測定ガイドブックの記載を紹介している。"
    "硫黄化合物を対象とするFPDとの組合せは不適当ではない。"
)
entry["overlay"]["sources"] = [
    {"title": "JAEA・電子捕獲検出器の選択性", "url": jaea},
    {"title": "厚生労働省・職場のあんぜんサイト：アクリロニトリルSDS", "url": "https://anzeninfo.mhlw.go.jp/anzen/gmsds/107-13-1.html"},
    {"title": "国立環境研究所・FTD解説", "url": "https://www.nies.go.jp/pr/publications/tokubetu/setsumei/sr-039-2001b.html"},
    {"title": "農林水産省・植物防疫所調査研究報告第15号：臭化メチル薬量設定", "url": maff},
    {"title": "環境省・大気中ナフタレン測定マニュアル", "url": "https://www.env.go.jp/air/osen/manual2/pdf-rev1103/01_chpt1-2-3.pdf"},
    {"title": "厚生労働省・硫酸ジイソプロピル測定分析法検討資料", "url": mhlw},
]
entry["sourceEvidence"] = [
    {"url": jaea, "excerpt": "通常の有機化合物には反応しない", "choiceNumbers": [1]},
    {"url": "https://anzeninfo.mhlw.go.jp/anzen/gmsds/107-13-1.html", "excerpt": "C3H3N", "choiceNumbers": [1]},
    {"url": "https://www.nies.go.jp/pr/publications/tokubetu/setsumei/sr-039-2001b.html", "excerpt": "窒素やリンを含む化学物質を選択的、高感度に検出", "choiceNumbers": [2]},
    {"url": maff, "excerpt": "GLC（FID）によって，ガス濃度を経時的に7回にわたって測定", "choiceNumbers": [3]},
    {"url": maff, "excerpt": "植物検疫くん蒸における臭化メチルの薬量計算の基礎資料", "choiceNumbers": [3]},
    {"url": "https://www.env.go.jp/air/osen/manual2/pdf-rev1103/01_chpt1-2-3.pdf", "excerpt": "採取した試料はジクロロメタンで抽出し、濃縮したもの", "choiceNumbers": [4]},
    {"url": mhlw, "excerpt": "特定化学物質の硫酸ジメチルに関しては作業環境測定ガイドブック", "choiceNumbers": [5]},
    {"url": mhlw, "excerpt": "ガスクロマトグラフ（FPD）で分析を行う", "choiceNumbers": [5]},
]
entry["reviewIssues"] = []
path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
