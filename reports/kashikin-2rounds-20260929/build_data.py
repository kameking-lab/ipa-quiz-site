import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
WORKTREE = Path("C:/wt/kashikin-20260929")
KEYS = ["ア", "イ", "ウ", "エ"]
TODAY = "2026-09-29"

def load(p):
    return json.loads((HERE / p).read_text(encoding="utf-8"))

def dump(p, obj):
    Path(p).parent.mkdir(parents=True, exist_ok=True)
    Path(p).write_text(json.dumps(obj, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")

def law_notice(meta):
    return (f"\n\n※問題冊子が示す基準日（{meta['lawReferenceDateJa']}）時点の法令・制度に基づく解説です。"
            "その後の改正に注意してください。")

def main():
    src = load("source-transcription.json")
    out_dir = HERE.parent.parent  # not used; caller copies into worktree
    for r, meta in src["rounds"].items():
        final = load(f"explanations/{r}-final.json")
        out, withheld = [], []
        for q in meta["questions"]:
            n = str(q["number"])
            if n not in final["explanations"]:
                withheld.append({"number": q["number"], "reason": final["held"].get(n, "査読PASSなし")})
                continue
            e = final["explanations"][n]
            # category is a structural fact (which of the 4 sections the page fell under),
            # not a legal judgment — always trust our own transcription over the model's.
            category = q["category"]
            ce = e["choiceExplanations"]
            assert len(ce) == 4, (r, n, "choiceExplanations count")
            for i, c in enumerate(ce):
                assert c and len(c) >= 15, (r, n, f"choice{i+1} too short/empty: {c!r}")
            assert e.get("summary") and len(e["summary"]) >= 10, (r, n, "summary too short/empty")
            ans_idx = q["officialAnswer"] - 1
            ans = KEYS[ans_idx]
            label = f"問{q['number']}"
            item = {
                "id": f"kashikin-{meta['year']}-annual-gakka-q{q['number']}",
                "exam": "kashikin", "session": "gakka", "year": meta["year"], "season": "annual",
                "qNumber": q["number"], "subject": "試験問題",
                "officialAnswerNumber": str(q["officialAnswer"]),
                "type": "multiple-choice", "category": category,
                "topicTags": [category, meta["label"]],
                "difficulty": 3, "question": q["stem"],
                "choices": {KEYS[i]: c for i, c in enumerate(q["choices"])},
                "answer": ans,
                "explanation": e["summary"] + (law_notice(meta) if e.get("lawSensitive") else ""),
                "choiceExplanations": {KEYS[i]: t for i, t in enumerate(e["choiceExplanations"])},
                "explanationCoverage": "full", "hasImage": False,
                "sourcePdfUrl": meta["pdfUrl"], "sourceAnswerUrl": meta["answerUrl"],
                "sourceAttribution": (
                    f"出典：一般社団法人日本貸金業協会 {meta['label']}（第{meta['roundNo']}回）"
                    f"貸金業務取扱主任者資格試験問題（問題・正答）{label}。"
                    "解説は過去問AIの独自作成で、日本貸金業協会とは関係ありません。"),
                "officialReferenceUrls": [src["indexUrl"]],
                "license": "JFSA-attributed", "needsReview": False,
                "lastUpdated": TODAY, "lawReferenceDate": meta["lawReferenceDate"],
            }
            out.append(item)
        year_file = f"{meta['year']}-annual.json"
        dump(HERE / f"data-{r}.json", out)
        dump(WORKTREE / "data" / "questions" / "kashikin" / year_file, out)
        dump(HERE / f"withheld-{r}.json", withheld)
        print(r, len(out), "published", len(withheld), "withheld", [w["number"] for w in withheld])

if __name__ == "__main__":
    main()
