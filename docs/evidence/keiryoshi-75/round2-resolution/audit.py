"""Round-2 resolution coverage. Run from repo root after render-ocr.py.
OCR differences are candidates, never automatic corrections. Requires PyMuPDF/Pillow.
"""
import json,hashlib,re,subprocess,difflib,unicodedata
from pathlib import Path
import pymupdf
from PIL import Image,ImageChops
E=Path('docs/evidence/keiryoshi-75'); O=E/'round2-resolution'
def read(p):return json.loads(Path(p).read_text())
def save(n,d):(O/n).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def record(q):return hashlib.sha256(json.dumps(q,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()).hexdigest()
def norm(t):return re.sub(r'\s+','',unicodedata.normalize('NFKC',t))
questions={};changes=[];lex=[];legal=[];alts=[];diffs=[]
law_audit={(r['subject'],r['qNumber']):r for r in read(E/'round1-resolution/legal-audit.json')['rows']}
ocr={(r['subject'],r['qNumber']):r for r in read(O/'render-ocr.json')}
figures={f['image']:f for f in read(E/'figure-crops.json')}
def walk(n):
 if isinstance(n,dict):
  yield n
  for c in n.get('children',[]):yield from walk(c)
def flat(n):return n if isinstance(n,str) else ''.join(flat(c) for c in n.get('children',[]))
def anchor(name,num):
 path=E/f'law-{name}-20241215.json';data=read(path)
 root=next(n for n in walk(data['law_full_text']) if n['tag']=='MainProvision')
 node=next(n for n in walk(root) if n['tag']=='Article' and n['attr'].get('Num')==str(num))
 return dict(sourceFile=str(path),sourceSha256=sha(path),number=str(num),text=flat(node))
notice=next(s for s in read(E/'round1-resolution/legal-audit.json')['noticeSources'] if s['name']=='aircraft-notice')
assert sha(notice['file'])==notice['sha256']
supplemental={('kanon',15):[notice],('houki',17):[anchor('measurement',117)],
 ('houki',19):[anchor('measurement',65),anchor('measurement','121_6'),anchor('measurement',147),anchor('measurement-rules','49_10')],
 ('houki',8):[anchor('measurement-rules',96)]}
legal_pattern=r'届[出け]|指定|検査|登録|認定|権限|報告|申請|知事|市町村長|市町村の長|大臣'
procedure_findings={
 ('houki',8):'定期検査主体は知事又は特定市町村の長。25条1・2項は使用者が証明書を添え実施期日までに知事又は特定市町村の長へ検査後に届出。計量士の事前業務届は自治体要綱等の別手続（千葉市16条）。施行規則96条の計量士年度報告も別。',
 ('houki',9):'検査業務を行おうとする者が申請し指定。指定機関が業務規程の認可を知事又は特定市町村の長から受け、休廃止も事前に同主体へ届出。年度計画・予算は年度開始前。',
 ('houki',10):'販売事業者の開始届は事前に営業所所在地の知事。変更・廃止は51条2項の42条・45条準用による遅滞ない事後届（大臣を知事と読替え）。勧告も知事。',
 ('houki',11):'57条の製造・修理・輸入事業者。修理委託者への引渡しも対象。輸出時の例外は事前に知事へ届出。',
 ('houki',16):'計量証明事業者が登録後遅滞なく事業規程を知事へ届ける（110条）。登録と事業規程届を区別。',
 ('houki',17):'116条は登録をした知事による計量証明検査。117条の指定機関へ行わせる制度、120条の計量士検査を区別。定期検査の25条とは届出主体・先・時期を共用しない。',
 ('houki',18):'事業を行おうとする者が大臣又は特定計量証明認定機関へ申請。指定計量証明検査機関ではない。',
 ('houki',19):'証明書交付は任意。廃止届は121条の6による65条準用、書類提出・大臣への報告経路は49条の10。報告徴収は147条。',
 ('houki',20):'大臣が知識経験を有する者を計量士として登録。試験合格だけでなく区分に応じた実務経験等の条件。',
 ('houki',22):'127条3項の検査は国の事業所も知事又は特定市町村の長。指定権限（施行令41・43条）と検査主体（規則74条）を分離。',
 ('houki',23):'143条の校正等事業者の登録は大臣。144条の2・施行令38条の2による更新4年。',
 ('kanbutsu',2):'施設設置者が工事開始30日前までに市町村長へ届出。規則4条の通常使用時刻・型式・能力・附近見取図も確認。',
 ('kanbutsu',3):'地位承継者が承継後30日以内に市町村長へ届出。事前の設置届とは別。',
 ('kanka',5):'設置しようとする者の知事への届出事項。5条の種類・構造・使用方法・汚水処理方法と事故時措置を区別。',
 ('kanon',12):'軽微修理を46条の届出対象から除外。49条及び規則10・11条により届出製造/修理事業者及び適正計量管理事業所の修理と証印の扱いを区別。',
}
for p in sorted(Path('data/questions/keiryoshi').glob('2024-*.json')):
 slug=p.stem[5:];rows=read(p);before=json.loads(subprocess.check_output(['git','show',f'HEAD:{p}']))
 reviews=read(E/f'{slug}-transcription-review.json')
 for q,b,review in zip(rows,before,reviews):
  n=q['qNumber'];questions[slug,n]=q
  fields=[('question',q['question']),*[(f'choices.{k}',v) for k,v in q['choices'].items()],('explanation',q['explanation']),*[(f'choiceExplanations.{k}',v) for k,v in q['choiceExplanations'].items()]]
  changed=[k for k in set(q)|set(b) if q.get(k)!=b.get(k)]
  if changed:changes.append(dict(subject=slug,qNumber=n,fields=sorted(changed)))
  assert q['answer']==b['answer'] and q['officialAnswerNumber']==b['officialAnswerNumber']
  if (slug,n)==('kanri',9):assert q==b
  assert len(q.get('imageUrls',[]))==len(q.get('imageAltTexts',[]))
  assert not (not q.get('hasImage') and 'imageAltTexts' in q)
  for f,t in fields:
   matches=[dict(token=m[0],context=t[max(0,m.start()-20):m.end()+20]) for m in re.finditer(r'([一-龥ぁ-ゖァ-ヺ])\1|([一-龥ぁ-ゖァ-ヺ]{2,12})\2',t)]
   notes=[m[0] for m in re.finditer(r'原[文本].{0,30}(?:保持|誤|まま)|誤植',t)]
   lex.append(dict(subject=slug,qNumber=n,field=f,repetitions=matches,sourceRetentionNotes=notes,
      disposition='語境界（ものの・ここで・所所在地・満たすすべて等）又は正規の語（吸光光度・相関関係・クロロ等）。追加の重複誤字なし。' if matches else '重複候補なし',
      retentionDisposition='一基20の大文字添字L/Sを原図と照合。' if notes else '原文保持の実質的な注記なし'))
   if f.startswith(('explanation','choiceExplanations')) and re.search(legal_pattern,t):
    ref=law_audit.get((slug,n))
    legal.append(dict(subject=slug,qNumber=n,field=f,text=t,
       anchors=(ref['anchors']+supplemental.get((slug,n),[])) if ref else [],scopeLimit=ref['scopeLimit'] if ref else '',
       procedureNote=('法規19の廃止届は121条の6による65条準用の条文上は大臣。施行規則49条の10による実際の書類提出先は認定機関等で、同機関から大臣へ報告。条文の正誤判定は維持。' if (slug,n)==('houki',19) else ''),
       disposition=('法令の主体・手続を条文に照合。法規8は事前業務届と使用者の検査後届を区別して訂正。' if ref else '法令の主体・手続に関する記述ではない。検査一般・JIS分析指定・計算条件等。')))
    legal[-1]['finding']=procedure_findings.get((slug,n),ref['finding'] if ref else '法令の主体・手続の記述ではない。')
  r=ocr[slug,n];assert r['sourceSha256']==sha(r['pdf'])
  trans=q['question']+'\n'+'\n'.join(q['choices'].values());a,c=norm(trans),norm(r['ocrText'])
  sm=difflib.SequenceMatcher(None,a,c,autojunk=False)
  diffs.append(dict(subject=slug,qNumber=n,questionRecordSha256=record(q),renderSha256=r['renderSha256'],
     pdf=r['pdf'],pdfPage=r['pdfPage'],normalizedMatchRatio=sm.ratio(),
     transcription=trans,ocrText=r['ocrText'],machineDiff=list(difflib.unified_diff(trans.splitlines(),r['ocrText'].splitlines(),lineterm='')),
     disposition='画像由来OCRとの差分候補。文字認識誤り・表の読順・数式の線形化・加工注記を含むため、一致率を正確性の判定に用いない。重複候補と原文保持注記を別途全数走査。'))
  for u,alt in zip(q.get('imageUrls',[]),q.get('imageAltTexts',[])):
   f=figures[u];pdf=pymupdf.open(r['pdf']);pix=pdf[n].get_pixmap(matrix=pymupdf.Matrix(2.5,2.5),alpha=False)
   im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples).crop(f['cropPixels'])
   actual=Image.open('public'+u).convert('RGB');equal=im.size==actual.size and not ImageChops.difference(im,actual).getbbox();assert equal
   alts.append(dict(subject=slug,qNumber=n,image=u,imageSha256=sha('public'+u),sourceSha256=r['sourceSha256'],pdfPage=n+1,cropPixels=f['cropPixels'],sourceCropPixelEqual=equal,alt=alt,
      review='各図を別セルに原寸又は縮小表示し、altと1枚ずつ照合。表見出し・記号・上付き下付き・軸・図形と矛盾なし。',
      corrected=(slug,n) in [('kanka',13),('kanka',18)]))
  if changed:
   review['questionRecordSha256']=record(q)
   transcription=q['question']+'\n'+'\n'.join(f'{i} {v}' for i,v in enumerate(q['choices'].values(),1))
   review['transcription']=transcription
   review['machineDiff']=list(difflib.unified_diff(review['rawPdftotext'].splitlines(),transcription.splitlines(),fromfile='pdftotext-layout',tofile=f'2024-{slug}-q{n}',lineterm=''))
 (E/f'{slug}-transcription-review.json').write_text(json.dumps(reviews,ensure_ascii=False,indent=2)+'\n') if any(c['subject']==slug for c in changes) else None
assert len(questions)==200 and len(lex)==2400 and len(alts)==55 and len(diffs)==200
assert {(c['subject'],c['qNumber']) for c in changes}=={('keishitsu',7),('houki',8),('kanka',13),('kanka',18)}
protected=read(E/'final-round76-integrity.json')
assert len(protected['files'])==163
for f in protected['files']:assert sha(f['path'])==f['sha256']
for p in Path('data/questions/keiryoshi').glob('2025-*.json'):assert p.read_bytes()==subprocess.check_output(['git','show',f'HEAD:{p}'])
save('changes.json',changes);save('lexical-audit.json',lex);save('legal-statement-audit.json',legal);save('image-alt-audit.json',alts);save('ocr-transcription-diffs.json',diffs)
save('coverage.json',dict(questions=200,choices=1000,explanationFields=1200,textFields=2400,figures=55,legalCandidateFields=len(legal),changedQuestions=len(changes),answersChanged=0,kanri9Unchanged=True,round76ProtectedFiles=163,round76ByteIdentical=True))
print('coverage',len(questions),len(lex),len(alts),'legal candidates',len(legal),'changes',len(changes))
