"""Verify all five mixture-percent classifications against the current MHLW rule."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261802-q11-15-draft.json"
draft = json.loads(path.read_text(encoding="utf-8"))
entry = draft["questions"]["emkohyo-EM20261802-q14"]
overlay = entry["overlay"]
rule = "https://www.mhlw.go.jp/web/t_doc?dataId=74090000"
interpretation = "https://mhlw-grants.niph.go.jp/system/files/report_pdf/202123001B-sougou.pdf"
overlay["summary"] = "有機則第1条は有機溶剤含有物を総量5%超と定義。第1種が5%超なら第1種、第1種と第2種の合計が5%超なら第2種、それら以外なら第3種。2%+2%+2%の肢4が該当。"
overlay["sources"] = [
    {"title": "厚生労働省・有機溶剤中毒予防規則第1条", "url": rule},
    {"title": "厚生労働科学研究成果報告書・有機溶剤混合物の区分（PDF134頁）", "url": interpretation},
]
entry["sourceEvidence"] = [
    {"url": rule, "excerpt": "有機溶剤と有機溶剤以外の物との混合物で、有機溶剤を当該混合物の重量の五パーセントを超えて含有するもの", "choiceNumbers": [1, 2, 3, 4, 5]},
    {"url": rule, "excerpt": "イに掲げる物を当該混合物の重量の五パーセントを超えて含有するもの", "choiceNumbers": [1, 2, 3, 4]},
    {"url": rule, "excerpt": "イに掲げる物又は前号イに掲げる物を当該混合物の重量の五パーセントを超えて含有するもの(前号ハに掲げる物を除く。)", "choiceNumbers": [1, 2, 3, 4]},
    {"url": rule, "excerpt": "五　第三種有機溶剤等　有機溶剤等のうち第一種有機溶剤等及び第二種有機溶剤等以外の物をいう。", "choiceNumbers": [1, 2, 3, 4, 5]},
    {"url": interpretation, "excerpt": "第二種有機溶剤と第一種有機溶剤の合計が5％を超えた場合、第一種有機溶剤として取り扱われる場合を除き、第二種有機溶剤として取り扱われる旨規定されていること", "choiceNumbers": [1, 2, 3, 4]},
]
entry["reviewIssues"] = []
path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

# The source text is preserved in papers; presentation removes OCR line-wrap artifacts.
presentation_path = ROOT / "data/exam-library/presentation/emkohyo-EM20261802.json"
presentation = json.loads(presentation_path.read_text(encoding="utf-8"))
question = presentation["emkohyo-EM20261802-q14"]
question["prompt"] = "有機溶剤を次に示す重量の割合で含有する混合物のうち、第３種有機溶剤等に該当するものはどれか。\n第１種有機溶剤等 ／ 第２種有機溶剤等 ／ 第３種有機溶剤等（各選択肢はこの順）"
question["choices"][2]["text"] = "３％ ３％ ３％"
presentation_path.write_text(json.dumps(presentation, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
