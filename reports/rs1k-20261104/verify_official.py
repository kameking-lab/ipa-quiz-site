"""Read-only source/data audit; writes only --output. Requires PyMuPDF and Pillow.

python reports/rs1k-20261104/verify_official.py --pdf-dir <directory> --output <json>
PDF filenames: 2025.pdf and 2026.pdf. Obtain from the URLs in source-manifest.json.
The answer rows below were freshly transcribed from rendered official final pages,
not loaded from the existing answer-key fixture. 2025 No.57 accepts 3 OR 4.
Text comparison removes ruby, emphasis dots and whitespace, normalizes Unicode,
and checks displayed numerical fractions against their PDF text-layer sequence.
Fractions, blanks and graphical choices also require the visual checks in README.md.
"""
import argparse
import hashlib
import json
import pathlib
import re
import unicodedata

import fitz
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parents[2]
ANSWER_ROWS = {
    2025: [
        "2 1 2 4 3 4", "3 2 2 2 3 3 4 1 4", "3 1 4 4 2",
        "2 1 2 2 3 3 3 2 4 2", "3 1 4 1 4 3 2 3 4 4", "2 4 4 1",
        "3 4 1 3 4 2", "2 3 4 4 1 2 3/4 3 5 4", "4 3 2 1 3 3 2 2 2 3", "1 3",
    ],
    2026: [
        "1 3 2 3 1 4", "4 1 1 4 3 1 3 3 2", "2 3 1 4 3",
        "3 1 2 4 4 4 2 1 2 4", "1 1 4 1 2 1 4 3 1 3", "1 3 4 2",
        "1 4 2 1 3 1", "1 1 3 3 4 5 1 4 1 2", "1 3 2 3 4 1 2 1 3 1", "2 3",
    ],
}


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def norm(text):
    return re.sub(r"\s+", "", unicodedata.normalize("NFKC", text)).replace("−", "-")


def text_norm(text):
    # PDF text order keeps numerator then denominator but omits fraction rule.
    return re.sub(r"(?<=\d)/(?=\d)", "", norm(text)).replace("・", "").replace("[]", "")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--pdf-dir", type=pathlib.Path, required=True)
    parser.add_argument("--output", type=pathlib.Path, required=True)
    args = parser.parse_args()
    manifest = read_json(ROOT / "reports/sekou-1kenchiku-latest2/source-manifest.json")
    old_keys = read_json(ROOT / "reports/sekou-1kenchiku-latest2/official-answer-key.json")
    figures = read_json(ROOT / "reports/sekou-1kenchiku-latest2/figures.json")
    result = {"task": "RS1K", "date": "2026-11-04", "papers": [], "figures": []}
    docs = {}
    for year in (2025, 2026):
        source = read_json(ROOT / f"data/questions/sekou-1kenchiku/{year}-july.json")
        pdf_path = args.pdf_dir / f"{year}.pdf"
        digest = hashlib.sha256(pdf_path.read_bytes()).hexdigest()
        entry = next(m for m in manifest if m["sha256"] == source["sha256"])
        assert digest == entry["sha256"] == source["sha256"], (year, "PDF hash")
        doc = docs[year] = fitz.open(pdf_path)
        assert len(doc) == entry["pages"] == source["answerPage"]
        expected = [[int(n) for n in token.split("/")] for row in ANSWER_ROWS[year] for token in row.split()]
        assert len(expected) == 72
        assert [q["number"] for q in source["questions"]] == list(range(1, 73))
        fixture = next(k for k in old_keys if k["year"] == year)
        assert fixture["answers"] == expected, (year, "existing key fixture")
        paper = {"year": year, "pdfUrl": entry["source_url"], "sha256": digest,
                 "pages": len(doc), "answerPage": source["answerPage"], "questions": []}
        for q, answer in zip(source["questions"], expected):
            number = q["number"]
            assert q["officialAnswerNumbers"] == answer, (year, number, "answer")
            count = 5 if 51 <= number <= 60 else 4
            assert len(q["choices"]) == len(q["choiceExplanations"]) == count
            assert q["sourcePdfUrl"] == entry["source_url"]
            assert q["sourceAnswerUrl"] == entry["source_url"] + f"#page={source['answerPage']}"
            page = doc[q["pdfPage"] - 1]
            # Ruby is 4.96pt; text and mathematical sub/superscripts are >=5.46pt.
            extracted = norm("".join(s["text"] for b in page.get_text("dict")["blocks"]
                                     for line in b.get("lines", []) for s in line["spans"]
                                     if s["size"] >= 5.4))
            matches = list(re.finditer(r"〔No\." + str(number) + r"〕", extracted))
            assert matches, (year, number, "question marker")
            segment = re.split(r"〔No\.", extracted[matches[-1].end():])[0]
            assert text_norm(q["question"]) in text_norm(segment), (year, number, "question text")
            kinds = []
            for i, choice in enumerate(q["choices"], 1):
                if choice == f"図{i}（公式PDFの選択肢図参照）":
                    assert q.get("imageUrls"), (year, number, "graphical choice")
                    kinds.append("official-image")
                else:
                    assert text_norm(choice) in text_norm(segment), (year, number, i, "choice text")
                    kinds.append("pdf-text-match")
            paper["questions"].append({"number": number, "pdfPage": q["pdfPage"],
                                       "officialAnswerNumbers": answer, "answerMatch": True,
                                       "questionTextMatch": True, "choices": kinds})
        assert sum(len(q["choices"]) for q in source["questions"]) == 298
        result["papers"].append(paper)
    for f in figures:
        path = ROOT / "public" / f["path"].lstrip("/")
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        assert digest == f["sha256"], f["path"]
        pix = docs[f["year"]][f["page"] - 1].get_pixmap(matrix=fitz.Matrix(2.5, 2.5), clip=fitz.Rect(f["crop"]))
        with Image.open(path) as saved:
            assert saved.size == (pix.width, pix.height), f["path"]
            assert saved.convert("RGB").tobytes() == pix.samples, f["path"]
        result["figures"].append({"path": f["path"], "sha256": digest, "pixelsMatchOfficialCrop": True})
    result["summary"] = {"questions": 144, "choices": 596, "answerMatches": 144,
                         "questionTextMatches": 144, "figureQuestions": 9, "images": len(figures),
                         "publication": "unchanged; ready-to-ingest; tested separately"}
    args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")
    print(json.dumps(result["summary"], ensure_ascii=False))


if __name__ == "__main__":
    main()
