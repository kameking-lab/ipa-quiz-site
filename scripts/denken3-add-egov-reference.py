"""Pin an as-of e-Gov law snapshot (API v2) as a Denken 3 official reference.

Usage: python scripts/denken3-add-egov-reference.py LAW_ID ASOF(YYYY-MM-DD) ARTICLE[,ARTICLE...] PURPOSE

Articles use e-Gov Num attributes (第28条の44 → 28_44). Re-running for the same
law/date only widens the article list; the pinned bytes must not change.
"""

from hashlib import sha256
import json
from pathlib import Path
import sys
from urllib.request import urlopen


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts/denken3-reference-manifest.json"


def main() -> None:
    if len(sys.argv) != 5:
        raise SystemExit(__doc__)
    law_id, asof, articles, purpose = sys.argv[1], sys.argv[2], sys.argv[3].split(","), sys.argv[4]
    compact = asof.replace("-", "")
    target = ROOT / f"data/raw_pdfs/denken3/review/egov/{law_id}-{compact}.json"
    if target.is_file():
        payload = target.read_bytes()
    else:
        payload = urlopen(f"https://laws.e-gov.go.jp/api/2/law_data/{law_id}?asof={asof}", timeout=60).read()
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(payload)
    snapshot = json.loads(payload)
    if snapshot["law_info"]["law_id"] != law_id:
        raise ValueError("e-Gov returned a different law")
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    import denken3_cli
    for number in articles:
        denken3_cli.egov_article(snapshot, number)  # every article must resolve exactly once
    entries = json.loads(MANIFEST.read_text(encoding="utf-8"))
    url = f"https://laws.e-gov.go.jp/law/{law_id}?occasion_date={compact}"
    entry = next((item for item in entries if item["url"] == url), None)
    digest = sha256(payload).hexdigest()
    if entry is None:
        entry = {"url": url, "localJson": target.relative_to(ROOT).as_posix(), "sha256": digest, "lawId": law_id,
                 "revisionId": snapshot["revision_info"]["law_revision_id"], "asof": asof, "articles": [],
                 "purpose": purpose}
        entries.append(entry)
    elif entry["sha256"] != digest:
        raise ValueError(f"Pinned e-Gov bytes changed: {url}")
    entry["articles"] = sorted(set(entry["articles"]) | set(articles), key=lambda value: [int(p) for p in value.split("_")])
    entry["purpose"] = purpose
    MANIFEST.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{url} {entry['revisionId']} articles={entry['articles']}")


if __name__ == "__main__":
    main()
