import fitz
from pypdf import PdfReader
import re, json, unicodedata
from pathlib import Path

HERE = Path(__file__).resolve().parent

def pymupdf_pages(path):
    doc = fitz.open(path)
    return [doc[i].get_text() for i in range(doc.page_count)]

def pypdf_pages(path):
    r = PdfReader(path)
    return [p.extract_text() for p in r.pages]

def norm(s):
    # collapse all whitespace (incl. full-width space 　) for diff comparison only
    s = s.replace("　", " ")
    s = re.sub(r"\s+", "", s)
    return s

def diff_pages(a_pages, b_pages, label):
    assert len(a_pages) == len(b_pages), (label, len(a_pages), len(b_pages))
    mismatches = []
    for i, (a, b) in enumerate(zip(a_pages, b_pages)):
        na, nb = norm(a), norm(b)
        if na != nb:
            mismatches.append((i, na, nb))
    print(label, "pages:", len(a_pages), "mismatches:", len(mismatches))
    for i, na, nb in mismatches[:10]:
        print(" page", i)
        print("  A:", na[:200])
        print("  B:", nb[:200])
    return mismatches

for name in ["exam_paper_20th.pdf", "exam_paper_19th.pdf"]:
    a = pymupdf_pages(name)
    b = pypdf_pages(name)
    diff_pages(a, b, name)
    (HERE / f"{name}.passA.json").write_text(json.dumps(a, ensure_ascii=False, indent=1), encoding="utf-8")
    (HERE / f"{name}.passB.json").write_text(json.dumps(b, ensure_ascii=False, indent=1), encoding="utf-8")
