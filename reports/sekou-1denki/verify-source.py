"""Recheck every saved stem/choice against non-ruby text in the SHA-pinned PDFs.

Run after finalize-source.py from the repository root. Human-reviewed mathematical,
blank and figure representations are pinned in transcription-review.json. Any new
text difference or changed reviewed representation fails this check.
"""
import hashlib,json,re,unicodedata
from pathlib import Path
import fitz

BASE=Path('reports/sekou-1denki')
def norm(text):
 text=unicodedata.normalize('NFKC',text).replace('−','-').replace('－','-').replace('◯','○')
 return re.sub(r'\s','',text)
def digest(text):return hashlib.sha256(norm(text).encode()).hexdigest()

differences=[];exact=0;total=0
for year in [2026,2025]:
 source=json.loads(Path(f'data/questions/denki1/{year}-annual.json').read_text(encoding='utf8'))
 pdf=Path(f'.cache/sekou-1denki/r{year-2018:02}_1dg_mondai.pdf')
 assert hashlib.sha256(pdf.read_bytes()).hexdigest()==source['questionSha256']
 doc=fitz.open(pdf)
 for question in source['questions']:
  page=doc[question['pdfPage']-1]
  lines=[line for block in page.get_text('dict')['blocks'] for line in block.get('lines',[])]
  anchors=[]
  for line in lines:
   text=''.join(s['text'] for s in line['spans'] if s['size']>6)
   m=re.match(r'〔No\s*．\s*(\d+)\s*〕',text)
   if m and line['bbox'][0]<70:anchors.append((int(m[1]),line['bbox'][1]))
  top=next(y for n,y in anchors if n==question['number'])
  bottom=min([y for n,y in anchors if y>top+2]+[777])
  spans=[s for line in lines for s in line['spans'] if s['size']>6 and top-0.5<=s['bbox'][1]<bottom-0.5]
  text=''.join(s['text'] for s in spans)
  text=re.sub(r'^〔No\s*．\s*\d+\s*〕','',text)
  parts=re.split(r'([1-5])\s*．\s*',text)
  count=len(question['choices'])
  if year==2025 and question['number']==58:
   # First numbered list is the seven conditions, not the five answer choices.
   chunks=re.split(r'([1-5]\s*．\s*)',text)
   parts=[''.join(chunks[:-2*count])]
   for i in range(len(chunks)-2*count,len(chunks),2):parts.extend([str((i-(len(chunks)-2*count))//2+1),chunks[i+1]])
  source_choices=[parts[i+1] for i in range(1,len(parts)-1,2)]
  assert len(source_choices)==count,(year,question['number'],len(source_choices))
  for field,original,saved in [('question',parts[0],question['question'])]+[(f'choice{i+1}',a,b) for i,(a,b) in enumerate(zip(source_choices,question['choices']))]:
   total+=1
   if norm(original)==norm(saved):exact+=1;continue
   differences.append(dict(year=year,number=question['number'],field=field,source=original,saved=saved,sourceNormalizedSha256=digest(original),savedNormalizedSha256=digest(saved)))

reviewed=json.loads((BASE/'transcription-review.json').read_text(encoding='utf8'))
key=lambda d:(d['year'],d['number'],d['field'])
expected={key(d):d for d in reviewed['differences']}
actual={key(d):d for d in differences}
assert actual.keys()==expected.keys(),('Unexpected transcription differences',actual.keys()-expected.keys(),expected.keys()-actual.keys())
for k,d in actual.items():
 assert d['sourceNormalizedSha256']==expected[k]['sourceNormalizedSha256'],('Source representation changed',k)
 assert d['savedNormalizedSha256']==expected[k]['savedNormalizedSha256'],('Reviewed saved text changed',k)
 assert expected[k]['reviewReason']
print(f'Text fields: {total}; exact after spacing/Unicode normalization: {exact}; reviewed representations: {len(differences)}; unreviewed: 0.')
