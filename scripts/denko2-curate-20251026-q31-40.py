"""Prepare 2025 lower wiring-plan Q31–40 with shared figure-only diagrams."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data/raw_pdfs/denko2/review/batches"
TARGET = ROOT / "data/questions/denko2/reviewed"
IMAGE = "/images/denko2/2025-second/"
METI = "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/20231226-2.pdf"
MLIT_SYMBOLS = "https://www.mlit.go.jp/gobuild/content/001879783.pdf"
EGOV_TECHNICAL_STANDARD = "https://laws.e-gov.go.jp/law/409M50000400052/"

parts = [json.loads((SOURCE / f"20251026-q31-40-vision-part{part:02}.json").read_text(encoding="utf-8"))
         for part in (1, 2)]
questions = {item["number"]: item for part in parts for item in part}
if set(questions) != set(range(31, 41)):
    raise ValueError("Expected questions 31–40")

for number, item in questions.items():
    item["reviewedFromCrop"] = f"data/raw_pdfs/denko2/review/20251026/q{number:02}.png"
    item["uncertainty"] = ""
    if number <= 36:
        item["imageUrls"] = [IMAGE + "wiring-first-floor.png", IMAGE + "wiring-panel.png"]
    elif number <= 38:
        item["imageUrls"] = [IMAGE + "wiring-second-floor.png", IMAGE + "wiring-panel.png"]
    else:
        item["imageUrls"] = [IMAGE + "wiring-panel.png"]

for number in (31, 33, 39, 40):
    questions[number]["officialReferenceUrls"] = [METI]

for number in range(31, 39):
    questions[number]["imageUrls"] = questions[number]["imageUrls"][:1]

q = questions[31]
q["diagramDescription"] = "1階平面図の①は、上部外壁の電力量計Whから建物の屋側を通って電灯分電盤へ至る破線の配線を指す。問題冊子の共通注意に木造2階建住宅とある。"
q["explanation"] = "問題2の共通条件は木造2階建住宅。①は電力量計Whから分電盤へ木造住宅の屋側を通る配線。電技解釈第110条第2項の低圧屋側電線路の施設方法はケーブル工事を挙げ、金属管は木造以外に限る。金属可とう電線管・金属線ぴは同項の方法に挙がらないため、VVRのケーブル工事が適切。"
q["choiceExplanations"] = {
    "イ": "金属可とう電線管工事は第110条第2項に列挙された屋側電線路の施設方法に含まれない。",
    "ロ": "金属線ぴ工事も同項の屋側電線路の施設方法に含まれない。",
    "ハ": "正解。600V VVRを用いるケーブル工事は同項第五号に挙げられ、木造の①に適する。",
    "ニ": "金属管工事は同項第三号で木造以外の造営物に限られるため、この木造住宅の屋側には適さない。",
}

q = questions[32]
q["diagramDescription"] = "1階台所右上の②は、傍記ETのあるコンセント記号を指す。近くのEET表記の別コンセントとは異なる。"
q["explanation"] = "②のコンセントの傍記はET。Eは接地極、ETは接地端子、EETは両方、ELは漏電遮断器を表すため、ETだけのロが正しい。"
q["choiceExplanations"] = {
    "イ": "接地極付なら傍記はE。②の傍記はETで、接地極ではなく接地端子を示す。",
    "ロ": "正解。ETは接地端子付を示し、②の傍記と一致する。",
    "ハ": "両方を備える接地極付接地端子付ならEET。近くに別のEETがあるが②はET。",
    "ニ": "漏電遮断器付の傍記はELであり、②のETとは一致しない。",
}

q = questions[33]
q["diagramDescription"] = "1階左下の③は門柱側の押しボタンへ向かうVE28傍記の線。屋内には呼鈴用変圧器Tとチャイムの記号がある。"
q["explanation"] = "図の③は押しボタン・変圧器・チャイムにつながる呼鈴回路。電技解釈第181条第1項は呼鈴等に接続する小勢力回路の最大使用電圧を60V以下と定義する。"
q["choiceExplanations"] = {
    "イ": "24Vは小勢力回路で使用できる場合があるが、第181条の上限60Vではない。15V超30V以下の区分に入る。",
    "ロ": "30Vは第181条181-1表の15V超30V以下の区分の境界であり、上限はさらに高い60V。",
    "ハ": "40Vは30V超60V以下の区分内に入るが、その区分の最大値60Vではない。",
    "ニ": "正解。第181条は呼鈴等の小勢力回路を最大使用電圧60V以下とする。",
}

q = questions[34]
q["diagramDescription"] = "④は1階左側の屋外器具に向かう配線の傍記EM-CE(VE28)の括弧内VE28を指す。③の線にもVE28があるが別箇所。"
q["explanation"] = "④のEM-CE(VE28)のうちVEは硬質ポリ塩化ビニル電線管、28は呼び径で内径の近似値を表す。実寸が正確に28mmという意味ではない。"
q["choiceExplanations"] = {
    "イ": "正解。VEは硬質ポリ塩化ビニル電線管、28はおおむね内径を示す呼び径。",
    "ロ": "合成樹脂製可とう電線管ならPF管またはCD管と表記する。図のVEとは管種が違う。",
    "ハ": "VEという管種は合うが、28は外径でなく内径の近似値を表す呼び径。",
    "ニ": "可とう電線管ならPF/CDでありVEではない。さらに28も外径表示ではない。",
}

q = questions[35]
q["diagramDescription"] = "⑤は④と同じ配線の傍記EM-CE(VE28)の前半EM-CEを指す。④は後半のVE28を問う。"
q["explanation"] = "図の傍記EM-CEは、600V架橋ポリエチレン絶縁耐燃性ポリエチレンシースケーブルを表す。後半のVE28は収める管であり、ケーブルの種類ではない。"
q["choiceExplanations"] = {
    "イ": "耐燃性ポリエチレン絶縁電線はEM-IEで、図のEM-CEというケーブル略号ではない。",
    "ロ": "正解。EM-CEは架橋ポリエチレン絶縁・耐燃性ポリエチレンシースのケーブル。",
    "ハ": "耐燃性架橋ポリエチレン絶縁電線はEM-ICで、図のEM-CEとは違う。",
    "ニ": "平形のポリエチレン絶縁耐燃性ポリエチレンシースケーブルはEM-EEFで、EM-CEとは違う。",
}

q = questions[36]
q["officialReferenceUrls"] = [MLIT_SYMBOLS]
q["diagramDescription"] = "⑥は1階の階段下、和室との境付近にある斜線入りの円形図記号を指す。"
q["explanation"] = "⑥の斜線入り円形記号はVVF用ジョイントボックス。『VVF用』という文字の傍記ではなく、記号の形で判別する。"
q["choiceExplanations"] = {
    "イ": "ジャンクションボックスはフロアダクト等に用いる箱で、⑥のVVF用ジョイントボックスの斜線入り円形記号を指す名称ではない。",
    "ロ": "通常のジョイントボックスは□で、別の2階平面図の⑫が例。1階平面図の⑥は斜線入り円形なのでVVF用。",
    "ハ": "正解。図の斜線入り円形はVVF用ジョイントボックスを示す。",
    "ニ": "プルボックスは□に×を入れる記号で、⑥の斜線入り円形とは形が異なる。",
}

q = questions[37]
q["diagramDescription"] = "2階洋室の⑦はVVF用ジョイントボックス⑪から黒いひし形の点滅器2個へ至る区間を指す。"
q["explanation"] = "⑦では2個の点滅器に、非接地側の共通線1本と各点滅器から戻る帰り線2本が必要。合計3本となる。"
q["choiceExplanations"] = {
    "イ": "2本では共通線1本と帰り線1本までで、2個の点滅器それぞれの帰り線を確保できない。",
    "ロ": "正解。共通線1本＋1個目の帰り線1本＋2個目の帰り線1本＝3本。",
    "ハ": "4本なら配線できても、必要な共通線1本と帰り線2本の合計3本より多く、最少本数ではない。",
    "ニ": "5本は必要な3本を2本上回り、最少本数ではない。",
}

q = questions[38]
q["diagramDescription"] = "2階の⑧は傍記ハのある黒塗りのひし形◆を指し、斜め矢印は付かない。"
q["explanation"] = "⑧は黒塗りのひし形◆で、ワイドハンドル形点滅器を示す。一般形点滅器の●や、矢印が付く調光器とは形が異なる。"
q["choiceExplanations"] = {
    "イ": "一般形調光器は調光を示す斜め矢印が付く。⑧は矢印のない◆なので違う。",
    "ロ": "ワイド形調光器なら調光の矢印が必要。⑧の◆には矢印がない。",
    "ハ": "一般形点滅器は●で示し、⑧の◆はワイドハンドル形。",
    "ニ": "正解。矢印のない黒塗りの◆はワイドハンドル形点滅器。",
}

q = questions[39]
q["officialReferenceUrls"] = [EGOV_TECHNICAL_STANDARD, METI]
q["question"] = q["question"].replace("〔MΩ〕", "［MΩ］")
q["diagramDescription"] = "⑨は電灯分電盤から分岐するルームエアコン用200V・2P20A回路を指す。電源は1φ3W 100/200V。"
q["explanation"] = "⑨の使用電圧は200Vでも、単相3線式100/200Vの中性線を接地するため対地電圧は100V。電技省令第58条の『対地電圧150V以下』に該当し、絶縁抵抗の最小値は0.1MΩ。"
q["choiceExplanations"] = {
    "イ": "正解。単相3線式200V回路の対地電圧は接地中性線に対して100Vで、150V以下の区分は0.1MΩ。",
    "ロ": "0.2MΩは使用電圧300V以下かつ対地電圧150V超の区分。⑨は使用電圧200Vでも対地電圧は100V。",
    "ハ": "0.3MΩは電技省令第58条の基準値として設定されていない。",
    "ニ": "0.4MΩは使用電圧300V超の低圧電路の区分。⑨の使用電圧は200V。",
}

q = questions[40]
q["question"] = q["question"].replace("〔Ω〕", "［Ω］")
q["diagramDescription"] = "⑩は電灯分電盤結線図の接地端子記号から大地へ向かう接地線を指す。主幹はBE 3P 50AF 50A 30mA。共通注意3は漏電遮断器の動作時間を0.1秒以内と指定する。"
q["explanation"] = "⑩は電灯分電盤の接地端子から大地へ向かう接地線。使用電圧が100/200Vで300V以下の低圧設備なのでD種接地に該当する。主幹BEは30mAの漏電遮断器で、共通注意3に動作時間0.1秒以内と明記されるため、電技解釈第17条の0.5秒以内遮断条件を満たし、上限は500Ω。"
q["choiceExplanations"] = {
    "イ": "C種接地は300V超の低圧設備に用いる。⑩の回路の使用電圧は100/200Vで300V以下なのでD種。",
    "ロ": "⑩はD種接地対象でC種ではない。C種50Ωという組合せも第17条の基準にない。",
    "ハ": "D種という種類は合うが、100Ωは通常の上限。共通注意3の0.1秒以内遮断は緩和条件の0.5秒以内を満たし、500Ωまで認められる。",
    "ニ": "正解。D種接地で、共通注意3の0.1秒以内動作の漏電遮断器があるため、接地抵抗は500Ω以下。",
}

TARGET.mkdir(parents=True, exist_ok=True)
for first, last in ((31, 35), (36, 40)):
    path = TARGET / f"20251026-q{first:02}-{last:02}.json"
    path.write_text(json.dumps([questions[number] for number in range(first, last + 1)], ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(path)
