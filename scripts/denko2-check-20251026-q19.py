"""Pin the exam centre's original ring-sleeve combination chart for Q19."""

from hashlib import sha256
import json
from pathlib import Path
import requests
import fitz

ROOT = Path(__file__).resolve().parents[1]
URL = "https://www.shiken.or.jp/ecee-overview/news/upload/point2024.pdf"
EXPECTED = "0b40cdd6fd912d444d2bca2d5962293e2e0e29cbd637fccf70d715506c2b5717"
pdf_path = ROOT / "data/raw_pdfs/denko2/review/ecee-point2024.pdf"
if not pdf_path.exists():
    response = requests.get(URL, timeout=30)
    response.raise_for_status()
    pdf_path.parent.mkdir(parents=True, exist_ok=True)
    pdf_path.write_bytes(response.content)
raw = pdf_path.read_bytes()
if sha256(raw).hexdigest() != EXPECTED:
    raise ValueError("Exam centre chart PDF changed")
document = fitz.open(stream=raw, filetype="pdf")
page = document[24]
printed = page.get_text()
for phrase in ["リングスリーブ（Ｅ形）と電線の組合せ", "φ2.0mm2本とφ1.6mm1～3本", "3～4本", "2本", "3～4本"]:
    if phrase not in printed:
        raise ValueError(f"Official ring-sleeve chart lacks {phrase}")
image = ROOT / "docs/evidence/denko2-independent/20251026-q19-official-ring-sleeve-chart.png"
image.parent.mkdir(parents=True, exist_ok=True)
pix = page.get_pixmap(matrix=fitz.Matrix(3, 3), clip=fitz.Rect(80, 118, 510, 380), alpha=False)
pix.save(image)
receipt = {
    "schemaVersion": 1,
    "question": "20251026-q19",
    "status": "official-source-verified",
    "sourceUrl": URL,
    "sourcePdfSha256": EXPECTED,
    "sourcePageIndex": 24,
    "source": "電気技術者試験センター『技能試験の概要と注意すべきポイント』リングスリーブ（E形）と電線の組合せ表",
    "sourceScope": "独立レビュー内部照合用。公開の公式法令リンクとして表示しない。",
    "referenceImage": str(image.relative_to(ROOT)).replace("\\", "/"),
    "referenceImageSha256": sha256(image.read_bytes()).hexdigest(),
    "verifiedCombinations": {
        "2.0mm x 2": "小スリーブ・刻印 小",
        "2.0mm x 3": "中スリーブ・刻印 中",
        "1.6mm x 3": "小スリーブ・刻印 小",
        "1.6mm x 1 + 2.0mm x 2": "中スリーブ・刻印 中",
    },
    "unresolved": [],
}
output = ROOT / "docs/evidence/denko2-law/20251026-q19.json"
output.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
for number in (46, 47):
    derived = {**receipt,
               "question": f"20251026-q{number:02}",
               "verifiedCombinations": {
                   "1.6mm x 2": "小スリーブ・刻印 ○",
                   "1.6mm x 3-4": "小スリーブ・刻印 小",
                   "1.6mm x 5-6": "中スリーブ・刻印 中",
               },
               "scopeNote": "スリーブ径と刻印だけを確認。ボックス内の結線本数は公式配線図を別途視認する。"}
    (ROOT / f"docs/evidence/denko2-law/20251026-q{number:02}.json").write_text(
        json.dumps(derived, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("Q19/Q46/Q47 official ring-sleeve chart and configurations visually pinned")
