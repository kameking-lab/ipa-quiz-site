"""Apply concrete corrections from the strict 2024 first-session audit."""

from __future__ import annotations

import json
from pathlib import Path
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
DIR = ROOT / "data/questions/denko2/reviewed"
QUESTION = "https://www.shiken.or.jp/construction/upload/20240526_co_second_q01.pdf"
ANSWER = "https://www.shiken.or.jp/construction/upload/20240526_co_second_a01.pdf"
METI = "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/20231226-2.pdf"
POINT = "https://www.shiken.or.jp/construction/upload/point2024.pdf"
METI_RECEPTACLE = "https://www.meti.go.jp/policy/consumer/seian/denan/PDF/old_beppyou4.pdf"
MLIT_STANDARD = "https://www.mlit.go.jp/gobuild/content/001888825.pdf"


rows = {}
paths = {}
for path in DIR.glob("20240526-q*.json"):
    data = json.loads(path.read_text(encoding="utf-8"))
    for row in data:
        rows[row["number"]] = row
        paths[row["number"]] = path

targets = {8, 9, 10, 12, 19, 20, 21, 22, 23, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 45, 46, 47, 48, 49, 50}
for number in targets:
    refs = rows[number].setdefault("officialReferenceUrls", [])
    refs[:] = [url for url in dict.fromkeys(refs) if "shiken.or.jp" not in url]
    rows[number]["sourceQuestionPdfUrl"] = QUESTION
    rows[number]["sourceAnswerPdfUrl"] = ANSWER

# General academic and legal corrections.
q = rows[8]
q["explanation"] = "経済産業省『電気設備の技術基準の解釈』第146条第2項・146-1表で、直径2.0mmの600Vビニル絶縁電線（軟銅線）の基準許容電流は35A。周囲温度30℃以下では温度補正係数は1.0。設問指定の金属管内4本の電流減少係数0.63を乗じると、35A×1.0×0.63=22.05Aなので22Aとなる。"
q["choiceExplanations"]["イ"] = "17Aは直径1.6mmの基準許容電流27Aに0.63を掛けた17.01Aに相当し、設問の直径2.0mmを1.6mmと取り違えた値。"
q["choiceExplanations"]["ニ"] = "35Aは直径2.0mm軟銅線の基準許容電流（電流減少係数を掛ける前）。管内4本の係数0.63を反映していない。"

q = rows[5]
q["explanation"] = "図は三相3線式200V電源に各10Ωの抵抗3個をY結線した平衡負荷。相電圧は200/√3≒115.47V、相電流は115.47/10≒11.55A。Y結線では線電流と相電流が等しい。正確な値は約11.55Aで、選択肢の中で最も近いのはロの11.6A。"
q["choiceExplanations"]["イ"] = "8.3Aなら各10Ω抵抗の電圧は83Vとなり、正しい相電圧200/√3≒115.47Vとは一致しない。"
q["choiceExplanations"]["ロ"] = "相電圧=200/√3≒115.47V、相電流=線電流≒11.55A。選択肢で最も近い11.6Aが正しい。"
q["choiceExplanations"]["ハ"] = "14.3Aなら各10Ω抵抗の電圧は143Vとなり、正しい相電圧200/√3≒115.47Vとは一致しない。"
q["choiceExplanations"]["ニ"] = "線間電圧200Vを√3で割らずに200/10=20Aとした誤り。正しい線電流は約11.55A。"

q = rows[9]
q["question"] = q["question"].replace("電熱器（図中H）1台と電動機（図中M）2台", "電熱器Ⓗ1台と電動機Ⓜ2台")
q["explanation"] = q["explanation"].replace("第148条第二号・第五号", "第148条第1項第二号・第五号（イ・ロ）")

q = rows[10]
q["explanation"] = q["explanation"].split(" 配線用遮断器からコンセントまで")[0]
q["explanation"] += " 配線用遮断器からコンセントまで8mあり3mを超えるため、第149条第2項第一号ハ（イ）及び149-2表による1個のコンセントまでの電線太さの緩和は適用されない。したがって149-1表と149-3表で判定する。"
q["choiceExplanations"]["ハ"] = "20A遮断器に対する1.6mm以上という電線太さは満たすが、30Aコンセントは20A分岐回路の上限20Aを超えるため不適切。"
q["choiceExplanations"]["ニ"] = "30A遮断器に対する2.6mm以上という電線太さは満たすが、15Aコンセントは30A分岐回路に必要な20A以上30A以下を満たさない。"

q = rows[12]
q["explanation"] = "公式正答はロの60℃。経済産業省『電気設備の技術基準の解釈』第146条146-3表も、耐熱性を有しないビニル混合物について許容電流補正係数を√((60−θ)/30)（θは周囲温度）と定めており、周囲温度60℃で係数が0になる式である。"
q["choiceExplanations"]["イ"] = "146-3表に45℃を基準とする電線区分はなく、耐熱性を有しないビニル混合物の式は60℃を基準とするため誤り。"
q["choiceExplanations"]["ロ"] = "146-3表で耐熱性を有しないビニル混合物に用いる式は√((60−θ)/30)。本問のIVに対応する60℃が正答。"
q["choiceExplanations"]["ハ"] = "75℃を基準とする式は耐熱性を有するビニル混合物及び架橋しないポリエチレン混合物の区分であり、本問のIVの区分ではない。"
q["choiceExplanations"]["ニ"] = "90℃を基準とする式は架橋ポリエチレン混合物等の区分であり、本問のIVの区分ではない。"
q["officialReferenceUrls"] = [METI]

q = rows[19]
q["officialReferenceUrls"] = []
q["supplementalOfficialSourceUrls"] = [POINT]
q.pop("sourceForInternalQcOnly", None)

q = rows[20]
q["explanation"] = "経済産業省『電気設備の技術基準の解釈』第165条第3項では、ライティングダクトの支持点間距離は2m以下、終端部は閉そく、開口部は原則下向き、造営材を貫通しないことを定める。同項は、対地電圧150V以下で全長4m以下ならD種接地工事を省略できる。したがって100V・3.5mのハは適切で、壁を貫通させるニが不適切。"

q = rows[22]
q["explanation"] = "経済産業省『電気設備の技術基準の解釈』第167条第2項は、ケーブル工事による低圧屋内配線が弱電流電線又は水管等と接近又は交差する場合、接触しないように施設することを定める。cは10cm離して接触を避け、dは堅ろうな隔壁で接触を避けるため適切。接触しているa・bは不適切。"

q = rows[27]
q["explanation"] = "目盛板中央にはV、Vの下には波線、左下には姿勢記号と動作原理記号がある。公式問題原図と公式正答を照合すると、Vを電圧計とするイ、水平置きとするハ、交流回路用とするニは正しく、動作原理を永久磁石可動コイル形とするロが誤り。ロの判定は、原図の動作原理記号が永久磁石可動コイル形の記号ではないことによる。"
q["choiceExplanations"]["ロ"] = "原図左下の動作原理記号は、永久磁石可動コイル形を表す記号とは異なるため誤り。"
q["diagramDescription"] = "0、50、100、150の目盛を持つ測定器の目盛板。中央にVと波線、左下に動作原理記号、姿勢記号及び『1.0』の表示がある。"

q = rows[26]
q["explanation"] = q["explanation"].replace("『電気設備の技術基準の解釈』第17条では", "『電気設備の技術基準の解釈』第17条第4項では")

q = rows[28]
q["officialReferenceUrls"] = [
    "https://laws.e-gov.go.jp/law/335M50000400097/20231228_505M60000400063",
    "https://laws.e-gov.go.jp/law/335CO0000000260/20230401_504CO0000000365"]

q = rows[29]
q["officialReferenceUrls"] = [
    "https://www.meti.go.jp/policy/consumer/seian/denan/file/06_guide/hanbai.pdf",
    "https://laws.e-gov.go.jp/law/336AC0000000234"]

q = rows[30]
q["choiceExplanations"]["ニ"] = "『通常の使用状態で電気が通じているところ』は電路の定義。電線は強電流電気の伝送に使用する電気導体等をいうため、定義を取り違えたニが誤り。"

q = rows[16]
q["diagramDescription"] = "壁沿いに複数段の梯子状の金属支持材があり、矢印は下段のケーブルラックの曲がり部分を指す。"
q["officialReferenceUrls"] = [MLIT_STANDARD, METI]
q["explanation"] = "国土交通省『公共建築工事標準仕様書（電気設備工事編）令和7年版』1.2.8(2)は、はしご形ケーブルラックを親げたと子げたを接続したものと定める。公式写真の矢印は、左右の親げたに横向きの子げたを並べた開放形の支持材を指しており、この構造に一致するためロのケーブルラック。"
q["choiceExplanations"] = {
    "イ": "国交省仕様書1.2.7は、ふたの分割・位置や終端部の閉そく（分電盤等へ接続する場合を除く）を規定し、ふたで閉じる構造を前提とする。写真は子げたの間が開いた梯子形なので異なる。",
    "ロ": "左右の親げたと横向きの子げたからなる開放的な梯子形で、国交省仕様書のはしご形ケーブルラックの構造に一致する。",
    "ハ": "電技解釈第165条第3項第六号はライティングダクトの開口部を原則下向き（同号イ・ロの場合は横向き可）に施設すると定める。写真は上向きに開いた大形の梯子状支持材なので異なる。",
    "ニ": "電技解釈第161条の金属線ぴは、その内部に絶縁電線を収める設備。写真は多数のケーブルを上に載せる大形の梯子状支持材なので異なる。",
}

q = rows[17]
q["explanation"] = "公式写真には上部カバーと端子部、白・黒の線でつながるソケット本体が写る。キーや引きひもはなく、台座直付け形でもない。公式正答が示す名称は線付防水ソケット。"
q["choiceExplanations"] = {
    "イ": "写真に点滅操作用のキーは写っておらず、公式正答もキーソケットではない。",
    "ロ": "公式写真と公式正答が示す名称は線付防水ソケット。",
    "ハ": "写真に引きひもは写っておらず、公式正答もプルソケットではない。",
    "ニ": "写真はソケット本体が線で端子部から離れた構成で、公式正答はランプレセプタクルではない。",
}
q.pop("sourceForInternalQcOnly", None)

q = rows[25]
q["explanation"] = "絶縁抵抗測定は、開閉器を開いて被測定回路を電源から切り離し、電源電圧が加わっていない無電圧状態で行う。電源電圧が加わったままの測定は感電や計器・機器損傷、誤測定につながるためニが誤り。"

# Wiring-diagram questions: use the official paper/answer as the primary source;
# remove unrelated aviation documents that do not define these symbols.
for number in (31, 32, 34, 35, 37, 39, 45, 46, 47, 48, 49, 50):
    rows[number]["officialReferenceUrls"] = []
rows[33]["officialReferenceUrls"] = ["https://www.meti.go.jp/policy/consumer/seian/denan/kaishaku/gijutsukijunkaishaku/beppyoudai4.pdf"]
rows[36]["officialReferenceUrls"] = [METI]
rows[38]["officialReferenceUrls"] = ["https://laws.e-gov.go.jp/law/409M50000400052/20230320_504M60000400096", METI]
rows[38]["explanation"] = "⑧の引出線は平面図左下のⒼ回路を指す。Ⓖは1φ3W 100/200V電源から分岐した単相200V・20A回路で、BEからTSを経由する。電技解釈第24条第1項第一号イにより変圧器低圧側の中性点にはB種接地工事を施すため、この200V回路の各線と大地との間の電圧は100V。したがって使用電圧300V以下・対地電圧150V以下の区分になり、省令第58条による絶縁抵抗の最小値は0.1MΩ。"
rows[38]["choiceExplanations"]["イ"] = "電技解釈第24条により中性点が接地された1φ3W 100/200V電源から取る200V回路なので、対地電圧は100V。省令第58条の150V以下区分で0.1MΩが最小値。"

for number in (40, 41, 44):
    rows[number]["officialReferenceUrls"] = []

q = rows[40]
q["explanation"] = "⑩は⑲のジョイントボックスから、事務所右下（店舗側出入口付近）の『ア3』三路スイッチへ向かう配線区間。事務所左側にも『ア3』三路スイッチがあるため、両スイッチ間の渡り線2本と右側スイッチの共通端子につながる線1本が必要で、最少3心となる。"
q["diagramDescription"] = "平面図⑩は、⑲のジョイントボックスと事務所右下（店舗側出入口付近）の『ア3』三路スイッチを結ぶ配線を指す。事務所左側にも『ア3』三路スイッチがある。"

for number in (42, 43):
    rows[number].pop("supplementalOfficialSourceUrls", None)

q = rows[42]
q["choices"] = {
    "イ": "写真：灰褐色の樹脂製で、両端に細かな凹凸、中央に太い帯がある直線継手。",
    "ロ": "写真：銀色の金属製で、外周に複数の止めねじがある直線継手。",
    "ハ": "写真：滑らかな灰色の樹脂製で、中央に段がある直線継手。",
    "ニ": "写真：銀色の金属製で、片側内面にらせん状の溝、外周に止めねじがある継手。",
}
q["officialReferenceUrls"] = [MLIT_STANDARD]
q["explanation"] = "⑫の引出線は『600V CV 5.5-2C（VE28）』。国土交通省仕様書1.2.3はVEをJIS C 8430の硬質ポリ塩化ビニル電線管とし、地中管路について2.12.4(4)は管内に水が入りにくい接続を求める。同仕様書の硬質ビニル管相互の一般的な接続方法2.4.5(1)はTSカップリングに接着剤を塗布する方法。公式問題・正答でこの接続器具に示されるのは、滑らかな樹脂製直線継手のハ。"
q["choiceExplanations"] = {
    "イ": "両端に凹凸、中央に太い帯がある別形状の樹脂製継手で、滑らかな受口に接着剤を塗ってVE管を差し込むTSカップリングではない。",
    "ロ": "金属製で複数の止めねじにより管を保持する構造で、VE管相互を接着する樹脂製TSカップリングではない。",
    "ハ": "滑らかな樹脂製の受口へVE管を差し込み、接着剤で接続するTSカップリングの形状に一致する。",
    "ニ": "金属製で片側内面にらせん溝、外周に止めねじを持つ形であり、VE管相互を接着する滑らかな樹脂製TSカップリングではない。",
}
q["diagramDescription"] = "平面図下端の⑫は『600V CV 5.5-2C（VE28）』と傍記された管路を指す。4肢は、灰褐色で端部に凹凸がある樹脂製、複数の止めねじがある金属製、滑らかな灰色樹脂製、らせん溝と止めねじがある金属製の各直線継手。"

q = rows[43]
q["choices"] = {
    "イ": "写真：赤い柄の先に、銀色の調整部と歯付きのあごを持つ把持工具。",
    "ロ": "写真：赤い柄の、はさみ形の切断工具。",
    "ハ": "写真：円筒の内側に刃が並ぶ工具。",
    "ニ": "写真：取っ手付きの青い本体にバーナーノズルを備えた加熱工具。",
}
q["officialReferenceUrls"] = [MLIT_STANDARD]
q["explanation"] = "⑬の管路はVE28。国土交通省仕様書1.2.3によりVEは硬質ビニル管で、地中管路2.12.4(8)にも硬質ビニル管の敷設が規定される。同仕様書は硬質ビニル管工事の施工方法として、2.4.3(2)で切口の平滑化、同(5)で加熱曲げ、2.4.5(1)でTSカップリングと接着剤による管相互の接続を示す。したがって切断・面取り・加熱の工具は使用し得る一方、歯付きのあごで管やねじ接合部を回すイの把持工具はこの工事に一般的に用いず、公式正答もイ。"
q["diagramDescription"] = "⑬は共通配線図下端に『（VE28）』と傍記された管路を指す。肢の写真は順に歯付きのあごを持つ把持工具、はさみ形切断工具、円筒内側に刃を持つ面取り工具、バーナーノズルを備えた加熱工具。"
q["choiceExplanations"] = {
    "イ": "歯付きのあごで管やねじ接合部を回す工具。VE管相互はTSカップリングと接着剤で接続するため一般には用いない。",
    "ロ": "はさみ形の切断工具で、VE管を所要長さに切断する工程に用いる。切断後は切口を平滑にする。",
    "ハ": "円筒内側の刃で切断後の管端を整える工具。仕様書が求める切口の平滑化に用いる。",
    "ニ": "VE管を曲げるための加熱に用いる工具。仕様書も、管を加熱する場合は過熱や焼けこげを避けるよう定めている。",
}

q = rows[44]
q["explanation"] = "公式写真でイは漏れ電流測定用クランプメータ。⑭の回路の漏れ電流値を測定できる器具なのでイが正答。ロは回路計、ハは検電器、ニは絶縁抵抗計であり、それぞれ用途が異なる。"
q["choiceExplanations"]["イ"] = "漏れ電流値を測定するためのクランプメータなので正しい。"
q["choiceExplanations"]["ニ"] = "絶縁抵抗計は停電状態で電路の絶縁抵抗を測る器具で、通電中の漏れ電流値を測る器具ではない。"

q = rows[32]
q["choiceExplanations"]["イ"] = "②は白抜き円のコンセント記号で、床面用を示す床付けの表示がないため床面ではない。"
q["choiceExplanations"]["ニ"] = "②には二重床面用を示す表示がなく、白抜き円のコンセント記号として天井面取付けを示す。"

q = rows[33]
q["explanation"] = "平面図③には接地極付き20Aコンセントを示す『E20A』があり、接続先のⓘ回路は分電盤図で100V・20Aと指定されている。この条件に必要なのは100V系20A・接地極付きの刃受配置であり、公式問題の4図と公式正答を照合すると、縦向きL字刃受け・縦向き平刃受け・接地極を持つニが該当する。"
q["choiceExplanations"]["イ"] = "横向きL字刃受けを持つ20A・250V系の極配置で、100V回路の③には合わない。"
q["choiceExplanations"]["ロ"] = "縦向き平刃2本の15A・125V系の極配置で、20A指定の③には合わない。"
q["choiceExplanations"]["ハ"] = "横向き平刃2本の15A・250V系の極配置で、100V・20A指定の③には合わない。"
q["choiceExplanations"]["ニ"] = "縦向きL字刃受け、縦向き平刃受け、接地極を持つ20A・125V系の極配置で、100V・20Aの③に対応する。"
q["officialReferenceUrls"] = [METI_RECEPTACLE]

q = rows[35]
q["explanation"] = "⑤の傍記は『600V CV 5.5-2C (VE28)』。公式問題でVE28に対応する正答は、硬質ポリ塩化ビニル電線管の内径28mmを示すハ。28を外径と読むイ、可とう電線管とするロ・ニは一致しない。"
q["choiceExplanations"]["ハ"] = "VEは硬質ポリ塩化ビニル電線管で、設問のVE28に対応する内径28mmの選択肢。"
q["diagramDescription"] = "平面図下端で⑤は、一点鎖線に傍記された『600V CV 5.5-2C (VE28)』の部分を指す。"

q = rows[36]
q["explanation"] = q["explanation"].replace("『電気設備の技術基準の解釈』第17条の原則", "『電気設備の技術基準の解釈』第29条の接地工事区分によりD種となり、第17条のD種接地抵抗の原則")
q["diagramDescription"] = "⑥は電灯分電盤結線図の下にある接地記号を指す。電灯分電盤の電源は単相3線式100/200V、主幹はB 3P100A。"
q["explanation"] = q["explanation"].replace("第17条のD種接地抵抗の原則", "第17条第4項のD種接地抵抗の原則")

q = rows[37]
q["explanation"] = "⑦は電灯分電盤結線図で、6個のリモコンリレーの制御電源を置く破線位置を指す。公式正答ロの円内T・傍記Rの図記号が、この位置に入るリモコントランスを示す。"
q["choiceExplanations"]["イ"] = "円内TにBの図記号で、⑦に入る公式正答ロのT・Rとは傍記が異なる。"
q["choiceExplanations"]["ロ"] = "円内TにRの図記号。リモコンリレー6回路の制御電源を置く⑦に対応する。"
q["choiceExplanations"]["ハ"] = "黒丸にDの図記号で、⑦に入る変圧器の図記号T・Rではない。"
q["choiceExplanations"]["ニ"] = "黒丸にRの図記号で、⑦に入る変圧器の図記号T・Rではない。"

q = rows[39]
q["explanation"] = "平面図⑨の矢印は冷蔵庫回路cの右にある四角内の丸囲みSと傍記f20Aを指す。公式正答イのとおり、この器具の目的は過電流を遮断すること。地絡電流や不平衡電流を検出して遮断する器具ではない。"
q["choiceExplanations"]["ロ"] = "地絡電流の検出・遮断は漏電遮断器等の機能。⑨のヒューズ付き開閉器には、地絡電流を検出して遮断する機能がない。"
q["choiceExplanations"]["イ"] = "公式正答が示すとおり、⑨の目的は過電流を遮断すること。"
q["choiceExplanations"]["ロ"] = "⑨は地絡電流を検出して遮断する器具ではない。"
q["choiceExplanations"]["ハ"] = "⑨が遮断する目的は過電流であり、地絡電流の検出・遮断までを目的とする器具ではない。"
q["choiceExplanations"]["ニ"] = "⑨は不平衡電流を検出して遮断する器具ではない。"

q = rows[45]
q["explanation"] = "⑮は電灯分電盤結線図の三角記号と傍記『6』で示されたリモコンリレー6個の位置。二重丸a〜fはすべて単相200V回路で、単相3線式の200V回路では両線が非接地側となるため2極を開閉する。写真ニは『主回路側』に2組の接点記号と4端子があり、写真ハは1組・2端子なので、ニが2極リモコンリレーに対応する。"
q["choiceExplanations"]["ハ"] = "『主回路側』の接点記号が1組で端子が2点の1極リモコンリレー。⑮の単相200V回路を両極開閉する器具ではない。"
q["choiceExplanations"]["ニ"] = "『主回路側』の接点記号が2組で端子が4点の2極リモコンリレー。⑮の単相200V回路に対応する。"

q = rows[47]
q["explanation"] = "平面図⑰が指すのは、トイレと手洗場の仕切り付近で●が2つ並び、傍記L・エオがある箇所。Lは確認表示灯内蔵スイッチを示す。ニの接点図ではスイッチの負荷側から表示灯へ分岐し、負荷ON時に表示灯が点灯する。"
q["diagramDescription"] = "共通配線図⑰の矢印は、トイレ・手洗場の仕切り付近で●が2つ並び、傍記L・エオがある箇所を指す。肢の接点図は順に3路、接点と並列ランプ、ランプなし片切、負荷側にランプ付き片切。"

q = rows[48]
q["explanation"] = "⑱にはVVF2.0-3Cが3本（上の2E、分電盤ⓒ、下の2E）とVVF2.0-2Cが1本（左の照明側ボックス）入る。非接地側・接地側はそれぞれ2.0mm×4本、接地線は2.0mm×3本を接続するため、3接続点はいずれも中スリーブ。必要数は中3個。"
q["choiceExplanations"]["ハ"] = "接続は2.0mm×4本が2か所、2.0mm×3本が1か所で、いずれも小スリーブの適用範囲を超える。"
q["diagramDescription"] = "⑱にはVVF2.0-3Cが3本（上の2E、右の分電盤ⓒ、下の2E）とVVF2.0-2Cが1本（左の照明側ボックス）入る。肢は大3、中3、小3、大2＋中1。"
q["supplementalOfficialSourceUrls"] = [POINT]

q = rows[46]
q["supplementalOfficialSourceUrls"] = [POINT]
q["explanation"] = "⑯は電灯分電盤の接地線E5.5を指す。試験センター資料はE形を終端重合せ用リングスリーブ、黄色ハンドルをリングスリーブ用工具と示す。設問が求める直線重合せ接続では公式正答ニのP形と赤色ハンドルの圧着工具を組み合わせる。"
q["choiceExplanations"]["イ"] = "黄色工具とE形は終端重合せ用の組合せで、設問の直線重合せ接続ではない。"
q["choiceExplanations"]["ロ"] = "P形は設問の直線重合せに対応するが、黄色工具は試験センター資料でE形リングスリーブ用とされるため工具が合わない。"
q["choiceExplanations"]["ハ"] = "赤色工具側でも、E形は試験センター資料で終端重合せ用とされ、設問の直線重合せに合わない。"
q["choiceExplanations"]["ニ"] = "公式正答が示す、直線重合せ用P形と赤色ハンドルの圧着工具の組合せ。"

q = rows[49]
q["supplementalOfficialSourceUrls"] = [POINT]

q = rows[50]
q["explanation"] = "共通配線図にはイに対応する『2E』、ロに対応する『LK』、ハに対応する『EET』が実際に描かれている。一方、ニの写真と同じ4差込口の多極コンセントに対応する図記号・傍記は配線図のどこにもない。したがって未使用はニ。"
q["choiceExplanations"]["ニ"] = "ニの4差込口の多極コンセントに対応する図記号・傍記は共通配線図にないため、使用されていない。"
q["choiceExplanations"]["ロ"] = "カウンター2か所に1口の『LK』があり、写真ロの抜け止め形コンセントに対応する。屋外の『2 LK EET WP』は複数の傍記を持つ別仕様の器具である。"
q["choiceExplanations"]["ハ"] = "左上区画に1口の『EET』があり、写真ハの接地極・接地端子付コンセントに対応する。"
q["choiceExplanations"]["ニ"] = "写真だけではニの正確な規格・定格までは特定しない。ただし同じ4差込口の器具に対応する図記号・傍記は共通配線図にないため、使用されていない。"

# Remove the clipped remnants of the printed choice labels while preserving
# each official product photograph and its quantity annotation.
panels = ((307, 521), (529, 744), (752, 968), (974, 1188))
for number in (41, 42, 43):
    source = ROOT / f"data/raw_pdfs/denko2/review/20240526/q{number:02}.png"
    with Image.open(source) as original:
        for (label, slug), (left, right) in zip(
                (("イ", "i"), ("ロ", "ro"), ("ハ", "ha"), ("ニ", "ni")), panels):
            target = ROOT / f"public/images/denko2/2024-first/q{number}-{slug}.png"
            original.crop((left, 38, right, original.height - 18)).save(target)

# Persist each five-question file once.
for path in sorted(set(paths.values())):
    data = sorted((row for n, row in rows.items() if paths[n] == path), key=lambda item: item["number"])
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

print(f"corrected {len(targets)} strict-audit targets")
