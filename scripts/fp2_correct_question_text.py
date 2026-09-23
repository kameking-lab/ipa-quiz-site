"""Remove verified PDF reading-order spillover from neighboring practical questions."""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "data/questions/fp2/practical-2024-2025.json"


def main() -> None:
    data = json.loads(PATH.read_text(encoding="utf-8"))
    q8 = data["202409"]["questions"][7]
    assert q8["number"] == 8
    # The official PDF puts Q7's vector diagram after Q8's word bank in the
    # extraction order. Q7's complete diagram is separately rendered as a crop.
    marker = "\n準住居地域\n(150m2)"
    if marker in q8["body"]:
        q8["body"] = q8["body"].split(marker, 1)[0].rstrip()
    assert q8["body"].endswith("9. 6分の1")
    january_q8 = data["202501"]["questions"][7]
    assert january_q8["number"] == 8
    january_marker = "\n第一種住居地域\n指定建蔽率"
    if january_marker in january_q8["body"]:
        january_q8["body"] = january_q8["body"].split(january_marker, 1)[0].rstrip()
    assert january_q8["body"].endswith("実質利回り(年利):3.69%")
    # A section preface on the next PDF page was appended to the preceding
    # coefficient/insurance question by text extraction. It is presented as
    # shared context with the questions in the following section instead.
    for edition, number in [
        ("202405", 28), ("202409", 29), ("202409", 35), ("202501", 28),
    ]:
        question = data[edition]["questions"][number - 1]
        assert question["number"] == number
        marker = "\n\n<設例>"
        if marker in question["body"]:
            question["body"] = question["body"].split(marker, 1)[0].rstrip()
    PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Neighboring-section OCR spillover removed; shared cases and source diagrams retained")


if __name__ == "__main__":
    main()
