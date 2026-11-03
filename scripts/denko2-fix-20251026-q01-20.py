"""Keep source-aware fixes to legacy 2025 lower Q1–20 drafts reproducible."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "data/questions/denko2/reviewed"
METI = "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/20231226-2.pdf"


def update(name: str, change) -> None:
    path = BASE / name
    questions = json.loads(path.read_text(encoding="utf-8"))
    change({item["number"]: item for item in questions})
    path.write_text(json.dumps(questions, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def first(items: dict) -> None:
    items[9]["choiceExplanations"]["ニ"] = (
        "27.5Aは50Aの55%に当たる。第149条第1項第一号イの55%以上なら距離の上限を設けないが、"
        "本問は7mで同号ロの8m以下・35%以上の条件も使える。したがって必要最小値ではない。"
    )
    items[10]["explanation"] = (
        "分岐点から遮断器まで3mなので、電技解釈第149条第1項第一号の遮断器設置条件を満たす。"
        "分岐回路の電線とコンセントは同条第2項第一号ロ・ニ、149-1表・149-3表で選ぶ。"
        "40A遮断器には軟銅線8mm²以上と30A以上40A以下のコンセントが必要で、"
        "ハの8mm²・30Aの組合せが適合する。"
    )


def second(items: dict) -> None:
    items[12]["officialReferenceUrls"] = [METI]
    items[12]["explanation"] = (
        "600Vポリエチレン絶縁耐燃性ポリエチレンシースケーブル平形（EM-EEF）は"
        "ポリエチレンを絶縁物とする。経済産業省『電気設備の技術基準の解釈』第146条146-3表の"
        "許容電流補正係数の計算式は、架橋しないポリエチレンを75℃、架橋ポリエチレンを90℃で"
        "区別している。したがって本問は75℃。"
    )
    items[12]["choiceExplanations"]["イ"] = "本問のポリエチレン絶縁物は75℃区分なので、60℃は一致しない。"
    items[12]["choiceExplanations"]["ハ"] = (
        "90℃は経済産業省『電気設備の技術基準の解釈』第146条146-3表にある"
        "架橋ポリエチレンの温度区分。本問の非架橋ポリエチレンは75℃。"
    )


def third(items: dict) -> None:
    items[20]["choiceExplanations"]["ハ"] = (
        "電技解釈第156条156-1表で、湿気の多い場所にも合成樹脂管工事は使える。"
        "第158条に従って防湿装置を施せば、硬質ポリ塩化ビニル管の施工は適切。"
    )
    items[20]["choiceExplanations"]["ニ"] = (
        "ライティングダクト工事は電技解釈第156条156-1表で、"
        "展開した乾燥場所の300V以下の施設方法に含まれる。居間の記載は適切。"
    )


update("20251026-q06-10.json", first)
update("20251026-q11-15.json", second)
update("20251026-q16-20.json", third)
print("Applied 2025 lower Q9, Q10, Q12 and Q20 corrections")
