"""Curate official-source evidence for the 2025 general-analysis Q5 candidate."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20251807-q01-05-draft.json"
data = json.loads(path.read_text(encoding="utf-8"))
q = data["questions"]["emkohyo-EM20251807-q5"]
overlay = q["overlay"]
overlay["summary"] = "電子捕獲検出器はハロゲン化合物などに高感度で、アクリロニトリルと組み合わせる肢1が不適当。"
overlay["choices"] = [
    {"number": 1, "verdict": "correct", "reason": "アクリロニトリル（CH₂=CHCN）はハロゲンを含まない。電子捕獲検出器はハロゲン化合物など電子を捕獲する物質への選択性が高い。厚生労働省の医薬部外品原料規格におけるアクリロニトリル試験法ではFIDを用いる。したがってECDとの組合せが不適当である。"},
    {"number": 2, "verdict": "incorrect", "reason": "アクリルアミドは窒素を含む有機化合物である。国立環境研究所はフレームサーミオニック検出器を窒素又はリンを含む化合物に選択的な検出器と説明しており、この組合せは誤りではない。"},
    {"number": 3, "verdict": "incorrect", "reason": "農林水産省の臭化メチルくん蒸試験では、装置内の臭化メチルのガス濃度をGC-FIDで測定している。臭素を含むからといってFIDで検出できないわけではなく、この組合せは誤りではない。"},
    {"number": 4, "verdict": "incorrect", "reason": "環境省の大気中ナフタレン測定マニュアルは、固体吸着で採取した試料をジクロロメタンで抽出・濃縮し、ガスクロマトグラフ質量分析法で分析すると記載する。この組合せは公的測定方法と一致する。"},
    {"number": 5, "verdict": "incorrect", "reason": "硫酸ジメチルは硫黄を含む化合物である。厚生労働省の硫酸ジイソプロピル測定法検討資料は、硫酸ジメチルについても捕集・脱着後にガスクロマトグラフの炎光光度検出器で分析すると記載している。この組合せは誤りではない。"},
]
evidence = [
    ("https://atomica.jaea.go.jp/data/detail/dat_detail_08-04-03-03.html", "ハロゲン化合物などの親電子性化合物", [1]),
    ("https://www.mhlw.go.jp/web/t_doc?dataId=00tc9023&dataType=1", "検出器：水素炎イオン化検出器", [1]),
    ("https://www.mhlw.go.jp/web/t_doc?dataId=00tc9023&dataType=1", "アクリロニトリル試験法とは", [1]),
    ("https://anzeninfo.mhlw.go.jp/anzen/gmsds/107-13-1.html", "C3H3N", [1]),
    ("https://www.nies.go.jp/pr/publications/tokubetu/setsumei/sr-039-2001b.html", "窒素やリンを含む化学物質を選択的、高感度に検出", [2]),
    ("https://www.maff.go.jp/j/syouan/seisaku/regulatory_science/attach/pdf/shuryo_plant-7.pdf", "GC-FID 測定", [3]),
    ("https://www.maff.go.jp/j/syouan/seisaku/regulatory_science/attach/pdf/shuryo_plant-7.pdf", "臭化メチル原液", [3]),
    ("https://www.env.go.jp/air/osen/manual2/pdf-rev1103/01_chpt1-2-3.pdf", "採取した試料はジクロロメタンで抽出し、濃縮したもの", [4]),
    ("https://www.mhlw.go.jp/file/05-Shingikai-11201000-Roudoukijunkyoku-Soumuka/0000130871.pdf", "ガスクロマトグラフ（FPD）で分析", [5]),
]
q["sourceEvidence"] = [dict(url=url, excerpt=excerpt, choiceNumbers=choices) for url, excerpt, choices in evidence]
titles = {
    "atomica.jaea.go.jp": "日本原子力研究開発機構・ECDの原理",
    "www.mhlw.go.jp": "厚生労働省・医薬部外品原料規格と分析法検討資料",
    "anzeninfo.mhlw.go.jp": "厚生労働省・アクリロニトリルSDS",
    "www.nies.go.jp": "国立環境研究所・FTD解説",
    "www.maff.go.jp": "農林水産省・臭化メチルくん蒸試験",
    "www.env.go.jp": "環境省・ナフタレン測定マニュアル",
}
overlay["sources"] = [dict(title=titles[url.split('/')[2]], url=url) for url in dict.fromkeys(url for url, _, _ in evidence)]
q["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

presentation_path = ROOT / "data/exam-library/presentation/emkohyo-EM20251807.json"
presentation = json.loads(presentation_path.read_text(encoding="utf-8"))
item = presentation["emkohyo-EM20251807-q5"]
item["prompt"] = "特定化学物質と、そのガスクロマトグラフ分析に用いる検出器の組合せのうち、不適当なものはどれか。"
for choice in item["choices"]:
    name = ["アクリロニトリル", "アクリルアミド", "臭化メチル", "ナフタレン", "硫酸ジメチル"][choice["number"] - 1]
    choice["text"] = name + " ― " + choice["text"].removeprefix(name).removeprefix(" ― ")
presentation_path.write_text(json.dumps(presentation, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
