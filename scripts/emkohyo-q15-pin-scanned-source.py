"""Attach an independently viewed excerpt from the scanned JAEA-hosted PNC report."""

from hashlib import sha256
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
pack = ROOT / "docs/evidence/emkohyo-choice-sources/emkohyo-EM20261804-q15-15.json"
image = ROOT / "docs/evidence/emkohyo-choice-sources/images/emkohyo-EM20261804-q15-jaea-p23.png"
image_relative = image.relative_to(ROOT).as_posix()
image_sha = sha256(image.read_bytes()).hexdigest()
pdf_sha = "c6db56fb767cdfb4948d3f66b23d7e667a8aa9bce1e14183ac27a0bf33513f91"
visual_text = "熱解離した原子は大部分基底状態にあるが，一部は励起されたり，イオン化されたりする"
data = json.loads(pack.read_text(encoding="utf-8"))
data["sourcePageImages"] = [{
    "path": image_relative,
    "sha256": image_sha,
    "description": "動燃 PNC-TN841-71-36 PDF p.23 §3-5。炎中で熱解離した原子の大部分は基底状態。JAEA公開。",
    "sourcePdfSha256": pdf_sha,
    "visualExcerpt": visual_text,
    "verificationMethod": "official-page-image-visual-transcription; not machine-text-extraction",
}]
for source in data["sources"]:
    if source["url"] == "https://jopss.jaea.go.jp/pdfdata/PNC-TN841-71-36.pdf":
        assert source["sha256"] == pdf_sha
        source["claimedExcerpts"] = [{
            "questionId": "emkohyo-EM20261804-q15",
            "excerpt": visual_text,
            "matched": True,
            "matchMethod": "visual-original-page-image",
            "pdfPage": 23,
            "context": f"{image_relative} SHA256={image_sha}; PDF SHA256={pdf_sha}; scanned, not OCR-matched",
        }]
        break
else:
    raise ValueError("JAEA source missing")
pack.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
