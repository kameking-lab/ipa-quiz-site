"""Rebuild the ignored private Denken 3 tree in a fresh checkout.

Usage: python scripts/denken3-restore-private.py

Downloads the SHA-pinned official question/answer PDFs and official reference
sources, then re-renders question pages, reference pages named by strict
receipts, answer-table images and figure crops. Every download is verified
against its pinned SHA-256; nothing is accepted on a mismatch.
"""

from __future__ import annotations

from hashlib import sha256
import importlib.util
import json
from pathlib import Path
import re
import subprocess
import sys

import fitz


ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data/raw_pdfs/denken3"
PRIVATE = RAW / "review"
# Some government hosts reject non-browser user agents with HTTP 403.
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36"


def digest(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def fetch(url: str, target: Path, expected: str) -> bool:
    if target.is_file() and digest(target) == expected:
        return True
    target.parent.mkdir(parents=True, exist_ok=True)
    for _ in range(4):
        subprocess.run(["curl", "-sSfL", "--retry", "2", "-A", USER_AGENT, "-o", str(target), url], check=False)
        if target.is_file() and digest(target) == expected:
            return True
    if target.exists():
        target.unlink()
    print(f"UNAVAILABLE {url}", flush=True)
    return False


def load(name: str):
    spec = importlib.util.spec_from_file_location(name.replace("-", "_"), ROOT / "scripts" / f"{name}.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def main() -> None:
    manifest = json.loads((ROOT / "scripts/denken3-source-manifest.json").read_text(encoding="utf-8"))
    for session in manifest["sessions"]:
        for item in [session["officialAnswer"], *session["subjects"]]:
            fetch(item["url"], RAW / item["url"].rsplit("/", 1)[-1], item["sha256"])
        answer = RAW / session["officialAnswer"]["url"].rsplit("/", 1)[-1]
        image = RAW / f"answer-{session['examDate'].replace('-', '')}.png"
        if answer.is_file() and not image.exists():
            fitz.open(answer)[0].get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False).save(image)
    render = load("denken3-render-pages")
    for session in manifest["sessions"]:
        for paper in session["subjects"]:
            print(render.render(session, paper), flush=True)
    load("denken3-fetch-egov-references").main()
    references = json.loads((ROOT / "scripts/denken3-reference-manifest.json").read_text(encoding="utf-8"))
    pdfs = {}
    for entry in references:
        if "localPdf" in entry and fetch(entry["url"], ROOT / entry["localPdf"], entry["sha256"]):
            pdfs[Path(entry["localPdf"]).stem] = ROOT / entry["localPdf"]
    wanted = set()
    for entry in references:
        if "localPdf" in entry:
            wanted |= {(Path(entry["localPdf"]).stem, page) for page in entry["pages"]}
    for path in (ROOT / "docs/evidence/denken3/strict").glob("*.json"):
        receipt = json.loads(path.read_text(encoding="utf-8"))
        for name in (receipt.get("inputHashes") or {}).get("referencePageSha256", {}):
            match = re.fullmatch(r".*/references/(.+)-p(\d{3})\.png", name)
            if match:
                wanted.add((match[1], int(match[2])))
    for stem, page in sorted(wanted):
        if stem not in pdfs:
            continue
        target = PRIVATE / "references" / f"{stem}-p{page:03}.png"
        target.parent.mkdir(parents=True, exist_ok=True)
        if not target.exists():
            fitz.open(pdfs[stem])[page - 1].get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False).save(target)
    crop = load("denken3-crop-figures")
    for item in json.loads((ROOT / "scripts/denken3-figure-crops.json").read_text(encoding="utf-8")):
        crop.crop(item, manifest)
    print("private tree restored", flush=True)


if __name__ == "__main__":
    sys.exit(main())
