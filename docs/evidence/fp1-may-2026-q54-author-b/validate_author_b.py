"""Local validation for the independent transcription-B packet (FP1 May 2026 applied Q54-60).

Usage: python3 -I validate_author_b.py <packet_dir> [question.pdf answer.pdf]
Checks are mechanical: counts, blank/answer alignment, blank occurrences in the
transcribed text, independent recomputation of every numeric answer, and (when
PDFs are given) SHA256 plus presence of each official value in the answer PDF text.
"""
import hashlib
import json
import re
import subprocess
import sys
import unicodedata
from decimal import ROUND_DOWN, ROUND_HALF_UP, Decimal
from pathlib import Path

EXPECTED_Q = [54, 55, 56, 57, 58, 59, 60]
EXPECTED_BLANKS = {54: 6, 55: 2, 56: 5, 57: 8, 58: 1, 59: 6, 60: 7}
Q_SHA = "fd7843fc2082e074bedecb82a9fc11c45f08c0d57de2146ee145c92cd6f2df8d"
A_SHA = "4859c487f5c55957b75658d727351c5221f3d6d995e710d2560a8a7e0a217460"

results = []


def gate(name, ok, detail=""):
    results.append({"gate": name, "result": "PASS" if ok else "FAIL", "detail": detail})


def r2(x):
    return Decimal(x).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)


def recompute():
    D = Decimal
    out = {}
    # Q54 (百万円). 自己資本 = 株主資本 + その他の包括利益累計額
    eq_x = D(196000) + D(30000)
    ni_x, sales_x, ta_x = D(18000), D(220000), D(295000)
    out[(54, "①")] = r2(ni_x / eq_x * 100)
    out[(54, "②")] = r2(ni_x / sales_x * 100)
    out[(54, "③")] = r2(sales_x / ta_x)
    out[(54, "④")] = r2(ta_x / eq_x)
    out[(54, "⑤")] = r2(D(4000) / D(12200) * 100)
    # Q55
    out[(55, "①")] = r2((D(25000) + D(400) + D(900)) / D(295000) * 100)
    out[(55, "②")] = r2((D(15000) + D(500) + D(500)) / (D(500) + D(100)))
    # Q56
    p = [D("0.5"), D("0.4"), D("0.1")]
    s = [D("4.0"), D("6.0"), D("9.5")]
    t = [D("8.8"), D("7.6"), D("3.1")]
    es = sum(pi * si for pi, si in zip(p, s))
    et = sum(pi * ti for pi, ti in zip(p, t))
    vs = sum(pi * (si - es) ** 2 for pi, si in zip(p, s))
    w = (et - D(7)) / (et - es)
    port = [w * si + (1 - w) * ti for si, ti in zip(s, t)]
    ep = sum(pi * x for pi, x in zip(p, port))
    vp = sum(pi * (x - ep) ** 2 for pi, x in zip(p, port))
    out[(56, "①")] = r2(es)
    out[(56, "②")] = r2(vs.sqrt())
    out[(56, "③")] = r2(w * 100)
    out[(56, "④")] = r2(vp.sqrt())
    # Q57 (円)
    add1 = D(4600000)
    add2 = D(7500000) - D(6000000)
    add3 = D(4200000)
    sub4 = min(D(2500000) - D(2000000), D(400000))
    sub5 = D(400000) * D("0.20")
    sub6 = D(9400000)
    add7 = D(100000) + D(2100) + D(60000) + D(1260)
    income = D(16756640) + add1 + add2 + add3 - (sub4 + D(840000) + sub5 + sub6) + add7 - 0
    for k, v in zip("①②③④⑤⑥⑦⑧", [add1, add2, add3, sub4, sub5, sub6, add7, income]):
        out[(57, k)] = v
    # Q58 (Q57⑧ dependency, 100円未満切捨て)
    tax = D(8000000) * D("0.15") + (income - D(8000000)) * D("0.232")
    pay = (tax - D(250000) - add7) / 100
    out[(58, "答")] = pay.quantize(D(1), rounding=ROUND_DOWN) * 100
    return out


def main():
    pkt = Path(sys.argv[1])
    tr = json.loads((pkt / "transcription.json").read_text(encoding="utf-8"))
    an = json.loads((pkt / "official-answers.json").read_text(encoding="utf-8"))
    ex = json.loads((pkt / "explanations.json").read_text(encoding="utf-8"))

    qs = [q for u in tr["units"] for q in u["questions"]]
    gate("question-count", [q["qNumber"] for q in qs] == EXPECTED_Q, str([q["qNumber"] for q in qs]))
    nb = {q["qNumber"]: len(q["blanks"]) for q in qs}
    gate("blank-count-per-question", nb == EXPECTED_BLANKS, str(nb))
    gate("blank-total-35", sum(nb.values()) == 35, str(sum(nb.values())))
    gate("no-invented-choices", all(q.get("choicesInOriginal") is None for q in qs), "all originals are fill-in/computation")

    # blank occurrence check in transcribed text/table
    occ_ok, occ_detail = True, []
    for q in qs:
        text = q.get("body", "") + json.dumps(q.get("table", {}), ensure_ascii=False)
        for b in q["blanks"]:
            if b["id"] == "答":
                continue
            if q["answerType"].startswith("computation"):
                # 計算問題は「① …はいくらか。」の小問形式（括弧空欄ではない）
                n = len(re.findall(r"(?:^|\n)" + b["id"] + r" ", q.get("body", "")))
            else:
                n = len(re.findall(r"（ " + b["id"] + r" ）", text))
            want = b.get("occurrences", 1)
            if n != want:
                occ_ok = False
            occ_detail.append(f"Q{q['qNumber']}{b['id']}:{n}/{want}")
    gate("blank-occurrences-in-text", occ_ok, " ".join(occ_detail))

    amap = {(a["qNumber"], b["id"]): b for a in an["answers"] for b in a["blanks"]}
    tmap = {(q["qNumber"], b["id"]): b for q in qs for b in q["blanks"]}
    gate("answer-blank-alignment", set(amap) == set(tmap), f"answers={len(amap)} blanks={len(tmap)}")
    unit_ok = all(amap[k]["unit"] == tmap[k]["unit"] for k in tmap if k in amap)
    gate("answer-unit-alignment", unit_ok)

    calc = recompute()
    bad = [f"Q{k[0]}{k[1]} calc={v} official={amap[k]['value']}" for k, v in calc.items()
           if Decimal(amap[k]["value"]) != v]
    gate("independent-recompute-Q54-58", not bad, "; ".join(bad) or f"{len(calc)} numeric blanks match")

    emap = {(e["qNumber"], e["blank"]): e for e in ex["explanations"] if not e.get("excludedFromBlankCount")}
    gate("explanation-per-blank", set(emap) == set(tmap), f"explanations={len(emap)}")
    val_ok = all(emap[k]["officialAnswer"] == amap[k]["value"] for k in emap if k in amap)
    gate("explanation-answer-consistency", val_ok)

    cm = json.loads((pkt / "claims-matrix.json").read_text(encoding="utf-8"))
    cids = {c["id"] for c in cm["claims"]}
    refs = {r for e in ex["explanations"] for r in e.get("claims", [])}
    gate("explanation-claims-resolve", refs <= cids, "missing: " + ",".join(sorted(refs - cids)) if refs - cids else f"{len(refs)} refs resolve")
    unverified = [c["id"] for c in cm["claims"] if not c.get("verifiedByMainSession")]
    gate("claims-verified-by-main-session", not unverified, ",".join(unverified))

    if len(sys.argv) >= 4:
        qpdf, apdf = Path(sys.argv[2]), Path(sys.argv[3])
        gate("question-pdf-sha256", hashlib.sha256(qpdf.read_bytes()).hexdigest() == Q_SHA)
        gate("answer-pdf-sha256", hashlib.sha256(apdf.read_bytes()).hexdigest() == A_SHA)
        try:
            atxt = subprocess.run(["pdftotext", "-layout", str(apdf), "-"], capture_output=True,
                                  text=True, check=True).stdout
            norm = re.sub(r"[\s,]", "", unicodedata.normalize("NFKC", atxt))
            seg = {}
            for qn in EXPECTED_Q:
                m = re.search(r"《問" + str(qn) + r"》(.*?)(《問|$)", norm, re.S)
                seg[qn] = m.group(1) if m else ""
            miss = []
            for (qn, bid), b in amap.items():
                v = b["value"]
                # 解答PDFは桁区切りカンマ付き。正規化済み区間内で「空欄番号＋値」を探す（問58は〈答〉）
                # NFKC で ①→1 になるため、空欄番号も正規化し、値の直後の単位括弧または語句境界まで照合する
                head = unicodedata.normalize("NFKC", bid) if bid != "答" else "〈答〉"
                tail = r"\(" if b["type"] == "number" else ""
                pat = re.escape(head) + re.escape(v) + tail
                if not re.search(pat, seg[qn]):
                    miss.append(f"Q{qn}{bid}={v}")
            gate("official-values-present-in-answer-pdf-text", not miss, ", ".join(miss) or "all 35 found")
        except (OSError, subprocess.CalledProcessError) as e:
            gate("official-values-present-in-answer-pdf-text", False, f"pdftotext unavailable: {e}")

    print(json.dumps(results, ensure_ascii=False, indent=1))
    sys.exit(0 if all(r["result"] == "PASS" for r in results) else 1)


if __name__ == "__main__":
    main()
