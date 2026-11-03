"""Ground the 2026 law Q8 measurement-frequency choices in MHLW texts."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261802-q06-10-draft.json"
draft = json.loads(path.read_text(encoding="utf-8"))
entry = draft["questions"]["emkohyo-EM20261802-q8"]
overlay = entry["overlay"]
reg10 = "https://www.mhlw.go.jp/web/t_doc?dataId=74003000&dataType=0&pageNo=10"
reg11 = "https://www.mhlw.go.jp/web/t_doc?dataId=74003000&dataType=0&pageNo=11"
reg2 = "https://www.mhlw.go.jp/web/t_doc?dataId=74003000&dataType=0&pageNo=2"
oxygen = "https://www.mhlw.go.jp/web/t_doc?dataId=00tb2057&dataType=1&pageNo=1"
pressure = "https://www.mhlw.go.jp/web/t_doc?d=&dataId=74099000"
overlay["summary"] = "高気圧作業安全衛生規則は作業中のガス分圧・有害ガスを管理するが、毎日の作業開始前に気温・湿度・気圧の3項目を測るという肢4の義務は置いていない。"
overlay["choices"] = [
    {"number": 1, "verdict": "incorrect", "reason": "労働安全衛生規則第587条第9号は加硫がまでゴムを加硫する屋内作業場を測定対象に含める。第607条はその屋内作業場の気温・湿度を半月以内ごとに1回、定期測定する。肢1の対象・項目・頻度はいずれも一致する。"},
    {"number": 2, "verdict": "incorrect", "reason": "同規則第589条第3号は通気設備がある坑内作業場を挙げ、第603条がその通気量を半月以内ごとに1回、定期測定すると定める。肢2は対象作業場も測定する量も頻度も条文どおりなので正しい。"},
    {"number": 3, "verdict": "incorrect", "reason": "厚生労働省の酸素欠乏症等防止規則第3条の施行通達は、第二種酸素欠乏危険作業では酸素濃度と硫化水素濃度を確認し、その日の作業開始前に測定すると明示する。肢3の2項目と測定時点は一致している。"},
    {"number": 4, "verdict": "correct", "reason": "高気圧作業安全衛生規則の全文には作業開始前に気温・湿度・気圧を一組で測る規定がない。第15条は作業中のガス分圧を適正範囲に保つ措置、第17条は作業中の有害ガス測定等を定める。したがって肢4の測定義務は同規則にない。"},
    {"number": 5, "verdict": "incorrect", "reason": "労働安全衛生規則第592条の2第2項は、廃棄物焼却炉の解体等に係る業務の作業開始前に、対象設備内部の付着物のダイオキシン類含有率を測定すると定める。肢5は焼却炉に限定した事例としてこの義務に合う。"},
]
overlay["sources"] = [
    {"title": "厚生労働省・労働安全衛生規則第587・589・592条の2・603条", "url": reg10},
    {"title": "厚生労働省・労働安全衛生規則第607条", "url": reg11},
    {"title": "厚生労働省・労働安全衛生規則第36条第36号", "url": reg2},
    {"title": "厚生労働省・酸素欠乏症等防止規則第3条施行通達", "url": oxygen},
    {"title": "厚生労働省・高気圧作業安全衛生規則第15・17条", "url": pressure},
]
entry["sourceEvidence"] = [
    {"url": reg10, "excerpt": "加硫がまによりゴムを加硫する業務を行なう屋内作業場", "choiceNumbers": [1]},
    {"url": reg11, "excerpt": "半月以内ごとに一回、定期に、当該屋内作業場における気温、湿度及びふく射熱", "choiceNumbers": [1]},
    {"url": reg10, "excerpt": "通気設備が設けられている坑内の作業場", "choiceNumbers": [2]},
    {"url": reg10, "excerpt": "半月以内ごとに一回、定期に、当該作業場における通気量を測定", "choiceNumbers": [2]},
    {"url": oxygen, "excerpt": "第二種酸素欠乏危険作業にあっては空気中の酸素の濃度が一八％以上、かつ、硫化水素の濃度が一〇〇万分の一〇", "choiceNumbers": [3]},
    {"url": oxygen, "excerpt": "その日の作業を開始する前にこれを測定すべきこと", "choiceNumbers": [3]},
    {"url": pressure, "excerpt": "高圧室内作業者が高圧室内業務に従事している間、作業室及び気こう室における次の各号に掲げる気体の分圧", "choiceNumbers": [4]},
    {"url": pressure, "excerpt": "作業室における有害ガスによる高圧室内作業者の危険及び健康障害を防止するため、換気、有害ガスの測定", "choiceNumbers": [4]},
    {"url": reg10, "excerpt": "当該作業を開始する前に、当該作業に係る設備の内部に付着した物に含まれるダイオキシン類の含有率を測定", "choiceNumbers": [5]},
    {"url": reg2, "excerpt": "廃棄物の焼却施設に設置された廃棄物焼却炉、集じん機等の設備の解体等の業務", "choiceNumbers": [5]},
]
entry["reviewIssues"] = []
path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
