"""Record manual visual adjudication of 2024 first sitting questions 11–20."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data/raw_pdfs/denko2/review/batches"
TARGET = ROOT / "data/questions/denko2/reviewed"
METI = "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/20231226-2.pdf"
METI_COMMENT = "https://www.meti.go.jp/policy/safety_security/industrial_safety/oshirase/2018/09/300928-5.pdf"

part1 = json.loads((SOURCE / "20240526-q11-20-vision-part01.json").read_text(encoding="utf-8"))
part2 = json.loads((SOURCE / "20240526-q11-20-vision-part02.json").read_text(encoding="utf-8"))
questions = {item["number"]: item for item in part1 + part2}
for number, item in questions.items():
    item["reviewedFromCrop"] = f"data/raw_pdfs/denko2/review/20240526/q{number:02}.png"
    item["uncertainty"] = ""
    if number in (16, 17, 18, 19):
        item["imageUrls"] = [f"/images/denko2/2024-first/q{number}.png"]

q = questions[11]
q["diagramDescription"] = "図表なし。"

q = questions[12]
q["explanation"] = "600Vビニル絶縁電線（IV）の絶縁体の最高許容温度は60℃。経済産業省の電気設備技術基準解釈の解説でも、許容電流の前提となるビニル絶縁体の導体許容温度を60℃としている。"
q["choiceExplanations"] = {
    "イ": "45℃はIVの最高許容温度60℃と異なる。",
    "ロ": "IVの絶縁体の最高許容温度60℃に一致する。",
    "ハ": "75℃はIVの最高許容温度60℃と異なる。耐熱ビニル絶縁体などの温度区分と混同しない。",
    "ニ": "90℃はIVの最高許容温度60℃と異なる。架橋ポリエチレン絶縁体などの温度区分と混同しない。",
}
q["diagramDescription"] = "図表なし。"
q["officialReferenceUrls"] = [METI_COMMENT]

questions[13]["diagramDescription"] = "図表なし。"

q = questions[14]
q["explanation"] = "スターデルタ始動では、始動中は巻線をY結線にして巻線電圧をΔ結線の1/√3にする。同じ巻線インピーダンスZなら、Δ始動の電源側線電流は√3×V/Z、Y始動はV/(√3×Z)で、比は1/3。したがって全電圧始動より始動線電流が小さい。始動トルクもおおむね1/3になる。"
q["choiceExplanations"] = {
    "イ": "始動トルクが小さくなるため、全電圧始動より始動時間が短くなるとはいえない。",
    "ロ": "Y始動の線電流はV/(√3×Z)、Δでの全電圧始動は√3×V/Zなので、電源から見た始動線電流は約1/3になる。",
    "ハ": "巻線電圧が1/√3になり、トルクは電圧の2乗におおむね比例するため、始動トルクは約1/3に減る。",
    "ニ": "Y始動の各巻線電圧は、Δでの全電圧始動時の1/√3であり、大きくならない。",
}
q["diagramDescription"] = "図表なし。"

questions[15]["diagramDescription"] = "図表なし。"

q = questions[16]
q["explanation"] = "写真の矢印が示すのは、側桁と横桟からなる開放的な梯子状のケーブル支持材。名称はケーブルラックである。"
q["choiceExplanations"] = {
    "イ": "金属ダクトは電線を収める樋状の本体に蓋を付ける。写真の開放的な梯子状の支持材とは異なる。",
    "ロ": "側桁と横桟でケーブルを支える梯子状の構造がケーブルラックに一致する。",
    "ハ": "ライティングダクトは照明器具を接続する導体を内部に持つ。写真の大型の梯子状支持材とは異なる。",
    "ニ": "2種金属製線ぴは電線を収める細い樋状の線ぴであり、写真の開放的なケーブルラックとは異なる。",
}
q["diagramDescription"] = "壁沿いに複数の梯子状の金属支持材があり、矢印はケーブルが載るラックの曲がり部分を指す。段数や天井との位置関係は写真だけでは確定しない。"

q = questions[17]
q["explanation"] = "写真は吊り下げ用の鉤が付いた上部カバー、端子部、白・黒の線でつながるソケット本体を示す。端子部から線でソケット本体が吊り下がる構成から、線付防水ソケットと識別する。"
q["choiceExplanations"] = {
    "イ": "キーソケットには点滅用のキーが付く。写真にはそのキーがない。",
    "ロ": "上部の鉤付きカバーと、白・黒の線でつながるソケット本体の組合せは、線付防水ソケットに一致する。",
    "ハ": "プルソケットには点滅用の引きひもが付く。写真には引きひもがない。",
    "ニ": "ランプレセプタクルは台座とソケットが一体で造営材へ直付けする器具。写真のようにソケット本体が線で端子部から離れた構成ではない。",
}
q["diagramDescription"] = "左上にJ字形の吊り鉤がある黒いカバー、右上にねじ端子部、その端子部から白・黒各1本の線が下の黒いソケット本体へ伸びる。下部には銅色のねじ込み受けが見える。"
q["sourceForInternalQcOnly"] = "https://jpn.faq.panasonic.com/app/answers/detail/a_id/108317"

q = questions[18]
q["explanation"] = "クランク状の柄、工具を取り付けるチャック、切替部が見える手回し工具はクリックボール。先端にリーマを取り付ければ、切断した金属管の端面のバリを取り、面取りする作業に使える。"
q["choiceExplanations"] = {
    "イ": "クリックボールにリーマを取り付け、金属管切断端を面取りする組合せなので適切。",
    "ロ": "面取器は管端の面取りに単体で使う工具であり、クリックボールに取り付けてダクトのバリを取る組合せではない。",
    "ハ": "羽根ぎりは木材の穴あけ用。クリックボールと組み合わせることはあっても、鉄板の穴あけには使わない。",
    "ニ": "ホルソは電気ドリルに取り付けて金属板などに穴を開ける工具。クリックボールと組み合わせてコンクリートに穴を開ける用途ではない。",
}
q["diagramDescription"] = "曲がった金属クランクの中央上部に円筒形の赤褐色の握り、チャックと反対側の端に丸い赤褐色の押さえがある。チャックの付け根には黒い切替部が見える。"

q = questions[19]
q["question"] += "\n設問の表：a＝1.6mm 2本／小／○、b＝1.6mm 2本と2.0mm 1本／中／中、c＝1.6mm 4本／中／中、d＝1.6mm 1本と2.0mm 2本／中／中。順に電線／リングスリーブ／圧着マークを示す。"
q["explanation"] = "試験センターのリングスリーブ適用表では、a（1.6mm×2本）は小・○、b（1.6mm×2本と2.0mm×1本）は小・小、c（1.6mm×4本）も小・小、d（1.6mm×1本と2.0mm×2本）は中・中が適合する。設問表のb・cは本来小・小なのに中・中と記されており、dの中・中は適合する。よって不適切なb・cを挙げたロが正しい。"
q["choiceExplanations"] = {
    "イ": "aは小・○で適切なので、不適切なものにaを含むイは違う。",
    "ロ": "bとcはどちらも小・小が適合するのに、設問の表では中・中となっている。両方不適切なので正しい。",
    "ハ": "cは不適切だが、dは中・中で適切。よってcとdの組合せは違う。",
    "ニ": "aもdも表のスリーブと圧着マークが適切。不適切な組合せではない。",
}
q["diagramDescription"] = "表はa:1.6mm2本/小/○、b:1.6mm2本と2.0mm1本/中/中、c:1.6mm4本/中/中、d:1.6mm1本と2.0mm2本/中/中。"
q["sourceForInternalQcOnly"] = "https://www.shiken.or.jp/construction/upload/point2024.pdf"

q = questions[20]
q["explanation"] = "経済産業省『電気設備の技術基準の解釈』のライティングダクト工事の規定では、支持点間距離は2m以下、終端部は閉そく、造営材を貫通しない。対地電圧150V以下で全長4m以下ならD種接地工事を省略できる。100V・3.5mのハも適切で、壁を貫通させるニだけが不適切。"
q["choiceExplanations"] = {
    "イ": "開口部を下に向けた堅ろうな取付けで、支持点間1.5mは2m以下の条件を満たす。",
    "ロ": "終端部をエンドキャップで閉そくしており、規定に合う。",
    "ハ": "100Vは対地電圧150V以下で、全長3.5mは4m以下。D種接地工事を省略できる条件に合う。",
    "ニ": "ライティングダクトを造営材である壁に貫通させる施工は認められない。",
}
q["diagramDescription"] = "図表なし。"
q["officialReferenceUrls"] = [METI]

TARGET.mkdir(parents=True, exist_ok=True)
for first, last in ((11, 15), (16, 20)):
    path = TARGET / f"20240526-q{first:02}-{last:02}.json"
    path.write_text(json.dumps([questions[number] for number in range(first, last + 1)], ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(path.relative_to(ROOT))
