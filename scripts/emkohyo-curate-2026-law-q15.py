"""Pin official organic-solvent rule clauses for the five answers in Q15."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261802-q11-15-draft.json"
draft = json.loads(path.read_text(encoding="utf-8"))
entry = draft["questions"]["emkohyo-EM20261802-q15"]
rule = "https://www.mhlw.go.jp/web/t_doc?dataId=74090000"
decree = "https://www.mhlw.go.jp/web/t_doc?dataId=74002000"
entry["overlay"]["summary"] = "有機則第29条は第3種でもタンク等の内部なら健康診断対象と定める。『場所にかかわらず不要』という肢5が誤り。ほかの肢は第16・32・35条と施行令第6条で確認できる。"
entry["overlay"]["sources"] = [
    {"title": "厚生労働省・有機溶剤中毒予防規則第1・16・29・32・35条", "url": rule},
    {"title": "厚生労働省・労働安全衛生法施行令第6条", "url": decree},
]
entry["sourceEvidence"] = [
    {"url": rule, "excerpt": "外付け式フード 側方吸引型 〇・五 下方吸引型 〇・五 上方吸引型 一・〇", "choiceNumbers": [1]},
    {"url": rule, "excerpt": "有機溶剤等を入れたことのあるタンク(有機溶剤の蒸気の発散するおそれがないものを除く。以下同じ。)の内部における業務", "choiceNumbers": [2]},
    {"url": rule, "excerpt": "第三十二条　事業者は、次の各号のいずれかに掲げる業務に労働者を従事させるときは、当該業務に従事する労働者に送気マスクを使用させなければならない。 一　第一条第一項第六号ヲに掲げる業務", "choiceNumbers": [2]},
    {"url": rule, "excerpt": "有機溶剤等を屋内に貯蔵するときは、有機溶剤等がこぼれ、漏えいし、しみ出し、又は発散するおそれのない蓋又は栓をした堅固な容器を用いる", "choiceNumbers": [3]},
    {"url": rule, "excerpt": "有機溶剤の蒸気を屋外に排出する設備", "choiceNumbers": [3]},
    {"url": decree, "excerpt": "二十二　屋内作業場又はタンク、船倉若しくは坑の内部その他の厚生労働省令で定める場所において別表第六の二に掲げる有機溶剤", "choiceNumbers": [4]},
    {"url": rule, "excerpt": "屋内作業場等(第三種有機溶剤等にあつては、タンク等の内部に限る。)における有機溶剤業務", "choiceNumbers": [5]},
    {"url": rule, "excerpt": "前項の業務に常時従事する労働者に対し、雇入れの際、当該業務への配置替えの際及びその後六月以内ごとに一回、定期に", "choiceNumbers": [5]},
]
entry["reviewIssues"] = []
path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
