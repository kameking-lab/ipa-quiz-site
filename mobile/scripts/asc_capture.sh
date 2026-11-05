#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
[[ "$(uname -s)" == Darwin ]] || { echo 'Capture requires macOS.' >&2; exit 1; }
mkdir -p build/asc
# Modify only the generated controller, never ios-assets or the distribution build.
python3 - <<'PY'
from pathlib import Path
p = Path('ios/App/App/QualificationBridgeViewController.swift')
s = p.read_text()
anchor = '    override func capacitorDidLoad() {'
assert s.count(anchor) == 1
if '// ASC2 simulator inspection' not in s:
    s = s.replace(anchor, anchor + '''
        // ASC2 simulator inspection
        #if DEBUG && targetEnvironment(simulator)
        if #available(iOS 16.4, *) { webView?.isInspectable = true }
        #endif
''')
p.write_text(s)
PY
xcodebuild -workspace ios/App/App.xcworkspace -scheme App -configuration Debug \
  -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' \
  -derivedDataPath build/asc-simulator CODE_SIGNING_ALLOWED=NO build > build/asc/simulator-build.log 2>&1
# Pin tooling in an ignored cache. Appium is loopback-only and never logs secrets.
export APPIUM_HOME="$PWD/.cache/asc-appium-home"
npm install --prefix .cache/asc-tools --no-audit --no-fund appium@3.9.0
APPIUM="$PWD/.cache/asc-tools/node_modules/.bin/appium"
if ! "$APPIUM" driver list --installed --json 2>/dev/null | python3 -c 'import json,sys; d=json.load(sys.stdin); sys.exit(0 if d.get("xcuitest",{}).get("version")=="12.22.8" else 1)'; then
  "$APPIUM" driver install xcuitest@12.22.8 > /dev/null 2>&1
fi
python3 - <<'PY'
import socket
with socket.socket() as s:
    try: s.bind(('127.0.0.1', 4723))
    except OSError: raise SystemExit('Port 4723 is already in use; do not send secrets to another server')
PY
"$APPIUM" --address 127.0.0.1 --port 4723 --log-level error > /dev/null 2>&1 &
APPIUM_PID=$!
trap 'kill "$APPIUM_PID" 2>/dev/null || true' EXIT
python3 - <<'PY'
import time, urllib.request
for _ in range(60):
    try:
        with urllib.request.urlopen('http://127.0.0.1:4723/status', timeout=1) as r:
            if r.status == 200: break
    except OSError: pass
    time.sleep(1)
else: raise SystemExit('Appium did not start')
PY
python3 scripts/asc_capture.py
python3 scripts/asc_validate.py --screenshots
