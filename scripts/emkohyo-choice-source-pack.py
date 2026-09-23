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


def normal(text: str) -> str:
    return re.sub(r"\s+", "", text).replace("−", "-").replace("－", "-")


def read_url(url: str) -> dict:
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
    file = REVIEW / f"{paper}-q{batch_first:02}-{batch_first+4:02}-draft.json"
    all_candidates = json.loads(file.read_text(encoding="utf-8"))["questions"]
    draft = {f"{paper}-q{n}": all_candidates[f"{paper}-q{n}"]
             for n in range(first, last + 1)}
    sources = {source["url"] for question in draft.values() for source in question["overlay"].get("sources", [])}
    evidence = [(id_, record) for id_, question in draft.items()
                for record in question.get("sourceEvidence", []) if isinstance(record, dict)]
    with ThreadPoolExecutor(max_workers=6) as pool:
        fetched = {result["url"]: result for result in pool.map(read_url, sorted(sources))}
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
    OUT.mkdir(parents=True, exist_ok=True)
    target = OUT / f"{paper}-q{first:02}-{last:02}.json"
    target.write_text(json.dumps(pack, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{target}: sources={len(records)}, claims={pack['claimedExcerpts']}, "
          f"missing={len(pack['missingEvidenceQuestions'])}, unmatched={pack['unverifiedExcerpts']}")


if __name__ == "__main__":
    main()
