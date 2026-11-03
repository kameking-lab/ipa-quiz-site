"""Resume private five-question EM drafting with at most three Claude workers.

This produces candidates only. It never publishes overlays or changes the
coverage contract. Missing government support remains in the review queue.
"""

import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import json
from pathlib import Path
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/exam-library"
REVIEW = DATA / "emkohyo-review"
SCRIPT = ROOT / "scripts/emkohyo-2025-draft-batch.py"


def work(job: tuple[str, int, int]) -> tuple[tuple[str, int, int], int, str]:
    paper, first, last = job
    command = [sys.executable, str(SCRIPT), paper, str(first), str(last)]
    process = subprocess.run(command, cwd=ROOT, capture_output=True, text=True,
                             encoding="utf-8", timeout=1200)
    return job, process.returncode, (process.stdout + process.stderr)[-2000:]


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("workers", type=int, nargs="?", default=2)
    parser.add_argument("--year", action="append", choices=("2025", "2026"),
                        help="Resume one exam year first; may be passed twice")
    parser.add_argument("--limit-batches", type=int,
                        help="Bound model calls in this run; remaining batches stay resumable")
    parser.add_argument("--plan", action="store_true", help="Print selected jobs without calling Claude")
    args = parser.parse_args()
    workers = args.workers
    if not 1 <= workers <= 3:
        raise ValueError("Workers must be 1–3")
    if args.limit_batches is not None and args.limit_batches < 1:
        raise ValueError("--limit-batches must be positive")
    catalog = json.loads((DATA / "official-catalog.json").read_text(encoding="utf-8"))
    years = set(args.year or ("2025", "2026"))
    papers = [item for item in catalog if item["group"] == "emkohyo"
              and item["date"][:4] in years]
    jobs = []
    for paper in papers:
        rows = json.loads((DATA / "papers" / f"{paper['id']}.json").read_text(encoding="utf-8"))
        if len(rows) != 20 or any(row["choiceCount"] != 5 or row["answerAuthority"] != "official"
                                  for row in rows):
            raise ValueError(f"Unexpected paper shape: {paper['id']}")
        for first in (1, 6, 11, 16):
            out = REVIEW / f"{paper['id']}-q{first:02}-{first+4:02}-draft.json"
            if not out.exists():
                jobs.append((paper["id"], first, first + 4))
    pending = len(jobs)
    if args.limit_batches is not None:
        jobs = jobs[:args.limit_batches]
    print(f"EM paper={len(papers)} expected={len(papers)*20} pendingDraftBatches={pending} "
          f"runningBatches={len(jobs)} workers={workers}", flush=True)
    if args.plan:
        print(json.dumps({"jobs": jobs}, ensure_ascii=False), flush=True)
        return
    failures = 0
    with ThreadPoolExecutor(max_workers=workers) as pool:
        for future in as_completed([pool.submit(work, job) for job in jobs]):
            job, code, output = future.result()
            failures += code != 0
            print(json.dumps({"paper": job[0], "range": [job[1], job[2]],
                              "ok": code == 0, "message": output.strip()}, ensure_ascii=False), flush=True)
    if failures:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
