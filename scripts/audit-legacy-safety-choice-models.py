"""Record actual model IDs for legacy lckohyo overlays without certifying full review.

Private Claude logs are read locally; only model IDs and log hashes enter Git.
Missing logs remain unknown. Run again only when the underlying logs change.
"""
from hashlib import sha256
import importlib.util
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOG = ROOT / ".cache/safety-choice-lckohyo"
OUT = ROOT / "docs/evidence/lckohyo-legacy-model-resolution-20260923.json"
SPEC = importlib.util.spec_from_file_location(
    "safety_choice_author", ROOT / "scripts/complete-safety-choice-explanations.py")
AUTHOR = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(AUTHOR)

AUTHOR_LOGS = {
    **{f"lckohyo-LC20252115-q{n}": "809ebb2daf02-author.raw.jsonl"
       for n in range(11, 16)},
    **{f"lckohyo-LC20252115-q{n}": "2e668cd72ddd-author.raw.jsonl"
       for n in (16, 17, 20)},
}


def resolved_model(qid):
    filename = AUTHOR_LOGS.get(qid)
    path = LOG / filename if filename else None
    if path is None or not path.is_file():
        return "unknown", None
    raw = path.read_bytes()
    rows = [json.loads(line) for line in raw.decode("utf-8").splitlines() if line.strip()]
    models = {row.get("message", {}).get("model") for row in rows
              if row.get("type") == "assistant" and isinstance(row.get("message"), dict)}
    models.discard(None)
    result = next((row for row in reversed(rows) if row.get("type") == "result"), {})
    if result.get("subtype") != "success" or len(models) != 1:
        return "unknown", None
    try:
        authored = AUTHOR.extract_json(result.get("result", ""))
    except ValueError:
        return "unknown", None
    if qid not in authored:
        return "unknown", None
    return models.pop(), {"path": f".cache/safety-choice-lckohyo/{filename}",
                          "sha256": sha256(raw).hexdigest(), "role": "author"}


def main():
    overlays = json.loads((ROOT / "data/exam-library/choice-explanations.json")
                          .read_text(encoding="utf-8"))
    rows = {}
    for qid, overlay in overlays.items():
        if not qid.startswith(("lckohyo-LC2025", "lckohyo-LC2026")):
            continue
        model, evidence = resolved_model(qid)
        rows[qid] = {"candidateSha256": sha256(json.dumps(overlay, ensure_ascii=False,
                           sort_keys=True, separators=(",", ":")).encode()).hexdigest(),
                     "resolvedModel": model, "modelEvidence": evidence,
                     "fullFiveChoiceReview": "pending"}
    known = sum(row["resolvedModel"] != "unknown" for row in rows.values())
    receipt = {"scope": "legacy published lckohyo 2025+2026 structured overlays",
               "modelFieldMeaning": "author model proven by local Claude success log; not a full independent review",
               "counts": {"published": len(rows), "logResolved": known,
                          "unknown": len(rows) - known, "fullFiveChoiceReview": 0},
               "questions": rows}
    OUT.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(receipt["counts"], ensure_ascii=False))


if __name__ == "__main__":
    main()
