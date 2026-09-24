"""Verify the official statutory claims used in 2025 lower Q21–30."""

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
PDF = ROOT / "data/raw_pdfs/denko2/review/meti-dengikaishaku-2023.pdf"
pdf_bytes = PDF.read_bytes()
whole = "\n".join(page.get_text() for page in fitz.open(stream=pdf_bytes, filetype="pdf"))
url_pdf = "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/20231226-2.pdf"


def article(number: int) -> str:
    start = whole.index(f"第{number}条 ")
    end = whole.index(f"第{number+1}条 ", start + 1)
    return whole[start:end]


def write(number: int, source_url: str, source_sha: str, source: str, clauses: list[str]) -> None:
    path = OUTPUT / f"20251026-q{number:02}.json"
    receipt = {
        "schemaVersion": 1,
        "question": f"20251026-q{number:02}",
        "status": "official-source-verified",
        "checkedAtUtc": datetime.now(timezone.utc).isoformat(),
        "sourceUrl": source_url,
        "sourceSha256": source_sha,
        "source": source,
        "verifiedClauses": clauses,
        "unresolved": [],
    }
    path.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def check_meti(number: int, expected: dict[int, list[str]]) -> None:
    for section, clauses in expected.items():
        text = article(section)
        for clause in clauses:
            if clause not in text:
                raise ValueError(f"Q{number} Article {section} missing: {clause}")
    write(number, url_pdf, sha256(pdf_bytes).hexdigest(),
          "電気設備の技術基準の解釈 " + "・".join(f"第{n}条" for n in expected),
          [f"第{n}条: {clause}" for n, clauses in expected.items() for clause in clauses])


check_meti(21, {160: ["1種金属製可とう電線管", "乾燥した場所", "展開した場所又は点検できる隠ぺい場所"],
                159: ["絶縁電線（屋外用ビニル絶縁電線を除く。）", "管の長さ", "4m以下", "乾燥した場所"],
                164: ["ケーブルにあっては2m"]})
check_meti(22, {29: ["定格感度電流が15mA以下", "動作時間が0.1秒以下", "乾燥した木製の床その他これに類する絶縁性のもの", "対地電圧が150V以下"],
                159: ["交流対地電圧150V以下", "4m以下", "8m以下"]})
check_meti(25, {14: ["絶縁抵抗測定が困難", "漏えい電流が、1mA以下"]})


def official_law(law_id: str) -> tuple[bytes, ET.Element]:
    raw = requests.get(f"https://laws.e-gov.go.jp/api/1/lawdata/{law_id}", timeout=30)
    raw.raise_for_status()
    return raw.content, ET.fromstring(raw.content)


def law_article(root: ET.Element, title: str) -> str:
    matches = [item for item in root.findall(".//MainProvision//Article")
               if "".join(item.find("ArticleTitle").itertext()).strip() == title]
    if len(matches) != 1:
        raise ValueError(f"Expected one e-Gov Article {title}")
    return "".join(matches[0].itertext())


electrician_raw, electrician = official_law("335AC0000000139")
business_raw, business = official_law("339AC0000000170")
products_raw, products = official_law("336AC0000000234")
standard_raw, standard = official_law("409M50000400052")

e1, e2 = law_article(electrician, "第一条"), law_article(electrician, "第二条")
b38 = law_article(business, "第三十八条")
p1 = law_article(products, "第一条")
combined = "\n".join([e1, e2, b38, p1, "".join(standard.itertext())[:3500]])
clauses28 = ["資格及び義務を定め", "一般用電気工作物等", "自家用電気工作物", "第三十八条", "電気用品の製造、販売等を規制", "電気事業法"]
for clause in clauses28:
    if clause not in combined:
        raise ValueError(f"Q28 official law missing {clause}")
write(28, "https://laws.e-gov.go.jp/law/335AC0000000139/", sha256(electrician_raw + business_raw + products_raw + standard_raw).hexdigest(),
      "電気工事士法第1・2条、電気事業法第38条、電気用品安全法第1条、電気設備技術基準省令の前文", clauses28)
q28_path = OUTPUT / "20251026-q28.json"
q28_receipt = json.loads(q28_path.read_text(encoding="utf-8"))
q28_receipt["sources"] = [
    {"url": "https://laws.e-gov.go.jp/law/335AC0000000139/", "apiSha256": sha256(electrician_raw).hexdigest(),
     "articles": ["第1条", "第2条"], "verifiedText": ["資格及び義務を定め", "一般用電気工作物等", "自家用電気工作物"]},
    {"url": "https://laws.e-gov.go.jp/law/339AC0000000170/", "apiSha256": sha256(business_raw).hexdigest(),
     "articles": ["第38条"], "verifiedText": ["一般用電気工作物", "小規模事業用電気工作物", "自家用電気工作物"]},
    {"url": "https://laws.e-gov.go.jp/law/336AC0000000234/", "apiSha256": sha256(products_raw).hexdigest(),
     "articles": ["第1条"], "verifiedText": ["電気用品の製造、販売等を規制", "危険及び障害の発生を防止"]},
    {"url": "https://laws.e-gov.go.jp/law/409M50000400052/", "apiSha256": sha256(standard_raw).hexdigest(),
     "articles": ["前文"], "verifiedText": ["電気事業法", "第三十九条第一項", "第五十六条第一項"]},
]
for proof, text_source in zip(q28_receipt["sources"], [e1+e2, b38, p1, "".join(standard.itertext())[:3500]]):
    for clause in proof["verifiedText"]:
        if clause not in text_source:
            raise ValueError(f"Q28 {proof['url']} lacks {clause}")
q28_path.write_text(json.dumps(q28_receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

s1, s2, s4 = (law_article(standard, title) for title in ("第一条", "第二条", "第四条"))
clauses30 = ["「電線」とは", "「配線」とは", "「電気機械器具」とは", "低圧、高圧及び特別高圧", "感電、火災その他人体に危害"]
for clause in clauses30:
    if clause not in "\n".join((s1, s2, s4)):
        raise ValueError(f"Q30 official standard missing {clause}")
write(30, "https://laws.e-gov.go.jp/law/409M50000400052/", sha256(standard_raw).hexdigest(),
      "電気設備に関する技術基準を定める省令 第1・2・4条", clauses30)
print("Verified Q21, Q22, Q25, Q28 and Q30 against primary METI/e-Gov text")
