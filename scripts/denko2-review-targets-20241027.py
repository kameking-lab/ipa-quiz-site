"""Review only previously rejected 2024-lower questions and emit additive receipts."""

from __future__ import annotations

from base64 import b64encode
from hashlib import sha256
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


def image(path: Path) -> dict:
    return {"type": "image", "source": {"type": "base64", "media_type": "image/png",
            "data": b64encode(path.read_bytes()).decode("ascii")}}


def parse(text: str) -> list[dict]:
    text = re.sub(r"^```(?:json)?\s*|\s*```$", "", text.strip(), flags=re.I)
    start, end = text.find("["), text.rfind("]")
    if start < 0 or end < start:
        raise ValueError("No JSON array")
    return json.loads(text[start:end + 1])


def reviewed_question(number: int) -> tuple[dict, Path]:
    first = ((number - 1) // 5) * 5 + 1
    path = REVIEWED / f"20241027-q{first:02}-{first + 4:02}.json"
    item = next(value for value in json.loads(path.read_text(encoding="utf-8")) if value["number"] == number)
    return item, path


def original_question(number: int) -> dict:
    first = ((number - 1) // 10) * 10 + 1
    path = BATCHES / f"20241027-q{first:02}-{first + 9:02}.json"
    return next(value for value in json.loads(path.read_text(encoding="utf-8"))["questions"] if value["number"] == number)


def review(numbers: list[int], output_dir: Path) -> str:
    entries = [(number, *reviewed_question(number), original_question(number)) for number in numbers]
    hashes = {
        "reviewedSha256": {str(number): sha256(path.read_bytes()).hexdigest() for number, _item, path, _source in entries},
        "rowSha256": {str(number): sha256((ROOT / source["reviewCrop"]).read_bytes()).hexdigest()
                       for number, _item, _path, source in entries},
    }
    name = "20241027-" + "-".join(f"q{number:02}" for number in numbers) + "-opus.json"
    output = output_dir / name
    prompt = (
        "あなたは第二種電気工事士の公開前最終監査者。以前FIXだった問だけを訂正後JSONで再監査する。"
        "公式設問行画像を原本として問題文・全4肢・公式正答・総合解説・肢別理由・図写真・法令根拠を厳密に確認する。"
        "問題31-50は追加の公式15頁配線図で丸数字の位置と回路を必ず照合する。"
        "過去の指摘が直ったかだけでなく、新しい矛盾も検査する。公式正答は変更しない。"
        "出力はJSON配列のみで各問number,status(PASS/FIX),textIssues,choiceIssues,answerIssues,"
        "explanationIssues,visualIssues,lawIssuesを持ち、各issueは文字列配列。問題なければ全配列を空にする。"
    )
    blocks: list[dict] = [{"type": "text", "text": prompt}]
    if any(number >= 31 for number in numbers):
        blocks.extend([{"type": "text", "text": "公式15頁配線図:"}, image(WIRING)])
    for number, item, _path, source in entries:
        blocks.append({"type": "text", "text": f"問{number}。公式正答={source['officialAnswer']}。完成JSON=" +
                       json.dumps(item, ensure_ascii=False)})
        blocks.append(image(ROOT / source["reviewCrop"]))
    request = {"type": "user", "message": {"role": "user", "content": blocks}}
    process = subprocess.run(
        [str(CLI), "-p", "--model", "opus", "--effort", "high", "--input-format", "stream-json",
         "--output-format", "stream-json", "--verbose", "--tools", ""],
        input=json.dumps(request, ensure_ascii=False) + "\n", text=True, encoding="utf-8",
        capture_output=True, cwd=ROOT, timeout=480,
    )
    if process.returncode:
        raise RuntimeError((process.stderr or process.stdout)[-1000:])
    events = [json.loads(line) for line in process.stdout.splitlines() if line.startswith("{")]
    result = next((event for event in reversed(events) if event.get("type") == "result"), None)
    if result is None or result.get("is_error"):
        raise ValueError("Targeted Opus review failed")
    assessment = parse(result.get("result", ""))
    if len(assessment) != len(numbers) or {item.get("number") for item in assessment} != set(numbers):
        raise ValueError("Targeted review coverage differs")
    output_dir.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps({"schemaVersion": 1, "reviewModel": "claude-opus-5-5",
                                  "inputHashes": hashes, "assessment": assessment},
                                 ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    passed = sum(item["status"] == "PASS" for item in assessment)
    return f"{name}: {passed}/{len(numbers)} pass, {len(numbers) - passed} fix"


def main() -> None:
    numbers = [int(value) for value in sys.argv[1].split(",")]
    round_name = sys.argv[2]
    output_dir = ROOT / "docs/evidence/denko2-final-review" / round_name
    for offset in range(0, len(numbers), 5):
        print(review(numbers[offset:offset + 5], output_dir), flush=True)


if __name__ == "__main__":
    main()
