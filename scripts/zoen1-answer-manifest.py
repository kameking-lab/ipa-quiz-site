"""Record the official 2026 first-stage garden-management answer grid."""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / "docs/evidence/zoen1-2026/input/zoen1-2026-answers.pdf"
OUT = ROOT / "reports/zoen1-20260927/official-answers.json"

# Transcribed from the JCTC answer grid. B24-29 have vertically stacked
# answers; the rendered PDF is checked separately to retain every digit.
a = [4, 2, 2, 2, 1, 3, 2, 4, 1, 2, 3, 4, 2, 4, 4, 3, 3, 1, 1, 2, 2, 3, 2,
     2, 4, 2, 2, 1, 1, 3, 1, 3, 4, 3, 3, 2]
b_single = [1, 4, 1, 3, 3, 1, 4, 1, 1, 2, 3, 2, 3, 4, 3, 3, 3, 3, 2, 2, 4, 2, 1]
b_applied = [[1, 3], [1, 2, 4], [1, 3, 4], [2], [1, 2, 4], [1, 4]]
assert len(a) == 36 and len(b_single) == 23 and len(b_applied) == 6

text = fitz.open(PDF)[0].get_text(sort=True)
assert "問題は全て必須問題です" in text
assert "問題２４から問題２９" in text
rows = [
    [int(digit) for digit in re.findall(r"[1-4]", line.split("解答", 1)[1])]
    for line in text.splitlines()
    if "解答" in line
]
rows = [row for row in rows if len(row) >= 6]
assert rows[:3] == [a[:23], a[23:], b_single], rows[:3]
payload = {
    "exam": "zoen1",
    "year": 2026,
    "questionPdfUrls": {
        "mondai-a": "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907z_mondaia.pdf",
        "mondai-b": "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907z_mondaib.pdf",
    },
    "answerPdfUrl": "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907z_seitou.pdf",
    "answerPdfSha256": hashlib.sha256(PDF.read_bytes()).hexdigest(),
    "allQuestionsRequired": True,
    "appliedMultipleAnswerRange": {"paper": "mondai-b", "from": 24, "to": 29},
    "answers": {
        "mondai-a": [[number] for number in a],
        "mondai-b": [[number] for number in b_single] + b_applied,
    },
}
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Official answer manifest: A={len(a)}, B={len(b_single) + len(b_applied)}")
