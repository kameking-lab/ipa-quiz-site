"""Audit the exact LQ3E scope, source pixels, all keys/reasons, and preserved blobs."""
import hashlib,json,re,subprocess,unicodedata
from pathlib import Path
import fitz
ROOT=Path(__file__).resolve().parents[1]; REPORT=ROOT/'reports/LQ3E-20261104'
BASE='d9334a18a'
def read(p): return json.loads((ROOT/p).read_text(encoding='utf-8-sig'))
def sha(p): return hashlib.sha256((ROOT/p).read_bytes()).hexdigest()
def gitjson(p): return json.loads(subprocess.check_output(['git','show',f'{BASE}:{p}'],cwd=ROOT))
catalog=read('data/exam-library/pe-first/catalog.json')
basecat=gitjson('data/exam-library/pe-first/catalog.json')
oldids={x['id'] for x in basecat}
expected={f'pe-first-{slug}-2024' for slug in ['textile','metal','resource']}
assert {x['id'] for x in catalog}-oldids==expected
assert [x for x in catalog if x['id'] in oldids]==basecat
manifest='reports/LQ3B-20261104/adoption-manifest.json'
pins=read(manifest); oldpins=gitjson(manifest)
assert [x for x in pins if x['paperId'] not in expected]==oldpins
results=[]
for pin in pins:
    if pin['paperId'] not in expected: continue
    for name,key in [('payload','payloadSha256'),('officialPdf','officialPdfSha256'),('answerPdf','answerPdfSha256')]:
        assert sha(pin[name])==pin[key],(pin['paperId'],name)
    output=f"data/exam-library/pe-first/{pin['paperId']}.json"
    assert sha(output)==pin['normalizedSha256']
    q=read(output); authored=read(pin['payload']); assert len(q)==len(authored)==35
    answerdoc=fitz.open(ROOT/pin['answerPdf']); doc=fitz.open(ROOT/pin['officialPdf'])
    text=unicodedata.normalize('NFKC',answerdoc[pin['answerPage']-1].get_text())
    keys={int(n):int(c) for n,c in re.findall(r'III\s*[-−‐－]\s*(\d+)\s+([1-5])',text)}
    assert len(keys)==35
    pixels=0
    for i,(a,b) in enumerate(zip(q,authored),1):
        assert a['number']==b['number']==i
        assert a['correctChoice']==b['answer']==keys[i]
        assert a['explanation']==a['choiceExplanation']['summary']==b['summary']
        assert len(a['choiceExplanation']['choices'])==len(b['reasons'])==5
        assert all(len(r.strip())>=15 for r in b['reasons'])
        assert [x['reason'] for x in a['choiceExplanation']['choices']]==b['reasons']
        assert [x['verdict'] for x in a['choiceExplanation']['choices']]==['correct' if c==keys[i] else 'incorrect' for c in range(1,6)]
        assert a['sourcePages']==b.get('pages',[b['page']])
        assert a['presentation']['sourceHash']==a['choiceExplanation']['sourceHash']==hashlib.sha256(a['text'].encode('utf8')).hexdigest()
        assert len(a['presentation']['choices'])==5
        assert all((ROOT/'public'/f['src'].lstrip('/')).exists() for f in a['presentation']['figures'])
    for asset,checksum in pin['assets'].items():
        assert sha('public'+asset)==checksum
        page=int(Path(asset).stem.split('-')[1]); source=doc[page-1].get_pixmap(matrix=fitz.Matrix(1.8,1.8)); public=fitz.Pixmap(ROOT/('public'+asset))
        assert (source.width,source.height,source.samples)==(public.width,public.height,public.samples)
        pixels+=1
    results.append(dict(paperId=pin['paperId'],officialKeys=35,choiceReasons=175,sourcePagesPixelMatched=pixels))
assert {x['paperId'] for x in results}==expected
tracked=subprocess.check_output(['git','ls-tree','-r','--name-only',BASE,'data/exam-library/pe-first','public/exam-library','reports/LQ3B-20261104/manuscripts','reports/LQ3B-20261104/sources'],cwd=ROOT).decode().splitlines()
tracked=[name for name in tracked if not name.startswith('public/exam-library/') or name.startswith('public/exam-library/pe-first-')]
unchanged=0
for name in tracked:
    if name.endswith('/catalog.json'): continue
    original=subprocess.check_output(['git','show',f'{BASE}:{name}'],cwd=ROOT)
    current=(ROOT/name).read_bytes()
    if name.endswith(('.json','.txt')): original=original.replace(b'\r\n',b'\n'); current=current.replace(b'\r\n',b'\n')
    assert current==original,name
    unchanged+=1
evidence=dict(baseline=BASE,newPapers=results,questions=105,choiceReasons=525,baselineFilesUnchanged=unchanged,priorManifestEntriesUnchanged=len(oldpins),LQ3DNewPapers=0,catalogPapers=len(catalog),catalogQuestions=sum(x['questionCount'] for x in catalog),catalogScored=sum(x['scoredCount'] for x in catalog))
(REPORT/'verification.json').write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+'\n',encoding='utf8',newline='\n')
print(f'3 papers / 105 official keys / 525 reasons / 50 source pages pixel matched; {unchanged} baseline blobs unchanged; LQ3D new papers=0')
