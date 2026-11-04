"""Read-only verification against supplied PDFs, using pdfplumber independently.

Usage: python scripts/verify-kenchikushi2-owner-pdfs.py OWNER_DIRECTORY
Requires pdfplumber. Prints a small JSON audit; never downloads or writes source data.
The original transcription used PyMuPDF; this comparison uses PDFMiner/pdfplumber.
"""
import argparse
import hashlib
import json
import re
import unicodedata
from pathlib import Path

import pdfplumber

ROOT = Path(__file__).resolve().parents[1]
STAGING = ROOT / "data/qualification-staging/kenchikushi2"


def normalize(text):
    text = unicodedata.normalize("NFKC", text)
    return re.sub(r"\s|[\x00-\x1f]", "", text)


def source_questions(path):
    questions = {}
    with pdfplumber.open(path) as pdf:
        for page_number in range(2, 11):
            # Ruby is 5.315 pt; retain small numeric superscripts used for m².
            page = pdf.pages[page_number - 1].filter(
                lambda obj: obj.get("object_type") != "char"
                or obj["size"] > 6 or obj.get("text", "").isdigit()
            )
            text = unicodedata.normalize("NFKC", page.extract_text(use_text_flow=True))
            text = re.sub(r"(?m)^計画\s*\d+\s*$", "", text)
            parts = re.split(r"〔No\.\s*(\d+)〕", text)
            for i in range(1, len(parts), 2):
                number = int(parts[i])
                fields = re.split(r"(?m)^\s*([1-5])\s*\.\s*", parts[i + 1])
                choices = {int(fields[j]): fields[j + 1] for j in range(1, len(fields), 2)}
                assert sorted(choices) == [1, 2, 3, 4, 5], (number, choices)
                if number == 1:
                    # Both PDF text decoders yield 繁, but the printed glyph is 繫.
                    choices[2] = choices[2].replace("繁虹梁", "繫虹梁")
                if number == 15:
                    # Visual check: the stacked fraction is 1/8. In text flow,
                    # its denominator is on a separate line after the numerator.
                    choices[3] = re.sub(r"\n8\n", "", choices[3])
                    choices[3] = choices[3].replace("本勾配を1\nとし", "本勾配を1/8とし")
                questions[number] = (page_number, fields[0], choices)
    assert sorted(questions) == list(range(1, 26))
    return questions


def source_questions_ii(path):
    """Independent PDFMiner text comparison; figures are checked as images."""
    figures = {12: (140, 330, 465, 663), 17: (165, 350, 445, 536),
               18: (90, 120, 510, 380), 20: (78, 188, 530, 516)}
    questions = {}
    with pdfplumber.open(path) as pdf:
        for page_number in range(11, 25):
            rect = figures.get(page_number)
            def retain(obj):
                if obj.get("object_type") != "char":
                    return True
                if obj["top"] >= 790 or (obj["size"] <= 6 and not (obj["size"] > 5 and obj.get("text", "").isdigit())):
                    return False
                return not (rect and obj["x0"] < rect[2] and obj["x1"] > rect[0]
                            and obj["top"] < rect[3] and obj["bottom"] > rect[1])
            text = unicodedata.normalize("NFKC", pdf.pages[page_number-1].filter(retain).extract_text(use_text_flow=True))
            parts = re.split(r"〔No\.\s*(\d+)〕", text)
            for i in range(1, len(parts), 2):
                number = int(parts[i])
                fields = re.split(r"(?m)^\s*([1-5])\s*\.\s*", parts[i+1])
                choices = {int(fields[j]): fields[j+1] for j in range(1, len(fields), 2)}
                assert sorted(choices) == [1, 2, 3, 4, 5], number
                # Text flow puts denominators before numerators; restored from page images.
                if number == 1:
                    choices[2] = re.sub(r"高さの\s*2\s*1\s*のもの", "高さの1/2のもの", choices[2])
                if number == 16:
                    for choice, denominator in [(1, 8), (2, 3), (3, 50), (5, 100)]:
                        choices[choice] = re.sub(r"の\s*"+str(denominator)+r"\s*1\s*", "の1/"+str(denominator), choices[choice])
                if number == 18:
                    choices[4] = re.sub(r"ものの\s*2\s*1\s*だけ", "ものの1/2だけ", choices[4])
                questions[number] = (page_number, fields[0], choices)
    assert sorted(questions) == list(range(1, 26))
    return questions


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("owner_directory", type=Path)
    args = parser.parse_args()
    manifest = json.loads((STAGING / "source-manifest.json").read_text(encoding="utf-8"))
    counts = {"ownerPdfs": 0, "officialAnswers": 0, "questionBodies": 0, "choices": 0}
    for round_ in manifest["rounds"]:
        for doc in [*round_["questionDocuments"], round_["answerDocument"]]:
            file = args.owner_directory / doc["url"].rsplit("/", 1)[1]
            assert hashlib.sha256(file.read_bytes()).hexdigest() == doc["sha256"], file.name
            with pdfplumber.open(file) as pdf:
                assert len(pdf.pages) == doc["pages"], file.name
                if doc is round_["answerDocument"]:
                    text = unicodedata.normalize("NFKC", pdf.pages[0].extract_text())
                    for subject in ["I", "II", "III", "IV"]:
                        match = re.search(r"学科\s*" + subject + r"\s+((?:[1-5]\s*){25})(?![1-5])", text)
                        assert match, (file.name, subject)
                        row = list(map(int, re.findall(r"[1-5]", match[1])))
                        assert row == round_["officialAnswers"][subject], (file.name, subject)
                        counts["officialAnswers"] += len(row)
            counts["ownerPdfs"] += 1
    for subject, extract in [("I", source_questions), ("II", source_questions_ii)]:
        originals = extract(args.owner_directory / "R8_2k_1_2.pdf")
        data = (STAGING / f"2026-{subject}.ts").read_text(encoding="utf-8")
        staged = json.loads(data.split("= ", 1)[1].rsplit(";", 1)[0])
        assert len(staged) == 25
        for question in staged:
            number = question["qNumber"]
            page, body, choices = originals[number]
            assert page == question["sourcePage"], (subject, number)
            assert normalize(body) == normalize(question["question"]), (subject, number, "body", body)
            counts["questionBodies"] += 1
            for index, key in enumerate("アイウエオ", 1):
                assert normalize(choices[index]) == normalize(question["choices"][key]), (subject, number, key, choices[index], question["choices"][key])
                counts["choices"] += 1
    print(json.dumps({"status": "PASS", "counts": counts, "normalization": "NFKC, whitespace/control removal; I ruby stored separately, q1 text-layer 繁 corrected to printed 繫, q15 fraction 1/8; II q1/q16/q18 fractions restored from page images; II figure labels excluded from prose and retained in source PNG crops"}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
