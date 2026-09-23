"""Offline safety checks for the resumable choice-explanation authoring gate."""

import importlib.util
import json
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location(
    "complete_safety_choice_explanations", ROOT / "scripts/complete-safety-choice-explanations.py"
)
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class ChoiceAuthoringGateTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.question = json.loads((ROOT / "data/exam-library/papers/lckohyo-LC20252115.json").read_text(encoding="utf-8"))[0]
        cls.overlay = json.loads((ROOT / "data/exam-library/choice-explanations.json").read_text(encoding="utf-8"))[cls.question["id"]]

    def test_current_reviewed_overlay_passes(self):
        self.assertEqual(MODULE.validate_overlay(self.question, self.overlay), [])

    def test_answer_and_original_text_both_pin_reuse(self):
        changed_answer = dict(self.question, correctChoice=2)
        changed_text = dict(self.question, text=self.question["text"] + "変更")
        self.assertNotEqual(MODULE.fingerprint(changed_answer), MODULE.fingerprint(self.question))
        self.assertNotEqual(MODULE.fingerprint(changed_text), MODULE.fingerprint(self.question))
        self.assertTrue(MODULE.validate_overlay(changed_answer, self.overlay))
        self.assertTrue(MODULE.validate_overlay(changed_text, self.overlay))

    def test_repeated_reason_is_rejected(self):
        bad = dict(self.overlay, choices=[dict(choice) for choice in self.overlay["choices"]])
        bad["choices"][1]["reason"] = bad["choices"][0]["reason"]
        self.assertIn("duplicate choice reasons", " ".join(MODULE.validate_overlay(self.question, bad)))

    def test_source_host_must_be_government(self):
        self.assertTrue(MODULE.government_url("https://laws.e-gov.go.jp/law/347AC0000000057"))
        for url in ["https://go.jp.example.com/law", "https://www.exam.or.jp/paper.pdf", "http://www.mhlw.go.jp/", "https://go.jp/"]:
            self.assertFalse(MODULE.government_url(url), url)


if __name__ == "__main__":
    unittest.main()
