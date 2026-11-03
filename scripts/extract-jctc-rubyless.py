"""Extract a readable review draft from JCTC PDFs with furigana spans removed."""

from __future__ import annotations

import argparse
from pathlib import Path

import fitz


def extract_page(page: fitz.Page) -> str:
    spans = [
        span
        for block in page.get_text("dict")["blocks"]
        if "lines" in block
        for line in block["lines"]
        for span in line["spans"]
        if span["size"] >= 8 and span["text"].strip()
    ]
    spans.sort(key=lambda span: (span["bbox"][1], span["bbox"][0]))
    rows: list[list[dict]] = []
    for span in spans:
        if rows and abs(rows[-1][0]["bbox"][1] - span["bbox"][1]) <= 3:
            rows[-1].append(span)
        else:
            rows.append([span])
    lines = []
    for row in rows:
        row.sort(key=lambda span: span["bbox"][0])
        parts = []
        prev_right = 0.0
        for span in row:
            if parts and span["bbox"][0] - prev_right > 11:
                parts.append(" ")
            parts.append(span["text"].replace("\n", ""))
            prev_right = span["bbox"][2]
        line = "".join(parts).strip()
        if line:
            lines.append(line)
    return "\n".join(lines)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    document = fitz.open(args.pdf)
    text = "\n\n".join(f"--- PDF page {index + 1} ---\n{extract_page(page)}" for index, page in enumerate(document))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(text + "\n", encoding="utf-8")
    print(f"{len(document)} pages, {len(text)} characters: {args.output}")
