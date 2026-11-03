"""Fetch the fixed 2024-04-01 e-Gov law revisions used by Denken 3 law reviews.

Private raw JSON stays ignored; the manifest pins exact official bytes and revision IDs.
"""

from hashlib import sha256
import json
from pathlib import Path
from urllib.request import urlopen


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts/denken3-reference-manifest.json"


def main() -> None:
    for entry in json.loads(MANIFEST.read_text(encoding="utf-8")):
        if "localJson" not in entry:
            continue
        target = ROOT / entry["localJson"]
        if target.is_file():
            payload = target.read_bytes()
        else:
            api = f"https://laws.e-gov.go.jp/api/2/law_data/{entry['lawId']}?asof={entry['asof']}"
            payload = urlopen(api, timeout=30).read()
        if sha256(payload).hexdigest() != entry["sha256"]:
            raise ValueError(f"e-Gov snapshot bytes changed: {entry['lawId']}")
        snapshot = json.loads(payload)
        if (snapshot["law_info"]["law_id"] != entry["lawId"] or
                snapshot["revision_info"]["law_revision_id"] != entry["revisionId"]):
            raise ValueError(f"e-Gov revision mismatch: {entry['lawId']}")
        if not target.is_file():
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(payload)
        print(f"{entry['lawId']} {entry['revisionId']} SHA-256 verified")


if __name__ == "__main__":
    main()
