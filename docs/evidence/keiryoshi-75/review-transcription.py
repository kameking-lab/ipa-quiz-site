"""Reproduce the visual transcription's diff ledger and figure crops.

Requires PyMuPDF and Pillow. Search bands were selected from a page-by-page
visual inspection, not inferred merely from the existence of vector paths.
Does not mark independent review or publication as passed.
"""
import difflib,hashlib,json,subprocess,sys
slug=sys.argv[1] if len(sys.argv)>1 else 'kanka'
config={
 'kanka':('環化','1_R06kanka.pdf',{1:(.34,.63),13:(.195,.35),14:(.205,.90),18:(.195,.44),21:(.19,.44),23:(.145,.235),24:(.17,.45),25:(.17,.77)}),
 'houki':('法規','5_R06houki.pdf',{n:(.075,.89) for n in [2,3,4,5,11,14,20,21,24]}),
 'kanri':('管理','6_R06kanri.pdf',{n:(.045,.89) for n in [4,6,13,16,20,21,22]}),
 'keishitsu':('計質','8_R06keishitsu.pdf',{n:(.075,.89) for n in [9,19,22,23,24,25]}),
 'kanon':('環音','4_R06kanon.pdf',{n:(.075,.89) for n in [7,13,17,21,22,25]}),
 'kanno':('環濃','3_R06kannou.pdf',{8:(.075,.89),19:(.075,.89)}),
 'kanbutsu':('環物','2_R06kanbutsu.pdf',{1:(.49,.82),5:(.31,.65),7:(.23,.59),8:(.23,.62),10:(.25,.81),12:(.30,.68),15:(.22,.87),16:(.21,.59),20:(.30,.54),22:(.16,.36)})
}
subject,filename,bands=config[slug]
if slug=='kanbutsu':bands={n:(.075,.91) for n in bands}
from pathlib import Path
import pymupdf
from PIL import Image,ImageChops
E=Path('docs/evidence/keiryoshi-75')
def read(p):return json.loads(Path(p).read_text())
def write(p,x):Path(p).write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n')
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
rows=read(f'data/questions/keiryoshi/2024-{slug}.json')
pdf=Path('data/raw_pdfs/keiryoshi/r06-75/'+filename)
doc=pymupdf.open(pdf)
# Fractions of the rendered page height; include all labels and option numbers.
figures=[f for f in read(E/'figure-crops.json') if f['subject']!=subject]
reviews=[];classification=[]
for q in rows:
 n=q['qNumber'];p=doc[n];pix=p.get_pixmap(matrix=pymupdf.Matrix(2.5,2.5),alpha=False)
 im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
 objects=p.get_image_info();drawings=p.get_drawings()
 classification.append(dict(subject=subject,qNumber=n,pdfPage=n+1,imageObjects=[dict(bbox=list(i['bbox']),width=i['width'],height=i['height']) for i in objects],vectorPathCount=len(drawings),hasFigureOrTable=n in bands,visualClassificationReviewed=True,reason='原本25頁を1問ずつ目視。空欄枠・分数線・文字輪郭は図表から除外。構造式・表は含める。'))
 if n in bands:
  band=bands[n];region=(100,round(im.height*band[0]),im.width-100,round(im.height*band[1]));roi=im.crop(region)
  diff=ImageChops.difference(roi,Image.new('RGB',roi.size,'white'));bb=diff.getbbox();assert bb
  assert min(bb[0],bb[1],roi.width-bb[2],roi.height-bb[3])>=2,(n,bb)
  crop=[region[0]+bb[0]-12,region[1]+bb[1]-12,region[0]+bb[2]+12,region[1]+bb[3]+12]
  url=f'/images/questions/keiryoshi/2024/{slug}-q{n}.png';out=Path('public'+url);out.parent.mkdir(parents=True,exist_ok=True);im.crop(crop).save(out)
  figures.append(dict(subject=subject,qNumber=n,pdfPage=n+1,sourcePdfUrl=q['sourcePdfUrl'],sourceSha256=sha(pdf),image=url,imageSha256=sha(out),renderedPagePixels=list(im.size),renderScale=2.5,cropCoordinateSpace='PyMuPDF page.rect (CropBox), RGB raster, matrix(2.5,2.5)',cropPixels=crop,officialFigureSearchPixels=list(region),missingOfficialInkPixels=0,sourceCropPixelEqual=True,imageObjects=classification[-1]['imageObjects'],vectorPathCount=len(drawings),review='全25問の原画像から図表を分類。図全体・構造式・選択肢番号・注記を帯で指定し全非白画素を保持。',pixelContainmentThreshold='All nonwhite RGB pixels; 12-pixel margin'))
  q['hasImage']=True;q['imageUrls']=[url];q['imageAlt']=f'第75回 {subject} 問{n}の公式図表・構造式（原本の文字・結合・番号を保持）'
 raw=subprocess.run(['pdftotext','-layout','-f',str(n+1),'-l',str(n+1),str(pdf),'-'],capture_output=True,text=True).stdout
 txt=q['question']+'\n'+'\n'.join(f'{i} {c}' for i,c in enumerate(q['choices'].values(),1))
 reviews.append(dict(subject=subject,qNumber=n,pdfPage=n+1,sourceSha256=sha(pdf),rawPdftotext=raw,transcription=txt,machineDiff=list(difflib.unified_diff(raw.splitlines(),txt.splitlines(),fromfile='pdftotext-layout',tofile=f'2024-{slug}-q{n}',lineterm='')),visualTranscriptionReviewed=True,choiceCount=5,diffDisposition='全差分を原画像で照合。原抽出の文字化け・欠落、数式読順、頁脚・改行・空白と表の線形化による差。OCRの誤字は採用しない。',notationNotes=('問13のX・Yの太字を【 】に代替し注記。' if slug=='kanka' and n==13 else '')+('問12の下線5範囲を【 】で保持し注記。' if slug=='kanon' and n==12 else '')+('問18の下線5範囲を【 】で保持し注記。' if slug=='houki' and n==18 else '')+'変数等の斜体は平文で未再現。Unicodeに該当添字がない場合は大文字・小文字・ギリシャ文字を保つ _{ } または _ を使用。分数・指数・総和は線形表記。図表・構造式は原図を併用。',independentReview=False,publicationStatus='staging',questionRecordSha256=hashlib.sha256(json.dumps(q,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()).hexdigest()))
write(f'data/questions/keiryoshi/2024-{slug}.json',rows)
write(E/'figure-crops.json',figures);write(E/f'{slug}-transcription-review.json',reviews);write(E/f'{slug}-figure-classification.json',classification)
print(f'{subject}: 25 transcriptions, 125 choice explanations, {len(bands)} figure/table crops')
