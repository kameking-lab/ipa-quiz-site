"""Verify local official PDFs, answer-table coordinates and every original crop.

python scripts/audit-jokaso-setsubishi-source.py --source-dir <directory>
Requires PyMuPDF and Pillow. Files must be named 2025/2026-{questions,answers}.pdf.
Does not download, mutate data, or treat a JSON hash as proof of exact transcription.
"""
import argparse
import hashlib
import io
import json
from pathlib import Path

import fitz
from PIL import Image, ImageChops


def sha(data):
    return hashlib.sha256(data).hexdigest()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-dir", type=Path, required=True)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    staging = root / "data/qualification-staging/jokaso-setsubishi"
    manifest = json.loads((staging / "manifest.json").read_text(encoding="utf-8"))
    audit = json.loads((staging / "source-audit.json").read_text(encoding="utf-8"))
    evidence = {q["id"]: q for q in audit["questions"]}
    for entry in manifest["files"]:
        raw = (args.source_dir / (entry["name"] + ".pdf")).read_bytes()
        assert raw.startswith(b"%PDF"), entry["name"]
        assert len(raw) == entry["bytes"] and sha(raw) == entry["sha256"], entry["name"]

    checked = 0
    for year in (2025, 2026):
        questions = json.loads((staging / f"{year}.json").read_text(encoding="utf-8"))
        assert [q["qNumber"] for q in questions] == list(range(1, 51))
        answer_page = fitz.open(args.source_dir / f"{year}-answers.pdf")[0]
        # Independent of PDF text extraction order: for each 問N cell, find its
        # answer directly below, within the same horizontal table column.
        words = answer_page.get_text("words")
        answer_map = {}
        for x0, y0, x1, y1, text, *_ in words:
            if text.startswith("問") and text[1:].isdigit():
                number = int(text[1:])
                below = [(w[1], w[4]) for w in words if w[4] in {"1", "2", "3", "4"}
                         and abs((w[0]+w[2])/2-(x0+x1)/2) < 12 and 0 < w[1]-y1 < 30]
                assert len(below) == 1, (year, number, below)
                answer_map[number] = int(below[0][1])
        assert sorted(answer_map) == list(range(1, 51))
        pdf = fitz.open(args.source_dir / f"{year}-questions.pdf")
        for q in questions:
            assert q["officialAnswerNumber"] == answer_map[q["qNumber"]], q["id"]
            receipt = evidence[q["id"]]
            page = pdf[q["sourcePage"]-1]
            pix = page.get_pixmap(matrix=fitz.Matrix(receipt["renderScale"], receipt["renderScale"]),
                                 clip=fitz.Rect(receipt["clip"]))
            actual = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
            saved_bytes = (staging / q["sourceImage"]).read_bytes()
            saved = Image.open(io.BytesIO(saved_bytes)).convert("RGB")
            assert actual.size == saved.size and ImageChops.difference(actual, saved).getbbox() is None, q["id"]
            assert sha(saved_bytes) == q["sourceImageSha256"] == receipt["sourceImageSha256"]
            payload = json.dumps({"question": q["question"], "choices": q["choices"]},
                                 ensure_ascii=False, sort_keys=True).encode()
            assert sha(payload) == q["sourceTextSha256"] == receipt["sourceTextSha256"]
            checked += 1
        print(f"{year}: official answers 50/50; exact original-image pixel comparison 50/50")
    assert checked == 100
    print("PASS: 4 official PDF hashes; 100 numbered answers; 100 original crops; 100 text integrity receipts")
    print("Text receipts detect changes after visual adjudication; they do not replace independent original-text review.")


if __name__ == "__main__":
    main()
