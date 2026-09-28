"""Assemble the published 第27回（令和6年度）精神保健福祉士 data from reviewed artifacts.

Usage: py -3.12 scripts/sssc-seishin27-build.py
Inputs (all committed under reports/sssc-seishin27-20260929/):
  senmon-source-transcription.json / kyotsu-source-transcription.json
                         verbatim text (PDF text layer x the center's accessible HTML)
  answer-keys.json       official answer keys (se_kijun_seitou.pdf of round 27)
  explanations/<session>-final.json
                         claude-opus-5-5 drafts whose latest independent review is PASS
  hold.json              questions withheld from the public data (PARTIAL_HOLD)
  sources.json           official URLs and SHA-256
Question and choice text is copied from the transcription without any edit. Every held
question, and every question without a reviewer-PASS explanation, is left out.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / "reports/sssc-seishin27-20260929"
OUT = ROOT / "data/questions/seishin/2024-annual.json"
TITLE = "第27回（令和6年度）精神保健福祉士国家試験"
SELECT_COUNT = {"1": 1, "2": 2, "１": 1, "２": 2}


def load(name: str):
    return json.loads((REPORT / name).read_text(encoding="utf-8"))


def compose(q: dict) -> str:
    parts = [q["case"]] if q["case"] else []
    parts.append(q["stem"])
    parts.extend(q["notes"])
    return "\n".join(parts)


def main() -> None:
    keys = load("answer-keys.json")
    hold = load("hold.json")
    sources = load("sources.json")
    files = sources["files"]
    records, withheld = [], []
    for session in ("senmon", "kyotsu"):
        source = load(f"{session}-source-transcription.json")
        final = load(f"explanations/{session}-final.json")
        held = {int(n): v for n, v in hold[session].items()}
        for n, reason in final["held"].items():
            assert int(n) in held, f"{session} 問題{n} was held by review but is missing from hold.json: {reason}"
        numbers = [q["number"] for q in source["questions"]]
        assert numbers == list(range(1, len(numbers) + 1)), session
        for q in source["questions"]:
            n = q["number"]
            if n in held:
                withheld.append({"session": session, "number": n, "status": held[n]["status"], "reason": held[n]["reason"]})
                continue
            expl = final["explanations"][str(n)]
            answer = keys[session][str(n)]
            assert len(q["choices"]) == 5 and len(expl["choiceExplanations"]) == 5, (session, n)
            choose = re.findall(r"([12１２])つ選びなさい", q["stem"])
            assert choose and SELECT_COUNT[choose[-1]] == len(answer), (session, n, choose, answer)
            assert q["pdfFile"] in files, (session, n, q["pdfFile"])
            records.append({
                "number": n,
                "session": session,
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
    payload = {
        "exam": "seishin",
        "title": TITLE,
        "round": sources["round"],
        "fiscalYear": sources["fiscalYear"],
        "examDate": sources["examDate"],
        "lawNoticePeriod": "令和7年2月",
        "lastUpdated": "2026-09-29",
        "retrievedAt": sources["retrievedAt"],
        "termsUrl": sources["termsUrl"],
        "indexUrl": sources["indexUrl"],
        "answerUrl": files["se_kijun_seitou.pdf"]["url"],
        "answerSha256": files["se_kijun_seitou.pdf"]["sha256"],
        "questionPdfs": {k: v for k, v in files.items() if k.endswith(".pdf") and "kijun" not in k and "happyou" not in k},
        "withheld": withheld,
        "questions": records,
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    counts = {s: sum(r["session"] == s for r in records) for s in ("senmon", "kyotsu")}
    print(f"Wrote {len(records)} questions {counts}; withheld {[(w['session'], w['number']) for w in withheld]}")


if __name__ == "__main__":
    main()
