"""Pin every page of paginated MHLW law texts used by EM explanations."""

from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
import json
from pathlib import Path
import re
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

from bs4 import BeautifulSoup
import requests


ROOT = Path(__file__).resolve().parents[1]
PACKS = ROOT / "docs/evidence/emkohyo-choice-sources/subject-packs"
CACHE = ROOT / "data/raw_pdfs/emkohyo-source-cache"
OUT = ROOT / "docs/evidence/emkohyo-choice-sources/mhlw-law-pages.json"
ADDITIONAL_LAWS = (
    ("有機溶剤中毒予防規則", "74090000", ("労働衛生関係法令", "有機溶剤")),
    ("特定化学物質障害予防規則", "74097000", ("労働衛生関係法令", "特定化学物質")),
    ("鉛中毒予防規則", "74094000", ("労働衛生関係法令", "金属類")),
    ("電離放射線障害防止規則", "74101000", ("労働衛生関係法令", "放射性物質")),
    ("粉じん障害防止規則", "74107000", ("労働衛生関係法令", "鉱物性粉じん")),
    ("酸素欠乏症等防止規則", "74105000", ("労働衛生関係法令", "労働衛生一般")),
    ("じん肺法", "74164000", ("労働衛生関係法令", "鉱物性粉じん")),
    ("労働安全衛生法施行令", "74002000", ("労働衛生関係法令",)),
)


def page_url(url: str, number: int) -> str:
    parsed = urlsplit(url)
    query = dict(parse_qsl(parsed.query))
    query["pageNo"] = str(number)
    return urlunsplit((parsed.scheme, parsed.netloc, parsed.path,
                       urlencode(query), parsed.fragment))


def fetch(job: tuple[str, str, int, int]) -> dict:
    title, base, number, total = job
    url = page_url(base, number)
    response = requests.get(url, timeout=90,
                            headers={"User-Agent": "QualificationStudySourceVerifier/1.0"})
    response.raise_for_status()
    soup = BeautifulSoup(response.content, "html.parser")
    for tag in soup(["script", "style", "nav", "footer"]):
        tag.decompose()
    text = soup.get_text(" ", strip=True)
    match = re.search(r"該当ページ数：\s*(\d+)\s*ページ中\s*(\d+)\s*ページ", text)
    if not match or (int(match.group(1)), int(match.group(2))) != (total, number):
        raise ValueError(f"Wrong law pagination: {url}")
    digest = sha256(response.content).hexdigest()
    CACHE.joinpath(f"{digest}.json").write_text(
        json.dumps({"url": url, "sha256": digest, "pages": [text]}, ensure_ascii=False) + "\n",
        encoding="utf-8")
    return {"title": title, "url": url, "sha256": digest,
            "pageNumber": number, "pageCount": total, "characters": len(text)}


def main() -> None:
    CACHE.mkdir(parents=True, exist_ok=True)
    first_pages = {}
    for file in PACKS.glob("*.json"):
        subject = json.loads(file.read_text(encoding="utf-8"))["subject"]
        for source in json.loads(file.read_text(encoding="utf-8"))["sources"]:
            if "www.mhlw.go.jp/web/t_doc?" not in source["url"] or "pageNo=1" not in source["url"]:
                continue
            entry = first_pages.setdefault(source["url"], {"source": source, "subjects": set()})
            entry["subjects"].add(subject)
    for title, data_id, subjects in ADDITIONAL_LAWS:
        url = f"https://www.mhlw.go.jp/web/t_doc?dataId={data_id}&dataType=0&pageNo=1"
        response = requests.get(url, timeout=90,
                                headers={"User-Agent": "QualificationStudySourceVerifier/1.0"})
        response.raise_for_status()
        soup = BeautifulSoup(response.content, "html.parser")
        for tag in soup(["script", "style", "nav", "footer"]):
            tag.decompose()
        text = soup.get_text(" ", strip=True)
        if f"○{title}" not in text:
            raise ValueError(f"Unexpected MHLW law title: {url}")
        digest = sha256(response.content).hexdigest()
        CACHE.joinpath(f"{digest}.json").write_text(
            json.dumps({"url": url, "sha256": digest, "pages": [text]}, ensure_ascii=False) + "\n",
            encoding="utf-8")
        entry = first_pages.setdefault(url, {"source": {"title": f"厚生労働省 {title}",
                                                   "url": url, "sha256": digest},
                                             "subjects": set()})
        entry["subjects"].update(subjects)
    jobs = []
    index = []
    for url, entry in first_pages.items():
        source = entry["source"]
        cached = CACHE / f"{source['sha256']}.json"
        text = json.loads(cached.read_text(encoding="utf-8"))["pages"][0]
        match = re.search(r"該当ページ数：\s*(\d+)\s*ページ中\s*1\s*ページ", text)
        total = int(match.group(1)) if match else 1
        index.append({"title": source["title"], "url": url,
                      "sha256": source["sha256"], "pageNumber": 1,
                      "pageCount": total, "characters": len(text),
                      "subjects": sorted(entry["subjects"])})
        jobs.extend((source["title"], url, number, total)
                    for number in range(2, total + 1))
    with ThreadPoolExecutor(max_workers=6) as pool:
        for job, result in zip(jobs, pool.map(fetch, jobs)):
            base = job[1]
            result["subjects"] = sorted(first_pages[base]["subjects"])
            index.append(result)
            print(f"{result['url']} {result['characters']} chars", flush=True)
    OUT.write_text(json.dumps({"pages": sorted(index, key=lambda item: item["url"])},
                              ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Pinned {len(index)} law pages", flush=True)


if __name__ == "__main__":
    main()
