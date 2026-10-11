from pathlib import Path
import json,sys,hashlib,subprocess,re,unicodedata
W=Path(__file__).resolve().parents[1];sys.path.insert(0,str(W/'scripts'))
from extract_zoen1_pilot import extract
GIT='C:/Program Files/Git/cmd/git.exe';BASE='2a1a18da35bff5d947409ff3ffd2f821c68ee54c'
tree=subprocess.check_output([GIT,'ls-tree','-r',BASE,'data/questions'],cwd=W,text=True).splitlines()
prior=[(r.split()[2],r.split('\t',1)[1]) for r in tree if r.endswith('.json')]
hashes=subprocess.check_output([GIT,'hash-object','--stdin-paths'],cwd=W,input=''.join(p+'\n' for _,p in prior),text=True).splitlines()
assert hashes==[s for s,_ in prior], 'Prior JSON modified/deleted'
seen=set()
for _,p in prior:
 if p.startswith('data/questions/zoen1/'):
  j=json.loads((W/p).read_text(encoding='utf-8'));seen.update((a['session'],q['number']) for a in j['papers'] for q in a['questions'])
s=json.loads((W/'data/questions/zoen1/2026-september-supplement9.json').read_text(encoding='utf-8'))
official=json.loads((W/'reports/zoen1-20260927/official-answers.json').read_text())['answers']
raw=extract('mondai-b',[13,14,15,16,29]);orig={q['number']:q for q in raw['questions']}
def norm(t):return re.sub(r'\s','',unicodedata.normalize('NFKC',t))
for paper in s['papers']:
 assert paper['publishedCount']==len(paper['questions'])
 assert [q['number'] for q in paper['questions']]==([] if paper['session']=='mondai-a' else [13,14,15,16,29])
 for q in paper['questions']:
  n=q['number'];assert ('mondai-b',n) not in seen;seen.add(('mondai-b',n))
  assert q['officialAnswerNumbers']==official['mondai-b'][n-1]
  assert norm(q['question'])==norm(orig[n]['question'])
  assert [norm(x) for x in q['choices']]==[norm(x) for x in orig[n]['choices']]
  assert q['pdfPage']==orig[n]['pdfPage']
  assert len(q['choices'])==len(q['choiceExplanations'])==len(set(q['choiceExplanations']))==4
  assert all(x.strip() for x in q['choiceExplanations']) and q['officialReferenceUrls']
assert len(seen)==50
assert s['answerSha256']==hashlib.sha256((W/'docs/evidence/zoen1-2026/input/zoen1-2026-answers.pdf').read_bytes()).hexdigest()
excerpts=json.loads((W/'docs/evidence/zoen1-2026/SAFETY-LAW-EXCERPTS-20261011.json').read_text(encoding='utf-8'))
assert len(excerpts)==8
for r in excerpts:assert r['revision']['amendment_enforcement_date']<='2026-09-06'
checks=[('osh-regulations','552',['三十五センチメートル以上五十センチメートル以下','十五度を超える']),('osh-regulations','563',['四十センチメートル以上','三センチメートル以下','十センチメートル以上の幅木']),('osh-regulations','36',['機体重量が三トン未満']),('osh-decree','3',['常時五十人以上']),('osh-decree','4',['常時五十人以上']),('osh-decree','5',['常時五十人以上']),('crane-regulations','1',['重量に相当する荷重を控除']),('crane-regulations','74_3',['当該作業を中止'])]
for name,article,terms in checks:
 rows=[r for r in excerpts if r['name']==name];assert len(rows)==2
 for term in terms:assert all(term in r['articles'][article] for r in rows)
print(json.dumps({'result':'PASS','newOriginals':5,'newReasons':20,'combinedOriginals':50,'priorJsonCount':len(prior),'priorJsonChangesOrDeletions':0,'transcription':'PASS','officialAnswers':'PASS','dedup':'PASS','lawDatesAndConditions':'PASS'}))
