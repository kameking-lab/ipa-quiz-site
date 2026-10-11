"""Re-extract 2025 tsushin-1 questions from PDFs with verified font maps.

The output is an editorial review draft. Figures, equations, superscripts and
question A19's two-column graphical choices still require image review.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path

import fitz


FONT_MAP_A = {
    "ZZ-PIStd-819": {"愛": "+", "姶": "×", "挨": "−"},
    "KozMinPro-Medium.": {"\u0002": "「", "\u0003": "」"},
    "RyuminPr6N-Reg.": {"/": "2", "4": "1"},
}
FONT_MAP_B = {
    "KozMinPro-Medium.": {"\u0002": "「", "\u0003": "」"},
    "RyuminPr6N-Reg.": {
        "A": "1", "Q": "2", "L": "3", "M": "4", "K": "5",
        ":": "(ア)", ";": "(イ)",
    },
}


def correct_span(span: dict, session: str) -> str:
    font = span["font"]
    text = span["text"]
    mapping = FONT_MAP_A.get(font, {}) if session == "mondai-a" else FONT_MAP_B.get(font, {})
    text = "".join(mapping.get(char, char) for char in text)
    # The same font encodes a visible 8 as L at body size, while X_L is a real
    # subscript L at 5.7 pt. A size guard preserves the subscript.
    if session == "mondai-a" and font == "RyuminPr6N-Reg." and span["size"] >= 8:
        text = text.replace("L", "8")
    return text


def extract_page(page: fitz.Page, session: str) -> str:
    spans = [
        span
        for block in page.get_text("dict")["blocks"]
        for line in block.get("lines", [])
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
            parts.append(correct_span(span, session).replace("\n", ""))
            prev_right = span["bbox"][2]
        line = "".join(parts).strip()
        if line:
            lines.append(line)
    return "\n".join(lines)


def normalize(value: str) -> str:
    value = re.sub(r"--- PDF page \d+ ---", "", value)
    value = re.sub(r"―\s*\d+\s*―", "", value)
    value = re.sub(r"\s+", " ", value).strip()
    return re.sub(r"(?<=[一-龥ぁ-ゖァ-ヺー]) (?=[一-龥ぁ-ゖァ-ヺー])", "", value)


def extract(session: str, evidence_root: str | Path) -> dict:
    if session not in ("mondai-a", "mondai-b"):
        raise ValueError(session)
    root = Path(evidence_root)
    letter = session[-1]
    expected = 55 if letter == "a" else 35
    pdf = root / "input" / f"tsushin1-2025-{letter}.pdf"
    digest = hashlib.sha256(pdf.read_bytes()).hexdigest()
    doc = fitz.open(pdf)
    raw = "\n\n".join(
        f"--- PDF page {index + 1} ---\n{extract_page(page, session)}"
        for index, page in enumerate(doc)
    )
    markers = list(re.finditer(r"【No\.\s*(\d+)】", raw))
    numbers = [int(match.group(1)) for match in markers]
    assert numbers == list(range(1, expected + 1)), {
        "session": session,
        "expected": expected,
        "actual": numbers,
    }
    questions = []
    for i, marker in enumerate(markers):
        number = int(marker.group(1))
        end = markers[i + 1].start() if i + 1 < len(markers) else len(raw)
        block = raw[marker.end() : end]
        choice_markers = list(re.finditer(r"⑴|⑵|⑶|⑷", block))
        choice_ids = [choice.group() for choice in choice_markers]
        assert choice_ids == ["⑴", "⑵", "⑶", "⑷"], {
            "session": session,
            "number": number,
            "choices": choice_ids,
        }
        item = {
            "number": number,
            "pdfPage": len(re.findall(r"--- PDF page \d+ ---", raw[: marker.start()])),
            "question": normalize(block[: choice_markers[0].start()]),
            "choices": [
                normalize(
                    block[
                        choice.end() : choice_markers[j + 1].start()
                        if j < 3
                        else len(block)
                    ]
                )
                for j, choice in enumerate(choice_markers)
            ],
        }
        item["choices"][3] = re.split(r"※\s*問題番号", item["choices"][3], maxsplit=1)[0].strip()
        if session == "mondai-a" and number == 19:
            # This question has graphical choices in two columns. Text order
            # makes its last choice absorb the next section heading.
            item["choices"] = ["", "", "", ""]
            item["reviewFlags"] = ["two_column_graphical_choices_require_image_override"]
        if session == "mondai-a" and number in (1, 2, 4):
            item.setdefault("reviewFlags", []).append("math_superscript_or_private_glyph_requires_image_override")
        questions.append(item)
    assert len(questions) == expected
    assert len({item["number"] for item in questions}) == expected
    return {"questionPdfSha256": digest, "questions": questions}


def extract_all(evidence_root: str | Path) -> dict:
    return {session: extract(session, evidence_root) for session in ("mondai-a", "mondai-b")}


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("evidence_root", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    data = extract_all(args.evidence_root)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {len(data['mondai-a']['questions']) + len(data['mondai-b']['questions'])} questions")
