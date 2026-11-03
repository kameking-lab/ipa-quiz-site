"""Attach current original METI provisions to 2024 lower Q8–10 reviews."""

from hashlib import sha256
import json
from pathlib import Path
import fitz

ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / "data/raw_pdfs/denko2/review/meti-dengikaishaku-2023.pdf"
URL = "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/20231226-2.pdf"
raw = PDF.read_bytes()
body = "\n".join(page.get_text() for page in fitz.open(stream=raw, filetype="pdf"))
OUT = ROOT / "docs/evidence/denko2-law"
OUT.mkdir(parents=True, exist_ok=True)

CHECKS = {
    8: {146: ["146-2表", "5.5以上    8未満", "49", "146-4表", "7以上 15以下", "0.49", "  4 \n0.63"]},
    9: {149: ["電線の長さが3m以下", "定格電流の55%以上", "電線の長さが8m以下", "定格電流の35%以上"]},
    10: {149: ["電線の長さが3m以下", "149-1表", "定格電流が15Aを超え20A以下の配線用遮断器", "直径1.6mm", "定格電流が20Aを超え30A以下のもの", "直径2.6mm", "149-3表", "定格電流が20A以下のもの", "定格電流が20A以上30A以下のもの"]},
}
for number, articles in CHECKS.items():
    verified = []
    hashes = {}
    for article_number, phrases in articles.items():
        start = body.index(f"第{article_number}条 ")
        end = body.index(f"第{article_number + 1}条 ", start)
        article = body[start:end]
        hashes[str(article_number)] = sha256(article.encode("utf-8")).hexdigest()
        for phrase in phrases:
            if phrase not in article:
                raise ValueError(f"Q{number}: Article {article_number} lacks {phrase}")
            verified.append(f"第{article_number}条: {phrase}")
    receipt = {
        "schemaVersion": 1,
        "question": f"20241027-q{number:02}",
        "status": "official-source-verified",
        "sourceUrl": URL,
        "sourcePdfSha256": sha256(raw).hexdigest(),
        "source": "経済産業省『電気設備の技術基準の解釈』" + "・".join(f"第{article}条" for article in articles),
        "articleTextSha256": hashes,
        "verifiedClauses": verified,
        "unresolved": [],
    }
    (OUT / f"20241027-q{number:02}.json").write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("Q8–10 official METI clauses pinned")
