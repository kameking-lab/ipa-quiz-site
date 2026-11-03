"""Audit EM drafts without changing acceptance or public overlays.

The quiz verdict denotes whether choosing that number is scored correct. The
underlying statement may itself be true in a negative-worded question.
"""

import argparse
from collections import Counter
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REVIEW = ROOT / "data/exam-library/emkohyo-review"
PAPERS = ROOT / "data/exam-library/papers"
OUT = ROOT / "docs/evidence/emkohyo-choice-sources/draft-static-audit.json"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--normalize-verdicts", action="store_true")
    args = parser.parse_args()
    totals = Counter()
    findings = []
    normalized_ids = []
    marker = "採点verdictを公式正答番号から機械補正。各肢の説明文は独立再審査待ち。"
    for file in sorted(REVIEW.glob("emkohyo-*-draft.json")):
        draft = json.loads(file.read_text(encoding="utf-8"))
        paper = draft.get("paperId")
        if not paper:
            continue
        official = {row["id"]: row for row in json.loads((PAPERS / f"{paper}.json").read_text(encoding="utf-8"))}
        changed = False
        for id_, item in draft.get("questions", {}).items():
            if id_ not in official:
                raise ValueError(f"Unknown official question {id_}")
            totals["drafted"] += 1
            row = official[id_]
            overlay = item["overlay"]
            issues = []
            if overlay.get("correctChoice") != row["correctChoice"]:
                issues.append("official-answer-mismatch")
            for choice in overlay.get("choices", []):
                number = choice.get("number")
                expected = "correct" if number == row["correctChoice"] else "incorrect"
                if choice.get("verdict") != expected:
                    issues.append(f"verdict-{number}")
                    if args.normalize_verdicts:
                        choice["verdict"] = expected
                        changed = True
                if len(choice.get("reason", "").strip()) < 55:
                    issues.append(f"short-reason-{number}")
            if not overlay.get("sources"):
                issues.append("no-government-source")
            if not item.get("sourceEvidence"):
                issues.append("no-direct-source-evidence")
            if item.get("reviewIssues"):
                issues.append("unresolved-review-issues")
            if args.normalize_verdicts and any(issue.startswith("verdict-") for issue in issues):
                issues_list = item.setdefault("reviewIssues", [])
                if marker not in issues_list:
                    issues_list.append(marker)
            if marker in item.get("reviewIssues", []):
                normalized_ids.append(id_)
            if issues:
                findings.append({"id": id_, "issues": issues})
                totals.update(issues)
        if changed:
            file.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    receipt = {"drafted": totals.pop("drafted", 0), "issueCounts": dict(totals), "findings": findings,
               "verdictNormalizedDrafts": sorted(normalized_ids),
               "normalizationApplied": args.normalize_verdicts,
               "acceptance": "none; independent official-source review remains required"}
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({key: value for key, value in receipt.items() if key != "findings"}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
