"""Reproduce the private career-consultant (学科) transcription from the official PDFs.

Requires PyMuPDF 1.28. PDF bytes are temporary and are not committed.
Run:
  python scripts/ingest-career-consultant.py --source-dir <dir> --skeleton <out.json>
  python scripts/ingest-career-consultant.py --source-dir <dir>            # check mode
<dir> must contain 33_mondai.pdf, 33_seito.pdf, 32_mondai.pdf, 32_seito.pdf
(normal GET of the URLs in data/qualification-staging/career-consultant/manifest.json).
Check mode re-extracts question text, all choices and official answers and compares them
with the saved staging JSON field by field, and verifies SHA-256 pins.
"""
import argparse
import hashlib
import json
import re
import sys
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'data/qualification-staging/career-consultant'
KEYS = list('アイウエ')
Z2H = str.maketrans('０１２３４５６７８９', '0123456789')


def sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def join_lines(lines):
    """Join PDF-wrapped lines; blank lines separate paragraphs."""
    paras, cur = [], []
    for raw in lines:
        line = raw.strip()
        if not line:
            if cur:
                paras.append(''.join(cur))
                cur = []
            continue
        cur.append(line)
    if cur:
        paras.append(''.join(cur))
    return '\n'.join(paras).strip()


def parse_questions(pdf: Path):
    doc = fitz.open(pdf)
    lines = []
    for pi, page in enumerate(doc):
        if pi < 2:  # cover + instructions
            continue
        text = page.get_text().split('\n')
        while text and not text[0].strip():
            text.pop(0)
        if text and re.fullmatch(r'\d+', text[0].strip()):
            text.pop(0)  # printed page number
        lines.extend((pi + 1, l) for l in text)
    qs, cur = [], None
    for page, line in lines:
        m = re.match(r'^問(\d+)\s+(.*)$', line)
        if m:
            cur = {'n': int(m.group(1)), 'pages': [page], 'body': [m.group(2)], 'choices': {}, 'cur': None}
            qs.append(cur)
            continue
        if cur is None:
            continue
        if page not in cur['pages'] and line.strip():
            cur['pages'].append(page)
        m = re.match(r'^\s{1,4}([1-4])\.\s+(.*)$', line)
        if m and int(m.group(1)) == len(cur['choices']) + 1:
            cur['cur'] = m.group(1)
            cur['choices'][cur['cur']] = [m.group(2)]
            continue
        (cur['choices'][cur['cur']] if cur['cur'] else cur['body']).append(line)
    out = []
    for q in qs:
        assert len(q['choices']) == 4, q['n']
        out.append({
            'n': q['n'],
            'pages': q['pages'],
            'question': join_lines(q['body']),
            'choices': {KEYS[int(k) - 1]: join_lines(v) for k, v in q['choices'].items()},
        })
    assert [q['n'] for q in out] == list(range(1, 51)), [q['n'] for q in out]
    return out


def parse_answers(pdf: Path):
    text = fitz.open(pdf)[0].get_text()
    pairs = re.findall(r'問([０-９0-9]+)\s*\n\s*([1-4])\s*\n', text)
    ans = {int(a.translate(Z2H)): int(b) for a, b in pairs}
    assert sorted(ans) == list(range(1, 51)), sorted(ans)
    return ans


def skeleton(src: Path):
    manifest = json.loads((DEST / 'manifest.json').read_text(encoding='utf-8')) if (DEST / 'manifest.json').exists() else None
    rows = []
    for rnd in (33, 32):
        qpdf, apdf = src / f'{rnd}_mondai.pdf', src / f'{rnd}_seito.pdf'
        qs, ans = parse_questions(qpdf), parse_answers(apdf)
        for q in qs:
            num = ans[q['n']]
            rows.append({
                'round': rnd,
                'qNumber': q['n'],
                'sourcePages': q['pages'],
                'question': q['question'],
                'choices': q['choices'],
                'officialAnswerNumber': num,
                'answer': KEYS[num - 1],
                'sourceTextSha256': sha((q['question'] + '\n' + '\n'.join(q['choices'].values())).encode('utf-8')),
            })
    return rows, manifest


def check(src: Path):
    rows, manifest = skeleton(src)
    errors = []
    for f in manifest['sourceFiles']:
        name = f"{f['round']}_{'mondai' if f['kind'] == 'questions' else 'seito'}.pdf"
        got = sha((src / name).read_bytes())
        if got != f['sha256']:
            errors.append(f'sha mismatch {name}: {got}')
    saved = {}
    for rnd in (33, 32):
        for q in json.loads((DEST / f'round{rnd}.json').read_text(encoding='utf-8')):
            saved[(rnd, q['qNumber'])] = q
    for r in rows:
        s = saved.get((r['round'], r['qNumber']))
        if not s:
            errors.append(f"missing {r['round']}-{r['qNumber']}")
            continue
        for k in ('question', 'choices', 'answer', 'officialAnswerNumber', 'sourcePages', 'sourceTextSha256'):
            if s[k] != r[k]:
                errors.append(f"{r['round']}-{r['qNumber']} {k} differs")
    if len(saved) != len(rows):
        errors.append(f'count {len(saved)} != {len(rows)}')
    print(json.dumps({'checked': len(rows), 'errors': errors}, ensure_ascii=False, indent=1))
    return 1 if errors else 0


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--source-dir', required=True, type=Path)
    ap.add_argument('--skeleton', type=Path)
    a = ap.parse_args()
    if a.skeleton:
        rows, _ = skeleton(a.source_dir)
        a.skeleton.write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding='utf-8')
        print(len(rows))
    else:
        sys.exit(check(a.source_dir))
