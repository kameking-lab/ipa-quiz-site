"""Verify the LQ3C packet pins, official keys and untouched reserved papers."""
import hashlib,json,re,subprocess,unicodedata
from pathlib import Path
import fitz
ROOT=Path(__file__).resolve().parents[1]
REPORT=ROOT/'reports/LQ3C-20261104'
def read(p): return json.loads((ROOT/p).read_text(encoding='utf-8-sig'))
def sha(p): return hashlib.sha256((ROOT/p).read_bytes()).hexdigest()
scope=read('reports/LQ3C-20261104/scope.json')
baseline=scope['baseline']
basecat=json.loads(subprocess.check_output(['git','show',f'{baseline}:data/exam-library/pe-first/catalog.json'],cwd=ROOT))
catalog=read('data/exam-library/pe-first/catalog.json')
oldids={x['id'] for x in basecat}
newids={x['id'] for x in catalog}-oldids
allowed={(x['year'],int(x['department'][:2])) for x in scope['LQ3C']}
pins=read('reports/LQ3B-20261104/adoption-manifest.json')
results=[]
for pin in pins:
    if pin['paperId'] not in newids: continue
    assert (pin['year'],pin['department']) in allowed
    for name,key in [('payload','payloadSha256'),('officialPdf','officialPdfSha256'),('answerPdf','answerPdfSha256')]:
        assert sha(pin[name])==pin[key],(pin['paperId'],name)
    output=f"data/exam-library/pe-first/{pin['paperId']}.json"
    assert sha(output)==pin['normalizedSha256']
    q=read(output); authored=read(pin['payload'])
    assert len(q)==len(authored)==35
    answerdoc=fitz.open(ROOT/pin['answerPdf'])
    text=unicodedata.normalize('NFKC',answerdoc[pin['answerPage']-1].get_text())
    keys={int(n):int(c) for n,c in re.findall(r'III\s*[-−‐－]\s*(\d+)\s+([1-5])',text)}
    assert len(keys)==35
    for i,(a,b) in enumerate(zip(q,authored),1):
        assert a['number']==b['number']==i
        assert a['correctChoice']==b['answer']==keys[i]
        assert len(a['choiceExplanation']['choices'])==len(b['reasons'])==5
        assert [x['reason'] for x in a['choiceExplanation']['choices']]==b['reasons']
        assert a['sourcePages']==b.get('pages',[b['page']])
        if b.get('text'):
            assert a['text']==b['text']
            assert [x['text'] for x in a['presentation']['choices']]==b['choices']
    for asset,checksum in pin['assets'].items(): assert sha('public'+asset)==checksum
    results.append(dict(paperId=pin['paperId'],officialKeys=35,choiceReasons=175,assets=len(pin['assets']),textQuestions=sum(bool(x.get('text')) for x in authored)))
assert {x['paperId'] for x in results}==newids
# Compare every baseline PE data/asset blob without printing its contents.
tracked=subprocess.check_output(['git','ls-tree','-r','--name-only',baseline,'data/exam-library/pe-first','public/exam-library'],cwd=ROOT).decode().splitlines()
tracked=[name for name in tracked if name.startswith('data/exam-library/pe-first/') or name.startswith('public/exam-library/pe-first-')]
unchanged=0
for name in tracked:
    if name.endswith('/catalog.json'): continue
    original=subprocess.check_output(['git','show',f'{baseline}:{name}'],cwd=ROOT)
    current=(ROOT/name).read_bytes()
    if name.endswith('.json'): original=original.replace(b'\r\n',b'\n'); current=current.replace(b'\r\n',b'\n')
    assert current==original,name
    unchanged+=1
evidence=dict(baseline=baseline,newPapers=results,questions=len(results)*35,reasons=len(results)*175,baselineFilesUnchanged=unchanged,LQ3DNewPapers=0)
(REPORT/'verification.json').write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+'\n',encoding='utf8',newline='\n')
print(f'{len(results)} complete papers / {len(results)*35} keys / {len(results)*175} reasons; {unchanged} baseline files unchanged; LQ3D new papers=0')
