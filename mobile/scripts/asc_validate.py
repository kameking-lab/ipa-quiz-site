"""Offline validation, including image dimensions, complete sets and capture hashes."""
import argparse
import hashlib
import json
from pathlib import Path
import struct

ROOT = Path(__file__).resolve().parents[1]


def png_size(data):
    signature_and_header = b"\x89PNG\r\n\x1a\n\x00\x00\x00\x0dIHDR"
    end = b"\x00\x00\x00\x00IEND\xaeB\x60\x82"
    if len(data) < 45 or not data.startswith(signature_and_header) or not data.endswith(end):
        raise ValueError("Not a complete PNG")
    width, height, bit_depth, color_type = struct.unpack(">IIBB", data[16:26])
    if (bit_depth, color_type) != (8, 2):
        raise ValueError("Screenshots must be 8-bit RGB PNG (no alpha)")
    return width, height


def validate(screenshots=False, root=ROOT):
    metadata = root / "fastlane/metadata/ja"
    limits = {
        "name": 30, "subtitle": 30, "description": 4000, "promotional_text": 170, "release_notes": 4000,
    }
    for field, limit in limits.items():
        value = (metadata / (field + ".txt")).read_text(encoding="utf-8").rstrip("\n")
        if not value or len(value) > limit:
            raise ValueError("Invalid length: " + field)
    keywords = (metadata / "keywords.txt").read_text(encoding="utf-8").rstrip("\n")
    if not keywords or len(keywords.encode()) > 100:
        raise ValueError("Keywords exceed 100 UTF-8 bytes")
    for field in ("privacy_url", "support_url"):
        if not (metadata / (field + ".txt")).read_text().strip().startswith("https://www.kakomon-ai.jp/"):
            raise ValueError("Unexpected URL")
    notes = (root / "asc/review-notes.ja.txt").read_text(encoding="utf-8").rstrip("\n")
    if len(notes.encode()) > 4000:
        raise ValueError("Review notes exceed 4000 UTF-8 bytes")
    # No plaintext credential/contact placeholders may leak into deliver metadata.
    allowed = {"ja/" + name + ".txt" for name in (*limits, "keywords", "support_url", "privacy_url")}
    allowed.add("primary_category.txt")
    files = {p.relative_to(root / "fastlane/metadata").as_posix() for p in (root / "fastlane/metadata").rglob("*") if p.is_file()}
    if files != allowed:
        raise ValueError("Unexpected or missing metadata files: " + str(files.symmetric_difference(allowed)))
    if not screenshots:
        return
    config = json.loads((root / "asc/listing-screenshots.json").read_text(encoding="utf-8"))
    directory = root / "fastlane/screenshots/ja"
    manifest = json.loads((directory.parent / "manifest.json").read_text(encoding="utf-8"))
    expected = {file: (size["width"], size["height"]) for size in config["sets"] for file in size["files"]}
    actual = {p.name for p in directory.iterdir() if p.is_file()}
    if actual != set(expected):
        raise ValueError("Unexpected screenshot set")
    entries = manifest["images"]
    if len(entries) != len(expected) or {e["file"] for e in entries} != set(expected):
        raise ValueError("Capture manifest doesn't match images")
    for entry in entries:
        path = directory / entry["file"]
        data = path.read_bytes()
        if png_size(data) != expected[path.name]:
            raise ValueError("Wrong screenshot size: " + path.name)
        if hashlib.sha256(data).hexdigest() != entry["sha256"]:
            raise ValueError("Changed image after capture: " + path.name)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--screenshots", action="store_true")
    args = parser.parse_args()
    validate(args.screenshots)
    print("ASC metadata" + (" and screenshots" if args.screenshots else "") + " validation PASS")
