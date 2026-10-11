from pathlib import Path
import hashlib,json,re,sys,subprocess,unicodedata,math
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
from extract_zoen1_pilot import extract
GIT='C:/Program Files/Git/cmd/git.exe'
source=json.loads((ROOT/'data/questions/zoen1/2026-september-supplement6.json').read_text(encoding='utf-8'))
official=json.loads((ROOT/'reports/zoen1-20260927/official-answers.json').read_text(encoding='utf-8'))['answers']
seen=set()
for name in ['2026-september.json','2026-september-supplement5.json']:
 path='data/questions/zoen1/'+name
 assert subprocess.check_output([GIT,'rev-parse','HEAD:'+path],cwd=ROOT).strip()==subprocess.check_output([GIT,'hash-object','--path',path,path],cwd=ROOT).strip()
 old=json.loads((ROOT/path).read_text(encoding='utf-8'))
 seen.update((p['session'],q['number']) for p in old['papers'] for q in p['questions'])
def norm(s):return re.sub(r'[\s/／―]','',unicodedata.normalize('NFKC',s.replace('³','')))
for p in source['papers']:
 s=p['session'];ns=[q['number'] for q in p['questions']]
 assert ns==([36] if s=='mondai-a' else [2,7,11,12,28])
 assert p['publishedCount']==len(ns)
 raw=extract(s,ns);assert p['questionSha256']==raw['questionPdfSha256']
 for q,t in zip(p['questions'],raw['questions'],strict=True):
  assert (s,q['number']) not in seen;seen.add((s,q['number']))
  assert q['pdfPage']==t['pdfPage'] and q['officialAnswerNumbers']==official[s][q['number']-1]
  assert len(q['choices'])==len(q['choiceExplanations'])==4
  assert all(x.strip() for x in q['choiceExplanations']) and len(set(q['choiceExplanations']))==4
  assert q['officialReferenceUrls']
  if s=='mondai-b' and q['number']==28:
   assert norm(q['question'].split('\n\n')[0])==norm(t['question'].split(' 樹種')[0])
   assert '| シラカシ | 4.5 | 0.25 | 1.2 | － |' in q['question']
   assert '| コナラ | 3.0 | 0.15 | － | 3本立 |' in q['question']
  else:assert norm(q['question'])==norm(t['question'])
  assert [norm(c) for c in q['choices']]==[norm(c) for c in t['choices']]
assert len(seen)==35
assert math.ceil(1500/(3*5*(60/30)*0.9*6))==10
edges=[(1,5,4,'A'),(1,2,3,'B'),(1,3,2,'C'),(2,4,2,'D'),(3,7,3,'E'),(5,6,2,'F'),(4,8,2,'G'),(6,8,4,'H'),(7,8,3,'I'),(2,3,0,'dummy'),(4,5,0,'dummy')]
def longest(changes):
 dist={1:0}
 for node in range(2,9):dist[node]=max(dist[a]+changes.get(label,d) for a,b,d,label in edges if b==node)
 return dist[8]
assert (longest({}),longest({'A':2,'D':1,'H':2}))==(11,9)
assert (0.08+0.07+0.05)*0.7<0.15 and (0.09+0.08+0.05)*0.7>=0.15
img=ROOT/'public/images/questions/zoen1/2026-september-a-q36-network.png'
assert hashlib.sha256(img.read_bytes()).hexdigest()=='da1024dc553391df8845a4517dd6d57c95bec8e4be311de7d438655d7feb0834'
assert source['answerSha256']==hashlib.sha256((ROOT/'docs/evidence/zoen1-2026/input/zoen1-2026-answers.pdf').read_bytes()).hexdigest()
print(json.dumps({'result':'PASS','newOriginals':6,'newReasons':24,'combinedOriginals':35,'priorJsonUnchanged':True,'officialTranscription':'PASS','officialAnswers':'PASS','dedup':'PASS','independentCalculations':'PASS','figureHash':'PASS'}))
