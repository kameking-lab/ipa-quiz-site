"""Map JAEA's exact Bq definition to all five EM analysis Q20 choices."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PAPER = "emkohyo-20260217-4"
QUESTION = f"{PAPER}-q20"
DRAFT = ROOT / f"data/exam-library/emkohyo-review/{PAPER}-q16-20-draft.json"
INDEX = ROOT / "docs/evidence/emkohyo-choice-sources/supplemental-science-sources.json"


def main() -> None:
    index = json.loads(INDEX.read_text(encoding="utf-8"))
    source = next(item for item in index["sources"] if "ベクレル" in item["title"])
    dose = next(item for item in index["sources"] if "放射線・放射能Q&A" in item["title"])
    counts = next(item for item in index["sources"] if "放射線計数率" in item["title"])
    excerpt = source["facts"][0]["exactExcerpt"]
    if "１秒間" not in excerpt or "原子核が崩壊" not in excerpt:
        raise ValueError("Direct Bq definition missing")
    draft = json.loads(DRAFT.read_text(encoding="utf-8"))
    target = draft["questions"][QUESTION]
    target["overlay"]["choices"][0]["reason"] = (
        "単位質量当たりの壊変数では時間による割り算がなく、Bqの定義と一致しない。"
        "JAEAはベクレルを1秒間に原子核が崩壊する数と説明しており、質量で割った値は別の量になる。"
    )
    target["overlay"]["choices"][1]["reason"] = (
        "単位質量当たりの放射線の数は、質量を分母にする上に、数えているのも原子核の壊変ではない。"
        "ベクレルは原子核が1秒間に崩壊する数を表すため、肢2は時間と対象の両方が異なる。"
    )
    target["overlay"]["choices"][3]["reason"] = (
        "時間当たりという部分はBqに似ているが、Bqが数えるのは放出された放射線ではなく原子核の壊変である。"
        "JAEAの定義は1秒間に原子核が崩壊する数なので、放射線の数に置き換えることはできない。"
    )
    target["overlay"]["choices"][4]["reason"] = (
        "被ばく線量は放射線を受けた側の吸収エネルギー等に基づく量で、放射性物質の原子核の壊変数ではない。"
        "BqはJAEAの定義にあるとおり、1秒間に原子核が崩壊する数を表し、時間当たりの被ばく線量とは異なる。"
    )
    target["overlay"]["sources"] = [
        {"title": item["title"], "url": item["url"]}
        for item in (source, dose, counts)
    ]
    target["sourceEvidence"] = [{"url": source["url"], "excerpt": excerpt,
                                 "choiceNumbers": [1, 2, 3, 4, 5]}]
    target["sourceEvidence"].append({
        "url": dose["url"], "excerpt": dose["facts"][0]["exactExcerpt"],
        "choiceNumbers": [5],
    })
    target["sourceEvidence"].append({
        "url": dose["url"], "excerpt": dose["facts"][1]["exactExcerpt"],
        "choiceNumbers": [5],
    })
    target["sourceEvidence"].append({
        "url": counts["url"], "excerpt": counts["facts"][0]["exactExcerpt"],
        "choiceNumbers": [4],
    })
    target["reviewIssues"] = []
    DRAFT.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{QUESTION}: JAEA Bq definition ready for direct review")


if __name__ == "__main__":
    main()
