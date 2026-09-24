"""Build the fixed Denken 3 launch set. Use --check to verify launch.json."""

import argparse
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[3]
BASE = ROOT / "data/questions/denken3"
MANIFEST = ROOT / "scripts/denken3-source-manifest.json"
GENERATION = ROOT / "docs/evidence/denken3/generation"
OUTPUT = BASE / "launch.json"
CHOICES = {str(i): kana for i, kana in enumerate("アイウエオ", 1)}
SESSIONS = {"theory": "riron", "power": "denryoku", "machinery": "kikai", "law": "houki"}
CATEGORIES = {"theory": "理論", "power": "電力", "machinery": "機械", "law": "法規"}
HOLDS = {("2026-03-22", "power", 1, None), ("2026-03-22", "law", 4, None)}
HOLD_SUMMARY = {
    ("2026-03-22", "power", 1, None): "この設問は、水力発電所を落差を得る方法と河川流量の利用方法という二つの軸で整理する問題です。各空欄が分類名・貯水の有無・需要に合わせた運転のどれを問うか、公式問題文と照らして読み分けます。",
    ("2026-03-22", "law", 4, None): "この設問は、機械器具の接地について使用電圧、設置場所、漏電遮断器、接地抵抗値、接地線の条件を比較する問題です。各選択肢の条件を分けて、公式の技術基準と照らして判断します。",
}
INTERNAL = re.compile(r"\b(?:HOLD|FIX|TODO)\b|未確認|要確認|確認待ち|準備中|仮置き")
PUBLIC_INTERNAL = re.compile(r"\b(?:HOLD|FIX|TODO)\b")


def read(path):
    return json.loads(path.read_text(encoding="utf-8"))


def require(condition, message):
    if not condition:
        raise ValueError(message)


def converted(values):
    require(set(values) == set(CHOICES), "choice set must be 1–5")
    require(all(isinstance(v, str) and v.strip() for v in values.values()), "empty choice")
    return {kana: values[n] for n, kana in CHOICES.items()}


def build():
    expected = {}
    papers = set()
    for session in read(MANIFEST)["sessions"]:
        date = session["examDate"]
        for paper in session["subjects"]:
            subject = paper["subject"]
            papers.add((session["fiscalYear"], session["term"], subject))
            for unit in paper["answerUnits"]:
                key = (date, subject, unit["question"], unit["part"])
                require(key not in expected, f"duplicate official unit {key}")
                expected[key] = (session, paper, unit)
    require(len(papers) == 16 and len(expected) == 320, "official manifest must be 16 papers / 320 units")

    reviewed = {}
    for path in sorted((BASE / "reviewed").glob("*.json")):
        rows = read(path)
        require(isinstance(rows, list), f"reviewed source must be an array: {path.name}")
        for row in rows:
            key = (row["examDate"], row["subject"], row["questionNumber"], row["part"])
            require(key in expected and key not in reviewed, f"duplicate or unofficial reviewed unit {key}")
            reviewed[key] = row
    require(len(reviewed) == 318 and set(expected) - set(reviewed) == HOLDS, "reviewed set changed")

    questions = []
    for key, (session, paper, unit) in expected.items():
        date, subject, number, part = key
        held = key in HOLDS
        if held:
            draft = read(GENERATION / date.replace("-", "") / subject / f"q{number:02}-vision-draft.json")
            matching = [candidate for candidate in draft["units"] if candidate["part"] == part]
            require(len(matching) == 1 and matching[0]["needsReview"] is True, f"held draft changed {key}")
            row = matching[0]
        else:
            row = reviewed[key]
            require(row["needsReview"] is False, f"reviewed status changed {key}")
            require((row["fiscalYear"], row["term"], row["subject"], row["questionNumber"], row["part"]) == (session["fiscalYear"], session["term"], subject, number, part), f"reviewed identity changed {key}")
            reasons = row["choiceExplanations"]
            require(set(reasons) == set(CHOICES) and all(isinstance(v, str) and v.strip() for v in reasons.values()), f"five reasons required {key}")
        require(row["officialAnswer"] == unit["answer"] and row["officialAnswer"] in CHOICES, f"official answer mismatch {key}")
        require(row["sourceQuestionPdfUrl"] == paper["url"], f"question URL mismatch {key}")
        require(row["sourceAnswerPdfUrl"] == session["officialAnswer"]["url"], f"answer URL mismatch {key}")
        require(isinstance(row["question"], str) and row["question"].strip(), f"empty question {key}")
        require(not INTERNAL.search(row["question"]), f"internal marker in question {key}")
        choices = converted(row["choices"])
        require(not any(INTERNAL.search(value) for value in choices.values()), f"internal marker in choice {key}")
        figures = row.get("figureUrls", [])
        choice_figures = row.get("choiceFigureUrls", {})
        for url in [*figures, *choice_figures.values()]:
            require(url.startswith("/images/denken3/") and (ROOT / "public" / url.lstrip("/")).is_file(), f"missing figure {key}: {url}")
        fiscal = session["fiscalYear"]
        term = session["term"]
        label = f"令和{fiscal - 2018}年度{'上期' if term == 'upper' else '下期'}"
        q = {
            "id": f"denken3-{fiscal}-{term}-{subject}-q{number:02}" + (f"-{part}" if part else ""),
            "exam": "denken3", "session": SESSIONS[subject], "year": fiscal,
            "season": "first" if term == "upper" else "second",
            "fiscalYear": fiscal, "term": term, "examDate": date, "subject": subject,
            "qNumber": number, "type": "multiple-choice", "category": CATEGORIES[subject],
            "topicTags": [CATEGORIES[subject]], "difficulty": 3,
            "question": row["question"], "choices": choices,
            "answer": CHOICES[row["officialAnswer"]],
            "officialAnswerNumber": row["officialAnswer"],
            "explanation": row["explanation"] if not held else f"公式正答は（{row['officialAnswer']}）です。{HOLD_SUMMARY[key]}選択肢ごとの解説は掲載していません。",
            "explanationCoverage": "official-summary" if held else "full",
            "hasImage": bool(figures or choice_figures),
            "sourcePdfUrl": paper["url"], "sourceAnswerUrl": session["officialAnswer"]["url"],
            "sourceAttribution": row.get("sourceAttribution") if not held else f"出典：{label}第三種電気主任技術者試験 {CATEGORIES[subject]}科目 問{number}。問題文・選択肢を読みやすく整形。",
            "officialReferenceUrls": [] if held else row.get("officialReferenceUrls", []),
            "license": "ECEE-educational-reuse", "lastUpdated": "2026-09-25",
        }
        if part:
            q["part"] = part
        if not held:
            q["choiceExplanations"] = converted(row["choiceExplanations"])
        if figures:
            q["imageUrls"] = figures
        if choice_figures:
            q["choiceImageUrls"] = {CHOICES[n]: url for n, url in choice_figures.items()}
        questions.append(q)
    require(len(questions) == len({q["id"] for q in questions}) == 320, "duplicate or missing public ID")
    require(not PUBLIC_INTERNAL.search(json.dumps(questions, ensure_ascii=False)), "internal marker in public payload")
    return questions


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    rendered = json.dumps(build(), ensure_ascii=False, indent=2) + "\n"
    if args.check:
        require(OUTPUT.is_file() and OUTPUT.read_text(encoding="utf-8") == rendered, "launch.json differs from pinned sources")
    else:
        OUTPUT.write_text(rendered, encoding="utf-8")
    print("Denken 3 launch data: 16 papers, 320 units, 318 full + 2 official-summary")
