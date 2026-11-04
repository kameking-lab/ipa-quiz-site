"""Render/OCR supplied PDFs locally; output is explicitly an UNREVIEWED candidate.
Requires PyMuPDF 2.1, Pillow 13.0 and tesserocr 2.12.0, Japanese tessdata_best.
Set KEIRYOSHI75_TESSDATA to its directory (default /tmp/keiryoshi75-tessdata).
Set KEIRYOSHI75_WORK to the cache directory (default /tmp/keiryoshi75-work).
Run from repository root. Never changes source-packs or question JSON.
"""
import os
os.environ['OMP_THREAD_LIMIT']='1'
import pymupdf,json,hashlib,time
from pathlib import Path
from PIL import Image,ImageChops
from concurrent.futures import ProcessPoolExecutor
import tesserocr
ROOT=Path(os.environ.get('KEIRYOSHI75_WORK','/tmp/keiryoshi75-work'));ROOT.mkdir(exist_ok=True)
MAN=json.loads(Path('docs/evidence/keiryoshi-75/source-manifest.json').read_text())

def run(task):
 f,subject,q=task
 key=f'{f.split("_")[0]}-{q:02d}'
 result=ROOT/(key+'.json')
 source=next(m for m in MAN if m['file']==f)
 if result.exists():
  cached=json.loads(result.read_text())
  if cached.get('sourceSha256')==source['sha256']:return key
 d=pymupdf.open('data/raw_pdfs/keiryoshi/r06-75/'+f);p=d[q]
 pix=p.get_pixmap(matrix=pymupdf.Matrix(2.5,2.5),alpha=False)
 im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
 im.save(ROOT/(key+'.png'))
 # Preserve all content within the question region, including outlined glyphs and figures.
 region=(0,round(im.height*.055),im.width,round(im.height*.91))
 ink=ImageChops.difference(im.crop(region).convert('L'),Image.new('L',(region[2],region[3]-region[1]),255))
 box=ink.point(lambda x:255 if x>15 else 0).getbbox()
 box=(max(0,box[0]-15),max(region[1],box[1]+region[1]-15),min(im.width,box[2]+15),min(region[3],box[3]+region[1]+15))
 crop=im.crop(box);crop.save(ROOT/(key+'-crop.png'))
 # Every non-white question-region pixel must lie in the conservative crop.
 mask=ink.copy();mask.paste(0,(box[0],box[1]-region[1],box[2],box[3]-region[1]))
 assert not mask.point(lambda x:255 if x>15 else 0).getbbox(),key
 with tesserocr.PyTessBaseAPI(path=os.environ.get('KEIRYOSHI75_TESSDATA','/tmp/keiryoshi75-tessdata'),lang='jpn',psm=3) as a:
  a.SetImage(crop);txt=a.GetUTF8Text();conf=a.MeanTextConf()
 out=dict(sourceSha256=source['sha256'],sourcePdfUrl=source['source_url'],pixelThreshold='grayscale < 240',imageObjects=[dict(bbox=list(i['bbox']),width=i['width'],height=i['height']) for i in p.get_image_info()],vectorPathCount=len(p.get_drawings()),subject=subject,qNumber=q,pdfPage=q+1,sourceFile=f,renderScale=2.5,renderSize=list(im.size),candidateCropPx=list(box),candidateCropSha256=hashlib.sha256((ROOT/(key+'-crop.png')).read_bytes()).hexdigest(),candidateCropPixelContainment=True,ocrText=txt,ocrConfidence=conf,status='ocr-candidate-awaiting-visual-transcription-and-figure-classification')
 result.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
 return key
if __name__=='__main__':
 for m in MAN:
  assert hashlib.sha256(Path('data/raw_pdfs/keiryoshi/r06-75',m['file']).read_bytes()).hexdigest()==m['sha256'],m['file']
 tasks=[(m['file'],m['subject'],q) for m in MAN if m['kind']=='問題' for q in range(1,26)]
 with ProcessPoolExecutor(max_workers=4) as pool:
  for i,key in enumerate(pool.map(run,tasks),1): print(i,key,flush=True)
 rows=[json.loads(p.read_text()) for p in sorted(ROOT.glob('*.json'))]
 Path('docs/evidence/keiryoshi-75/ocr-candidates.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
