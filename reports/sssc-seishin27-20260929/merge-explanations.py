"""Track draft -> independent review rounds and publish only reviewer-PASSed text.

Usage:
  py -3.12 reports/sssc-seishin27-20260929/merge-explanations.py next [--all]  # rereview candidates
  py -3.12 reports/sssc-seishin27-20260929/merge-explanations.py final   # write <session>-final.json

Per batch the rounds are: batchN.draft.json (claude-opus-5-5, no tools), then
batchN.review.json, batchN.rereview1.json, ... (each a fresh claude-opus-5-5 session with
WebFetch/WebSearch for primary sources). A reviewer FIX is applied verbatim to the
candidate, and the fixed text must be reviewed again in the next round. Only text whose
latest review is PASS is adopted; HOLD (by the drafter or a reviewer) stays unpublished.
"""
import glob
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
KEYS = ("1", "2", "3", "4", "5")


def load(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def rounds_of(base: str) -> list[str]:
    tags = ["review"]
    extra = sorted(
        (int(m.group(1)) for p in glob.glob(base + ".rereview*.json")
         if (m := re.search(r"\.rereview(\d+)\.json$", p))),
    )
    return tags + [f"rereview{n}" for n in extra]


def trace(base: str):
    draft = load(base + ".draft.json")
    state = {}
    for q in draft["questions"]:
        state[q["number"]] = {
            "summary": q["summary"],
            "choiceExplanations": dict(q["choiceExplanations"]),
            "lawSensitive": bool(q.get("lawSensitive")),
            "status": "HOLD" if q["status"] != "PASS" else "UNREVIEWED",
            "reason": q.get("issue", "") if q["status"] != "PASS" else "",
            "history": [["draft", q["status"]]],
            "evidence": [],
        }
    for tag in rounds_of(base):
        path = Path(f"{base}.{tag}.json")
        if not path.exists():
            continue
        review = load(path)
        assert "questions" in review, (path, review.get("parseError"))
        candidate = load(f"{base}.{tag}.candidate.json") if tag != "review" else draft
        expected = {q["number"] for q in candidate["questions"]}
        got = {q["number"]: q for q in review["questions"]}
        assert set(got) == expected, (path, sorted(expected ^ set(got)))
        for n, r in got.items():
            s = state[n]
            if s["status"] == "HOLD":
                continue
            s["history"].append([tag, r["status"]])
            s["evidence"].extend(r.get("evidence") or [])
            if r["status"] == "PASS":
                s["status"] = "PASS"
            elif r["status"] == "FIX":
                fixes = {k: v for k, v in (r.get("fixes") or {}).items() if v not in (None, "")}
                for key, text in fixes.items():
                    if key == "summary":
                        s["summary"] = text
                    elif key == "lawSensitive":
                        s["lawSensitive"] = bool(text)
                    elif key in KEYS:
                        s["choiceExplanations"][key] = text
                s["status"] = "FIX"
                s.setdefault("fixes", []).append({"round": tag, "problems": r.get("problems", ""), "fixedKeys": sorted(fixes)})
            else:
                s["status"] = "HOLD"
                s["reason"] = r.get("problems", "")
    return state


def batches():
    for session in ("senmon", "kyotsu"):
        for draft in sorted(glob.glob(str(HERE / "explanations" / session / "batch*.draft.json"))):
            yield session, draft[: -len(".draft.json")]


def cmd_next(all_open: bool = False):
    """Candidates for the next round: FIXed questions, or (all_open) every non-HOLD question."""
    for session, base in batches():
        state = trace(base)
        pending = [n for n, s in state.items() if s["status"] == "FIX" or (all_open and s["status"] != "HOLD")]
        if not pending:
            continue
        done = [t for t in rounds_of(base) if Path(f"{base}.{t}.json").exists()]
        n = sum(t.startswith("rereview") for t in done) + 1
        out = Path(f"{base}.rereview{n}.candidate.json")
        payload = {"questions": [
            {"number": k, "summary": state[k]["summary"], "choiceExplanations": state[k]["choiceExplanations"],
             "lawSensitive": state[k]["lawSensitive"]} for k in sorted(pending)]}
        out.write_text(json.dumps(payload, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
        print(out.relative_to(HERE), len(pending), "questions", f"rereview{n}")


def cmd_final():
    for session in ("senmon", "kyotsu"):
        final, held, log = {}, {}, []
        for s_name, base in batches():
            if s_name != session:
                continue
            for n, s in trace(base).items():
                entry = {"history": s["history"], "fixes": s.get("fixes", []), "evidence": s["evidence"]}
                if s["status"] == "PASS":
                    reasons = s["choiceExplanations"]
                    assert sorted(reasons) == list(KEYS), n
                    assert all(len(v.strip()) >= 25 for v in reasons.values()), n
                    final[n] = {"summary": s["summary"], "choiceExplanations": [reasons[k] for k in KEYS],
                                "lawSensitive": s["lawSensitive"]}
                elif s["status"] == "HOLD":
                    held[n] = s["reason"]
                else:
                    raise SystemExit(f"{session} 問題{n}: latest review is {s['status']}; run another rereview round")
                log.append({"number": n, **entry})
        out = HERE / "explanations" / f"{session}-final.json"
        out.write_text(json.dumps({
            "explanations": {str(k): v for k, v in sorted(final.items())},
            "held": {str(k): v for k, v in sorted(held.items())},
            "reviewLog": sorted(log, key=lambda e: e["number"]),
        }, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
        print(session, len(final), "reviewer-PASS questions,", len(held), "held:", sorted(held))


if __name__ == "__main__":
    if sys.argv[1] == "next":
        cmd_next(all_open="--all" in sys.argv)
    else:
        cmd_final()
