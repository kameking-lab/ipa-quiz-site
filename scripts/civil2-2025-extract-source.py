"""Pin the official 2025 土木 paper, its 66 answers, and question PDF pages.

Usage: py -3.12 scripts/civil2-2025-extract-source.py QUESTION.pdf ANSWER.pdf
Requires PyMuPDF. Output is a source map only; it is not published question data.
"""

import hashlib
import json
import re
import sys
from pathlib import Path

import fitz


QUESTION_URL = "https://www.jctc.jp/wjctcp/wp-content/uploads/2025/10/20251027d_mondaia1.pdf"
ANSWER_URL = "https://www.jctc.jp/wjctcp/wp-content/uploads/2025/10/20251027d_seitou.pdf"
QUESTION_SHA256 = "594b2771831021cf84a0d06039d66889f7870cf9b57abf39314b5c264253e28b"
ANSWER_SHA256 = "62008080111808123eeddacb15747be7da35e2392983cbd63ae8a9bbdf69ce5e"


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main(question_path: Path, answer_path: Path) -> None:
    for path, expected in ((question_path, QUESTION_SHA256), (answer_path, ANSWER_SHA256)):
        actual = sha256(path)
        if actual != expected:
            raise ValueError(f"Official PDF changed: {path} {actual} != {expected}")

    question_doc = fitz.open(question_path)
    answer_doc = fitz.open(answer_path)
    if len(question_doc) != 25 or len(answer_doc) != 2:
        raise ValueError("Unexpected official PDF page count")

    answer_text = answer_doc[0].get_text()
    if "種別：土木" not in answer_text or "種別：鋼構造物塗装" not in answer_text:
        raise ValueError("Cannot distinguish 土木 from other answer-key variants")
    answer_blocks = re.findall(
        r"問題番号\s+((?:\d+\s+)+)解答\s+((?:[1-4]\s+)+)", answer_text
    )[:3]
    if [list(map(int, numbers.split())) for numbers, _ in answer_blocks] != [
        list(range(1, 23)), list(range(23, 45)), list(range(45, 67))
    ]:
        raise ValueError("The first answer table is not a complete No.1–66 土木 key")
    answers = [int(choice) for _, choices in answer_blocks for choice in choices.split()]

    pages: dict[int, int] = {}
    for page_number, page in enumerate(question_doc, start=1):
        for raw_number in re.findall(r"【No\.\s*(\d+)】", page.get_text()):
            number = int(raw_number)
            if number in pages:
                raise ValueError(f"Duplicate No.{number}")
            pages[number] = page_number
    if sorted(pages) != list(range(1, 67)):
        raise ValueError("Question page map is not a complete No.1–66 set")

    output = {
        "status": "source-map-only",
        "scope": "令和7年度2級土木施工管理技術検定 第一次検定（土木・10月実施）",
        "questionUrl": QUESTION_URL,
        "questionSha256": QUESTION_SHA256,
        "questionPdfPages": len(question_doc),
        "answerUrl": ANSWER_URL,
        "answerSha256": ANSWER_SHA256,
        "answerPdfPages": len(answer_doc),
        "answerTable": "page 1, first table, 種別：土木; later tables are separate variants",
        "questions": [
            {"number": number, "pdfPage": pages[number], "officialAnswerNumber": answers[number - 1]}
            for number in range(1, 67)
        ],
    }
    destination = Path("docs/evidence/civil2-2025/source-map.json")
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Pinned {len(output['questions'])} official answers: {destination}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("Expected QUESTION.pdf ANSWER.pdf")
    main(Path(sys.argv[1]), Path(sys.argv[2]))
