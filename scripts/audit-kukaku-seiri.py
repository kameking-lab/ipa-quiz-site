"""Read-only source audit using independent pdfminer/pdfplumber extraction.

python scripts/audit-kukaku-seiri.py <temporary PDF directory> <receipt.json>
No raw PDF/text is written into the repository. PNG regions are verified separately.
"""
import hashlib
import json
import re
import sys
from pathlib import Path

import pdfplumber

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'data/qualification-staging/kukaku-seiri'
TMP = Path(sys.argv[1])
receipt_path = Path(sys.argv[2])
rows = json.loads((DATA / '2026-annual.json').read_text(encoding='utf-8'))
assets = json.loads((DATA / 'assets.json').read_text(encoding='utf-8'))
keys = json.loads((DATA / 'official-answers.json').read_text(encoding='utf-8'))
hash_file = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()


def compact(s):
    # Two extraction engines map the same wave-dash glyph differently.
    return re.sub(r'\s+', '', s).replace('〜', '～')


errors = []
checked_chars = 0
checked_text = []
with pdfplumber.open(TMP / '20260907t_mondaia.pdf') as doc:
    numbers = []
    for i, page in enumerate(doc.pages):
        if i == 0:
            continue
        first_body_top = 190 if i == 1 else 70
        # PyMuPDF regions are relative to the visible CropBox. pdfminer retains
        # the printer-margin MediaBox coordinate origin for this source PDF.
        ox, oy = page.cropbox[:2]
        page_body = page.crop((62 + ox, first_body_top + oy, 534 + ox, 755 + oy))
        numbers.extend(int(n) for n in re.findall(r'【No\.\s*(\d+)】', page_body.extract_text()))
        regions = [a['clipRectPoints'] for a in assets if a['pdfPage'] == i + 1]
        for char in page_body.chars:
            if not char['text'].strip():
                continue
            checked_chars += 1
            x = (char['x0'] + char['x1']) / 2 - ox
            y = (char['top'] + char['bottom']) / 2 - oy
            if not any(a - 1 <= x <= c + 1 and b - 1 <= y <= d + 1 for a, b, c, d in regions):
                errors.append(f'uncovered source character p{i + 1}: {char["text"]}')
    if numbers != list(range(1, 41)):
        errors.append(f'independent question number sequence: {numbers}')
    for q, asset in zip(rows, assets):
        page = doc.pages[asset['pdfPage'] - 1]
        ox, oy = page.cropbox[:2]
        a, b, c, d = asset['clipRectPoints']
        raw = page.crop((a + ox, b + oy, c + ox, d + oy)).extract_text()
        raw = re.sub(r'^【No\.\s*\d+】\s*', '', raw)
        raw = re.sub(r'\(cid:10233\)[1-4]\s*', '', raw)
        if q['qNumber'] == 24:
            continue  # Fractions require visual verification, not a text-order guess.
        target = q['question'] + ''.join(q['choices'].values())
        if compact(raw) != compact(target):
            errors.append(f'q{q["qNumber"]}: independent text mismatch')
        else:
            checked_text.append(q['qNumber'])

answer_audits = []
for year, filename in [(2026, '20260907t_seitou.pdf'), (2025, '20250908t_seitou.pdf')]:
    expected = keys[str(year)]
    with pdfplumber.open(TMP / filename) as doc:
        text = doc.pages[expected['pdfPage'] - 1].extract_text()
        answer_lines = [line.split('解答', 1)[1] for line in text.splitlines() if re.search(r'(?:^|\s)解答\s', line)]
        extracted = [int(n) for line in answer_lines for n in re.findall(r'(?<!\d)[1-4](?!\d)', line)]
        if extracted != expected['answers']:
            errors.append(f'{year}: independently extracted answer table mismatch: {extracted}')
        answer_audits.append({'year': year, 'count': len(extracted), 'pdfPage': expected['pdfPage'], 'pdfSha256': hash_file(TMP / filename)})

receipt = {
    'status': 'PASS' if not errors else 'FAIL', 'scope': '2026 question originals + 2026/2025 official answer tables; not two-round completion',
    'engines': {'ingestion': 'PyMuPDF', 'independentAudit': 'pdfplumber/pdfminer'},
    'questionsSha256': hash_file(DATA / '2026-annual.json'), 'assetsManifestSha256': hash_file(DATA / 'assets.json'),
    'questionPdfSha256': hash_file(TMP / '20260907t_mondaia.pdf'),
    'questionNumberSequence': list(range(1, 41)), 'sourceCharactersCoveredByImages': checked_chars,
    'independentTextMatchedQuestions': checked_text,
    'visualFormulaException': {'question': 24, 'reason': 'two-dimensional fractions; original image retained and visually checked'},
    'normalization': 'whitespace; identical wave-dash glyph U+301C/U+FF5E; choice-label CID 10233 only',
    'officialAnswerAudits': answer_audits, 'errors': errors,
}
receipt_path.parent.mkdir(parents=True, exist_ok=True)
receipt_path.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')
print(json.dumps({'status': receipt['status'], 'matchedQuestions': len(checked_text), 'coveredSourceCharacters': checked_chars, 'errors': errors}, ensure_ascii=False))
sys.exit(bool(errors))
