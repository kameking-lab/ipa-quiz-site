"""Compare every staging question/key with the four official PDFs (Poppler required).

python scripts/audit-chintai-source.py --source-dir <download directory> \
    --pdftotext <path to modern Poppler pdftotext> [--write]
PDFs must be obtained by ordinary access to the URLs in manifest.json.
No network requests, credentials, or public question registration are performed.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/qualification-staging/chintai"


def digest(data):
    return hashlib.sha256(data).hexdigest()


def extract(executable, pdf):
    with tempfile.TemporaryDirectory(prefix="chintai-audit-") as directory:
        target = Path(directory) / "source.txt"
        subprocess.run([executable, "-layout", "-enc", "UTF-8", str(pdf), str(target)], check=True)
        return target.read_text(encoding="utf-8")


def tidy(value):
    return "\n".join(line.strip() for line in value.strip().splitlines() if line.strip())


def parse_questions(text, year):
    pages = text.split("\f")
    content = re.sub(r"(?m)^\s*-\s*\d+\s*-\s*$", "", text).replace("\f", "\n")
    starts = list(re.finditer(r"【問\s*(\d+)】", content))
    assert [int(m[1]) for m in starts] == list(range(1, 51)), "Official PDF must contain questions 1-50"
    result = {}
    for index, start in enumerate(starts):
        number = int(start[1])
        body = content[start.end():starts[index + 1].start() if index < 49 else len(content)].strip()
        markers = list(re.finditer(r"(?m)^\s*([１２３４])\s+", body))
        assert [m[1] for m in markers] == list("１２３４"), (year, number, "choice markers")
        choices = {str(i + 1): tidy(body[m.end():markers[i + 1].start() if i < 3 else len(body)]) for i, m in enumerate(markers)}
        if (year, number) == (2025, 43):
            # Detached furigana for 水濡れ; checked against rendered PDF page 24.
            assert choices["2"].endswith("\nぬ")
            choices["2"] = choices["2"][:-2]
        page = next(i + 1 for i, p in enumerate(pages) if re.search(r"【問\s*" + str(number) + r"】", p))
        result[number] = (tidy(body[:markers[0].start()]), choices, page)
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-dir", required=True, type=Path)
    parser.add_argument("--pdftotext", default="pdftotext")
    parser.add_argument("--write", action="store_true", help="Write evidence only after ALL 100 comparisons pass")
    args = parser.parse_args()
    manifest = json.loads((DATA / "manifest.json").read_text(encoding="utf-8"))
    sources = []
    extracted = {}
    for source in manifest["files"]:
        pdf = args.source_dir / source["filename"]
        actual = digest(pdf.read_bytes())
        assert actual == source["sha256"], f"Source hash mismatch: {pdf.name}"
        extracted[(source["year"], source["kind"])] = extract(args.pdftotext, pdf)
        sources.append({**source, "sha256Verified": True})
    results = []
    for year in (2024, 2025):
        original = parse_questions(extracted[(year, "question")], year)
        keys = {int(n): None if a == "-" else int(a) for n, a in re.findall(r"問\s*(\d+)\s+([1-4-])", extracted[(year, "answer")])}
        assert set(keys) == set(range(1, 51)), "Official answer table must contain all 50 keys"
        staged = json.loads((DATA / f"{year}.json").read_text(encoding="utf-8"))
        assert len(staged) == 50 and {q["qNumber"] for q in staged} == set(range(1, 51))
        for q in staged:
            number = q["qNumber"]
            question, choices, page = original[number]
            assert q["question"] == question, (year, number, "question text")
            assert q["choices"] == choices, (year, number, "choice text")
            assert q["sourcePage"] == page, (year, number, "page")
            assert q["officialAnswerNumber"] == keys[number], (year, number, "official answer")
            expected = [1, 2, 3, 4] if keys[number] is None else [keys[number]]
            assert q["acceptedAnswerNumbers"] == expected, (year, number, "accepted answers")
            text_hash = digest(json.dumps({"question": question, "choices": choices}, ensure_ascii=False, sort_keys=True).encode())
            assert q["sourceTextSha256"] == text_hash, (year, number, "transcription hash")
            results.append({"id": q["id"], "sourcePage": page, "officialAnswerNumber": keys[number], "textMatch": True, "answerMatch": True, "sourceTextSha256": text_hash})
    assert len(results) == 100
    evidence = {"slug": "chintai", "checkedAt": "2026-11-04", "questionCount": 100, "sources": sources, "questions": results}
    if args.write:
        (DATA / "source-audit.json").write_text(json.dumps(evidence, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")
    print("PASS: 4 PDF hashes; 100 question texts, all 400 choices, all 100 official keys, accepted answers and page references.")


if __name__ == "__main__":
    main()
