import fitz, json, re, hashlib, sys
from pathlib import Path
BASE=Path(r"C:\Users\kanet\AppData\Local\Temp\claude\civil1")
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def main_lines(page):
    spans=[]
    for b in page.get_text("dict")["blocks"]:
        for l in b.get("lines",[]):
            for s in l["spans"]:
                if s["size"]>=7.5 and s["text"].strip():
                    spans.append({"x":s["bbox"][0],"y":s["bbox"][1],"t":s["text"],"size":s["size"]})
    spans.sort(key=lambda s:(s["y"],s["x"]))
    groups=[]
    for s in spans:
        g=next((g for g in groups if abs(g["y"]-s["y"])<=2.5),None)
        if g is None: g={"y":s["y"],"spans":[]};groups.append(g)
        g["spans"].append(s)
    groups.sort(key=lambda g:g["y"])
    return [{"y":round(g["y"],1),"text":"".join(x["t"] for x in sorted(g["spans"],key=lambda x:x["x"]))} for g in groups]
out={}
for part,fn in [("A","20260706d_mondaia.pdf"),("B","20260706d_mondaib.pdf")]:
    p=BASE/fn; d=fitz.open(p)
    pages=[]
    for i,pg in enumerate(d):
        lines=main_lines(pg)
        heads=[int(m.group(1)) for l in lines for m in re.finditer(r"【No\.\s*(\d+)】",l["text"])]
        pages.append({"pageIndex":i,"headers":heads,"lines":lines,"images":len(pg.get_images(full=True)),"drawings":len(pg.get_drawings())})
    out[part]={"file":fn,"sha256":sha(p),"pages":pages}
    print(part,[ (p["pageIndex"]+1,p["headers"],p["images"],p["drawings"]) for p in pages])
json.dump(out,open("extract.json","w",encoding="utf-8"),ensure_ascii=False,indent=1)
