"""Pin government pages and check excerpts claimed by an EM draft batch.

The pack is evidence for review, not an approval receipt. Unmatched excerpts
remain explicit; URL reachability alone never proves a choice explanation.
"""

from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
import json
from pathlib import Path
import re
import sys

from bs4 import BeautifulSoup
import fitz
import requests

from emkohyo_portable_hash import text_sha256


ROOT = Path(__file__).resolve().parents[1]
REVIEW = ROOT / "data/exam-library/emkohyo-review"
OUT = ROOT / "docs/evidence/emkohyo-choice-sources"
SOURCE_PAGE_IMAGES = OUT / "source-page-images.json"
TEXT_CACHE = ROOT / "data/raw_pdfs/emkohyo-source-cache"


def normal(text: str) -> str:
    return re.sub(r"\s+", "", text).replace("−", "-").replace("－", "-")


def pinned_sources() -> dict:
    index = {}
    for file in (OUT / "subject-packs").glob("*.json"):
        data = json.loads(file.read_text(encoding="utf-8"))
        for source in data["sources"]:
            previous = index.get(source["url"])
            if previous and previous["sha256"] != source["sha256"]:
                raise ValueError(f"Conflicting pinned source: {source['url']}")
            index[source["url"]] = source
    law_pages = OUT / "mhlw-law-pages.json"
    if law_pages.exists():
        data = json.loads(law_pages.read_text(encoding="utf-8"))
        for source in data["pages"]:
            previous = index.get(source["url"])
            if previous and previous["sha256"] != source["sha256"]:
                raise ValueError(f"Conflicting pinned source: {source['url']}")
            index[source["url"]] = source
    science_index = OUT / "supplemental-science-sources.json"
    if science_index.exists():
        data = json.loads(science_index.read_text(encoding="utf-8"))
        for source in data["sources"]:
            previous = index.get(source["url"])
            digest = source["rawSha256"]
            if previous and previous["sha256"] != digest:
                raise ValueError(f"Conflicting pinned source: {source['url']}")
            index[source["url"]] = {**source, "sha256": digest}
    return index


def read_url(url: str, pinned: dict) -> dict:
    source = pinned.get(url)
    if source:
        cached_file = TEXT_CACHE / f"{source['sha256']}.json"
        if cached_file.exists():
            cached = json.loads(cached_file.read_text(encoding="utf-8"))
            if cached.get("url") != url or cached.get("sha256") != source["sha256"]:
                raise ValueError(f"Pinned text cache differs from source: {url}")
            pages = cached["pages"]
            text = "\n".join(pages)
            return {"url": url, "status": source.get("status", 200),
                    "finalUrl": source.get("finalUrl", url), "sha256": source["sha256"],
                    "contentType": source.get("contentType", "text/html"),
                    "pages": len(pages), "pageTexts": pages, "text": text,
                    "revisionInfo": None, "sourceMode": "sha-pinned-text-cache",
                    "cachedTextSha256": sha256(text.encode("utf-8")).hexdigest()}
    response = requests.get(url, timeout=60, headers={"User-Agent": "QualificationStudySourceVerifier/1.0"})
    response.raise_for_status()
    content_type = response.headers.get("Content-Type", "")
    is_pdf = content_type.startswith("application/pdf") or url.lower().split("?")[0].endswith(".pdf")
    revision = None
    if is_pdf:
        pdf = fitz.open(stream=response.content, filetype="pdf")
        pages = [page.get_text() for page in pdf]
        text = "\n".join(pages)
    elif content_type.startswith("application/json"):
        body = response.json()
        revision = body.get("revision_info")

        def law_text(node: object) -> str:
            if isinstance(node, str):
                return node
            if isinstance(node, dict):
                return " ".join(law_text(child) for child in node.get("children", []))
            return ""

        text = law_text(body["law_full_text"])
        pages = [text]
    else:
        soup = BeautifulSoup(response.content, "html.parser")
        for tag in soup(["script", "style", "nav", "footer"]):
            tag.decompose()
        text = soup.get_text(" ", strip=True)
        pages = [text]
    return {"url": url, "status": response.status_code, "finalUrl": response.url,
            "sha256": sha256(response.content).hexdigest(), "contentType": content_type,
            "pages": len(pages), "pageTexts": pages, "text": text,
            "revisionInfo": revision}


def main() -> None:
    paper, first, last = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
    batch_first = (first - 1) // 5 * 5 + 1
    if (last - 1) // 5 * 5 + 1 != batch_first:
        raise ValueError("Evidence pack must stay within one draft batch")
    target = OUT / f"{paper}-q{first:02}-{last:02}.json"
    if target.exists() and "--replace" not in sys.argv[4:]:
        raise FileExistsError(f"Existing source pack is immutable without --replace: {target}")
    file = REVIEW / f"{paper}-q{batch_first:02}-{batch_first+4:02}-draft.json"
    all_candidates = json.loads(file.read_text(encoding="utf-8"))["questions"]
    draft = {f"{paper}-q{n}": all_candidates[f"{paper}-q{n}"]
             for n in range(first, last + 1)}
    sources = {source["url"] for question in draft.values() for source in question["overlay"].get("sources", [])}
    evidence = [(id_, record) for id_, question in draft.items()
                for record in question.get("sourceEvidence", []) if isinstance(record, dict)]
    pinned = pinned_sources()
    with ThreadPoolExecutor(max_workers=6) as pool:
        fetched = {result["url"]: result for result in pool.map(lambda url: read_url(url, pinned), sorted(sources))}
    records = []
    for url, page in fetched.items():
        claims = []
        clean = normal(page.pop("text"))
        page_texts = [normal(value) for value in page.pop("pageTexts")]
        for id_, item in evidence:
            claim_url = item.get("url") or item.get("sourceUrl")
            if claim_url != url:
                continue
            excerpt = item.get("excerpt") or item.get("exactSourceExcerpt") or ""
            search = normal(excerpt)
            offset = clean.find(search) if search else -1
            source_page = next((index + 1 for index, value in enumerate(page_texts) if search and search in value), None)
            claims.append({"questionId": id_, "excerpt": excerpt,
                           "matched": offset >= 0, "pdfPage": source_page,
                           "context": clean[max(0, offset - 100):offset + len(search) + 100]
                           if offset >= 0 else ""})
        records.append({**page, "claimedExcerpts": claims})
    pack = {"paperId": paper, "range": [first, last], "draftSha256": text_sha256(file),
             "sources": records, "claimedExcerpts": len(evidence),
             "missingEvidenceQuestions": [id_ for id_, question in draft.items()
                                          if not question.get("sourceEvidence")],
             "unverifiedExcerpts": sum(not c["matched"] for p in records
                                       for c in p["claimedExcerpts"])}
    current_edition_checks = []
    for id_, question in draft.items():
        reference = question.get("independentCurrentEditionVerification")
        if not reference:
            continue
        response = requests.get(reference["url"], timeout=60)
        response.raise_for_status()
        digest = sha256(response.content).hexdigest()
        if digest != reference["sha256"]:
            raise ValueError(f"Current-edition reference changed: {id_}")
        pdf = fitz.open(stream=response.content, filetype="pdf")
        for check in reference["checks"]:
            page = check["pdfPage"]
            if not 1 <= page <= len(pdf) or normal(check["excerpt"]) not in normal(pdf[page - 1].get_text()):
                raise ValueError(f"Current-edition excerpt not found: {id_} p{page}")
        current_edition_checks.append({"questionId": id_, **reference, "verifiedSha256": digest})
    if current_edition_checks:
        pack["independentCurrentEditionChecks"] = current_edition_checks
    if SOURCE_PAGE_IMAGES.exists():
        image_map = json.loads(SOURCE_PAGE_IMAGES.read_text(encoding="utf-8"))
        key = f"{paper}-q{first:02}-{last:02}"
        images = image_map.get(key, [])
        for image in images:
            path = ROOT / image["path"]
            if sha256(path.read_bytes()).hexdigest() != image["sha256"]:
                raise ValueError(f"Source page image changed: {path}")
        if images:
            pack["sourcePageImages"] = images
    OUT.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(pack, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{target}: sources={len(records)}, claims={pack['claimedExcerpts']}, "
          f"missing={len(pack['missingEvidenceQuestions'])}, unmatched={pack['unverifiedExcerpts']}")


if __name__ == "__main__":
    main()
