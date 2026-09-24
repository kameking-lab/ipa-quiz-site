"""Opus visual audit of the 65 unique official skill exam PDF pairs.

One identical question/answer SHA pair may represent multiple test dates. Those
date aliases must still be checked against the manifest; they are not new PDFs.
"""

from base64 import b64encode
from hashlib import sha256
import json
from pathlib import Path
import re
import subprocess
import sys

import fitz
from PIL import Image
from io import BytesIO

ROOT = Path(__file__).resolve().parents[1]
RECORDS = json.loads((ROOT / "data/questions/denko2/skills-draft.json").read_text(encoding="utf-8"))
RAW = ROOT / "data/raw_pdfs/denko2/skill"
OUTPUT = ROOT / "docs/evidence/denko2-skill-independent"
CLI = Path.home() / "AppData/Roaming/npm/claude.cmd"


def unique_records() -> list[dict]:
    seen = set()
    unique = []
    for item in RECORDS:
        pair = (item["questionPdfSha256"], item["answerPdfSha256"])
        if pair not in seen:
            seen.add(pair)
            unique.append(item)
    return unique


def page_image(page: fitz.Page) -> str:
    pix = page.get_pixmap(matrix=fitz.Matrix(1.8, 1.8), alpha=False)
    return b64encode(pix.tobytes("png")).decode("ascii")


def review(item: dict) -> str:
    qpath = RAW / item["questionPdfUrl"].rsplit("/", 1)[-1]
    apath = RAW / item["answerPdfUrl"].rsplit("/", 1)[-1]
    output = OUTPUT / (item["questionPdfSha256"][:16] + "-" + item["answerPdfSha256"][:16] + ".json")
    input_hashes = {
        "reviewPromptVersion": "skill-source-v4",
        "questionPdfSha256": item["questionPdfSha256"],
        "answerPdfSha256": item["answerPdfSha256"],
        "extractedRecordSha256": sha256(json.dumps(item, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest(),
    }
    if output.exists():
        old = json.loads(output.read_text(encoding="utf-8"))
        if old.get("inputHashes") == input_hashes:
            return f"{item['id']}: cached {old['assessment']['status']}"
    question = fitz.open(qpath)
    answer = fitz.open(apath)
    prompt = (
        "あなたは第二種電気工事士の技能試験原本照合者。1課題の公式『問題PDF』3頁と公式『解答PDF』3頁を順に示す。"
        "抽出JSONの試験指示・支給材料・施工条件・図下注記について、原本の数字、器具、電線寸法、色、接続方法、数量が一致するか厳しく確認。"
        "問題第1頁の受験事務・注意事項・追加支給案内は抽出対象外。原本の配線図とその中のラベル・寸法・記号はdiagramImageとして表示し、本文への重複転記は不要。図下注記だけはテキストで表示する。"
        "公式解答の概念図・複線図・完成作品例が、この問題の同じNo.に対応しているか確認。"
        "PDFテキスト層に抽出不能な数式・図中文字があれば具体的に指摘。"
        "表示する切り抜きdiagramImage、必要な場合のsecondFigureImageも添付する。問題PDFの配線図と図2にある記号・器具・電線寸法・施工省略域が切れずに読めるか確認。"
        "評価は原本との一致に限り、実際に現物作品を採点したとは言わない。"
        "JSONオブジェクト1件のみ返す: status(PASS/FIX), textIssues[], diagramIssues[], modelAnswerIssues[], notes[]。"
        "FIXは実質的な原本差異、重要な欠落、または判読不能のときのみ。句読点・改行・番号表記の統一や文体への提案はPASSとする。型どおりの一般論は書かず具体的な差分を記述。"
    )
    candidate = {field: item[field] for field in ("id", "date", "number", "instructionText", "materialsText", "conditionsText", "diagramNotesText")}
    blocks = [{"type": "text", "text": prompt + "\n抽出JSON=" + json.dumps(candidate, ensure_ascii=False)}]
    for document, document_name in ((question, "問題"), (answer, "解答")):
        for page_index, page in enumerate(document):
            blocks.append({"type": "text", "text": f"公式{document_name}PDF 第{page_index + 1}頁"})
            blocks.append({"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": page_image(page)}})
    for field in ("diagramImage", "secondFigureImage"):
        if not item[field]:
            continue
        diagram_path = ROOT / "public" / item[field].lstrip("/")
        with Image.open(diagram_path) as diagram:
            converted = BytesIO()
            diagram.save(converted, format="PNG")
        blocks.append({"type": "text", "text": f"公開候補の切り抜き {field}"})
        blocks.append({"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": b64encode(converted.getvalue()).decode("ascii")}})
    request = {"type": "user", "message": {"role": "user", "content": blocks}}
    process = subprocess.run(
        [str(CLI), "-p", "--model", "opus", "--effort", "medium", "--input-format", "stream-json",
         "--output-format", "stream-json", "--verbose", "--tools", ""],
        input=json.dumps(request, ensure_ascii=False) + "\n", text=True, encoding="utf-8",
        capture_output=True, cwd=ROOT, timeout=360,
    )
    if process.returncode:
        raise RuntimeError(f"Claude exit {process.returncode}: {(process.stderr or process.stdout)[-500:]}")
    events = [json.loads(line) for line in process.stdout.splitlines() if line.startswith("{")]
    final = next((event for event in reversed(events) if event.get("type") == "result"), None)
    if final is None or final.get("is_error"):
        raise ValueError(f"No successful result: {process.stdout[-500:]}")
    content = re.sub(r"^```(?:json)?\s*|\s*```$", "", final.get("result", "").strip(), flags=re.I)
    start, end = content.find("{"), content.rfind("}")
    assessment = json.loads(content[start:end + 1])
    if assessment.get("status") not in ("PASS", "FIX"):
        raise ValueError(f"Unexpected assessment: {assessment}")
    OUTPUT.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps({"inputHashes": input_hashes, "reviewModel": "claude-opus-5-5",
                                  "sourceItemId": item["id"], "assessment": assessment}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return f"{item['id']}: {assessment['status']}"


def main() -> None:
    unique = unique_records()
    if len(unique) != 65:
        raise ValueError(f"Expected 65 unique PDF pairs; got {len(unique)}")
    start = int(sys.argv[1]) if len(sys.argv) > 1 else 0
    count = int(sys.argv[2]) if len(sys.argv) > 2 else 2
    for item in unique[start:start + count]:
        print(review(item), flush=True)


if __name__ == "__main__":
    main()
