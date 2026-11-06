"""Build unpublished, source-grounded choice-reason drafts for questions 21-40.

Judgments were checked against the April 2024 MHLW exam-writing guide and
candidate statements against official PDF page images. Independent review is
still required before publication.
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
    21: ([66, 67], "誤正正正", [
        "かぜ薬は原因ウイルスを除去する薬ではなく、諸症状を緩和する対症療法に用いる。",
        "かぜの原因ウイルスにはライノウイルスやアデノウイルスなどがある。",
        "症状が明確なら、それぞれの症状に合う薬を選ぶのが望ましい。",
        "急激な発熱、4日以上の持続、重篤な症状では他の疾病の可能性を考える。",
    ]),
    22: ([67, 68, 69], "正誤正誤", [
        "メチルエフェドリン塩酸塩はアドレナリン作動成分で鼻粘膜の充血を和らげ、気管支を拡張する。",
        "メキタジンは抗ヒスタミン成分で、解熱成分ではない。",
        "ブロムヘキシン塩酸塩は去痰成分で、痰の切れをよくする。",
        "ノスカピンは鎮咳成分で、炎症による腫れを和らげる成分ではない。",
    ]),
    23: ([67, 68, 69], "正正誤誤", [
        "サリチルアミドとイソプロピルアンチピリンはいずれも解熱鎮痛成分。",
        "エテンザミドは15歳未満の水痘患者で使用を避ける。",
        "クレマスチンフマル酸塩は抗ヒスタミン成分で、アドレナリン作動成分ではない。",
        "グリチルリチン酸二カリウムは抗炎症成分で、抗コリン成分ではない。",
    ]),
    24: ([70, 71], "誤正誤正", [
        "葛根湯は体力中等度以上に用い、体力虚弱な人に用いる処方ではない。",
        "桂枝湯は体力虚弱で汗が出るかぜの初期などに用いる。",
        "小柴胡湯は体力中等度で脇腹からみぞおちが苦しい場合などに用いる。",
        "香蘇散は体力虚弱で神経過敏・気分のすぐれない人のかぜの初期などに用いる。",
    ]),
    25: ([73, 74, 75, 80, 81], "誤正正正", [
        "解熱鎮痛薬は発熱・痛みを緩和する対症療法で、原因疾患や外傷を根治しない。",
        "飲酒は解熱鎮痛薬による胃腸障害を強める可能性がある。",
        "アスピリンには血小板凝集を抑えて血液を凝固しにくくする作用がある。",
        "アスピリン喘息はアスピリンだけでなく他の解熱鎮痛成分でも起こり得る。",
    ]),
    26: ([79, 80], "正誤正誤", [
        "呉茱萸湯の体力・冷え・頭痛に伴う吐きけ等の適応記述は手引きと一致する。",
        "急な筋痙攣・こむらがえりの説明は芍薬甘草湯のもの。釣藤散ではない。",
        "桂枝加朮附湯の冷え・関節痛・神経痛の適応記述は手引きと一致する。",
        "慢性頭痛・めまい・肩こりの説明は釣藤散のもの。芍薬甘草湯ではない。",
    ]),
    27: ([80, 81], "誤正誤正", [
        "1週間以上続く発熱では受診を勧める。服用量を増やす説明は不適切。",
        "年月とともに悪化する月経痛では基礎疾患の可能性があり受診を勧める。",
        "頭痛薬を症状が出る前に予防的に服用することは適切ではない。",
        "解熱鎮痛薬と飲酒は肝障害などの危険を高め得るため避ける。",
    ]),
    28: ([86, 87], "正正正誤", [
        "小児向けの眠気防止薬はない。",
        "かぜ薬の副作用である眠気を眠気防止薬で打ち消す使い方は避ける。",
        "カフェインは腎臓でのナトリウムイオン再吸収を抑える作用がある。",
        "手引きの上限はカフェインとして1回200mg、1日500mgであり、20mg・50mgではない。",
    ]),
    29: ([88, 89], "正誤正誤", [
        "ジフェニドール塩酸塩には前庭神経の調節と内耳血流の改善作用がある。",
        "メクリジン塩酸塩は他の抗ヒスタミン成分より作用が長く持続する。",
        "スコポラミン臭化水素酸塩水和物は中枢の混乱を軽減し、末梢では消化管の緊張を低下させる。",
        "ジプロフィリンはキサンチン系成分で脳を興奮させる。抑制するとの記述は逆。",
    ]),
    31: ([93, 94], "正誤正正", [
        "ジヒドロコデインリン酸塩を含む鎮咳薬は12歳未満に使わないため年齢確認が必要。",
        "成分が母乳に移行するため授乳中の使用を避ける。",
        "長期連用・大量摂取では多幸感や依存性の問題がある。",
        "延髄の咳嗽中枢に働いて咳を抑える。",
    ]),
    32: ([100, 101], "誤誤正誤", [
        "口腔咽喉薬・含嗽薬は局所目的でも全身的影響が生じる場合がある。",
        "使用直後の食事は薬液を流して殺菌消毒効果を弱め得る。",
        "医薬部外品として製造販売される製品もある。",
        "噴射式液剤は軽く息を吐きながら使う。吸いながら噴射する説明は不適切。",
    ]),
    34: ([106, 107, 108, 109], "誤誤誤誤", [
        "ジメチコンは消泡成分で、制酸成分ではない。",
        "ピレンゼピン塩酸塩は胃液分泌を抑える成分で、消化成分ではない。",
        "タカヂアスターゼは消化酵素成分で、健胃成分ではない。",
        "メタケイ酸アルミン酸マグネシウムは制酸成分で、胃液分泌抑制成分ではない。",
    ]),
    35: ([113, 114, 115], "正正正正", [
        "ベルベリン塩化物は細菌感染による下痢を鎮める目的の成分。",
        "天然ケイ酸アルミニウムは腸内の有害物質を吸着する。",
        "タンニン酸アルブミンは収斂作用で腸粘膜を保護する。",
        "ロペラミド塩酸塩は食べ過ぎ・飲み過ぎや寝冷えによる下痢に用い、食あたり・水あたりは対象外。",
    ]),
    36: ([110, 119], "誤誤正正", [
        "体力虚弱で手足が冷えやすい人の胃腸虚弱等は六君子湯の説明で、麻子仁丸ではない。",
        "下腹部痛・月経不順等は大黄牡丹皮湯の説明で、六君子湯ではない。",
        "大黄甘草湯は体力に関わらず便秘や便秘に伴う諸症状に用いる。",
        "安中散の胃痛・腹痛、胸やけ等の適応記述は手引きと一致する。",
    ]),
    37: ([116, 117, 120, 124, 125], "正正誤誤", [
        "瀉下薬の重複使用は作用の増強などにつながるため避ける説明が適切。",
        "センノシド等は母乳に移行して乳児に下痢を起こし得るため授乳を避ける説明が適切。",
        "ビサコジル内服薬は数時間後に効果が出るため、起床時ではなく就寝前の服用が基本。",
        "グリセリン浣腸を繰り返し使うと効果が弱まることがあり、強くなるとはいえない。",
    ]),
    38: ([121, 122, 123, 124], "正誤正正", [
        "下痢を伴う腹痛は下痢への対処を優先し、通常は鎮痛鎮痙薬の適用ではない。",
        "チキジウム臭化物には抗コリン作用による胃液分泌抑制作用がある。",
        "ブチルスコポラミン臭化物はアセチルコリンの受容体への結合を妨げる。",
        "オキセサゼインには局所麻酔作用と胃液分泌抑制作用がある。",
    ]),
    39: ([128, 129], "正正正誤", [
        "ゴオウは強心作用に加えて末梢血管拡張・血圧降下や鎮静作用がある。",
        "ユウタンは苦味による健胃作用を期待し、消化補助成分にも用いる。",
        "センソを含む固形製剤を噛み砕くと舌などが麻痺することがある。",
        "シンジュは鎮静作用を期待する成分。中枢神経刺激による気つけはリュウノウの説明。",
    ]),
    40: ([131, 132], "誤誤誤誤", [
        "コレステロールエステル形成に用いるリノール酸等は、この成分表にない。",
        "パンテチンはHDL増加やLDL異化排泄の促進に関与する。HDL排泄・LDL産生増加ではない。",
        "尿を黄色くするリボフラビン（ビタミンB2）は、この成分表にない。",
        "高コレステロール改善薬は痩身効果や腹囲減少を目的とする薬ではない。",
    ]),
}

SINGLE = {
    30: ([92], [
        "柴胡加竜骨牡蛎湯の適応ではなく、小児虚弱体質・夜尿症等を含む記述は小建中湯。",
        "桂枝加芍薬湯の適応ではなく、小児虚弱体質・夜尿症等を含む記述は小建中湯。",
        "小建中湯の体力虚弱、疲労、腹痛、小児夜尿症等の適応記述と一致する。",
        "抑肝散の適応ではなく、小児虚弱体質・夜尿症等を含む記述は小建中湯。",
        "白虎加人参湯の適応ではなく、小児虚弱体質・夜尿症等を含む記述は小建中湯。",
    ]),
    33: ([99], [
        "駆風解毒湯ではなく、痰が切れにくい乾いた咳の記述は麦門冬湯。",
        "麦門冬湯は痰が切れにくい咳・咽頭乾燥に用い、水様痰が多い人には不向き。",
        "響声破笛丸ではなく、痰が切れにくい乾いた咳の記述は麦門冬湯。",
        "桔梗湯ではなく、痰が切れにくい乾いた咳の記述は麦門冬湯。",
        "白虎加人参湯ではなく、痰が切れにくい乾いた咳の記述は麦門冬湯。",
    ]),
}

draft = []
for q in questions[20:40]:
    number = q["number"]
    if number in SINGLE:
        pages, reasons = SINGLE[number]
        correct = q["officialAnswerNumber"]
        choices = [
            {"number": i, "correct": i == correct, "reason": reason}
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
        pair = number in {22, 24, 27, 37}
        target = "誤" if number == 37 else "正"
        choices = []
        for i, choice in enumerate(q["choices"], 1):
            if pair:
                selected = set(re.findall(r"[ａｂｃｄ]", choice))
                assert len(selected) == 2, (number, i, choice)
                expected = {k for k, value in statements.items() if value["judgment"] == target}
                mismatches = selected.symmetric_difference(expected)
                labels = [k for k in "ａｂｃｄ" if k in (mismatches or expected)]
                explanation = " ".join(
                    f"{k}は{statements[k]['judgment']}。{statements[k]['reason']}"
                    for k in labels
                )
                correct = selected == expected
            else:
                given = dict(re.findall(r"([ａｂｃｄ])(正|誤)", choice))
                assert len(given) == 4, (number, i, choice)
                mismatches = [k for k in "ａｂｃｄ" if given[k] != statements[k]["judgment"]]
                labels = mismatches or list("ａｂｃｄ")
                explanation = " ".join(
                    f"{k}は{statements[k]['judgment']}。{statements[k]['reason']}"
                    for k in labels
                )
                correct = not mismatches
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

output = ROOT / "draft-choice-reasons-q21-40.json"
output.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Drafted {len(draft)} question reviews and {sum(len(x['choiceReasons']) for x in draft)} choice reasons; release HOLD")
