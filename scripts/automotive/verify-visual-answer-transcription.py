"""Compare manually read official answer-table images with all saved original keys."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / 'data/qualification-staging/automotive/latest-two'
# Read independently from the three rendered official answer pages on 2026-11-04.
TRANSCRIPTIONS = {
    '2026-first': {
        '2-gasoline': '3242133214324134143234314131222141342412',
        '2-diesel': '1113322443324442232412124444214431314123',
        '2-motorcycle': '2413431421412144234334122114332423124321',
        '3-chassis': '144413134423441331324443114122',
        '3-gasoline': '231441324421234411321333223241',
        '3-diesel': '431134134243112241223241411322',
        'body': '3434443211121121324342211432323423342243',
    },
    '2025-second': {
        '1-small-written': '24344112234131214131211343432221232134143441322434',
        '2-gasoline': '231243144241*332123412124243111334143143',
        '2-diesel': '3123113143443142214323224341211222124224',
        '2-chassis': '214423213323124141413343412233',
        '3-chassis': '321324341314424244442434311211',
        '3-gasoline': '324314132421412314312413124234',
        '3-diesel': '132121231413123243123242233114',
        '3-motorcycle': '342341312132234244321143324424',
        'electrical': '2314114322242313334422444112312123334242',
        'body': '3441422324324124213333124321424313142414',
    },
}

if __name__ == '__main__':
    official = json.loads((DATA / 'official-answers.json').read_text(encoding='utf-8'))
    manuscript = json.loads((DATA / 'latest-two.json').read_text(encoding='utf-8'))
    rows = []
    for q in manuscript['writtenOriginals']:
        sitting = f"{q['fiscalYear']}-{q['term']}"
        transcription = TRANSCRIPTIONS[sitting][q['subject']]
        table = official['tables']['jaspa-' + sitting][q['subject']]['answers']
        assert len(transcription) == len(table), (sitting, q['subject'], len(transcription), len(table))
        visually_read = transcription[q['qNumber']-1]
        stored = q['officialAnswerNumber']
        matched = (stored == visually_read) if visually_read != '*' else (
            q['officialQuestionStatus'] == 'withdrawn-all-accepted' and q['answer'] == ['ア', 'イ', 'ウ', 'エ'])
        rows.append({'id': q['id'], 'visuallyRead': visually_read, 'stored': stored, 'match': matched})
    report = {'method': 'Author independently read the three official answer-table images; not OCR and not new content acceptance.',
              'checked': len(rows), 'matched': sum(r['match'] for r in rows), 'tables': TRANSCRIPTIONS, 'rows': rows}
    (DATA / 'qa/lq1b-official-key-visual-check.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    errors = [r for r in rows if not r['match']]
    print(json.dumps({'checked': len(rows), 'mismatches': errors}, ensure_ascii=False))
    raise SystemExit(bool(errors))
