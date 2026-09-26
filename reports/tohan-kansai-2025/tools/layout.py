import fitz,sys,json
def page_lines(p):
    spans=[]
    for b in p.get_text('dict')['blocks']:
        for l in b.get('lines',[]):
            for s in l['spans']:
                if s['size']<8 or not s['text'].strip(): continue
                x0,y0,x1,y1=s['bbox']
                spans.append([ (y0+y1)/2, x0, x1, s['text'] ])
    spans.sort(key=lambda s:(s[0],s[1]))
    rows=[]
    for s in spans:
        if rows and abs(rows[-1][0]-s[0])<4: rows[-1][1].append(s)
        else: rows.append([s[0],[s]])
    out=[]
    for y,ss in rows:
        ss.sort(key=lambda s:s[1]); txt=''; px=None
        for _,x0,x1,t in ss:
            if px is not None and x0-px>8: txt+='　'
            txt+=t; px=x1
        out.append((round(y),round(ss[0][1]),txt.rstrip()))
    return out
if __name__=='__main__':
    for f in sys.argv[1:]:
        d=fitz.open(f); res=[]
        for i,p in enumerate(d):
            for y,x,t in page_lines(p): res.append({'page':i+1,'y':y,'x':x,'t':t})
        json.dump(res,open(f.replace('.pdf','.lines.json'),'w',encoding='utf-8'),ensure_ascii=False,indent=0)
        open(f.replace('.pdf','.lines.txt'),'w',encoding='utf-8').write('\n'.join(f"{r['page']:02d}|{r['x']:3d}|{r['t']}" for r in res))
