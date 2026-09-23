"""Supplement Q40 grounding-resistance proof with the official voltage/class table."""

from hashlib import sha256
import json
from pathlib import Path
import fitz

ROOT = Path(__file__).resolve().parents[1]
pdf_path = ROOT / "data/raw_pdfs/denko2/review/meti-dengikaishaku-2023.pdf"
raw = pdf_path.read_bytes()
text = "\n".join(page.get_text() for page in fitz.open(stream=raw, filetype="pdf"))
article29 = text[text.index("第29条 "):text.index("第30条 ")]
clauses = ["機械器具の使用電圧の区分", "300V以下", "D種接地工事", "300V超過", "C種接地工事"]
for clause in clauses:
    if clause not in article29:
        raise ValueError(f"Official Article 29 voltage/class table lacks {clause}")
path = ROOT / "docs/evidence/denko2-law/20251026-q40.json"
receipt = json.loads(path.read_text(encoding="utf-8"))
if receipt["sourcePdfSha256"] != sha256(raw).hexdigest():
    raise ValueError("Article 17 proof uses a different official PDF")
receipt["source"] = "電気設備の技術基準の解釈 第17条・第29条（300V境界の接地種別表）"
receipt["verifiedClauses"] = list(dict.fromkeys(receipt["verifiedClauses"] + clauses))
receipt["article29TextSha256"] = sha256(article29.encode("utf-8")).hexdigest()
receipt["article29ScopeNote"] = "第29条は機械器具の金属製台・外箱の接地種別表。Q40の接地線については図と公式正答も併せて照合する。"
path.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("Q40 official Article 17 resistance and Article 29 voltage/class table verified")
