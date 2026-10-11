"""Audit the complete 2026 first-stage paper against official PDF material."""
from __future__ import annotations
import hashlib
import json
import re
from pathlib import Path
from build_tsushin1_pilot import official_answer_rows
from extract_tsushin1_pilot import extract

ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / 'docs/evidence/tsushin1-2026/complete'

def read(path: Path):
    return json.loads(path.read_text(encoding='utf-8-sig'))

def digest(item):
    return hashlib.sha256(json.dumps(item, sort_keys=True, ensure_ascii=False).encode()).hexdigest()

def main():
    source = read(ROOT / 'data/questions/tsushin1/2026-september.json')
    corrections = read(EVIDENCE / 'TRANSCRIPTION-OVERRIDES.json')
    baseline = read(EVIDENCE / 'BASELINE-HASHES.json')
    crops = {(r['session'],r['number']):r for r in read(EVIDENCE / 'CROP-RECEIPTS.json')}
    rows = official_answer_rows()
    answers = {'mondai-a':sum(rows[:4],[]),'mondai-b':sum(rows[4:],[])}
    assert answers == read(EVIDENCE / 'OFFICIAL-ANSWERS.json'), 'Official answer fixture drift'
    answer_pdf = ROOT / 'docs/evidence/tsushin1-2026/input/tsushin1-2026-answers.pdf'
    assert source['answerSha256'] == hashlib.sha256(answer_pdf.read_bytes()).hexdigest()
    assert source['year'] == 2026 and source['exam'] == 'tsushin1'
    assert [p['session'] for p in source['papers']] == ['mondai-a','mondai-b']
    total = preserved = images = 0
    for paper, expected_count in zip(source['papers'], [55,35]):
        session = paper['session']
        official = extract(session, list(range(1, expected_count + 1)))
        assert paper['officialQuestionCount'] == paper['publishedCount'] == len(paper['questions']) == expected_count
        assert paper['questionSha256'] == official['questionPdfSha256']
        assert [q['number'] for q in paper['questions']] == list(range(1, expected_count + 1))
        overrides = {q['number']:q for q in corrections[session]}
        for item, original in zip(paper['questions'], official['questions']):
            number = item['number']
            key = f'{session}/{number}'
            if key in baseline:
                assert digest(item) == baseline[key], f'Published pilot changed: {key}'
                expected = original
                preserved += 1
            else:
                expected = dict(original)
                expected.update({k:v for k,v in overrides.get(number,{}).items() if k in ['question','choices']})
                expected['choices'] = [re.split(r'※\s*問題番号', text)[0].strip() for text in expected['choices']]
            for field in ['number','pdfPage','question','choices']:
                assert item[field] == expected[field], f'{key}: {field} differs from reviewed original'
            assert item['officialAnswerNumbers'] == [answers[session][number-1]], key
            assert len(item['choices']) == len(set(item['choices'])) == len(item['choiceExplanations']) == 4, key
            assert all(text.strip() for text in item['choiceExplanations']), key
            if key not in baseline:
                assert all(len(text) > 15 for text in item['choiceExplanations']), key
                assert len(item['explanation']) >= 50, key
            assert item['question'] and item['explanation'], key
            if re.search(r'下図|図1|図2|図に示す', item['question']):
                assert item.get('imageUrls'), f'Missing required figure: {key}'
            if item.get('imageUrls'):
                crop = crops[(session,number)]
                assert crop['questionPdfSha256'] == paper['questionSha256']
                assert len(item['imageUrls']) == len(item['imageAltTexts']) == len(crop['images'])
                for url, receipt in zip(item['imageUrls'],crop['images']):
                    assert url == '/images/tsushin1/2026/' + receipt['file']
                    path = ROOT / 'public' / url.lstrip('/')
                    assert hashlib.sha256(path.read_bytes()).hexdigest() == receipt['sha256']
                images += 1
            total += 1
    assert total == 90 and preserved == 12 and images == len(crops)
    report = {'exam':'tsushin1','year':2026,'officialOriginals':90,'completeOriginals':total,'preservedOriginals':preserved,'addedOriginals':total-preserved,'verifiedFigureQuestions':images,'sourceQuestionText':'fresh official extraction plus explicit image-reviewed transcription overrides','answerSourceSha256':source['answerSha256'],'latestTwoComplete':False,'secondYearOfficialOriginalCount':None,'secondYearBlocker':'2025 official questions A/B and answer key unavailable','publicationPerformed':False}
    (EVIDENCE / 'MECHANICAL-AUDIT.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f'PASS {total}/90 source prompts, four choices, official answers and full explanations; {preserved} published originals unchanged; {images} figures verified')

if __name__ == '__main__':
    main()
