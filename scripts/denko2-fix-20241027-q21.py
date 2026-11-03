"""Disambiguate answer labels from Article 143 item labels in Q21."""

import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
path = root / "data/questions/denko2/reviewed/20241027-q21-25.json"
items = json.loads(path.read_text(encoding="utf-8"))
question = next(item for item in items if item["number"] == 21)

def disambiguate(value: str) -> str:
    value = re.sub(r"\(([イロハニホヘト])\)", r"(同号\1)", value)
    value = value.replace("(ロ、本問", "(同号ロ、本問")
    value = value.replace("イ〜トすべての条件", "同号イ〜トすべての条件")
    value = value.replace("(イ〜ト)", "(同号イ〜ト)")
    return value

question["explanation"] = disambiguate(question["explanation"])
question["choiceExplanations"] = {
    label: disambiguate(reason)
    for label, reason in question["choiceExplanations"].items()
}
path.write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("Q21 article labels disambiguated")
