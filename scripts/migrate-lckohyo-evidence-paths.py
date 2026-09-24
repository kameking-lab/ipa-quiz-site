"""One-time, verifiable migration of full-review receipts to portable evidence digests.

Receipts written before pack paths were made root-relative hashed the absolute
Windows checkout path. For each PASS receipt whose published candidate and
recorded legacy digest are reproduced exactly from the current pack bytes under
LEGACY_ROOT, store the portable digest and keep the legacy one. Receipts that do
not reproduce are left untouched (they stay non-current). Reviews are not rerun
and no assessment/model field changes.
"""
import importlib.util
import json
from pathlib import Path, PureWindowsPath
import sys

ROOT = Path(__file__).resolve().parents[1]
LEGACY_ROOT = r"C:\Users\kanet\20260522\ipa-lckohyo-choices-20260923"
sys.path.insert(0, str(ROOT / "scripts"))
from safety_choice_review_gate import digest  # noqa: E402

spec = importlib.util.spec_from_file_location("runner", ROOT / "scripts/review-safety-choice-clusters.py")
runner = importlib.util.module_from_spec(spec)
spec.loader.exec_module(runner)


def main():
    ledger_path = ROOT / "docs/evidence/lckohyo-full-choice-review-ledger.json"
    ledger = runner.read(ledger_path)
    published = runner.read(ROOT / "data/exam-library/choice-explanations.json")
    packs = []
    data = ROOT / "data/exam-library"
    for folder in (data / "source-packs", ROOT / "docs/evidence/emkohyo-choice-sources",
                   ROOT / "docs/evidence/emkohyo-2025-sources",
                   ROOT / "docs/evidence/lckohyo-current-source-pins"):
        for path in sorted(folder.glob("**/*.json")):
            value = runner.read(path)
            if isinstance(value, dict) and ("sources" in value or "evidence" in value):
                packs.append({"path": runner.pack_path(ROOT, path), "sha256": digest(value),
                              "content": value})
    cand = ROOT / "docs/evidence/lckohyo-candidate-source-pins.json"
    value = runner.read(cand)
    packs.append({"path": runner.pack_path(ROOT, cand), "sha256": digest(value), "content": value})
    migrated, skipped = [], []
    for qid, receipt in ledger.items():
        if receipt.get("status") != "PASS" or "legacyEvidenceSha256" in receipt:
            continue
        candidate = published.get(qid)
        if candidate is None or digest(candidate) != receipt.get("candidateSha256"):
            skipped.append(qid)
            continue
        urls = {s.get("url", "") for s in candidate.get("sources", [])}
        evidence = runner.evidence_for_question(packs, qid, urls)
        legacy = [dict(p, path=str(PureWindowsPath(LEGACY_ROOT, *p["path"].split("/"))))
                  for p in evidence]
        if digest(legacy) != receipt.get("evidenceSha256"):
            skipped.append(qid)
            continue
        receipt["legacyEvidenceSha256"] = receipt["evidenceSha256"]
        receipt["evidenceSha256"] = digest(evidence)
        receipt["evidencePathMigration"] = {
            "legacyRoot": LEGACY_ROOT,
            "reason": "evidence digest previously embedded the absolute checkout path",
            "verified": "legacy digest reproduced byte-for-byte from current pack contents"}
        migrated.append(qid)
    runner.write(ledger_path, ledger)
    print(json.dumps({"migrated": len(migrated), "skipped": skipped}, ensure_ascii=False))


if __name__ == "__main__":
    main()
