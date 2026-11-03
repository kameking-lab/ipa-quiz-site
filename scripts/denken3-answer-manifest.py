"""Read answer labels and scoring units from the four official answer PDFs."""

import json
from pathlib import Path
import re
import unicodedata

import fitz


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts/denken3-source-manifest.json"
CACHE = ROOT / "data/raw_pdfs/denken3"
SUBJECTS = ("theory", "power", "machinery", "law")
BOUNDARIES = (60, 180, 300, 425, 560)
LABEL = re.compile(r"^問\s*(\d{1,2})(?:\(([ab])\))?$")
PART_ONLY = re.compile(r"^\(([ab])\)$")


def parse_answer_pdf(filename: str) -> dict[str, list[dict]]:
    page = fitz.open(CACHE / filename)[0]
    words = page.get_text("words")
    records: dict[str, list[dict]] = {subject: [] for subject in SUBJECTS}
    for column, subject in enumerate(SUBJECTS):
        left, right = BOUNDARIES[column:column + 2]
        subset = [word for word in words if left <= word[0] < right]
        previous_a = None
        for word in sorted(subset, key=lambda item: (item[1], item[0])):
            label = unicodedata.normalize("NFKC", word[4]).replace(" ", "")
            match = LABEL.fullmatch(label)
            lone = PART_ONLY.fullmatch(label)
            if not match and not lone:
                continue
            number = int(match[1]) if match else None
            part = match[2] if match else lone[1]
            if part == "a":
                previous_a = number
            elif part == "b" and previous_a is not None:
                # Some older answer PDFs have (b) visually but a malformed
                # hidden text layer reading "問16(b)" on the preceding Q15 row.
                number = previous_a
            if number is None:
                raise ValueError(f"Orphan answer part: {filename} {subject} {label}")
            y = word[1]
            same_line = sorted((other for other in subset if other[0] > word[2] and abs(other[1] - y) < 3),
                               key=lambda other: other[0])
            digits = [unicodedata.normalize("NFKC", other[4]) for other in same_line]
            if not digits or digits[0] not in {"1", "2", "3", "4", "5"}:
                raise ValueError(f"Answer missing: {filename} {subject} {label} {digits}")
            points = int(digits[1]) if len(digits) > 1 and digits[1].isdigit() else None
            records[subject].append({"question": number, "part": part,
                                     "answer": digits[0], "points": points})
        # The answer sheet itself is authoritative, so duplicated units are fatal.
        keys = [(item["question"], item["part"]) for item in records[subject]]
        if len(keys) != len(set(keys)):
            raise ValueError(f"Duplicate answer unit: {filename} {subject}")
        records[subject].sort(key=lambda item: (item["question"], item["part"] or ""))
    return records


def main() -> None:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    for session in manifest["sessions"]:
        filename = session["officialAnswer"]["url"].rsplit("/", 1)[-1]
        answer = parse_answer_pdf(filename)
        for subject in session["subjects"]:
            units = answer[subject["subject"]]
            observed = subject.pop("observedQuestionNumbers", subject.get("questionNumbers", []))
            expected = sorted({item["question"] for item in units})
            missing = sorted(set(expected) - set(observed))
            if missing:
                raise ValueError(f"Question PDF lacks answer labels: {session['examDate']} {subject['subject']} {missing}")
            subject["questionNumbers"] = expected
            subject["answerUnitCount"] = len(units)
            subject["answerUnits"] = units
            if subject["subject"] in {"theory", "machinery"}:
                subject["optionalQuestionGroup"] = {"numbers": [17, 18], "choose": 1,
                                                    "publicUnits": 4, "scoredUnits": 2}
                subject["scoredUnitCount"] = len(units) - 2
            else:
                subject["scoredUnitCount"] = len(units)
            print(f"{session['examDate']} {subject['subject']}: questions={len(expected)}, answer units={len(units)}", flush=True)
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
