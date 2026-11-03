"""Re-fetch official PDFs normally and compare saved manuscript text. No access workarounds."""
import concurrent.futures
import hashlib
import json
import re
import unicodedata
import urllib.request
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / 'data/qualification-staging/automotive/latest-two'
CACHE = ROOT / 'tmp/lq1b-sources'
CACHE.mkdir(parents=True, exist_ok=True)

def read(name):
    return json.loads((DATA / name).read_text(encoding='utf-8'))

def normalize(text):
    return re.sub(r'\s+', '', unicodedata.normalize('NFKC', text)).replace('−', '-').replace('－', '-')

def fetch(row):
    dest = CACHE / (row['name'] + '.pdf')
    result = {k: row[k] for k in ('name', 'url')}
    try:
        if not dest.exists():
            with urllib.request.urlopen(row['url'], timeout=35) as response:
                raw = response.read()
                if not raw.startswith(b'%PDF'):
                    raise ValueError('Response is not a PDF')
                dest.write_bytes(raw)
        raw = dest.read_bytes()
        doc = fitz.open(dest)
        pages = [page.get_text(sort=True) for page in doc]
        (CACHE / (row['name'] + '.txt')).write_text('\n'.join(pages), encoding='utf-8')
        result.update(state='downloaded', sha256=hashlib.sha256(raw).hexdigest(),
                      matchesSavedHash=hashlib.sha256(raw).hexdigest() == row['sha256'], pages=len(doc))
        return result, pages
    except Exception as exc:
        result.update(state='unavailable', error=str(exc))
        return result, []

if __name__ == '__main__':
    receipts = read('source-receipts.json')['rows']
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(fetch, receipts))
    sources = {r['url']: pages for r, pages in results}
    comparisons = []
    for question in read('latest-two.json')['writtenOriginals']:
        pages = sources.get(question['sourcePdfUrl'], [])
        text = normalize(''.join(pages[p-1] for p in question['sourcePages'] if p <= len(pages)))
        fields = {'question': question['question'], **question['choices']}
        checks = {key: normalize(value) in text for key, value in fields.items()}
        comparisons.append({'id': question['id'], 'fields': checks,
                            'state': 'text-match' if all(checks.values()) else 'manual-comparison-required'})
    report = {'sourceFetches': [r for r, _ in results], 'questionComparisons': comparisons,
              'textMatchQuestions': sum(r['state'] == 'text-match' for r in comparisons),
              'note': 'Text search is a transcription check; diagrams and explanation correctness require separate review.'}
    out = DATA / 'qa/lq1b-source-verification.json'
    out.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'fetched': sum(r['state'] == 'downloaded' for r, _ in results),
                      'unavailable': [r for r, _ in results if r['state'] != 'downloaded'],
                      'changedPdfHashes': [r['name'] for r, _ in results if r.get('matchesSavedHash') is False],
                      'textMatches': report['textMatchQuestions']}, ensure_ascii=False))
