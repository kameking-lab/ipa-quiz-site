"""Pin e-Gov API v2 statute bytes in force at both ends of lckohyo exam windows.

The association states that the 2025-10 publication was examined 2025-01..06,
the 2026-04 publication 2025-07..12 (special boiler: 2024-10 and 2025-10).
For every law and every window boundary this resolves the revision in force via
`asof`, then fetches the immutable revision endpoint and records its SHA-256.
The display URL is that revision's e-Gov page; the retrieval URL is the API text.
Writes one new immutable pack; never edits existing packs or receipts.
"""
import argparse
from datetime import date
from hashlib import sha256
import json
from pathlib import Path
import sys

import requests

sys.path.insert(0, str(Path(__file__).resolve().parent))
from egov_law_text import text_view  # noqa: E402
from safety_choice_review_gate import digest  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
API = "https://laws.e-gov.go.jp/api/2/law_data/"
WINDOWS = {
    "2025-10": ("2025-01-01", "2025-06-30"),
    "2026-04": ("2025-07-01", "2025-12-31"),
    "special-2025-04": ("2024-10-01", "2024-10-31"),
    "special-2026-04": ("2025-10-01", "2025-10-31"),
}


def fetch(url):
    response = requests.get(url, timeout=120)
    response.raise_for_status()
    return response


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--laws", required=True, help="Comma-separated e-Gov law IDs")
    ap.add_argument("--windows", default="2025-10,2026-04")
    ap.add_argument("--name", required=True, help="Short label stored in the pack")
    args = ap.parse_args()
    laws = [x.strip() for x in args.laws.split(",") if x.strip()]
    windows = [w.strip() for w in args.windows.split(",") if w.strip()]
    revisions = {}
    for law_id in laws:
        for window in windows:
            for boundary in WINDOWS[window]:
                meta = fetch(f"{API}{law_id}?asof={boundary}&response_format=json"
                             "&law_full_text_format=json&omit_amendment_suppl_provision=true").json()
                rev = meta["revision_info"]
                row = revisions.setdefault(rev["law_revision_id"], {
                    "lawId": law_id, "title": rev["law_title"],
                    "enforced": rev.get("amendment_enforcement_date"), "inForceOn": []})
                row["inForceOn"].append(boundary)
    sources = []
    cache_dir = ROOT / ".cache/safety-full-review/government-sources"
    cache_dir.mkdir(parents=True, exist_ok=True)
    for revision_id, row in sorted(revisions.items()):
        retrieval_url = API + revision_id
        response = fetch(retrieval_url)
        payload = response.content
        data = json.loads(payload)
        if data["revision_info"]["law_revision_id"] != revision_id or len(payload) < 3000:
            raise SystemExit(f"Unexpected revision payload: {retrieval_url}")
        digest_value = sha256(payload).hexdigest()
        cache = cache_dir / f"{digest_value}.json"
        cache.write_bytes(payload)
        text_view(cache)
        law_id, suffix = revision_id.split("_", 1)
        enforced = row["enforced"] or "制定時"
        sources.append({
            "url": f"https://laws.e-gov.go.jp/law/{law_id}/{suffix}",
            "title": f"e-Gov法令検索 {row['title']}（{enforced}施行版）",
            "locators": [],
            "relevantQuestionIds": [],
            "inForceOn": sorted(set(row["inForceOn"])),
            "retrieval": {"retrievalUrl": retrieval_url, "retrievedOn": date.today().isoformat(),
                          "sha256": digest_value, "bytes": len(payload),
                          "contentType": response.headers.get("Content-Type", "application/json")},
        })
    value = {"schemaVersion": 1, "group": "lckohyo", "name": args.name,
             "retrievedOn": date.today().isoformat(),
             "windows": {w: WINDOWS[w] for w in windows},
             "notice": ("Statute revisions in force at each exam-window boundary, pinned from the "
                        "e-Gov API. Applicability of a specific article must still be checked "
                        "per question; no reuse or PASS is implied."),
             "sources": sources}
    token = digest({"laws": sorted(laws), "windows": windows, "name": args.name})[:16]
    path = ROOT / f"docs/evidence/lckohyo-current-source-pins/{token}.json"
    if path.exists():
        raise SystemExit(f"Pack already exists; packs are immutable: {path}")
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"path": str(path.relative_to(ROOT)), "revisions": len(sources)},
                     ensure_ascii=False))


if __name__ == "__main__":
    main()
