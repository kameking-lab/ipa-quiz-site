import pymupdf as fitz,json,re,hashlib
from pathlib import Path
out=Path('reports/sekou-2denki')
for y in ['07','08']:
 path=Path('/tmp/srcpdf/sekou-2denki')/f'r{y}_2dg{ "z" if y=="08" else ""}_mondai.pdf'
 d=fitz.open(path); pages=[]
 for pi,p in enumerate(d):
  spans=[s for b in p.get_text('dict')['blocks'] for l in b.get('lines',[]) for s in l['spans'] if s['size']>=6 and s['bbox'][1]<770]
  groups=[]
  for s in sorted(spans,key=lambda s:(s['bbox'][1],s['bbox'][0])):
   g=next((g for g in groups if abs(g['y']-s['bbox'][1])<3),None)
   if g is None:g={'y':s['bbox'][1],'s':[]};groups.append(g)
   g['s'].append(s)
  pages.append({'page':pi+1,'lines':[{'y':round(g['y'],2),'text':''.join(s['text'] for s in sorted(g['s'],key=lambda s:s['bbox'][0]))} for g in groups]})
 (out/f'r{y}-extract.json').write_text(json.dumps({'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'pages':pages},ensure_ascii=False,indent=2)+'\n')
 Path(f'/tmp/r{y}-clean.txt').write_text('\n'.join(f'=== PAGE {p["page"]} ===\n'+'\n'.join(l['text'] for l in p['lines']) for p in pages))
