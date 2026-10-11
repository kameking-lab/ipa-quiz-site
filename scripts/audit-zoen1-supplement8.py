from pathlib import Path
import hashlib,json,re,sys,subprocess,unicodedata
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
from extract_zoen1_pilot import extract
GIT='C:/Program Files/Git/cmd/git.exe';BASE='84409046b4e0bbd05b55082fd1b97abf4bf316c3'
source=json.loads((ROOT/'data/questions/zoen1/2026-september-supplement8.json').read_text(encoding='utf-8'))
official=json.loads((ROOT/'reports/zoen1-20260927/official-answers.json').read_text(encoding='utf-8'))['answers']
tree=subprocess.check_output([GIT,'ls-tree','-r',BASE,'data/questions'],cwd=ROOT,text=True).splitlines()
prior=[(row.split()[2],row.split('\t',1)[1]) for row in tree if row.endswith('.json')]
hashes=subprocess.check_output([GIT,'hash-object','--stdin-paths'],cwd=ROOT,input=''.join(path+'\n' for _,path in prior),text=True).splitlines()
assert hashes==[sha for sha,_ in prior], 'Prior JSON modified/deleted'
seen=set()
for name in ['2026-september.json','2026-september-supplement5.json','2026-september-supplement6.json','2026-september-supplement7.json']:
 old=json.loads((ROOT/'data/questions/zoen1'/name).read_text(encoding='utf-8'))
 seen.update((paper['session'],q['number']) for paper in old['papers'] for q in paper['questions'])
def norm(s):return re.sub(r'\s','',unicodedata.normalize('NFKC',s))
for paper in source['papers']:
 session=paper['session'];numbers=[q['number'] for q in paper['questions']]
 assert numbers==([25,26,32,33] if session=='mondai-a' else [9])
 raw=extract(session,[n for n in numbers if n!=26]);items={q['number']:q for q in raw['questions']}
 assert paper['publishedCount']==len(numbers)
 assert paper['questionSha256']==raw['questionPdfSha256']
 for q in paper['questions']:
  n=q['number'];assert (session,n) not in seen;seen.add((session,n))
  assert q['officialAnswerNumbers']==official[session][n-1]
  assert len(q['choices'])==len(q['choiceExplanations'])==4 and len(set(q['choiceExplanations']))==4
  assert all(x.strip() for x in q['choiceExplanations']) and q['officialReferenceUrls']
  if n!=26:
   assert q['pdfPage']==items[n]['pdfPage']
   assert norm(q['question'])==norm(items[n]['question'])
   assert [norm(x) for x in q['choices']]==[norm(x) for x in items[n]['choices']]
  else:
   text=(ROOT/'docs/evidence/zoen1-2026/zoen1-2026-a-extract.txt').read_text(encoding='utf-8')
   block=re.search(r'〔問題\s*26〕(.*?)\(1',text,re.S)[1]
   stem=block.split('（Ａ）')[0] if '（Ａ）' in block else block
   assert norm(q['question']) in norm(block), (q['question'],block)
   assert q['choices']==['図（1）／陸屋根','図（2）／越屋根','図（3）／寄棟屋根','図（4）／切妻屋根']
   assert q['pdfPage']==11 and q['imageUrls']
assert len(seen)==45
assert hashlib.sha256((ROOT/'public/images/questions/zoen1/2026-september-a-q26-diagram.png').read_bytes()).hexdigest()=='ca530cdf05fdf498e300385d2f1d40a3b13e7c0959220ea17ca7f00b520acbfa'
assert source['answerSha256']==hashlib.sha256((ROOT/'docs/evidence/zoen1-2026/input/zoen1-2026-answers.pdf').read_bytes()).hexdigest()
print(json.dumps({'result':'PASS','newOriginals':5,'newReasons':20,'combinedOriginals':45,'priorJsonCount':len(prior),'priorJsonChangesOrDeletions':0,'transcription':'PASS','officialAnswers':'PASS','dedup':'PASS','figureHash':'PASS'}))
