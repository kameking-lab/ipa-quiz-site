"""Offline regression checks for tag dispatch and the anonymous capture boundary."""
import ast
import os
from pathlib import Path
import shutil
import subprocess
import unittest
from unittest.mock import patch

import asc_capture

ROOT = Path(__file__).resolve().parents[1]
RUBY = os.environ.get("ASC_TEST_RUBY") or shutil.which("ruby")


class AnonymousDriver:
    def __init__(self):
        self.paths = []
        self.scripts = []

    def navigate(self, path):
        self.paths.append(path)

    def js(self, script, *args):
        # Real UI interactions and history reads only. A credential flow, AI
        # request or synthetic stored history would violate this boundary.
        for forbidden in ("fetch(", "XMLHttpRequest", "setItem(", "document.cookie", "auth/callback", "AIへの質問"):
            if forbidden in script:
                raise AssertionError("Anonymous capture boundary violated: " + forbidden)
        self.scripts.append((script, args))
        return True


class AnonymousCaptureTest(unittest.TestCase):
    def test_five_frames_use_only_three_real_answer_clicks(self):
        driver = AnonymousDriver()
        frames = []
        with patch.object(asc_capture, "click", wraps=asc_capture.click) as click, \
                patch.object(asc_capture, "click_text", wraps=asc_capture.click_text) as text:
            # No code parameter and no async_js/request method exist on this
            # driver: any reintroduced login/AI request fails the test.
            asc_capture.capture_free_screens(driver, lambda name, selector: frames.append(name))
        self.assertEqual(frames, asc_capture.CONFIG["screens"])
        self.assertEqual(click.call_count, 3)
        self.assertEqual([c.args[1] for c in text.call_args_list], ["次の問題へ", "次の問題へ", "端末内で学習"])
        self.assertEqual(driver.paths, ["/quiz?mode=random&exam=ap", "/account/dashboard"])
        self.assertTrue(any('ログインなしの無料演習枠' in script for script, _ in driver.scripts)
                        or any('ログインなしの無料演習枠' in str(args) for _, args in driver.scripts))

    def test_capture_entry_point_has_no_environment_secret_reads(self):
        tree = ast.parse((ROOT / "scripts/asc_capture.py").read_text(encoding="utf-8"))
        self.assertFalse(any(isinstance(n, ast.Name) and n.id == "os" for n in ast.walk(tree)))
        self.assertNotIn("ASC_SCREENSHOT_REVIEW_CODE", (ROOT / "scripts/asc_capture.sh").read_text())


@unittest.skipUnless(RUBY, "Set ASC_TEST_RUBY or put Ruby on PATH")
class TagExportTest(unittest.TestCase):
    def run_export(self, **values):
        env = {k: v for k, v in os.environ.items() if not k.startswith("ASC_") and k not in ("CM_TAG", "SUBMIT_FOR_REVIEW", "CM_TRIGGER_SOURCE")}
        env.update(values)
        return subprocess.run([RUBY, str(ROOT / "scripts/asc_config.rb")], env=env, text=True, capture_output=True)

    def test_listing_tag_works_with_no_review_code(self):
        result = self.run_export(CM_TAG="asc-kakomon-v1.0.0-b17-r01", SUBMIT_FOR_REVIEW="false")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout.splitlines(), ["ASC_APP_VERSION=1.0.0", "ASC_BUILD_NUMBER=17", "SUBMIT_FOR_REVIEW=false"])

    def test_submit_tag_sets_true_without_exporting_secrets(self):
        result = self.run_export(CM_TAG="asc-kakomon-submit-v1.0.0-b17-r01", CM_TRIGGER_SOURCE="webhook", SUBMIT_FOR_REVIEW="false", ASC_REVIEW_CODE="test-secret-must-not-be-exported")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout.splitlines(), ["ASC_APP_VERSION=1.0.0", "ASC_BUILD_NUMBER=17", "SUBMIT_FOR_REVIEW=true"])
        self.assertNotIn("test-secret", result.stdout + result.stderr)

    def test_submit_without_tag_or_webhook_fails_before_export(self):
        for values in ({"SUBMIT_FOR_REVIEW": "true", "ASC_BUILD_NUMBER": "17"},
                       {"CM_TAG": "asc-kakomon-submit-v1.0.0-b17-r01", "CM_TRIGGER_SOURCE": "api"},
                       {"CM_TAG": "asc-kakomon-v1.0.0-b17-r01", "SUBMIT_FOR_REVIEW": "true"},
                       {"CM_TAG": "asc-kakomon-v1.0.0-b17-r01\nSUBMIT_FOR_REVIEW=true"}):
            with self.subTest(values=values):
                result = self.run_export(**values)
                self.assertNotEqual(result.returncode, 0)
                self.assertEqual(result.stdout, "")


if __name__ == "__main__":
    unittest.main()
