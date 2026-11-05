#!/usr/bin/env bash
set -Eeuo pipefail
cd "$(dirname "$0")/.."
[[ "$(uname -s)" == Darwin ]] || { echo 'Capture requires macOS.' >&2; exit 1; }
mkdir -p build/asc/diagnostics
export PYTHONUNBUFFERED=1
export PYTHONIOENCODING=utf-8
STAGE=simulator-preflight
failure() {
  local status=$?
  trap - ERR
  echo "ASC7 shell failure: stage=$STAGE exit=$status. Sanitized logs follow; no upload performed."
  for file in build/asc/simulator-build.log build/asc/diagnostics/*.log; do
    if [[ -f "$file" ]]; then echo "Log: $file (last 200 lines)"; tail -n 200 "$file"; fi
  done
  exit "$status"
}
trap failure ERR
# Fail before the Debug build when no native-size pair exists.
# Do not download multi-GB runtimes automatically on the finite CI worker.
python3 -u scripts/asc_capture.py --check-simulators
STAGE=simulator-build
xcodebuild -workspace ios/App/App.xcworkspace -scheme App -configuration Debug \
  -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' \
  -derivedDataPath build/asc-simulator CODE_SIGNING_ALLOWED=NO \
  'SWIFT_ACTIVE_COMPILATION_CONDITIONS=$(inherited) DEBUG ASC_CAPTURE' build 2>&1 | python3 scripts/asc_diagnostics.py build/asc/simulator-build.log
# No Appium, XCUITest driver, WebDriverAgent, remote inspector or npm tooling.
STAGE=capture
python3 -u scripts/asc_capture.py
STAGE=validate-screenshots
python3 scripts/asc_validate.py --screenshots
