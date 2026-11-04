"""Reproduce the 200-question typography candidate inventory (run from repo root).
Requires PyMuPDF. This is a heuristic inventory, not an automatic fidelity verdict.
Coordinates are PDF points relative to CropBox. Source PDFs are local originals.
Human dispositions are recorded separately in typography-review.json.
"""
import pymupdf as fitz, json, re, unicodedata as ud, hashlib
from pathlib import Path
from collections import Counter
evidence=Path(__file__).resolve().parent
out=[]
def norm(s):return re.sub(r'[\s_{}^]+','',ud.normalize('NFKC',s)).replace('−','-').replace('－','-')
for f in sorted(Path('data/questions/keiryoshi').glob('2025-*.json')):
 qs=json.loads(f.read_text()); doc=fitz.open('data/raw_pdfs/keiryoshi/'+Path(qs[0]['sourcePdfUrl']).name)
 for q in qs:
  p=doc[q['qNumber']]; chars=[];bold=[];shift=[];under=[];small=[];dots=[]
  for b in p.get_text('rawdict')['blocks']:
   for l in b.get('lines',[]):
    for s in l['spans']:
     text=''.join(c['c'] for c in s['chars'])
     if text.strip() and (s['size']<10.5 or s['flags'] & 1):small.append(dict(text=text,size=round(s['size'],3),flags=s['flags'],bbox=list(s['bbox'])))
     if (re.search(r'Bold|Gothic',s['font'],re.I) or s['flags'] & 16) and text.strip() and not re.fullmatch(r'[\s問\d１２３４５1-5]+',text):bold.append(text)
     for c in s['chars']:
      if 40<c['bbox'][1]<740:chars.append(dict(c,size=s['size'],font=s['font'],flags=s['flags']))
  for d in p.get_drawings():
   r=d['rect']
   if 0<r.width<3 and 0<r.height<3 and 40<r.y0<740:dots.append(list(r))
   if 1<r.width and r.height<1.5 and 40<r.y0<740:
    cs=[c for c in chars if r.x0-.5<(c['bbox'][0]+c['bbox'][2])/2<r.x1+.5 and -1.5<r.y0-c['bbox'][3]<4]
    if cs:under.append(dict(text=''.join(c['c'] for c in sorted(cs,key=lambda c:c['bbox'][0])),bbox=list(r)))
  # Smaller adjacent glyphs with a changed baseline: subscripts, exponents, unit powers, labels.
  for c in chars:
   if not c['c'].strip():continue
   bases=[a for a in chars if a['c'].strip() and a['size']>c['size']*1.12 and -4<c['bbox'][0]-a['bbox'][2]<6 and 1<abs(c['origin'][1]-a['origin'][1])<a['size']*.9]
   if bases:
    a=min(bases,key=lambda a:abs(c['bbox'][0]-a['bbox'][2]))
    token=a['c']+c['c']
    shift.append(dict(token=token,kind='sub' if c['origin'][1]>a['origin'][1] else 'super',bbox=[*a['bbox'],*c['bbox']]))
  text=q['question']+'\n'+'\n'.join(q['choices'].values())
  unique=list(dict.fromkeys((c['token'],c['kind']) for c in shift))
  out.append(dict(subject=q['subject'],qNumber=q['qNumber'],pdfPage=q['qNumber']+1,source=f.name,bold=list(dict.fromkeys(bold)),underlines=under,shifted=[dict(token=t,kind=k,inData=norm(t) in norm(text)) for t,k in unique],pdfText=p.get_text(sort=True),dataText=text,smallOrRaisedSpans=small,smallDrawingCandidates=dots,asciiScriptCandidates=re.findall(r'[A-Za-zΑ-ω] +[a-z0-9]{1,3}(?=[^A-Za-z0-9]|$)|[A-Za-zΑ-ω][0-9]+|[0-9]+(?:H|He)(?![A-Za-z])',text),sourcePdfSha256=hashlib.sha256(Path(doc.name).read_bytes()).hexdigest(),questionDataSha256=hashlib.sha256(f.read_bytes()).hexdigest()))
assert len(out)==200
assert len({(r['subject'],r['qNumber']) for r in out})==200
summary=dict(sourceQuestions=200,subjects=8,questionsPerSubject=25,
 shiftedGlyphCandidateQuestions=sum(bool(r['shifted']) for r in out),
 lineCandidateQuestions=sum(bool(r['underlines']) for r in out),
 boldOrGothicCandidateQuestions=sum(bool(r['bold']) for r in out),
 smallOrRaisedSpanQuestions=sum(bool(r['smallOrRaisedSpans']) for r in out),
 tool='PyMuPDF '+fitz.VersionBind,
 method='All 200 pages: text glyph positions/font sizes/baselines; thin vector lines/rectangles; bold/Gothic fonts; small drawings; ASCII formula candidates. Compare to question and all five choices.',
 limits='Candidates include fraction bars, blank rules, table borders, diagram labels and PDF mapping errors. Embedded raster text is not OCRed; figures and ambiguous candidates require visual review. Normalized token presence alone does not validate typography or semantics.')
result=dict(summary=summary,questions=out)
(evidence/'typography-scan.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(summary,ensure_ascii=False,indent=2))
