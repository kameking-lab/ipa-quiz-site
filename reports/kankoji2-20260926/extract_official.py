"""Pin and extract readable main-font lines from the official 2級管工事 first-stage PDFs.

Ruby (furigana) is printed at 5pt and excluded. Spans between 5.2pt and 6pt are
kept but wrapped as {{sup:...}} so superscripts/subscripts are visually checked.
The extraction is an index for human visual checking, not a publication source.
Usage: python extract_official.py <question.pdf> <question-sha> <answer.pdf> <answer-sha> <out.json>
"""

from __future__ import annotations

import hashlib
import json
import re
import sys
from pathlib import Path

import fitz


def verified(path: Path, expected: str) -> fitz.Document:
    actual = hashlib.sha256(path.read_bytes()).hexdigest().upper()
    if actual != expected.upper():
        raise ValueError(f"SHA mismatch {path}: {actual}")
    return fitz.open(path)


def main_lines(page: fitz.Page) -> list[dict]:
    spans = []
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            for span in line["spans"]:
                size = span["size"]
                text = span["text"]
                if size < 5.2 or not text.strip():
                    continue
                if size < 6:
                    text = "{{sup:" + text + "}}"
                spans.append({"x": span["bbox"][0], "y": span["bbox"][1], "y1": span["bbox"][3], "size": size, "text": text})
    spans.sort(key=lambda s: (s["y"], s["x"]))
    groups: list[dict] = []
    for span in spans:
        # small spans (super/subscript) attach to the nearest main line
        tol = 6.0 if span["size"] < 9 else 2.5
        group = next((g for g in groups if abs(g["y"] - span["y"]) <= tol), None)
        if group is None:
            group = {"y": span["y"], "spans": []}
            groups.append(group)
        group["spans"].append(span)
    groups.sort(key=lambda g: g["y"])
    return [{"y": round(g["y"], 1), "text": "".join(s["text"] for s in sorted(g["spans"], key=lambda s: s["x"]))}
            for g in groups]


def main() -> None:
    qpdf, qsha, apdf, asha, out = sys.argv[1:6]
    questions = verified(Path(qpdf), qsha)
    verified(Path(apdf), asha)
    pages = []
    for page_index, page in enumerate(questions):
        lines = main_lines(page)
        headers = []
        for line in lines:
            headers.extend(int(m.group(1)) for m in re.finditer(r"【No\.\s*(\d+)】", line["text"]))
        pages.append({"pageIndex": page_index, "headers": headers, "lines": lines,
                      "embeddedImages": len(page.get_images(full=True)), "drawings": len(page.get_drawings())})
    payload = {"questionSha256": qsha.upper(), "answerSha256": asha.upper(), "pages": pages}
    Path(out).write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"pageCount": len(pages), "questionHeaders": [n for p in pages for n in p["headers"]]}, ensure_ascii=False))


if __name__ == "__main__":
    main()
