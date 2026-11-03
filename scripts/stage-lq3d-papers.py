"""Stage only accepted complete papers in shared catalog/manifest files.

The working files may contain another paper being reviewed. Its catalog and
manifest entries must not enter the per-department commit prematurely.
"""
import json
import subprocess
import sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
requested=set(sys.argv[1:])
assert requested and all(x.startswith('pe-first-') for x in requested)
catalog='data/exam-library/pe-first/catalog-lq3d.json'
manifest='reports/LQ3D-20261104/adoption-manifest.json'
probe=subprocess.run(['git','show',f'HEAD:{catalog}'],cwd=ROOT,capture_output=True)
base=json.loads(probe.stdout) if probe.returncode == 0 else []
allowed={x['id'] for x in base}|requested
for name,key in [(catalog,'id'),(manifest,'paperId')]:
    rows=json.loads((ROOT/name).read_text(encoding='utf8'))
    selected=[x for x in rows if x[key] in allowed]
    assert requested.issubset({x[key] for x in selected})
    data=(json.dumps(selected,ensure_ascii=False,indent=2)+'\n').encode('utf8')
    sha=subprocess.check_output(['git','hash-object','-w','--stdin'],input=data,cwd=ROOT).decode().strip()
    subprocess.run(['git','update-index','--add','--cacheinfo',f'100644,{sha},{name}'],cwd=ROOT,check=True)
print('Staged accepted catalog/manifest entries:',', '.join(sorted(requested)))
