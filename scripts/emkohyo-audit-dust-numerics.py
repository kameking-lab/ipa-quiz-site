"""Check two EM dust calculations against their official rows and answer keys."""

from hashlib import sha256
import json
from math import pi
from pathlib import Path
from statistics import stdev


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs/evidence/emkohyo-choice-sources/EM-dust-calculation-spotchecks-20260924.json"


def main() -> None:
    records = [
        {"id": "emkohyo-EM20261806-q11", "requiredOperands": ["44.301mg", "44.306mg", "44.302mg"],
         "formula": "sample standard deviation of [44.301,44.306,44.302] mg (n-1 denominator)",
         "value": stdev([44.301, 44.306, 44.302]), "unit": "mg",
         "printedChoices": [.0017, .0020, .0023, .0026, .0029]},
        {"id": "emkohyo-EM20251806-q19", "requiredOperands": ["20mm", "1.26mg", "325cps", "6500cps", "1.20"],
         "formula": "(325/6500 mg/cm2)*pi*(20 mm/2 in cm)^2*1.20/1.26 mg*100",
         "value": (325/6500)*pi*1**2*1.20/1.26*100, "unit": "% cristobalite",
         "printedChoices": [9, 11, 13, 15, 17]},
    ]
    for record in records:
        paper = record["id"].rsplit("-q", 1)[0]
        rows = json.loads((ROOT / "data/exam-library/papers" / f"{paper}.json").read_text(encoding="utf-8"))
        row = next(x for x in rows if x["id"] == record["id"])
        if any(token not in row["text"] for token in record.pop("requiredOperands")):
            raise ValueError(f"Official dust operands changed: {record['id']}")
        record["nearestChoice"] = min(range(1, 6), key=lambda n: abs(record["value"] - record["printedChoices"][n-1]))
        record["officialChoice"] = row["correctChoice"]
        if record["nearestChoice"] != record["officialChoice"]:
            raise ValueError(f"Dust arithmetic differs from official key: {record['id']}")
        record["rowTextSha256"] = sha256(row["text"].encode("utf-8")).hexdigest()
        record["officialImageSha256"] = {
            image: sha256((ROOT / "public" / image.lstrip("/")).read_bytes()).hexdigest()
            for image in row["images"]
        }
    OUT.write_text(json.dumps({"questions": records,
                               "acceptance": "arithmetic only; direct five-choice government-source review pending"},
                              ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{OUT}: {len(records)}/{len(records)} numeric answers match official key")


if __name__ == "__main__":
    main()
