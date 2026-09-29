import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
KEYS = ["①", "②", "③", "④"]

def load(p):
    return json.loads((HERE / p).read_text(encoding="utf-8"))

ROUNDS = {
    "R07": {
        "roundNo": 20, "year": 2025, "label": "令和7年度", "examDate": "2025-11-16",
        "lawReferenceDate": "2025-11-16", "lawReferenceDateJa": "令和7（2025）年11月16日（試験日）",
        "paper": "exam_paper_20th.pdf", "answerPdf": "20th_answer.pdf",
        "pdfUrl": "https://www.j-fsa.or.jp/chief/doc/qualifying_exam/exam_example/exam_paper_20th.pdf",
        "answerUrl": "https://www.j-fsa.or.jp/chief/doc/qualifying_exam/exam_example/20th_answer.pdf",
    },
    "R06": {
        "roundNo": 19, "year": 2024, "label": "令和6年度", "examDate": "2024-11-17",
        "lawReferenceDate": "2024-11-17", "lawReferenceDateJa": "令和6（2024）年11月17日（試験日）",
        "paper": "exam_paper_19th.pdf", "answerPdf": "19th_answer.pdf",
        "pdfUrl": "https://www.j-fsa.or.jp/chief/doc/qualifying_exam/exam_example/exam_paper_19th.pdf",
        "answerUrl": "https://www.j-fsa.or.jp/chief/doc/qualifying_exam/exam_example/19th_answer.pdf",
    },
}
INDEX_URL = "https://www.j-fsa.or.jp/chief/qualifying_exam/exam_example/"
EXAM = "貸金業務取扱主任者資格試験"

def parse_answer_key(pdf_name):
    import fitz
    doc = fitz.open(HERE / pdf_name)
    text = doc[0].get_text()
    # format: "問題  1\n①\n問題 26\n④\n..." pairs of (label, circle)
    import re
    pairs = re.findall(r"問題\s*(\d+)\s*\n\s*([①②③④])", text)
    keys = {int(n): KEYS.index(c) + 1 for n, c in pairs}
    assert sorted(keys) == list(range(1, 51)), sorted(keys)
    return keys

def main():
    rounds_out = {}
    for r, meta in ROUNDS.items():
        qs = load(f"{meta['paper']}.parsed.json")
        answers = parse_answer_key(meta["answerPdf"])
        assert len(qs) == 50
        out_questions = []
        for q in qs:
            n = q["number"]
            stem = q["stem"]
            if q["footnote"]:
                stem = stem + "\n\n" + q["footnote"]
            out_questions.append({
                "number": n,
                "category": q["category"],
                "stem": stem,
                "choices": q["choices"],
                "officialAnswer": answers[n],
            })
        rounds_out[r] = {**meta, "questions": out_questions}
    (HERE / "source-transcription.json").write_text(
        json.dumps({"exam": EXAM, "indexUrl": INDEX_URL, "rounds": rounds_out}, ensure_ascii=False, indent=1) + "\n",
        encoding="utf-8")
    print("wrote source-transcription.json", {r: len(v["questions"]) for r, v in rounds_out.items()})

if __name__ == "__main__":
    main()
