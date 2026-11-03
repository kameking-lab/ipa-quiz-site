"""Pin government SDS facts used for the first 2025 organic-solvent questions."""

from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
import json
from pathlib import Path
import requests
from bs4 import BeautifulSoup


ROOT = Path(__file__).resolve().parents[1]
DRAFT = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20251805-q01-05-draft.json"
OUT = ROOT / "docs/evidence/emkohyo-2025-sources/EM20251805-q01-03.json"


def fetch(source: dict) -> dict:
    response = requests.get(source["url"], timeout=20)
    response.raise_for_status()
    if response.url != source["url"]:
        raise ValueError(f"Unexpected redirect: {source['url']} -> {response.url}")
    soup = BeautifulSoup(response.content, "html.parser")
    rows = []
    for tr in soup.find_all("tr"):
        value = tr.get_text(" ", strip=True)
        if value.startswith(("分子式", "融点・", "沸点、", "蒸気圧", "物理的状態", "形状")):
            rows.append(value[:400])
    return {"title": source["title"], "url": source["url"],
            "pageSha256": sha256(response.content).hexdigest(), "facts": rows}


def main() -> None:
    draft = json.loads(DRAFT.read_text(encoding="utf-8"))["questions"]
    sources = {source["url"]: source for key in list(draft)[:3] for source in draft[key]["overlay"]["sources"]}
    with ThreadPoolExecutor(max_workers=8) as pool:
        records = list(pool.map(fetch, sources.values()))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"paperId": "emkohyo-EM20251805", "questions": list(draft)[:3],
                               "governmentSds": records}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Pinned {len(records)} government SDS pages: {OUT}")


if __name__ == "__main__":
    main()
