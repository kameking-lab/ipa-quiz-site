"""Prepare 2025 lower Q11–20 for independent original-image adjudication."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data/raw_pdfs/denko2/review/batches"
TARGET = ROOT / "data/questions/denko2/reviewed"
METI = "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/20231226-2.pdf"
METI_TEMPERATURE = "https://www.meti.go.jp/policy/safety_security/industrial_safety/oshirase/2014/03/260319-1-2.pdf"

parts = [json.loads((SOURCE / f"20251026-q11-20-vision-part{part:02}.json").read_text(encoding="utf-8"))
         for part in (1, 2)]
questions = {item["number"]: item for part in parts for item in part}
if set(questions) != set(range(11, 21)):
    raise ValueError("Expected questions 11–20")
for number, item in questions.items():
    item["reviewedFromCrop"] = f"data/raw_pdfs/denko2/review/20251026/q{number:02}.png"
    item["uncertainty"] = ""

q = questions[11]
q["choiceExplanations"]["ロ"] = "コンクリート床内に埋め込む施工は金属線ぴ工事の施設方法ではない。金属線ぴは造営材に固定して絶縁電線を収める。"
q["choiceExplanations"]["ハ"] = "導体を内蔵したダクトに照明器具を直接取り付けるのはライティングダクトの説明。金属線ぴとは異なる。"
q["officialReferenceUrls"] = [METI]

q = questions[12]
q["explanation"] = "600Vポリエチレン絶縁耐燃性ポリエチレンシースケーブル平形（EM-EEF）の絶縁物は非架橋ポリエチレン。絶縁物と導体が接する部分の最高許容温度は75℃。経済産業省の電技解釈解説も、許容電流の前提とするポリエチレン絶縁体の導体接触部温度を75℃、ビニル絶縁体を60℃、架橋ポリエチレン絶縁体を90℃として区別する。"
q["choiceExplanations"]["イ"] = "60℃はビニル絶縁電線などの温度区分との混同。問題の絶縁物はポリエチレンなので75℃。"
q["choiceExplanations"]["ロ"] = "正解。問題の非架橋ポリエチレン絶縁物の最高許容温度は75℃。"
q["choiceExplanations"]["ハ"] = "90℃は経済産業省の電技解釈解説が架橋ポリエチレン絶縁体に示す温度。非架橋ポリエチレンを使う本問のケーブルは75℃。"
q["choiceExplanations"]["ニ"] = "問題の絶縁物である非架橋ポリエチレンの最高許容温度は75℃。120℃で連続使用できると見積もると、材料の許容温度を超える。"
q["officialReferenceUrls"] = [METI_TEMPERATURE]

q = questions[13]
q["choiceExplanations"]["ロ"] = "ディスクグラインダは金属管の切断や研削に用いる工具であり、電線管を所定の曲げ半径で加工する工具ではない。"

q = questions[16]
q["imageUrls"] = ["/images/denko2/2025-second/q16-photo.png"]
q["explanation"] = "写真はあらかじめ大きな曲率半径で約90度に曲げられた金属製の電線管部材で、両端に接続用の止めねじが見える。既製の曲がり管であるノーマルベンド。"
q["choiceExplanations"]["ロ"] = "正解。写真の既製の90度曲がり管はノーマルベンド。電線管を直角方向へ配管する際に用いる。"
q["choiceExplanations"]["イ"] = "ユニバーサルはふた付きのL形継手。写真のような一体の曲がり管とは異なる。"
q["diagramDescription"] = "青地の写真に、大きな曲率半径で約90度に曲がった光沢のある金属管が写る。両端に開口部と止めねじが見える。"

q = questions[17]
q["imageUrls"] = ["/images/denko2/2025-second/q17-photo.png"]
q["explanation"] = "写真の壁取付け型器具は、前面下部に人の動きを検知する白いセンサー窓があり、「切・自動・連続入」の切替つまみを備える。人の接近を検知して照明などを自動点滅させる用途なのでロ。"
q["choiceExplanations"]["ロ"] = "正解。前面下部のセンサーが人の接近・動きを検知し、照明を自動点滅させる器具。"
q["choiceExplanations"]["イ"] = "調光器は照明の明るさを連続的に変える器具。写真の白いセンサー窓と「切・自動・連続入」の切替表示は人の検知による点滅を示す。"
q["choiceExplanations"]["ニ"] = "街路灯などの自動点滅器は周囲の明暗で動作するが、写真の器具は人の検知用センサー窓と自動・連続入の切替を備える。"
q["diagramDescription"] = "青地の写真に、銀色の金属取付枠とアイボリー色の器体。器体上部に「切・自動・連続入」の表示と切替つまみ、下部に白いセンサー窓がある。"

q = questions[18]
q["imageUrls"] = ["/images/denko2/2025-second/q18-photo.png"]
q["explanation"] = "写真は赤いカム式の電線つかみ、左上のアイリングから工具本体へ延びるワイヤーロープ、ラチェット本体とレバーを備えた張線器。架空線を引いて張力・たるみを調整する。"
q["choiceExplanations"]["ロ"] = "電線を曲げてくせをつける工具ではない。写真は電線つかみ・ワイヤーロープ・レバーで架空線を引いて張力を調整する。"
q["choiceExplanations"]["ハ"] = "電線管の滑り止めに使うパイプレンチなどとは構造が違う。写真には電線つかみと張力調整用のワイヤーがある。"
q["choiceExplanations"]["ニ"] = "正解。赤い電線つかみ金具、ワイヤーロープ、レバー式ラチェットで架空線の張力・たるみを調整する張線器。"
q["diagramDescription"] = "青地の写真で、左に赤いカム式電線つかみ、中央にラチェット本体、右に長いレバーが横並び。左上のアイリングからワイヤーロープが弧を描いて工具本体へつながる。"

q = questions[19]
q["explanation"] = "リングスリーブ（E形）の適合組合せを電線の太さと本数で確認する。直径2.0mmの電線2本には小スリーブ・刻印「小」を使うため、中スリーブ・刻印「中」としたハが不適切。実断面積の概算だけで圧着組合せを決めない。"
q["choiceExplanations"]["イ"] = "直径2.0mmの電線3本には中スリーブ・刻印「中」が適合する。"
q["choiceExplanations"]["ロ"] = "直径1.6mmの電線3本には小スリーブ・刻印「小」が適合する。"
q["choiceExplanations"]["ハ"] = "不適切で正解。直径2.0mmを2本接続する組合せは小スリーブ・刻印「小」。中スリーブ・刻印「中」は使用しない。"
q["choiceExplanations"]["ニ"] = "直径1.6mmの電線1本と直径2.0mmの電線2本には中スリーブ・刻印「中」が適合する。"

q = questions[20]
q["explanation"] = "経済産業省『電気設備の技術基準の解釈』第158条第3項第七号では、CD管を直接コンクリートに埋め込むか、専用の不燃性または自消性のある難燃性の管・ダクトに収める必要がある。点検口のある天井裏でも、CD管を単独で用いるロは不適切。"
q["choiceExplanations"]["ロ"] = "不適切で正解。点検できる隠ぺい場所でも、コンクリート埋込み以外でCD管を単独で使うことはできない。第158条第3項第七号の保護方法が必要。"
q["officialReferenceUrls"] = [METI]

TARGET.mkdir(parents=True, exist_ok=True)
for first, last in ((11, 15), (16, 20)):
    path = TARGET / f"20251026-q{first:02}-{last:02}.json"
    path.write_text(json.dumps([questions[number] for number in range(first, last + 1)], ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(path)
