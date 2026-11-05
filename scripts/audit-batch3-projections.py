"""Independent field and official-key comparison of INT7 outputs to source records."""
import hashlib
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
keys = list('アイウエオカキクケコサシスセソタ')
receipt = json.loads((root/'reports/int7-20261105/projection-receipt.json').read_text(encoding='utf8'))
outputs = {}
for path in (root/'data/questions/batch3').glob('*.json'):
    for q in json.loads(path.read_text(encoding='utf8')):
        assert q['id'] not in outputs
        outputs[q['id']] = q
excluded = {q['id'] for q in receipt['excluded']}
checked = 0
originals = []
for code in list(receipt['counts']):
    if code == 'mokuzo-kenchikushi':
        continue
    folder = root/'data/qualification-staging'/code
    if code == 'kenchikushi2':
        for path in folder.glob('*.ts'):
            if re.fullmatch(r'(mokuzo-)?202[56]-[IV]+\.ts', path.name):
                text=path.read_text(encoding='utf8'); originals.extend((code,q) for q in json.loads(text[text.index('= [')+2:text.rindex(']')+1]))
    else:
        for path in folder.glob('*.json'):
            if not re.match(r'202[456](?:-|\.)',path.name):continue
            obj=json.loads(path.read_text(encoding='utf-8-sig'))
            originals.extend((code,q) for q in (obj.get('questions',[]) if isinstance(obj,dict) else obj))
for code, source in originals:
    if source['id'] in excluded:
        assert source.get('scoring') == 'all-correct' or source.get('scoring',{}).get('kind') == 'all-correct'
        assert source['id'] not in outputs
        continue
    target=outputs[source['id']]
    assert target['publicAllowed'] is True and target['needsReview'] is False
    if source.get('question') or source.get('text'):
        assert source.get('question',source.get('text')) in target['question'],source['id']
    original_choices=source.get('choices',{})
    if code != 'sokuryoshi':
        original_values=[c['text'] if isinstance(c,dict) else c for c in original_choices] if isinstance(original_choices,list) else list(original_choices.values())
        assert list(target.get('choices',{}).values())==original_values,source['id']
    if target['type'] == 'multiple-choice':
        raw=source.get('answer')
        if raw is None:
            raw=source.get('acceptedAnswerNumbers') or [source.get('correctChoice',source.get('officialAnswerNumber'))]
            expected={keys[int(x)-1] for x in raw}
        else:expected=set(raw if isinstance(raw,list) else [raw])
        assert set(target['answer'] if isinstance(target['answer'],list) else [target['answer']])==expected,source['id']
        assert target.get('requiredSelections')==source.get('requiredSelections'),source['id']
    else:
        assert code=='sokuryoshi' and target['type']=='descriptive'
        assert target['modelAnswer'] and target['answerImageUrls']
        assert len(target['imageUrls'])==len(source['originalQuestion']['sourcePages'])+len(source['answerSheetPages'])
    for field in ['originalContent','lawReferenceDate','isCalculation','officialAnswerNumber','fiscalYear','explanationSections']:
        if source.get(field) is not None:assert target.get(field)==source[field],(source['id'],field)
    for field in ['sourcePdfUrl','sourceAnswerUrl','sourceAttribution']:
        if source.get(field):assert target[field]==source[field],(source['id'],field)
    if source.get('sourceIssue'):
        assert target['questionNotice']==source['sourceIssue'].removesuffix('公開前に要確認。').strip()
    checked+=1
assert checked==1782 and len(excluded)==2 and len(originals)==1784
for path,item in receipt['assets'].items():
    for file in [root/path,root/'public'/item['url'][1:]]:
        assert hashlib.sha256(file.read_bytes()).hexdigest()==item['sha256']
result={'sourceUnits':len(originals),'publicUnits':checked,'excludedAllCorrect':len(excluded),'sourceAssetMappings':len(receipt['assets']),'allFieldsAndOfficialKeysMatch':True}
(root/'reports/int7-20261105/projection-audit.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf8')
print(json.dumps(result))
