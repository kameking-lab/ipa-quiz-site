"""Assemble the published SSSC welfare question data from reviewed artifacts.

Usage: py -3.12 scripts/sssc-welfare-build.py kaigo|shakai|seishin
Inputs (all committed under reports/sssc-welfare-20260926/):
  <exam>-source-transcription.json  verbatim text (PDF text layer x official HTML)
  answer-keys.json                  official answer keys
  explanations/<exam>-final.json    claude-opus-5-5 drafts + independent review fixes
  sources.json                      official URLs and SHA-256
Question and choice text is copied from the transcription without any edit.
"""
from __future__ import annotations

import hashlib
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / "reports/sssc-welfare-20260926"

EXAMS = {
    "kaigo": {
        "title": "第38回（令和7年度）介護福祉士国家試験",
        "out": ROOT / "data/questions/kaigo/2025-annual.json",
        "parts": [("A", 1, 60), ("B", 61, 105), ("C", 106, 125)],
        "visual": {49: {"file": "k_am_06_38.pdf", "page": 6, "printedPage": 27}},
    },
    "shakai": {
        "title": "第38回（令和7年度）社会福祉士国家試験",
        "out": ROOT / "data/questions/shakai/2025-annual.json",
        # 共通科目（午前）1〜84、専門科目（午後）85〜129。
        "sessions": [("kyotsu", 1, 84), ("senmon", 85, 129)],
        "visual": {},
    },
    "seishin": {
        "title": "第28回（令和7年度）精神保健福祉士国家試験",
        "out": ROOT / "data/questions/seishin/2025-annual.json",
        # 専門科目のみ（問題1〜48）。共通科目は社会福祉士第38回と同一の問題冊子・正答で、
        # ローダーが data/questions/shakai/2025-annual.json の問題1〜84を共有する。
        "sessions": [("senmon", 1, 48)],
        "visual": {},
    },
}

SELECT_COUNT = {"1": 1, "2": 2, "１": 1, "２": 2}


def compose(q: dict) -> str:
    stem = q["stem"]
    if q["number"] == 49 and q.get("_visual"):
        # First paragraph is the accessible-HTML notice that the choices are figures;
        # it is not printed in the PDF, so it is dropped (the PDF text starts after it).
        stem = stem.split("\n", 1)[1].strip()
    parts = [q["case"]] if q["case"] else []
    parts.append(stem)
    parts.extend(q["notes"])
    return "\n".join(parts)


def main(exam: str) -> None:
    cfg = EXAMS[exam]
    source = json.loads((REPORT / f"{exam}-source-transcription.json").read_text(encoding="utf-8"))
    keys = json.loads((REPORT / "answer-keys.json").read_text(encoding="utf-8"))[exam]
    final = json.loads((REPORT / "explanations" / f"{exam}-final.json").read_text(encoding="utf-8"))["explanations"]
    sources = json.loads((REPORT / "sources.json").read_text(encoding="utf-8"))
    files = sources[exam]["files"]
    listen = {}
    records = []
    for q in source["questions"]:
        n = q["number"]
        visual = cfg["visual"].get(n)
        if visual:
            q = {**q, "_visual": True}
        expl = final[str(n)]
        answer = keys[str(n)]
        assert len(q["choices"]) == 5 and len(expl["choiceExplanations"]) == 5, n
        choose = re.findall(r"([12１２])つ選びなさい", q["stem"])
        assert choose and SELECT_COUNT[choose[-1]] == len(answer), (n, choose, answer)
        record = {"number": n}
        if "parts" in cfg:
            record["part"] = next(p for p, lo, hi in cfg["parts"] if lo <= n <= hi)
        if "sessions" in cfg:
            record["session"] = next(p for p, lo, hi in cfg["sessions"] if lo <= n <= hi)
        record.update({
            "subject": q["subject"],
            "pdfFile": q["pdfFile"],
            "pdfPage": q["pdfPage"],
            "question": compose(q),
            "choices": q["choices"],
            "officialAnswer": answer,
            "summary": expl["summary"],
            "choiceExplanations": expl["choiceExplanations"],
            "lawSensitive": expl["lawSensitive"],
        })
        if visual:
            images = [f"/questions/{exam}/2025-annual/q{n}-choice{i}.png" for i in range(1, 6)]
            record["choiceImages"] = [
                {"publicPath": p, "sha256": hashlib.sha256((ROOT / "public" / p[1:]).read_bytes()).hexdigest()}
                for p in images
            ]
            record["choiceTextSource"] = "center-accessible-html"
            record["figureSource"] = {"file": visual["file"], "pdfPage": visual["page"], "printedPage": visual["printedPage"]}
        records.append(record)
    assert [r["number"] for r in records] == list(range(1, len(records) + 1))
    payload = {
        "exam": exam,
        "title": cfg["title"],
        "round": sources[exam]["round"],
        "fiscalYear": sources[exam]["fiscalYear"],
        "examDate": sources[exam]["examDate"],
        "retrievedAt": sources["retrievedAt"],
        "termsUrl": sources["termsUrl"],
        "indexUrl": sources["indexPages"][exam],
        "answerUrl": next(v["url"] for k, v in files.items() if "kijun_seitou" in k),
        "answerSha256": next(v["sha256"] for k, v in files.items() if "kijun_seitou" in k),
        "questionPdfs": {k: v for k, v in files.items() if k.endswith(".pdf") and "kijun" not in k and "happyou" not in k},
        "questions": records,
    }
    cfg["out"].parent.mkdir(parents=True, exist_ok=True)
    cfg["out"].write_text(json.dumps(payload, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"Wrote {len(records)} questions to {cfg['out'].relative_to(ROOT)}")


if __name__ == "__main__":
    main(sys.argv[1])
