"""Inventory the 2025/2026 JAEIC PDFs without retaining question text in git.

Requires PyMuPDF. Downloads stay in ignored .cache/lk5. HTTP errors are recorded;
there are no retries, alternate hosts, credentials, or access-control workarounds.
"""
import hashlib
import json
from datetime import date
from pathlib import Path
import re
import unicodedata
from urllib.error import HTTPError, URLError
from urllib.request import urlopen

import fitz

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / ".cache/lk5"
DEST = ROOT / "data/qualification-staging/kenchikushi2/source-manifest.json"


def acquire(url):
    result = {"url": url}
    try:
        with urlopen(url, timeout=45) as response:
            body = response.read()
            result["httpStatus"] = response.status
        if not body.startswith(b"%PDF-"):
            return {**result, "status": "unavailable", "error": "Response is not a PDF"}, None
        doc = fitz.open(stream=body, filetype="pdf")
        result.update(status="acquired", sha256=hashlib.sha256(body).hexdigest(), pages=len(doc))
        (CACHE / url.rsplit("/", 1)[1]).write_bytes(body)
        return result, doc
    except (HTTPError, URLError, TimeoutError, OSError, RuntimeError) as exc:
        if isinstance(exc, HTTPError):
            result["httpStatus"] = exc.code
        return {**result, "status": "unavailable", "error": str(exc)}, None


def main():
    CACHE.mkdir(parents=True, exist_ok=True)
    rounds = []
    for slug, code in [("kenchikushi2", "2k"), ("mokuzo-kenchikushi", "mk")]:
        for year in [2026, 2025]:
            prefix = f"https://www.jaeic.or.jp/assets/pdf/shiken/{code}/{code}-mondai/{code}-2025-1st"
            urls = ([f"https://www.jaeic.or.jp/.assets/R8_{code}_{part}.pdf" for part in ["1_2", "3_4"]]
                    if year == 2026 else [f"{prefix}-gakka{part}.pdf" for part in ["1_2", "3_4"]])
            question_docs = []
            for pair, url in zip([["I", "II"], ["III", "IV"]], urls):
                item, doc = acquire(url)
                item["subjects"] = pair
                question_docs.append(item)
                if doc is not None:
                    doc[0].get_pixmap(matrix=fitz.Matrix(1, 1)).save(CACHE / f"{code}-{year}-{'-'.join(pair)}-cover.png")
                    doc.close()
            answer_url = (f"https://www.jaeic.or.jp/.assets/R08_{code}_gokakukizyun.pdf"
                          if year == 2026 else f"{prefix}-gokakukijun.pdf")
            answer_doc, doc = acquire(answer_url)
            answers = {}
            if doc is not None:
                text = unicodedata.normalize("NFKC", "\n".join(page.get_text() for page in doc))
                # Some PDFs join a full row; others emit cells on separate lines.
                for subject in ["I", "II", "III", "IV"]:
                    match = re.search(r"学科\s*" + subject + r"\s+((?:[1-5]\s*){25})(?![1-5])", text)
                    if match is None:
                        raise ValueError(f"Cannot read 25 answer cells: {slug} {year} {subject}")
                    answers[subject] = [int(value) for value in re.findall(r"[1-5]", match[1])]
                doc[0].get_pixmap(matrix=fitz.Matrix(1.5, 1.5)).save(CACHE / f"{code}-{year}-answers.png")
                doc.close()
            rounds.append({"qualificationSlug": slug, "year": year, "round": f"{year}-annual",
                           "expectedQuestionCount": 100, "questionDocuments": question_docs,
                           "answerDocument": answer_doc, "officialAnswers": answers,
                           "lawReferenceDate": f"{year}-01-01",
                           "lawReferenceExceptions": ([{
                               "date": "2025-04-01",
                               "scope": "令和4年法律第69号、令和6年政令第172号・国土交通省令第68号に基づく規定",
                               "sourcePage": 1
                           }] if year == 2025 else [])})
    manifest = {"checkedOn": date.today().isoformat(), "publicAllowed": False,
                "ownerDecisionAt": "2026-11-04T06:10:00+09:00",
                "ingestionState": "source-metadata-only", "ingestedQuestionCount": 0,
                "rounds": rounds}
    DEST.parent.mkdir(parents=True, exist_ok=True)
    DEST.write_bytes((json.dumps(manifest, ensure_ascii=False, indent=2) + "\n").encode("utf-8"))
    for item in rounds:
        print(item["qualificationSlug"], item["year"],
              [doc["status"] for doc in item["questionDocuments"]],
              item["answerDocument"]["status"], {key: len(value) for key, value in item["officialAnswers"].items()})


if __name__ == "__main__":
    main()
