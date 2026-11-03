"""Audit staged transcriptions against the supplied official PDFs (stdlib + pdftotext).

This is a source-data audit, separate from the required pnpm checks.
Run from the repository root: python scripts/verify-keiryoshi-source.py
"""
import hashlib
import json
import re
import subprocess
from collections import Counter
from pathlib import Path


def read_json(path):
    return json.loads(Path(path).read_text())


def sha256(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def verify_round(round_number, year, raw_directory, exam_date, law_label):
    evidence = Path(f"docs/evidence/keiryoshi-{round_number}")
    manifest = read_json(evidence / "source-manifest.json")
    pack = read_json(f"data/exam-library/source-packs/keiryoshi-{round_number}.json")
    fixture = read_json(evidence / "official-answers.json")
    source_files = sorted(Path("data/questions/keiryoshi").glob(f"{year}-*.json"))
    questions = [q for file in source_files for q in read_json(file)]
    keys = list("アイウエオ")
    subjects = ["環化", "環物", "環濃", "環音", "法規", "管理", "一基", "計質"]

    assert pack["round"] == round_number and pack["year"] == year
    assert pack["examDate"] == exam_date and pack["publicationStatus"] == "staging"
    assert pack["sourceQuestionCount"] == 200
    assert len(manifest) == 9
    for item in manifest:
        assert sha256(raw_directory / item["file"]) == item["sha256"], item["file"]

    answer_pdf = next(item for item in manifest if item["kind"] == "正答")
    answer_text = subprocess.check_output([
        "pdftotext", "-layout", str(raw_directory / answer_pdf["file"]), "-",
    ], text=True)
    answers = {subject: {} for subject in subjects}
    for line in answer_text.splitlines():
        match = re.match(r"\s*問\s*(\d+)\s+([1-5※](?:\s+[1-5※]){7})\s*$", line)
        if match:
            for subject, answer in zip(subjects, match[2].split()):
                answers[subject][match[1]] = "全員正解" if answer == "※" else answer
    if round_number == 76:
        assert "全員正解とする" in answer_text
    else:
        assert "※" not in answer_text and "全員正解" not in answer_text
    assert answers == fixture["answers"]
    assert all(set(rows) == {str(n) for n in range(1, 26)} for rows in answers.values())
    assert fixture["sha256"] == pack["answerSha256"] == answer_pdf["sha256"]
    assert fixture["url"] == pack["answerUrl"] == answer_pdf["source_url"]
    if round_number == 76:
        assert answers["法規"]["21"] == "2"
        assert answers["環濃"]["3"] == "全員正解"

    if len(source_files) != 8 or len(questions) != 200:
        raise SystemExit(
            f"第{round_number}回: 原本9本・正答200件は一致。"
            f"問題データは{len(source_files)}科目/{len(questions)}原問で未完了（8科目/200原問が必要）。"
        )
    figures = read_json(evidence / "figure-crops.json")
    assert Counter(q["subject"] for q in questions) == Counter({s: 25 for s in subjects})
    source_ids = [(q["subject"], q["qNumber"]) for q in questions]
    assert len(set(source_ids)) == 200
    papers = {p["subject"]: p for p in pack["papers"]}
    assert set(papers) == set(subjects)
    for item in manifest:
        if item["kind"] == "問題":
            paper = papers[item["subject"]]
            assert paper["sha256"] == item["sha256"]
            assert paper["pdfUrl"] == item["source_url"]
            assert paper["questionCount"] == 25
    image_urls = set()
    for q in questions:
        label = (q["subject"], q["qNumber"])
        assert q["qNumber"] in range(1, 26), label
        assert q["officialAnswerNumber"] == answers[q["subject"]][str(q["qNumber"])], label
        expected = keys if q["officialAnswerNumber"] == "全員正解" else keys[int(q["officialAnswerNumber"]) - 1]
        assert q["answer"] == expected and q["requiredSelections"] == 1, label
        assert list(q["choices"]) == list(q["choiceExplanations"]) == keys, label
        assert all(q["choices"][key].strip() and len(q["choiceExplanations"][key].strip()) > 5 for key in keys), label
        assert len(q["question"]) > 10 and len(q["explanation"]) > 10, label
        assert "�" not in json.dumps(q, ensure_ascii=False), label
        assert q["sourcePdfUrl"] == papers[q["subject"]]["pdfUrl"], label
        assert q["sourceAnswerUrl"] == answer_pdf["source_url"], label
        assert q["year"] == year and q["season"] == "annual", label
        assert q["examDate"] == exam_date, label
        assert q["license"] == "METI-attributed" and "独自作成" in q["sourceAttribution"], label
        assert q["hasImage"] == bool(q.get("imageUrls")), label
        if q.get("lawReferenceDate"):
            assert q["lawReferenceDate"] == exam_date, label
            assert law_label in q["explanation"], label
        if q["subject"] == "法規":
            assert q.get("lawReferenceDate") == exam_date, label
        for url in q.get("imageUrls", []):
            assert Path("public" + url).is_file(), label
            image_urls.add(url)
    assert len(image_urls) == len(figures)
    assert image_urls == {f["image"] for f in figures}
    for figure in figures:
        assert sha256("public" + figure["image"]) == figure["imageSha256"], figure["image"]
        assert figure["sourceSha256"] == papers[figure["subject"]]["sha256"]

    assignments = {exam: [] for exam in pack["qualificationQuestionCounts"]}
    for q in questions:
        for exam in papers[q["subject"]]["examCodes"]:
            assignments[exam].append(f'{exam}-{q["year"]}-{q["season"]}-{q["session"]}-q{q["qNumber"]}')
    assert all(len(ids) == len(set(ids)) == 100 for ids in assignments.values())
    assert len(set(ident for ids in assignments.values() for ident in ids)) == 300

    result = {
        "round": round_number,
        "pdfHashesVerified": len(manifest),
        "officialAnswersVerified": len(questions),
        "sourceQuestions": len(questions),
        "choiceExplanations": sum(len(q["choiceExplanations"]) for q in questions),
        "qualificationQuestionCounts": {exam: len(ids) for exam, ids in assignments.items()},
        "figuresVerified": len(image_urls),
        "scope": "source-data audit only; pnpm validation/typecheck/tests are separate",
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))

    return {ident for ids in assignments.values() for ident in ids}


if __name__ == "__main__":
    ids76 = verify_round(76, 2025, Path("data/raw_pdfs/keiryoshi"),
                         "2025-12-14", "令和7年12月（出題時点）の法令")
    ids75 = verify_round(75, 2024, Path("data/raw_pdfs/keiryoshi/r06-75"),
                         "2024-12-15", "令和6年12月（出題時点）の法令")
    assert not ids76.intersection(ids75), "第75回と第76回のID衝突"
    assert len(ids76 | ids75) == 600
