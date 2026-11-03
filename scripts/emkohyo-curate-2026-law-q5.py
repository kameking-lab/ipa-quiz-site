"""Ground 2026 hygiene law Q5 on current MHLW qualification and duty rules."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261802-q01-05-draft.json"
draft = json.loads(path.read_text(encoding="utf-8"))
entry = draft["questions"]["emkohyo-EM20261802-q5"]
overlay = entry["overlay"]
oxygen = "https://www.mhlw.go.jp/web/t_doc?dataId=74105000&dataType=0&pageNo=1"
decree = "https://www.mhlw.go.jp/web/t_doc?dataId=74002000"
measure_rule = "https://www.mhlw.go.jp/web/t_doc?dataId=74158000&dataType=0&pageNo=3"
measure_order = "https://www.mhlw.go.jp/web/t_doc?dataId=74157000&dataType=0&pageNo=1"
rules = "https://www.mhlw.go.jp/web/t_doc?dataId=74003000&dataType=0&pageNo=1"
act = "https://www.mhlw.go.jp/web/t_doc?dataId=74001000"
report = "https://www.mhlw.go.jp/stf/newpage_09979.html"
overlay["summary"] = "作業主任者の氏名・担当事項は安衛則第18条に基づき掲示等で周知する。就業制限業務の免許証等携帯義務と混同した肢4が誤り。"
overlay["choices"] = [
    {"number": 1, "verdict": "incorrect", "reason": "酸素欠乏症等防止規則第26条は酸素欠乏危険作業主任者技能講習を学科と実技で行うと定め、実技科目に救急そ生の方法と酸素濃度の測定方法を挙げる。肢1は講習内容を正しく述べている。"},
    {"number": 2, "verdict": "incorrect", "reason": "作業環境測定法施行令第1条は安衛令第21条第6号の一部を指定作業場に含め、測定法施行規則別表第2号は放射性物質取扱作業室を挙げる。一方、主任者を要する安衛令第6条第5号はエックス線装置を使用する放射線業務等、第5号の2はガンマ線照射装置による透過写真撮影であり、同作業室での放射性物質取扱い一般は別の範囲。肢2は正しい。"},
    {"number": 3, "verdict": "incorrect", "reason": "安衛則第17条は、同じ場所で同一区分の作業主任者を2人以上選任したとき、それぞれの職務分担を定める義務を課す。複数選任できることも規定の前提であり、肢3は正しい。"},
    {"number": 4, "verdict": "correct", "reason": "安衛則第18条は、作業主任者の氏名と担当事項を掲示等で関係労働者に周知するよう事業者に求める。安衛法第61条第3項の免許証等携帯は、同条第1項の就業制限業務に従事する者への規定で、作業主任者を選任したというだけで全区分に携帯義務は生じない。肢4が誤り。"},
    {"number": 5, "verdict": "incorrect", "reason": "安衛則第2条第2項・第4条第3項・第7条第3項・第13条第2項は、総括安全衛生管理者・安全管理者・衛生管理者・産業医それぞれの監督署への選任報告を定める。作業主任者を定める第16〜18条には対応する選任報告規定がなく、氏名等の周知を求める。肢5は正しい。"},
]
overlay["sources"] = [
    {"title": "厚生労働省・酸素欠乏症等防止規則第26条", "url": oxygen},
    {"title": "厚生労働省・労働安全衛生法施行令第6条", "url": decree},
    {"title": "厚生労働省・作業環境測定法施行規則別表", "url": measure_rule},
    {"title": "厚生労働省・作業環境測定法施行令第1条", "url": measure_order},
    {"title": "厚生労働省・労働安全衛生規則第16～18条", "url": rules},
    {"title": "厚生労働省・労働安全衛生法第61条", "url": act},
    {"title": "厚生労働省・管理者等の選任報告案内", "url": report},
]
entry["sourceEvidence"] = [
    {"url": oxygen, "excerpt": "酸素欠乏危険作業主任者技能講習は、学科講習及び実技講習によつて行う", "choiceNumbers": [1]},
    {"url": oxygen, "excerpt": "実技講習は、次の科目について行なう。 一　救急そ生の方法 二　酸素の濃度の測定方法", "choiceNumbers": [1]},
    {"url": measure_rule, "excerpt": "二　電離放射線障害防止規則第五十三条第二号に掲げる放射性物質取扱作業室", "choiceNumbers": [2]},
    {"url": measure_rule, "excerpt": "別表　作業場の種類(第三条―第五条、第六条、第十六条、第十七条、第五十一条の八、第五十二条、第五十四条、第五十九条、第六十一条関係)", "choiceNumbers": [2]},
    {"url": measure_order, "excerpt": "労働安全衛生法施行令(昭和四十七年政令第三百十八号)第二十一条第一号、第七号、第八号及び第十号に掲げる作業場", "choiceNumbers": [2]},
    {"url": measure_order, "excerpt": "第二十一条第六号に掲げる作業場のうち厚生労働省令で定めるもの", "choiceNumbers": [2]},
    {"url": decree, "excerpt": "五　別表第二第一号又は第三号に掲げる放射線業務に係る作業", "choiceNumbers": [2]},
    {"url": decree, "excerpt": "五の二　ガンマ線照射装置を用いて行う透過写真の撮影の作業", "choiceNumbers": [2]},
    {"url": decree, "excerpt": "一　エツクス線装置の使用又はエツクス線の発生を伴う当該装置の検査の業務", "choiceNumbers": [2]},
    {"url": decree, "excerpt": "三　エツクス線管若しくはケノトロンのガス抜き又はエツクス線の発生を伴うこれらの検査の業務", "choiceNumbers": [2]},
    {"url": rules, "excerpt": "第十七条　事業者は、別表第一の上欄に掲げる一の作業を同一の場所で行なう場合において、当該作業に係る作業主任者を二人以上選任したときは、それぞれの作業主任者の職務の分担を定めなければならない", "choiceNumbers": [3]},
    {"url": rules, "excerpt": "第十八条　事業者は、作業主任者を選任したときは、当該作業主任者の氏名及びその者に行なわせる事項を作業場の見やすい箇所に掲示する等により関係労働者に周知させなければならない", "choiceNumbers": [4, 5]},
    {"url": act, "excerpt": "第一項の規定により当該業務につくことができる者は、当該業務に従事するときは、これに係る免許証その他その資格を証する書面を携帯していなければならない", "choiceNumbers": [4]},
    {"url": report, "excerpt": "総括安全衛生管理者・安全管理者・衛生管理者・産業医は選任すべき事由が発生した日から14日以内に選任", "choiceNumbers": [5]},
    {"url": rules, "excerpt": "２　事業者は、総括安全衛生管理者を選任したときは、遅滞なく", "choiceNumbers": [5]},
    {"url": rules, "excerpt": "３　事業者は、安全管理者を選任したときは、遅滞なく", "choiceNumbers": [5]},
    {"url": rules, "excerpt": "３　事業者は、衛生管理者を選任したときは、遅滞なく", "choiceNumbers": [5]},
    {"url": rules, "excerpt": "２　事業者は、法第十三条第一項の規定により産業医を選任したときは、遅滞なく", "choiceNumbers": [5]},
]
entry["reviewIssues"] = []
path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
