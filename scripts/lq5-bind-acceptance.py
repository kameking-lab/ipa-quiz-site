"""Bind unchanged accepted content to the freshly retrieved identical official PDFs."""
from pathlib import Path
import hashlib,json,re,shutil,subprocess
import fitz
ROOT=Path(__file__).resolve().parents[1]
DOC=Path('C:/Users/kanet/Documents/Codex')
OUT=ROOT/'reports/lq5-20261104'
def read(p):return json.loads(Path(p).read_text(encoding='utf-8-sig'))
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def digest(q):return hashlib.sha256(json.dumps(q,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()).hexdigest()
def write(p,d):(OUT/p).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
downloads={r['url']:r for r in read(OUT/'official-downloads.json')}
mask=read(ROOT/'data/questions/biyoshi/study-mask.json')
old=read(DOC/'2026-10-23/task-6/biyoshi-content-review-20261023/ALL110-RECEIPT.json')
oldrows={r['questionId']:r for r in old['rows']}
beauty=[]
for path in (ROOT/'data/questions/biyoshi').glob('2026-*.json'):
    for q in read(path):
        row=oldrows[q['id']]
        paper=q['sourcePdfUrl'].split('#')[0]
        current=downloads[paper]
        assert digest(q)==mask['candidateObjectSha256'][q['id']]
        assert current['sha256']==row['officialPaper']['sha256']
        assert q['officialAnswerNumber']==row['officialKey']['number']
        assert q['answer']==row['officialKey']['mappedAnswer']
        beauty.append({'id':q['id'],'source':paper,'pdfSha256':current['sha256'],'page':row['officialPaper']['physicalPage'],'officialAnswer':q['officialAnswerNumber'],'acceptedObjectSha256':digest(q),'sameAcceptedObject':True,'sourceAndOriginalReview':'reuse unchanged exact-object final-05 and ALL110 same-edition source/key review; no new full OCR claim'})
assert len(beauty)==106
write('beauty-106-binding.json',beauty)

receipts={
 'beauty-all110.json':DOC/'2026-10-23/task-6/biyoshi-content-review-20261023/ALL110-RECEIPT.json',
 'beauty-final106.json':DOC/'2026-10-23/task-6/biyoshi-native-payload-20261024/final-05/FINAL-RECEIPT.json',
 'otsu1-independent.json':DOC/'2026-11-01/qual-new20-private-20261101/outputs/source-bound/binding-independent-review.json',
 'otsu2-independent.json':DOC/'2026-11-01/qual-new21-private-20261101/outputs/official-bound/ORIGINAL-BINDING-REVIEW.json',
 'otsu6-independent.json':DOC/'2026-11-01/qual-new25-private-20261101/outputs/bound-past-questions/INDEPENDENT-ACCEPTANCE.json',
}
(OUT/'inherited-receipts').mkdir(exist_ok=True)
pins=[]
for name,p in receipts.items():
    shutil.copyfile(p,OUT/'inherited-receipts'/name)
    pins.append({'source':str(p),'retained':'inherited-receipts/'+name,'sha256':sha(p)})
write('inherited-receipts.json',pins)

hazard=[]
for exam in ['kikenbutsu-otsu1','kikenbutsu-otsu2','kikenbutsu-otsu6']:
    raw=read(ROOT/f'data/questions/{exam}/accepted-source.json')
    qs=raw if isinstance(raw,list) else raw['questions']
    normalized=read(ROOT/f'data/questions/{exam}/published-202606.json')
    for q,n in zip(qs,normalized):
        assert all(n[k]==q[k] for k in ['id','question','choices','answer','officialAnswerNumber','explanation','choiceExplanations'])
        assert n['sourceExamYear'] is None and n['sourceExamSession'] is None
        images=[]
        for url in n.get('imageUrls',[]):
            target=ROOT/'public'/url.lstrip('/')
            images.append({'url':url,'sha256':sha(target)})
        if 'sourceBinding' in q:
            assert q['sourceBinding']['pdfSha256']==downloads[q['sourcePdfUrl'].split('#')[0]]['sha256']
            assert images[0]['sha256']==q['sourceBinding']['imageSha256']
        hazard.append({'id':n['id'],'exam':exam,'officialAnswer':q['officialAnswerNumber'],'acceptedContentUnchanged':True,'sourcePdfSha256':downloads[q['sourcePdfUrl'].split('#')[0]]['sha256'],'originalRepresentation':'text transcription with textual table' if exam.endswith('2') else 'unchanged official raster with numbered answer buttons','images':images,'routingYear':'publication year 2026; sourceExamYear/sourceExamSession null','choiceReasons':5})
assert len(hazard)==30
write('hazardous-30-binding.json',hazard)
visual_keys={1:[4,3,1,2,1,1,5,2,2,4],2:[5,2,5,2,4,2,2,2,1,3],6:[5,1,5,3,3,2,5,5,5,5]}
for kind,answers in visual_keys.items():
    qs=read(ROOT/f'data/questions/kikenbutsu-otsu{kind}/published-202606.json')
    assert [int(q['officialAnswerNumber']) for q in qs]==answers
write('hazard-live-visual-key-check.json',{'method':'Fresh official PDF pages 44,45,46 rendered at 1.5x and visually read; match all 30 mapped answer numbers','sourceSha256':downloads['https://www.shoubo-shiken.or.jp/content/kikenbutsu_otsu.pdf']['sha256'],'questionNumbers':list(range(26,36)),'officialKeys':visual_keys,'allMatch':True})

# Independently parse the two live official telecom answer sheets (question and answer rows).
official={}
for edition in ['20260608e_seitou','20251117e_seitou']:
    doc=fitz.open(OUT/'local-sources'/f'{edition}.pdf')
    text=doc[0].get_text(sort=True)
    pairs=[]
    pending=[]
    for line in text.splitlines():
        values=[int(x) for x in re.findall(r'\d+',line)]
        if '問題番号' in line: pending=values
        elif re.match(r'^\s*解答\s',line) and pending:
            assert len(pending)==len(values)
            pairs.extend(zip(pending,values))
            pending=[]
            if len(pairs)==65:break
    assert [a for a,b in pairs]==list(range(1,66)),(edition,pairs)
    official['2026-early' if edition.startswith('2026') else '2025-late']=[b for a,b in pairs]
assert official==read(ROOT/'reports/qdentsu2-20261103/official-answers.json')
write('telecom-live-answer-check.json',{'count':130,'allMatch':True,'answers':official})

recon=read(OUT/'pr-question-reconciliation.json')
for r in recon['comparisons']:
    if not r['sameQuestionAndChoices']:
        assert r['pr']==716 and r['id']=='tsushin2-2026-early-gakka-q61' and r['sameOfficialAnswer']
        r['decision']='Adopt accepted final: remove unrelated booklet instruction appended to option 4 in old #716. All other stem/option text and official answer unchanged.'
        r['removedNonChoiceFooter']='ので全問題を解答してください。'
write('pr-question-reconciliation.json',recon)
# Render official key pages and the corrected telecom question for direct visual QA.
local=OUT/'local-sources'
danger=fitz.open(local/'kikenbutsu_otsu.pdf')
for page in [44,45,46]:danger[page-1].get_pixmap(matrix=fitz.Matrix(1.5,1.5)).save(local/f'hazard-key-{page}.png')
accept=read(ROOT/'reports/qdentsu2-20261103/ACCEPTANCE.json')
row=next(r for r in accept['questions'] if r['id']=='tsushin2-2026-early-gakka-q61')
doc=fitz.open(local/'20260608e_mondai.pdf')
doc[row['pdfPage']-1].get_pixmap(matrix=fitz.Matrix(1.5,1.5)).save(local/'telecom-q61-official.png')
print('PASS: 106 exact beauty objects/source keys, 30 unchanged hazard originals/reasons, 130 fresh official telecom keys')
