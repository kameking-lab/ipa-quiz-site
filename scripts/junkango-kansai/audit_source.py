"""Independent pdfplumber character audit against PyMuPDF-transcribed originals."""
import argparse
from collections import Counter
import hashlib
import json
from pathlib import Path

import pdfplumber

ROOT = Path(__file__).resolve().parents[2]
DEST = ROOT / 'data/qualification-staging/junkango-kansai'


def compact(text):
    return ''.join(c for c in text if not c.isspace())


def main(source_dir):
    assets = json.loads((DEST / 'source-assets.json').read_text(encoding='utf-8'))
    receipts = json.loads((DEST / 'source-receipts.json').read_text(encoding='utf-8'))
    results = []
    for year in (2026, 2025):
        path = source_dir / f'questions-{year}.pdf'
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        assert digest == next(r['sha256'] for r in receipts if r['year'] == year and r['role'] == 'questions')
        rows = json.loads((DEST / f'{year}-annual.json').read_text(encoding='utf-8'))
        with pdfplumber.open(path) as doc:
            for row in rows:
                asset = next(a for a in assets if a['year'] == year and a['qNumber'] == row['qNumber'])
                x0, y0, x1, y1 = asset['crop']
                page = doc.pages[row['sourcePage'] - 1]
                # MuPDF uses CropBox-relative coordinates; pdfplumber uses MediaBox.
                crop_x, crop_y = page.cropbox[:2]
                x0, x1 = x0 + crop_x, x1 + crop_x
                y0, y1 = y0 + crop_y, y1 + crop_y
                chars = [c for c in page.chars
                         if x0 <= (c['x0'] + c['x1']) / 2 <= x1
                         and y0 <= (c['top'] + c['bottom']) / 2 <= y1 and c['size'] >= 5.5]
                original = compact(''.join(c['text'] for c in chars))
                saved = compact(f'問題{row["qNumber"]}' + row['question'] + ''.join(k + v for k, v in row['choices'].items()))
                missing = Counter(original) - Counter(saved)
                added = Counter(saved) - Counter(original)
                assert not missing and not added, (year, row['qNumber'], 'missing', missing, 'added', added)
                filtered = page.crop((x0, y0, x1, y1)).filter(lambda obj: obj.get('object_type') == 'char' and obj['size'] >= 5.5)
                ordered = compact(filtered.extract_text(x_tolerance=1, y_tolerance=8) or '')
                assert ordered == saved, (row['id'], ordered, saved)
                results.append({'id': row['id'], 'sourcePage': row['sourcePage'], 'characters': len(original),
                                'characterMultisetMatch': True, 'orderedTextMatch': True})
        # Parse the key by physical character coordinates, independently of line-based extraction.
        answer_path = source_dir / f'answers-{year}.pdf'
        assert hashlib.sha256(answer_path.read_bytes()).hexdigest() == next(r['sha256'] for r in receipts if r['year'] == year and r['role'] == 'answers')
        with pdfplumber.open(answer_path) as doc:
            page = doc.pages[0]
            # pdfplumber's table geometry provides another independent reading of all 150 cells.
            tables = page.extract_tables()
            assert tables, year
            table = max(tables, key=len)
            table = table[table.index([str(n) for n in range(1, 11)]):]
            assert len(table) == 30
            answer_cells = []
            for i in range(0, len(table), 2):
                numbers = [int(v) for v in table[i]]
                assert numbers == list(range(len(answer_cells) + 1, len(answer_cells) + 11)), (year, numbers)
                answer_cells.extend(v.replace(' ', '').replace('\n', '') for v in table[i + 1])
            expected = json.loads((DEST / 'official-answers.json').read_text(encoding='utf-8'))[str(year)]
            assert answer_cells == expected, (year, answer_cells)
    report = {'checkedAt': '2026-11-04', 'engine': f'pdfplumber {pdfplumber.__version__}',
              'scope': 'Whitespace-normalized ordered text, main characters and semantic small digits; ruby retained visually in source images.',
              'questions': len(results), 'characters': sum(r['characters'] for r in results),
              'officialAnswerCells': 300, 'answerTableMatches': True, 'results': results}
    output = DEST / 'qa/source-audit.json'
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')
    print(json.dumps({k: v for k, v in report.items() if k != 'results'}, ensure_ascii=False))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--source-dir', type=Path, required=True)
    main(parser.parse_args().source_dir)
