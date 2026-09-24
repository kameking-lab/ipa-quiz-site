"""Pin primary legal and technical references for 2026 general Q17."""

import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
draft_path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261801-q16-20-draft.json"
draft = json.loads(draft_path.read_text(encoding="utf-8"))
entry = draft["questions"]["emkohyo-EM20261801-q17"]
overlay = entry["overlay"]
overlay["choices"] = [
    {"number": 1, "verdict": "incorrect", "reason": "厚生労働省の換気装置解説では、全体換気装置を希釈換気装置とも呼び、外気の清浄空気と作業場の汚染空気が混ざって薄まり、最後に換気扇等で排気されると説明する。発散源付近の有害物質を希釈するという肢の説明は正しい。"},
    {"number": 2, "verdict": "incorrect", "reason": "有機則第16条は下方吸引型に0.5 m/s、上方吸引型に1.0 m/sの制御風速を求め、上方型では同じ捕捉のためより大きい風速を要する。厚生労働省の対策例は、払拭作業では側方・下方吸引を勧め、開放式洗浄槽では上方吸引を避ける。肢は温熱上昇気流の場合を例外とし、有機則にもその気流を利用する規定があるため整合する。"},
    {"number": 3, "verdict": "correct", "reason": "有機溶剤中毒予防規則第16条は、囲い式フードなら開口面の最小風速、外付け式フードなら開口面から最も離れた作業位置の風速を制御風速の基準位置とする。作業者の呼吸位置で測る最小風速という定義ではないため、この肢が誤りである。"},
    {"number": 4, "verdict": "incorrect", "reason": "有機則第16条の2に基づく告示は、密閉式と開放式の両方で捕捉面を原則16以上の等面積四辺形に分ける。各四辺形の中心点で捕捉面に垂直な風速を測り、その平均が0.2 m/s以上という式を置くため、この肢は正しい。"},
    {"number": 5, "verdict": "incorrect", "reason": "特定化学物質障害予防規則の排ガス処理装置の表は、吸収方式、直接燃焼方式、酸化・還元方式、吸着方式を物質別の処理方式として挙げる。これらの方式が存在するという肢の列挙は正しい。"},
]
evidence = [
    ("https://www.mhlw.go.jp/content/11300000/001240051.pdf", "全体換気装置は、希釈換気装置とも呼ばれており", [1]),
    ("https://www.mhlw.go.jp/content/11300000/001240051.pdf", "最終的には換気扇等により屋外に排気される", [1]),
    ("https://anzeninfo.mhlw.go.jp/horei/hor1-29/hor1-29-32-1-3.html", "側方又は下方吸引型の外付け式フード", [2]),
    ("https://anzeninfo.mhlw.go.jp/horei/hor1-29/hor1-29-32-1-3.html", "上方吸引型フードは使用しない", [2]),
    ("https://www.mhlw.go.jp/web/t_doc?dataId=74090000&dataType=0&pageNo=1", "下方吸引型 〇・五", [2]),
    ("https://www.mhlw.go.jp/web/t_doc?dataId=74090000&dataType=0&pageNo=1", "上方吸引型 一・〇", [2]),
    ("https://www.mhlw.go.jp/web/t_doc?dataId=74090000&dataType=0&pageNo=1", "温熱により生ずる上昇気流を利用", [2]),
    ("https://www.mhlw.go.jp/web/t_doc?dataId=74090000&dataType=0&pageNo=1", "フードの開口面から最も離れた作業位置の風速", [3]),
    ("https://www.mhlw.go.jp/web/t_doc?dataId=74090000&dataType=0&pageNo=1", "囲い式フードにあつては、フードの開口面における最小風速", [3]),
    ("https://www.mhlw.go.jp/web/t_doc?dataId=74997368&dataType=0&pageNo=1", "捕捉面を十六以上の等面積の四辺形", [4]),
    ("https://www.mhlw.go.jp/web/t_doc?dataId=74997368&dataType=0&pageNo=1", "≧0.2", [4]),
    ("https://www.mhlw.go.jp/web/t_doc?dataId=74997368&dataType=0&pageNo=1", "四辺形の中心点における捕捉面に垂直な方向の風速", [4]),
    ("https://www.mhlw.go.jp/web/t_doc?dataId=74997368&dataType=0&pageNo=1", "密閉式プッシュプル型換気装置の性能", [4]),
    ("https://www.mhlw.go.jp/web/t_doc?dataId=74997368&dataType=0&pageNo=1", "開放式プッシュプル型換気装置の性能", [4]),
    ("https://www.mhlw.go.jp/web/t_doc?dataId=74097000&dataType=0&pageNo=1", "酸化・還元方式", [5]),
    ("https://www.mhlw.go.jp/web/t_doc?dataId=74097000&dataType=0&pageNo=1", "直接燃焼方式", [5]),
]
entry["sourceEvidence"] = [dict(url=u, excerpt=e, choiceNumbers=ns) for u, e, ns in evidence]
overlay["sources"] = [
    {"title": "厚生労働省・換気装置の技術解説", "url": "https://www.mhlw.go.jp/content/11300000/001240051.pdf"},
    {"title": "厚生労働省・洗浄・払拭作業のばく露防止対策", "url": "https://anzeninfo.mhlw.go.jp/horei/hor1-29/hor1-29-32-1-3.html"},
    {"title": "厚生労働省・有機溶剤中毒予防規則", "url": "https://www.mhlw.go.jp/web/t_doc?dataId=74090000&dataType=0&pageNo=1"},
    {"title": "厚生労働省・プッシュプル型換気装置の構造・性能告示", "url": "https://www.mhlw.go.jp/web/t_doc?dataId=74997368&dataType=0&pageNo=1"},
    {"title": "厚生労働省・特定化学物質障害予防規則", "url": "https://www.mhlw.go.jp/web/t_doc?dataId=74097000&dataType=0&pageNo=1"},
]
entry["reviewIssues"] = []
draft_path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

image_path = ROOT / "docs/evidence/emkohyo-choice-sources/em20261801-q17-control-velocity-formula.jpg"
images_path = ROOT / "docs/evidence/emkohyo-choice-sources/source-page-images.json"
images = json.loads(images_path.read_text(encoding="utf-8"))
images["emkohyo-EM20261801-q17-17"] = [{
    "path": str(image_path.relative_to(ROOT)).replace("\\", "/"),
    "sha256": hashlib.sha256(image_path.read_bytes()).hexdigest(),
    "description": "厚生労働省の有機則第16条の2告示にある平均風速式の総和記号。原文URL=https://www.mhlw.go.jp/web/t_img_res?img=7552333",
}]
images_path.write_text(json.dumps(images, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
