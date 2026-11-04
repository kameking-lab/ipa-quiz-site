"""Capture real simulator UI with simctl + Appium's WKWebView automation.

No seeded answers, mocked AI, premium flags or synthetic UI. Run from mobile/.
Appium stdout/stderr must be discarded: WebDriver payloads contain login secrets.
"""
import hashlib
import json
import os
from pathlib import Path
import platform
import subprocess
import sys
import time
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / "asc/capture.json").read_text(encoding="utf-8"))


def run(*args, **kwargs):
    return subprocess.check_output(args, text=True, **kwargs).strip()


class Driver:
    def __init__(self, udid):
        self.session = None
        result = self.request("POST", "/session", {"capabilities": {"alwaysMatch": {
            "platformName": "iOS", "appium:automationName": "XCUITest",
            "appium:udid": udid, "appium:bundleId": CONFIG["bundleId"],
            "appium:noReset": True, "appium:newCommandTimeout": 180,
            "appium:showXcodeLog": False, "appium:safariLogAllCommunication": False,
        }}})
        self.session = result["sessionId"]
        self.request("POST", "/orientation", {"orientation": "PORTRAIT"})
        self.request("POST", "/timeouts", {"script": 60000})
        self.webview()

    def request(self, method, path, body=None):
        prefix = f"/session/{self.session}" if self.session else ""
        request = urllib.request.Request(
            f"http://127.0.0.1:4723{prefix}{path}", method=method,
            data=json.dumps(body).encode() if body is not None else None,
            headers={"Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(request, timeout=180) as response:
                result = json.load(response)["value"]
        except (urllib.error.URLError, TimeoutError):
            # Never echo a remote response, script or request containing credentials.
            raise RuntimeError("WebDriver command failed (payload suppressed)") from None
        if isinstance(result, dict) and "error" in result:
            raise RuntimeError("WebDriver rejected command (payload suppressed)")
        return result

    def webview(self):
        def select():
            contexts = self.request("GET", "/contexts")
            for context in contexts:
                if context.startswith("WEBVIEW_"):
                    self.request("POST", "/context", {"name": context})
                    return True
            return False
        wait(select, "inspectable app WKWebView", 90)

    def js(self, script, *args):
        return self.request("POST", "/execute/sync", {"script": script, "args": list(args)})

    def async_js(self, script, *args):
        return self.request("POST", "/execute/async", {"script": script, "args": list(args)})

    def navigate(self, path):
        self.js("location.assign(arguments[0]); return true;", CONFIG["origin"] + path)
        wait(lambda: self.js("return location.pathname === arguments[0] && document.readyState === 'complete';", path.split("?")[0]), "page " + path)

    def close(self):
        if self.session:
            self.request("DELETE", "")
            self.session = None


def wait(predicate, label, seconds=60):
    deadline = time.monotonic() + seconds
    while time.monotonic() < deadline:
        try:
            if predicate():
                return
        except RuntimeError:
            pass  # navigation can temporarily invalidate a web context
        time.sleep(1)
    raise RuntimeError("Timed out waiting for " + label)


def element(driver, selector):
    wait(lambda: driver.js("return !!document.querySelector(arguments[0]);", selector), selector)


def click(driver, selector):
    element(driver, selector)
    driver.js("const e=document.querySelector(arguments[0]); e.scrollIntoView({block:'center'}); e.click(); return true;", selector)


def click_text(driver, text):
    wait(lambda: driver.js("return [...document.querySelectorAll('button,a')].some(e=>e.textContent.trim()===arguments[0]);", text), text)
    driver.js("const e=[...document.querySelectorAll('button,a')].find(e=>e.textContent.trim()===arguments[0]); e.scrollIntoView({block:'center'}); e.click(); return true;", text)


def capture_device(device, app, output, code):
    types = json.loads(run("xcrun", "simctl", "list", "devicetypes", "--json"))["devicetypes"]
    runtimes = json.loads(run("xcrun", "simctl", "list", "runtimes", "--json"))["runtimes"]
    matches = [d for d in types if d["name"] == device["name"]]
    runtimes = sorted((r for r in runtimes if r.get("isAvailable") and ".iOS-" in r["identifier"]),
                      key=lambda r: tuple(map(int, r["version"].split("."))))
    if not matches or not runtimes:
        raise RuntimeError("Install an iOS simulator runtime for " + device["name"] + "; no resizing fallback")
    # A fresh device avoids inheriting personal data from any existing simulator.
    udid = run("xcrun", "simctl", "create", "ASC2-" + device["slug"], matches[0]["identifier"], runtimes[-1]["identifier"])
    driver = None
    images = []
    try:
        run("xcrun", "simctl", "boot", udid)
        run("xcrun", "simctl", "bootstatus", udid, "-b")
        run("xcrun", "simctl", "ui", udid, "appearance", "light")
        run("xcrun", "simctl", "status_bar", udid, "override", "--time", "9:41", "--dataNetwork", "wifi", "--wifiMode", "active", "--wifiBars", "3", "--batteryState", "charged", "--batteryLevel", "100")
        run("xcrun", "simctl", "install", udid, str(app))
        run("xcrun", "simctl", "launch", udid, CONFIG["bundleId"])
        driver = Driver(udid)
        # Open the actual hosted app in its native WebView, retaining Capacitor.
        driver.navigate("/")
        element(driver, '[aria-label="iPhoneの学習機能"]')
        # Use the actual Auth.js credential flow (CSRF + normal signed session).
        # Avoid UI typeText/logs, code in a URL, fabricated cookies or PKCE bypass.
        ok = driver.async_js("""
          const code=arguments[0], done=arguments[arguments.length-1];
          (async()=>{
            const csrf=await (await fetch('/api/auth/csrf')).json();
            const r=await fetch('/api/auth/callback/app-review', {method:'POST',
              headers:{'Content-Type':'application/x-www-form-urlencoded','X-Auth-Return-Redirect':'1'},
              body:new URLSearchParams({csrfToken:csrf.csrfToken,code,callbackUrl:location.origin+'/'})});
            const result=await r.json();
            const session=await (await fetch('/api/auth/session')).json();
            done(r.ok && !String(result.url).includes('error=') && session.user?.email==='app-review@accounts.kakomon-ai.invalid');
          })().catch(()=>done(false));
        """, code)
        if not ok:
            raise RuntimeError("Real review-account login failed; check IOS3 production settings")
        driver.navigate("/")

        def shot(name, selector):
            element(driver, selector)
            driver.js("document.activeElement?.blur(); document.querySelector(arguments[0]).scrollIntoView({block:'start'}); return true;", selector)
            # Wait for loaded fonts and all images in the visible viewport.
            wait(lambda: driver.js("return document.fonts.status==='loaded' && [...document.images].filter(e=>{const r=e.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight}).every(e=>e.complete&&e.naturalWidth>0);"), "visible images/fonts")
            time.sleep(2)
            png = ROOT / "build/asc" / (device["slug"] + ".png")
            dest = output / f"{name}-{device['slug']}.jpg"
            run("xcrun", "simctl", "io", udid, "screenshot", "--type=png", str(png))
            run("sips", "-s", "format", "jpeg", str(png), "--out", str(dest))
            png.unlink()
            images.append({"file": dest.name, "sha256": hashlib.sha256(dest.read_bytes()).hexdigest(),
                           "width": device["width"], "height": device["height"], "screen": name})

        # 01: actual qualification picker in the hosted page.
        element(driver, '#choose-qualification [aria-label="資格の分野で絞り込む"]')
        driver.js("const e=[...document.querySelectorAll('#choose-qualification button')].find(e=>e.textContent.startsWith('IT・')); if(!e)throw Error('IT filter absent'); e.click(); return true;")
        wait(lambda: driver.js("return [...document.querySelectorAll('#qualification-results a')].some(e=>e.textContent.includes('応用情報'));"), "IPA qualification picker")
        shot("01-home", "#choose-qualification")
        # Three actual answers create genuine study history (within free quota).
        driver.navigate("/quiz?mode=random&exam=ap")
        for index in range(3):
            click(driver, '[role="radio"]:not([disabled])')
            element(driver, '[aria-label="解答結果"]')
            if index == 0:
                shot("02-quiz", '[aria-label="解答結果"]')
                click_text(driver, "この問題をAIに質問")
                selector = 'textarea[aria-label^="AIへの質問"]'
                element(driver, selector)
                driver.js("const e=document.querySelector(arguments[0]); Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(e,arguments[1]); e.dispatchEvent(new Event('input',{bubbles:true})); return true;", selector, CONFIG["question"])
                # Schedule click so JS confirm doesn't block execute/sync's response.
                driver.js("setTimeout(()=>document.querySelector('button[aria-label=\"送信\"]').click(),100); return true;")
                driver.request("POST", "/context", {"name": "NATIVE_APP"})
                wait(lambda: bool(driver.request("GET", "/alert/text")), "AI consent prompt", 20)
                if "Google Gemini" not in driver.request("GET", "/alert/text"):
                    raise RuntimeError("Unexpected native alert; refusing automatic consent")
                driver.request("POST", "/alert/accept", {})
                driver.webview()
                element(driver, '[aria-label="AI コパイロットの応答"] [aria-label="このメッセージをコピー"]')
                wait(lambda: driver.js("return !document.querySelector('[aria-label=\"生成を停止\"]') && !document.querySelector('[aria-label=\"回答を生成中\"]') && !document.querySelector('[role=\"alert\"]') && (document.querySelector('[aria-label=\"AI コパイロットの応答\"]')?.textContent.length||0)>80;"), "complete genuine AI response", 120)
                shot("03-ai", '[aria-label="AI コパイロットの応答"]')
                # The response may be inline; close only an actual dialog.
                driver.js("document.querySelector('[role=dialog] button[aria-label=\"閉じる\"]')?.click(); return true;")
            if index < 2:
                click_text(driver, "次の問題へ")
        driver.navigate("/account/dashboard")
        wait(lambda: driver.js("return (JSON.parse(localStorage.getItem('ipa-quiz:history:v1')||'{}').entries?.length||0)>=3;"), "actual study history")
        shot("04-history", "main h1")
        click_text(driver, "端末内で学習")
        wait(lambda: driver.js("return location.origin==='capacitor://localhost';"), "local native screen")
        shot("05-reminder", "input[type=time]")
        return images
    finally:
        if driver:
            try:
                driver.close()
            except RuntimeError:
                pass
        subprocess.run(["xcrun", "simctl", "shutdown", udid], capture_output=True)
        subprocess.run(["xcrun", "simctl", "delete", udid], capture_output=True)


def main():
    if platform.system() != "Darwin":
        raise RuntimeError("Capture requires macOS + Xcode; no files changed")
    code = os.environ.get("ASC_SCREENSHOT_REVIEW_CODE", "")
    if not 43 <= len(code) <= 128:
        raise RuntimeError("Set secret ASC_SCREENSHOT_REVIEW_CODE to the real active IOS3 code")
    app = ROOT / "build/asc-simulator/Build/Products/Debug-iphonesimulator/App.app"
    if not app.is_dir():
        raise RuntimeError("Build the Debug simulator .app first using asc_capture.sh")
    output = ROOT / "fastlane/screenshots/ja"
    output.mkdir(parents=True, exist_ok=True)
    if list(output.glob("*.jpg")) or list(output.glob("*.png")):
        raise RuntimeError("Screenshot destination must be empty; archive/remove previous captures explicitly")
    (ROOT / "build/asc").mkdir(parents=True, exist_ok=True)
    manifest = {"git_commit": run("git", "rev-parse", "HEAD"), "fifth_screen": "ASC1 approved reminder alternative", "images": []}
    for device in CONFIG["devices"]:
        manifest["images"].extend(capture_device(device, app, output, code))
    (output.parent / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Captured 10 actual simulator screenshots. 05 is the reminder alternative, not offline entitlement evidence.")


if __name__ == "__main__":
    try:
        main()
    except Exception:
        # No traceback: third-party diagnostics may contain a session/code.
        print("ASC capture failed. Check simulator availability, current production UI, IOS3 login and AI quota. No upload was performed.", file=sys.stderr)
        sys.exit(1)
