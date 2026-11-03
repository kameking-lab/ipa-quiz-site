"""Pin METI's two-pole overcurrent requirement for Q44's 200 V branch."""

from hashlib import sha256
import json
from pathlib import Path
import fitz

ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / "data/raw_pdfs/denko2/review/meti-dengikaishaku-2023.pdf"
URL = "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/20231226-2.pdf"
raw = PDF.read_bytes()
body = "\n".join(page.get_text() for page in fitz.open(stream=raw, filetype="pdf"))
start = body.index("第149条 ")
end = body.index("第150条 ", start)
article = body[start:end]
clauses = [
    "二 前号の規定により施設する過電流遮断器は、各極（多線式電路の中性極を除く。）に施設すること。",
    "対地電圧が150V以下の低圧電路の接地側電線以外の電線に施設した過電流遮断器が動作した場合において、",
]
for clause in clauses:
    if clause not in article:
        raise ValueError(f"Article 149 lacks {clause}")
receipt = {
    "schemaVersion": 1,
    "question": "20251026-q44",
    "status": "official-source-verified",
    "sourceUrl": URL,
    "sourcePdfSha256": sha256(raw).hexdigest(),
    "source": "経済産業省『電気設備の技術基準の解釈』第149条第1項第二号",
    "articleTextSha256": sha256(article.encode("utf-8")).hexdigest(),
    "verifiedClauses": clauses,
    "scopeNote": "原図のⓝは単相3線式の両電圧線による200V分岐。中性極・接地側電線の例外ではないことを原図と併せて判断する。",
    "unresolved": [],
}
output = ROOT / "docs/evidence/denko2-law/20251026-q44.json"
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("Q44 METI Article 149 source pinned")
