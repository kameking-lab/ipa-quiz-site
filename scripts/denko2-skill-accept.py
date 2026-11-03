"""Summarize independently reviewed skill items without opening the release gate."""

from hashlib import sha256
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RECORDS = json.loads((ROOT / "data/questions/denko2/skills-draft.json").read_text(encoding="utf-8"))
REVIEWS = ROOT / "docs/evidence/denko2-skill-independent"
OUTPUT = ROOT / "docs/evidence/denko2-skill-acceptance.json"


def main() -> None:
    by_pair: dict[tuple[str, str], list[dict]] = {}
    for item in RECORDS:
        by_pair.setdefault((item["questionPdfSha256"], item["answerPdfSha256"]), []).append(item)
    if len(RECORDS) != 104 or len(by_pair) != 65:
        raise ValueError("Source coverage changed; expected 104 date×No. and 65 unique PDF pairs")
    accepted: list[str] = []
    pending: list[dict] = []
    statuses = {"PASS": 0, "FIX": 0, "missing": 0, "stale": 0}
    for (question_hash, answer_hash), aliases in by_pair.items():
        canonical = aliases[0]
        path = REVIEWS / f"{question_hash[:16]}-{answer_hash[:16]}.json"
        status = "missing"
        if path.exists():
            review = json.loads(path.read_text(encoding="utf-8"))
            record_hash = sha256(json.dumps(canonical, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()
            if review.get("inputHashes", {}).get("extractedRecordSha256") != record_hash:
                status = "stale"
            elif review["inputHashes"].get("reviewPromptVersion") != "skill-source-v4":
                status = "stale"
            else:
                status = review["assessment"]["status"]
        statuses[status] += 1
        if status == "PASS":
            accepted.extend(item["id"] for item in aliases)
        else:
            pending.append({"canonicalId": canonical["id"], "dateAliases": [item["id"] for item in aliases], "status": status})
    asset_paths = sorted({ROOT / "public" / value.lstrip("/") for item in RECORDS
                          for field in ("diagramImage", "secondFigureImage", "answerConceptImage", "answerWiringImage", "answerExampleImage")
                          if (value := item[field])})
    asset_manifest = sha256("\n".join(f"{path.name}:{sha256(path.read_bytes()).hexdigest()}" for path in asset_paths).encode("ascii")).hexdigest()
    receipt = {
        "status": "complete-private" if len(accepted) == 104 else "partial-private",
        "published": 0,
        "sourceDateNoCount": len(RECORDS),
        "uniquePdfPairCount": len(by_pair),
        "reviewedPairStatuses": statuses,
        "acceptedDateNoCount": len(accepted),
        "acceptedIds": accepted,
        "pending": pending,
        "imageAssetCount": len(asset_paths),
        "imageAssetManifestSha256": asset_manifest,
        "releaseGate": "closed; academic, skill, notice, and CI remain independent conditions",
    }
    OUTPUT.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({key: receipt[key] for key in ("status", "reviewedPairStatuses", "acceptedDateNoCount", "imageAssetCount")}, ensure_ascii=False))


if __name__ == "__main__":
    main()
