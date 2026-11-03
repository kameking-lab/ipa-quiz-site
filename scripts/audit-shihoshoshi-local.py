#!/usr/bin/env python3
"""Audit saved source text and generated editorial data, including renderer parity.

Run from any directory with Python 3 (no package installation or network needed).
Formal explanation checks cannot certify PDF fidelity or legal correctness.
"""

import importlib.util
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
RENDER_SPEC = importlib.util.spec_from_file_location(
    "shihoshoshi_renderer", Path(__file__).with_name("apply-shihoshoshi-explanations.py"))
RENDERER = importlib.util.module_from_spec(RENDER_SPEC)
RENDER_SPEC.loader.exec_module(RENDERER)


def substantive_explanation(value):
    """A formal minimum per statement, not a legal accuracy assessment.

    Combination choices must explain both statements; labels, whitespace and
    judgments do not count towards the 20-character minimum for each reason.
    Renderer parity separately rejects any other drift from the authored draft.
    """
    if not isinstance(value, str) or not value.strip():
        return False
    lines = value.splitlines()
    for line in lines:
        reason = re.sub(r"^記述[アイウエオ]：", "", line.strip())
        match = re.fullmatch(r"(?:正しい|誤り)。(.+)", reason)
        if not match or len(normalize(match[1])) < 20:
            return False
        if any(phrase in reason for phrase in (
                "正答の組合せ", "公式正答の組合せ", "正答と一致", "一致しません",
                "解説を準備中", "詳細は確認中")):
            return False
    return bool(lines)


def check_generated(questions, check):
    holds = json.loads((DATA / "editorial/holds.json").read_text())
    pending_ids = {q["id"] for q in questions if q.get("needsReview")}
    full_ids = {q["id"] for q in questions if q.get("explanationCoverage") == "full"}
    all_ids = {q["id"] for q in questions}
    check(set(holds) == pending_ids, "holds.json: needsReview IDs/count differ")
    check(len(full_ids) == len(questions) - len(holds), "holds.json: full count differs")
    check(full_ids == all_ids - set(holds), "holds.json: full IDs differ")
    for q in questions:
        label = q["id"]
        explanations = q.get("choiceExplanations", {})
        check(set(explanations) == set(KEYS), f"{label}: explanation keys")
        for key in KEYS:
            value = explanations.get(key)
            check(isinstance(value, str) and bool(value.strip()), f"{label}: empty choice explanation {key}")
        if not q.get("needsReview"):
            check(q.get("explanationCoverage") == "full", f"{label}: released question must be full")
            check(all(substantive_explanation(explanations.get(k)) for k in KEYS),
                  f"{label}: released explanations must be substantive")
            check(len({str(explanations.get(k)) for k in KEYS}) == 5,
                  f"{label}: repeated choice explanations")

    # Use the exact render function used by --write/--check, with deep-copied
    # candidates, so audit(questions=...) also detects in-memory tampering.
    try:
        candidates = {year: [q for q in questions if q["year"] == year] for year in (2025, 2026)}
        outputs, rendered_holds = RENDERER.render(candidates)
        for year, records in candidates.items():
            expected = json.loads(outputs[DATA / f"{year}.json"])
            for actual, rendered in zip(records, expected):
                check(actual == rendered, f'{actual["id"]}: renderer output differs')
        check(holds == rendered_holds, "holds.json: renderer output differs")
    except (AssertionError, KeyError, TypeError, ValueError) as exc:
        check(False, f"renderer consistency failed: {exc}")


def normalize(text):
    # Layout, compatibility characters and extraction controls are not content.
    return re.sub(r"\s|[\x00-\x1f]", "", unicodedata.normalize("NFKC", text))


def source_blocks(year, session):
    text = (DATA / "source-text" / f"{year}-{session}.txt").read_text()
    text = unicodedata.normalize("NFKC", text).replace("\f", "\n")
    # Remove only identified layout and shared-instruction sections. Never locate
    # the expected body using the candidate question (that hides truncation).
    text = re.sub(r"(?m)^[^\n]*AQ\s*[―-]\s*[AB].*$", "", text)
    text = text.split("〔記入例〕", 1)[0]
    if session == "am":
        instruction = re.compile(
            r"以下の試験問題については、国際物品売買契約に関する国際連合条約.*?"
            r"また、第\s*4\s*問から第23問までの試験問題については、商法の適用は考慮しないものとし\s*て、解答してください。", re.S)
        matches = list(instruction.finditer(text))
        expected = PREMISES[1] + "また、第4問から第23問までの試験問題については、商法の適用は考慮しないものとして、解答してください。"
        if len(matches) != 1 or normalize(matches[0][0]) != normalize(expected):
            raise ValueError(f"{year}-{session}: missing/changed common civil instructions")
        text = instruction.sub("", text)
    start, end = (27, 34) if session == "am" else (28, 35)
    articles = re.compile(
        r"第\s*(27|28)問から第(34|35)問までの試験問題については、問題文に明記されている場合を除き、定\s*款"
        r"\s*に法令の規定と異なる別段の定めがないものとして、解答してください。")
    matches = list(articles.finditer(text))
    expected = f"第{start}問から第{end}問までの試験問題については、" + PREMISES[2]
    if len(matches) != 1 or normalize(matches[0][0]) != normalize(expected):
        raise ValueError(f"{year}-{session}: missing/changed articles instruction")
    text = articles.sub("", text)
    headings = list(re.finditer(r"(?m)^[ \t]*第\s*(\d+)\s*問", text))
    blocks = {}
    for index, heading in enumerate(headings):
        number = int(heading[1])
        if number > 35:
            continue
        end = headings[index + 1].start() if index + 1 < len(headings) else len(text)
        block = normalize(text[heading.end():end])
        # Reconstruct the independently specified common-premise presentation.
        prefix = ""
        if session == "am":
            if 4 <= number <= 23:
                prefix += PREMISES[0]
            if 27 <= number <= 34:
                prefix += PREMISES[2]
            if number >= 4:
                prefix += PREMISES[1]
        elif 28 <= number <= 35:
            prefix += PREMISES[2]
        if number in blocks:
            raise ValueError(f"{year}-{session}: duplicate source question {number}")
        blocks[number] = normalize(prefix) + block
    return blocks


def audit(questions=None, excluded=None):
    if questions is None:
        questions = []
        for year in (2025, 2026):
            questions.extend(json.loads((DATA / f"{year}.json").read_text()))
    if excluded is None:
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
    check_generated(questions, check)
    for year in (2025, 2026):
        for session in ("am", "pm"):
            records = [q for q in questions + excluded if q["year"] == year and q["session"] == session]
            check(sorted(q["qNumber"] for q in records) == list(range(1, 36)), f"{year}-{session}: numbering")
            blocks = source_blocks(year, session)
            for q in records:
                label = f'{year}-{session}-q{q["qNumber"]}'
                body = normalize(q["question"])
                check(list(q["choices"]) == list(KEYS), f"{label}: five ordered choices")
                choices = "".join(str(n) + normalize(q["choices"][key]) for n, key in enumerate(KEYS, 1))
                # Exact equality includes the beginning, all premises and the end.
                check(body + choices == blocks.get(q["qNumber"], ""), f"{label}: saved text differs")
                check(q["sourcePdfUrl"] == urls[(year, session)], f"{label}: problem URL")
                check(q["sourceAnswerUrl"] == urls[(year, "answers")], f"{label}: answer URL")
                if "id" not in q:
                    continue
                if year == 2026:
                    check(q.get("lawReferenceDate") == "2026-04-01", f"{label}: historical law date")
                    check("出題時点の法令（2026年4月1日現在）" in q["explanation"], f"{label}: law explanation date")
                else:
                    check("lawReferenceDate" not in q and "出題年度の法令" in q["explanation"]
                          and "2025年度の公式冊子に基準日の記載なし" in q["explanation"], f"{label}: no official law date in booklet")
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
        "scope": "saved extracted source text and formal editorial/renderer consistency; no fresh PDF or independent legal review",
        "localChecksPassed": not errors,
        "publicationApproved": False,
        "scorableQuestions": len(questions),
        "officiallyUnscorableQuestions": len(excluded),
        "counts": dict(sorted(Counter(f'{q["year"]}-{q["session"]}' for q in questions).items())),
        "bodyAndChoicesCompared": len(questions) + len(excluded),
        "officialAnswerEntriesCompared": 140,
        "needsReview": sum(q.get("needsReview", False) for q in questions),
        "fullExplanations": sum(q.get("explanationCoverage") == "full" for q in questions),
        "partialExplanations": sum("explanationCoverage" not in q for q in questions),
        "summaryOnlyExplanations": sum(q.get("explanationCoverage") == "official-summary" for q in questions),
        "imageQuestions": [q["id"] for q in questions if q.get("hasImage")],
        "errors": errors,
    }


if __name__ == "__main__":
    result = audit()
    print(json.dumps(result, ensure_ascii=False, indent=2))
    raise SystemExit(0 if result["localChecksPassed"] else 1)
