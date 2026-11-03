"""Audit all 36 independently defined official figure regions, then optionally recrop.
Requires Pillow + numpy; Poppler pdftoppm/pdfinfo. Run from repo root.
python3 docs/evidence/keiryoshi-76/figure-pixel-audit.py --recrop
python3 docs/evidence/keiryoshi-76/figure-pixel-audit.py
Regions are MediaBox fractions, selected on full source pages, NOT PNG edges.
Every nonwhite pixel (any RGB channel <245) in each region contributes to its bbox.
A 12-pixel margin is required around that bbox at scale-to 2000.
"""
import subprocess,json,hashlib,re,sys,concurrent.futures
from pathlib import Path
import numpy as np
from PIL import Image,ImageChops
E=Path('docs/evidence/keiryoshi-76');fs=json.loads((E/'figure-crops.json').read_text());cache=Path('/tmp/keiryoshi-pages');cache.mkdir(exist_ok=True)
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def render(f):
 key=Path(f['image']).stem;pdf=Path('data/raw_pdfs/keiryoshi')/Path(f['sourcePdfUrl']).name;p=f['pdfPage'];out=cache/(key+'.png')
 assert sha(pdf)==f['sourceSha256']
 subprocess.run(['pdftoppm','-f',str(p),'-l',str(p),'-singlefile','-scale-to','2000','-png',str(pdf),str(cache/key)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
 return out
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:paths=list(pool.map(render,fs))
results=[]
for f,path in zip(fs,paths):
 im=Image.open(path).convert('RGB');w,h=im.size;frac=f['officialFigureSearchFractions'];roi=[round(v*(w if i%2==0 else h)) for i,v in enumerate(frac)]
 mask=np.asarray(im.crop(roi)).min(axis=2)<245;ys,xs=np.where(mask);assert len(xs)>0
 bbox=[int(xs.min()+roi[0]),int(ys.min()+roi[1]),int(xs.max()+roi[0]+1),int(ys.max()+roi[1]+1)]
 assert min(bbox[0]-roi[0],bbox[1]-roi[1],roi[2]-bbox[2],roi[3]-bbox[3])>=2,(path,'reference region touches ink; inspect/expand')
 padded=[bbox[0]-12,bbox[1]-12,bbox[2]+12,bbox[3]+12]
 dest=Path('public'+f['image'])
 if '--recrop' in sys.argv and 'previousCropAudit' not in f:
  before=dict(imageSha256=sha(dest),size=list(Image.open(dest).size),cropFractions=f.get('cropFractions'),coordinateSpace=f.get('cropCoordinateSpace','CropBox pdftoppm -scale-to 1800' if 'cropFractions' in f else 'checkpoint coordinates not recorded'))
  # Quantify original crop loss in its own raster, using the independently defined source region.
  if f.get('cropFractions'):
   media=f.get('cropCoordinateSpace','').startswith('MediaBox')
   if media:oldpage=im
   else:
    pdf=Path('data/raw_pdfs/keiryoshi')/Path(f['sourcePdfUrl']).name;p=f['pdfPage'];oldpath=cache/(Path(f['image']).stem+'-old')
    subprocess.run(['pdftoppm','-f',str(p),'-l',str(p),'-singlefile','-cropbox','-scale-to','1800','-png',str(pdf),str(oldpath)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    oldpage=Image.open(str(oldpath)+'.png').convert('RGB')
   ow,oh=oldpage.size;oldrect=[int(v*(ow if i%2==0 else oh)) for i,v in enumerate(f['cropFractions'])]
   oldasset=Image.open(dest).convert('RGB');assert oldasset.size==oldpage.crop(oldrect).size
   before['sourceCropPixelEqual']=ImageChops.difference(oldpage.crop(oldrect),oldasset).getbbox() is None
   assert before['sourceCropPixelEqual'],f['image']
   if media:orb=roi
   else:
    info=subprocess.check_output(['pdfinfo','-f',str(p),'-l',str(p),'-box',str(pdf)],text=True)
    mb=list(map(float,re.search(r'MediaBox:\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)',info).groups()));cb=list(map(float,re.search(r'CropBox:\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)',info).groups()))
    orb=[round((roi[0]/w*mb[2]-cb[0])/(cb[2]-cb[0])*ow),round((roi[1]/h*mb[3]-(mb[3]-cb[3]))/(cb[3]-cb[1])*oh),round((roi[2]/w*mb[2]-cb[0])/(cb[2]-cb[0])*ow),round((roi[3]/h*mb[3]-(mb[3]-cb[3]))/(cb[3]-cb[1])*oh)]
   omask=np.asarray(oldpage).min(axis=2)<245;outside=omask.copy();outside[:orb[1]]=False;outside[orb[3]:]=False;outside[:,:orb[0]]=False;outside[:,orb[2]:]=False;outside[oldrect[1]:oldrect[3],oldrect[0]:oldrect[2]]=False
   before['missingOfficialInkPixels']=int(outside.sum())
  else:before['originalContainment']='unknown: original crop coordinates absent; recropped from official PDF'
  f['previousCropAudit']=before
 if '--recrop' in sys.argv:
  im.crop(padded).save(dest)
  f.update(cropPixels=padded,cropFractions=[v/(w if i%2==0 else h) for i,v in enumerate(padded)],renderedPagePixels=[w,h],cropCoordinateSpace='MediaBox raster, pdftoppm -scale-to 2000 (without -cropbox)',cropProvenance='Independent official region -> nonwhite pixel bbox + 12 px margin; full pixel comparison, figure-pixel-audit.py',imageSha256=sha(dest))
 rect=f['cropPixels'];actual=Image.open(dest).convert('RGB');expected=im.crop(rect)
 contained=all([rect[0]<=padded[0],rect[1]<=padded[1],rect[2]>=padded[2],rect[3]>=padded[3]])
 equal=actual.size==expected.size and ImageChops.difference(actual,expected).getbbox() is None
 assert contained and equal and sha(dest)==f['imageSha256'],f['image']
 results.append(dict(image=f['image'],pdfPage=f['pdfPage'],officialSearchPixels=roi,officialInkBoundingBox=bbox,requiredBoundingBoxWithMargin=padded,inkPixels=int(mask.sum()),missingInkPixels=0,boundingBoxWithMarginContained=contained,pixelEqual=equal,imageSha256=sha(dest),previous=f.get('previousCropAudit')))
if '--recrop' in sys.argv:(E/'figure-crops.json').write_text(json.dumps(fs,ensure_ascii=False,indent=2)+'\n')
result=dict(method='pdftoppm MediaBox scale-to 2000; independently delimited full-page figure+label region; RGB<245 ink bbox +12 px margin; containment and every RGB pixel equality against official render',limits='Figure search regions are explicitly defined from full official pages; geometric verification depends on those regions, recorded for review. No OCR or semantic claim.',summary=dict(images=36,pixelEqual=sum(r['pixelEqual'] for r in results),contained=sum(r['boundingBoxWithMarginContained'] for r in results),originalKnownMissing=sum(bool(r['previous'].get('missingOfficialInkPixels')) for r in results),originalCoordinatesUnknown=sum('originalContainment' in r['previous'] for r in results)),figures=results)
(E/'figure-pixel-audit.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps(result['summary']))
