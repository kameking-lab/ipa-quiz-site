"""Verify LQ9 source hashes and text against locally downloaded official PDFs.
Usage: python scripts/verify-lq9-sources.py --pdf-dir <directory>
Requires PyMuPDF. Never downloads PDFs or changes the supplied source files.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re
import fitz

ROOT = Path(__file__).resolve().parents[1]

def norm(text):
    return re.sub(r"\s|\*\*", "", text)

def load(path):
    return json.loads(path.read_text(encoding="utf-8"))

def mapped_consumer_pdf(path):
    """Restore the known missing ASCII CMaps in this hash-verified 2024 paper."""
    doc = fitz.open(path)
    seen = set()
    for page in doc:
        for font in page.get_fonts(full=True):
            xref = font[0]
            if xref in seen:
                continue
            seen.add(xref)
            if doc.xref_get_key(xref, "ToUnicode")[0] != "null" or font[5] != "Identity-H":
                continue
            cmap = (
                "/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n"
                "/CIDSystemInfo << /Registry (Adobe) /Ordering (UCS) /Supplement 0 >> def\n"
                "/CMapName /LQ9ASCII def\n/CMapType 2 def\n"
                "1 begincodespacerange\n<0000> <FFFF>\nendcodespacerange\n95 beginbfchar\n"
                + "\n".join(f"<{c:04X}> <{c + 29:04X}>" for c in range(3, 98))
                + "\nendbfchar\nendcmap\nCMapName currentdict /CMap defineresource pop\nend\nend"
            )
            new_xref = doc.get_new_xref()
            doc.update_object(new_xref, "<<>>")
            doc.update_stream(new_xref, cmap.encode())
            doc.xref_set_key(xref, "ToUnicode", f"{new_xref} 0 R")
    return doc

def consumer_groups(doc, year):
    stop = 26 if year == 2024 else 27
    text = "\n".join(re.sub(r"^\s*\d+\s*$", "", p.get_text(sort=True), flags=re.M) for p in doc[2:stop])
    starts = list(re.finditer(r"(?m)^\s*([０-９0-9]{1,2})[．.]\s*(?=次の|問題)", text))
    assert [int(m[1]) for m in starts] == list(range(1, 21))
    groups = []
    for i, start in enumerate(starts):
        section = text[start.end():starts[i + 1].start() if i < 19 else len(text)]
        parts = re.split(r"(?m)^\s*([①-⑳])\s*", section)
        groups.append((parts[0], [parts[k + 1] for k in range(1, len(parts), 2)]))
    return groups

def verify_consumer(pdf_dir):
    count = 0
    for year in (2024, 2025):
        path = pdf_dir / f"shohi-{year}.pdf"
        doc = mapped_consumer_pdf(path) if year == 2024 else fitz.open(path)
        groups = consumer_groups(doc, year)
        rows = load(ROOT / f"data/questions/shohi-sodan/{year}.json")["questions"]
        assert len(rows) == 160
        for q in rows:
            group = q["officialQuestionNumber"]
            instruction, items = groups[group - 1]
            original = items[q["subQuestion"] - 1]
            choices = None
            if group in (3, 17):
                parts = re.split(r"(?<!\d)([1-4])[.．]\s*", original)
                expected, choices = parts[0], [parts[k + 1] for k in (1, 3, 5, 7)]
            elif group in ((15, 19, 20) if year == 2024 else (15, 19)):
                parts = re.split(r"(?m)^\s*([アイウ])\s+", original)
                expected, choices = parts[0], [parts[k + 1] for k in (1, 3, 5)]
            else:
                expected = original
            actual_instruction, body = q["question"].split("\n\n", 1)
            assert norm(actual_instruction) == norm(instruction), (year, group, q["subQuestion"], "instruction")
            assert norm(body) == norm(expected), (year, group, q["subQuestion"], "body")
            if choices:
                assert list(map(norm, choices)) == list(map(norm, q["choices"])), (year, group, q["subQuestion"], "choices")
            count += 1
    return count

def verify_reform(pdf_dir):
    count = 0
    for year in (2025, 2026):
        doc = fitz.open(pdf_dir / f"reform-{year}.pdf")
        rows = load(ROOT / f"data/questions/reform-mgr/{year}.json")["questions"]
        extracted = []
        for page in doc:
            text = re.sub(r"^.*(?:—|MR).*$", "", page.get_text(sort=True), flags=re.M)
            for match in re.finditer(r"問題\s*(\d+)\s*(.*?)(?=問題\s*\d+|\Z)", text, re.S):
                parts = re.split(r"[１２３４]．", match[2])
                assert len(parts) == 5
                values = [norm(p.split("【分野：")[0]) for p in parts]
                number = int(match[1])
                if year == 2026:
                    if number == 10:
                        values[0] = values[0].replace("くたいせんこう", "")
                    if number == 20:
                        values[3] = re.sub("かし$", "", values[3])
                    if number == 35:
                        values[3] = values[3].replace("こうばい", "")
                extracted.append((number, values))
        assert len(extracted) == len(rows) == 50
        for (number, values), q in zip(extracted, rows):
            assert number == q["number"]
            assert values == [norm(q["question"]), *map(norm, q["choices"])], (year, number)
            count += 1
    return count

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pdf-dir", required=True, type=Path)
    args = parser.parse_args()
    files = []
    for slug in ("shohi-sodan", "reform-mgr"):
        files.extend(load(ROOT / f"data/questions/{slug}/source-audit.json")["files"])
    for item in files:
        path = args.pdf_dir / f'{item["name"]}.pdf'
        assert hashlib.sha256(path.read_bytes()).hexdigest() == item["sha256"], path.name
        assert len(fitz.open(path)) == item["pages"], path.name
    count = verify_consumer(args.pdf_dir) + verify_reform(args.pdf_dir)
    print(f"PASS: {len(files)} original PDF hashes/pages; {count} complete question/option text comparisons")

if __name__ == "__main__":
    main()
