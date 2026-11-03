import json,re,sys,glob
KEYS=['ア','イ','ウ','エ','オ']
qs={q['number']:q for q in json.load(open('r7-questions.json',encoding='utf-8'))}
ex={}
for f in sorted(glob.glob('expl-batch-*.json')):
    for e in json.load(open(f,encoding='utf-8')): ex[e['number']]=e
LET='ａｂｃｄｅ'
def parse_choice(q,c):
    if q['kind']=='tf': return dict(re.findall(r'([ａ-ｅ])([正誤])',c))
    if q['kind']=='pick': return set(re.findall(r'[ａ-ｅ]',c))
    if q['kind']=='fill': return {m.group(1):m.group(2) for m in re.finditer(r'([ａ-ｅ])：(.+?)(?=　[ａ-ｅ]：|$)',c)}
def clean(s): return s.strip().rstrip('。')+'。'
errors=[]
out=[]
for n in range(1,121):
    q=qs[n]; e=ex.get(n)
    if not e: errors.append(f'{n}: no explanation'); continue
    items=e['items']; kind=q['kind']; ans=q['officialAnswerNumber']
    ce=[]; implied=[]
    stem=q['question'].split('\n')[0]
    posword=('正しい','誤り') if ('正しいもの' in stem or kind=='tf') else ('当てはまる','当てはまらない')
    if kind=='tf':
        truth={k:v['verdict'] for k,v in items.items()}
        for i,c in enumerate(q['choices']):
            cc=parse_choice(q,c)
            if set(cc)!=set(truth): errors.append(f'{n}: letters {set(cc)} vs {set(truth)}')
            mism=[k for k in cc if cc[k]!=truth.get(k)]
            if not mism:
                implied.append(i+1)
                wrong=[k for k in sorted(truth) if truth[k]=='誤']
                s='正しい組合せ。'+'・'.join(f'{k}{truth[k]}' for k in sorted(truth))+'の判定がすべて一致する。'
                if wrong: s+=''.join(f'{k}は誤り：{clean(items[k]["reason"])}' for k in wrong)
                else: s+='すべての記述が正しい。'
            else:
                s='誤った組合せ。'+''.join(
                    (f'{k}を「正」としているが、{k}は誤り：{clean(items[k]["reason"])}' if cc[k]=='正' else f'{k}を「誤」としているが、{k}は正しい：{clean(items[k]["reason"])}')
                    for k in sorted(mism))
            ce.append(s)
    elif kind=='pick':
        truth={k:v['verdict'] for k,v in items.items()}
        pos={k for k,v in truth.items() if v=='正'}
        for i,c in enumerate(q['choices']):
            cc=parse_choice(q,c)
            if cc==pos:
                implied.append(i+1)
                s=f'正しい組合せ。'+''.join(f'{k}は{posword[0]}：{clean(items[k]["reason"])}' for k in sorted(cc))
            else:
                bad=sorted(k for k in cc if truth.get(k)!='正'); miss=sorted(pos-cc)
                s='誤った組合せ。'+''.join(f'{k}は{posword[1]}：{clean(items[k]["reason"])}' for k in bad)
                if miss: s+='また、'+'・'.join(miss)+f'は{posword[0]}ものだが、この組合せに含まれていない。'
            ce.append(s)
    elif kind=='fill':
        truth={k:v['answer'] for k,v in items.items()}
        for i,c in enumerate(q['choices']):
            cc=parse_choice(q,c)
            if set(cc)!=set(truth): errors.append(f'{n}: blanks {cc} vs {truth}')
            for k in cc:
                if truth.get(k) not in [x for ch in q['choices'] for x in parse_choice(q,ch).values()]: errors.append(f'{n}: answer {k}={truth.get(k)} not among options')
            mism=[k for k in cc if cc[k]!=truth.get(k)]
            if not mism:
                implied.append(i+1)
                s='正しい組合せ。'+'、'.join(f'{k}＝「{truth[k]}」' for k in sorted(truth))+'がすべて当てはまる。'
            else:
                s='誤った組合せ。'+''.join(f'{k}を「{cc[k]}」としているが、正しくは「{truth[k]}」：{clean(items[k]["reason"])}' for k in sorted(mism))
            ce.append(s)
    else:
        for i in range(5):
            it=items[str(i+1)]
            if it['verdict']=='該当': implied.append(i+1)
            ce.append(('正解。' if it['verdict']=='該当' else '不正解。')+clean(it['reason']))
    if implied!=[ans]: errors.append(f'{n}: implied {implied} != official {ans}')
    # explanation
    lines=[f'正解は({ans})。',clean(e['summary'])]
    if kind in('tf','pick'):
        lab = {'正':'正','誤':'誤'} if posword[0]=='正しい' else {'正':'該当','誤':'非該当'}
        lines.append('\n'.join(f'- {k}（{lab[items[k]["verdict"]]}）：{clean(items[k]["reason"])}' for k in sorted(items)))
    elif kind=='fill':
        lines.append('\n'.join(f'- {k}：{items[k]["answer"]}。{clean(items[k]["reason"])}' for k in sorted(items)))
    out.append({'number':n,'pdfPart':q['pdfPart'],'pdfPage':q['pdfPages'][0],'category':q['section'],'topic':e['topic'].strip(),
        'officialAnswerNumber':ans,'question':q['question'],'choices':q['choices'],
        'explanation':'\n\n'.join(lines),'choiceExplanations':ce,'tebikiPages':e.get('tebikiPages',[])})
    if e.get('conflict'): errors.append(f"{n}: conflict {e['conflict']}")
    if e.get('transcriptionIssues'): errors.append(f"{n}: transcription {e['transcriptionIssues']}")
print('\n'.join(errors) or 'NO ERRORS'); print(len(out),'built')
json.dump(out,open('built.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
