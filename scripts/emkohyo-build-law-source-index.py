"""Pin exam-date e-Gov law revisions and retrieve article candidates for EM law.

These matches are research leads, not verified support for an option. The
choice evidence pack and independent Opus review remain mandatory.
"""

from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
import json
from pathlib import Path
import re

import requests
from sklearn.feature_extraction.text import TfidfVectorizer


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/exam-library"
OUT = ROOT / "docs/evidence/emkohyo-choice-sources/law-20260217-index.json"
AS_OF = "2026-02-17"
LAW_IDS = {
    "労働安全衛生法": "347AC0000000057",
    "労働安全衛生法施行令": "347CO0000000318",
    "労働安全衛生規則": "347M50002000032",
    "作業環境測定法": "350AC0000000028",
    "作業環境測定法施行規則": "350M50002000020",
    "有機溶剤中毒予防規則": "347M50002000036",
    "鉛中毒予防規則": "347M50002000037",
    "特定化学物質障害予防規則": "347M50002000039",
    "高気圧作業安全衛生規則": "347M50002000040",
    "電離放射線障害防止規則": "347M50002000041",
    "酸素欠乏症等防止規則": "347M50002000042",
    "粉じん障害防止規則": "354M50002000018",
    "石綿障害予防規則": "417M60000100021",
    "じん肺法": "335AC0000000030",
}


def text(node: object) -> str:
    if isinstance(node, str):
        return node
    if isinstance(node, dict):
        return "".join(text(child) for child in node.get("children", []))
    if isinstance(node, list):
        return "".join(text(child) for child in node)
    return ""


def articles(node: object):
    if isinstance(node, dict):
        if node.get("tag") == "Article":
            yield node
        else:
            for child in node.get("children", []):
                yield from articles(child)


def fetch(item: tuple[str, str]) -> tuple[dict, list[dict]]:
    title, law_id = item
    url = f"https://laws.e-gov.go.jp/api/2/law_data/{law_id}?asof={AS_OF}"
    response = requests.get(url, timeout=60)
    response.raise_for_status()
    body = response.json()
    revision = body["revision_info"]
    if revision["law_revision_id"].split("_")[0] != law_id:
        raise ValueError(f"Unexpected e-Gov revision: {title}")
    source = {"title": title, "url": url, "rawSha256": sha256(response.content).hexdigest(),
              "lawRevisionId": revision["law_revision_id"], "asOf": AS_OF}
    rows = []
    for node in articles(body["law_full_text"]):
        value = text(node)
        if not value.strip():
            continue
        rows.append({"title": title, "url": url, "articleNum": node.get("attr", {}).get("Num"),
                     "articleSha256": sha256(value.encode()).hexdigest(), "text": value})
    source["articleCount"] = len(rows)
    return source, rows


def main() -> None:
    with ThreadPoolExecutor(max_workers=3) as pool:
        fetched = list(pool.map(fetch, LAW_IDS.items()))
    sources = [source for source, _ in fetched]
    article_rows = [article for _, rows in fetched for article in rows]
    catalog = json.loads((DATA / "official-catalog.json").read_text(encoding="utf-8"))
    law_papers = [paper for paper in catalog if paper.get("group") == "emkohyo"
                  and paper["subject"] == "労働衛生関係法令" and paper["date"][:4] == "2026"]
    question_rows = [row for paper in law_papers for row in json.loads(
        (DATA / "papers" / f"{paper['id']}.json").read_text(encoding="utf-8"))]
    narratives = json.loads((DATA / "explanations.json").read_text(encoding="utf-8"))
    queries = [(row["text"] + " " + narratives.get(row["id"], ""))[:3500] for row in question_rows]
    corpus = [article["text"][:5000] for article in article_rows]
    vectorizer = TfidfVectorizer(analyzer="char", ngram_range=(2, 3),
                                 max_features=90000, sublinear_tf=True)
    matrix = vectorizer.fit_transform(corpus + queries)
    scores = matrix[-len(queries):] @ matrix[:-len(queries)].T
    question_matches = {}
    for index, row in enumerate(question_rows):
        values = scores.getrow(index).toarray().ravel()
        ranked = sorted(range(len(article_rows)), key=lambda pos: float(values[pos]), reverse=True)
        chosen = []
        used_laws = set()
        for pos in ranked:
            article = article_rows[pos]
            if len(chosen) >= 8:
                break
            if article["url"] in used_laws and len(chosen) >= 5:
                continue
            used_laws.add(article["url"])
            compact = re.sub(r"\s+", " ", article["text"]).strip()
            chosen.append({key: article[key] for key in ("title", "url", "articleNum", "articleSha256")}
                          | {"retrievalScore": round(float(values[pos]), 4),
                             "excerptCandidate": compact[:900]})
        question_matches[row["id"]] = chosen
    receipt = {"asOf": AS_OF, "sources": sources, "articleCount": len(article_rows),
               "lawPaperIds": [paper["id"] for paper in law_papers],
               "questionCount": len(question_rows), "questionArticleCandidates": question_matches,
               "acceptance": "none; article matches require option-specific quotation and independent review"}
    OUT.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"sources": len(sources), "articles": len(article_rows),
                      "papers": len(law_papers), "questions": len(question_rows),
                      "output": str(OUT)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
