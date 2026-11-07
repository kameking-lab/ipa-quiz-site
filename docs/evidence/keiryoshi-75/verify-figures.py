"""Re-render all 55 visually delimited official figure/table regions.

Run from repository root with PyMuPDF and Pillow installed.
The pixel check depends on the human-reviewed search regions in figure-crops.json;
figure classification is separately recorded for all 200 question pages.
"""
import hashlib
import json
from pathlib import Path

import pymupdf
from PIL import Image, ImageChops

EVIDENCE = Path('docs/evidence/keiryoshi-75')
figures = json.loads((EVIDENCE / 'figure-crops.json').read_text())
results = []
for figure in figures:
    pdf = Path('data/raw_pdfs/keiryoshi/r06-75') / Path(figure['sourcePdfUrl']).name
    assert hashlib.sha256(pdf.read_bytes()).hexdigest() == figure['sourceSha256']
    with pymupdf.open(pdf) as doc:
        page = doc[figure['pdfPage'] - 1]
        scale = figure['renderScale']
        pixmap = page.get_pixmap(matrix=pymupdf.Matrix(scale, scale), alpha=False)
    source = Image.frombytes('RGB', (pixmap.width, pixmap.height), pixmap.samples)
    assert list(source.size) == figure['renderedPagePixels']
    region = figure['officialFigureSearchPixels']
    crop = figure['cropPixels']
    roi = source.crop(region)
    ink = ImageChops.difference(roi, Image.new('RGB', roi.size, 'white'))
    channels = ink.split()
    mask = ImageChops.lighter(ImageChops.lighter(channels[0], channels[1]), channels[2]).point(lambda x: 255 if x else 0)
    bounds = mask.getbbox()
    assert bounds
    # Search-region edges must have white space; catches a too-tight reference ROI.
    assert min(bounds[0], bounds[1], roi.width-bounds[2], roi.height-bounds[3]) >= 2
    assert crop[0] <= region[0]+bounds[0]-12
    assert crop[1] <= region[1]+bounds[1]-12
    assert crop[2] >= region[0]+bounds[2]+12
    assert crop[3] >= region[1]+bounds[3]+12
    mask.paste(0, (crop[0]-region[0], crop[1]-region[1], crop[2]-region[0], crop[3]-region[1]))
    assert not mask.getbbox()
    path = Path('public' + figure['image'])
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    assert digest == figure['imageSha256']
    with Image.open(path) as actual:
        expected = source.crop(crop)
        assert actual.size == expected.size
        assert ImageChops.difference(actual.convert('RGB'), expected).getbbox() is None
    results.append(dict(image=figure['image'], imageSha256=digest,
                        missingInkPixels=0, sourceCropPixelEqual=True,
                        requiredMarginPixels=12, searchRegionEdgeWhitespace=True))
result = dict(scope='全200問を目視分類した図表55問。原本領域の選定は目視に依存し、選定後の画素を機械検証。',
              threshold='All nonwhite RGB pixels', figures=results)
(EVIDENCE / 'figure-pixel-audit.json').write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n')
print(f'{len(results)} figure/table crops: hashes, margins, containment and exact pixels passed')
