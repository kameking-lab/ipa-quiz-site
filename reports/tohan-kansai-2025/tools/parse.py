import json,re,unicodedata
Z='０１２３４５６７８９'
def z2i(s): return int(''.join(str(Z.index(c)) if c in Z else c for c in s))
LET='ａｂｃｄｅ'
def load(f):
    rows=json.load(open(f,encoding='utf-8'))
    return [r for r in rows if '♯' not in r['t'] and not re.fullmatch(r'-\s*\d+\s*-',r['t'].strip())]
def split(rows):
    qs=[];cur=None;section=None
    for r in rows:
        t=r['t'].strip()
        m=re.fullmatch(r'［(.+?)[］\]]',t)
        if m: section=m.group(1);continue
        m=re.fullmatch(r'問([０-９]+)',t)
        if m:
            cur={'n':z2i(m.group(1)),'section':section,'rows':[],'pages':[r['page']]};qs.append(cur);continue
        if cur is not None:
            cur['rows'].append(r)
            if r['page'] not in cur['pages']: cur['pages'].append(r['page'])
    return qs
def parse(q):
    rows=q['rows'];i=0;stem=[];stmts=[];choices=None;kind=None;extra=[]
    # detect table header
    def is_hdr(t): return re.fullmatch(r'[ａ-ｅ](\s*　\s*[ａ-ｅ])+',t.strip()) is not None
    def is_row(t): return re.match(r'^[１-５]\s*　',t.strip()) is not None
    tbl_idx=next((k for k,r in enumerate(rows) if is_hdr(r['t'])),None)
    inline_idx=next((k for k,r in enumerate(rows) if re.match(r'^１（',r['t'].strip())),None)
    body=rows
    if tbl_idx is not None:
        hdr=[c.strip() for c in rows[tbl_idx]['t'].split('　') if c.strip()]
        trs=[r for r in rows[tbl_idx+1:] if is_row(r['t'])][:5]
        choices=[]
        for r in trs:
            cells=[c.strip() for c in r['t'].strip().split('　') if c.strip()]
            vals=cells[1:]
            if len(vals)!=len(hdr): raise Exception(f"q{q['n']} cells {cells} hdr {hdr}")
            if all(v in('正','誤') for v in vals): choices.append('　'.join(f'{h}{v}' for h,v in zip(hdr,vals)))
            else: choices.append('　'.join(f'{h}：{v}' for h,v in zip(hdr,vals)))
        kind='table'
        after=[r for r in rows[tbl_idx+1:] if not is_row(r['t'])]
        body=rows[:tbl_idx]; extra=after
    elif inline_idx is not None:
        t=rows[inline_idx]['t']
        parts=re.findall(r'[１-５]（([ａ-ｅ、，]+)）',t)
        choices=[p.replace('，','、') for p in parts];kind='inline'
        body=rows[:inline_idx]; extra=rows[inline_idx+1:]
    else:
        kind='list'
    # body: stem + statements (+ list choices)
    cur=None;items=[];lc=[]
    stem_lines=[];stmt_lines=[]
    mode='stem'
    for r in body:
        t=r['t'].strip()
        if kind=='list' and re.match(r'^[１-５]\s',t) and r['x']<105:
            mode='choice'; lc.append(re.sub(r'^[１-５]\s*','',t)); continue
        if mode=='choice':
            lc[-1]+=t; continue
        if re.match(r'^[ａ-ｅ]\s',t) and r['x']<105 and not is_hdr(t):
            mode='stmt'; stmts.append([t[0],re.sub(r'^[ａ-ｅ]\s*','',t)]); continue
        if mode=='stmt' and r['x']>=105: stmts[-1][1]+=t; continue
        if mode=='stmt': stmts[-1][1]+=t; continue
        stem_lines.append(r)
    if kind=='list': choices=lc
    return {'n':q['n'],'section':q['section'],'pages':q['pages'],'kind':kind,'stemRows':[(r['x'],r['t']) for r in stem_lines],
            'statements':stmts,'choices':choices,'extra':[(r['x'],r['t']) for r in extra]}
out=[]
for f in ['R7tourokuhannbaisyashiken_zennhan','R7tourokuhannbaisyashiken_kouhan']:
    for q in split(load(f+'.lines.json')):
        p=parse(q);p['file']=f;out.append(p)
json.dump(out,open('r7-parsed.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
for p in out:
    flag='' if p['choices'] and len(p['choices'])==5 else '  <<<< BAD'
    print(p['n'],p['kind'],len(p['statements']),len(p['choices'] or []),'extra' if p['extra'] else '',flag)
