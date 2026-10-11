from pathlib import Path
import json,sys,hashlib,subprocess,re,unicodedata
W=Path(__file__).resolve().parents[1];sys.path.insert(0,str(W/'scripts'))
from extract_zoen1_pilot import extract
GIT='C:/Program Files/Git/cmd/git.exe';BASE='1d826d755842dc6c26e772d216bcf399e7060dea'
tree=subprocess.check_output([GIT,'ls-tree','-r',BASE,'data/questions'],cwd=W,text=True).splitlines()
prior=[(r.split()[2],r.split('\t',1)[1]) for r in tree if r.endswith('.json')]
hashes=subprocess.check_output([GIT,'hash-object','--stdin-paths'],cwd=W,input=''.join(p+'\n' for _,p in prior),text=True).splitlines()
assert hashes==[s for s,_ in prior], 'Prior JSON modified/deleted'
seen=set()
for _,p in prior:
 if p.startswith('data/questions/zoen1/'):
  j=json.loads((W/p).read_text(encoding='utf-8'));seen.update((a['session'],q['number']) for a in j['papers'] for q in a['questions'])
s=json.loads((W/'data/questions/zoen1/2026-september-supplement10.json').read_text(encoding='utf-8'))
official=json.loads((W/'reports/zoen1-20260927/official-answers.json').read_text())['answers']
expected={'mondai-a':[29,35],'mondai-b':[17,18,20,21,22,23]}
def norm(t):return re.sub(r'\s','',unicodedata.normalize('NFKC',t))
for paper in s['papers']:
 session=paper['session'];raw=extract(session,expected[session]);orig={q['number']:q for q in raw['questions']}
 if session=='mondai-b':
  orig[20]['choices'][2]=orig[20]['choices'][2].replace('100 m ','100 m\u00b2 ')
  orig[23]['choices'][3]=orig[23]['choices'][3].split(' \u203b\u554f\u984c24',1)[0]
 assert paper['publishedCount']==len(paper['questions'])
 assert [q['number'] for q in paper['questions']]==expected[session]
 for q in paper['questions']:
  n=q['number'];assert (session,n) not in seen;seen.add((session,n))
  assert q['officialAnswerNumbers']==official[session][n-1]
  assert norm(q['question'])==norm(orig[n]['question'])
  assert [norm(x) for x in q['choices']]==[norm(x) for x in orig[n]['choices']],(session,n)
  assert q['pdfPage']==orig[n]['pdfPage']
  assert len(q['choices'])==len(q['choiceExplanations'])==len(set(q['choiceExplanations']))==4
  assert all(x.strip() for x in q['choiceExplanations']) and q['officialReferenceUrls']
assert len(seen)==58
assert s['answerSha256']==hashlib.sha256((W/'docs/evidence/zoen1-2026/input/zoen1-2026-answers.pdf').read_bytes()).hexdigest()
excerpts=json.loads((W/'docs/evidence/zoen1-2026/LAW-EXCERPTS-SUPPLEMENT10-20261011.json').read_text(encoding='utf-8'))
assert len(excerpts)==16
for r in excerpts:assert r['revision']['amendment_enforcement_date']<='2026-09-06'
checks=[('public-contract-law','15','\u4e0b\u8acb\u5951\u7d04\u3092\u7de0\u7d50\u3057\u305f'),('construction-law','24_8','\u5de5\u4e8b\u73fe\u5834\u3054\u3068\u306b\u5099\u3048\u7f6e'),('construction-regulations','28','\u5341\u5e74\u9593'),('park-law','7','\u4fdd\u80b2\u6240'),('park-decree','12','\u8001\u4eba\u798f\u7949\u30bb\u30f3\u30bf\u30fc'),('green-law','14','\u90fd\u9053\u5e9c\u770c\u77e5\u4e8b\u7b49\u306e\u8a31\u53ef'),('building-law','9','\u5de5\u4e8b\u306e\u8acb\u8ca0\u4eba'),('construction-law','24_4','\u4e8c\u5341\u65e5\u4ee5\u5185'),('labour-law','23','\u4e03\u65e5\u4ee5\u5185')]
for name,article,term in checks:
 rows=[r for r in excerpts if r['name']==name];assert len(rows)==2
 assert all(term in r['articles'][article] for r in rows),(name,article)
print(json.dumps({'result':'PASS','newOriginals':8,'newReasons':32,'combinedOriginals':58,'priorJsonCount':len(prior),'priorJsonChangesOrDeletions':0,'transcription':'PASS','officialAnswers':'PASS','dedup':'PASS','lawDatesAndConditions':'PASS'}))
