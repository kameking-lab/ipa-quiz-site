"""Verify both complete first-stage sittings, including actual source provenance."""
from __future__ import annotations
import hashlib
import json
import re
from pathlib import Path
import fitz
from audit_tsushin1_pilot import main as audit_2026
from extract_tsushin1_2025 import extract

ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / 'docs/evidence/tsushin1-2025'

def read(path):
    return json.loads(path.read_text(encoding='utf-8-sig'))

def main():
    audit_2026()
    source = read(ROOT / 'data/questions/tsushin1/2025-september.json')
    provenance = read(EVIDENCE / 'complete/provenance.json')
    overrides = read(EVIDENCE / 'complete/TRANSCRIPTION-OVERRIDES.json')
    crop_list = read(EVIDENCE / 'complete/CROP-RECEIPTS.json')
    crops = {(r['session'], r['number']):r for r in crop_list}
    assert len(crops) == len(crop_list), 'Duplicate figure receipt'
    review = read(EVIDENCE / 'complete/TARGETED-INDEPENDENT-REVIEW.json')
    assert len(review['items']) == 10
    for receipt in review['reviewedFiles'].values():
        assert hashlib.sha256((EVIDENCE/'complete'/receipt['archivedFile']).read_bytes()).hexdigest() == receipt['sha256']
    for item in review['items']:
        assert item['status'] in ['pass','pass_with_evidence_limit']
        assert hashlib.sha256((EVIDENCE/'complete'/item['originalImage']).read_bytes()).hexdigest() == item['originalImageSha256']
    editorial = {
        'mondai-a':read(EVIDENCE/'complete/editorial/editorial-a-first.json')+read(EVIDENCE/'complete/editorial/editorial-a-last.json'),
        'mondai-b':read(EVIDENCE/'complete/editorial/editorial-b.json'),
    }
    for receipt in provenance['files']:
        path = EVIDENCE / receipt['localPath']
        assert hashlib.sha256(path.read_bytes()).hexdigest() == receipt['sha256']
        assert path.stat().st_size == receipt['bytes']
        assert len(fitz.open(path)) == receipt['pdfPages']
        assert receipt['sourceUrl'].startswith('https://dobokujira.com/'), 'Do not invent first-party acquisition'
    assert source['answerUrl'] == provenance['files'][2]['sourceUrl']
    assert source['answerSha256'] == provenance['files'][2]['sha256']
    doc = fitz.open(EVIDENCE / 'input/tsushin1-2025-answers.pdf')
    lines = doc[0].get_text().splitlines()
    rows = []
    for i, line in enumerate(lines):
        if line == '解答':
            values = []
            for value in lines[i+1:]:
                if not re.fullmatch(r'[1-4]', value): break
                values.append(int(value))
            rows.append(values)
    assert [len(r) for r in rows] == [15,15,15,10,15,15,5]
    answers = {'mondai-a':sum(rows[:4],[]),'mondai-b':sum(rows[4:],[])}
    assert answers == read(EVIDENCE / 'complete/OFFICIAL-ANSWERS.json')
    assert source['exam'] == 'tsushin1' and source['year'] == 2025
    assert [p['session'] for p in source['papers']] == ['mondai-a','mondai-b']
    total = images = 0
    for paper, count, pdf in zip(source['papers'],[55,35],provenance['files'][:2]):
        session = paper['session']
        fresh = extract(session, EVIDENCE)
        assert len(fresh['questions']) == count
        assert paper['questionSha256'] == fresh['questionPdfSha256'] == pdf['sha256']
        assert paper['questionUrl'] == pdf['sourceUrl']
        assert paper['publishedCount'] == paper['officialQuestionCount'] == len(paper['questions']) == count
        assert [q['number'] for q in paper['questions']] == list(range(1,count+1))
        corrections = {q['number']:q for q in overrides[session]}
        assert len(corrections) == len(overrides[session])
        editors = {q['number']:q for q in editorial[session]}
        assert len(editors) == len(editorial[session]) == count
        for item, original in zip(paper['questions'],fresh['questions']):
            number = item['number']
            key = f'{session}/{number}'
            expected = dict(original)
            expected.update({k:v for k,v in corrections.get(number,{}).items() if k in ['question','choices']})
            expected['choices'] = [re.split(r'※\s*問題番号',s)[0].strip() for s in expected['choices']]
            for field in ['number','pdfPage','question','choices']:
                assert item[field] == expected[field], f'{key}: {field} differs from reviewed source'
            assert item['officialAnswerNumbers'] == [answers[session][number-1]], key
            assert len(item['choices']) == len(set(item['choices'])) == len(item['choiceExplanations']) == 4, key
            assert all(len(s)>15 for s in item['choiceExplanations']) and len(item['explanation'])>=50, key
            editor = editors[number]
            assert item['explanation'] == editor['explanation'], f'{key}: reviewed summary drift'
            assert item['choiceExplanations'] == editor.get('choiceExplanations',editor.get('choiceExplanations4')), f'{key}: reviewed option explanation drift'
            assert item['category'] == editor['category'] and item['topic'] == editor['topic'], key
            strings = [item['question'],*item['choices'],item['explanation'],*item['choiceExplanations']]
            assert not re.search(r'[\x00-\x08\x0b\x0c\x0e-\x1f\ue000-\uf8ff]|姶|挨|文章中のの|※\s*問題番号','\n'.join(strings)), key
            if re.search(r'下図|図1|図2|図に示|右図|次の図|下表|表に示',item['question']):
                assert item.get('imageUrls'), f'{key}: missing source figure'
            if item.get('imageUrls'):
                crop = crops[(session,number)]
                assert crop['questionPdfSha256'] == paper['questionSha256']
                assert len(item['imageUrls']) == len(item['imageAltTexts']) == len(crop['images'])
                for url, receipt in zip(item['imageUrls'],crop['images']):
                    assert url == '/images/tsushin1/2025/' + receipt['file']
                    assert hashlib.sha256((ROOT/'public'/url.lstrip('/')).read_bytes()).hexdigest() == receipt['sha256']
                images += 1
            total += 1
    assert total == 90 and images == len(crops)
    preservation = read(EVIDENCE / 'complete/2026-PRESERVATION.json')
    assert hashlib.sha256((ROOT/preservation['file']).read_bytes()).hexdigest() == preservation['sha256']
    identities=[]
    for year in [2026,2025]:
        corpus=read(ROOT/f'data/questions/tsushin1/{year}-september.json')
        identities.extend((year,p['session'],q['number']) for p in corpus['papers'] for q in p['questions'])
    assert len(identities) == len(set(identities)) == 180
    report={'exam':'tsushin1','latestTwoYears':[2026,2025],'requiredOriginals':180,'completeOriginals':180,'preservedPublicOriginals':12,'addedOriginals':168,'year2025Originals':90,'year2026Originals':90,'year2025VerifiedFigureQuestions':images,'unresolvedOriginals':[],'latestTwoComplete':True,'2025Source':'JCTC-form public saved copies from dobokujira.com; actual retrieval URLs and SHA-256 verified; first-party acquisition and historical first-party hash match unverified','sourceQuestionText':'fresh PDF extraction with font-specific mapping plus explicit image-reviewed overrides','publicationPerformed':False}
    (EVIDENCE/'complete/MECHANICAL-AUDIT.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f'PASS latest two sittings: {len(identities)}/180 unique originals, source prompts, official-format answers and all four explanations; +168, {images} 2025 figures')

if __name__ == '__main__':
    main()
