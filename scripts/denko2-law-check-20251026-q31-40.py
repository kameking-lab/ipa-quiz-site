"""Reproduce the primary-law checks needed by the 2025 lower wiring batch."""

from datetime import datetime, timezone
from hashlib import sha256
import json
from pathlib import Path
import requests
import fitz
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "docs/evidence/denko2-law"
OUTPUT.mkdir(parents=True, exist_ok=True)
INTERPRETATION = ROOT / "data/raw_pdfs/denko2/review/meti-dengikaishaku-2023.pdf"
INTERPRETATION_URL = "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/20231226-2.pdf"
data = INTERPRETATION.read_bytes()
pdf = fitz.open(stream=data, filetype="pdf")
text = "\n".join(page.get_text() for page in pdf)


def section(article: int, next_article: int) -> str:
    start = text.index(f"第{article}条 ")
    end = text.index(f"第{next_article}条 ", start + 1)
    return text[start:end]


sections = {31: section(110, 111), 33: section(181, 182), 40: section(17, 18)}
checks = {
    31: ["第110条", "2 低圧屋側電線路は", "木造以外の造営物に施設すること", "五 ケーブル工事により", "三 金属管工事により"],
    33: ["第181条", "最大使用電圧が60V以下", "181-1表", "15V以下", "15Vを超え30V以下", "30Vを超え60V以下"],
    40: ["C種接地工事は", "接地抵抗値は、10Ω", "D種接地工事は", "接地抵抗値は、100Ω", "0.5秒以内", "500Ω"],
}
for number, clauses in checks.items():
    for clause in clauses:
        if clause not in sections[number]:
            raise ValueError(f"METI interpretation Article mismatch Q{number}: {clause}")
    receipt = {
        "schemaVersion": 1,
        "question": f"20251026-q{number:02}",
        "status": "official-source-verified",
        "checkedAtUtc": datetime.now(timezone.utc).isoformat(),
        "sourceUrl": INTERPRETATION_URL,
        "sourcePdfSha256": sha256(data).hexdigest(),
        "source": f"電気設備の技術基準の解釈 第{ {31:110,33:181,40:17}[number]}条",
        "verifiedClauses": clauses,
        "unresolved": [],
    }
    (OUTPUT / f"20251026-q{number:02}.json").write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

q31_section = sections[31]
q31_methods = ["一 がいし引き工事により", "二 合成樹脂管工事により", "三 金属管工事により", "四 バスダクト工事により", "五 ケーブル工事により"]
for method in q31_methods:
    if method not in q31_section:
        raise ValueError(f"Article 110 lacks listed method: {method}")
q31_excluded = ["金属可とう電線管工事", "金属線ぴ工事"]
for method in q31_excluded:
    if method in q31_section:
        raise ValueError(f"Article 110 unexpectedly lists {method}")
q31_path = OUTPUT / "20251026-q31.json"
q31_receipt = json.loads(q31_path.read_text(encoding="utf-8"))
q31_receipt["article110Paragraph2FullMethodList"] = q31_methods
q31_receipt["verifiedAbsentFromArticle110"] = q31_excluded
q31_receipt["article110TextSha256"] = sha256(q31_section.encode("utf-8")).hexdigest()
q31_path.write_text(json.dumps(q31_receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

url = "https://laws.e-gov.go.jp/api/1/lawdata/409M50000400052"
response = requests.get(url, timeout=30)
response.raise_for_status()
root = ET.fromstring(response.content)
articles = [article for article in root.findall(".//Article")
            if "".join(article.find("ArticleTitle").itertext()).strip() == "第五十八条"]
if len(articles) != 1:
    raise ValueError("Cannot uniquely locate Article 58")
article_text = "".join(articles[0].itertext())
clauses = ["対地電圧", "百五十ボルト以下", "〇・一メガオーム", "〇・二メガオーム", "三百ボルトを超えるもの", "〇・四メガオーム"]
for clause in clauses:
    if clause not in article_text:
        raise ValueError(f"e-Gov Article 58 mismatch: {clause}")
receipt = {
    "schemaVersion": 1,
    "question": "20251026-q39",
    "status": "official-source-verified",
    "checkedAtUtc": datetime.now(timezone.utc).isoformat(),
    "sourceUrl": "https://laws.e-gov.go.jp/law/409M50000400052/",
    "apiUrl": url,
    "apiResponseSha256": sha256(response.content).hexdigest(),
    "source": "電気設備に関する技術基準を定める省令 第58条",
    "verifiedClauses": clauses,
    "unresolved": [],
}
(OUTPUT / "20251026-q39.json").write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("Verified Q31, Q33, Q39 and Q40 against official METI / e-Gov source text")
