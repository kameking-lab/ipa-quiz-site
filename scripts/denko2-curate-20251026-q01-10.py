"""Manual original-image adjudication of 2025 second sitting Q1–10.

The output remains private until the independent reviewer passes every row.
"""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data/raw_pdfs/denko2/review/batches"
TARGET = ROOT / "data/questions/denko2/reviewed"
METI = "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/20231226-2.pdf"

parts = [json.loads((SOURCE / f"20251026-q01-10-vision-part{part:02}.json").read_text(encoding="utf-8"))
         for part in (1, 2)]
questions = {item["number"]: item for part in parts for item in part}
if set(questions) != set(range(1, 11)):
    raise ValueError("Expected questions 1–10")
for number, item in questions.items():
    item["reviewedFromCrop"] = f"data/raw_pdfs/denko2/review/20251026/q{number:02}.png"
    item["uncertainty"] = ""

q = questions[1]
q["diagramDescription"] = "a-b間には上側の3Ωの経路と、a-m間の6Ω二つを並列にした後m-b間の3Ωへ直列につながる経路がある。a-mの6Ω二つは同じ二節点につながる。"
q["choiceExplanations"]["イ"] = "1Ωは4個の抵抗をすべて並列と誤読したときの1/(1/3+1/6+1/6+1/3)に当たる。原図ではm-bの3Ωはa-mの並列部と直列であり、すべてを並列にできない。"
q["choiceExplanations"]["ニ"] = "4Ωは、a-m間の6Ω//6Ω=3Ω、続くm-b間3Ωとの直列6Ω、上側3Ωとの並列という正しい計算の2Ωと一致しない。"
q["imageUrls"] = ["/images/denko2/2025-second/q1-diagram.png"]

q = questions[4]
q["choices"] = {
    "イ": "電流iが電圧vより90°遅れる波形",
    "ロ": "電流iと電圧vが同相の波形",
    "ハ": "電流iが電圧vより90°進む波形",
    "ニ": "電流iが電圧vと180°逆位相の波形",
}
q["choiceExplanations"] = {
    "イ": "インダクタンスLのみの回路では電流iは電圧vより90°遅れる。図でもiのゼロ点と山がvより1/4周期後にある。",
    "ロ": "図のiとvはゼロ点と山が一致する同相。コイルのみの回路に必要な90°の遅れがない。",
    "ハ": "図のiはvより1/4周期前に山を迎える90°進みであり、コイルのみの回路と位相の向きが逆。",
    "ニ": "図のiはvと同じ時点でゼロを通るが符号が反転した180°逆位相。必要な90°の遅れではない。",
}
q["diagramDescription"] = "電源vとコイルLだけの回路。4肢は順に電流iが電圧vより90°遅れ、同相、90°進み、180°逆位相の波形。"
q["imageUrls"] = ["/images/denko2/2025-second/q4-diagram.png"]
q["choiceImageUrls"] = {label: f"/images/denko2/2025-second/q4-{name}.png" for label, name in (("イ", "i"), ("ロ", "ro"), ("ハ", "ha"), ("ニ", "ni"))}

q = questions[5]
q["choiceExplanations"]["ロ"] = "173Vは、各相の抵抗6Ωに線電流20Aが流れて相電圧が120Vとなることを踏まえた線間電圧√3×120V≒208Vと一致しない。"
q["imageUrls"] = ["/images/denko2/2025-second/q5-diagram.png"]

q = questions[6]
q["question"] = "図のような三相3線式回路について、図中の×印の箇所で断線した場合、負荷の全消費電力[kW]は。ただし、負荷の抵抗は、30Ωとし、配線の抵抗は無視し、電源電圧は一定とする。"
q["choiceExplanations"]["ロ"] = "0.9kWでは、断線後も残る下辺30Ωだけの電力200²/30≒1.33kWより小さい。さらに斜辺2本の直列60Ωでも200²/60≒0.67kWを消費し、合計2.0kWになる。"
q["diagramDescription"] = "三相3線式200Vに30Ωを3辺とするΔ負荷。上線の×印で上側頂点への給電が断たれる。残る中線・下線間に下辺30Ωと、斜辺2本を通る60Ωの2経路が並列に残る。"
q["imageUrls"] = ["/images/denko2/2025-second/q6-diagram.png"]

q = questions[7]
q["choiceExplanations"]["イ"] = "96Vなら104Vから8Vの電圧降下が必要だが、a側は10A×0.2Ω=2V、中性線は平衡負荷で0V。8Vの降下は図から生じない。"
q["choiceExplanations"]["ロ"] = "100Vは上線と中性線の両方で2Vずつ下がるとした104−2−2に当たるが、上下の負荷が各10Aなので中性線電流は0A。中性線では電圧降下しない。"
q["diagramDescription"] = "単相3線式208Vで上線・中性線・下線に各0.2Ω。上側と下側の抵抗負荷は各10A。aは上線の負荷側端、bは中性線の負荷側端で、下負荷はbから下線の負荷側端へつながる。"
q["imageUrls"] = ["/images/denko2/2025-second/q7-diagram.png"]

q = questions[8]
q["explanation"] = "経済産業省『電気設備の技術基準の解釈』第146条第2項・146-1表では直径2.0mmの軟銅単線は35A。合成樹脂管内4本は146-4表の電流減少係数0.63を乗じるため、35×0.63=22.05Aで、選択肢では約22Aに当たる。"
q["choiceExplanations"]["ロ"] = "19Aは、例えば1.6mmの基準27Aに3本以下の係数0.70を掛けた約18.9Aに近い。本問は2.0mm・4本なので、35×0.63=22.05Aを使う。"
q["choiceExplanations"]["ハ"] = "2.0mm軟銅単線35Aに4本収容時の係数0.63を掛けると22.05Aとなり、選択肢の22Aに一致する。"
q["choiceExplanations"]["ニ"] = "24Aは4本収容時の係数0.63では得られない。35Aに3本以下用の係数0.70を掛けると24.5Aとなるが、本問は4本。"
q["officialReferenceUrls"] = [METI]

q = questions[9]
q["explanation"] = "経済産業省『電気設備の技術基準の解釈』第149条第1項第1号ロによる。分岐点から過電流遮断器まで7mなので、3m超8m以下の例外に当たり、分岐回路電線の許容電流は幹線側遮断器50Aの35%以上を要する。50×0.35=17.5A。"
q["choiceExplanations"]["イ"] = "12.5Aは50Aの25%であり、第149条の3m超8m以下に必要な35%（17.5A）を満たさない。"
q["choiceExplanations"]["ハ"] = "22.5Aは50Aの45%だが、第149条のこの距離に適用する係数は35%。必要最小値は50×0.35=17.5A。"
q["choiceExplanations"]["ニ"] = "27.5Aは50Aの55%に当たる。第149条第1項第1号イでは55%以上なら分岐点から3mを超える箇所に遮断器を置けるが、本問は7mなので、同号ロの35%以上の条件で足りる。最小値ではない。"
q["diagramDescription"] = "1φ2W電源から延びる低圧幹線は50Aの過電流遮断器Bで保護される。aで下向きに分岐し、aから7m下の分岐回路側の遮断器Bの直前がb。問う電線はa-b間。"
q["officialReferenceUrls"] = [METI]
q["imageUrls"] = ["/images/denko2/2025-second/q9-diagram.png"]

q = questions[10]
q["choices"]["ハ"] = "配線用遮断器40A、電線太さ8mm²、定格電流30Aのコンセント1個"
q["explanation"] = "経済産業省『電気設備の技術基準の解釈』第149条第2項第1号ロ・ニ、149-1表・149-3表による。40Aの遮断器は軟銅線の断面積8mm²以上と30A以上40A以下のコンセントを要する。ハは8mm²・30Aコンセントで適合する。ほかは遮断器と電線又はコンセントの組合せが合わない。"
q["choiceExplanations"] = {
    "イ": "20A配線用遮断器の分岐回路には20A以下のコンセントを用いる。30Aコンセントは上限を超える。",
    "ロ": "30A遮断器には軟銅線の直径2.6mm以上又は同等以上の許容電流を持つ電線が必要で、2.0mmでは細い。",
    "ハ": "40A遮断器には断面積8mm²以上、コンセント30A以上40A以下が必要。図の8mm²・30Aが両方を満たす。",
    "ニ": "30A遮断器と直径2.6mm電線はよいが、コンセント15Aは必要な20A以上30A以下を下回る。2個でも不足は解消しない。",
}
q["diagramDescription"] = "4肢の図は順に、イ=遮断器20A・電線2.0mm・コンセント30A×1、ロ=30A・2.0mm・30A×1、ハ=40A・8mm²・30A×1、ニ=30A・2.6mm・15A×2を示す。"
q["choiceImageUrls"] = {label: f"/images/denko2/2025-second/q10-{name}.png" for label, name in (("イ", "i"), ("ロ", "ro"), ("ハ", "ha"), ("ニ", "ni"))}
q["officialReferenceUrls"] = [METI]

TARGET.mkdir(parents=True, exist_ok=True)
for first, last in ((1, 5), (6, 10)):
    path = TARGET / f"20251026-q{first:02}-{last:02}.json"
    path.write_text(json.dumps([questions[number] for number in range(first, last + 1)], ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(path)
