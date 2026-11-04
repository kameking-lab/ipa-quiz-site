"""Rebuild PRIVATE CQ7 originals/assets from normally downloaded official PDFs.

Usage: python scripts/ingest-kukaku-seiri.py <temporary PDF directory>
Requires PyMuPDF. Never downloads or substitutes another edition for missing 2025.
Explanation drafts are maintained separately in explanations.json.
"""
import hashlib
import json
import re
import sys
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "data/qualification-staging/kukaku-seiri"
TMP = Path(sys.argv[1])
KEYS = ["ア", "イ", "ウ", "エ"]
PDF_URL = "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907t_mondaia.pdf"
ANSWER_URL = "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907t_seitou.pdf"


def dump(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")


def compact(text):
    return re.sub(r"\s+", "", text)


doc = fitz.open(TMP / "20260907t_mondaia.pdf")
key = json.loads((DEST / "official-answers.json").read_text(encoding="utf-8"))
explanations_file = DEST / "explanations.json"
explanations = json.loads(explanations_file.read_text(encoding="utf-8")) if explanations_file.exists() else {}
assets = []
questions = []
common = "※本試験問題（学科）においては、以下の特例は考慮しないものとする。\n・土地区画整理法第136条の3（大都市等の特例）及び条例で定める事務処理の特例\n・構造改革特別区域法第32条（都市計画法の特例）で定める特例"
review_assets = []
for filename, page_number, clip, output_name in [
    ("20260907t_mondaia.pdf", 2, [62, 110, 534, 180], "common-instructions-2026.png"),
    ("20260907t_seitou.pdf", 1, None, "official-answers-2026.png"),
    ("20250908t_seitou.pdf", 2, None, "official-answers-2025.png"),
    ("datasheets20251212.pdf", 4, None, "publication-window-2025.png"),
]:
    source = fitz.open(TMP / filename)
    region = fitz.Rect(clip) if clip else source[page_number - 1].rect
    output = DEST / "assets" / output_name
    output.parent.mkdir(parents=True, exist_ok=True)
    source[page_number - 1].get_pixmap(matrix=fitz.Matrix(2, 2), clip=region, alpha=False).save(output)
    review_assets.append({"path": f"assets/{output_name}", "sha256": hashlib.sha256(output.read_bytes()).hexdigest(), "sourceFile": filename, "pdfPage": page_number, "clipRectPoints": list(region)})
for page_index, page in enumerate(doc):
    blocks = page.get_text("blocks", sort=True)
    starts = [(int(m[1]), block[1]) for block in blocks if (m := re.match(r"【No\.\s*(\d+)】", block[4]))]
    for i, (number, top) in enumerate(starts):
        bottom = starts[i + 1][1] - 12 if i + 1 < len(starts) else 755
        clip = fitz.Rect(62, top - 5, 534, bottom)
        body = page.get_text(clip=clip, sort=True).strip()
        body = re.sub(r"^【No\.\s*\d+】\s*", "", body)
        parts = re.split(r"\(\)([1-4])\s*", body)
        assert len(parts) == 9 and parts[1::2] == ["1", "2", "3", "4"], (number, parts)
        # Remove PDF line wrapping only; keep numeric/fullwidth characters intact.
        stem = "\n".join(line.strip() for line in parts[0].splitlines() if line.strip())
        choices = {k: "\n".join(s.strip() for s in value.splitlines() if s.strip()) for k, value in zip(KEYS, parts[2::2])}
        # Fractions have a non-linear PDF text order. Transcribe their visible order.
        if number == 24:
            stem = "次の算出式により評価が求められる画地形状として、適当なものは次のうちどれか。\n\nV＝R×（A/ℓ の修正奥行百分率）×修正係数×A\n＠＝V/A\n\nR＝路線価指数、A＝面積、ℓ＝間口長、V＝評価総指数、＠＝平方メートル当たり指数"
        path = f"assets/2026-q{number:02}.png"
        output = DEST / path
        output.parent.mkdir(parents=True, exist_ok=True)
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), clip=clip, alpha=False)
        pix.save(output)
        assets.append({"path": path, "sha256": hashlib.sha256(output.read_bytes()).hexdigest(), "questionNumber": number, "pdfUrl": PDF_URL, "pdfPage": page_index + 1, "clipRectPoints": list(clip), "width": pix.width, "height": pix.height})
        draft = explanations.get(str(number), {})
        questions.append({
            "id": f"kukaku-seiri-2026-annual-gakka-q{number}", "exam": "kukaku-seiri", "year": 2026,
            "season": "annual", "session": "gakka", "qNumber": number, "type": "multiple-choice",
            "category": ["土地区画整理事業総論", "換地計画", "土地評価", "法規"][(number - 1) // 10],
            "question": stem, "choices": choices, "answer": KEYS[key["2026"]["answers"][number - 1] - 1],
            "officialAnswerNumber": key["2026"]["answers"][number - 1],
            "sharedContext": common, "originalText": body,
            "sourceImages": ["assets/common-instructions-2026.png", path], "sourcePages": [page_index + 1],
            "sourcePdfUrl": PDF_URL, "sourceAnswerUrl": ANSWER_URL,
            "sourceAttribution": f"出典：一般財団法人全国建設研修センター 令和8年度土地区画整理士技術検定 学科 No.{number}（PDF {page_index + 1}ページ）。解説は過去問AIの独自作成。",
            "lawReferenceDate": None, "lawReferenceDateStatus": "not-specified-in-official-materials",
            "lawNote": "2026年度の出題時点に基づく。公式問題・受検の手引で一律の法令基準日を確認できないため日付を推定していない。大都市等の特例・条例による事務処理特例・構造改革特別区域法の特例は問題冊子の指示に従い考慮しない。",
            "choiceExplanations": draft.get("choices", {}), "explanation": draft.get("summary", ""),
            "explanationReferences": draft.get("references", []), "explanationCoverage": "all-choices",
            "publicAllowed": False, "needsReview": True, "lastUpdated": "2026-11-04",
        })
assert [q["qNumber"] for q in questions] == list(range(1, 41))
dump(DEST / "2026-annual.json", questions)
dump(DEST / "assets.json", assets)
dump(DEST / "source-review-assets.json", review_assets)
print(f"Built {len(questions)} original questions / {len(assets)} private PDF regions")
