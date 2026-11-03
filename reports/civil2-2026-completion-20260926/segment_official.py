"""Split SHA-pinned PDF extraction into exam-numbered text segments.

This is a transcription aid. Every candidate still needs source visual review.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
source = json.loads((HERE / "official-extract.json").read_text(encoding="utf-8"))


def clean(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def parse_segment(number: int, page_index: int, lines: list[str]) -> dict:
    lines = [line for line in lines if not re.fullmatch(r"―\d+―", line.strip())]
    stem: list[str] = []
    choices: list[list[str]] = [[], [], [], []]
    current: int | None = None
    for line in lines:
        if current is None and not re.match(r"^⑴\s*", line):
            stem.append(line)
            continue
        m = re.match(r"^([⑴⑵⑶⑷])\s*(.*)$", line)
        if m:
            current = "⑴⑵⑶⑷".index(m.group(1))
            choices[current].append(m.group(2))
        elif current is not None:
            choices[current].append(line)
    return {
        "number": number,
        "pdfPage": page_index + 1,
        "officialAnswerNumber": source["answerByNumber"][str(number)],
        "stemLines": stem,
        "choiceLines": choices,
        "stem": clean("".join(stem)),
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
assert [record["number"] for record in records] == list(range(1, 67))
(HERE / "official-segments.json").write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"questions": len(records), "completeChoices": sum(all(r["choices"]) for r in records),
                  "incomplete": [r["number"] for r in records if not all(r["choices"])]}, ensure_ascii=False))
