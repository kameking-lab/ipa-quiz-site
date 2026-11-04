"""Independent PDF-key extraction and pixel comparison. PDFs remain temporary."""
import argparse
import hashlib
import json
import re
from pathlib import Path

import fitz
import pdfplumber
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "data/qualification-staging/dokugeki-chiba"


def main():
    args = argparse.ArgumentParser()
    args.add_argument("--source-dir", type=Path, required=True)
    args.add_argument("--output", type=Path, required=True)
    options = args.parse_args()
    sources = json.loads((DEST / "sources.json").read_text(encoding="utf-8"))
    results, page_count, slot_count = [], 0, 0
    for source in sources["downloadedSources"]:
        path = options.source_dir / source["file"]
        assert hashlib.sha256(path.read_bytes()).hexdigest() == source["sha256"]
        if source["kind"] != "kaitou":
            continue
        answers = []
        with pdfplumber.open(path) as pdf:
            for page in pdf.pages:
                lines = [line for line in page.extract_text().splitlines() if line.strip()]
                for i, line in enumerate(lines):
                    labels = re.findall(r"\((\d+)\)", line)
                    if labels:
                        values = lines[i+1].split()
                        assert len(labels) == len(values)
                        for number, value in zip(labels, values):
                            assert int(number) == len(answers)+1
                            answers.append(int(value))
        rows = json.loads((DEST / f"{source['year']}-{source['track']}.json").read_text(encoding="utf-8"))
        assert len(rows) == len(answers) == 80
        assert [q["officialAnswerNumber"] for q in rows] == answers
        slot_count += len(rows)
        results.append({"year": source["year"], "track": source["track"], "answerKey": "".join(map(str,answers)), "matchedColumns": 80})
    for doc in [d for d in sources["downloadedSources"] if d["kind"] == "mondai"]:
        with fitz.open(options.source_dir / doc["file"]) as pdf:
            pages = [a for a in sources["assets"] if a["pdfUrl"] == doc["url"]]
            assert [a["pdfPage"] for a in pages] == list(range(3,len(pdf)+1))
            for asset in pages:
                pix = pdf[asset["pdfPage"]-1].get_pixmap(matrix=fitz.Matrix(1.8,1.8))
                expected = Image.frombytes("RGB", [pix.width,pix.height], pix.samples)
                with Image.open(ROOT / asset["path"]) as actual:
                    assert actual.size == expected.size
                    assert ImageChops.difference(actual.convert("RGB"), expected).getbbox() is None, asset["path"]
                page_count += 1
    output = {"checkedAt": "2026-11-04", "result": "PASS", "answerExtractor": "pdfplumber (independent of PyMuPDF ingester)", "editions": results,
              "matchedAnswerColumns": slot_count, "pixelIdenticalProblemPages": page_count,
              "imageCheck": "Every source problem page, full page at scale 1.8; exact RGB equality after lossless WebP decoding", "pdfsCommitted": False}
    options.output.parent.mkdir(parents=True, exist_ok=True)
    options.output.write_text(json.dumps(output, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
    print(f"PASS: {slot_count} answer columns, {page_count} pixel-identical full source pages")


if __name__ == "__main__":
    main()
