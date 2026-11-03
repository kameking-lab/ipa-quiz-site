"""Locate content residuals against accepted page images, with tolerance for raster/font shifts.
Not a semantic acceptance by itself: inspect the residual crops and record adjudication.
"""
import json
import argparse
import tempfile
from pathlib import Path
import cv2
import fitz
import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--source-dir', type=Path, default=Path(tempfile.gettempdir()) / 'codex-work/qkishou-fix')
TEMP = parser.parse_args().source_dir
manifest = json.loads((ROOT / 'data/qualification-staging/kisho-65-66-private/source-pages.json').read_text(encoding='utf-8'))
results = []
for a in manifest['assets']:
    if a['kind'] != 'question' or 'gakka(' not in a['sourcePdf']:
        continue
    old = cv2.imread(str(ROOT / 'private-assets/kisho-65-66' / a['assetId']), 0)
    round_number = int(a['assetId'][1:3])
    doc = fitz.open(TEMP / str(round_number) / Path(a['sourcePdf']).name)
    page = doc[a['physicalPage'] - 1]
    pix = page.get_pixmap(matrix=fitz.Matrix(old.shape[1] / page.rect.width, old.shape[0] / page.rect.height), colorspace=fitz.csGRAY, alpha=False)
    new = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width)
    new = cv2.resize(new, (old.shape[1], old.shape[0]))
    # Match nearby ink in both directions. Large connected unmatched areas require adjudication.
    ob = (old < 150).astype(np.uint8)
    nb = (new < 150).astype(np.uint8)
    kernel = np.ones((5, 5), np.uint8)
    residual = ((ob & (1-cv2.dilate(nb, kernel))) | (nb & (1-cv2.dilate(ob, kernel))))
    grouped = cv2.dilate(residual, np.ones((13, 13), np.uint8))
    count, labels, stats, _ = cv2.connectedComponentsWithStats(grouped)
    boxes = []
    for x,y,w,h,area in stats[1:]:
        ink = int(residual[y:y+h, x:x+w].sum())
        if ink >= 8:
            boxes.append([int(x),int(y),int(w),int(h),ink])
    label = f'{round_number}-{Path(a["sourcePdf"]).stem}-{a["physicalPage"]}'
    crops = []
    for x,y,w,h,ink in boxes:
        pad=25; x0=max(x-pad,0); y0=max(y-pad,0); x1=min(x+w+pad,old.shape[1]); y1=min(y+h+pad,old.shape[0])
        pair=np.hstack([old[y0:y1,x0:x1],new[y0:y1,x0:x1]])
        crops.append(Image.fromarray(pair).convert('RGB'))
    if crops:
        sheet=Image.new('RGB',(max(c.width for c in crops),sum(c.height+28 for c in crops)), 'white')
        draw=ImageDraw.Draw(sheet); y=0
        for i,c in enumerate(crops):
            draw.text((0,y),f'{label} #{i+1} accepted LEFT / current RIGHT',fill='black'); sheet.paste(c,(0,y+25)); y+=c.height+28
        sheet.save(TEMP / f'{label}-residual.png')
    results.append({'assetId':a['assetId'],'page':a['physicalPage'],'acceptedImageSha256':a['sha256'], 'boxes':boxes,'unmatchedInk':int(residual.sum()),'pixels':int(old.size)})
(TEMP / 'residuals.json').write_text(json.dumps(results, indent=2),encoding='utf-8')
print(json.dumps([{'asset':r['assetId'],'boxes':len(r['boxes']),'ink':r['unmatchedInk']} for r in results],indent=2))
