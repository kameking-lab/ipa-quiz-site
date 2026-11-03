"""Index cached government excerpts by EM question before drafting.

Retrieval scores measure candidate relevance only, never factual support or
approval. The independent official-row and source review remains mandatory.
"""

import argparse
import json
from pathlib import Path

from emkohyo_source_retrieval import retrieve


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/exam-library"
OUT = ROOT / "docs/evidence/emkohyo-choice-sources"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("year", choices=("2025", "2026"))
    args = parser.parse_args()
    catalog = json.loads((DATA / "official-catalog.json").read_text(encoding="utf-8"))
    papers = []
    for item in catalog:
        if item.get("group") != "emkohyo" or item["date"][:4] != args.year:
            continue
        rows = json.loads((DATA / "papers" / f"{item['id']}.json").read_text(encoding="utf-8"))
        queries = [{"id": row["id"], "text": row["text"], "existingExplanation": ""}
                   for row in rows]
        indexed = retrieve(item["subject"], queries, per_question=5)
        questions = []
        for row in rows:
            matches = indexed["questions"].get(row["id"], [])
            score = max((match["score"] for match in matches), default=0)
            questions.append({"id": row["id"], "topRetrievalScore": round(score, 4),
                              "lowRelevance": score < 0.05,
                              "candidateGovernmentUrls": sorted({m["url"] for m in matches})})
        papers.append({"paperId": item["id"], "subject": item["subject"],
                       "cachedSourceCount": indexed["sourceCount"],
                       "indexedChunks": indexed["indexedChunks"],
                       "missingCachedSources": indexed["missingCachedSources"],
                       "questions": questions})
    receipt = {"year": args.year, "paperCount": len(papers),
               "questionCount": sum(len(p["questions"]) for p in papers),
               "lowRelevanceCount": sum(q["lowRelevance"] for p in papers for q in p["questions"]),
               "acceptance": "none; source retrieval is research context only", "papers": papers}
    OUT.mkdir(parents=True, exist_ok=True)
    target = OUT / f"{args.year}-retrieval-readiness.json"
    target.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{target}: {receipt['questionCount']} questions, "
          f"{receipt['lowRelevanceCount']} low-relevance source candidates")


if __name__ == "__main__":
    main()
