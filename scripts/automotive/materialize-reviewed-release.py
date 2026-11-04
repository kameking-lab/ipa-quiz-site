"""Materialize existing reviewed content and image pages without rewriting questions."""
import hashlib
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / 'data/questions/automotive'
STAGING = ROOT / 'data/qualification-staging/automotive/latest-two'
BASE = Path('C:/Users/kanet/Documents/Codex/2026-10-23')
subjects = {
    '1-small-written': ('一級小型自動車整備士（筆記）', 50),
    '2-gasoline': ('二級ガソリン自動車整備士', 40),
    '2-diesel': ('二級ジーゼル自動車整備士', 40),
    '2-chassis': ('二級自動車シャシ整備士', 30),
    '2-motorcycle': ('二級二輪自動車整備士', 40),
    '3-chassis': ('三級自動車シャシ整備士', 30),
    '3-gasoline': ('三級自動車ガソリン・エンジン整備士', 30),
    '3-diesel': ('三級自動車ジーゼル・エンジン整備士', 30),
    '3-motorcycle': ('三級二輪自動車整備士', 30),
    'body': ('自動車車体整備士', 40),
    'electrical': ('自動車電気装置整備士', 40),
}
raw = json.loads((DATA / 'reviewed.json').read_text(encoding='utf-8'))
originals = json.loads((STAGING / 'latest-two.json').read_text(encoding='utf-8'))['writtenOriginals']
assets = {}
for p in STAGING.glob('figures/*.webp'):
    assets[p.name] = p
for directory in [BASE / 'task-4', BASE / 'task-5']:
    for p in directory.rglob('*.webp'):
        assets.setdefault(p.name, p)
public = ROOT / 'public/automotive'
public.mkdir(parents=True, exist_ok=True)
bindings = {}
for q in raw:
    bindings[q['id']] = []
    assert not q['sourceFigureRequired'] or q['sourceFigureAssets'], q['id']
    for asset in q['sourceFigureAssets']:
        src = assets[Path(asset['relativePath']).name]
        sha = hashlib.sha256(src.read_bytes()).hexdigest()
        target = public / (sha + '.webp')
        if not target.exists():
            shutil.copyfile(src, target)
        bindings[q['id']].append({'url': '/automotive/' + target.name,
                                  'physicalPage': asset['physicalPage'], 'sha256': sha})
(DATA / 'assets.json').write_text(json.dumps(bindings, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
metadata = [{'subject': s, 'exam': 'jidosha-' + s, 'name': name, 'questionsPerPaper': count,
             'stored': sum(q['subject'] == s for q in originals),
             'reviewed': sum(q['subject'] == s for q in raw)} for s, (name, count) in subjects.items()]
(DATA / 'qualifications.json').write_text(json.dumps(metadata, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(json.dumps({'questions': len(raw), 'qualifications': len(metadata), 'assets': len(list(public.glob('*.webp')))},ensure_ascii=False))
