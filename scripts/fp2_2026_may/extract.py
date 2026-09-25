"""Extract FP2 2026年5月公表 学科 Q11-60 from the official JAFP PDF with two independent extractors.

PyMuPDF and pdfminer.six parse the same pinned PDF; stems, choices and answers must agree after
whitespace normalization. Tables/diagrams are detected from vector drawings/images on the page and
transcribed from the rendered page (see FIGURE_TRANSCRIPTIONS), never from out-of-order text runs.
"""

from __future__ import annotations

import hashlib
import json
import re
import sys
from pathlib import Path

import pymupdf
from pdfminer.high_level import extract_text as pdfminer_extract_text

ROOT = Path(__file__).resolve().parents[2]
CACHE = ROOT / ".cache" / "fp2-official"
QA_PDF = CACHE / "g2_202605_qa.pdf"
TERMS_PDF = CACHE / "exam_riyou.pdf"
EVIDENCE = ROOT / "docs" / "evidence" / "fp2-2026-may"

QA_URL = "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf"
TERMS_URL = "https://www.jafp.or.jp/exam/mohan/files/exam_riyou.pdf"
PINNED = {
    "g2_202605_qa.pdf": "525d190bb489b4187d39d6782eac999fc4b14bfdd1f489842b96685465b804ef",
    "exam_riyou.pdf": "db604850c3f14cab982bedf622beae6f33d0624dd79f8dc8f9baaa979e00df45",
}
FIRST, LAST = 11, 60

# Figure blocks re-typed from the rendered page. The text layer emits table cells out of reading order.
FIGURE_TRANSCRIPTIONS = {
    14: {
        "marker": "〈資料〉所得税における生命保険料控除の対象となる保険料",
        "text": "〈資料〉所得税における生命保険料控除の対象となる保険料\n"
        "・旧制度の対象：一般の生命保険料 10万円／介護医療保険料 （対象外・斜線）／個人年金保険料 10万円\n"
        "・新制度の対象：一般の生命保険料 ―／介護医療保険料 ―／個人年金保険料 10万円",
        "cells": ["一般の生命保険料", "介護医療保険料", "個人年金保険料", "旧制度の対象", "10万円", "10万円",
                  "新制度の対象", "―", "―", "10万円"],
    },
    55: {
        "marker": "〈親族関係図〉",
        "text": "〈親族関係図〉\n・被相続人Ａさん＝妻Ｂさん\n・Ａさん夫婦の子：実子Ｃさん（相続放棄）、養子Ｄさん\n"
        "・実子Ｃさん＝配偶者、その子：孫Ｅさん、孫Ｆさん",
        "cells": ["養子Ｄさん", "妻Ｂさん", "被相続人Ａさん", "孫Ｅさん", "孫Ｆさん", "実子Ｃさん", "配偶者", "（相続放棄）"],
    },
    59: {
        "marker": "宅地等の区分",
        "text": "〈表〉宅地等の区分／本特例の対象となる限度面積／減額割合\n"
        "・特定事業用宅地等：（ ア ）／80％\n・特定居住用宅地等：330㎡／（ イ ）\n"
        "・特定同族会社事業用宅地等：（ ウ ）／80％",
        "cells": ["宅地等の区分", "本特例の対象となる限度面積", "減額割合", "特定事業用宅地等", "（ ア ）", "80％",
                  "特定居住用宅地等", "330㎡", "（ イ ）", "特定同族会社事業用宅地等", "（ ウ ）", "80％"],
    },
}


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def squash(text: str) -> str:
    """Join PDF line wraps. Japanese text carries no inter-word spaces, so wrapped lines are concatenated."""
    lines = [line.strip() for line in text.replace("　", " ").splitlines()]
    return "".join(line for line in lines if line)


def norm(text: str) -> str:
    return re.sub(r"\s+", "", text)


def split_questions(full: str) -> dict[int, str]:
    parts = re.split(r"(?m)^\s*問(\d{1,2})\s*$", full)
    blocks: dict[int, str] = {}
    for i in range(1, len(parts) - 1, 2):
        number = int(parts[i])
        if number in blocks:
            raise ValueError(f"duplicate heading 問{number}")
        blocks[number] = parts[i + 1]
    return blocks


def parse_block(number: int, block: str) -> dict:
    answer_match = re.search(r"正解\s*([1-4])\)", block)
    if not answer_match:
        raise ValueError(f"問{number}: 正解 not found")
    body = block[: answer_match.start()]
    trailing = block[answer_match.end():]
    # Drop page furniture (running page numbers like －12－ and the page separators of this script).
    body = re.sub(r"(?m)^\s*－\d+－\s*$", "", body)
    body = re.sub(r"(?m)^=====PAGE \d+=====$", "", body)
    pieces = re.split(r"(?m)^\s*([1-4])\)\s*", body)
    stem = pieces[0]
    labels = pieces[1::2]
    if labels != ["1", "2", "3", "4"]:
        raise ValueError(f"問{number}: choice labels {labels}")
    choices = [squash(text) for text in pieces[2::2]]
    return {"stem": stem, "choices": choices, "answer": int(answer_match.group(1)), "trailing": squash(trailing)}


def pymupdf_pages(doc: pymupdf.Document) -> list[dict]:
    pages = []
    for index, page in enumerate(doc):
        pages.append({
            "page": index + 1,
            "text": page.get_text(),
            "drawings": len(page.get_drawings()),
            "images": len(page.get_images()),
        })
    return pages


def main() -> None:
    for name, expected in PINNED.items():
        actual = sha256(CACHE / name)
        if actual != expected:
            sys.exit(f"{name} hash mismatch: {actual} != {expected}")

    doc = pymupdf.open(QA_PDF)
    pages = pymupdf_pages(doc)
    cover = squash(pages[0]["text"])
    law = re.search(r"(\d{4})年(\d{1,2})月(\d{1,2})日現在施行の法令等に基づいて解答", norm(cover))
    if not law:
        sys.exit("law reference date not found on cover page")
    law_date = f"{int(law.group(1)):04d}-{int(law.group(2)):02d}-{int(law.group(3)):02d}"
    if "四答択一式60問" not in norm(cover):
        sys.exit("cover does not state 60 four-choice questions")

    page_of: dict[int, int] = {}
    tagged = []
    for page in pages:
        for match in re.finditer(r"(?m)^\s*問(\d{1,2})\s*$", page["text"]):
            page_of.setdefault(int(match.group(1)), page["page"])
        tagged.append(f"=====PAGE {page['page']}=====\n{page['text']}")
    mupdf_blocks = split_questions("\n".join(tagged))
    miner_text = pdfminer_extract_text(str(QA_PDF))
    miner_blocks = split_questions(miner_text)
    # pdfminer sometimes emits a question's "正解" line after the next heading; hand it back.
    for number in range(2, 61):
        leading = re.match(r"\s*(正解\s*[1-4]\))", miner_blocks[number])
        if leading and not re.search(r"正解\s*[1-4]\)", miner_blocks[number - 1]):
            miner_blocks[number - 1] += "\n" + leading.group(1)
            miner_blocks[number] = miner_blocks[number][leading.end():]

    if sorted(mupdf_blocks) != list(range(1, 61)):
        sys.exit(f"PyMuPDF headings {sorted(mupdf_blocks)}")
    if sorted(miner_blocks) != list(range(1, 61)):
        sys.exit(f"pdfminer headings {sorted(miner_blocks)}")

    questions = []
    for number in range(FIRST, LAST + 1):
        a = parse_block(number, mupdf_blocks[number])
        b = parse_block(number, miner_blocks[number])
        page_no = page_of[number]
        page = pages[page_no - 1]
        figure = FIGURE_TRANSCRIPTIONS.get(number)
        stem_raw = a["stem"]
        if figure:
            marker_at = stem_raw.find(figure["marker"].replace("〈資料〉", "〈資料〉"))
            if marker_at < 0:
                marker_at = norm(stem_raw).find(norm(figure["marker"]))
                if marker_at < 0:
                    sys.exit(f"問{number}: figure marker not found")
                stem_prefix = squash(stem_raw)[:marker_at]
            else:
                stem_prefix = squash(stem_raw[:marker_at])
            cells_text = norm(stem_raw + a["trailing"])
            missing = [cell for cell in figure["cells"] if norm(cell) not in cells_text]
            if missing:
                sys.exit(f"問{number}: figure cells not in text layer: {missing}")
            stem = f"{stem_prefix}\n{figure['text']}"
        else:
            stem = squash(stem_raw)
        checks = {
            "stemAgrees": norm(a["stem"]) == norm(b["stem"]) or bool(figure),
            "stemPrefixAgrees": norm(squash(b["stem"])).startswith(norm(stem.split("\n")[0])),
            "choicesAgree": [norm(x) for x in a["choices"]] == [norm(x) for x in b["choices"]],
            "answerAgrees": a["answer"] == b["answer"],
            "fourChoices": len(a["choices"]) == 4 and all(len(c) > 0 for c in a["choices"]),
        }
        questions.append({
            "number": number,
            "sourcePage": page_no,
            "stem": stem,
            "choices": a["choices"],
            "answer": a["answer"],
            "pageVectorDrawings": page["drawings"],
            "pageRasterImages": page["images"],
            "figure": bool(figure),
            "figureTranscribedFromRender": bool(figure),
            "extractorChecks": checks,
        })

    out = {
        "source": {
            "questionAnswerPdf": {"url": QA_URL, "sha256": PINNED["g2_202605_qa.pdf"], "pages": len(pages)},
            "reuseTerms": {"url": TERMS_URL, "sha256": PINNED["exam_riyou.pdf"]},
        },
        "coverStatement": {"format": "四答択一式60問", "lawReferenceDate": law_date},
        "extractors": ["PyMuPDF " + pymupdf.VersionBind, "pdfminer.six"],
        "questions": questions,
    }
    EVIDENCE.mkdir(parents=True, exist_ok=True)
    (EVIDENCE / "extraction.json").write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    bad = [q["number"] for q in questions if not all(q["extractorChecks"].values())]
    print(f"extracted {len(questions)} questions, law date {law_date}, extractor disagreements: {bad}")


if __name__ == "__main__":
    main()
