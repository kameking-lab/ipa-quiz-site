"""Withdraw a promoted Denken 3 candidate that has no strict PASS yet.

Usage: python scripts/denken3-withdraw-candidate.py 20250323 law 12

Used after a strict FIX, so the revised private draft can be re-promoted.
Refuses when any row of the file is bound to a strict PASS receipt.
"""

from pathlib import Path
import json
import sys


ROOT = Path(__file__).resolve().parents[1]


def main() -> None:
    if len(sys.argv) != 4:
        raise SystemExit(__doc__)
    date, subject, number = sys.argv[1], sys.argv[2], int(sys.argv[3])
    name = f"{date}-{subject}-q{number:02}-{number:02}.json"
    data = ROOT / "data/questions/denken3/reviewed" / name
    evidence = ROOT / "docs/evidence/denken3/partial" / name
    receipt = json.loads(evidence.read_text(encoding="utf-8"))
    if receipt.get("strictReview"):
        raise ValueError(f"Strict PASS already bound; accepted rows are immutable: {name}")
    data.unlink()
    evidence.unlink()
    print(f"withdrawn {name}")


if __name__ == "__main__":
    main()
