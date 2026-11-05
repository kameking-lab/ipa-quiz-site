"""Capture actual anonymous UI; no login, AI, quota grants or seeded history."""
import hashlib
import json
from pathlib import Path
import platform
import subprocess
import sys
import time
import traceback
import queue
import threading
import uuid

from asc_diagnostics import redact
from asc_simulators import select_simulator

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / "asc/capture.json").read_text(encoding="utf-8"))
DIAGNOSTICS = ROOT / "build/asc/diagnostics"
STATE = {"device": "setup", "screen": "setup", "operation": "setup", "waiting_for": None}


def log(message):
    line = redact(f"[ASC7] {json.dumps(STATE, ensure_ascii=False)} {message}")
    print(line, flush=True)
    DIAGNOSTICS.mkdir(parents=True, exist_ok=True)
    with (DIAGNOSTICS / "capture.log").open("a", encoding="utf-8") as output:
        output.write(line + "\n")


def operation(label):
    STATE["operation"] = label
    log("BEGIN")


def run(*args, timeout=120):
    operation("command: " + " ".join(map(str, args)))
    try:
        result = subprocess.run(args, text=True, encoding="utf-8", errors="replace", capture_output=True, timeout=timeout)
    except subprocess.TimeoutExpired as error:
        def decoded(value):
            return value.decode("utf-8", "replace") if isinstance(value, bytes) else value or ""
        raise RuntimeError(f"Command timed out ({timeout}s)\nstdout:\n{decoded(error.stdout)}\nstderr:\n{decoded(error.stderr)}") from None
    if result.returncode:
        raise RuntimeError(f"Command exit={result.returncode}\nstdout:\n{result.stdout}\nstderr:\n{result.stderr}")
    return result.stdout.strip()


# This is the ASC4 quota-free plan. Never add question, AI, auth or grant routes.
CAPTURE_ROUTES = dict(zip(CONFIG["screens"], ("/", "/ap", "/review", "/account/dashboard", "reminder"), strict=True))
ALLOWED_ROUTES = frozenset(("/", "/ap", "/review", "/account/dashboard", "reminder"))


class CaptureLog:
    """Drain unified logging continuously, redact before persistence, match this launch only."""
    def __init__(self, udid, token):
        self.udid = udid
        self.token = token
        self.events = queue.Queue()
        self.path = DIAGNOSTICS / STATE["device"] / (STATE["screen"] + "-app.log")
        self.path.parent.mkdir(parents=True, exist_ok=True)
        operation("start simctl log stream")
        self.process = subprocess.Popen([
            "xcrun", "simctl", "spawn", udid, "log", "stream", "--style", "compact", "--level", "info",
            "--predicate", f'eventMessage CONTAINS "{token}"',
        ], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, encoding="utf-8", errors="replace")
        self.thread = threading.Thread(target=self._read, daemon=True)
        self.thread.start()

    def _read(self):
        try:
            with self.path.open("w", encoding="utf-8") as output:
                for line in self.process.stdout:
                    safe = redact(line)
                    output.write(safe)
                    output.flush()
                    self.events.put(safe)
        finally:
            self.process.stdout.close()
            self.events.put(None)

    def wait_ready(self, route, seconds=120):
        STATE["waiting_for"] = "ASC_CAPTURE_READY " + route
        operation("wait for app readiness log")
        deadline = time.monotonic() + seconds
        next_snapshot = time.monotonic() + 5
        expected = f"ASC_CAPTURE_READY {self.token} {route}"
        failure = f"ASC_CAPTURE_FAILED {self.token} "
        while time.monotonic() < deadline:
            try:
                line = self.events.get(timeout=min(1, max(0.001, deadline - time.monotonic())))
            except queue.Empty:
                if time.monotonic() >= next_snapshot:
                    # log stream starts asynchronously. Recover an event emitted
                    # before it subscribed from the persistent unified log store.
                    snapshot = run("xcrun", "simctl", "spawn", self.udid, "log", "show", "--last", "2m",
                                   "--style", "compact", "--info", "--predicate",
                                   f'eventMessage CONTAINS "{self.token}"', timeout=10)
                    for saved in snapshot.splitlines():
                        self.events.put(redact(saved))
                    next_snapshot = time.monotonic() + 5
                continue
            if line is None:
                raise RuntimeError("simctl log stream ended before readiness; see " + str(self.path))
            log("APP " + line.rstrip())
            if line.rstrip().endswith(expected):
                STATE["waiting_for"] = None
                return
            if failure in line:
                raise RuntimeError("App capture readiness failed; see " + str(self.path))
        raise RuntimeError(f"Timed out ({seconds}s) waiting for {expected}; see {self.path}")

    def close(self):
        if self.process.poll() is None:
            self.process.terminate()
            try:
                self.process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                self.process.kill()
                self.process.wait(timeout=5)
        self.thread.join(timeout=5)
        if self.thread.is_alive():
            raise RuntimeError("simctl log reader did not stop")


def launch_screen(udid, name, route):
    if CAPTURE_ROUTES.get(name) != route or route not in ALLOWED_ROUTES:
        raise ValueError("Capture route is not quota-free: " + route)
    STATE["screen"] = name
    token = str(uuid.uuid4())
    stream = CaptureLog(udid, token)
    try:
        # --terminate-running-process guarantees each argument set reaches a new
        # process. A fresh token prevents earlier launches satisfying readiness.
        run("xcrun", "simctl", "launch", "--terminate-running-process", udid, CONFIG["bundleId"],
            "-AppleLanguages", "(ja)", "-AppleLocale", "ja_JP",
            "-ascCaptureRoute=" + route, "-ascCaptureToken=" + token, timeout=30)
        stream.wait_ready(route)
    finally:
        stream.close()


def failure_evidence(udid, error):
    directory = DIAGNOSTICS / STATE["device"]
    directory.mkdir(parents=True, exist_ok=True)
    details = redact(json.dumps(STATE, ensure_ascii=False, indent=2) + "\n" + "".join(traceback.format_exception(error)))
    log("FAILURE " + details)
    (directory / "failure.txt").write_text(details, encoding="utf-8")
    if udid:
        try:
            run("xcrun", "simctl", "io", udid, "screenshot", "--type=png", str(directory / "failure.png"), timeout=30)
        except Exception as secondary:
            log("Failure screenshot failed: " + str(secondary))
        try:
            (directory / "simulator-state.json").write_text(redact(run("xcrun", "simctl", "list", "devices", "--json")), encoding="utf-8")
        except Exception as secondary:
            log("Simulator state failed: " + str(secondary))


def simulator_inventory():
    runtimes = json.loads(run("xcrun", "simctl", "list", "runtimes", "--json"))["runtimes"]
    log("Simulator runtimes=" + json.dumps(runtimes, ensure_ascii=False))
    types = json.loads(run("xcrun", "simctl", "list", "devicetypes", "--json"))["devicetypes"]
    log("Simulator devicetypes=" + json.dumps(types, ensure_ascii=False))
    return runtimes, types


def selected_simulator(device, inventory):
    device_type, runtime = select_simulator(device, *inventory)
    selection = {"device_type": device_type["identifier"], "device_name": device_type["name"],
                 "runtime": runtime["identifier"], "runtime_version": runtime["version"],
                 "runtime_build": runtime.get("buildversion")}
    log(f"Selected simulator for {device['slug']} ({device['width']}x{device['height']})=" + json.dumps(selection))
    return selection


def check_created_simulator(udid):
    devices = json.loads(run("xcrun", "simctl", "list", "devices", "--json"))["devices"]
    created = next((d for group in devices.values() for d in group if d["udid"] == udid), None)
    log("Created simulator state=" + json.dumps(created))
    if not created or created.get("isAvailable") is not True or created.get("availabilityError"):
        raise RuntimeError("Created simulator is unavailable before boot: " + json.dumps(created))


def capture_device(device, app, output):
    STATE.update(device=device["slug"], screen="startup", operation="setup", waiting_for=None, simulator=None)
    udid, images = None, []
    try:
        selection = selected_simulator(device, simulator_inventory())
        STATE["simulator"] = selection
        udid = run("xcrun", "simctl", "create", "ASC7-" + device["slug"], selection["device_type"], selection["runtime"])
        log("Created simulator UDID=" + udid)
        check_created_simulator(udid)
        run("xcrun", "simctl", "boot", udid)
        run("xcrun", "simctl", "bootstatus", udid, "-b", timeout=300)
        run("xcrun", "simctl", "ui", udid, "appearance", "light")
        run("xcrun", "simctl", "status_bar", udid, "override", "--time", "9:41", "--dataNetwork", "wifi", "--wifiMode", "active", "--wifiBars", "3", "--cellularMode", "active", "--cellularBars", "4", "--batteryState", "charged", "--batteryLevel", "100")
        run("xcrun", "simctl", "install", udid, str(app))
        for name, route in CAPTURE_ROUTES.items():
            launch_screen(udid, name, route)
            operation("screenshot " + name)
            png = ROOT / "build/asc" / (device["slug"] + ".png")
            dest = output / f"{name}-{device['slug']}.jpg"
            run("xcrun", "simctl", "io", udid, "screenshot", "--type=png", str(png))
            run("sips", "-s", "format", "jpeg", str(png), "--out", str(dest))
            png.unlink()
            images.append({"file": dest.name, "sha256": hashlib.sha256(dest.read_bytes()).hexdigest(), "width": device["width"], "height": device["height"], "screen": name, "simulator": selection})
            log("SAVED " + dest.name)

        return images
    except Exception as error:
        failure_evidence(udid, error)
        raise
    finally:
        if udid:
            for command in ("shutdown", "delete"):
                try:
                    run("xcrun", "simctl", command, udid, timeout=30)
                except Exception as error:
                    log("Simulator cleanup: " + str(error))


def main():
    if platform.system() != "Darwin":
        raise RuntimeError("Capture requires macOS + Xcode")
    if sys.argv[1:] == ["--check-simulators"]:
        inventory = simulator_inventory()
        for device in CONFIG["devices"]:
            selected_simulator(device, inventory)
        return
    if sys.argv[1:]:
        raise ValueError("Usage: asc_capture.py [--check-simulators]")
    app = ROOT / "build/asc-simulator/Build/Products/Debug-iphonesimulator/App.app"
    if not app.is_dir():
        raise RuntimeError("Build the Debug simulator .app first using asc_capture.sh")
    output = ROOT / "fastlane/screenshots/ja"
    output.mkdir(parents=True, exist_ok=True)
    if list(output.glob("*.jpg")) or list(output.glob("*.png")):
        raise RuntimeError("Screenshot destination must be empty; archive/remove previous captures explicitly")
    (ROOT / "build/asc").mkdir(parents=True, exist_ok=True)
    manifest = {"git_commit": run("git", "rev-parse", "HEAD"), "authentication": "anonymous", "capture_engine": "simctl + gated native readiness", "capture_plan": "quota-free alternative: qualification, review and actual empty dashboard; no quiz/explanation frames", "quota_grants": 0, "fifth_screen": "ASC1 approved reminder alternative", "images": []}
    for device in CONFIG["devices"]:
        manifest["images"].extend(capture_device(device, app, output))
    (output.parent / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    log("Captured 10 actual simulator screenshots (quota-free alternative).")


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        log("ASC capture failed; no upload performed. " + "".join(traceback.format_exception(error)))
        sys.exit(1)
