"""Pin and extract readable main-font lines from the official 2026 civil2 PDFs.

The extraction is an index for human visual checking, not a publication source.
Ruby is printed at half-size and is excluded; diagrams still require inspection.
"""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

import fitz

QUESTION_PDF = Path(r"C:\Users\kanet\20260522\note-automation\tmp\pdfs\20260608d_mondai.pdf")
ANSWER_PDF = Path(r"C:\Users\kanet\20260522\note-automation\tmp\pdfs\20260608d_seitou.pdf")
QUESTION_SHA = "CF69CAA81A9F411513B9B763B61C21A15B43F327E220BB5FF3F336C0A6BA0792"
ANSWER_SHA = "6CF5ABA933D5D7F07F284A2F7BED2A8A99E3CD79794485AC5E47CDE954D89A5A"
HERE = Path(__file__).resolve().parent


def verified(path: Path, expected: str) -> fitz.Document:
    actual = hashlib.sha256(path.read_bytes()).hexdigest().upper()
    if actual != expected:
        raise ValueError(f"SHA mismatch {path}: {actual}")
    return fitz.open(path)


def main_lines(page: fitz.Page) -> list[dict]:
    spans = []
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            for span in line["spans"]:
                if span["size"] >= 7.5 and span["text"].strip():
                    spans.append({"x": span["bbox"][0], "y": span["bbox"][1], "text": span["text"]})
    spans.sort(key=lambda s: (s["y"], s["x"]))
    groups: list[dict] = []
    for span in spans:
        group = next((g for g in groups if abs(g["y"] - span["y"]) <= 2.5), None)
        if group is None:
            group = {"y": span["y"], "spans": []}
            groups.append(group)
        group["spans"].append(span)
    groups.sort(key=lambda g: g["y"])
    return [{"y": round(g["y"], 1), "text": "".join(s["text"] for s in sorted(g["spans"], key=lambda s: s["x"]))}
            for g in groups]


def main() -> None:
    questions = verified(QUESTION_PDF, QUESTION_SHA)
    answers_pdf = verified(ANSWER_PDF, ANSWER_SHA)
    answer_text = answers_pdf[0].get_text()
    answer_pairs = []
    for match in re.finditer(r"問題番号\s*([\d\s]+)解答\s*([\d\s]+)(?=問題番号|問題番号№)", answer_text):
        numbers = [int(x) for x in match.group(1).split()]
        answers = [int(x) for x in match.group(2).split()]
        if len(numbers) != len(answers):
            raise ValueError(f"answer row mismatch: {numbers} / {answers}")
        answer_pairs.extend(zip(numbers, answers))
    if [n for n, _ in answer_pairs] != list(range(1, 67)):
        raise ValueError(f"answer numbering incomplete: {answer_pairs}")
    if not all(1 <= answer <= 4 for _, answer in answer_pairs):
        raise ValueError("answer outside 1..4")
    pages = []
    for page_index, page in enumerate(questions):
        lines = main_lines(page)
        headers = []
        for line in lines:
            headers.extend(int(m.group(1)) for m in re.finditer(r"【No\.\s*(\d+)】", line["text"]))
        pages.append({"pageIndex": page_index, "headers": headers, "lines": lines,
                      "embeddedImages": len(page.get_images(full=True)), "drawings": len(page.get_drawings())})
    payload = {"questionSha256": QUESTION_SHA, "answerSha256": ANSWER_SHA,
               "answerByNumber": dict(answer_pairs), "pages": pages}
    (HERE / "official-extract.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"pageCount": len(pages), "questionHeaders": [n for p in pages for n in p["headers"]],
                      "answerCount": len(answer_pairs)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
