"""Split SHA-pinned PDF extraction into exam-numbered text segments (2級管工事).

This is a transcription aid. Every candidate still needs source visual review.
Usage: python segment_official.py <extract.json> <answers-json> <count> <out.json> [choice-marker-regex]
The 2025 PDF encodes the ⑴〜⑷ glyphs as "81"〜"84" in its text layer.
answers-json maps question number -> list of official answer numbers.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

extract_path, answers_path, count, out_path = sys.argv[1], sys.argv[2], int(sys.argv[3]), sys.argv[4]
source = json.loads(Path(extract_path).read_text(encoding="utf-8"))
answers = json.loads(Path(answers_path).read_text(encoding="utf-8"))

CHOICE_RE = re.compile(sys.argv[5] if len(sys.argv) > 5 else r"^\(\s*([1-4])\s*\)?\s*(.*)$")


def clean(text: str) -> str:
    return re.sub(r"[ 　]+", " ", text).strip()


def parse_segment(number: int, page_index: int, lines: list[str]) -> dict:
    lines = [line for line in lines if not re.fullmatch(r"―\s*\d+\s*―", line.strip())]
    lines = [line for line in lines if not line.lstrip().startswith("※")]
    stem: list[str] = []
    choices: list[list[str]] = [[], [], [], []]
    current: int | None = None
    for line in lines:
        m = CHOICE_RE.match(line.strip())
        if m and (current is None and m.group(1) == "1" or current is not None and int(m.group(1)) == current + 2):
            current = int(m.group(1)) - 1
            choices[current].append(m.group(2))
        elif current is None:
            stem.append(line)
        else:
            choices[current].append(line)
    stem_text = clean("".join(stem))
    stem_text = re.sub(r"^【No\.\s*\d+】\s*", "", stem_text)
    return {
        "number": number,
        "pdfPage": page_index + 1,
        "officialAnswerNumbers": answers[str(number)],
        "stemLines": stem,
        "choiceLines": choices,
        "stem": stem_text,
        "choices": [clean("".join(group)) for group in choices],
    }


records = []
for page in source["pages"]:
    lines = page["lines"]
    headers = []
    for index, line in enumerate(lines):
        m = re.search(r"【No\.\s*(\d+)】", line["text"])
        if m:
            headers.append((index, int(m.group(1))))
    for i, (start, number) in enumerate(headers):
        stop = headers[i + 1][0] if i + 1 < len(headers) else len(lines)
        records.append(parse_segment(number, page["pageIndex"], [line["text"] for line in lines[start:stop]]))
assert [record["number"] for record in records] == list(range(1, count + 1)), [r["number"] for r in records]
Path(out_path).write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"questions": len(records), "completeChoices": sum(all(r["choices"]) for r in records),
                  "incomplete": [r["number"] for r in records if not all(r["choices"])],
                  "withSmallSpans": [r["number"] for r in records if "{{sup:" in json.dumps(r, ensure_ascii=False)]}, ensure_ascii=False))
