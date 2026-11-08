"""Build unpublished source-grounded choice-reason drafts for questions 81-100.

The legal answers are grounded in the April 2024 MHLW examination guide for
the 2024 examination, not a claim about present-day law. Independent review is
still pending.
"""

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parent
questions = json.loads((ROOT / "extracted-questions.json").read_text(encoding="utf-8"))
receipt = json.loads((ROOT / "source-receipt.json").read_text(encoding="utf-8"))
GUIDE = receipt["guidelineUrl"]

# (Guide PDF pages, a/b/c/d truth values, source-grounded reasons)
REVIEW = {
    82: ([215, 216], "誤正正正", [
        "申請先は従事する薬局・店舗の所在地の都道府県知事で、居住地ではない。",
        "試験に合格したことを証する書類を添付する。",
        "申請者が開設者・販売業者でなければ、雇用契約書等の使用関係書類が必要。",
        "登録事項に変更があれば30日以内に登録した知事へ届け出る。",
    ]),
    83: ([217, 218], "誤正正正", [
        "法の医薬品定義は人だけでなく動物の疾病に用いるものも含む。",
        "器具用消毒薬など、人の体に直接使わない医薬品もある。",
        "日本薬局方収載品は法第2条の医薬品の定義に含まれる。",
        "不正表示医薬品を販売目的で陳列することは禁止される。",
    ]),
    84: ([220, 221], "誤誤正正", [
        "要指導医薬品の対面指導は薬剤師が行う。登録販売者は含まれない。",
        "がん・心臓病のような医師の診療を要する疾病の効能は要指導医薬品にも認められない。",
        "配置販売業に要指導医薬品の販売は認められない。",
        "一般用医薬品の効能効果は生活者が自分で判断できる症状として示す。",
    ]),
    85: ([221, 222], "誤正誤正", [
        "毒薬の直接容器等は黒地に白枠・白字で『毒』。赤地ではない。",
        "店舗管理者が薬剤師である場合、店舗販売業者は毒薬・劇薬を開封販売できる。",
        "生物由来製品の原料対象は人その他の生物だが、植物のみ由来は含まれない。",
        "2024年手引き時点で、生物由来製品に指定された一般用医薬品はない。",
    ]),
    86: ([223], "誤正正誤", [
        "第一類は健康被害のおそれがある一般用医薬品すべてではなく、特に注意が必要なもの等。",
        "特別の注意を要する第二類は指定第二類医薬品と呼ぶ。",
        "第三類は第一類・第二類以外の一般用医薬品。",
        "新たな安全性情報で第三類から第一類・第二類への区分変更もあり得る。",
    ]),
    87: ([224], "正正正誤", [
        "製造販売業者の氏名または名称と住所は直接容器等に表示する。",
        "製造番号または製造記号は直接容器等に表示する。",
        "要指導医薬品は『要指導医薬品』の文字を表示する。",
        "指定第二類は枠内に『2』を表示する。枠内に『指定』ではない。",
    ]),
    88: ([225, 226, 227], "正正誤正", [
        "医薬部外品には衛生害虫類の防除に使うものがある。",
        "医薬部外品でも認められた範囲で化粧品的な効能効果を標榜できる。",
        "医薬部外品・化粧品の販売自体に都道府県知事の許可は不要。",
        "化粧品として医薬品的な効能効果を表示・標榜することは認められない。",
    ]),
    89: ([228, 229, 230, 231], "正誤正正", [
        "食品名目でも成分・効能表示等から医薬品に該当すれば無承認無許可医薬品として規制される。",
        "機能性表示食品は事業者責任で届出する制度で、個別許可・承認の制度ではない。",
        "栄養機能食品の機能表示には摂取上の注意事項も適切に表示する。",
        "特別用途食品は乳幼児・妊産婦・病者等に適する旨を用途を限定して表示する。",
    ]),
    90: ([232, 233, 234], "正正誤誤", [
        "開設許可のない場所は、病院等の調剤所を除き『薬局』の名称を使えない。",
        "薬局管理者は原則その薬局以外で薬事実務に従事できず、知事等の許可が例外。",
        "薬局の開設許可で一般用医薬品を扱え、別に店舗販売業許可を重ねる必要はない。",
        "個人の主体的健康保持支援は健康サポート薬局の説明で、地域連携薬局の定義ではない。",
    ]),
    91: ([235, 236], "誤誤正正", [
        "登録販売者は薬剤師不在時間でも第一類医薬品を販売できない。",
        "調剤に応じられない旨は薬局の内側と外側の見やすい場所に掲示する。",
        "不在時間中も管理薬剤師と従事者が連絡できる体制が必要。",
        "薬剤師不在時間は調剤室を閉鎖する。",
    ]),
    92: ([236, 237, 238], "誤正誤誤", [
        "店舗販売業では薬剤師がいても医療用医薬品を販売できない。",
        "第三類医薬品は薬剤師または登録販売者に販売・授与させる。",
        "第一類取扱店舗の管理者には一定条件下で登録販売者が認められる例外がある。",
        "店舗管理者の必要な意見は書面で述べる。口頭ではない。",
    ]),
    93: ([239, 240, 241], "誤正誤正", [
        "配置販売業は医薬品を開封して分割販売できない。",
        "配置販売できるのは経年変化が起こりにくい等の基準に適合する一般用医薬品。",
        "購入者宅に預ける配置箱は法上の陳列に当たる。",
        "配置員等は住所地の知事が発行する身分証明書の交付を受け携帯する。",
    ]),
    94: ([245, 246, 247], "誤誤正正", [
        "第一類の情報提供を省けるのは購入者が説明不要の意思を示し、薬剤師が適正使用可能と判断した場合。",
        "第二類の情報提供は努力義務であり、必ず書面を使う義務ではない。",
        "指定第二類は禁忌確認と専門家への相談を購入者が認識できる措置が必要。",
        "第三類でも求めがなくても情報提供することが望ましい。",
    ]),
    95: ([248, 249, 250, 251], "誤正誤正", [
        "要指導医薬品と第一類医薬品は区分して陳列する。",
        "指定第二類は情報提供設備から離れていても、施錠した陳列設備なら認められる。",
        "第二類と第三類は混在させず区分して陳列する。",
        "一般用医薬品を販売しない時間は通常の陳列・交付場所を閉鎖する。",
    ]),
    96: ([252, 253], "誤正誤正", [
        "特定販売の対象には一般用医薬品と一定の薬局製造販売医薬品があるが、毒薬・劇薬は除く。",
        "インターネット広告のページには薬局・店舗の主要な外観の写真を表示する。",
        "従事者の別・氏名等の表示は必要だが、現在勤務する全員の写真表示までは求めない。",
        "対面または電話の相談希望には、専門家が対面または電話で情報提供する。",
    ]),
    97: ([257, 258], "誤誤正正", [
        "2024年手引きの濫用等のおそれのある指定成分にデキストロメトルファンはない。",
        "同指定成分にカフェインはない。",
        "ブロモバレリル尿素は指定成分。",
        "エフェドリンは指定成分。",
    ]),
    98: ([257, 258], "誤正正誤", [
        "若年者では氏名と年齢を確認する。保護者の同意までは確認事項ではない。",
        "他店での当該品と他の濫用等のおそれのある医薬品の購入状況を確認する。",
        "必要量を超える購入希望では理由を確認する。",
        "購入者の住所は必須確認事項ではない。",
    ]),
    99: ([259, 260, 261], "正誤正正", [
        "虚偽・誇大広告の禁止は依頼主だけでなく広告に関わる全員に及ぶ。",
        "未承認医薬品は名称だけの広告も禁止される。",
        "医薬関係者による推薦広告は、事実であっても原則不適当。",
        "漢方の効能効果に付く『しばり表現』は原則省略して広告できない。",
    ]),
    100: ([263, 264, 265], "正正誤正", [
        "知事等は薬事監視員に取扱場所への立入と帳簿書類の検査を行わせられる。",
        "店舗管理者に違法行為等があれば販売業者に管理者変更を命じられる。",
        "薬剤師・登録販売者以外の従業員も、正当な理由なく質問に答えなければ罰則の対象。",
        "不正表示・不良医薬品等の廃棄・回収などの措置を命じられる。",
    ]),
}

draft = []
for q in questions[80:100]:
    number = q["number"]
    if number == 81:
        expected = {
            "ａ": ("有効性", "法第1条は品質、有効性、安全性の確保を定める。"),
            "ｂ": ("指定薬物", "規制措置の対象は指定薬物。"),
            "ｃ": ("研究開発", "医療上必要性の高い製品の研究開発の促進を定める。"),
        }
        choices = []
        for i, choice in enumerate(q["choices"], 1):
            given = dict(re.findall(r"([ａｂｃ])：([^　]+)", choice))
            assert len(given) == 3, (number, i, given)
            wrong = [label for label in "ａｂｃ" if given[label] != expected[label][0]]
            labels = wrong or list("ａｂｃ")
            choices.append({
                "number": i,
                "correct": not wrong,
                "reason": " ".join(f"{label}は{expected[label][0]}。{expected[label][1]}" for label in labels),
            })
        review = {
            "number": number,
            "guidelinePdfPages": [214],
            "fillReviews": {k: {"correct": v[0], "reason": v[1]} for k, v in expected.items()},
            "choiceReasons": choices,
        }
    else:
        pages, judgments, reasons = REVIEW[number]
        assert len(judgments) == len(reasons) == 4
        statements = {
            label: {"judgment": judgments[i], "reason": reasons[i]}
            for i, label in enumerate("ａｂｃｄ")
        }
        pair = number in {84, 85, 91, 95, 96, 97}
        choices = []
        for i, choice in enumerate(q["choices"], 1):
            if pair:
                selected = set(re.findall(r"[ａｂｃｄ]", choice))
                assert len(selected) == 2, (number, i, choice)
                expected = {k for k, value in statements.items() if value["judgment"] == "正"}
                mismatches = selected.symmetric_difference(expected)
                labels = [k for k in "ａｂｃｄ" if k in (mismatches or expected)]
                correct = selected == expected
            else:
                given = dict(re.findall(r"([ａｂｃｄ])(正|誤)", choice))
                assert len(given) == 4, (number, i, choice)
                mismatches = [k for k in "ａｂｃｄ" if given[k] != statements[k]["judgment"]]
                labels = mismatches or list("ａｂｃｄ")
                correct = not mismatches
            explanation = " ".join(
                f"{k}は{statements[k]['judgment']}。{statements[k]['reason']}"
                for k in labels
            )
            choices.append({"number": i, "correct": correct, "reason": explanation})
        review = {
            "number": number,
            "guidelinePdfPages": pages,
            "statementReviews": statements,
            "choiceReasons": choices,
        }
    assert len(choices) == 5 and sum(x["correct"] for x in choices) == 1, number
    assert choices[q["officialAnswerNumber"] - 1]["correct"], number
    review.update({
        "status": "SOURCE_GROUNDED_DRAFT_INDEPENDENT_REVIEW_PENDING",
        "guidelineUrl": GUIDE,
    })
    draft.append(review)

output = ROOT / "draft-choice-reasons-q81-100.json"
output.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Drafted {len(draft)} question reviews and {sum(len(x['choiceReasons']) for x in draft)} choice reasons; release HOLD")
