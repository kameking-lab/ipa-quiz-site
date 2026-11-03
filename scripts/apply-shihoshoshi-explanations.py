#!/usr/bin/env python3
"""Render independently authored statement reasons into the five displayed choices.

No answer, question, choice, session or source attribution is generated here.
Default: check the committed output. Use --write to apply editorial changes.
An unresolved statement keeps its entire question under review, without claiming
full coverage. Official-summary is not an appropriate label for partial reasons.
"""

import argparse
import copy
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/questions/shihoshoshi"
EDITORIAL = DATA / "editorial"
KEYS = "アイウエオ"


def encode(value):
    return json.dumps(value, ensure_ascii=False, indent=2) + "\n"


def reference_laws(q):
    n = q["qNumber"]
    if q["session"] == "am":
        return ["constitution" if n <= 3 else "civil" if n <= 23 else
                "penal" if n <= 26 else "company" if n <= 34 else "commercial"]
    if n <= 5:
        return ["procedure"]
    if n == 6:
        return ["preservation"]
    if n == 7:
        return ["execution"]
    if n == 8:
        return ["judicial-scrivener", "company"]
    if n <= 11:
        return ["deposit-rules", "civil", "execution", "preservation", "adjustment"]
    if n <= 27:
        laws = ["registration", "registration-order", "registration-rules", "civil"]
        if n == 27:
            laws += ["tax"]
        if n == 18:
            laws += ["farmland"]
        if n == 19:
            laws += ["lease"]
        if q["year"] == 2026 and n == 24:
            laws += ["trust"]
        if q["year"] == 2026 and n == 26:
            laws += ["administrative-appeal"]
        return laws
    laws = ["company", "commercial-reg", "commercial-reg-rules"]
    if (q["year"], n) in [(2025, 35), (2026, 33)]:
        laws += ["general-corporation"]
    if q["year"] == 2026 and n == 35:
        laws += ["companies-adjustment"]
    return laws


def render(questions_by_year=None):
    legal_sources = json.loads((EDITORIAL / "legal-sources.json").read_text())
    sources = legal_sources["sources"]
    urls = {(s["law"], s["assessmentDate"]): s["url"] for s in sources}
    review = legal_sources.get("holdReleaseReview", {})
    documents = {d["id"]: d for d in review.get("documents", [])}
    statement_urls = {}
    for item in review.get("statementReviews", []):
        if item["status"] == "released":
            statement_urls.setdefault(item["questionId"], []).extend(
                documents[ref["documentId"]]["url"] for ref in item["references"])
    outputs = {}
    holds = {}
    for year in (2025, 2026):
        questions = (json.loads((DATA / f"{year}.json").read_text())
                     if questions_by_year is None else copy.deepcopy(questions_by_year[year]))
        for session in ("am", "pm"):
            drafts = json.loads((EDITORIAL / f"{year}-{session}.json").read_text())
            records = [q for q in questions if q["session"] == session]
            assert set(drafts) == {str(q["qNumber"]) for q in records}
            for q in records:
                summary, reasons = drafts[str(q["qNumber"])]
                assert len(reasons) == 5 and len(summary) >= 30, q["id"]
                assert all(len(r) >= 20 and r.startswith(("正しい。", "誤り。", "保留。")) for r in reasons), q["id"]
                unresolved = {k: r for k, r in zip(KEYS, reasons) if r.startswith("保留。")}
                blank = (year, session, q["qNumber"]) == (2026, "am", 3)
                # Consistency check only: never infer legal reasons from the key.
                if blank:
                    assert [k for k, r in zip(KEYS, reasons) if r.startswith("正しい。")] == [q["answer"]]
                else:
                    header = q["question"].split("教授：")[0] if "教授：" in q["question"] else q["question"].split("   ア")[0]
                    target = "誤り。" if "誤っている" in re.sub(r"\s", "", header) else "正しい。"
                    for k, r in zip(KEYS, reasons):
                        if k not in unresolved:
                            assert (k in q["choices"][q["answer"]]) == r.startswith(target), (q["id"], k)
                if year == 2025:
                    q.pop("lawReferenceDate", None)
                    date_note = "出題年度の法令についての解説（2025年度の公式冊子に基準日の記載なし。法令資料の暫定検討日は2025年4月1日であり、公式基準日を示すものではない）。"
                else:
                    q["lawReferenceDate"] = "2026-04-01"
                    date_note = "出題時点の法令（2026年4月1日現在）に基づく。"
                details = [f"記述{k}：{r}" for k, r in zip(KEYS, reasons)]
                q["explanation"] = date_note + "\n" + summary
                if not blank:
                    q["explanation"] += "\n\n" + "\n".join(details)
                q["choiceExplanations"] = {}
                for index, key in enumerate(KEYS):
                    if blank:
                        q["choiceExplanations"][key] = reasons[index]
                    else:
                        combination = q["choices"][key]
                        assert len(combination) == 2 and all(k in KEYS for k in combination), q["id"]
                        q["choiceExplanations"][key] = "\n".join(details[KEYS.index(k)] for k in combination)
                q["lastUpdated"] = "2026-11-03"
                q["officialReferenceUrls"] = list(dict.fromkeys(
                    [urls[(law, f"{year}-04-01")] for law in reference_laws(q)]
                    + statement_urls.get(q["id"], [])))
                if unresolved:
                    q["needsReview"] = True
                    q.pop("explanationCoverage", None)
                    holds[q["id"]] = unresolved
                    q["explanation"] += "\n\n保留理由：上記の保留記述の法的根拠が未確認のため、この問題全体を公開前レビュー対象に残す。公式正答番号は変更していない。"
                else:
                    q.pop("needsReview", None)
                    q["explanationCoverage"] = "full"
        outputs[DATA / f"{year}.json"] = encode(questions)
    outputs[EDITORIAL / "holds.json"] = encode(holds)
    return outputs, holds


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()
    outputs, holds = render()
    stale = []
    for path, content in outputs.items():
        if args.write:
            path.write_text(content)
        elif not path.exists() or path.read_text() != content:
            stale.append(str(path.relative_to(ROOT)))
    print(encode({"questions": 139, "choices": 695, "full": 139 - len(holds),
                  "held": len(holds), "unresolvedStatements": sum(map(len, holds.values())),
                  "stale": stale}), end="")
    raise SystemExit(1 if stale else 0)
