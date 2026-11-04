"""Project accepted batch-1 sources without editing their hash-bound manuscripts.

No network, database, provider, or deployment access. Output is deterministic.
"""
from pathlib import Path
import collections
import hashlib
import json
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'data/questions/batch1'
OUT.mkdir(exist_ok=True)
KEYS = list('アイウエオカキクケコサシスセソ')
questions = collections.defaultdict(list)
excluded = []
assets = {}

def read(path):
    return json.loads((ROOT / path).read_text(encoding='utf-8-sig'))

def asset(path):
    if path.startswith('/') and (ROOT / 'public' / path.lstrip('/')).is_file():
        return path
    source = ROOT / path
    if not source.is_file():
        raise ValueError(f'Missing accepted image: {path}')
    digest = hashlib.sha256(source.read_bytes()).hexdigest()
    url = f'/images/questions/batch1/{digest}{source.suffix.lower()}'
    dest = ROOT / 'public' / url.lstrip('/')
    dest.parent.mkdir(exist_ok=True, parents=True)
    if not dest.exists():
        shutil.copyfile(source, dest)
    assets[path] = {'url': url, 'sha256': digest}
    return url

def choice_map(values):
    return dict(zip(KEYS, values, strict=False))

def base(q, exam, year, session='gakka'):
    return dict(id=q['id'], exam=exam, year=year, season='annual', session=session,
                qNumber=1, type='multiple-choice', category=q.get('category', exam),
                topicTags=q.get('topicTags', []), difficulty=q.get('difficulty', 3),
                hasImage=False, needsReview=False, lastUpdated='2026-11-04')

for year in [2024, 2025]:
    for q in read(f'data/qualification-staging/chintai/{year}.json'):
        if q['scoring'] == 'all-answers-correct':
            excluded.append(dict(id=q['id'], exam='chintai', reason='公式全員正解。通常の正誤採点から除外', source=q))
            continue
        n = base(q, 'chintai', year)
        n.update(question=q['question'], choices=choice_map(q['choices'].values()),
                 answer=KEYS[q['officialAnswerNumber']-1],
                 officialAnswerNumber=q['officialAnswerNumber'], explanation=q['explanation'],
                 choiceExplanations=choice_map(q['choiceExplanations'].values()),
                 explanationCoverage='full', sourcePdfUrl=q['sourcePdfUrl'],
                 sourceAnswerUrl=q['sourceAnswerUrl'], sourceAttribution=q['sourceAttribution'],
                 lawReferenceDate=q['lawAsOf'], license='CHINTAI-owner-authorized',
                 questionNotice=f'第{q["round"]}回 問{q["qNumber"]}。法令基準日：{q["lawAsOf"]}。')
        questions['chintai'].append(n)

for year in [2025, 2026]:
    for q in read(f'data/qualification-staging/kyusui/{year}-annual.json'):
        if q['scoring']['kind'] == 'all-correct':
            excluded.append(dict(id=q['id'], exam='kyusui', reason='公式全員正解。通常の正誤採点から除外', source=q))
            continue
        n = base(q, 'kyusui', year)
        n.update(question=q['question'] + ('\n'+q['postOptionContent'] if q['postOptionContent'] else ''),
                 choices=choice_map(q['choices']), answer=KEYS[q['scoring']['correctChoice']-1],
                 officialAnswerNumber=q['scoring']['correctChoice'], explanation=q['explanation'],
                 choiceExplanations=choice_map(q['choiceExplanations']), explanationCoverage='full',
                 sourcePdfUrl=q['sourcePdfUrl'], sourceAnswerUrl=q['sourceAnswerUrl'],
                 sourceAttribution=q['sourceAttribution'], license='KYUSUI-owner-authorized',
                 hasImage=True, imageUrls=[asset(p) for p in q['sourceImages']],
                 imageAltTexts=[f'{year}年 給水装置工事主任技術者 問{q["qNumber"]} 原問題' for p in q['sourceImages']],
                 questionNotice=f'{q["edition"]} 問{q["qNumber"]}。2025年問18は全員正解のため通常採点対象外。')
        questions['kyusui'].append(n)

seen = set()
for directory, exam in [('lq4c-biru-kan', 'biru-kan'), ('lq4b-engineer-first', 'gijutsushi1-kikai'),
                         ('lq4c-engineer-first', 'gijutsushi1-kikai'), ('lq4e-engineer-first', 'gijutsushi1-kikai')]:
    for f in sorted((ROOT / 'data/qualification-staging' / directory).glob('*.json')):
        packet = json.loads(f.read_text(encoding='utf-8-sig'))
        for q in packet['questions']:
            if q['id'] in seen:
                raise ValueError(f'Duplicate manuscript: {q["id"]}')
            seen.add(q['id'])
            if q['contentReview']['status'] != 'PASS' or q['needsIndependentReview']:
                raise ValueError(f'Unreviewed manuscript: {q["id"]}')
            if type(q['officialAnswer']) is not int:
                excluded.append(dict(id=q['id'], exam=exam, reason='公式採点例外。通常の単一正答演習から除外', source=q))
                continue
            session = 'gakka' if exam == 'biru-kan' else ('kiso' if 'basis' in q['id'] else 'ippan' if 'aptitude' in q['id'] else 'kikai')
            n = base(q, exam, packet['year'], session)
            figures = q.get('figures', [])
            n.update(question=q['questionText'], choices=choice_map(q['choices'].values()),
                     answer=KEYS[q['officialAnswer']-1], officialAnswerNumber=q['officialAnswer'],
                     explanation=q['explanation'], choiceExplanations=choice_map(q['choiceExplanations'].values()),
                     explanationCoverage='full', sourcePdfUrl=q['sourceQuestionUrl'],
                     sourceAnswerUrl=q['sourceAnswerUrl'], sourceAttribution=q['sourceAttribution'],
                     officialReferenceUrls=q.get('explanationReferenceUrls', []),
                     license='JAHMEC-owner-authorized' if exam == 'biru-kan' else 'IPEJ-attributed',
                     category=packet['subject'], questionNotice=f'公式問番号：{q["printedNumber"]}。',
                     hasImage=bool(figures), imageUrls=[asset(g['path']) for g in figures],
                     imageAltTexts=[g['alt'] for g in figures])
            if q['hasRequiredFigure'] and not figures:
                raise ValueError(f'Missing reviewed figure: {q["id"]}')
            questions[exam].append(n)

index = (ROOT / 'data/questions/hoshasen/index.ts').read_text(encoding='utf8')
hoshasen = []
for filename in re.findall(r'from "\./([^"/]+\.json)"', index):
    hoshasen += read('data/questions/hoshasen/' + filename)
for q in hoshasen:
    exam = f'hoshasen-{q["grade"]}'
    rows = q['blanks'] if q.get('format') == 'multi-part' else [None]
    for blank in rows:
        if blank and blank.get('allAnswersAccepted'):
            excluded.append(dict(id=q['id']+'-'+blank['id'], exam=exam, reason='公式全員正解欄。通常採点対象外', source=blank))
            continue
        n = base(q, exam, q['year'])
        if blank:
            n['id'] += '-slot-' + blank['id']
            options = next(g['choices'] for g in q['answerGroups'] if g['id'] == blank['groupId'])
            explanations = blank['choiceExplanations']
            answer = blank['officialAnswerNumber']
        else:
            options, explanations, answer = q['choices'], q['choiceExplanations'], q['officialAnswerNumber']
        # Preserve every accepted table cell while making the table accessible.
        prompt = q['question']
        if q['id'] == 'hoshasen-2-2026-jitsumu-q11':
            prompt = prompt.replace('核種｜壊変形式｜半減期｜利用する放射線', '|核種|壊変形式|半減期|利用する放射線|\n|---|---|---|---|')
            prompt = re.sub(r'^(¹⁴⁷Pm|¹³⁷Cs|²⁴¹Am)｜(.+)$', lambda m: '|'+m[1]+'|'+m[2].replace('｜','|')+'|', prompt, flags=re.M)
        n.update(question=prompt, choices=choice_map(options), answer=KEYS[answer-1],
                 officialAnswerNumber=answer, explanation=(blank['explanation']+'\n\n' if blank else '')+q['explanation'],
                 choiceExplanations=choice_map(explanations), explanationCoverage='full',
                 category=q['subject'], sourcePdfUrl=q['sourcePdfUrl'], sourceAnswerUrl=q['sourceAnswerUrl'],
                 sourceAttribution=q['sourceAttribution'], officialReferenceUrls=q.get('referenceUrls', []),
                 license='NUSTEC-owner-authorized', hasImage=q['hasImage'],
                 imageUrls=[asset(q['imagePath'])] if q['hasImage'] else [],
                 imageAltTexts=[q['imageAltText']] if q['hasImage'] else [],
                 questionNotice=f'公式原問：{q["subject"]} 問{q["number"]}'+(f'／解答欄{blank["id"]}。原文を保持し、解答欄ごとに演習します。' if blank else '。'))
        questions[exam].append(n)

for exam in ['khk-kikai-kou', 'khk-kikai-otsu']:
    for q in read(f'data/qualification-staging/khk-kikai/{exam}/questions.json'):
        n = dict(q)
        n.update(needsReview=False, publicAllowed=True, license='KHK-owner-decision')
        n['imageUrls'] = [asset('data/qualification-staging/khk-kikai/'+p if p.startswith('figures/') else p) for p in q.get('imageUrls', [])]
        if n.get('type') == 'descriptive':
            n['answer'] = n.get('modelAnswer', n['explanation'])
        questions[exam].append(n)

for f in sorted((ROOT / 'data/questions/energy-kanri').glob('20*.json')):
    packet = json.loads(f.read_text(encoding='utf8'))
    shared_images = list(dict.fromkeys(url for q in packet for url in q.get('imageUrls', [])))
    for q in packet:
        n = dict(q)
        n.update(needsReview=False, license='ECCJ-owner-approved')
        if shared_images:
            n.update(hasImage=True, imageUrls=shared_images,
                     imageAltTexts=[f'{q["sourceAttribution"]} 共通原図' for url in shared_images])
        n['questionNotice'] = q.get('questionNotice', '') + ' 第47・48回の62原問を解答欄単位で収録。全員正解1欄は通常採点対象外。'
        questions['energy-kanri'].append(n)

for exam, rows in questions.items():
    counters = collections.Counter()
    for q in rows:
        key = (q['year'], q['session'])
        counters[key] += 1
        # A stable internal serial prevents different original groups sharing a URL.
        q['qNumber'] = counters[key]
    (OUT / f'{exam}.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2)+'\n', encoding='utf8')
(OUT / 'excluded.json').write_text(json.dumps(excluded, ensure_ascii=False, indent=2)+'\n', encoding='utf8')
(OUT / 'assets.json').write_text(json.dumps(assets, ensure_ascii=False, indent=2)+'\n', encoding='utf8')
lines=['import type { Question } from "@/lib/questions/types";']
for i, exam in enumerate(questions):
    lines.append(f'import data{i} from "./{exam}.json";')
lines.append('export const BATCH1_QUESTIONS: Partial<Record<Question["exam"], Question[]>> = {')
for i, exam in enumerate(questions):
    lines.append(f'  "{exam}": data{i} as Question[],')
lines.append('};')
(OUT / 'index.ts').write_text('\n'.join(lines)+'\n', encoding='utf8')
print(json.dumps({exam: len(rows) for exam, rows in questions.items()}, ensure_ascii=False))
print('Excluded:', len(excluded), 'Assets:', len(assets))
