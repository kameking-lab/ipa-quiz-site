"""Create a display-only transcription overlay; canonical papers and answer keys stay untouched.
Uses embedded PDF text and geometric figure crops, never whole-question screenshots.
"""
from pathlib import Path
import argparse, concurrent.futures, hashlib, json, re, unicodedata
import fitz

ROOT=Path(__file__).resolve().parents[1]
CACHE=ROOT.parent/'safe-ai-site/tmp/pdfs/exam-library'
OUT=ROOT/'data/exam-library/presentation'
PUBLIC=ROOT/'public/exam-library'
N=lambda s:unicodedata.normalize('NFKC',s)
SUP=str.maketrans('0123456789+-=()ni','⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿⁱ')
SUB=str.maketrans('0123456789+-=()nix','₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎ₙᵢₓ')

def clean(s):
 s=re.sub(r'[○〇◯](?=\s*[（(]?[１-５1-5])','',s)
 s=re.sub(r'[ \t\u3000]+',' ',s).strip()
 return s

def line_text(line):
 spans=[s for s in line['spans'] if s['text'].strip()]
 if not spans:return ''
 main=max(round(s['size']) for s in spans)
 ordinary=[s for s in spans if s['size']>=main*.85]
 baseline=max((s['origin'][1] for s in ordinary),default=spans[0]['origin'][1])
 result='';last=None
 for s in sorted(spans,key=lambda s:s['bbox'][0]):
  text=s['text']
  if s['size']<main*.8 and re.fullmatch(r'[ぁ-ゖー\s]+',text):continue # ruby reading, not source prose
  normalized=N(text).strip()
  if s['size']<main*.85 and normalized and re.fullmatch(r'[0-9ni x+−=()\-]+',normalized):
   text=normalized.replace('−','-').translate(SUP if s['origin'][1]<baseline-1 else SUB)
  gap=s['bbox'][0]-(last['bbox'][2] if last else s['bbox'][0])
  if last and gap>main*.65 and not result.endswith(' '):result+='  ' if gap>main*2 else ' '
  result+=text
  last=s
 return clean(result)

def page_lines(page):
 raw=[]
 for b in page.get_text('dict')['blocks']:
  if b['type']!=0:continue
  for l in b['lines']:
   for span in l['spans']:
    if span['text'].strip():raw.append(span)
 # First reconstruct body baselines; then attach small exponents/subscripts by position.
 body=[s for s in raw if s['size']>=9]
 small=[s for s in raw if s['size']<9]
 groups=[]
 for span in sorted(body,key=lambda s:(s['origin'][1],s['bbox'][0])):
  target=next((g for g in reversed(groups[-15:]) if abs(g[0]['origin'][1]-span['origin'][1])<4),None)
  if target is None:groups.append([span])
  else:target.append(span)
 split=[]
 for row in groups:
  col=[]
  for span in sorted(row,key=lambda s:s['bbox'][0]):
   if col and span['bbox'][0]-col[-1]['bbox'][2]>=28:split.append(col);col=[]
   col.append(span)
  if col:split.append(col)
 groups=split
 for span in small:
  if re.fullmatch(r'[ぁ-ゖー\s]+',span['text']):continue
  r=fitz.Rect(span['bbox']); candidates=[]
  for g in groups:
   base=g[0]['origin'][1];box=fitz.Rect(g[0]['bbox'])
   for s in g:box=box|fitz.Rect(s['bbox'])
   if box.x0-25<=r.x0<=box.x1+7 and -11<base-span['origin'][1]<14:
    candidates.append((abs(base-span['origin'][1])+max(0,box.x0-r.x1,r.x0-box.x1)*.15,g))
  if candidates:min(candidates,key=lambda x:x[0])[1].append(span)
  else:groups.append([span])
 out=[]
 for g in groups:
  text=line_text({'spans':g});box=fitz.Rect(g[0]['bbox'])
  for s in g:box=box|fitz.Rect(s['bbox'])
  if text:out.append({'text':text,'bbox':box,'size':max(s['size'] for s in g),'baseline':max(s['origin'][1] for s in g if s['size']>=max(x['size'] for x in g)*.85)})
 return sorted(out,key=lambda l:(round(l['baseline']/4)*4,l['bbox'].x0))

def merge_rects(rects,gap=9):
 result=[]
 for r in rects:
  found=True
  while found:
   found=False
   for i,e in enumerate(result):
    if fitz.Rect(r.x0-gap,r.y0-gap,r.x1+gap,r.y1+gap).intersects(e):
     r=r|e;result.pop(i);found=True;break
  result.append(r)
 return sorted(result,key=lambda r:(r.y0,r.x0))

def regions(page,top,bottom,lines):
 rects=[]
 # Honor PDF clip paths: unclipped vector bounds can span entire prose paragraphs.
 paths=[];clips={}
 for path in page.get_drawings(extended=True):
  level=path.get('level',0)
  clips={k:v for k,v in clips.items() if k<level}
  if path['type']=='clip':clips[level]=path['scissor'];continue
  if 'rect' not in path:continue
  if path['type']=='f' and path.get('fill') and min(path['fill'])>.98:continue
  r=fitz.Rect(path['rect'])+(-.1,-.1,.1,.1)
  for clip in clips.values():r=r & clip
  if not r.is_empty and r.y0>=top-2 and r.y1<=bottom+2:paths.append(r)
 for r in merge_rects(paths,3):
  if r.width>=3 and r.height>=18:rects.append(r)
 for im in page.get_image_info():
  r=fitz.Rect(im['bbox'])
  if r.width>0 and r.height>0 and r.y0>=top-2 and r.y1<=bottom+2:rects.append(r)
 rects=merge_rects(rects,18)
 # Isolated text underline/box fragments are not illustrations.
 rects=[r for r in rects if not ((r.height<40 and len(re.findall(r'[一-龯ぁ-んァ-ヶ]',page.get_textbox(r)))>8) or (r.width<25 and r.height<45 and re.fullmatch(r'[A-ZＡ-Ｚ\s]+',page.get_textbox(r))))]
 if page.parent.name.endswith('cskohyo-CS20251907.pdf') and page.number==4:
  rects=[r for r in rects if not (r.width>500 and r.height>200)]
 # Include labels inside drawings and immediately adjacent short diagram labels.
 for i,r in enumerate(rects):
  label_area=fitz.Rect(r.x0-14,r.y0-14,r.x1+14,r.y1+14)
  for l in lines:
   b=l['bbox'];text=l['text']
   if len(text)<26 and not re.search(r'。|どれか|ただし|のうち',text) and b.intersects(label_area) and not re.match(r'^[（(]?[1-5１-５][）)]',text):r=r|b
  rects[i]=r+(-3,-3,3,3)
 return merge_rects(rects,3)

def join_lines(lines):
 result=''
 for l in lines:
  t=l['text'].strip()
  if re.fullmatch(r'[○〇◯]',t) or re.match(r'^〔.+〕$',t):continue
  if not t or re.fullmatch(r'[（(]?終\s*[わり ]*[）)]?',t):continue
  # Restore paragraphs at list items, tables and mathematical lines; join print wrapping.
  new=bool(re.match(r'^(?:[（(][\w１-９][）)]|[イロハニホヘト㋑-㋾]\s|[①-⑳]|注\s|ただし|なお|[A-ZＡ-Ｚ]\s)',t))
  if result and (new or not re.search(r'[一-龯ぁ-んァ-ヶ。、]',t)):result+='\n'
  result+=t
 return result.strip()

def run(paper):
 qs=json.loads(paper.read_text(encoding='utf-8-sig'));pid=paper.stem;doc=fitz.open(CACHE/f'{pid}.pdf')
 chunks={q['id']:[] for q in qs};qindex=0;current=None
 for pi,page in enumerate(doc):
  ls=page_lines(page)
  if any('指示があるまで' in l['text'] for l in ls):current=None;continue
  if any('正答例' in l['text'] for l in ls[:10]) and pid in ['lckohyo-LC20260401-2','lckohyo-LC20251101']:break
  starts=[l for l in ls if re.match(r'^問\s*\d+(?:\s|[^\d]|$)',N(l['text'])) and l['bbox'].y0>25]
  bounds=[]
  if current and (not starts or starts[0]['bbox'].y0>110):bounds.append((45,current))
  for l in starts:
   if qindex>=len(qs):break
   current=qs[qindex];qindex+=1;bounds.append((max(25,l['bbox'].y0-4),current))
  for si,(top,q) in enumerate(bounds):
   bottom=bounds[si+1][0]-3 if si+1<len(bounds) else page.rect.height-35
   foot=[l['bbox'].y0 for l in ls if l['bbox'].y0>page.rect.height*.8 and re.search(r'\d+\s*/\s*\d+\s*$',N(l['text']))]
   if foot:bottom=min(bottom,min(foot)-5)
   segment=[l for l in ls if top<=l['bbox'].y0<bottom and (l['bbox'].y0>=70 or re.match(r'^問',l['text'])) and not re.fullmatch(r'\d{6,}',N(l['text']))]
   regs=regions(page,top,bottom,segment)
   labels=[l for l in segment if re.match(r'^(?:[（(][1-5１-５][）)]|[1-5１-５](?:\s|$))',l['text'])]
   numbers={int(re.search(r'[1-5]',N(l['text']))[0]) for l in labels}
   if q['choiceCount']==5 and regs and numbers=={1,2,3,4,5} and ((len({round(l['bbox'].x0/25) for l in labels})>=3 and max(l['bbox'].x0 for l in labels)-min(l['bbox'].x0 for l in labels)>70) or q['id']=='emkohyo-EM20261801-q2'):
    combined=regs[0]
    for r in regs[1:]+[l['bbox'] for l in labels]:combined=combined|r
    regs=[combined+(-3,-3,3,3)]
   figs=[]
   for ri,r in enumerate(regs):
    r=r & page.rect
    if r.height<18 or r.width<3:continue
    name=f'text-q{q["number"]}-p{pi+1}-fig{ri+1}.webp';dest=PUBLIC/pid/name;dest.parent.mkdir(parents=True,exist_ok=True)
    pix=page.get_pixmap(matrix=fitz.Matrix(2,2),clip=r,alpha=False)
    # Render only the diagram/table boundary; suppress answer-key circles within crop.
    from PIL import Image,ImageDraw
    im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples);draw=ImageDraw.Draw(im)
    for b in page.get_text('rawdict')['blocks']:
     if b['type']!=0:continue
     for l in b['lines']:
      for s in l['spans']:
       for c in s['chars']:
        if c['c'] in '○〇◯' and fitz.Rect(c['bbox']).intersects(r):
         cb=fitz.Rect(c['bbox'])
         if any(re.match(r'^[（(]?[1-5](?:[）)]|\s|$)',N(x['text'])) and ((abs(x['bbox'].y0-cb.y0)<12 and abs(x['bbox'].x0-cb.x0)<24) or (0<x['bbox'].y0-cb.y0<35 and abs(x['bbox'].x0-cb.x0)<15)) for x in segment):draw.rectangle(((cb.x0-r.x0)*2,(cb.y0-r.y0)*2,(cb.x1-r.x0)*2,(cb.y1-r.y0)*2),fill='white')
    # EM answer marks are tiny filled vector polygons forming a ring.
    marker_chars=[fitz.Rect(c['bbox']) for block in page.get_text('rawdict')['blocks'] if block['type']==0 for line in block['lines'] for span in line['spans'] if span['size']>=9 for c in span['chars'] if N(c['c']) in ('1','2','3','4','5')]
    paths=page.get_drawings()
    for cb in page.cluster_drawings():
     if 6<=cb.width<=16 and 6<=cb.height<=16 and .8<cb.width/cb.height<1.2:
      pieces=sum(1 for path in paths if cb.intersects(path['rect']))
      if pieces>20 and any(abs(m.y0-cb.y0)<12 and 0<m.x0-cb.x1<12 for m in marker_chars):
       draw.rectangle(((cb.x0-r.x0-1)*2,(cb.y0-r.y0-1)*2,(cb.x1-r.x0+1)*2,(cb.y1-r.y0+1)*2),fill='white')
    im.save(dest,'WEBP',quality=93)
    figs.append({'src':f'/exam-library/{pid}/{name}','alt':f'問{q["number"]}の図表','page':pi+1,'bbox':[round(v,2) for v in r],'width':pix.width,'height':pix.height})
   for l in segment:l['page']=pi+1
   chunks[q['id']].append({'lines':segment,'figures':figs})
 result={};issues=[]
 for q in qs:
  cs=chunks[q['id']];ls=[l for c in cs for l in c['lines']];figs=[f for c in cs for f in c['figures']]
  # Numbered choices are identified by horizontal position as well as text.
  candidates=[]
  for i,l in enumerate(ls):
   m=re.match(r'^(?:[○〇◯]\s*)?(?:[（(]\s*([1-5１-５])\s*[）)]\s*|([1-5１-５])(?:\s+|$))',l['text'])
   if m and l['size']>=9:candidates.append((i,int(m[1] or m[2]),m.end(),l['bbox'].x0))
  sequence=None
  # A full consecutive set at the same left margin avoids subscripts and question references.
  for start,c in enumerate(candidates):
   if c[1]!=1:continue
   seq=[c]
   for nxt in candidates[start+1:]:
    if nxt[1]==len(seq)+1 and abs(nxt[3]-c[3])<45:seq.append(nxt)
    if len(seq)==5:break
   if len(seq)==5:sequence=seq
  # Figure labels are visible in their crop, never appended as scrambled prose.
  def prose(items):
   return [l for l in items if l.get('choiceStart') or re.match(r'^[（(]?[1-5１-５](?:[）)]|\s)',l['text']) or not any(f['page']==l['page'] and fitz.Rect(f['bbox']).contains(l['bbox']) for f in figs)]
  choices=[]
  if q['choiceCount']==5 and sequence:
   first=sequence[0][0];prompt=join_lines(prose(ls[:first]))
   for n,c in enumerate(sequence):
    start=c[0];end=sequence[n+1][0] if n<4 else len(ls)
    cl=[dict(l) for l in ls[start:end]];cl[0]['text']=cl[0]['text'][c[2]:].strip();cl[0]['choiceStart']=True
    for row in cl:
     if row['page']==cl[0]['page'] and abs(row['baseline']-cl[0]['baseline'])<4:row['choiceStart']=True
    choices.append({'number':n+1,'text':join_lines(prose(cl)) or f'図の（{n+1}）'})
  elif q['choiceCount']==5 and figs and candidates:
   first=min(c[0] for c in candidates);prompt=join_lines(prose(ls[:first]))
   choices=[{'number':n,'text':f'図の（{n}）'} for n in range(1,6)]
  else:
   prompt=join_lines(prose(ls))
   if q['choiceCount']==5:issues.append({'id':q['id'],'reason':'choice-layout','candidates':candidates})
  prompt=prompt.replace('のに入る','の［　］に入る').replace('文中の内','文中の［　］内')
  prompt=re.sub(r'^問\s*[0-9０-９]+\s*','',prompt)
  for f in figs:
   near=[]
   for n,c in enumerate(sequence or []):
    l=ls[c[0]]
    if f['page']==l['page'] and f['bbox'][1]-5<=l['bbox'].y0<=f['bbox'][3]+5:near.append(str(n+1))
   if near:f['alt']=f'問{q["number"]}・選択肢'+ '、'.join(near)+'の図表'
  result[q['id']]={'sourceHash':hashlib.sha256(q['text'].encode()).hexdigest(),'prompt':prompt,'choices':choices,'figures':figs}
  if not prompt:issues.append({'id':q['id'],'reason':'empty-prompt'})
  if any(re.search(r'�|\ufffd',s) for s in [prompt]+[c['text'] for c in choices]):issues.append({'id':q['id'],'reason':'missing-glyph'})
 patchfile=ROOT/'data/exam-library/presentation-overrides.json'
 if patchfile.exists():
  patches=json.loads(patchfile.read_text(encoding='utf-8-sig'))
  for key,patch in patches.items():
   if key in result:
    for field in ('prompt','choices'):
     if field in patch:result[key][field]=patch[field]
    issues=[issue for issue in issues if issue['id']!=key]
 OUT.mkdir(parents=True,exist_ok=True);(OUT/f'{pid}.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 return {'id':pid,'questions':len(result),'figures':sum(len(x['figures']) for x in result.values()),'starts':qindex,'issues':issues}

if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('--paper');ap.add_argument('--workers',type=int,default=3);args=ap.parse_args()
 papers=list((ROOT/'data/exam-library/papers').glob((args.paper or '*')+'.json'))
 reports=[]
 with concurrent.futures.ProcessPoolExecutor(max_workers=args.workers) as pool:
  for report in pool.map(run,papers):reports.append(report);print(json.dumps(report,ensure_ascii=False),flush=True)
 log=ROOT/'logs/safety-transcription';log.mkdir(exist_ok=True)
 (log/'generation-report.json').write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding='utf-8')
