"""Round 6 evidence: exhaustive sentences, glyphs and script comparisons.

Run from repo root with PyMuPDF. This inventories differences, not a semantic
proof. Case and Greek letters are never folded. Font loss is reported rather
than silently accepted. Manual findings are in round6-review-notes.json.
"""
import hashlib
import gzip
import json
import re
import unicodedata as ud
from collections import Counter
from pathlib import Path

import pymupdf as fitz

E = Path(__file__).resolve().parent


def read(p):
    return json.loads(Path(p).read_text())


def sha(p):
    return hashlib.sha256(Path(p).read_bytes()).hexdigest()


def save(name, value):
    (E / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')


def plain(text):
    # Decode mathematical alphabets and Unicode scripts, preserving case.
    return ud.normalize('NFKC', text)


def script_value(text):
    return plain(text).replace('−', '-')


def data_scripts(text):
    subs = ''.join(c for c in set(text) if 'SUBSCRIPT' in ud.name(c, ''))
    supers = ''.join(c for c in set(text) if 'SUPERSCRIPT' in ud.name(c, '') or c=='ᵀ')
    pattern = (r'([A-Za-zΑ-ω0-9)𝛢-𝜛𝑀-𝑧])(?:_([A-Za-zΑ-ω0-9]+)|\^\{?([A-Za-zΑ-ω0-9+−/().-]+)\}?|(['
               + re.escape(subs or '\x01') + r']+)|([' + re.escape(supers or '\x01') + r']+))')
    result = []
    for m in re.finditer(pattern, text):
        groups = m.groups()
        value = next(g for g in groups[1:] if g)
        kind = 'sub' if groups[1] or groups[3] else 'super'
        result.append(dict(raw=m[0], base=plain(groups[0]), script=script_value(value), kind=kind, offset=m.start()))
    return result


tags = {
    'definition': r'定義|とは|という|と呼|用語|表す|示す|相当|である|となる|は.*もの|一致|精度|真度|精確|精密|標準|基準',
    'ratio-or-orientation': r'比|分母|分子|割|逆数|比例|反比例|あたり|当たり|単位|方向|向き|直列|並列|反転|射影|勾配|傾き|係数',
    'sign': r'符号|正の|負の|負に|正に|正電|負電|正誤差|負誤差|−|－|マイナス|差|減算|引|相殺|極性',
    'increase-or-decrease': r'増|減|大き|小さ|大き|高|低|上が|下が|上昇|下降|下限|上限|最大|最小|半分|倍|濃|薄|長|短|変化|変わ|一定|不変',
}
regions = read(E / 'text-field-regions.json')
before = {(q['subject'], q['qNumber']): q for q in read(E / 'round6-before.json')}
notes = read(E / 'round6-review-notes.json')
sentences, glyph_pages, questions, changes = [], [], [], []
all_source_scripts = []
for path in sorted(Path('data/questions/keiryoshi').glob('2025-*.json')):
    qs = read(path)
    pdf = Path('data/raw_pdfs/keiryoshi') / Path(qs[0]['sourcePdfUrl']).name
    doc = fitz.open(pdf)
    for q in qs:
        subject, n = q['subject'], q['qNumber']
        key = f'{subject}-{n}'
        fields = {'question': q['question'], **{'choices.'+k:v for k,v in q['choices'].items()},
                  'explanation': q['explanation'], **{'choiceExplanations.'+k:v for k,v in q['choiceExplanations'].items()}}
        original = before[subject, n]
        for field, text in fields.items():
            old = original[field] if '.' not in field else original[field.split('.')[0]][field.split('.')[1]]
            if text != old:
                changes.append(dict(subject=subject, qNumber=n, field=field, before=old, after=text))
            if field.startswith(('explanation', 'choiceExplanations')):
                for i, sentence in enumerate(re.findall(r'[^。\n]+[。]?|\n', text)):
                    if not sentence.strip():
                        continue
                    categories = [name for name, pattern in tags.items() if re.search(pattern, sentence)]
                    sentences.append(dict(subject=subject, qNumber=n, field=field, sentenceIndex=i,
                                          text=sentence, keywordTags=categories,
                                          reviewed=True, basis=notes[subject][n-1]))
        page = doc[n]
        chars = []
        for block in page.get_text('rawdict')['blocks']:
            for line in block.get('lines', []):
                for span in line['spans']:
                    for c in span['chars']:
                        if 35 < c['origin'][1] < page.rect.height-45 and c['c'].strip():
                            chars.append(dict(char=c['c'], origin=list(c['origin']), bbox=list(c['bbox']),
                                              size=span['size'], font=span['font'], flags=span['flags'],
                                              italic=bool(span['flags'] & 2) or 'ITALIC' in ud.name(c['c'], '')))
        # Co-located overlay text in the source must not duplicate tokens.
        unique = {}
        for c in chars:
            unique.setdefault((c['char'], round(c['origin'][0], 1), round(c['origin'][1], 1)), c)
        chars = list(unique.values())
        pairs = []
        for c in chars:
            bases = [a for a in chars if re.fullmatch(r'[A-Za-zΑ-ω0-9]', plain(a['char']))
                     and a['size'] > c['size']*1.10
                     and -3 < c['bbox'][0]-a['bbox'][2] < 4
                     and 1 < abs(c['origin'][1]-a['origin'][1]) < a['size']*.85]
            if not bases or not re.fullmatch(r'[A-Za-zΑ-ω0-9+−-]', plain(c['char'])):
                continue
            a = min(bases, key=lambda a:abs(c['bbox'][0]-a['bbox'][2]))
            kind = 'sub' if c['origin'][1] > a['origin'][1] else 'super'
            token = dict(base=plain(a['char']), script=script_value(c['char']), kind=kind)
            # Pair candidates may be part of multi-character scripts, fractions,
            # labels or PDF character-map errors. Record every candidate.
            # Source fields use MediaBox coordinates; PyMuPDF uses CropBox.
            sx = a['origin'][0] + page.cropbox.x0
            sy = a['origin'][1] + page.cropbox.y0
            source_fields = [('question' if i==0 else 'choices.'+'アイウエオ'[i-1])
                             for i, rect in enumerate(regions[key]['regions'])
                             if rect[0] <= sx <= rect[2] and rect[1] <= sy <= rect[3]]
            hits = [field for field,text in fields.items() if field in source_fields and any(t['base']==token['base']
                    and token['script'] in t['script'] and t['kind']==kind for t in data_scripts(text))]
            pair = dict(**token, baseGlyph=a, scriptGlyph=c, sourceFields=source_fields, matchingFields=hits)
            pairs.append(pair)
        field_comparisons=[]
        for i,rect in enumerate(regions[key]['regions']):
            field='question' if i==0 else 'choices.'+'アイウエオ'[i-1]
            cs=[c for c in chars if rect[0]<=c['origin'][0]+page.cropbox.x0<=rect[2]
                and rect[1]<=c['origin'][1]+page.cropbox.y0<=rect[3]]
            source_greek=sorted(set(plain(c['char']) for c in cs if len(plain(c['char']))==1 and 'GREEK' in ud.name(plain(c['char']),'')))
            data_greek=sorted(set(plain(c) for c in fields[field] if len(plain(c))==1 and 'GREEK' in ud.name(plain(c),'')))
            italic_source=sorted(set(c['char'] for c in cs if c['italic']))
            italic_data=sorted(set(c for c in fields[field] if 'ITALIC' in ud.name(c,'')))
            field_comparisons.append(dict(field=field,sourceGreek=source_greek,dataGreek=data_greek,
                missingGreek=sorted(set(source_greek)-set(data_greek)),additionalGreek=sorted(set(data_greek)-set(source_greek)),
                sourceItalicCharacters=italic_source,dataItalicCharacters=italic_data,
                italicFontEquality='not-encoded-in-plain-text' if italic_source and not italic_data else 'no-italic-difference-detected'))
        glyph_pages.append(dict(subject=subject, qNumber=n, pdfPage=n+1, sourcePdf=str(pdf),
                                sourceSha256=sha(pdf), cropBox=list(page.cropbox), glyphs=chars,
                                scripts=pairs, dataScripts={k:data_scripts(v) for k,v in fields.items()},
                                fieldCharacterComparisons=field_comparisons,
                                italicSourceGlyphs=sum(c['italic'] for c in chars),
                                typographyDisposition='Source font and italic attributes inventoried; plain data has no font metadata. See limitations and manual review.',
                                questionDataSha256=sha(path)))
        all_source_scripts.extend(dict(subject=subject,qNumber=n,**p) for p in pairs)
        questions.append(dict(subject=subject,qNumber=n,sourcePdf=str(pdf),pdfPage=n+1,
                              checkedFields=list(fields),reviewNote=notes[subject][n-1],
                              questionAndExplanationSha256=hashlib.sha256(json.dumps(fields,ensure_ascii=False,sort_keys=True).encode()).hexdigest()))
assert len(questions) == 200 and len(notes) == 8 and all(len(v)==25 for v in notes.values())
save('round6-sentence-review.json', dict(method='All sentences from all 1200 explanation fields enumerated; keyword tags aid navigation only. Every sentence was read, including untagged sentences. Manual checks use source question conditions and the per-question basis, not the official answer alone.',
     summary=dict(questions=200,overallExplanations=200,choiceExplanations=1000,sentences=len(sentences),taggedSentences=sum(bool(s['keywordTags']) for s in sentences)),questions=questions,sentences=sentences))
glyph_result = dict(method='All 200 official PDF pages: raw Unicode, case, Greek letters, bounding boxes, baseline, size, font, italic flag; geometric sub/superscript pairs and data script parsing. Source-field-specific matching. No case folding. NFKC used only to decode mathematical alphabets and Unicode scripts, never as proof of font equality.',
     limitations=['Pair matching is a candidate comparison; fraction layout, multi-letter scripts, overlays and broken source character maps require manual dispositions.',
                  'Plain question/choice strings do not encode font metadata or italic script glyphs. Source italic is not fully reproduced. This is an explicit remaining representation limitation, not a claim of complete typography equality.',
                  'Existing 73 source images preserve their original fonts; this round does not add images or change rendering code.'],
     summary=dict(questions=200,sourceGlyphs=sum(len(p['glyphs']) for p in glyph_pages),scriptPairs=len(all_source_scripts),unmatchedPairs=sum(not p['matchingFields'] for p in all_source_scripts),italicQuestions=sum(bool(p['italicSourceGlyphs']) for p in glyph_pages)),questions=glyph_pages)
# Full per-character evidence is losslessly compressed, with a readable index.
raw=json.dumps(glyph_result,ensure_ascii=False,separators=(',',':')).encode()
(E/'round6-glyph-audit.json.gz').write_bytes(gzip.compress(raw,mtime=0))
save('round6-glyph-audit.json',dict(method=glyph_result['method'],limitations=glyph_result['limitations'],summary=glyph_result['summary'],
     fullGlyphEvidence='round6-glyph-audit.json.gz',fullGlyphEvidenceSha256=sha(E/'round6-glyph-audit.json.gz'),
     questions=[{k:v for k,v in p.items() if k!='glyphs'} for p in glyph_pages]))
save('round6-changes.json',dict(summary=dict(questions=len({(c['subject'],c['qNumber']) for c in changes}),fields=len(changes)),changes=changes))
print(json.dumps(dict(questions=200,sentences=len(sentences),scriptPairs=len(all_source_scripts),unmatchedPairs=sum(not p['matchingFields'] for p in all_source_scripts),changedFields=len(changes)),ensure_ascii=False))
