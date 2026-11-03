"""Reproduce exact crops of figures only, never full question/choice rows."""

import json
from hashlib import sha256
from pathlib import Path

import fitz
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SPEC = ROOT / "scripts/denko2-figure-crops.json"


def main() -> None:
    manifest = json.loads(SPEC.read_text(encoding="utf-8"))
    for item in manifest["crops"]:
        if "pdfFile" in item:
            pdf_path = ROOT / item["pdfFile"]
            if sha256(pdf_path.read_bytes()).hexdigest() != item["pdfSha256"]:
                raise ValueError(f"PDF SHA mismatch: {item['id']}")
            pdf = fitz.open(pdf_path)
            pixmap = pdf[item["pageIndex"]].get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
            image = Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)
        else:
            image = Image.open(ROOT / item["rowImage"])
        left, top, right, bottom = item["bounds"]
        if not (0 <= left < right <= image.width and 0 <= top < bottom <= image.height):
            raise ValueError(f"Crop outside row: {item['id']}")
        output = ROOT / item["output"]
        output.parent.mkdir(parents=True, exist_ok=True)
        image.crop((left, top, right, bottom)).save(output)
        print(f"{item['id']}: {output}")


if __name__ == "__main__":
    main()
