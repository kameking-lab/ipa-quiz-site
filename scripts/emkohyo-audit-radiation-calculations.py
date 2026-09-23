"""Recalculate two 2025 radiation questions against the official answer key."""

from hashlib import sha256
import json
from math import sqrt
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PAPER = "emkohyo-EM20251809"
ROWS = ROOT / "data/exam-library/papers" / f"{PAPER}.json"
OUT = ROOT / "docs/evidence/emkohyo-choice-sources" / f"{PAPER}-numeric-audit.json"


def closest(value: float, choices: list[float]) -> int:
    return min(range(1, len(choices) + 1), key=lambda number: abs(choices[number-1] - value))


def main() -> None:
    rows = {row["number"]: row for row in json.loads(ROWS.read_text(encoding="utf-8"))}
    q8 = rows[8]
    q16 = rows[16]
    if "3√2σ" not in q8["text"] or "30分" not in q8["text"] or "150cpm" not in q8["text"]:
        raise ValueError("Q8 formula or operands changed; recalculate before accepting")
    if "48時間" not in q16["text"] or "半減期は８時間" not in q16["text"]:
        raise ValueError("Q16 decay interval changed; recalculate before accepting")
    # Background counts follow Poisson uncertainty. Both sample and background
    # are measured for 30 minutes, hence the problem's prescribed 3√2 factor.
    q8_bq = (3 * sqrt(2) * (sqrt(150 * 30) / 30)) / 60 / 0.10
    # Six half-lives pass in 48 h. Convert collected 1.1 L to 1100 cm³.
    q16_bq_per_cm3 = (3 * 2 ** (48 / 8)) / (1.1 * 1000)
    checks = [
        {"id": q8["id"], "officialRowSha256": sha256(q8["text"].encode()).hexdigest(),
         "formula": "3*sqrt(2)*sqrt(150*30)/30/60/0.10 Bq",
         "result": q8_bq, "choiceValues": [0.16, 0.86, 1.6, 8.6, 16.0],
         "computedChoice": closest(q8_bq, [0.16, 0.86, 1.6, 8.6, 16.0]),
         "officialChoice": q8["correctChoice"]},
        {"id": q16["id"], "officialRowSha256": sha256(q16["text"].encode()).hexdigest(),
         "formula": "3*2**(48/8)/(1.1*1000) Bq/cm3",
         "result": q16_bq_per_cm3, "choiceValues": [0.016, 0.019, 0.020, 0.17, 0.21],
         "computedChoice": closest(q16_bq_per_cm3, [0.016, 0.019, 0.020, 0.17, 0.21]),
         "officialChoice": q16["correctChoice"]},
    ]
    for check in checks:
        if check["computedChoice"] != check["officialChoice"]:
            raise ValueError(f"Independent calculation differs from official answer: {check['id']}")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"checks": checks, "passed": len(checks),
                               "acceptance": "none; per-choice explanation review remains required"},
                              ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{OUT}: {len(checks)}/{len(checks)} official choices match recalculation")


if __name__ == "__main__":
    main()
