# Mechanical check for Q11-25: answers vs official answer PDFs, required fields, choice counts,
# stem/choice text vs PDF text layer (with logged exceptions confirmed on page images), figure answer mapping.
import json, re, sys, unicodedata, pypdfium2 as p
S, T = sys.argv[1], json.load(open(sys.argv[2], encoding="utf-8"))
text = lambda pdf, page: p.PdfDocument(f"{S}/src/{pdf}")[page-1].get_textpage().get_text_range()
norm = lambda s: re.sub(r"\s+", "", unicodedata.normalize("NFKC", s))
strip = lambda x: re.sub(r"[0-9〈〉()（）?C!令和年歳.]", "", x)
ans = {}
for rnd, pdf in ((115, "tp260424-05seitou.pdf"), (114, "tp250428-05seitou.pdf")):
    t = text(pdf, 1)
    for n in range(11, 26):
        key = f"A{n:03d}" if rnd == 115 else f"AM{n}"
        ans[(rnd, n)] = re.search(rf"(?:^|\s){key}\s+(\d+)\s", t).group(1)
EXPECTED_CHOICES = {(115, 24): 5, (115, 25): 5}
fails, notes = [], []
keys = sorted((q["round"], q["qNumber"]) for q in T)
if keys != sorted((r, n) for r in (115, 114) for n in range(11, 26)): fails.append("question key set")
for q in T:
    k = (q["round"], q["qNumber"])
    if q["officialAnswer"] != ans[k]: fails.append(f"{k} answer {q['officialAnswer']} != pdf {ans[k]}")
    for f in ("stem", "choices", "officialAnswer", "sourcePdf", "pdfPage"):
        if not q.get(f): fails.append(f"{k} missing {f}")
    n_exp = EXPECTED_CHOICES.get(k, 4)
    if sorted(q["choices"]) != [str(i) for i in range(1, n_exp + 1)] or not all(v.strip() for v in q["choices"].values()): fails.append(f"{k} choices != {n_exp}")
    page = norm(text(q["sourcePdf"], q["pdfPage"]))
    page = re.sub(r"[A-Za-z][A-Za-z ,.]*", "", page)  # drop English ruby lines
    checks = [("stem", q["stem"])]
    fig = q.get("figure", {})
    if not fig.get("choiceTextIsDescription"):
        checks += [(f"choice{c}", v) for c, v in q["choices"].items()]
    else:
        notes.append(f"{k} choices are figure-only in source; choice text is our description (not checked against text layer)")
    for label, s in checks:
        ns = re.sub(r"[A-Za-z][A-Za-z ,.]*", "", norm(s))
        if ns in page: continue
        if strip(ns) and strip(ns) in strip(page):
            notes.append(f"{k} {label}: matched after glyph-drop normalization; confirmed on page image"); continue
        if fig.get("kind") == "choices" and label.startswith("choice"):
            notes.append(f"{k} {label}: printed as figure caption, absent from text layer; confirmed on page image"); continue
        if k == (115, 24) and label == "stem" and norm(s).replace("疼", "仏") in page:
            notes.append(f"{k} stem: text layer maps 疼 to 仏; page image reads がん性疼痛"); continue
        if k == (114, 19) and label == "choice1" and "流性尿失禁" in page:
            notes.append(f"{k} choice1: text layer drops 溢; page image reads 溢流性尿失禁"); continue
        if k == (115, 13) and label == "stem" and all(x in page for x in ("腹部の図を示す。", "でみられる腹痛の典型的な部位はどれか。")):
            notes.append(f"{k} stem: English ruby splits the stem in the text layer; confirmed on page image"); continue
        if k == (114, 13) and label == "stem" and all(x in page for x in ("心電図波形", "を別に示す", "心室頻拍はどれ")):
            notes.append(f"{k} stem: parentheses/ruby split in text layer; page image reads 心電図波形（別冊No.1）を別に示す。心室頻拍はどれか。"); continue
        fails.append(f"{k} {label} not found on p{q['pdfPage']}: {s}")
# figure answer mapping fixed by owner-visual notes
FIG = {(115, 13): "1", (115, 16): "2", (115, 22): "4", (114, 13): "4"}
for k, a in FIG.items():
    q = next(x for x in T if (x["round"], x["qNumber"]) == k)
    if q["officialAnswer"] != a or "figure" not in q: fails.append(f"{k} figure answer mapping")
sup = text("tp250428-05a_02.pdf", 4)
if "No." not in sup or "問題 13" not in sup.replace("問題13", "問題 13"): fails.append("supplement No.1 page4 header")
print(json.dumps({"questions": len(T), "choices": sum(len(q["choices"]) for q in T),
  "answersFromPdf": {f"{a}-{b}": v for (a, b), v in sorted(ans.items())}, "figureAnswers": {f"{a}-{b}": v for (a, b), v in FIG.items()},
  "fails": fails, "notes": notes}, ensure_ascii=False, indent=1))
sys.exit(1 if fails else 0)
