"""Build data/questions/shakai/2024-annual.json (第37回社会福祉士・専門科目 問85〜129).

共通科目（問1〜84）は第27回精神保健福祉士と同一問題・同一正答で、data/questions/seishin/2024-annual.json
に解説付きで収録済み（保留3問 4・69・76 を除く）。社会福祉士側はそれを共有するので、ここでは専門科目
45問だけを書き出す。

Inputs (reports/sssc-shakai37-20260928/):
- source-transcription.json : 129問の原文（PDF・読み上げHTMLの文字照合済み）
- answer-keys.json          : 公式正答（s_kijun_seitou.pdf と照合済み）
- explanations-senmon.json  : 問85〜129の独自解説（独立レビュー PASS 後）
- sources.json              : 公式PDFのURL・SHA-256
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
    source = read_json(REPORT / "source-transcription.json")
    answers = read_json(REPORT / "answer-keys.json")["answers"]
    manifest = read_json(REPORT / "sources.json")
    explanations = read_json(REPORT / "explanations-senmon.json")
    assert explanations["reviewStatus"].startswith("INDEPENDENT_REVIEW_PASS"), explanations["reviewStatus"]
    reviews = explanations["questions"]
    assert source["exam"] == "shakai37"
    assert [q["number"] for q in source["questions"]] == list(range(1, 130))
    assert sorted(map(int, reviews)) == list(range(85, 130))
    for name, sha in source["sourceFiles"].items():
        assert manifest["files"][name]["sha256"] == sha, name

    records = []
    for q in source["questions"]:
        number = q["number"]
        if number < 85:
            continue
        answer = answers[str(number)]
        review = reviews[str(number)]
        assert len(q["choices"]) == len(review["choiceExplanations"]) == 5, number
        for index, text in enumerate(review["choiceExplanations"]):
            expected = "正しい。" if index + 1 in answer else "誤り。"
            assert text.startswith(expected), (number, index + 1)
            assert len(text.strip()) >= 25, (number, index + 1)
        select = re.findall(r"([12１２])つ選びなさい", q["stem"])
        assert select and int(select[-1].translate(str.maketrans("１２", "12"))) == len(answer), number
        records.append({
            "number": number,
            "session": "senmon",
            "subject": q["subject"],
            "pdfFile": q["pdfFile"],
            "pdfPage": q["pdfPage"],
            "question": "\n".join([*([q["case"]] if q["case"] else []), q["stem"], *q["notes"]]),
            "choices": q["choices"],
            "officialAnswer": answer,
            "summary": review["summary"],
            "choiceExplanations": review["choiceExplanations"],
            "lawSensitive": bool(review["lawSensitive"]),
        })

    pdfs = {name: {"url": data["url"], "sha256": data["sha256"]}
            for name, data in manifest["files"].items() if name.endswith(".pdf") and name != "s_kijun_seitou.pdf"}
    payload = {
        "exam": "shakai",
        "title": "第37回（令和6年度）社会福祉士国家試験",
        "round": 37,
        "fiscalYear": 2024,
        "examDate": manifest["examDate"],
        "lawNoticePeriod": "令和7年2月",
        "lastUpdated": "2026-11-06",
        "retrievedAt": manifest["retrievedAt"],
        "termsUrl": manifest["termsUrl"],
        "indexUrl": manifest["indexUrl"],
        "answerUrl": manifest["files"]["s_kijun_seitou.pdf"]["url"],
        "answerSha256": manifest["files"]["s_kijun_seitou.pdf"]["sha256"],
        "questionPdfs": pdfs,
        "questions": records,
    }
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=1) + "\n", encoding="utf-8", newline="\n")
    print(f"Wrote {len(records)} senmon questions to {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
