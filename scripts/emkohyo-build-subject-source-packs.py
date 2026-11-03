"""Build reusable, hash-pinned government evidence by EM subject.

Fetch each unique source only once. Packs are research inputs, never blanket
approval: a choice may cite a pack source only when its actual claim is found.
"""

from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
import json
from pathlib import Path
import re

from bs4 import BeautifulSoup
import fitz
import requests


ROOT = Path(__file__).resolve().parents[1]
REGISTRY = ROOT / "data/exam-library/emkohyo-review/subject-source-registry.json"
OUT = ROOT / "docs/evidence/emkohyo-choice-sources/subject-packs"


def fetch(url: str) -> dict:
    response = requests.get(url, timeout=90, headers={"User-Agent": "QualificationStudySourceVerifier/1.0"})
    response.raise_for_status()
    pdf = response.headers.get("Content-Type", "").startswith("application/pdf") or url.split("?")[0].endswith(".pdf")
    if pdf:
        pages = [page.get_text() for page in fitz.open(stream=response.content, filetype="pdf")]
    else:
        soup = BeautifulSoup(response.content, "html.parser")
        for tag in soup(["script", "style", "nav", "footer"]):
            tag.decompose()
        pages = [soup.get_text(" ", strip=True)]
    return {"url": url, "finalUrl": response.url, "status": response.status_code,
            "sha256": sha256(response.content).hexdigest(), "contentType": response.headers.get("Content-Type", ""),
            "pages": pages}


def excerpt(pages: list[str], keyword: str) -> list[dict]:
    found = []
    for page_no, page in enumerate(pages, 1):
        for match in list(re.finditer(re.escape(keyword), page))[:2]:
            context = " ".join(page[max(0, match.start()-90):match.end()+210].split())
            found.append({"pdfPage": page_no if len(pages) > 1 else None, "keyword": keyword,
                          "excerpt": context})
            if len(found) >= 2:
                return found
    return found


def main() -> None:
    registry = json.loads(REGISTRY.read_text(encoding="utf-8"))
    urls = sorted({source["url"] for sources in registry.values() for source in sources})
    with ThreadPoolExecutor(max_workers=6) as pool:
        fetched = dict(zip(urls, pool.map(fetch, urls)))
    OUT.mkdir(parents=True, exist_ok=True)
    for subject, sources in registry.items():
        records = []
        for source in sources:
            document = fetched[source["url"]]
            facts = [item for keyword in source["keywords"]
                     for item in excerpt(document["pages"], keyword)]
            records.append({"title": source["title"], "url": source["url"],
                            "finalUrl": document["finalUrl"], "status": document["status"],
                            "sha256": document["sha256"], "contentType": document["contentType"],
                            "pdfPages": len(document["pages"]) if len(document["pages"]) > 1 else None,
                            "facts": facts})
        target = OUT / f"{subject}.json"
        target.write_text(json.dumps({"subject": subject, "registrySha256": sha256(REGISTRY.read_bytes()).hexdigest(),
                                      "sources": records}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{subject}: {len(records)} sources, {sum(len(item['facts']) for item in records)} fact excerpts", flush=True)


if __name__ == "__main__":
    main()
