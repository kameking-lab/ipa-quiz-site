"""Attach pinned exam-date law clauses to 2026 EM law Q2 for direct review.

The article retrieval index is a lead; this file selects the five exact clauses
needed to check the combination table. It does not change acceptance status.
"""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
QUESTION_ID = "emkohyo-EM20261802-q2"
PAPER = "emkohyo-EM20261802"
INDEX = ROOT / "docs/evidence/emkohyo-choice-sources/law-20260217-index.json"
DRAFT = ROOT / f"data/exam-library/emkohyo-review/{PAPER}-q01-05-draft.json"
CLAUSES = {
    ("労働安全衛生規則", "34_2_10"): 590,
    ("有機溶剤中毒予防規則", "4_2"): 600,
    ("特定化学物質障害予防規則", "2_3"): 630,
    ("鉛中毒予防規則", "3_2"): 550,
    ("粉じん障害防止規則", "3_2"): 610,
}


def main() -> None:
    index = json.loads(INDEX.read_text(encoding="utf-8"))
    candidates = {(x["title"], x["articleNum"]): x
                  for x in index["questionArticleCandidates"][QUESTION_ID]}
    draft = json.loads(DRAFT.read_text(encoding="utf-8"))
    target = draft["questions"][QUESTION_ID]
    evidence = []
    sources = []
    for key, length in CLAUSES.items():
        article = candidates[key]
        excerpt = article["excerptCandidate"][:length]
        evidence.append({"url": article["url"], "excerpt": excerpt,
                         "choiceNumbers": [1, 2, 3, 4, 5]})
        sources.append({"title": f"e-Gov {key[0]} 第{key[1]}条（2026年2月17日時点）",
                        "url": article["url"]})
    target["sourceEvidence"] = evidence
    target["overlay"]["sources"] = sources
    target["reviewIssues"] = ["一次資料を追加。公式原図・表の欄対応と全5肢の因果を独立査読するまで保留。"]
    DRAFT.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{QUESTION_ID}: curated {len(evidence)} government clauses, pending independent review")


if __name__ == "__main__":
    main()
