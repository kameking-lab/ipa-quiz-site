"""Apply every issue from the independent final review to reviewed JSON."""

from __future__ import annotations

from base64 import b64encode
import json
from pathlib import Path
import re
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
REVIEWED = ROOT / "data/questions/denko2/reviewed"
FINAL_REVIEW = ROOT / "docs/evidence/denko2-final-review"
BATCHES = ROOT / "data/raw_pdfs/denko2/review/batches"
WIRING = ROOT / "public/images/denko2/2024-second/wiring-diagram.png"
CLI = Path.home() / "AppData/Roaming/npm/claude.cmd"
LABELS = {"イ", "ロ", "ハ", "ニ"}


def image(path: Path) -> dict:
    return {"type": "image", "source": {"type": "base64", "media_type": "image/png",
            "data": b64encode(path.read_bytes()).decode("ascii")}}


def parse(text: str) -> list[dict]:
    text = re.sub(r"^```(?:json)?\s*|\s*```$", "", text.strip(), flags=re.I)
    start, end = text.find("["), text.rfind("]")
    if start < 0 or end < start:
        raise ValueError("No JSON array")
    return json.loads(text[start:end + 1])


def correct(first: int) -> str:
    last = first + 4
    target = REVIEWED / f"20241027-q{first:02}-{last:02}.json"
    current = json.loads(target.read_text(encoding="utf-8"))
    receipt_path = FINAL_REVIEW / f"20241027-q{first:02}-{last:02}-opus.json"
    receipt = json.loads(receipt_path.read_text(encoding="utf-8"))
    fixes = [item for item in receipt["assessment"] if item["status"] == "FIX"]
    if not fixes:
        return f"{target.name}: no corrections needed"
    batch_first = ((first - 1) // 10) * 10 + 1
    batch = json.loads((BATCHES / f"20241027-q{batch_first:02}-{batch_first + 9:02}.json").read_text(encoding="utf-8"))
    originals = {item["number"]: item for item in batch["questions"]}
    prompt = (
        "あなたは第二種電気工事士の訂正担当。独立監査の全指摘を一つ残らず反映して公開用JSONを訂正する。"
        "公式設問行画像と、問31-50では公式15頁配線図を再確認する。公式正答・問題番号・イロハニ順は絶対に変更しない。"
        "誤答理由は憶測で作らず、正しい計算・規定・画像との差を直接説明する。監査が条番号を示したときは必ず本文へ入れる。"
        "既存のimageUrls、reviewedFromCrop、一次資料officialReferenceUrlsは保持する。uncertaintyは空文字にする。"
        "出力は5問すべてを含むJSON配列のみ。フィールド構造は入力JSONと同じにする。"
    )
    blocks: list[dict] = [{"type": "text", "text": prompt}]
    if first >= 31:
        blocks.append({"type": "text", "text": "公式15頁配線図:"})
        blocks.append(image(WIRING))
    current_by_number = {item["number"]: item for item in current}
    review_by_number = {item["number"]: item for item in receipt["assessment"]}
    for number in range(first, last + 1):
        source = originals[number]
        blocks.append({"type": "text", "text":
                       f"問{number}、公式正答={source['officialAnswer']}。現行JSON=" +
                       json.dumps(current_by_number[number], ensure_ascii=False) +
                       "。独立監査=" + json.dumps(review_by_number[number], ensure_ascii=False)})
        blocks.append(image(ROOT / source["reviewCrop"]))
    request = {"type": "user", "message": {"role": "user", "content": blocks}}
    process = subprocess.run(
        [str(CLI), "-p", "--model", "sonnet", "--effort", "high", "--input-format", "stream-json",
         "--output-format", "stream-json", "--verbose", "--tools", ""],
        input=json.dumps(request, ensure_ascii=False) + "\n", text=True, encoding="utf-8",
        capture_output=True, cwd=ROOT, timeout=480,
    )
    if process.returncode:
        raise RuntimeError((process.stderr or process.stdout)[-1000:])
    events = [json.loads(line) for line in process.stdout.splitlines() if line.startswith("{")]
    result = next((event for event in reversed(events) if event.get("type") == "result"), None)
    if result is None or result.get("is_error"):
        raise ValueError("Correction model failed")
    corrected = parse(result.get("result", ""))
    if len(corrected) != 5 or {item.get("number") for item in corrected} != set(range(first, last + 1)):
        raise ValueError("Correction coverage differs")
    for item in corrected:
        number = item["number"]
        old = current_by_number[number]
        if item.get("officialAnswer") != originals[number]["officialAnswer"]:
            raise ValueError(f"Q{number}: official answer changed")
        if set(item.get("choices", {})) != LABELS or set(item.get("choiceExplanations", {})) != LABELS:
            raise ValueError(f"Q{number}: incomplete choices")
        if item.get("uncertainty"):
            raise ValueError(f"Q{number}: unresolved uncertainty")
        for key in ("imageUrls", "reviewedFromCrop"):
            if key in old and item.get(key) != old[key]:
                item[key] = old[key]
    target.write_text(json.dumps(corrected, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return f"{target.name}: corrected {len(fixes)} flagged questions"


def main() -> None:
    starts = [int(value) for value in sys.argv[1].split(",")] if len(sys.argv) > 1 else list(range(1, 51, 5))
    for first in starts:
        print(correct(first), flush=True)


if __name__ == "__main__":
    main()
