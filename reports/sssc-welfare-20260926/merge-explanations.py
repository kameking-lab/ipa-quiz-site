"""Merge claude-opus-5-5 explanation drafts with the independent reviewer's fixes.

Usage: py -3.12 reports/sssc-welfare-20260926/merge-explanations.py kaigo
Every draft must be PASS; every reviewer FIX is applied verbatim and logged.
"""
import glob
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
exam = sys.argv[1]
final, log = {}, []
for draft_path in sorted(glob.glob(str(HERE / "explanations" / exam / "batch*.draft.json"))):
    base = draft_path[: -len(".draft.json")]
    draft = json.load(open(draft_path, encoding="utf-8"))
    review = json.load(open(base + ".review.json", encoding="utf-8"))
    reviewed = {q["number"]: q for q in review["questions"]}
    assert set(reviewed) == {q["number"] for q in draft["questions"]}, draft_path
    for q in draft["questions"]:
        assert q["status"] == "PASS", (q["number"], q.get("issue"))
        reasons, summary = dict(q["choiceExplanations"]), q["summary"]
        r = reviewed[q["number"]]
        if r["status"] != "PASS":
            fixes = {k: v for k, v in (r.get("fixes") or {}).items() if v}
            for key, text in fixes.items():
                if key == "summary":
                    summary = text
                else:
                    reasons[key] = text
            log.append({"number": q["number"], "problems": r["problems"], "fixedKeys": sorted(fixes)})
        assert sorted(reasons) == ["1", "2", "3", "4", "5"], q["number"]
        assert all(len(v.strip()) >= 25 for v in reasons.values()), q["number"]
        final[q["number"]] = {
            "summary": summary,
            "choiceExplanations": [reasons[str(i)] for i in range(1, 6)],
            "lawSensitive": bool(q.get("lawSensitive")),
        }
out = HERE / "explanations" / f"{exam}-final.json"
out.write_text(json.dumps({"explanations": {str(k): v for k, v in sorted(final.items())}, "reviewFixes": log}, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print(exam, len(final), "questions,", len(log), "reviewer fixes applied")
