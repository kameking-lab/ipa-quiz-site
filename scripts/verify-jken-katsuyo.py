#!/usr/bin/env python3
"""Verify J検情報活用 archived hashes and every answer directly from official PDFs.
Requires pypdf. Example: python scripts/verify-jken-katsuyo.py --pdf-dir PATH --grade 1
"""
import argparse
import hashlib
import json
import re
from pathlib import Path
from pypdf import PdfReader

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--pdf-dir', type=Path, required=True)
parser.add_argument('--grade', type=int, choices=[1, 2, 3], required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
manifest = json.loads((root / f'data/exam-library/source-packs/jken-katsuyo/grade{args.grade}/manifest.json').read_text(encoding='utf-8'))
questions = json.loads((root / f'data/questions/jken-katsuyo{args.grade}/latest-two.json').read_text(encoding='utf-8'))
checked = 0
for sitting in manifest['sittings']:
    for pdf in sitting['pdfs']:
        path = args.pdf_dir / pdf['url'].rsplit('/', 1)[1]
        assert hashlib.sha256(path.read_bytes()).hexdigest() == pdf['sha256'], str(path)
    answer_path = args.pdf_dir / f'{sitting["date"]}_kaitojk{args.grade:02}.pdf'
    text = '\n'.join(page.extract_text(extraction_mode='layout') for page in PdfReader(answer_path).pages)
    columns = [[], []]
    for line in text.splitlines():
        matches = list(re.finditer(r'\((\d+)\)\s+([アイウエオカキクケコサシスセソ])(?=\s|$)', line))
        for match in matches:
            # Answer-sheet columns are stable across these six official sheets.
            columns[0 if match.start() < 32 else 1].append((int(match[1]), match[2]))
    actual = {}
    problem = 0
    for rows in columns:
        for slot, key in rows:
            if slot == 1:
                problem += 1
            actual[(problem, slot)] = key
    if args.grade == 1 and sitting['date'] == '260621':
        assert 'イまたはウを正解' in text
        assert actual[(6, 1)] == 'イ'
        actual[(6, 1)] = ['イ', 'ウ']
    archived = {(row['problem'], row['slot']): row['answer'] for row in sitting['answers']}
    assert actual == archived, (sitting['date'], actual, archived)
    candidates = [q for q in questions if sitting['date'] in q['id']]
    assert len(candidates) == len(actual) == sitting['count']
    for q in candidates:
        key = divmod(q['qNumber'], 100)
        assert q['answer'] == actual[key], q['id']
        assert set(q['choices']) == set(q['choiceExplanations']), q['id']
        for url in q.get('imageUrls', []):
            assert (root / 'public' / url.lstrip('/')).is_file(), url
    checked += len(actual)
    print(f'{sitting["date"]}: 2 PDF hashes, {len(actual)} official answers match')
print(f'PASS: grade {args.grade}, {checked} official answer slots, 4 source PDF hashes')
