"""Extract normally downloaded JPO PDFs into private staging. No network access.

Usage: python scripts/ingest-benrishi-local.py SOURCE_DIRECTORY [--check]
Requires PyMuPDF. --check compares every stem, choice, page and answer to staging.
Editorial explanations are maintained separately. This tool only composes reviewed notes.
Source page images retain every table, blank and glyph outside the public directory.
"""
import argparse
import hashlib
import json
import re
import unicodedata

EDITORIAL_VERSION = "2026-11-04"
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data/qualification-staging/benrishi"
CATEGORIES = ["特許・実用新案", "意匠", "商標", "条約", "著作権法・不正競争防止法"]
SLUGS = ["patent", "design", "trademark", "treaties", "copyright-unfair-competition"]
COUNTS = [20, 10, 10, 10, 10]


def tidy(text):
    # Retain paragraph boundaries, join only typographic line wrapping.
    return "\n\n".join("".join(line.strip() for line in p.splitlines())
                        for p in re.split(r"\n\s*\n", text.strip()) if p.strip())


def extract(src, year):
    qp = src / f"{year}-question.pdf"
    ap = src / f"{year}-answer.pdf"
    doc, answers = fitz.open(qp), fitz.open(ap)
    raw = "\n".join(p.get_text() for p in doc)
    answer_raw = "\n".join(p.get_text() for p in answers)
    for term in ["転載禁止", "無断転載", "複製禁止", "Copyright", "©"]:
        if term in raw or term in answer_raw:
            raise ValueError(f"Individual rights notice requires review: {year} {term}")

    # The official answer page has two parallel columns of 30 numbered rows.
    words = answers[0].get_text("words")
    rows = []
    for side in [0, 1]:
        selected = [w for w in words if w[4].isdigit() and
                    ((150 < w[0] < 280) if side == 0 else (340 < w[0] < 470))]
        selected.sort(key=lambda w: (round(w[1], 1), w[0]))
        # Pair by y position rather than PDF text stream order.
        groups = {}
        for w in selected:
            groups.setdefault(round(w[1]), []).append(w)
        pairs = []
        for _, group in sorted(groups.items()):
            group.sort(key=lambda w: w[0])
            if len(group) == 2:
                pairs.append([int(w[4]) for w in group])
        assert len(pairs) == 30, (year, side, pairs)
        rows.extend(pairs)
    # Official column order: patent 20, design 10; trademark, treaties, copyright.
    keys = [pair[1] for pair in rows]
    expected_numbers = list(range(1, 21)) + list(range(1, 11)) * 4
    assert [pair[0] for pair in rows] == expected_numbers

    chunks = []
    current = None
    for page in doc:
        text = page.get_text()
        heading = re.search(r"【([^】]+)】\s*([0-9０-９]+)", text)
        if heading:
            if current:
                chunks.append(current)
            current = {"category": heading[1], "number": int(unicodedata.normalize("NFKC", heading[2])),
                       "raw": text[heading.end():], "sourcePages": [page.number + 1]}
        elif current:
            current["raw"] += "\n" + text
            current["sourcePages"].append(page.number + 1)
    chunks.append(current)
    assert len(chunks) == 60
    questions = []
    for index, chunk in enumerate(chunks):
        text = chunk.pop("raw")
        ci = CATEGORIES.index(chunk["category"])
        if year == 2025 and ci == 0 and chunk["number"] == 19:
            # Five unnumbered boxes are intentional distractor blanks. One box
            # is extracted as spurious "１１１"; recover it from visual inspection.
            text = text.split("① \n②")[0]
            text = text.replace("   が図られた", " ［空欄］ が図られた")
            text = text.replace("   や   等", " ［空欄］ や ［空欄］ 等")
            text = text.replace("１１１", "［空欄］").replace("   の要請", " ［空欄］ の要請")
            choices = [
                "①無期限・無制限に／②理由を追加／③職権探知／④合理的理由",
                "①審判長の許可なく／②要旨を変更／③職権探知／④不責事由",
                "①審判長の許可なく／②理由を追加／③職権進行／④不責事由",
                "①無期限・無制限に／②要旨を変更／③職権探知／④合理的理由",
                "①無期限・無制限に／②要旨を変更／③職権進行／④不責事由",
            ]
            stem = tidy(text)
            # The PDF uses a four-column word bank. Explicit separators retain
            # its entries after removing typographic line wrapping.
            stem = stem.rsplit("【語群】", 1)[0] + "【語群】\n" + "／".join([
                "職権探知", "所定期間内", "当事者の不満", "無期限・無制限に",
                "職権進行", "合理的理由", "手続の透明性", "審判長の許可なく",
                "不責事由", "審理の充実", "手続の煩雑さ", "事件の迅速な解決",
                "理由を追加", "一回的解決", "審理の不平等", "事件間の公平性",
                "要旨を変更", "手続の簡素化", "審理期間の大幅な短縮", "審理負担の大幅な軽減",
            ])
        else:
            matches = list(re.finditer(r"(?m)^\s*([１-５1-5])[ \u3000]+", text))
            assert len(matches) == 5, (year, chunk, len(matches))
            assert [int(unicodedata.normalize("NFKC", m[1])) for m in matches] == [1, 2, 3, 4, 5]
            stem = tidy(text[:matches[0].start()])
            choices = [tidy(text[m.end():matches[i+1].start() if i < 4 else len(text)])
                       for i, m in enumerate(matches)]
        qurl = f"https://www.jpo.go.jp/news/benrishi/shiken-mondai/document/{year}tanto/question.pdf"
        aurl = qurl.replace("question.pdf", "answer.pdf")
        questions.append({"id": f"benrishi-{year}-{SLUGS[ci]}-{chunk['number']:02d}",
                          **chunk, "text": stem,
                          "choices": [{"number": n+1, "text": t} for n, t in enumerate(choices)],
                          "correctChoice": keys[index], "sourceQuestionUrl": qurl,
                          "sourceAnswerUrl": aurl, "sourcePageUrl": f"https://www.jpo.go.jp/news/benrishi/shiken-mondai/{year}tanto.html",
                          "attribution": "出典：特許庁 弁理士試験短答式筆記試験問題・解答。過去問AIがテキスト化・整形。解説は過去問AIの独自作成（特許庁による作成・保証ではありません）。"})
    explanations = json.loads((OUT / "explanations.json").read_text(encoding="utf-8"))
    for question in questions:
        question["explanation"] = "出題時点の法令に基づく独自解説。" + explanations[question["id"]]
    notes = {}
    for path in sorted((OUT / "editorial").glob("*.json")):
        packet = json.loads(path.read_text(encoding="utf-8"))
        assert not (notes.keys() & packet.keys()), "Duplicate editorial record"
        notes.update(packet)
    for question in questions:
        question["publicAllowed"] = False
        question["needsReview"] = True  # Human editorial review is not inferred from AI review.
        question["sourcePdfUrl"] = question["sourceQuestionUrl"]
        question["officialAnswerNumber"] = str(question["correctChoice"])
        question["originalText"] = "\n\f\n".join(doc[p - 1].get_text() for p in question["sourcePages"])
        question["sourceImages"] = [f"data/qualification-staging/benrishi/assets/{year}-question-p{p:02}.png" for p in question["sourcePages"]]
        question["lastUpdated"] = EDITORIAL_VERSION
        law_ids = {"patent": "334AC0000000121", "design": "334AC0000000125", "trademark": "334AC0000000127", "copyright-unfair-competition": "345AC0000000048"}
        slug = question["id"].removeprefix(f"benrishi-{year}-").rsplit("-", 1)[0]
        question["officialReferenceUrls"] = (
            ["https://wipolex-res.wipo.int/edocs/lexdocs/treaties/ja/pct/trt_pct_001ja.html", "https://www.jpo.go.jp/system/laws/gaikoku/paris/patent/chap1.html", "https://www.jpo.go.jp/system/laws/gaikoku/trips/index.html"]
            if slug == "treaties" else [f"https://laws.e-gov.go.jp/law/{law_ids[slug]}"]
        )
        if slug == "copyright-unfair-competition" and question["number"] > 5:
            question["officialReferenceUrls"] = ["https://laws.e-gov.go.jp/law/405AC0000000047"]
        if slug == "patent":
            question["officialReferenceUrls"].append("https://laws.e-gov.go.jp/law/334AC0000000123")
        if year == 2026:
            question["lawReferenceDate"] = "2026-05-17"
        note = notes.get(question["id"].removeprefix("benrishi-"))
        if note:
            statements = note.get("statements", [])
            question["statementExplanations"] = [{"label": label, "correct": correct, "explanation": reason} for label, correct, reason in statements]
            if "choices" in note:
                reasons = note["choices"]
            else:
                target = note["target"]
                correct_labels = [label for label, correct, _ in statements if correct]
                incorrect_labels = [label for label, correct, _ in statements if not correct]
                selected = incorrect_labels if target == "incorrect" else correct_labels
                summary = "正しい記述は" + ("・".join(correct_labels) or "なし") + "、誤った記述は" + ("・".join(incorrect_labels) or "なし") + "。"
                reasons = []
                for c in question["choices"]:
                    hit = c["number"] == question["correctChoice"]
                    if target == "pair":
                        labels = [unicodedata.normalize("NFKC", x) for x in re.findall(r"[ｲﾛﾊﾆﾎ]", c["text"])]
                        assert set(labels) == set(selected) if hit else set(labels) != set(selected), question["id"]
                        detail = "この組合せの" + "・".join(labels) + "は、" + ("ともに正しい記述であり選ぶべき組合せとなる。" if hit else "正しい記述の組合せと異なる。")
                    else:
                        normalized = unicodedata.normalize("NFKC", c["text"])
                        number = 0 if normalized == "なし" else int(re.search(r"\d+", normalized)[0])
                        assert (number == len(selected)) == hit, (question["id"], selected)
                        detail = f"選択肢の「{c['text']}」" + ("が該当する。" if hit else f"ではなく、該当する記述は{len(selected)}つである。")
                    reasons.append(("正解。" if hit else "誤答。") + summary + detail)
            assert len(reasons) == 5 and all(len(r) >= 20 for r in reasons)
            question["choiceExplanations"] = [{"number": i + 1, "explanation": r} for i, r in enumerate(reasons)]
            question["explanationCoverage"] = "all-choices"
            # Replace abbreviated prior summaries with the full statement rationale.
            if statements:
                question["explanation"] = "出題時点の法令に基づく独自解説。\n" + "\n".join(f"記述{label}：{'正しい' if correct else '誤り'}。{reason}" for label, correct, reason in statements)
        else:
            question["explanationCoverage"] = "draft"
    return {"year": year, "publicAllowed": False, "publication": "HOLD", "lawBasis": "出題時点の法令に基づく",
            "sourceQuestionSha256": hashlib.sha256(qp.read_bytes()).hexdigest(),
            "sourceAnswerSha256": hashlib.sha256(ap.read_bytes()).hexdigest(),
            "questionCount": 60, "questions": questions}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    for year in [2025, 2026]:
        paper = extract(args.source, year)
        target = OUT / f"{year}.json"
        if args.check:
            stored = json.loads(target.read_text(encoding="utf-8"))
            assert stored == paper, f"Source mismatch: {year}"
        else:
            target.write_text(json.dumps(paper, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{year}: 60 text questions / 300 choices / 60 official answers {'verified' if args.check else 'extracted'}")


if __name__ == "__main__":
    main()
