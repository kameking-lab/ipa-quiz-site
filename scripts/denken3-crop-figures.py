"""Extract only diagram regions from a pinned official PDF using PDF coordinates.

The crop specifications are review inputs, not automatic acceptance. Rendered
outputs stay under the ignored raw-PDF tree until visually approved.
"""

from hashlib import sha256
import json
from pathlib import Path
import sys

import fitz


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts/denken3-source-manifest.json"
SPEC = ROOT / "scripts/denken3-figure-crops.json"
RAW = ROOT / "data/raw_pdfs/denken3"


def crop(item: dict, manifest: dict) -> Path:
    session = next(row for row in manifest["sessions"] if row["examDate"].replace("-", "") == item["examDate"])
    paper = next(row for row in session["subjects"] if row["subject"] == item["subject"])
    source = RAW / paper["url"].rsplit("/", 1)[-1]
    if sha256(source.read_bytes()).hexdigest() != paper["sha256"]:
        raise ValueError(f"Official source hash changed: {source}")
    document = fitz.open(source)
    page = document[item["pdfPage"] - 1]
    rect = fitz.Rect(item["rect"])
    if not page.rect.contains(rect):
        raise ValueError(f"Crop outside PDF page: {item['id']}")
    output = RAW / "review" / item["examDate"] / item["subject"] / "figures" / f"{item['id']}.png"
    output.parent.mkdir(parents=True, exist_ok=True)
    page.get_pixmap(matrix=fitz.Matrix(3, 3), clip=rect, alpha=False).save(output)
    return output


def main() -> None:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    specs = json.loads(SPEC.read_text(encoding="utf-8"))
    selected = set(sys.argv[1:])
    for item in specs:
        if selected and item["id"] not in selected:
            continue
        output = crop(item, manifest)
        print(f"{item['id']}: {output.relative_to(ROOT)}, sha256={sha256(output.read_bytes()).hexdigest()}", flush=True)


if __name__ == "__main__":
    main()
