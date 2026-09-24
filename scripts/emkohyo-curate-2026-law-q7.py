"""Ground the 2026 law Q7 measurement and retention combinations in current rules."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261802-q06-10-draft.json"
draft = json.loads(path.read_text(encoding="utf-8"))
entry = draft["questions"]["emkohyo-EM20261802-q7"]
overlay = entry["overlay"]
ion = "https://www.mhlw.go.jp/web/t_doc?dataId=74101000"
specific = "https://www.mhlw.go.jp/web/t_doc?dataId=74097000&dataType=0&pageNo=1"
organic = "https://www.mhlw.go.jp/web/t_doc?dataId=74090000"
decree = "https://www.mhlw.go.jp/web/t_doc?dataId=74002000"
overlay["summary"] = "オルト‐ジクロルベンゼンは有機溶剤で、6か月ごとに測定した記録は3年間保存する。有機則第28条の3年を30年とした肢4が誤り。"
overlay["choices"] = [
    {"number": 1, "verdict": "incorrect", "reason": "電離放射線障害防止規則第55条は、対象作業場の空気中の放射性物質濃度を1月以内ごとに1回測定し、その記録を5年間保存すると定める。肢1の測定対象・頻度・記録保存期間の組合せは条文と一致する。"},
    {"number": 2, "verdict": "incorrect", "reason": "労働安全衛生法施行令別表第3第2号13の五酸化バナジウムは、特定化学物質障害予防規則第36条第1項の6月以内ごとの測定対象である。同条第2項は原則3年間保存とし、第3項の30年対象列挙に13はないため、肢2は正しい。"},
    {"number": 3, "verdict": "incorrect", "reason": "同施行令別表第3第2号23のトリレンジイソシアネートには、特化則第36条第1項の6月以内ごとの定期測定と第2項の3年間保存が適用される。第3項の30年対象列挙に23は含まれず、肢3の組合せは正しい。"},
    {"number": 4, "verdict": "correct", "reason": "同施行令別表第6の2第10号のオルト‐ジクロルベンゼンは有機溶剤で、有機溶剤中毒予防規則第28条第2項が6月以内ごとの濃度測定、第3項が記録の3年間保存を定める。30年間保存とする肢4が誤り。"},
    {"number": 5, "verdict": "incorrect", "reason": "同施行令別表第3第2号23の2のナフタレンは、特化則第36条第1項による6月以内ごとの定期測定対象である。同条第3項は23の2から24までに掲げる物の測定記録を30年間保存すると定めるため、肢5は正しい。"},
]
overlay["sources"] = [
    {"title": "厚生労働省・電離放射線障害防止規則第55条", "url": ion},
    {"title": "厚生労働省・特定化学物質障害予防規則第36条", "url": specific},
    {"title": "厚生労働省・有機溶剤中毒予防規則第28条", "url": organic},
    {"title": "厚生労働省・労働安全衛生法施行令別表第3・第6の2", "url": decree},
]
entry["sourceEvidence"] = [
    {"url": ion, "excerpt": "空気中の放射性物質の濃度を一月以内ごとに一回、定期に", "choiceNumbers": [1]},
    {"url": ion, "excerpt": "これを五年間保存しなければならない", "choiceNumbers": [1]},
    {"url": decree, "excerpt": "１３　五酸化バナジウム", "choiceNumbers": [2]},
    {"url": decree, "excerpt": "２３　トリレンジイソシアネート", "choiceNumbers": [3]},
    {"url": decree, "excerpt": "２３の２　ナフタレン", "choiceNumbers": [5]},
    {"url": specific, "excerpt": "六月以内ごとに一回、定期に、第一類物質", "choiceNumbers": [2, 3, 5]},
    {"url": specific, "excerpt": "前項の規定による測定を行つたときは、その都度次の事項を記録し、これを三年間保存", "choiceNumbers": [2, 3]},
    {"url": specific, "excerpt": "23の2から24まで", "choiceNumbers": [2, 3, 5]},
    {"url": specific, "excerpt": "三十年間保存するものとする", "choiceNumbers": [5]},
    {"url": decree, "excerpt": "十　オルト―ジクロルベンゼン", "choiceNumbers": [4]},
    {"url": organic, "excerpt": "六月以内ごとに一回、定期に、当該有機溶剤の濃度を測定", "choiceNumbers": [4]},
    {"url": organic, "excerpt": "前項の規定により測定を行なつたときは、そのつど次の事項を記録して、これを三年間保存", "choiceNumbers": [4]},
]
entry["reviewIssues"] = []
path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

presentation_path = ROOT / "data/exam-library/presentation/emkohyo-EM20261802.json"
presentation = json.loads(presentation_path.read_text(encoding="utf-8"))
for choice in presentation["emkohyo-EM20261802-q7"]["choices"]:
    text = choice["text"]
    for word in ("放射性物質の濃度", "五酸化バナジウムの濃度", "トリレンジイソシアネートの濃度", "オルト‐ジクロルベンゼンの濃度", "ナフタレンの濃度"):
        if text.startswith(word):
            text = word + " │ " + text[len(word):].strip()
            break
    text = text.replace("１回 ５年", "１回 │ ５年").replace("１回 ３年", "１回 │ ３年")
    text = text.replace("１回 30年", "１回 │ 30年")
    choice["text"] = text
presentation_path.write_text(json.dumps(presentation, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
