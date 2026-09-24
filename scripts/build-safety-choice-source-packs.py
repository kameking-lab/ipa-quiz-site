"""Build reusable, byte-pinned government source hints from accepted choice overlays.

The pack is a retrieval aid, not a legal approval. Authors and independent reviewers
must still verify the cited clause/page against each question and examination date.
"""

import argparse
from collections import defaultdict
from datetime import date
from hashlib import sha256
import json
from pathlib import Path
import re
from urllib.parse import urlparse, urlunparse

import requests

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/exam-library"
PACKS = DATA / "source-packs"
CACHE = ROOT / ".cache/safety-choice-sources"
MAX_BYTES = 32 * 1024 * 1024
ARTICLE = re.compile(r"第[０-９0-9一二三四五六七八九十百千]+条(?:の[０-９0-9一二三四五六七八九十百千]+)?")
PAGE = re.compile(r"(?:PDF)?[０-９0-9]+頁")
GOV_ROOTS = (
    "e-gov.go.jp", "mhlw.go.jp", "mext.go.jp", "mlit.go.jp", "meti.go.jp",
    "maff.go.jp", "env.go.jp", "cao.go.jp", "nra.go.jp", "jma.go.jp",
    "jisc.go.jp", "fdma.go.jp", "npa.go.jp",
)


def government_url(value):
    try:
        parsed = urlparse(value)
        return (parsed.scheme == "https" and parsed.hostname is not None
                and any(parsed.hostname == root or parsed.hostname.endswith("." + root) for root in GOV_ROOTS)
                and not parsed.username and not parsed.password and parsed.port is None)
    except (TypeError, ValueError):
        return False


def retrieval_url(url):
    parsed = urlparse(url)
    route = parsed.path.split("/")
    if parsed.hostname == "laws.e-gov.go.jp" and len(route) >= 3 and route[1] == "law":
        law_id = route[2]
        revision = route[3] if len(route) > 3 and route[3] else None
        return f"https://laws.e-gov.go.jp/api/2/law_data/{law_id}{'_' + revision if revision else ''}"
    return urlunparse(parsed._replace(fragment=""))


def fetch_digest(url):
    target = retrieval_url(url)
    CACHE.mkdir(parents=True, exist_ok=True)
    cache = CACHE / f"{sha256(target.encode()).hexdigest()}.json"
    if cache.exists():
        saved = json.loads(cache.read_text(encoding="utf-8"))
        if saved["retrievalUrl"] == target:
            return saved
    with requests.get(target, timeout=60, stream=True) as response:
        response.raise_for_status()
        digest = sha256()
        total = 0
        for chunk in response.iter_content(1024 * 1024):
            total += len(chunk)
            if total > MAX_BYTES:
                raise ValueError(f"Source too large: {target}")
            digest.update(chunk)
        content_type = response.headers.get("Content-Type", "")
    if total < 300 or (target.startswith("https://laws.e-gov.go.jp/api/2/") and "json" not in content_type):
        raise ValueError(f"Source was not retrieved as substantive content: {target}")
    saved = {"retrievalUrl": target, "retrievedOn": date.today().isoformat(),
             "sha256": digest.hexdigest(), "bytes": total, "contentType": content_type}
    cache.write_text(json.dumps(saved, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return saved


def pack_path(subject):
    return PACKS / f"lckohyo-subject-{sha256(subject.encode()).hexdigest()[:12]}.json"


def build(subject, catalog, explanations):
    questions = {}
    for paper in catalog:
        if paper["group"] != "lckohyo" or paper["subject"] != subject or not paper["id"].startswith(("lckohyo-LC2025", "lckohyo-LC2026")):
            continue
        for question in json.loads((DATA / "papers" / f"{paper['id']}.json").read_text(encoding="utf-8")):
            questions[question["id"]] = question
    grouped = defaultdict(lambda: {"titles": set(), "questionIds": set()})
    for qid, overlay in explanations.items():
        if qid not in questions:
            continue
        for source in overlay["sources"]:
            url = source["url"]
            if not government_url(url):
                raise ValueError(f"Non-ministry source in accepted overlay: {qid} {url}")
            grouped[url]["titles"].add(source["title"])
            grouped[url]["questionIds"].add(qid)
    if not grouped:
        return None
    sources = []
    for url, reference in sorted(grouped.items(), key=lambda item: (-len(item[1]["questionIds"]), item[0])):
        titles = sorted(reference["titles"])
        locator = sorted(set(ARTICLE.findall(" ".join(titles)) + PAGE.findall(" ".join(titles))))
        sources.append({"url": url, "title": titles[0], "locators": locator,
                        "relevantQuestionIds": sorted(reference["questionIds"]),
                        "retrieval": fetch_digest(url)})
    result = {"subject": subject, "sourceCount": len(sources),
              "notice": "参照候補のみ。設問ごとの適用条文・出題時点・PDF頁を原本で再確認する。",
              "sources": sources}
    PACKS.mkdir(parents=True, exist_ok=True)
    path = pack_path(subject)
    path.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--subject", help="Exact catalog subject; omit for every subject with accepted overlays")
    args = parser.parse_args()
    catalog = json.loads((DATA / "official-catalog.json").read_text(encoding="utf-8"))
    explanations = json.loads((DATA / "choice-explanations.json").read_text(encoding="utf-8"))
    subjects = [args.subject] if args.subject else sorted({paper["subject"] for paper in catalog if paper["group"] == "lckohyo"})
    for subject in subjects:
        path = build(subject, catalog, explanations)
        if path:
            print(f"{subject}: {path}", flush=True)


if __name__ == "__main__":
    main()
