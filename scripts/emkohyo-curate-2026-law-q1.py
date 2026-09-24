"""Attach current MHLW statutory text to the 2026 hygiene law Q1 five-choice draft."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261802-q01-05-draft.json"
draft = json.loads(path.read_text(encoding="utf-8"))
entry = draft["questions"]["emkohyo-EM20261802-q1"]
overlay = entry["overlay"]
decree = "https://www.mhlw.go.jp/web/t_doc?dataId=74002000"
rules = "https://www.mhlw.go.jp/web/t_doc?dataId=74003000&dataType=0&pageNo=1"
labour = "https://www.mhlw.go.jp/web/t_doc?dataId=73023000"
act = "https://www.mhlw.go.jp/web/t_doc?dataId=74001000"
overlay["summary"] = "衛生管理者の非専属例外は2人以上選任し、その中に労働衛生コンサルタントがいる場合の1人だけ。医師・歯科医師には及ばないため肢4が誤り。"
overlay["choices"] = [
    {"number": 1, "verdict": "incorrect", "reason": "安衛令第2条の総括安全衛生管理者の選任基準は、最も低い林業・建設業等でも常時100人以上。80人では不要だが、同令第4条・第5条の衛生管理者と産業医は常時50人以上で必要。したがって肢1は正しい。"},
    {"number": 2, "verdict": "incorrect", "reason": "安衛則第7条の人数表では常時500人超1000人以下の衛生管理者は3人以上。また常時500人超で、多量の高熱物体を扱う業務など労基則第18条第1号等の有害業務に常時30人以上従事させるときは、1人を衛生工学衛生管理者免許者から選ぶ。600人中40人が高熱業務の肢2は正しい。"},
    {"number": 3, "verdict": "incorrect", "reason": "常時1500人なら安衛令第2条の全業種に共通する最低1000人の総括安全衛生管理者基準を超え、安衛則第7条の1000人超2000人以下で衛生管理者4人以上が必要。さらに安衛則第13条は常時1000人以上の産業医を専属とする。肢3は正しい。"},
    {"number": 4, "verdict": "correct", "reason": "安衛則第7条第1項第2号は衛生管理者を原則専属とし、2人以上選任する場合の非専属1人の例外を第10条第3号の者に限る。第10条第3号は労働衛生コンサルタントであり、第1号の医師・第2号の歯科医師は含まない。3資格を同列にして非専属可とする肢4が誤り。"},
    {"number": 5, "verdict": "incorrect", "reason": "安衛法第18条第2項は衛生委員会の委員として、衛生管理者のうち事業者が指名した者と、産業医のうち事業者が指名した者をそれぞれ挙げる。どちらも委員に含める肢5は正しい。"},
]
overlay["sources"] = [
    {"title": "厚生労働省・労働安全衛生法施行令第2・4・5条", "url": decree},
    {"title": "厚生労働省・労働安全衛生規則第7・10・13条", "url": rules},
    {"title": "厚生労働省・労働基準法施行規則第18条", "url": labour},
    {"title": "厚生労働省・労働安全衛生法第18条", "url": act},
]
entry["sourceEvidence"] = [
    {"url": decree, "excerpt": "一　林業、鉱業、建設業、運送業及び清掃業　百人", "choiceNumbers": [1, 3]},
    {"url": decree, "excerpt": "三　その他の業種　千人", "choiceNumbers": [1, 3]},
    {"url": decree, "excerpt": "第四条　法第十二条第一項の政令で定める規模の事業場は、常時五十人以上の労働者を使用する事業場", "choiceNumbers": [1]},
    {"url": decree, "excerpt": "第五条　法第十三条第一項の政令で定める規模の事業場は、常時五十人以上の労働者を使用する事業場", "choiceNumbers": [1]},
    {"url": rules, "excerpt": "五百人を超え千人以下 三人 千人を超え二千人以下 四人", "choiceNumbers": [2, 3]},
    {"url": rules, "excerpt": "常時五百人を超える労働者を使用する事業場で、坑内労働又は労働基準法施行規則第十八条第一号、第三号から第五号まで若しくは第九号に掲げる業務に常時三十人以上の労働者を従事させるもの", "choiceNumbers": [2]},
    {"url": labour, "excerpt": "一　多量の高熱物体を取り扱う業務及び著しく暑熱な場所における業務", "choiceNumbers": [2]},
    {"url": rules, "excerpt": "衛生管理者のうち一人を衛生工学衛生管理者免許を受けた者のうちから選任すること", "choiceNumbers": [2]},
    {"url": rules, "excerpt": "常時千人以上の労働者を使用する事業場又は次に掲げる業務に常時五百人以上の労働者を従事させる事業場にあつては、その事業場に専属の者を選任すること", "choiceNumbers": [3]},
    {"url": rules, "excerpt": "その事業場に専属の者を選任すること。ただし、二人以上の衛生管理者を選任する場合において、当該衛生管理者の中に第十条第三号に掲げる者がいるときは、当該者のうち一人については、この限りでない", "choiceNumbers": [4]},
    {"url": rules, "excerpt": "一　医師 二　歯科医師 三　労働衛生コンサルタント", "choiceNumbers": [4]},
    {"url": act, "excerpt": "二　衛生管理者のうちから事業者が指名した者 三　産業医のうちから事業者が指名した者", "choiceNumbers": [5]},
]
entry["reviewIssues"] = []
path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
