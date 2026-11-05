#!/usr/bin/env bash
set -Eeuo pipefail
cd "$(dirname "$0")/.."
[[ "$(uname -s)" == Darwin ]] || { echo 'Capture requires macOS.' >&2; exit 1; }
mkdir -p build/asc/diagnostics
export PYTHONUNBUFFERED=1
export PYTHONIOENCODING=utf-8
STAGE=simulator-preflight
APPIUM_PID=''
LOG_PID=''
cleanup() {
  if [[ -n "$APPIUM_PID" ]]; then
    kill "$APPIUM_PID" 2>/dev/null || true
    wait "$APPIUM_PID" 2>/dev/null || true
    APPIUM_PID=''
  fi
  if [[ -n "$LOG_PID" ]]; then wait "$LOG_PID" 2>/dev/null || true; LOG_PID=''; fi
  rm -f build/asc/diagnostics/appium.pipe
}
failure() {
  local status=$?
  trap - ERR
  cleanup
  echo "ASC4 shell failure: stage=$STAGE exit=$status. Sanitized logs follow; no upload performed."
  for file in build/asc/simulator-build.log build/asc/diagnostics/*.log; do
    if [[ -f "$file" ]]; then echo "Log: $file (last 200 lines)"; tail -n 200 "$file"; fi
  done
  exit "$status"
}
trap failure ERR
trap cleanup EXIT
# Fail before the Debug build/tool installation when no native-size pair exists.
# Do not download multi-GB runtimes automatically on the finite CI worker.
python3 -u scripts/asc_capture.py --check-simulators
STAGE=prepare-inspection
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
STAGE=simulator-build
xcodebuild -workspace ios/App/App.xcworkspace -scheme App -configuration Debug \
  -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' \
  -derivedDataPath build/asc-simulator CODE_SIGNING_ALLOWED=NO build 2>&1 | python3 scripts/asc_diagnostics.py build/asc/simulator-build.log
# Raw tooling/Appium output is redacted before touching the artifact filesystem.
STAGE=install-appium
export APPIUM_HOME="$PWD/.cache/asc-appium-home"
npm install --prefix .cache/asc-tools --no-audit --no-fund appium@3.9.0 2>&1 | python3 scripts/asc_diagnostics.py build/asc/diagnostics/appium-install.log
APPIUM="$PWD/.cache/asc-tools/node_modules/.bin/appium"
if ! "$APPIUM" driver list --installed --json 2>/dev/null | python3 -c 'import json,sys; d=json.load(sys.stdin); sys.exit(0 if d.get("xcuitest",{}).get("version")=="12.22.8" else 1)'; then
  "$APPIUM" driver install xcuitest@12.22.8 2>&1 | python3 scripts/asc_diagnostics.py build/asc/diagnostics/xcuitest-install.log
fi
STAGE=start-appium
python3 - <<'PY'
import socket
with socket.socket() as s:
    try: s.bind(('127.0.0.1', 4723))
    except OSError: raise SystemExit('Port 4723 is already in use; do not send secrets to another server')
PY
mkfifo build/asc/diagnostics/appium.pipe
python3 scripts/asc_diagnostics.py build/asc/diagnostics/appium.log < build/asc/diagnostics/appium.pipe &
LOG_PID=$!
"$APPIUM" --address 127.0.0.1 --port 4723 --log-level info --log-no-colors > build/asc/diagnostics/appium.pipe 2>&1 &
APPIUM_PID=$!
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
STAGE=capture
python3 -u scripts/asc_capture.py
STAGE=validate-screenshots
python3 scripts/asc_validate.py --screenshots
