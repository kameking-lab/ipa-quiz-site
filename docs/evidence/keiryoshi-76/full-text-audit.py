"""Exhaustive pdftotext comparison. Run from repository root (Python stdlib).
Only whitespace, width forms and punctuation are normalized; math scripts, words,
operators, duplicated/mis-mapped PDF glyphs are deliberately left as differences.
"""
import subprocess,json,re,unicodedata as ud,difflib,hashlib
from pathlib import Path
E=Path('docs/evidence/keiryoshi-76')
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def norm(s):
 s=''.join(ud.normalize('NFKC',c) if ud.east_asian_width(c) in 'FWH' else c for c in s)
 return re.sub(r'\s+','',ud.normalize('NFC',s)).translate(str.maketrans({'，':'、','．':'。','−':'-','–':'-','…':'...'}))
def extract(pdf,page,rect):
 x,y,x1,y1=rect
 return subprocess.check_output(['pdftotext','-f',str(page),'-l',str(page),'-r','72','-x',str(round(x)),'-y',str(round(y)),'-W',str(round(x1-x)),'-H',str(round(y1-y)),'-layout',str(pdf),'-'],text=True).replace('\f','')
def boxes(pdf):
 t=subprocess.check_output(['pdfinfo','-f','1','-l','26','-box',str(pdf)],text=True)
 return {int(m[1]):list(map(float,m.groups()[1:])) for m in re.finditer(r'Page\s+(\d+) CropBox:\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)',t)}
def run():
 rows=[];pages=[];unparsed=[]
 for f in sorted(Path('data/questions/keiryoshi').glob('2025-*.json')):
  qs=json.loads(f.read_text());pdf=Path('data/raw_pdfs/keiryoshi')/Path(qs[0]['sourcePdfUrl']).name;bs=boxes(pdf)
  for q in qs:
   n=q['qNumber'];x,y,x1,y1=bs[n+1]
   # PDF boxes have a bottom-left origin. All these source pages have MediaBox height 915.59 (chemistry/others may differ).
   inf=subprocess.check_output(['pdfinfo','-f',str(n+1),'-l',str(n+1),'-box',str(pdf)],text=True)
   mb=re.search(r'MediaBox:\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)',inf);height=float(mb[4])
   rect=[x,height-y1,x1,height-y]
   t=extract(pdf,n+1,rect)
   # Footer, including duplicated imposition folios, is outside question content.
   t=re.split(r'\n[^\n]*[—̶]',t)[0]
   t=re.sub(r'問[ \t]*[0-9０-９]+[ \t]*','',t)
   definition=json.loads((E/'text-field-regions.json').read_text())[f"{q['subject']}-{n}"]
   parts=[extract(pdf,n+1,region) for region in definition['regions']]
   # Remove question/choice identifiers only, retaining all actual content and all
   # extraction artifacts. Folios and diagram text remain visible as differences.
   parts[0]=re.sub(r'問[ \t]*[0-9０-９]+[ \t]*','',parts[0],count=1)
   for i in range(1,6):
    parts[i]=re.sub(r'^[ \t]*'+str(i)+r'[ \t]*','',parts[i],count=1,flags=re.M)
    parts[i]=re.sub(r'^[ \t]*'+chr(ord('０')+i)+r'[ \t]*','',parts[i],count=1,flags=re.M)
    parts[i]=re.split(r'\n[^\n]*[—̶]',parts[i])[0]
   method=definition.get('method','pdftotext bbox label positions; independent field rectangles')
   pages.append(dict(subject=q['subject'],qNumber=n,pdfPage=n+1,sourcePdf=str(pdf),sourceSha256=sha(pdf),cropBox=rect,pdftotext=t,splitMethod=method))
   for key,src,data in zip(['question',*'アイウエオ'],parts,[q['question'],*q['choices'].values()]):
    a,b=norm(src),norm(data)
    diff=[dict(operation=tag,source=a[i:j],data=b[k:l],sourceOffset=i,dataOffset=k) for tag,i,j,k,l in difflib.SequenceMatcher(None,a,b,autojunk=False).get_opcodes() if tag!='equal']
    rows.append(dict(subject=q['subject'],qNumber=n,field=key,source=src,data=data,normalizedSource=a,normalizedData=b,differences=diff,splitMethod=method))
 result=dict(normalization='Whitespace and width forms; comma/full stop/dash/ellipsis punctuation only. No word, formula, script or operator normalization.',tool=subprocess.check_output(['pdftotext','-v'],stderr=subprocess.STDOUT,text=True).splitlines()[0],summary=dict(questions=200,choices=1000,fields=len(rows),differentFields=sum(bool(r['differences']) for r in rows),unparsed=unparsed),pages=pages,fields=rows,dataHashes={str(f):sha(f) for f in sorted(Path('data/questions/keiryoshi').glob('2025-*.json'))})
 (E/'full-text-audit.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps(result['summary'],ensure_ascii=False))
 with open('/tmp/keiryoshi-diffs2.txt','w') as out:
  for r in rows:
   if r['differences']:out.write(f"{r['subject']}{r['qNumber']} {r['field']} {json.dumps([(d['source'],d['data']) for d in r['differences']],ensure_ascii=False)}\n")
if __name__=='__main__':run()
