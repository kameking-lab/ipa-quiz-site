"""Archive GSI pages privately. Input PDFs must be obtained by ordinary GET.

Usage: python scripts/qualification-ingestion/sokuryoshi-sources.py PDF_DIRECTORY
PDF binaries and OCR drafts are intentionally not committed. Canonical originals
are lossless page images, so equations, maps, tables and typography survive OCR.
"""
from pathlib import Path
import hashlib
import json
import sys

import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "data/qualification-staging/sokuryoshi"
SOURCES = [
    (2026, "am-question", "000278970"),
    (2026, "am-answer", "000278971"),
    (2026, "pm-question-1", "000278972"),
    (2026, "pm-question-2", "000278973"),
    (2026, "pm-answer-example", "000279272"),
    (2026, "pm-answer-sheet", "000279273"),
    (2025, "am-question-1", "000270172"),
    (2025, "am-question-2", "000270173"),
    (2025, "am-answer", "000270179"),
    (2025, "pm-question-1", "000270174"),
    (2025, "pm-question-2", "000270176"),
    (2025, "pm-answer-example", "000271324"),
    (2025, "pm-answer-sheet", "000271266"),
]


def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main():
    cache = Path(sys.argv[1])
    documents = []
    for year, role, source_id in SOURCES:
        pdf = cache / f"{source_id}.pdf"
        doc = fitz.open(pdf)
        pages = []
        for index, page in enumerate(doc):
            asset = Path("assets") / source_id / f"{index + 1:02}.webp"
            path = OUT / asset
            path.parent.mkdir(parents=True, exist_ok=True)
            pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
            Image.frombytes("RGB", (pix.width, pix.height), pix.samples).save(path, lossless=True)
            pages.append({"page": index + 1, "asset": asset.as_posix(), "width": pix.width,
                          "height": pix.height, "sha256": hashlib.sha256(path.read_bytes()).hexdigest()})
        documents.append({"id": source_id, "year": year, "role": role,
                          "url": f"https://www.gsi.go.jp/common/{source_id}.pdf",
                          "retrievalMethod": "GET", "httpStatus": 200,
                          "retrievedAt": "2026-11-04", "bytes": pdf.stat().st_size,
                          "sha256": hashlib.sha256(pdf.read_bytes()).hexdigest(), "pages": pages})
    write_json(OUT / "source-manifest.json", {"slug": "sokuryoshi", "publicAllowed": False,
        "officialIndexUrl": "https://www.gsi.go.jp/LAW/SHIKEN/past.html",
        "officialReuseTermsUrl": "https://www.gsi.go.jp/GSI/chosaku.htm",
        "canonicalFormat": "lossless-original-page-images", "renderScale": 2,
        "missingPdfUrls": [], "documents": documents})
    print(f"Archived {len(documents)} documents / {sum(len(d['pages']) for d in documents)} pages privately")


if __name__ == "__main__":
    main()
