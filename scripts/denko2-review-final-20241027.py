"""Independent Opus review of finalized 2024 lower electrician questions."""

from __future__ import annotations

from base64 import b64encode
from hashlib import sha256
import json
from pathlib import Path
import re
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
BATCHES = ROOT / "data/raw_pdfs/denko2/review/batches"
REVIEWED = ROOT / "data/questions/denko2/reviewed"
RECEIPTS = ROOT / "docs/evidence/denko2-final-review"
WIRING = ROOT / "public/images/denko2/2024-second/wiring-diagram.png"
CLI = Path.home() / "AppData/Roaming/npm/claude.cmd"


def image_block(path: Path) -> dict:
    return {"type": "image", "source": {"type": "base64", "media_type": "image/png",
            "data": b64encode(path.read_bytes()).decode("ascii")}}


def parse(text: str) -> list[dict]:
    text = re.sub(r"^```(?:json)?\s*|\s*```$", "", text.strip(), flags=re.I)
    start, end = text.find("["), text.rfind("]")
    if start < 0 or end < start:
        raise ValueError("No JSON review array")
    return json.loads(text[start:end + 1])


def review(first: int) -> str:
    last = first + 4
    reviewed_path = REVIEWED / f"20241027-q{first:02}-{last:02}.json"
    finalized = json.loads(reviewed_path.read_text(encoding="utf-8"))
    batch_first = ((first - 1) // 10) * 10 + 1
    batch = json.loads((BATCHES / f"20241027-q{batch_first:02}-{batch_first + 9:02}.json").read_text(encoding="utf-8"))
    originals = {item["number"]: item for item in batch["questions"]}
    source = [originals[number] for number in range(first, last + 1)]
    hashes = {
        "reviewedSha256": sha256(reviewed_path.read_bytes()).hexdigest(),
        "rowSha256": {str(item["number"]): sha256((ROOT / item["reviewCrop"]).read_bytes()).hexdigest()
                       for item in source},
    }
    RECEIPTS.mkdir(parents=True, exist_ok=True)
    output = RECEIPTS / f"20241027-q{first:02}-{last:02}-opus.json"
    if output.exists():
        previous = json.loads(output.read_text(encoding="utf-8"))
        if previous.get("inputHashes") == hashes:
            passed = sum(item["status"] == "PASS" for item in previous["assessment"])
            return f"{output.name}: existing {passed}/5 pass"

    prompt = (
        "あなたは第二種電気工事士の公開前最終監査者。別モデルが完成させたJSONを公式設問行画像と"
        "一問ずつ照合する。問題文の否定・数値・単位、イロハニ全肢の内容と順序、公式正答、総合解説、"
        "4肢すべての理由、法令根拠、図写真の説明を厳密に検査する。公式正答は変更しない。"
        "問題31-50では追加の公式15頁配線図の丸数字位置と回路を必ず確認する。"
        "画像が必要な問でimageUrlsがなければ指摘する。根拠のない誤答由来、画像と異なる製品名、"
        "不明を正答だけで埋めた説明もFIX。出力はJSON配列のみで、各問number,status(PASS/FIX),"
        "textIssues,choiceIssues,answerIssues,explanationIssues,visualIssues,lawIssuesを持つ。"
        "全フィールドは文字列配列。問題がなければ各issue配列を空にする。"
    )
    blocks: list[dict] = [{"type": "text", "text": prompt}]
    if first >= 31:
        blocks.append({"type": "text", "text": "公式15頁の共通配線図:"})
        blocks.append(image_block(WIRING))
    final_by_number = {item["number"]: item for item in finalized}
    for item in source:
        number = item["number"]
        blocks.append({"type": "text", "text":
                       f"問{number}。公式正答={item['officialAnswer']}。完成JSON=" +
                       json.dumps(final_by_number[number], ensure_ascii=False)})
        blocks.append(image_block(ROOT / item["reviewCrop"]))

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
        raise ValueError("Opus review failed")
    assessment = parse(result.get("result", ""))
    if len(assessment) != 5 or {item.get("number") for item in assessment} != set(range(first, last + 1)):
        raise ValueError("Opus review coverage differs")
    output.write_text(json.dumps({"schemaVersion": 1, "reviewModel": "claude-opus-5-5",
                                  "inputHashes": hashes, "assessment": assessment},
                                 ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    passed = sum(item["status"] == "PASS" for item in assessment)
    return f"{output.name}: {passed}/5 pass, {5 - passed} fix"


def main() -> None:
    starts = [int(value) for value in sys.argv[1].split(",")] if len(sys.argv) > 1 else list(range(1, 51, 5))
    for first in starts:
        print(review(first), flush=True)


if __name__ == "__main__":
    main()
