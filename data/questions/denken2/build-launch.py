"""Build data/questions/denken2/launch.json from receipt-bound reviewed rows.

A row is published only if
- its answer equals the manifest blank read from the official answer sheet,
- a first-party claude-opus-5-5 receipt pins this exact row (canonical SHA-256)
  with status PASS and no issues, and the pinned raw response bytes exist,
- all 15 choices and 15 choice explanations are present, and every figure exists.
Any failure aborts the build; nothing is silently dropped.

Usage: py -3.12 data/questions/denken2/build-launch.py [--check]
"""

from __future__ import annotations

import argparse
from hashlib import sha256
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
HERE = Path(__file__).resolve().parent
MANIFEST = ROOT / "scripts/denken2-source-manifest.json"
RECEIPTS = ROOT / "docs/evidence/denken2/receipts"
OUT = HERE / "launch.json"
IROHA = "イロハニホヘトチリヌルヲワカヨ"
KEYS = "アイウエオカキクケコサシスセソ"
CATEGORY = {"law": "法規", "power": "電力", "theory": "理論", "machinery": "機械"}
ISSUES = ("textIssues", "choiceIssues", "answerIssues", "explanationIssues", "figureIssues", "sourceIssues")
LAST_UPDATED = "2026-09-26"


def digest(data: bytes) -> str:
    return sha256(data).hexdigest()


def canonical(row: dict) -> str:
    return digest(json.dumps(row, ensure_ascii=False, sort_keys=True).encode("utf-8"))


def verified_receipt(stem: str) -> dict:
    path = RECEIPTS / f"{stem}-opus.json"
    receipt = json.loads(path.read_text(encoding="utf-8"))
    usage = (receipt.get("modelUsage") or {}).get("claude-opus-5-5") or {}
    if receipt.get("resolvedModel") != "claude-opus-5-5" or usage.get("provider") != "firstParty" \
            or [name for name in receipt["modelUsage"] if name.startswith("claude-")] != ["claude-opus-5-5"]:
        raise ValueError(f"{path}: not a first-party claude-opus-5-5 receipt")
    raw = ROOT / receipt["rawResponse"]
    if digest(raw.read_bytes().replace(b"\r\n", b"\n")) != receipt["rawResponseSha256"]:
        raise ValueError(f"{path}: raw response bytes do not match")
    return receipt


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="fail if launch.json would change")
    args = parser.parse_args()
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    session = manifest["sessions"][0]
    questions = []
    for paper in session["subjects"]:
        for official in paper["questions"]:
            stem = f"{session['examDate'].replace('-', '')}-{paper['subject']}-q{official['question']:02}"
            rows = json.loads((HERE / "reviewed" / f"{stem}.json").read_text(encoding="utf-8"))
            receipt = verified_receipt(stem)
            status = {a["unitKey"]: a for a in receipt["assessment"]}
            if receipt["inputHashes"]["officialBlanks"] != official["blanks"]:
                raise ValueError(f"{stem}: receipt reviewed against different official blanks")
            if [row["blank"] for row in rows] != [1, 2, 3, 4, 5]:
                raise ValueError(f"{stem}: expected blanks 1..5")
            for row, answer in zip(rows, official["blanks"], strict=True):
                key = f"q{row['questionNumber']:02}-{row['blank']}"
                assessment = status.get(key) or {}
                if assessment.get("status") != "PASS" or any(assessment.get(name) for name in ISSUES):
                    raise ValueError(f"{stem} {key}: no clean PASS")
                if receipt["inputHashes"]["candidateSha256"].get(key) != canonical(row):
                    raise ValueError(f"{stem} {key}: receipt pins a different candidate")
                if row["officialAnswer"] != answer or row["sourceQuestionPdfUrl"] != paper["url"] \
                        or row["sourceAnswerPdfUrl"] != session["officialAnswer"]["url"]:
                    raise ValueError(f"{stem} {key}: answer or source differs from manifest")
                if list(row["choices"]) != list(IROHA) or list(row["choiceExplanations"]) != list(IROHA) \
                        or not all(str(v).strip() for v in [*row["choices"].values(), *row["choiceExplanations"].values()]):
                    raise ValueError(f"{stem} {key}: 15 choices and 15 reasons required")
                for url in row["figureUrls"]:
                    if not (ROOT / "public" / url.lstrip("/")).is_file():
                        raise FileNotFoundError(url)
                to_key = dict(zip(IROHA, KEYS, strict=True))
                question = {
                    "id": f"denken2-{session['fiscalYear']}-{paper['subject']}-q{row['questionNumber']:02}-{row['blank']}",
                    "exam": "denken2",
                    "session": paper["session"],
                    "year": session["fiscalYear"],
                    "season": "primary",
                    "fiscalYear": session["fiscalYear"],
                    "examDate": session["examDate"],
                    "subject": paper["subject"],
                    "qNumber": row["questionNumber"],
                    "part": str(row["blank"]),
                    "officialAnswerNumber": answer,
                    "type": "multiple-choice",
                    "category": CATEGORY[paper["subject"]],
                    "topicTags": [CATEGORY[paper["subject"]], row["topic"]],
                    "difficulty": row["difficulty"],
                    "question": row["question"],
                    "choices": {to_key[k]: v for k, v in row["choices"].items()},
                    "answer": to_key[answer],
                    "explanation": row["explanation"],
                    "choiceExplanations": {to_key[k]: v for k, v in row["choiceExplanations"].items()},
                    "explanationCoverage": "full",
                    "hasImage": bool(row["figureUrls"]),
                    **({"imageUrls": row["figureUrls"]} if row["figureUrls"] else {}),
                    "sourcePdfUrl": paper["url"],
                    "sourceAnswerUrl": session["officialAnswer"]["url"],
                    "sourceAttribution": row["sourceAttribution"],
                    "officialReferenceUrls": row["officialReferenceUrls"],
                    "license": "ECEE-educational-reuse",
                    "lastUpdated": LAST_UPDATED,
                    **({"lawReferenceDate": row["lawReferenceDate"]} if row.get("lawReferenceDate") else {}),
                }
                questions.append(question)
    text = json.dumps(questions, ensure_ascii=False, indent=1) + "\n"
    if args.check:
        current = OUT.read_text(encoding="utf-8") if OUT.exists() else ""
        if current.replace("\r\n", "\n") != text:
            raise SystemExit("launch.json is stale; run build-launch.py")
        print(f"launch.json up to date: {len(questions)} units")
        return
    OUT.write_text(text, encoding="utf-8", newline="\n")
    print(f"wrote {OUT} with {len(questions)} units")


if __name__ == "__main__":
    main()
