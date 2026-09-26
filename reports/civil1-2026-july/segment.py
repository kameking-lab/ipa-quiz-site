import json,re
src=json.load(open("extract.json",encoding="utf-8"))
ans_text=None
import fitz
t=fitz.open(r"C:\Users\kanet\AppData\Local\Temp\claude\civil1\20260706d_seitou.pdf")[0].get_text()
nums=[int(x) for x in re.findall(r"^\s*(\d+)\s*$",t,flags=re.M)]
# first block: A answers. Parse sequence: groups of numbers then answers
seq=nums
# Build from known layout: A rows 1-22,23-44,45-66 then B rows 1-22,23-35 (each: numbers then answers)
def take(seq,i,n0,n1):
    nums=seq[i:i+(n1-n0+1)]; assert nums==list(range(n0,n1+1)),(n0,nums)
    ans=seq[i+len(nums):i+2*len(nums)]; return i+2*len(nums),dict(zip(nums,ans))
i=0;A={};B={}
for a,b in [(1,22),(23,44),(45,66)]:
    i,d=take(seq,i,a,b);A.update(d)
for a,b in [(1,22),(23,35)]:
    i,d=take(seq,i,a,b);B.update(d)
assert all(1<=v<=4 for v in list(A.values())+list(B.values()))
def clean(s): return re.sub(r"\s+"," ",s).strip()
recs=[]
for part,key in [("A",A),("B",B)]:
    for pg in src[part]["pages"]:
        lines=[l["text"] for l in pg["lines"] if not re.fullmatch(r"\s*―\s*\d+\s*―\s*",l["text"])]
        heads=[(k,int(m.group(1))) for k,l in enumerate(lines) for m in [re.search(r"【No\.\s*(\d+)】",l)] if m]
        for j,(st,n) in enumerate(heads):
            seg=lines[st:heads[j+1][0] if j+1<len(heads) else len(lines)]
            stem=[];ch=[[],[],[],[]];cur=None
            for l in seg:
                m=re.match(r"^\s*([⑴⑵⑶⑷])\s*(.*)$",l)
                if m: cur="⑴⑵⑶⑷".index(m.group(1)); ch[cur].append(m.group(2)); continue
                if cur is None: stem.append(l)
                else: ch[cur].append(l)
            recs.append({"part":part,"number":n,"pdfPage":pg["pageIndex"]+1,"answer":key[n],"stem":clean("".join(stem)),"choices":[clean("".join(c)) for c in ch],"rawLines":seg})
for part,cnt in [("A",66),("B",35)]:
    assert [r["number"] for r in recs if r["part"]==part]==list(range(1,cnt+1))
json.dump({"answersA":A,"answersB":B,"records":recs},open("segments.json","w",encoding="utf-8"),ensure_ascii=False,indent=1)
print("A",A);print("B",B)
print("incomplete",[(r["part"],r["number"]) for r in recs if not all(r["choices"])])
