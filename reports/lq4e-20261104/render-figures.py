import json, hashlib, math, sys
from pathlib import Path
import fitz

root = Path.cwd().resolve()
assets = (root/'data/qualification-staging/lq4e-engineer-first/assets').resolve()
inventory = json.loads((root/'reports/lq4b-20261104/source-inventory.json').read_text(encoding='utf-8'))
plans = []
protected = set()
for existing in assets.parent.glob('*.json'):
    accepted = json.loads(existing.read_text(encoding='utf-8'))
    if accepted.get('status') == 'PARTIAL_CONTENT_ACCEPTED_NOT_REGISTERED':
        protected.update((root/f['path']).resolve() for q in accepted['questions'] for f in q.get('figures',[]))
paths = [Path(p) for p in sys.argv[1:]] if len(sys.argv)>1 else list(Path('data/qualification-staging/lq4e-engineer-first').glob('*figures.json'))
for path in paths:
    path = path.resolve()
    if path.parent != assets.parent or path.suffix != '.json':
        raise ValueError('Manuscript must be inside the LQ4E staging directory')
    data = json.loads(path.read_text(encoding='utf-8'))
    if data['status'] != 'DRAFT_PENDING_INDEPENDENT_REVIEW' or data['qualification'] != 'gijutsushi1-kikai' or data['subject'] not in ['basis','mechanical']:
        raise ValueError('Only unpublished LQ4E drafts can be rendered')
    source = next(s for s in inventory if s['year']==data['year'] and s['kind']==data['subject'] and s['qualification']==data['qualification'])
    if hashlib.sha256(Path(source['path']).read_bytes()).hexdigest()!=source['sha256']:
        raise ValueError('Source SHA mismatch')
    doc=fitz.open(source['path'])
    for q in data['questions']:
        if q['publicGo'] is not False or q['needsIndependentReview'] is not True:
            raise ValueError('Only unpublished drafts can be rendered')
        for f in q.get('figures',[]):
            target=(root/f['path']).resolve()
            if not target.is_relative_to(assets) or target.suffix.lower()!='.png':
                raise ValueError('Figure target outside exclusive LQ4E assets')
            if target in protected:
                raise ValueError('Figure target belongs to accepted manuscript')
            page=f['sourceQuestionPage']; clip=f['sourceClipPdfPoints']; dpi=f['renderDpi']
            if not isinstance(page,int) or not 1<=page<=len(doc) or page!=q['sourceQuestionPage'] or not isinstance(dpi,int) or not 160<=dpi<=600:
                raise ValueError('Invalid source page or dpi')
            rect=doc[page-1].rect
            if len(clip)!=4 or not all(isinstance(v,(int,float)) and math.isfinite(v) for v in clip) or not (0<=clip[0]<clip[2]<=rect.width and 0<=clip[1]<clip[3]<=rect.height):
                raise ValueError('Invalid crop bounds')
    plans.append((path,data,doc))
# Validate all input scopes and every output before the first write.
targets=[(root/f['path']).resolve() for _,data,_ in plans for q in data['questions'] for f in q.get('figures',[])]
if len(set(targets))!=len(targets):
    raise ValueError('Duplicate figure target')
for path,data,doc in plans:
    for q in data['questions']:
        for f in q.get('figures',[]):
            target=(root/f['path']).resolve(); target.parent.mkdir(parents=True,exist_ok=True)
            doc[f['sourceQuestionPage']-1].get_pixmap(dpi=f['renderDpi'],clip=fitz.Rect(f['sourceClipPdfPoints']),alpha=False).save(str(target))
            f['sha256']=hashlib.sha256(target.read_bytes()).hexdigest()
    path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
    print(path.name,len(data['questions']))
