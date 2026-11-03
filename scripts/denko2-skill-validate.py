"""Structural and provenance checks for the non-public 104-skill draft."""

import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = json.loads((ROOT / "scripts/denko2-skill-source-manifest.json").read_text(encoding="utf-8"))
RECORDS = json.loads((ROOT / "data/questions/denko2/skills-draft.json").read_text(encoding="utf-8"))


def main() -> None:
    source = {(paper["date"], problem["number"]): problem
              for paper in MANIFEST["papers"] for problem in paper["problems"]}
    if len(source) != 104 or len(RECORDS) != 104:
        raise ValueError("Expected 104 unique date×No. records")
    seen = set()
    image_paths = set()
    for item in RECORDS:
        key = (item["date"], item["number"])
        if key in seen or key not in source:
            raise ValueError(f"Duplicate/unexpected source: {key}")
        seen.add(key)
        original = source[key]
        for prefix in ("question", "answer"):
            if item[prefix + "PdfUrl"] != original[prefix + "Url"]:
                raise ValueError(f"Wrong source URL: {key}")
            if item[prefix + "PdfSha256"] != original[prefix + "Sha256"]:
                raise ValueError(f"Wrong source SHA: {key}")
        for field in ("instructionText", "materialsText", "conditionsText"):
            if len(item[field]) < 100:
                raise ValueError(f"Too little text: {key} {field}")
        if not item["diagramNotesText"].startswith("注："):
            raise ValueError(f"Missing diagram notes: {key}")
        if "作品は保護板" not in item["instructionText"]:
            raise ValueError(f"Truncated instruction: {key}")
        for field in ("diagramImage", "answerConceptImage", "answerWiringImage", "answerExampleImage"):
            url = item[field]
            if not url.startswith("/images/denko2/skill-draft/"):
                raise ValueError(f"Unexpected figure path: {key} {field}")
            path = ROOT / "public" / url.lstrip("/")
            if not path.is_file():
                raise ValueError(f"Missing figure: {path}")
            image_paths.add(path)
        if item["secondFigureImage"]:
            path = ROOT / "public" / item["secondFigureImage"].lstrip("/")
            if not path.is_file():
                raise ValueError(f"Missing second diagram: {key}")
            image_paths.add(path)
    if seen != set(source) or len(image_paths) < 221:
        raise ValueError(f"Incomplete coverage: {len(seen)} items, {len(image_paths)} images")
    for path in image_paths:
        with Image.open(path) as image:
            if image.width < 350 or image.height < 300:
                raise ValueError(f"Figure too small: {path} {image.size}")
    print(f"104 source rows, 104 complete text triplets, {len(image_paths)} image assets; visual answer QC remains separate")


if __name__ == "__main__":
    main()
