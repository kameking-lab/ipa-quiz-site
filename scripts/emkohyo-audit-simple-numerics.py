"""Recalculate four EM 2026 numeric items pinned to their official row images.

This proves the chosen numerical option only. The five separate reasons and
government-source review remain required before publication.
"""

from hashlib import sha256
import json
from math import sqrt
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PAPERS = ROOT / "data/exam-library/papers"
OUT = ROOT / "docs/evidence/emkohyo-choice-sources/EM2026-simple-calculation-spotchecks-20260924.json"


def main() -> None:
    specs = [
        {"id": "emkohyo-EM20261808-q19",
         "operands": ["100 µg", "1.00 L", "39.1", "52.0", "16.0"],
         "formula": "(100 ug/mL * 1000 mL / 1000 ug/mg) * (2*39.1+2*52.0+7*16.0)/(2*52.0)",
         "value": 100 * (2*39.1+2*52.0+7*16.0)/(2*52.0),
         "unit": "mg K2Cr2O7", "printedChoices": [93.5, 141, 187, 283, 374]},
        {"id": "emkohyo-EM20261805-q14",
         "operands": ["142 秒", "194 秒", "4 秒", "6 秒"],
         "formula": "2 * (194 s - 142 s) / (4 s + 6 s)",
         "value": 2*(194-142)/(4+6), "unit": "resolution",
         "printedChoices": [0.5, 1, 5, 10, 15]},
        {"id": "emkohyo-EM20261804-q14",
         "operands": ["2.0 × 10-５", "1.0 × 10-５", "50 ％"],
         "formula": "100 * sqrt(0.50) (Beer-Lambert: half concentration halves absorbance)",
         "value": 100*sqrt(0.5), "unit": "% transmittance",
         "printedChoices": [80, 70, 60, 40, 30]},
        {"id": "emkohyo-EM20261807-q6",
         "operands": ["5000", "9000", "同じ"],
         "formula": "sqrt(N_A / N_B) = sqrt(5000 / 9000), equal retention time",
         "value": sqrt(5000/9000), "unit": "W_B/W_A",
         "printedChoices": [0.38, 0.56, 0.75, 1.34, 1.80]},
    ]
    for spec in specs:
        paper = spec["id"].rsplit("-q", 1)[0]
        rows = json.loads((PAPERS / f"{paper}.json").read_text(encoding="utf-8"))
        row = next(item for item in rows if item["id"] == spec["id"])
        if any(operand not in row["text"] for operand in spec.pop("operands")):
            raise ValueError(f"Official operands changed: {spec['id']}")
        spec["nearestChoice"] = min(range(1, 6), key=lambda n: abs(spec["value"] - spec["printedChoices"][n-1]))
        spec["officialChoice"] = row["correctChoice"]
        if spec["nearestChoice"] != spec["officialChoice"]:
            raise ValueError(f"Arithmetic differs from official answer: {spec['id']}")
        spec["rowTextSha256"] = sha256(row["text"].encode("utf-8")).hexdigest()
        spec["officialImageSha256"] = {
            image: sha256((ROOT / "public" / image.lstrip("/")).read_bytes()).hexdigest()
            for image in row["images"]
        }
    OUT.write_text(json.dumps({"questions": specs,
                               "acceptance": "arithmetic only; direct five-choice government-source review pending"},
                              ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{OUT}: {len(specs)}/{len(specs)} numeric answers match official key")


if __name__ == "__main__":
    main()
