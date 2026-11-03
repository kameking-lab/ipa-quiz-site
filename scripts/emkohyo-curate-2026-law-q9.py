"""Ground the 2026 law Q9 personal-sampling choices in the MHLW standard."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261802-q06-10-draft.json"
draft = json.loads(path.read_text(encoding="utf-8"))
entry = draft["questions"]["emkohyo-EM20261802-q9"]
overlay = entry["overlay"]
url = "https://www.mhlw.go.jp/web/t_doc?dataId=74087000"
overlay["summary"] = "作業環境測定基準第2条第4項の除外条件は『遊離けい酸の含有率が極めて高いもの』。大臣が定める値を超えるものという肢1の表現が誤り。"
overlay["choices"] = [
    {"number": 1, "verdict": "correct", "reason": "作業環境測定基準第2条第4項は、個人サンプリング法を準用する粉じんから『遊離けい酸の含有率が極めて高いもの』を除く。厚生労働大臣が定める数値を超える場合と置き換えた肢1は、条文の除外条件と異なるため誤り。"},
    {"number": 2, "verdict": "incorrect", "reason": "個人サンプリング法の特定化学物質への適用根拠となる同基準第10条第5項は、第1項に規定する測定の一部に限る。第10条第1項は石綿等を扱う屋内作業場を対象から除外しているため、石綿の測定にはこの方法を使えないという肢2は正しい。"},
    {"number": 3, "verdict": "incorrect", "reason": "同基準第10条第5項第3号は、試料採取を作業日の従事全時間とし、従事時間が2時間を超え、濃度がほぼ均一な場合に限り2時間以上まで短縮できるとする。2時間以下なら全時間採取という肢3は、この規定と一致する。"},
    {"number": 4, "verdict": "incorrect", "reason": "同基準第10条第5項第2号は、ばく露量がほぼ均一と見込まれる作業ごとに適切な数の労働者へ採取機器を装着し、その数は5人を下回ってはならないとする。5人以上の従事者がいる場合に5人以上で採取する肢4は正しい。"},
    {"number": 5, "verdict": "incorrect", "reason": "同基準第10条第5項第4号は、従事者が5人未満なら1人の作業時間を分けて2以上の試料を採取し、採取試料数と同数の労働者から採取したとみなせると定める。したがって肢5の代替採取方法は正しい。"},
]
overlay["sources"] = [{"title": "厚生労働省・作業環境測定基準第2条第4項、第10条第1・5項", "url": url}]
entry["sourceEvidence"] = [
    {"url": url, "excerpt": "粉じん(遊離けい酸の含有率が極めて高いものを除く。)の濃度の測定について準用する", "choiceNumbers": [1]},
    {"url": url, "excerpt": "石綿等(令第六条第二十三号に規定する石綿等をいう。以下同じ。)を取り扱い、又は試験研究のため製造する屋内作業場", "choiceNumbers": [2]},
    {"url": url, "excerpt": "５　前項の規定にかかわらず、第一項に規定する測定のうち", "choiceNumbers": [2]},
    {"url": url, "excerpt": "作業に従事する全時間とすること。ただし、当該作業に従事する時間が二時間を超える場合", "choiceNumbers": [3]},
    {"url": url, "excerpt": "ただし、その数は、それぞれ、五人を下回つてはならない", "choiceNumbers": [4]},
    {"url": url, "excerpt": "作業に従事する労働者の数が五人を下回る場合にあつては", "choiceNumbers": [5]},
    {"url": url, "excerpt": "当該二以上の採取された試料空気の数と同数の労働者に対して行われたものとみなすことができる", "choiceNumbers": [5]},
]
entry["reviewIssues"] = []
path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
