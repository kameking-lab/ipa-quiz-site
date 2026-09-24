"""Plan or accept only current, clean, independently reviewed EM candidates.

Default is read-only. --run delegates to the strict single-purpose acceptor;
drafts and model PASS labels without matching hashes never become public.
"""

import argparse
import json
from pathlib import Path
import runpy
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/exam-library"
REVIEW = DATA / "emkohyo-review"
STATUS = runpy.run_path(str(ROOT / "scripts/emkohyo-choice-status.py"))


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--year", choices=("2025", "2026"))
    parser.add_argument("--limit", type=int, default=25)
    parser.add_argument("--run", action="store_true")
    args = parser.parse_args()
    if args.limit < 1:
        raise ValueError("--limit must be positive")
    catalog = json.loads((DATA / "official-catalog.json").read_text(encoding="utf-8"))
    published = json.loads((DATA / "choice-explanations.json").read_text(encoding="utf-8"))
    ready = []
    for paper in catalog:
        if paper.get("group") != "emkohyo" or paper["date"][:4] not in {"2025", "2026"}:
            continue
        if args.year and paper["date"][:4] != args.year:
            continue
        rows = json.loads((DATA / "papers" / f"{paper['id']}.json").read_text(encoding="utf-8"))
        for row in rows:
            if row["id"] in published:
                continue
            first = (row["number"] - 1) // 5 * 5 + 1
            draft_file = REVIEW / f"{paper['id']}-q{first:02}-{first+4:02}-draft.json"
            if not draft_file.exists():
                continue
            candidate = json.loads(draft_file.read_text(encoding="utf-8")).get("questions", {}).get(row["id"])
            if not candidate or STATUS["candidate_problems"](row, candidate):
                continue
            if STATUS["current_direct_review"](paper["id"], row["number"], candidate):
                ready.append(row["id"])
    selected = ready[:args.limit]
    print(json.dumps({"mode": "run" if args.run else "plan", "currentCleanReviewedUnpublished": len(ready),
                      "selected": selected}, ensure_ascii=False), flush=True)
    if args.run and selected:
        subprocess.run([sys.executable, str(ROOT / "scripts/emkohyo-choice-accept.py"), *selected],
                       cwd=ROOT, check=True)


if __name__ == "__main__":
    main()
