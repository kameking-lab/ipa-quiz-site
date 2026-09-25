"""Promote official-PDF-bound, independently accepted FP3 2026 questions."""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

from fp3_2026_may_review import KEYS, EVIDENCE, parse_result, verified

ROOT = Path(__file__).resolve().parents[1]
RECEIPTS = EVIDENCE / "receipts"
SOURCE_ROOT = ROOT / ".cache" / "fp3-official"
ACADEMIC_TARGET = ROOT / "data" / "questions" / "fp3" / "academic-2026-05.json"
PRACTICAL_TARGET = ROOT / "data" / "questions" / "fp3" / "practical-2026-05.json"
LEDGER_TARGET = EVIDENCE / "acceptance-ledger.json"
CATEGORY = (
    "ライフプランニングと資金計画", "リスク管理", "金融資産運用",
    "タックスプランニング", "不動産", "相続・事業承継",
)


def official_sha(pdf: str, key: str, manifest: dict) -> str:
    sha = hashlib.sha256((SOURCE_ROOT / pdf).read_bytes()).hexdigest()
    if sha != manifest["files"][key]["sha256"]:
        raise ValueError(f"Official PDF SHA changed: {pdf}")
    return sha


def load_receipt(path: Path) -> list[dict]:
    raw = json.loads(path.read_text(encoding="utf-8"))
    if not verified(raw):
        raise ValueError(f"Unverified Opus 5.5 receipt: {path}")
    return parse_result(raw)


def load_reviews(section: str, total: int) -> tuple[dict[int, dict], dict[int, dict]]:
    solved: dict[int, dict] = {}
    explained: dict[int, dict] = {}
    for first in range(1, total + 1, 10):
        last = min(first + 9, total)
        stem = f"{section}-q{first:02d}-{last:02d}"
        for name, target in (("solve", solved), ("explain", explained)):
            rows = load_receipt(RECEIPTS / f"{stem}-{name}.json")
            if [row["number"] for row in rows] != list(range(first, last + 1)):
                raise ValueError(f"Receipt sequence mismatch: {stem}-{name}")
            for row in rows:
                if row["number"] in target:
                    raise ValueError(f"Duplicate reviewed question: {row['number']}")
                target[row["number"]] = row
    return solved, explained


def resolve(section: str, number: int) -> dict | None:
    target = RECEIPTS / f"{section}-{number}-resolution.json"
    if not target.exists():
        return None
    rows = load_receipt(target)
    if len(rows) != 1 or rows[0]["number"] != number:
        raise ValueError(f"Resolution question mismatch: {target}")
    return rows[0]


def accepted(question: dict, solved: dict, draft: dict) -> bool:
    number = question["number"]
    answer = KEYS[question["answer"] - 1]
    keys = set(KEYS[: len(question["choices"])])
    reasons = draft.get("choiceExplanations", {})
    return (
        solved.get("number") == draft.get("number") == number
        and solved.get("answer") == answer
        and solved.get("confident") is True
        and draft.get("needsReview") is False
        and set(reasons) == keys
        and all(isinstance(reasons[key], str) and reasons[key].strip() for key in keys)
        and isinstance(draft.get("explanation"), str)
        and bool(draft["explanation"].strip())
    )


def main() -> None:
    manifest = json.loads((EVIDENCE / "manifest.json").read_text(encoding="utf-8"))
    figure_crops = json.loads((EVIDENCE / "figure-crops.json").read_text(encoding="utf-8"))
    academic_sha = official_sha("g3_202605_qa.pdf", "gakka", manifest)
    practical_sha = official_sha("j3_202605_q.pdf", "jitsugiQuestion", manifest)
    practical_answer_sha = official_sha("j3_202605_a.pdf", "jitsugiAnswer", manifest)
    academic_source = json.loads((EVIDENCE / "gakka-extraction.json").read_text(encoding="utf-8"))["202605"]
    practical_source = json.loads((EVIDENCE / "jitsugi-extraction.json").read_text(encoding="utf-8"))["202605"]
    panels = json.loads((ROOT / "data" / "questions" / "fp3" / "practical-figures-2026-05.json").read_text(encoding="utf-8"))["202605"]
    academic_solved, academic_explained = load_reviews("gakka", 60)
    practical_solved, practical_explained = load_reviews("jitsugi", 20)
    academic: list[dict] = []
    practical: list[dict] = []
    ledger: list[dict] = []
    for section, source, solved_set, draft_set, source_sha in (
        ("gakka", academic_source, academic_solved, academic_explained, academic_sha),
        ("jitsugi", practical_source, practical_solved, practical_explained, practical_sha),
    ):
        for q in source["questions"]:
            number = q["number"]
            solved = solved_set[number]
            draft = draft_set[number]
            resolution = resolve(section, number)
            if resolution:
                solved = resolution
                draft = resolution
            answer = KEYS[q["answer"] - 1]
            ok = accepted(q, solved, draft)
            ledger.append({
                "section": section,
                "number": number,
                "sourcePage": q["sourcePage"],
                "sourcePdfSha256": source_sha,
                "sourceAnswerPdfSha256": practical_answer_sha if section == "jitsugi" else academic_sha,
                "extractedQuestionSha256": hashlib.sha256(json.dumps(q, ensure_ascii=False, sort_keys=True).encode()).hexdigest(),
                "officialAnswer": answer,
                "blindAnswer": solved["answer"],
                "resolutionReceipt": f"{section}-{number}-resolution.json" if resolution else None,
                "status": "accepted" if ok else "HOLD",
            })
            if not ok:
                continue
            if section == "gakka":
                category = CATEGORY[(number - 1) // 10]
                figure = figure_crops["academic"].get(str(number))
                item = {
                    "id": f"fp3-2026-published-gakka-q{number}",
                    "exam": "fp3", "session": "gakka", "year": 2026,
                    "season": "published", "qNumber": number,
                    "type": "multiple-choice", "category": category,
                    "topicTags": [category], "difficulty": 2,
                    "question": q["stem"],
                    "choices": dict(zip(KEYS[: len(q["choices"])], q["choices"], strict=True)),
                    "answer": answer, "explanation": draft["explanation"],
                    "choiceExplanations": draft["choiceExplanations"],
                    "hasImage": bool(figure),
                    "sourcePdfUrl": "https://www.jafp.or.jp/exam/mohan/files/g3_202605_qa.pdf",
                    "sourceAnswerUrl": "https://www.jafp.or.jp/exam/mohan/files/g3_202605_qa.pdf",
                    "sourceAttribution": "出典：日本FP協会 3級ファイナンシャル・プランニング技能検定 学科試験（2026年5月公表分）。改行・空白と選択肢記号をWeb表示向けに整えています。",
                    "license": "JAFP-reuse-with-attribution", "needsReview": False,
                    "lastUpdated": "2026-09-25", "lawReferenceDate": source["lawReferenceDate"],
                }
                if figure:
                    item["imageUrls"] = [figure["url"]]
                if number == 20:
                    item["officialReferenceUrls"] = ["https://www.nta.go.jp/users/gensen/2025kiso/"]
                elif number == 35:
                    item["officialReferenceUrls"] = ["https://www.jfc.go.jp/n/finance/ippan/pdf/kyouiku_maruwakari.pdf"]
                academic.append(item)
            else:
                rendered = list(panels[str(number)])
                special = figure_crops["practical"].get(str(number))
                if special:
                    rendered.append({**special, "pdfPage": q["sourcePage"]})
                stem = q["stem"]
                if number == 2:
                    # The extracted table loses its columns on narrow screens. Keep
                    # the instruction and notes as text; show the official table crop.
                    lead, table_and_notes = stem.split("<東条家のキャッシュフロー表>", 1)
                    notes = table_and_notes[table_and_notes.index("※年齢および金融資産残高") :]
                    stem = lead.strip() + "\n\n＜東条家のキャッシュフロー表は下の原典画像に掲載＞\n\n" + notes
                practical.append({
                    **q, "stem": stem, "explanation": draft["explanation"],
                    "choiceExplanations": draft["choiceExplanations"],
                    "needsReview": False, "panels": rendered,
                })
    if [q["qNumber"] for q in academic] != list(range(1, 61)):
        raise ValueError(f"Academic strict gate: {len(academic)}/60")
    if [q["number"] for q in practical] != list(range(1, 21)):
        raise ValueError(f"Practical strict gate: {len(practical)}/20")
    ACADEMIC_TARGET.write_text(json.dumps(academic, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    PRACTICAL_TARGET.write_text(json.dumps({"202605": {"lawReferenceDate": practical_source["lawReferenceDate"], "questions": practical}}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    LEDGER_TARGET.write_text(json.dumps({"target": 80, "academicTarget": 60, "practicalTarget": 20, "acceptedAcademic": 60, "acceptedPractical": 20, "rows": ledger}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Promoted FP3 2026 academic 60/60 and practical 20/20")


if __name__ == "__main__":
    main()
