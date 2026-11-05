"""Offline regression checks for tag dispatch and the anonymous capture boundary."""
import ast
import os
from pathlib import Path
import shutil
import subprocess
import unittest
from unittest.mock import patch
import yaml

import asc_capture

ROOT = Path(__file__).resolve().parents[1]
RUBY = os.environ.get("ASC_TEST_RUBY") or shutil.which("ruby")


class RepositoryWorkflowTest(unittest.TestCase):
    def test_metadata_upload_requires_committed_images_and_never_captures(self):
        workflow = yaml.safe_load((ROOT.parent / "codemagic.yaml").read_text(encoding="utf-8"))["workflows"]["kakomon-asc-metadata"]
        self.assertEqual(workflow["triggering"]["events"], ["tag"])
        self.assertEqual(workflow["environment"]["vars"]["SUBMIT_FOR_REVIEW"], "false")
        scripts = [step["script"] for step in workflow["scripts"]]
        combined = "\n".join(scripts)
        for forbidden in ("asc_capture.sh", "asc_capture_windows", "ios:prepare", "npm run build", "prisma generate", "pnpm@"):
            self.assertNotIn(forbidden, combined)
        validation = next(i for i, script in enumerate(scripts) if "asc_validate.py --screenshots" in script)
        decoding = next(i for i, script in enumerate(scripts) if "node scripts/asc_repository_check.mjs" in script)
        upload = next(i for i, script in enumerate(scripts) if "fastlane ios asc_metadata" in script)
        self.assertLess(validation, decoding)
        self.assertLess(decoding, upload)
        self.assertNotIn("publishing", workflow)

    def test_all_asc_routes_use_official_auth_without_key_or_token_export(self):
        workflow = yaml.safe_load((ROOT.parent / "codemagic.yaml").read_text(encoding="utf-8"))["workflows"]["kakomon-asc-metadata"]
        self.assertEqual(workflow["integrations"]["app_store_connect"], "App Store Key")
        scripts = [step["script"] for step in workflow["scripts"]]
        auth = next(i for i, script in enumerate(scripts) if "asc_auth.py --check" in script)
        upload = next(i for i, script in enumerate(scripts) if "fastlane ios asc_metadata" in script)
        setup = next(i for i, script in enumerate(scripts) if '"$ASC_SETUP_PYTHON" scripts/asc_setup.py' in script)
        self.assertLess(auth, upload)
        self.assertLess(auth, setup)
        self.assertNotIn("ASC_SETUP_MODE", scripts[auth])
        self.assertIn("-r asc/auth-requirements.txt", scripts[auth])
        combined = "\n".join(scripts)
        for forbidden in ("APP_STORE_CONNECT_PRIVATE_KEY", "--token-for-pipe", "set -x", "printenv"):
            self.assertNotIn(forbidden, combined)
        lane = (ROOT / "fastlane/Fastfile").read_text()
        self.assertIn("AscCodemagicToken.new(in_house: false)", lane)
        self.assertNotIn("app_store_connect_api_key(", lane)


class AnonymousCaptureTest(unittest.TestCase):
    def test_five_frames_never_request_quiz_or_fabricate_history(self):
        self.assertEqual(list(asc_capture.CAPTURE_ROUTES), asc_capture.CONFIG["screens"])
        self.assertEqual(list(asc_capture.CAPTURE_ROUTES.values()), ["/", "/ap", "/review", "/account/dashboard", "reminder"])
        shell = (ROOT / "scripts/asc_capture.sh").read_text()
        self.assertIn("DEBUG ASC_CAPTURE", shell)
        self.assertNotIn("npm install", shell)
        self.assertNotIn("driver install", shell)
        self.assertNotIn("isInspectable", shell)

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
