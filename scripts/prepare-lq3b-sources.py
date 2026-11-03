"""Render cached official LQ3B PDFs for local Windows OCR. No network access.

python scripts/prepare-lq3b-sources.py
./scripts/ocr-lq3b.ps1 -ImageDirectory <absolute reports/LQ3B-20261104/rendered>
python scripts/prepare-lq3b-sources.py --collect-ocr

OCR drafts are evidence only; they must be checked against the PDF before use.
"""
import argparse
import hashlib
import json
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / 'reports/LQ3B-20261104'


def collect(name):
    texts = []
    for path in sorted((REPORT/'rendered').glob(name+'-*.ocr.json')):
        lines = json.loads(path.read_text(encoding='utf-8-sig'))
        words = [w for line in lines for w in line['words']]
        words.sort(key=lambda w:w['y']+w['height']/2)
        rows = []
        for word in words:
            cy = word['y'] + word['height']/2
            if not rows or cy-rows[-1][0]>12:
                rows.append((cy,[word]))
            else:
                rows[-1][1].append(word)
        text='\n'.join(''.join(w['text'] for w in sorted(ws,key=lambda w:w['x'])) for _,ws in rows)
        texts.append('=== '+path.stem+' ===\n'+text)
    if texts:
        (REPORT/f'{name}-sorted.txt').write_text('\n'.join(texts),encoding='utf8',newline='\n')
    return len(texts)


if __name__ == '__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--collect-ocr',action='store_true')
    args=parser.parse_args()
    for item in json.loads((REPORT/'acquisition.json').read_text(encoding='utf8')):
        if item['status'] != 'downloaded':
            continue
        name=f"{item['year']}-{int(item['title'][:2]):02}"
        pdf=REPORT/'sources'/f'{name}.pdf'
        assert hashlib.sha256(pdf.read_bytes()).hexdigest() == item['sha256']
        doc=fitz.open(pdf)
        if args.collect_ocr:
            pages=collect(name)
            print(name, 'OCR pages', pages, '/',len(doc),flush=True)
        else:
            for i,page in enumerate(doc):
                dest=REPORT/'rendered'/f'{name}-{i+1:02}.png'
                dest.parent.mkdir(exist_ok=True)
                if not dest.exists():
                    page.get_pixmap(matrix=fitz.Matrix(2.2,2.2)).save(dest)
            print(name,'rendered',len(doc),flush=True)
