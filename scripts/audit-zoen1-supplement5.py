from pathlib import Path
import hashlib,json,re,sys,subprocess
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
from extract_zoen1_pilot import extract
GIT='C:/Program Files/Git/cmd/git.exe'
old='data/questions/zoen1/2026-september.json'
assert subprocess.check_output([GIT,'rev-parse',f'HEAD:{old}'],cwd=ROOT).strip()==subprocess.check_output([GIT,'hash-object','--path',old,old],cwd=ROOT).strip()
source=json.loads((ROOT/'data/questions/zoen1/2026-september-supplement5.json').read_text(encoding='utf-8'))
official=json.loads((ROOT/'reports/zoen1-20260927/official-answers.json').read_text(encoding='utf-8'))
original=json.loads((ROOT/old).read_text(encoding='utf-8'))
seen={(p['session'],q['number']) for p in original['papers'] for q in p['questions']}
def norm(s):return re.sub(r'\s+','',s).replace('³','')
for p in source['papers']:
 s=p['session'];ns=[q['number'] for q in p['questions']]
 assert ns==([21,24] if s=='mondai-a' else [5,6,8])
 assert p['publishedCount']==len(ns)
 extracted=extract(s,ns)
 assert p['questionSha256']==extracted['questionPdfSha256']
 for q,raw in zip(p['questions'],extracted['questions'],strict=True):
  assert (s,q['number']) not in seen;seen.add((s,q['number']))
  assert q['pdfPage']==raw['pdfPage']
  assert q['officialAnswerNumbers']==official['answers'][s][q['number']-1]
  assert len(q['choices'])==len(q['choiceExplanations'])==4
  assert all(x.strip() for x in q['choiceExplanations'])
  assert len(set(q['choiceExplanations']))==4
  assert q['officialReferenceUrls']
  if s=='mondai-b' and q['number']==8:
   table=re.search(r'\| 測定値 \|(.+)\|',q['question']).group(1)
   assert [int(x) for x in table.split('|') if x.strip()]==[19,26,29,18,19,27,19,29,20,24]
   assert [re.findall(r'\d+',c) for c in q['choices']]==[['11','19'],['11','23'],['22','19'],['22','23']]
   assert '統計量（Ａ）：R（レンジ）' in q['question'] and '統計量（Ｂ）：Mo（モード）' in q['question']
  else:
   assert norm(q['question'])==norm(raw['question'])
   assert [norm(c) for c in q['choices']]==[norm(c) for c in raw['choices']]
assert len(seen)==29
assert source['answerSha256']==hashlib.sha256((ROOT/'docs/evidence/zoen1-2026/input/zoen1-2026-answers.pdf').read_bytes()).hexdigest()
print(json.dumps({'result':'PASS','originalsAdded':5,'choiceReasonsAdded':20,'totalOriginals':29,'oldJsonBytesUnchanged':True,'dedup':'PASS','officialSourceAndAnswers':'PASS'},indent=2))
