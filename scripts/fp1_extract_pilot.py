"""Extract the five reviewed 2026-05 FP1 academic pilot items from official PDFs.

Usage: python scripts/fp1_extract_pilot.py path/to/fp01_g_kiso.pdf
The final public JSON adds separately reviewed explanations and source metadata.
"""

import json
import re
import sys
import unicodedata
from pathlib import Path

import fitz


SELECTED = {1, 16, 20, 22, 48}


def tidy(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def main() -> None:
    source = Path(sys.argv[1])
    pages = fitz.open(source)
    text = "\n".join(page.get_text() for page in pages)
    matches = list(re.finditer(r"《問([０-９0-9]+)》", text))
    rows = []
    for index, match in enumerate(matches):
        number = int(unicodedata.normalize("NFKC", match.group(1)))
        if number not in SELECTED or (number == 1 and index == 0):
            continue
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        block = re.split(r"－\s*\d+\s*－", text[match.end():end])[0]
        options = re.split(r"(?m)^\s*([1-4])\)\s*", block)
        if len(options) != 9:
            raise ValueError(f"Q{number}: expected four options, got {len(options)} pieces")
        rows.append({
            "qNumber": number,
            "question": tidy(options[0]),
            "choices": {key: tidy(options[2 * key]) for key in range(1, 5)},
        })
    rows.sort(key=lambda row: row["qNumber"])
    if [row["qNumber"] for row in rows] != sorted(SELECTED):
        raise ValueError(f"Missing or duplicated questions: {[row['qNumber'] for row in rows]}")
    print(json.dumps(rows, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
