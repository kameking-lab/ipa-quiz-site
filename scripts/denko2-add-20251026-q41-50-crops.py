"""Specify the 40 answer-panel photographs/diagrams without question prose."""

import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
spec = ROOT / "scripts/denko2-figure-crops.json"
data = json.loads(spec.read_text(encoding="utf-8"))
present = {item["id"] for item in data["crops"]}
horizontal = [(315, 523), (534, 747), (754, 967), (975, 1185)]
for number in range(41, 51):
    row = f"data/raw_pdfs/denko2/review/20251026/q{number:02}.png"
    height = Image.open(ROOT / row).height
    for choice, (left, right) in zip(("i", "ro", "ha", "ni"), horizontal):
        identifier = f"2025-second-q{number}-{choice}"
        if identifier in present:
            continue
        data["crops"].append({
            "id": identifier,
            "rowImage": row,
            "bounds": [left, 18, right, height - 8],
            "output": f"public/images/denko2/2025-second/q{number}-{choice}.png",
        })
spec.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("Specified Q41–50 four figure-only panels each")
