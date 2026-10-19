#!/usr/bin/env python3
"""Mechanical checks for source-a.json. Usage: python3 -I verify-source-a.py <source-a.json> <q.txt (pdftotext -layout)> <a.txt>"""
import json,re,sys,math
j=json.load(open(sys.argv[1],encoding='utf-8'));qt=open(sys.argv[2],encoding='utf-8').read();at=open(sys.argv[3],encoding='utf-8').read()
fails=[];CIR='①②③④⑤⑥⑦⑧'
def chk(c,m):
    if not c: fails.append(m)
# 1 hashes
chk(all(j['sources']['expectedSha256Match'].values()),'pdf sha256 mismatch')
# 2 counts: blank markers in stem vs blanks
exp={54:6,55:2,56:5,57:8,58:1,59:6,60:7}
for q in j['questions']:
    n=q['qNumber'];bl=q['blanks']
    chk(len(bl)==exp[n],f'q{n} blank count {len(bl)}!={exp[n]}')
    chk([b['n'] for b in bl]==list(range(1,exp[n]+1)),f'q{n} blank numbering')
    if q['type']=='fill-in-blanks' and n!=57:
        found=sorted({CIR.index(c)+1 for c in re.findall('[①-⑧]',q['stem'])})
        chk(found==list(range(1,exp[n]+1)),f'q{n} stem blank markers {found}')
    chk(q['choices'] is None,f'q{n} must have no choices')
    # 3 official answer raw: every official value appears in answer text order (spaces/fullwidth normalised)
    norm=lambda s:re.sub(r'\s+','',s).translate(str.maketrans('０１２３４５６７８９','0123456789'))
    raw=norm(q['officialAnswerRaw'])
    for b in bl:
        v=norm(b['official'])
        chk(v in raw,f'q{n} blank{b["n"]} official {v} not in raw')
# 4 raw answer lines really present in official answer text
A=re.sub(r'\s+','',at).translate(str.maketrans('０１２３４５６７８９','0123456789'))
for q in j['questions']:
    for b in q['blanks']:
        v=re.sub(r'\s+','',b['official']).translate(str.maketrans('０１２３４５６７８９','0123456789'))
        chk(v in A,f'q{q["qNumber"]} {v} not in official answer pdf text')
# 5 numeric recomputation
X=dict(assets=295000,net=235000,nci=9000,sales=220000,ni=18000,div=6000,ebit=25000,ri=400,rd=900)
Y=dict(ni=12200,div=4000,ebit=15000,ri=500,rd=500,int=500,bond=100)
eq=X['net']-X['nci']
calc={}
calc['54-1']=round(X['ni']/eq*100+1e-9,2);calc['54-2']=round(X['ni']/X['sales']*100+1e-9,2)
calc['54-3']=round(X['sales']/X['assets']+1e-9,2);calc['54-4']=round(X['assets']/eq+1e-9,2);calc['54-5']=round(Y['div']/Y['ni']*100+1e-9,2)
calc['55-1']=round((X['ebit']+X['ri']+X['rd'])/X['assets']*100+1e-9,2);calc['55-2']=round((Y['ebit']+Y['ri']+Y['rd'])/(Y['int']+Y['bond'])+1e-9,2)
p=[.5,.4,.1];S=[4,6,9.5];T=[8.8,7.6,3.1]
mean=lambda r:sum(a*b for a,b in zip(p,r))
sd=lambda r:math.sqrt(sum(a*(b-mean(r))**2 for a,b in zip(p,r)))
calc['56-1']=round(mean(S)+1e-9,2);calc['56-2']=round(sd(S)+1e-9,2)
w=(7-mean(T))/(mean(S)-mean(T));calc['56-3']=round(w*100+1e-9,2)
mix=[w*s+(1-w)*t for s,t in zip(S,T)];calc['56-4']=round(sd(mix)+1e-9,2)
# q57
ben=16756640;add=[4600000,1500000,4200000];sub=[400000,840000,80000,9400000];tax=163360
calc['57-8']=ben+sum(add)-sum(sub)+tax
calc['57-5']=int(400000*0.2);calc['57-7']=100000+2100+60000+1260
calc['58']=int((8000000*.15+(16500000-8000000)*.232-250000-163360)//100*100)
for k,v in calc.items():
    n,i=(k.split('-')+['1'])[:2]
    q=next(x for x in j['questions'] if x['qNumber']==int(n))
    off=float(q['blanks'][int(i)-1]['official'].replace(',',''))
    chk(abs(off-v)<1e-9,f'recompute {k}: official {off} vs computed {v}')
print('recomputed:',calc)
# scope guard
chk(sorted(q['qNumber'] for q in j['questions'])==[54,55,56,57,58,59,60],'question set')
chk(j['status']=='UNREVIEWED_SOURCE_PACKET','status')
print('FAILS:',fails if fails else 'none');sys.exit(1 if fails else 0)
