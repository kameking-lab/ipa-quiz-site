"""Pin the official Denken 2 first-exam PDFs and read the answer sheet by position.

The official answer sheet is a single table page. Each subject column is read
from the PDF text layer by x-coordinate, top to bottom, and split into groups of
five blanks. The result is written to scripts/denken2-source-manifest.json.

Usage: py -3.12 scripts/denken2-source-manifest.py
(expects the PDFs under docs/evidence/denken2/input/, fetched from the URLs below)
"""

from __future__ import annotations

from hashlib import sha256
import json
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / "docs/evidence/denken2/input"
OUT = ROOT / "scripts/denken2-source-manifest.json"
BASE = "https://www.shiken.or.jp/chief/upload/"
KANA = "イロハニホヘトチリヌルヲワカヨ"
# x ranges (PDF points) of the 解答 column for each subject on the answer sheet.
COLUMNS = {"theory": (105, 135), "power": (232, 261), "machinery": (358, 378), "law": (484, 512)}
PUBLISHED = {
    "power": {"file": "20260830_ch_second_q02.pdf", "session": "denryoku", "label": "電力科目", "points": [3, 3, 3, 3, 2, 2, 2]},
    "law": {"file": "20260830_ch_second_q04.pdf", "session": "houki", "label": "法規科目", "points": [3, 3, 3, 3, 2, 2, 2]},
}


def digest(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def answer_columns(path: Path) -> dict[str, str]:
    with fitz.open(path) as document:
        words = document[0].get_text("words")
    columns = {}
    for subject, (x0, x1) in COLUMNS.items():
        cells = sorted((w for w in words if x0 <= w[0] <= x1 and w[1] > 86 and w[4][:1] in KANA), key=lambda w: w[1])
        columns[subject] = "".join(w[4][0] for w in cells)
    return columns


def main() -> None:
    answer = INPUT / "20260830_ch_second_a01.pdf"
    columns = answer_columns(answer)
    subjects = []
    for subject, meta in PUBLISHED.items():
        column = columns[subject]
        count = len(meta["points"])
        if len(column) != count * 5:
            raise ValueError(f"{subject}: expected {count * 5} answers, read {len(column)}")
        pdf = INPUT / meta["file"]
        subjects.append({
            "subject": subject,
            "session": meta["session"],
            "label": meta["label"],
            "url": BASE + meta["file"],
            "sha256": digest(pdf),
            "questions": [
                {"question": i + 1, "points": meta["points"][i], "blanks": list(column[i * 5:(i + 1) * 5])}
                for i in range(count)
            ],
        })
    manifest = {
        "exam": "denken2",
        "examName": "第二種電気主任技術者試験 一次試験",
        "publisher": "一般財団法人電気技術者試験センター",
        "listingUrl": "https://www.shiken.or.jp/chief/second/qa/",
        "termsCheckedAt": "2026-09-26",
        "termsUrls": ["https://www.shiken.or.jp/chief/second/qa/", "https://www.shiken.or.jp/shiken/faq/faq08/000082.html"],
        "usageNotice": "FAQ(277)は利用状況の参考として、法人名・担当者・連絡先・使用する問題の試験名・使用目的をinfo@shiken.or.jpへメール連絡するよう求めている（許諾条件ではない）。本作業では送信しない。",
        "attributionExample": "出典：令和○年度第一種電気主任技術者一次試験理論科目A問題問1",
        "terms": [
            "当センターで公表している過去の試験問題の使用については、許諾や使用料は必要ありません。",
            "著作権は放棄していません。",
            "教育目的など、電気主任技術者試験制度、電気工事士試験制度の意義に反しない限り、公表されている過去問題を問題集やテキストに使用される際、許諾および使用料の必要はありません。",
            "出典を以下のように明記してください。（年度、期、試験区分等）また、問題の一部を改変している場合、その旨も明記してください。",
        ],
        "sessions": [{
            "examDate": "2026-08-30",
            "fiscalYear": 2026,
            "label": "令和8年度第二種電気主任技術者一次試験",
            "lawReferenceDate": "2026-04-01",
            "officialAnswer": {"url": BASE + answer.name, "sha256": digest(answer)},
            "unpublishedSubjects": {"theory": len(columns["theory"]), "machinery": len(columns["machinery"])},
            "subjects": subjects,
        }],
    }
    OUT.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")
    print(OUT, {s["subject"]: "".join("".join(q["blanks"]) for q in s["questions"]) for s in subjects})


if __name__ == "__main__":
    main()
