import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
KEYS = ["ア", "イ", "ウ", "エ"]

def load(p):
    return json.loads((HERE / p).read_text(encoding="utf-8"))

def dump(p, obj):
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(obj, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")

def main():
    src = load("source-transcription.json")
    for r, meta in src["rounds"].items():
        qs = meta["questions"]
        for b in range(5):
            part = qs[b * 10:(b + 1) * 10]
            batch = {
                "exam": src["exam"], "round": f"{meta['label']}（第{meta['roundNo']}回）貸金業務取扱主任者資格試験",
                "lawReferenceDateJa": meta["lawReferenceDateJa"],
                "questions": [],
            }
            for q in part:
                batch["questions"].append({
                    "number": q["number"],
                    "category": q["category"],
                    "question": q["stem"],
                    "choices": {str(i + 1): c for i, c in enumerate(q["choices"])},
                    "officialAnswer": q["officialAnswer"],
                })
            dump(HERE / "explanations" / r / f"batch{b + 1}.json", batch)
    print("batches written")

if __name__ == "__main__":
    main()
