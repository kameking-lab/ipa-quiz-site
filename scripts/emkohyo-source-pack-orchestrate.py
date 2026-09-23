"""Build missing EM government source packs in resumable, bounded batches.

Packs only record fetched sources and excerpt matches. They never approve or
publish a draft; every question still needs independent source-aware review.
"""

import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import json
from pathlib import Path
import re
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
REVIEW = ROOT / "data/exam-library/emkohyo-review"
PACKS = ROOT / "docs/evidence/emkohyo-choice-sources"
SCRIPT = ROOT / "scripts/emkohyo-choice-source-pack.py"
PATTERN = re.compile(r"^(emkohyo-.+)-q(\d\d)-(\d\d)-draft\.json$")


def work(job: tuple[str, int, int]) -> dict:
    paper, first, last = job
    process = subprocess.run(
        [sys.executable, str(SCRIPT), paper, str(first), str(last)],
        cwd=ROOT, capture_output=True, text=True, encoding="utf-8", timeout=240,
    )
    return {"paperId": paper, "range": [first, last],
            "ok": process.returncode == 0,
            "message": (process.stdout + process.stderr)[-1200:]}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workers", type=int, default=3)
    parser.add_argument("--limit-batches", type=int, default=12)
    parser.add_argument("--plan", action="store_true")
    args = parser.parse_args()
    if not 1 <= args.workers <= 3 or args.limit_batches < 1:
        raise ValueError("workers must be 1–3 and limit-batches positive")
    catalog = json.loads((ROOT / "data/exam-library/official-catalog.json").read_text(encoding="utf-8"))
    papers = {item["id"] for item in catalog if item.get("group") == "emkohyo"
              and item["date"][:4] in {"2025", "2026"}}
    pending = []
    for draft in sorted(REVIEW.glob("emkohyo-*-draft.json")):
        match = PATTERN.match(draft.name)
        if not match or match.group(1) not in papers:
            continue
        paper, first, last = match.group(1), int(match.group(2)), int(match.group(3))
        if last - first != 4 or first not in {1, 6, 11, 16}:
            continue
        pack = PACKS / f"{paper}-q{first:02}-{last:02}.json"
        if not pack.exists():
            pending.append((paper, first, last))
    jobs = pending[:args.limit_batches]
    print(json.dumps({"mode": "plan" if args.plan else "run", "pending": len(pending),
                      "selected": jobs, "acceptance": "none"}, ensure_ascii=False), flush=True)
    if args.plan:
        return
    failures = 0
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        for future in as_completed(pool.submit(work, job) for job in jobs):
            result = future.result()
            failures += not result["ok"]
            print(json.dumps(result, ensure_ascii=False), flush=True)
    if failures:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
