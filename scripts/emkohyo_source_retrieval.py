"""Retrieve question-specific excerpts from SHA-pinned government documents.

The excerpts are research context, not proof that a choice is correct. The
draft and independent reviewer still verify every claimed sentence directly.
"""

from hashlib import sha256
import json
from pathlib import Path
import re

from sklearn.feature_extraction.text import TfidfVectorizer


ROOT = Path(__file__).resolve().parents[1]
PACKS = ROOT / "docs/evidence/emkohyo-choice-sources/subject-packs"
LAW_PAGES = ROOT / "docs/evidence/emkohyo-choice-sources/mhlw-law-pages.json"
CACHE = ROOT / "data/raw_pdfs/emkohyo-source-cache"
ARTICLE = re.compile(r"第[一二三四五六七八九十百千〇零0-9０-９]+条(?:の[一二三四五六七八九十0-9０-９]+)?")


def chunks(text: str, size: int = 650, overlap: int = 120):
    compact = " ".join(text.split())
    if len(compact) < 80:
        return
    for start in range(0, len(compact), size - overlap):
        part = compact[start:start + size]
        if len(part) >= 80:
            yield part
        if start + size >= len(compact):
            break


def retrieve(subject: str, questions: list[dict], per_question: int = 6) -> dict:
    subject_pack = json.loads((PACKS / f"{subject}.json").read_text(encoding="utf-8"))
    sources = {source["url"]: source for source in subject_pack["sources"]}
    if LAW_PAGES.exists():
        law_index = json.loads(LAW_PAGES.read_text(encoding="utf-8"))
        sources.update({item["url"]: item for item in law_index["pages"]
                        if subject in item["subjects"]})
    records = []
    missing = []
    for source in sources.values():
        cache_file = CACHE / f"{source['sha256']}.json"
        if not cache_file.exists():
            missing.append(source["url"])
            continue
        cached = json.loads(cache_file.read_text(encoding="utf-8"))
        if cached["sha256"] != source["sha256"] or cached["url"] != source["url"]:
            missing.append(source["url"])
            continue
        for page_number, page_text in enumerate(cached["pages"], 1):
            for excerpt in chunks(page_text):
                records.append({"url": source["url"], "title": source["title"],
                                "sha256": source["sha256"],
                                "pdfPage": page_number if len(cached["pages"]) > 1 else None,
                                "excerpt": excerpt})
    if not records:
        return {"sourceCount": 0, "missingCachedSources": missing, "questions": {}}
    corpus = [item["excerpt"] for item in records]
    queries = [(item["text"] + " " + item.get("existingExplanation", ""))[:3500]
               for item in questions]
    vectorizer = TfidfVectorizer(analyzer="char", ngram_range=(2, 4),
                                 max_features=120000, sublinear_tf=True)
    matrix = vectorizer.fit_transform(corpus + queries)
    similarities = matrix[-len(queries):] @ matrix[:-len(queries)].T
    result = {}
    for qindex, question in enumerate(questions):
        scores = similarities.getrow(qindex).toarray().ravel()
        article_names = set(ARTICLE.findall(queries[qindex]))
        ranked = sorted(range(len(records)),
                        key=lambda i: float(scores[i])
                        + (0.5 if article_names.intersection(ARTICLE.findall(records[i]["excerpt"])) else 0),
                        reverse=True)
        selected = []
        per_url = {}
        for index in ranked:
            record = records[index]
            if per_url.get(record["url"], 0) >= 2:
                continue
            if any(sha256(record["excerpt"].encode()).hexdigest() == item["excerptSha256"]
                   for item in selected):
                continue
            selected.append({**record,
                             "excerptSha256": sha256(record["excerpt"].encode()).hexdigest(),
                             "score": round(float(scores[index]), 4)})
            per_url[record["url"]] = per_url.get(record["url"], 0) + 1
            if len(selected) >= per_question:
                break
        result[question["id"]] = selected
    return {"sourceCount": len(sources), "indexedChunks": len(records),
            "missingCachedSources": missing, "questions": result}
