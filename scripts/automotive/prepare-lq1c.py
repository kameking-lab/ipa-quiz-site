"""Freeze the exact 85-ID continuation and apply explicit previous review repairs."""
import copy
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / 'data/qualification-staging/automotive/latest-two'
QA = DATA / 'qa'

def read(path):
    return json.loads(path.read_text(encoding='utf-8'))

def canonical(q):
    return hashlib.sha256(json.dumps(q, ensure_ascii=False, separators=(',', ':')).encode()).hexdigest()

register = read(QA / 'lq1b-remaining-register.json')['rows']
originals = {q['id']: q for q in read(DATA / 'latest-two.json')['writtenOriginals']}
rows, changes = [], []
for row in register:
    q = copy.deepcopy(originals[row['id']])
    if row['verdict'] == 'FAIL':
        assert canonical(q) == row['candidateSha256'], q['id']
        for finding in row['findings']:
            replacement = finding.get('replacement')
            if replacement is None:
                continue
            for field in finding['field'].split(','):
                target = q
                keys = field.split('.')
                for key in keys[:-1]:
                    target = target[key]
                target[keys[-1]] = replacement
            changes.append({'id': q['id'], **finding})
    rows.append(q)
packet = {'sourceCommit': 'c926248a5', 'expectedIds': [r['id'] for r in register],
          'writtenOriginals': rows, 'bindings': [{'id': q['id'], 'candidateSha256': canonical(q)} for q in rows]}
(QA / 'lq1c-candidates.json').write_text(json.dumps(packet, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
(QA / 'lq1c-initial-repairs.json').write_text(json.dumps(changes, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
for name, verdicts in [('unreviewed', {'NOT_REVIEWED'}), ('repaired', {'FAIL', 'HOLD', 'REFERENCE'})]:
    ids = [r['id'] for r in register if r['verdict'] in verdicts]
    (QA / f'lq1c-{name}-ids.json').write_text(json.dumps(ids, indent=2)+'\n', encoding='utf-8')
print(json.dumps({'candidates': len(rows), 'explicitRepairs': len(changes)}))
