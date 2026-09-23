"""Verify current Q15/19/20 wording with METI provisions and e-Gov Article 7."""

from hashlib import sha256
import json
from pathlib import Path
import xml.etree.ElementTree as ET

import fitz
import requests

ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / "data/raw_pdfs/denko2/review/meti-dengikaishaku-2023.pdf"
METI_URL = "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/20231226-2.pdf"
EGOV_URL = "https://laws.e-gov.go.jp/api/1/lawdata/409M50000400052"
raw = PDF.read_bytes()
document = fitz.open(stream=raw, filetype="pdf")
body = "\n".join(page.get_text() for page in document)
OUT = ROOT / "docs/evidence/denko2-law"
OUT.mkdir(parents=True, exist_ok=True)


def article(number: int) -> str:
    start = body.index(f"第{number}条 ")
    end = body.index(f"第{number + 1}条 ", start)
    return body[start:end]


def write(number: int, checks: dict[int, list[str]], extra: dict | None = None) -> None:
    verified, hashes = [], {}
    for clause_number, phrases in checks.items():
        original = article(clause_number)
        hashes[str(clause_number)] = sha256(original.encode("utf-8")).hexdigest()
        for phrase in phrases:
            if phrase not in original:
                raise ValueError(f"Q{number} Article{clause_number} lacks {phrase}")
            verified.append(f"第{clause_number}条: {phrase}")
    receipt = {
        "schemaVersion": 1,
        "question": f"20241027-q{number:02}",
        "status": "official-source-verified",
        "sourceUrl": METI_URL,
        "sourcePdfSha256": sha256(raw).hexdigest(),
        "source": "経済産業省『電気設備の技術基準の解釈』",
        "articleTextSha256": hashes,
        "verifiedClauses": verified,
        "unresolved": [],
        **(extra or {}),
    }
    (OUT / f"20241027-q{number:02}.json").write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


write(15, {33: ["電気用品安全法の適用を受けるもの", "33-2表", "定格電流の1.25倍", "30A以下", "60分", "50Aを超え100A以下", "120分"]})

egov_response = requests.get(EGOV_URL, timeout=30)
egov_response.raise_for_status()
egov_xml = egov_response.content
root = ET.fromstring(egov_xml)
seven = [node for node in root.iter("Article") if node.attrib.get("Num") == "7"]
if len(seven) != 1:
    raise ValueError("e-Gov Article 7 absent or duplicated")
article_seven = "".join(seven[0].itertext())
for phrase in ["電線を接続する場合", "絶縁性能の低下", "断線のおそれがない"]:
    if phrase not in article_seven:
        raise ValueError(f"e-Gov Article 7 lacks {phrase}")
write(19, {12: ["接続部分の絶縁電線の絶縁物と同等以上の絶縁効力", "十分に被覆すること"]}, {
    "additionalSourceUrl": EGOV_URL,
    "additionalSourceXmlSha256": sha256(egov_xml).hexdigest(),
    "additionalSource": "e-Gov『電気設備に関する技術基準を定める省令』第7条",
    "additionalArticleTextSha256": sha256(article_seven.encode("utf-8")).hexdigest(),
    "additionalVerifiedClauses": ["第7条: 電線を接続する場合", "第7条: 絶縁性能の低下", "第7条: 断線のおそれがない"],
})

table_image = ROOT / "docs/evidence/denko2-independent/20241027-q20-meti-156-table.png"
table_image.parent.mkdir(parents=True, exist_ok=True)
document[151].get_pixmap(matrix=fitz.Matrix(2, 2), clip=fitz.Rect(43, 370, 552, 806), alpha=False).save(table_image)
write(20, {
    156: ["156-1表", "展開した", "湿気の多い場所又は水", "点検でき", "点検でき\nない隠ぺ\nい場所", "ラ\nイ\nテ\nィ\nン\nグ\nダ\nク\nト\n工\n事"],
    158: ["湿気の多い場所又は水気のある場所に施設する場合は、防湿装置を施すこと"],
    159: ["湿気の多い場所又は水気のある場所に施設する場合は、防湿装置を施すこと"],
    165: ["3 ライティングダクト工事による低圧屋内配線", "ダクトは、造営材に堅ろうに取り付けること"],
}, {
    "referenceImage": str(table_image.relative_to(ROOT)).replace("\\", "/"),
    "referenceImageSha256": sha256(table_image.read_bytes()).hexdigest(),
    "tableImageScope": "第156条156-1表の行列を原本画像で検証。文字抽出の列順だけで丸印を判断しない。",
})
print("Q15/19/20 original METI and e-Gov clauses pinned")
