"""Read-only replay: python scripts/verify-chizai2-intake.py --pdf-dir <temporary PDFs>."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import unicodedata

import fitz
import jsonschema

parser = argparse.ArgumentParser()
parser.add_argument('--pdf-dir', type=Path, required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
report = root / 'reports/qchizai2-20261103'

def read(path):
    return json.loads(path.read_text(encoding='utf-8'))

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

candidate = root / 'data/prepared-chizai2/questions.json'
receipt = read(report / 'source-intake-receipt.json')
questions = read(candidate)
assert sha(candidate) == receipt['candidateSha256']
jsonschema.validate(questions, read(report / 'intake.schema.json'))
assert len(questions) == len({q['id'] for q in questions}) == 160
rows = {q['id']: q for q in receipt['questions']}
answers = {}
pdf_hashes = {}
for pdf in receipt['sourcePdfChecks']:
    path = args.pdf_dir / pdf['url'].rsplit('/', 1)[-1]
    pdf_hashes[pdf['url']] = sha(path)
    assert pdf_hashes[pdf['url']] == pdf['sha256']  # actual bytes, never trust hashMatches
    with fitz.open(path) as doc:
        assert len(doc) == pdf['pages']
        text = unicodedata.normalize('NFKC', doc[-1].get_text())
    pairs = re.findall(r'問\s*(40|[123][0-9]|[1-9])\s*([アイウエオカキクケコ○〇×]|\d+)', text)
    table = {int(number): answer for number, answer in pairs}
    assert len(pairs) == len(table) == 40
    assert sorted(table) == list(range(1, 41))
    answers[pdf['url']] = table

for q in questions:
    row = rows[q['id']]
    content_hash = hashlib.sha256(json.dumps(q, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode()).hexdigest()
    assert row['contentSha256'] == content_hash
    assert q['sourcePdfUrl'] == q['sourceAnswerUrl'] == row['sourcePdfUrl']
    assert q['officialAnswerNumber'] == row['officialAnswer'] == answers[q['sourcePdfUrl']][q['qNumber']]
    assert q['sourcePdfSha256'] == row['sourcePdfSha256'] == pdf_hashes[q['sourcePdfUrl']]
    assert q['sourceHeadingPage'] == row['sourcePage']
    if q['type'] == 'numeric':
        assert not q['choices'] and not q['choiceExplanations'] and q['calculationSteps']
        assert q['answer'] == q['officialAnswerNumber']
    else:
        assert q['choices'].keys() == q['choiceExplanations'].keys()
        assert all(reason.strip() for reason in q['choiceExplanations'].values())
        official = q['officialAnswerNumber'].replace('○', '〇')
        selected = q['choices'][q['answer']] if official in ['〇', '×'] else q['answer']
        assert selected.replace('○', '〇') == official
    assert q['lawReferenceDate'] == {53:'2025-09-01', 54:'2026-01-01'}[q['round']]
for round_number in [53, 54]:
    for section in ['gakka', 'practical']:
        assert sorted(q['qNumber'] for q in questions if q['round'] == round_number and q['section'] == section) == list(range(1, 41))
assert sum(len(q['choiceExplanations']) for q in questions) == 651
print('PASS: schema, 160 record hashes, 4 actual PDF hashes, 160 independently parsed official answers, 4 x 40 originals, 651 choice reasons')
