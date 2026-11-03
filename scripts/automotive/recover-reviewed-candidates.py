"""Join existing content receipts by original ID; never infer acceptance from needsReview."""
import copy
import hashlib
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BASE = Path('C:/Users/kanet/Documents/Codex/2026-10-23')
DATA = ROOT / 'data/qualification-staging/automotive/latest-two'
OUT = ROOT / 'data/questions/automotive'
OUT.mkdir(parents=True, exist_ok=True)
EVIDENCE = DATA / 'qa/lq1b-recovered-evidence'
EVIDENCE.mkdir(exist_ok=True)

def read(p):
    return json.loads(Path(p).read_text(encoding='utf-8'))

def digest(p):
    return hashlib.sha256(Path(p).read_bytes()).hexdigest()

def canonical(q):
    return hashlib.sha256(json.dumps(q, ensure_ascii=False, separators=(',', ':')).encode()).hexdigest()

originals = read(DATA / 'latest-two.json')['writtenOriginals']
baseline = {q['id']: q for q in originals}
accepted = {}
ledger = {}

def add(q, evidence):
    q = copy.deepcopy(q)
    assert q['id'] in baseline, q['id']
    original = baseline[q['id']]
    for key in ['qNumber', 'answer', 'officialAnswerNumber', 'subject', 'fiscalYear', 'term', 'sourcePdfUrl', 'sourceAnswerUrl']:
        assert q.get(key) == original.get(key), (q['id'], key)
    assert q['officialQuestionStatus'] == 'normal'
    assert len(q['choices']) == 4 and len(q['choiceExplanations']) == 4
    evidence = Path(evidence)
    sha = digest(evidence)
    target = EVIDENCE / (sha[:12] + '-' + evidence.name)
    if not target.exists():
        shutil.copyfile(evidence, target)
    if q['id'] in accepted:
        assert canonical(accepted[q['id']]) == canonical(q), ('conflicting accepted versions', q['id'])
    accepted[q['id']] = q
    ledger[q['id']] = {'id': q['id'], 'candidateSha256': canonical(q),
                       'evidencePath': str(target.relative_to(ROOT)).replace('\\', '/'),
                       'evidenceSha256': sha, 'originalEvidencePath': str(evidence)}

# Final task-4 packets; avoid older batch/history snapshots.
for p in sorted((BASE / 'task-4').glob('automotive-*/ACCEPTED-ONLY.json')):
    for q in read(p)['writtenOriginals']:
        add(q, p)
p = BASE / 'task-4/automotive-20261023-3chassis/batch02-2025second/ACCEPTED-ONLY.json'
for q in read(p)['writtenOriginals']:
    add(q, p)

# Task-5 receipts have original records plus a separate, sparse corrections file.
for directory in ['automotive-3-engine-review', 'automotive-body-2026-review']:
    for p in sorted((BASE / 'task-5' / directory).glob('*.receipt.json')):
        repairs = {r['id']: r['manuscript'] for r in read(p.with_name(p.name.replace('.receipt.json', '.accepted-candidates.json')))['rows']}
        for row in read(p)['rows']:
            if row['status'] not in ('ACCEPT', 'ACCEPT_WITH_REPAIR'):
                continue
            q = repairs.get(row['id'], baseline[row['id']])
            assert canonical(q) == row['candidateManuscriptSha256'], ('receipt hash', row['id'])
            add(q, p)

p = BASE / 'task-13/packet-A-acceptance/ACCEPTED-ONLY.json'
for q in read(p):
    add(q, p)
p = BASE / 'task-12/packet-B-acceptance/REVIEW-DECISIONS.json'
for row in read(p)['questions']:
    if row['status'] == 'PASS':
        q = copy.deepcopy(baseline[row['id']])
        assert row['questionText'] == q['question']
        for choice in row['choicesAndReasons']:
            assert choice['questionChoice'] == q['choices'][choice['label']]
            q['choiceExplanations'][choice['label']] = choice['reviewedReason']
        add(q, p)
p = BASE / 'task-18/output/gasoline-residual9-20261023/ACCEPTED-ONLY.json'
for q in read(p)['writtenOriginals']:
    add(q, p)
p = BASE / 'task-5/output/automotive-forward-20261023/retained-3motorcycle30/ACCEPTED-ONLY.json'
for q in read(p)['writtenOriginals']:
    add(q, p)
p = BASE / 'task-22/output/repair-delta-review-20261023/CONSOLIDATED-DELTA-RECEIPT.json'
delta = read(p)
corrections = read(BASE / 'task-5/output/automotive-forward-20261023/retained-3motorcycle30/CANDIDATE-CORRECTIONS.json')
for row in corrections['rows']:
    assert row['id'] in delta['automotiveAcceptedIds']
    assert canonical(row['manuscript']) == row['afterSha256']
    add(row['manuscript'], p)

# Fixed 76-question consumer candidates preserve all final later delta decisions.
fixed = BASE / 'task-a0684075-2efd-4328-a001-30da8fe8b8c5'
for row in read(fixed / 'inputs/candidate-bindings.json'):
    p = fixed / row['candidatePath']
    assert digest(p) == row['candidateFileSha256']
    q = read(p)
    add(q, fixed / row['packetPath'])

old = Path('C:/Users/kanet/Documents/Codex/2026-10-20/task-6/integration-candidate/data/qualification-staging/automotive/local-review-20261020/2025-second-2-chassis')
confirmed = set(read(old / 'DISPOSITION.json')['locallyConfirmedIds'])
for q in read(old / 'CANDIDATE.json')['writtenOriginals']:
    if q['id'] in confirmed:
        add(q, old / 'review/revision01/RESULT.json')

rows = [accepted[q['id']] for q in originals if q['id'] in accepted]
assert len(rows) == 385, len(rows)
# The consolidated delta receipt points to these files; preserve its whole proof chain.
for key in ('automotiveReceipt', 'automotiveUnchangedFields'):
    pointer = delta[key]
    p = Path(pointer['path'])
    sha = digest(p)
    assert sha == pointer['sha256']
    target = EVIDENCE / (sha[:12] + '-' + p.name)
    shutil.copyfile(p, target)
    for id in delta['automotiveAcceptedIds']:
        ledger[id].setdefault('supportingEvidence', []).append({
            'path': str(target.relative_to(ROOT)).replace('\\', '/'), 'sha256': sha})
(OUT / 'reviewed.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
result = {'sourceHead': '6f4253b9381e3030863e38dfe75b5ca4068ba526',
          'ownerDecision': '2026-11-04 01:30: 今ダッシュボードに出ている資格は全て権利問題ないので止めるな',
          'storedOriginals': 610, 'recoveredReviewedOriginals': len(rows),
          'notYetReleasedIds': [q['id'] for q in originals if q['id'] not in accepted],
          'rows': [ledger[q['id']] for q in rows]}
(DATA / 'qa/lq1b-recovery-ledger.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'recovered': len(rows), 'notYetReleased': len(originals)-len(rows)}))
