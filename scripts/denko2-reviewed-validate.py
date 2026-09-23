"""Structural gate for human-reviewed electrician question drafts.

Passing this does not replace visual comparison with the official row image.
"""

import json
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
REVIEWED = ROOT / "data/questions/denko2/reviewed"
RAW = ROOT / "data/raw_pdfs/denko2/review/batches"
LABELS = {"イ", "ロ", "ハ", "ニ"}


def source_items() -> dict[tuple[str, int], dict]:
    result = {}
    for path in RAW.glob("*-q??-??.json"):
        batch = json.loads(path.read_text(encoding="utf-8"))
        paper = path.name[:8]
        for item in batch["questions"]:
            result[(paper, item["number"])] = item
    return result


def main() -> None:
    sources = source_items()
    seen = set()
    count = 0
    for path in sorted(REVIEWED.glob("*.json")):
        paper = path.name[:8]
        questions = json.loads(path.read_text(encoding="utf-8"))
        for item in questions:
            number = item["number"]
            key = (paper, number)
            if key in seen or key not in sources:
                raise ValueError(f"Duplicate/unknown reviewed question: {key}")
            seen.add(key)
            if item["officialAnswer"] != sources[key]["officialAnswer"]:
                raise ValueError(f"Wrong official answer: {key}")
            if set(item.get("choices", {})) != LABELS or set(item.get("choiceExplanations", {})) != LABELS:
                raise ValueError(f"Missing choice/explanation: {key}")
            if not item.get("question") or not item.get("explanation"):
                raise ValueError(f"Missing question/explanation: {key}")
            if any(not text for text in item["choices"].values()) or any(not text for text in item["choiceExplanations"].values()):
                raise ValueError(f"Empty choice/explanation: {key}")
            if item.get("uncertainty"):
                raise ValueError(f"Unresolved uncertainty: {key}")
            if item.get("reviewedFromCrop") != sources[key]["reviewCrop"]:
                raise ValueError(f"Wrong original review crop: {key}")
            for image_url in item.get("imageUrls", []):
                if not image_url.startswith("/images/denko2/") or not (ROOT / "public" / image_url.lstrip("/")).is_file():
                    raise ValueError(f"Missing/unsafe diagram path: {key} {image_url}")
            choice_images = item.get("choiceImageUrls", {})
            if not set(choice_images).issubset(LABELS):
                raise ValueError(f"Unknown choice diagram label: {key}")
            for image_url in choice_images.values():
                if not image_url.startswith("/images/denko2/") or not (ROOT / "public" / image_url.lstrip("/")).is_file():
                    raise ValueError(f"Missing/unsafe choice diagram: {key} {image_url}")
            for source_url in item.get("officialReferenceUrls", []):
                host = urlparse(source_url).hostname or ""
                if not (host == "e-gov.go.jp" or host.endswith(".e-gov.go.jp") or
                        host == "meti.go.jp" or host.endswith(".meti.go.jp") or
                        host == "mlit.go.jp" or host.endswith(".mlit.go.jp")):
                    raise ValueError(f"Non-government explanation source: {key} {source_url}")
            count += 1
    print(f"Structurally reviewed {count} questions and {count * 4} choices; original visual QC is separately receipted")


if __name__ == "__main__":
    main()
