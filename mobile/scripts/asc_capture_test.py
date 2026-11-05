"""Offline failure-path tests; no simulator or production quota required."""
from contextlib import redirect_stdout
import io
import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import Mock, patch
import urllib.error

import asc_capture as capture
from asc_diagnostics import redact, safe_source, stream_log
from asc_simulators_test import RUNTIMES, TYPES


class CaptureDiagnosticsTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.directory = Path(self.temp.name)
        self.enterContext(patch.object(capture, "DIAGNOSTICS", self.directory))
        self.stdout = self.enterContext(redirect_stdout(io.StringIO()))
        self.enterContext(patch.dict(capture.STATE, {"device": "iphone-medium", "screen": "03-review", "operation": "navigate /review", "waiting_for": "main h1", "selector": "main h1"}, clear=True))

    def test_http_error_contains_full_remote_error_and_stack_but_no_secret(self):
        payload = {"value": {"error": "unknown error", "message": "WKWebView attach failed secret-fixture", "stacktrace": "first\nsecond\nlast"}}
        error = urllib.error.HTTPError("http://127.0.0.1", 500, "error", {}, io.BytesIO(json.dumps(payload).encode()))
        with patch.dict(os.environ, {"APP_STORE_CONNECT_PRIVATE_KEY": "secret-fixture"}), patch.object(capture.urllib.request, "urlopen", side_effect=error):
            with self.assertRaises(capture.WebDriverError) as result:
                capture.Driver("udid").request("POST", "/session")
        message = str(result.exception)
        self.assertIn("HTTP 500", message)
        self.assertIn("WKWebView attach failed", message)
        self.assertIn("last", message)
        self.assertNotIn("secret-fixture", message)
        self.assertEqual(result.exception.code, "unknown error")

    def test_simctl_errors_include_stdout_stderr_and_timeout_output(self):
        with patch.object(capture.subprocess, "run", return_value=subprocess.CompletedProcess([], 23, "full stdout", "full stderr")):
            with self.assertRaisesRegex(RuntimeError, "(?s)exit=23.*full stdout.*full stderr"):
                capture.run("xcrun", "simctl", "boot", "udid")
        with patch.object(capture.subprocess, "run", side_effect=subprocess.TimeoutExpired([], 300, b"boot progress", b"runtime unavailable")):
            with self.assertRaisesRegex(RuntimeError, "(?s)300s.*boot progress.*runtime unavailable"):
                capture.run("xcrun", "simctl", "bootstatus", "udid", "-b", timeout=300)

    def test_wait_timeout_keeps_last_appium_error_and_observation(self):
        with patch.object(capture.time, "monotonic", side_effect=[0, 0, 0, 2]), patch.object(capture.time, "sleep"):
            with self.assertRaisesRegex(RuntimeError, "(?s)waiting for expected selector.*observed=None.*remote stack end"):
                capture.wait(Mock(side_effect=RuntimeError("remote stack end")), "expected selector", 1)
        self.assertEqual(capture.STATE["waiting_for"], "expected selector")

    def test_failure_snapshot_and_screenshot_survive_dead_webdriver(self):
        driver = Mock(session="session")
        driver.js.side_effect = capture.WebDriverError("WebView disconnected")
        driver.request.side_effect = capture.WebDriverError("WDA disconnected")
        def command(*args, **kwargs):
            if "screenshot" in args:
                Path(args[-1]).write_bytes(b"diagnostic screenshot fixture")
            return '{"devices":{}}'
        with patch.object(capture, "run", side_effect=command) as run:
            capture.failure_evidence(driver, "udid", RuntimeError("primary timeout"))
        self.assertEqual(run.call_args_list[0].args[0:4], ("xcrun", "simctl", "io", "udid"))
        self.assertTrue((self.directory / "iphone-medium/failure.png").exists())
        failure = (self.directory / "iphone-medium/failure.txt").read_text(encoding="utf-8")
        self.assertIn("03-review", failure)
        self.assertIn("primary timeout", failure)
        self.assertIn("WebView disconnected", self.stdout.getvalue())
        self.assertIn("WDA disconnected", self.stdout.getvalue())

    def test_failure_web_url_text_elements_and_sources_are_saved_and_printed(self):
        driver = Mock(session="session")
        driver.js.return_value = {"url": "https://www.kakomon-ai.jp/review", "text": "復習キューはまだ空です", "elements": {"main h1": {"count": 1, "visible": True}}}
        driver.request.return_value = '<main><script>secret embedded state</script><h1>間隔反復学習</h1></main>'
        capture.failure_evidence(driver, None, RuntimeError("font timeout"))
        self.assertIn("復習キューはまだ空です", self.stdout.getvalue())
        self.assertIn('"visible": true', self.stdout.getvalue())
        self.assertIn("https://www.kakomon-ai.jp/review", self.stdout.getvalue())
        self.assertNotIn("secret embedded state", (self.directory / "iphone-medium/web-source.html").read_text(encoding="utf-8"))
        self.assertTrue((self.directory / "iphone-medium/native-source.xml").exists())

    def test_start_failure_collects_before_cleanup_with_retained_session(self):
        device = capture.CONFIG["devices"][0]
        driver = Mock(session="created-session")
        driver.start.side_effect = RuntimeError("orientation failed")
        def command(*args, **kwargs):
            if "devicetypes" in args:
                return json.dumps({"devicetypes": TYPES})
            if "runtimes" in args:
                return json.dumps({"runtimes": RUNTIMES})
            if "devices" in args:
                return json.dumps({"devices": {RUNTIMES[0]["identifier"]: [{"udid": "udid", "isAvailable": True}]}})
            return "udid"
        events = []
        driver.close.side_effect = lambda: events.append("close")
        with patch.object(capture, "run", side_effect=command) as run, patch.object(capture, "Driver", return_value=driver), patch.object(capture, "failure_evidence", side_effect=lambda *args: events.append(("evidence", args[0].session))):
            with self.assertRaisesRegex(RuntimeError, "orientation failed"):
                capture.capture_device(device, Path("App.app"), self.directory)
        self.assertEqual(events, [("evidence", "created-session"), "close"])
        create = next(c for c in run.call_args_list if "create" in c.args)
        self.assertEqual(create.args[-2:], (TYPES[1]["identifier"], RUNTIMES[0]["identifier"]))
        boot = next(c for c in run.call_args_list if "bootstatus" in c.args)
        self.assertEqual(boot.kwargs["timeout"], 300)
        self.assertIn("delete", run.call_args_list[-1].args)

    def test_no_compatible_pair_logs_inventory_and_never_creates_or_boots(self):
        def command(*args, **kwargs):
            return json.dumps({"runtimes": RUNTIMES, "devicetypes": []})
        with patch.object(capture, "run", side_effect=command) as run, patch.object(capture, "Driver") as driver:
            with self.assertRaisesRegex(RuntimeError, "No compatible"):
                capture.capture_device(capture.CONFIG["devices"][0], Path("App.app"), self.directory)
        self.assertEqual(len(run.call_args_list), 2)
        driver.assert_not_called()
        self.assertIn("iOS-26-5", self.stdout.getvalue())
        self.assertIn("isAvailable", self.stdout.getvalue())
        self.assertIn("Simulator devicetypes=[]", self.stdout.getvalue())

    def test_created_availability_error_stops_before_boot_and_cleans_only_created_udid(self):
        def command(*args, **kwargs):
            if "runtimes" in args:
                return json.dumps({"runtimes": RUNTIMES})
            if "devicetypes" in args:
                return json.dumps({"devicetypes": TYPES})
            if "devices" in args:
                return json.dumps({"devices": {RUNTIMES[0]["identifier"]: [{
                    "udid": "created-udid", "isAvailable": False,
                    "availabilityError": 'runtime profile not found using "System" match policy'}]}})
            return "created-udid"
        with patch.object(capture, "run", side_effect=command) as run, patch.object(capture, "Driver") as driver:
            with self.assertRaisesRegex(RuntimeError, "Created simulator is unavailable before boot"):
                capture.capture_device(capture.CONFIG["devices"][0], Path("App.app"), self.directory)
        commands = [c.args for c in run.call_args_list]
        self.assertFalse(any("boot" in c or "bootstatus" in c for c in commands))
        self.assertEqual(commands[-2:], [("xcrun", "simctl", "shutdown", "created-udid"), ("xcrun", "simctl", "delete", "created-udid")])
        driver.assert_not_called()
        self.assertIn("runtime profile not found", (self.directory / "iphone-medium/failure.txt").read_text(encoding="utf-8"))

    def test_preflight_checks_all_required_sizes_without_build_appium_or_creation(self):
        with patch.object(capture.platform, "system", return_value="Darwin"), patch.object(capture.sys, "argv", ["asc_capture.py", "--check-simulators"]), patch.object(capture, "simulator_inventory", return_value=(RUNTIMES, TYPES)), patch.object(capture, "run") as run:
            capture.main()
        run.assert_not_called()
        for device in capture.CONFIG["devices"]:
            self.assertIn("Selected simulator for " + device["slug"], self.stdout.getvalue())

    def test_quota_or_credential_routes_rejected_before_request(self):
        driver = capture.Driver("udid")
        driver.js = Mock()
        for path in ("/quiz?mode=random&exam=ap", "/q/ap/2022-autumn/am/q1", "/auth/signin", "/billing"):
            with self.assertRaises(ValueError):
                driver.navigate(path)
        driver.js.assert_not_called()

    def test_alerts_choose_explicit_deny_and_restore_context(self):
        driver = capture.Driver("udid")
        driver.context = "WEBVIEW_app"
        driver.request = Mock(side_effect=[None, "tracking consent", ["許可", "アプリにトラッキングしないように要求"], None, capture.WebDriverError("absent", "no such alert"), ["NATIVE_APP", "WEBVIEW_app"], None])
        driver.dismiss_alerts()
        self.assertEqual(driver.request.call_args_list[3].args[2]["args"][0], {"action": "dismiss", "buttonLabel": "アプリにトラッキングしないように要求"})
        self.assertEqual(driver.context, "WEBVIEW_app")

    def test_vanished_context_selects_live_replacement_without_restoring_old(self):
        driver = capture.Driver("udid")
        driver.context = "WEBVIEW_old"
        def request(method, path, body=None):
            if path == "/alert/text":
                raise capture.WebDriverError("absent", "no such alert")
            if path == "/contexts":
                return ["NATIVE_APP", "WEBVIEW_new"]
            if path == "/context" and body["name"] == "WEBVIEW_old":
                raise AssertionError("Must not restore vanished context")
        driver.request = Mock(side_effect=request)
        driver.dismiss_alerts()
        self.assertEqual(driver.context, "WEBVIEW_new")
        self.assertEqual(driver.request.call_args.args, ("POST", "/context", {"name": "WEBVIEW_new"}))

    def test_wait_reconnects_when_context_vanishes_before_replacement_appears(self):
        driver = capture.Driver("udid")
        driver.context = "WEBVIEW_old"
        def request(method, path, body=None):
            if path == "/contexts":
                return ["NATIVE_APP"]
            if path == "/alert/text":
                raise capture.WebDriverError("absent", "no such alert")
        driver.request = Mock(side_effect=request)
        def reconnect():
            self.assertEqual(driver.context, "NATIVE_APP")
            driver.context = "WEBVIEW_new"
        driver.webview = Mock(side_effect=reconnect)
        predicate = Mock(side_effect=[False, True])
        with patch.object(capture.time, "monotonic", side_effect=[0, 0, 0, 16, 16, 17]), patch.object(capture.time, "sleep"):
            capture.wait(predicate, "replacement document", 60, driver=driver)
        driver.webview.assert_called_once()
        self.assertEqual(driver.context, "WEBVIEW_new")

    def test_unknown_alert_not_blindly_accepted(self):
        driver = capture.Driver("udid")
        driver.request = Mock(side_effect=[None, "Purchase?", ["Buy", "Cancel"]])
        with self.assertRaisesRegex(RuntimeError, "Unknown system alert"):
            driver.dismiss_alerts()
        self.assertEqual(driver.request.call_count, 3)

    def test_web_consent_rejected_and_unknown_dialog_fails(self):
        driver = Mock()
        driver.js.side_effect = [[{"text": "Cookie consent", "buttons": ["同意する", "同意しない"]}], True]
        capture.dismiss_web_dialogs(driver)
        self.assertEqual(driver.js.call_args.args[-1], "同意しない")
        driver.js.side_effect = [[{"text": "AI送信の許可", "buttons": ["同意する"]}]]
        with self.assertRaisesRegex(RuntimeError, "Unknown web dialog"):
            capture.dismiss_web_dialogs(driver)

    def test_current_onboarding_skip_button_does_not_start_three_question_flow(self):
        driver = Mock()
        driver.js.side_effect = [[{"text": "目標の試験区分を選ぶ", "buttons": ["スキップして閉じる", "3問で始める"]}], True]
        capture.dismiss_web_dialogs(driver)
        self.assertEqual(driver.js.call_args.args[-1], "スキップして閉じる")

    def test_redaction_covers_environment_auth_urls_and_source_values(self):
        with patch.dict(os.environ, {"ASC_REVIEW_CODE": "review-fixture-secret", "APP_STORE_CONNECT_PRIVATE_KEY": "private-fixture-secret"}):
            text = redact('review-fixture-secret private-fixture-secret Authorization: Bearer bearer-secret\nhttps://user:pass@example.com/path?code=oauth-secret#token-secret')
        for secret in ("review-fixture-secret", "private-fixture-secret", "bearer-secret", "user:pass", "oauth-secret", "token-secret"):
            self.assertNotIn(secret, text)
        source = safe_source('<script>embedded-secret</script><input value="form-secret"><textarea>typed-secret</textarea><h1>Useful UI</h1>')
        for secret in ("embedded-secret", "form-secret", "typed-secret"):
            self.assertNotIn(secret, source)
        self.assertIn("Useful UI", source)

    def test_streaming_log_never_persists_multiline_pem_or_env_secrets(self):
        path = self.directory / "appium.log"
        source = "before\n-----BEGIN PRIVATE KEY-----\nbase64private\n-----END PRIVATE KEY-----\nafter test-token-secret\n"
        with patch.dict(os.environ, {"CM_API_TOKEN": "test-token-secret"}), patch("sys.stdin", io.StringIO(source)):
            stream_log(path)
        result = path.read_text(encoding="utf-8")
        self.assertIn("before", result)
        self.assertIn("after", result)
        self.assertNotIn("base64private", result)
        self.assertNotIn("test-token-secret", result)


if __name__ == "__main__":
    unittest.main()
