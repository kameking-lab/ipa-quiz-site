"""Build Denko1 (第一種電気工事士) review crops and public figure crops from the official PDF.

Usage: py -3.12 scripts/denko1-extract.py <question.pdf> <answer.pdf> [--root <repo>]

The PDF itself is not committed. Row/figure geometry is fixed here so the
crops are reproducible from the official file whose sha256 is pinned in the
batch manifests.
"""

from hashlib import sha256
import json
from pathlib import Path
import sys

import fitz  # PyMuPDF

PAPER = "20260401"
PUBLIC_DIR = "public/images/denko1/2026-first"
REVIEW_DIR = f"data/raw_pdfs/denko1/review/{PAPER}"
BATCH_DIR = "data/raw_pdfs/denko1/review/batches"
QUESTION_PDF_URL = "https://www.shiken.or.jp/construction/upload/20260401_co_first_q01.pdf"
ANSWER_PDF_URL = "https://www.shiken.or.jp/construction/upload/20260401_co_first_a01.pdf"
DPI_ROW = 200
DPI_FIG = 200
PX150 = 72 / 150  # the row table below was measured on 150 dpi renders

# question number -> (1-based page, top px@150, bottom px@150)
ROWS = {
    1: (3, 262, 650), 2: (3, 650, 1045), 3: (3, 1045, 1470), 4: (3, 1470, 1796),
    5: (4, 140, 614), 6: (4, 614, 1231), 7: (4, 1231, 1804),
    8: (5, 140, 811), 9: (5, 811, 1289), 10: (5, 1289, 1530), 11: (5, 1530, 1992),
    12: (6, 140, 342), 13: (6, 342, 542), 14: (6, 542, 900), 15: (6, 900, 1360), 16: (6, 1360, 1857),
    17: (7, 140, 342), 18: (7, 342, 664), 19: (7, 664, 1026), 20: (7, 1026, 1307), 21: (7, 1307, 1548), 22: (7, 1548, 1872),
    23: (8, 140, 466), 24: (8, 466, 672), 25: (8, 672, 1047), 26: (8, 1047, 1423), 27: (8, 1423, 1704),
    28: (9, 140, 504), 29: (9, 504, 786),
    30: (11, 140, 629), 31: (11, 629, 914), 32: (11, 914, 1321), 33: (11, 1321, 1565), 34: (11, 1565, 1931),
    35: (12, 140, 385), 36: (12, 385, 706), 37: (12, 706, 906), 38: (12, 906, 1310), 39: (12, 1310, 1631), 40: (12, 1631, 1994),
    41: (14, 140, 344), 42: (14, 344, 914), 43: (14, 914, 1117), 44: (14, 1117, 1321), 45: (14, 1321, 1646), 46: (14, 1646, 1971),
    47: (15, 140, 955), 48: (15, 955, 1158), 49: (15, 1158, 1321), 50: (15, 1321, 1524),
}
# Questions whose figure/photo sits in the question column.
# number -> top of the figure below the question text, in px of a 110 dpi render.
QUESTION_FIGURES = {1: 325, 2: 578, 3: 875, 4: 1130, 5: 212, 6: 680, 7: 1100, 8: 440, 9: 765,
                    14: 450, 15: 740, 16: 1098, 22: 1180, 23: 150, 25: 535, 26: 815}
PX110 = 72 / 110
QUESTION_COLUMN = (143.5 * PX110, 452 * PX110)
# Questions whose four choices are figures/photos: layout "grid" (2x2) or "row" (1x4).
CHOICE_FIGURES = {11: "grid", 42: "grid", 45: "row", 46: "row", 47: "grid", 48: "row", 49: "row"}
# Shared diagrams: stem -> (page, questions)
SHARED = {"facility-plan": (10, range(30, 35)), "single-line": (13, range(41, 51))}
KANA = ["イ", "ロ", "ハ", "ニ"]
ROMAN = {"イ": "i", "ロ": "ro", "ハ": "ha", "ニ": "ni"}


def render(page: fitz.Page, rect: fitz.Rect, dpi: int, masks: list[fitz.Rect]) -> fitz.Pixmap:
    pix = page.get_pixmap(dpi=dpi, clip=rect)
    zoom = dpi / 72
    for mask in masks:
        area = mask & rect
        if area.is_empty:
            continue
        box = fitz.IRect(pix.x + int((area.x0 - rect.x0) * zoom), pix.y + int((area.y0 - rect.y0) * zoom),
                         pix.x + int((area.x1 - rect.x0) * zoom) + 1, pix.y + int((area.y1 - rect.y0) * zoom) + 1)
        pix.set_rect(box, (255, 255, 255))
    return pix


def clip_png(page: fitz.Page, rect: fitz.Rect, dpi: int, out: Path, masks: list[fitz.Rect] | None = None,
             trim: bool = False) -> str:
    """Render a clip; `masks` (page points) are painted white, e.g. the official イロハニ labels.

    With `trim`, the clip is shrunk to the remaining ink plus a 4pt margin and rendered again.
    """
    out.parent.mkdir(parents=True, exist_ok=True)
    masks = [fitz.Rect(mask) for mask in masks or []]
    pix = render(page, rect, dpi, masks)
    if trim:
        gray = fitz.Pixmap(fitz.csGRAY, pix)
        samples, scale = gray.samples, 72 / dpi
        ink_rows = [y for y in range(gray.height) if any(samples[y * gray.stride + x] < 200 for x in range(0, gray.width, 2))]
        ink_cols = [x for x in range(gray.width) if any(samples[y * gray.stride + x] < 200 for y in range(0, gray.height, 2))]
        if ink_rows and ink_cols:
            tight = fitz.Rect(rect.x0 + ink_cols[0] * scale - 4, rect.y0 + ink_rows[0] * scale - 4,
                              rect.x0 + (ink_cols[-1] + 1) * scale + 4, rect.y0 + (ink_rows[-1] + 1) * scale + 4) & rect
            pix = render(page, tight, dpi, masks)
    pix.save(out)
    return sha256(out.read_bytes()).hexdigest()


def table_x(page: fitz.Page, top: float, bottom: float) -> tuple[float, float, float]:
    """Return table left, question/answer divider and table right in points."""
    labels = [r for r in page.search_for("イ") if top <= r.y0 <= bottom]
    divider = min(r.x0 for r in labels) - 4 if labels else page.rect.width * 0.41
    # Table borders: pixel columns that are dark along almost the whole row height.
    pix = page.get_pixmap(dpi=150, clip=fitz.Rect(0, top + 3, page.rect.width, bottom - 3), colorspace=fitz.csGRAY)
    samples, scale = pix.samples, 72 / 150
    dark = [x for x in range(pix.width)
            if sum(samples[y * pix.stride + x] < 160 for y in range(0, pix.height, 2)) > 0.9 * len(range(0, pix.height, 2))]
    left, right = dark[0] * scale, (dark[-1] + 1) * scale
    return left, divider, right


def figure_rect(page: fitz.Page, figure_top: float, bottom: float, x0: float, x1: float) -> fitz.Rect:
    """Bounding box of ink below the question text inside the question column."""
    clip = fitz.Rect(x0, figure_top, x1, bottom - 3)
    pix = page.get_pixmap(dpi=150, clip=clip, colorspace=fitz.csGRAY)
    scale = 72 / 150
    samples = pix.samples
    ink = [[samples[y * pix.stride + x] < 200 for x in range(pix.width)] for y in range(pix.height)]
    rows = [y for y in range(pix.height) if any(ink[y])]
    cols = [x for x in range(pix.width) if any(ink[y][x] for y in range(pix.height))]
    if not rows or not cols:
        raise ValueError(f"No figure ink on page {page.number + 1} {figure_top}-{bottom}")
    return fitz.Rect(max(x0, clip.x0 + cols[0] * scale - 5), max(figure_top, clip.y0 + rows[0] * scale - 5),
                     min(x1, clip.x0 + (cols[-1] + 1) * scale + 5), min(bottom - 2, clip.y0 + (rows[-1] + 1) * scale + 5))


def choice_cells(page: fitz.Page, top: float, bottom: float, divider: float, right: float, layout: str) -> tuple[dict[str, fitz.Rect], list[fitz.Rect]]:
    labels = {}
    for kana in KANA:
        hits = [r for r in page.search_for(kana) if top <= r.y0 <= bottom and r.x0 >= divider - 2]
        hits.sort(key=lambda r: (r.y0, r.x0))
        labels[kana] = hits
    first = labels["イ"][0]
    right -= 5  # keep the table border out of the last column
    if layout == "row":
        heads = [min((r for r in labels[k] if abs(r.y0 - first.y0) < 4), key=lambda r: r.x0) for k in KANA]
        masks = [fitz.Rect(r.x0 - 1, r.y0 - 1, r.x1 + 9, r.y1 + 1) for r in heads]
        edges = [r.x0 for r in heads] + [right + 2]
        return {k: fitz.Rect(edges[i] - 2, top + 2, edges[i + 1] - 2, bottom - 2) for i, k in enumerate(KANA)}, masks
    second_row = [r for r in labels["ハ"] if r.y0 > first.y0 + 20][0]
    mid_x = [r for r in labels["ロ"] if abs(r.y0 - first.y0) < 4][0].x0
    heads = [first, [r for r in labels["ロ"] if abs(r.y0 - first.y0) < 4][0], second_row,
             [r for r in labels["ニ"] if abs(r.y0 - second_row.y0) < 4][0]]
    masks = [fitz.Rect(r.x0 - 1, r.y0 - 1, r.x1 + 9, r.y1 + 1) for r in heads]
    return {
        "イ": fitz.Rect(first.x0 - 2, top + 2, mid_x - 2, second_row.y0 - 2),
        "ロ": fitz.Rect(mid_x - 2, top + 2, right - 2, second_row.y0 - 2),
        "ハ": fitz.Rect(first.x0 - 2, second_row.y0 - 2, mid_x - 2, bottom - 2),
        "ニ": fitz.Rect(mid_x - 2, second_row.y0 - 2, right - 2, bottom - 2),
    }, masks


def official_answers(answer_pdf: Path) -> dict[int, str]:
    words = [w[4] for w in fitz.open(answer_pdf)[0].get_text("words")]
    tokens = [w for w in words if w.isdigit() or w in KANA]
    answers = {}
    for index, token in enumerate(tokens[:-1]):
        if token.isdigit() and tokens[index + 1] in KANA and 1 <= int(token) <= 50:
            answers[int(token)] = tokens[index + 1]
    if sorted(answers) != list(range(1, 51)):
        raise ValueError(f"Answer table incomplete: {sorted(answers)}")
    return answers


def main() -> None:
    question_pdf, answer_pdf = Path(sys.argv[1]), Path(sys.argv[2])
    root = Path(sys.argv[sys.argv.index("--root") + 1]) if "--root" in sys.argv else Path(__file__).resolve().parents[1]
    doc = fitz.open(question_pdf)
    answers = official_answers(answer_pdf)
    q_sha = sha256(question_pdf.read_bytes()).hexdigest()
    a_sha = sha256(answer_pdf.read_bytes()).hexdigest()
    shared_hashes = {}
    for stem, (page_no, _) in SHARED.items():
        page = doc[page_no - 1]
        bottom = page.rect.y1 * (0.845 if stem == "facility-plan" else 0.795)
        rect = fitz.Rect(page.rect.x0 + 40, page.rect.y0 + 28, page.rect.x1 - 8, bottom)
        shared_hashes[stem] = clip_png(page, rect, DPI_FIG, root / PUBLIC_DIR / f"{stem}.png", trim=True)
    items = []
    for number, (page_no, y0, y1) in ROWS.items():
        page = doc[page_no - 1]
        top, bottom = y0 * PX150, y1 * PX150
        left, divider, right = table_x(page, top, bottom)
        row_rect = fitz.Rect(left - 3, top - 2, right + 3, bottom + 2)
        clip_png(page, row_rect, DPI_ROW, root / REVIEW_DIR / f"q{number:02}.png")
        figures, choice_figures = [], {}
        if number in QUESTION_FIGURES:
            rect = figure_rect(page, QUESTION_FIGURES[number] * PX110, bottom, *QUESTION_COLUMN)
            figures.append({"path": f"{PUBLIC_DIR}/q{number}.png", "rect": [round(v, 1) for v in rect]})
            clip_png(page, rect, DPI_FIG, root / figures[-1]["path"])
        if number in CHOICE_FIGURES:
            cells, masks = choice_cells(page, top, bottom, divider, right, CHOICE_FIGURES[number])
            for kana, rect in cells.items():
                path = f"{PUBLIC_DIR}/q{number}-{ROMAN[kana]}.png"
                choice_figures[kana] = {"path": path, "rect": [round(v, 1) for v in rect]}
                clip_png(page, rect, DPI_FIG, root / path, masks, trim=True)
        items.append({
            "number": number,
            "page": page_no,
            "rowY": [round(top, 1), round(bottom, 1)],
            "questionRaw": page.get_text("text", clip=fitz.Rect(left + 22, top, divider, bottom)).strip(),
            "choicesRaw": page.get_text("text", clip=fitz.Rect(divider, top, right, bottom)).strip(),
            "officialAnswer": answers[number],
            "needsVisualReview": True,
            "reviewCrop": f"{REVIEW_DIR}/q{number:02}.png",
            "figures": figures,
            "choiceFigures": choice_figures,
            "sharedFigure": next((f"{PUBLIC_DIR}/{stem}.png" for stem, (_, nums) in SHARED.items() if number in nums), None),
        })
    batch_root = root / BATCH_DIR
    batch_root.mkdir(parents=True, exist_ok=True)
    for start in range(1, 51, 10):
        chunk = [item for item in items if start <= item["number"] < start + 10]
        manifest = {
            "date": "2026-04-01",
            "dateLabel": "2026年4月1日～5月8日実施（CBT）",
            "year": 2026,
            "season": "first",
            "sourceTitle": "令和8年度第一種電気工事士上期学科試験【出題例】",
            "questionPdfUrl": QUESTION_PDF_URL,
            "answerPdfUrl": ANSWER_PDF_URL,
            "questionPdfSha256": q_sha,
            "answerPdfSha256": a_sha,
            "sharedFigureSha256": {f"{PUBLIC_DIR}/{stem}.png": value for stem, value in shared_hashes.items()},
            "questions": chunk,
        }
        (batch_root / f"{PAPER}-q{start:02}-{start + 9:02}.json").write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"questions": len(items), "questionPdfSha256": q_sha, "answerPdfSha256": a_sha}, ensure_ascii=False))


if __name__ == "__main__":
    main()
