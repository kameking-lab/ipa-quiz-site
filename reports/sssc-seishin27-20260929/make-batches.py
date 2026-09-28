"""Split the verbatim 第27回 精神保健福祉士 records into explanation batches.

Usage: py -3.12 reports/sssc-seishin27-20260929/make-batches.py
Writes explanations/<senmon|kyotsu>/batchN.json (12 questions each). The question
text is composed exactly as the published data (case + stem + notes) and is not edited.
Questions held by the 社会福祉士第37回 audit (hold.json origin "inherited-shakai37") are not
drafted; every hold.json entry stays out of the public data.
"""
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
KEYS = json.loads((HERE / "answer-keys.json").read_text(encoding="utf-8"))
HOLD = json.loads((HERE / "hold.json").read_text(encoding="utf-8"))
LABEL = {
    "senmon": "第27回（令和6年度）精神保健福祉士国家試験（専門科目）",
    "kyotsu": "第27回（令和6年度）精神保健福祉士国家試験（共通科目：社会福祉士第37回と同一の問題）",
}
SIZE = 12


def compose(q: dict) -> str:
    parts = [q["case"]] if q["case"] else []
    parts.append(q["stem"])
    parts.extend(q["notes"])
    return "\n".join(parts)


for session in ("senmon", "kyotsu"):
    source = json.loads((HERE / f"{session}-source-transcription.json").read_text(encoding="utf-8"))
    held = {int(n) for n, v in HOLD[session].items() if v["origin"] == "inherited-shakai37"}
    items = [
        {
            "number": q["number"],
            "subject": q["subject"],
            "question": compose(q),
            "choices": {str(i + 1): c for i, c in enumerate(q["choices"])},
            "officialAnswer": KEYS[session][str(q["number"])],
        }
        for q in source["questions"]
        if q["number"] not in held
    ]
    out = HERE / "explanations" / session
    out.mkdir(parents=True, exist_ok=True)
    for i in range(0, len(items), SIZE):
        batch = {"exam": LABEL[session], "session": session, "questions": items[i : i + SIZE]}
        path = out / f"batch{i // SIZE + 1}.json"
        path.write_text(json.dumps(batch, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(session, len(items), "questions,", (len(items) + SIZE - 1) // SIZE, "batches; held:", sorted(held))
