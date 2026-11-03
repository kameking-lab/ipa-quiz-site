"""Verify current official archives and render public source pages (PDFs stay in temp)."""
import hashlib
import json
from pathlib import Path
import zipfile
import argparse
import tempfile
import urllib.request
import fitz

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--source-dir', type=Path, default=Path(tempfile.gettempdir()) / 'codex-work/qkishou-fix')
parser.add_argument('--download', action='store_true', help='Retrieve the two pinned official ZIPs')
args = parser.parse_args()
TEMP = args.source_dir
TEMP.mkdir(parents=True, exist_ok=True)

def digest(data):
    return hashlib.sha256(data).hexdigest()

sources = json.loads((ROOT / 'reports/qkishou-20261103/OFFICIAL-SOURCE-CHECK.json').read_text(encoding='utf-8'))
manifest = json.loads((ROOT / 'data/qualification-staging/kisho-65-66-private/source-pages.json').read_text(encoding='utf-8'))
documents = {}
for source in sources:
    archive = TEMP / source['url'].split('/')[-1]
    if args.download:
        urllib.request.urlretrieve(source['url'], archive)
    assert digest(archive.read_bytes()) == source['sha256']
    with zipfile.ZipFile(archive) as z:
        for pdf in source['pdfs']:
            data = z.read(pdf['member'])
            assert digest(data) == pdf['sha256']
            name = Path(pdf['member']).name
            target = TEMP / str(source['round']) / name
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(data)
            documents[(source['round'], name)] = fitz.open(stream=data, filetype='pdf')

assets = []
for asset in manifest['assets']:
    round_number = int(asset['assetId'][1:3])
    name = Path(asset['sourcePdf']).name
    # Preserve any accepted cropped answer diagrams, whose source PDF is unchanged.
    old = ROOT / 'private-assets/kisho-65-66' / asset['assetId']
    if asset['kind'] == 'answer-diagram':
        data = old.read_bytes()
        assert digest(data) == asset['sha256']
        pix = fitz.Pixmap(str(old))
    else:
        page = documents[(round_number, name)][asset['physicalPage'] - 1]
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
        data = pix.tobytes('png')
    path = ROOT / 'public/images/kisho' / asset['assetId']
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)
    assets.append({'assetId': asset['assetId'], 'url': '/images/kisho/' + asset['assetId'],
                   'width': pix.width, 'height': pix.height, 'sha256': digest(data),
                   'round': round_number, 'sourcePdf': name, 'physicalPages': [asset['physicalPage']] if 'physicalPage' in asset else asset['sourcePageCandidates']})
(ROOT / 'data/questions/kisho/public-assets.json').write_text(json.dumps(assets, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Verified 2 archives / 14 PDFs; rendered {len(assets)} source assets')
