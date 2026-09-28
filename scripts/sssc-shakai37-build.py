"""Build the 2024 fiscal-year Social Worker exam after full source/answer/review gates.

Inputs live under reports/sssc-shakai37-20260928/. No draft or HOLD review is
allowed into the playable question data. Original question/choice text is copied
from the center's PDF/accessible-HTML transcription without editorial changes.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / "reports/sssc-shakai37-20260928"
OUTPUT = ROOT / "data/questions/shakai/2024-annual.json"


def read_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def main() -> None:
    approval_path = REPORT / "APPROVED.json"
    if not approval_path.exists():
        raise SystemExit("HOLD: 129問・全肢の一次資料確認と承認が終わるまで公開データを生成しません")
    approval = read_json(approval_path)
    assert approval["status"] == "APPROVED"
    assert approval["primarySourceVerified"] == list(range(1, 130))
    source = read_json(REPORT / "source-transcription.json")
    key_receipt = read_json(REPORT / "answer-keys.json")
    manifest = read_json(REPORT / "sources.json")
    reviews = read_json(REPORT / "explanations.json")
    answers = key_receipt["answers"]
    assert source["exam"] == "shakai37"
    assert source["sourceFiles"] == {
        name: manifest["files"][name]["sha256"] for name in source["sourceFiles"]
    }
    assert key_receipt["sourceFile"]["sha256"] == manifest["files"]["s_kijun_seitou.pdf"]["sha256"]
    assert [q["number"] for q in source["questions"]] == list(range(1, 130))
    assert sorted(map(int, answers)) == list(range(1, 130))
    assert sorted(map(int, reviews)) == list(range(1, 130))
    assert len({q["subject"] for q in source["questions"]}) == 19
    assert len([q for q in source["questions"] if q["half"] == "am"]) == 84
    assert len([q for q in source["questions"] if q["half"] == "pm"]) == 45
    records = []
    for q in source["questions"]:
        number = q["number"]
        answer = answers[str(number)]
        review = reviews[str(number)]
        assert review["status"] == "PASS", (number, review["status"])
        assert not review["sourceChecks"], (number, review["sourceChecks"])
        assert len(q["choices"]) == len(review["choiceExplanations"]) == 5, number
        assert all(len(reason.strip()) >= 25 for reason in review["choiceExplanations"]), number
        select = re.findall(r"([12１２])つ選びなさい", q["stem"])
        assert select, number
        assert int(select[-1].translate(str.maketrans("１２", "12"))) == len(answer), number
        assert q["pdfFile"] in source["sourceFiles"]
        assert q["pdfPage"] >= 1
        records.append({
            "number": number,
            "session": "kyotsu" if number <= 84 else "senmon",
            "subject": q["subject"],
            "pdfFile": q["pdfFile"],
            "pdfPage": q["pdfPage"],
            "question": "\n".join([*([q["case"]] if q["case"] else []), q["stem"], *q["notes"]]),
            "choices": q["choices"],
            "officialAnswer": answer,
            "summary": review["summary"],
            "choiceExplanations": review["choiceExplanations"],
            "lawSensitive": review["lawSensitive"] or review["draftLawSensitive"],
        })
    payload = {
        "exam": "shakai",
        "title": "第37回（令和6年度）社会福祉士国家試験",
        "round": 37,
        "fiscalYear": 2024,
        "examDate": "2025-02-02",
        "reviewedAt": "2026-09-28",
        "retrievedAt": manifest["retrievedAt"],
        "termsUrl": manifest["termsUrl"],
        "indexUrl": manifest["indexUrl"],
        "answerUrl": manifest["files"]["s_kijun_seitou.pdf"]["url"],
        "answerSha256": manifest["files"]["s_kijun_seitou.pdf"]["sha256"],
        "questionPdfs": {name: data for name, data in manifest["files"].items() if name in source["sourceFiles"]},
        "questions": records,
    }
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(records)} reviewed questions to {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
