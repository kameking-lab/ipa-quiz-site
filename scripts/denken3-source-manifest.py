"""Pin every official 2024/2025-fiscal-year Denken-3 PDF by SHA-256."""

from concurrent.futures import ThreadPoolExecutor, as_completed
from hashlib import sha256
import json
from pathlib import Path
import re
import unicodedata

import fitz
import requests


ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / "data/raw_pdfs/denken3"
OUT = ROOT / "scripts/denken3-source-manifest.json"
SESSIONS = (
    (2024, "upper", "2024-08-18", "20240818"),
    (2024, "lower", "2025-03-23", "20250323"),
    (2025, "upper", "2025-08-31", "20250831"),
    (2025, "lower", "2026-03-22", "20260322"),
)
SUBJECTS = (("theory", "理論", "q01"), ("power", "電力", "q02"),
            ("machinery", "機械", "q03"), ("law", "法規", "q04"))
BASE = "https://www.shiken.or.jp/chief/upload/"
ANSWER_OVERRIDES = {"20250323": "2024_3_2.pdf"}


def fetch(date_code: str, code: str) -> dict:
    name = ANSWER_OVERRIDES[date_code] if code == "a01" and date_code in ANSWER_OVERRIDES else f"{date_code}_ch_third_{code}.pdf"
    url = BASE + name
    path = CACHE / name
    if not path.exists():
        response = requests.get(url, timeout=90)
        response.raise_for_status()
        data = response.content
        if not data.startswith(b"%PDF"):
            raise ValueError(f"Not PDF: {url}")
        path.write_bytes(data)
    blob = path.read_bytes()
    if not blob.startswith(b"%PDF"):
        raise ValueError(f"Not PDF: {path}")
    document = fitz.open(stream=blob, filetype="pdf")
    pages = [page.get_text("text") for page in document]
    text = unicodedata.normalize("NFKC", "\n".join(pages))
    question_numbers = sorted({int(value) for value in re.findall(r"(?<![\w])問\s*(\d{1,2})(?!\d)", text)})
    return {"code": code, "url": url, "sha256": sha256(blob).hexdigest(),
            "pages": len(document), "bytes": len(blob),
            "observedQuestionNumbers": question_numbers}


def main() -> None:
    CACHE.mkdir(parents=True, exist_ok=True)
    items = {}
    with ThreadPoolExecutor(max_workers=4) as pool:
        futures = {pool.submit(fetch, date_code, code): (date_code, code)
                   for _, _, _, date_code in SESSIONS
                   for code in ("q01", "q02", "q03", "q04", "a01")}
        for future in as_completed(futures):
            key = futures[future]
            items[key] = future.result()
            print(f"{key[0]} {key[1]} {items[key]['pages']} pages", flush=True)
    sessions = []
    for year, term, exam_date, date_code in SESSIONS:
        answer = items[(date_code, "a01")]
        papers = []
        for subject, label, code in SUBJECTS:
            source = items[(date_code, code)]
            papers.append({"subject": subject, "label": label, **source})
        sessions.append({"fiscalYear": year, "term": term, "examDate": exam_date,
                         "officialAnswer": answer, "subjects": papers})
    manifest = {
        "schemaVersion": 1,
        "sourceIndex": "https://www.shiken.or.jp/chief/third/qa/",
        "reuseTerms": "https://www.shiken.or.jp/shiken/faq/faq08/000082.html",
        "requiredFiscalYears": [2024, 2025],
        "publicGate": "non-public-until-all-16-subject-papers-and-notification-complete",
        "answerLabels": ["1", "2", "3", "4", "5"],
        "sessions": sessions,
    }
    OUT.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Pinned {len(sessions) * 5} official PDFs in {OUT}")


if __name__ == "__main__":
    main()
