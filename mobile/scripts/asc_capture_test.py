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
import queue
import uuid

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


    def test_simctl_errors_include_stdout_stderr_and_timeout_output(self):
        with patch.object(capture.subprocess, "run", return_value=subprocess.CompletedProcess([], 23, "full stdout", "full stderr")):
            with self.assertRaisesRegex(RuntimeError, "(?s)exit=23.*full stdout.*full stderr"):
                capture.run("xcrun", "simctl", "boot", "udid")
        with patch.object(capture.subprocess, "run", side_effect=subprocess.TimeoutExpired([], 300, b"boot progress", b"runtime unavailable")):
            with self.assertRaisesRegex(RuntimeError, "(?s)300s.*boot progress.*runtime unavailable"):
                capture.run("xcrun", "simctl", "bootstatus", "udid", "-b", timeout=300)


    def test_no_compatible_pair_logs_inventory_and_never_creates_or_boots(self):
        def command(*args, **kwargs):
            return json.dumps({"runtimes": RUNTIMES, "devicetypes": []})
        with patch.object(capture, "run", side_effect=command) as run:
            with self.assertRaisesRegex(RuntimeError, "No compatible"):
                capture.capture_device(capture.CONFIG["devices"][0], Path("App.app"), self.directory)
        self.assertEqual(len(run.call_args_list), 2)
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
        with patch.object(capture, "run", side_effect=command) as run:
            with self.assertRaisesRegex(RuntimeError, "Created simulator is unavailable before boot"):
                capture.capture_device(capture.CONFIG["devices"][0], Path("App.app"), self.directory)
        commands = [c.args for c in run.call_args_list]
        self.assertFalse(any("boot" in c or "bootstatus" in c for c in commands))
        self.assertEqual(commands[-2:], [("xcrun", "simctl", "shutdown", "created-udid"), ("xcrun", "simctl", "delete", "created-udid")])
        self.assertIn("runtime profile not found", (self.directory / "iphone-medium/failure.txt").read_text(encoding="utf-8"))


    def test_preflight_checks_all_required_sizes_without_build_or_creation(self):
        with patch.object(capture.platform, "system", return_value="Darwin"), patch.object(capture.sys, "argv", ["asc_capture.py", "--check-simulators"]), patch.object(capture, "simulator_inventory", return_value=(RUNTIMES, TYPES)), patch.object(capture, "run") as run:
            capture.main()
        run.assert_not_called()
        for device in capture.CONFIG["devices"]:
            self.assertIn("Selected simulator for " + device["slug"], self.stdout.getvalue())


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


    def stream_fixture(self, *lines):
        stream = capture.CaptureLog.__new__(capture.CaptureLog)
        stream.token = str(uuid.uuid4())
        stream.udid = "udid"
        stream.path = self.directory / "app.log"
        stream.history_path = self.directory / "history.log"
        stream.predicate = f'subsystem == "{capture.LOG_SUBSYSTEM}" OR eventMessage CONTAINS "{stream.token}"'
        stream.events = queue.Queue()
        for line in lines:
            stream.events.put(line)
        return stream

    def test_ready_ignores_stale_token_wrong_route_and_suffix(self):
        stream = self.stream_fixture()
        expected = f"ASC_CAPTURE_READY {stream.token} /review"
        for line in ("ASC_CAPTURE_READY old-token /review", f"ASC_CAPTURE_READY {stream.token} /ap", expected + "-other", "timestamp App[1] " + expected):
            stream.events.put(line)
        stream.wait_ready("/review", seconds=1)
        self.assertIsNone(capture.STATE["waiting_for"])
        self.assertTrue(stream.events.empty())

    def test_explicit_native_failure_aborts(self):
        stream = self.stream_fixture()
        stream.events.put(f"ASC_CAPTURE_FAILED {stream.token} timeout")
        with self.assertRaisesRegex(RuntimeError, "App capture readiness failed"):
            stream.wait_ready("/review", seconds=1)

    def test_timeout_never_counts_as_ready_and_dead_stream_can_recover(self):
        stream = self.stream_fixture()
        with patch.object(capture.time, "monotonic", side_effect=[0, 0, 2]):
            self.assertFalse(stream.wait_ready("/review", seconds=1))
        stream.events.put(None)
        stream.events.put(f"ASC_CAPTURE_READY {stream.token} /review")
        self.assertTrue(stream.wait_ready("/review", seconds=1))

    def test_log_subscription_race_recovers_only_this_token_from_log_show(self):
        stream = self.stream_fixture()
        stream.events = Mock()
        stream.events.get.side_effect = [queue.Empty, "prefix " + f"ASC_CAPTURE_READY {stream.token} /review"]
        with patch.object(capture.time, "monotonic", return_value=20), patch.object(capture, "run", return_value=f"ASC_CAPTURE_READY {stream.token} /review") as run:
            # Invoke the same bounded recovery called by the wait loop.
            stream.snapshot(timeout=3)
            stream.wait_ready("/review")
        self.assertIn("show", run.call_args.args)
        self.assertIn(stream.token, run.call_args.args[-1])
        self.assertEqual(run.call_args.kwargs["timeout"], 3)

    def test_slow_log_show_is_nonfatal_and_waits_past_initial_60_seconds(self):
        stream = self.stream_fixture()
        now = [0]
        def get(timeout):
            now[0] += timeout
            if now[0] >= 65:
                return f"ASC_CAPTURE_READY {stream.token} /review"
            raise queue.Empty
        stream.events = Mock()
        stream.events.get.side_effect = get
        with patch.object(capture.time, "monotonic", side_effect=lambda: now[0]), patch.object(capture, "run", side_effect=RuntimeError("Command timed out (3s)\npartial log")) as run:
            self.assertTrue(stream.wait_ready("/review", seconds=90))
        self.assertGreaterEqual(now[0], 65)
        self.assertGreaterEqual(run.call_count, 2)
        self.assertIn("partial log", stream.history_path.read_text())

    def test_continually_failing_history_remains_bounded_and_does_not_accept_partial_ready(self):
        stream = self.stream_fixture()
        now = [0]
        def get(timeout):
            now[0] += timeout
            raise queue.Empty
        def slow(*args, timeout):
            now[0] += timeout
            raise RuntimeError(f"Command timed out\nASC_CAPTURE_READY {stream.token} /review")
        stream.events = Mock()
        stream.events.get.side_effect = get
        with patch.object(capture.time, "monotonic", side_effect=lambda: now[0]), patch.object(capture, "run", side_effect=slow):
            self.assertFalse(stream.wait_ready("/review", seconds=90))
        self.assertLessEqual(now[0], 90)

    def test_launch_subscribes_before_restarting_app_and_always_closes_stream(self):
        events = []
        stream = Mock()
        stream.wait_ready.side_effect = lambda route: events.append(("ready", route)) or True
        stream.close.side_effect = lambda: events.append(("close",))
        with patch.object(capture, "CaptureLog", side_effect=lambda *args: events.append(("subscribe",)) or stream), patch.object(capture, "run", side_effect=lambda *args, **kwargs: events.append(args)), patch.object(capture, "checked_screenshot", return_value={"accepted": True}):
            capture.launch_screen("udid", "03-review", "/review", capture.CONFIG["devices"][0])
        self.assertEqual(events[0], ("subscribe",))
        self.assertEqual(events[1][:6], ("xcrun", "simctl", "launch", "--terminate-running-process", "udid", capture.CONFIG["bundleId"]))
        self.assertEqual(events[1][-4:-2], ("-ascCaptureRoute", "/review"))
        token = events[1][-1]
        uuid.UUID(token)
        self.assertEqual(events[-2:], [("ready", "/review"), ("close",)])
        stream.wait_ready.side_effect = RuntimeError("readiness failed")
        with patch.object(capture, "CaptureLog", return_value=stream), patch.object(capture, "run"):
            with self.assertRaisesRegex(RuntimeError, "readiness failed"):
                capture.launch_screen("udid", "03-review", "/review", capture.CONFIG["devices"][0])
        self.assertEqual(stream.close.call_count, 2)

    def test_no_quota_or_credential_routes_can_launch(self):
        with patch.object(capture, "CaptureLog") as stream, patch.object(capture, "run") as run:
            for route in ("/quiz?mode=random&exam=ap", "/q/ap/2022-autumn/am/q1", "/auth/signin", "/billing", "https://evil.invalid", "/ap?quiz=1"):
                with self.assertRaises(ValueError):
                    capture.launch_screen("udid", "03-review", route, capture.CONFIG["devices"][0])
        stream.assert_not_called()
        run.assert_not_called()

    def test_readiness_failure_collects_evidence_before_deleting_own_simulator(self):
        events = []
        def command(*args, **kwargs):
            events.append(args)
            if "devicetypes" in args:
                return json.dumps({"devicetypes": TYPES})
            if "runtimes" in args:
                return json.dumps({"runtimes": RUNTIMES})
            if "devices" in args:
                return json.dumps({"devices": {"runtime": [{"udid": "created-udid", "isAvailable": True}]}})
            return "created-udid"
        with patch.object(capture, "run", side_effect=command), patch.object(capture, "launch_screen", side_effect=RuntimeError("not ready")), patch.object(capture, "failure_evidence", side_effect=lambda *args: events.append(("evidence",))):
            with self.assertRaisesRegex(RuntimeError, "not ready"):
                capture.capture_device(capture.CONFIG["devices"][0], Path("App.app"), self.directory)
        self.assertEqual(events[-3:], [("evidence",), ("xcrun", "simctl", "shutdown", "created-udid"), ("xcrun", "simctl", "delete", "created-udid")])
        self.assertFalse(any("screenshot" in e for e in events))
        status = next(e for e in events if "status_bar" in e)
        for value in ("9:41", "--wifiBars", "--cellularBars", "--batteryLevel", "100"):
            self.assertIn(value, status)

    def test_failure_snapshot_is_saved_without_webdriver(self):
        def command(*args, **kwargs):
            if "screenshot" in args:
                Path(args[-1]).write_bytes(b"diagnostic fixture")
            return '{"devices":{}}'
        with patch.object(capture, "run", side_effect=command):
            capture.failure_evidence("udid", RuntimeError("primary timeout"))
        self.assertTrue((self.directory / "iphone-medium/failure.png").exists())
        self.assertIn("primary timeout", (self.directory / "iphone-medium/failure.txt").read_text(encoding="utf-8"))
        self.assertTrue((self.directory / "iphone-medium/simulator-state.json").exists())

    def test_fallback_requires_current_route_and_token_ready_receipt(self):
        token = str(uuid.uuid4())
        caches = self.directory / "Library/Caches"
        caches.mkdir(parents=True)
        receipt = caches / ("asc-capture-" + token + ".json")
        valid = {"token": token, "route": "/review", "event": "READY", "detail": "/review"}
        with patch.object(capture, "run", return_value=str(self.directory)):
            for overrides in ({"token": "old-token"}, {"route": "/ap"}, {"event": "STATE"}, {"event": "FAILED"}, {"detail": "/ap"}):
                receipt.write_text(json.dumps({**valid, **overrides}))
                with self.assertRaisesRegex(RuntimeError, "not READY"):
                    capture.native_receipt("udid", token, "/review")
            receipt.write_text(json.dumps(valid))
            self.assertEqual(capture.native_receipt("udid", token, "/review"), valid)

    def test_fallback_never_accepts_pixels_without_semantic_ready_and_closes_after_rejection(self):
        stream = Mock()
        stream.wait_ready.return_value = False
        device = capture.CONFIG["devices"][0]
        with patch.object(capture, "CaptureLog", return_value=stream), patch.object(capture, "run"), patch.object(capture, "native_receipt", side_effect=FileNotFoundError("no receipt")), patch.object(capture, "checked_screenshot") as pixels:
            with self.assertRaisesRegex(RuntimeError, "Debug ASC_CAPTURE"):
                capture.launch_screen("udid", "03-review", "/review", device)
            pixels.assert_not_called()
        with patch.object(capture, "CaptureLog", return_value=stream), patch.object(capture, "run"), patch.object(capture, "native_receipt"), patch.object(capture, "checked_screenshot", return_value={"accepted": True}) as pixels:
            path, verification = capture.launch_screen("udid", "03-review", "/review", device)
            self.assertEqual(verification["readiness"], "receipt+pixels")
            self.assertTrue(pixels.call_args.kwargs["fallback"])
        with patch.object(capture, "CaptureLog", return_value=stream), patch.object(capture, "run"), patch.object(capture, "native_receipt"), patch.object(capture, "checked_screenshot", side_effect=RuntimeError("blank/loading")):
            with self.assertRaisesRegex(RuntimeError, "blank/loading"):
                capture.launch_screen("udid", "03-review", "/review", device)
        self.assertEqual(stream.close.call_count, 3)

    def test_checked_screenshot_preserves_both_frames_and_stats(self):
        png = self.directory / "candidate.png"
        device = capture.CONFIG["devices"][0]
        def command(*args, **kwargs):
            if "screenshot" in args:
                Path(args[-1]).write_bytes(b"second" if "settled" in args[-1] else b"first")
                return ""
            return json.dumps({"accepted": True})
        with patch.object(capture, "run", side_effect=command) as run, patch.object(capture.time, "sleep") as sleep:
            capture.checked_screenshot("udid", png, device, fallback=True)
        sleep.assert_called_once_with(3)
        self.assertEqual(png.read_bytes(), b"first")
        self.assertEqual((self.directory / "candidate-settled.png").read_bytes(), b"second")
        self.assertTrue((self.directory / "candidate-pixels.json").exists())
        with patch.object(capture, "run", side_effect=lambda *args, **kwargs: json.dumps({"accepted": False})), patch.object(capture.time, "sleep"):
            with self.assertRaisesRegex(RuntimeError, "blank/loading/unstable"):
                capture.checked_screenshot("udid", png, device, fallback=False)

    def test_log_reader_redacts_before_persistence_and_handles_cleanup_kill(self):
        process = Mock(stdout=io.StringIO("prefix secret-fixture\n"))
        process.poll.return_value = None
        process.wait.side_effect = [subprocess.TimeoutExpired([], 5), 0]
        with patch.dict(os.environ, {"CM_API_TOKEN": "secret-fixture"}), patch.object(capture.subprocess, "Popen", return_value=process) as popen:
            stream = capture.CaptureLog("udid", str(uuid.uuid4()))
            stream.thread.join(timeout=5)
            stream.close()
        self.assertIn("stream", popen.call_args.args[0])
        self.assertNotIn("secret-fixture", stream.path.read_text(encoding="utf-8"))
        process.terminate.assert_called_once()
        process.kill.assert_called_once()

    def test_stream_start_failure_preserves_error_and_allows_receipt_fallback(self):
        with patch.object(capture.subprocess, "Popen", side_effect=OSError("stream spawn failed")):
            stream = capture.CaptureLog("udid", str(uuid.uuid4()))
        self.assertIn("stream spawn failed", stream.path.read_text())
        with patch.object(capture.time, "monotonic", side_effect=[0, 0, 181]):
            self.assertFalse(stream.wait_ready("/review"))
        stream.close()


if __name__ == "__main__":
    unittest.main()
