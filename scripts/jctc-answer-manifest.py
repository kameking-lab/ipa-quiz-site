"""Build official 2026 first-stage answer receipts from JCTC answer PDFs."""

from __future__ import annotations

import json
import re
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/evidence/zoen2-tsushin2/input"
OUT = ROOT / "reports/zoen2-tsushin2-20260927/official-answers.json"


def answer_rows(filename: str) -> list[list[int]]:
    text = fitz.open(SOURCE / filename)[0].get_text(sort=True)
    return [
        [int(value) for value in match.group(1).split()]
        for match in re.finditer(r"解答\s+((?:[1-4]\s+){5,})", text)
    ]


telecom_rows = answer_rows("tsushin2-2026-a.pdf")
assert list(map(len, telecom_rows)) == [15, 15, 15, 15, 5]
telecom = [[answer] for row in telecom_rows for answer in row]

# The landscape-answer grid's final four columns have stacked multiple answers.
# These values were read against the rendered official answer page, not inferred
# from the vertical order of extracted text.
garden_rows = answer_rows("zoen2-2026-a.pdf")
assert list(map(len, garden_rows[:2])) == [15, 15]
garden = [[answer] for row in garden_rows[:2] for answer in row]
garden += [[3], [2], [4], [2], [4], [3], [1, 2, 3], [3, 4], [1, 3, 4], [2, 4]]
assert len(garden) == 40 and len(telecom) == 65

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps({"zoen2": garden, "tsushin2": telecom}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Official answer manifest: zoen2={len(garden)}, tsushin2={len(telecom)}")
