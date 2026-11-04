"""Editorial extraction; run with the temporary directory holding six official PDFs.

Requires PyMuPDF and pdfplumber. PDFs/drafts stay outside the repository.
Question-region PNGs retain all diagrams, tables, formulae and ruby verbatim.
"""
import argparse
import hashlib
import json
import re
from pathlib import Path

import fitz
import pdfplumber
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'data/qualification-staging/dojo-osen'
PDF_IDS = {'2025-am': '000351243', '2025-pm': '000351244',
           '2025-answer': '000361889', '2024-am': '000264442',
           '2024-pm': '000264387', '2024-answer': '000264386'}
START = re.compile(r'^問題\s*([0-9０-９]+)(?:\s|$)')


def write_json(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def main():
    parser = argparse.ArgumentParser(__doc__)
    parser.add_argument('source_dir', type=Path)
    args = parser.parse_args()
    authored = {}
    for edition in OUT.glob('*-annual.json'):
        authored.update({q['id']: q for q in json.loads(edition.read_text(encoding='utf-8'))})
    (OUT / 'assets').mkdir(parents=True, exist_ok=True)
    manifest = {'slug': 'dojo-osen', 'publicAllowed': False, 'retrievedOn': '2026-11-04',
                'method': 'ordinary HTTPS GET; no authentication or access-control bypass',
                'unavailablePdfUrls': [], 'documents': [], 'assets': []}
    rows = []
    for name, pdf_id in PDF_IDS.items():
        pdf = args.source_dir / (name + '.pdf')
        digest = hashlib.sha256(pdf.read_bytes()).hexdigest()
        url = f'https://www.env.go.jp/content/{pdf_id}.pdf'
        doc = fitz.open(pdf)
        manifest['documents'].append({'name': name, 'url': url, 'sha256': digest,
                                     'bytes': pdf.stat().st_size, 'pdfPages': len(doc), 'httpStatus': 200})
        if name.endswith('answer'):
            continue
        year = int(name[:4])
        session = name[5:]
        anchors = []
        for pi, page in enumerate(doc):
            for block in page.get_text('dict')['blocks']:
                for line in block.get('lines', []):
                    text = ''.join(span['text'] for span in line['spans']).strip()
                    match = START.match(text)
                    if match:
                        anchors.append((int(match[1]), pi, line['bbox'][1]))
        expected = 35 if session == 'am' else 45
        assert [a[0] for a in anchors] == list(range(1, expected + 1)), (name, anchors)
        with pdfplumber.open(pdf) as plumb:
            for i, (number, pi, top) in enumerate(anchors):
                end_pi, end_top = (anchors[i+1][1], anchors[i+1][2]) if i+1 < len(anchors) else (len(doc)-1, doc[-1].rect.height-40)
                images, parts = [], []
                for page_index in range(pi, end_pi+1):
                    page = doc[page_index]
                    # Ruby sits above the baseline of the numbered question heading.
                    y0 = max(0, top - 12) if page_index == pi else 0
                    y1 = end_top - 13 if page_index == end_pi and i+1 < len(anchors) else page.rect.height
                    if y1 <= y0:
                        continue
                    rect = fitz.Rect(0, y0, page.rect.width, y1)
                    filename = f'{name}-q{number:02d}-p{page_index+1:02d}.png'
                    path = OUT / 'assets' / filename
                    pix = page.get_pixmap(matrix=fitz.Matrix(1.8, 1.8), clip=rect, alpha=False)
                    raster = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
                    if ImageChops.difference(raster, Image.new('RGB', raster.size, 'white')).getbbox() is None:
                        continue
                    pix.save(path)
                    rel = path.relative_to(ROOT).as_posix()
                    images.append(rel)
                    manifest['assets'].append({'path': rel, 'pdfUrl': url, 'pdfSha256': digest,
                                               'pdfPage': page_index+1, 'clipRectPoints': list(rect),
                                               'sha256': hashlib.sha256(path.read_bytes()).hexdigest()})
                    parts.append(plumb.pages[page_index].crop(tuple(rect), strict=False).extract_text(layout=False) or '')
                original = '\n'.join(parts).strip()
                original = re.sub(r'(?m)^\s*[-―－]\s*\d+\s*[-―－]\s*$', '', original).strip()
                # Only printed option markers at a line start are delimiters.
                marks = list(re.finditer(r'(?m)^\s*([⑴⑵⑶⑷⑸])\s*', original))
                chosen = []
                for m in marks:
                    if ord(m[1])-ord('⑴') == len(chosen):
                        chosen.append(m)
                        if len(chosen) == 5:
                            break
                complete = len(chosen) == 5
                choices = [original[m.end():chosen[j+1].start() if j < 4 else len(original)].strip()
                           for j, m in enumerate(chosen)] if complete else ['⑴', '⑵', '⑶', '⑷', '⑸']
                question = original[:chosen[0].start()].strip() if complete else original
                row = {'id': f'dojo-osen-{name}-q{number}', 'exam': 'dojo-osen', 'year': year,
                       'season': 'annual', 'session': session, 'qNumber': number,
                       'category': '調査' if session == 'am' else ('対策' if number <= 25 else '法令等'),
                       'publicAllowed': False, 'question': question, 'choices': choices,
                       'choiceRepresentation': 'pdf-text' if complete and all(choices) else 'original-image',
                       'originalText': original, 'sourceImages': images,
                       'sourcePdfUrl': url, 'sourceAnswerUrl': f'https://www.env.go.jp/content/{PDF_IDS[str(year)+"-answer"]}.pdf',
                       'sourcePdfPages': sorted({a['pdfPage'] for a in manifest['assets'] if a['path'] in images}),
                       'lawReferenceDate': f'{year}-09-01',
                       'sourceAttribution': f'出典：環境省 令和{year-2018}年度土壌汚染調査技術管理者試験 {"調査" if session == "am" else "対策・法令等"} 問{number}。原問題画像は公式PDFの切出し。解説は過去問AIの独自作成。',
                       'lastUpdated': '2026-11-04'}
                rows.append(row)
                prior = authored.get(row['id'], {})
                for field in ['scoring', 'officialAnswerNumber', 'choiceExplanations', 'explanation',
                              'explanationSourceUrls', 'explanationCoverage', 'needsReview']:
                    if field in prior:
                        row[field] = prior[field]
    for year in [2024, 2025]:
        write_json(OUT / f'{year}-annual.json', [q for q in rows if q['year'] == year])
    write_json(OUT / 'source-manifest.json', manifest)
    used = {a['path'] for a in manifest['assets']}
    for asset in (OUT / 'assets').glob('*.png'):
        if asset.relative_to(ROOT).as_posix() not in used:
            asset.unlink()
    print(f'{len(rows)} questions; {len(manifest["assets"])} images')
    print('Image-only choices:', [q['id'] for q in rows if q['choiceRepresentation'] == 'original-image'])


if __name__ == '__main__':
    main()
