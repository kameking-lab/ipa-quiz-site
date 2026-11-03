"""Build one staged qualification from PDF extraction and independently written notes.

Run extraction first, then: python scripts/khk-reito-build.py /tmp/khk-reito-pdfs 1
The answer key is read from the official answer PDF, not inferred from notes.
"""
import hashlib
import json
import re
import sys
from pathlib import Path

root = Path(sys.argv[1])
rank = int(sys.argv[2])
letter = "GHI"[rank - 1]
code = f"khk-reito-{rank}"
name = ["第一種", "第二種", "第三種"][rank - 1] + "冷凍機械"
stage = Path("data/qualification-staging/khk-reito")
parsed = json.loads((root / "parsed.json").read_text())
notes = json.loads((stage / (["first", "second", "third"][rank - 1] + "-notes.json")).read_text())
models = json.loads((stage / "descriptive-review.json").read_text())
glyphs = {7713: "摺", 20273: "隙", 7966: "汲", 9477: "A", 9479: "C", 9480: "D", 9487: "K", 9488: "L", 9491: "O", 9492: "P", 9498: "V", 9509: "a", 9516: "h", 9524: "p", 9525: "q", 9526: "r", 9528: "t", 9530: "v"}


def clean(text):
    text = re.sub(r"\(cid:(\d+)\)", lambda m: glyphs[int(m[1])], text)
    for a, b in {"\uf046": "Φ", "\uf066": "Φ", "\uf068": "η", "\uf061": "α", "\uf073": "σ", "\uf06c": "λ"}.items():
        text = text.replace(a, b)
    text = re.sub(r"^\s*[GHIXYZ]{1,2}\s*$", "", text, flags=re.M)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def url(filename, year):
    sub = "1110/" if year == 2025 else ""
    if "kaitourei" in filename:
        sub = "1219/"
    return f"https://www.khk.or.jp/Portals/0/khk/exam/{year}/{sub}{filename}"


def answer_rows(year):
    text = (root / f"R{year - 2018}fy_kaitou.txt").read_text()
    if year == 2025:
        rows = re.findall(rf"^{letter}([XYZ]) .+?((?:[1-5] )+[1-5])(?: ＊.*)?$", text, re.M)
        return {kind: [int(n) for n in nums.split()] for kind, nums in rows}
    # R6 has no subject codes. Anchor to the exact (spaced) qualification name.
    lines = text.splitlines()
    pos = next(i for i, line in enumerate(lines) if re.sub(r"\s", "", line).startswith(name))
    start = pos - 1 if lines[pos - 1].startswith("法令 ") else pos
    answer_lines = [line for line in lines[start:start + 4] if re.search(r"(法令|保安|学識) [1-5] ", line)][:3 if rank == 2 else 2]
    return {dict(法令="X", 保安="Y", 学識="Z")[re.search(r"(法令|保安|学識)", line)[0]]:
            [int(n) for n in re.findall(r"(?<!\S)[1-5](?!\S)", line)] for line in answer_lines}


records = []
sources = []
for year in [2025, 2024]:
    era = year - 2018
    key = answer_rows(year)
    for kind, session, subject in [("X", "houki", "法令"), ("Y", "hoan", "保安管理技術"), ("Z", "kogaku", "学識")]:
        if rank == 3 and kind == "Z":
            continue
        paper = f"R{era}AC{letter}{kind}-W"
        rows = parsed[paper]
        descriptive = rank == 1 and kind == "Z"
        assert len(rows) == (5 if descriptive else len(key[kind]))
        answer_file = ("R7fy_kaitourei_3.pdf" if year == 2025 else "R6fy_03.pdf") if descriptive else f"R{era}fy_kaitou.pdf"
        source_url, answer_url = url(paper + ".pdf", year), url(answer_file, year)
        if not descriptive:
            assert len(notes[paper]) == len(rows)
        for row in rows:
            number = row["qNumber"]
            text = clean(row["question"])
            if (rank, year, kind, number) == (3, 2025, "X", 6):
                # PDF p.2: the horizontal fraction bar is not a minus sign.
                assert "Ｇ＝－Ｖ\nＣ" in text
                text = text.replace("Ｇ＝－Ｖ\nＣ", "Ｇ＝Ｖ／Ｃ")
            premise = clean(row["premise"])
            if premise:
                text = premise + "\n\n" + text
            item = dict(id=f"{code}-{year}-annual-{session}-q{number}", exam=code, session=session,
                        year=year, season="annual", qNumber=number, examDate=f"{year}-11-{'09' if year == 2025 else '10'}",
                        subject=subject, type="descriptive" if descriptive else "multiple-choice", category=subject,
                        topicTags=[name, subject], difficulty=3, question=text,
                        hasImage=False, sourcePdfUrl=source_url, sourceAnswerUrl=answer_url,
                        sourceAttribution=f"出典：高圧ガス保安協会 令和{era}年度 {name} {subject} 問{number}。解説は過去問AI独自作成。",
                        license="KHK-owner-decision", needsReview=False, lastUpdated="2026-11-03")
            if kind == "X":
                item["lawReferenceDate"] = f"{year}-04-01"
                item["questionNotice"] = f"出題時点の法令（{year}年4月1日現在施行）に基づく。危険のおそれがないと大臣が認めた場合等の規定は適用しない。都道府県知事等には指定都市の長を含む。"
            if descriptive:
                item.update(answer=models[paper][number - 1], modelAnswer=models[paper][number - 1],
                            explanation="公式解答例と照合した独自解説。" + models[paper][number - 1],
                            scoringCriteria="原問の各設問の式・単位・指定桁数を確認し、公式解答例と比較して自己採点する。配点細目や自動採点結果を創作しない。")
                figures = { (2024, 2): "diagram", (2024, 3): "diagram", (2025, 2): "diagram", (2025, 4): "table" }
                if (year, number) in figures:
                    item.update(hasImage=True, imageUrls=[f"/questions/khk-reito/{year}-gakushiki-q{number}-{figures[year, number]}.png"],
                                imageAltTexts=[f"令和{era}年度 第一種冷凍機械 学識 問{number}の公式図表"])
                if (year, number) == (2024, 2):
                    item["imageUrls"].append("/questions/khk-reito/2024-gakushiki-q2-blank-chart.png")
                    item["imageAltTexts"].append("公式解答用紙のp–h線図（記入前）")
                    item["officialReferenceUrls"] = [url("R6ACGZK-W.pdf", year)]
            else:
                if rank == 2 and kind == "Z" and number == 1:
                    item.update(hasImage=True,
                                imageUrls=[f"/questions/khk-reito/{year}-second-gakushiki-q1-chart.png"],
                                imageAltTexts=[f"令和{era}年度 第二種冷凍機械 学識 問1の公式p–h線図"])
                choices = {k: clean(t) for k, t in zip("アイウエオ", row["choices"])}
                answer = key[kind][number - 1]
                correct = choices["アイウエオ"[answer - 1]]
                selected = set(re.findall("[イロハニホ]", correct))
                note = notes[paper][number - 1]
                prefix = f"出題時点（{year}年4月1日）の法令による。" if kind == "X" else ""
                explanations = {}
                for i, (k, choice) in enumerate(choices.items(), 1):
                    if i == answer:
                        reason = f"正しい組合せは「{correct}」。"
                    else:
                        included = set(re.findall("[イロハニホ]", choice))
                        extra, missing = included - selected, selected - included
                        reason = f"この組合せ「{choice}」は不適切。"
                        if extra:
                            reason += "誤りの記述" + "・".join(sorted(extra)) + "を含む。"
                        if missing:
                            reason += "正しい記述" + "・".join(sorted(missing)) + "が欠ける。"
                    explanations[k] = reason + prefix + note
                item.update(choices=choices, answer="アイウエオ"[answer - 1], officialAnswerNumber=str(answer),
                            explanation=prefix + f"公式正答は({answer})「{correct}」。" + note,
                            choiceExplanations=explanations, explanationCoverage="full")
            records.append(item)
        for file, role in [(paper + ".pdf", "questions"), (answer_file, "answers")]:
            sources.append(dict(file=file, role=role, url=url(file, year), sha256=hashlib.sha256((root / file).read_bytes()).hexdigest(),
                                year=year, subject=subject, questionCount=len(rows), status="downloaded-official-pdf"))
if rank == 1:
    for year in [2025, 2024]:
        file = f"R{year - 2018}ACGZK-W.pdf"
        sources.append(dict(file=file, role="answer-sheet", url=url(file, year),
                            sha256=hashlib.sha256((root / file).read_bytes()).hexdigest(), year=year,
                            subject="学識", questionCount=5, status="downloaded-official-pdf"))
out = Path("data/questions") / code
out.mkdir(exist_ok=True)
(out / "latest-two.json").write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n")
(stage / f"{code}-sources.json").write_text(json.dumps(sources, ensure_ascii=False, indent=2) + "\n")
print(code, len(records), "original questions")
