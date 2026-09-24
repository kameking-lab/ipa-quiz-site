"""Keep Q15/19 explanations within what their official sources establish."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
first = ROOT / "data/questions/denko2/reviewed/20241027-q11-15.json"
items = json.loads(first.read_text(encoding="utf-8"))
q15 = next(item for item in items if item["number"] == 15)
q15["explanation"] = (
    "経産省『電気設備の技術基準の解釈』第33条第3項・33-2表では、対象となる定格電流30A以下の"
    "配線用遮断器に定格の1.25倍の電流を流したときの動作時間限度を60分と定める。"
    "本問は20A×1.25=25Aなので、選択肢の60分を選ぶ。なお同項は電気用品安全法の適用を受けるものを"
    "対象から除いており、実際の製品選定時は適用される製品規格も確認する。"
)
q15["choiceExplanations"]["ニ"] = q15["choiceExplanations"]["ニ"].replace(
    "定格電流50Aを超える配線用遮断器", "定格電流50Aを超え100A以下の配線用遮断器"
)
q15["choiceExplanations"]["ハ"] = q15["choiceExplanations"]["ハ"].replace("第33-2表", "33-2表")
first.write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

second = ROOT / "data/questions/denko2/reviewed/20241027-q16-20.json"
items = json.loads(second.read_text(encoding="utf-8"))
q18 = next(item for item in items if item["number"] == 18)
q18["choiceExplanations"]["ハ"] = (
    "パンチャはドローボルトで穴あけ用パンチとダイスを引き寄せ、金属板に穴を開ける工具。"
    "写真の先端はパンチとダイスを引き込む構造ではなく、圧着端子・スリーブを挟む環状ヘッドと"
    "向かい合う圧着ダイスなので、ハではない。"
)
q18["choiceExplanations"]["ニ"] = (
    "圧縮器はT形分岐コネクタや圧縮接続管に合わせた押し型・受け型を使う工具。"
    "写真のヘッドでは、端子の筒部を挟む小さな上下1対の着脱式ダイスが向かい合い、"
    "T形コネクタを載せる幅広い受け型は見えない。圧着端子・スリーブをかしめる圧着器の形であり、ニではない。"
)
q19 = next(item for item in items if item["number"] == 19)
q19["explanation"] = (
    "省令第7条は接続部の絶縁性能を低下させないことを求め、経産省の解釈第12条は"
    "電線の絶縁物と同等以上の効力で十分に被覆することを求める。これらの条文自体はテープの"
    "種類や巻き回数を指定していない。本問の施工条件では、厚さ約0.2mmのビニルテープを"
    "半幅以上重ねて1回（2層）だけ巻くと被覆は約0.4mmにとどまり、接続部に必要な絶縁を"
    "確保できない。ビニルテープなら半幅以上を重ねて少なくとも2回（4層）とする施工上の"
    "目安に足りないため、ハが不適切。ロの厚さ約0.5mmのポリエチレンテープは同じ2層でも"
    "約1.0mmとなり、選択肢の条件を満たす。これはテープ厚さと巻き方を比較する設問上の判断で、"
    "法令に層数が明記されているという意味ではない。"
)
q19["choiceExplanations"]["ロ"] = (
    "厚さ約0.5mmの黒色粘着性ポリエチレン絶縁テープを半幅以上重ねて1回巻けば2層で"
    "約1.0mmとなる。薄いビニルテープ2層（約0.4mm）とは異なり、設問の絶縁処理として適切。"
)
q19["choiceExplanations"]["ハ"] = (
    "正解（不適切）。厚さ約0.2mmのビニルテープ1回巻きは2層・約0.4mmにとどまる。"
    "解釈第12条が求める同等以上の絶縁効力を得る施工としては薄く、2回（4層）以上の目安に足りない。"
)
second.write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("Q15/19 explanations confined to directly checked provisions")
