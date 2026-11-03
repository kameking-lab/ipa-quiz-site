"""Audit staged transcriptions against the supplied official PDFs (stdlib + pdftotext).

This is a source-data audit, separate from the required pnpm checks.
Run from the repository root: python scripts/verify-keiryoshi-source.py
"""
import hashlib
import difflib
import json
import re
import subprocess
from collections import Counter
from pathlib import Path


def read_json(path):
    return json.loads(Path(path).read_text())


def sha256(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def verify_round75_evidence(evidence, questions, papers, raw_directory, figures):
    """Bind the full visual/diff review and figure audit to the current records.

    Pixel re-rendering is performed separately by verify-figures.py (PyMuPDF /
    Pillow). Here only stdlib and pdftotext are required, as in the round-76 audit.
    Neither author review flags nor these structural checks are independent review.
    """
    inventory = {(r['subject'], r['qNumber']): r
                 for r in read_json(evidence / 'source-inventory.json')}
    reviews = {}
    classifications = {}
    for file in sorted(Path('data/questions/keiryoshi').glob('2024-*.json')):
        slug = file.stem.removeprefix('2024-')
        rows = read_json(evidence / f'{slug}-transcription-review.json')
        classes = read_json(evidence / f'{slug}-figure-classification.json')
        assert len(rows) == len(classes) == 25, slug
        for row in rows:
            key = (row['subject'], row['qNumber'])
            assert key not in reviews
            reviews[key] = (slug, row)
        for row in classes:
            key = (row['subject'], row['qNumber'])
            assert key not in classifications
            classifications[key] = row
    expected_keys = {(q['subject'], q['qNumber']) for q in questions}
    assert len(expected_keys) == 200
    assert set(reviews) == set(classifications) == set(inventory) == expected_keys
    figure_keys = {(f['subject'], f['qNumber']) for f in figures}
    assert len(figure_keys) == len(figures) == 55
    for q in questions:
        key = (q['subject'], q['qNumber'])
        slug, review = reviews[key]
        inv, classification = inventory[key], classifications[key]
        assert review['sourceSha256'] == inv['sourceSha256'] == papers[q['subject']]['sha256'], key
        canonical = json.dumps(q, ensure_ascii=False, sort_keys=True, separators=(',', ':'))
        assert hashlib.sha256(canonical.encode()).hexdigest() == review['questionRecordSha256'], key
        pdf = raw_directory / Path(q['sourcePdfUrl']).name
        page = q['qNumber'] + 1
        assert review['pdfPage'] == inv['pdfPage'] == page, key
        raw = subprocess.check_output(['pdftotext', '-layout', '-f', str(page),
                                      '-l', str(page), str(pdf), '-'],
                                     text=True, stderr=subprocess.DEVNULL)
        assert raw == review['rawPdftotext'], key
        # The inventory splits whole-PDF output at form-feed page separators.
        assert raw.removesuffix('\f') == inv['rawPdftotext'], key
        transcription = q['question'] + '\n' + '\n'.join(
            f'{i} {value}' for i, value in enumerate(q['choices'].values(), 1))
        assert review['transcription'] == transcription, key
        diff = list(difflib.unified_diff(raw.splitlines(), transcription.splitlines(),
                    fromfile='pdftotext-layout', tofile=f'2024-{slug}-q{q["qNumber"]}', lineterm=''))
        assert review['machineDiff'] == diff, key
        assert review['visualTranscriptionReviewed'] and review['choiceCount'] == 5, key
        assert review['diffDisposition'] and '斜体' in review['notationNotes'], key
        assert review['publicationStatus'] == 'staging' and not review['independentReview'], key
        assert q['needsReview'] is True, key
        assert classification['vectorPathCount'] == len(inv['vectorPaths']), key
        image_count = classification.get('imageObjectCount', len(classification.get('imageObjects', [])))
        assert image_count == len(inv['imageObjects']), key
        assert classification.get('visualClassificationReviewed', classification.get('visualQuestionRegionReviewed')), key
        required = classification.get('hasFigureOrTable', classification.get('figureRequired'))
        assert required == q['hasImage'] == (key in figure_keys), key
    audit = read_json(evidence / 'figure-pixel-audit.json')
    assert {f['image'] for f in audit['figures']} == {f['image'] for f in figures}
    hashes = {f['image']: f['imageSha256'] for f in figures}
    for row in audit['figures']:
        assert row['imageSha256'] == hashes[row['image']]
        assert row['missingInkPixels'] == 0 and row['sourceCropPixelEqual']
        assert row['requiredMarginPixels'] >= 12 and row['searchRegionEdgeWhitespace']
    calculations = (read_json(evidence / 'ichiki-calculations.json') +
                    read_json(evidence / 'calculations.json'))
    calculation_keys = {(r['subject'], r['qNumber']) for r in calculations}
    assert len(calculation_keys) == len(calculations) == 81
    for row in calculations:
        assert row['status'] == 'passed'
        assert row['officialAnswer'] == next(q['officialAnswerNumber'] for q in questions
            if q['subject'] == row['subject'] and q['qNumber'] == row['qNumber'])
    assert all((q['subject'], q['qNumber']) in calculation_keys
               for q in questions if q.get('isCalculation'))
    for law in read_json(evidence / 'historical-law-sources.json'):
        assert sha256(law['file']) == law['sha256']
        assert law['url'].endswith('?asof=2024-12-15')
        assert law['revision']['amendment_enforcement_date'] <= '2024-12-15'


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

    complete = len(source_files) == 8 and len(questions) == 200
    figures = read_json(evidence / "figure-crops.json") if questions else []
    counts = Counter(q["subject"] for q in questions)
    assert set(counts).issubset(subjects) and all(n <= 25 for n in counts.values())
    if complete:
        assert counts == Counter({s: 25 for s in subjects})
    source_ids = [(q["subject"], q["qNumber"]) for q in questions]
    assert len(set(source_ids)) == len(questions)
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
    assert all(len(ids) == len(set(ids)) <= 100 for ids in assignments.values())
    assert len(set(ident for ids in assignments.values() for ident in ids)) == sum(map(len, assignments.values()))
    if complete:
        assert all(len(ids) == 100 for ids in assignments.values())
        assert sum(map(len, assignments.values())) == 300
        actual_counts = {exam: len(ids) for exam, ids in assignments.items()}
        assert actual_counts == pack['qualificationQuestionCounts']
        if round_number == 75:
            assert pack['ingestedSourceQuestionCount'] == len(questions)
            assert actual_counts == pack['ingestedQualificationQuestionCounts']
            verify_round75_evidence(evidence, questions, papers, raw_directory, figures)

    result = {
        "round": round_number,
        "complete": complete,
        "pdfHashesVerified": len(manifest),
        "officialAnswersVerified": len(questions),
        "sourceQuestions": len(questions),
        "choiceExplanations": sum(len(q["choiceExplanations"]) for q in questions),
        "qualificationQuestionCounts": {exam: len(ids) for exam, ids in assignments.items()},
        "figuresVerified": len(image_urls),
        "scope": "source-data audit only; pnpm validation/typecheck/tests are separate",
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))

    if not complete:
        raise SystemExit(
            f"第{round_number}回: 原本9本・正答表200件と既存ドラフトの構造監査は一致。"
            f"問題データは{len(source_files)}科目/{len(questions)}原問で未完了（8科目/200原問が必要）。"
            "資格別件数は展開可能件数であり、ローダー登録件数ではない。"
        )

    return {ident for ids in assignments.values() for ident in ids}


if __name__ == "__main__":
    ids76 = verify_round(76, 2025, Path("data/raw_pdfs/keiryoshi"),
                         "2025-12-14", "令和7年12月（出題時点）の法令")
    ids75 = verify_round(75, 2024, Path("data/raw_pdfs/keiryoshi/r06-75"),
                         "2024-12-15", "令和6年12月（出題時点）の法令")
    assert not ids76.intersection(ids75), "第75回と第76回のID衝突"
    assert len(ids76 | ids75) == 600
