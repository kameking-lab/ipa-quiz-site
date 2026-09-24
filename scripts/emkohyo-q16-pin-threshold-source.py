"""Pin the visible ICRP threshold table in the ministry-hosted source page."""

from hashlib import sha256
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
pack = ROOT / "docs/evidence/emkohyo-choice-sources/emkohyo-EM20261801-q16-16.json"
image = ROOT / "docs/evidence/emkohyo-choice-sources/images/emkohyo-EM20261801-q16-env-threshold.png"
data = json.loads(pack.read_text(encoding="utf-8"))
source = next(s for s in data["sources"] if s["url"] == "https://www.env.go.jp/chemi/rhm/r1kisoshiryo/attach/r1kiso-slide03-03.pdf")
assert source["sha256"] == "fc51f4c66230ba0f44c82368a65f5a9410a6882c0beefbec63f239757c49cfeb"
data["sourcePageImages"] = [{
    "path": image.relative_to(ROOT).as_posix(),
    "sha256": sha256(image.read_bytes()).hexdigest(),
    "sourcePdfSha256": source["sha256"],
    "description": "環境省 放射線基礎資料・令和元年度版、PDF p.3。しきい線量表で一時的脱毛約4 Gy、白内障約0.5 Gy。",
}]
pack.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
