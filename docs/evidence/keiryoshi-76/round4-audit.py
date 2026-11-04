"""Round 4: reproduce exhaustive object / glyph inventory and review coverage.
Run from repository root, with PyMuPDF available. Semantic dispositions are a
saved manual review, never inferred from answer numbers or nonempty strings.
"""
import json,hashlib,re,unicodedata,subprocess,sys
from pathlib import Path
import pymupdf as fitz
E=Path('docs/evidence/keiryoshi-76')
def read(p):return json.loads(Path(p).read_text())
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def save(name,obj):(E/name).write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n')
qs={(q['subject'],q['qNumber']):q for p in Path('data/questions/keiryoshi').glob('*.json') for q in read(p)}
figures={(f['subject'],f['qNumber']):f for f in read(E/'figure-crops.json')}
before={(q['subject'],q['qNumber']):q for q in read(E/'round4-before.json')}
# Independent all-page inventory: this starts from the source PDFs, not imageUrls.
objects=[];scripts=[]
for path in sorted(Path('data/questions/keiryoshi').glob('*.json')):
 data=read(path);pdf=Path('data/raw_pdfs/keiryoshi')/Path(data[0]['sourcePdfUrl']).name;doc=fitz.open(pdf)
 for q in data:
  key=q['subject'],q['qNumber'];p=doc[q['qNumber']];area=fitz.Rect(30,40,p.rect.width-30,p.rect.height-40)
  ds=[d for d in p.get_drawings() if area.contains(d['rect'])];imgs=[i for i in p.get_image_info() if area.intersects(i['bbox'])]
  # Text columns catch borderless tables which drawing-object-only scans miss.
  columnTable=(any('／' in c for c in q['choices'].values()) or ('|' in q['question'] and key!=('管理',23)) or key in [('管理',12),('管理',13),('管理',19),('管理',21),('法規',3),('計質',22)])
  if key in figures:disposition='registered-figure-map-or-table'
  elif ds:disposition='formula-or-blank-box-or-underline'
  else:disposition='text-only'
  assert not columnTable or q['hasImage'],key
  assert not imgs or q['hasImage'],key
  objects.append(dict(subject=key[0],qNumber=key[1],pdfPage=key[1]+1,sourcePdf=str(pdf),sourceSha256=sha(pdf),cropBox=list(p.cropbox),questionArea=list(area),coordinateSpace='CropBox points, top left origin',imageObjects=[dict(bbox=list(i['bbox']),xref=i.get('xref')) for i in imgs],vectorPaths=[dict(bbox=list(d['rect']),items=len(d['items']),types=sorted(set(i[0] for i in d['items']))) for d in ds],columnTable=columnTable,disposition=disposition,hasImage=q['hasImage'],image=q.get('imageUrls',[]),manualDisposition='原図・表は画像、残りは分数線・根号・行列括弧・空欄枠・下線。公式各問の本文と描画位置を照合。'))
  chars=[]
  for block in p.get_text('rawdict')['blocks']:
   for line in block.get('lines',[]):
    for span in line['spans']:
     for c in span['chars']:
      if area.intersects(c['bbox']):chars.append(dict(**c,size=span['size']))
  pairs=[]
  for c in chars:
   if not c['c'].strip():continue
   # Include same-size scripts as well as reduced glyphs; retain false positives.
   bases=[a for a in chars if a['c'].strip() and a['size']>=c['size']*.95 and -2<c['bbox'][0]-a['bbox'][2]<4 and 1<abs(c['origin'][1]-a['origin'][1])<a['size']*.85]
   if not bases:continue
   a=min(bases,key=lambda a:abs(c['bbox'][0]-a['bbox'][2]));token=unicodedata.normalize('NFKC',a['c']+c['c']);hits=[]
   fields=dict(question=q['question'],**q['choices'],explanation=q['explanation'],**{'explanation.'+k:v for k,v in q['choiceExplanations'].items()})
   if re.fullmatch('[A-Za-zΑ-ω][a-z0-9]',token):
    for field,t in fields.items():
     if re.search(r'(?<![A-Za-z_])'+re.escape(token)+r'(?![A-Za-z0-9])',t):hits.append(field)
   pairs.append(dict(token=token,kind='sub' if c['origin'][1]>a['origin'][1] else 'super',base=a,script=c,plainCandidateFields=hits,disposition='needs-review' if hits else 'Unicode-or-explicit-script-notation-or-image; other geometric candidates are fraction/layout/glyph-mapping artifacts'))
  scripts.append(dict(subject=key[0],qNumber=key[1],pdfPage=key[1]+1,pairs=pairs))
# This assertion detects plain adjacent ASCII variables; it does not establish
# visual correctness of arbitrary formulas. Full positional candidates are saved.
plain=[(r['subject'],r['qNumber'],p['token'],p['plainCandidateFields']) for r in scripts for p in r['pairs'] if p['plainCandidateFields']]
save('round4-object-audit.json',dict(method='All 200 CropBox question regions: get_image_info + get_drawings; borderless table text-column review; formula/blank/underline dispositions are manual.',questions=objects,summary=dict(questions=len(objects),registeredQuestions=len(figures),newImages=sum(not before[k]['hasImage'] and q['hasImage'] for k,q in qs.items()),unregisteredRasterQuestions=sum(bool(r['imageObjects']) and not r['hasImage'] for r in objects))))
save('round4-script-audit.json',dict(method='All 200 rawdict glyph positions, sizes and baseline offsets; adjacent shifted glyphs including same-size candidates; ASCII flattening scan in question, choices and explanations; Unicode and explicit _ / ^ notation retained. This is not normalization-based fidelity proof.',limitations='Embedded raster text and PDF character-map anomalies require visual review; all registered figures preserve source pixels. Unicode has no subscript c: N_c is explicit linear notation; original positioning is retained in kanri-q19.png.',summary=dict(questions=len(scripts),candidateQuestions=sum(bool(r['pairs']) for r in scripts),pairs=sum(len(r['pairs']) for r in scripts),plainCandidates=plain,correctedQuestion='管理19',correctedOccurrences=9),questions=scripts))
# Text / explanation mutations, independently countable from the saved baseline.
changes=[]
for key,q in qs.items():
 old=before[key]
 for field in ['question','explanation']:
  if q[field]!=old[field]:changes.append(dict(subject=key[0],qNumber=key[1],field=field,before=old[field],after=q[field]))
 for k in 'アイウエオ':
  if q['choiceExplanations'][k]!=old['choiceExplanations'][k]:changes.append(dict(subject=key[0],qNumber=key[1],field='choiceExplanations.'+k,before=old['choiceExplanations'][k],after=q['choiceExplanations'][k]))
save('round4-changes.json',dict(summary=dict(changedExplanations=sum(r['field']=='explanation' for r in changes),changedChoiceExplanations=sum(r['field'].startswith('choiceExplanations.') for r in changes),changedTextQuestions=sum(r['field']=='question' for r in changes),changedSemanticQuestions=len({(r['subject'],r['qNumber']) for r in changes if r['field']!='question'})),changes=changes))
review=read(E/'round4-explanation-review.json')
reviewKeys=set()
for row in review['questions']:
 key=row['subject'],row['qNumber'];q=qs[key];reviewKeys.add(key)
 def digest(obj):return hashlib.sha256(json.dumps(obj,ensure_ascii=False,sort_keys=True).encode()).hexdigest()
 assert row['checkedChoices']==list('アイウエオ')
 assert row['officialAnswerNumber']==q['officialAnswerNumber']
 assert row['questionAndChoicesSha256']==digest(dict(question=q['question'],choices=q['choices'])),key
 assert row['explanationsSha256']==digest(dict(explanation=q['explanation'],choiceExplanations=q['choiceExplanations'])),key
assert reviewKeys==set(qs) and len(review['questions'])==200
assert len(objects)==len(scripts)==200
print(json.dumps(dict(questions=200,images=len(figures),plainCandidates=plain,changes=len(changes)),ensure_ascii=False))
