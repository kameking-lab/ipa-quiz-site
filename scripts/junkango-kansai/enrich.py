"""Apply the original editorial explanations without modifying source transcription."""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DEST = ROOT / 'data/qualification-staging/junkango-kansai'


def category(year, number):
    bounds = [(9, '人体の構造と機能'), (12, '栄養'), (16, '薬理'), (24, '疾病と感染'),
              (29 if year == 2026 else 28, '保健医療と法規'), (37 if year == 2026 else 36, '看護概論と心理'),
              (62, '基礎看護技術'), (77, '成人看護総論'), (112, '成人看護'),
              (126, '老年看護'), (138, '母子看護'), (150, '精神看護')]
    return next(label for upper, label in bounds if number <= upper)


def main():
    references = json.loads((DEST / 'explanation-references.json').read_text(encoding='utf-8'))
    for year in (2026, 2025):
        source = DEST / f'{year}-annual.json'
        rows = json.loads(source.read_text(encoding='utf-8'))
        explanations = {}
        for line in (DEST / f'explanations/{year}.tsv').read_text(encoding='utf-8').splitlines():
            cells = line.split('\t')
            assert len(cells) == 5, (year, cells[0], len(cells))
            number = int(cells[0])
            assert number not in explanations
            assert all(len(c.strip()) >= 20 for c in cells[1:]), (year, number)
            explanations[number] = dict(zip('1234', cells[1:]))
        assert sorted(explanations) == list(range(1, 151))
        for row in rows:
            before = hashlib.sha256(json.dumps([row['question'], row['choices']], ensure_ascii=False, sort_keys=True).encode()).hexdigest()
            assert before == row['sourceTextSha256'], row['id']
            row['type'] = 'multiple-choice'
            row['category'] = category(year, row['qNumber'])
            row['topicTags'] = [row['category']]
            row['choiceExplanations'] = explanations[row['qNumber']]
            row['explanationCoverage'] = 'full'
            row['explanationAuthorship'] = 'original'
            notice = row.get('scoringNotice', '')
            row['explanation'] = (notice + '\n' if notice else '') + '\n'.join(f'{key}：{text}' for key, text in row['choiceExplanations'].items())
            row['officialReferenceUrls'] = [ref['url'] for ref in references if f'{year}-q{row["qNumber"]}' in ref['questions']]
        source.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print('Applied 1,200 original choice explanations; all 300 source-text hashes unchanged.')


if __name__ == '__main__':
    main()
