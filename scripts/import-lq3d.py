"""Build reviewed LQ3B papers from original PDF pages and authored explanations.

Requires PyMuPDF. Never regenerates the LQ3 manuscripts. A department/year is
registered only when all 35 questions and all 175 substantive reasons exist.
"""
import argparse
import hashlib
import json
import re
import unicodedata
from pathlib import Path
import fitz
ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'reports/LQ3B-20261104'
REPORT = ROOT / 'reports/LQ3D-20261104'
OUT = ROOT / 'data/exam-library/pe-first'
DEPARTMENTS = {2: ('marine', '船舶・海洋'), 3: ('aerospace', '航空・宇宙'), 4: ('electrical', '電気電子'), 5: ('chemical', '化学'), 6: ('textile', '繊維'), 7: ('metal', '金属'), 8: ('resource', '資源工学'), 10: ('water', '上下水道'), 11: ('sanitary', '衛生工学'), 12: ('agriculture', '農業'), 14: ('fisheries', '水産'), 15: ('management', '経営工学'), 16: ('information', '情報工学'), 17: ('applied-science', '応用理学'), 18: ('biotechnology', '生物工学'), 19: ('environment', '環境'), 20: ('nuclear', '原子力・放射線')}

def read(p):
    return json.loads(p.read_text(encoding='utf-8-sig'))

def write(p, value):
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')

def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()

def require(condition, message):
    if not condition:
        raise ValueError(message)

def build(year, department, refresh=False):
    require(year == 2024 and department in (10,12,14,15,17,18,19,20), 'Outside LQ3D scope')
    slug, title = DEPARTMENTS[department]
    paperid = f'pe-first-{slug}-{year}'
    payload = REPORT / 'manuscripts' / f'{paperid}.json'
    authored = read(payload)
    require(len(authored) == 35, 'Invalid manuscript or source')
    require([q['number'] for q in authored] == list(range(1, 36)), 'Invalid manuscript or source')
    pdf = SOURCE / 'sources' / f'{year}-{department:02}.pdf'
    answerpdf = SOURCE / 'sources' / f'answers-{year}.pdf'
    doc, answers = (fitz.open(pdf), fitz.open(answerpdf))
    text = unicodedata.normalize('NFKC', answers[department + 1].get_text())
    keys = {int(n): int(a) for n, a in re.findall('III\\s*[-−‐－]\\s*(\\d+)\\s+([1-5])', text)}
    require(len(keys) == 35, 'Invalid manuscript or source')
    acquisition = next((x for x in read(SOURCE / 'acquisition.json') if x['year'] == year and int(x['title'][:2]) == department))
    require(sha(pdf) == acquisition['sha256'], 'Invalid manuscript or source')
    questionurl = acquisition['url']
    answerurl = f'https://www.engineer.or.jp/c_topics/004/attached/attach_4106_{(4 if year == 2025 else 5)}.pdf#page={department + 2}'
    assets, normalized, pending = ({}, [], {})
    for q in authored:
        number, page, reasons = (q['number'], q['page'], q['reasons'])
        require(q['answer'] == keys[number], (paperid, number, q['answer'], keys[number]))
        require(1 <= page <= len(doc), 'Invalid manuscript or source')
        require(len(reasons) == 5 and all((isinstance(x, str) and len(x.strip()) >= 15 for x in reasons)), 'Invalid manuscript or source')
        require(len(q['summary'].strip()) >= 20, 'Invalid manuscript or source')
        pages = q.get('pages', [page])
        require(pages[0] == page and all((1 <= p <= len(doc) for p in pages)), 'Invalid manuscript or source')
        figures, images = ([], [])
        for pageno in pages:
            dest = ROOT / 'public/exam-library' / paperid / f'page-{pageno:02}.png'
            pix = doc[pageno - 1].get_pixmap(matrix=fitz.Matrix(1.8, 1.8))
            rendered = pix.tobytes('png')
            if dest.exists():
                require(dest.read_bytes() == rendered, f'Existing image differs from source: {dest.name}')
            pending[dest] = rendered
            url = '/' + dest.relative_to(ROOT / 'public').as_posix()
            images.append(url)
            figures.append(dict(src=url, width=pix.width, height=pix.height, alt=f'{year}年度 {title}部門 専門科目 Ⅲ－{number}の公式原問（PDF {pageno}ページ）。当該番号の問題文・全選択肢・図表を確認してください。'))
            assets[url] = hashlib.sha256(rendered).hexdigest()
        if q.get('figureClip'):
            dest = ROOT / 'public/exam-library' / paperid / f'q{number:02}-figure.png'
            pix = doc[page - 1].get_pixmap(matrix=fitz.Matrix(2, 2), clip=fitz.Rect(q['figureClip']))
            rendered = pix.tobytes('png')
            if dest.exists():
                require(dest.read_bytes() == rendered, f'Existing image differs from source: {dest.name}')
            pending[dest] = rendered
            url = '/' + dest.relative_to(ROOT / 'public').as_posix()
            figures = [dict(src=url, width=pix.width, height=pix.height, alt=q['figureAlt'])]
            assets[url] = hashlib.sha256(rendered).hexdigest()
        prompt = q.get('text') or f'{year}年度 {title}部門 専門科目 Ⅲ－{number}。下の公式原問画像の当該番号に解答してください。同じページにある別の設問は対象外です。'
        choices = q.get('choices') or ['①', '②', '③', '④', '⑤']
        require(len(choices) == 5, 'Invalid manuscript or source')
        sourcehash = hashlib.sha256(prompt.encode('utf8')).hexdigest()
        normalized.append(dict(id=f'{paperid}-q{number:02}', number=number, text=prompt, images=images, sourcePages=pages, sourceQuestionNumber=number, correctChoice=keys[number], choiceCount=5, answerAuthority='official', originalPdf=questionurl, answerPdf=answerurl, explanation=q['summary'], presentation=dict(sourceHash=sourcehash, prompt=prompt, choices=[dict(number=i + 1, text=t) for i, t in enumerate(choices)], figures=figures if not q.get('text') or q.get('hasFigure') else []), choiceExplanation=dict(sourceHash=sourcehash, correctChoice=keys[number], summary=q['summary'], choices=[dict(number=i + 1, verdict='correct' if i + 1 == keys[number] else 'incorrect', reason=r) for i, r in enumerate(reasons)], sources=[dict(title='日本技術士会 公式問題', url=questionurl + f'#page={page}'), dict(title='日本技術士会 公式正答', url=answerurl)] + q.get('sources', []))))
    output = OUT / f'{paperid}.json'
    manifestpath = REPORT / 'adoption-manifest.json'
    manifest = read(manifestpath) if manifestpath.exists() else []
    old = next((x for x in manifest if x['paperId'] == paperid), None)
    if output.exists():
        require(refresh and old and (sha(output) == old['normalizedSha256']), 'Only an unchanged LQ3B paper may be explicitly refreshed')
    else:
        require(not old, 'Invalid manuscript or source')
    catalogpath = OUT / 'catalog-lq3d.json'
    catalog = read(catalogpath) if catalogpath.exists() else []
    require(not any((x['id'] == paperid for x in catalog)) or (refresh and old), 'Invalid manuscript or source')
    catalog = [x for x in catalog if x['id'] != paperid]
    catalog.append(dict(id=paperid, group='pe-first', subject=f'技術士第一次・{title}', label=f'令和{year - 2018}年度 専門科目', date=f'{year}-11-{(23 if year == 2025 else 24)}', dateKind='exam', pdfUrl=questionurl, indexUrl='https://www.engineer.or.jp/c_categories/index02021.html', answerMode='official-choice', checkedAt='2026-11-04', questionCount=35, scoredCount=35))
    for dest, rendered in pending.items():
        dest.parent.mkdir(parents=True, exist_ok=True)
        if not dest.exists():
            dest.write_bytes(rendered)
    write(output, normalized)
    write(catalogpath, catalog)
    manifest = [x for x in manifest if x['paperId'] != paperid]
    manifest.append(dict(paperId=paperid, department=department, year=year, payload=payload.relative_to(ROOT).as_posix(), payloadSha256=sha(payload), officialPdf=pdf.relative_to(ROOT).as_posix(), officialPdfSha256=sha(pdf), answerPdf=answerpdf.relative_to(ROOT).as_posix(), answerPdfSha256=sha(answerpdf), answerPage=department + 2, officialAnswersMatched=35, questions=35, scored=35, choiceReasons=175, assets=assets, normalizedSha256=sha(output)))
    write(manifestpath, manifest)
    print(paperid, '35 questions / 175 reasons / 35 official keys matched')
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('year', type=int, choices=[2024, 2025])
    parser.add_argument('department', type=int, choices=DEPARTMENTS)
    parser.add_argument('--refresh', action='store_true')
    args = parser.parse_args()
    build(args.year, args.department, args.refresh)
