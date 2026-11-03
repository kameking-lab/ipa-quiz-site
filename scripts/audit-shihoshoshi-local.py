#!/usr/bin/env python3
"""Audit saved source text only; this cannot certify PDF fidelity or legal explanations.

Run from any directory with Python 3 (no package installation or network needed).
The JSON output deliberately distinguishes local checks from publication review.
"""

import json
import re
import unicodedata
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/questions/shihoshoshi"
KEYS = "アイウエオ"
PREMISES = (
    "商法の適用は考慮しないものとして、解答してください。\n",
    "以下の試験問題については、国際物品売買契約に関する国際連合条約（ウィーン売買条約）の適用は考慮しないものとして、解答してください。\n",
    "問題文に明記されている場合を除き、定款に法令の規定と異なる別段の定めがないものとして、解答してください。\n",
)


def normalize(text):
    # Layout, compatibility characters and extraction controls are not content.
    return re.sub(r"\s|[\x00-\x1f]", "", unicodedata.normalize("NFKC", text))


def source_blocks(year, session):
    text = (DATA / "source-text" / f"{year}-{session}.txt").read_text()
    text = unicodedata.normalize("NFKC", text).replace("\f", "\n")
    headings = list(re.finditer(r"(?m)^[ \t]*第\s*(\d+)\s*問", text))
    blocks = {}
    for index, heading in enumerate(headings):
        end = headings[index + 1].start() if index + 1 < len(headings) else len(text)
        block = text[heading.end():end]
        block = re.sub(r"(?m)^[^\n]*AQ\s*[―-]\s*[AB].*$", "", block)
        blocks[int(heading[1])] = normalize(block)
    return blocks


def audit():
    questions = []
    for year in (2025, 2026):
        questions.extend(json.loads((DATA / f"{year}.json").read_text()))
    excluded = json.loads((DATA / "excluded.json").read_text())
    sources = json.loads((DATA / "sources.json").read_text())
    urls = {(s["year"], s["session"]): s["url"] for s in sources}
    errors = []

    def check(condition, label):
        if not condition:
            errors.append(label)

    check(len(questions) == 139, "Expected 139 scorable questions")
    check(len({q["id"] for q in questions}) == 139, "Duplicate question IDs")
    check(len(excluded) == 1, "Expected one officially unscorable question")
    for year in (2025, 2026):
        for session in ("am", "pm"):
            records = [q for q in questions + excluded if q["year"] == year and q["session"] == session]
            check(sorted(q["qNumber"] for q in records) == list(range(1, 36)), f"{year}-{session}: numbering")
            blocks = source_blocks(year, session)
            for q in records:
                label = f'{year}-{session}-q{q["qNumber"]}'
                body = q["question"]
                for premise in PREMISES:
                    body = body.replace(premise, "")
                body = normalize(body)
                check(list(q["choices"]) == list(KEYS), f"{label}: five ordered choices")
                choices = "".join(str(n) + normalize(q["choices"][key]) for n, key in enumerate(KEYS, 1))
                # Contiguous body + choices must occur within this question's block.
                # A block may also contain shared instructions or end-of-booklet notes.
                check(body + choices in blocks.get(q["qNumber"], ""), f"{label}: saved text differs")
                check(q["sourcePdfUrl"] == urls[(year, session)], f"{label}: problem URL")
                check(q["sourceAnswerUrl"] == urls[(year, "answers")], f"{label}: answer URL")
                if "id" not in q:
                    continue
                check(q["lawReferenceDate"] == f"{year}-04-01", f"{label}: historical law date")
                check(f"出題時点の法令（{year}年4月1日現在）" in q["explanation"], f"{label}: law explanation date")
                check(set(q["choiceExplanations"]) == set(KEYS), f"{label}: explanation keys")
                for image in q.get("imageUrls", []):
                    check((ROOT / "public" / image.lstrip("/")).is_file(), f"{label}: missing image")

        text = normalize((DATA / "source-text" / f"{year}-answers.txt").read_text())
        rows = re.findall(r"第(\d+)問([1-5-])第(\d+)問([1-5-])", text)
        check(len(rows) == 35, f"{year}: expected 35 official answer rows")
        for am_number, am_answer, pm_number, pm_answer in rows:
            for session, number, answer in (("am", am_number, am_answer), ("pm", pm_number, pm_answer)):
                found = [q for q in questions if (q["year"], q["session"], q["qNumber"]) == (year, session, int(number))]
                if answer == "-":
                    check(not found and any((q["year"], q["session"], q["qNumber"]) == (year, session, int(number)) for q in excluded), f"{year}-{session}-{number}: exclusion")
                else:
                    check(len(found) == 1 and found[0]["officialAnswerNumber"] == answer and found[0]["answer"] == KEYS[int(answer) - 1], f"{year}-{session}-{number}: answer")

    return {
        "scope": "saved extracted source text; no fresh PDF or independent legal review",
        "localChecksPassed": not errors,
        "publicationApproved": False,
        "scorableQuestions": len(questions),
        "officiallyUnscorableQuestions": len(excluded),
        "counts": dict(sorted(Counter(f'{q["year"]}-{q["session"]}' for q in questions).items())),
        "bodyAndChoicesCompared": len(questions) + len(excluded),
        "officialAnswerEntriesCompared": 140,
        "needsReview": sum(q.get("needsReview", False) for q in questions),
        "summaryOnlyExplanations": sum(q.get("explanationCoverage") == "official-summary" for q in questions),
        "imageQuestions": [q["id"] for q in questions if q.get("hasImage")],
        "errors": errors,
    }


if __name__ == "__main__":
    result = audit()
    print(json.dumps(result, ensure_ascii=False, indent=2))
    raise SystemExit(0 if result["localChecksPassed"] else 1)
