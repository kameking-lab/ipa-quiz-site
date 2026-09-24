"""Pin every published 2024/2025 second-class electrician skills paper.

The PDFs are cached outside Git. This script only verifies the public source
inventory; it does not transcribe or release skills lessons.
"""

from concurrent.futures import ThreadPoolExecutor, as_completed
from hashlib import sha256
import json
from pathlib import Path
import re
from urllib.parse import urljoin

from bs4 import BeautifulSoup
import requests


ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / "data/raw_pdfs/denko2/skill"
OUTPUT = ROOT / "scripts/denko2-skill-source-manifest.json"
BASE = "https://www.shiken.or.jp"
DEFECT_PDF = f"{BASE}/construction/upload/handankizyun2017.pdf"
PAPERS = [
    ("2024-07-20", 2024, "first", "saturday", "000197"),
    ("2024-07-21", 2024, "first", "sunday", "000195"),
    ("2024-12-14", 2024, "second", "saturday", "000482"),
    ("2024-12-15", 2024, "second", "sunday", "000481"),
    ("2025-07-19", 2025, "first", "saturday", "000545"),
    ("2025-07-20", 2025, "first", "sunday", "000546"),
    ("2025-12-13", 2025, "second", "saturday", "000596"),
    ("2025-12-14", 2025, "second", "sunday", "000598"),
]


def fetch(url: str) -> bytes:
    response = requests.get(url, timeout=45)
    response.raise_for_status()
    return response.content


def hash_pdf(url: str) -> str:
    path = CACHE / Path(url).name
    if not path.exists():
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(fetch(url))
    content = path.read_bytes()
    if not content.startswith(b"%PDF"):
        raise ValueError(f"Not PDF: {url}")
    return sha256(content).hexdigest()


def paper_inventory(date: str, year: int, season: str, day: str, page_id: str) -> dict:
    source_page = f"{BASE}/construction/second/qa/detail/{page_id}.html"
    soup = BeautifulSoup(fetch(source_page), "html.parser")
    section = soup.select_one("section.mtEditor")
    if section is None:
        raise ValueError(f"Missing exam section: {source_page}")
    items = []
    for heading in section.find_all("h3"):
        match = re.fullmatch(r"公表問題No\.\s*(\d+)", heading.get_text(" ", strip=True))
        if not match:
            continue
        number = int(match.group(1))
        links = heading.find_next_sibling("p").find_all("a")
        urls = {link.get_text(" ", strip=True): urljoin(BASE, link["href"]) for link in links}
        if "試験問題" not in urls or "解答" not in urls:
            raise ValueError(f"Missing problem or answer for {source_page} No.{number}")
        items.append({"number": number, "questionUrl": urls["試験問題"], "answerUrl": urls["解答"]})
    if [item["number"] for item in items] != list(range(1, 14)):
        raise ValueError(f"Expected No.1–13 once each: {source_page}")
    candidate = next((urljoin(BASE, a["href"]) for a in section.find_all("a") if "候補問題" in a.get_text()), None)
    defect = next((urljoin(BASE, a["href"]) for a in section.find_all("a") if "欠陥の判断基準" in a.get_text()), None)
    return {
        "date": date, "year": year, "season": season, "day": day,
        "sourcePage": source_page, "expectedPublishedProblems": 13,
        "candidateProblemsUrl": candidate, "defectCriteriaUrl": defect,
        "problems": items,
    }


def main() -> None:
    papers = [paper_inventory(*args) for args in PAPERS]
    urls = {url for paper in papers for item in paper["problems"] for url in (item["questionUrl"], item["answerUrl"])}
    urls.update(paper["candidateProblemsUrl"] for paper in papers if paper["candidateProblemsUrl"])
    urls.add(DEFECT_PDF)
    with ThreadPoolExecutor(max_workers=4) as pool:
        futures = {pool.submit(hash_pdf, url): url for url in sorted(urls)}
        hashes = {futures[future]: future.result() for future in as_completed(futures)}
    for paper in papers:
        paper["candidateProblemsSha256"] = hashes[paper["candidateProblemsUrl"]] if paper["candidateProblemsUrl"] else None
        for item in paper["problems"]:
            item["questionSha256"] = hashes[item["questionUrl"]]
            item["answerSha256"] = hashes[item["answerUrl"]]
    manifest = {
        "schemaVersion": 1,
        "sourceIndex": f"{BASE}/construction/second/qa/",
        "reuseTerms": f"{BASE}/shiken/faq/faq08/000082.html",
        "requiredYears": [2024, 2025],
        "expectedExamDays": 8,
        "expectedPublishedProblems": 104,
        "defectCriteriaPdfUrl": DEFECT_PDF,
        "defectCriteriaPdfSha256": hashes[DEFECT_PDF],
        "papers": papers,
    }
    OUTPUT.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Verified {len(papers)} exam days, {sum(len(p['problems']) for p in papers)} problems, {len(urls)} PDF files -> {OUTPUT}")


if __name__ == "__main__":
    main()
