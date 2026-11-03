"""Verify exact official PDF crops. Usage: python scripts/verify-cloud-ap-fe-images.py PDF_CACHE
Requires PyMuPDF and Pillow; downloads are deliberately separate from verification.
PDF_CACHE contains files listed in reports/cloud-ap-fe-latest2/sources.json.
"""
import hashlib
import io
import json
from pathlib import Path
import sys
import pymupdf
from PIL import Image, ImageChops

root = Path(__file__).resolve().parents[1]
cache = Path(sys.argv[1])
evidence = root / 'reports/cloud-ap-fe-latest2'
sources = json.loads((evidence / 'sources.json').read_text())
docs = {}
for source in sources:
    path = cache / source['file']
    assert hashlib.sha256(path.read_bytes()).hexdigest() == source['sha256'], path.name
    docs[source['url']] = pymupdf.open(path)
images = json.loads((evidence / 'images.json').read_text())
for item in images:
    path = root / item['file']
    assert hashlib.sha256(path.read_bytes()).hexdigest() == item['sha256'], path
    page = docs[item['source']][item['page'] - 1]
    pix = page.get_pixmap(matrix=pymupdf.Matrix(2, 2), clip=pymupdf.Rect(item['clip']))
    expected = Image.frombytes('RGB', [pix.width, pix.height], pix.samples)
    actual = Image.open(path).convert('RGB')
    assert expected.size == actual.size, path
    assert ImageChops.difference(expected, actual).getbbox() is None, path
print(f'Verified {len(images)} lossless official PDF crops.')
