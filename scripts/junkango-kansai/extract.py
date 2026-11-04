"""Extract the two official papers; PDFs remain in an untracked temporary directory.

Usage: python scripts/junkango-kansai/extract.py --source-dir <download-directory>
PyMuPDF + Pillow are required. Main-size text excludes ruby; region images retain it.
"""
import argparse
import hashlib
import json
import re
from pathlib import Path

import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
DEST = ROOT / 'data/qualification-staging/junkango-kansai'
BASE = 'https://www.kouiki-kansai.jp'
INDEX = BASE + '/koikirengo/jisijimu/shikakumenkyo/junan_top/jyunkangosisiken/9838.html'
SOURCES = {
    2026: ('/material/files/group/12/mondai_jyunkangoshi2026.pdf', '/material/files/group/3/kaitou_jyunkangoshi2026.pdf', '2026-02-01'),
    2025: ('/material/files/group/12/mondai_jyunkangoshi2025.pdf', '/material/files/group/12/kaitou_jyunkangoshi2025.pdf', '2025-02-02'),
}


def save(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main_lines(page):
    all_spans = [s for b in page.get_text('dict')['blocks'] if 'lines' in b
             for line in b['lines'] for s in line['spans']
             if 60 < s['bbox'][1] < 780]
    spans = [s for s in all_spans if s['size'] >= 8]
    rows = []
    for span in sorted(spans, key=lambda s: (round(s['bbox'][1]), s['bbox'][0])):
        row = next((r for r in rows if abs(r['y'] - span['bbox'][1]) < 2), None)
        if row is None:
            row = {'y': span['bbox'][1], 'spans': []}
            rows.append(row)
        row['spans'].append(span)
    # 5.67pt subscripts/superscripts are semantic text; 4.96pt ruby is visual only.
    for span in (s for s in all_spans if 5.5 <= s['size'] < 8):
        row = min(rows, key=lambda r: abs(r['y'] - span['bbox'][1]))
        assert abs(row['y'] - span['bbox'][1]) < 8
        row['spans'].append(span)
    return [(r['y'], ''.join(s['text'] for s in sorted(r['spans'], key=lambda s: s['bbox'][0])).strip()) for r in sorted(rows, key=lambda r: r['y'])]


def extract(source_dir):
    receipts, answers, assets = [], {}, []
    for year, (question_path, answer_path, exam_date) in SOURCES.items():
        for role, url in [('questions', question_path), ('answers', answer_path)]:
            path = source_dir / f'{role}-{year}.pdf'
            receipts.append({'year': year, 'fiscalYear': year - 1, 'role': role,
                             'url': BASE + url, 'method': 'GET', 'httpStatus': 200,
                             'retrievedAt': '2026-11-04', 'bytes': path.stat().st_size,
                             'sha256': digest(path), 'pages': len(fitz.open(path))})
        answer_doc = fitz.open(source_dir / f'answers-{year}.pdf')
        text = answer_doc[0].get_text(sort=True)
        lines = [s.strip() for s in text.splitlines() if s.strip()]
        official = []
        for i, line in enumerate(lines):
            nums = line.split()
            if nums and nums[0].isdigit() and int(nums[0]) == len(official) + 1 and len(nums) == 10:
                assert list(map(int, nums)) == list(range(len(official) + 1, len(official) + 11))
                official.extend(lines[i + 1].split())
        assert len(official) == 150, (year, len(official))
        answers[str(year)] = official
        answer_png = DEST / f'assets/{year}-official-answers.png'
        answer_png.parent.mkdir(parents=True, exist_ok=True)
        answer_doc[0].get_pixmap(matrix=fitz.Matrix(2, 2)).save(answer_png)
        doc = fitz.open(source_dir / f'questions-{year}.pdf')
        questions = []
        for page_index in range(3, len(doc)):
            page = doc[page_index]
            lines = main_lines(page)
            starts = [(i, y, re.match(r'^問題\s*(\d+)\s*(.*)', text))
                      for i, (y, text) in enumerate(lines) if re.match(r'^問題\s*\d+\s', text)]
            for n, (start, y, match) in enumerate(starts):
                qnum = int(match.group(1))
                end = starts[n + 1][0] if n + 1 < len(starts) else len(lines)
                body = [match.group(2)]
                choices = {}
                current = None
                for _, text in lines[start + 1:end]:
                    choice = re.match(r'^([1-4])\s+[\s　]*(.*)', text)
                    if choice and int(choice.group(1)) == len(choices) + 1:
                        current = choice.group(1)
                        choices[current] = choice.group(2)
                    elif current:
                        choices[current] += '\n' + text
                    else:
                        body.append(text)
                assert len(choices) == 4, (year, qnum, choices)
                # Full-width original region retains all diagrams, ruby, symbols and tables.
                bottom = starts[n + 1][1] - 7 if n + 1 < len(starts) else 781
                clip = fitz.Rect(65, y - 8, page.rect.width - 35, bottom)
                pix = page.get_pixmap(matrix=fitz.Matrix(2.5, 2.5), clip=clip)
                asset = DEST / f'assets/{year}-q{qnum:03}.webp'
                Image.frombytes('RGB', [pix.width, pix.height], pix.samples).save(asset, 'WEBP', lossless=True)
                rel = asset.relative_to(ROOT).as_posix()
                assets.append({'year': year, 'qNumber': qnum, 'path': rel, 'sourcePage': page_index + 1,
                               'crop': list(clip), 'width': pix.width, 'height': pix.height, 'sha256': digest(asset)})
                answer = official[qnum - 1]
                scoring = 'all-correct' if answer == '-' else 'accepted-alternatives' if '・' in answer else 'single-choice'
                accepted = [] if answer == '-' else [int(v) for v in answer.split('・')]
                question = '\n'.join(body)
                row = {'id': f'junkango-kansai-{year}-q{qnum}', 'exam': 'junkango-kansai',
                       'publicAllowed': False, 'publicationStatus': 'staging', 'year': year,
                       'fiscalYear': year - 1, 'season': 'annual', 'session': 'gakka', 'examDate': exam_date,
                       'qNumber': qnum, 'question': question, 'choices': choices,
                       'officialAnswerNumber': answer, 'acceptedAnswerNumbers': accepted, 'scoring': scoring,
                       'sourcePdfUrl': BASE + question_path, 'sourceAnswerUrl': BASE + answer_path,
                       'sourcePage': page_index + 1, 'sourceImages': [rel],
                       'sourceAttribution': f'出典：関西広域連合 令和{year - 2019}年度准看護師試験 問{qnum}（問題・公式解答）。本文の改行・空白・ルビ表示を整形。原本画像はルビ・図表を含め保持。解説は過去問AI独自作成。',
                       'lawReferenceDate': None, 'lawReferenceDateNote': '公式問題・解答に統一の法令基準日の記載なし。設問が指定する統計年・法令時点を優先する。',
                       'sourceTextSha256': hashlib.sha256(json.dumps([question, choices], ensure_ascii=False, sort_keys=True).encode()).hexdigest(),
                       'needsReview': True, 'lastUpdated': '2026-11-04'}
                if scoring == 'all-correct':
                    row['scoringNotice'] = '公式正答表は「-」。関西広域連合の採点上の取扱いに従い、解答の有無を問わず全員正解。医学的に全肢が正しいという意味ではない。'
                elif scoring == 'accepted-alternatives':
                    row['scoringNotice'] = '公式正答2・4。2または4の単独選択を正解とする。両方の選択を要求しない。'
                if scoring != 'single-choice':
                    row['scoringNoticeUrl'] = INDEX.replace('9838.html', '9022.html')
                questions.append(row)
        assert [q['qNumber'] for q in questions] == list(range(1, 151))
        save(DEST / f'{year}-annual.json', questions)
    save(DEST / 'source-receipts.json', receipts)
    save(DEST / 'official-answers.json', answers)
    save(DEST / 'source-assets.json', assets)
    print('Extracted 300 questions and 300 original regions; official answer tables retained.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--source-dir', type=Path, required=True)
    extract(parser.parse_args().source_dir)
