"""Offline adoption of the already accepted 2026-11-01 PE manuscripts.

No fetching, OCR, rewriting, or access to the stopped historical corpus. Run
from the repository root with Python, PyMuPDF and Pillow installed.
"""
import hashlib
import json
import re
import shutil
import unicodedata
from pathlib import Path

import fitz
from PIL import Image

SOURCE = Path('C:/Users/kanet/Documents/Codex/2026-11-01')
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'data/exam-library/pe-first'
EVIDENCE = ROOT / 'reports/LQ3-20261104'
# task, slug, department, title, accepted payload, original PDF
CONFIG = [
    (2, 'aerospace', 3, '航空・宇宙', 'packet/questions.json', 'outputs/packet/sources/r7-aerospace.pdf'),
    (3, 'electrical', 4, '電気電子', 'candidate/questions.json', 'outputs/sources/2025-electrical.pdf'),
    (4, 'chemical', 5, '化学', 'chemical-2025/original-bound/QUESTIONS.json', 'work/sources/chemical-2025.pdf'),
    (5, 'textile', 6, '繊維', 'textile-r7/questions.accepted.json', 'work/source/r7-textile.pdf'),
    (6, 'metal', 7, '金属', 'metal-2025/questions.json', 'work/sources/2025-metal.pdf'),
    (7, 'resource', 8, '資源工学', 'packet/questions.json', 'outputs/packet/sources/2025-resource.pdf'),
    (8, 'water', 10, '上下水道', 'kakomon-r7-final/questions.json', 'outputs/kakomon-r7-final/evidence/official-question.pdf'),
    (10, 'agriculture', 12, '農業', 'QUESTIONS.json', 'work/sources/r7-agriculture.pdf'),
    (11, 'forest', 13, '森林', 'packet/data/forest-2025.json', 'outputs/packet/sources/forest-2025.pdf'),
    (11, 'forest', 13, '森林', 'packet/data/forest-2024.json', 'outputs/packet/sources/forest-2024.pdf'),
    (12, 'fisheries', 14, '水産', 'r7-suisan/main-image-questions.json', 'work/sources/r7-suisan.pdf'),
    (13, 'management', 15, '経営工学', 'r7-keiei/questions.json', 'work/sources/2025-keiei.pdf'),
    (14, 'information', 16, '情報工学', 'qual-new14-r7/QUESTIONS-35.json', 'outputs/qual-new14-r7/sources/r7-information.pdf'),
    (15, 'applied-science', 17, '応用理学', 'exact-packet/questions-2025-annual.json', 'work/sources/r7-oyo.pdf'),
    (16, 'biotechnology', 18, '生物工学', 'past-question-packet/questions.candidate.json', 'outputs/past-question-packet/sources/official-2025-biotechnology.pdf'),
    (17, 'environment', 19, '環境', 'packet/questions-original.json', 'outputs/packet/sources/r7-environment.pdf'),
    (18, 'nuclear', 20, '原子力・放射線', 'r7-nuclear/questions.json', 'work/sources/r7-nuclear.pdf'),
]


def read(path):
    return json.loads(path.read_text(encoding='utf-8-sig'))


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def write(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')


def number(value):
    if isinstance(value, dict):
        return number(value['correctChoice'])
    if isinstance(value, list):
        assert len(value) == 1
        return number(value[0])
    if str(value) in 'アイウエオ' and len(str(value)) == 1:
        return 'アイウエオ'.index(str(value)) + 1
    return int(value)


def reasons(q):
    exp = q.get('explanation')
    raw = (exp.get('choices') if isinstance(exp, dict) else None) or q.get('choiceExplanations') or q.get('choiceReasons') or q.get('choices')
    if isinstance(raw, dict):
        keys = list('アイウエオ') if 'ア' in raw else [str(i) for i in range(1,6)]
        assert set(raw) == set(keys)
        values = [raw[k] for k in keys]
    else:
        values = sorted(raw, key=lambda x: int(x['number'])) if raw and isinstance(raw[0], dict) else raw
    result = [x['reason'] if isinstance(x, dict) else x for x in values]
    assert len(result) == 5 and all(isinstance(x, str) and x.strip() for x in result)
    return result


def resolve_image(base, value, task):
    # Only the selected accepted packet and its explicitly named public subtree.
    path = base / value
    if path.is_file():
        return path
    path = base / 'public' / value.lstrip('/')
    if path.is_file():
        return path
    if task == 14:
        path = base / 'assets' / Path(value).name
        if path.is_file():
            return path
    if task == 12:
        path = base / 'original-pages' / Path(value).name
        if path.is_file():
            return path
    raise FileNotFoundError(f'{base}: {value}')


def main():
    papers, catalog, evidence = [], [], []
    key2025 = next(SOURCE.glob('qual-new3-*')) / 'outputs/sources/2025-keys.pdf'
    key2024 = next(SOURCE.glob('qual-new11-*')) / 'outputs/packet/sources/answers-2024.pdf'
    for task, slug, dept, title, payload, pdfrel in CONFIG:
        taskroot = next(SOURCE.glob(f'qual-new{task}-*'))
        payload_path = taskroot / 'outputs' / payload
        source = read(payload_path)
        rows = source if isinstance(source, list) else source['questions']
        year = int(rows[0].get('year', source.get('year', 2025) if isinstance(source, dict) else 2025))
        assert len(rows) == 35
        paperid = f'pe-first-{slug}-{year}'
        base = payload_path.parent
        if task == 11:
            base = base.parent
        pdfpath = taskroot / pdfrel
        assert pdfpath.is_file(), pdfpath
        keypath = key2025 if year == 2025 else key2024
        keydoc = fitz.open(keypath)
        keytext = unicodedata.normalize('NFKC', keydoc[dept + 1].get_text())
        official = {int(n): int(a) for n, a in re.findall(r'III\s*[-−‐－]\s*(\d+)\s+([1-5])', keytext)}
        assert len(official) == 35, (paperid, len(official))
        pdfdoc = fitz.open(pdfpath)
        page_map = {}
        if task == 16:
            page_map = {x['number']: x['sourcePage'] for x in read(base/'transcription-review.json')['questionResults']}
        if task == 14:
            page_map = {x['officialNumber']: x['sourcePage'] for x in read(base/'QUESTION-BINDINGS-35.json')}
        normalized, assets = [], {}
        pdfurl = None
        for index, q in enumerate(rows, 1):
            qnum = q.get('number', q.get('qNumber', index))
            assert qnum == index, (paperid, index, qnum)
            correct = next((q[k] for k in ['officialAnswerNumbers', 'officialAnswer', 'officialAnswerNumber', 'correctChoice', 'correctAnswer', 'answer'] if k in q), None)
            correct = number(correct)
            assert correct == official[index], (paperid, index, correct, official[index])
            sourceq = q.get('source', {})
            pdfurl = (q.get('sourcePdfUrl') or q.get('sourceQuestionUrl') or q.get('officialQuestionUrl') or q.get('sourceUrl') or sourceq.get('questionUrl') or sourceq.get('problemUrl') or sourceq.get('url') or (source.get('questionUrl') if isinstance(source, dict) else None) or q.get('original', {}).get('url'))
            if task == 8:
                pdfurl = 'https://www.engineer.or.jp/c_topics/011/attached/attach_11458_1.pdf'
            assert pdfurl and pdfurl.startswith('https://www.engineer.or.jp/')
            answerurl = q.get('sourceAnswerUrl') or q.get('officialAnswerUrl') or q.get('answerSourceUrl') or sourceq.get('answerUrl') or (source.get('answerUrl') if isinstance(source, dict) else None)
            if task == 11:
                answerurl = q['answer']['url']
            if task == 8:
                answerurl = 'https://www.engineer.or.jp/c_topics/004/attached/attach_4106_4.pdf'
            assert answerurl
            answerurl = answerurl.split('#')[0] + f'#page={dept+2}'
            page = q.get('sourcePage') or q.get('pdfPage') or sourceq.get('page') or (sourceq.get('pages') or [None])[0]
            if task == 11:
                page = q['original']['page']
            if task == 14:
                page = page_map[f'Ⅲ－{index}']
            if task == 16:
                page = page_map[index]
            if not page and q.get('sourcePages'):
                page = q['sourcePages'][0]
            image_values = []
            if task == 11:
                image_values = [q['original']['image']['path']]
            elif task == 18:
                image_values = [x['path'] for x in q['questionContent']['images']]
            elif task == 6:
                image_values = [x['path'] for x in q['images']]
                page = q['images'][0]['sourcePage']
            elif task == 7:
                image_values = [q['originalQuestion']['image']]
            elif task == 14:
                image_values = [f'source-images/q{index:02}.png']
            else:
                v = q.get('originalQuestionImage') or q.get('originalImage') or q.get('questionImage')
                image_values = [v] if v else q.get('imageUrls', [])
            paths = []
            for val in image_values:
                path = resolve_image(base, val, task)
                paths.append(path)
                if page is None:
                    match = re.search(r'(?:page-|/p-|page)(\d+)', val)
                    if match:
                        page = int(match[1])
            if task in [16, 17]:
                assert page
                rendered = EVIDENCE / 'rendered' / f'{paperid}-{page}.png'
                if not rendered.exists():
                    rendered.parent.mkdir(parents=True, exist_ok=True)
                    pdfdoc[page-1].get_pixmap(matrix=fitz.Matrix(1.5, 1.5)).save(rendered)
                paths = [rendered]
            assert paths, (paperid, index)
            imagepaths, figures = [], []
            for path in paths:
                sha = digest(path)
                dest = ROOT / 'public/exam-library' / paperid / (sha[:20] + path.suffix.lower())
                dest.parent.mkdir(parents=True, exist_ok=True)
                if not dest.exists():
                    shutil.copyfile(path, dest)
                url = '/' + dest.relative_to(ROOT/'public').as_posix()
                imagepaths.append(url)
                with Image.open(path) as img:
                    width, height = img.size
                figures.append(dict(src=url, alt=f'{year}年度 {title}部門 Ⅲ－{index}の公式原問。問題文・全選択肢・図表を確認してください。', width=width, height=height))
                assets[url] = sha
            textmode = task in [14, 16, 17]
            text = q['question'] if textmode else f'{year}年度 {title}部門 専門科目 Ⅲ－{index}。下の公式原問画像の当該番号に解答してください。同じページにある別の設問は対象外です。'
            labels = [q['choices'][k] for k in 'アイウエオ'] if textmode else ['①', '②', '③', '④', '⑤']
            reasonlist = reasons(q)
            summary = q.get('explanation') or f'公式正答は{correct}。各選択肢の解説を確認してください。'
            if isinstance(summary, dict):
                summary = summary['summary']
            sourcehash = hashlib.sha256(text.encode()).hexdigest()
            reference = task == 14 and index == 25
            item = dict(id=q['id'], number=index, text=text, images=imagepaths,
                        sourcePages=[page] if page else [], sourceQuestionNumber=index,
                        correctChoice=None if reference else correct, choiceCount=0 if reference else 5,
                        answerAuthority='unconfirmed' if reference else 'official',
                        originalPdf=pdfurl.split('#')[0], answerPdf=answerurl,
                        explanation=summary,
                        presentation=dict(sourceHash=sourcehash, prompt=text, choices=[] if reference else [dict(number=i+1,text=t) for i,t in enumerate(labels)],
                                          figures=figures if not textmode or q.get('hasImage') else []))
            structured = dict(sourceHash=sourcehash, correctChoice=correct, summary=summary,
                              choices=[dict(number=i+1, verdict='correct' if i+1==correct else 'incorrect', reason=t) for i,t in enumerate(reasonlist)],
                              sources=[dict(title='日本技術士会 公式問題',url=pdfurl),dict(title='日本技術士会 公式正答',url=answerurl)])
            if reference:
                item.update(referenceOnly=True, officialKey=correct, referenceNotice=q['questionNotice'], referenceReasons=[dict(number=i+1,reason=t) for i,t in enumerate(reasonlist)])
            else:
                item['choiceExplanation'] = structured
            normalized.append(item)
        entry = dict(id=paperid, group='pe-first', subject=f'技術士第一次・{title}', label=f'令和{year-2018}年度 専門科目',
                     date='2025-11-23' if year==2025 else '2024-11-24', dateKind='exam', pdfUrl=pdfurl.split('#')[0],
                     indexUrl='https://www.engineer.or.jp/c_categories/index02021.html', answerMode='official-choice', checkedAt='2026-11-04',
                     questionCount=35, scoredCount=34 if task==14 else 35)
        catalog.append(entry)
        write(OUT/f'{paperid}.json', normalized)
        if task == 14:
            write(OUT/'information-grading-index.json', [
                {k:q.get(k) for k in ['id','number','correctChoice','choiceCount','answerAuthority','referenceOnly']}
                for q in normalized
            ])
        evidence.append(dict(workId=f'qual-new:{task}',paperId=paperid,payload=str(payload_path),payloadSha256=digest(payload_path),
                             officialPdf=str(pdfpath),officialPdfSha256=digest(pdfpath),answerPdfSha256=digest(keypath),answerPage=dept+2,
                             officialAnswersMatched=35,choiceReasons=175,questions=35,scored=entry['scoredCount'],assets=assets,
                             normalizedSha256=digest(OUT/f'{paperid}.json')))
        print(paperid, len(normalized), 'official keys matched; assets',len(assets), flush=True)
    write(OUT/'catalog.json', catalog)
    write(EVIDENCE/'adoption-manifest.json',evidence)
    print('TOTAL',sum(x['questions'] for x in evidence),'questions;',sum(x['choiceReasons'] for x in evidence),'reasons')


if __name__ == '__main__':
    main()
