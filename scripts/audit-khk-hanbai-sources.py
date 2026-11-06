"""Read-only source comparison; writes audit metadata, never downloads or rewrites questions.

Usage: python scripts/audit-khk-hanbai-sources.py --source-dir tmp/lk6
Requires PyMuPDF and pdfplumber. PDF originals and extracted drafts stay outside commits.
"""
import argparse
import hashlib
import json
import re
import unicodedata
from pathlib import Path

import fitz
import pdfplumber


def normalize(text):
    text = unicodedata.normalize("NFKC", text)
    text = re.sub(r"R[67]-[JKL][XY]", "", text)
    text = re.sub(r"\s+", "", text)
    return re.sub(r"\(\)([1-5])", r"(\1)", text)


def digest(text):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-dir", type=Path, default=Path("tmp/lk6"))
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    staging = root / "data/qualification-staging/khk-hanbai"
    sources = json.loads((staging / "official-sources.json").read_text(encoding="utf-8"))
    records, mismatches = [], []
    cache = {}
    for source in sources:
        if not source["acquired"]:
            continue
        path = args.source_dir / source["name"]
        if hashlib.sha256(path.read_bytes()).hexdigest() != source["sha256"]:
            raise ValueError(f"Source hash mismatch: {path}")
        with fitz.open(path) as doc:
            pages = []
            for number, page in enumerate(doc, 1):
                text = page.get_text()
                text = re.sub(r"(?m)^\s*(?:R[67]-[JKL][XY]|-\s*\d+\s*-)\s*$", "", text)
                text = re.sub(r"^\s*\d+\s*\n", "", text)
                pages.append(text)
        with pdfplumber.open(path) as doc:
            alternative = "\n".join(page.extract_text() or "" for page in doc.pages[1:])
        cover = unicodedata.normalize("NFKC", pages[0])
        cover_conditions = [
            match[0] for match in re.finditer(r"\([78]\)\s*.*?(?=\([1-9]\)|\Z)", cover, re.S)
            if any(term in match[0] for term in ("問題中において", "特に記述のない場合", "標準状態"))
        ]
        cache[source["url"]] = ("\n".join(pages[1:]), alternative, "\n".join(pages), cover_conditions)

    for path in sorted(staging.glob("*/questions.json")):
        for q in json.loads(path.read_text(encoding="utf-8")):
            expected = q["question"] + "".join(f"({i}){q['choices'][key]}" for i, key in enumerate("アイウエオ", 1))
            primary, alternative, full_paper, cover_conditions = cache[q["sourcePdfUrl"]]
            matched = normalize(expected) in normalize(primary)
            alternative_matched = normalize(expected) in normalize(alternative)
            # Cover and body instructions may be separated by submission notes
            # and print labels. Match each preserved section independently.
            context_matched = all(normalize(section) in normalize(full_paper) for section in q["sharedContext"].split("\n\n"))
            cover_complete = all(normalize(condition) in normalize(q["sharedContext"]) for condition in cover_conditions)
            if not (matched or alternative_matched) or not context_matched or not cover_complete:
                mismatches.append(q["id"])
            records.append({
                "id": q["id"], "sourcePdfUrl": q["sourcePdfUrl"], "sourcePages": q["sourcePages"],
                "fitzMatched": matched, "pdfminerMatched": alternative_matched,
                "sharedContextMatched": context_matched,
                "requiredCoverInstructionsMatched": cover_complete,
                "orderedTextSha256": digest(expected), "sharedContextSha256": digest(q["sharedContext"]),
            })

    # R7 has explicit codes. R6 has merged qualification cells; the final six
    # subject rows are first sales X/Y, second sales X/Y, equipment X/Y.
    answer_audit = []
    for year in (2025, 2024):
        source = next(s for s in sources if s["name"] == f"R{year - 2018}fy_kaitou.pdf")
        with fitz.open(args.source_dir / source["name"]) as doc:
            text = unicodedata.normalize("NFKC", doc[0].get_text())
        codes = ("JX", "JY", "KX", "KY", "LX", "LY")
        rows = re.findall(r"(?:法令|保安|配管)\s+((?:[1-5]\s+){14,20})", text)
        for index, code in enumerate(codes):
            if year == 2025:
                match = re.search(r"\b" + code + r"\s+(?:法令|保安|配管)\s+((?:[1-5]\s+){14,20})", text)
                sequence = "".join(match[1].split())
            else:
                sequence = "".join(rows[-6 + index].split())
            answer_audit.append({"year": year, "code": code, "answers": sequence, "sourceUrl": source["url"]})
    fixed_answers = json.loads((staging / "official-answers.json").read_text(encoding="utf-8"))
    for row in answer_audit:
        if row["answers"] != fixed_answers[f"{row['year']}-{row['code']}"]:
            mismatches.append(f"{row['year']}-{row['code']}: answer sequence")

    result = {
        "checkedAt": "2026-11-04", "checkedQuestions": len(records), "mismatches": mismatches,
        "method": "Entire stem and ordered numbered choices compared contiguously using PyMuPDF and PDFMiner. NFKC, whitespace and print headers normalized. Shared sections checked against full papers; all cover instructions 7/8 concerning pressure, reference law or standard state independently extracted and required in shared context. Answers independently extracted by subject row; R6 rows visually checked against merged qualification cells.",
        "rows": records, "answerRows": answer_audit,
    }
    (staging / "source-audit.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")
    print(f"Audited {len(records)} questions; mismatches={len(mismatches)}")
    if mismatches:
        raise SystemExit("\n".join(mismatches))


if __name__ == "__main__":
    main()
