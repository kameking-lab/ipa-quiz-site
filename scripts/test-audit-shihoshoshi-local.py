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
