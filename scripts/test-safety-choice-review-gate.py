import copy
from hashlib import sha256
import tempfile
from pathlib import Path
import unittest

from safety_choice_review_gate import (candidate_issues, make_receipt, receipt_current,
                                      source_snapshot, validate_assessment)


class FullReviewGateTest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        (self.root / "public/images").mkdir(parents=True)
        (self.root / "public/images/q.webp").write_bytes(b"original image")
        self.q = {"id": "q1", "text": "original", "correctChoice": 2,
                  "choiceCount": 5, "answerAuthority": "official", "images": ["/images/q.webp"]}
        self.paper = {"id": "paper", "date": "2025-04", "pdfSha256": "f" * 64}
        self.candidate = {"correctChoice": 2, "sourceHash": sha256(b"original").hexdigest(),
                          "summary": "教材の選択肢ごとの判断根拠を明確に説明するための要約。",
                          "sources": [{"url": "https://www.mhlw.go.jp/example"}],
                          "choices": [{"number": i, "verdict": "correct" if i == 2 else "incorrect",
                                       "reason": str(i) + "specific reason " * 5} for i in range(1, 6)]}
        self.assessment = {"status": "PASS", "issues": [],
                           "choiceChecks": {str(i): "PASS" for i in range(1, 6)},
                           "evidenceUrls": ["https://www.mhlw.go.jp/example"],
                           **{k: True for k in ("officialAnswerChecked", "originalTextChecked",
                            "imagesChecked", "historicalApplicabilityChecked", "sourceSupportChecked")}}
        self.evidence = {"sha256": "a" * 64}

    def tearDown(self):
        self.tmp.cleanup()

    def receipt(self):
        return make_receipt("q1", source_snapshot(self.root, self.q, self.paper),
                            self.candidate, self.evidence, self.assessment, "opus")

    def test_complete_current_review_passes(self):
        self.assertEqual(candidate_issues(self.q, self.candidate, "lckohyo"), [])
        self.assertTrue(receipt_current(self.receipt(), source_snapshot(self.root, self.q, self.paper),
                                        self.candidate, self.evidence))

    def test_unchanged_image_path_does_not_hide_changed_bytes(self):
        receipt = self.receipt()
        (self.root / "public/images/q.webp").write_bytes(b"different diagram")
        self.assertFalse(receipt_current(receipt, source_snapshot(self.root, self.q, self.paper),
                                         self.candidate, self.evidence))

    def test_same_wording_different_date_invalidates_review(self):
        receipt = self.receipt()
        self.paper["date"] = "2026-04"
        self.assertFalse(receipt_current(receipt, source_snapshot(self.root, self.q, self.paper),
                                         self.candidate, self.evidence))

    def test_changed_candidate_or_evidence_invalidates_review(self):
        receipt = self.receipt()
        altered = copy.deepcopy(self.candidate)
        altered["choices"][0]["reason"] += " changed"
        snapshot = source_snapshot(self.root, self.q, self.paper)
        self.assertFalse(receipt_current(receipt, snapshot, altered, self.evidence))
        self.assertFalse(receipt_current(receipt, snapshot, self.candidate, {"sha256": "b" * 64}))

    def test_sampled_pass_cannot_authorize_full_question(self):
        del self.assessment["choiceChecks"]["5"]
        self.assertEqual(self.receipt()["status"], "HOLD")

    def test_conflict_and_unchecked_history_hold(self):
        self.assessment["issues"] = ["official answer contradicts quoted clause"]
        self.assertEqual(self.receipt()["status"], "HOLD")
        self.assessment["issues"] = []
        self.assessment["historicalApplicabilityChecked"] = False
        self.assertEqual(self.receipt()["status"], "HOLD")

    def test_fake_government_url_and_unchecked_citation_hold(self):
        self.assessment["evidenceUrls"] = ["https://www.mhlw.go.jp.attacker.test/example"]
        self.assertTrue(validate_assessment(self.assessment, self.candidate))

    def test_missing_image_cannot_be_silently_reviewed(self):
        (self.root / "public/images/q.webp").unlink()
        with self.assertRaises(ValueError):
            source_snapshot(self.root, self.q, self.paper)


if __name__ == "__main__":
    unittest.main()
