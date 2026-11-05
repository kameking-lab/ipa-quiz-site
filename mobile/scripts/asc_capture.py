"""Capture actual anonymous UI; no login, AI, quota grants or seeded history."""
import hashlib
import json
from pathlib import Path
import platform
import subprocess
import sys
import time
import traceback
import urllib.error
import urllib.request

from asc_diagnostics import redact, safe_source

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / "asc/capture.json").read_text(encoding="utf-8"))
DIAGNOSTICS = ROOT / "build/asc/diagnostics"
STATE = {"device": "setup", "screen": "setup", "operation": "setup", "waiting_for": None}


def log(message):
    line = redact(f"[ASC4] {json.dumps(STATE, ensure_ascii=False)} {message}")
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


class WebDriverError(RuntimeError):
    def __init__(self, message, code=None):
        super().__init__(message)
        self.code = code


class Driver:
    def __init__(self, udid):
        self.udid, self.session, self.context = udid, None, "NATIVE_APP"

    def start(self):
        operation("create XCUITest session")
        result = self.request("POST", "/session", {"capabilities": {"alwaysMatch": {
            "platformName": "iOS", "appium:automationName": "XCUITest",
            "appium:udid": self.udid, "appium:bundleId": CONFIG["bundleId"],
            "appium:noReset": True, "appium:newCommandTimeout": 180,
            "appium:wdaLaunchTimeout": 120000, "appium:wdaConnectionTimeout": 60000,
            "appium:showXcodeLog": True, "appium:safariLogAllCommunication": False,
            "appium:language": "ja", "appium:locale": "ja_JP",
        }}})
        self.session = result["sessionId"]
        self.request("POST", "/orientation", {"orientation": "PORTRAIT"})
        self.request("POST", "/timeouts", {"script": 30000})
        self.webview()

    def request(self, method, path, body=None):
        prefix = f"/session/{self.session}" if self.session else ""
        request = urllib.request.Request(
            f"http://127.0.0.1:4723{prefix}{path}", method=method,
            data=json.dumps(body).encode() if body is not None else None,
            headers={"Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(request, timeout=180 if path == "/session" else 45) as response:
                result = json.load(response)["value"]
        except urllib.error.HTTPError as error:
            response = error.read().decode("utf-8", "replace")
            try:
                code = json.loads(response).get("value", {}).get("error")
            except (ValueError, AttributeError):
                code = None
            raise WebDriverError(redact(f"Appium {method} {path} HTTP {error.code}\n{response}"), code) from None
        except (urllib.error.URLError, TimeoutError, ValueError) as error:
            raise WebDriverError(redact(f"Appium {method} {path}: {type(error).__name__}: {error}")) from None
        if isinstance(result, dict) and "error" in result:
            raise WebDriverError(redact(f"Appium {method} {path}: {json.dumps(result, ensure_ascii=False)}"), result["error"])
        return result

    def switch(self, context):
        self.request("POST", "/context", {"name": context})
        self.context = context

    def dismiss_alerts(self):
        previous = self.context
        self.switch("NATIVE_APP")
        try:
            for _ in range(5):
                try:
                    text = self.request("GET", "/alert/text")
                except WebDriverError as error:
                    if error.code == "no such alert":
                        return
                    raise
                buttons = self.request("POST", "/execute/sync", {"script": "mobile: alert", "args": [{"action": "getButtons"}]})
                log(f"System alert text={text!r} buttons={buttons!r}")
                choice = next((b for b in ("アプリにトラッキングしないように要求", "Ask App Not to Track", "許可しない", "Don't Allow", "Don’t Allow", "許可しないで続ける") if b in buttons), None)
                if not choice:
                    raise RuntimeError("Unknown system alert; refusing blind acceptance")
                log("Dismiss system alert: " + choice)
                self.request("POST", "/execute/sync", {"script": "mobile: alert", "args": [{"action": "dismiss", "buttonLabel": choice}]})
            raise RuntimeError("Too many system alerts")
        finally:
            if previous != "NATIVE_APP":
                # Full capacitor/https navigation can replace the inspected page.
                # Never restore an identifier that has vanished while in native.
                contexts = self.request("GET", "/contexts")
                target = previous if previous in contexts else next((c for c in contexts if c.startswith("WEBVIEW_")), None)
                if target:
                    self.switch(target)
                else:
                    log(f"Previous context {previous} vanished; no live WebView yet (native retained)")

    def webview(self):
        def select():
            self.dismiss_alerts()
            contexts = self.request("GET", "/contexts")
            log("Available contexts=" + repr(contexts))
            for context in contexts:
                if context.startswith("WEBVIEW_"):
                    self.switch(context)
                    return True
            return False
        wait(select, "inspectable app WKWebView", 120)

    def js(self, script, *args):
        return self.request("POST", "/execute/sync", {"script": script, "args": list(args)})

    def navigate(self, path):
        if path not in ("/", "/ap", "/review", "/account/dashboard"):
            raise ValueError("Capture route is not quota-free: " + path)
        operation("navigate " + path)
        self.js("location.assign(arguments[0]); return true;", CONFIG["origin"] + path)
        wait(lambda: self.js("return location.origin === arguments[0] && location.pathname === arguments[1] && document.readyState === 'complete';", CONFIG["origin"], path), "page " + path, driver=self)
        dismiss_web_dialogs(self)

    def close(self):
        if self.session:
            self.request("DELETE", "")
            self.session = None


def wait(predicate, label, seconds=60, driver=None):
    STATE["waiting_for"] = label
    log(f"WAIT timeout={seconds}s")
    deadline = time.monotonic() + seconds
    last_error, observed = None, None
    next_diagnostic = time.monotonic() + 15
    while time.monotonic() < deadline:
        try:
            observed = predicate()
            if observed:
                log("READY observed=" + repr(observed))
                STATE["waiting_for"] = None
                return
        except RuntimeError as error:
            last_error = str(error)
        if driver and time.monotonic() >= next_diagnostic:
            log(f"Still waiting; observed={observed!r}; last_error={last_error}")
            driver.dismiss_alerts()
            contexts = driver.request("GET", "/contexts")
            if driver.context == "NATIVE_APP" or driver.context not in contexts or last_error:
                driver.switch("NATIVE_APP")
                driver.webview()
            next_diagnostic = time.monotonic() + 15
        time.sleep(1)
    raise RuntimeError(f"Timed out waiting for {label}; observed={observed!r}; last Appium error:\n{last_error}")


def element(driver, selector):
    STATE["selector"] = selector
    wait(lambda: driver.js("const e=document.querySelector(arguments[0]); return !!e && e.getClientRects().length>0;", selector), "visible element " + selector, driver=driver)


def click_text(driver, text):
    operation("click text " + text)
    dismiss_web_dialogs(driver)
    wait(lambda: driver.js("return [...document.querySelectorAll('button,a')].some(e=>e.textContent.trim()===arguments[0]&&!e.disabled&&e.getClientRects().length>0);", text), "enabled control " + text, driver=driver)
    driver.js("const e=[...document.querySelectorAll('button,a')].find(e=>e.textContent.trim()===arguments[0]&&!e.disabled&&e.getClientRects().length>0); e.scrollIntoView({block:'center',behavior:'instant'}); e.click(); return true;", text)


def dismiss_web_dialogs(driver):
    dialogs = driver.js("""return [...document.querySelectorAll('[role=dialog],dialog[open]')].filter(e=>e.getClientRects().length)
      .map(e=>({text:e.innerText.slice(0,2000),buttons:[...e.querySelectorAll('button')].map(b=>b.textContent.trim())}));""")
    for dialog in dialogs:
        log("Web dialog=" + json.dumps(dialog, ensure_ascii=False))
        allowed = ("同意しない", "すべて拒否", "Reject all", "Reject All") if any(t in dialog["text"].lower() for t in ("cookie", "クッキー", "広告", "プライバシー")) else ("スキップ", "スキップして閉じる", "あとで")
        choice = next((b for b in allowed if b in dialog["buttons"]), None)
        if not choice:
            raise RuntimeError("Unknown web dialog; no approved dismissal")
        driver.js("const d=[...document.querySelectorAll('[role=dialog],dialog[open]')].find(e=>e.getClientRects().length&&e.innerText.slice(0,2000)===arguments[0]); [...d.querySelectorAll('button')].find(e=>e.textContent.trim()===arguments[1]).click(); return true;", dialog["text"], choice)


def capture_free_screens(driver, shot):
    log("Capture plan=quota-free alternative; grants=0; history=actual empty state. Applies even if IP daily quota is exhausted.")
    STATE["screen"] = "01-home"
    element(driver, '#choose-qualification [aria-label="資格の分野で絞り込む"]')
    click_text(driver, "IT・情報処理")
    element(driver, '#qualification-results a[href="/ap"]')
    shot("01-home", "#choose-qualification")
    for name, path in (("02-qualification", "/ap"), ("03-review", "/review"), ("04-history", "/account/dashboard")):
        STATE["screen"] = name
        driver.navigate(path)
        shot(name, "main h1")
    STATE["screen"] = "05-reminder"
    click_text(driver, "端末内で学習")
    wait(lambda: driver.js("return location.origin==='capacitor://localhost';"), "local native screen", driver=driver)
    shot("05-reminder", "input[type=time]")


def failure_evidence(driver, udid, error):
    directory = DIAGNOSTICS / STATE["device"]
    directory.mkdir(parents=True, exist_ok=True)
    log("FAILURE " + "".join(traceback.format_exception(error)))
    (directory / "failure.txt").write_text(redact(json.dumps(STATE, ensure_ascii=False, indent=2) + "\n" + "".join(traceback.format_exception(error))), encoding="utf-8")
    if udid:
        try:
            run("xcrun", "simctl", "io", udid, "screenshot", "--type=png", str(directory / "failure.png"), timeout=30)
            log("Failure screenshot saved: " + str(directory / "failure.png"))
        except Exception as secondary:
            log("Failure screenshot failed: " + str(secondary))
    def collect(name, action, source=False):
        try:
            value = action()
            text = value if isinstance(value, str) else json.dumps(value, ensure_ascii=False, indent=2)
            (directory / name).write_text(safe_source(text) if source else redact(text), encoding="utf-8")
            if not source:
                log(name + "=" + text)
        except Exception as secondary:
            log(f"Evidence collection {name} failed: {secondary}")
    if driver and driver.session:
        collect("web-state.json", lambda: driver.js("""return {url:location.href,readyState:document.readyState,text:document.body?.innerText.slice(0,6000),
          elements:Object.fromEntries(arguments[0].map(s=>[s,{count:document.querySelectorAll(s).length,visible:[...document.querySelectorAll(s)].some(e=>e.getClientRects().length)}])),
          images:[...document.images].filter(e=>{const r=e.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight}).map(e=>({src:e.currentSrc,complete:e.complete,width:e.naturalWidth})),fonts:document.fonts.status};""",
          list(dict.fromkeys(filter(None, [STATE.get("selector"),'#choose-qualification','#qualification-results a[href="/ap"]','[aria-label="iPhoneの学習機能"]','[role="radio"]','[aria-label="解答結果"]','main h1','input[type=time]','[role="dialog"]'])))))
        collect("web-source.html", lambda: driver.request("GET", "/source"), source=True)
        collect("contexts.json", lambda: driver.request("GET", "/contexts"))
        collect("native-context.txt", lambda: driver.switch("NATIVE_APP"))
        collect("native-source.xml", lambda: driver.request("GET", "/source"), source=True)
    else:
        log("URL / WKWebView text / page sources unavailable: Appium session was not established")
    if udid:
        collect("simulator-state.json", lambda: run("xcrun", "simctl", "list", "devices", "--json"))


def capture_device(device, app, output):
    STATE.update(device=device["slug"], screen="startup", operation="setup", waiting_for=None, selector=None)
    udid, driver, images = None, None, []
    try:
        types = json.loads(run("xcrun", "simctl", "list", "devicetypes", "--json"))["devicetypes"]
        runtimes = json.loads(run("xcrun", "simctl", "list", "runtimes", "--json"))["runtimes"]
        matches = [d for d in types if d["name"] == device["name"]]
        runtimes = sorted((r for r in runtimes if r.get("isAvailable") and ".iOS-" in r["identifier"]), key=lambda r: tuple(map(int, r["version"].split("."))))
        log(f"Requested device={device['name']}; matching types={matches}; available runtimes={runtimes}")
        if not matches or not runtimes:
            raise RuntimeError("Install an iOS simulator runtime for " + device["name"] + "; no resizing fallback")
        udid = run("xcrun", "simctl", "create", "ASC4-" + device["slug"], matches[0]["identifier"], runtimes[-1]["identifier"])
        log("Created simulator UDID=" + udid)
        run("xcrun", "simctl", "boot", udid)
        run("xcrun", "simctl", "bootstatus", udid, "-b", timeout=300)
        run("xcrun", "simctl", "ui", udid, "appearance", "light")
        run("xcrun", "simctl", "status_bar", udid, "override", "--time", "9:41", "--dataNetwork", "wifi", "--wifiMode", "active", "--wifiBars", "3", "--batteryState", "charged", "--batteryLevel", "100")
        run("xcrun", "simctl", "install", udid, str(app))
        driver = Driver(udid)  # Retain session for evidence even if start() fails.
        driver.start()
        element(driver, "#root main")  # Wait for local SDK config before leaving.
        driver.navigate("/")
        element(driver, '[aria-label="iPhoneの学習機能"]')

        def shot(name, selector):
            STATE["screen"] = name
            operation("prepare screenshot " + name)
            driver.dismiss_alerts()
            if driver.context == "NATIVE_APP":
                driver.webview()
            dismiss_web_dialogs(driver)
            element(driver, selector)
            driver.js("document.activeElement?.blur(); document.querySelector(arguments[0]).scrollIntoView({block:'start',behavior:'instant'}); return true;", selector)
            wait(lambda: driver.js("return document.fonts.status==='loaded' && [...document.images].filter(e=>{const r=e.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight}).every(e=>e.complete&&e.naturalWidth>0);"), "visible images/fonts", driver=driver)
            time.sleep(2)
            driver.dismiss_alerts()
            png = ROOT / "build/asc" / (device["slug"] + ".png")
            dest = output / f"{name}-{device['slug']}.jpg"
            run("xcrun", "simctl", "io", udid, "screenshot", "--type=png", str(png))
            run("sips", "-s", "format", "jpeg", str(png), "--out", str(dest))
            png.unlink()
            images.append({"file": dest.name, "sha256": hashlib.sha256(dest.read_bytes()).hexdigest(), "width": device["width"], "height": device["height"], "screen": name})
            log("SAVED " + dest.name)

        capture_free_screens(driver, shot)
        return images
    except Exception as error:
        failure_evidence(driver, udid, error)
        raise
    finally:
        if driver:
            try:
                driver.close()
            except Exception as error:
                log("Session cleanup: " + str(error))
        if udid:
            for command in ("shutdown", "delete"):
                try:
                    run("xcrun", "simctl", command, udid, timeout=30)
                except Exception as error:
                    log("Simulator cleanup: " + str(error))


def main():
    if platform.system() != "Darwin":
        raise RuntimeError("Capture requires macOS + Xcode")
    app = ROOT / "build/asc-simulator/Build/Products/Debug-iphonesimulator/App.app"
    if not app.is_dir():
        raise RuntimeError("Build the Debug simulator .app first using asc_capture.sh")
    output = ROOT / "fastlane/screenshots/ja"
    output.mkdir(parents=True, exist_ok=True)
    if list(output.glob("*.jpg")) or list(output.glob("*.png")):
        raise RuntimeError("Screenshot destination must be empty; archive/remove previous captures explicitly")
    (ROOT / "build/asc").mkdir(parents=True, exist_ok=True)
    manifest = {"git_commit": run("git", "rev-parse", "HEAD"), "authentication": "anonymous", "capture_plan": "quota-free alternative: qualification, review and actual empty dashboard; no quiz/explanation frames", "quota_grants": 0, "fifth_screen": "ASC1 approved reminder alternative", "images": []}
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
