"""Independently read the official answer PDF and compare 120 staged positions.

Usage: python reports/tohan-kansai-2024/independent-answer-key-check.py <official-answer.pdf>
The PDF is deliberately supplied from a fresh official download, not the staged receipt.
"""

import json
import re
import sys
from pathlib import Path

import fitz


root = Path(__file__).resolve().parent
pdf_path = Path(sys.argv[1])
lines = [line.strip() for line in fitz.open(pdf_path)[0].get_text().splitlines()]
numbers = [int(match.group(1)) for line in lines if (match := re.fullmatch(r"問(\d+)", line))]
answers = [int(line) for line in lines if re.fullmatch(r"[1-5]", line)]
assert numbers == list(range(1, 121)), f"unexpected official question order: {numbers}"
assert len(answers) == 120, f"unexpected official answer count: {len(answers)}"

staged = json.loads((root / "extracted-questions.json").read_text(encoding="utf-8"))
assert len(staged) == 120
mismatches = [
    (number, answer, staged[number - 1]["officialAnswerNumber"])
    for number, answer in zip(numbers, answers)
    if answer != staged[number - 1]["officialAnswerNumber"]
]
assert not mismatches, f"official answer mismatches: {mismatches}"
print("PASS: independently parsed official PDF answer positions match 120 staged questions")
