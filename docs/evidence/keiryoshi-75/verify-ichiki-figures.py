"""Re-render the 7 visually delimited official figure/table regions.

Run from repository root with PyMuPDF and Pillow installed.
The pixel check depends on the human-reviewed search regions in figure-crops.json;
it cannot establish that the 175 unreviewed questions have no missing figures.
"""
import hashlib
import json
from pathlib import Path

import pymupdf
from PIL import Image, ImageChops

EVIDENCE = Path('docs/evidence/keiryoshi-75')
figures = [f for f in json.loads((EVIDENCE / 'figure-crops.json').read_text()) if f['subject'] == '一基']
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
result = dict(scope='一基25問の目視照合で図表と分類した7問のみ。全200問の図表完了を意味しない。',
              threshold='All nonwhite RGB pixels', figures=results)
(EVIDENCE / 'ichiki-figure-pixel-audit.json').write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n')
print(f'{len(results)} figure/table crops: hashes, margins, containment and exact pixels passed')
