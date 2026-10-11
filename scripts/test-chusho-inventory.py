"""Synthetic metadata tests. No real exam content or answer keys are used."""
import copy
import importlib.util
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("inventory", ROOT / "scripts/validate-chusho-inventory.py")
inventory = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(inventory)


class ChushoInventoryTest(unittest.TestCase):
    def setUp(self):
        self.manifest = json.loads((ROOT / "docs/evidence/chusho-latest-two-20261011/INVENTORY.json").read_text(encoding="utf-8"))

    def test_checkpoint_preserves_all_holds(self):
        result = inventory.validate_inventory(self.manifest)
        self.assertTrue(result["valid"])
        self.assertFalse(result["readyToPublish"])
        self.assertEqual(result["candidateOriginals"], 0)
        self.assertEqual(len(result["subjects"]), 14)
        self.assertTrue(all(x["remainingOriginals"] is None for x in result["subjects"]))

    def test_duplicate_same_year_subject_number_is_rejected(self):
        row = {"year": 2026, "subjectCode": "A", "qNumber": 1}
        self.assertFalse(inventory.validate_inventory(self.manifest, [row, copy.copy(row)])["valid"])

    def test_same_question_number_in_different_subjects_and_years_is_unique(self):
        rows = [{"year": y, "subjectCode": s, "qNumber": 1} for y in (2026, 2025) for s in "AB"]
        result = inventory.validate_inventory(self.manifest, rows)
        self.assertTrue(result["valid"])
        self.assertEqual(result["candidateOriginals"], 4)
        self.assertFalse(result["readyToPublish"])

    def test_subquestions_are_counted_as_one_original(self):
        rows = [{"year": 2025, "subjectCode": "G", "qNumber": 1, "part": p} for p in ("1", "2")]
        result = inventory.validate_inventory(self.manifest, rows)
        self.assertTrue(result["valid"])
        self.assertEqual(result["candidateOriginals"], 1)
        self.assertEqual(result["candidateAnswerUnits"], 2)

    def test_mixed_parent_and_part_is_rejected(self):
        rows = [{"year": 2025, "subjectCode": "G", "qNumber": 1}, {"year": 2025, "subjectCode": "G", "qNumber": 1, "part": "1"}]
        self.assertFalse(inventory.validate_inventory(self.manifest, rows)["valid"])

    def test_guessing_required_count_is_rejected(self):
        self.manifest["counts"]["requiredOriginals"] = 999
        self.assertFalse(inventory.validate_inventory(self.manifest)["valid"])

    def test_hold_cannot_be_cleared_by_metadata(self):
        self.manifest["gate"]["rights"] = "PASS"
        self.assertFalse(inventory.validate_inventory(self.manifest)["valid"])

    def test_subject_omission_and_duplication_are_rejected(self):
        self.manifest["subjects"][-1] = copy.deepcopy(self.manifest["subjects"][0])
        self.assertFalse(inventory.validate_inventory(self.manifest)["valid"])

    def test_question_content_is_not_accepted(self):
        row = {"year": 2026, "subjectCode": "A", "qNumber": 1, "answer": "synthetic"}
        self.assertFalse(inventory.validate_inventory(self.manifest, [row])["valid"])

    def test_zero_negative_boolean_and_wrong_scope_numbers_are_rejected(self):
        for field, value in [("qNumber", 0), ("qNumber", -1), ("qNumber", True), ("year", 2024), ("subjectCode", "H"), ("part", "a")]:
            with self.subTest(field=field, value=value):
                row = {"year": 2026, "subjectCode": "A", "qNumber": 1, field: value}
                self.assertFalse(inventory.validate_inventory(self.manifest, [row])["valid"])

    def test_nonofficial_sources_are_rejected(self):
        self.manifest["subjects"][0]["questionIndexUrl"] = "https://www.jf-cmca.jp.example.com/contents/test"
        self.assertFalse(inventory.validate_inventory(self.manifest)["valid"])

    def test_holes_are_reported_without_guessing_total(self):
        rows = [{"year": 2026, "subjectCode": "A", "qNumber": n} for n in (1, 3)]
        result = inventory.validate_inventory(self.manifest, rows)
        subject = next(x for x in result["subjects"] if x["year"] == 2026 and x["subjectCode"] == "A")
        self.assertEqual(subject["missingBeforeHighestCandidateNumber"], [2])
        self.assertIsNone(subject["remainingOriginals"])


if __name__ == "__main__":
    unittest.main()
