"""Index distinct EM evidence gaps and reusable government source candidates.

The index is a research queue, never an acceptance or correctness receipt.
"""

from collections import Counter
from hashlib import sha256
import json
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/exam-library"
PACKS = ROOT / "docs/evidence/emkohyo-choice-sources"
OUT = PACKS / "source-gap-index-20260924.json"


def lane(subject: str) -> str:
    if subject == "労働衛生関係法令":
        return "law"
    if subject == "労働衛生一般":
        return "general"
    return "analysis"


def main() -> None:
    catalog = json.loads((DATA / "official-catalog.json").read_text(encoding="utf-8"))
    rows = {}
    for paper in catalog:
        if paper.get("group") != "emkohyo" or paper["date"][:4] not in {"2025", "2026"}:
            continue
        for row in json.loads((DATA / "papers" / f"{paper['id']}.json").read_text(encoding="utf-8")):
            text = re.sub(r"\s+", "", row["text"])
            text = re.sub(r"^問[０-９0-9一二三四五六七八九十]+", "", text)
            rows[row["id"]] = {"subject": paper["subject"], "lane": lane(paper["subject"]),
                               "year": paper["date"][:4], "fingerprint": sha256(text.encode()).hexdigest()}
    drafted = set()
    for file in (DATA / "emkohyo-review").glob("emkohyo-*-draft.json"):
        draft = json.loads(file.read_text(encoding="utf-8"))
        drafted.update(set(draft.get("questions", {})) & set(rows))
    accepted = set(json.loads((DATA / "choice-explanations.json").read_text(encoding="utf-8"))) & set(rows)
    verified_excerpts = set()
    for file in PACKS.glob("emkohyo-*-q*.json"):
        try:
            pack = json.loads(file.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            continue
        for source in pack.get("sources", []):
            if source.get("status") == 200:
                verified_excerpts.update(claim["questionId"] for claim in source.get("claimedExcerpts", [])
                                         if claim.get("matched") and claim.get("questionId") in rows)
    retrieval = {}
    for year in ("2025", "2026"):
        file = PACKS / f"{year}-retrieval-readiness.json"
        if not file.exists():
            continue
        receipt = json.loads(file.read_text(encoding="utf-8"))
        for paper in receipt["papers"]:
            retrieval.update({item["id"]: item for item in paper["questions"]})
    missing = sorted(drafted - accepted - verified_excerpts)
    candidate_urls = sorted({url for id_ in missing
                             for url in retrieval.get(id_, {}).get("candidateGovernmentUrls", [])})
    by_lane = Counter(rows[id_]["lane"] for id_ in missing)
    fingerprints = {rows[id_]["fingerprint"] for id_ in missing}
    detailed = [{"id": id_, **rows[id_],
                 "topRetrievalScore": retrieval.get(id_, {}).get("topRetrievalScore"),
                 "lowRelevance": retrieval.get(id_, {}).get("lowRelevance"),
                 "candidateGovernmentUrls": retrieval.get(id_, {}).get("candidateGovernmentUrls", [])}
                for id_ in missing]
    output = {"scope": "EM 2025/2026 official multiple choice",
              "expectedQuestions": len(rows), "drafted": len(drafted), "accepted": len(accepted),
              "draftedWithoutVerifiedGovernmentExcerpt": len(missing),
              "distinctExactQuestionFingerprints": len(fingerprints),
              "distinctCachedGovernmentCandidateUrls": len(candidate_urls),
              "lowRelevanceQuestions": sum(bool(x["lowRelevance"]) for x in detailed),
              "missingByLane": dict(sorted(by_lane.items())),
              "candidateGovernmentUrls": candidate_urls,
              "missingQuestions": detailed,
              "acceptance": "none; a matched excerpt is not a complete five-choice explanation or independent review"}
    OUT.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({key: value for key, value in output.items()
                      if key not in {"candidateGovernmentUrls", "missingQuestions"}}, ensure_ascii=False))


if __name__ == "__main__":
    main()
