"""Merge draft + review(+rereview) into explanations/<round>-final.json.

Policy: draft is the baseline. If review says FAIL, the review's "fixed" text
replaces it (the review model verified it against primary sources with
WebFetch/WebSearch). If a later rereview round exists for a question, its
"fixed" text wins. Anything never reaching a PASS state (draft PASS, or
review/rereview PASS on the latest text) is held out of publication.
"""
import json, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent

def load(p):
    return json.loads((HERE / p).read_text(encoding="utf-8"))

def dump(p, obj):
    Path(p).parent.mkdir(parents=True, exist_ok=True)
    Path(p).write_text(json.dumps(obj, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")

def merge_round(round_key, review_tags):
    """review_tags: ordered list of review-stage tags to apply, e.g. ["review", "draft.review"]"""
    out_dir = HERE / "explanations" / round_key
    explanations = {}
    review_log = {}
    held = {}
    for b in range(1, 6):
        draft = load(out_dir / f"batch{b}.draft.json")["explanations"]
        for n, entry in draft.items():
            explanations[n] = entry
            review_log[n] = [["draft", "PASS"]]  # schema-valid draft; substantive PASS/FAIL judged by review

    current_status = {n: "PASS" for n in explanations}  # optimistic; review may flip to FAIL
    for tag in review_tags:
        for b in range(1, 6):
            f = out_dir / f"batch{b}.{tag}.json"
            if not f.exists():
                continue
            data = json.loads(f.read_text(encoding="utf-8"))
            statuses = data.get("statuses", {})
            fixed = data.get("fixed", {})
            for n, status in statuses.items():
                if n not in explanations:
                    continue
                review_log[n].append([tag, status])
                if status == "PASS":
                    current_status[n] = "PASS"
                else:
                    current_status[n] = "FAIL"
                    if n in fixed and fixed[n]:
                        explanations[n] = fixed[n]
                        review_log[n].append([f"{tag}.fixed", "applied"])

    final_explanations = {}
    for n, entry in explanations.items():
        if current_status.get(n) == "PASS":
            final_explanations[n] = entry
        else:
            held[n] = "査読で指摘された修正が最終確認まで至らなかったため非公開"
    return {
        "explanations": final_explanations,
        "held": held,
        "reviewLog": [{"number": int(n), "history": h} for n, h in sorted(review_log.items(), key=lambda x: int(x[0]))],
    }

if __name__ == "__main__":
    round_key = sys.argv[1]
    tags = sys.argv[2:] if len(sys.argv) > 2 else ["review"]
    result = merge_round(round_key, tags)
    dump(HERE / "explanations" / f"{round_key}-final.json", result)
    print(round_key, "published", len(result["explanations"]), "held", list(result["held"].keys()))
