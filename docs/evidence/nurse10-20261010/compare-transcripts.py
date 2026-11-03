import json, sys, unicodedata, re
def norm(s): return re.sub(r"\s+", "", unicodedata.normalize("NFKC", s))
A = json.load(open(sys.argv[1])); B = json.load(open(sys.argv[2]))
key = lambda q: (q["round"], q["session"], q["qNumber"])
a = {key(q): q for q in A}; b = {key(q): q for q in B}
expected = {(r, "午前", n) for r in (115, 114) for n in range(1, 6)}
fails = []
if set(a) != expected: fails.append(f"A keys {sorted(set(a)^expected)}")
if set(b) != expected: fails.append(f"B keys {sorted(set(b)^expected)}")
nq = nc = 0
for k in sorted(expected):
    qa, qb = a.get(k), b.get(k)
    if not qa or not qb: continue
    nq += 1
    if norm(qa["stem"]) != norm(qb["stem"]): fails.append(f"{k} stem: A={qa['stem']} | B={qb['stem']}")
    if sorted(qa["choices"]) != ["1","2","3","4"] or sorted(qb["choices"]) != ["1","2","3","4"]: fails.append(f"{k} choice keys")
    for c in "1234":
        nc += 1
        if norm(qa["choices"].get(c,"")) != norm(qb["choices"].get(c,"")): fails.append(f"{k} choice {c}: A={qa['choices'].get(c)} | B={qb['choices'].get(c)}")
    if str(qa["officialAnswer"]) != str(qb["officialAnswer"]): fails.append(f"{k} answer A={qa['officialAnswer']} B={qb['officialAnswer']}")
    for f in ("sourcePdf", "pdfPage"):
        if qa.get(f) != qb.get(f): fails.append(f"{k} {f} A={qa.get(f)} B={qb.get(f)}")
print(f"questions compared={nq} choices compared={nc}")
print("RESULT:", "PASS" if not fails else "FAIL")
for f in fails: print(" -", f)
sys.exit(1 if fails else 0)
