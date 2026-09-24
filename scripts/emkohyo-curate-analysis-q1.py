"""Map AIST's exact SI table excerpts to each choice of EM analysis Q1."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PAPER = "emkohyo-20260217-4"
QUESTION = f"{PAPER}-q1"
DRAFT = ROOT / f"data/exam-library/emkohyo-review/{PAPER}-q01-05-draft.json"
INDEX = ROOT / "docs/evidence/emkohyo-choice-sources/supplemental-science-sources.json"
CHOICES = {"パスカル": 1, "気体定数": 2, "ヘルツ": 3, "クーロン": 4, "オーム": 5}


def main() -> None:
    index = json.loads(INDEX.read_text(encoding="utf-8"))
    source = next(item for item in index["sources"] if "国際単位系" in item["title"])
    facts = {item["keyword"]: item for item in source["facts"]}
    if set(CHOICES) - set(facts):
        raise ValueError("Missing direct AIST SI excerpt")
    draft = json.loads(DRAFT.read_text(encoding="utf-8"))
    target = draft["questions"][QUESTION]
    target["overlay"]["sources"] = [{"title": source["title"], "url": source["url"]}]
    target["sourceEvidence"] = [
        {"url": source["url"], "excerpt": facts[keyword]["exactExcerpt"],
         "choiceNumbers": [choice]}
        for keyword, choice in CHOICES.items()
    ]
    target["reviewIssues"] = []
    DRAFT.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{QUESTION}: five AIST SI claims ready for independent review")


if __name__ == "__main__":
    main()
