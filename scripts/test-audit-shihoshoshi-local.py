#!/usr/bin/env python3
"""Regression checks: corrupt copies in memory, never the source question files."""

import copy
import importlib.util
import json
import unittest
from pathlib import Path
from unittest.mock import patch

SCRIPT = Path(__file__).with_name("audit-shihoshoshi-local.py")
SPEC = importlib.util.spec_from_file_location("shihoshoshi_audit", SCRIPT)
audit = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(audit)


class ExactSourceAudit(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.questions = sum((json.loads((audit.DATA / f"{year}.json").read_text())
                             for year in (2025, 2026)), [])
        cls.excluded = json.loads((audit.DATA / "excluded.json").read_text())

    def assert_body_rejected(self, records, q, excluded=None):
        result = audit.audit(records, self.excluded if excluded is None else excluded)
        self.assertFalse(result["localChecksPassed"])
        self.assertIn(f'{q["year"]}-{q["session"]}-q{q["qNumber"]}: saved text differs', result["errors"])

    def test_baseline(self):
        self.assertTrue(audit.audit(self.questions, self.excluded)["localChecksPassed"])

    def test_empty_choice_explanations(self):
        for held in (False, True):
            with self.subTest(held=held):
                records = copy.deepcopy(self.questions)
                q = next(q for q in records if bool(q.get("needsReview")) == held)
                q["choiceExplanations"] = dict.fromkeys(audit.KEYS, "")
                result = audit.audit(records, self.excluded)
                self.assertFalse(result["localChecksPassed"])
                self.assertTrue(any(": empty choice explanation" in e for e in result["errors"]))
                self.assertIn(f'{q["id"]}: renderer output differs', result["errors"])

    def test_releasing_one_held_question(self):
        records = copy.deepcopy(self.questions)
        q = next(q for q in records if q.get("needsReview"))
        q.pop("needsReview")
        q["explanationCoverage"] = "full"
        result = audit.audit(records, self.excluded)
        self.assertFalse(result["localChecksPassed"])
        self.assertEqual(result["needsReview"], 9)
        self.assertEqual(result["fullExplanations"], 130)
        self.assertIn("holds.json: needsReview IDs/count differ", result["errors"])
        self.assertIn("holds.json: full count differs", result["errors"])
        self.assertIn(f'{q["id"]}: renderer output differs', result["errors"])

    def test_released_question_requires_full_and_substantive_reasons(self):
        for kind in ("missing-full", "short", "boilerplate", "short-combination"):
            with self.subTest(kind=kind):
                records = copy.deepcopy(self.questions)
                q = next(q for q in records if not q.get("needsReview"))
                if kind == "missing-full":
                    q.pop("explanationCoverage")
                else:
                    q["choiceExplanations"]["ア"] = {
                        "short": "正しい。法令による。",
                        "boilerplate": "正しい。公式正答の組合せと一致するため、この選択肢が正しいと判断できる。",
                        "short-combination": "記述ア：正しい。法令による。\n記述イ：誤り。法令による。",
                    }[kind]
                result = audit.audit(records, self.excluded)
                self.assertFalse(result["localChecksPassed"])
                suffix = "released question must be full" if kind == "missing-full" else "released explanations must be substantive"
                self.assertIn(f'{q["id"]}: {suffix}', result["errors"])

    def test_substantive_but_changed_explanation_requires_renderer_parity(self):
        records = copy.deepcopy(self.questions)
        q = records[0]
        q["choiceExplanations"]["ア"] += "生成後に説明を書き換えたため原稿とは一致しない。"
        result = audit.audit(records, self.excluded)
        self.assertFalse(result["localChecksPassed"])
        self.assertIn(f'{q["id"]}: renderer output differs', result["errors"])

    def test_changed_holds_file_is_rejected(self):
        original = Path.read_text
        path = audit.DATA / "editorial/holds.json"
        holds = json.loads(original(path))
        holds.pop(next(iter(holds)))

        def read_text(p, *args, **kwargs):
            return json.dumps(holds) if p == path else original(p, *args, **kwargs)

        with patch.object(Path, "read_text", read_text):
            result = audit.audit(self.questions, self.excluded)
        self.assertFalse(result["localChecksPassed"])
        self.assertIn("holds.json: needsReview IDs/count differ", result["errors"])
        self.assertIn("holds.json: renderer output differs", result["errors"])

    def test_missing_first_ten_characters(self):
        for year in (2025, 2026):
            with self.subTest(year=year):
                records = copy.deepcopy(self.questions)
                q = next(q for q in records if (q["year"], q["session"], q["qNumber"]) == (year, "am", 1))
                q["question"] = q["question"][10:]
                self.assert_body_rejected(records, q)

    def test_missing_each_shared_premise(self):
        for year in (2025, 2026):
            for session, number, premise in [("am", 4, audit.PREMISES[0]),
                                              ("am", 4, audit.PREMISES[1]),
                                              ("am", 27, audit.PREMISES[2]),
                                              ("pm", 28, audit.PREMISES[2])]:
                with self.subTest(year=year, session=session, number=number, premise=premise):
                    records = copy.deepcopy(self.questions)
                    q = next(q for q in records if (q["year"], q["session"], q["qNumber"]) == (year, session, number))
                    self.assertIn(premise, q["question"])
                    q["question"] = q["question"].replace(premise, "", 1)
                    self.assert_body_rejected(records, q)

    def test_truncated_end_and_changed_choice(self):
        for kind in ("end", "choice"):
            with self.subTest(kind=kind):
                records = copy.deepcopy(self.questions)
                q = records[0]
                if kind == "end":
                    q["question"] = q["question"][:-10]
                else:
                    q["choices"]["ア"] = "改変した選択肢"
                self.assert_body_rejected(records, q)

    def test_excluded_question_also_requires_complete_text(self):
        excluded = copy.deepcopy(self.excluded)
        excluded[0]["question"] = excluded[0]["question"][10:]
        self.assert_body_rejected(self.questions, excluded[0], excluded)

    def test_changed_official_answer(self):
        records = copy.deepcopy(self.questions)
        q = records[0]
        q["answer"] = "オ" if q["answer"] != "オ" else "ア"
        result = audit.audit(records, self.excluded)
        self.assertFalse(result["localChecksPassed"])
        self.assertTrue(any(e.endswith(": answer") for e in result["errors"]))

    def test_layout_normalization_preserves_content(self):
        records = copy.deepcopy(self.questions)
        q = records[0]
        q["question"] = "\n　" + q["question"].replace("。", "。\n　")
        self.assertTrue(audit.audit(records, self.excluded)["localChecksPassed"])

    def test_changed_source_instruction_cannot_be_discarded(self):
        original = Path.read_text
        path = audit.DATA / "source-text/2025-am.txt"
        source = original(path)
        # The old broad instruction regex could swallow arbitrary changes.
        changed = source.replace("の適用は考慮しない", "の適用は考慮する", 1)
        self.assertTrue(source != changed, "mutation must change the shared instruction")

        def read_text(p, *args, **kwargs):
            return changed if p == path else original(p, *args, **kwargs)

        with patch.object(Path, "read_text", read_text):
            with self.assertRaisesRegex(ValueError, "common civil instructions"):
                audit.source_blocks(2025, "am")


if __name__ == "__main__":
    unittest.main(verbosity=2)
