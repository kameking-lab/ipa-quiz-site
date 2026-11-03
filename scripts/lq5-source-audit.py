"""Question-ID reconciliation and ordinary HTTPS source retrieval for LQ5."""
import concurrent.futures
import hashlib
import json
from pathlib import Path
import re
import subprocess
import urllib.request
import fitz

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'reports/lq5-20261104'
LOCAL=OUT/'local-sources'
LOCAL.mkdir(exist_ok=True)
(OUT/'.gitignore').write_text('local-sources/\n',encoding='utf-8')
def read(p): return json.loads(Path(p).read_text(encoding='utf-8-sig'))
def write(name,d): (OUT/name).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def digest(d): return hashlib.sha256(json.dumps(d,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()).hexdigest()
accept=read(ROOT/'reports/qdentsu2-20261103/ACCEPTANCE.json')
urls=[x['url'] for x in accept['sources']]+[
 'https://www.rbc.or.jp/wp-content/uploads/2026/03/53bhikki-1.pdf',
 'https://www.rbc.or.jp/wp-content/uploads/2026/09/54bhikki.pdf',
 'https://www.shoubo-shiken.or.jp/content/kikenbutsu_otsu.pdf',
]
def fetch(url):
    p=LOCAL/url.rsplit('/',1)[1]
    try:
        if not p.exists():
            with urllib.request.urlopen(url,timeout=45) as r:
                body=r.read()
                if not body.startswith(b'%PDF'): raise ValueError('not a PDF; no bypass attempted')
                p.write_bytes(body)
        body=p.read_bytes()
        sha=hashlib.sha256(body).hexdigest()
        doc=fitz.open(p)
        (LOCAL/(p.stem+'.txt')).write_text('\n'.join(f'\n--- PAGE {i+1} ---\n'+page.get_text(sort=True) for i,page in enumerate(doc)),encoding='utf-8')
        return {'url':url,'qualification':'美容師' if 'rbc.or.jp' in url else '危険物乙1・2・6' if 'shoubo-' in url else '2級電気通信','edition':p.stem,'sha256':sha,'pages':len(doc),'status':'retrieved','path':str(p.relative_to(ROOT)), 'priorHashMatches': next((x['sha256']==sha for x in accept['sources'] if x['url']==url), None)}
    except Exception as e:
        return {'url':url,'qualification':'美容師' if 'rbc.or.jp' in url else '危険物乙1・2・6' if 'shoubo-' in url else '2級電気通信','edition':p.stem,'status':'unavailable','reason':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    downloads=list(pool.map(fetch,urls))
write('official-downloads.json', downloads)
write('unavailable-pdfs.json',[r for r in downloads if r['status']!='retrieved'])
print('Official PDFs:', [(r['edition'],r['status'],r.get('priorHashMatches')) for r in downloads],flush=True)

# The seven old Draft PRs are alternatives, not additive question counts.
prs={746:'d80f53199f8ae0db3c900a3a0821f9cc0931189a',745:'1ebf3f38470bff6de98858b48b87dafe1512a0d7',740:'db011adcabb796124d0be461a9b4f77c996fb34c',730:'6cfb289518192cfe76296e0cfdcd5549ced5c050',727:'f381bba7935285c56a2101f34df66cae3b16a356',724:'14fc0e0fe69f5423b77c49660854b29759ab472d',716:'01fd0dd2c110474936b8a26a868ef40277b79ed3'}
final={}
for p in (ROOT/'data/questions/tsushin2').rglob('*.json'):
    d=read(p)
    if not isinstance(d,dict) or 'questions' not in d: continue
    for q in d['questions']:
        id=f"tsushin2-{d['year']}-{d['season']}-gakka-q{q['number']}"
        assert id not in final
        final[id]={'path':str(p.relative_to(ROOT)),'raw':q,'originalHash':digest({'question':q['question'],'choices':q['choices']}),'answer':q['officialAnswerNumbers']}
assert len(final)==130
rows=[]
summary=[]
for pr,head in prs.items():
    paths=subprocess.check_output(['git','ls-tree','-r','--name-only',head,'data/questions/tsushin2'],cwd=ROOT,text=True).splitlines()
    seen=set()
    count=0
    for path in paths:
        if not path.endswith('.json'):continue
        raw=subprocess.check_output(['git','show',f'{head}:{path}'],cwd=ROOT)
        d=json.loads(raw)
        if not isinstance(d,dict) or 'questions' not in d:continue
        for q in d['questions']:
            id=f"tsushin2-{d['year']}-{d['season']}-gakka-q{q['number']}"
            assert id in final, (pr,id)
            selected=final[id]
            original=digest({'question':q['question'],'choices':q['choices']})
            rows.append({'pr':pr,'head':head,'sourcePath':path,'id':id,'sourceOriginalHash':original,'selectedOriginalHash':selected['originalHash'],'sameQuestionAndChoices':original==selected['originalHash'],'sourceOfficialAnswer':q['officialAnswerNumbers'],'selectedOfficialAnswer':selected['answer'],'sameOfficialAnswer':q['officialAnswerNumbers']==selected['answer'],'selectedPath':selected['path'],'selectedRawContentIdentical':digest(q)==digest(selected['raw']),'decision':'keep final independently accepted 33fbd0a version; preserve reference-only Q21; one ID only'})
            seen.add(id)
            count+=1
    summary.append({'pr':pr,'head':head,'uniqueIDs':len(seen),'occurrences':count,'ids':sorted(seen)})
write('pr-question-reconciliation.json',{'selection':'qual/qdentsu2-20261103 @ 33fbd0a185a1c04574329716e44eb2f787c2bca4','finalUniqueIDs':130,'oldPRs':summary,'comparisons':rows})
print('PR reconciliation:',len(rows),'comparisons; changed originals:',[(r['pr'],r['id']) for r in rows if not r['sameQuestionAndChoices']], 'answer differences:',[(r['pr'],r['id']) for r in rows if not r['sameOfficialAnswer']],flush=True)
