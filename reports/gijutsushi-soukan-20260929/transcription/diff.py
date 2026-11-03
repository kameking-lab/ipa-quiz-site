"""Machine diff of two independent transcriptions (pass A vs pass B).

Usage: py -3.12 diff.py            -> prints every mismatch field with a char-level diff
Writes diff-report.json next to this file.
"""
import difflib
import json
import unicodedata
from pathlib import Path

HERE = Path(__file__).resolve().parent


def load(pass_name):
    out = {}
    for f in sorted((HERE / pass_name).glob("*.json")):
        d = json.loads(f.read_text(encoding="utf-8"))
        for q in d["questions"]:
            key = (d["year"], q["number"])
            assert key not in out, (pass_name, key)
            out[key] = q
    return out


def fields(q):
    yield "stem", q["stem"]
    yield "choiceHeaders", " ".join(q.get("choiceHeaders") or [])
    for i, c in enumerate(q["choices"], 1):
        yield f"choice{i}", c


def show(a, b):
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    parts = []
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op != "equal":
            ctx = a[max(0, i1 - 12):i1]
            parts.append(f"  …{ctx}[A:{a[i1:i2]!r} | B:{b[j1:j2]!r}]")
    return "\n".join(parts)


def main():
    A, B = load("passA"), load("passB")
    report = {"onlyA": sorted(map(list, A.keys() - B.keys())), "onlyB": sorted(map(list, B.keys() - A.keys())),
              "exact": [], "nfkcOnly": [], "mismatch": []}
    for key in sorted(A.keys() & B.keys()):
        qa, qb = A[key], B[key]
        assert len(qa["choices"]) == 5 and len(qb["choices"]) == 5, key
        diffs = []
        nfkc_only = True
        for (name, va), (_, vb) in zip(fields(qa), fields(qb)):
            if va == vb:
                continue
            if unicodedata.normalize("NFKC", va) != unicodedata.normalize("NFKC", vb):
                nfkc_only = False
            diffs.append({"field": name, "diff": show(va, vb)})
        if not diffs:
            report["exact"].append(list(key))
        elif nfkc_only:
            report["nfkcOnly"].append({"q": list(key), "diffs": diffs})
        else:
            report["mismatch"].append({"q": list(key), "diffs": diffs})
    (HERE / "diff-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")
    print("onlyA", report["onlyA"], "onlyB", report["onlyB"])
    print("exact", len(report["exact"]), "nfkcOnly", len(report["nfkcOnly"]), "mismatch", len(report["mismatch"]))
    for m in report["nfkcOnly"] + report["mismatch"]:
        print("==", m["q"])
        for d in m["diffs"]:
            print(" ", d["field"])
            print(d["diff"])


if __name__ == "__main__":
    main()
