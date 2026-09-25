"""Publish the reviewed contiguous range of FP2 2026-05 academic questions.

Run: python3 scripts/fp2_2026_may_build.py
Starts at Q11 (Q1-10 live in data/questions/fp2/index.ts) and stops at the first
question that is not accepted in review-ledger.json, so a HOLD is never skipped.
"""

from __future__ import annotations

import json
from pathlib import Path

from fp2_2026_may_review import KEYS, RECEIPTS, parse_result, verify_receipt
from fp2_build_academic import government_links


ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / "docs" / "evidence" / "fp2-2026-may"
OUTPUT = ROOT / "data" / "questions" / "fp2" / "academic-2026-05.json"
FIRST = 11
LAST_UPDATED = "2026-09-25"
CATEGORIES = ["ライフプランニングと資金計画", "リスク管理", "金融資産運用",
              "タックスプランニング", "不動産", "相続・事業承継"]


def receipt_rows(kind: str) -> dict[int, dict]:
    rows: dict[int, dict] = {}
    for path in sorted(RECEIPTS.glob(f"q*-{kind}.json")):
        raw = json.loads(path.read_text(encoding="utf-8"))
        verify_receipt(raw)
        for row in parse_result(raw["result"]):
            rows[row["number"]] = {**row, "receipt": path.name}
    return rows


def main() -> None:
    extraction = json.loads((EVIDENCE / "extraction.json").read_text(encoding="utf-8"))
    ledger = json.loads((EVIDENCE / "review-ledger.json").read_text(encoding="utf-8"))["questions"]
    solved, drafts = receipt_rows("solve"), receipt_rows("explain")
    published: list[dict] = []
    holds: list[dict] = []
    blocked: list[int] = []
    for question in extraction["questions"]:
        number = question["number"]
        if number < FIRST:
            continue
        entry = ledger.get(str(number), {"status": "hold", "reason": "未レビュー"})
        official = KEYS[question["answer"] - 1]
        if entry["status"] == "accepted":
            if number not in solved or number not in drafts:
                raise ValueError(f"Q{number}: accepted without both Opus receipts")
            if solved[number]["answer"] != official and not entry.get("blindMismatchResolution"):
                raise ValueError(f"Q{number}: blind answer differs from official without a recorded resolution")
        if entry["status"] != "accepted":
            holds.append({"number": number, "reason": entry["reason"]})
            continue
        if holds:
            blocked.append(number)  # accepted, but never published past a HOLD
            continue
        draft = drafts[number]
        overrides = entry.get("overrides", {})
        choice_explanations = {**draft["choiceExplanations"], **overrides.get("choiceExplanations", {})}
        figure = question.get("figure")
        explanation = overrides.get("explanation", draft["explanation"])
        # Same curated e-Gov table as the 2024–2025 set, pinned to the law reference date.
        references = government_links(question["stem"] + " ".join(question["choices"]) + explanation,
                                      extraction["lawReferenceDate"])
        row = {
            "id": f"fp2-2026-published-gakka-q{number}",
            "exam": "fp2",
            "session": "gakka",
            "year": 2026,
            "season": "published",
            "qNumber": number,
            "type": "multiple-choice",
            "category": CATEGORIES[(number - 1) // 10],
            "topicTags": draft["topicTags"],
            "difficulty": draft["difficulty"],
            "question": question["stem"],
            "choices": dict(zip(KEYS, question["choices"], strict=True)),
            "answer": official,
            "explanation": explanation,
            "choiceExplanations": {key: choice_explanations[key] for key in KEYS},
            "hasImage": bool(figure),
            **({"imageUrls": [figure["url"]]} if figure else {}),
            "sourcePdfUrl": extraction["source"]["paperUrl"],
            "sourceAnswerUrl": extraction["source"]["answerUrl"],
            "sourceAttribution": extraction["attribution"] + (extraction["figureAttributionSuffix"] if figure else ""),
            **({"officialReferenceUrls": references} if references else {}),
            "license": "JAFP-reuse-with-attribution",
            **({"isCalculation": True} if draft["isCalculation"] else {}),
            "lawReferenceDate": extraction["lawReferenceDate"],
            "lastUpdated": LAST_UPDATED,
        }
        published.append(row)
    numbers = [row["qNumber"] for row in published]
    if numbers != list(range(FIRST, FIRST + len(numbers))):
        raise ValueError(f"Published range is not contiguous: {numbers}")
    OUTPUT.write_text(json.dumps(published, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    coverage = {
        "publishedRange": [FIRST, numbers[-1]] if numbers else None,
        "publishedCount": len(numbers),
        "holds": holds,
        "acceptedButBlockedByEarlierHold": blocked,
        "receipts": sorted({row["receipt"] for rows in (solved, drafts) for row in rows.values()}),
    }
    (EVIDENCE / "coverage.json").write_text(json.dumps(coverage, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"published Q{FIRST}-Q{numbers[-1] if numbers else '-'} ({len(numbers)}), holds: {[h['number'] for h in holds]}")


if __name__ == "__main__":
    main()
