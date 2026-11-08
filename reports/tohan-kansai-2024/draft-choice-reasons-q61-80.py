"""Build unpublished source-grounded choice-reason drafts for questions 61-80.

Candidate questions were compared with official PDF page images, and statement
judgments with the April 2024 MHLW guide. Independent review is still pending.
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
    61: ([31, 32, 33], "誤正正誤", [
        "唾液のアミラーゼはデンプンをデキストリンや麦芽糖などに分解し、アミノ酸にはしない。",
        "胃酸でペプシノーゲンがペプシンとなり、タンパク質を半消化する。",
        "膵液のトリプシノーゲンはトリプシンとなり、半消化タンパク質をさらに分解する。",
        "脂質を分解するのは膵液のリパーゼ。エレプシンはタンパク質由来のペプチドを分解する。",
    ]),
    62: ([34, 35], "正正誤誤", [
        "咽頭は鼻腔・口腔の奥にあり、食物と空気の両方の通路。",
        "喉頭は咽頭と気管の間にあり、喉頭隆起が『のどぼとけ』。",
        "食道は食物の通路だが、消化液を分泌しない。",
        "嚥下時は喉頭蓋が閉じ、飲食物が気管に入るのを防ぐ。",
    ]),
    63: ([34, 35, 36], "正誤正正", [
        "喉頭は鼻腔・咽頭とともに上気道に含まれる。",
        "鼻汁は通常時も分泌され、かぜ・アレルギー時だけではない。",
        "気管支の末端にはブドウの房状の肺胞がある。",
        "肺胞壁は薄く、毛細血管が取り囲みガス交換を行う。",
    ]),
    64: ([38, 39], "誤正誤正", [
        "左心房・左心室は肺から戻った血液を全身へ送る。全身から肺へは右心系。",
        "心臓は心筋でできた握りこぶし大の袋状臓器で胸骨の後ろにある。",
        "心臓から出る血液を運ぶのは動脈。静脈ではない。",
        "四肢の静脈弁は血液の逆流を防ぐ。",
    ]),
    65: ([40, 41], "正正誤正", [
        "ネフロンは腎小体と尿細管からなる腎臓の機能単位。",
        "腎臓は老廃物除去と水・電解質の排出調節を担う。",
        "腎臓のエリスロポエチンは赤血球産生を促す。血小板産生ではない。",
        "ビタミンDは腎臓で活性型に変わり、骨の形成・維持に働く。",
    ]),
    66: ([42, 43], "正誤正誤", [
        "涙液のリゾチームや免疫グロブリンは角膜・結膜の感染を防ぐ。",
        "遠方を見ると水晶体は扁平に、近くを見ると厚くなる。記述は逆。",
        "結膜充血では白目だけでなくまぶたの裏側も赤くなる。",
        "眼精疲労は頭痛など全身症状を伴い得る。単なる生理的な目の疲れではない。",
    ]),
    67: ([43, 44], "正正正誤", [
        "嗅細胞がにおい物質の刺激を受け、嗅覚中枢へ伝える。",
        "鼻腔と副鼻腔の狭い連絡路は粘膜腫脹で塞がり、副鼻腔炎に至り得る。",
        "副鼻腔の異物は粘液に捕捉され、線毛で鼻腔へ排出される。",
        "耳小骨は鼓膜の振動を内耳へ伝える。『中耳へ伝える』という終点が誤り。",
    ]),
    68: ([44, 45], "正誤正誤", [
        "外皮系は皮膚、皮膚腺、角質等を含む。",
        "毛髪の色もメラニン色素の量に左右される。",
        "皮膚常在微生物は病原菌の表面繁殖を抑える。",
        "体臭腺はアポクリン腺。エクリン腺ではない。",
    ]),
    69: ([46, 47], "誤正誤誤", [
        "成長停止後も骨吸収と骨形成は続く。",
        "関節面の軟骨は衝撃を和らげ、関節運動を滑らかにする。",
        "骨格筋疲労で蓄積するのは乳酸などで、乳酸代謝で生じたグリコーゲンではない。",
        "心筋は平滑筋ではなく横紋筋で、自律神経の影響も受ける。",
    ]),
    70: ([47, 48, 49, 50], "正誤正正", [
        "脊髄は脳と末梢をつなぎ、脳を介さない反射も担う。",
        "脳の酸素消費は全身の約20％で、約50％ではない。",
        "自律神経系は交感神経系と副交感神経系からなり多くの効果器を支配する。",
        "汗腺を支配する一部の交感神経末端ではアセチルコリンが放出される。",
    ]),
    71: ([50, 51, 52], "誤正誤正", [
        "内服薬の有効成分は主として小腸で吸収される。",
        "鼻腔粘膜は毛細血管が豊富で、点鼻薬成分が全身血流へ移りやすい。",
        "直腸下部から吸収された成分は肝臓の初回通過を受けず全身へ分布する。",
        "皮膚から血液へ入った成分は肝初回通過より先に全身へ分布する。",
    ]),
    72: ([52, 53], "正誤誤誤", [
        "代謝により作用が消失・発現したり、排泄されやすい水溶性物質になったりする。",
        "母乳中への移行量が微量でも乳児への影響は重要であり、軽視できない。",
        "消化管吸収後に門脈を通って最初に向かうのは肝臓。腎臓ではない。",
        "腎機能低下では尿中排泄が遅れ、血中濃度が高く長く続き得る。",
    ]),
    73: ([53, 54], "正正誤誤", [
        "多くの成分は標的細胞の受容体・酵素・輸送体などに作用する。",
        "吸収・分布を代謝・排泄が上回ると血中濃度はピーク後に低下する。",
        "有効血中濃度に達して初めて期待する薬効が現れる。微量移行だけでは不十分。",
        "薬効は頭打ちでも濃度上昇に伴い副作用・毒性の危険は高まる。",
    ]),
    74: ([54, 55, 56], "正正正正", [
        "錠剤は崩壊して有効成分が溶出することが薬効発現の前提。",
        "口腔内崩壊錠は口内で溶け、唾液とともに飲み込める。",
        "顆粒はコーティングを壊さないよう、噛まずに水で服用する。",
        "カプセルは喉・食道への付着を避けるため適量の水と服用する。",
    ]),
    75: ([57, 58], "正誤誤正", [
        "薬剤性肝障害では倦怠感、黄疸、発熱、発疹、痒み、吐きけ等があり得る。",
        "黄疸の原因は血中ビリルビンの増加。グロブリンではない。",
        "偽アルドステロン症ではナトリウムと水が貯留し、カリウムが失われる。記述は逆。",
        "小柄な人・高齢者で起こりやすく、長期服用後に発症することもある。",
    ]),
    76: ([58, 59, 60], "正誤正誤", [
        "中枢神経系への副作用として不眠、不安、震え、興奮、眠気などが現れる。",
        "通常の用法・用量でも精神神経症状が出る場合がある。",
        "薬剤性無菌性髄膜炎は全身性エリテマトーデスや関節リウマチなどでリスクが高い。",
        "過去に発症した人は同じ医薬品で再発する可能性がある。",
    ]),
    77: ([60, 61], "誤正正正", [
        "消化性潰瘍では粘膜欠損が粘膜筋板を超える。超えないのはびらん。",
        "薬剤性潰瘍は自覚症状が乏しく、吐血・下血で判明する場合がある。",
        "イレウス様症状では嘔吐がなくても摂食・飲水低下で脱水し得る。",
        "小児・高齢者・普段から便秘の人はイレウス様症状の危険が高い。",
    ]),
    78: ([61, 62], "誤正誤正", [
        "間質性肺炎は肺胞間の間質に炎症が生じる。細菌による気管支・肺胞の感染症とは異なる。",
        "低酸素に伴い呼吸困難、空咳、発熱などが現れる。",
        "薬剤性喘息は内服薬だけでなく坐剤・外用薬でも誘発され得る。",
        "合併症がなければ原因成分の消失とともに症状が寛解する。",
    ]),
    79: ([62, 63], "誤正正正", [
        "拍動リズムの異常は不整脈の説明。うっ血性心不全は心臓のポンプ機能低下。",
        "息切れ、浮腫、急な体重増加、ピンク色の痰はうっ血性心不全の徴候。",
        "代謝・排泄機能の低下や相互作用は不整脈の危険を高め得る。",
        "適正使用でも動悸、一過性血圧上昇、顔のほてりが起こる場合がある。",
    ]),
    80: ([63, 64], "誤誤正正", [
        "排尿筋収縮を抑えて排尿困難を生じるのは副交感神経の働きを抑える抗コリン作用。",
        "排尿困難・尿閉は前立腺肥大の男性以外にも起こり得る。",
        "原因薬を中止すると排尿困難・尿閉は速やかに改善することが多い。",
        "薬剤性の膀胱炎様症状として頻尿、排尿時痛、残尿感等があり得る。",
    ]),
}

draft = []
for q in questions[60:80]:
    number = q["number"]
    pages, judgments, reasons = REVIEW[number]
    assert len(judgments) == len(reasons) == 4
    statements = {
        label: {"judgment": judgments[i], "reason": reasons[i]}
        for i, label in enumerate("ａｂｃｄ")
    }
    pair = number in {62, 64, 76, 78}
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
    assert len(choices) == 5 and sum(x["correct"] for x in choices) == 1, number
    assert choices[q["officialAnswerNumber"] - 1]["correct"], number
    draft.append({
        "number": number,
        "status": "SOURCE_GROUNDED_DRAFT_INDEPENDENT_REVIEW_PENDING",
        "guidelineUrl": GUIDE,
        "guidelinePdfPages": pages,
        "statementReviews": statements,
        "choiceReasons": choices,
    })

output = ROOT / "draft-choice-reasons-q61-80.json"
output.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Drafted {len(draft)} question reviews and {sum(len(x['choiceReasons']) for x in draft)} choice reasons; release HOLD")
