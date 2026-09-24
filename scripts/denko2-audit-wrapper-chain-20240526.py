"""Audit the 2024-first canonical wrapper -> direct Opus evidence chain."""

from hashlib import sha256
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PAPER = "20240526"
FINAL = ROOT / "docs/evidence/denko2-final"
REVIEWED = ROOT / "data/questions/denko2/reviewed"
BATCHES = ROOT / "data/raw_pdfs/denko2/review/batches"


def raw_digest(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def portable_digest(path: Path) -> str:
    raw = path.read_bytes()
    if path.suffix.lower() in {".json", ".md", ".txt", ".py"}:
        raw = raw.decode("utf-8").replace("\r\n", "\n").replace("\r", "\n").encode("utf-8")
    return sha256(raw).hexdigest()


def canonical(value) -> str:
    return sha256(json.dumps(value, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()


def clean(item: dict) -> bool:
    return item.get("status") == "PASS" and not any(
        isinstance(value, list) and value
        for key, value in item.items()
        if key.endswith(("Issues", "NeedsExternalCheck", "Check"))
    )


def main() -> None:
    candidates = {item["number"]: item
                  for path in sorted(REVIEWED.glob(f"{PAPER}-q*.json"))
                  for item in json.loads(path.read_text(encoding="utf-8"))}
    sources = {item["number"]: item
               for path in sorted(BATCHES.glob(f"{PAPER}-q??-??.json"))
               for item in json.loads(path.read_text(encoding="utf-8"))["questions"]}
    final = json.loads((FINAL / f"{PAPER}.json").read_text(encoding="utf-8"))
    pinned = {item["number"]: item for item in final["assessment"]}
    entries = []
    for number in range(1, 51):
        candidate = candidates[number]
        pin = pinned[number]
        wrapper_path = ROOT / pin["directReviewReceipt"]
        wrapper = json.loads(wrapper_path.read_text(encoding="utf-8"))
        upstream_path = ROOT / wrapper["upstreamReviewReceipt"]
        upstream = json.loads(upstream_path.read_text(encoding="utf-8"))
        upstream_items = [item for item in upstream["assessment"] if item.get("number") == number]
        figures = {}
        for url in candidate.get("imageUrls", []) + list(candidate.get("choiceImageUrls", {}).values()):
            path = ROOT / "public" / url.lstrip("/")
            figures[str(path.relative_to(ROOT)).replace("\\", "/")] = raw_digest(path)
        law_path = ROOT / f"docs/evidence/denko2-law/{PAPER}-q{number:02}.json"
        wrapper_law = wrapper["inputHashes"].get("legalReceiptSha256", {})
        law_match = (not law_path.exists() and not wrapper_law)
        if law_path.exists():
            key = str(law_path.relative_to(ROOT)).replace("\\", "/")
            law_match = wrapper_law.get(key) == portable_digest(law_path)
        recorded_direct = pin["directReviewSha256"]
        recorded_upstream = wrapper["upstreamReviewSha256"]
        entry = {
            "number": number,
            "wrapperPath": str(wrapper_path.relative_to(ROOT)).replace("\\", "/"),
            "recordedWrapperSha256": recorded_direct,
            "checkoutRawWrapperSha256": raw_digest(wrapper_path),
            "portableLfWrapperSha256": portable_digest(wrapper_path),
            "rawWrapperShaMismatch": recorded_direct != raw_digest(wrapper_path),
            "portableWrapperShaMatch": recorded_direct == portable_digest(wrapper_path),
            "upstreamReviewPath": wrapper["upstreamReviewReceipt"],
            "recordedUpstreamSha256": recorded_upstream,
            "checkoutRawUpstreamSha256": raw_digest(upstream_path),
            "portableLfUpstreamSha256": portable_digest(upstream_path),
            "rawUpstreamShaMismatch": recorded_upstream != raw_digest(upstream_path),
            "portableUpstreamShaMatch": recorded_upstream == portable_digest(upstream_path),
            "assessmentExactMatch": len(upstream_items) == 1 and wrapper["assessment"] == upstream_items,
            "assessmentCleanPass": len(upstream_items) == 1 and clean(upstream_items[0]),
            "candidateShaMatch": (
                pin["currentCandidateSha256"] == canonical(candidate) ==
                upstream["inputHashes"]["candidateSha256"][str(number)] and
                wrapper["inputHashes"]["draftSha256"] == canonical([candidate])
            ),
            "originalRowShaMatch": (
                pin["originalRowSha256"] ==
                wrapper["inputHashes"]["rowSha256"][str(number)] ==
                raw_digest(ROOT / sources[number]["reviewCrop"])
            ),
            "figureShaMatch": pin["figureSha256"] == figures and all(
                digest in {wrapper["inputHashes"].get("detailFigureSha256", {}).get(path),
                           wrapper["inputHashes"].get("sharedFigureSha256", {}).get(path)}
                for path, digest in figures.items()
            ),
            "lawShaMatch": law_match,
        }
        entry["accepted"] = all(value for key, value in entry.items() if key.endswith("Match") or key == "assessmentCleanPass")
        entries.append(entry)
    result = {
        "schemaVersion": 1,
        "paper": PAPER,
        "status": "complete" if all(item["accepted"] for item in entries) else "failed",
        "acceptedQuestionCount": sum(item["accepted"] for item in entries),
        "note": "Text receipt hashes use LF-normalized UTF-8 bytes; binary source rows and figures remain raw-byte hashes.",
        "assessment": entries,
    }
    output = FINAL / f"{PAPER}-wrapper-chain-audit.json"
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{PAPER}: wrapper chain {result['acceptedQuestionCount']}/50 {result['status']}")
    if result["status"] != "complete":
        raise ValueError("wrapper chain is not complete")


if __name__ == "__main__":
    main()
