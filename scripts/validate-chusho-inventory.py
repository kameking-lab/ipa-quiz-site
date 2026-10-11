"""Validate first-stage inventory metadata without reading or publishing exam content.

Usage: python scripts/validate-chusho-inventory.py MANIFEST [--candidate METADATA]
The candidate must contain an array of {year, subjectCode, qNumber, part?} only.
This is an inventory check, never a publication approval or a content review.
"""
import argparse
import json
from collections import Counter
from pathlib import Path
from urllib.parse import urlparse

QUALIFICATION = "chusho-kigyo-shindanshi"
YEARS = {2025, 2026}
SUBJECTS = set("ABCDEFG")
ALLOWED_METADATA = {"year", "subjectCode", "qNumber", "part"}
HOLD = "RIGHTS_HOLD_NO_PROBLEM_REPUBLICATION"


def positive_integer(value):
    return isinstance(value, int) and not isinstance(value, bool) and value > 0


def validate_inventory(manifest, candidate=None):
    errors = []
    if not isinstance(manifest, dict):
        return {"valid": False, "errors": ["Manifest must be an object"], "readyToPublish": False}
    if manifest.get("qualification") != QUALIFICATION:
        errors.append("Unexpected qualification")
    years = manifest.get("targetYears")
    if not isinstance(years, list) or len(years) != 2 or set(years) != YEARS:
        errors.append("Target must contain 2026 and 2025 exactly once")
    gate = manifest.get("gate", {})
    if not isinstance(gate, dict) or gate.get("rights") != HOLD or gate.get("sourceAccess") != "STOP_EXISTING_PERMISSION_DENIAL":
        errors.append("Existing rights/access holds must be preserved")
    counts = manifest.get("counts", {})
    if not isinstance(counts, dict) or counts.get("publishedOriginals") != 0 or counts.get("acceptedPreparedOriginals") != 0:
        errors.append("No completed originals are established in this checkpoint")
    if not isinstance(counts, dict) or counts.get("requiredOriginals") is not None or counts.get("requiredAnswerUnits") is not None:
        errors.append("Unaccepted PDF counts must remain null")

    groups = manifest.get("subjects", [])
    seen = set()
    if not isinstance(groups, list):
        errors.append("subjects must be an array")
        groups = []
    for group in groups:
        if not isinstance(group, dict):
            errors.append("Subject metadata must be an object")
            continue
        pair = (group.get("year"), group.get("subjectCode"))
        if pair in seen:
            errors.append(f"Duplicate year/subject: {pair}")
        seen.add(pair)
        if pair[0] not in YEARS or pair[1] not in SUBJECTS:
            errors.append(f"Subject outside assigned scope: {pair}")
        for field in ("requiredOriginals", "requiredAnswerUnits"):
            if group.get(field) is not None:
                errors.append(f"Unaccepted counts must remain null: {pair}/{field}")
        for field in ("questionIndexUrl", "answerIndexUrl"):
            url = urlparse(group.get(field, ""))
            if url.scheme != "https" or url.hostname != "www.jf-cmca.jp" or not url.path.startswith("/contents/") or url.username or url.password:
                errors.append(f"Nonofficial index URL: {pair}/{field}")
    expected = {(year, subject) for year in YEARS for subject in SUBJECTS}
    if seen != expected:
        errors.append("Inventory must contain all 14 year/subject pairs")

    # A part is an answer unit, not another original question.
    unit_keys = Counter()
    original_keys = set()
    if candidate is None:
        candidate = []
    if not isinstance(candidate, list):
        errors.append("Candidate metadata must be an array")
        candidate = []
    for row in candidate:
        if not isinstance(row, dict) or set(row) - ALLOWED_METADATA:
            errors.append("Candidate must contain metadata only; no question/choice/answer payload")
            continue
        year, subject, number = row.get("year"), row.get("subjectCode"), row.get("qNumber")
        part = row.get("part")
        if not positive_integer(year) or year not in YEARS or subject not in SUBJECTS or not positive_integer(number):
            errors.append("Invalid candidate year/subject/question number")
            continue
        if part is not None and (not isinstance(part, str) or part not in ("1", "2", "3", "4", "5")):
            errors.append("Invalid candidate part; use official subquestion 1..5 or omit it")
            continue
        unit_keys[(year, subject, number, part)] += 1
        original_keys.add((year, subject, number))
    for key, occurrences in unit_keys.items():
        if occurrences != 1:
            errors.append(f"Duplicate candidate answer unit: {key}")
    for original in original_keys:
        parts = {key[3] for key in unit_keys if key[:3] == original}
        if None in parts and len(parts) > 1:
            errors.append(f"Mixed parent and subquestion units: {original}")
    per_subject = []
    for year, subject in sorted(expected, reverse=True):
        originals = sorted(k[2] for k in original_keys if k[:2] == (year, subject))
        units = [k for k in unit_keys if k[:2] == (year, subject)]
        per_subject.append({
            "year": year, "subjectCode": subject,
            "candidateOriginals": len(originals), "candidateAnswerUnits": len(units),
            "missingBeforeHighestCandidateNumber": sorted(set(range(1, max(originals, default=0) + 1)) - set(originals)),
            "requiredOriginals": None, "remainingOriginals": None,
            "completion": "UNCONFIRMED_BLOCKED",
        })
    return {
        "valid": not errors, "errors": errors,
        "candidateOriginals": len(original_keys), "candidateAnswerUnits": len(unit_keys),
        "readyToPublish": False,
        "blockingReasons": [HOLD, "STOP_EXISTING_PERMISSION_DENIAL", "REQUIRED_COUNTS_NOT_ESTABLISHED", "NO_CONTENT_ACCEPTANCE"],
        "subjects": per_subject,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("manifest", type=Path)
    parser.add_argument("--candidate", type=Path)
    args = parser.parse_args()
    try:
        manifest = json.loads(args.manifest.read_text(encoding="utf-8"))
        candidate = json.loads(args.candidate.read_text(encoding="utf-8")) if args.candidate else None
        result = validate_inventory(manifest, candidate)
    except (OSError, ValueError, TypeError) as error:
        result = {"valid": False, "errors": [str(error)], "readyToPublish": False}
    print(json.dumps(result, ensure_ascii=False, indent=2))
    raise SystemExit(0 if result["valid"] else 1)


if __name__ == "__main__":
    main()
