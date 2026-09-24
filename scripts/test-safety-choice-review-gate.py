import copy
from hashlib import sha256
import importlib.util
import tempfile
from pathlib import Path
import unittest
from unittest.mock import patch

from safety_choice_review_gate import (candidate_issues, make_receipt, receipt_current,
                                      source_snapshot, validate_assessment)

REVIEW_SPEC = importlib.util.spec_from_file_location(
    "review_safety_choice_clusters", Path(__file__).with_name("review-safety-choice-clusters.py"))
REVIEW = importlib.util.module_from_spec(REVIEW_SPEC)
REVIEW_SPEC.loader.exec_module(REVIEW)


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
        model_proof = {"requestedModel": "claude-opus-5-5",
                       "resolvedModel": "claude-opus-5-5", "rawResolvedModel": None,
                       "provider": "firstParty", "modelUsage": {"claude-opus-5-5": {
                           "canonicalModel": "claude-opus-5-5", "provider": "firstParty"}}}
        return make_receipt("q1", source_snapshot(self.root, self.q, self.paper),
                            self.candidate, self.evidence, self.assessment, model_proof)

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

    def test_alias_cannot_be_recorded_as_verified_model(self):
        model_proof = {"requestedModel": "opus", "resolvedModel": "opus",
                       "rawResolvedModel": "opus", "provider": "firstParty",
                       "modelUsage": {"opus": {"canonicalModel": "opus",
                                                  "provider": "firstParty"}}}
        receipt = make_receipt("q1", source_snapshot(self.root, self.q, self.paper),
                               self.candidate, self.evidence, self.assessment, model_proof)
        self.assertEqual(receipt["status"], "HOLD")

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

    def test_official_pdf_bytes_must_match_catalog_digest(self):
        payload = b"%PDF-1.7 original exam"
        self.paper.update(pdfUrl="https://www.exam.or.jp/original.pdf",
                          pdfSha256=sha256(payload).hexdigest())
        class Response:
            content = payload
            def raise_for_status(self):
                pass
        with patch.object(REVIEW.requests, "get", return_value=Response()) as fetched:
            path = REVIEW.verified_official_pdf(self.root, self.paper)
            self.assertEqual(path.read_bytes(), payload)
            path.write_bytes(b"tampered local PDF")
            self.assertEqual(REVIEW.verified_official_pdf(self.root, self.paper).read_bytes(), payload)
            self.assertEqual(fetched.call_count, 2)
        path.unlink()
        with patch.object(REVIEW.requests, "get", return_value=type(
            "BadResponse", (), {"content": b"changed server PDF", "raise_for_status": lambda self: None})()):
            with self.assertRaisesRegex(ValueError, "Official PDF content mismatch"):
                REVIEW.verified_official_pdf(self.root, self.paper)

    def test_government_source_bytes_must_match_pinned_receipt(self):
        payload = b'{"law":"verified original"}'
        source = {"url": "https://laws.e-gov.go.jp/law/test",
                  "retrieval": {"retrievalUrl": "https://laws.e-gov.go.jp/api/2/law_data/test",
                                "sha256": sha256(payload).hexdigest(), "bytes": len(payload),
                                "contentType": "application/json"}}
        response = type("Response", (), {"content": payload,
                        "raise_for_status": lambda self: None})()
        with patch.object(REVIEW.requests, "get", return_value=response) as fetched:
            path = REVIEW.verified_government_source(self.root, source)
            self.assertEqual(path.read_bytes(), payload)
            self.assertEqual(fetched.call_count, 1)
        path.unlink()
        bad = type("Response", (), {"content": b"changed",
                   "raise_for_status": lambda self: None})()
        with patch.object(REVIEW.requests, "get", return_value=bad):
            with self.assertRaisesRegex(ValueError, "Government source content mismatch"):
                REVIEW.verified_government_source(self.root, source)

    def test_candidate_sources_are_pinned_with_exact_bytes(self):
        payload = b"government source body" * 30
        drafts = {"q1": {"sources": [{"url": "https://www.mhlw.go.jp/new.html#part",
                                        "title": "new source"}]}}
        response = type("Response", (), {"content": payload,
                        "headers": {"Content-Type": "text/html"},
                        "raise_for_status": lambda self: None})()
        with patch.object(REVIEW.requests, "get", return_value=response):
            packs, unpinnable = REVIEW.pin_candidate_sources(self.root, drafts, [], "lckohyo")
        self.assertEqual(unpinnable, {})
        source = packs[-1]["content"]["sources"][0]
        self.assertEqual(source["retrieval"]["retrievalUrl"],
                         "https://www.mhlw.go.jp/new.html")
        self.assertEqual(source["retrieval"]["sha256"], sha256(payload).hexdigest())
        self.assertEqual(source["relevantQuestionIds"], ["q1"])

    def test_dead_candidate_citation_is_reported_not_fatal(self):
        drafts = {"q1": {"sources": [{"url": "https://www.mhlw.go.jp/missing.pdf",
                                        "title": "mistyped"}]}}
        def fail(self):
            raise REVIEW.requests.HTTPError("404 Client Error")
        response = type("Response", (), {"content": b"", "headers": {},
                        "raise_for_status": fail})()
        with patch.object(REVIEW.requests, "get", return_value=response):
            packs, unpinnable = REVIEW.pin_candidate_sources(self.root, drafts, [], "lckohyo")
        self.assertIn("https://www.mhlw.go.jp/missing.pdf", unpinnable)
        self.assertEqual(packs, [])

    def test_second_question_citing_pinned_url_gets_scoped_pack(self):
        url = "https://www.mhlw.go.jp/doc.pdf#page=3"
        existing = [{"path": "legacy", "sha256": "x", "content": {"sources": [
            {"url": url, "relevantQuestionIds": ["q1"]}]}}]
        drafts = {"q1": {"sources": [{"url": url, "title": "doc"}]},
                  "q2": {"sources": [{"url": url, "title": "doc"}]}}
        payload = b"government source body" * 30
        response = type("Response", (), {"content": payload,
                        "headers": {"Content-Type": "application/pdf"},
                        "raise_for_status": lambda self: None})()
        with patch.object(REVIEW.requests, "get", return_value=response):
            packs, _ = REVIEW.pin_candidate_sources(self.root, drafts, existing, "lckohyo")
        self.assertEqual([p["content"]["questionIds"] for p in packs], [["q2"]])

    def test_refreshed_pack_is_scoped_to_named_questions(self):
        packs = [{"path": "old", "sha256": "a", "content": {"sources": [
            {"url": "https://www.mhlw.go.jp/shared", "relevantQuestionIds": ["q1"]}]}},
                 {"path": "refresh", "sha256": "b", "content": {"sources": [
            {"url": "https://www.mhlw.go.jp/shared", "relevantQuestionIds": ["q2"]}]}}]
        self.assertEqual([p["path"] for p in REVIEW.evidence_for_question(
            packs, "q1", {"https://www.mhlw.go.jp/shared"})], ["old"])
        self.assertEqual([p["path"] for p in REVIEW.evidence_for_question(
            packs, "q2", {"https://www.mhlw.go.jp/shared"})], ["refresh"])


if __name__ == "__main__":
    unittest.main()
