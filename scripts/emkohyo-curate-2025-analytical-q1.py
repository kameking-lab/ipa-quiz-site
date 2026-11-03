"""Tie every absorbance option to PMDA's official photometry method."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20251807-q01-05-draft.json"
draft = json.loads(path.read_text(encoding="utf-8"))
entry = draft["questions"]["emkohyo-EM20251807-q1"]
url = "https://www.pmda.go.jp/files/000240227.pdf"
method = "https://www.mhlw.go.jp/web/t_doc?dataId=81074000&dataType=0&pageNo=5"
entry["overlay"]["sources"] = [
    {"title": "厚生労働省・医薬部外品原料規格2021『32．紫外可視吸光度測定法』PDF65頁", "url": url},
    {"title": "厚生労働省・タール色素省令『5 吸光度測定法』", "url": method},
]
entry["overlay"]["choices"][3]["reason"] = "記述は正しい。厚生労働省の紫外可視吸光度測定法は紫外部に石英セル、可視部にガラスセル又は石英セルを用いると定める。紫外域を通しにくい通常のガラスより石英セルが紫外測定に適するという肢の内容と一致する。"
entry["overlay"]["choices"][4]["reason"] = "記述は正しい。吸収極大の波長は同じ濃度・層長で吸光度が大きく、微小な濃度差が検出しやすい。厚生労働省の吸光度測定法も極大波長の吸光度を定量に用いると明記する。妨害がなければこの波長を選ぶのは適切である。"
entry["sourceEvidence"] = [
    {"url": url, "excerpt": "透過光の強さ（I）の入射光の強さ（I0）に対する比率を透過度（t）といい，これを百分率で表したものを透過率（T）という．また，透過度の逆数の常用対数を吸光度（A）という．", "choiceNumbers": [1, 2]},
    {"url": url, "excerpt": "吸光度（A）は，溶液の濃度（c）及び層長（l）に比例する．", "choiceNumbers": [1]},
    {"url": url, "excerpt": "光源は，紫外部の測定に重水素放電管を用い，可視部の測定にタングステンランプ又はハロゲンランプを用いる．", "choiceNumbers": [3]},
    {"url": url, "excerpt": "セルは，紫外部の測定に石英製，可視部の測定にガラス製又は石英製を用いる．", "choiceNumbers": [4]},
    {"url": url, "excerpt": "吸収極大の波長におけるモル吸光係数は，εmax で表す．", "choiceNumbers": [5]},
    {"url": method, "excerpt": "吸収の極大の波長における一定濃度の溶液の吸光度を測定することにより定量を行う方法である。", "choiceNumbers": [5]},
]
entry["reviewIssues"] = []
path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

presentation_path = ROOT / "data/exam-library/presentation/emkohyo-EM20251807.json"
presentation = json.loads(presentation_path.read_text(encoding="utf-8"))
presentation["emkohyo-EM20251807-q1"]["choices"][1]["text"] = "吸光度0.3では、入射光の30％が試料液に吸収される。"
presentation_path.write_text(json.dumps(presentation, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
