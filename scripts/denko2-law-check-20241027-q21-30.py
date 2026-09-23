"""Pin the primary legal texts behind 2024 lower Q21–30 before final review."""

from hashlib import sha256
import json
from pathlib import Path
import xml.etree.ElementTree as ET

import fitz
import requests

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs/evidence/denko2-law"
OUT.mkdir(parents=True, exist_ok=True)
METI = "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/20231226-2.pdf"
MAFF = "https://www.maff.go.jp/j/nousin/seko/kyotu_siyosyo/kikaisisin/attach/pdf/denkisetsubi_koutei-21.pdf"
EGOV = "https://laws.e-gov.go.jp/api/1/lawdata/"
meti_raw = (ROOT / "data/raw_pdfs/denko2/review/meti-dengikaishaku-2023.pdf").read_bytes()
meti_text = "\n".join(page.get_text() for page in fitz.open(stream=meti_raw, filetype="pdf"))


def article(number: int) -> str:
    start = meti_text.index(f"第{number}条 ")
    end = meti_text.index(f"第{number + 1}条 ", start)
    return meti_text[start:end]


def verify_metipdf(articles: dict[int, list[str]]) -> dict:
    clauses = []
    hashes = {}
    for number, phrases in articles.items():
        original = article(number)
        hashes[str(number)] = sha256(original.encode()).hexdigest()
        for phrase in phrases:
            if phrase not in original:
                raise ValueError(f"METI Article {number} lacks {phrase!r}")
            clauses.append(f"第{number}条: {phrase}")
    return {"url": METI, "sha256": sha256(meti_raw).hexdigest(), "articleTextSha256": hashes, "verifiedClauses": clauses}


def egov(law_id: str, articles: dict[int, list[str]] | None = None, tables: dict[str, list[str]] | None = None) -> dict:
    url = EGOV + law_id
    response = requests.get(url, timeout=35)
    response.raise_for_status()
    source = ET.fromstring(response.content)
    checks = []
    for number, phrases in (articles or {}).items():
        matches = [item for item in source.findall(".//MainProvision//Article") if item.attrib.get("Num") == str(number)]
        if len(matches) != 1:
            raise ValueError(f"eGov {law_id} article {number}: {len(matches)} matches")
        original = "".join(matches[0].itertext())
        for phrase in phrases:
            if phrase not in original:
                raise ValueError(f"eGov {law_id} article {number} lacks {phrase!r}")
            checks.append(f"第{number}条: {phrase}")
    for title, phrases in (tables or {}).items():
        matches = [item for item in source.iter("AppdxTable") if title in "".join(item.find("AppdxTableTitle").itertext())]
        if len(matches) != 1:
            raise ValueError(f"eGov {law_id} table {title}: {len(matches)} matches")
        original = "".join(matches[0].itertext())
        for phrase in phrases:
            if phrase not in original:
                raise ValueError(f"eGov {law_id} table {title} lacks {phrase!r}")
            checks.append(f"{title}: {phrase}")
    return {"url": url, "sha256": sha256(response.content).hexdigest(), "verifiedClauses": checks}


def write(number: int, sources: list[dict]) -> None:
    payload = {"schemaVersion": 1, "question": f"20241027-q{number:02}", "status": "official-source-verified", "sources": sources, "unresolved": []}
    (OUT / f"20241027-q{number:02}.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


write(21, [verify_metipdf({143: ["対地電圧は、150V以下", "定格消費電力が2kW以上", "300V以下", "屋内配線と直接接続", "専用の開閉器及び過電流遮断器", "地絡が生じたときに自動的に"]})])
write(22, [verify_metipdf({29: ["乾燥した木製の床", "水気のある場所以外", "15mA以下", "0.1秒以下"], 159: ["4m以下", "8m以下", "交流対地電圧150V以下"]})])

maff_response = requests.get(MAFF, timeout=45)
maff_response.raise_for_status()
maff_raw = maff_response.content
maff_doc = fitz.open(stream=maff_raw, filetype="pdf")
maff_page = next((i for i, page in enumerate(maff_doc) if "3115-7" in page.get_text()), None)
if maff_page is None:
    raise ValueError("MAFF 内線規程参照 section missing")
maff_text = maff_doc[maff_page].get_text()
for phrase in ["8mm", "48%", "32%", "3115-7"]:
    if phrase not in maff_text:
        raise ValueError(f"MAFF page lacks {phrase}")
write(23, [verify_metipdf({159: ["管相互及び管とボックス", "ねじ接続その他これと同等以上の効力"]}), {"url": MAFF, "sha256": sha256(maff_raw).hexdigest(), "page": maff_page + 1, "pageTextSha256": sha256(maff_text.encode()).hexdigest(), "verifiedClauses": ["同一太さ8mm2以下は内線規程3115-7表を参照", "異なる太さでは被覆断面積合計32%以下", "屈曲が少ない場合の引入れ・引替えに関する条件"]}])
write(26, [verify_metipdf({17: ["C種接地工事", "10Ω", "0.5秒以内", "500Ω"], 29: ["300V超過", "C種接地工事"]}), egov("409M50000400052", {58: ["三百ボルトを超えるもの", "〇・四メガオーム"]})])
write(28, [egov("335CO0000000260", {1: ["接続器", "電力量計", "電線を支持する柱", "地中電線用の"]}), egov("335M50000400097", {2: ["前項第一号イからヌまで及びヲ", "電線管を曲げ", "配電盤を造営材に取り付け", "接地極を地面に埋設"]})])
write(29, [egov("337CO0000000324", tables={"別表第一": ["配線用遮断器", "差込み接続器"], "別表第二": ["リモートコントロールリレー", "ライティングダクト"]})])
write(30, [egov("409M50000400052", {2: ["六百ボルト以下", "七千ボルト以下", "七百五十ボルト以下"]})])
print("20241027 Q21/22/23/26/28/29/30 primary-source receipts verified")
