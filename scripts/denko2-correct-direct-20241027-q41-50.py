"""Apply source-aware direct-review corrections to 2024 lower Q41-50."""

from __future__ import annotations

import json
from pathlib import Path
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
REVIEWED = ROOT / "data/questions/denko2/reviewed"
PUBLIC = ROOT / "public/images/denko2/2024-second"
POINT = "https://www.shiken.or.jp/construction/upload/point2024.pdf"

rows = {}
paths = {}
for path in REVIEWED.glob("20241027-q*.json"):
    for item in json.loads(path.read_text(encoding="utf-8")):
        rows[item["number"]] = item
        paths[item["number"]] = path

q = rows[41]
q["explanation"] = "⑪は2階平面図左側のルームエアコン室外機（RC 0）の接地を示す。接地抵抗の測定には、被測定接地極のほか2本の補助接地棒と3本の測定用リード線を用いる接地抵抗計を使う。ニは本体上部に3端子があり、2本のT形補助接地棒と緑・黄・赤の測定用リード線を備えるため該当する。"
q["choiceExplanations"]["ニ"] = "本体上部の3端子、2本のT形補助接地棒、緑・黄・赤3色の測定用リード線という構成が接地抵抗計に対応する。正面の銘板も補足的に確認できる。"
q["diagramDescription"] = "イはMΩ表示の目盛板を持つアナログ絶縁抵抗計。ロは丸い表示窓と赤・白・青のクリップ付きリード線を持つ検相器。ハはDCV/ACV/DCAのレンジ切替を持つアナログ回路計。ニは正面にメーターと押しボタン、上部に3端子があり、2本のT形補助接地棒と、端子付きの緑・黄・赤3色の測定用リード線が写る。"

q = rows[42]
q["officialReferenceUrls"] = [POINT]
q["explanation"] = "⑫は2階の三相200V回路a用ジョイントボックス。動力分電盤P-1から来るCV 5.5-3Cと、左右2台の開閉器Sへ向かうCV 5.5-3Cが集まるため、R・S・T各相で5.5mm²の電線3本を1か所ずつ、計3か所接続する。試験センター『技能試験の概要と注意すべきポイント』のJIS C 2806準拠表では、φ2.6mm又は5.5mm²の同一電線3本は大スリーブ。よって大3個のハ。"
q["choiceExplanations"] = {
    "イ": "試験センターのJIS C 2806準拠表では5.5mm²電線3本に小スリーブは使えず、接続点も3か所なので小6個は合わない。",
    "ロ": "同表で5.5mm²電線2本は中だが、本問の各相は3本接続なので中3個では合わない。",
    "ハ": "同表で5.5mm²の同一電線3本は大。R・S・Tの3接続点に大を1個ずつ使うため、大3個が正しい。",
    "ニ": "同表で5.5mm²電線3本に小スリーブは使えないため、小3個は合わない。",
}

q = rows[43]
q["explanation"] = q["explanation"].replace(
    "写真の差込形コネクタは接続する電線本数によって色分けされ、赤色は2本用、透明(淡青色)は3本用、黄色は4本用であるため、",
    "本問写真で確認できる差込口は赤色が2口、透明（淡青色）が3口、黄色が4口であるため、")
q["diagramDescription"] = "選択肢写真では赤色コネクタに2口、透明（淡青色）に3口、黄色に4口の差込口が見える。個数表示は、イが赤3個・黄1個、ロが赤2個・淡青2個、ハが赤3個・淡青1個、ニが赤2個・黄1個。公式15頁では⑬に、L-2の回路c、イ群灯具、ロ群灯具、⑭の点滅器群へ向かう①の4本のケーブルが接続される。"

q = rows[44]
q["choices"]["ロ"] = "中央に角の丸い長方形の開口があり、その縁が立ち上がった金属製の塗代カバー。開口の上下に丸穴、四隅付近に長穴がある。"
q["officialReferenceUrls"] = ["https://www.shiken.or.jp/construction/upload/20241027_co_second_q01.pdf"]
q["choices"]["ニ"] = "角の丸い金属製の露出形スイッチボックスで、上部に電線管接続用のハブがある"
q["explanation"] = "⑭は2階の3個用点滅器群で、⑬のVVF用ジョイントボックスから配線①で結ばれている。公式問題冊子11頁の注意1は、特記のない電灯回路をVVFケーブル工事と定め、⑭に電線管の特記はない。この⑭の埋込取付けでは、イの四角アウトレットボックス、ロの塗代カバー、ハの3個用取付枠を組み合わせられる。ニは上部に電線管接続用ハブを持つ露出形スイッチボックスなので使用しない。"
q["choiceExplanations"]["ロ"] = "角の丸い長方形の開口を持つ塗代カバーは、四角アウトレットボックスと取付枠の間に取り付ける部材で、点滅器の取付けに使用する。"
q["choiceExplanations"]["ニ"] = "上部に電線管接続用ハブを持つ露出形スイッチボックス。⑭は公式注意1に基づくVVFケーブル工事で電線管の特記がないため使用しない。"
q["diagramDescription"] = "イはノックアウト穴のある金属製四角アウトレットボックス。ロは角の丸い長方形の開口と取付穴を持つ金属製塗代カバー。ハは配線器具用取付枠。ニは上部に電線管接続用ハブがある露出形スイッチボックス。"

q = rows[45]
q["officialReferenceUrls"] = ["https://www.jisc.go.jp/app/jis/general/GnrJISSearch.html", "https://www.mlit.go.jp/common/001108579.pdf"]
q["explanation"] = "⑮は1階洗面所付近の壁付コンセントで、口数を示す『2』がないため1口、傍記『ET』は接地端子付を示す。国土交通省の公式図記号表は接地極付E、接地端子付ETを区別し、両方を備える場合はEETで表す。写真ハは1口でねじ式接地端子を備え、接地極穴がないため一致する。"
q["choiceExplanations"] = {
    "イ": "2口で接地端子がない。⑮は口数の傍記『2』がなく、ETは接地端子付を示すため一致しない。",
    "ロ": "2口で各口に接地極穴がある。⑮には口数の『2』がなく、傍記も接地極付Eではなく接地端子付ETなので一致しない。",
    "ハ": "1口で、下部にねじ式接地端子があり、接地極穴はない。1口・接地端子付を示す⑮のETに一致する。",
    "ニ": "1口だが接地極穴と接地端子の両方を持つ。この組合せはEETで表し、接地端子だけを示す⑮のETとは一致しない。",
}

q = rows[46]
q["officialReferenceUrls"] = ["https://www.shiken.or.jp/construction/upload/20241027_co_second_q01.pdf"]
q["explanation"] = "⑯は1階の階段灯「ハ」の回路と、2階の3路スイッチ「ハ」とを結ぶ立上り部分である。2本の渡り線に接地側電線1本を加えるため最少3心が必要になる。公式問題冊子11頁の注意1は、特記のない電灯回路に600Vビニル絶縁ビニルシースケーブル平形（VVF）を用いると定めている。3心で平形VVFのハが適合する。ニも3心だが、写真で確認できるのは黒色の丸形シースとフィラー・テープ巻きであり、指定された平形VVFではない。"
q["choiceExplanations"]["ニ"] = "赤・白・黒の3心だが、黒色の丸形シースで、切り口にフィラーとテープ巻きが見える。公式問題冊子の注意1が電灯回路に指定する平形VVFではないため適合しない。"
q["diagramDescription"] = q["diagramDescription"].replace("丸形（CV）", "丸形")

q = rows[47]
q["officialReferenceUrls"] = []
q["choices"]["イ"] = "淡い橙色の帯状の地に赤色文字で『危険 注意 この下に低圧電力ケーブルあり』と印刷された埋設標識シート"
q["choices"]["ハ"] = "黒色で外周が波付（らせん状）に成形された管"
q["choices"]["ニ"] = "黒色シースの端部から絶縁被覆の心線2本が露出したケーブル"
q["explanation"] = "⑰は駐車場を通る地中埋設部分で、配線図に『トラフ』と明記されている。トラフはケーブルを収める樋状の本体とふたからなる。ロだけが、断面コの字形の本体にふたを載せた形状を写真で確認できる。イはケーブルの上方に埋設して掘削時に注意を促す標識シート、ハは外周が波付の管、ニはケーブル端部であり、いずれも写真の形状がトラフではない。"
q["choiceExplanations"]["イ"] = "ケーブルの上方に埋設し、掘削時に地下ケーブルの存在を知らせる標識シートである。ケーブルを収める樋状の本体とふたを持たないためトラフではない。"
q["choiceExplanations"]["ハ"] = "外周が波付の管であり、本体とふたからなる樋状のトラフとは形状が異なる。"
q["diagramDescription"] = "イは赤い警告文字が印刷された淡い橙色の埋設標識シート、ロは本体の一部にふたが載せられた樋状トラフ、ハは黒色で外周が波付に成形された管、ニは絶縁被覆心線2本が露出したケーブル端部。⑰は駐車場を通る地中埋設部分で、配線図にトラフと明記された位置を示す。"

q = rows[48]
q["explanation"] = "⑱の図記号は低圧進相コンデンサを示し、1階工場の三相200V電動機回路に接続されている。イは上部に3個の端子カバーがあり、ラベルに『三相200V』『40μF』と読めるため、静電容量の定格を持つ三相用コンデンサに一致する。ロにはイのような3端子カバーや『三相200V』表示が見えない。ハは3極の開閉器状で『10A』表示があり、μFの容量表示がない。ニは多数の端子と開閉機構を持つ機器で、いずれもイのコンデンサとは外観と定格表示が異なる。"
q["choiceExplanations"]["ロ"] = "円筒形本体からコードが出ており、イのような3端子カバーや『三相200V』の定格表示が見えないため、本問の機器には該当しない。"
q["choiceExplanations"]["ハ"] = "3極の開閉器状で『10A』の電流定格表示があり、コンデンサを示す静電容量（μF）の定格表示がないため該当しない。"
q["diagramDescription"] = q["diagramDescription"].replace("配線用遮断器", "3極の開閉器状機器")

q = rows[49]
q["officialReferenceUrls"] = [POINT]
q["explanation"] = "⑲ではCV14-3CとIV14×3を接続する。試験センター公式『技能試験の概要と注意すべきポイント』の圧着工具・リングスリーブ表は、黄色柄のリングスリーブ用圧着工具と、表中最大でもφ2.6mm又は5.5mm²までの組合せを示している。14mm²電線の圧着にはこの工具の適用範囲を超えるためイは使用しない。ロは切断、ハはシース・被覆除去、ニは太い電線用の圧着作業に用いる。"
q["choiceExplanations"]["イ"] = "公式資料の写真と同じ黄色柄のリングスリーブ用圧着工具。公式の組合せ表は最大でもφ2.6mm又は5.5mm²までで、14mm²電線は適用範囲外なので使用しない。"

q = rows[50]
q["choices"]["イ"] = "金属製の丸筒状部材で、側面に止めねじと、ねじで留めた金属片があり、反対側には雄ねじが切られた構造"
q["choices"]["ロ"] = "金属製の丸筒状部材で、片側の内側にらせん状の溝があり、反対側には雄ねじが切られた構造"
q["choices"]["ハ"] = "黒色樹脂製で、後部の外周が段状・波状に成形され、手前に環状部がある継手"
q["officialReferenceUrls"] = ["https://www.mlit.go.jp/gobuild/content/001879783.pdf"]
q["explanation"] = "⑳の傍記『F2 30』のうちF2は、国土交通省『公共建築設備工事標準図（電気設備工事編）令和4年版』22頁の管類表で金属製可とう電線管を表す。ロは金属製で、内側にらせん状の溝、反対側に端子箱へ接続する雄ねじが見えるため、公式正答が示す接続具に一致する。イは止めねじ式、ハとニは樹脂製で、いずれもロと構造が異なる。"
q["choiceExplanations"]["イ"] = "内側にロのようならせん状の溝がなく、側面のねじで管を押さえる外観の金属製継手なので、公式正答ロとは構造が異なる。"
q["choiceExplanations"]["ロ"] = "金属製で、内側に可とう電線管の波形に合うらせん状の溝があり、反対側に雄ねじがある。公式正答どおり、本問の接続に使用する。"
q["choiceExplanations"]["ハ"] = "黒色樹脂製で外周が波状に成形された継手であり、内側らせん溝と端子箱側の雄ねじを持つ金属製のロとは材質・外観が異なる。"
q["choiceExplanations"]["ニ"] = "灰色樹脂製で内周に縦方向のスリット状の爪があり、内側らせん溝と端子箱側の雄ねじを持つ金属製のロとは材質・外観が異なる。"
q["diagramDescription"] = "イは側面に止めねじとねじ留めの金属片がある金属製継手、ロは内側らせん溝と雄ねじを備えた金属製継手、ハは後部が段状・波状で手前に環状部がある黒色樹脂製継手、ニは内周に縦スリットのある灰色樹脂製継手。⑳は1階工場の電動機（3.7kW）と⑩の間にある『F2 30』の部分を示す。"

# Keep the complete official photo choices and their printed labels, while
# excluding the next row and the right-hand table border.
for number in range(41, 46):
    source = ROOT / f"data/raw_pdfs/denko2/review/20241027/q{number:02}.png"
    target = PUBLIC / f"q{number}-1.png"
    with Image.open(source) as original:
        original.crop((307, 0, original.width - 20, original.height - 12)).save(target, optimize=True)

for path in sorted(set(paths.values())):
    data = sorted((row for number, row in rows.items() if paths[number] == path), key=lambda item: item["number"])
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

print("corrected 20241027 Q41-50")
