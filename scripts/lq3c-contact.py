"""Read-only PDF contact sheets for LQ3C proofreading (local cache only)."""
import sys
from pathlib import Path
import fitz
from PIL import Image

year, department = map(int, sys.argv[1:3])
root = Path(__file__).resolve().parents[1]
doc = fitz.open(root / f'reports/LQ3B-20261104/sources/{year}-{department:02}.pdf')
out = root / 'reports/LQ3C-20261104/local'
out.mkdir(parents=True, exist_ok=True)
for start in range(0, len(doc), 4):
    sheet = Image.new('RGB', (2000, 2830), 'white')
    for j, i in enumerate(range(start, min(start + 4, len(doc)))):
        pix = doc[i].get_pixmap(matrix=fitz.Matrix(1.7, 1.7))
        im = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
        im.thumbnail((1000, 1415))
        sheet.paste(im, ((j % 2) * 1000, (j // 2) * 1415))
    sheet.save(out / f'{year}-{department:02}-{start//4+1}.png')
print(f'{year}-{department:02}: {len(doc)} pages rendered')
