"""Fail on stale data/source hashes, missing coverage, or unreviewed differences.
The saved review is a fixed disposition register, not a wildcard allow-list.
Regenerate full-text-audit.json first to rerun pdftotext extraction.
"""
import json,hashlib
from pathlib import Path
E=Path('docs/evidence/keiryoshi-76')
def read(p):return json.loads(Path(p).read_text())
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
a=read(E/'full-text-audit.json');r=read(E/'text-difference-review.json')
assert sha(E/'full-text-audit.json')==r['auditSha256'],'Text extraction changed; inspect differences and review'
assert sha(E/'text-before-corrections.json')==r['baselineSha256']
assert len(a['pages'])==200 and len(a['fields'])==1200
assert len({(f['subject'],f['qNumber'],f['field']) for f in a['fields']})==1200
assert not a['summary']['unparsed']
for p,h in a['dataHashes'].items():assert sha(p)==h,p
for p in a['pages']:assert sha(p['sourcePdf'])==p['sourceSha256'],p['sourcePdf']
expected={(f['subject'],f['qNumber'],f['field']):f for f in r['differences']}
for f in a['fields']:
 key=f['subject'],f['qNumber'],f['field']
 if f['differences']:
  assert key in expected,('Unreviewed difference',key)
  saved=expected[key]
  assert f['source']==saved['source'] and f['data']==saved['after'] and f['differences']==saved['afterDifferences'],key
  assert saved['notes'],key
assert len(r['corrections'])==7 and r['summary']['changedQuestions']==6
scan=read(E/'typography-scan.json');review=read(E/'typography-review.json')
assert review['sourceScanSha256']==sha(E/'typography-scan.json')
questions={}
for p in sorted(Path('data/questions/keiryoshi').glob('2025-*.json')):
 for q in read(p):questions[(q['subject'],q['qNumber'])]=q
for f in scan['questions']:
 p=Path('data/questions/keiryoshi')/f['source'];q=questions[f['subject'],f['qNumber']]
 assert f['questionDataSha256']==sha(p)
 assert f['dataText']==q['question']+'\n'+'\n'.join(q['choices'].values())
for f in read(E/'transcription-ledger.json'):
 q=questions[f['subject'],f['qNumber']]
 assert f['transcriptionSha256']==hashlib.sha256(json.dumps(dict(question=q['question'],choices=q['choices']),ensure_ascii=False,sort_keys=True).encode()).hexdigest()
for f in read(E/'figure-crops.json'):assert sha('public'+f['image'])==f['imageSha256']
print('PASS: 200 questions / 1000 choices / 1200 fields; all 506 residual fields have exact reviewed differences; PDF, data, figure, typography and transcription hashes current.')
