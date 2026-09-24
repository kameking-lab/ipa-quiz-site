"""Source-backed curation of 2024 first sitting, wiring diagram Q31–40."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data/raw_pdfs/denko2/review/batches"
TARGET = ROOT / "data/questions/denko2/reviewed"
METI = "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/20231226-2.pdf"
ORDINANCE = "https://laws.e-gov.go.jp/law/409M50000400052/20230320_504M60000400096"
MLIT_SYMBOLS = "https://www.mlit.go.jp/koku/content/001611774.pdf"
MLIT_VE = "https://www.mlit.go.jp/koku/content/001885918.pdf"
MLIT_TR = "https://www.hrr.mlit.go.jp/youchi/youchi_shiyousyo/240326_zenbun.pdf"
METI_PLUGS = "https://www.meti.go.jp/policy/consumer/seian/denan/kaishaku/gijutsukijunkaishaku/beppyoudai4.pdf"
METI_FUSE = "https://www.meti.go.jp/policy/safety_security/industrial_safety/oshirase/2020/06/20200601-2-4.pdf"

items = []
for part in (1, 2):
    items.extend(json.loads((SOURCE / f"20240526-q31-40-vision-part{part:02}.json").read_text(encoding="utf-8")))
questions = {item["number"]: item for item in items}
shared = ["/images/denko2/2024-first/wiring-main.png", "/images/denko2/2024-first/wiring-panels.png"]
for number, item in questions.items():
    item["reviewedFromCrop"] = f"data/raw_pdfs/denko2/review/20240526/q{number:02}.png"
    item["uncertainty"] = ""
    item["imageUrls"] = shared

q = questions[31]
q["explanation"] = "配線図①の引出線は事務所右側の扉脇、『分電盤へ』の矢印の右端にある、円内に交差線を持つ記号を指す。傍記の『6』と『二重丸a～f用』、電灯分電盤のリモコンリレー群の傍記『6』が対応するため、単相200Vのa～f照明回路を選ぶ6点用リモコンセレクタスイッチである。"
q["choiceExplanations"] = {
    "イ": "円内に交差線を持つ記号に『6』『二重丸a～f用』と選択対象が明記されている。リモコンセレクタスイッチに合う。",
    "ロ": "漏電警報器は漏電の警報用であり、二重丸a～fの6照明回路を選ぶ①の操作器具ではない。",
    "ハ": "リモコントランスはリモコン回路への電源供給用。①の6点選択器具とは役割が異なる。",
    "ニ": "①は『6』『二重丸a～f用』と複数回路の選択を明示する図記号であり、表示スイッチを示さない。",
}
q["diagramDescription"] = "平面図の事務所右側の扉脇で、①は円内に交差線を持つ記号と傍記『6』『二重丸a～f用』を指す。電灯分電盤には三角印のリモコンリレー群に『6』と傍記され、出力は二重丸a～f。"
q["imageUrls"] = shared + ["/images/denko2/2024-first/q31-symbol.png"]
q["officialReferenceUrls"] = [MLIT_SYMBOLS]

q = questions[32]
q["explanation"] = "平面図②はカウンタ内の『LK』（抜止形）付きコンセント記号を指す。円の片側が黒く塗られた壁付けコンセント（右壁の20A等）と異なり、②の円は白抜きのままなので、天井面取付けを表す。"
q["choiceExplanations"] = {
    "イ": "②は白抜き円内に縦線2本とLKの傍記を持つ天井コンセント。床面に設ける床コンセントの図記号ではない。",
    "ロ": "②は白抜き円形のコンセント記号で、壁付けを示す半塗りや床埋込み表示がない。天井面が正しい。",
    "ハ": "同一図の壁付けコンセントには円の壁側を黒く塗った記号があるが、②は塗りつぶされていない。",
    "ニ": "二重床用コンセントの記号ではなく、②は白抜き円内の縦線2本とLKの傍記を持つ天井用の図記号である。",
}
q["diagramDescription"] = "②はカウンタ内にある『LK』傍記の白抜き円形コンセントを指す。右壁の半塗りの壁付けコンセントと区別できる。"
q["officialReferenceUrls"] = [MLIT_SYMBOLS]

q = questions[33]
q["choices"] = {
    "イ": "左に横向きL字の刃受け、右に横向き平刃受け、下に接地極刃受けがある図。",
    "ロ": "左右に縦向きの平刃受け、下に接地極刃受けがある図。",
    "ハ": "左右に横向きの平刃受け、下に接地極刃受けがある図。",
    "ニ": "左に縦向きL字の刃受け、右に縦向き平刃受け、下に接地極刃受けがある図。",
}
q["explanation"] = "平面図③のコンセントには『E20A』とある。Eは接地極付き、20Aは定格電流を示す。接続されるⓘ回路は電灯分電盤結線図で100V・20Aだから、125V・20Aの接地極付き刃受配置であるニを選ぶ。イは20A用L字でも横刃で250V用。"
q["choiceExplanations"] = {
    "イ": "L字刃受けはあるが、主刃受けが横向きの250V・20A用。ⓘの100V・20A回路とは電圧が合わない。",
    "ロ": "縦向きの平刃2本は125V系だが15A用。図面③の『E20A』が要求する20A用L字刃受けがない。",
    "ハ": "横向き平刃2本は250V・15A用。③の100V・20A回路とは電圧・電流の両方が異なる。",
    "ニ": "縦向きL字刃受けと接地極を持つ125V・20A用。③の『E20A』とⓘ回路の100V・20Aに適合する。",
}
q["diagramDescription"] = "共通図③は右壁の『E20A』コンセントで、ⓘ回路につながる。4肢は順に横L字・縦平刃・横平刃・縦L字で、各肢とも接地極刃受けを持つ。"
q["choiceImageUrls"] = {label: f"/images/denko2/2024-first/q33-{slug}.png" for label, slug in (("イ", "i"), ("ロ", "ro"), ("ハ", "ha"), ("ニ", "ni"))}
q["officialReferenceUrls"] = [METI_PLUGS]

q = questions[34]
q["explanation"] = "平面図④は出入口の扉上部にある、横長の棒と相対する区画を黒く塗った円が一体の図記号を指す。出口の位置を示す誘導灯である。非常用照明は停電時の照度確保が役割で、出口位置を示すこの記号とは区別する。"
q["choiceExplanations"] = {
    "イ": "④の横長器具は出入口上に設置され、出口を示す誘導灯の位置と図記号に合う。",
    "ロ": "④は出入口の位置を示す横長の棒と塗り分けた円の複合記号。保安用照明は出口を表示する名称ではなく、この記号を指さない。",
    "ハ": "一般用照明は図中の蛍光灯など室内照明であり、扉上部の④とは設置位置も図記号も異なる。",
    "ニ": "非常用照明は停電時の照度確保を担う。④は出入口上の横長の棒と塗り分けた円の複合記号で、出口を示す誘導灯に当たる。",
}
q["diagramDescription"] = "④の引出線は出入口扉の上枠にある、横長の棒と相対する区画を黒く塗った円が一体の図記号を指す。上へ延びる引出しは単相100Vの単丸a回路に接続する。"
q["imageUrls"] = shared + ["/images/denko2/2024-first/q34-symbol.png"]
q["officialReferenceUrls"] = [MLIT_SYMBOLS]

q = questions[35]
q["explanation"] = "平面図下端の⑤が指す配線の傍記は『600V CV 5.5-2C (VE28)』。VEは硬質ポリ塩化ビニル電線管、28は公称の内径を表す呼びである。実測内径の厳密な28.0mmを保証する表記ではなく、選択肢では『内径28mm』のハが対応する。"
q["choiceExplanations"] = {
    "イ": "VEの管種は正しいが、28を外径と読んでいる点が誤り。",
    "ロ": "28は外径ではなく、VEは合成樹脂製可とう電線管ではなく硬質ポリ塩化ビニル電線管。両方違う。",
    "ハ": "VEは硬質ポリ塩化ビニル電線管、28は公称内径の呼びに対応する。",
    "ニ": "内径の読みは合うが、VEを可とう電線管とする管種が誤り。",
}
q["diagramDescription"] = "平面図下端で⑤は『600V CV 5.5-2C (VE28)』の埋設配線を指す。"
q["officialReferenceUrls"] = [MLIT_VE]

q = questions[36]
q["explanation"] = "⑥は電灯分電盤結線図でE5.5の接地線につながる接地極を指す。引込みは単相3線式100/200Vで、300V以下の低圧機器の接地に当たるためD種接地工事。経済産業省『電気設備の技術基準の解釈』第17条の原則は100Ω以下。主幹は漏電遮断器BEではなく配線用遮断器Bで、設問でも引込線の電源側に地絡遮断装置がないため、地絡時0.5秒以内の自動遮断による500Ω緩和を適用しない。"
q["choiceExplanations"] = {
    "イ": "C種の10Ωは300Vを超える低圧機器の接地で用いる区分。⑥は単相100/200Vの電灯分電盤の接地なのでD種。",
    "ロ": "C種が対象外であるうえ、50ΩはC種の原則値10ΩにもD種の原則値100Ωにも該当しない。",
    "ハ": "100/200Vの電灯分電盤の接地なのでD種、設問条件で0.5秒遮断の緩和は使えず100Ω以下が正しい。",
    "ニ": "D種という種類は合うが、500Ωへの緩和は地絡後0.5秒以内に自動遮断する装置がある場合。主幹はBであり、設問でも引込線電源側に地絡遮断装置がない。",
}
q["diagramDescription"] = "⑥は電灯分電盤結線図の下の接地記号を指し、⑯はその上のE5.5と傍記した接地線を指す。電灯分電盤の電源は単相3線式100/200V、主幹はB 3P100A。"
q["officialReferenceUrls"] = [METI]

q = questions[37]
q["choices"] = {
    "イ": "円内にT、右下にBを付した図記号。",
    "ロ": "円内にT、右下にRを付した図記号。",
    "ハ": "黒丸にDを付した図記号。",
    "ニ": "黒丸にRを付した図記号。",
}
q["explanation"] = "⑦は電灯分電盤結線図で、6個のリモコンリレーの電源側に描かれた破線の設置箇所を指す。リモコンリレーを操作する低電圧電源を供給するリモコントランスが必要なので、円内TにRを付したロ。図中の『TS』は別のタイムスイッチであり、T_Rをタイムスイッチと読まない。"
q["choiceExplanations"] = {
    "イ": "円内TにBはベル用トランスを表す。⑦が給電するのはベルではなく6個のリモコンリレー。",
    "ロ": "円内TにRはリモコントランス。電灯分電盤のリモコンリレー6回路に制御電源を供給する⑦に合う。",
    "ハ": "黒丸Dは遅延スイッチの記号で、⑦に必要な変圧器ではない。",
    "ニ": "黒丸Rはリモコンスイッチを表すが、⑦は操作側スイッチでなく分電盤内の電源用変圧器を置く位置。",
}
q["diagramDescription"] = "⑦は電灯分電盤結線図の左下、6個のリモコンリレーの前にある破線の枠を指す。選択肢はT_B、T_R、黒丸D、黒丸Rの図。"
q["choiceImageUrls"] = {label: f"/images/denko2/2024-first/q37-{slug}.png" for label, slug in (("イ", "i"), ("ロ", "ro"), ("ハ", "ha"), ("ニ", "ni"))}
q["officialReferenceUrls"] = [MLIT_TR, MLIT_SYMBOLS]

q = questions[38]
q["explanation"] = "⑧の引出線は平面図左下のⒼ回路を指す。電灯分電盤結線図でⒼは単相3線式の200V・20A分岐。中性線接地の単相3線式では対地電圧100Vであり、使用電圧300V以下・対地電圧150V以下の区分になる。電気設備に関する技術基準を定める省令第58条の絶縁抵抗の最小値は0.1MΩ。"
q["choiceExplanations"] = {
    "イ": "Ⓖは単相200V回路だが中性線接地で対地電圧は100V。省令第58条の150V以下区分で0.1MΩが最小値。",
    "ロ": "0.2MΩは使用電圧300V以下でも対地電圧150Vを超える区分の最小値。Ⓖの対地電圧は100V。",
    "ハ": "0.4MΩは使用電圧300V超の低圧電路の最小値。Ⓖの使用電圧は200V。",
    "ニ": "1.0MΩは省令第58条でこの電圧区分に定めた最小値ではない。0.1MΩ以上で足りる。",
}
q["diagramDescription"] = "⑧は平面図左下のⒼ回路の配線を指す。電灯分電盤結線図にはⒼが200V・20Aと示される。"
q["officialReferenceUrls"] = [ORDINANCE]

q = questions[39]
q["explanation"] = "平面図⑨の矢印は冷蔵庫の右にある、四角内の丸囲みSと傍記f20Aを指す。接続先cは三相200Vの冷蔵庫回路。Sは開閉器、f20Aは20Aのヒューズ付きを示す。ヒューズが過電流で溶断して電路を遮断するのが目的であり、地絡専用の検出器ではない。"
q["choiceExplanations"] = {
    "イ": "三相200Vのc回路にあるS（f20A）のヒューズは過電流で溶断し、回路を遮断する。",
    "ロ": "地絡電流の検出・遮断は漏電遮断器等の機能。⑨はヒューズ付き開閉器で地絡専用の検出器ではない。",
    "ハ": "⑨のヒューズは過電流を遮断するが、地絡電流を検出して遮断する機能まで備えた漏電遮断器ではない。",
    "ニ": "三相200Vのc回路に付く器具だが、不平衡電流の検出が目的ではなく、f20Aのヒューズによる過電流保護である。",
}
q["diagramDescription"] = "⑨は冷蔵庫の右側の、四角内の丸囲みSと傍記f20Aを指す。その横のcは凡例で三相200Vの冷蔵庫回路。"
q["officialReferenceUrls"] = [MLIT_SYMBOLS, METI_FUSE]

q = questions[40]
q["explanation"] = "⑩の矢印は事務所の蛍光灯『ア』につながる結線点から、右壁の『ア 3』三路スイッチへ向かう配線区間を指す。左側にも『ア 3』三路スイッチがあるため、両スイッチを連絡する渡り線2本と、右側スイッチの共通端子につながる線1本が必要で、最少3心となる。"
q["choiceExplanations"] = {
    "イ": "三路スイッチ間の渡り線だけで2本を使い、右側スイッチの共通端子への線が1本不足する。",
    "ロ": "渡り線2本と共通端子への線1本で、⑩の区間に必要な最少3心となる。",
    "ハ": "必要な3本にさらに1本足した値で、⑩の三路スイッチ区間の最少本数ではない。",
    "ニ": "必要な3本より2本多く、図中の⑩には追加の切替線を要求する器具がない。",
}
q["diagramDescription"] = "平面図⑩は事務所の蛍光灯『ア』の結線点と右壁の『ア 3』三路スイッチを結ぶ配線を指す。左側にも『ア 3』三路スイッチがある。"
q["officialReferenceUrls"] = [MLIT_SYMBOLS]

TARGET.mkdir(parents=True, exist_ok=True)
for first, last in ((31, 35), (36, 40)):
    path = TARGET / f"20240526-q{first:02}-{last:02}.json"
    path.write_text(json.dumps([questions[number] for number in range(first, last + 1)], ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(path.relative_to(ROOT))
