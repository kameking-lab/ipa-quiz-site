"""Deterministic first pass over published electrician papers.

It verifies the official bytes, enumerates exactly 50 numbered rows per paper,
and exports raw left/right cell text plus review crops. It deliberately does not
turn unreviewed OCR or diagram choices into playable questions.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path
import re
import urllib.request

import fitz


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts/denko2-source-manifest.json"
CACHE = ROOT / "data/raw_pdfs/denko2"
CHOICES = "イロハニ"


def load_verified(url: str, expected_sha: str, destination: Path) -> Path:
    destination.parent.mkdir(parents=True, exist_ok=True)
    if not destination.exists():
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=40) as response:
            destination.write_bytes(response.read())
    actual = hashlib.sha256(destination.read_bytes()).hexdigest()
    if actual != expected_sha:
        raise ValueError(f"SHA-256 mismatch for {destination.name}: {actual}")
    return destination


def answer_key(path: Path, count: int) -> dict[int, str]:
    text = fitz.open(path)[0].get_text()
    pairs = [(int(number), choice) for number, choice in re.findall(r"(?m)^(\d{1,2})\n([イロハニ])$", text)]
    answer = dict(pairs)
    if len(pairs) != count or set(answer) != set(range(1, count + 1)):
        raise ValueError(f"Answer coverage is {len(pairs)}/{count}: {path}")
    return answer


def row_positions(pdf: fitz.Document, count: int) -> dict[int, tuple[int, float, float]]:
    positions: dict[int, tuple[int, float]] = {}
    for page_index, page in enumerate(pdf):
        for x0, y0, _x1, _y1, word, *_ in page.get_text("words"):
            if not re.fullmatch(r"[0-9]+", word) or not (60 < x0 < 85 and 50 < y0 < 920):
                continue
            number = int(word)
            if number in range(1, count + 1):
                if number in positions:
                    raise ValueError(f"Duplicate question {number} on page {page_index + 1}")
                positions[number] = (page_index, y0)
    if set(positions) != set(range(1, count + 1)):
        raise ValueError(f"Question number coverage {len(positions)}/{count}")

    rows: dict[int, tuple[int, float, float]] = {}
    for number in range(1, count + 1):
        index, start = positions[number]
        next_position = positions.get(number + 1)
        # Final rows often continue below y=930 (notably diagrams at the foot
        # of the page). Keep the entire table down to the footer margin.
        end = next_position[1] if next_position and next_position[0] == index else pdf[index].rect.height - 65
        rows[number] = (index, start - 5, end - 6)
    return rows


def normalize(text: str) -> str:
    return "\n".join(line.strip() for line in text.splitlines() if line.strip())


def extract_paper(paper: dict[str, object]) -> dict[str, object]:
    date = str(paper["date"]).replace("-", "")
    question_file = load_verified(str(paper["questionUrl"]), str(paper["questionSha256"]), CACHE / f"{date}_q01.pdf")
    answer_file = load_verified(str(paper["answerUrl"]), str(paper["answerSha256"]), CACHE / f"{date}_a01.pdf")
    pdf = fitz.open(question_file)
    count = int(paper["questionCount"])
    keys = answer_key(answer_file, count)
    rows = row_positions(pdf, count)
    review = CACHE / "review" / date
    review.mkdir(parents=True, exist_ok=True)

    extracted = []
    for number in range(1, count + 1):
        page_index, top, bottom = rows[number]
        page = pdf[page_index]
        left = normalize(page.get_textbox(fitz.Rect(88, top, 303, bottom)))
        right = normalize(page.get_textbox(fitz.Rect(304, top, 663, bottom)))
        screenshot = review / f"q{number:02d}.png"
        page.get_pixmap(matrix=fitz.Matrix(2, 2), clip=fitz.Rect(60, top, 665, bottom), alpha=False).save(screenshot)
        markers = {label: len(re.findall(rf"(?<!\S){label}[．.。]", right)) for label in CHOICES}
        extracted.append({
            "number": number,
            "page": page_index + 1,
            "rowY": [round(top, 1), round(bottom, 1)],
            "questionRaw": left,
            "choicesRaw": right,
            "officialAnswer": keys[number],
            "choiceMarkers": markers,
            "needsVisualReview": number >= 31 or any(word in left for word in ("図", "写真", "器具", "工具")) or any(value != 1 for value in markers.values()),
            "reviewCrop": str(screenshot.relative_to(ROOT)).replace("\\", "/"),
        })

    return {
        "date": paper["date"], "year": paper["year"], "season": paper["season"],
        "questionCount": count, "questionSha256": paper["questionSha256"],
        "answerSha256": paper["answerSha256"], "rows": extracted,
    }


def main() -> None:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    papers = [extract_paper(paper) for paper in manifest["papers"]]
    output = CACHE / "review" / "raw-extraction.json"
    output.write_text(json.dumps(papers, ensure_ascii=False, indent=2), encoding="utf-8")
    for paper in papers:
        flagged = sum(bool(row["needsVisualReview"]) for row in paper["rows"])
        print(f"{paper['date']}: {paper['questionCount']} questions and answers, {flagged} visual-review rows")
    print(f"Raw extraction: {output}")


if __name__ == "__main__":
    main()
