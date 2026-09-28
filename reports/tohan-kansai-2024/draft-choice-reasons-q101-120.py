"""Build unpublished source-grounded choice-reason drafts for questions 101-120.

Question text and tables were compared with official PDF page images; reasons
refer to the April 2024 MHLW examination guide. Independent review is pending.
"""

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parent
questions = json.loads((ROOT / "extracted-questions.json").read_text(encoding="utf-8"))
receipt = json.loads((ROOT / "source-receipt.json").read_text(encoding="utf-8"))
GUIDE = receipt["guidelineUrl"]

# (Guide PDF pages, a/b/c/d judgments, source-grounded reasons)
REVIEW = {
    101: ([372, 373, 380], "誤誤正正", [
        "添付文書は新知見等に応じて改訂されるが、年1回の定期改訂義務ではない。",
        "必要時に読めるよう添付文書を保管する。開封時に一度読むだけでは足りない。",
        "受診時に添付文書を持参し、医師・薬剤師に使用薬を示して相談する。",
        "製造販売業者に加え、販売委託先の名称・所在地が記載される場合がある。",
    ]),
    102: ([374, 375, 376, 377, 378], "正正正正", [
        "一般用検査薬の陽性は確定診断ではないため医師の診断を受ける。",
        "乳汁へ移行して乳児に影響し得る成分は、服用または授乳を避ける注意を要する。",
        "飲酒により作用・副作用が増強し得る場合は服用前後の飲酒を避ける。",
        "連用で効力低下や依存的使用を招き得る場合は長期連用を避ける。",
    ]),
    103: ([376, 377], "誤誤正正", [
        "『高齢者』の目安は65歳以上。75歳以上ではない。",
        "他の医薬品でのアレルギー歴も相談対象となる。",
        "治療中か否かにかかわらず悪化・副作用が懸念される基礎疾患を示す。",
        "軽率な使用で悪化する症状や受診が適切な状態を示す。",
    ]),
    104: ([379, 380, 381], "誤誤誤正", [
        "シロップ剤は開封後、適切な製品指示に従い冷所保管する。室温保管が一律に適切ではない。",
        "エアゾールの高圧ガスに関する注意は添付文書だけでなく容器にも表示する。",
        "点眼薬は共用しない。容器先端の接触等で汚染の恐れがある。",
        "散剤は冷蔵庫からの取り出し時に結露・吸湿し得るため冷蔵保管を避ける。",
    ]),
    105: ([382, 383], "正誤正誤", [
        "緊急安全性情報は行政の命令・指示や製造販売業者の自主決定等で作成される。",
        "緊急安全性情報は黄色地（イエローレター）。青色地は安全性速報。",
        "医薬品・再生医療等製品に加え医療機器も対象。",
        "間質性肺炎で発出された漢方例は小柴胡湯で、葛根湯ではない。",
    ]),
    106: ([383, 384], "正誤正正", [
        "購入者の疑問の多くは添付文書情報が相談対応の手掛かりになる。",
        "改訂前の添付文書や外箱を持つ製品も流通し得るため、最新情報を確認する。",
        "生活者の情報ニーズは多様化・高度化している。",
        "専門家には科学的根拠に沿う助言とセルフメディケーション支援が期待される。",
    ]),
    107: ([385, 386], "正誤誤正", [
        "サリドマイド薬害を契機にWHO国際医薬品モニタリング制度が確立された。",
        "医薬品副作用モニター制度は都道府県が直接受理した制度ではない。",
        "副作用等の報告先は厚生労働大臣で、実務上の報告先を保健所とする記述は誤り。",
        "健康危機管理では科学的評価、広い情報収集・分析、方針見直しと迅速な公表を基本とする。",
    ]),
    108: ([386, 387, 388], "誤正正正", [
        "製造販売業者等の副作用等報告先は厚生労働大臣。都道府県知事ではない。",
        "登録販売者も企業の副作用等の情報収集への協力に努める。",
        "医療用成分を初めて一般用に配合した場合は承認後の安全性調査・報告を要する。",
        "市販後も品質・有効性・安全性情報を収集する企業責任がある。",
    ]),
    109: ([389, 390], "正正誤正", [
        "適正使用でも生じた重い副作用被害を迅速に救済する制度。",
        "医学薬学的事項は審議会の諮問・答申を経た大臣判定に基づく。",
        "医療機関での治療を要しない軽度被害は給付対象外。",
        "被害を受けた本人または家族が給付請求できる。",
    ]),
    110: ([390, 391], "正誤誤正", [
        "漢方処方製剤は救済制度の対象になり得る。",
        "日本薬局方ワセリンは対象除外医薬品。",
        "一般用検査薬は対象除外医薬品。",
        "人体に直接使う殺菌消毒剤は対象になり得る。",
    ]),
    111: ([391], "正正誤誤", [
        "製品不良等で企業に賠償責任がある救済制度対象外の相談先となる。",
        "医薬品・医薬部外品の苦情で企業との交渉の仲介・調整等を行う。",
        "医薬品PLセンターは医療機器の紛争処理を対象としない。",
        "センターは各都道府県に開設されたわけではない。",
    ]),
    113: ([393], "正正誤誤", [
        "登録販売者には医薬品適正使用の啓発への参加・協力が期待される。",
        "『ダメ。ゼッタイ。』普及運動は毎年6月20日～7月19日の1か月。",
        "薬物乱用防止の啓発は小中学生にも重要。高校生以上に限らない。",
        "一般用医薬品でも乱用や依存は起こり得る。",
    ]),
    114: ([396, 401, 402], "正正正正", [
        "ジフェンヒドラミンは眠気を生じ得るため服用後の運転を避ける。",
        "ジフェンヒドラミンは乳汁に移行し得るため服用または授乳を避ける。",
        "抗ヒスタミン成分の抗コリン作用で排尿困難を悪化させ得る。",
        "ジプロフィリンの中枢刺激作用はてんかんを悪化させ得るため相談対象。",
    ]),
    115: ([395], "誤誤誤正", [
        "オキセサゼインは牛乳由来カゼインによるアレルギー注意の対象ではない。",
        "次没食子酸ビスマスは牛乳由来カゼインによるアレルギー注意の対象ではない。",
        "ケイ酸アルミン酸マグネシウムは牛乳由来カゼインによるアレルギー注意の対象ではない。",
        "タンニン酸アルブミンは乳製カゼイン由来で牛乳アレルギー歴を禁忌に含む。",
    ]),
    116: ([395, 396, 401, 402, 403], "正誤正誤", [
        "芍薬甘草湯は心臓病で禁忌となる対象に含まれる。",
        "アセトアミノフェンは糖尿病の診断を受けた人を禁忌にする成分ではない。",
        "プソイドエフェドリン塩酸塩は高血圧で禁忌の対象。",
        "メチルエフェドリン塩酸塩は肝臓病で禁忌とする組合せではない。",
    ]),
    117: ([395, 396, 397, 398], "正正正誤", [
        "アスピリンは妊婦・妊娠可能性のある人に禁忌を表示する。",
        "ヒマシ油類は子宮収縮等の危険から妊婦に禁忌。",
        "エチニルエストラジオールは妊婦に禁忌。",
        "グリチルリチン酸二カリウムはこの妊婦禁忌の対象ではない。",
    ]),
    119: ([402, 403], "正誤正誤", [
        "フェニレフリンは糖尿病の診断を受けた人の相談対象。",
        "肝臓病はこの成分による指定相談対象ではない。",
        "交感神経刺激作用により甲状腺機能障害は相談対象。",
        "胃・十二指腸潰瘍はこの成分による指定相談対象ではない。",
    ]),
    120: ([401, 402, 403], "誤正誤正", [
        "ロートエキスは抗コリン作用で便秘方向に働き、下痢をこの相談対象にしない。",
        "抗コリン作用で排尿困難を悪化させ得るため相談対象。",
        "糖尿病はロートエキスによる指定相談対象ではない。",
        "心臓病はロートエキスによる指定相談対象。",
    ]),
}

FILL = {
    112: ([392, 393], {
        "ａ": ("脳出血", "PPA含有一般用医薬品で脳出血等が報告された。"),
        "ｂ": ("高血圧症", "禁忌に当たる高血圧症患者の使用例があった。"),
        "ｃ": ("プソイドエフェドリン塩酸塩", "代替成分としてプソイドエフェドリン塩酸塩等への切替えが指示された。"),
    }),
}

SINGLE = {
    118: ([396], [
        "アルジオキサは目のかすみ・異常なまぶしさによる運転禁止の対象ではない。",
        "イブプロフェンはこの視覚症状による運転禁止の対象ではない。",
        "ピレンゼピン塩酸塩水和物は抗コリン作用で目のかすみ・異常なまぶしさを生じ得る。",
        "ピリドキシン塩酸塩はこの視覚症状による運転禁止の対象ではない。",
        "メチルエフェドリン塩酸塩はこの視覚症状による運転禁止の対象ではない。",
    ]),
}

draft = []
for q in questions[100:120]:
    number = q["number"]
    if number in FILL:
        pages, expected = FILL[number]
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
            "guidelinePdfPages": pages,
            "fillReviews": {k: {"correct": v[0], "reason": v[1]} for k, v in expected.items()},
            "choiceReasons": choices,
        }
    elif number in SINGLE:
        pages, reasons = SINGLE[number]
        choices = [
            {"number": i, "correct": i == q["officialAnswerNumber"], "reason": reason}
            for i, reason in enumerate(reasons, 1)
        ]
        review = {"number": number, "guidelinePdfPages": pages, "choiceReasons": choices}
    else:
        pages, judgments, reasons = REVIEW[number]
        assert len(judgments) == len(reasons) == 4
        statements = {
            label: {"judgment": judgments[i], "reason": reasons[i]}
            for i, label in enumerate("ａｂｃｄ")
        }
        pair = number in {101, 103, 110, 111, 119}
        target = "誤" if number == 110 else "正"
        choices = []
        for i, choice in enumerate(q["choices"], 1):
            if pair:
                selected = set(re.findall(r"[ａｂｃｄ]", choice))
                assert len(selected) == 2, (number, i, choice)
                expected = {k for k, value in statements.items() if value["judgment"] == target}
                mismatches = selected.symmetric_difference(expected)
                labels = [k for k in "ａｂｃｄ" if k in (mismatches or expected)]
                correct = selected == expected
            else:
                given = dict(re.findall(r"([ａｂｃｄ])(正|誤)", choice))
                assert len(given) == 4, (number, i, choice)
                mismatches = [k for k in "ａｂｃｄ" if given[k] != statements[k]["judgment"]]
                labels = mismatches or list("ａｂｃｄ")
                correct = not mismatches
            # 問110は「制度の対象外」を選ぶ問題。正誤ラベルだけでは
            # 「対象外が誤り」と読めるため、対象の内外を明示する。
            explanation = " ".join(
                f"{k}は{'対象外' if statements[k]['judgment'] == '誤' else '対象になり得る'}。{statements[k]['reason']}"
                if number == 110 else
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

output = ROOT / "draft-choice-reasons-q101-120.json"
output.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Drafted {len(draft)} question reviews and {sum(len(x['choiceReasons']) for x in draft)} choice reasons; release HOLD")
