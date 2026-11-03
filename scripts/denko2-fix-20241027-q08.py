"""Correct the Q8 METI table number and avoid unsupported private-code rounding."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/questions/denko2/reviewed/20241027-q06-10.json"
items = json.loads(path.read_text(encoding="utf-8"))
item = next(value for value in items if value["number"] == 8)
item["explanation"] = (
    "経産省『電気設備の技術基準の解釈』第146条の146-2表では、600Vビニル絶縁より線の軟銅線5.5mm²の"
    "基準許容電流は49A。4本を同じ金属管に収める条件の電流減少係数は問題文の0.63（同条146-4表とも一致）。"
    "49×0.63=30.87Aとなる。選択肢でこの値に対応するのは31Aのハ。"
)
item["choiceExplanations"]["ハ"] = (
    "正解。146-2表の49Aに、問題文で与えられた0.63を乗じると30.87A。整数の選択肢では31Aに対応する。"
)
q10 = next(value for value in items if value["number"] == 10)
q10["explanation"] = q10["explanation"].replace("表149-3", "149-3表")
path.write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("Q8 and Q10 corrected against METI table text")
