"""Build data/questions/sharoushi/*.json from the frozen transcription and the explanations.

Run from the repository root: python3 -I docs/evidence/sharoushi10-20261010/build_data.py
Fails (exit 1) without writing anything when any check below does not hold.
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
EVIDENCE = Path(__file__).resolve().parent
manifest = json.loads((EVIDENCE / "PUBLIC-SOURCE-MANIFEST.json").read_text())
transcript = json.loads((EVIDENCE / "transcriptB.json").read_text())
explanations = json.loads((EVIDENCE / "explanations.json").read_text())
compare = json.loads((EVIDENCE / "compare-result.json").read_text())
review = json.loads((EVIDENCE / "review.json").read_text())

KEYS = dict(zip("ABCDE", "アイウエオ"))
SUBJECT = "労働基準法及び労働安全衛生法"
ERA = {2026: "令和8年度", 2025: "令和7年度"}
errors = []

if compare["problems"] or compare["choices"] != 50 or compare["questions"] != 10:
    errors.append(f"transcription A/B comparison not clean: {compare}")
open_findings = [f for f in review["findings"] if f.get("severity") == "blocking" and f.get("status") != "resolved"]
if review["result"] not in ("PASS", "PASS_AFTER_FIX") or open_findings:
    errors.append(f"independent content check not PASS: {review['result']} open={open_findings}")


def text(s: str) -> str:
    # The PDF text layer encodes thousands separators as full-width commas; the printed page shows ",".
    return re.sub(r"(?<=\d)，(?=\d{3})", ",", s)


def average_wage_2025_q2a() -> int:
    # 2025 問2A: 3/21–6/20 (92 days), wages 300,000 yen over 30 working days, daily-wage minimum 60%.
    days = 11 + 30 + 31 + 20
    total, work_days = 300_000, 30
    principle = int(total / days * 100) / 100
    minimum = total / work_days * 0.6
    return int(max(principle, minimum))


if average_wage_2025_q2a() != 6000:
    errors.append("2025 問2A calculation does not give 6,000円")

by_year: dict[int, list] = {}
sitting_of = {s["year"]: s for s in manifest["sittings"]}
for q in transcript["questions"]:
    year, n = q["year"], q["questionNumber"]
    sitting = sitting_of[year]
    mq = next(x for x in sitting["questions"] if x["questionNumber"] == n)
    ex = explanations["questions"][f"{year}-{n}"]
    answer = mq["officialAnswer"]
    if q["officialAnswer"] != answer or q["selectionIntent"] != mq["selectionIntent"]:
        errors.append(f"{year}-{n} transcript meta differs from manifest")
    if sorted(ex["choices"]) != list("ABCDE"):
        errors.append(f"{year}-{n} explanations missing choices")
    # Direction check: the official answer is the only 正しい (or only 誤り) statement.
    target = "正しい" if mq["selectionIntent"] == "correct" else "誤り"
    for c, v in ex["choices"].items():
        if v["verdict"] not in ("正しい", "誤り"):
            errors.append(f"{year}-{n}{c} bad verdict")
        if (v["verdict"] == target) != (c == answer):
            errors.append(f"{year}-{n}{c} verdict {v['verdict']} conflicts with official answer {answer} ({mq['selectionIntent']})")
        if not v["text"].startswith(v["verdict"]):
            errors.append(f"{year}-{n}{c} text does not open with its verdict")
        if ("この問の正答" in v["text"]) != (c == answer):
            errors.append(f"{year}-{n}{c} 正答 marker mismatch")
    if f"正答は{answer}" not in ex["summary"]:
        errors.append(f"{year}-{n} summary does not state 正答は{answer}")
    refs = [explanations["sources"][r["source"]]["url"] for r in ex["refs"]]
    label = f"第{sitting['sittingNumber']}回（{ERA[year]}）"
    by_year.setdefault(year, []).append({
        "id": f"sharoushi-{year}-annual-gakka-q{n}",
        "exam": "sharoushi",
        "session": "gakka",
        "year": year,
        "season": "annual",
        "qNumber": n,
        "subject": SUBJECT,
        "officialAnswerNumber": answer,
        "type": "multiple-choice",
        "category": ex["category"],
        "topicTags": [SUBJECT, *ex["topicTags"], label],
        "difficulty": 3,
        "question": text(q["stem"]),
        "choices": {KEYS[c]: text(v) for c, v in q["choices"].items()},
        "answer": KEYS[answer],
        "explanation": ex["summary"],
        "choiceExplanations": {KEYS[c]: v["text"] for c, v in ex["choices"].items()},
        "explanationCoverage": "full",
        "hasImage": False,
        "sourcePdfUrl": sitting["questionSource"]["url"],
        "sourceAnswerUrl": sitting["answerSource"]["url"],
        "sourceAttribution": (
            f"出典：全国社会保険労務士会連合会 試験センター {label}社会保険労務士試験 択一式「{SUBJECT}」問{n}（問題・正答）。"
            "問題文は原文どおりで、数字を算用数字に統一する加工のみ行っています。"
            "解説は過去問AIの独自作成で、試験センターとは関係ありません。"
        ),
        "officialReferenceUrls": list(dict.fromkeys([manifest["officialIndexUrl"], *refs])),
        "license": "SHAROSI-attributed",
        "needsReview": False,
        "lastUpdated": "2026-10-10",
        "lawReferenceDate": sitting["legalReferenceDate"],
    })

total = sum(len(v) for v in by_year.values())
if total != 10 or sum(len(q["choices"]) for v in by_year.values() for q in v) != 50:
    errors.append(f"expected 10 questions / 50 choices, got {total}")

if errors:
    print("\n".join(errors))
    sys.exit(1)

out = ROOT / "data/questions/sharoushi"
out.mkdir(parents=True, exist_ok=True)
for year, items in by_year.items():
    items.sort(key=lambda q: q["qNumber"])
    (out / f"{year}-annual.json").write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n")
print(f"wrote {total} questions / 50 choices to {out.relative_to(ROOT)}")
