"""Build unpublished source-grounded choice-reason drafts for questions 41-60.

Candidate text and tables were compared to official PDF page images; judgments
were checked against the April 2024 MHLW guide. Independent review is pending.
"""

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parent
questions = json.loads((ROOT / "extracted-questions.json").read_text(encoding="utf-8"))
receipt = json.loads((ROOT / "source-receipt.json").read_text(encoding="utf-8"))
GUIDE = receipt["guidelineUrl"]

# (Guide PDF page numbers, a/b/c/d truth values, source-grounded reasons)
REVIEW = {
    41: ([133, 134, 135], "誤誤誤正", [
        "鉄は空腹時によく吸収されるが、胃腸への副作用を軽減するには食後服用が望ましい。",
        "ビタミンCは鉄を吸収されやすい状態に保つため、中止を勧める理由にならない。",
        "鉄製剤で便が黒くなることはあり、それ自体は中止が必要な異常ではない。",
        "食生活改善と鉄製剤2週間程度でも改善しない場合は使用をやめて医療機関を受診する。",
    ]),
    42: ([137, 138, 139, 140], "誤正正誤", [
        "歯状線より上の直腸粘膜にできるのは内痔核。外痔核は歯状線より下。",
        "痔瘻は肛門腺窩に糞便の滓がたまって炎症・化膿する病態。",
        "リドカインは痔に伴う痛み・痒みを緩和する局所麻酔成分。",
        "痔疾用薬には外用薬だけでなく内服薬もある。",
    ]),
    43: ([146, 147, 148], "正誤正誤", [
        "サフランとコウブシは鎮静・鎮痛や月経を促す作用を期待して用いる。",
        "加味逍遙散と桃核承気湯はどちらも構成生薬にカンゾウを含む。",
        "温経湯の体力・手足のほてり・口唇の乾燥等の適応記述は手引きと一致する。",
        "虚弱で冷え症・貧血傾向の説明は当帰芍薬散。桂枝茯苓丸は比較的体力がある人に用いる。",
    ]),
    44: ([151, 152, 153, 155], "正正誤誤", [
        "d-クロルフェニラミンは眠気を起こし得る抗ヒスタミン成分で、運転を避ける。",
        "鼻炎用内服薬を5～6日使っても改善しなければ使用を中止して受診する。",
        "ベラドンナ総アルカロイドは抗コリン成分。『コリン作用』という説明が逆。",
        "抗コリン作用は便秘方向の副作用があり、下痢を起こしやすいとの説明は不適切。",
    ]),
    45: ([156, 157, 158, 159], "誤誤誤誤", [
        "ウイルス・細菌によるかぜの随伴症状は急性鼻炎。アレルギー性鼻炎はアレルゲンへの過敏反応。",
        "ベンザルコニウム塩化物は結核菌には効果がない。",
        "テトラヒドロゾリンは鼻粘膜の血管を収縮させ、充血や腫れを和らげる。",
        "一般用点鼻薬は蓄膿症などの慢性のものを対象としない。",
    ]),
    46: ([159, 160], "正誤誤誤", [
        "添付文書に使用可能とない限りコンタクトレンズを装着したまま点眼しない。",
        "点眼後はまばたきせず、しばらくまぶたを閉じて薬液を行き渡らせる。",
        "容器先端を目尻やまぶたに触れさせると薬液が汚染される。",
        "結膜嚢の容量には限りがあり、数滴入れても効果は増えず副作用の危険がある。",
    ]),
    47: ([161, 162, 163, 164], "正誤正誤", [
        "パンテノールは目の調節機能の回復を促す目的で配合される。",
        "アズレンスルホン酸ナトリウムは眼粘膜の組織修復を促す成分で、血管収縮成分ではない。",
        "イプシロン-アミノカプロン酸は炎症原因物質の生成を抑える。",
        "アスパラギン酸カリウムは目の細胞の代謝を助ける。乾燥防止の成分ではない。",
    ]),
    48: ([165, 166, 167], "誤誤正正", [
        "オキシドールは持続性がなく、組織への浸透性も低い。",
        "傷口用ポビドンヨードと含嗽用では使用濃度が異なる。",
        "ヨウ素はアルカリ性で殺菌力が落ちるため石けん分を洗い落としてから使う。",
        "消毒用エタノールは粘膜や目の周囲を避ける。",
    ]),
    49: ([169, 170, 171, 172], "正正誤誤", [
        "急な打撲・捻挫では冷却が内出血と痛みを抑える。",
        "軽い圧迫と心臓より高い位置への挙上は腫れを抑える。",
        "ノニル酸ワニリルアミドは温感刺激成分。急性の腫れ・熱感には不向き。",
        "フェルビナクは非ステロイド性抗炎症成分。",
    ]),
    50: ([169, 170, 174, 175], "正正正正", [
        "ケトプロフェン使用中と使用後しばらくは紫外線による光線過敏症に注意する。",
        "ピロキシリンは創傷面の保護膜を作る。",
        "イオウはケラチンを変質させる角質軟化成分。",
        "尿素は角質層の水分保持量を高め乾燥を改善する。",
    ]),
    51: ([178, 179], "正正誤誤", [
        "カルプロニウム塩化物の副作用として発汗、寒気、震え、吐きけがあり得る。",
        "カシュウは頭皮の脂質代謝を高め余分な皮脂を除く目的で用いる。",
        "ヒノキチオールは抗菌・抗炎症目的。アセチルコリン様の血管拡張はカルプロニウムの働き。",
        "この成分表に女性ホルモン成分はない。",
    ]),
    52: ([179, 180, 181], "正誤正誤", [
        "歯槽膿漏は歯肉炎が進み歯周組織全体へ炎症が広がったもの。",
        "外用歯痛薬は応急的に痛みを鎮めるが、齲蝕を修復しない。",
        "銅クロロフィリンナトリウムは歯周組織修復と口臭抑制を期待して配合される。",
        "ジブカイン塩酸塩は局所麻酔成分で、細菌増殖を抑える成分ではない。",
    ]),
    53: ([184, 185, 186], "誤誤正正", [
        "咀嚼剤とパッチ製剤の併用はニコチン過剰摂取の危険がある。",
        "口腔内が酸性になるとニコチン吸収は低下する。炭酸飲料後に避ける点だけでは文全体を正とできない。",
        "禁煙補助剤は喫煙を完全にやめた上で使用する。",
        "重い狭心症や不整脈ではニコチンの循環器系への影響から使用を避ける。",
    ]),
    54: ([186, 187, 190], "正正誤誤", [
        "滋養強壮保健薬にはビタミン、カルシウム、アミノ酸、生薬等が配合される。",
        "ゴオウとロクジョウは医薬品での配合に限られる。",
        "適量を超えて摂取しても改善が早まるわけではなく、副作用の危険がある。",
        "アルコールを含む薬用酒は手術・出産直後の滋養強壮には適さない。",
    ]),
    55: ([188, 189, 190], "正誤正誤", [
        "ビタミンB2は脂質代謝と皮膚・粘膜の正常な働きに関与する。",
        "乳酸の分解促進はアスパラギン酸の説明で、アミノエチルスルホン酸ではない。",
        "システインはメラニン生成を抑え、皮膚代謝を促して排出を助ける。",
        "脂質の酸化防止・血流改善はビタミンEの説明。ビタミンB6ではない。",
    ]),
    57: ([193, 194, 195], "正誤誤誤", [
        "漢方は体質と症状に合った『証』に基づく選択が有効性・安全性に重要。",
        "皮膚の色つやが悪い状態は血虚の表現で、水毒ではない。",
        "生薬すべてが食品として流通できるわけではなく、医薬品として扱うものもある。",
        "適用年齢の下限がない処方でも生後3か月未満に使わない。6か月未満という記述は異なる。",
    ]),
    58: ([200, 201, 202], "誤誤正正", [
        "滅菌は全ての微生物を殺滅または除去すること。特定の微生物だけではない。",
        "次亜塩素酸ナトリウムは金属を腐食させるため金属医療器具には不向き。",
        "エタノールはタンパク質変性により一般細菌・結核菌・真菌に作用する。",
        "条件が整えば消毒薬の溶液内でも生存・増殖する微生物がいる。",
    ]),
    59: ([203, 204, 205], "誤誤正正", [
        "日本脳炎・マラリア等の媒介は蚊。ツツガムシはツツガムシ病リケッチアを媒介する。",
        "シラミには宿主特異性があり、犬に寄生するシラミは人に寄生しない。",
        "ゴキブリの燻蒸は卵に効きにくく、約3週間後に再処理する。",
        "トコジラミ刺咬は全身の発熱、睡眠不足、神経性消化不良につながり得る。",
    ]),
    60: ([209, 210, 211, 212, 213], "正誤正誤", [
        "対象物質がないのに非特異反応で陽性になるのは偽陽性。",
        "尿糖は食後2～3時間の尿、尿タンパクは早朝尿を使うのが基本で、文は逆。",
        "妊娠検査薬は尿中のhCGを調べる。",
        "悪性腫瘍や心筋梗塞の診断に関係する検査は一般用検査薬の対象ではない。",
    ]),
}

SINGLE = {
    56: ([195], [
        "黄連解毒湯ではなく、汗をかきやすい水ぶとりの記述は防已黄耆湯。",
        "防已黄耆湯は体力中等度以下で汗をかきやすく、肥満に伴うむくみ・多汗症・水ぶとりに適する。",
        "防風通聖散ではなく、汗をかきやすい水ぶとりの記述は防已黄耆湯。",
        "大柴胡湯ではなく、汗をかきやすい水ぶとりの記述は防已黄耆湯。",
        "清上防風湯ではなく、汗をかきやすい水ぶとりの記述は防已黄耆湯。",
    ]),
}

draft = []
for q in questions[40:60]:
    number = q["number"]
    if number in SINGLE:
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
        pair = number in {42, 44, 51, 59}
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

output = ROOT / "draft-choice-reasons-q41-60.json"
output.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Drafted {len(draft)} question reviews and {sum(len(x['choiceReasons']) for x in draft)} choice reasons; release HOLD")
