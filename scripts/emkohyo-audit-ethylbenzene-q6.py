"""Pin the complete current MHLW solvent appendix and verify ethylbenzene is absent."""

import hashlib
import json
from pathlib import Path

from bs4 import BeautifulSoup
import requests

ROOT = Path(__file__).resolve().parents[1]
pack_path = ROOT / "docs/evidence/emkohyo-choice-sources/emkohyo-EM20261802-q06-06.json"
pack = json.loads(pack_path.read_text(encoding="utf-8"))
url = "https://www.mhlw.go.jp/web/t_doc?dataId=74002000"
pinned = next(source for source in pack["sources"] if source["url"] == url)
response = requests.get(url, timeout=60, headers={"User-Agent": "QualificationStudySourceVerifier/1.0"})
response.raise_for_status()
digest = hashlib.sha256(response.content).hexdigest()
if digest != pinned["sha256"]:
    raise ValueError("MHLW decree changed; regenerate the source pack before reviewing")
text = BeautifulSoup(response.content, "html.parser").get_text(" ", strip=True)
start = text.rfind("別表第六の二　有機溶剤")
end = text.find("別表第七", start)
if start < 0 or end < 0:
    raise ValueError("Solvent appendix boundaries were not found")
appendix = text[start:end]
if "一　アセトン" not in appendix or "四十七　メチル―ノルマル―ブチルケトン" not in appendix:
    raise ValueError("Solvent appendix is incomplete")
if "エチルベンゼン" in appendix:
    raise ValueError("Ethylbenzene appeared in the current solvent appendix")
pack["appendixNegativeCheck"] = {
    "url": url,
    "officialHtmlSha256": digest,
    "scope": "Full current 労働安全衛生法施行令別表第六の二 between the 別表第六の二 and 別表第七 headings",
    "startMarker": "一　アセトン",
    "lastRegisteredSolventMarker": "四十七　メチル―ノルマル―ブチルケトン",
    "searchedTerm": "エチルベンゼン",
    "termCount": 0,
    "inference": "Ethylbenzene is absent from the current appendix that defines fifth-category solvent substances; the MHLW registration guide separately places its analysis in third-category qualifications.",
}
pack_path.write_text(json.dumps(pack, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
