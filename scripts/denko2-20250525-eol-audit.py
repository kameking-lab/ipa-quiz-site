"""Prove that 2025 upper source-pack SHA drift is newline-only."""

from hashlib import sha256
import json
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
FINAL = ROOT / "docs/evidence/denko2-final/20250525.json"
OUTPUT = ROOT / "docs/evidence/denko2-final/20250525-portability-audit.json"


def digest(data: bytes) -> str:
    return sha256(data).hexdigest()


def portable(data: bytes) -> bytes:
    return data.replace(b"\r\n", b"\n").replace(b"\r", b"\n")


def main() -> None:
    final = json.loads(FINAL.read_text(encoding="utf-8"))
    rows = []
    for assessment in final["assessment"]:
        source = assessment.get("lawReceipt")
        if not source:
            continue
        relative = source["path"]
        current = (ROOT / relative).read_bytes()
        git_blob = subprocess.check_output(["git", "show", f"HEAD:{relative}"], cwd=ROOT)
        direct = json.loads((ROOT / assessment["directReviewReceipt"]).read_text(encoding="utf-8"))
        number = assessment["number"]
        expected = source["sha256"]
        item = {
            "number": number,
            "path": relative,
            "expectedSha256": expected,
            "workingRawSha256": digest(current),
            "workingLfNormalizedSha256": digest(portable(current)),
            "gitBlobSha256": digest(git_blob),
            "directReviewSourcePackSha256": direct["inputHashes"]["sourcePackSha256"][str(number)],
            "workingCrLfCount": current.count(b"\r\n"),
            "gitBlobCrLfCount": git_blob.count(b"\r\n"),
            "normalizedBytesEqualGitBlob": portable(current) == git_blob,
            "jsonContentEqualGitBlob": json.loads(current) == json.loads(git_blob),
        }
        if not (item["workingLfNormalizedSha256"] == expected == item["gitBlobSha256"] ==
                item["directReviewSourcePackSha256"] and item["normalizedBytesEqualGitBlob"] and
                item["jsonContentEqualGitBlob"]):
            raise ValueError(f"Q{number} has a real source-pack content difference")
        rows.append(item)
    changed = sum(row["workingRawSha256"] != row["expectedSha256"] for row in rows)
    if len(rows) != 30 or changed != 30:
        raise ValueError(f"Unexpected source-pack scope: {len(rows)} packs, {changed} raw drifts")
    OUTPUT.write_text(json.dumps({
        "schemaVersion": 1,
        "paper": "20250525",
        "status": "line-ending-only-no-content-change",
        "sourcePackCount": len(rows),
        "rawShaDriftCount": changed,
        "lfNormalizedShaMismatchCount": 0,
        "semanticJsonMismatchCount": 0,
        "gitBlobMismatchCount": 0,
        "directReviewSourcePackMismatchCount": 0,
        "assessment": rows,
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{len(rows)}/{len(rows)} source packs are LF/CRLF-only; no direct re-review needed")


if __name__ == "__main__":
    main()
