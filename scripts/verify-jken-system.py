#!/usr/bin/env python3
"""Recheck the six J検 answer sheets and archived source hashes (requires pypdf)."""
import argparse
import hashlib
import json
import re
from pypdf import PdfReader
from pathlib import Path

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--pdf-dir', type=Path, required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
pack = json.loads((root / 'data/exam-library/source-packs/jken-system-latest2.json').read_text(encoding='utf-8'))
checked = 0
for paper in pack['papers']:
    source = json.loads((root / f'data/questions/jken-system/{paper["id"]}.json').read_text(encoding='utf-8'))
    for kind in ['question', 'answer']:
        filename = paper[kind + 'Url'].rsplit('/', 1)[1]
        data = (args.pdf_dir / filename).read_bytes()
        assert hashlib.sha256(data).hexdigest() == paper[kind + 'Sha256'], filename
    answer_path = args.pdf_dir / paper['answerUrl'].rsplit('/', 1)[1]
    text = '\n'.join(page.extract_text(extraction_mode='layout') for page in PdfReader(answer_path).pages)
    columns = [[], []]
    for line in text.splitlines():
        for match in re.finditer(r'\((\d+)\)\s*[A-EＡ-ＥＤＥ]\s*([アイウエオカキクケコ])', line):
            columns[0 if match.start() < 35 else 1].append((int(match[1]), match[2]))
    actual = {}
    for rows, start in zip(columns, [1, 5 if paper['subject'] == 'プログラミングスキル' else 4]):
        number, previous = start, 0
        for slot, key in rows:
            if slot == 1 and previous:
                number += 1
            actual.setdefault(str(number), '')
            actual[str(number)] += key
            previous = slot
    assert actual == paper['officialAnswerKey'], (paper['id'], actual)
    for question in source['questions']:
        assert ''.join(slot['answer'] for slot in question['slots']) == actual[str(question['number'])]
        for slot in question['slots']:
            bank, = [item for item in question['banks'] if slot['number'] in item['slots']]
            assert set(slot['choiceExplanations']) == set(bank['choices'])
            checked += 1
    print(f'{paper["id"]}: PDF hashes and {paper["answerSlotCount"]} official answer slots match')
assert checked == 227, checked
print(f'PASS: {checked} official answer slots, 12 source PDF hashes, all candidate explanation keys')
