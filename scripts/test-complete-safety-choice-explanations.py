"""Offline safety checks for the resumable choice-explanation authoring gate."""

import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from types import SimpleNamespace
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location(
    "complete_safety_choice_explanations", ROOT / "scripts/complete-safety-choice-explanations.py"
)
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)
SOURCE_SPEC = importlib.util.spec_from_file_location(
    "build_safety_choice_source_packs", ROOT / "scripts/build-safety-choice-source-packs.py"
)
SOURCE_MODULE = importlib.util.module_from_spec(SOURCE_SPEC)
SOURCE_SPEC.loader.exec_module(SOURCE_MODULE)


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
        self.assertTrue(MODULE.government_url("https://www.stat.go.jp/naruhodo/10_tokucho/chirabari.html"))
        self.assertTrue(MODULE.government_url("https://www.fdma.go.jp/laws/kokuji/post95/"))
        for url in ["https://go.jp.example.com/law", "https://www.exam.or.jp/paper.pdf", "http://www.mhlw.go.jp/", "https://go.jp/", "https://okayamas.johas.go.jp/example"]:
            self.assertFalse(MODULE.government_url(url), url)

    def test_subject_pack_is_retrieved_without_claiming_applicability(self):
        question = dict(self.question, subject="第二種衛生管理者")
        hints = MODULE.source_hints([question])
        self.assertGreaterEqual(len(hints), 10)
        self.assertTrue(all(len(source["retrievalSha256"]) == 64 for source in hints))
        self.assertFalse(any("johas.go.jp" in source["url"] for source in hints))

    def test_egov_historical_source_uses_matching_revision_api(self):
        self.assertEqual(
            SOURCE_MODULE.retrieval_url("https://laws.e-gov.go.jp/law/347M50002000032/20250401_505M60000100121"),
            "https://laws.e-gov.go.jp/api/2/law_data/347M50002000032_20250401_505M60000100121",
        )
        self.assertEqual(
            SOURCE_MODULE.retrieval_url("https://www.mhlw.go.jp/content/001104962.pdf#page=79"),
            "https://www.mhlw.go.jp/content/001104962.pdf",
        )

    def test_authoring_only_creates_candidate_not_publication(self):
        with tempfile.TemporaryDirectory() as temp:
            log = Path(temp) / "drafts"
            output = Path(temp) / "choice-explanations.json"
            output.write_text("{}\n", encoding="utf-8")
            candidate = dict(self.overlay)
            candidate.pop("sourceHash")
            with (patch.object(MODULE, "LOG", log), patch.object(MODULE, "OUTPUT", output),
                  patch.object(MODULE, "call_claude", return_value={self.question["id"]: candidate})):
                MODULE.author_candidate(([dict(self.question, subject="第二種衛生管理者")], "test-batch"),
                                        "claude-opus-5-5")
            self.assertTrue((log / "test-batch.candidate.json").exists())
            self.assertEqual(output.read_text(encoding="utf-8"), "{}\n")
            self.assertFalse((log / "test-batch.accepted.json").exists())

    def test_authoring_disables_web_tools(self):
        with tempfile.TemporaryDirectory() as temp:
            log = Path(temp) / "drafts"
            candidate = dict(self.overlay)
            candidate.pop("sourceHash")
            with (patch.object(MODULE, "LOG", log),
                  patch.object(MODULE, "source_hints", return_value=[]),
                  patch.object(MODULE, "call_claude",
                               return_value={self.question["id"]: candidate}) as called):
                MODULE.author_candidate(([dict(self.question, subject="第二種衛生管理者")],
                                         "local-only"), "claude-opus-5-5")
            self.assertEqual(called.call_args.kwargs["tools"], ("Read", "Glob", "Grep"))

    def test_model_receipt_uses_actual_cli_model_id(self):
        with tempfile.TemporaryDirectory() as temp:
            cli = Path(temp) / "npm/node_modules/@anthropic-ai/claude-code/bin/claude.exe"
            cli.parent.mkdir(parents=True)
            cli.touch()
            rows = [
                {"type": "assistant", "message": {"model": "claude-opus-5-5"}},
                {"type": "result", "subtype": "success", "result": '{"qid":{"status":"PASS"}}',
                 "resolvedModel": None, "modelUsage": {"claude-opus-5-5": {
                     "canonicalModel": "claude-opus-5-5", "provider": "firstParty"}}},
            ]

            def fake_run(command, **kwargs):
                kwargs["stdout"].write("\n".join(json.dumps(row) for row in rows) + "\n")
                kwargs["stdout"].flush()
                return SimpleNamespace(returncode=0)

            with patch.dict(MODULE.os.environ, {"APPDATA": temp}), patch.object(
                MODULE.subprocess, "run", side_effect=fake_run
            ):
                result, proof = MODULE.call_claude("review", Path(temp) / "receipt",
                                                   "claude-opus-5-5", return_model=True)
                self.assertEqual(result["qid"]["status"], "PASS")
                self.assertEqual(proof["resolvedModel"], "claude-opus-5-5")
                self.assertEqual(proof["provider"], "firstParty")
                self.assertIsNone(proof["rawResolvedModel"])
                with self.assertRaisesRegex(RuntimeError, "Unexpected Claude model proof"):
                    MODULE.call_claude("review", Path(temp) / "alias",
                                       "opus", return_model=True)

                rows[-1]["modelUsage"]["claude-haiku-4-5-20251001"] = {
                    "canonicalModel": "claude-haiku-4-5", "provider": "firstParty"}
                with self.assertRaisesRegex(RuntimeError, "Unexpected Claude model proof"):
                    MODULE.call_claude("review", Path(temp) / "mixed",
                                       "claude-opus-5-5", return_model=True)


if __name__ == "__main__":
    unittest.main()
