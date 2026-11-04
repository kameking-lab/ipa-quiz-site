"""Rebuild the private Chiba corpus from ordinary-GET source PDFs.

Usage: python scripts/ingest-dokugeki-chiba.py --source-dir <temporary-directory>
Requires PyMuPDF. Editorial explanations live in explanations.json, not in PDFs.
Source page images are retained outside public/; downloaded PDFs stay temporary.
"""
import argparse
import hashlib
import json
import re
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "data/qualification-staging/dokugeki-chiba"
BASE = "https://www.pref.chiba.lg.jp/yakumu/dokugeki/documents/"
TRACKS = {"ippan": "一般", "nougyou": "農業用品目", "tokutei": "特定品目"}
NUM = str.maketrans("０１２３４５６７８９", "0123456789")
SLOT = re.compile(r"[（(]\s*([0-9０-９]{1,2})\s*[）)]")
MAJOR = re.compile(r"問([0-9０-９]{1,2})\s")
BANK = re.compile(r"[〔［]下欄[〕］]")
CLOZE_BANK = re.compile(r"[〔［][（(]\s*([0-9０-９]{1,2})\s*[）)]\s*下欄[〕］]")


def save(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def page_text(page):
    # Native PDF order retains inline chemical subscripts; spatial sorting can
    # move a superscript ahead of its sentence. Ruby remains in source images.
    output = []
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            if line["bbox"][1] > page.rect.height - 65:
                continue
            spans = [s["text"] for s in line["spans"]
                     if not (s["size"] <= 7.1 and re.fullmatch(r"[ぁ-ゖ\s]+", s["text"]))]
            text = "".join(spans).rstrip()
            if line["bbox"][1] > 730 and re.fullmatch(r"\s*\d{1,2}\s*", text):
                continue
            if text.strip():
                output.append(text)
    return "\n".join(output) + "\n"


def split_choices(text):
    marker = BANK.search(text)
    assert marker, text
    before, bank = text[:marker.start()], text[marker.end():]
    # A number followed by whitespace is the printed option label. Unicode
    # full-width numbers distinguish these labels from values inside sentences.
    marks = list(re.finditer(r"(?<!\S)([１-５])(?=\s|[（(])\s*", bank))
    assert len(marks) == 5, (len(marks), bank)
    assert [m[1] for m in marks] == list("１２３４５")
    choices = []
    note = ""
    for i, m in enumerate(marks):
        end = marks[i + 1].start() if i < 4 else len(bank)
        value = bank[m.end():end].strip()
        if i == 4 and "※" in value:
            value, tail = value.split("※", 1)
            note = "※" + tail
        choices.append(value.strip())
    return before.strip(), choices, bank[:marks[0].start()].strip(), note.strip()


def parse_answers(document):
    result = []
    for page in document:
        lines = [x.strip() for x in page.get_text(sort=True).splitlines() if x.strip()]
        for i, line in enumerate(lines):
            nums = re.findall(r"\((\d{1,2})\)", line)
            if not nums:
                continue
            answers = lines[i+1].split()
            assert len(nums) == len(answers), (line, answers)
            for number, answer in zip(nums, answers):
                assert int(number) == len(result)+1
                assert answer in "12345"
                result.append(int(answer))
    assert len(result) == 80
    return result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-dir", type=Path, required=True)
    args = parser.parse_args()
    downloads = json.loads((args.source_dir / "downloads.json").read_text(encoding="utf-8-sig"))
    documents, assets, editions, answer_tables = [], [], [], []
    for year in (2025, 2026):
        for track, label in TRACKS.items():
            prefix = f"r{year-2018}"
            suffix = f"{list(TRACKS).index(track)+1}-{track}" if year == 2026 else f"-{track}"
            question_file = f"{prefix}mondai{suffix}.pdf"
            answer_file = f"{prefix}kaitou{suffix}.pdf"
            qdoc = fitz.open(args.source_dir / question_file)
            adoc = fitz.open(args.source_dir / answer_file)
            answers = parse_answers(adoc)
            answer_tables.append({"year": year, "track": track, "answers": answers, "sourceAnswerUrl": BASE+answer_file})
            pages = [page_text(p) for p in qdoc]
            offsets, text = [], ""
            for p in pages:
                offsets.append(len(text))
                text += p
            slots = [m for m in SLOT.finditer(text) if not text[max(0,text.rfind("\n",0,m.start())+1):m.start()].strip()]
            cloze_banks = list(CLOZE_BANK.finditer(text))
            slots += [next(m for m in SLOT.finditer(text) if int(m[1].translate(NUM)) == int(b[1].translate(NUM))) for b in cloze_banks]
            slots.sort(key=lambda m: int(m[1].translate(NUM)))
            slots = list({int(m[1].translate(NUM)): m for m in reversed(slots)}.values())
            slots.sort(key=lambda m: int(m[1].translate(NUM)))
            assert [int(m[1].translate(NUM)) for m in slots] == list(range(1, 81)), (question_file, [m[1] for m in slots])
            majors = list(MAJOR.finditer(text))
            group_starts = [m for m in majors if int(m[1].translate(NUM)) >= 3]
            records = []
            for i, slot in enumerate(slots):
                num = i+1
                major = next(m for m in reversed(majors) if m.start() < slot.start())
                group_num = int(major[1].translate(NUM))
                if num <= 40:
                    start = slot.start()
                    end = slots[i+1].start()
                    if num in (20, 40):
                        end = next(m.start() for m in majors if m.start() > start)
                    raw = text[start:end].strip()
                    shared = text[major.start():next(s.start() for s in slots if s.start() > major.start())].strip()
                    while raw.endswith("【"):
                        raw = raw[:-1].rstrip()
                    # Section heading belongs to the next major, not this item.
                    raw = re.sub(r"\n\s*【[^】]*】\s*$", "", raw).strip()
                    prompt, choices, header, note = split_choices(raw)
                else:
                    start = major.start()
                    end = next((m.start() for m in group_starts if m.start() > start), len(text))
                    raw = text[start:end].strip()
                    raw = re.sub(r"\n\s*【[^】]*】\s*$", "", raw).strip()
                    banks = list(CLOZE_BANK.finditer(raw))
                    if banks:
                        marker = next(b for b in banks if int(b[1].translate(NUM)) == num)
                        bank_end = next((b.start() for b in banks if b.start() > marker.start()), len(raw))
                        _, choices, header, note = split_choices("〔下欄〕" + raw[marker.end():bank_end])
                        prompt = raw[:banks[0].start()].strip()
                        shared = prompt
                    else:
                        all_prompt, choices, header, note = split_choices(raw)
                        bank_start = BANK.search(text, slot.end()).start()
                        next_slot = slots[i+1].start() if i < 79 else bank_start
                        next_slot = min(next_slot, bank_start)
                        prompt = text[slot.start():next_slot].strip()
                        shared = all_prompt
                page_numbers = [p+1 for p in range(len(pages)) if offsets[p] < end and offsets[p]+len(pages[p]) > start]
                category = "毒物及び劇物に関する法規" if num <= 20 else "基礎化学" if num <= 40 else "毒物及び劇物の性質及び貯蔵その他取扱方法" if num <= 60 else "毒物及び劇物の識別及び取扱方法"
                records.append({
                    "id": f"dokugeki-chiba-{year}-{track}-{num:02d}", "exam": "dokugeki-chiba",
                    "year": year, "season": "annual", "track": track, "trackLabel": label,
                    "examDate": f"{year}-08-05", "qNumber": num, "originalGroupNumber": group_num,
                    "category": category, "question": prompt, "sharedPrompt": shared,
                    "choices": choices, "choiceHeader": header, "postOptionContent": note,
                    "targetBlankNumber": num if num > 40 and CLOZE_BANK.search(raw) else None,
                    "originalText": raw, "sourcePages": page_numbers,
                    "sourceImages": [f"data/qualification-staging/dokugeki-chiba/assets/{year}-{track}-p{p:02d}.webp" for p in page_numbers],
                    "officialAnswerNumber": answers[i], "scoring": {"kind": "single-choice", "correctChoice": answers[i]},
                    "sourcePdfUrl": BASE+question_file, "sourceAnswerUrl": BASE+answer_file,
                    "sourceAttribution": f"出典：千葉県 令和{year-2018}年度毒物劇物取扱者試験（{label}）問{group_num}（{num}）。解説は過去問AIの独自作成。",
                    "lawReferenceDate": None, "lawReferenceDateNote": "冊子に特定の法令基準日の明記なし。解説は当該年度の出題内容に基づく。",
                    "publicAllowed": False, "lastUpdated": "2026-11-04",
                })
            used_pages = sorted({p for q in records for p in q["sourcePages"]})
            for p in used_pages:
                path = DEST / f"assets/{year}-{track}-p{p:02d}.webp"
                path.parent.mkdir(parents=True, exist_ok=True)
                pix = qdoc[p-1].get_pixmap(matrix=fitz.Matrix(1.8, 1.8))
                from PIL import Image
                Image.frombytes("RGB", [pix.width, pix.height], pix.samples).save(path, "WEBP", lossless=True)
                assets.append({"path": path.relative_to(ROOT).as_posix(), "pdfUrl": BASE+question_file, "pdfPage": p,
                               "sha256": hashlib.sha256(path.read_bytes()).hexdigest(), "width": pix.width, "height": pix.height})
            for name in (question_file, answer_file):
                record = next(d for d in downloads if d.get("file") == name)
                assert record["status"] == 200
                assert hashlib.sha256((args.source_dir/name).read_bytes()).hexdigest() == record["sha256"]
                documents.append(record)
            save(DEST / f"{year}-{track}.json", records)
            editions.append({"year": year, "track": track, "originalCount": 80, "storedCount": len(records)})
    save(DEST / "official-answers.json", answer_tables)
    save(DEST / "sources.json", {"qualification": "毒物劇物取扱者試験（千葉県）", "slug": "dokugeki-chiba",
        "checkedAt": "2026-11-04", "publicAllowed": False, "publicationStatus": "staging",
        "selectionEvidence": {"report": "COV1 B 2", "latestPublishedEditions": [2026, 2025],
            "officialPages": [f"https://www.pref.chiba.lg.jp/yakumu/dokugeki/r{y}shikenzissikekka.html" for y in (8,7)]},
        "rights": {"status": "permission-required", "termsUrl": "https://www.pref.chiba.lg.jp/homepage/about-site/link.html",
            "decision": "一般の転載許諾は確認できていない。未公開で保存し、公開前に個別の転載可否を確認する。"},
        "rendering": {"library": "PyMuPDF", "scale": 1.8, "format": "lossless-webp", "note": "原問題の全ページを画像で保持。ルビ、表、数式と化学式の上下位置は画像が正本。テキストは印刷本文の転記（ルビ除外、改行を保持）。"},
        "editions": editions, "downloadedSources": documents, "unavailablePdfUrls": [], "assets": assets})


if __name__ == "__main__":
    main()
