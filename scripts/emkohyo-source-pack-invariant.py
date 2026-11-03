"""Fail if any accepted EM explanation loses its immutable review/source pin."""

import json
from pathlib import Path
import runpy


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/exam-library"
REVIEW = DATA / "emkohyo-review"
STATUS = runpy.run_path(str(ROOT / "scripts/emkohyo-choice-status.py"))


def main() -> None:
    published = json.loads((DATA / "choice-explanations.json").read_text(encoding="utf-8"))
    catalog = json.loads((DATA / "official-catalog.json").read_text(encoding="utf-8"))
    checked = []
    invalid = []
    for paper in catalog:
        if paper.get("group") != "emkohyo" or paper["date"][:4] not in {"2025", "2026"}:
            continue
        rows = json.loads((DATA / "papers" / f"{paper['id']}.json").read_text(encoding="utf-8"))
        for row in rows:
            id_ = row["id"]
            if id_ not in published:
                continue
            first = (row["number"] - 1) // 5 * 5 + 1
            draft_file = REVIEW / f"{paper['id']}-q{first:02}-{first+4:02}-draft.json"
            if not draft_file.exists():
                invalid.append(id_)
                continue
            candidate = json.loads(draft_file.read_text(encoding="utf-8")).get("questions", {}).get(id_)
            if not candidate or not STATUS["current_direct_review"](paper["id"], row["number"], candidate):
                invalid.append(id_)
            else:
                checked.append(id_)
    print(json.dumps({"acceptedPinsVerified": len(checked), "invalid": invalid}, ensure_ascii=False))
    if invalid:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
