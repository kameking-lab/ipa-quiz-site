"""Retain both independent OCR passes and their differences (not canonical text)."""
from pathlib import Path
import difflib
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "reports/cq2-sokuryoshi/transcription"


def run():
    cache = Path(sys.argv[1])
    OUT.mkdir(parents=True, exist_ok=True)
    passes = []
    for scale in ["2", "2.5"]:
        documents = {}
        for folder in sorted((cache / f"ocr{scale}").iterdir()):
            if not folder.is_dir():
                continue
            pages = []
            for file in sorted(folder.glob("*.ocr.json")):
                raw = json.loads(file.read_text(encoding="utf-8-sig"))
                pages.append({"page": int(file.name.split(".")[0]),
                    "lines": [re.sub(r" +", "", line["text"]) for line in raw]})
            documents[folder.name] = pages
        data = {"engine": "Windows.Media.Ocr ja", "renderScale": float(scale),
            "canonical": False, "purpose": "independent OCR comparison only", "documents": documents}
        (OUT / f"pass-{scale}.json").write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        passes.append(documents)
    differences = []
    for doc_id, pages in passes[0].items():
        for a, b in zip(pages, passes[1][doc_id], strict=True):
            assert a["page"] == b["page"]
            diff = list(difflib.unified_diff(a["lines"], b["lines"], fromfile="scale-2", tofile="scale-2.5", lineterm=""))
            if diff:
                differences.append({"documentId":doc_id,"page":a["page"],"diff":diff,
                    "resolution":"Neither OCR pass is accepted as original text. Use the complete lossless original page, retained in source-manifest.json; no differing OCR glyph is substituted into canonical content."})
    (OUT / "comparison.json").write_text(json.dumps({"canonicalFormat":"lossless-original-page-images",
        "differentPageCount":len(differences),"differences":differences},ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print(f"Retained two OCR passes; {len(differences)} differing pages, canonical originals are unchanged images")


if __name__ == "__main__":
    run()
