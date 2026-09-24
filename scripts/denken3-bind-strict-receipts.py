"""Bind only exact first-party Opus PASS receipts to the current partial rows.

Older FIX receipts and PASS receipts for superseded candidate hashes are ignored.
The raw Claude response must still exist in the ignored private review tree.
"""

from hashlib import sha256
import json
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent))
import denken3_cli  # noqa: E402


ROOT = Path(__file__).resolve().parents[1]
CANDIDATES = ROOT / "data/questions/denken3/reviewed"
EVIDENCE = ROOT / "docs/evidence/denken3/partial"
STRICT = ROOT / "docs/evidence/denken3/strict"
RAW = ROOT / "data/raw_pdfs/denken3/review"
ISSUES = ("textIssues", "choiceIssues", "answerIssues", "explanationIssues", "figureIssues", "sourceIssues")


def digest(data: bytes) -> str:
    return sha256(data).hexdigest()


def canonical(row: dict) -> str:
    return digest(json.dumps(row, ensure_ascii=False, sort_keys=True).encode("utf-8"))


def receipt_is_valid(path: Path, receipt: dict) -> bool:
    usage = (receipt.get("modelUsage") or {}).get("claude-opus-5-5") or {}
    if receipt.get("resolvedModel") != "claude-opus-5-5" or usage.get("canonicalModel") != "claude-opus-5-5" or usage.get("provider") != "firstParty":
        return False
    stem = path.stem.removesuffix("-opus")
    date, subject = stem.split("-", 2)[:2]
    raw = denken3_cli.raw_file(RAW / date / subject / f"{stem}-opus-raw.jsonl")
    return raw is not None and digest(raw.read_bytes()) == receipt.get("rawResponseSha256")


def main() -> None:
    proofs: dict[tuple[str, str], list[tuple[int, Path, dict]]] = {}
    for path in STRICT.glob("*-opus.json"):
        receipt = json.loads(path.read_text(encoding="utf-8"))
        if not receipt_is_valid(path, receipt):
            continue
        candidate_hashes = (receipt.get("inputHashes") or {}).get("candidateSha256") or {}
        for assessment in receipt.get("assessment") or []:
            key = assessment.get("unitKey")
            if assessment.get("status") != "PASS" or key not in candidate_hashes:
                continue
            if any(assessment.get(name) for name in ISSUES):
                continue
            stem = path.stem.removesuffix("-opus")
            date, subject = stem.split("-", 2)[:2]
            proofs.setdefault((f"{date}-{subject}", key), []).append((path.stat().st_mtime_ns, path, receipt))

    attached = 0
    pending = []
    for candidate_path in sorted(CANDIDATES.glob("*.json")):
        evidence_path = EVIDENCE / candidate_path.name
        if not evidence_path.is_file():
            raise FileNotFoundError(evidence_path)
        rows = json.loads(candidate_path.read_text(encoding="utf-8"))
        evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
        mapping = dict(evidence.get("strictReview") or {})
        prefix = candidate_path.stem[:8] + "-" + rows[0]["subject"]
        for row in rows:
            key = f"q{row['questionNumber']:02}{row.get('part') or ''}"
            target_hash = canonical(row)
            matched = [(mtime, path, receipt) for mtime, path, receipt in proofs.get((prefix, key), [])
                       if receipt["inputHashes"]["candidateSha256"][key] == target_hash]
            if not matched:
                pending.append(f"{prefix} {key}")
                continue
            _, path, _ = max(matched, key=lambda item: item[0])
            binding = {"path": path.relative_to(ROOT).as_posix(), "sha256": digest(path.read_bytes()),
                       "status": "PASS", "resolvedModel": "claude-opus-5-5"}
            previous = mapping.get(key) or {}
            if previous.get("path") == binding["path"] and previous.get("sha256") in denken3_cli.text_digests(path):
                continue  # same receipt, hashed under the other line-ending convention
            if mapping.get(key) != binding:
                mapping[key] = binding
                attached += 1
        if evidence.get("reviewedDataSha256") not in denken3_cli.text_digests(candidate_path):
            evidence["reviewedDataSha256"] = digest(candidate_path.read_bytes())
        evidence["strictReview"] = mapping
        evidence_path.write_text(json.dumps(evidence, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"strict bindings updated={attached}; pending={len(pending)}")
    if pending:
        print("pending: " + ", ".join(pending))


if __name__ == "__main__":
    main()
