"""Reproduce the negative-text check against the entire pinned MHLW rule."""

import hashlib
import json
from pathlib import Path

from bs4 import BeautifulSoup
import requests

ROOT = Path(__file__).resolve().parents[1]
pack_path = ROOT / "docs/evidence/emkohyo-choice-sources/emkohyo-EM20261802-q08-08.json"
pack = json.loads(pack_path.read_text(encoding="utf-8"))
url = "https://www.mhlw.go.jp/web/t_doc?d=&dataId=74099000"
pinned = next(source for source in pack["sources"] if source["url"] == url)
response = requests.get(url, timeout=60, headers={"User-Agent": "QualificationStudySourceVerifier/1.0"})
response.raise_for_status()
digest = hashlib.sha256(response.content).hexdigest()
if digest != pinned["sha256"]:
    raise ValueError("The MHLW rule changed; regenerate and re-review the source pack")
text = BeautifulSoup(response.content, "html.parser").get_text(" ", strip=True)
required = ("第十五条", "第十七条", "第二十二条", "第二十条の二")
if any(term not in text for term in required):
    raise ValueError("The retrieved text is not the full high-pressure regulation")
absent = ("気温", "湿度")
counts = {term: text.count(term) for term in absent}
if any(counts.values()):
    raise ValueError("Temperature or humidity appeared in the pinned full regulation")
pack["fullTextNegativeCheck"] = {
    "url": url,
    "officialHtmlSha256": digest,
    "method": "Parse the entire official MHLW rule HTML as text and count exact Japanese terms, including all chapters and appendices.",
    "sectionsConfirmedPresent": list(required),
    "termCounts": counts,
    "inference": "The full high-pressure rule contains neither 気温 nor 湿度, so it cannot impose the Q8 choice 4 duty to measure both before work.",
}
pack_path.write_text(json.dumps(pack, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
