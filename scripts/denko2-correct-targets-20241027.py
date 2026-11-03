"""Correct only the question numbers rejected by an additive review round."""

from __future__ import annotations

from base64 import b64encode
import json
from pathlib import Path
import re
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
REVIEWED = ROOT / "data/questions/denko2/reviewed"
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


def locate(number: int) -> tuple[Path, list[dict], dict, dict]:
    first5 = ((number - 1) // 5) * 5 + 1
    target = REVIEWED / f"20241027-q{first5:02}-{first5 + 4:02}.json"
    values = json.loads(target.read_text(encoding="utf-8"))
    current = next(item for item in values if item["number"] == number)
    first10 = ((number - 1) // 10) * 10 + 1
    batch = json.loads((BATCHES / f"20241027-q{first10:02}-{first10 + 9:02}.json").read_text(encoding="utf-8"))
    source = next(item for item in batch["questions"] if item["number"] == number)
    return target, values, current, source


def load_assessments(receipt_dir: Path) -> dict[int, dict]:
    result = {}
    for path in receipt_dir.glob("*.json"):
        for item in json.loads(path.read_text(encoding="utf-8"))["assessment"]:
            result[item["number"]] = item
    return result


def correct(numbers: list[int], receipt_dir: Path) -> str:
    assessments = load_assessments(receipt_dir)
    entries = [(number, *locate(number)) for number in numbers]
    for number, *_ in entries:
        if assessments[number]["status"] != "FIX":
            raise ValueError(f"Q{number} is not rejected in {receipt_dir}")
    prompt = (
        "あなたは第二種電気工事士の訂正担当。独立監査で再度FIXになった問だけを訂正する。"
        "監査の指摘を一つ残らず反映し、公式設問行画像と、問31-50では公式15頁配線図を再確認する。"
        "公式正答・番号・イロハニ順を変更しない。誤答理由は憶測せず正しい計算・規定・画像との差を直接説明する。"
        "既存のimageUrls、reviewedFromCrop、officialReferenceUrlsを保持し、uncertaintyは空文字。"
        "出力は指定された問だけのJSON配列で、入力と同じ全フィールドを返す。"
    )
    blocks: list[dict] = [{"type": "text", "text": prompt}]
    if any(number >= 31 for number in numbers):
        blocks.extend([{"type": "text", "text": "公式15頁配線図:"}, image(WIRING)])
    for number, _target, _values, current, source in entries:
        blocks.append({"type": "text", "text": f"問{number}。公式正答={source['officialAnswer']}。現行JSON=" +
                       json.dumps(current, ensure_ascii=False) + "。監査=" +
                       json.dumps(assessments[number], ensure_ascii=False)})
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
        raise ValueError("Targeted correction failed")
    corrected = parse(result.get("result", ""))
    if len(corrected) != len(numbers) or {item.get("number") for item in corrected} != set(numbers):
        raise ValueError("Correction coverage differs")
    by_number = {item["number"]: item for item in corrected}
    touched: dict[Path, list[dict]] = {}
    for number, target, values, old, source in entries:
        item = by_number[number]
        if item.get("officialAnswer") != source["officialAnswer"]:
            raise ValueError(f"Q{number}: official answer changed")
        if set(item.get("choices", {})) != LABELS or set(item.get("choiceExplanations", {})) != LABELS:
            raise ValueError(f"Q{number}: incomplete choices")
        for key in ("imageUrls", "reviewedFromCrop"):
            if key in old:
                item[key] = old[key]
        output_values = touched.setdefault(target, values)
        output_values[output_values.index(old)] = item
    for target, values in touched.items():
        target.write_text(json.dumps(values, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return "corrected targets " + ",".join(str(number) for number in numbers)


def main() -> None:
    numbers = [int(value) for value in sys.argv[1].split(",")]
    receipt_dir = ROOT / "docs/evidence/denko2-final-review" / sys.argv[2]
    for offset in range(0, len(numbers), 5):
        print(correct(numbers[offset:offset + 5], receipt_dir), flush=True)


if __name__ == "__main__":
    main()
