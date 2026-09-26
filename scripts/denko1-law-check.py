"""Verify Denko1 law/rule statements against primary sources and write receipts.

Usage: py -3.12 scripts/denko1-law-check.py [--root <repo>] [--kaishaku <downloaded dengikaishaku.pdf>]

METI's site sometimes answers scripted requests with an empty 202 challenge. In
that case pass a copy of the same PDF downloaded from the official URL; the
receipt records its sha256 and that it was supplied locally.

Sources are fetched live: the METI 「電気設備の技術基準の解釈」 PDF and e-Gov law
XML (API v1). Every clause below must appear verbatim (whitespace removed) in
the fetched text, otherwise the receipt is written with `unresolved` entries and
the script exits non-zero. Receipts pin the sha256 of each fetched document.
"""

from datetime import datetime, timezone
from hashlib import sha256
import json
from pathlib import Path
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET

import fitz  # PyMuPDF

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36"
KAISHAKU = "https://www.meti.go.jp/policy/safety_security/industrial_safety/law/files/dengikaishaku.pdf"
EGOV = {
    "電気工事士法": "335AC0000000139",
    "電気工事業の業務の適正化に関する法律": "345AC1000000096",
    "電気用品安全法": "336AC0000000234",
    "電気用品安全法施行令": "337CO0000000324",
    "電気用品安全法施行規則": "337M50000400084",
    "電気事業法": "339AC0000000170",
}

# Public technical documents for practice values that the (non-public) 高圧受電設備規程 also covers.
PDF_SOURCES = {
    "横浜市 電気設備工事施工マニュアル 第3編 受変電設備工事": "https://www.city.yokohama.lg.jp/business/nyusatsu/youshiki/kenchiku/denki_sekoumanyuaru.files/0011_20230725.pdf",
    "大阪府 共通仕様書 第3編 電気設備工事": "https://www.pref.osaka.lg.jp/documents/61933/0509kyoutusiyousyodennkisetsubi.pdf",
    "エナジーサポート 高圧カットアウト カタログ": "https://www.energys.co.jp/denzai/pdf/catalog_05_pc.pdf",
}

# question -> list of (label, source, [clauses], note). `source` is "解釈" or an e-Gov law title,
# optionally suffixed with "#別表第一" etc. to restrict matching to that appended table.
CHECKS: dict[int, list[tuple[str, str, list[str], str]]] = {
    27: [
        ("支持点間", "解釈", ["【特殊な低圧屋内配線工事】", "3ライティングダクト工事による低圧屋内配線は、次の各号によること。", "四ダクトの支持点間の距離は、2m以下とすること。"], "イの1.5mは2m以下。"),
        ("終端部", "解釈", ["五ダクトの終端部は、閉そくすること。六ダクトの開口部は、下に向けて施設すること。"], "ロのエンドキャップ。"),
        ("開口部", "解釈", ["六ダクトの開口部は、下に向けて施設すること。ただし、次のいずれかに該当する場合は、横に向けて施設することができる。イ簡易接触防護措置を施し、かつ、ダクトの内部にじんあいが侵入し難いように施設する場合ロ日本産業規格JISC8366（2012）「ライティングダクト」の「5性能」、「6構造」及び「8材料」の固定Ⅱ形に適合するライティングダクトを使用する場合"], "下向きが原則、条件付きで横向き。上向きは認められない。"),
        ("接地", "解釈", ["八ダクトには、D種接地工事を施すこと。ただし、次のいずれかに該当する場合は、この限りでない。（関連省令第10条、第11条）イ合成樹脂その他の絶縁物で金属製部分を被覆したダクトを使用する場合ロ対地電圧が150V以下で、かつ、ダクトの長さ（2本以上のダクトを接続して使用する場合は、その全長をいう。）が4m以下の場合"], "ハのD種接地工事と省略条件。"),
        ("条番号", "解釈", ["（省令第56条第1項、第57条第1項、第64条）第165条フロアダクト工事による低圧屋内配線は"], "第165条。"),
    ],
    28: [
        ("条・項番号", "解釈", ["【金属管工事】（省令第56条第1項、第57条第1項）第159条金属管工事による低圧屋内配線の電線は", "3金属管工事に使用する金属管及びボックスその他の附属品は、次の各号により施設すること。"], "第159条第3項。"),
        ("D種省略条件", "解釈", ["四低圧屋内配線の使用電圧が300V以下の場合は、管には、D種接地工事を施すこと。ただし、次のいずれかに該当する場合は、この限りでない。",
                               "イ管の長さ（2本以上の管を接続して使用する場合は、その全長。以下この条において同じ。）が4m以下のものを乾燥した場所に施設する場合",
                               "ロ屋内配線の使用電圧が直流300V又は交流対地電圧150V以下の場合において、その電線を収める管の長さが8m以下のものに簡易接触防護措置（金属製のものであって、防護措置を施す管と電気的に接続するおそれがあるもので防護する方法を除く。）を施すとき又は乾燥した場所に施設するとき"], "全長5mは4m超。8m以下の緩和は対地電圧150V以下等に限る。"),
        ("防湿装置", "解釈", ["三湿気の多い場所又は水気のある場所に施設する場合は、防湿装置を施すこと。"], "ロ。"),
        ("ブッシング", "解釈", ["二管の端口には、電線の被覆を損傷しないように適当な構造のブッシングを使用すること。"], "ハ。"),
        ("300V超", "解釈", ["五低圧屋内配線の使用電圧が300Vを超える場合は、管には、C種接地工事を施すこと。ただし、接触防護措置（金属製のものであって、防護措置を施す管と電気的に接続するおそれがあるもので防護する方法を除く。）を施す場合は、D種接地工事によることができる。"], "ニ。"),
    ],
    29: [
        ("電線", "解釈", ["【金属線ぴ工事】", "第161条金属線ぴ工事による低圧屋内配線の電線は、次の各号によること。一絶縁電線（屋外用ビニル絶縁電線を除く。）であること。"], "ケーブルに限定されない。"),
        ("附属品", "解釈", ["2金属線ぴ工事に使用する金属製線ぴ及びボックスその他の附属品（線ぴ相互を接続するもの及び線ぴの端に接続するものに限る。）は、次の各号のいずれかに適合するものであること。一電気用品安全法の適用を受ける金属製線ぴ及びボックスその他の附属品であること。"], "第2項第一号。ロ。"),
        ("接続", "解釈", ["3金属線ぴ工事に使用する金属製線ぴ及びボックスその他の附属品は、次の各号により施設すること。一線ぴ相互及び線ぴとボックスその他の附属品とは、堅ろうに、かつ、電気的に完全に接続すること。"], "第3項第一号。ニ。"),
        ("D種省略条件", "解釈", ["二線ぴには、D種接地工事を施すこと。ただし、次のいずれかに該当する場合は、この限りでない。",
                               "イ線ぴの長さ（2本以上の線ぴを接続して使用する場合は、その全長をいう。以下この条において同じ。）が4m以下のものを施設する場合",
                               "ロ屋内配線の使用電圧が直流300V又は交流対地電圧が150V以下の場合において、その電線を収める線ぴの長さが8m以下のものに簡易接触防護措置（金属製のものであって、防護措置を施す線ぴと電気的に接続するおそれがあるもので防護する方法を除く。）を施すとき又は乾燥した場所に施設するとき"], "第3項第二号。12mは4m超かつ8m超でD種接地工事が必要。"),
    ],
    31: [
        ("引込線", "解釈", ["【高圧架空引込線等の施設】（省令第6条、第20条、第21条第1項、第25条第1項、第28条、第29条、第37条）第117条高圧架空引込線は、次の各号により施設すること。", "三電線がケーブルである場合は、第67条の規定に準じて施設すること。",
                          "四電線の高さは、第68条第1項の規定に準じること。ただし、次に適合する場合は、地表上3.5m以上とすることができる。"], "3mは3.5m未満。"),
        ("高さ", "解釈", ["【低高圧架空電線の高さ】", "その他の場合地表上5m"], "道路等以外は地表上5m。"),
        ("ハンガー", "解釈", ["二高圧架空電線を前号イの方法により施設する場合は、ハンガーの間隔は50cm以下であること。"], "ロの0.5m。"),
        ("接地", "解釈", ["四ちょう架用線及びケーブルの被覆に使用する金属体には、D種接地工事を施すこと。"], "ハ。"),
        ("安全率", "解釈", ["第67条低圧架空電線又は高圧架空電線にケーブルを使用する場合は、次の各号によること。", "五高圧架空電線のちょう架用線は、次に規定する荷重が加わる場合における引張強さに対する安全率が、67-1表に規定する値以上となるような弛度により施設すること。", "67-1表ちょう架用線の種類安全率硬銅線又は耐熱銅合金線2.2その他2.5"], "イの2.5以上。"),
    ],
    32: [
        ("施設箇所", "解釈", ["【避雷器等の施設】（省令第49条）第37条高圧及び特別高圧の電路中、次の各号に掲げる箇所又はこれに近接する箇所には、避雷器を施設すること。", "三高圧架空電線路から電気の供給を受ける受電電力が500kW以上の需要場所の引込口"], "ニ。"),
        ("接地", "解釈", ["3高圧及び特別高圧の電路に施設する避雷器には、A種接地工事を施すこと。"], "避雷器の接地。"),
    ],
    33: [
        ("支持点間", "解釈", ["【バスダクト工事】", "二ダクトを造営材に取り付ける場合は、ダクトの支持点間の距離を3m（取扱者以外の者が出入りできないように措置した場所において、垂直に取り付ける場合は、6m）以下とし、堅ろうに取り付けること。"], "ロの5mは3m超。"),
        ("じんあい", "解釈", ["四ダクト（換気型のものを除く。）の内部にじんあいが侵入し難いようにすること。"], "ニ。"),
        ("接地", "解釈", ["六低圧屋内配線の使用電圧が300V以下の場合は、ダクトには、D種接地工事を施すこと。"], "210VでD種。"),
        ("条番号", "解釈", ["【バスダクト工事】（省令第56条第1項、第57条第1項）第163条バスダクト工事による低圧屋内配線は、次の各号によること。"], "第163条第1項。"),
        ("施設場所", "解釈", ["【低圧屋内配線の施設場所による工事の種類】（省令第56条第1項）第156条低圧屋内配線は、次の各号に掲げるものを除き、156-1表に規定する工事のいずれかにより施設すること。",
                            "156-1表施設場所の区分使用電圧の区分工事の種類がいし引き工事合成樹脂管工事金属管工事金属可とう電線管工事金属線ぴ工事金属ダクト工事バスダクト工事ケーブル工事フロアダクト工事セルラダクト工事ライティングダクト工事平形保護層工事展開した場所乾燥した場所300V以下○○○○○○○○○"], "展開した場所・乾燥した場所・300V以下の欄にバスダクト工事の○がある(9個の○はがいし引き〜ケーブル工事とライティングダクト工事)。"),
    ],
    34: [
        ("電線の許容電流", "解釈", ["【低圧分岐回路等の施設】（省令第56条第1項、第57条第1項、第59条第1項、第63条第1項）第149条低圧分岐回路には、", "2低圧分岐回路は、次の各号により施設すること。", "二電動機又はこれに類する起動電流が大きい電気機械器具（以下この条において「電動機等」という。）のみに至る低圧分岐回路は、次によること。",
                                 "ロ電線の許容電流は、間欠使用その他の特殊な使用方法による場合を除き、その部分を通じて供給される電動機等の定格電流の合計を1.25倍（当該電動機等の定格電流の合計が50Aを超える場合は、1.1倍）した値以上であること。"], "ロ・ハ。"),
    ],
    35: [
        ("B種接地", "解釈", ["第24条高圧電路又は特別高圧電路と低圧電路とを結合する変圧器には、次の各号によりB種接地工事を施すこと。一次のいずれかの箇所に接地工事を施すこと。（関連省令第10条）イ低圧側の中性点ロ低圧電路の使用電圧が300V以下の場合において、接地工事を低圧側の中性点に施し難いときは、低圧側の1端子"], "B種は外箱の接地ではない。"),
        ("接地区分", "解釈", ["【機械器具の金属製外箱等の接地】（省令第10条、第11条）第29条電路に施設する機械器具の金属製の台及び外箱（以下この条において「金属製外箱等」という。）（外箱のない変圧器又は計器用変成器にあっては、鉄心）には、使用電圧の区分に応じ、29-1表に規定する接地工事を施すこと。",
                             "29-1表機械器具の使用電圧の区分接地工事低圧300V以下D種接地工事300V超過C種接地工事高圧又は特別高圧A種接地工事"], "6kVはA種。"),
    ],
    38: [
        ("電気工事士法", "電気工事士法", ["第一条この法律は、電気工事の作業に従事する者の資格及び義務を定め、もつて電気工事の欠陥による災害の発生の防止に寄与することを目的とする。"], "イ。"),
        ("電気工事業法", "電気工事業の業務の適正化に関する法律", ["第一条この法律は、電気工事業を営む者の登録等及びその業務の規制を行うことにより、その業務の適正な実施を確保し、もつて一般用電気工作物等及び自家用電気工作物の保安の確保に資することを目的とする。"], "ロは電気工事士の作業の規制としており誤り。"),
        ("電気用品安全法", "電気用品安全法", ["第一条この法律は、電気用品の製造、販売等を規制するとともに、電気用品の安全性の確保につき民間事業者の自主的な活動を促進することにより、電気用品による危険及び障害の発生を防止することを目的とする。"], "ハ。"),
        ("電気事業法", "電気事業法", ["第一条この法律は、電気事業の運営を適正かつ合理的ならしめることによつて、電気の使用者の利益を保護し、及び電気事業の健全な発達を図るとともに、電気工作物の工事、維持及び運用を規制することによつて、公共の安全を確保し、及び環境の保全を図ることを目的とする。"], "ニ。"),
    ],
    39: [
        ("電気便座", "電気用品安全法施行令#別表第一", ["六電熱器具であつて、次に掲げるもの（定格電圧が一〇〇ボルト以上三〇〇ボルト以下及び定格消費電力が一〇キロワット以下のものであつて、交流の電路に使用するものに限る。）", "（一）電気便座"], "別表第一(特定電気用品)に電気便座。100V・56Wは範囲内。"),
        ("特定電気用品の定義", "電気用品安全法", ["（定義）第二条この法律において「電気用品」とは、次に掲げる物をいう。", "２この法律において「特定電気用品」とは、構造又は使用方法その他の使用状況からみて特に危険又は障害の発生するおそれが多い電気用品であつて、政令で定めるものをいう。"], "第2条第2項。ニは誤り。"),
        ("使用の制限", "電気用品安全法", ["第二十八条電気事業法第二条第一項第十七号に規定する電気事業者",
                                      "電気工事士法（昭和三十五年法律第百三十九号）第二条第四項に規定する電気工事士",
                                      "第十条第一項の表示が付されているものでなければ、電気用品を電気事業法第二条第一項第十八号に規定する電気工作物の設置又は変更の工事に使用してはならない。"], "ハは適法。"),
        ("表示記号", "電気用品安全法施行規則", ["別表第六特定電気用品に表示する記号（第１７条関係）電線、ヒューズ、配線器具等の部品材料であつて構造上表示スペースを確保することが困難なものにあつては、本記号に代えて＜ＰＳ＞Ｅとすることができる。",
                                          "別表第七特定電気用品以外の電気用品に表示する記号（第１７条関係）電線、電線管類及びその附属品、ヒューズ、配線器具等の部品材料であつて構造上表示スペースを確保することが困難なものにあつては、本記号に代えて（ＰＳ）Ｅとすることができる。"], "(PS)Eは特定電気用品以外。"),
    ],
    40: [
        ("通知電気工事業者", "電気工事業の業務の適正化に関する法律", ["３この法律において「登録電気工事業者」とは次条第一項又は第三項の登録を受けた者を、「通知電気工事業者」とは第十七条の二第一項の規定による通知をした者を、「電気工事業者」とは登録電気工事業者及び通知電気工事業者をいう。",
                                                               "第十七条の二自家用電気工作物に係る電気工事（以下「自家用電気工事」という。）のみに係る電気工事業を営もうとする者は、経済産業省令で定めるところにより、その事業を開始しようとする日の十日前までに"], "通知電気工事業者は自家用電気工事のみの電気工事業者。"),
        ("主任電気工事士", "電気工事業の業務の適正化に関する法律", ["第十九条登録電気工事業者は、その一般用電気工作物等に係る電気工事（以下「一般用電気工事」という。）の業務を行う営業所（以下この条において「特定営業所」という。）ごとに"], "設置義務は登録電気工事業者。"),
        ("器具", "電気工事業の業務の適正化に関する法律", ["第二十四条電気工事業者は、その営業所ごとに、絶縁抵抗計その他の経済産業省令で定める器具を備えなければならない。"], "イ。"),
        ("標識", "電気工事業の業務の適正化に関する法律", ["第二十五条電気工事業者は、経済産業省令で定めるところにより、その営業所及び電気工事の施工場所ごとに、その見やすい場所に、氏名又は名称、登録番号その他の経済産業省令で定める事項を記載した標識を掲げなければならない。"], "ハ。"),
        ("帳簿", "電気工事業の業務の適正化に関する法律", ["第二十六条電気工事業者は、経済産業省令で定めるところにより、その営業所ごとに帳簿を備え、その業務に関し経済産業省令で定める事項を記載し、これを保存しなければならない。"], "ロ。"),
    ],
    21: [
        ("屋外キュービクルの保有距離", "横浜市 電気設備工事施工マニュアル 第3編 受変電設備工事", ["＊２屋外に設ける場合、キュービクルの周囲の保有距離は扉幅（１ｍ未満の場合は１ｍ）＋保安上有効な距離以上とする。", "保安上有効な距離とは、人の移動に支障をきたさない距離をいう。"], "0.1m+保安上有効な距離は、1m以上+保安上有効な距離に満たない。"),
    ],
    48: [
        ("PCの適用容量", "エナジーサポート 高圧カットアウト カタログ", ["高圧カットアウト高圧配電線路または変圧器（300kVAまで）又はコンデンサ（75kVA）の一次側開閉", "Aトランス保護用として使用する場合※トランス容量300kVA以下まで対応可能"], "500kV・Aの変圧器はPCの適用範囲外。"),
    ],
    45: [
        ("A種接地工事の接地線", "解釈", ["【接地工事の種類及び施設方法】（省令第11条）第17条A種接地工事は、次の各号によること。", "ロハに規定する場合を除き、引張強さ1.04kN以上の容易に腐食し難い金属線又は直径2.6mm以上の軟銅線であること。"], "解釈のA種接地線の最低条件は直径2.6mm以上の軟銅線等で、14mm²は定めていない。"),
        ("避雷器の接地線", "大阪府 共通仕様書 第3編 電気設備工事", ["(1)Ａ種接地工事は次による。1)高圧の場合の接地線の太さは、表32による。", "2)接地母線及び避雷器は、14mm2以上とする。"], "避雷器の接地線は14mm²以上。"),
        ("避雷器の断路", "エナジーサポート 高圧カットアウト カタログ", ["また素通し線を用いることでアレスターの一次側断路器としても利用できます。"], "避雷器の一次側には断路器(ヒューズを入れない素通し)を用いる。"),
        ("避雷器の接地", "解釈", ["【避雷器等の施設】（省令第49条）第37条高圧及び特別高圧の電路中、次の各号に掲げる箇所又はこれに近接する箇所には、避雷器を施設すること。", "3高圧及び特別高圧の電路に施設する避雷器には、A種接地工事を施すこと。"], "第37条第3項。避雷器はA種接地工事。"),
    ],
    49: [
        ("接地区分", "解釈", ["【機械器具の金属製外箱等の接地】（省令第10条、第11条）第29条電路に施設する機械器具の金属製の台及び外箱（以下この条において「金属製外箱等」という。）（外箱のない変圧器又は計器用変成器にあっては、鉄心）には、使用電圧の区分に応じ、29-1表に規定する接地工事を施すこと。", "29-1表機械器具の使用電圧の区分接地工事低圧300V以下D種接地工事300V超過C種接地工事高圧又は特別高圧A種接地工事"], "高圧の機械器具はA種。"),
        ("B種接地", "解釈", ["第24条高圧電路又は特別高圧電路と低圧電路とを結合する変圧器には、次の各号によりB種接地工事を施すこと。一次のいずれかの箇所に接地工事を施すこと。（関連省令第10条）イ低圧側の中性点ロ低圧電路の使用電圧が300V以下の場合において、接地工事を低圧側の中性点に施し難いときは、低圧側の1端子"], "B種は低圧側の中性点又は1端子。"),
    ],
}


def fetch(url: str) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*", "Accept-Language": "ja"})
    with urllib.request.urlopen(request, timeout=120) as response:
        return response.read()


def squash(text: str) -> str:
    return re.sub(r"\s+", "", text)


def egov_texts(raw: bytes) -> dict[str, str]:
    root = ET.fromstring(raw)
    body = squash("".join(root.itertext()))
    texts = {"": body}
    for table in root.iter("AppdxTable"):
        title = table.find("AppdxTableTitle")
        name = squash("".join(title.itertext())) if title is not None else ""
        if name and name not in texts:  # the first occurrence is the current main-provision table
            texts[name] = squash("".join(table.itertext()))
    return texts


def main() -> None:
    root = Path(sys.argv[sys.argv.index("--root") + 1]) if "--root" in sys.argv else Path(__file__).resolve().parents[1]
    out_dir = root / "docs/evidence/denko1-law"
    out_dir.mkdir(parents=True, exist_ok=True)
    checked = datetime.now(timezone.utc).isoformat()
    sources: dict[str, dict] = {}
    raw = fetch(KAISHAKU)
    fetched_via = "direct-download"
    if not raw.startswith(b"%PDF"):
        if "--kaishaku" not in sys.argv:
            raise ValueError("METI 解釈 PDF could not be fetched; pass --kaishaku <downloaded pdf>")
        raw = Path(sys.argv[sys.argv.index("--kaishaku") + 1]).read_bytes()
        fetched_via = "official-url-download-supplied-locally"
        if not raw.startswith(b"%PDF"):
            raise ValueError("Supplied 解釈 file is not a PDF")
    doc = fitz.open(stream=raw, filetype="pdf")
    sources["解釈"] = {"title": "電気設備の技術基準の解釈", "url": KAISHAKU, "sha256": sha256(raw).hexdigest(),
                      "texts": {"": squash("".join(page.get_text() for page in doc))},
                      "fetchedVia": fetched_via, "revision": next((line.strip() for line in reversed(doc[0].get_text().splitlines()) if line.startswith("改正")), "")}
    for title, url in PDF_SOURCES.items():
        data = fetch(url)
        if not data.startswith(b"%PDF"):
            raise ValueError(f"{title} could not be fetched")
        pdf = fitz.open(stream=data, filetype="pdf")
        sources[title] = {"title": title, "url": url, "sha256": sha256(data).hexdigest(),
                          "texts": {"": squash("".join(page.get_text() for page in pdf))}}
    for title, law_id in EGOV.items():
        api = f"https://laws.e-gov.go.jp/api/1/lawdata/{law_id}"
        data = fetch(api)
        sources[title] = {"title": title, "url": f"https://laws.e-gov.go.jp/law/{law_id}", "apiUrl": api,
                          "sha256": sha256(data).hexdigest(), "texts": egov_texts(data)}
    failures = 0
    for number, checks in CHECKS.items():
        receipt = {"schemaVersion": 1, "question": f"20260401-q{number:02}", "status": "official-source-verified",
                   "checkedAtUtc": checked, "sources": {}, "checks": {}, "unresolved": []}
        for label, source_key, clauses, note in checks:
            name, _, table = source_key.partition("#")
            source = sources[name]
            text = source["texts"].get(squash(table), None) if table else source["texts"][""]
            receipt["sources"][name] = {k: v for k, v in source.items() if k != "texts"}
            missing = [clause for clause in clauses if text is None or squash(clause) not in text]
            receipt["checks"][label] = {"source": name + (f" {table}" if table else ""), "clauses": clauses, "applies": note}
            if missing:
                receipt["unresolved"].extend(f"{label}: {clause}" for clause in missing)
        if receipt["unresolved"]:
            receipt["status"] = "unresolved"
            failures += 1
        path = out_dir / f"20260401-q{number:02}.json"
        if path.exists():
            previous = json.loads(path.read_text(encoding="utf-8"))
            if {k: v for k, v in previous.items() if k != "checkedAtUtc"} == {k: v for k, v in receipt.items() if k != "checkedAtUtc"}:
                print(f"Q{number}: unchanged since {previous.get('checkedAtUtc')}")
                continue
        path.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"Q{number}: {receipt['status']} {receipt['unresolved']}")
    if failures:
        raise SystemExit(f"{failures} receipt(s) unresolved")


if __name__ == "__main__":
    main()
