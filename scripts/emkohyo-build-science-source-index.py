"""Pin supplemental Japanese public-institute science sources for EM analysis.

This subject pack is a shared research index. A keyword hit never approves a
choice; each claim still needs an exact excerpt and direct Opus review.
"""

from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
import json
from pathlib import Path
import re

from bs4 import BeautifulSoup
import fitz
import requests


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs/evidence/emkohyo-choice-sources/supplemental-science-sources.json"
CACHE = ROOT / "data/raw_pdfs/emkohyo-source-cache"
SOURCES = [
    {"title": "産総研計量標準総合センター 国際単位系（SI）",
     "url": "https://unit.aist.go.jp/nmij/library/si-units/",
     "subject": "分析に関する概論", "keywords": ["気体定数", "パスカル", "ヘルツ", "クーロン", "オーム"]},
    {"title": "日本原子力研究開発機構 ベクレル",
     "url": "https://atomica.jaea.go.jp/dic/detail/dic_detail_1188.html",
     "subject": "分析に関する概論", "keywords": ["１秒間", "原子核が崩壊"]},
    {"title": "日本原子力研究開発機構 放射線・放射能Q&A",
     "url": "https://www.jaea.go.jp/jishin/qa/qa01.pdf",
     "subject": "分析に関する概論", "keywords": ["グレイ（Gy）とは", "シーベルト（Sv)とは"]},
    {"title": "日本原子力研究開発機構 放射線計数率と壊変率",
     "url": "https://atomica.jaea.go.jp/data/detail/dat_detail_08-04-01-27.html",
     "subject": "分析に関する概論", "keywords": ["1壊変あたり", "検出効率", "1秒あたりの壊変率"]},
    {"title": "産総研ほか『セルロースナノファイバーの有害性試験手順書』手順資料§3.2",
     "url": "https://riss.aist.go.jp/wp-content/uploads/2021/08/CNF_Hazard_Assessment_Procedure_20200409.pdf",
     "subject": "分析に関する概論", "keywords": ["吸光度", "ランバート", "検量線"]},
    {"title": "環境省『底質調査方法』Ⅱ 2.精度管理",
     "url": "https://www.env.go.jp/water/teishitsu-chousa/00_full.pdf",
     "subject": "分析に関する概論", "keywords": ["直線性を示す範囲で使用する"]},
    {"title": "環境省 ガスクロマトグラフによる測定方法",
     "url": "https://www.env.go.jp/hourei/04/000010.html",
     "subject": "分析に関する概論", "keywords": ["ＧＣ―ＦＩＤ", "ＧＣ―ＥＣＤ", "カラム温度"]},
    {"title": "環境省 有害大気汚染物質等測定方法マニュアル",
     "url": "https://www.env.go.jp/air/osen/manual2/pdf_rev201903/01_chpt1-1.pdf",
     "subject": "分析に関する概論", "keywords": ["FID", "ECD", "PID", "FTD"]},
    {"title": "産総研 X線回折法の解説",
     "url": "https://unit.aist.go.jp/mcml/rg-tp/ja/kaisetsu/shokai_TEmethod.html",
     "subject": "分析に関する概論", "keywords": ["X線回折", "結晶"]},
]


def fetch(source: dict) -> dict:
    response = requests.get(source["url"], timeout=90,
                            headers={"User-Agent": "QualificationStudySourceVerifier/1.0"})
    response.raise_for_status()
    content_type = response.headers.get("Content-Type", "")
    if content_type.startswith("application/pdf") or source["url"].endswith(".pdf"):
        pages = [page.get_text() for page in fitz.open(stream=response.content, filetype="pdf")]
    else:
        soup = BeautifulSoup(response.content, "html.parser")
        for tag in soup(["script", "style", "nav", "footer"]):
            tag.decompose()
        pages = [soup.get_text(" ", strip=True)]
    facts = []
    for keyword in source["keywords"]:
        for page_number, page in enumerate(pages, 1):
            found = re.search(re.escape(keyword), page, re.I)
            if not found:
                continue
            facts.append({"keyword": keyword,
                          "page": page_number if len(pages) > 1 else None,
                          "exactExcerpt": page[max(0, found.start()-80):found.end()+230],
                          "excerptSha256": sha256(page[max(0, found.start()-80):found.end()+230].encode()).hexdigest()})
            break
    return {key: source[key] for key in ("title", "url", "subject")} | {
        "status": response.status_code, "finalUrl": response.url,
        "rawSha256": sha256(response.content).hexdigest(), "contentType": content_type,
        "pageCount": len(pages), "matchedKeywords": len(facts),
        "missingKeywords": sorted(set(source["keywords"]) - {x["keyword"] for x in facts}),
        "facts": facts,
        "_pages": pages,
    }


def main() -> None:
    with ThreadPoolExecutor(max_workers=3) as pool:
        records = list(pool.map(fetch, SOURCES))
    CACHE.mkdir(parents=True, exist_ok=True)
    for record in records:
        pages = record.pop("_pages")
        cache_file = CACHE / f"{record['rawSha256']}.json"
        cache_file.write_text(json.dumps({"url": record["url"],
                                          "sha256": record["rawSha256"], "pages": pages},
                                         ensure_ascii=False) + "\n", encoding="utf-8")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"sources": records,
                               "acceptance": "none; research excerpts require choice-specific direct review"},
                              ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"sourceCount": len(records),
                      "matchedKeywords": sum(x["matchedKeywords"] for x in records),
                      "missingKeywords": {x["title"]: x["missingKeywords"] for x in records
                                          if x["missingKeywords"]}}, ensure_ascii=False))


if __name__ == "__main__":
    main()
