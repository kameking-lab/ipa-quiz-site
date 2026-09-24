"""Ground 2026 hygiene law Q4 respirator transfer restrictions in current MHLW text."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261802-q01-05-draft.json"
draft = json.loads(path.read_text(encoding="utf-8"))
entry = draft["questions"]["emkohyo-EM20261802-q4"]
overlay = entry["overlay"]
act = "https://www.mhlw.go.jp/web/t_doc?dataId=74001000"
decree = "https://www.mhlw.go.jp/web/t_doc?dataId=74002000"
rules = "https://www.mhlw.go.jp/web/t_doc?dataId=74003000&dataType=0&pageNo=2"
dust_spec = "https://www.mhlw.go.jp/web/t_doc?dataId=74041000"
powered_spec = "https://www.mhlw.go.jp/web/t_doc?dataId=74ab4390&dataType=0&pageNo=1"
overlay["summary"] = "規格具備の対象となる防毒マスクは安衛令第13条第5項と安衛則第26条で種類が限られ、硫化水素用は列挙されない。肢2は対象外。"
overlay["choices"] = [
    {"number": 1, "verdict": "incorrect", "reason": "安衛法第42条の譲渡等制限を受ける防毒マスクには、安衛令第13条第5項にあるハロゲンガス用・有機ガス用に加え、安衛則第26条第3号の亜硫酸ガス用が含まれる。肢1は規格具備の対象である。"},
    {"number": 2, "verdict": "correct", "reason": "安衛令第13条第5項は防毒マスクの対象をハロゲンガス用・有機ガス用・厚生労働省令指定のものに限り、安衛則第26条は省令指定を一酸化炭素用・アンモニア用・亜硫酸ガス用と列挙する。硫化水素用はこの限定列挙にないため、肢2は規格具備を要する譲渡等制限の対象外。"},
    {"number": 3, "verdict": "incorrect", "reason": "安衛法第42条・別表第2第8号の防じんマスクは規格具備対象であり、安衛令第13条第5項の除外はろ過材又は面体を有しないもの。防じんマスクの規格第1条は一体のろ過材・面体を持つ使い捨て式を種類として明示するため、肢3も対象となる。"},
    {"number": 4, "verdict": "incorrect", "reason": "安衛法別表第2第16号の電動ファン付き呼吸用保護具は規格具備対象。安衛令第13条第5項の除外は特定の防毒機能のものについてで、防じん機能を有するものは除外されない。厚労省の電動ファン付き呼吸用保護具の規格も防じん機能型を明示し、肢4は対象である。"},
    {"number": 5, "verdict": "incorrect", "reason": "安衛法別表第2第16号と安衛令第13条第5項は、有機ガス用の防毒機能を有する電動ファン付き呼吸用保護具を規格具備対象に含める。厚労省告示の規格にも有機ガス用が列挙されており、肢5は対象である。"},
]
overlay["sources"] = [
    {"title": "厚生労働省・労働安全衛生法第42条・別表第2", "url": act},
    {"title": "厚生労働省・労働安全衛生法施行令第13条第5項", "url": decree},
    {"title": "厚生労働省・労働安全衛生規則第26条", "url": rules},
    {"title": "厚生労働省・防じんマスクの規格第1条", "url": dust_spec},
    {"title": "厚生労働省・電動ファン付き呼吸用保護具の規格", "url": powered_spec},
]
entry["sourceEvidence"] = [
    {"url": act, "excerpt": "厚生労働大臣が定める規格又は安全装置を具備しなければ、譲渡し、貸与し、又は設置してはならない", "choiceNumbers": [1, 2, 3, 4, 5]},
    {"url": decree, "excerpt": "法別表第二第九号に掲げる防毒マスク ハロゲンガス用又は有機ガス用防毒マスクその他厚生労働省令で定めるもの以外の防毒マスク", "choiceNumbers": [1, 2]},
    {"url": rules, "excerpt": "第二十六条　令第十三条第五項の厚生労働省令で定める防毒マスクは、次のとおりとする。 一　一酸化炭素用防毒マスク 二　アンモニア用防毒マスク 三　亜硫酸ガス用防毒マスク", "choiceNumbers": [1, 2]},
    {"url": act, "excerpt": "八　防じんマスク 九　防毒マスク", "choiceNumbers": [2, 3]},
    {"url": decree, "excerpt": "法別表第二第八号に掲げる防じんマスク ろ過材又は面体を有していない防じんマスク", "choiceNumbers": [3]},
    {"url": dust_spec, "excerpt": "使い捨て式防じんマスク 一体となつたろ過材及び面体並びにしめひもからなり", "choiceNumbers": [3]},
    {"url": act, "excerpt": "十六　電動ファン付き呼吸用保護具", "choiceNumbers": [4, 5]},
    {"url": decree, "excerpt": "法別表第二第十六号に掲げる電動ファン付き呼吸用保護具 ハロゲンガス用又は有機ガス用の防毒機能を有する電動ファン付き呼吸用保護具その他厚生労働省令で定めるもの以外の防毒機能を有する電動ファン付き呼吸用保護具", "choiceNumbers": [4, 5]},
    {"url": powered_spec, "excerpt": "防じん機能を有する電動ファン付き呼吸用保護具 粉じん", "choiceNumbers": [4]},
    {"url": powered_spec, "excerpt": "有機ガス用の防毒機能を有する電動ファン付き呼吸用保護具 有機化合物のガス又は蒸気", "choiceNumbers": [5]},
]
entry["reviewIssues"] = []
path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
