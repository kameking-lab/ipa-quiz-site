"""Ground the 2026 law Q6 registration scopes in the current MHLW rules."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261802-q06-10-draft.json"
draft = json.loads(path.read_text(encoding="utf-8"))
entry = draft["questions"]["emkohyo-EM20261802-q6"]
overlay = entry["overlay"]
rules = "https://www.mhlw.go.jp/web/t_doc?dataId=74158000&dataType=0&pageNo=3"
decree = "https://www.mhlw.go.jp/web/t_doc?dataId=74002000"
measure_act = "https://www.mhlw.go.jp/web/t_doc?dataId=74156000&dataType=0&pageNo=1"
measure_order = "https://www.mhlw.go.jp/web/t_doc?dataId=74157000&dataType=0&pageNo=1"
os_law = "https://www.mhlw.go.jp/web/t_doc?dataId=74001000"
registration = "https://www.mhlw.go.jp/file/05-Shingikai-11201000-Roudoukijunkyoku-Soumuka/0000080700.pdf"
overlay["summary"] = "クロム酸及びその塩は作業環境測定法施行規則別表第4号の作業場に割り当てられる。第3号だけの登録で測定できるとする肢2が誤り。"
overlay["choices"] = [
    {"number": 1, "verdict": "incorrect", "reason": "作業環境測定法施行規則の別表第1号は、安衛令別表第3第2号34の3の物を扱う屋内作業場を含む。安衛令の同号はリフラクトリーセラミックファイバーであり、第1号の登録でこの測定を行えるという肢1は正しい。"},
    {"number": 2, "verdict": "correct", "reason": "安衛令別表第3第2号11のクロム酸及びその塩は、作業環境測定法施行規則別表第4号に明示される。別表第3号は第4号に掲げる物を除くため、第3号だけの登録ではこの測定を行えない。肢2の登録範囲が誤り。"},
    {"number": 3, "verdict": "incorrect", "reason": "現行の測定法施行規則別表では、安衛令別表第3第2号3の3のエチルベンゼンは第4号の列挙に入らず、第3号（特定化学物質）の作業場に属する。第5号は安衛令別表第6の2の有機溶剤業務等の登録で、エチルベンゼンの分析区分ではない。厚労省の案内も混合物を含めエチルベンゼンの分析可能者を第3号資格者と明示する。安衛法第2条第4号では分析は測定の一部なので、第5号のみではエチルベンゼンの測定全体を行えず、肢3は正しい。"},
    {"number": 4, "verdict": "incorrect", "reason": "二酸化硫黄は安衛令別表第3第3号の第三類物質。安衛令第21条第7号の定期測定対象は同別表第1号・第2号であり、測定法第2条第4号と同法施行令第1条が指定作業場として取り込む同号にも第三類は含まれない。したがって二酸化硫黄濃度の測定自体に法定の作業環境測定士資格は要らず、肢4は正しい。"},
    {"number": 5, "verdict": "incorrect", "reason": "作業環境測定法第3条が資格者等に行わせるのは指定作業場の『測定』である。安衛法第2条第4号で測定はデザイン・サンプリング・分析と定義され、『評価』は含まれない。測定結果の評価は同法第65条の2に別建てで定められ、評価者の測定士資格は要求されない。肢5は正しい。"},
]
overlay["sources"] = [
    {"title": "厚生労働省・作業環境測定法施行規則別表", "url": rules},
    {"title": "厚生労働省・労働安全衛生法施行令別表第3、第21条", "url": decree},
    {"title": "厚生労働省・作業環境測定法第3条", "url": measure_act},
    {"title": "厚生労働省・作業環境測定法施行令第1条", "url": measure_order},
    {"title": "厚生労働省・労働安全衛生法第65条の2", "url": os_law},
    {"title": "厚生労働省・特別有機溶剤の分析可能な測定士・機関の登録区分", "url": registration},
]
entry["sourceEvidence"] = [
    {"url": rules, "excerpt": "同令別表第三第二号34の3に掲げる物", "choiceNumbers": [1]},
    {"url": decree, "excerpt": "３４の３　リフラクトリーセラミックファイバー", "choiceNumbers": [1]},
    {"url": rules, "excerpt": "同表第二号3の2、10、11、13、13の2", "choiceNumbers": [2]},
    {"url": rules, "excerpt": "及び次号に掲げる物を除く", "choiceNumbers": [2]},
    {"url": decree, "excerpt": "１１　クロム酸及びその塩", "choiceNumbers": [2]},
    {"url": decree, "excerpt": "３の３　エチルベンゼン", "choiceNumbers": [3]},
    {"url": rules, "excerpt": "三　労働安全衛生法施行令別表第三第一号若しくは第二号に掲げる特定化学物質", "choiceNumbers": [3]},
    {"url": rules, "excerpt": "四　労働安全衛生法施行令別表第三第一号6に掲げる物若しくは同号8に掲げる物で同号6に係るもの若しくは同表第二号3の2、10、11、13、13の2、15の2、21、22、23の3、27の2若しくは33に掲げる物", "choiceNumbers": [3]},
    {"url": rules, "excerpt": "労働安全衛生法施行令別表第六の二第一号から第四十七号までに掲げる有機溶剤", "choiceNumbers": [3]},
    {"url": rules, "excerpt": "同表第一号から第四十七号までに掲げる有機溶剤を含有する特定有機溶剤混合物", "choiceNumbers": [3]},
    {"url": registration, "excerpt": "※測定対象物が「混合有機溶剤」や「特定有機溶剤混合物」である場合、それ以外の場合に共通です。", "choiceNumbers": [3]},
    {"url": registration, "excerpt": "【参考】エチルベンゼン １，２－ジクロロプロパン ○第３号（特化物）の資格をもつ作業環境測定士・作業環境測定機関", "choiceNumbers": [3]},
    {"url": decree, "excerpt": "別表第六の二　有機溶剤(第六条、第二十一条、第二十二条関係)", "choiceNumbers": [3]},
    {"url": decree, "excerpt": "三　第三類物質 １　アンモニア", "choiceNumbers": [4]},
    {"url": decree, "excerpt": "５　二酸化硫黄", "choiceNumbers": [4]},
    {"url": decree, "excerpt": "七　別表第三第一号若しくは第二号に掲げる特定化学物質", "choiceNumbers": [4]},
    {"url": measure_act, "excerpt": "四　指定作業場　労働安全衛生法第六十五条第一項の作業場のうち政令で定めるもの", "choiceNumbers": [4]},
    {"url": measure_order, "excerpt": "第二十一条第一号、第七号、第八号及び第十号に掲げる作業場", "choiceNumbers": [4]},
    {"url": measure_act, "excerpt": "指定作業場について作業環境測定を行うときは、厚生労働省令で定めるところにより、その使用する作業環境測定士にこれを実施", "choiceNumbers": [4, 5]},
    {"url": os_law, "excerpt": "デザイン、サンプリング及び分析(解析を含む。)をいう。", "choiceNumbers": [5]},
    {"url": os_law, "excerpt": "事業者は、前項の評価を行うに当たつては、厚生労働省令で定めるところにより、厚生労働大臣の定める作業環境評価基準", "choiceNumbers": [5]},
]
entry["reviewIssues"] = []
path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
