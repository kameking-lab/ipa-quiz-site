"""Count only current, source-pinned, exact Opus 5.5 PASS units."""

from hashlib import sha256
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts/denken3-source-manifest.json"
REVIEWED = ROOT / "data/questions/denken3/reviewed"
STRICT = ROOT / "docs/evidence/denken3/strict"
PRIVATE = ROOT / "data/raw_pdfs/denken3/review"
ISSUES = ("textIssues", "choiceIssues", "answerIssues", "explanationIssues", "figureIssues", "sourceIssues")


def digest(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def canonical(value: object) -> str:
    return sha256(json.dumps(value, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()


def key(row: dict) -> str:
    return f"q{row['questionNumber']:02}{row.get('part') or ''}"


def main() -> None:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    expected = {}
    for session in manifest["sessions"]:
        date = session["examDate"].replace("-", "")
        for paper in session["subjects"]:
            for unit in paper["answerUnits"]:
                expected[(date, paper["subject"], f"q{unit['question']:02}{unit['part'] or ''}")] = (
                    unit["answer"], paper["sha256"], session["officialAnswer"]["sha256"]
                )
    candidates = {}
    for path in REVIEWED.glob("*.json"):
        rows = json.loads(path.read_text(encoding="utf-8"))
        for row in rows:
            id_ = (row["examDate"].replace("-", ""), row["subject"], key(row))
            if id_ in candidates:
                raise ValueError(f"Duplicate candidate: {id_}")
            if id_ not in expected or row["officialAnswer"] != expected[id_][0]:
                raise ValueError(f"Unrecognized/wrong official answer: {id_}")
            candidates[id_] = row
    passed = {}
    for path in sorted(STRICT.glob("*-opus.json")):
        receipt = json.loads(path.read_text(encoding="utf-8"))
        if receipt.get("resolvedModel") != "claude-opus-5-5":
            continue
        usage = (receipt.get("modelUsage") or {}).get("claude-opus-5-5") or {}
        if usage.get("canonicalModel") != "claude-opus-5-5" or usage.get("provider") != "firstParty":
            continue
        date, subject = receipt["examDate"], receipt["subject"]
        raw = PRIVATE / date / subject / f"{path.stem}-raw.jsonl"
        if not raw.is_file() or digest(raw) != receipt.get("rawResponseSha256"):
            continue
        hashes = receipt["inputHashes"]
        for item in receipt["assessment"]:
            id_ = (date, subject, item["unitKey"])
            candidate = candidates.get(id_)
            if candidate is None or id_ not in expected:
                continue
            if hashes["candidateSha256"].get(item["unitKey"]) != canonical(candidate):
                continue
            if (hashes["sourceQuestionPdfSha256"], hashes["sourceAnswerPdfSha256"]) != expected[id_][1:]:
                continue
            if any(not (ROOT / source).is_file() or digest(ROOT / source) != value
                   for source, value in hashes["officialPageSha256"].items()):
                continue
            if any(not (ROOT / source).is_file() or digest(ROOT / source) != value
                   for source, value in hashes["figureSha256"].items()):
                continue
            if any(not (ROOT / source).is_file() or digest(ROOT / source) != value
                   for source, value in hashes.get("referencePdfSha256", {}).items()):
                continue
            if any(not (ROOT / source).is_file() or digest(ROOT / source) != value
                   for source, value in hashes.get("referencePageSha256", {}).items()):
                continue
            if item["status"] == "PASS" and all(item.get(issue) == [] for issue in ISSUES):
                passed[id_] = str(path.relative_to(ROOT)).replace("\\", "/")
    grouped = {}
    for id_ in expected:
        group = id_[0], id_[1]
        grouped.setdefault(group, {"expected": 0, "candidate": 0, "strictPass": 0})
        grouped[group]["expected"] += 1
        grouped[group]["candidate"] += id_ in candidates
        grouped[group]["strictPass"] += id_ in passed
    total = {field: sum(row[field] for row in grouped.values()) for field in ("expected", "candidate", "strictPass")}
    print(json.dumps({"total": total, "byPaper": {f"{date}-{subject}": row for (date, subject), row in sorted(grouped.items())}},
                     ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
