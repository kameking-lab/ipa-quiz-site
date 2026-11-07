"""Audit LQ3D sources, pins, complete papers, and unchanged baseline assets."""
import hashlib,json,re,subprocess,unicodedata
from pathlib import Path
import fitz
ROOT=Path(__file__).resolve().parents[1]
BASE='d9334a18a'
REPORT=ROOT/'reports/LQ3D-20261104'
def read(path): return json.loads((ROOT/path).read_text(encoding='utf-8-sig'))
def sha(path): return hashlib.sha256((ROOT/path).read_bytes()).hexdigest()
pins=read('reports/LQ3D-20261104/adoption-manifest.json')
catalog=read('data/exam-library/pe-first/catalog-lq3d.json')
assert {p['paperId'] for p in pins}=={c['id'] for c in catalog}
results=[]
for pin in pins:
    assert pin['year']==2024 and pin['department'] in (10,12,14,15,17,18,19,20)
    for field in ('payload','officialPdf','answerPdf'):
        assert sha(pin[field])==pin[field+'Sha256']
    output=f"data/exam-library/pe-first/{pin['paperId']}.json"
    assert sha(output)==pin['normalizedSha256']
    questions,authored=read(output),read(pin['payload'])
    text=unicodedata.normalize('NFKC',fitz.open(ROOT/pin['answerPdf'])[pin['answerPage']-1].get_text())
    keys={int(n):int(a) for n,a in re.findall(r'III\s*[-−‐－]\s*(\d+)\s+([1-5])',text)}
    assert len(keys)==len(questions)==len(authored)==35
    for number,(q,a) in enumerate(zip(questions,authored),1):
        assert q['number']==a['number']==number
        assert q['correctChoice']==a['answer']==keys[number]
        assert q['sourcePages']==a.get('pages',[a['page']])
        assert len(a['reasons'])==5 and all(len(r.strip())>=15 for r in a['reasons'])
        assert [r['reason'] for r in q['choiceExplanation']['choices']]==a['reasons']
        assert q['explanation']==q['choiceExplanation']['summary']==a['summary']
        assert len(q['presentation']['figures'])==len(q['sourcePages'])
        sourcehash=hashlib.sha256(q['text'].encode('utf-8')).hexdigest()
        assert q['presentation']['sourceHash']==q['choiceExplanation']['sourceHash']==sourcehash
    for asset,digest in pin['assets'].items(): assert sha('public'+asset)==digest
    results.append(dict(paperId=pin['paperId'],officialKeys=35,reasons=175,images=len(pin['assets'])))
# Git blobs avoid invoking a subprocess once per baseline image.
tree=subprocess.check_output(['git','ls-tree','-r','-z',BASE,'data/exam-library/pe-first','public/exam-library','reports/LQ3B-20261104'],cwd=ROOT)
unchanged=0
for item in tree.split(b'\0'):
    if not item: continue
    meta,name=item.split(b'\t',1); name=name.decode('utf-8')
    if name.startswith('public/exam-library/') and not name.startswith('public/exam-library/pe-first-'): continue
    data=(ROOT/name).read_bytes()
    if name.endswith(('.json','.txt','.md','.log','.py','.ts','.tsx')): data=data.replace(b'\r\n',b'\n')
    blob=hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
    assert blob==meta.split()[2].decode(),name
    unchanged+=1
diff=subprocess.check_output(['git','diff',BASE,'--unified=0','--','*.ts','*.tsx','*.py','*.json','*.md'],cwd=ROOT).decode('utf-8')
added='\n'.join(line[1:] for line in diff.splitlines() if line.startswith('+') and not line.startswith('+++'))
secret_patterns=[r'AKIA[0-9A-Z]{16}',r'gh[pousr]_[A-Za-z0-9]{30,}',r'sk-[A-Za-z0-9_-]{32,}',r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----']
secret_count=sum(len(re.findall(pattern,added)) for pattern in secret_patterns)
assert secret_count==0,'Secret-shaped additions found; values intentionally withheld'
evidence=dict(baseline=BASE,papers=results,questions=35*len(results),choiceReasons=175*len(results),baselineFilesUnchanged=unchanged,secretPatternMatches=secret_count)
(REPORT/'verification.json').write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
print(f'{len(results)} papers / {len(results)*35} official keys / {len(results)*175} reasons; baseline unchanged={unchanged}; secret matches={secret_count}')
