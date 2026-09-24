"""Pin current bytes of named government pages (MHLW 法令等DB, guidance PDFs).

Input is a JSON list of {"url", "title"} on *.go.jp. Each page is fetched once,
its SHA-256 recorded, and a greppable text view cached. The pack notice says
the bytes are the text as retrieved, not a historical version: whether the
cited provision applied during the exam window must be judged per question
from the document's own amendment history. Writes one new immutable pack.
"""
import argparse
from datetime import date
from hashlib import sha256
import json
from pathlib import Path
import sys
import time
from urllib.parse import urlparse

import requests

sys.path.insert(0, str(Path(__file__).resolve().parent))
from egov_law_text import text_view  # noqa: E402
from safety_choice_review_gate import digest, government_url  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
HEADERS = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"}


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--sources", type=Path, required=True)
    ap.add_argument("--name", required=True)
    ap.add_argument("--notice", default="")
    args = ap.parse_args()
    wanted = json.loads(args.sources.read_text(encoding="utf-8"))
    cache_dir = ROOT / ".cache/safety-full-review/government-sources"
    cache_dir.mkdir(parents=True, exist_ok=True)
    sources = []
    for row in wanted:
        url = row["url"]
        if not government_url(url):
            raise SystemExit(f"Not a government URL: {url}")
        retrieval_url = urlparse(url)._replace(fragment="").geturl()
        response = None
        for attempt in range(4):
            # env.go.jp's CDN intermittently rejects non-browser user agents.
            response = requests.get(retrieval_url, timeout=120, headers=HEADERS)
            if response.status_code == 200:
                break
            time.sleep(2 ** attempt)
        response.raise_for_status()
        payload = response.content
        if len(payload) < 2000 or b"[ERR-WEB-" in payload[:5000]:
            raise SystemExit(f"Not substantive: {url}")
        content_type = response.headers.get("Content-Type", "application/octet-stream")
        suffix = ".pdf" if "pdf" in content_type.lower() else ".html"
        digest_value = sha256(payload).hexdigest()
        cache = cache_dir / f"{digest_value}{suffix}"
        cache.write_bytes(payload)
        if not text_view(cache):
            raise SystemExit(f"No readable text: {url}")
        sources.append({"url": url, "title": row["title"], "locators": row.get("locators", []),
                        "relevantQuestionIds": row.get("relevantQuestionIds", []),
                        "retrieval": {"retrievalUrl": retrieval_url,
                                      "retrievedOn": date.today().isoformat(),
                                      "sha256": digest_value, "bytes": len(payload),
                                      "contentType": content_type}})
    value = {"schemaVersion": 1, "group": "lckohyo", "name": args.name,
             "retrievedOn": date.today().isoformat(),
             "notice": ("Current text as retrieved, not a dated historical version. "
                        "Applicability during each exam window must be judged per question "
                        "from the document's amendment history. " + args.notice).strip(),
             "sources": sources}
    token = digest({"urls": sorted(r["url"] for r in wanted), "name": args.name})[:16]
    path = ROOT / f"docs/evidence/lckohyo-current-source-pins/{token}.json"
    if path.exists():
        raise SystemExit(f"Pack already exists; packs are immutable: {path}")
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"path": str(path.relative_to(ROOT)), "sources": len(sources)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
