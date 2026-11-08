from pathlib import Path
import hashlib,json,re,sys,subprocess,unicodedata,math
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
from extract_zoen1_pilot import extract
GIT='C:/Program Files/Git/cmd/git.exe'
BASE='699240af03793bb4f27b9c5bd4090fab71144cae'
source=json.loads((ROOT/'data/questions/zoen1/2026-september-supplement7.json').read_text(encoding='utf-8'))
official=json.loads((ROOT/'reports/zoen1-20260927/official-answers.json').read_text(encoding='utf-8'))['answers']
paths=subprocess.check_output([GIT,'ls-tree','-r','--name-only',BASE,'data/questions'],cwd=ROOT,text=True).splitlines()
prior=[x for x in paths if x.endswith('.json')]
for path in prior:
 assert subprocess.check_output([GIT,'rev-parse',BASE+':'+path],cwd=ROOT).strip()==subprocess.check_output([GIT,'hash-object','--path',path,path],cwd=ROOT).strip(),path
seen=set()
for name in ['2026-september.json','2026-september-supplement5.json','2026-september-supplement6.json']:
 old=json.loads((ROOT/'data/questions/zoen1'/name).read_text(encoding='utf-8'))
 seen.update((p['session'],q['number']) for p in old['papers'] for q in p['questions'])
def norm(s):return re.sub(r'[\s/／―]','',unicodedata.normalize('NFKC',s.replace('²','').replace('³','')))
for p in source['papers']:
 s=p['session'];ns=[q['number'] for q in p['questions']]
 assert ns==([23,31] if s=='mondai-a' else [1,4,10])
 assert p['publishedCount']==len(ns)
 raw=extract(s,[n for n in ns if n not in ([31] if s=='mondai-a' else [4])]);by_number={q['number']:q for q in raw['questions']}
 assert p['questionSha256']==raw['questionPdfSha256']
 text=(ROOT/f'docs/evidence/zoen1-2026/zoen1-2026-{s[-1]}-extract.txt').read_text(encoding='utf-8')
 for q in p['questions']:
  n=q['number'];assert (s,n) not in seen;seen.add((s,n))
  assert q['officialAnswerNumbers']==official[s][n-1]
  assert len(q['choices'])==len(q['choiceExplanations'])==4 and all(x.strip() for x in q['choiceExplanations']) and len(set(q['choiceExplanations']))==4
  assert q['officialReferenceUrls']
  if n in by_number:
   t=by_number[n];assert q['pdfPage']==t['pdfPage']
   if s=='mondai-b' and n==10:
    assert norm(q['question'].split('\n\n')[0])==norm(t['question'].split(' 試験結果試験項目')[0])
    for row in ['| 圧縮強度（N/mm²） | 19.5 | 21.0 | 23.0 |','| スランプ（cm） | 15.0 | 12.5 | 13.5 |','| 塩化物含有量（Cl⁻量として）（kg/m³） | 0.25 | 0.28 | 0.23 |','| 空気量（％） | 5.9 | 4.5 | 3.3 |']:assert row in q['question']
   else:assert norm(q['question'])==norm(t['question'])
   assert [norm(x) for x in q['choices']]==[norm(x) for x in t['choices']]
  else:
   match=re.search(r'〔問題\s*'+str(n)+r'〕(.*?)\(1',text,re.S)
   assert norm(q['question'])==norm(match[1])
   assert q['choices']==['図（1）','図（2）','図（3）','図（4）'] and q['imageUrls']
assert len(seen)==40
# B1: independent precedence/duration/people-day check of a ten-day witness.
jobs={'A':(0,1,2),'B':(0,3,4),'C':(1,2,2),'D':(5,4,3),'E':(3,5,3),'F':(3,2,3),'G':(8,1,2),'H':(8,2,1)}
dependencies={'D':['A','B'],'E':['B'],'F':['C'],'G':['E'],'H':['E','F']}
for job,preds in dependencies.items():
 for pred in preds:assert jobs[job][0]>=jobs[pred][0]+jobs[pred][1]
assert sum(duration*people for _,duration,people in jobs.values())==55
daily=[sum(people for start,duration,people in jobs.values() if start<=day<start+duration) for day in range(10)]
assert daily==[6,6,6,6,6,6,6,6,6,1] and max(daily)==math.ceil(55/10)==6
assert 3+5+2==10
# B10: each result and the three-test average are evaluated independently.
strength=[19.5,21,23];slump=[15,12.5,13.5];chloride=[.25,.28,.23];air=[5.9,4.5,3.3]
assert all(x>=21*.85 for x in strength) and sum(strength)/3>=21
assert [9.5<=x<=14.5 for x in slump]==[False,True,True]
assert all(x<=.30 for x in chloride) and all(3<=x<=6 for x in air)
assert hashlib.sha256((ROOT/'public/images/questions/zoen1/2026-september-a-q31-diagram.png').read_bytes()).hexdigest()=='18b72f88930e2df981dee6b5842909e3189d7d88000727ff9a61723fa89a7d4d'
assert hashlib.sha256((ROOT/'public/images/questions/zoen1/2026-september-b-q1-diagram.png').read_bytes()).hexdigest()=='322ab7ab75789d8e3324d98b7aebde1461dda4f98e86ee30fd54c5558d6b00fa'
assert hashlib.sha256((ROOT/'public/images/questions/zoen1/2026-september-b-q4-diagram.png').read_bytes()).hexdigest()=='75f4b1389c203217027538f8998d4e62a6bdf323d558aeeb0621f0a8917ad211'
assert source['answerSha256']==hashlib.sha256((ROOT/'docs/evidence/zoen1-2026/input/zoen1-2026-answers.pdf').read_bytes()).hexdigest()
print(json.dumps({'result':'PASS','newOriginals':5,'newReasons':20,'combinedOriginals':40,'priorJsonCount':len(prior),'priorJsonChangesOrDeletions':0,'transcription':'PASS','officialAnswers':'PASS','dedup':'PASS','independentCalculations':'PASS','figureHash':'PASS'}))
