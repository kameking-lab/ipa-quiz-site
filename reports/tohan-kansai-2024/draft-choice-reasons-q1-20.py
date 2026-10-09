"""Build unpublished, source-grounded choice explanations for questions 1-20.

The statement judgments below were checked against the April 2024 MHLW
exam-writing guide. Output remains a draft until independent review.
"""

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parent
questions = json.loads((ROOT / "extracted-questions.json").read_text(encoding="utf-8"))
receipt = json.loads((ROOT / "source-receipt.json").read_text(encoding="utf-8"))
GUIDE = receipt["guidelineUrl"]

# (PDF page numbers, a/b/c/d truth values, short source-grounded reasons)
REVIEW = {
    1: ([10, 11], "誤正誤誤", [
        "殺虫剤など、人体に使わない医薬品でも曝露によって健康を害し得る。",
        "人体への作用は複雑で、有益な薬効以外に副作用も生じ得る。",
        "医薬品は生命関連製品だが、使用には保健衛生上のリスクを伴う。",
        "異物混入・変質品の販売禁止は、健康被害の可能性の有無を問わない。",
    ]),
    2: ([11], "誤正正誤", [
        "少量でも長期投与で慢性的な毒性が発現する場合がある。",
        "治療量上限を超えると中毒量、最小致死量、致死量へと至る。",
        "効果とリスクは用量と作用強度の関係で評価する。",
        "LD50は動物実験の50％致死量であり、最小致死量ではない。",
    ]),
    3: ([11, 12], "正誤正誤", [
        "非臨床試験のGLPと毒性試験法ガイドラインに沿う各種試験を行う。",
        "ヒトの臨床試験基準はGCPで、GVPは製造販売後安全管理の基準。",
        "製造販売後の調査・試験の実施基準はGPSP。",
        "医薬品には食品よりはるかに厳しい安全性基準が求められる。",
    ]),
    4: ([12], "正正誤正", [
        "いわゆる健康食品は食品であり、医薬品とは法律上区別される。",
        "錠剤やカプセル状の健康食品もあり、誤使用による健康被害例がある。",
        "届出制で国の個別許可を受けない説明は機能性表示食品のもの。特定保健用食品は個別審査・許可を受ける。",
        "栄養機能食品は国の規格基準に適合すれば栄養成分の機能を表示できる。",
    ]),
    5: ([13, 14, 15], "正正誤誤", [
        "WHOの副作用定義は通常用量で生じる有害かつ意図しない反応。",
        "一つの疾病への薬効が別の疾病の症状を悪化させる場合がある。",
        "適正使用でも副作用を完全に防げるわけではない。",
        "副作用には明確な自覚症状のない内臓機能への影響もある。継続使用なら異常を感じなくても受診を促すことが重要。",
    ]),
    6: ([14], "正正誤誤", [
        "通常の炎症・痛み・発熱は有害物を排除する免疫過程となる。",
        "アレルギーは医薬品の薬理作用と無関係にも起こり得る。",
        "過去にアレルギーがなくても抵抗力の低下時には起こり得る。",
        "カゼインはアレルゲンとなり得る添加物として手引きに列挙される。",
    ]),
    7: ([16, 17], "正正誤正", [
        "症状を改善しないまま漫然と使い続けると副作用の危険が増す。",
        "指示量でも長期連用は精神的依存につながる場合がある。",
        "青少年の危険性理解は必ずしも十分でなく、興味本位の乱用もある。",
        "大量・頻回購入には積極的な事情確認など慎重な対応が望まれる。",
    ]),
    8: ([17], "誤誤誤正", [
        "相互作用は作用部位だけでなく、吸収・分布・代謝・排泄の過程でも生じる。",
        "併用によって作用は増強も減弱もする。",
        "かぜ薬と解熱鎮痛薬は成分・作用が重複しやすく、通常は併用を避ける。",
        "複数疾病で医薬品を併用する人は相互作用に特に注意する。",
    ]),
    9: ([18], "正誤誤誤", [
        "食品と飲み薬の体内での相互作用は『飲み合わせ』として主に想定される。",
        "習慣的飲酒によってアセトアミノフェンの代謝が速まり、薬効が不足する場合がある。",
        "総合感冒薬とコーヒーのカフェイン重複は過剰摂取につながり得る。",
        "外用薬や注射薬も食品で作用や代謝が影響を受ける場合がある。",
    ]),
    10: ([19], "誤正誤正", [
        "乳児向け用量があっても乳児の状態は急変しやすく、医師の診療を優先する。",
        "錠剤などが喉につかえる体験は乳幼児の服薬拒否につながり得る。",
        "手引きの小児の目安は7歳以上15歳未満で、5歳以上ではない。",
        "小児は血液脳関門が未発達で、医薬品成分が脳に達しやすい。",
    ]),
    11: ([20], "誤正正正", [
        "高齢者の体力・生理機能の衰えには個人差が大きい。",
        "取り違えや飲み忘れに備え、家族・介護関係者の協力が重要な場合がある。",
        "説明の理解や表示の読取りが難しい場合があり、情報提供には配慮が必要。",
        "副作用の口渇は誤嚥を誘発し得る。",
    ]),
    12: ([20, 21], "誤誤正正", [
        "母体と胎児の血液は血液-胎盤関門により混ざらず、成分移行の程度は未解明なことも多い。",
        "妊娠の有無にはプライバシー配慮が必要だが、使用者の状況把握も重要。聞取り不要とはいえない。",
        "妊婦では一般用医薬品による対処自体が適切か慎重に考える。",
        "妊婦への安全性評価は難しく、『相談すること』とする医薬品が多い。",
    ]),
    13: ([21, 22], "誤誤正正", [
        "慢性疾患でも一般用医薬品が症状を悪化させたり治療を妨げたりする。",
        "処方薬との併用可否は登録販売者には判断困難なことが多く、処方医・薬剤師への相談が必要。",
        "疾患の程度と医薬品の種類に応じ、問題があれば使用を避けられる情報提供が重要。",
        "治療中でなくても、特定症状を悪化させる配合成分がある。",
    ]),
    14: ([22, 23], "正正誤誤", [
        "購入直後に使うとは限らず、使用期限まで余裕をもって販売する。",
        "医薬品には高い水準で均一な品質が必要。",
        "表示使用期限は未開封で適切に保管した場合の期限。",
        "適切に保管しても経時劣化を避けることはできない。",
    ]),
    15: ([23, 24], "正誤正正", [
        "一般用医薬品は軽い疾病の初期段階などで自ら選択し、治療・予防・QOL改善に使う。",
        "生活習慣病の『治療』は一般用医薬品の役割ではなく、役割は症状発現の予防など。",
        "一般用医薬品にもドーピング対象成分があり、薬剤師等への確認が必要。",
        "乳幼児や妊婦では一般用医薬品で対処できる範囲が成人より狭い場合がある。",
    ]),
    16: ([24, 25], "誤正誤正", [
        "登録販売者が担うのは第二類・第三類医薬品の販売等で、全ての一般用医薬品ではない。",
        "購入者が自ら適切に選び使えるよう働きかけることが重要。",
        "購入者の情報受容意識が乏しくても、状況把握と情報提供のために対話を図る。",
        "販売量を必要量にするなど、継続的な対話機会を確保する配慮が重要。",
    ]),
    17: ([26, 27], "誤誤正誤", [
        "サリドマイド製剤は催眠鎮静剤等として販売されたのであり、解熱鎮痛薬ではない。",
        "R体とS体は体内で相互転換するため、R体のみを製剤化しても催奇形性を避けられない。",
        "サリドマイドは血液-胎盤関門を通過し胎児へ移行する。",
        "日本での販売停止・回収は1962年で、西ドイツの警告が出た1961年中ではない。",
    ]),
    18: ([27, 28], "誤誤正正", [
        "原因となったのはHIV混入原料からの血液凝固因子製剤で、免疫グロブリン製剤ではない。",
        "サリドマイド・スモン訴訟はHIV訴訟より前に起きていた。",
        "和解を踏まえた薬事法改正で製薬企業に感染症報告が義務づけられた。",
        "血液製剤の安全確保のため検査と献血時問診が充実した。",
    ]),
    19: ([28, 29], "正正正誤", [
        "ヒト乾燥硬膜を介したCJD感染をめぐる損害賠償訴訟である。",
        "和解は生物由来製品の感染等被害救済制度創設の契機となった。",
        "CJDは認知症様症状を経て死に至る重篤な神経難病。",
        "プリオンは脂質ではなくタンパク質の一種。",
    ]),
}

draft = []
for q in questions[:20]:
    if q["number"] == 20:
        expected = {
            "ａ": ("フィブリノゲン製剤", "問題の対象は特定のフィブリノゲン製剤と血液凝固第IX因子製剤。"),
            "ｂ": ("国及び製薬企業", "訴訟の被告は国と製薬企業。"),
            "ｃ": ("議員立法", "早期・一律救済のため議員立法で2008年1月に特別措置法が成立。"),
        }
        choices = []
        for i, choice in enumerate(q["choices"], 1):
            given = dict(re.findall(r"([ａｂｃ])：([^　]+)", choice))
            assert len(given) == 3, (q["number"], i, given)
            wrong = [label for label in "ａｂｃ" if given[label] != expected[label][0]]
            labels = wrong or list("ａｂｃ")
            choices.append({
                "number": i,
                "correct": not wrong,
                "reason": " ".join(f"{label}は{expected[label][0]}。{expected[label][1]}" for label in labels),
            })
        assert sum(x["correct"] for x in choices) == 1
        assert choices[q["officialAnswerNumber"] - 1]["correct"]
        draft.append({
            "number": 20,
            "status": "SOURCE_GROUNDED_DRAFT_INDEPENDENT_REVIEW_PENDING",
            "guidelineUrl": GUIDE,
            "guidelinePdfPages": [29],
            "fillReviews": {k: {"correct": v[0], "reason": v[1]} for k, v in expected.items()},
            "choiceReasons": choices,
        })
        continue
    pages, judgments, reasons = REVIEW[q["number"]]
    assert len(judgments) == len(reasons) == 4
    statements = {
        label: {"judgment": judgments[i], "reason": reasons[i]}
        for i, label in enumerate("ａｂｃｄ")
    }
    choices = []
    for i, choice in enumerate(q["choices"], 1):
        given = dict(re.findall(r"([ａｂｃｄ])(正|誤)", choice))
        assert len(given) == 4, (q["number"], i)
        mismatches = [label for label in "ａｂｃｄ" if given[label] != statements[label]["judgment"]]
        if mismatches:
            explanation = " ".join(
                f"{label}は{statements[label]['judgment']}。{statements[label]['reason']}"
                for label in mismatches
            )
        else:
            explanation = "全記述の正誤が一致する。" + " ".join(
                f"{label}は{statements[label]['judgment']}。{statements[label]['reason']}"
                for label in "ａｂｃｄ"
            )
        choices.append({"number": i, "correct": not mismatches, "reason": explanation})
    assert sum(item["correct"] for item in choices) == 1
    assert choices[q["officialAnswerNumber"] - 1]["correct"]
    draft.append({
        "number": q["number"],
        "status": "SOURCE_GROUNDED_DRAFT_INDEPENDENT_REVIEW_PENDING",
        "guidelineUrl": GUIDE,
        "guidelinePdfPages": pages,
        "statementReviews": statements,
        "choiceReasons": choices,
    })

output = ROOT / "draft-choice-reasons-q1-20.json"
output.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Drafted {len(draft)} question reviews and {sum(len(x['choiceReasons']) for x in draft)} choice reasons; release HOLD")
