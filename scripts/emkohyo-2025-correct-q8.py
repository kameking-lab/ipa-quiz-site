"""Pin the five model-SDS boiling points for the nonpolar GC question."""

import json
from pathlib import Path


root = Path(__file__).resolve().parents[1]
file = root / "data/exam-library/emkohyo-review/emkohyo-EM20251805-q06-10-draft.json"
draft = json.loads(file.read_text(encoding="utf-8"))
question = draft["questions"]["emkohyo-EM20251805-q8"]
reasons = {
    1: "酢酸メチルの沸点は厚生労働省モデルSDSで56.8℃です。候補中で最も高いシクロヘキサノンの155.6℃より約99℃低く、与えられた無極性カラムで最も長く保持される成分には当たりません。",
    2: "イソプロピルアルコールの沸点はモデルSDSで82.3℃です。極性や分析条件によって細かな溶出順は変わり得ますが、155.6℃のシクロヘキサノンとの大きな揮発性の差を覆して最長となる選択肢ではありません。",
    3: "n-ヘキサンの沸点はモデルSDSで約69℃で、シクロヘキサノンの155.6℃より約87℃低い値です。無極性固定相との親和性はあっても、この低い沸点のため最長保持の選択肢にはなりません。",
    4: "シクロヘキサノンの沸点はモデルSDSで155.6℃と、他の4候補の56～82℃を大きく上回ります。無極性メチルシリコン系固定相を用いる本問では最も長く保持される物質で、公式正答の4と一致します。",
    5: "アセトンの沸点はモデルSDSで約56℃です。酢酸メチルとの細かな順番を沸点だけで断定する必要はありませんが、155.6℃のシクロヘキサノンよりはるかに揮発しやすく、最長保持には当たりません。",
}
for choice in question["overlay"]["choices"]:
    choice["reason"] = reasons[choice["number"]]
urls = {
    1: ("79-20-9", "沸点、初留点及び沸騰範囲 56.8℃"),
    2: ("67-63-0", "沸点、初留点及び沸騰範囲 82.3℃"),
    3: ("110-54-3", "沸点、初留点及び沸騰範囲 69 ℃"),
    4: ("108-94-1", "沸点、初留点及び沸騰範囲 155.6℃"),
    5: ("67-64-1", "沸点、初留点及び沸騰範囲 56℃"),
}
question["sourceEvidence"] = [
    {"url": f"https://anzeninfo.mhlw.go.jp/anzen/gmsds/{cas}.html",
     "excerpt": excerpt, "choiceNumbers": [number]}
    for number, (cas, excerpt) in urls.items()
]
question["reviewIssues"] = []
file.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
