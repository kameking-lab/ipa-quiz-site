"""Add independently passed LQ1C candidates to the existing release by exact hash.

Usage: python scripts/automotive/accept-lq1c.py <review.json> [...]
The frozen 85-ID register remains the scope; failed or unresolved rows never enter grading.
"""
import copy
import hashlib
import json
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
QA = ROOT / 'data/qualification-staging/automotive/latest-two/qa'
OUT = ROOT / 'data/questions/automotive'

def read(path):
    return json.loads(path.read_text(encoding='utf-8'))

def canonical(q):
    return hashlib.sha256(json.dumps(q, ensure_ascii=False, separators=(',', ':')).encode()).hexdigest()

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

packet = read(QA / 'lq1c-candidates.json')
candidates = {q['id']: q for q in packet['writtenOriginals']}
bindings = {r['id']: r['candidateSha256'] for r in packet['bindings']}
scope = read(QA / 'lq1b-remaining-register.json')['rows']
assert len(candidates) == len(scope) == 85
assert set(candidates) == {r['id'] for r in scope} == set(packet['expectedIds'])
assert all(canonical(q) == bindings[id] for id, q in candidates.items())
originals = read(QA.parent / 'latest-two.json')['writtenOriginals']
baseline = {q['id']: q for q in originals}
release = {q['id']: q for q in read(OUT / 'reviewed.json')}
ledger_path = QA / 'lq1b-recovery-ledger.json'
ledger = read(ledger_path)
receipts = {r['id']: r for r in ledger['rows']}
decisions = {}
previous = QA / 'lq1c-progress.json'
if previous.exists():
    decisions = {r['id']: r for r in read(previous)['rows']}

for argument in sys.argv[1:]:
    evidence = Path(argument).resolve()
    report = read(evidence)
    assert report['model'] == 'gpt-6-astra', evidence
    assert len({r['id'] for r in report['rows']}) == len(report['rows']), evidence
    sha = digest(evidence)
    target = QA / 'lq1b-recovered-evidence' / (sha[:12] + '-' + evidence.name)
    if not target.exists():
        shutil.copyfile(evidence, target)
    for row in report['rows']:
        id = row['id']
        assert id in candidates, id
        q = candidates[id]
        assert canonical(q) == row['candidateSha256'], ('reviewed candidate differs', id)
        decisions[id] = {**row, 'evidencePath': target.relative_to(ROOT).as_posix(), 'evidenceSha256': sha}
        if row['verdict'] != 'PASS':
            # A later independent decision can revoke a provisional earlier PASS.
            release.pop(id, None)
            receipts.pop(id, None)
            continue
        assert row['answerChecked'] and row['allFourExplanationsChecked'], id
        assert set(q['sourcePages']).issubset(row['sourcePagesChecked']), id
        assert q['officialQuestionStatus'] == 'normal' and not q['needsReview'], id
        for key in ['qNumber', 'answer', 'officialAnswerNumber', 'subject', 'fiscalYear', 'term', 'sourcePdfUrl', 'sourceAnswerUrl']:
            assert q[key] == baseline[id][key], (id, key)
        assert len(q['choices']) == len(q['choiceExplanations']) == 4, id
        if id in release:
            assert canonical(release[id]) == canonical(q), ('conflicting accepted candidate', id)
        release[id] = copy.deepcopy(q)
        receipts[id] = {'id': id, 'candidateSha256': canonical(q),
                        'evidencePath': target.relative_to(ROOT).as_posix(),
                        'evidenceSha256': sha, 'originalEvidencePath': str(evidence)}

ordered = [release[q['id']] for q in originals if q['id'] in release]
ledger.update({'releaseOriginals': len(ordered), 'newIndependentAcceptedOriginals': len(ordered)-385,
               'notYetReleasedIds': [q['id'] for q in originals if q['id'] not in release],
               'rows': [receipts[q['id']] for q in ordered]})
progress = {'scopeOriginals': 85, 'newGradableOriginals': len(set(release) & set(candidates)),
            'referenceIds': [r['id'] for r in decisions.values() if r['verdict'] == 'REFERENCE'],
            'remainingIds': [id for id in candidates if id not in release and decisions.get(id, {}).get('verdict') != 'REFERENCE'],
            'rows': [decisions[id] for id in candidates if id in decisions]}
for path, value in [(OUT/'reviewed.json', ordered), (ledger_path, ledger), (previous, progress)]:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(json.dumps({k:v for k,v in progress.items() if k != 'rows'}, ensure_ascii=False))
