"""Extract downloaded official KHK PDFs; never synthesizes questions or answers.

Usage: python scripts/khk-reito-extract.py /tmp/khk-reito-pdfs
PDFs and extraction drafts stay outside the repository. Review the page images
before promoting text, especially CID glyphs, equations and shared premises.
"""
import json
import re
import sys
import unicodedata
from pathlib import Path

import pdfplumber

root = Path(sys.argv[1])
papers = {}
for path in sorted(root.glob("R?AC??-W.pdf")):
    with pdfplumber.open(path) as pdf:
        pages = []
        for page in pdf.pages[1:]:
            # Printer's crop marks / doubled InDesign footer are outside body.
            pages.append(page.crop((25, 25, page.width - 25, page.height - 45)).extract_text(y_tolerance=6) or "")
    text = "\n".join(pages)
    text = re.sub(r"^.*R[67]-[GHI][XYZ].*$", "", text, flags=re.M)
    # Never remove bare numbers: those are often mathematical subscripts.
    text = re.sub(r"^\s*-\s*\d+\s*-\s*$", "", text, flags=re.M)
    starts = list(re.finditer(r"^問\s*([０-９0-9]+)\s+(?!から)", text, re.M))
    premises = []
    for m in re.finditer(r"^問\s*([０-９0-9]+)\s*から問\s*([０-９0-9]+)\s*まで", text, re.M):
        end = next(s.start() for s in starts if s.start() > m.start())
        premises.append((int(m[1]), int(m[2]), text[m.start():end].strip()))
    questions = []
    for i, start in enumerate(starts):
        number = int(start[1])
        body = text[start.end():starts[i + 1].start() if i + 1 < len(starts) else len(text)].strip()
        body = re.split(r"\n問\s*[０-９0-9]+\s*から", body)[0].strip()
        premise = "\n\n".join(p for lo, hi, p in premises if lo <= number <= hi)
        row = {"qNumber": number, "question": body, "premise": premise}
        if "GZ" not in path.name:
            markers = list(re.finditer(r"\(([1-5])\)|[⑴⑵⑶⑷⑸]", body))
            candidates = [markers[j:j + 5] for j in range(len(markers) - 4)
                          if [unicodedata.normalize("NFKC", s[0]).strip("()") for s in markers[j:j + 5]] == list("12345")]
            assert len(candidates) == 1, (path.name, number, "ambiguous choices")
            seq = candidates[0]
            row["question"] = body[:seq[0].start()].strip()
            row["choices"] = [body[s.end():seq[j + 1].start() if j < 4 else len(body)].strip() for j, s in enumerate(seq)]
        questions.append(row)
    expected = 5 if "GZ" in path.name else (20 if "X" in path.name else (10 if "H" in path.name else 15))
    assert [q["qNumber"] for q in questions] == list(range(1, expected + 1)), (path.name, len(questions))
    papers[path.stem] = questions
(root / "parsed.json").write_text(json.dumps(papers, ensure_ascii=False, indent=2) + "\n")
print({name: len(rows) for name, rows in papers.items()})
