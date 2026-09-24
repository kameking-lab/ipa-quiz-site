"""Deterministic gate for a provisional lckohyo choice-explanation wave shard.

Usage: python3 scripts/validate-lck-provisional-choice-wave.py lckohyo-wave-a [--base <git-ref>]

Checks the exact ID set, official answer match, five nonempty reasons,
forbidden internal wording, quotations/article numbers absent from the
question and legacy explanation, current fingerprints, and model receipts.
With --base, also proves papers, presentation, general explanations, answer
keys and the strict overlay are unchanged relative to that ref.
"""

import argparse
from pathlib import Path
import subprocess
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent))
from lck_provisional_wave import (ROOT, WAVES, load_receipts, load_wave, read,  # noqa: E402
                                  shard_path, validate_shard)

FROZEN = ["data/exam-library/papers", "data/exam-library/presentation",
          "data/exam-library/explanations.json", "data/exam-library/choice-explanations.json",
          "data/exam-library/reviewed-answer-keys.json", "data/exam-library/official-catalog.json"]


def frozen_issues(base):
    run = subprocess.run(["git", "diff", "--name-only", base, "--", *FROZEN],
                         cwd=ROOT, capture_output=True, text=True)
    if run.returncode:
        return [f"cannot diff against {base}: {run.stderr.strip()}"]
    return [f"frozen file changed: {name}" for name in run.stdout.split()]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("wave", choices=sorted(WAVES))
    parser.add_argument("--base", help="git ref whose question data must be unchanged")
    args = parser.parse_args()
    targets, excluded = load_wave(args.wave)
    path = shard_path(args.wave)
    if not path.exists():
        sys.exit(f"missing shard {path}")
    issues = validate_shard(args.wave, read(path), targets, excluded, load_receipts(args.wave))
    if args.base:
        issues += frozen_issues(args.base)
    for issue in issues:
        print(issue)
    print(f"{args.wave}: {len(targets)} records expected, {len(excluded)} excluded, "
          f"{len(issues)} issues")
    sys.exit(1 if issues else 0)


if __name__ == "__main__":
    main()
