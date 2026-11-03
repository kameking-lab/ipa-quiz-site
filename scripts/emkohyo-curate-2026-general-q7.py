"""Verify each substance in the vapor-pressure comparison with MHLW SDS."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261803-q06-10-draft.json"
draft = json.loads(path.read_text(encoding="utf-8"))
entry = draft["questions"]["emkohyo-EM20261803-q7"]
urls = {
    "acrylamide": "https://anzeninfo.mhlw.go.jp/anzen/gmsds/79-06-1.html",
    "acetone": "https://anzeninfo.mhlw.go.jp/anzen/gmsds/67-64-1.html",
    "chloroform": "https://anzeninfo.mhlw.go.jp/anzen/gmsds/67-66-3.html",
    "thf": "https://anzeninfo.mhlw.go.jp/anzen/gmsds/109-99-9.html",
    "formaldehyde": "https://anzeninfo.mhlw.go.jp/anzen/gmsds/50-00-0.html",
}
overlay = entry["overlay"]
overlay["summary"] = "25℃の飽和蒸気圧が最大なのはホルムアルデヒド。厚労省SDSは20℃ですでに約438～442 kPaと記載し、25℃より低い温度でもほかの選択肢を大きく上回る。"
overlay["choices"][0]["reason"] = "アクリルアミドは25℃で蒸気圧約0.9 Paの固体である。厚労省SDSの実測値はホルムアルデヒドの20℃で約438～442 kPaより桁違いに低く、最大にならない。"
overlay["choices"][1]["reason"] = "アセトンのSDSにある20℃の蒸気圧は239.5 hPa（約24 kPa）。25℃では上がるが、沸点56℃未満なので大気圧には達しない。20℃ですでに約438～442 kPaのホルムアルデヒドが上回る。"
overlay["choices"][2]["reason"] = "クロロホルムはSDSの25℃の蒸気圧が197 mmHg（約26 kPa）である。同じ25℃でホルムアルデヒドは沸点−20℃を大きく超えており、この値を上回る。"
overlay["choices"][3]["reason"] = "テトラヒドロフランはSDSで20℃の蒸気圧が145 mmHg（約19 kPa）、沸点は約65℃である。25℃でも沸点未満なので大気圧以下で、ホルムアルデヒドより低い。"
overlay["choices"][4]["reason"] = "ホルムアルデヒドのSDSには20℃で4378～4420 hPa（約438～442 kPa）の蒸気圧と、−20℃の沸点が記されている。25℃では沸点を超え、ほかの4物質より蒸気圧が高い。ホルマリン水溶液とは区別する。"
overlay["sources"] = [
    {"title": f"厚生労働省・職場のあんぜんサイト SDS（{name}）", "url": url}
    for name, url in urls.items()
]
entry["sourceEvidence"] = [
    {"url": urls["acrylamide"], "excerpt": "蒸気圧 0.9 Pa（25℃）", "choiceNumbers": [1]},
    {"url": urls["acetone"], "excerpt": "蒸気圧 239.5hPa(239.5mber)(20℃）", "choiceNumbers": [2]},
    {"url": urls["acetone"], "excerpt": "56℃(沸点)", "choiceNumbers": [2]},
    {"url": urls["chloroform"], "excerpt": "197 mm Hg（25℃）", "choiceNumbers": [3]},
    {"url": urls["thf"], "excerpt": "蒸気圧 145mmHg(20℃) [換算値 19328Pa(20℃)]", "choiceNumbers": [4]},
    {"url": urls["thf"], "excerpt": "65℃ (沸点）", "choiceNumbers": [4]},
    {"url": urls["formaldehyde"], "excerpt": "蒸気圧 4378～4420 hPa（20℃）", "choiceNumbers": [1, 2, 3, 4, 5]},
    {"url": urls["formaldehyde"], "excerpt": "沸点、初留点及び沸騰範囲 -20 ℃", "choiceNumbers": [2, 3, 4, 5]},
]
entry["reviewIssues"] = []
path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
