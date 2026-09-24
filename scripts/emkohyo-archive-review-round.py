"""Archive one EM direct-review round before a revised candidate is re-reviewed.

Usage: python3 scripts/emkohyo-archive-review-round.py emkohyo-EM20261801 19 19

Moves the review receipt, parsed and raw model responses, and the focused
source pack to their archive folders with the next free -rN suffix. Nothing is
deleted, so every FIX verdict stays auditable next to the accepted round.
"""

import json
from pathlib import Path
import sys

from emkohyo_portable_hash import matches_text_sha256


ROOT = Path(__file__).resolve().parents[1]
REVIEW = ROOT / "data/exam-library/emkohyo-review"
PACKS = ROOT / "docs/evidence/emkohyo-choice-sources"


def main() -> None:
    paper, first, last = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
    stem = f"{paper}-q{first:02}-{last:02}"
    review_files = [(REVIEW / f"{stem}-{kind}{suffix}", REVIEW / "archive", f"{stem}-{kind}", suffix)
                    for kind, suffix in (("review", ".json"), ("raw-assessment", ".json"),
                                         ("raw-response", ".txt"))]
    moves = [*review_files, (PACKS / f"{stem}.json", PACKS / "archive", stem, ".json")]
    present = [move for move in moves if move[0].exists()]
    if not present:
        raise FileNotFoundError(f"No current review round for {stem}")
    receipt_file, pack_file = review_files[0][0], PACKS / f"{stem}.json"
    if receipt_file.exists() and pack_file.exists():
        # Archive before rebuilding: the pack must still be the one this receipt reviewed.
        pinned = json.loads(receipt_file.read_text(encoding="utf-8")).get("sourcePackSha256", "")
        if pinned and not matches_text_sha256(pack_file, pinned):
            raise ValueError(f"{pack_file} was rebuilt after its review; restore the reviewed pack first")
    round_number = 1
    while any((folder / f"{name}-r{round_number}{suffix}").exists() for _, folder, name, suffix in moves):
        round_number += 1
    for source, folder, name, suffix in present:
        folder.mkdir(parents=True, exist_ok=True)
        source.rename(folder / f"{name}-r{round_number}{suffix}")
    print(f"Archived {stem} as r{round_number}: {len(present)} files")


if __name__ == "__main__":
    main()
