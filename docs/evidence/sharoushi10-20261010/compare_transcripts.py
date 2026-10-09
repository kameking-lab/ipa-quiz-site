"""Compare two frozen independent transcriptions against each other and the source manifest."""
import json, sys, unicodedata, difflib
a_path, b_path, manifest_path = sys.argv[1:4]
A = json.load(open(a_path)); B = json.load(open(b_path)); M = json.load(open(manifest_path))
norm = lambda s: unicodedata.normalize('NFKC', s).replace(' ', '')
key = lambda q: (q['year'], q['questionNumber'])
exp = {(s['year'], q['questionNumber']): (s['sittingNumber'], q['selectionIntent'], q['officialAnswer']) for s in M['sittings'] for q in s['questions']}
ia = {key(q): q for q in A['questions']}; ib = {key(q): q for q in B['questions']}
problems = []; exact = 0; normalized_only = 0
for k in sorted(exp):
    for label, src in (('A', ia), ('B', ib)):
        q = src.get(k)
        if not q: problems.append(f'{label} missing {k}'); continue
        if sorted(q['choices']) != list('ABCDE') or any(not v.strip() for v in q['choices'].values()): problems.append(f'{label} {k} choices incomplete')
        if (q['sittingNumber'], q['selectionIntent'], q['officialAnswer']) != exp[k]: problems.append(f'{label} {k} meta {q["sittingNumber"], q["selectionIntent"], q["officialAnswer"]} != manifest {exp[k]}')
    qa, qb = ia.get(k), ib.get(k)
    if not (qa and qb): continue
    for f in ['stem'] + [f'choice {c}' for c in 'ABCDE']:
        ta = qa['stem'] if f == 'stem' else qa['choices'][f[-1]]
        tb = qb['stem'] if f == 'stem' else qb['choices'][f[-1]]
        if ta == tb: exact += 1
        elif norm(ta) == norm(tb): normalized_only += 1
        else:
            d = [x for x in difflib.ndiff([norm(ta)], [norm(tb)]) if x[0] in '?+-']
            problems.append(f'TEXT {k} {f}:\n  A={norm(ta)}\n  B={norm(tb)}')
print(json.dumps({'questions': len(exp), 'fields': len(exp) * 6, 'choices': sum(len(ib[k]['choices']) for k in ib),
                  'exactMatch': exact, 'matchAfterNFKC': normalized_only, 'problems': problems}, ensure_ascii=False, indent=1))
sys.exit(1 if problems else 0)
