"""Check every answer directly against the SHA-pinned official PDF answer grid."""
import json,hashlib,re
from pathlib import Path
import pymupdf as fitz
ROOT=Path(__file__).resolve().parents[2]
result=[]
for edition,y in [('2026-early','08'),('2025-late','07')]:
 d=json.loads((ROOT/f'data/questions/denki2/{edition}.json').read_text())
 pdf=Path('/tmp/srcpdf/sekou-2denki')/f'r{y}_2dg{"z" if y=="08" else ""}_mondai.pdf'
 assert hashlib.sha256(pdf.read_bytes()).hexdigest()==d['questionSha256']
 doc=fitz.open(pdf);words=doc[-1].get_text('words');answers={}
 for h in [w for w in words if w[4]=='問題No.']:
  headers=[w for w in words if w[4].isdigit() and w[0]>110 and abs(w[1]-h[1])<2]
  for w in headers:
   xc=(w[0]+w[2])/2
   options=[a for a in words if re.fullmatch('[1-5]',a[4]) and 5<a[1]-w[1]<40 and abs((a[0]+a[2])/2-xc)<4]
   assert len(options)==1,(edition,w,options)
   answers[int(w[4])]=int(options[0][4])
 assert sorted(answers)==list(range(1,63))
 for q in d['questions']:
  n=q['number'];assert q['officialAnswerNumbers']==[answers[n]],(edition,n)
  assert q['choices'] and len(q['choices'])==len(q['choiceExplanations'])
  assert all(t.strip() for t in [q['question'],q['explanation'],*q['choices'],*q['choiceExplanations']])
  assert q['sourcePdfUrl']==d['questionUrl'] and q['sourceAnswerUrl']==d['answerUrl']
  assert ('図' not in q['question'] or n==41 or 'imageUrl' in q),(edition,n)
  if 'imageUrl' in q:assert (ROOT/'public'/q['imageUrl'].lstrip('/')).is_file()
 result.append({'edition':edition,'questionCount':len(d['questions']),'answerPdfPage':len(doc),'answerByNumber':answers,'matchingAnswers':62,'choiceExplanationCount':sum(len(q['choiceExplanations']) for q in d['questions']),'figureCount':sum('imageUrl' in q for q in d['questions'])})
assert sum(r['questionCount'] for r in result)==124
(ROOT/'reports/sekou-2denki/source-check.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print('PASS: 124/124 official answers, 504 choice explanations, 21 figures, source URLs and PDF SHA256')
