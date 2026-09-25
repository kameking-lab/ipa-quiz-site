"""Publish only FP2 2026 practical solutions with verified Opus receipts.

The official answer PDF, not the model, remains the answer source of truth.
"""

from __future__ import annotations

import json
import unicodedata
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / "docs" / "evidence" / "fp2-2026-may-practical"
QUESTIONS = ROOT / "data" / "questions" / "fp2" / "practical-2024-2025.json"
SOLUTIONS = ROOT / "data" / "questions" / "fp2" / "practical-explanations-2024-2025.json"


def normalized(text: str) -> str:
    return "".join(unicodedata.normalize("NFKC", text).split())


def main() -> None:
    source = json.loads(QUESTIONS.read_text(encoding="utf-8"))["202605"]["questions"]
    approved: dict[str, dict] = {}
    issues: list[dict] = []
    receipts: list[dict] = []
    for batch in range(1, 5):
        receipt_file = EVIDENCE / f"opus-batch-{batch:02d}-receipt.json"
        receipt = json.loads(receipt_file.read_text(encoding="utf-8-sig"))
        usage = receipt.get("modelUsage", {}).get("claude-opus-5-5", {})
        if receipt.get("subtype") != "success" or usage.get("canonicalModel") != "claude-opus-5-5" or usage.get("provider") != "firstParty" or usage.get("outputTokens", 0) < 1:
            raise ValueError(f"Batch {batch}: no successful first-party Opus 5.5 receipt")
        receipts.append({"batch": batch, "canonicalModel": usage["canonicalModel"],
                         "provider": usage["provider"], "outputTokens": usage["outputTokens"]})
        rows = json.loads((EVIDENCE / f"solutions-batch-{batch:02d}.json").read_text(encoding="utf-8"))
        expected = list(range((batch - 1) * 10 + 1, batch * 10 + 1))
        if [row["number"] for row in rows] != expected:
            raise ValueError(f"Batch {batch}: incomplete or out-of-order questions")
        for row in rows:
            official = source[row["number"] - 1]
            if normalized(row["officialAnswer"]) != normalized(official["modelAnswer"]):
                raise ValueError(f"Q{row['number']}: Opus answer conflicts with official PDF extraction")
            if row["sourcePage"] != official["sourcePage"]:
                raise ValueError(f"Q{row['number']}: source page mismatch")
            reasons = row["choiceExplanations"]
            if official["modelAnswer"].strip() in ("1", "2", "3", "4") and set(reasons) != set("1234"):
                raise ValueError(f"Q{row['number']}: four-choice question lacks all option reasons")
            if not row["explanation"].strip() or not reasons or any(not value.strip() for value in reasons.values()):
                raise ValueError(f"Q{row['number']}: empty worked solution")
            # Use e-Gov's readable law pages in the learner UI; Opus's
            # lawdata API URLs identify the same statute but expose raw XML.
            urls = [url.replace("https://laws.e-gov.go.jp/api/1/lawdata/",
                                "https://laws.e-gov.go.jp/law/")
                    for url in row["governmentReferenceUrls"]]
            if any(not (urlparse(url).scheme == "https" and
                        (urlparse(url).hostname == "laws.e-gov.go.jp" or
                         (urlparse(url).hostname or "").endswith(".go.jp"))) for url in urls):
                raise ValueError(f"Q{row['number']}: non-government support URL")
            if not row["approved"]:
                issues.append({"number": row["number"], "figureIssue": row["figureIssue"],
                               "textIssue": row["textIssue"]})
            approved[str(row["number"])] = {
                "explanation": row["explanation"],
                "choiceExplanations": reasons,
                "governmentReferenceUrls": urls,
                "needsReview": not row["approved"],
            }
    correction_file = EVIDENCE / "opus-q38-correction-receipt.json"
    if correction_file.exists():
        correction = json.loads(correction_file.read_text(encoding="utf-8-sig"))
        usage = correction.get("modelUsage", {}).get("claude-opus-5-5", {})
        if correction.get("subtype") != "success" or usage.get("canonicalModel") != "claude-opus-5-5" or usage.get("provider") != "firstParty" or usage.get("outputTokens", 0) < 1:
            raise ValueError("Q38 correction lacks a successful first-party Opus 5.5 receipt")
        receipts.append({"batch": "Q38 correction", "canonicalModel": usage["canonicalModel"],
                         "provider": usage["provider"], "outputTokens": usage["outputTokens"]})
    existing = json.loads(SOLUTIONS.read_text(encoding="utf-8"))
    existing["202605"] = approved
    SOLUTIONS.write_text(json.dumps(existing, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    review = {"scope": "FP2 practical 2026-05", "officialQuestions": len(source),
              "reviewed": len(approved), "accepted": sum(not row["needsReview"] for row in approved.values()),
              "held": issues, "receipts": receipts}
    (EVIDENCE / "review-coverage.json").write_text(json.dumps(review, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(review, ensure_ascii=False))


if __name__ == "__main__":
    main()
