"""Ground the measurement frequency/retention table in the current MHLW laws."""

import json
from pathlib import Path


root = Path(__file__).resolve().parents[1]
file = root / "data/exam-library/emkohyo-review/emkohyo-20260217-2-q06-10-draft.json"
draft = json.loads(file.read_text(encoding="utf-8"))
question = draft["questions"]["emkohyo-20260217-2-q7"]
pb = "https://www.mhlw.go.jp/web/t_doc?dataId=74094000&dataType=0&pageNo=1"
special = "https://www.mhlw.go.jp/web/t_doc?dataId=74097000&dataType=0&pageNo=1"
organic = "https://www.mhlw.go.jp/web/t_doc?dataId=74090000&dataType=0&pageNo=1"
order = "https://www.mhlw.go.jp/web/t_doc?dataId=74002000&dataType=0&pageNo=2"
question["overlay"]["sources"] = [
    {"title": "厚生労働省 鉛中毒予防規則 第52条", "url": pb},
    {"title": "厚生労働省 特定化学物質障害予防規則 第36条", "url": special},
    {"title": "厚生労働省 有機溶剤中毒予防規則 第28条", "url": organic},
    {"title": "厚生労働省 労働安全衛生法施行令 別表第3・別表第6の2", "url": order},
]
reasons = {
    1: "鉛中毒予防規則第52条は、対象屋内作業場の鉛濃度を1年以内ごとに1回測定し、その記録を3年間保存すると定める。表の対象・頻度・保存期間がすべて合うので、この肢は誤った組合せではない。",
    2: "施行令別表第3の第二類物質23の3は粉状のニッケル化合物を掲げる。特化則第36条の測定頻度は6か月以内ごとに1回で、同条3項の30年保存対象に23の3が含まれるため、この組合せは正しい。",
    3: "施行令別表第6の2には二硫化炭素が有機溶剤として掲げられる。有機則第28条は対象屋内作業場で6か月以内ごとの測定と記録の3年保存を定めるので、表の組合せは誤りではない。",
    4: "施行令別表第6の2にメチルエチルケトンが有機溶剤として掲げられる。有機則第28条で測定頻度は6か月以内ごとに1回だが、記録保存は3年間であり、表の30年が誤り。したがって本肢が正答となる。",
    5: "施行令別表第3の第二類物質30はベンゼンを掲げる。特化則第36条の測定頻度は6か月以内ごとに1回で、同条3項の30年保存対象にも30が含まれるので、3欄とも一致する。",
}
for choice in question["overlay"]["choices"]:
    choice["reason"] = reasons[choice["number"]]
question["sourceEvidence"] = [
    {"url": pb, "excerpt": "一年以内ごとに一回、定期に、空気中における鉛の濃度を測定しなければならない。", "choiceNumbers": [1]},
    {"url": pb, "excerpt": "これを三年間保存しなければならない。", "choiceNumbers": [1]},
    {"url": special, "excerpt": "六月以内ごとに一回、定期に、第一類物質", "choiceNumbers": [2, 5]},
    {"url": special, "excerpt": "23の2から24まで、26、27の2、29、30", "choiceNumbers": [2, 5]},
    {"url": special, "excerpt": "測定の記録については、三十年間保存するものとする。", "choiceNumbers": [2, 5]},
    {"url": organic, "excerpt": "六月以内ごとに一回、定期に、当該有機溶剤の濃度を測定しなければならない。", "choiceNumbers": [3, 4]},
    {"url": organic, "excerpt": "これを三年間保存しなければならない。", "choiceNumbers": [3, 4]},
    {"url": order, "excerpt": "２３の３　ニツケル化合物", "choiceNumbers": [2]},
    {"url": order, "excerpt": "３０　ベンゼン", "choiceNumbers": [5]},
    {"url": order, "excerpt": "三十八　二硫化炭素", "choiceNumbers": [3]},
    {"url": order, "excerpt": "四十四　メチルエチルケトン", "choiceNumbers": [4]},
]
question["reviewIssues"] = ["政府法令の対象番号・頻度・保存期間を照合中。独立Opus審査まで公開保留。"]
file.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
