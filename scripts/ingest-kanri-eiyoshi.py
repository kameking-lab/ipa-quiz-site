"""Reproduce the private 管理栄養士国家試験 第40回 transcription from the official MHLW PDFs.

Requires PyMuPDF 1.28. PDF bytes are temporary and are not committed.
  python scripts/ingest-kanri-eiyoshi.py --source-dir <dir> --skeleton <out.json> [--render]
  python scripts/ingest-kanri-eiyoshi.py --source-dir <dir>      # check mode
<dir> must contain 40_am.pdf, 40_pm.pdf, 40_answers.pdf (normal GET of manifest URLs).
--render writes page images (webp, 110 dpi, grayscale) for questions whose figures/tables
are needed, into data/qualification-staging/kanri-eiyoshi/assets/.
"""
import argparse
import hashlib
import io
import json
import re
import sys
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'data/qualification-staging/kanri-eiyoshi'
KEYS = list('アイウエオ')
NUM = {'⑴': 1, '⑵': 2, '⑶': 3, '⑷': 4, '⑸': 5}
QMARK = re.compile(r'^\t?(\d{1,3})\t\s?(.*)$')
CMARK = re.compile(r'^([⑴⑵⑶⑷⑸])\t?\s?(.*)$')
CASE = re.compile(r'^次の文を読み「(\d+)」')
COLUMN_HEADS = {175: ['エネルギー（kcal/日）', '脂肪（g/日）'], 185: ['たんぱく質（g/日）', '食塩（g/日）']}
# Choices printed only as structural formulas: the page image is the choice.
IMAGE_CHOICES = {18, 58}
# Axis labels of a chart that the text layer emits before the figure caption.
CHART_AXIS_PREFIX = {171: '身長体重'}
FIG = re.compile(r'^[表図][　 ]')
CTRL = re.compile(r'[\x00-\x1f]')


def sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def clean(line):
    return CTRL.sub('', line).replace('‌', '').strip()


def join(lines):
    return ''.join(clean(l) for l in lines if clean(l)).strip()


def pair_cells(lines):
    """Cells of a 組合せ row. A drawn connector separates the cells, so it has no text.
    A cell that wraps starts with a zero-width non-joiner; its continuation joins it."""
    wrapped = any('‌' in l for l in lines)
    raw = [l for l in lines if clean(l)]
    if wrapped:
        return [join(raw[:-1]), clean(raw[-1])]
    return [clean(l) for l in raw]


def page_lines(doc, first_q_page):
    for pi, page in enumerate(doc):
        if pi < first_q_page:
            continue
        ls = page.get_text().split('\n')
        while ls and not ls[-1].strip():
            ls.pop()
        if ls and re.fullmatch(r'\d+', ls[-1].strip()):
            ls.pop()  # printed footer page number
        for l in ls:
            yield pi + 1, l


def parse(pdf: Path, first: int, last: int):
    doc = fitz.open(pdf)
    qs, cur, case, expect = [], None, None, first
    for page, line in page_lines(doc, 3):
        mc = CASE.match(line.strip())
        if mc:
            case = {'label': line.strip(), 'lines': [], 'pages': [page]}
            cur = None
            continue
        m = QMARK.match(line)
        if m and int(m.group(1)) == expect:
            cur = {'n': expect, 'pages': [page], 'body': [m.group(2)], 'choices': {}, 'cur': None,
                   'case': case if case and str(expect) in case['label'] else None, 'fig': [], 'infig': False}
            if cur['case'] is None:
                case = None
            qs.append(cur)
            expect += 1
            continue
        if cur is None:
            if case is not None:
                if FIG.match(clean(line)):
                    case.setdefault('fig', []).append(clean(line))
                elif not case.get('fig'):
                    case['lines'].append(line)
                if page not in case['pages']:
                    case['pages'].append(page)
            continue
        if page not in cur['pages'] and line.strip():
            cur['pages'].append(page)
        m = CMARK.match(line)
        if m and NUM[m.group(1)] == len(cur['choices']) + 1:
            cur['cur'] = m.group(1)
            cur['choices'][cur['cur']] = [m.group(2)]
            cur['infig'] = False
            continue
        if FIG.match(line.strip()) and (cur['cur'] or cur['body']):
            # Printed table/figure: its text layer is not linear; the page image is canonical.
            cur['infig'] = True
            cur['fig'].append([line.strip()])
            continue
        if cur['infig']:
            cur['fig'][-1].append(line)
            continue
        (cur['choices'][cur['cur']] if cur['cur'] else cur['body']).append(line)
    assert [q['n'] for q in qs] == list(range(first, last + 1)), [q['n'] for q in qs][:5]
    out = []
    for q in qs:
        body = [l for l in q['body'] if l.strip()]
        heads = []
        while body and re.fullmatch(r'[a-eＡ-Ｅ]', body[-1].strip()):
            heads.insert(0, body.pop().strip())
        if q['n'] in COLUMN_HEADS:
            # Numeric 組合せ table whose column headers wrap over two lines each.
            heads = COLUMN_HEADS[q['n']]
            assert join(body[-2 * len(heads):]) == ''.join(heads), q['n']
            body = body[:-2 * len(heads)]
        if heads:
            # Combination table: header letters, then one cell per line in each choice row.
            choices = {}
            for k, v in q['choices'].items():
                cells = [c.strip() for c in v if c.strip()]
                assert len(cells) == len(heads), (q['n'], cells, heads)
                choices[KEYS[NUM[k] - 1]] = '　'.join(f'{h}：{c}' for h, c in zip(heads, cells))
        elif '組合せ' in join(body):
            choices = {KEYS[NUM[k] - 1]: '　―　'.join(pair_cells(v)) for k, v in q['choices'].items()}
        else:
            choices = {KEYS[NUM[k] - 1]: join(v) for k, v in q['choices'].items()}
        if q['n'] in IMAGE_CHOICES:
            choices = {KEYS[NUM[k] - 1]: f'構造式{k}（原本ページ画像の{k}を参照）' for k in q['choices']}
        if q['n'] in CHART_AXIS_PREFIX:
            last = list(choices)[-1]
            cut = choices[last].index(CHART_AXIS_PREFIX[q['n']])
            choices[last] = choices[last][:cut]
        row = {
            'n': q['n'],
            'pages': q['pages'],
            'question': join(body),
            'choices': choices,
        }
        if q['fig']:
            row['figureCaptions'] = [CTRL.sub('', f[0]) for f in q['fig']]
        if q['case']:
            row['caseLabel'] = q['case']['label']
            row['sharedContext'] = join(q['case']['lines'])
            if q['case'].get('fig'):
                row['contextFigureCaptions'] = q['case']['fig']
            row['pages'] = sorted(set(q['case']['pages'] + q['pages']))
        out.append(row)
    return out


def parse_answers(pdf: Path):
    text = fitz.open(pdf)[0].get_text()
    toks = [t.strip() for t in text.split('\n') if t.strip()]
    toks = [t for t in toks if re.fullmatch(r'\d+', t)]
    pairs = list(zip(toks[0::2], toks[1::2]))
    ans = {}
    for a, b in pairs:
        ans[int(a)] = int(b)
    assert sorted(ans) == list(range(1, 201)), len(ans)
    return ans


def skeleton(src: Path):
    ans = parse_answers(src / '40_answers.pdf')
    rows = []
    for sess, f, lo, hi in (('am', '40_am.pdf', 1, 97), ('pm', '40_pm.pdf', 98, 200)):
        for q in parse(src / f, lo, hi):
            num = ans[q['n']]
            r = {
                'session': sess,
                'qNumber': q['n'],
                'sourcePages': q['pages'],
                'question': q['question'],
                'choices': q['choices'],
                'officialAnswerNumber': num,
                'answer': KEYS[num - 1],
            }
            if 'figureCaptions' in q:
                r['figureCaptions'] = q['figureCaptions']
            if 'contextFigureCaptions' in q:
                r['contextFigureCaptions'] = q['contextFigureCaptions']
            if 'sharedContext' in q:
                r['caseLabel'] = q['caseLabel']
                r['sharedContext'] = q['sharedContext']
            r['sourceTextSha256'] = sha((r.get('sharedContext', '') + '\n' + r['question'] + '\n' + '\n'.join(r['choices'].values())).encode('utf-8'))
            rows.append(r)
    return rows


def render(src: Path, pages_by_session):
    (DEST / 'assets').mkdir(parents=True, exist_ok=True)
    for sess, pages in pages_by_session.items():
        doc = fitz.open(src / f'40_{sess}.pdf')
        for p in sorted(pages):
            pix = doc[p - 1].get_pixmap(dpi=110, colorspace=fitz.csGRAY)
            from PIL import Image  # pillow, used only for webp encoding
            img = Image.frombytes('L', (pix.width, pix.height), pix.samples)
            img.save(DEST / 'assets' / f'40-{sess}-p{p:02d}.webp', 'WEBP', quality=70, method=6)


def check(src: Path):
    rows = skeleton(src)
    manifest = json.loads((DEST / 'manifest.json').read_text(encoding='utf-8'))
    errors = []
    for f in manifest['sourceFiles']:
        got = sha((src / f['localName']).read_bytes())
        if got != f['sha256']:
            errors.append(f"sha mismatch {f['localName']}")
    saved = {}
    for sess in ('am', 'pm'):
        for q in json.loads((DEST / f'round40-{sess}.json').read_text(encoding='utf-8')):
            saved[q['qNumber']] = q
    for r in rows:
        s = saved.get(r['qNumber'])
        if not s:
            errors.append(f"missing {r['qNumber']}")
            continue
        for k in ('question', 'choices', 'answer', 'officialAnswerNumber', 'sourceTextSha256'):
            if s.get(k) != r.get(k):
                errors.append(f"{r['qNumber']} {k} differs")
    print(json.dumps({'checked': len(rows), 'errors': errors}, ensure_ascii=False, indent=1))
    return 1 if errors else 0


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--source-dir', required=True, type=Path)
    ap.add_argument('--skeleton', type=Path)
    ap.add_argument('--render', help='JSON {"am":[pages],"pm":[pages]}')
    a = ap.parse_args()
    if a.render:
        render(a.source_dir, json.loads(a.render))
    elif a.skeleton:
        rows = skeleton(a.source_dir)
        a.skeleton.write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding='utf-8')
        print(len(rows))
    else:
        sys.exit(check(a.source_dir))
