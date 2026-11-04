"""Build INT7 public projections; preserve reviewed private manuscripts byte for byte."""
import hashlib
import json
import re
import shutil
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STAGING = ROOT / 'data/qualification-staging'
OUTPUT = ROOT / 'data/questions/batch3'
REPORT = ROOT / 'reports/int7-20261105'
KEYS = list('アイウエオカキクケコサシスセソタ')
ASSETS = {}
EXCLUDED = []


def read(path):
    return json.loads(path.read_text(encoding='utf-8-sig'))


def asset(code, value):
    path = ROOT / value if value.startswith('data/') else STAGING / code / value
    path = path.resolve()
    path.relative_to(STAGING / code)
    raw = path.read_bytes()
    digest = hashlib.sha256(raw).hexdigest()
    url = '/images/questions/batch3/' + digest + path.suffix.lower()
    target = ROOT / 'public' / url[1:]
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(path, target)
    ASSETS[path.relative_to(ROOT).as_posix()] = {'url': url, 'sha256': digest}
    return url


def records(code):
    result = []
    for path in sorted((STAGING / code).glob('*.json')):
        if not re.match(r'202[456](?:-|\.)', path.name):
            continue
        data = read(path)
        qs = data.get('questions', []) if isinstance(data, dict) else data
        for question in qs:
            result.append((question, data.get('year', int(path.name[:4])) if isinstance(data, dict) else int(path.name[:4])))
    return result


def project(code, q, year):
    if q.get('scoring') == 'all-correct' or isinstance(q.get('scoring'), dict) and q['scoring'].get('kind') == 'all-correct':
        EXCLUDED.append({'exam': code, 'id': q['id'], 'reason': '公式全員正解。通常演習・単一肢採点から除外。'})
        return None
    session = q.get('session', q.get('track', 'gakka'))
    # Preserve track-specific papers and category-local numbering in distinct sessions.
    if code == 'benrishi':
        session = {'特許・実用新案': 'patent', '意匠': 'design', '商標': 'trademark', '条約': 'treaty', '著作権法・不正競争防止法': 'copyright'}[q['category']]
    if code == 'dokugeki-chiba':
        session = 'dokugeki-' + q['track']
    number = q.get('qNumber', q.get('number', q.get('officialQuestionNumber')))
    images = q.get('sourceImages', q.get('sourcePageImages', [q['sourceImage']] if q.get('sourceImage') else q.get('imageUrls', [])))
    answer_images = q.get('answerImageUrls', [])
    question = q.get('question', q.get('text', ''))
    choices = q.get('choices', {})
    explanations = q.get('choiceExplanations', {})
    if code == 'sokuryoshi':
        documents = {d['id']: d for d in read(STAGING / code / 'source-manifest.json')['documents']}
        def pages(refs):
            return [next(p['asset'] for p in documents[r['documentId']]['pages'] if p['page'] == r['page']) for r in refs]
        images = pages(q['originalQuestion']['sourcePages'])
        answer_images = pages(q['originalAnswer']['sourcePages']) if q['session'] == 'pm' else []
        question = q['originalQuestion'].get('selector', q['officialQuestionLabel']) + '\n原問題の本文・選択肢・図表は次の原本画像で確認してください。'
        choices = {KEYS[i]: f'原本の選択肢{c["officialNumber"]}' for i, c in enumerate(q.get('choices', []))}
        explanations = {KEYS[i]: c['explanation'] for i, c in enumerate(q.get('choices', []))}
    elif isinstance(choices, list):
        choices = {KEYS[i]: c.get('text', '') if isinstance(c, dict) else c for i, c in enumerate(choices)}
    elif choices and '1' in choices:
        choices = {KEYS[int(k)-1]: v for k, v in choices.items()}
    if isinstance(explanations, list):
        explanations = {KEYS[i]: c.get('explanation', c.get('text', '')) if isinstance(c, dict) else c for i, c in enumerate(explanations)}
    elif explanations and '1' in explanations:
        explanations = {KEYS[int(k)-1]: v for k, v in explanations.items()}
    answer = q.get('answer')
    if answer is None:
        numbers = q.get('acceptedAnswerNumbers') or [q.get('correctChoice', q.get('officialAnswerNumber'))]
        answer = [KEYS[int(n)-1] for n in numbers if n is not None and str(n).isdigit()]
        if len(answer) == 1:
            answer = answer[0]
    context = '\n\n'.join(str(q[k]) for k in ['sharedContext', 'sharedPrompt', 'choiceHeader', 'postOptionContent'] if q.get(k))
    if context and not question.startswith(context):
        question = context + '\n\n' + question
    result = {
        'id': q['id'], 'exam': code, 'year': year, 'season': q.get('season', 'annual'), 'session': session,
        'qNumber': number, 'type': q.get('type', 'multiple-choice'), 'category': q.get('category', session),
        'topicTags': q.get('topicTags', [q.get('category', session)]), 'difficulty': q.get('difficulty', 3),
        'question': question, 'answer': answer, 'explanation': q.get('explanation', ''),
        'sourcePdfUrl': q.get('sourcePdfUrl', q.get('sourcePdfUrls', [''])[0]),
        'sourceAnswerUrl': q.get('sourceAnswerUrl'), 'sourceAttribution': q.get('sourceAttribution', q.get('attribution')),
        'license': 'INT7-owner-decision', 'publicAllowed': True, 'needsReview': False,
        'lastUpdated': q.get('lastUpdated', '2026-11-05'), 'hasImage': bool(images),
    }
    for field in ['fiscalYear', 'examDate', 'officialAnswerNumber', 'officialQuestionLabel', 'requiredSelections', 'lawReferenceDate', 'originalContent', 'questionNotice', 'sourceRubies', 'choiceFactTruth', 'acceptedAnswerCombinations', 'modelAnswer', 'scoringCriteria', 'explanationSections']:
        if q.get(field) is not None:
            result[field] = q[field]
    if choices:
        result['choices'] = choices
        result['choiceExplanations'] = explanations
        result['explanationCoverage'] = 'full'
    if images:
        result['imageUrls'] = [asset('kenchikushi2' if code == 'mokuzo-kenchikushi' else code, v) for v in images]
        result['imageAltTexts'] = q.get('imageAltTexts') or [f'{year}年 {q.get("officialQuestionLabel", number)} 原問題・図表（{i+1}/{len(images)}）' for i in range(len(images))]
    if q.get('choiceImageUrls'):
        result['choiceImageUrls'] = {k: asset('kenchikushi2' if code == 'mokuzo-kenchikushi' else code, v) for k, v in q['choiceImageUrls'].items()}
    if answer_images:
        result['answerImageUrls'] = [asset(code, v) for v in answer_images]
        result['answerImageAltTexts'] = [f'{year}年 午後 No.{number} 公式解答例（{i+1}）' for i in range(len(answer_images))]
    if result['type'] == 'descriptive':
        result['answer'] = ''
        result.pop('choices', None)
        result.pop('choiceExplanations', None)
        result['modelAnswer'] = '\n\n'.join(s['label'] + '\n' + s['text'] for s in q.get('explanationSections', []))
        result['explanation'] = result['modelAnswer']
        result['answer'] = result['modelAnswer']
        result['scoringCriteria'] = '公式解答例と独自解説を用いて自己確認します。記述・作図は自動採点しません。必須No.1と選択No.2〜5から2題が実際の解答対象です。'
    if q.get('sourceIssue'):
        result['questionNotice'] = q['sourceIssue']
    assert result['question'] and result['explanation'], (code, q['id'])
    return result


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    REPORT.mkdir(parents=True, exist_ok=True)
    corpora = {}
    for code in ['benrishi', 'sokuryoshi', 'dokugeki-chiba', 'jokaso-setsubishi', 'chiiki-ryoko', 'junkango-kansai', 'kukaku-seiri', 'dojo-osen']:
        corpora[code] = [r for q, year in records(code) if (r := project(code, q, year))]
    for path in sorted((STAGING / 'kenchikushi2').glob('*.ts')):
        if not re.match(r'(?:mokuzo-)?202[56]-', path.name):
            continue
        text = path.read_text(encoding='utf-8-sig')
        data = json.loads(text[text.index('= [')+2:text.rindex(']')+1])
        for q in data:
            r = project(q['exam'], q, q['year'])
            corpora.setdefault(q['exam'], []).append(r)
    expected = {'benrishi': 120, 'sokuryoshi': 66, 'dokugeki-chiba': 480, 'jokaso-setsubishi': 100, 'chiiki-ryoko': 118, 'junkango-kansai': 299, 'kukaku-seiri': 40, 'dojo-osen': 159, 'kenchikushi2': 200, 'mokuzo-kenchikushi': 200}
    for code, questions in corpora.items():
        assert len(questions) == expected[code], (code, len(questions))
        assert len({q['id'] for q in questions}) == len(questions)
        (OUTPUT / (code + '.json')).write_text(json.dumps(questions, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    receipt = {'authorization': 'INT7 owner instruction to publish the named qualifications; no assertion of copyright-holder permission or human specialist review.', 'counts': {k: len(v) for k,v in corpora.items()}, 'excluded': EXCLUDED, 'assets': ASSETS}
    (REPORT / 'projection-receipt.json').write_text(json.dumps(receipt, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    print(json.dumps({'counts': receipt['counts'], 'excluded': len(EXCLUDED), 'assets': len(ASSETS)}, ensure_ascii=False))


if __name__ == '__main__':
    main()
