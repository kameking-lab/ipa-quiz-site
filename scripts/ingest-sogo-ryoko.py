"""Reproduce the private 総合旅行業務取扱管理者 transcription (旅行業法令・約款) from official JATA PDFs.

Requires PyMuPDF 1.28. PDF bytes are temporary and are not committed.
  python scripts/ingest-sogo-ryoko.py --source-dir <dir> --skeleton <out.json>
  python scripts/ingest-sogo-ryoko.py --source-dir <dir>      # check mode
<dir> holds the official files under their published basenames (see manifest.json).
Only ① 旅行業法令 and ② 約款 are transcribed here; ③ 国内旅行実務 and ④ 海外旅行実務
(fare tables, photos, English passages, 資料編) are not yet included.
"""
import argparse
import hashlib
import json
import re
import sys
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'data/qualification-staging/sogo-ryoko'
KEYS = {'a': 'ア', 'b': 'イ', 'c': 'ウ', 'd': 'エ'}
FILES = {
    2026: {'hoki': 'r8-exam-questions-01.pdf', 'yakkan': 'r8-exam-questions-02.pdf', 'answers': 'r8-exam-answers.pdf'},
    2025: {'hoki': '2025_eqqbis01.pdf', 'yakkan': '2025_eqqbis02.pdf', 'answers': '2025_examsogo_correctan.pdf'},
}
COUNTS = {'hoki': 25, 'yakkan': 30}
QHEAD = re.compile(r'^問(\d+)\.\s*(.*)$')
CHOICE = re.compile(r'^([a-d])\s?\.(?:\s+(.*))?$')
SECTION = re.compile(r'^第(\d+)\s?問\s*$')
# Answer-sheet column x-ranges (PDF points) for 法令 / 約款.
ANSWER_COLUMNS = {'hoki': (90, 150), 'yakkan': (200, 262)}


def sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def clean(s: str) -> str:
    return re.sub(r'[\x00-\x1f‌]', '', s).strip()


CELLS = '<table-row-cells>'


def join(lines):
    if lines and lines[0] == CELLS:
        return '　／　'.join(clean(l) for l in lines[1:] if clean(l))
    return ''.join(clean(l) for l in lines if clean(l))


def parse(pdf: Path, count: int):
    doc = fitz.open(pdf)
    lines = []
    for pi, page in enumerate(doc):
        if pi == 0:
            continue  # cover/instructions
        ls = page.get_text().split('\n')
        while ls and not ls[0].strip():
            ls.pop(0)
        if ls and re.fullmatch(r'\d+', ls[0].strip()):
            ls.pop(0)  # printed page number
        lines.extend((pi + 1, l) for l in ls)
    sections, qs, cur, sec = [], [], None, None
    for page, line in lines:
        s = clean(line)
        if s.startswith(('①', '②')) and len(s) < 40 and cur is None:
            continue  # subject title
        m = SECTION.match(s)
        if m:
            sec = {'n': int(m.group(1)), 'lines': []}
            sections.append(sec)
            cur = None
            continue
        m = QHEAD.match(s)
        if m and int(m.group(1)) == len(qs) + 1:
            cur = {'n': int(m.group(1)), 'pages': [page], 'stem': [m.group(2)], 'choices': {}, 'cur': None, 'section': sec}
            qs.append(cur)
            continue
        if cur is None:
            if sec is not None and s:
                sec['lines'].append(s)
            continue
        if page not in cur['pages'] and s:
            cur['pages'].append(page)
        m = CHOICE.match(s)
        if m and ord(m.group(1)) - ord('a') == len(cur['choices']):
            cur['cur'] = m.group(1)
            # An empty marker line means a table row: one cell per following line.
            cur['choices'][cur['cur']] = [m.group(2)] if m.group(2) else [CELLS]
            continue
        (cur['choices'][cur['cur']] if cur['cur'] else cur['stem']).append(s)
    assert [q['n'] for q in qs] == list(range(1, count + 1)), [q['n'] for q in qs]
    out = []
    for q in qs:
        sec_text = join(q['section']['lines'])
        tf = bool(re.search(r'正しい(?:もの|場合)にはa\s?\.\s*を、誤っている', sec_text))
        if not q['choices']:
            assert tf, (pdf.name, q['n'])
            choices = {'ア': '正しい', 'イ': '誤っている'}
        else:
            assert len(q['choices']) == 4, (pdf.name, q['n'], list(q['choices']))
            choices = {KEYS[k]: join(v) for k, v in q['choices'].items()}
        out.append({
            'n': q['n'], 'pages': q['pages'], 'section': q['section']['n'],
            'sectionText': sec_text, 'question': stem_join(q['stem']), 'choices': choices, 'trueFalse': not q['choices'],
        })
    return out


def stem_join(lines):
    """Like join, but keep listed items (・…, (1)…, (ア)…) on their own lines."""
    out = []
    for l in lines:
        c = clean(l)
        if not c:
            continue
        if out and re.match(r'^(?:・|[(（]\s?[0-9０-９ア-エ]+\s?[)）])', c):
            out.append('\n' + c)
        else:
            out.append(c)
    return ''.join(out)


# Printed tables whose text layer is emitted cell by cell. The cells are asserted to
# concatenate to the extracted text, then re-laid out row by row (the page image is kept too).
TABLES = {
    (2025, 'yakkan', 10): {
        'caption': '＜見舞金の額＞',
        'rows': [['入院日数・通院日数', '入院見舞金', '通院見舞金'],
                 ['7 日未満（但し、通院は3 日以上）', '4 万円', '2 万円'],
                 ['7 日以上　90 日未満', '10 万円', '5 万円']],
    },
}


def relayout_table(key, text):
    t = TABLES[key]
    flat = t['caption'] + ''.join(''.join(r) for r in t['rows'])
    i = text.index(t['caption'])
    assert text[i:] == flat, (key, text[i:])
    return text[:i] + '\n' + t['caption'] + '\n' + '\n'.join('｜'.join(r) for r in t['rows'])


def multi_range(section_text: str, n: int) -> bool:
    m = re.search(r'問(\d+)\.～問(\d+)\.の各設問について、該当するものをそれぞれの選択肢からすべて選び', section_text)
    return bool(m) and int(m.group(1)) <= n <= int(m.group(2))


def parse_answers(pdf: Path):
    page = fitz.open(pdf)[0]
    words = [w for w in page.get_text('words') if 138 <= w[1] <= 500]
    out = {'hoki': {}, 'yakkan': {}}
    rows = {}
    for w in words:
        rows.setdefault(round(w[1] / 3), []).append(w)
    for ws in rows.values():
        ws.sort(key=lambda w: w[0])
        for subj, (lo, hi) in ANSWER_COLUMNS.items():
            label = [w for w in ws if lo - 60 <= w[0] < lo and re.search(r'\d', w[4])]
            ans = [w for w in ws if lo <= w[0] < hi and re.fullmatch(r'(?:[a-d]\.)+', w[4])]
            if label and ans:
                n = int(re.sub(r'\D', '', label[-1][4].translate(str.maketrans('０１２３４５６７８９', '0123456789'))))
                out[subj][n] = [KEYS[c] for c in ans[0][4].split('.') if c]
    for subj, count in COUNTS.items():
        assert sorted(out[subj]) == list(range(1, count + 1)), (pdf.name, subj, sorted(out[subj]))
    return out


def skeleton(src: Path):
    rows = []
    for year, f in FILES.items():
        ans = parse_answers(src / f['answers'])
        for subj in ('hoki', 'yakkan'):
            for q in parse(src / f[subj], COUNTS[subj]):
                a = ans[subj][q['n']]
                multi = multi_range(q['sectionText'], q['n'])
                if (year, subj, q['n']) in TABLES:
                    q['question'] = relayout_table((year, subj, q['n']), q['question'])
                    q['pageImages'] = [f"assets/{year}-{subj}-p{p:02d}.webp" for p in q['pages']]
                assert multi or len(a) == 1, (year, subj, q['n'], a)
                row = {
                    'year': year, 'session': subj, 'qNumber': q['n'], 'section': q['section'],
                    'sectionText': q['sectionText'], 'sourcePages': q['pages'],
                    'question': q['question'], 'choices': q['choices'], 'answer': a,
                    'selectAll': multi, 'trueFalse': q['trueFalse'],
                }
                if 'pageImages' in q:
                    row['pageImages'] = q['pageImages']
                row['sourceTextSha256'] = sha((row['sectionText'] + '\n' + row['question'] + '\n' + '\n'.join(row['choices'].values())).encode('utf-8'))
                rows.append(row)
    return rows


def check(src: Path):
    rows = skeleton(src)
    manifest = json.loads((DEST / 'manifest.json').read_text(encoding='utf-8'))
    errors = []
    for f in manifest['sourceFiles']:
        p = src / f['localName']
        if p.exists() and sha(p.read_bytes()) != f['sha256']:
            errors.append(f"sha mismatch {f['localName']}")
    saved = {}
    for year in FILES:
        for q in json.loads((DEST / f'{year}.json').read_text(encoding='utf-8')):
            saved[(q['year'], q['session'], q['qNumber'])] = q
    for r in rows:
        s = saved.get((r['year'], r['session'], r['qNumber']))
        if not s:
            errors.append(f"missing {r['year']}-{r['session']}-{r['qNumber']}")
            continue
        for k in ('question', 'choices', 'answer', 'sourceTextSha256'):
            if s.get(k) != r.get(k):
                errors.append(f"{r['year']}-{r['session']}-{r['qNumber']} {k} differs")
    print(json.dumps({'checked': len(rows), 'errors': errors}, ensure_ascii=False, indent=1))
    return 1 if errors else 0


def render(src: Path):
    """Page images (webp, 110 dpi, grayscale) for questions with printed tables."""
    from PIL import Image  # pillow, used only for webp encoding
    (DEST / 'assets').mkdir(parents=True, exist_ok=True)
    for (year, subj, _n) in TABLES:
        doc = fitz.open(src / FILES[year][subj])
        for r in skeleton(src):
            if (r['year'], r['session'], r['qNumber']) == (year, subj, _n):
                for p in r['sourcePages']:
                    pix = doc[p - 1].get_pixmap(dpi=110, colorspace=fitz.csGRAY)
                    img = Image.frombytes('L', (pix.width, pix.height), pix.samples)
                    img.save(DEST / 'assets' / f'{year}-{subj}-p{p:02d}.webp', 'WEBP', quality=70, method=6)


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--source-dir', required=True, type=Path)
    ap.add_argument('--skeleton', type=Path)
    ap.add_argument('--render', action='store_true')
    a = ap.parse_args()
    if a.render:
        render(a.source_dir)
    elif a.skeleton:
        rows = skeleton(a.source_dir)
        a.skeleton.write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding='utf-8')
        print(len(rows))
    else:
        sys.exit(check(a.source_dir))
