import fitz,hashlib,json
clips={"A1":(2,178,157,460,332),"A2":(3,205,95,440,312),"A3":(4,212,138,452,246),"A4":(5,132,138,521,318),"A5":(6,260,157,396,283),
"A39":(19,223,95,427,280),"B3":(3,40,96,545,676),"B6":(5,120,95,452,218),"B7":(5,123,467,533,568),"B32":(18,138,135,515,386)}
docs={"A":fitz.open("../20260706d_mondaia.pdf"),"B":fitz.open("../20260706d_mondaib.pdf")}
led={}
for k,(pg,x0,y0,x1,y1) in clips.items():
    p=docs[k[0]][pg-1]; r=fitz.Rect(x0,y0,x1,y1)
    pix=p.get_pixmap(matrix=fitz.Matrix(3,3),clip=r)
    fn=f"fig/{k.lower()}-official-figure.png"; pix.save(fn)
    led[k]={"pdfPage":pg,"clip":[x0,y0,x1,y1],"zoom":3,"file":fn,"sha256":hashlib.sha256(open(fn,"rb").read()).hexdigest(),"size":[pix.width,pix.height]}
json.dump(led,open("figures-ledger.json","w"),indent=1); print(json.dumps(led)[:400])
