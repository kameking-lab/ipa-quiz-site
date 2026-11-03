"""Prepare source evidence, never question data or an ingestion PASS.

Run from repository root. Requires pdftotext/pdfinfo and PyMuPDF.
No network calls; the input MANIFEST is authoritative for URLs and hashes.
"""
import hashlib
import json
import re
import subprocess
from pathlib import Path

import pymupdf

EVIDENCE = Path('docs/evidence/keiryoshi-75')
RAW = Path('data/raw_pdfs/keiryoshi/r06-75')
SUBJECTS = ['環化', '環物', '環濃', '環音', '法規', '管理', '一基', '計質']
SLUGS = ['kanka', 'kanbutsu', 'kanno', 'kanon', 'houki', 'kanri', 'ichiki', 'keishitsu']
INDEX = 'https://www.meti.go.jp/policy/economy/hyojun/techno_infra/23_kakomon.html'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def write(name, value):
    (EVIDENCE / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')


manifest = json.loads((RAW / 'MANIFEST.json').read_text())
assert len(manifest) == 9
for item in manifest:
    assert sha(RAW / item['file']) == item['sha256'], item['file']
    assert (RAW / item['file']).stat().st_size == item['bytes']

answer_source = next(m for m in manifest if m['file'] == '75seikaibangou.pdf')
answer_text = subprocess.check_output(['pdftotext', '-layout', str(RAW / answer_source['file']), '-'], text=True)
answers = {subject: {} for subject in SUBJECTS}
for line in answer_text.splitlines():
    match = re.fullmatch(r'\s*問\s*(\d+)\s+([1-5](?:\s+[1-5]){7})\s*', line)
    if match:
        for subject, value in zip(SUBJECTS, match[2].split()):
            assert match[1] not in answers[subject]
            answers[subject][match[1]] = value
assert all(set(a) == {str(n) for n in range(1, 26)} for a in answers.values())
assert '※' not in answer_text and '全員正解' not in answer_text
write('official-answers.json', dict(url=answer_source['source_url'], sha256=answer_source['sha256'], answers=answers))
(EVIDENCE / 'official-answers.txt').write_text(answer_text)

previous = json.loads(Path('data/exam-library/source-packs/keiryoshi-76.json').read_text())
pack = dict(
    id='keiryoshi-75', publicationStatus='staging', ingestionStatus='pending-transcription',
    round=75, year=2024, examDate='2024-12-15',
    examDateSourceUrl='https://www.meti.go.jp/information/license/data/c240621aj.html',
    indexUrl=INDEX, answerUrl=answer_source['source_url'], answerSha256=answer_source['sha256'],
    subjectMappingSourceUrl='https://www.meti.go.jp/information/license/data/c241216aj.html',
    sourceQuestionCount=200, ingestedSourceQuestionCount=0,
    qualificationQuestionCounts={exam: 100 for exam in previous['qualificationQuestionCounts']},
    ingestedQualificationQuestionCounts={exam: 0 for exam in previous['qualificationQuestionCounts']},
    papers=[],
)
inventory = []
font_audit = []
source_manifest = []
errors = []
for subject, slug, old in zip(SUBJECTS, SLUGS, previous['papers']):
    item = next(m for m in manifest if m['file'].startswith(str(SUBJECTS.index(subject) + 1) + '_'))
    path = RAW / item['file']
    doc = pymupdf.open(path)
    assert len(doc) == 26, path
    # Counts are corroborated by the 25 answer rows; page/question content still needs review.
    paper = dict(subject=subject, examCodes=old['examCodes'], questionCount=25,
                 pdfUrl=item['source_url'], sha256=item['sha256'])
    pack['papers'].append(paper)
    source_manifest.append(dict(**item, kind='問題', subject=subject, pages=len(doc),
                                listing_url=INDEX, session='第75回（令和6年12月）'))
    extracted = subprocess.run(['pdftotext', '-layout', str(path), '-'], text=True, capture_output=True, check=True)
    pages = extracted.stdout.split('\f')
    assert len(pages) == 27 and not pages[-1].strip(), path
    errors.append(dict(file=item['file'], stderr=extracted.stderr))
    for number, page in enumerate(list(doc)[1:], 1):
        fonts = []
        for font in page.get_fonts():
            fonts.append(dict(xref=font[0], name=font[3], format=font[1],
                              encoding=font[5], toUnicode=doc.xref_get_key(font[0], 'ToUnicode')[0] != 'null'))
        drawings = page.get_drawings()
        images = page.get_image_info()
        # Deliberately keep all objects, including text outlines, rules, fractions and decorations.
        # A nonzero object count is NOT a determination that this question needs an illustration.
        inventory.append(dict(
            subject=subject, qNumber=number, pdfPage=number + 1,
            sourcePdfUrl=item['source_url'], sourceSha256=item['sha256'],
            officialAnswer=answers[subject][str(number)],
            rawPdftotext=pages[number], rawMuPdfText=page.get_text(),
            mediaBox=list(page.mediabox), cropBox=list(page.cropbox),
            imageObjects=[dict(bbox=list(i['bbox']), width=i['width'], height=i['height']) for i in images],
            vectorPaths=[dict(bbox=list(d['rect']), itemCount=len(d['items']), type=d['type']) for d in drawings],
            status='transcription-explanations-typography-and-figures-pending',
        ))
        font_audit.append(dict(subject=subject, qNumber=number, fonts=fonts))
source_manifest.append(dict(**answer_source, kind='正答', pages=1, listing_url=INDEX,
                            session='第75回（令和6年12月）'))
write('source-manifest.json', source_manifest)
write('source-inventory.json', inventory)
write('font-audit.json', font_audit)
write('pdftotext-errors.json', errors)
write('preparation-status.json', dict(
    round=75, year=2024, status='incomplete', pdfHashesVerified=9, answerCellsParsed=200,
    questionPagesInventoried=len(inventory), ingestedSourceQuestions=0,
    pagesWithImageObjects=sum(bool(p['imageObjects']) for p in inventory),
    pagesWithVectorPaths=sum(bool(p['vectorPaths']) for p in inventory),
    scope='Source preparation only. Raw extracted text has missing/mis-mapped glyphs; not reviewed transcription.',
    pending=['200本文・1000選択肢の原本照合と全機械差分の審査',
             '下線・太字範囲と添字・斜体の全数点検',
             '図候補の図/文字輪郭/罫線の分類、切出し、画素包含検証',
             '200全体解説・1000肢解説、計算再計算・回路等の追跡',
             '2024 JSON登録・年度表示・400原問/600IDの回帰検証'],
    tools=dict(pymupdf=pymupdf.VersionBind,
               pdftotext=subprocess.check_output(['pdftotext', '-v'], stderr=subprocess.STDOUT, text=True).splitlines()[0]),
))
Path('data/exam-library/source-packs/keiryoshi-75.json').write_text(json.dumps(pack, ensure_ascii=False, indent=2) + '\n')
print(json.dumps(json.loads((EVIDENCE / 'preparation-status.json').read_text()), ensure_ascii=False, indent=2))
