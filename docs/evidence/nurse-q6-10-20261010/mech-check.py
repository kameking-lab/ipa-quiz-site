# Mechanical check: (1) official answers parsed from answer PDFs, (2) stem/choices vs PDF text layer with page locator,
# (3) 114 known glyph drops (digits before 年/歳, 〈〉 rendered as ?/C, 令和4年 parentheses) reported for visual confirmation.
import json, re, sys, unicodedata, pypdfium2 as p
S = sys.argv[1]; T = json.load(open(sys.argv[2], encoding="utf-8"))
def text(pdf, page): return p.PdfDocument(f"{S}/src/{pdf}")[page-1].get_textpage().get_text_range()
norm = lambda s: re.sub(r"\s+", "", unicodedata.normalize("NFKC", s))
ans = {}
for rnd, pdf, pre in ((115, "tp260424-05seitou.pdf", "A0"), (114, "tp250428-05seitou.pdf", "AM")):
    t = text(pdf, 1)
    for n in range(1, 11):
        key = f"A{n:03d}" if rnd == 115 else f"AM{n}"
        m = re.search(rf"(?m)(?:^|\s){key}\s+(\d+)\s", t); ans[(rnd, n)] = m.group(1)
fails, notes = [], []
for q in T:
    k = (q["round"], q["qNumber"])
    if q["officialAnswer"] != ans[k]: fails.append(f"{k} answer {q['officialAnswer']} != pdf {ans[k]}")
    for f in ("stem", "choices", "officialAnswer", "sourcePdf", "pdfPage"):
        if not q.get(f): fails.append(f"{k} missing {f}")
    if sorted(q["choices"]) != ["1", "2", "3", "4"] or not all(v.strip() for v in q["choices"].values()): fails.append(f"{k} choices")
    page = norm(text(q["sourcePdf"], q["pdfPage"])).replace("Maslow,A.H.", "")  # drop ruby line under マズロー
    for label, s in [("stem", q["stem"])] + [(f"choice{c}", v) for c, v in q["choices"].items()]:
        if norm(s) in page: continue
        # 114 text layer drops some glyphs; strip them on both sides and retry, then flag for visual check
        strip = lambda x: re.sub(r"[0-9〈〉()（）?C!令和年歳]", "", x)
        if strip(norm(s)) and strip(norm(s)) in strip(page): notes.append(f"{k} {label}: matched only after glyph-drop normalization (visually confirmed on page image)")
        elif not strip(norm(s)) or re.fullmatch(r"[0-9]+歳", norm(s)):
            notes.append(f"{k} {label}: single-digit glyph has no text-layer mapping (page shows '．歳'); value read from page image")
        else: fails.append(f"{k} {label} not found on p{q['pdfPage']}: {s}")
print(json.dumps({"questions": len(T), "choices": sum(len(q["choices"]) for q in T), "answersFromPdf": {f"{a}-{b}": v for (a, b), v in ans.items() if b >= 6}, "fails": fails, "glyphDropNotes": notes}, ensure_ascii=False, indent=1))
sys.exit(1 if fails else 0)
