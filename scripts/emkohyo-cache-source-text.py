"""Cache full hash-pinned government source text for local question retrieval.

The cache is ignored by git and is never a publication receipt. A changed
upstream body is rejected until its subject pack is reviewed and repinned.
"""

from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
import json
from pathlib import Path

from bs4 import BeautifulSoup
import fitz
import requests


ROOT = Path(__file__).resolve().parents[1]
PACKS = ROOT / "docs/evidence/emkohyo-choice-sources/subject-packs"
CACHE = ROOT / "data/raw_pdfs/emkohyo-source-cache"


def fetch(source: dict) -> tuple[str, str]:
    target = CACHE / f"{source['sha256']}.json"
    if target.exists():
        return source["url"], "cached"
    response = requests.get(source["url"], timeout=90,
                            headers={"User-Agent": "QualificationStudySourceVerifier/1.0"})
    response.raise_for_status()
    digest = sha256(response.content).hexdigest()
    if digest != source["sha256"]:
        return source["url"], f"changed:{digest}"
    is_pdf = response.headers.get("Content-Type", "").startswith("application/pdf") or source["url"].split("?")[0].endswith(".pdf")
    if is_pdf:
        pages = [page.get_text() for page in fitz.open(stream=response.content, filetype="pdf")]
    else:
        soup = BeautifulSoup(response.content, "html.parser")
        for tag in soup(["script", "style", "nav", "footer"]):
            tag.decompose()
        pages = [soup.get_text(" ", strip=True)]
    target.write_text(json.dumps({"url": source["url"], "sha256": digest,
                                  "pages": pages}, ensure_ascii=False) + "\n", encoding="utf-8")
    return source["url"], f"ready:{sum(map(len, pages))}"


def main() -> None:
    CACHE.mkdir(parents=True, exist_ok=True)
    sources = {source["url"]: source for file in PACKS.glob("*.json")
               for source in json.loads(file.read_text(encoding="utf-8"))["sources"]}
    with ThreadPoolExecutor(max_workers=6) as pool:
        for url, result in pool.map(fetch, sources.values()):
            print(f"{url} {result}", flush=True)


if __name__ == "__main__":
    main()
