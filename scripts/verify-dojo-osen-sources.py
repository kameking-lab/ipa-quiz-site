"""Independent editorial audit against temporary official PDFs (not needed at runtime)."""
import hashlib
import json
import re
import sys
from pathlib import Path

import pdfplumber

root = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1])
base = root / 'data/qualification-staging/dojo-osen'
manifest = json.loads((base / 'source-manifest.json').read_text(encoding='utf-8'))
questions = sum([json.loads((base / f'{y}-annual.json').read_text(encoding='utf-8')) for y in [2024, 2025]], [])
checked_chars = 0
for document in manifest['documents']:
    path = source / (document['name'] + '.pdf')
    assert hashlib.sha256(path.read_bytes()).hexdigest() == document['sha256']
    year = int(document['name'][:4])
    with pdfplumber.open(path) as pdf:
        if document['name'].endswith('answer'):
            page = pdf.pages[0]
            # The answer sheet's two columns are independently extracted.
            for session, bbox, expected in [('am', (0, 0, page.width/2, page.height), 35),
                                             ('pm', (page.width/2, 0, page.width, page.height), 45)]:
                text = page.crop(bbox).extract_text()
                cells = {int(m[1]): int(m[2]) if m[2] else None
                         for m in re.finditer(r'(?m)^\s*(\d{1,2})\s*([1-5])?\s*$', text)}
                # Do not mistake footnotes for answer cells.
                assert set(cells) == set(range(1, expected+1)), (document['name'], session, cells)
                qs = [q for q in questions if q['year'] == year and q['session'] == session]
                assert all(cells[q['qNumber']] == q['officialAnswerNumber'] for q in qs)
            continue
        assets = [a for a in manifest['assets'] if a['pdfUrl'] == document['url']]
        for pi, page in enumerate(pdf.pages[2:], start=3):
            rects = [a['clipRectPoints'] for a in assets if a['pdfPage'] == pi]
            for char in page.chars:
                if not char['text'].strip():
                    continue
                x = (char['x0'] + char['x1']) / 2
                y = (char['top'] + char['bottom']) / 2
                if y > page.height - 35:  # printed page-number footer
                    continue
                assert any(r[0] - 0.5 <= x <= r[2]+0.5 and r[1]-0.5 <= y <= r[3]+0.5 for r in rects), (document['name'], pi, char['text'], x, y)
                checked_chars += 1
print(json.dumps({'status': 'PASS', 'questionCount': len(questions), 'officialAnswerCells': 160,
                  'pdfCount': 6, 'questionImageCount': len(manifest['assets']),
                  'independentlyCheckedBodyCharacters': checked_chars}, ensure_ascii=False))
