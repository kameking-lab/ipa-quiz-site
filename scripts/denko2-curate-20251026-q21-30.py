"""Prepare 2025 lower Q21–30 with text-first choices and figure-only crops."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data/raw_pdfs/denko2/review/batches"
TARGET = ROOT / "data/questions/denko2/reviewed"
METI = "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/20231226-2.pdf"
METI_PSE = "https://www.meti.go.jp/policy/consumer/seian/denan/file/06_guide/seller_guide.pdf"
METI_NON_SPECIFIED = "https://www.meti.go.jp/policy/consumer/seian/denan/non_specified_electrical.html"
EGOV_PSE_ORDER = "https://laws.e-gov.go.jp/law/337CO0000000324/"
EGOV_ELECTRIC_BUSINESS = "https://laws.e-gov.go.jp/law/339AC0000000170"
EGOV_ELECTRICIAN = "https://laws.e-gov.go.jp/law/335AC0000000139"
EGOV_ELECTRICAL_PRODUCTS = "https://laws.e-gov.go.jp/law/336AC0000000234"

parts = [json.loads((SOURCE / f"20251026-q21-30-vision-part{part:02}.json").read_text(encoding="utf-8"))
         for part in (1, 2)]
questions = {item["number"]: item for part in parts for item in part}
if set(questions) != set(range(21, 31)):
    raise ValueError("Expected questions 21–30")
for number, item in questions.items():
    item["reviewedFromCrop"] = f"data/raw_pdfs/denko2/review/20251026/q{number:02}.png"
    item["uncertainty"] = ""

for number in (21, 22, 25):
    questions[number]["officialReferenceUrls"] = [METI]

q = questions[21]
q["explanation"] = "経済産業省『電気設備の技術基準の解釈』第160条は、1種金属製可とう電線管を使える場所を『展開した場所又は点検できる隠ぺい場所であって、乾燥した場所』などに限定する。湿気の多い場所で1種を使うイは不適切。"
q["choiceExplanations"]["イ"] = "不適切で正解。第160条では1種金属製可とう電線管の施設条件に乾燥した場所を要求し、湿気の多い場所は外れる。"
q["choiceExplanations"]["ニ"] = "金属管は原則としてD種接地が必要だが、第159条の例外で、長さ4m以下のものを乾燥した場所に施設すると省略できる。3mは該当する。"

q = questions[22]
q["explanation"] = "電技解釈第29条の漏電遮断器による機械器具の接地省略は、定格感度電流15mA以下かつ動作時間0.1秒以下が条件で、問題の30mAは満たさない。イの対地電圧200Vの電動機鉄台は、同条の150V以下・乾燥場所にも、乾燥した木製床等の絶縁性の場所にも当たらない。ロは木製床、ハ・ニは金属管の短長に関する別の省略条件を満たす。"
q["choiceExplanations"]["イ"] = "省略できず正解。電動機の対地電圧200Vは乾燥場所での150V以下の例外から外れ、コンクリート床は木製床等の絶縁性の例外にも当たらない。30mAの漏電遮断器も15mA以下という省略条件を満たさない。"
q["choiceExplanations"]["ロ"] = "乾燥した木製床の上で扱う低圧機械器具なので、第29条の接地省略条件に当たる。"
q["choiceExplanations"]["ハ"] = "乾燥場所、対地電圧100V、長さ7mの金属管は、第159条の対地電圧150V以下・長さ8m以下の省略条件に当たる。"
q["choiceExplanations"]["ニ"] = "乾燥場所で長さ3mの金属管は、第159条の長さ4m以下の省略条件に当たる。"

q = questions[23]
q["choices"] = {
    "イ": "三相3線式電源から三相負荷へ3線を同一管に、単相負荷へ2線を別の同一管に収める配線図",
    "ロ": "単相2線式の往路側と復路側を2本の金属管に分け、それぞれから2つの負荷へつなぐ配線図",
    "ハ": "単相3線式の上側負荷への2線を同一管に、下側負荷への2線を1本ずつ別管に分ける配線図",
    "ニ": "三相3線式の3線をそれぞれ別々の金属管に通し、1つの三相負荷へつなぐ配線図",
}
q["explanation"] = "金属管に流れる電線の電流が作る磁束を打ち消すため、ひとつの負荷の往路・復路となる電線群を同じ管内に収める。イでは三相負荷の3線が上の管内、単相負荷の2線が下の管内で、それぞれ電流が相殺される。"
q["choiceExplanations"] = {
    "イ": "正解。上の管には三相負荷を構成する3線、下の管には単相負荷を構成する2線を入れ、各管内で電流の和が零になる。",
    "ロ": "誤り。単相2線式の往路と復路を別の金属管に分けると、各管内で電流の磁束が相殺されない。",
    "ハ": "誤り。下側負荷の往路と復路が別管になっており、一方の金属管だけでは電流が打ち消し合わない。",
    "ニ": "誤り。三相の3線が1本ずつ別管なので、各管の磁束が相殺されず、電磁的不平衡を生じる。",
}
q["diagramDescription"] = "4肢は各金属管を点線入りの細長い筒で表す。イのみ、三相負荷の3線を上の管、単相負荷の2線を下の管にまとめている。"
q["choiceImageUrls"] = {label: f"/images/denko2/2025-second/q23-{slug}.png"
                        for label, slug in (("イ", "i"), ("ロ", "ro"), ("ハ", "ha"), ("ニ", "ni"))}

q = questions[24]
q["explanation"] = "絶縁抵抗は無充電状態の回路ごとに測り、接地抵抗は測定対象の接地極の値を確認する。導通試験には回路計または導通チェッカーを使う。したがって(A)無充電状態の回路、(B)測定接地極、(C)回路計となる。補助接地極は測定に使う別の極であり、抵抗値の判定対象ではない。"
q["choiceExplanations"]["イ"] = "正解。(A)絶縁抵抗は停電させた無充電状態の回路ごとに測り、(B)接地抵抗は測定対象の接地極の値を判定し、(C)導通は回路計で確認する。"
q["choiceExplanations"]["ロ"] = "(B)測定接地極は合うが、(A)絶縁抵抗を充電状態で測る点と、(C)導通試験に検電器を使う点が誤り。"
q["choiceExplanations"]["ハ"] = "(A)と(C)は合うが、(B)で確認する抵抗値は測定対象の接地極の値。補助接地極は測定用に設置する別の極。"
q["choiceExplanations"]["ニ"] = "(A)充電状態では絶縁抵抗を測らず、(B)抵抗値を判定するのは補助接地極でなく測定接地極、(C)導通試験には検電器でなく回路計を使う。"

q = questions[27]
q["imageUrls"] = ["/images/denko2/2025-second/q27-symbol.png"]
q["diagramDescription"] = "左に巻線と鉄片を表す可動鉄片形の記号、右に目盛板を鉛直に立てて使用することを表す逆T字『⊥』が並ぶ。"
q["explanation"] = "左の巻線と鉄片を表す記号は可動鉄片形の計器を示す。右の逆T字『⊥』は目盛板を鉛直に立てて使う指定。よってニ。"
q["choiceExplanations"]["イ"] = "左の記号はU字形の永久磁石の間に可動コイルを置く方式でなく、巻線と鉄片の可動鉄片形。右の『⊥』も鉛直使用を示し、水平置きではない。"
q["choiceExplanations"]["ハ"] = "左には巻線と鉄片の可動鉄片形の記号があり、誘導形で用いる回転円板の記号ではない。右の『⊥』も水平置きを示さない。"

q = questions[28]
q["choices"]["ニ"] = "「電気用品安全法」において、「一般用電気工作物等」と「自家用電気工作物」を定義している。"
q["explanation"] = "『一般用電気工作物等』と『自家用電気工作物』は電気工事士法第2条で定義され、前者は電気事業法第38条に定める一般用電気工作物・小規模事業用電気工作物を参照する。電気用品安全法の定義ではないためニが誤り。"
q["choiceExplanations"]["イ"] = "正しい。電気工事士法第1条は、電気工事の作業に従事する者の資格及び義務を定めると明記する。"
q["choiceExplanations"]["ロ"] = "正しい。電気設備に関する技術基準を定める省令は、電気事業法に基づく経済産業省令。"
q["choiceExplanations"]["ニ"] = "誤りで正解。両用語は電気工事士法第2条で定義し、電気事業法第38条の区分を参照する。電気用品安全法の定義ではない。"
q["officialReferenceUrls"] = [EGOV_ELECTRIC_BUSINESS, EGOV_ELECTRICIAN, EGOV_ELECTRICAL_PRODUCTS]

q = questions[30]
q["officialReferenceUrls"] = ["https://laws.e-gov.go.jp/law/409M50000400052/"]

q = questions[29]
q["officialReferenceUrls"] = [EGOV_PSE_ORDER, METI_PSE, METI_NON_SPECIFIED]
q["explanation"] = "電気用品安全法施行令別表第一の配線器具は、交流用で定格電圧100V以上300V以下の範囲。うち配線用遮断器は定格電流100A以下が特定電気用品となる。設問の20Aは電流条件内で、住宅用の交流100/200V品を前提とする。他の3製品は別表第二の特定電気用品以外の区分。"
q["choiceExplanations"]["イ"] = "正解。交流100～300V、定格電流100A以下の配線用遮断器は特定電気用品。設問の20Aは電流条件内（電圧は明示されないため一般的な住宅用交流品を前提）。"
q["choiceExplanations"]["ロ"] = "別表第二の換気扇は定格消費電力300W以下の区分で、設問の30Wは範囲内。特定電気用品以外となる。"
q["choiceExplanations"]["ハ"] = "別表第二の電線管は内径120mm以下の区分。設問の外径19mmなら内径はそれ以下であり、特定電気用品以外となる。"
q["choiceExplanations"]["ニ"] = "別表第二の電熱器具は定格消費電力10kW以下で電気ストーブを含む。設問の1kWは範囲内で、特定電気用品以外となる。"

TARGET.mkdir(parents=True, exist_ok=True)
for first, last in ((21, 25), (26, 30)):
    path = TARGET / f"20251026-q{first:02}-{last:02}.json"
    path.write_text(json.dumps([questions[number] for number in range(first, last + 1)], ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(path)
