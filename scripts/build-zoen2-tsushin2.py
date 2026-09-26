"""Publish only JCTC items that passed transcription and explanation review."""

from __future__ import annotations

import hashlib
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / "docs/evidence/zoen2-tsushin2"
REPORT = ROOT / "reports/zoen2-tsushin2-20260927"
ANSWERS = json.loads((REPORT / "official-answers.json").read_text(encoding="utf-8"))
URLS = {
    "zoen2": (
        "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/06/20260608z_mondaia.pdf",
        "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/06/20260608z_seitou.pdf",
    ),
    "tsushin2": (
        "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/06/20260608e_mondai.pdf",
        "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/06/20260608e_seitou.pdf",
    ),
}
PATTERNS = {
    "zoen2": re.compile(r"〔問題\s*(\d+)〕"),
    "tsushin2": re.compile(r"【No\.\s*(\d+)】"),
}


def compact(value: str) -> str:
    return re.sub(r"\s+", "", unicodedata.normalize("NFKC", value))


def load_json(path: Path):
    text = path.read_text(encoding="utf-8").strip()
    if text.startswith("```json"):
        text = text.removeprefix("```json").removesuffix("```").strip()
    return json.loads(text)


def display(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def official_pages(exam: str) -> dict[int, tuple[int, str]]:
    text = (EVIDENCE / f"{exam}-2026-extract.txt").read_text(encoding="utf-8")
    matches = list(PATTERNS[exam].finditer(text))
    expected = 40 if exam == "zoen2" else 65
    assert [int(match.group(1)) for match in matches] == list(range(1, expected + 1))
    result = {}
    for index, match in enumerate(matches):
        number = int(match.group(1))
        prior = list(re.finditer(r"--- PDF page (\d+) ---", text[: match.start()]))
        assert prior, number
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        result[number] = (int(prior[-1].group(1)), text[match.start() : end])
    return result


def build(exam: str, stems: list[str]) -> None:
    pages = official_pages(exam)
    question_url, answer_url = URLS[exam]
    records = []
    skipped = []
    for stem in stems:
        draft = load_json(REPORT / "agy-drafts" / stem)
        explanations = {int(item["number"]): item for item in load_json(REPORT / "agy-explanations" / stem)}
        review = {int(item["number"]): item for item in load_json(REPORT / "agy-qc" / stem)}
        for item in draft:
            number = int(item["number"])
            page, source = pages[number]
            explanation = explanations[number]
            qc = review[number]
            choices = item["choices"]
            assert len(choices) == 4, (exam, number)
            if item["needsVisual"] or explanation["reviewFlag"] or qc["status"] != "PASS":
                skipped.append({"number": number, "reason": item["missingDetails"] or explanation["reviewFlag"] or qc["issues"]})
                continue
            assert compact(item["question"]) in compact(source), (exam, number, "question transcription")
            assert all(compact(choice) in compact(source) for choice in choices), (exam, number, "choice transcription")
            assert len(explanation["choiceExplanations"]) == 4
            assert explanation["explanation"].strip() and all(text.strip() for text in explanation["choiceExplanations"])
            records.append({
                "number": number,
                "pdfPage": page,
                "category": "造園技術" if exam == "zoen2" else "電気通信技術",
                "topic": "第一次検定（前期）",
                "officialAnswerNumbers": ANSWERS[exam][number - 1],
                "question": display(item["question"]),
                "choices": [display(choice) for choice in choices],
                "explanation": display(explanation["explanation"]),
                "choiceExplanations": [display(text) for text in explanation["choiceExplanations"]],
            })
    assert records, exam
    assert len({record["number"] for record in records}) == len(records)
    payload = {
        "exam": exam,
        "year": 2026,
        "season": "early",
        "session": "gakka",
        "officialQuestionCount": 40 if exam == "zoen2" else 65,
        "publishedCount": len(records),
        "questionUrl": question_url,
        "questionSha256": hashlib.sha256((EVIDENCE / "input" / f"{exam}-2026-q.pdf").read_bytes()).hexdigest(),
        "answerUrl": answer_url,
        "answerSha256": hashlib.sha256((EVIDENCE / "input" / f"{exam}-2026-a.pdf").read_bytes()).hexdigest(),
        "questions": sorted(records, key=lambda record: record["number"]),
        "deferred": sorted(skipped, key=lambda record: record["number"]),
    }
    output = ROOT / "data/questions" / exam / "2026-early.json"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{exam}: published {len(records)}, deferred {len(skipped)}")


if __name__ == "__main__":
    build("zoen2", ["zoen2-01-10.txt"])
    build("tsushin2", ["tsushin2-01-10.txt"])
