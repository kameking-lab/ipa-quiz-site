"""Regression tests for the EM publication receipt's ID and candidate binding."""

from pathlib import Path
import json
import runpy
import subprocess
import sys
import unittest


publication_integrity = runpy.run_path(
    str(Path(__file__).with_name('emkohyo-choice-status.py'))
)['publication_integrity']


class PublicationIntegrityTest(unittest.TestCase):
    def test_equal_counts_reject_stale_candidate(self):
        result = publication_integrity(
            {'q1', 'q2'}, {'q1': {'reason': 'reviewed'}, 'q2': {'reason': 'reviewed'}},
            {'q1': {'reason': 'reviewed'}, 'q2': {'reason': 'old'}}
        )
        self.assertEqual(result['verifiedPublicOverlays'], 1)
        self.assertEqual(result['publishedCandidateMismatch'], ['q2'])
        self.assertFalse(result['complete'])

    def test_equal_counts_reject_different_ids(self):
        result = publication_integrity(
            {'q1', 'q2'}, {'q1': {'reason': 'reviewed'}, 'q2': {'reason': 'reviewed'}},
            {'q1': {'reason': 'reviewed'}, 'q3': {'reason': 'reviewed'}}
        )
        self.assertEqual(result['missingPublicOverlays'], ['q2'])
        self.assertFalse(result['complete'])

    def test_equal_counts_reject_missing_direct_review(self):
        result = publication_integrity(
            {'q1', 'q2'}, {'q1': {'reason': 'reviewed'}},
            {'q1': {'reason': 'reviewed'}, 'q2': {'reason': 'unchecked'}}
        )
        self.assertEqual(result['publishedWithoutCurrentReview'], ['q2'])
        self.assertFalse(result['complete'])

    def test_exact_same_ids_and_candidates_pass(self):
        reviewed = {'q1': {'reason': 'one'}, 'q2': {'reason': 'two'}}
        result = publication_integrity(set(reviewed), reviewed, dict(reviewed))
        self.assertEqual(result['verifiedPublicOverlays'], 2)
        self.assertTrue(result['complete'])

    def test_committed_public_overlays_match_current_receipts(self):
        output = subprocess.check_output(
            [sys.executable, str(Path(__file__).with_name('emkohyo-choice-status.py'))],
            text=True,
        )
        status = json.loads(output)
        self.assertEqual(status['publishedWithoutCurrentReview'], [])
        self.assertEqual(status['publishedCandidateMismatch'], [])
        self.assertEqual(status['publicOverlays'], status['verifiedPublicOverlays'])


if __name__ == '__main__':
    unittest.main()
