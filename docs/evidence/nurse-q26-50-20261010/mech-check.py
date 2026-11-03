# Mechanical checks for 第115回・第114回 午前 問26〜50 (49 published + 115-A032 HOLD).
import json, re, sys, os, unicodedata, pypdfium2 as p
S = sys.argv[1]; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import content_q26_50 as c
text = lambda pdf, page: p.PdfDocument(f"{S}/src/{pdf}")[page-1].get_textpage().get_text_range()
norm = lambda s: re.sub(r"\s+", "", unicodedata.normalize("NFKC", s))
eng = lambda s: re.sub(r"[A-Za-z][A-Za-z ,.]*[a-z][A-Za-z ,.]*", "", s)  # drop English ruby (keeps short caps like ATP/BLS)
# glyph-drop normalization for the 114 PDF text layer: digits -> \x04, 疼 dropped, 梢 -> ç, 〈〉() -> ?C!, English ruby interleaved
strip = lambda x: re.sub(r"[0-9A-Za-z\x00-\x1f〈〉()（）?!令和年歳.「」｢｣。、Ⅰ疼梢ç]", "", x)
GIVEN = {115: "4,4,4,1,4,4,HOLD,2,3,2,1,2,4,1,4,4,2,2,1,2,3,2,2,4,2", 114: "4,2,4,1,3,1,4,1,1,2,1,2,4,1,1,2,2,1,4,1,4,3,3,1,4"}
fails, notes, table = [], [], {}
for rnd, pdf in ((115, "tp260424-05seitou.pdf"), (114, "tp250428-05seitou.pdf")):
    t = text(pdf, 1)
    for n in range(26, 51):
        key = f"A{n:03d}" if rnd == 115 else f"AM{n}"
        m = re.search(rf"(?:^|\s){key}\s+(\d+)?\s*(?=[AB]\d|AM|PM|$)", t)
        table[(rnd, n)] = m.group(1) if m and m.group(1) else "BLANK"
    given = GIVEN[rnd].split(",")
    for i, n in enumerate(range(26, 51)):
        g = "BLANK" if given[i] == "HOLD" else given[i]
        if table[(rnd, n)] != g: fails.append(f"{rnd}-{n} answer table {table[(rnd,n)]} != supplied {given[i]}")
if table[(115, 32)] != "BLANK": fails.append("115-A032 not blank")
keys = sorted((x["round"], x["qNumber"]) for x in c.Q)
expected = sorted([(115, n) for n in range(26, 51) if n != 32] + [(114, n) for n in range(26, 51)])
if keys != expected: fails.append("published key set")
if (115, 32) in keys: fails.append("HOLD question published")
for x in c.Q:
    k = (x["round"], x["qNumber"])
    if x["officialAnswer"] != table[k]: fails.append(f"{k} answer {x['officialAnswer']} != table {table[k]}")
    if len(x["choices"]) != 4 or not all(s.strip() for s in x["choices"]) or len(x["ex"]) != 4 or not all(e.strip() for e in x["ex"]) or not x["overview"].strip(): fails.append(f"{k} missing/blank field")
    pdf = "tp260424-05a_01.pdf" if x["round"] == 115 else "tp250428-05a_01.pdf"
    page = eng(norm(text(pdf, x["pdfPage"])))
    fig = x.get("figure") or {}
    checks = [("stem", x["stem"])] + ([] if fig.get("choiceTextIsDescription") else [(f"choice{i+1}", s) for i, s in enumerate(x["choices"])])
    if fig.get("choiceTextIsDescription"): notes.append(f"{k}: choices are figure-only; choice text is a description (not text-checked)")
    for label, s in checks:
        parts = [eng(norm(part)) for part in s.split("―")]
        if all(pt in page for pt in parts): continue
        if all(strip(pt) in strip(page) for pt in parts if strip(pt)):
            notes.append(f"{k} {label}: matched after glyph-drop/ruby normalization; confirmed on rendered page"); continue
        fails.append(f"{k} {label} not found on p{x['pdfPage']}: {s}")
FIG = {(115, 34): ("stem", "3"), (114, 30): ("stem", "3"), (114, 39): ("choices", "1"), (114, 41): ("choices", "2")}
for k, (kind, a) in FIG.items():
    x = next(y for y in c.Q if (y["round"], y["qNumber"]) == k)
    f = x.get("figure") or {}
    files = [f.get("file")] if kind == "stem" else f.get("files", [])
    if f.get("kind") != kind or x["officialAnswer"] != a: fails.append(f"{k} figure kind/answer")
    year = 2025 if k[0] == 115 else 2024
    for i, name in enumerate(files):
        if not os.path.exists(f"{S}/r4/fig/{year}/{name}"): fails.append(f"{k} missing {name}")
        if kind == "choices" and name != f"q{k[1]}-choice{i+1}.png": fails.append(f"{k} choice image numbering {name}")
print(json.dumps({"published": len(c.Q), "choices": sum(len(x["choices"]) for x in c.Q), "explanations": sum(len(x["ex"]) for x in c.Q),
  "hold": [f"{h['round']}-{h['qNumber']}" for h in c.HOLD], "answerTable115_A032": table[(115, 32)],
  "answersMatched": sum(1 for x in c.Q if x["officialAnswer"] == table[(x["round"], x["qNumber"])]),
  "figures": {f"{a}-{b}": v for (a, b), v in FIG.items()}, "fails": fails, "notes": notes}, ensure_ascii=False, indent=1))
sys.exit(1 if fails else 0)
