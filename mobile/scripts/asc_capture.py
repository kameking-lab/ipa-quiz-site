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
READY_SECONDS = 180
LOG_SUBSYSTEM = "jp.kakomon-ai.app.asc-capture"


def log(message):
    line = redact(f"[ASC8] {json.dumps(STATE, ensure_ascii=False)} {message}")
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
        self.history_path = self.path.with_name(STATE["screen"] + "-history.log")
        # No process-name dependency (the executable is App, not the bundle ID).
        # Include the subsystem even when a logger renders the UUID as private.
        self.predicate = f'subsystem == "{LOG_SUBSYSTEM}" OR eventMessage CONTAINS "{token}"'
        operation("start simctl log stream")
        self.process, self.thread = None, None
        try:
            self.process = subprocess.Popen([
                "xcrun", "simctl", "spawn", udid, "log", "stream", "--style", "compact", "--level", "debug",
                "--predicate", self.predicate,
            ], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, encoding="utf-8", errors="replace")
            self.thread = threading.Thread(target=self._read, daemon=True)
            self.thread.start()
        except OSError as error:
            self.path.write_text(redact(str(error)), encoding="utf-8")
            log("Log stream unavailable: " + str(error))
            self.events.put(None)

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

    def snapshot(self, timeout):
        """Best effort only: a slow log show must never abort app startup."""
        try:
            result = run("xcrun", "simctl", "spawn", self.udid, "log", "show", "--last", "5m",
                         "--style", "compact", "--info", "--debug", "--predicate", self.predicate, timeout=timeout)
        except Exception as error:
            result = "Log history unavailable: " + str(error)
            log(result)
        with self.history_path.open("a", encoding="utf-8") as output:
            output.write(redact(result) + "\n")
        for saved in result.splitlines():
            # Command errors may contain echoed predicates/partial output; only
            # successful history results can satisfy the readiness protocol.
            if not result.startswith("Log history unavailable:"):
                self.events.put(redact(saved))

    def wait_ready(self, route, seconds=READY_SECONDS):
        STATE["waiting_for"] = "ASC_CAPTURE_READY " + route
        operation("wait for app readiness log")
        deadline = time.monotonic() + seconds
        next_snapshot = time.monotonic() + 15
        expected = f"ASC_CAPTURE_READY {self.token} {route}"
        failure = f"ASC_CAPTURE_FAILED {self.token} "
        while time.monotonic() < deadline:
            try:
                line = self.events.get(timeout=min(1, max(0.001, deadline - time.monotonic())))
            except queue.Empty:
                remaining = deadline - time.monotonic()
                if remaining > 0 and time.monotonic() >= next_snapshot:
                    self.snapshot(timeout=min(3, remaining))
                    next_snapshot = time.monotonic() + 30
                    operation("wait for app readiness log")
                continue
            if line is None:
                log("Log stream ended; continue bounded wait/history recovery: " + str(self.path))
                continue
            log("APP " + line.rstrip())
            if line.rstrip().endswith(expected):
                STATE["waiting_for"] = None
                return True
            if failure in line:
                raise RuntimeError("App capture readiness failed; see " + str(self.path))
        log(f"No ready log after {seconds}s; require native READY receipt + pixel validation. See {self.path}")
        return False

    def close(self):
        if self.process is not None and self.process.poll() is None:
            self.process.terminate()
            try:
                self.process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                self.process.kill()
                self.process.wait(timeout=5)
        if self.thread is not None:
            self.thread.join(timeout=5)
        if self.thread is not None and self.thread.is_alive():
            raise RuntimeError("simctl log reader did not stop")


def native_receipt(udid, token, route):
    container = run("xcrun", "simctl", "get_app_container", udid, CONFIG["bundleId"], "data", timeout=15)
    source = Path(container) / "Library/Caches" / ("asc-capture-" + token + ".json")
    receipt = json.loads(source.read_text(encoding="utf-8"))
    destination = DIAGNOSTICS / STATE["device"] / (STATE["screen"] + "-receipt.json")
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(redact(json.dumps(receipt, ensure_ascii=False)), encoding="utf-8")
    if receipt.get("token") != token or receipt.get("route") != route or receipt.get("event") != "READY" or receipt.get("detail") != route:
        raise RuntimeError("Native receipt is not READY for this launch/route: " + str(destination))
    return receipt


def checked_screenshot(udid, png, device, fallback):
    operation("screenshot and pixel validation")
    run("xcrun", "simctl", "io", udid, "screenshot", "--type=png", str(png), timeout=30)
    args = ["node", str(ROOT / "scripts/asc_image_check.mjs"), str(png), str(device["width"]), str(device["height"])]
    if fallback:
        # Two separate frames must be nonblank, contain distributed content and
        # settle. Native receipt supplies semantic URL/UI readiness; pixels alone
        # cannot distinguish an error page or the wrong route from a valid UI.
        time.sleep(3)
        second = png.with_name(png.stem + "-settled.png")
        run("xcrun", "simctl", "io", udid, "screenshot", "--type=png", str(second), timeout=30)
        args.append(str(second))
    result = json.loads(run(*args, timeout=30))
    stats = png.with_name(png.stem + "-pixels.json")
    stats.write_text(json.dumps(result, indent=2), encoding="utf-8")
    log("PIXELS " + json.dumps(result))
    if not result["accepted"]:
        raise RuntimeError("Screenshot rejected (blank/loading/unstable); see " + str(stats))
    return result


def launch_screen(udid, name, route, device):
    if CAPTURE_ROUTES.get(name) != route or route not in ALLOWED_ROUTES:
        raise ValueError("Capture route is not quota-free: " + route)
    STATE["screen"] = name
    token = str(uuid.uuid4())
    STATE.update(capture_token=token, readiness=None, waiting_for=None)
    stream = CaptureLog(udid, token)
    try:
        # --terminate-running-process guarantees each argument set reaches a new
        # process. A fresh token prevents earlier launches satisfying readiness.
        run("xcrun", "simctl", "launch", "--terminate-running-process", udid, CONFIG["bundleId"],
            "-AppleLanguages", "(ja)", "-AppleLocale", "ja_JP",
            "-ascCaptureRoute", route, "-ascCaptureToken", token, timeout=60)
        ready = stream.wait_ready(route)
        if not ready:
            try:
                native_receipt(udid, token, route)
            except Exception as error:
                raise RuntimeError("No ready log and no valid native READY receipt (check Debug ASC_CAPTURE flags, arguments and app state): " + str(error)) from error
        STATE.update(readiness="log" if ready else "receipt+pixels", waiting_for=None)
        png = DIAGNOSTICS / STATE["device"] / (name + "-candidate.png")
        pixels = checked_screenshot(udid, png, device, fallback=not ready)
        if not ready:
            png = png.with_name(png.stem + "-settled.png")
        return png, {"readiness": STATE["readiness"], "pixels": pixels}
    finally:
        stream.close()
        log("App log artifacts: " + str(stream.path) + "; " + str(stream.history_path))


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
    # Full redacted streams remain artifacts; expose a concise useful summary
    # on CI stdout even if the log command itself failed or produced no markers.
    for path in sorted(directory.glob("*")):
        if path.is_file():
            log(f"FAILURE ARTIFACT {path.name} ({path.stat().st_size} bytes)")
            if path.suffix == ".log":
                tail = path.read_text(encoding="utf-8", errors="replace").splitlines()[-20:]
                log("LOG TAIL " + path.name + "\n" + "\n".join(tail))


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
        udid = run("xcrun", "simctl", "create", "ASC8-" + device["slug"], selection["device_type"], selection["runtime"])
        log("Created simulator UDID=" + udid)
        check_created_simulator(udid)
        run("xcrun", "simctl", "boot", udid)
        run("xcrun", "simctl", "bootstatus", udid, "-b", timeout=300)
        run("xcrun", "simctl", "ui", udid, "appearance", "light")
        run("xcrun", "simctl", "status_bar", udid, "override", "--time", "9:41", "--dataNetwork", "wifi", "--wifiMode", "active", "--wifiBars", "3", "--cellularMode", "active", "--cellularBars", "4", "--batteryState", "charged", "--batteryLevel", "100")
        run("xcrun", "simctl", "install", udid, str(app))
        for name, route in CAPTURE_ROUTES.items():
            png, verification = launch_screen(udid, name, route, device)
            operation("convert verified screenshot " + name)
            dest = output / f"{name}-{device['slug']}.jpg"
            run("sips", "-s", "format", "jpeg", str(png), "--out", str(dest))
            images.append({"file": dest.name, "sha256": hashlib.sha256(dest.read_bytes()).hexdigest(), "width": device["width"], "height": device["height"], "screen": name, "simulator": selection, **verification})
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
