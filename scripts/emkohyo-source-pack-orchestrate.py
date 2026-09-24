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

from emkohyo_portable_hash import matches_text_sha256


ROOT = Path(__file__).resolve().parents[1]
REVIEW = ROOT / "data/exam-library/emkohyo-review"
PACKS = ROOT / "docs/evidence/emkohyo-choice-sources"
SCRIPT = ROOT / "scripts/emkohyo-choice-source-pack.py"
PATTERN = re.compile(r"^(emkohyo-.+)-q(\d\d)-(\d\d)-draft\.json$")


def accepted_in_batch(paper: str, first: int, last: int, published: dict) -> list[str]:
    """A published receipt pins the existing pack bytes, even if its draft changes."""
    return [f"{paper}-q{number}" for number in range(first, last + 1)
            if f"{paper}-q{number}" in published]


def work(job: tuple[str, int, int, bool]) -> dict:
    paper, first, last, refresh = job
    process = subprocess.run(
        [sys.executable, str(SCRIPT), paper, str(first), str(last), *(["--replace"] if refresh else [])],
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
    parser.add_argument("--refresh-stale", action="store_true",
                        help="refresh a pack only when its pinned draft no longer matches")
    args = parser.parse_args()
    if not 1 <= args.workers <= 3 or args.limit_batches < 1:
        raise ValueError("workers must be 1–3 and limit-batches positive")
    catalog = json.loads((ROOT / "data/exam-library/official-catalog.json").read_text(encoding="utf-8"))
    papers = {item["id"] for item in catalog if item.get("group") == "emkohyo"
              and item["date"][:4] in {"2025", "2026"}}
    published = json.loads((ROOT / "data/exam-library/choice-explanations.json").read_text(encoding="utf-8"))
    pending = []
    protected = []
    for draft in sorted(REVIEW.glob("emkohyo-*-draft.json")):
        match = PATTERN.match(draft.name)
        if not match or match.group(1) not in papers:
            continue
        paper, first, last = match.group(1), int(match.group(2)), int(match.group(3))
        if last - first != 4 or first not in {1, 6, 11, 16}:
            continue
        pack = PACKS / f"{paper}-q{first:02}-{last:02}.json"
        accepted = accepted_in_batch(paper, first, last, published)
        if accepted:
            protected.append({"paperId": paper, "range": [first, last], "acceptedIds": accepted})
            continue
        if not pack.exists():
            pending.append((paper, first, last, False))
        elif args.refresh_stale:
            record = json.loads(pack.read_text(encoding="utf-8"))
            if record.get("paperId") != paper or record.get("range") != [first, last]:
                raise ValueError(f"Source pack identity mismatch: {pack}")
            if not matches_text_sha256(draft, record.get("draftSha256", "")):
                pending.append((paper, first, last, True))
    jobs = pending[:args.limit_batches]
    print(json.dumps({"mode": "plan" if args.plan else "run", "pending": len(pending),
                      "selected": jobs, "protectedPublishedBatches": protected,
                      "acceptance": "none"}, ensure_ascii=False), flush=True)
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
