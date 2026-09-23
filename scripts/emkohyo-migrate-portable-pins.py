"""Re-pin EM JSON evidence after proving a newline-only hash difference.

The old digest must match the present raw file before any pin is rewritten.
Substantive candidate/source changes are never migrated by this command.
Use --apply once; a second run is idempotent. This does not approve questions.
"""

import argparse
from hashlib import sha256
import json
from pathlib import Path

from emkohyo_portable_hash import text_sha256


ROOT = Path(__file__).resolve().parents[1]
REVIEW = ROOT / "data/exam-library/emkohyo-review"
PACKS = ROOT / "docs/evidence/emkohyo-choice-sources"
REPORT = PACKS / "portable-pin-migration-20260924.json"
REVIEW_PACKS = {
    "emkohyo-EM20251805-q01-03-review.json": "docs/evidence/emkohyo-2025-sources/EM20251805-q01-03.json",
    "emkohyo-EM20251805-q06-06-review.json": "docs/evidence/emkohyo-choice-sources/emkohyo-EM20251805-q06-10.json",
    "emkohyo-EM20251805-q07-07-review.json": "docs/evidence/emkohyo-choice-sources/emkohyo-EM20251805-q07-07.json",
    "emkohyo-EM20261804-q01-01-review.json": "docs/evidence/emkohyo-choice-sources/emkohyo-EM20261804-q01-01.json",
    "emkohyo-EM20261804-q04-04-review.json": "docs/evidence/emkohyo-choice-sources/emkohyo-EM20261804-q04-04.json",
}


def write(path: Path, value: dict) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()
    actions = []
    skipped = []
    source_raw_before = {name: sha256((ROOT / source_path).read_bytes()).hexdigest()
                         for name, source_path in REVIEW_PACKS.items()}
    for pack_file in sorted(PACKS.glob("emkohyo-*-q*.json")):
        pack = json.loads(pack_file.read_text(encoding="utf-8"))
        paper = pack.get("paperId", "")
        numbers = pack.get("range", [])
        if not paper.startswith("emkohyo-") or len(numbers) != 2 or "draftSha256" not in pack:
            continue
        first = numbers[0]
        batch_first = (first - 1) // 5 * 5 + 1
        draft_file = REVIEW / f"{paper}-q{batch_first:02}-{batch_first+4:02}-draft.json"
        if not draft_file.exists():
            skipped.append({"file": str(pack_file.relative_to(ROOT)), "why": "missing draft"})
            continue
        previous = pack["draftSha256"]
        canonical = text_sha256(draft_file)
        raw = sha256(draft_file.read_bytes()).hexdigest()
        if previous not in (canonical, raw):
            skipped.append({"file": str(pack_file.relative_to(ROOT)), "why": "draft content changed"})
            continue
        if previous == canonical:
            continue
        actions.append({"kind": "draft", "file": str(pack_file.relative_to(ROOT)),
                        "oldSha256": previous, "newSha256": canonical,
                        "verifiedOldRawSha256": raw})
        if args.apply:
            pack["draftSha256"] = canonical
            write(pack_file, pack)
    # Existing published PASS receipts were checked against the exact source
    # file listed here. Re-pin only if their old SHA matches those raw bytes.
    for name, source_path in REVIEW_PACKS.items():
        review_file = REVIEW / name
        review = json.loads(review_file.read_text(encoding="utf-8"))
        pack_file = ROOT / source_path
        old = review["sourcePackSha256"]
        raw = sha256(pack_file.read_bytes()).hexdigest()
        canonical = text_sha256(pack_file)
        if old not in (source_raw_before[name], canonical):
            raise ValueError(f"Source changed beyond newline or draft pin: {name}")
        if old == canonical and review.get("sourcePackPath") == source_path:
            continue
        actions.append({"kind": "review", "file": str(review_file.relative_to(ROOT)),
                        "sourcePackPath": source_path, "oldSha256": old,
                        "newSha256": canonical, "verifiedOldRawSha256": source_raw_before[name]})
        if args.apply:
            review["sourcePackPath"] = source_path
            review["sourcePackSha256"] = canonical
            write(review_file, review)
    result = {"applied": args.apply, "actions": actions, "skipped": skipped,
              "acceptance": "none; newline-only digest migration, no model review"}
    if args.apply:
        write(REPORT, result)
    print(json.dumps({"applied": args.apply, "actions": len(actions), "skipped": skipped},
                     ensure_ascii=False))


if __name__ == "__main__":
    main()
