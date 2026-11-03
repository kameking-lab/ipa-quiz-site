import json,re
src=json.load(open("source-transcription.json",encoding="utf-8"))
figs=json.load(open("figures-ledger.json"))
groups=["a1","a2","a3","a4","a5","a6","b1","b2","b3","fix1"]
acc={};model={}
for g in groups:
    rc=json.load(open(f"opus-{g}-receipt.json",encoding="utf-8"))
    assert rc["exitCode"]==0 and rc["correctModel"] and list(rc["modelUsage"].keys())==["claude-opus-5-5"],g
    ex=json.load(open(f"opus-{g}-explanations.json",encoding="utf-8"))
    for q in ex["questions"]:
        k=f"{q['paper']}{q['number']}"
        if q["status"]=="PASS": acc[k]=q; model[k]=g
        else: acc.pop(k,None); model[k]=g+":HOLD"
refs={"A29":["https://www.pref.tottori.lg.jp/secure/1137670/2-1-2.pdf"],"A51":["https://www.jwrc-net.or.jp/docs/publication-outreach/qa/03-79.pdf"]}
out={"A":[],"B":[]};held=[]
for r in src["records"]:
    k=f"{r['paper']}{r['number']}"
    q=acc.get(k)
    if not q: held.append(k); continue
    ce=q["choiceExplanations"]; assert len(ce)==4 and all(ce),k
    for t in ce+[q["explanation"]]:
        if re.search(r"肢\s*[1-4１-４]",t): print("WARN choice-number ref",k,t[:60])
    item={"number":r["number"],"pdfPage":r["pdfPage"],"category":r["category"],"topic":q["topic"],"officialAnswerNumber":r["officialAnswerNumber"],
          "question":r["question"],"choices":r["choices"],"explanation":q["explanation"],"choiceExplanations":ce}
    if k in figs: item["imageUrl"]=f"/questions/civil1/2026-july/{r['paper'].lower()}{r['number']}-official-figure.png"
    if k in refs: item["officialReferenceUrls"]=refs[k]
    out[r["paper"]].append(item)
meta={"A":("mondai-a",src["questionAPdf"]),"B":("mondai-b",src["questionBPdf"])}
for p in "AB":
    sess,pdf=meta[p]
    payload={"exam":"civil1","year":2026,"season":"july","session":sess,"paper":p,"publishedCount":len(out[p]),"officialQuestionCount":66 if p=="A" else 35,
             "questionUrl":pdf["url"],"questionSha256":pdf["sha256"],"answerUrl":src["answerPdf"]["url"],"answerSha256":src["answerPdf"]["sha256"],
             "questions":out[p]}
    json.dump(payload,open(f"out-2026-july-{p.lower()}.json","w",encoding="utf-8"),ensure_ascii=False,indent=2)
json.dump({"officialQuestionASha256":src["questionAPdf"]["sha256"],"officialQuestionBSha256":src["questionBPdf"]["sha256"],"officialAnswerSha256":src["answerPdf"]["sha256"],
           "accepted":sorted(acc,key=lambda k:(k[0],int(k[1:]))),"held":held,"heldReasons":{"B7":"公式正答(1)に対し、安衛法31条の注文者義務の読み方により(2)または(3)も正しいと解しうる。一次資料で公式の解釈を確認できないため、全肢解説を確定できず保留。"},
           "modelGroupByQuestion":model},open("acceptance-ledger.json","w",encoding="utf-8"),ensure_ascii=False,indent=1)
print(len(out["A"]),len(out["B"]),"held",held)
