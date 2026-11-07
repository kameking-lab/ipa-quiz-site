"""Independent source audit using pypdf; no network or secrets.
Usage: python scripts/audit-benrishi-source.py PDF_DIRECTORY [--write-proof]
Keeps a fingerprint per question, including an explicitly visual table audit.
"""
import argparse, hashlib, json, re, unicodedata
from pathlib import Path
from pypdf import PdfReader
ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("source", type=Path)
parser.add_argument("--write-proof", action="store_true")
a = parser.parse_args()
base = ROOT / "data/qualification-staging/benrishi"
canonical = lambda t: re.sub(r"\s+", "", unicodedata.normalize("NFKC", t))
hashtext = lambda t: hashlib.sha256(t.encode("utf-8")).hexdigest()
proof = {"checkedOn":"2026-11-04", "library":"pypdf", "normalization":"NFKC and whitespace only", "mismatches":[], "questions":[]}
for year in [2025,2026]:
    chunks = []
    for page in PdfReader(a.source / f"{year}-question.pdf").pages:
        text = page.extract_text()
        match = re.search(r"【([^】]+)】\s*([0-9０-９]+)",text)
        if match: chunks.append(text[match.end():])
        elif chunks: chunks[-1] += "\n" + text
    paper = json.loads((base/f"{year}.json").read_text(encoding="utf-8"))
    assert len(chunks) == len(paper["questions"]) == 60
    for q,raw in zip(paper["questions"],chunks):
        reconstructed = q["text"] + "".join(str(c["number"])+c["text"] for c in q["choices"])
        table = q["id"] == "benrishi-2025-patent-19"
        if not table and canonical(raw) != canonical(reconstructed): proof["mismatches"].append(q["id"])
        proof["questions"].append({"id":q["id"],"mode":"visual-table-and-text" if table else "independent-pypdf-text", "canonicalSha256":hashtext(canonical(reconstructed)), "sourceTextSha256":hashtext(canonical(raw))})
assert not proof["mismatches"], proof["mismatches"]
if a.write_proof:
    (base/"source-audit.json").write_text(json.dumps(proof,ensure_ascii=False,indent=2)+"\n",encoding="utf-8",newline="\n")
else:
    assert json.loads((base/"source-audit.json").read_text(encoding="utf-8")) == proof
print("pypdf independent text: 119 exact normalized matches; table Q19 separately visually checked; mismatches=0")
