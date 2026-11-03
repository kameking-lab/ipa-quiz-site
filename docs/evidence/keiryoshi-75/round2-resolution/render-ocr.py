import os
os.environ['OMP_THREAD_LIMIT']='1'
import json, hashlib
from pathlib import Path
from concurrent.futures import ProcessPoolExecutor
import pymupdf, tesserocr
from PIL import Image
OUT=Path('/tmp/keiryoshi75-round2'); OUT.mkdir(exist_ok=True)
E=Path('docs/evidence/keiryoshi-75/round2-resolution'); E.mkdir(exist_ok=True)
def run(task):
 slug,q=task
 cached=OUT/f'{slug}-q{q["qNumber"]:02d}.json'
 if cached.exists():return json.loads(cached.read_text())
 pdf=Path('data/raw_pdfs/keiryoshi/r06-75')/Path(q['sourcePdfUrl']).name
 page=pymupdf.open(pdf)[q['qNumber']]
 pix=page.get_pixmap(matrix=pymupdf.Matrix(4.1666667,4.1666667),alpha=False)
 im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
 name=f'{slug}-q{q["qNumber"]:02d}'
 im.save(OUT/(name+'.png'))
 with tesserocr.PyTessBaseAPI(path='/tmp/keiryoshi75-tessdata',lang='jpn',psm=3) as api:
  api.SetImage(im); txt=api.GetUTF8Text(); conf=api.MeanTextConf()
 r=dict(subject=slug,qNumber=q['qNumber'],pdf=str(pdf),pdfPage=q['qNumber']+1,sourceSha256=hashlib.sha256(pdf.read_bytes()).hexdigest(),renderDpi=300,renderSha256=hashlib.sha256((OUT/(name+'.png')).read_bytes()).hexdigest(),ocrText=txt,ocrConfidence=conf)
 (OUT/(name+'.json')).write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n')
 return r
if __name__=='__main__':
 tasks=[(p.stem[5:],q) for p in sorted(Path('data/questions/keiryoshi').glob('2024-*.json')) for q in json.loads(p.read_text())]
 with ProcessPoolExecutor(max_workers=2) as pool:
  rows=[]
  for r in pool.map(run,tasks):
   rows.append(r); print(len(rows),r['subject'],r['qNumber'],flush=True)
 (E/'render-ocr.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
