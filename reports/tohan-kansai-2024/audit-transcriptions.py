"""Flag low-confidence candidate text against SHA-pinned official R6 PDFs.

This is a triage aid, not a release approval: furigana and table layout in
the official PDF can alter extraction order, so every question still needs
human comparison with the page image.
"""

import argparse
import hashlib
import json
import os
import re
import unicodedata
from difflib import SequenceMatcher
from pathlib import Path

import fitz


ROOT = Path(__file__).resolve().parent
parser = argparse.ArgumentParser()
parser.add_argument("--pdf-dir", type=Path, default=Path(os.environ["TEMP"]) / "tohan-r6-qa-20260928")
args = parser.parse_args()
PDF_ROOT = args.pdf_dir
questions = json.loads((ROOT / "extracted-questions.json").read_text(encoding="utf-8"))
receipt = json.loads((ROOT / "source-receipt.json").read_text(encoding="utf-8"))
for part, filename in (("前半", "front.pdf"), ("後半", "back.pdf")):
    digest = hashlib.sha256((PDF_ROOT / filename).read_bytes()).hexdigest()
    assert digest == receipt["sha256"][part], (part, digest)
docs = {"前半": fitz.open(PDF_ROOT / "front.pdf"), "後半": fitz.open(PDF_ROOT / "back.pdf")}


def norm(s):
    return re.sub(r"\s+", "", unicodedata.normalize("NFKC", s))


def coverage(candidate, original):
    match = SequenceMatcher(None, norm(candidate), norm(original), autojunk=False)
    return sum(block.size for block in match.get_matching_blocks()) / max(1, len(norm(candidate)))


results = []
for q in questions:
    source = "".join(docs[q["pdfPart"]][p - 1].get_text() for p in q["pdfPages"])
    # Matrix choices are printed in columns, so their PDF extraction order is
    # unlike the row-oriented candidate. Compare the question body only.
    results.append((q["number"], coverage(q["question"], source)))

for number, score in results:
    if score < 0.95:
        print(f"Question {number}: source character coverage {score:.3f}; inspect table/furigana/word order")
print(f"Triage complete: {len(results)} questions; this is not visual or independent review")
