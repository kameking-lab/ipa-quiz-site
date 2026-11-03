"""Curate the last ten 2025 lower questions after shared-plan and photo review."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BATCHES = ROOT / "data/raw_pdfs/denko2/review/batches"
TARGET = ROOT / "data/questions/denko2/reviewed"
IMAGE = "/images/denko2/2025-second/"
parts = [json.loads((BATCHES / f"20251026-q41-50-redraft-part{part:02}.json").read_text(encoding="utf-8"))
         for part in (1, 2)]
questions = {item["number"]: item for part in parts for item in part}
if set(questions) != set(range(41, 51)):
    raise ValueError("Expected Q41–50")

for number, item in questions.items():
    item["reviewedFromCrop"] = f"data/raw_pdfs/denko2/review/20251026/q{number:02}.png"
    item["choiceImageUrls"] = {choice: IMAGE + f"q{number}-{name}.png" for choice, name in
                               (("イ", "i"), ("ロ", "ro"), ("ハ", "ha"), ("ニ", "ni"))}
    if number in {41, 42, 43, 49}:
        item["imageUrls"] = [IMAGE + "wiring-second-floor.png"]
    elif number == 44:
        item["imageUrls"] = [IMAGE + "wiring-panel.png"]
    elif number in {45, 46, 47}:
        item["imageUrls"] = [IMAGE + "wiring-first-floor.png"]
    else:
        item["imageUrls"] = [IMAGE + "wiring-first-floor.png", IMAGE + "wiring-second-floor.png"]

q = questions[41]
q["uncertainty"] = ""
q["explanation"] = q["explanation"].replace("①⑫のジョイントボックス", "⑫のジョイントボックス").replace("②⑦⑧の点滅器", "⑦⑧の点滅器")
q["diagramDescription"] = q["diagramDescription"].replace("①⑫のジョイントボックス", "⑫のジョイントボックス")

q = questions[42]
q["uncertainty"] = ""
q["choices"]["ハ"] = "透明カバー付きの露出用ボックス"
q["choices"]["ニ"] = "銀灰色の金属製露出形スイッチボックス。上部に電線管の接続口がある。"
q["choiceExplanations"]["ハ"] = "器具を覆う透明カバー付きの露出用ボックスで、⑫の電線接続用アウトレットボックスとは用途・形状が違う。"
q["explanation"] = q["explanation"].replace("分電盤への立上り", "分電盤への引下げ")
q["diagramDescription"] = q["diagramDescription"].replace("分電盤への立上り", "分電盤への引下げ")

q = questions[43]
q["uncertainty"] = ""
q["choices"]["ロ"] = "黒色・円形の刃受面に3極の直線状の刃受と接地極があり、中央に「20」表示があるコンセント"
q["choices"]["ニ"] = "白色の接地極付コンセント。左がT字形、右が縦長直線形の刃受で、下に接地極の穴がある。下部は無地プレート。"
q["choiceExplanations"]["ロ"] = "直線状の刃受が3極分と接地極の計4か所ある3極接地極付の形。⑬は単相200V回路の2極接地極付を示し、3極形ではない。"
q["choiceExplanations"]["ニ"] = "左T字形・右直線形・下に接地極穴を持つ15A・20A兼用125Vの形。⑬に必要な250Vの直線形＋L字形とは刃受形状も定格電圧も異なる。"
q["diagramDescription"] = q["diagramDescription"].replace("黒色円形で「20」表示の引掛形", "黒色円形で「20」表示、直線状の刃受が3極分と接地極1か所").replace("上部に刃受と接地極の穴、下部は無地", "左T字形・右直線形の刃受と下の接地極穴、下部は無地")

q = questions[44]
q["uncertainty"] = ""
q["choices"]["ロ"] = "漏電遮断器。銘板に2P1E・100V・20A・感度30mAの表示とテストボタンがある。"
q["choices"]["ハ"] = "漏電遮断器。銘板に2P2E・100/200V・20A・感度30mAの表示とテストボタンがある。"

q = questions[45]
q["uncertainty"] = ""
q["explanation"] = (
    "⑮の引出線は、1階玄関側の⑯ジョイントボックスと⑰ジョイントボックスを結ぶ配線を指す。"
    "⑰から⑯へ電源の非接地側L・接地側Nを送り、⑯側にある点滅器コの帰り線を⑰側のCLコへ戻すため、"
    "この区間には3本の心線が必要。2心では不足し、2心2本や2心＋3心は心線数が最少ではない。"
    "したがって3心VVFケーブル1本のロが正しい。"
)
q["choiceExplanations"] = {
    "イ": "2心1本では、⑰から⑯へのL・Nと⑯から⑰へのコの帰り線を同時に通せず、1心不足する。",
    "ロ": "正解。3心1本でL・N・点滅器コの帰り線の3本を収め、指定された最少心線数を満たす。",
    "ハ": "2心2本なら合計4心となり、必要な3心より1心多い。最少心線数ではない。",
    "ニ": "2心1本と3心1本なら合計5心で、必要な3心を超える。",
}
q["diagramDescription"] = (
    "⑮は1階玄関の⑯ボックスとホール側の⑰ボックスの間を走る斜めのケーブルへの引出線。"
    "⑯にはク・ケ・コの点滅器とDLコ、⑰にはCLコがつながる。"
    "写真はイ=2心1本、ロ=3心1本、ハ=2心2本、ニ=2心1本＋3心1本。"
)

q = questions[46]
q["uncertainty"] = ""
q["explanation"] = q["explanation"].replace("このボックスに入るケーブルは次の5本と読み取れる。", "このボックスの結線には次の5方向のケーブルを使う。")
q["choices"]["ハ"] = q["choices"]["ハ"].replace("中段に1個", "中段に刻印「小」1個")
q["diagramDescription"] = q["diagramDescription"].replace("中段に小スリーブ1個", "中段に刻印「小」の小スリーブ1個")

q = questions[47]
q["uncertainty"] = ""

q = questions[48]
q["uncertainty"] = ""

q = questions[49]
q["uncertainty"] = ""
q["choices"]["ロ"] = "長い波刃と木製柄を持つプリカナイフ"

q = questions[50]
q["uncertainty"] = ""
q["choices"]["ニ"] = "灰色の合成樹脂製で六角部を持つVE管用接続部材"
q["explanation"] = q["explanation"].replace("1階の外灯・自動点滅器へ向かう③の「(VE28)」と④の「EM-CE(VE28)」", "1階駐車場側の器具へ向かう③の「(VE28)」と、外灯・自動点滅器へ向かう④の「EM-CE(VE28)」")

TARGET.mkdir(parents=True, exist_ok=True)
for first, last in ((41, 45), (46, 50)):
    path = TARGET / f"20251026-q{first:02}-{last:02}.json"
    path.write_text(json.dumps([questions[number] for number in range(first, last + 1)], ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(path)
