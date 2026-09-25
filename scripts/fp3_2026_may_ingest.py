"""Extract the published 2026 FP3 set into review-only evidence.

No extracted question is published by running this script. Promotion requires
independent answer, layout, and explanation checks.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

import fitz

from fp3_official_ingest import extract_gakka, extract_jitsugi, pdf_bytes


ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / "docs" / "evidence" / "fp3-2026-may"
EDITION = "202605"
LAW_DATE = "2025-04-01"
FILES = {
    "gakka": f"g3_{EDITION}_qa.pdf",
    "jitsugiQuestion": f"j3_{EDITION}_q.pdf",
    "jitsugiAnswer": f"j3_{EDITION}_a.pdf",
}


def main() -> None:
    EVIDENCE.mkdir(parents=True, exist_ok=True)
    raw = {kind: pdf_bytes(name) for kind, name in FILES.items()}
    docs = {kind: fitz.open(stream=data, filetype="pdf") for kind, data in raw.items()}
    intro = docs["gakka"][0].get_text()
    if "2025 年４月１日" not in intro and "2025年4月1日" not in intro:
        raise ValueError("Academic law reference date does not match official PDF")
    gakka = extract_gakka(EDITION, docs["gakka"])
    jitsugi = extract_jitsugi(EDITION, docs["jitsugiQuestion"], docs["jitsugiAnswer"])
    for filename, rows in (("gakka-extraction.json", gakka), ("jitsugi-extraction.json", jitsugi)):
        (EVIDENCE / filename).write_text(
            json.dumps({EDITION: {"lawReferenceDate": LAW_DATE, "questions": rows}}, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
    manifest = {
        "sourceIndex": "https://www.jafp.or.jp/exam/mohan/",
        "reuseTerms": "https://www.jafp.or.jp/exam/mohan/files/exam_riyou.pdf",
        "edition": EDITION,
        "lawReferenceDate": LAW_DATE,
        "academicQuestions": len(gakka),
        "practicalQuestions": len(jitsugi),
        "files": {
            kind: {
                "url": f"https://www.jafp.or.jp/exam/mohan/files/{name}",
                "sha256": hashlib.sha256(raw[kind]).hexdigest(),
                "bytes": len(raw[kind]),
                "pages": len(docs[kind]),
            }
            for kind, name in FILES.items()
        },
    }
    (EVIDENCE / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Review inputs: gakka={len(gakka)}, jitsugi={len(jitsugi)}")


if __name__ == "__main__":
    main()
