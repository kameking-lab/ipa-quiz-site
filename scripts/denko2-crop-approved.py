"""Reproduce exact crops of figures only, never full question/choice rows."""

import json
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SPEC = ROOT / "scripts/denko2-figure-crops.json"


def main() -> None:
    manifest = json.loads(SPEC.read_text(encoding="utf-8"))
    for item in manifest["crops"]:
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
