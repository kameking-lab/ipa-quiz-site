"""Read-only deterministic selector for the next EM direct-review batch.

A candidate is selectable only when it is unaccepted, statically valid, free of
draft reviewIssues, covered by a current government source pack with no missing
or unverified evidence, and has no claude-opus-5-5 receipt for its current hash.
An existing current-hash FIX receipt is a HOLD; re-running it unchanged would
only re-roll the verdict, so it is never selected.
"""

from hashlib import sha256
import json
from pathlib import Path
import runpy
from urllib.parse import urlparse

from emkohyo_portable_hash import matches_text_sha256


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/exam-library"
REVIEW = DATA / "emkohyo-review"
PACKS = ROOT / "docs/evidence/emkohyo-choice-sources"
STATUS = runpy.run_path(str(ROOT / "scripts/emkohyo-choice-status.py"))
LIMIT = 20


def pack_state(paper: str, number: int, draft_file: Path) -> tuple[list[str], list[dict]]:
    complete, gaps = [], []
    for file in sorted(PACKS.glob(f"{paper}-q*.json")):
        pack = json.loads(file.read_text(encoding="utf-8"))
        numbers = pack.get("range") or []
        if pack.get("paperId") != paper or len(numbers) != 2 or not numbers[0] <= number <= numbers[1]:
            continue
        missing = []
        if not matches_text_sha256(draft_file, pack.get("draftSha256", "")):
            missing.append("draftSha256 stale")
        if f"{paper}-q{number}" in (pack.get("missingEvidenceQuestions") or []):
            missing.append("missingEvidenceQuestions")
        elif pack.get("missingEvidenceQuestions"):
            missing.append("batch missingEvidenceQuestions")
        if pack.get("unverifiedExcerpts"):
            missing.append("unverifiedExcerpts")
        if not pack.get("claimedExcerpts") or not pack.get("sources"):
            missing.append("no direct excerpts/sources")
        if any(not (urlparse(s.get("url", "")).hostname or "").endswith(".go.jp")
               or s.get("status") != 200 for s in pack.get("sources", [])):
            missing.append("non-government or unreachable source")
        (gaps.append({"pack": file.name, "missing": missing}) if missing else complete.append(file.name))
    return complete, gaps


def main() -> None:
    accepted = set(json.loads((DATA / "choice-explanations.json").read_text(encoding="utf-8")))
    catalog = json.loads((DATA / "official-catalog.json").read_text(encoding="utf-8"))
    counts = {"accepted": 0, "noDraft": 0, "draftReviewIssues": 0, "staticInvalid": 0,
              "noCurrentCompletePack": 0, "currentHashFixHold": 0, "selectable": 0}
    selected, holds, pack_gaps = [], [], []
    for paper in catalog:
        if paper.get("group") != "emkohyo" or paper["date"][:4] not in {"2025", "2026"}:
            continue
        rows = json.loads((DATA / "papers" / f"{paper['id']}.json").read_text(encoding="utf-8"))
        for row in sorted(rows, key=lambda r: r["number"]):
            if row["answerAuthority"] != "official" or row["choiceCount"] != 5:
                continue
            id_, number = row["id"], row["number"]
            if id_ in accepted:
                counts["accepted"] += 1
                continue
            first = (number - 1) // 5 * 5 + 1
            draft_file = REVIEW / f"{paper['id']}-q{first:02}-{first+4:02}-draft.json"
            candidate = (json.loads(draft_file.read_text(encoding="utf-8")).get("questions", {}).get(id_)
                         if draft_file.exists() else None)
            if candidate is None:
                counts["noDraft"] += 1
                continue
            if candidate.get("reviewIssues"):
                counts["draftReviewIssues"] += 1
                continue
            if STATUS["candidate_problems"](row, candidate):
                counts["staticInvalid"] += 1
                continue
            complete, gaps = pack_state(paper["id"], number, draft_file)
            if not complete:
                counts["noCurrentCompletePack"] += 1
                pack_gaps.append({"id": id_, "packs": gaps})
                continue
            digest = sha256(json.dumps(candidate["overlay"], ensure_ascii=False, sort_keys=True)
                            .encode("utf-8")).hexdigest()
            receipts = []
            for file in sorted(REVIEW.glob(f"{paper['id']}-q*-review.json")):
                receipt = json.loads(file.read_text(encoding="utf-8"))
                if receipt.get("candidateSha256", {}).get(id_) == digest:
                    assessment = receipt.get("assessment", {}).get(id_, {})
                    receipts.append({"receipt": file.name, "reviewModel": receipt.get("reviewModel"),
                                     "modelUsage": sorted(receipt.get("modelUsage") or {}),
                                     "status": assessment.get("status"),
                                     "issueCounts": {k: len(assessment.get(k) or []) for k in (
                                         "textIssues", "choiceIssues", "reasonIssues",
                                         "sourceIssues", "needsExternalCheck")}})
            if receipts:
                counts["currentHashFixHold"] += 1
                holds.append({"id": id_, "candidateSha256": digest, "sourcePacks": complete,
                              "receipts": receipts})
                continue
            counts["selectable"] += 1
            if len(selected) < LIMIT:
                selected.append({"id": id_, "candidateSha256": digest, "sourcePacks": complete})
    print(json.dumps({"mode": "read-only", "model": "claude-opus-5-5", "limit": LIMIT,
                      "counts": counts, "selected": selected, "holds": holds,
                      "packGaps": pack_gaps,
                      "blocker": None if selected else
                      "no unaccepted source-complete candidate without a current-hash receipt"},
                     ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
