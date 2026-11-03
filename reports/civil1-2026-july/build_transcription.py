import json,re
seg=json.load(open("segments.json",encoding="utf-8"))
ov=json.load(open("overrides.json",encoding="utf-8"))
ext=json.load(open("extract.json",encoding="utf-8"))
def norm(s):
    s=re.sub(r"^【No\.\s*\d+】\s*","",s)
    s=s.replace(" "," ").replace("　"," ")
    s=re.sub(r"\s+"," ",s).strip()
    return s
def section(part,n):
    if part=="A":
        return "土木一般（必須）" if n<=5 else "土木一般（選択）" if n<=20 else "専門土木（選択）" if n<=54 else "法規（選択）"
    return "共通工学・施工管理法（必須）" if n<=20 else "施工管理法・応用能力（必須）"
out=[]
for r in seg["records"]:
    key=f"{r['part']}{r['number']}"
    o=ov.get(key,{})
    q=o.get("question") or norm(r["stem"])
    ch=[norm(c) for c in r["choices"]]
    if "choices" in o:
        ch=[o["choices"][i] if o["choices"][i] is not None else ch[i] for i in range(4)]
    assert q and len(ch)==4 and all(ch),key
    out.append({"paper":r["part"],"number":r["number"],"pdfPage":r["pdfPage"],"category":section(r["part"],r["number"]),
                "officialAnswerNumber":r["answer"],"question":q,"choices":ch,"hasFigure":bool(o.get("figure")),
                "visualDescription":o.get("visual"),"visuallyOverridden":bool(o)})
json.dump({"questionAPdf":{"url":"https://www.jctc.jp/wjctcp/wp-content/uploads/2026/07/20260706d_mondaia.pdf","sha256":ext["A"]["sha256"]},
           "questionBPdf":{"url":"https://www.jctc.jp/wjctcp/wp-content/uploads/2026/07/20260706d_mondaib.pdf","sha256":ext["B"]["sha256"]},
           "answerPdf":{"url":"https://www.jctc.jp/wjctcp/wp-content/uploads/2026/07/20260706d_seitou.pdf","sha256":"aebeaf4a0fbb5f758afa9952d128b35a961119ea5dafb44923e1ec78187c6e46"},
           "records":out},open("source-transcription.json","w",encoding="utf-8"),ensure_ascii=False,indent=1)
print(len(out),sum(r["hasFigure"] for r in out))
# residual suspicious stems
for r in out:
    if re.search(r"の の|ののイ|イ ロ ハ ニ|ρ[^tdsv]|\bm \b",r["question"]): print("CHECK",r["paper"],r["number"],r["question"][:120])
