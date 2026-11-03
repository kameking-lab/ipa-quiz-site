"""Independently recalculate the displayed EA1/EA2 values in 2026 metal Q20."""

from hashlib import sha256
import json
from math import log10, sqrt
from pathlib import Path
from statistics import mean, stdev


ROOT = Path(__file__).resolve().parents[1]
PAPER = "emkohyo-EM20261803"
OUT = ROOT / "docs/evidence/emkohyo-choice-sources" / f"{PAPER}-q20-numeric-audit.json"


def main() -> None:
    rows = json.loads((ROOT / "data/exam-library/papers" / f"{PAPER}.json").read_text(encoding="utf-8"))
    row = next(item for item in rows if item["number"] == 20)
    if "√((log σ₁)² + (log σ_D)²)" not in row["text"]:
        raise ValueError("Official formula transcription changed")
    values = [5.0, 11.2, 6.6, 9.3, 4.3]
    logs = [log10(value) for value in values]
    average = mean(logs)
    total_sd = sqrt(stdev(logs) ** 2 + 0.084)
    ea1 = 10 ** (average + 1.645 * total_sd)
    ea2 = 10 ** (average + 1.151 * total_sd ** 2)
    if round(ea1, 1) != 24.6 or round(ea2, 1) != 9.2:
        raise ValueError(f"Displayed EA values differ: EA1={ea1}, EA2={ea2}")
    receipt = {"id": row["id"], "officialRowSha256": sha256(row["text"].encode()).hexdigest(),
               "aMeasurementPpm": values, "logMean": average,
               "logSampleStandardDeviation": stdev(logs), "dayVarianceAdjustment": 0.084,
               "ea1Ppm": ea1, "ea2Ppm": ea2, "displayedEa1Ppm": 24.6,
               "displayedEa2Ppm": 9.2, "officialChoice": row["correctChoice"],
               "acceptance": "none; this checks numeric values only, not choice reasons or legal classification"}
    OUT.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{OUT}: EA1={ea1:.4f}, EA2={ea2:.4f}")


if __name__ == "__main__":
    main()
