"""Source-check the 2025 lower early questions left pending by legacy reviews."""

from hashlib import sha256
import json
from pathlib import Path
import fitz

ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / "data/raw_pdfs/denko2/review/meti-dengikaishaku-2023.pdf"
URL = "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/20231226-2.pdf"
raw = PDF.read_bytes()
text = "\n".join(page.get_text() for page in fitz.open(stream=raw, filetype="pdf"))
OUT = ROOT / "docs/evidence/denko2-law"
OUT.mkdir(parents=True, exist_ok=True)


def section(number: int) -> str:
    start = text.index(f"第{number}条 ")
    end = text.index(f"第{number+1}条 ", start + 1)
    return text[start:end]


CHECKS = {
    8: {
        146: ["2 低圧配線に使用する", "146-1表", "2.0以上 2.6未満", "35", "1.6以上 2.0未満", "27",
              "146-4表", "同一管内の電線数", "0.70", "0.63"],
    },
    9: {
        149: ["電線の長さが3m以下", "定格電流の55%以上", "電線の長さが8m以下", "定格電流の35%以上"],
    },
    10: {
        149: ["電線の長さが3m以下", "149-1表", "149-3表", "直径2.6mm", "断面積8mm2",
              "定格電流が20A以下のもの", "定格電流が20A以上30A以下のもの", "定格電流が30A以上40A以下のもの"],
    },
    11: {
        161: ["絶縁電線（屋外用ビニル絶縁電線を除く。）", "金属製線ぴ", "施設すること"],
        156: ["156-1表", "展開した", "点検でき", "点検でき\nない隠ぺ\nい場所"],
    },
    12: {
        146: ["146-3表", "絶縁体の材料及び施設場所の区分", "許容電流補正係数の計算式",
              "ポリエチレン混合物（架", "橋したものを除く。）", "75", "ポリエチレン混合物（架橋したものに限る。）", "90"],
    },
    20: {
        156: ["156-1表", "湿気の多い場所又は水"],
        158: ["七 CD管は", "直接コンクリートに埋め込んで施設すること", "専用の不燃性又は自消性のある難燃性の管又はダクトに収めて施設すること", "湿気の多い場所又は水気のある場所"],
        165: ["3 ライティングダクト工事", "ダクトは、造営材に堅ろうに取り付けること"],
    },
}
for number, articles in CHECKS.items():
    clauses = []
    article_hashes = {}
    for article_number, expected in articles.items():
        original = section(article_number)
        article_hashes[str(article_number)] = sha256(original.encode("utf-8")).hexdigest()
        for clause in expected:
            if clause not in original:
                raise ValueError(f"Q{number} Article{article_number} lacks {clause}")
            clauses.append(f"第{article_number}条: {clause}")
    receipt = {
        "schemaVersion": 1,
        "question": f"20251026-q{number:02}",
        "status": "official-source-verified",
        "sourceUrl": URL,
        "sourcePdfSha256": sha256(raw).hexdigest(),
        "source": "電気設備の技術基準の解釈 " + "・".join(f"第{article}条" for article in articles),
        "articleTextSha256": article_hashes,
        "verifiedClauses": clauses,
        "unresolved": [],
    }
    (OUT / f"20251026-q{number:02}.json").write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("Source-checked 2025 lower Q8,9,10,11,12,20 against METI interpretation")
