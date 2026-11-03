"""Attach exact work-environment measurement articles to 2026 law Q10."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261802-q06-10-draft.json"
draft = json.loads(path.read_text(encoding="utf-8"))
entry = draft["questions"]["emkohyo-EM20261802-q10"]
overlay = entry["overlay"]
url = "https://www.mhlw.go.jp/web/t_doc?dataId=74087000"
overlay["choices"] = [
    {"number": 1, "verdict": "incorrect", "reason": "作業環境測定基準第2条第1項第3号は、粉じんの試料空気の採取時間を原則10分間以上としつつ、相対濃度指示方法による測定にはこの制限を適用しない。ただし書きまで含めた肢の記述は正しい。"},
    {"number": 2, "verdict": "incorrect", "reason": "同基準第10条の特定化学物質の表は、インジウム化合物について、第2条第2項に適合する分粒装置を用いたろ過捕集方法を指定する。第2条第2項は鉱物性粉じんを捕集する分粒装置の透過率特性を定めているため、この肢は正しい。"},
    {"number": 3, "verdict": "correct", "reason": "6 m以下の格子交点・床上50～150 cm・原則5点以上という測定点は、粉じん測定についての同基準第2条第1項第1号・第1号の2の規定である。放射性物質の濃度測定は第9条で状態別の試料採取方法と分析方法を定めるが、その格子・5点ルールを置いていないため誤りである。"},
    {"number": 4, "verdict": "incorrect", "reason": "労働安全衛生規則第587条第6号は、加熱された金属の加工の屋内作業場を暑熱等の作業場に含める。作業環境測定基準第3条第1号は、その気温・湿度の測定点を単位作業場所の中央部、床上50 cm以上150 cm以下に1以上置くと定めており、肢は正しい。"},
    {"number": 5, "verdict": "incorrect", "reason": "同基準第12条は、酸素濃度に酸素計または検知管方式の酸素検定器、硫化水素濃度に検知管方式の硫化水素検定器を挙げる。両物質とも検知管方式で測定できるという肢は正しい。"},
]
overlay["sources"] = [
    {"title": "厚生労働省・作業環境測定基準第2・3・9・10・12条", "url": url},
    {"title": "厚生労働省・労働安全衛生規則第587条", "url": "https://www.mhlw.go.jp/web/t_doc?dataId=74003000&dataType=0&pageNo=10"},
]
claims = [
    ("試料空気の採取時間は、十分間以上の継続した時間とすること", [1]),
    ("相対濃度指示方法による測定については、この限りでない", [1]),
    ("インジウム化合物 第二条第二項の規定による要件に該当する分粒装置", [2]),
    ("前項第四号イの分粒装置は、その透過率が次の図で表される特性", [2]),
    ("粉じんの濃度の測定は、次に定めるところによらなければならない", [3]),
    ("六メートル以下の等間隔で引いた縦の線と横の線との交点", [3]),
    ("測定点は、単位作業場所について五以上とすること", [3]),
    ("空気中の放射性物質の濃度の測定は、次の方法によらなければならない", [3]),
    ("放射性物質の状態 試料採取方法", [3]),
    ("中央部の床上五十センチメートル以上百五十センチメートル以下の位置に、一以上", [4]),
    ("酸素の濃度 酸素計又は検知管方式による酸素検定器", [5]),
    ("硫化水素の濃度 検知管方式による硫化水素検定器", [5]),
]
entry["sourceEvidence"] = [{"url": url, "excerpt": quote, "choiceNumbers": ns} for quote, ns in claims]
entry["sourceEvidence"].append({
    "url": "https://www.mhlw.go.jp/web/t_doc?dataId=74003000&dataType=0&pageNo=10",
    "excerpt": "加熱された金属の運搬又は圧延、鍛造、焼入、伸線等の加工の業務を行なう屋内作業場",
    "choiceNumbers": [4],
})
entry["reviewIssues"] = []
path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

presentation_path = ROOT / "data/exam-library/presentation/emkohyo-EM20261802.json"
presentation = json.loads(presentation_path.read_text(encoding="utf-8"))
for choice in presentation["emkohyo-EM20261802-q10"]["choices"]:
    choice["text"] = choice["text"].replace("50cm 以上150cm 以下", "50 cm以上150 cm以下").replace("50cm以上150cm 以下", "50 cm以上150 cm以下")
presentation_path.write_text(json.dumps(presentation, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
