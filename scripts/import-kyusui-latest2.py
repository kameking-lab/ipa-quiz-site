#!/usr/bin/env python3
"""Import the officially confirmed 2026/2025 papers into PRIVATE staging.

Requires Python 3 and PyMuPDF (tested with 2.1). Run:
  python scripts/import-kyusui-latest2.py [--source-dir /tmp/kyusui-latest2]
The committed PDFs, HTML snapshots and per-region hashes are the audit sources.
This importer intentionally has no public registry, route or public/ asset output.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re
import urllib.request
import pymupdf

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'data/qualification-staging/kyusui'
BASE = 'https://www.kyuukou.or.jp/'
INDEX = BASE + 'shiken/jyuken-kakomon.html'
CURRENT = BASE + 'shiken/shiken-annai.html'
POLICY = BASE + 'sitepolicy.html'
CATEGORIES = [(3, '公衆衛生概論'), (9, '水道行政'), (19, '給水装置工事法'),
              (29, '給水装置の構造及び性能'), (35, '給水装置計画論'),
              (40, '給水装置工事事務論'), (51, '給水装置の概要'), (60, '給水装置施工管理法')]
MARKERS = '⑴⑵⑶⑷⑸'
CHECKED = '2026-11-03'


def sha(data):
    return hashlib.sha256(data).hexdigest()


def write_json(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source-dir', type=Path)
    args = parser.parse_args()
    for directory in ('sources', 'assets'):
        (DEST / directory).mkdir(parents=True, exist_ok=True)
    documents = []

    def acquire(url):
        name = url.rsplit('/', 1)[1]
        data = ((args.source_dir / name).read_bytes() if args.source_dir
                else urllib.request.urlopen(url, timeout=60).read())
        path = DEST / 'sources' / name
        path.write_bytes(data)
        documents.append({'url': url, 'path': str(path.relative_to(ROOT)),
                          'sha256': sha(data), 'bytes': len(data)})
        return path

    index, current, policy = [acquire(url) for url in (INDEX, CURRENT, POLICY)]
    # The past-five-years table alone would incorrectly select 2025/2024.
    assert 'shiken-annai.html' in index.read_text()
    assert '令和8年度' in current.read_text()
    assets = []
    editions = []
    for year, reiwa in ((2026, 8), (2025, 7)):
        prefix = BASE + f'shiken/file-r0{reiwa}/file-r0{reiwa}_'
        answer_url = prefix + 'seitou-num.pdf'
        landing = current if year == 2026 else index
        for filename in ('gakka-01.pdf', 'gakka-02.pdf', 'seitou-num.pdf'):
            assert f'file-r0{reiwa}_{filename}' in landing.read_text()
        answers_path = acquire(answer_url)
        answer_doc = pymupdf.open(answers_path)
        # Match the numeric question/answer cell pairs, never the subject headings.
        answer_text = answer_doc[0].get_text(sort=True)
        answers = {int(n): int(a) for n, a in re.findall(r'(?<!\d)(\d{1,2})\s*（([1-5])）', answer_text)}
        if year == 2025:
            assert set(answers) == set(range(1, 61)) - {18}
            correction = answer_doc[1].get_text(sort=True)
            assert '受験者全員' in correction and '正答肢なし' in correction
        else:
            assert set(answers) == set(range(1, 61))
        rows = []
        for part in (1, 2):
            question_url = prefix + f'gakka-0{part}.pdf'
            pdf_path = acquire(question_url)
            doc = pymupdf.open(pdf_path)
            first_page = 2 if year == 2026 else 3  # 0-based; excludes instruction examples.
            starts = []
            category_by_page = {}
            category = None
            for page_index in range(first_page, len(doc)):
                page = doc[page_index]
                for block in page.get_text('dict')['blocks']:
                    for line in block.get('lines', []):
                        text = ''.join(s['text'] for s in line['spans'])
                        normalized = re.sub(r'\s+', '', text)
                        if normalized in {c for _, c in CATEGORIES}:
                            category = normalized
                        match = re.match(r'^問題\s*(\d+)\s*', text)
                        if match and line['bbox'][0] < 100:
                            starts.append((int(match[1]), page_index, line['bbox'][1]))
                assert category is not None
                category_by_page[page_index] = category
            expected = list(range(1, 41)) if part == 1 else list(range(41, 61))
            assert [s[0] for s in starts] == expected, starts
            for offset, (number, start_page, y_start) in enumerate(starts):
                next_start = starts[offset + 1] if offset + 1 < len(starts) else None
                end_page = next_start[1] if next_start else len(doc) - 1
                regions, texts = [], []
                for pi in range(start_page, end_page + 1):
                    page = doc[pi]
                    top = y_start - 8 if pi == start_page else 55
                    bottom = next_start[2] - 8 if next_start and pi == next_start[1] else 765
                    if bottom <= top:
                        continue
                    clip = pymupdf.Rect(60, top, 545, bottom)
                    extracted = page.get_text(clip=clip, sort=True).strip()
                    if not extracted:
                        continue
                    # A new subject heading preceding the next question belongs to neither stem.
                    lines = extracted.splitlines()
                    while lines and re.sub(r'\s+', '', lines[-1]) in {c for _, c in CATEGORIES}:
                        lines.pop()
                    extracted = '\n'.join(lines).strip()
                    if not extracted:
                        continue
                    text_dict = page.get_text('dict', clip=clip)
                    # Trim blank space but retain graphics (including vector diagrams).
                    content_bottom = max([b['bbox'][3] for b in text_dict['blocks']] +
                                         [d['rect'].y1 for d in page.get_drawings()
                                          if d['rect'].intersects(clip) and d['rect'].y1 < bottom] + [top + 10])
                    clip.y1 = min(bottom, content_bottom + 8)
                    asset_path = DEST / 'assets' / f'{year}-q{number:02d}-p{pi+1:02d}.png'
                    page.get_pixmap(matrix=pymupdf.Matrix(2, 2), clip=clip, alpha=False).save(asset_path)
                    asset = {'path': str(asset_path.relative_to(ROOT)), 'sha256': sha(asset_path.read_bytes()),
                             'pdfUrl': question_url, 'pdfSha256': sha(pdf_path.read_bytes()),
                             'pdfPage': pi + 1, 'clipRectPoints': list(clip), 'scale': 2}
                    assets.append(asset)
                    regions.append(asset['path'])
                    texts.append(extracted)
                original_text = '\n\n'.join(texts)
                markers = list(re.finditer('[' + MARKERS + ']', original_text))
                diagram_choices = (year, number) == (2025, 34)
                if diagram_choices:
                    # These five alternatives are labels ON the hydraulic diagram.
                    choices = [f'図中の{marker}（原問題画像参照）' for marker in MARKERS]
                else:
                    assert [m.group() for m in markers] in [list(MARKERS[:4]), list(MARKERS)], (year, number, original_text)
                    choices = [original_text[m.end():(markers[i+1].start() if i+1 < len(markers) else len(original_text))].strip()
                               for i, m in enumerate(markers)]
                assert all(choices)
                post_option_content = ''
                if (year, number) == (2026, 34):
                    # The figures follow the last alternative, on this and the next page.
                    end = re.match(r'19\s*ｍ', choices[-1])
                    assert end
                    post_option_content = choices[-1][end.end():].strip()
                    choices[-1] = choices[-1][:end.end()]
                if (year, number) == (2026, 35):
                    # Printed calculation worksheet is supporting material, not option 4.
                    pieces = re.split(r'\s*【算出手順】', choices[-1], maxsplit=1)
                    assert len(pieces) == 2
                    choices[-1], post_option_content = pieces[0], '【算出手順】' + pieces[1]
                stem = re.sub(r'^問題\s*\d+\s*', '', original_text if diagram_choices else original_text[:markers[0].start()]).strip()
                scoring = ({'kind': 'all-correct', 'correctChoice': None,
                            'notice': '正答肢なし。受験者全員を正解として扱う。',
                            'reason': '選択肢⑷の「埋設した年度」は「埋設した年」でなければ正答肢とならない。',
                            'correctionPdfPage': 2} if year == 2025 and number == 18 else
                           {'kind': 'single-choice', 'correctChoice': answers[number]})
                if scoring['correctChoice'] is not None:
                    assert 1 <= scoring['correctChoice'] <= len(choices)
                rows.append({'id': f'kyusui-{year}-annual-gakka-q{number}', 'exam': 'kyusui',
                             'year': year, 'season': 'annual', 'edition': f'令和{reiwa}年度',
                             'examDate': f'{year}-10-{25 if year == 2026 else 26}',
                             'session': f'gakka{part}', 'qNumber': number,
                             'category': category_by_page[start_page],
                             'question': stem, 'choices': choices, 'originalText': original_text,
                             'choiceRepresentation': 'diagram-labels' if diagram_choices else 'text',
                             'postOptionContent': post_option_content,
                             'textRepresentation': 'pdf-extraction-with-layout',
                             'sourceImages': regions, 'sourcePdfUrl': question_url,
                             'sourceAnswerUrl': answer_url, 'scoring': scoring,
                             'explanationCoverage': 'official-summary',
                             'explanation': (scoring['notice'] + scoring['reason'] if scoring['kind'] == 'all-correct' else
                                             f'公式正答番号は{answers[number]}。法令・基準は本試験の出題時点のものとして扱う。'),
                             'sourceAttribution': f'出典：公益財団法人給水工事技術振興財団 令和{reiwa}年度 給水装置工事主任技術者試験 学科試験{part} 問{number}（問題・正答）。原問題画像の切出しと本文抽出は過去問AIによる加工。',
                             'lastUpdated': CHECKED})
        assert [r['qNumber'] for r in rows] == list(range(1, 61))
        write_json(DEST / f'{year}-annual.json', rows)
        editions.append({'year': year, 'edition': f'令和{reiwa}年度', 'originalCount': 60,
                         'storedCount': len(rows), 'omittedCount': 0, 'answerUrl': answer_url})
    write_json(DEST / 'source-manifest.json', {
        'checkedAt': CHECKED, 'publicationStatus': 'staging', 'qualification': '給水装置工事主任技術者',
        'selectionEvidence': {'pastPapersPage': INDEX, 'currentYearPage': CURRENT,
                              'latestPublishedEditions': [2026, 2025]},
        'rightsDecision': 'オーナー指示：権利確認済み。前回の未収録・許諾待ち方針を置き換える。',
        'policyUrl': POLICY, 'policyNotice': '当サイトに掲載の記述・写真の無断転載を禁じます。',
        'rendering': {'library': 'PyMuPDF', 'version': pymupdf.VersionBind,
                      'method': 'native-PDF-region-render', 'authoritativeRepresentation': 'sources/*.pdf and sourceImages',
                      'textNote': '本文・選択肢の抽出テキストは検索用。ルビ、表の配置、空欄枠、数式、図は原問題画像を正本とする。'},
        'editions': editions, 'documents': documents, 'assets': assets})
    print(f'Staged {sum(e["storedCount"] for e in editions)} originals, {len(assets)} source images, {len(documents)} documents; omitted=0.')


if __name__ == '__main__':
    main()
