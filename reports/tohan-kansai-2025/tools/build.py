import json,re,fitz
qs=json.load(open('r7-parsed.json',encoding='utf-8'))
# answers
t=fitz.open('R7touhan_kaitou.pdf')[0].get_text()
toks=[l.strip() for l in t.split('\n') if l.strip()]
ans={};pend=[]
Z='０１２３４５６７８９'
def z2i(s): return int(''.join(str(Z.index(c)) if c in Z else c for c in s))
for tk in toks:
    m=re.fullmatch(r'問([０-９0-9]+)',tk)
    if m: pend.append(z2i(m.group(1))); continue
    if re.fullmatch(r'[1-5１-５]',tk) and pend:
        ans[pend.pop(0)]=z2i(tk)
assert len(ans)==120 and not pend, (len(ans),pend)
def join_text(rows):
    paras=[];
    for x,t in rows:
        t=t.strip()
        if x in (85,97) and paras and paras[-1][0]=='p': paras[-1][1]+=t
        elif x==109: paras.append(['p',t])
        elif x in(85,97): paras.append(['p',t])
        else: paras.append(['t',t])
    out=[]
    for k,t in paras:
        if k=='t':
            t=re.sub(r'\s*　\s*',' 　',t); t=re.sub(r'[ 　]+',' ',t).strip()
            out.append(t)
        else: out.append(t)
    return '\n'.join(out)
res=[]
for q in qs:
    stem=join_text(q['stemRows'])
    if q['n']==17:
        # table rows ａ　訴訟　措置
        lines=stem.split('\n'); stem2=[]
        for l in lines:
            m=re.match(r'^([ａ-ｄ]) (.+?) (.+)$',l)
            if m: stem2.append(f'{m.group(1)} {m.group(2)} ― {m.group(3)}')
            elif l.startswith('薬害の訴訟 '): stem2.append('（薬害の訴訟 ― その対応として講じられた措置）')
            else: stem2.append(l)
        stem='\n'.join(stem2)
    stmts='\n'.join(f'{l} {s}' for l,s in q['statements'])
    extra=join_text(q['extra']) if q['extra'] else ''
    text=stem+('\n\n'+stmts if stmts else '')+('\n\n'+extra if extra else '')
    res.append({'number':q['n'],'section':q['section'],'pdfPart':'前半' if 'zenn' in q['file'] else '後半','pdfPages':q['pages'],
        'question':text,'statements':{l:s for l,s in q['statements']},'choices':q['choices'],'officialAnswerNumber':ans[q['n']]})
json.dump(res,open('r7-questions.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
with open('r7-review.txt','w',encoding='utf-8') as f:
    for r in res:
        f.write(f"==== 問{r['number']} [{r['section']}] {r['pdfPart']} p{r['pdfPages']} 正答={r['officialAnswerNumber']}\n{r['question']}\n")
        for i,c in enumerate(r['choices']): f.write(f"  {i+1} {c}{'  ◀' if i+1==r['officialAnswerNumber'] else ''}\n")
print(len(res)); import collections; print(collections.Counter(r['section'] for r in res))
