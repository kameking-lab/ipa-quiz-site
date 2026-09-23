"""Plan or run bounded independent EM reviews from pinned government packs.

Plan is the default. --run invokes at most three explicit claude-opus-5-5
workers through emkohyo-2025-review-batch.py. This never accepts or publishes.
"""

import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
from hashlib import sha256
import json
from pathlib import Path
import subprocess
import sys
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/exam-library"
REVIEW = DATA / "emkohyo-review"
PACKS = ROOT / "docs/evidence/emkohyo-choice-sources"
SCRIPT = ROOT / "scripts/emkohyo-2025-review-batch.py"


def eligible(pack_file: Path, year: str | None, accepted: set[str]) -> tuple | None:
    pack = json.loads(pack_file.read_text(encoding="utf-8"))
    paper = pack.get("paperId", "")
    numbers = pack.get("range", [])
    if not paper.startswith("emkohyo-") or len(numbers) != 2:
        return None
    first, last = numbers
    if not isinstance(first, int) or not isinstance(last, int) or first < 1 or last > 20 or last < first:
        return None
    if (first - 1) // 5 != (last - 1) // 5:
        return None
    if year:
        catalog = json.loads((DATA / "official-catalog.json").read_text(encoding="utf-8"))
        date = next((item["date"] for item in catalog if item["id"] == paper), "")
        if not date.startswith(year):
            return None
    batch_first = (first - 1) // 5 * 5 + 1
    draft_file = REVIEW / f"{paper}-q{batch_first:02}-{batch_first+4:02}-draft.json"
    review_file = REVIEW / f"{paper}-q{first:02}-{last:02}-review.json"
    if not draft_file.exists() or review_file.exists():
        return None
    if pack.get("draftSha256") != sha256(draft_file.read_bytes()).hexdigest():
        return None
    if pack.get("missingEvidenceQuestions") or pack.get("unverifiedExcerpts"):
        return None
    if not pack.get("claimedExcerpts") or not pack.get("sources"):
        return None
    if any(not (urlparse(source.get("url", "")).hostname or "").endswith(".go.jp")
           or source.get("status") != 200 for source in pack["sources"]):
        return None
    ids = {f"{paper}-q{number}" for number in range(first, last+1)}
    return paper, first, last, ids - accepted


def work(job: tuple[str, int, int]) -> dict:
    paper, first, last = job
    command = [sys.executable, str(SCRIPT), paper, str(first), str(last)]
    process = subprocess.run(command, cwd=ROOT, capture_output=True, text=True,
                             encoding="utf-8", timeout=1500)
    return {"paper": paper, "range": [first, last], "ok": process.returncode == 0,
            "message": (process.stdout + process.stderr)[-2000:]}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--year", choices=("2025", "2026"))
    parser.add_argument("--workers", type=int, default=2)
    parser.add_argument("--limit-batches", type=int, default=3)
    parser.add_argument("--run", action="store_true")
    args = parser.parse_args()
    if not 1 <= args.workers <= 3 or args.limit_batches < 1:
        raise ValueError("Workers must be 1–3 and limit-batches must be positive")
    accepted = set(json.loads((DATA / "choice-explanations.json").read_text(encoding="utf-8")))
    candidates = [value for file in PACKS.glob("emkohyo-*-q*.json")
                  if (value := eligible(file, args.year, accepted)) is not None]
    candidates.sort(key=lambda job: (-(len(job[3]) / (job[2] - job[1] + 1)),
                                     -len(job[3]), job[0], job[1]))
    covered = set()
    jobs = []
    for paper, first, last, remaining in candidates:
        if remaining - covered:
            jobs.append((paper, first, last))
            covered.update(remaining)
        if len(jobs) >= args.limit_batches:
            break
    print(json.dumps({"mode": "run" if args.run else "plan", "model": "claude-opus-5-5",
                      "readyDistinctUnaccepted": len(set().union(*(c[3] for c in candidates))) if candidates else 0,
                      "selectedDistinctUnaccepted": len(covered), "jobs": jobs}, ensure_ascii=False), flush=True)
    if not args.run:
        return
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        for future in as_completed([pool.submit(work, job) for job in jobs]):
            print(json.dumps(future.result(), ensure_ascii=False), flush=True)


if __name__ == "__main__":
    main()
