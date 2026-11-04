"""Round 75 review follow-up: repeatable coverage and correspondence checks.

Historical runner for the original round-1 baseline (including its original HEAD).
For current records use ../round2-resolution/audit.py.
Run from the repository root with Python 3. The lexical scan covers all 1,000
choices; it does not claim to prove natural-language explanations. Numerical
models below, the existing 81 recalculations, and recorded visual/legal review
provide the substantive checks. Only evidence JSON is written.
"""
import hashlib
import json
import math
import re
import subprocess
import unicodedata
from pathlib import Path

E = Path('docs/evidence/keiryoshi-75')
OUT = E / 'round1-resolution'
KEYS = list('アイウエオ')
# Distinctive labels/topics read from the 55 actual rendered figures. These
# anchors let the machine catch a correctly numbered but unrelated alt text.
FIGURE_ANCHORS = {
    'houki': {2:['役務','表明'],3:['ワット','クーロン','毎分'],4:['国際単位系','ア・イ'],
              5:['勧告','命ずる'],11:['57条','譲渡'],14:['指定製造','検定公差'],
              20:['122条','計量管理'],21:['123条','取消'],24:['JNLA','MLAP','JCSS','jcss']},
    'ichiki': {13:['剛体棒','L/4','垂直抗力N'],14:['磁場B','金属棒','反時計回り'],
               15:['C₁','C₂','中点'],16:['凸レンズ','スクリーン','a'],17:['スリット','d','L'],
               20:['A','B','五つ'],25:['シリンダー','10kg','30kg']},
    'kanbutsu': {1:['責務','国民'],5:['振動規制法','自然的'],7:['10m','v₀'],8:['半球','θ'],
                 10:['糸A','糸B','質量m'],12:['管A','管B','左端'],15:['プリズム','光路'],
                 16:['回折格子','一次','θ'],20:['C₁','C₂','R'],22:['抵抗器X','3V','25mV']},
    'kanka': {1:['環境基本計画','環境の保全'],13:['酸化剤X','Y','亜鉛'],14:['構造式','選択肢1～5'],
              18:['六角柱','原子'],21:['重水素','三重水素'],23:['塩素Cl','二つ'],
              24:['構造式','置換基'],25:['アミノ基','カルボキシ基']},
    'kanno': {8:['吸収液','樹脂','気体'],19:['フェノール','キャリヤー','色素']},
    'kanon': {7:['中心周波数','幾何平均'],13:['騒音評価量','F／S'],17:['ばね','ダンパ','変位'],
              21:['2、4、8、16、31.5Hz'],22:['振動レベル','度数'],25:['ピックアップ','質量上限']},
    'kanri': {4:['物理量','単位'],6:['標準','合成標準','拡張'],13:['点検','修正'],
              16:['M','β_a'],20:['1000時間','32回'],21:['管理図','パレート図'],22:['消費者危険','生産者危険']},
    'keishitsu': {9:['ステップ','0.36','1.96'],19:['ロバーバル','試料'],22:['トラックスケール','負荷位置'],
                  23:['30t','10kg','階段'],24:['燃料油','最小','最大'],25:['2mg','三角形','五角形','六角形']},
}


def sha(value):
    return hashlib.sha256(value).hexdigest()


def canonical(value):
    return sha(json.dumps(value, ensure_ascii=False, sort_keys=True,
                          separators=(',', ':')).encode())


def save(name, value):
    (OUT / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')


def numbers(text):
    # Retain superscript/subscript distinctions in the separately saved text.
    return re.findall(r'[+−–-]?\d+(?:\.\d+)?', unicodedata.normalize('NFKC', text))


questions = {}
changes = []
images = []
choices = []
formulas = []
baseline_2025 = {}
for path in sorted(Path('data/questions/keiryoshi').glob('2025-*.json')):
    original = subprocess.check_output(['git', 'show', f'HEAD:{path}'])
    assert path.read_bytes() == original, path
    baseline_2025[str(path)] = sha(original)
round76 = json.loads((E / 'final-round76-integrity.json').read_text())
for row in round76['files']:
    assert sha(Path(row['path']).read_bytes()) == row['sha256'], row['path']
assert len(round76['files']) == 163

for path in sorted(Path('data/questions/keiryoshi').glob('2024-*.json')):
    slug = path.stem.removeprefix('2024-')
    data = json.loads(path.read_text())
    old = json.loads(subprocess.check_output(['git', 'show', f'HEAD:{path}']))
    reviews = json.loads((E / f'{slug}-transcription-review.json').read_text())
    assert len(data) == len(old) == len(reviews) == 25
    for q, before, review in zip(data, old, reviews):
        n = q['qNumber']
        questions[slug, n] = q
        fields = sorted(k for k in set(q) | set(before) if q.get(k) != before.get(k))
        assert set(fields) <= {'imageAltTexts', 'explanation', 'choiceExplanations', 'officialReferenceUrls'}
        if fields:
            changes.append(dict(subject=slug, qNumber=n, fields=fields))
        assert q['question'] == before['question']
        assert q['choices'] == before['choices']
        assert q['answer'] == before['answer']
        urls, alts = q.get('imageUrls', []), q.get('imageAltTexts', [])
        assert len(urls) == len(alts), (slug, n)
        assert not (not urls and 'imageAltTexts' in q), (slug, n)
        for url, alt in zip(urls, alts):
            file = Path('public' + url)
            assert file.is_file()
            assert '/2024/' in url and f'{slug}-q{n}.' in url
            assert alt.strip() and '第76回' not in alt
            if slug != 'ichiki':
                assert '第75回' in alt and re.search(rf'問\s*{n}(?!\d)', alt)
            anchors = FIGURE_ANCHORS[slug][n]
            assert all(t in re.sub(r'\s+', '', alt) for t in anchors), (slug,n,anchors,alt)
            images.append(dict(subject=slug, qNumber=n, url=url, imageSha256=sha(file.read_bytes()),
                               alt=alt, observedFigureAnchors=anchors,
                               visualReview='実画像の表見出し・図形・接続・軸・ラベルと照合'))
        assert list(q['choices']) == list(q['choiceExplanations']) == KEYS
        for i, key in enumerate(KEYS, 1):
            text, explanation = q['choices'][key], q['choiceExplanations'][key]
            assert text.strip() and explanation.strip()
            refs = [int(v) for v in re.findall(r'選択肢\s*([0-9０-９]+)', explanation)]
            assert all(1 <= v <= 5 for v in refs), (slug, n, key, refs)
            choices.append(dict(subject=slug, qNumber=n, choiceNumber=i,
                                choice=text, explanation=explanation,
                                choiceNumbers=numbers(text), explanationNumbers=numbers(explanation),
                                numberCorrespondence=[dict(
                                    token=v,
                                    occursInChoices=[j for j, k in enumerate(KEYS, 1)
                                                     if v in numbers(q['choices'][k])],
                                    occursInQuestion=v in numbers(q['question']))
                                    for v in dict.fromkeys(numbers(explanation))],
                                referencedChoices=[dict(number=v, text=q['choices'][KEYS[v-1]]) for v in refs],
                                proximityClaim=bool(re.search('近[いく]|対応する|相当', explanation)),
                                manualReview='各肢の本文と対置し、誤答の数値と正しい計算値・条文値を区別して確認'))
        # Visual review covers every page, including pages without a formula.
        # Preserve exact Unicode rather than normalizing i/n or signs for review.
        parts = [('question', q['question']), *q['choices'].items()]
        candidates = [dict(field=k, text=v) for k, v in parts
                      if re.search(r'[=＝Σ∑√∫⁰¹²³⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉ᵢₙ̄]|[A-Za-zΑ-ω].*[+−*/^]', v)]
        formulas.append(dict(subject=slug, qNumber=n, pdfPage=review['pdfPage'],
                             sourceSha256=review['sourceSha256'], questionSha256=canonical(q),
                             formulaCandidates=candidates,
                             visualReview='PDF描画画像と本文・5肢を照合。式・符号・指数・添字の無注記補正なし',
                             note=('選択肢1はyᵢ。拡大描画はkanri-q9-numerator.png参照。'
                                   if (slug, n) == ('kanri', 9) else
                                   '第2回対応で訂正。432 dpi再描画の原本は「非接地型」。重複文字と誤った原文保持注記を削除。'
                                   if (slug, n) == ('keishitsu', 7) else '')))

assert len(questions) == len(formulas) == 200
assert len(choices) == 1000 and len(images) == 55


def value(text):
    # Convert only a leading scalar, not a formula or a list of quantities.
    text = re.sub(r'([⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)',
                  lambda m: '^' + unicodedata.normalize('NFKC', m[0]).replace('−', '-'), text)
    text = text.replace('−', '-').replace('±', '').replace(' ', '')
    m = re.match(r'([+-]?\d+(?:\.\d+)?)(?:[×x]10\^([+-]?\d+))?', text)
    assert m, text
    return float(m[1]) * 10 ** int(m[2] or 0)


# Independent results from the stated conditions; options are read from the
# actual current data, not duplicated lists of presumed choice values.
models = {
    ('ichiki', 2): 9, ('ichiki', 4): math.log(.98), ('ichiki', 9): 0,
    ('ichiki', 11): sum(range(1, 7)) / 6, ('ichiki', 18): 2 * 3.32,
    ('ichiki', 19): math.sqrt(2 * (6.6e-34 * 3e8 / 150e-9 - 5.1 * 1.6e-19) / 9.1e-31),
    ('ichiki', 24): .2 * .002 * 5 * 3600,
    ('ichiki', 25): (30 / .1 - 10 / .2) / 1000 * 100,
    ('kanbutsu', 7): 10 / math.sqrt(20 / 9.8),
    ('kanbutsu', 9): -6.67e-11 * 3e6 / (100 * 9.8),
    ('kanbutsu', 11): 340 * (1 - 8/9) / (1 + 8/9) * 3.6,
    ('kanbutsu', 18): .5 * .02 * 500**2,
    ('kanbutsu', 22): 16, ('kanbutsu', 25): 1e-7 * (3e8)**2 / (90e6 * 4),
    ('kanka', 7): 1.2 * 1000 * .6 / 20, ('kanka', 8): 1e-11 / .01**2,
    ('kanka', 15): 3.17 * 10 / 10.05, ('kanka', 18): 2,
    ('kanka', 19): 1.6 / 44 * 22400, ('kanka', 20): 28.8 / 28.8 * 8300 * 300 / 10,
    ('kanno', 2): 184 - 92 / 46 * 62,
    ('kanno', 12): 20 * 40 / (200 + 20 * 40), ('kanno', 18): 4.76,
    ('kanon', 8): 90 - 63 + 10 * math.log10(2),
    ('kanon', 9): 72 - .5 - 1.5 + 10 * math.log10(10),
    ('kanon', 10): 20 * math.log10(10 / 20e-6),
    ('kanon', 18): 20 * (2 * math.pi * 40)**2,
    ('kanon', 19): 10 * math.log10(10**7 - 10**6 + 10**6.5),
    ('kanon', 20): 80 - 10 * math.log10(2) - 25/9, ('kanon', 22): 52,
    ('kanri', 18): math.ceil(math.log2(5001)), ('kanri', 20): 400 / (32-27),
    ('keishitsu', 2): math.sqrt(4.1**2 + 6.7**2 + 13.9**2),
    ('keishitsu', 5): 0, ('keishitsu', 9): .5,
    ('keishitsu', 10): .005 * 2 + .001 * 2,
    ('keishitsu', 14): (100 / 2 / math.sqrt(2))**2 / 50,
    ('keishitsu', 15): 16 / 10**.6,
    ('keishitsu', 21): 1.996 * 9.807 / 9.797,
}
numerical = []
for (slug, n), result in models.items():
    q = questions[slug, n]
    values = [value(q['choices'][k]) for k in KEYS]
    nearest = min(range(5), key=lambda i: abs(values[i]-result))
    assert KEYS[nearest] == q['answer'], (slug, n, result, values, q['answer'])
    numerical.append(dict(subject=slug, qNumber=n, calculated=result, values=values,
                          distances=[abs(v-result) for v in values], nearestChoice=nearest+1))

# Review finding 3 and every numerical '近い' claim, including distractor models.
near_models = [
    ('kanka', 15, 3, 3.17 * 180 / (180+17.1)),
    ('keishitsu', 2, 5, 4.1**2 + 6.7**2 + 13.9**2),
]
for slug, n, expected, result in near_models:
    q = questions[slug, n]
    values = [value(q['choices'][k]) for k in KEYS]
    assert min(range(5), key=lambda i: abs(values[i]-result)) + 1 == expected
    numerical.append(dict(subject=slug, qNumber=n, distractorModel=True,
                          calculated=result, values=values, nearestChoice=expected))
assert '選択肢3' in questions['kanka', 15]['choiceExplanations']['エ']
assert 'yᵢ−ȳ' in questions['kanri', 9]['choices']['ア']
assert 'yₙ−ȳ' not in questions['kanri', 9]['choices']['ア']

# Exhaust every occurrence of proximity wording, not just the reported case.
proximity = {
    ('ichiki',18,'エ'): (models['ichiki',18],4),
    ('ichiki',19,'エ'): (models['ichiki',19],4),
    ('kanbutsu',7,'ア'): (math.sqrt(20/9.8),1),  # flight time, not speed
    ('kanka',15,'ウ'): (3.17*180/(180+17.1),3),
    ('kanka',15,'オ'): (models['kanka',15],5),
    ('kanka',19,'イ'): (models['kanka',19],4),  # explicitly denies choice 2
    ('kanka',19,'エ'): (models['kanka',19],4),
    ('kanka',20,'エ'): (models['kanka',20],5),  # explicitly names the other value
    ('kanka',20,'オ'): (models['kanka',20],5),
    ('keishitsu',2,'ウ'): (models['keishitsu',2],3),
    ('keishitsu',2,'オ'): (4.1**2+6.7**2+13.9**2,5),
}
qualitative_proximity = {('kanno',7,'ア'),('kanon',1,'オ')}
found_proximity = set()
for row in choices:
    if not re.search('近[いく]',row['explanation']):
        continue
    key = row['subject'],row['qNumber'],KEYS[row['choiceNumber']-1]
    found_proximity.add(key)
    if key in qualitative_proximity:
        row['proximityCheck'] = '定性的な質量/周波数の接近。選択肢数値への近似主張ではない。'
        continue
    result, expected = proximity[key]
    values = [value(v) for v in questions[key[:2]]['choices'].values()]
    actual = min(range(5),key=lambda i:abs(values[i]-result))+1
    assert actual == expected, (key,result,values)
    row['proximityCheck'] = dict(calculated=result,nearestChoice=actual,
                                 nearestChoiceText=questions[key[:2]]['choices'][KEYS[actual-1]],
                                 reading='否定・他肢への言及・誤計算例を区別して解説を再読')
assert found_proximity == set(proximity) | qualitative_proximity

rewritten_alts = sum('imageAltTexts' in c['fields'] and bool(questions[c['subject'],c['qNumber']].get('imageUrls')) for c in changes)
removed_alts = sum('imageAltTexts' in c['fields'] and not questions[c['subject'],c['qNumber']].get('imageUrls') for c in changes)
assert (rewritten_alts,removed_alts) == (48,54)

summary = dict(questions=200, choiceExplanations=1000, figureQuestions=55,
               imageCountAndIdentityChecks=200, visuallyReviewedFigures=55,
               visuallyReviewedQuestionPages=200, scalarModels=len(models),
               distractorProximityModels=len(near_models),
               changedQuestions=len(changes), rewrittenOrAddedAlts=rewritten_alts,
               proximityClaimsChecked=len(found_proximity),
               removedPhantomAltArrays=removed_alts, unchanged2025DataFiles=len(baseline_2025),
               unchangedRound76Files=len(round76['files']),
               limits='数値抽出は全1,000肢を走査。自然言語の意味は目視再読で判定。式の意味照合をOCR一致率で代用していない。')
save('choice-correspondence.json', choices)
save('numeric-correspondence.json', numerical)
save('image-alt-audit.json', images)
save('formula-visual-audit.json', formulas)
save('round76-data-integrity.json', baseline_2025)
save('round76-integrity.json', round76)
save('summary.json', summary)
(E / 'round1-fix-changes.json').write_text(json.dumps(changes, ensure_ascii=False, indent=2) + '\n')
print(json.dumps(summary, ensure_ascii=False, indent=2))
