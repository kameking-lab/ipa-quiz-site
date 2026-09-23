"""Keep official-paper coverage and publication acceptance honest."""

from collections import Counter
from hashlib import sha256
import json
from pathlib import Path
import sys
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts/denken3-source-manifest.json"
RAW = ROOT / "data/raw_pdfs/denken3"
REVIEWED = ROOT / "data/questions/denken3/reviewed"
RECEIPTS = ROOT / "docs/evidence/denken3/receipts"
PARTIAL = ROOT / "docs/evidence/denken3/partial"
SUBJECTS = {"theory", "power", "machinery", "law"}


def load_manifest() -> dict:
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    if data["requiredFiscalYears"] != [2024, 2025] or len(data["sessions"]) != 4:
        raise ValueError("Expected exactly two complete fiscal years/four sessions")
    papers = 0
    units = 0
    for session in data["sessions"]:
        if session["term"] not in {"upper", "lower"}:
            raise ValueError("Unknown session term")
        if {paper["subject"] for paper in session["subjects"]} != SUBJECTS:
            raise ValueError(f"Missing subject: {session['examDate']}")
        for paper in session["subjects"]:
            unit_keys = [(part["question"], part["part"]) for part in paper["answerUnits"]]
            if len(unit_keys) != len(set(unit_keys)) or paper["answerUnitCount"] != len(unit_keys):
                raise ValueError("Duplicate/incomplete official answer units")
            if {int(part["answer"]) for part in paper["answerUnits"]} - set(range(1, 6)):
                raise ValueError("Official answer outside 1–5")
            if sorted({part["question"] for part in paper["answerUnits"]}) != paper["questionNumbers"]:
                raise ValueError("Question-number/answer-unit mismatch")
            expected = {"theory": (18, 22, 20), "power": (17, 20, 20),
                        "machinery": (18, 22, 20), "law": (13, 16, 16)}[paper["subject"]]
            actual = (len(paper["questionNumbers"]), paper["answerUnitCount"], paper["scoredUnitCount"])
            if actual != expected:
                raise ValueError(f"Official-paper coverage mismatch: {session['examDate']} {paper['subject']} {actual}")
            papers += 1
            units += len(unit_keys)
    if papers != 16 or units != 320:
        raise ValueError(f"Incomplete source collection: {papers} papers, {units} units")
    return data


def validate_local_pdfs(data: dict) -> None:
    for session in data["sessions"]:
        for item in [session["officialAnswer"], *session["subjects"]]:
            path = RAW / item["url"].rsplit("/", 1)[-1]
            if not path.is_file() or sha256(path.read_bytes()).hexdigest() != item["sha256"]:
                raise ValueError(f"Missing/changed official PDF: {path}")


def validate_acceptance(data: dict) -> None:
    total = 0
    for session in data["sessions"]:
        date = session["examDate"].replace("-", "")
        for paper in session["subjects"]:
            subject = paper["subject"]
            files = sorted(REVIEWED.glob(f"{date}-{subject}-q*.json"))
            rows = [row for path in files for row in json.loads(path.read_text(encoding="utf-8"))]
            actual_keys = {(row["questionNumber"], row.get("part")) for row in rows}
            expected_keys = {(item["question"], item["part"]) for item in paper["answerUnits"]}
            if len(rows) != len(expected_keys) or actual_keys != expected_keys:
                raise ValueError(f"Missing/duplicated reviewed units: {date} {subject}")
            answers = {(item["question"], item["part"]): item["answer"] for item in paper["answerUnits"]}
            for row in rows:
                key = (row["questionNumber"], row.get("part"))
                if row.get("needsReview") is not False or row.get("officialAnswer") != answers[key]:
                    raise ValueError(f"Unreviewed/wrong answer: {date} {subject} {key}")
                if set(row.get("choices", {})) != {"1", "2", "3", "4", "5"} or set(row.get("choiceExplanations", {})) != {"1", "2", "3", "4", "5"}:
                    raise ValueError(f"Missing option/reason: {date} {subject} {key}")
                if not row.get("question") or not row.get("explanation") or any(not value for value in row["choices"].values()) or any(not value for value in row["choiceExplanations"].values()):
                    raise ValueError(f"Empty content: {date} {subject} {key}")
                for url in row.get("officialReferenceUrls", []):
                    host = urlparse(url).hostname or ""
                    if not (host.endswith(".go.jp") or host == "go.jp"):
                        raise ValueError(f"Non-government reference: {url}")
            receipt_path = RECEIPTS / f"{date}-{subject}.json"
            receipt = json.loads(receipt_path.read_text(encoding="utf-8"))
            if receipt.get("status") != "accepted" or receipt.get("passedUnits") != len(expected_keys) or receipt.get("fixUnits") != 0:
                raise ValueError(f"No complete independent review: {receipt_path}")
            if set(receipt.get("passedIds", [])) != {f"q{n}{p or ''}" for n, p in expected_keys}:
                raise ValueError(f"Independent PASS IDs incomplete: {receipt_path}")
            total += len(rows)
    if total != 320:
        raise ValueError(f"Not all public answer units accepted: {total}/320")
    print("Accepted 16 papers / 264 question numbers / 320 public answer units / 1600 choices")


def validate_partial(data: dict) -> None:
    expected = {}
    for session in data["sessions"]:
        date = session["examDate"].replace("-", "")
        for paper in session["subjects"]:
            for unit in paper["answerUnits"]:
                expected[(date, paper["subject"], unit["question"], unit["part"])] = unit["answer"]
    observed = set()
    units = 0
    questions = set()
    for receipt_path in sorted(PARTIAL.glob("*.json")):
        receipt = json.loads(receipt_path.read_text(encoding="utf-8"))
        data_path = REVIEWED / receipt_path.name
        if not data_path.is_file() or sha256(data_path.read_bytes()).hexdigest() != receipt["reviewedDataSha256"]:
            raise ValueError(f"Partial data changed after receipt: {data_path}")
        rows = json.loads(data_path.read_text(encoding="utf-8"))
        if receipt["status"] != "partial-accepted" or len(rows) != receipt["answerUnitCount"]:
            raise ValueError(f"Invalid partial receipt: {receipt_path}")
        for row in rows:
            key = (row["examDate"].replace("-", ""), row["subject"], row["questionNumber"], row["part"])
            if key in observed or key not in expected or row["officialAnswer"] != expected[key]:
                raise ValueError(f"Duplicate/unofficial accepted row: {key}")
            observed.add(key)
            questions.add(key[:3])
            if row.get("needsReview") is not False or set(row["choices"]) != {"1", "2", "3", "4", "5"} or set(row["choiceExplanations"]) != {"1", "2", "3", "4", "5"}:
                raise ValueError(f"Incomplete accepted choices: {key}")
            for url in row.get("figureUrls", []) + list(row.get("choiceFigureUrls", {}).values()):
                if not url.startswith("/images/denken3/") or not (ROOT / "public" / url.lstrip("/")).is_file():
                    raise ValueError(f"Missing figure asset: {key} {url}")
            units += 1
    print(f"Partially accepted: {len(questions)}/264 question numbers, {units}/320 public answer units, {units*5}/1600 choices")


def main() -> None:
    data = load_manifest()
    if "--local-pdfs" in sys.argv:
        validate_local_pdfs(data)
    if "--partial" in sys.argv:
        validate_partial(data)
    if "--accept" in sys.argv:
        validate_acceptance(data)
    print("Source manifest: 4 sessions / 16 papers / 320 official answer units verified")


if __name__ == "__main__":
    main()
