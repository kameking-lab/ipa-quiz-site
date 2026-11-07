"""Recheck all unpublished choice drafts against the staged questions and answer key.

This is an author-side consistency audit, not independent medical/legal review.
"""

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parent
questions = json.loads((ROOT / "extracted-questions.json").read_text(encoding="utf-8"))
receipt = json.loads((ROOT / "source-receipt.json").read_text(encoding="utf-8"))
drafts = [
    entry
    for path in ROOT.glob("draft-choice-reasons-q*.json")
    for entry in json.loads(path.read_text(encoding="utf-8"))
]
assert len(questions) == len(drafts) == 120
assert {x["number"] for x in drafts} == set(range(1, 121))
drafts_by_number = {x["number"]: x for x in drafts}
counts = {"truth_tables": 0, "pair_choices": 0, "fill_choices": 0, "single_choices": 0}

for question in questions:
    number = question["number"]
    draft = drafts_by_number[number]
    assert draft["status"] == "SOURCE_GROUNDED_DRAFT_INDEPENDENT_REVIEW_PENDING"
    assert draft["guidelineUrl"] == receipt["guidelineUrl"]
    assert draft["guidelinePdfPages"] and all(
        1 <= page <= receipt["pdfPages"]["手引き"]
        for page in draft["guidelinePdfPages"]
    )
    choices = draft["choiceReasons"]
    assert len(choices) == len(question["choices"]) == 5, number
    assert [x["number"] for x in choices] == [1, 2, 3, 4, 5], number
    assert all(len(x["reason"].strip()) >= 15 for x in choices), number
    assert sum(x["correct"] for x in choices) == 1, number
    assert choices[question["officialAnswerNumber"] - 1]["correct"], number

    if "fillReviews" in draft:
        expected = {label: entry["correct"] for label, entry in draft["fillReviews"].items()}
        assert set(expected) == set("ａｂｃ")
        for raw, reviewed in zip(question["choices"], choices):
            given = dict(re.findall(r"([ａｂｃ])：([^　]+)", raw))
            assert set(given) == set(expected), number
            assert reviewed["correct"] == (given == expected), number
            for label, answer in expected.items():
                if given[label] != answer or reviewed["correct"]:
                    assert label in reviewed["reason"] and answer in reviewed["reason"], number
            counts["fill_choices"] += 1
    elif "statementReviews" in draft:
        statements = draft["statementReviews"]
        assert set(statements) == set("ａｂｃｄ"), number
        assert all(x["judgment"] in {"正", "誤"} and len(x["reason"]) >= 12 for x in statements.values())
        is_pair = all(len(set(re.findall(r"[ａｂｃｄ]", raw))) == 2 for raw in question["choices"])
        if is_pair:
            selected_at_answer = set(re.findall(r"[ａｂｃｄ]", question["choices"][question["officialAnswerNumber"] - 1]))
            actual_truths = {label for label, value in statements.items() if value["judgment"] == "正"}
            actual_falses = set(statements) - actual_truths
            assert selected_at_answer in (actual_truths, actual_falses), number
            expected = selected_at_answer
            for raw, reviewed in zip(question["choices"], choices):
                selected = set(re.findall(r"[ａｂｃｄ]", raw))
                assert reviewed["correct"] == (selected == expected), number
                mismatch = selected.symmetric_difference(expected)
                for label in mismatch or expected:
                    assert label in reviewed["reason"] and statements[label]["reason"] in reviewed["reason"], number
                counts["pair_choices"] += 1
        else:
            for raw, reviewed in zip(question["choices"], choices):
                given = dict(re.findall(r"([ａｂｃｄ])(正|誤)", raw))
                assert set(given) == set(statements), number
                mismatches = [label for label, item in statements.items() if given[label] != item["judgment"]]
                assert reviewed["correct"] == (not mismatches), number
                for label in mismatches or statements:
                    assert label in reviewed["reason"] and statements[label]["reason"] in reviewed["reason"], number
                counts["truth_tables"] += 1
    else:
        for reviewed in choices:
            assert reviewed["reason"].strip(), number
            counts["single_choices"] += 1

assert sum(counts.values()) == 600
print("PASS: all 120 draft questions and 600 choice reasons are internally consistent with staged choices and official answer positions")
print(counts)
progress = json.loads((ROOT / "qa-progress-20260928.json").read_text(encoding="utf-8"))
independent_count = progress.get("independentReview", {}).get("choiceReasons", 0)
assert 0 <= independent_count <= 600
print(f"HOLD: structural audit only; independent source-content review {independent_count}/600")
