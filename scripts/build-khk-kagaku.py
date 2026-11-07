"""Build the unpublished KHK practice corpus from reviewed source drafts. No network/DB."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / 'data/questions/khk-kagaku'
PACK = ROOT / 'data/exam-library/source-packs/khk-kagaku'

def main():
    drafts = json.loads((BASE / 'staging-drafts.json').read_text('utf8'))
    review = json.loads((BASE / 'review-progress.json').read_text('utf8'))
    answers = json.loads((BASE / 'official-descriptive-answer-review.json').read_text('utf8'))
    publication = json.loads((ROOT / 'data/qualification-staging/khk-kagaku/manifest.json').read_text('utf8'))
    assert drafts['publicAllowed'] is False and publication['publicAllowed'] is False
    assert review['counts']['explanationWritten'] == 422
    ready = []
    used = set()
    keys = list('アイウエオ')
    for paper in drafts['papers']:
        for q in paper['questions']:
            assert q['transcriptionVerified'] and q['figuresVerified'] and q['explanationWritten']
            code = paper['code']
            original = q['questionDraft']
            passages = q.get('sharedPassagesDraft', [])
            instructions = q.get('lawInstructionsDraft', '')
            images = q['imageAssets'] + paper.get('supplementalMaterial', {}).get('imageAssets', [])
            image_url = lambda file: '/api/qualification-assets/khk-kagaku/' + Path(file).name
            used.update(images)
            item = dict(
                id=f'khk-kagaku-{paper["year"]}-annual-{code.lower()}-q{q["number"]}',
                exam='khk-kagaku', session=f'khk-{code.lower()}', year=paper['year'],
                season='annual', examDate=paper['examDate'], qNumber=q['number'],
                subject=f'{paper["qualification"]} {paper["subject"]}',
                type='descriptive' if code == 'AZ' else 'multiple-choice',
                category=f'{paper["qualification"]} {paper["subject"]}',
                topicTags=[paper['qualification'], paper['subject']], difficulty=3,
                question='\n\n'.join([v for v in [instructions, *passages, original] if v]),
                originalContent=dict(body=original, sharedPassages=[dict(label=f'共通設例{i}', text=s) for i,s in enumerate(passages, 1)]),
                explanation=q['explanationDraft'], explanationCoverage='full',
                sourcePdfUrl=q['sourcePdfUrl'], sourceAnswerUrl=q['sourceAnswerUrl'],
                sourceAttribution=f'出典：高圧ガス保安協会 令和{paper["year"]-2018}年度 {paper["qualification"]} {paper["subject"]} 問{q["number"]}（問題・公式正答）。解説・自己採点基準は独自作成。',
                officialReferenceUrls=q.get('explanationSourceUrls', []),
                license='KHK-attributed', lastUpdated='2026-11-04', needsReview=False,
                hasImage=bool(images), imageUrls=[image_url(f) for f in images],
                imageAltTexts=[f'令和{paper["year"]-2018}年度 {paper["qualification"]} {paper["subject"]} 公式原図・共通設例・付録（{Path(f).stem}）' for f in images],
            )
            if instructions:
                item['questionNotice'] = instructions
            if paper.get('lawReferenceDate'):
                item['lawReferenceDate'] = paper['lawReferenceDate']
            if code == 'AZ':
                entry = next(e for e in answers['entries'] if e['year']==paper['year'] and e['number']==q['number'])
                used.update(entry['imageAssets'])
                official_images='\n\n'.join(f'![公式解答例 {Path(f).stem}]({image_url(f)})' for f in entry['imageAssets'])
                item['answer']=q['modelAnswerDraft']
                item['modelAnswer']=q['modelAnswerDraft']+'\n\n'+q['explanationDraft']+'\n\n公式解答例（原典参照）\n\n'+official_images
                item['scoringCriteria']=q['scoringCriteriaDraft']
                item['selfAssessment']=q['selfAssessmentDraft']
            else:
                assert len(q['choicesDraft']) == 5
                item['choices']=dict(zip(keys,q['choicesDraft']))
                item['originalContent']['choices']=item['choices'].copy()
                item['answer']=keys[q['officialAnswerNumber']-1]
                item['officialAnswerNumber']=str(q['officialAnswerNumber'])
                item['choiceExplanations']={keys[int(k)-1]:v for k,v in q['choiceExplanationsDraft'].items()}
            if q.get('questionNoticeDraft'):
                item['questionNotice']=q['questionNoticeDraft']
                # The official scoring key is fixed; factual truth is explicitly qualified.
                item['choiceFactTruth']={k:None for k in keys}
            ready.append(item)
    assert len(ready)==422 and len({q['id'] for q in ready})==422
    assert used == {str(f.relative_to(PACK)).replace('\\','/') for f in (PACK/'images').glob('*.png')}
    assert len(used)==49
    for file in used: assert (PACK/file).is_file()
    (BASE/'ready.json').write_text(json.dumps(ready,ensure_ascii=False,indent=2)+'\n',encoding='utf8',newline='\n')
    (BASE/'image-assets.json').write_text(json.dumps(sorted(used),indent=2)+'\n',encoding='utf8',newline='\n')
    # Preparing a public release is a separate action; never put private originals in client bundles.
    (BASE/'public-questions.json').write_text('[]\n',encoding='utf8',newline='\n')
    # Literal readFile paths let Next trace the private source assets without public copies.
    loaders='import "server-only";\nimport { readFile } from "node:fs/promises";\nimport { join } from "node:path";\n\nexport const KHK_IMAGE_LOADERS: Record<string, () => Promise<Buffer>> = {\n'
    for file in sorted(used):
        loaders+=f'  "{Path(file).name}": () => readFile(join(process.cwd(), "data/exam-library/source-packs/khk-kagaku/{file}")),\n'
    (BASE/'assets.server.ts').write_text(loaders+'};\n',encoding='utf8',newline='\n')
    print('Built 422 questions: 410 choices, 12 descriptive; 49 image paths; unpublished')

if __name__ == '__main__': main()
