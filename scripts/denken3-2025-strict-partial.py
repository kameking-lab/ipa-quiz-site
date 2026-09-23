"""Verify only already-reviewed 2025 partial batches; never mark a whole paper live.

Usage: py -3.12 scripts/denken3-2025-strict-partial.py
"""

from hashlib import sha256
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = json.loads((ROOT / "scripts/denken3-source-manifest.json").read_text(encoding="utf-8"))
EVIDENCE = ROOT / "docs/evidence/denken3/partial"
ISSUES = ("textIssues", "choiceIssues", "explanationIssues", "figureIssues", "sourceIssues", "needsExternalCheck")


def digest(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def canonical_digest(value: object) -> str:
    return sha256(json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode("utf-8")).hexdigest()


def checked_path(relative: str) -> Path:
    path = (ROOT / relative).resolve()
    if not path.is_relative_to(ROOT.resolve()) or not path.is_file():
        raise ValueError(f"Missing/unsafe evidence: {relative}")
    return path


def main() -> None:
    accepted: set[tuple[str, str, int, str | None]] = set()
    counts: dict[str, int] = {}
    dates = {x["examDate"].replace("-", "") for x in MANIFEST["sessions"] if x["fiscalYear"] == 2025}
    for proof_path in sorted(p for p in EVIDENCE.glob("*-q*.json") if p.name[:8] in dates):
        proof = json.loads(proof_path.read_text(encoding="utf-8"))
        date, subject = proof["date"], proof["subject"]
        if proof["status"] != "partial-accepted" or proof["reviewMode"] != "direct-source-aware":
            raise ValueError(f"Not strict accepted: {proof_path}")
        session = next(x for x in MANIFEST["sessions"] if x["examDate"].replace("-", "") == date)
        paper = next(x for x in session["subjects"] if x["subject"] == subject)
        reviewed = checked_path(f"data/questions/denken3/reviewed/{proof_path.name}")
        if digest(reviewed) != proof["reviewedDataSha256"]:
            raise ValueError(f"Reviewed data changed: {reviewed}")
        rows = json.loads(reviewed.read_text(encoding="utf-8"))
        if len(rows) != proof["answerUnitCount"] or len(proof["questions"]) != proof["questionCount"]:
            raise ValueError(f"Partial count mismatch: {proof_path}")
        official = {(x["question"], x["part"]): x["answer"] for x in paper["answerUnits"]}
        for item in proof["questions"]:
            n = item["number"]
            direct_path = checked_path(item["directReceipt"])
            if digest(direct_path) != item["directReceiptSha256"]:
                raise ValueError(f"Direct receipt changed: {direct_path}")
            direct = json.loads(direct_path.read_text(encoding="utf-8"))
            assessment = next(x for x in direct["assessment"] if x["number"] == n)
            if assessment != item["assessment"] or assessment["status"] != "PASS" or any(assessment.get(k) != [] for k in ISSUES):
                raise ValueError(f"Unresolved direct review: {date} {subject} q{n}")
            if direct["candidateSha256"][str(n)] != item["candidateSha256"] or direct["candidateGroupSha256"] != item["candidateGroupSha256"]:
                raise ValueError(f"Candidate pin changed: {date} {subject} q{n}")
            source = item["sourcePack"]
            if canonical_digest(source) != item["sourcePackSha256"]:
                raise ValueError(f"Source pack changed: {date} {subject} q{n}")
            if source["questionPdfSha256"] != paper["sha256"] or source["answerPdfSha256"] != session["officialAnswer"]["sha256"]:
                raise ValueError(f"Official source changed: {date} {subject} q{n}")
            if source["officialRowSha256"] != direct["officialRowSha256"][str(n)] or source["figureSha256"] != {k: v for k, v in direct["figureSha256"].items() if f"q{n:02}" in k}:
                raise ValueError(f"Row or figure pin changed: {date} {subject} q{n}")
            for figure_id, figure_sha in source["figureSha256"].items():
                public = checked_path(f"public/images/denken3/{date}/{subject}/{figure_id}.png")
                if digest(public) != figure_sha:
                    raise ValueError(f"Figure asset changed: {public}")
        for row in rows:
            key = (date, subject, row["questionNumber"], row.get("part"))
            if key in accepted or official.get((key[2], key[3])) != row["officialAnswer"]:
                raise ValueError(f"Duplicate or wrong official answer: {key}")
            if row["needsReview"] is not False or set(row["choices"]) != {"1", "2", "3", "4", "5"} or set(row["choiceExplanations"]) != {"1", "2", "3", "4", "5"}:
                raise ValueError(f"Incomplete reviewed row: {key}")
            if not row["question"] or not row["explanation"] or any(not x for x in row["choiceExplanations"].values()):
                raise ValueError(f"Empty explanation: {key}")
            accepted.add(key)
            counts[f"{date}-{subject}"] = counts.get(f"{date}-{subject}", 0) + 1
    print(json.dumps({"acceptedAnswerUnits": len(accepted), "byPaper": counts,
                      "full2025Gate": "CLOSED" if len(accepted) < 160 else "PENDING_FULL_PAPER_REVIEW"}, ensure_ascii=False))


if __name__ == "__main__":
    main()
