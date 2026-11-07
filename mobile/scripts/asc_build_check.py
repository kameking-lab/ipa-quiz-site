"""Verify effective App simulator settings, persisting only non-secret fields."""
import json
from pathlib import Path
import sys


def check(rows):
    settings = [row["buildSettings"] for row in rows if row.get("target") == "App"]
    if len(settings) != 1:
        raise ValueError("Expected exactly one App target in xcodebuild settings")
    source = settings[0]
    result = {key: source.get(key) for key in (
        "CONFIGURATION", "PLATFORM_NAME", "PRODUCT_BUNDLE_IDENTIFIER", "SWIFT_ACTIVE_COMPILATION_CONDITIONS"
    )}
    flags = result["SWIFT_ACTIVE_COMPILATION_CONDITIONS"] or ""
    if isinstance(flags, str):
        flags = flags.split()
    if result["CONFIGURATION"] != "Debug" or result["PLATFORM_NAME"] != "iphonesimulator" or not {"DEBUG", "ASC_CAPTURE"}.issubset(flags):
        raise ValueError("ASC capture requires effective Debug + iphonesimulator + DEBUG ASC_CAPTURE: " + json.dumps(result))
    if result["PRODUCT_BUNDLE_IDENTIFIER"] != "jp.kakomon-ai.app":
        raise ValueError("Unexpected capture bundle ID")
    return result


if __name__ == "__main__":
    result = check(json.load(sys.stdin))
    Path(sys.argv[1]).write_text(json.dumps(result, indent=2), encoding="utf-8")
    print("ASC8 effective simulator build settings PASS: " + json.dumps(result), flush=True)
