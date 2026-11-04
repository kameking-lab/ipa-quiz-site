"""Reproduce private CQ5 transcription/assets from four normally downloaded PDFs.

Requires PyMuPDF. PDF bytes are temporary; only page renders and audit pins are kept.
Run: python scripts/ingest-chiiki-ryoko.py --source-dir <directory> [--write]
Without --write, compare every source-derived field and render with the saved pack.
"""
import argparse
import hashlib
import json
import re
from pathlib import Path
import fitz

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'data/qualification-staging/chiiki-ryoko'
INDEX = 'https://www.mlit.go.jp/kankocho/seisaku_seido/ryokogyoho/chiikigenteikanrisha.html'
URLS = {2026: ['002024536', '002024540'], 2025: ['001968444', '001968447']}
SESSIONS = ['hoki', 'yakkan', 'jitsumu']
NAMES = ['旅行業法及びこれに基づく命令', '旅行業約款、運送約款及び宿泊約款', '国内旅行実務']
CHOICES = list('アイウエ')

def sha(data):
    return hashlib.sha256(data).hexdigest()

def dump(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

def clean(text):
    text = re.sub(r'^\s*-\s*\d+\s*-\s*$', '', text, flags=re.M)
    text = text.replace('<以 上>', '')
    return '\n'.join(line.rstrip() for line in text.splitlines() if line.strip()).strip()

def find(text, pattern, start=0):
    m = re.search(pattern, text[start:], re.M)
    assert m, (pattern, text[start:start+100])
    return start + m.start()

def number(n):
    # The official papers use full-width 1..9, ASCII 10..25.
    return str(n).translate(str.maketrans('0123456789', '０１２３４５６７８９')) if n < 10 else str(n)

def answer_keys(page):
    keys = []
    for lo, hi, count in [(168, 345, 25), (383, 545, 24), (598, 730, 10)]:
        row = []
        for x0, x1 in [(180, 245), (420, 480)]:
            text = page.get_text(sort=True, clip=fitz.Rect(x0, lo, x1, hi))
            row.extend(re.findall(r'[アイウエ](?:、[アイウエ])*', text))
        assert len(row) == count, (len(row), count, row)
        keys.append([a.split('、') for a in row])
    return keys

def extract(year, doc, answers):
    text = ''
    pages = []
    for i, p in enumerate(doc):
        part = clean(p.get_text()) + '\n'
        pages.append((len(text), len(text)+len(part), i+1))
        text += part
    section_starts = [find(text, r'^\s*'+str(i)+r'\s+'+name) for i, name in enumerate(NAMES, 1)] + [len(text)]
    rows = []
    for sec, session in enumerate(SESSIONS):
        lo, hi = section_starts[sec:sec+2]
        s = text[lo:hi]
        contexts = {}
        if sec < 2:
            starts = [find(s, r'^（'+number(n)+r'）') for n in range(1, 26 if sec == 0 else 21)]
            labels = [f'（{number(n)}）' for n in range(1, len(starts)+1)]
            if sec == 1:
                starts += [find(s, r'^'+number(n)+r'．') for n in range(2, 6)]
                labels += [number(n)+'．' for n in range(2, 6)]
        else:
            bus = find(s, r'^１．')
            b1 = find(s, r'^①\s*この行程')
            b2 = find(s, r'^②\s*この行程')
            b3 = find(s, r'^（２）貸切')
            ferry = find(s, r'^２．旅客')
            hotel = find(s, r'^３．宿泊')
            jr = find(s, r'^４．旅客鉄道')
            jr1 = find(s, r'^（１）', jr)
            jr2 = find(s, r'^（２）', jr)
            jr3 = find(s, r'^（３）', jr)
            jr4 = find(s, r'^（４）', jr)
            common_jr = s[jr:jr1].strip()
            if year == 2026:
                jr5 = find(s, r'^（５）', jr)
                starts = [b1, b2, b3, ferry, hotel, jr1, jr2, jr3, jr4, jr5]
                labels = ['１（１）①','１（１）②','１（２）','２','３','４（１）','４（２）','４（３）','４（４）','４（５）']
            else:
                j31 = find(s, r'^①\s*当該団体')
                j32 = find(s, r'^②\s*当該団体')
                starts = [b1, b2, b3, ferry, hotel, jr1, jr2, j31, j32, jr4]
                labels = ['１（１）①','１（１）②','１（２）','２','３','４（１）','４（２）','４（３）①','４（３）②','４（４）']
                contexts[7] = [(jr, jr1), (jr3, j31)]
                contexts[8] = [(jr, jr1), (jr3, j31)]
            contexts[0] = [(bus, b1)]
            contexts[1] = [(bus, b1)]
            contexts[2] = [(bus, find(s, r'^（１）', bus))]
            for n in range(5, 10):
                contexts.setdefault(n, [(jr, jr1)])
        assert starts == sorted(starts)
        ends = starts[1:] + [len(s)]
        if sec == 2 and year == 2025:
            # The shared stem of JR 4(3) belongs to both subquestions, not to 4(2)'s エ.
            ends[6] = jr3
        for n, (start, end) in enumerate(zip(starts, ends)):
            raw = s[start:end].strip()
            matches = list(re.finditer(r'^\s*([アイウエ])．', raw, re.M))
            assert [m[1] for m in matches] == CHOICES, (year, session, n+1, [m[1] for m in matches])
            choices = {m[1]: raw[m.end():matches[i+1].start() if i < 3 else len(raw)].strip() for i,m in enumerate(matches)}
            context_spans = contexts.get(n, [])
            context = '\n'.join(s[a:b].strip() for a,b in context_spans)
            stem = raw[:matches[0].start()].strip()
            source_pages = sorted({p for a,b,p in pages if any(a < lo+e and b > lo+c for c,e in [(start,end),*context_spans])})
            # Exclude a following page when a span ends just before its first question.
            while source_pages and not text[pages[source_pages[-1]-1][0]:lo+end].strip():
                source_pages.pop()
            row = {
                'id': f'chiiki-ryoko-{year}-{session}-q{n+1}', 'slug': 'chiiki-ryoko',
                'year': year, 'season': 'annual', 'session': session, 'qNumber': n+1,
                'officialQuestionLabel': labels[n] if sec != 1 or n >= 20 else '１'+labels[n],
                'publicationStatus': 'staging', 'publicAllowed': False, 'needsReview': True,
                'lawReferenceDate': f'{year}-06-01', 'question': (context+'\n' if context else '')+stem,
                'sharedContext': context, 'choices': choices,
                'answer': answers[sec][n], 'officialAnswerText': '、'.join(answers[sec][n]),
                'requiredSelections': len(answers[sec][n]),
                'scoring': 'all-selected-exactly' if len(answers[sec][n]) > 1 else 'single-choice',
                'points': 4, 'sourcePdfUrl': f'https://www.mlit.go.jp/kankocho/content/{URLS[year][0]}.pdf',
                'sourceAnswerUrl': f'https://www.mlit.go.jp/kankocho/content/{URLS[year][1]}.pdf',
                'sourcePages': source_pages, 'sourceAnswerPage': 1,
                'sourcePageImages': [f'assets/{year}-questions-p{p:02}.png' for p in source_pages],
                'sourceAttribution': f'出典：観光庁 令和{year-2018}年度地域限定旅行業務取扱管理者試験（全科目） {NAMES[sec]} {labels[n]}。原文の改行・空白を整形し、原本ページ画像を併記。解説は過去問AIの独自作成。',
                'explanationAuthorship': 'original',
            }
            row['sourceTextSha256'] = sha(json.dumps([row['question'], choices], ensure_ascii=False, separators=(',', ':')).encode())
            rows.append(row)
    assert len(rows) == 59
    return rows

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--source-dir', type=Path, required=True)
    parser.add_argument('--write', action='store_true')
    args = parser.parse_args()
    sources, assets, audits, keys = [], [], [], {}
    for year in [2025, 2026]:
        docs = []
        for kind, ident in zip(['questions','answers'], URLS[year]):
            data = (args.source_dir/f'{year}-{kind}.pdf').read_bytes()
            assert data.startswith(b'%PDF-')
            doc = fitz.open(stream=data, filetype='pdf')
            docs.append(doc)
            sources.append({'year':year,'kind':kind,'url':f'https://www.mlit.go.jp/kankocho/content/{ident}.pdf','sha256':sha(data),'bytes':len(data),'pages':len(doc),'retrievedAt':'2026-11-04','httpStatus':200,'method':'GET'})
            for p in range(len(doc)):
                if kind == 'questions' and p < 2:
                    continue
                file = f'assets/{year}-{kind}-p{p+1:02}.png'
                png = doc[p].get_pixmap(matrix=fitz.Matrix(2,2), colorspace=fitz.csGRAY).tobytes('png')
                item = {'file':file,'year':year,'kind':kind,'page':p+1,'sha256':sha(png),'dpi':144}
                assets.append(item)
                if args.write:
                    (DEST/'assets').mkdir(parents=True,exist_ok=True)
                    (DEST/file).write_bytes(png)
                else:
                    assert (DEST/file).read_bytes() == png, file
        official = answer_keys(docs[1][0])
        rows = extract(year, docs[0], official)
        keys[str(year)] = dict(zip(SESSIONS, official))
        if args.write:
            # Keep authored explanations separate from the deterministic PDF extraction.
            existing = json.loads((DEST/f'{year}.json').read_text(encoding='utf-8')) if (DEST/f'{year}.json').exists() else []
            old = {q['id']:q for q in existing}
            for row in rows:
                for field in ['choiceExplanations','explanation','officialReferenceUrls']:
                    if field in old.get(row['id'], {}):
                        row[field] = old[row['id']][field]
            dump(DEST/f'{year}.json', rows)
        else:
            saved = json.loads((DEST/f'{year}.json').read_text(encoding='utf-8'))
            assert len(saved) == len(rows)
            for a,b in zip(rows,saved):
                for field, value in a.items():
                    assert b[field] == value, (a['id'], field)
        audits += [{'id':q['id'],'sourceTextSha256':q['sourceTextSha256'],'sourcePages':q['sourcePages'],'answer':q['answer']} for q in rows]
    manifest = {'slug':'chiiki-ryoko','publicationStatus':'staging','publicAllowed':False,'officialIndexUrl':INDEX,'termsUrl':'https://www.mlit.go.jp/kankocho/site-policy.html','checkedAt':'2026-11-04','candidateBasis':'COV1 B #8','expectedQuestions':118,'sourceFiles':sources,'assets':assets,'rounds':[{'year':2025,'examDate':'2025-09-28','lawReferenceDate':'2025-06-01','counts':[25,24,10]},{'year':2026,'examDate':'2026-09-27','lawReferenceDate':'2026-06-01','counts':[25,24,10]}]}
    for name,value in [('manifest.json',manifest),('official-answers.json',keys),('source-audit.json',{'extractor':f'PyMuPDF {fitz.VersionBind}','questions':audits,'sourceVerified':118,'choicesVerified':472,'answersVerified':118})]:
        if args.write:
            dump(DEST/name,value)
        else:
            assert json.loads((DEST/name).read_text(encoding='utf-8')) == value, name
    print('PASS: 4 source PDFs, 118 stems/answers, 472 choices, 51 original page images (private).')

if __name__ == '__main__':
    main()
