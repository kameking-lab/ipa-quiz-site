"""Build a reproducible, non-public skill-exam review pack from official PDFs.

The generated corpus is a draft until the 104-item visual acceptance gate passes.
Question text is extracted as text; only wiring diagrams and model-answer diagrams/
photographs are emitted as images. Identical PDF hashes share image assets.
"""

from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
import re

import fitz
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "scripts/denko2-skill-source-manifest.json"
RAW = ROOT / "data/raw_pdfs/denko2/skill"
IMAGES = ROOT / "public/images/denko2/skill-draft"
OUTPUT = ROOT / "data/questions/denko2/skills-draft.json"
RECEIPT = ROOT / "docs/evidence/denko2-skill-extraction.json"


def image_of(page: fitz.Page, path: Path, clip: fitz.Rect | None = None) -> None:
    if path.exists():
        return
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), clip=clip, alpha=False)
    image = Image.open(BytesIO(pix.tobytes("png"))).convert("RGB")
    # The page margins are not part of the diagram, and would make it illegible
    # on a phone. Retain a small margin around the actual marks.
    difference = ImageChops.difference(image, Image.new("RGB", image.size, "white"))
    bbox = difference.point(lambda value: 255 if value > 18 else 0).getbbox()
    if bbox:
        left, top, right, bottom = bbox
        image = image.crop((max(0, left - 20), max(0, top - 20), min(image.width, right + 20), min(image.height, bottom + 20)))
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "WEBP", quality=90, method=6)


def clean_text(text: str) -> str:
    text = re.sub(r"[\u2002-\u200b\ufeff]", " ", text)
    text = re.sub(r"‥{3,}", "  ", text)
    text = text.replace("テー プ", "テープ").replace("。，", "。")
    text = text.replace("テープ 巻き", "テープ巻き")
    text = re.sub(r"（([^）]*?)，）", r"（\1），", text)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def section(text: str, start: str, end: str | None = None) -> str:
    offset = text.find(start)
    if offset < 0:
        return ""
    text = text[offset + len(start):]
    if end and end in text:
        text = text[:text.index(end)]
    return clean_text(text)


def figure_clip(page: fitz.Page) -> fitz.Rect:
    end_intro = page.search_for("作品は保護板")
    if not end_intro:
        raise ValueError("Cannot locate the end of page-2 question instructions")
    start = end_intro[0].y1 + 8
    notes = page.search_for("注：１．図記号") or page.search_for("注：1．図記号")
    end = notes[0].y0 - 8 if notes else page.rect.height - 60
    if end - start < 150:
        raise ValueError(f"Implausibly small diagram crop: {start}, {end}")
    return fitz.Rect(35, start, page.rect.width - 35, end)


def second_figure(question: fitz.Document) -> tuple[fitz.Page, fitz.Rect] | None:
    for page in (question[1], question[2]):
        headings = page.search_for("図２．")
        if not headings:
            continue
        start = headings[0].y0 - 10
        condition_headings = page.search_for("施工条件")
        later_conditions = [item.y0 for item in condition_headings if item.y0 > start]
        # On No.13 the CdS label ends immediately above the condition heading.
        end = min(later_conditions) - 0.25 if later_conditions else page.rect.height - 35
        if end - start < 65:
            raise ValueError(f"Implausibly small second diagram: {start}, {end}")
        return page, fitz.Rect(35, start, page.rect.width - 35, end)
    return None


def source_file(url: str, expected_sha: str) -> Path:
    path = RAW / url.rsplit("/", 1)[-1]
    actual_sha = sha256(path.read_bytes()).hexdigest()
    if actual_sha != expected_sha:
        raise ValueError(f"Official PDF hash mismatch: {path.name}")
    return path


def main() -> None:
    manifest = json.loads(SOURCE.read_text(encoding="utf-8"))
    records = []
    unique_questions: set[str] = set()
    unique_answers: set[str] = set()
    flags = []
    for paper in manifest["papers"]:
        for source in paper["problems"]:
            number = source["number"]
            qhash = source["questionSha256"]
            ahash = source["answerSha256"]
            qpath = source_file(source["questionUrl"], qhash)
            apath = source_file(source["answerUrl"], ahash)
            question = fitz.open(qpath)
            answer = fitz.open(apath)
            if len(question) != 3 or len(answer) != 3:
                raise ValueError(f"Expected three PDF pages: {paper['date']} #{number}")

            diagram = f"q-{qhash[:16]}-diagram.webp"
            second_diagram = f"q-{qhash[:16]}-figure2.webp"
            concept = f"a-{ahash[:16]}-concept.webp"
            wiring = f"a-{ahash[:16]}-wiring.webp"
            example = f"a-{ahash[:16]}-example.webp"
            if qhash not in unique_questions:
                image_of(question[1], IMAGES / diagram, figure_clip(question[1]))
                figure_two = second_figure(question)
                if figure_two:
                    image_of(figure_two[0], IMAGES / second_diagram, figure_two[1])
                unique_questions.add(qhash)
            if ahash not in unique_answers:
                for page_index, name in enumerate((concept, wiring, example)):
                    image_of(answer[page_index], IMAGES / name)
                unique_answers.add(ahash)

            material_page = question[0].get_text(sort=True)
            materials = section(material_page, "材   料", "・  受験番号札")
            if not materials:
                raise ValueError(f"Cannot isolate supplied material table: {paper['date']} #{number}")
            introduction = question[1].get_text(sort=True, clip=fitz.Rect(0, 0, question[1].rect.width, figure_clip(question[1]).y0 - 2))
            instructions = "技能試験問題" + section(introduction, "技能試験問題")
            # The dashed omission glyph is a drawing and has no PDF text layer.
            instructions = re.sub(r"([０-９]+．)\s+で示した部分", r"\1―・―・― で示した部分", instructions)
            page_two_text = question[1].get_text(sort=True)
            diagram_notes = section(page_two_text, "注：", "図２．" if "図２．" in page_two_text else "●")
            diagram_notes = "注：" + diagram_notes if diagram_notes else ""
            # The circled R is a symbol in the official diagram, not a plain R.
            diagram_notes = re.sub(r"(?m)(２．\s*)Ｒ(?=\s*は)", r"\1Ⓡ", diagram_notes)
            conditions = section(question[2].get_text(sort=True), "< 施工条件>", "●")
            # The PDF text layer moves this punctuation after 「すべて」 on No.13.
            conditions = conditions.replace(
                "点滅器コンセント及び自動点滅器までの非接地側電線にはすべて， ， 黒色 を使用する 。",
                "点滅器，コンセント及び自動点滅器までの非接地側電線には，すべて黒色を使用する。",
            )
            if not materials or not instructions or not conditions or not diagram_notes:
                flags.append({"date": paper["date"], "number": number, "missing": [name for name, text in (("materials", materials), ("instructions", instructions), ("conditions", conditions), ("diagramNotes", diagram_notes)) if not text]})
            records.append({
                "id": f"denko2-{paper['date']}-skill-{number:02}",
                "year": paper["year"], "season": paper["season"], "date": paper["date"],
                "day": paper["day"], "number": number,
                "questionPdfUrl": source["questionUrl"], "answerPdfUrl": source["answerUrl"],
                "questionPdfSha256": qhash, "answerPdfSha256": ahash,
                "instructionText": instructions, "materialsText": materials, "conditionsText": conditions,
                "diagramNotesText": diagram_notes,
                "diagramImage": "/images/denko2/skill-draft/" + diagram,
                "secondFigureImage": "/images/denko2/skill-draft/" + second_diagram if second_figure(question) else None,
                "answerConceptImage": "/images/denko2/skill-draft/" + concept,
                "answerWiringImage": "/images/denko2/skill-draft/" + wiring,
                "answerExampleImage": "/images/denko2/skill-draft/" + example,
                "defectCriteriaUrl": manifest["defectCriteriaPdfUrl"],
            })
    if len(records) != 104:
        raise ValueError(f"Expected 104 records, got {len(records)}")
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    receipt = {
        "status": "extraction-draft-visual-qc-pending",
        "published": 0, "records": len(records),
        "uniqueQuestionPdfSha256": len(unique_questions),
        "uniqueAnswerPdfSha256": len(unique_answers),
        "imageAssetCount": len(list(IMAGES.glob("*.webp"))),
        "missingTextSections": flags,
        "requirementsRemaining": ["104/104 original visual QC", "104/104 condition/material text QC", "104/104 model-answer QC", "104/104 defect criteria QC", "responsive E2E", "notification receipt"],
    }
    RECEIPT.parent.mkdir(parents=True, exist_ok=True)
    RECEIPT.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({key: receipt[key] for key in ("records", "uniqueQuestionPdfSha256", "uniqueAnswerPdfSha256", "imageAssetCount", "missingTextSections")}, ensure_ascii=False))


if __name__ == "__main__":
    main()
