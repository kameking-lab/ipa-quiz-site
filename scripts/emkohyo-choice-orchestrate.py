"""Resume private five-question EM drafting with at most three Claude workers.

This produces candidates only. It never publishes overlays or changes the
coverage contract. Missing government support remains in the review queue.
"""

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
    workers = int(sys.argv[1]) if len(sys.argv) > 1 else 2
    if not 1 <= workers <= 3:
        raise ValueError("Workers must be 1–3")
    catalog = json.loads((DATA / "official-catalog.json").read_text(encoding="utf-8"))
    papers = [item for item in catalog if item["group"] == "emkohyo"
              and item["date"][:4] in {"2025", "2026"}]
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
    print(f"EM paper={len(papers)} expected={len(papers)*20} pendingDraftBatches={len(jobs)} workers={workers}", flush=True)
    with ThreadPoolExecutor(max_workers=workers) as pool:
        for future in as_completed([pool.submit(work, job) for job in jobs]):
            job, code, output = future.result()
            print(json.dumps({"paper": job[0], "range": [job[1], job[2]],
                              "ok": code == 0, "message": output.strip()}, ensure_ascii=False), flush=True)


if __name__ == "__main__":
    main()
