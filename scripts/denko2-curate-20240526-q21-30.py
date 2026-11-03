"""Manual, source-backed corrections for the 2024 first sitting Q21–30."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data/raw_pdfs/denko2/review/batches"
TARGET = ROOT / "data/questions/denko2/reviewed"
METI = "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/20231226-2.pdf"
ORDINANCE = "https://laws.e-gov.go.jp/law/409M50000400052/20230320_504M60000400096"
RULES = "https://laws.e-gov.go.jp/law/335M50000400097/20220401_503M60000400021"
DECREE = "https://laws.e-gov.go.jp/law/335CO0000000260/20230401_504CO0000000365"
PSE = "https://www.meti.go.jp/policy/consumer/seian/denan/file/06_guide/denan_guide_ver501.pdf"

items = []
for part in (1, 2):
    path = SOURCE / f"20240526-q21-30-vision-part{part:02}.json"
    items.extend(json.loads(path.read_text(encoding="utf-8")))
questions = {item["number"]: item for item in items}
for number, item in questions.items():
    item["reviewedFromCrop"] = f"data/raw_pdfs/denko2/review/20240526/q{number:02}.png"
    item["uncertainty"] = ""
    item["diagramDescription"] = "図表なし。"

q = questions[21]
q["explanation"] = "経済産業省『電気設備の技術基準の解釈』第160条第2項第二号では、1種金属製可とう電線管を使える場所は『展開した場所又は点検できる隠ぺい場所であって、乾燥した場所』などの条件を満たす場合に限る。湿気の多い場所で1種を使うイは不適切。同条第3項第四号の防湿装置は2種を湿気の多い場所に施設する場合の要件で、1種の制限を解除するものではない。"
q["choiceExplanations"] = {
    "イ": "1種金属製可とう電線管は乾燥した場所に限られるため、湿気の多い場所での施工は不適切。",
    "ロ": "造営材に沿って施設するケーブルの支持点間隔を2m以下としており、規定を満たす。",
    "ハ": "金属管工事に600Vビニル絶縁電線（IV）を収めることは認められる。屋外用ビニル絶縁電線（OW）との混同に注意。",
    "ニ": "乾燥した場所で使用電圧200V・管長3mの金属管は、D種接地工事を省略できる300V以下・4m以下・乾燥した場所の条件を満たす。",
}
q["officialReferenceUrls"] = [METI]

q = questions[22]
q["question"] = q["question"].replace("a~d", "a～d")
q["officialReferenceUrls"] = [METI]

q = questions[23]
q["choices"]["イ"] = "管の支持点間の距離は2mとした。"
q["choiceExplanations"]["ニ"] = "使用電圧300V以下の合成樹脂管工事で接続する金属製ボックスにはD種接地工事を施すのが原則。本肢はプルボックスにD種接地を施しており適切。簡易接触防護措置だけを理由に接地を省略した施工ではない。"
q["officialReferenceUrls"] = [METI]

questions[24]["diagramDescription"] = "図表なし。"
questions[25]["diagramDescription"] = "図表なし。"

q = questions[26]
q["explanation"] = "経済産業省『電気設備の技術基準の解釈』第17条ではD種接地の接地抵抗値は原則100Ω以下だが、地絡後0.5秒以内に自動遮断する装置があれば500Ω以下。本問は0.1秒で遮断する。100Vの低圧電路では、絶縁抵抗の基準は0.1MΩ以上（省令第58条）。イは絶縁抵抗2.0MΩを満たす一方、接地抵抗600Ωが500Ωを超えるので不適合。"
q["diagramDescription"] = "図表なし。イからニは接地抵抗aと絶縁抵抗bの数値組合せを本文の選択肢として示す。"
q["officialReferenceUrls"] = [METI, ORDINANCE]

q = questions[27]
q["explanation"] = "目盛板中央のVは電圧計、波線は交流用を示す。左下には可動鉄片形の動作原理を表す記号と、水平置きを表す記号が別々にある。したがって永久磁石可動コイル形とするロが誤り。"
q["choiceExplanations"] = {
    "イ": "中央にVの記号があり、電圧計である。",
    "ロ": "左下の動作原理記号は可動鉄片形を示す。永久磁石可動コイル形ではないので誤り。",
    "ハ": "左下の水平置き記号は、測定器を水平に置いて使うことを示す。",
    "ニ": "Vの下の波線は交流用の記号であり、交流回路用の測定器である。",
}
q["diagramDescription"] = "0、50、100、150の目盛を持つ電圧計の目盛板。中央にVと交流を表す波線、左下に可動鉄片形の動作原理記号、水平置き記号、階級1.0の表示がある。"
q["imageUrls"] = ["/images/denko2/2024-first/q27.png"]

q = questions[28]
q["explanation"] = "電気工事士法施行規則第2条は、電線管の曲げ、配電盤の造営材への取付け、電線管への電線の収納、接地極の埋設などを『軽微な作業』から除く。一方、施行令第1条は地中電線用の管の設置、600V以下の電力量計の取付け、600V以下の差込み接続器へのコードの接続などを『軽微な工事』として挙げる。イのa・bは双方とも資格が必要な作業である。"
q["choiceExplanations"] = {
    "イ": "配電盤を造営材へ取り付ける作業も、電線管を曲げる作業も、施行規則第2条で軽微な作業から除かれる。両方とも電気工事士が必要。",
    "ロ": "地中電線用の管の設置と100Vの電力量計の取付けは、施行令第1条の軽微な工事に当たり、両方必要という条件に合わない。",
    "ハ": "電線を支持する柱の設置は軽微な工事だが、電線管への電線の収納は施行規則第2条で軽微な作業から除かれる。両方必要ではない。",
    "ニ": "接地極の埋設は施行規則第2条で軽微な作業から除かれる一方、125Vの差込み接続器へのコードの接続は施行令第1条の軽微な工事。両方必要ではない。",
}
q["officialReferenceUrls"] = [RULES, DECREE]

q = questions[29]
q["choices"]["イ"] = "電気用品の製造の事業を行う者は、一定の要件を満たせば製造した特定電気用品に菱形PSEの表示を付すことができる。"
q["choices"]["ロ"] = "電線、ヒューズ、配線器具等の部品材料であって構造上表示スペースを確保することが困難な特定電気用品にあっては、特定電気用品に表示する記号に代えて<PS>Eとすることができる。"
q["choices"]["ハ"] = "電気用品の輸入の事業を行う者は、一定の要件を満たせば輸入した特定電気用品に丸形PSEの表示を付すことができる。"
q["explanation"] = "特定電気用品の表示は菱形PSEで、丸形PSEは特定電気用品以外の電気用品の表示。輸入した特定電気用品に丸形PSEを付すとしたハが誤り。"
q["choiceExplanations"] = {
    "イ": "特定電気用品の製造・輸入事業者が、技術基準適合、登録検査機関による適合性検査、自主検査等の要件を満たした場合は、菱形PSEを表示できる。",
    "ロ": "表示スペースを確保しにくい電線・ヒューズ・配線器具等には、菱形PSEの図形に代えて文字表記<PS>Eを使える。",
    "ハ": "特定電気用品に必要なのは菱形PSE。図中の丸形PSEは特定電気用品以外の表示なので誤り。",
    "ニ": "法定表示のない特定電気用品は、例外の承認等を除いて販売できない。",
}
q["diagramDescription"] = "イには菱形枠内にPSとEを上下に配した図記号、ハには丸形枠内にPSとEを上下に配した図記号。ロは図でなく文字表記<PS>E。"
q["choiceImageUrls"] = {"イ": "/images/denko2/2024-first/q29-diamond-pse.png", "ハ": "/images/denko2/2024-first/q29-circle-pse.png"}
q["officialReferenceUrls"] = [PSE]

q = questions[30]
q["explanation"] = "電気設備に関する技術基準を定める省令第1条では『通常の使用状態で電気が通じているところ』を電路と定義する。ニはこれを電線の定義と取り違えているため誤り。"
q["choiceExplanations"]["ニ"] = "『通常の使用状態で電気が通じているところ』は電路の定義であり、電線の定義ではない。用語を取り違えている。"
q["officialReferenceUrls"] = [ORDINANCE]

TARGET.mkdir(parents=True, exist_ok=True)
for first, last in ((21, 25), (26, 30)):
    path = TARGET / f"20240526-q{first:02}-{last:02}.json"
    path.write_text(json.dumps([questions[number] for number in range(first, last + 1)], ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(path.relative_to(ROOT))
