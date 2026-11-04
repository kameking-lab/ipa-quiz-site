"""Build private editorial records; never register them with public loaders."""
from pathlib import Path
import json
import re
import sys
import unicodedata

import fitz

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "data/qualification-staging/sokuryoshi"


def read(name):
    return json.loads((OUT / name).read_text(encoding="utf-8"))


def write(name, data):
    (OUT / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def pages(doc_id, *numbers):
    return [{"documentId": doc_id, "page": n} for n in numbers]


def run():
    cache = Path(sys.argv[1])
    keys = {}
    for year, doc_id in [(2025, "000270179"), (2026, "000278971")]:
        text = unicodedata.normalize("NFKC", "".join(p.get_text() for p in fitz.open(cache / f"{doc_id}.pdf")))
        entries = [(int(a), int(b)) for a, b in re.findall(r"No\.\s*(\d+)\s+([1-5])", text)]
        assert [n for n, _ in entries] == list(range(1, 29)), entries
        keys[str(year)] = {"sourceUrl": f"https://www.gsi.go.jp/common/{doc_id}.pdf",
            "sourcePages": pages(doc_id, 1), "answers": [a for _, a in entries]}
    write("official-answer-keys.json", keys)
    # Extract all small-question headings independently from the official example
    # sheets. Parent A/B headings are kept only when they have no numbered children.
    descriptive_keys = {}
    for year, doc_id in [(2025, "000271324"), (2026, "000279272")]:
        doc = fitz.open(cache / f"{doc_id}.pdf")
        items = {}
        for number in range(1, 6):
            text = unicodedata.normalize("NFKC", doc[2*number-2].get_text() + doc[2*number-1].get_text())
            headings = re.findall(r"問\s*([ABCD])\s*[−ー\-]?\s*([1-9])?", text)
            labels = []
            for letter in "ABCD":
                children = sorted({int(n) for k, n in headings if k == letter and n})
                if children:
                    labels.extend(f"{letter}-{n}" for n in children)
                elif any(k == letter for k, _ in headings):
                    labels.append(letter)
            assert labels, (year, number)
            items[str(number)] = {"labels": labels, "sourcePages": pages(doc_id, 2*number-1, 2*number)}
        descriptive_keys[str(year)] = {"sourceUrl":f"https://www.gsi.go.jp/common/{doc_id}.pdf", "questions":items}
    write("official-descriptive-sections.json", descriptive_keys)
    maps = {
        2026: [pages("000278970", *ns) for ns in [
            [3],[4],[5],[6],[7],[8],[9,10],[11],[12],[12],[13],[13],[14],[15],
            [16],[17],[18],[19],[20],[21],[22,23],[24],[24],[25],[26],[27],[28],[29]]],
        2025: [pages("000270172", *ns) for ns in [[3],[4],[5],[6],[7],[8],[9],[10],[11],[11],[12],[13],[14]]]
              + [pages("000270173", *ns) for ns in [[1],[1],[2],[2],[3],[3],[4],[5,6],[7],[8],[8],[9],[10],[11],[12]]]
    }
    pm_maps = {
        2026: [pages("000278972", *range(3,11)), pages("000278972", *range(11,19)),
               pages("000278972", *range(19,24)) + pages("000278973",1,2),
               pages("000278973", *range(3,11)), pages("000278973", *range(11,22))],
        2025: [pages("000270174", *range(3,10)), pages("000270174", *range(10,16)),
               pages("000270174", *range(16,21)) + pages("000270176",1,2),
               pages("000270176", *range(3,10)), pages("000270176", *range(10,18))]
    }
    pm_notes = read("pm-notes.json")
    rounds = []
    for year in [2025, 2026]:
        notes = read(f"{year}-am-notes.json")
        questions = []
        for i, refs in enumerate(maps[year], 1):
            note = notes[str(i)]
            answer = keys[str(year)]["answers"][i-1]
            explanations = note.get("options")
            if "combinations" in note:
                incorrect = set(note["falseStatements"])
                explanations = []
                for combination in note["combinations"]:
                    selected = set(combination)
                    extra, missing = selected - incorrect, incorrect - selected
                    text = "この組は誤った記述だけを過不足なく含む。" if selected == incorrect else "この組は不適切。"
                    if extra:
                        text += "正しい記述" + "・".join(sorted(extra)) + "を含めている。"
                    if missing:
                        text += "誤った記述" + "・".join(sorted(missing)) + "が不足する。"
                    text += "\n" + "\n".join(k + "：" + v for k, v in note["statements"].items())
                    explanations.append(text)
                assert set(note["combinations"][answer-1]) == incorrect, (year, i)
            assert len(explanations) == 5
            questions.append({"id":f"sokuryoshi-{year}-annual-am-q{i}", "slug":"sokuryoshi",
                "year":year, "session":"am", "officialQuestionNumber":i,
                "officialQuestionLabel":f"〔No. {i}〕", "type":"multiple-choice",
                "publicAllowed":False, "needsReview":True, "category":note["topic"],
                "originalQuestion":{"format":"lossless-page-images", "sourcePages":refs,
                    "selector":f"午前 No.{i}（同一ページに他問がある場合もこの番号の設問のみ）"},
                "sourcePdfUrls":list(dict.fromkeys(f"https://www.gsi.go.jp/common/{r['documentId']}.pdf" for r in refs)),
                "sourceAnswerUrl":keys[str(year)]["sourceUrl"], "officialAnswerNumber":answer,
                "originalAnswer":{"format":"official-choice-table", "sourcePages":keys[str(year)]["sourcePages"]},
                "choices":[{"officialNumber":j, "originalChoice":{"questionSource":"originalQuestion","printedNumber":j},
                    "explanation":e} for j,e in enumerate(explanations,1)],
                "explanation":note.get("calculation", "\n".join(note.get("statements",{}).values()) or explanations[answer-1]),
                "sourceAttribution":f"出典：国土地理院 令和{year-2018}年測量士試験 午前 No.{i}（公式問題・公式解答）。原文は原本画像、解説は過去問AIの独自作成。",
                "officialReferenceUrls":["https://www.gsi.go.jp/common/000258734.pdf"],
                "lawReferenceDate":None, "lawReferenceNote":"出題当時の法令・作業規程に基づく。原問で特定された基準日を優先し、現在の規定に書き換えない。",
                "lastUpdated":"2026-11-04"})
        answer_id, sheet_id = ("000279272","000279273") if year == 2026 else ("000271324","000271266")
        for i, refs in enumerate(pm_maps[year], 1):
            note = pm_notes[str(year)][str(i)]
            assert list(note["parts"]) == descriptive_keys[str(year)]["questions"][str(i)]["labels"], (year, i, "missing or misordered explanation section")
            questions.append({"id":f"sokuryoshi-{year}-annual-pm-q{i}", "slug":"sokuryoshi",
                "year":year, "session":"pm", "officialQuestionNumber":i,
                "officialQuestionLabel":("必須" if i==1 else "選択")+f"〔No. {i}〕", "type":"descriptive",
                "publicAllowed":False,"needsReview":True,"category":note["topic"],
                "originalQuestion":{"format":"lossless-page-images","sourcePages":refs},
                "sourcePdfUrls":list(dict.fromkeys(f"https://www.gsi.go.jp/common/{r['documentId']}.pdf" for r in refs)),
                "sourceAnswerUrl":f"https://www.gsi.go.jp/common/{answer_id}.pdf",
                "originalAnswer":{"format":"official-example-images","sourcePages":pages(answer_id,2*i-1,2*i)},
                "answerSheetPages":pages(sheet_id,2*i-1,2*i),
                "automaticScoringAllowed":False,
                "explanationSections":[{"label":"問"+k,"text":v} for k,v in note["parts"].items()],
                "sourceAttribution":f"出典：国土地理院 令和{year-2018}年測量士試験 午後 No.{i}（公式問題・公式解答例）。図表・作図を含む原文は原本画像、解説は過去問AIの独自作成。",
                "officialReferenceUrls":["https://www.gsi.go.jp/common/000258734.pdf"],
                "lawReferenceDate":None,"lawReferenceNote":"出題当時の法令・作業規程に基づく。公式解答例は採点基準全体ではなく記述・作図の一例であり、択一正答へ変換しない。",
                "lastUpdated":"2026-11-04"})
        date = f"{year}-05-"+("17" if year==2026 else "18")
        data={"slug":"sokuryoshi","publicAllowed":False,"year":year,"examDate":date,
            "instructions":{"morningQuestionCount":28,"mandatoryAfternoonNumber":1,
                "optionalAfternoonNumbers":[2,3,4,5],"requiredOptionalCount":2},"questions":questions}
        write(f"{year}.json",data)
        rounds.append({"year":year,"examDate":date,"morningCount":28,"afternoonOriginalCount":5,
            "afternoonExplanationSectionCount":sum(len(q.get("explanationSections",[])) for q in questions)})
    write("manifest.json",{"slug":"sokuryoshi","name":"測量士（国土地理院）午前・午後",
        "administrator":"国土地理院","publicationStatus":"staged","publicAllowed":False,
        "canonicalFormat":"lossless-original-page-images","reviewStatus":"awaiting-independent-review",
        "originalCount":66,"morningCount":56,"afternoonOriginalCount":10,"choiceExplanationCount":280,
        "afternoonExplanationSectionCount":sum(r["afternoonExplanationSectionCount"] for r in rounds),
        "rounds":rounds,"officialIndexUrl":"https://www.gsi.go.jp/LAW/SHIKEN/past.html",
        "officialReuseTermsUrl":"https://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html",
        "missingPdfUrls":[],"remainingPublicationWork":["人手による原本と技術根拠の最終確認","地図等の測量成果・第三者権利と利用手続の個別確認","公開を明示的に承認する別タスク"]})
    print("Built 66 private originals, 280 option explanations, 10 descriptive questions")


if __name__ == "__main__":
    run()
