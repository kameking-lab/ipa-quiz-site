"""Crop the source-layout figures that PDF text extraction cannot preserve."""

from __future__ import annotations

import io
import json
from pathlib import Path

import fitz
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / ".cache" / "fp3-official"
OUTPUT = ROOT / "public" / "fp3"


def save(page: fitz.Page, clip: tuple[int, int, int, int], target: Path) -> dict:
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), clip=fitz.Rect(*clip), alpha=False)
    image = Image.open(io.BytesIO(pix.tobytes("png")))
    target.parent.mkdir(parents=True, exist_ok=True)
    image.save(target, "WEBP", quality=88, method=6)
    return {"url": "/" + str(target.relative_to(ROOT / "public")).replace("\\", "/"),
            "width": image.width, "height": image.height, "bytes": target.stat().st_size}


def main() -> None:
    academic = fitz.open(CACHE / "g3_202605_qa.pdf")
    practical = fitz.open(CACHE / "j3_202605_q.pdf")
    receipt = {
        "academic": {
            "52": save(academic[13], (85, 139, 305, 310), OUTPUT / "academic" / "202605" / "q52-diagram.webp"),
            "57": save(academic[15], (85, 149, 520, 287), OUTPUT / "academic" / "202605" / "q57-family.webp"),
        },
        "practical": {
            "2": save(practical[1], (53, 175, 545, 472), OUTPUT / "practical" / "202605" / "q02-table.webp"),
        },
    }
    (ROOT / "docs" / "evidence" / "fp3-2026-may" / "figure-crops.json").write_text(
        json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(json.dumps(receipt, ensure_ascii=False))


if __name__ == "__main__":
    main()
