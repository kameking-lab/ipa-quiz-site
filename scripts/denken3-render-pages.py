"""Build local visual review packs from SHA-pinned official problem PDFs."""

from hashlib import sha256
import json
from pathlib import Path
import re
import sys
import unicodedata

import fitz


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts/denken3-source-manifest.json"
CACHE = ROOT / "data/raw_pdfs/denken3"
REVIEW = CACHE / "review"
HEADING = re.compile(r"^問\s*(\d{1,2})(?!\d)", re.MULTILINE)


def render(session: dict, paper: dict) -> dict:
    date = session["examDate"].replace("-", "")
    subject = paper["subject"]
    source = CACHE / paper["url"].rsplit("/", 1)[-1]
    if sha256(source.read_bytes()).hexdigest() != paper["sha256"]:
        raise ValueError(f"Question PDF hash mismatch: {source}")
    document = fitz.open(source)
    out = REVIEW / date / subject
    out.mkdir(parents=True, exist_ok=True)
    starts = {}
    for index, page in enumerate(document):
        if index < 3:  # Coversheet/instructions include a sample Q1.
            continue
        value = unicodedata.normalize("NFKC", page.get_text("text"))
        for match in HEADING.finditer(value):
            number = int(match[1])
            if number in paper["questionNumbers"]:
                starts.setdefault(number, index)
    expected = paper["questionNumbers"]
    if set(starts) != set(expected):
        raise ValueError(f"Could not locate every heading in {date} {subject}: missing {sorted(set(expected) - set(starts))}")
    pages = {}
    for position, number in enumerate(expected):
        first = starts[number]
        next_start = starts[expected[position + 1]] if position + 1 < len(expected) else len(document)
        last = max(first, next_start - 1)
        paths = []
        for page_number in range(first, last + 1):
            path = out / f"p{page_number + 1:02}.png"
            if not path.exists():
                document[page_number].get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False).save(path)
            paths.append(str(path.relative_to(ROOT)).replace("\\", "/"))
        pages[str(number)] = {"pdfPages": list(range(first + 1, last + 2)), "images": paths}
    receipt = {"examDate": session["examDate"], "fiscalYear": session["fiscalYear"],
               "term": session["term"], "subject": subject, "sourceQuestionPdfSha256": paper["sha256"],
               "sourceAnswerPdfSha256": session["officialAnswer"]["sha256"],
               "answerUnits": paper["answerUnits"], "questions": pages}
    path = out / "question-page-map.json"
    path.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return {"date": date, "subject": subject, "questions": len(pages),
            "visualPages": len({p for q in pages.values() for p in q["pdfPages"]})}


def main() -> None:
    year = int(sys.argv[1]) if len(sys.argv) > 1 else 2024
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    for session in manifest["sessions"]:
        if session["fiscalYear"] != year:
            continue
        for paper in session["subjects"]:
            print(render(session, paper), flush=True)


if __name__ == "__main__":
    main()
