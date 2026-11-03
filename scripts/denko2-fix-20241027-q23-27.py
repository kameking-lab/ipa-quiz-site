"""Remove unsupported conduit-table generalisation and clarify zero-sequence current."""

import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
first_path = root / "data/questions/denko2/reviewed/20241027-q21-25.json"
first = json.loads(first_path.read_text(encoding="utf-8"))
q21 = next(item for item in first if item["number"] == 21)
q21["explanation"] = q21["explanation"].replace(
    "住宅(店舗付き住宅の住宅部分を含む)の屋内電路の対地電圧は、",
    "電気設備技術基準の解釈第143条第1項が対象とする住宅の屋内電路の対地電圧は、",
)
q23 = next(item for item in first if item["number"] == 23)
q23["choiceExplanations"]["イ"] = (
    "8mm²のIV電線の仕上外径は約6.0mm、C25薄鋼電線管の内径は約22.2mm。"
    "3本の被覆断面積を管の内断面積と比べると3×(6.0÷22.2)²≈21.9%で、"
    "異なる太さを混在させる場合の厳しい32%基準と比べても小さい。"
    "本肢は同一太さ3本なので32%を直接適用するものではないが、"
    "その値も十分下回ることからC25に収まる余裕があり、この肢は適切。"
)
q23["choiceExplanations"]["ニ"] = (
    "農林水産省の電気設備工事資料では、ボックス間の1区間は屈曲部4箇所以下、"
    "曲げ角度の合計270°以内を目安とする。ノーマルベンド2箇所の屈曲は通常180°で、"
    "箇所数と角度の双方がこの範囲に収まるため、この肢は適切。"
)
q23["officialReferenceUrls"] = [
    "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/20231226-2.pdf",
    "https://www.maff.go.jp/j/nousin/seko/kyotu_siyosyo/kikaisisin/attach/pdf/denkisetsubi_koutei-21.pdf",
    "https://www.mlit.go.jp/koku/content/001885918.pdf",
    "https://www.mlit.go.jp/tec/it/denki/densekisankijun/densekisankijuntouunyoH2903.pdf",
]
first_path.write_text(json.dumps(first, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

second_path = root / "data/questions/denko2/reviewed/20241027-q26-30.json"
second = json.loads(second_path.read_text(encoding="utf-8"))
q27 = next(item for item in second if item["number"] == 27)
q27["explanation"] = (
    "単相3線式の漏れ電流を測るときは、2本の電圧線と中性線の3本を一括してクランプする。"
    "正常な負荷電流は往路と復路で打ち消し合い、3線の電流のベクトル和として残る"
    "零相電流を漏れ電流として検出する。負荷が不平衡な場合は中性線に"
    "両電圧線の負荷電流の差が流れるが、3線をまとめればこれも相殺される。"
    "一部の線をクランプの外に出すと"
    "負荷電流が相殺されず、漏れ電流と誤認する。"
)
q29 = next(item for item in second if item["number"] == 29)
q29["explanation"] = q29["explanation"].replace("定格電流50A以下のものが", "定格電流50A以下・極数5以下のものが")
q29["choiceExplanations"]["ロ"] = q29["choiceExplanations"]["ロ"].replace("・極数5以下・極数5以下", "・極数5以下")
q29["choiceExplanations"]["ロ"] = q29["choiceExplanations"]["ロ"].replace("・極数5以下・極数5以下", "・極数5以下")
if "100V以上300V以下・50A以下・極数5以下" not in q29["choiceExplanations"]["ロ"]:
    q29["choiceExplanations"]["ロ"] = q29["choiceExplanations"]["ロ"].replace("100V以上300V以下・50A以下", "100V以上300V以下・50A以下・極数5以下")
second_path.write_text(json.dumps(second, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("Q23 conduit explanation and Q27 zero-sequence explanation corrected")
