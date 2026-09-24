"""Prepare 2025 upper academic review candidates from official rows and Opus findings.

The resulting JSON is editorial work, not an accepted receipt. Every changed
five-question file must pass a fresh independent original-image review.
"""

from base64 import b64encode
import json
from pathlib import Path
import re
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
BATCHES = ROOT / "data/raw_pdfs/denko2/review/batches"
REVIEWED = ROOT / "data/questions/denko2/reviewed"
RECEIPTS = ROOT / "docs/evidence/denko2-independent"
CLI = Path.home() / "AppData/Roaming/npm/claude.cmd"
SHARED = ROOT / "public/images/denko2/2025-first/wiring-main.png"
LABELS = {"イ", "ロ", "ハ", "ニ"}


def repaired_rows(rows: list[dict], findings: list[dict], original: dict[int, dict]) -> list[dict]:
    fixes = [item for item in findings if item["status"] == "FIX"]
    if not fixes:
        return rows
    blocks = [{"type": "text", "text": (
        "第二種電気工事士・2025年上期の公式原本に照らし、独立校閲でFIXとなった問題だけを修正する。"
        "公式正答とイロハニ各肢の順番は絶対に変えない。問題文と選択肢を原本画像のとおり文字で読みやすく清書する。"
        "原本に図・写真・表がある場合はdiagramDescriptionに具体的に記載するが、見えない内容を捏造しない。"
        "各肢の解説は、その肢固有の数値・機器・規定が正誤となる理由を示す。根拠のない誤答の由来を作らない。"
        "独立校閲指摘は画像との比較で得られたもの。該当箇所を修正し、他の正しい箇所は維持する。"
        "画像では確認できない法令条項・規格数値はuncertaintyに残す。"
        "返答はFIX対象だけのJSON配列。各要素はnumber,question,choices,officialAnswer,explanation,"
        "choiceExplanations,diagramDescription,uncertaintyを含め、各肢はイ・ロ・ハ・ニ。"
    )}]
    for finding in fixes:
        number = finding["number"]
        row = next(item for item in rows if item["number"] == number)
        blocks.append({"type": "text", "text": f"問{number} 公式正答={original[number]['officialAnswer']}\n現草稿={json.dumps(row, ensure_ascii=False)}\n独立校閲={json.dumps(finding, ensure_ascii=False)}"})
        blocks.append({"type": "image", "source": {"type": "base64", "media_type": "image/png",
                                                   "data": b64encode((ROOT / original[number]["reviewCrop"]).read_bytes()).decode("ascii")}})
    if any(item["number"] >= 31 for item in fixes):
        blocks.append({"type": "text", "text": "以下は問題31〜50に共通する公式配線図。丸数字の矢印と各分電盤を正確に追うこと。"})
        blocks.append({"type": "image", "source": {"type": "base64", "media_type": "image/png",
                                                   "data": b64encode(SHARED.read_bytes()).decode("ascii")}})
    payload = {"type": "user", "message": {"role": "user", "content": blocks}}
    process = subprocess.run(
        [str(CLI), "-p", "--model", "sonnet", "--effort", "medium", "--input-format", "stream-json",
         "--output-format", "stream-json", "--verbose", "--tools", ""],
        input=json.dumps(payload, ensure_ascii=False) + "\n", text=True, encoding="utf-8",
        capture_output=True, cwd=ROOT, timeout=360,
    )
    if process.returncode:
        raise RuntimeError((process.stderr or process.stdout)[-800:])
    events = [json.loads(line) for line in process.stdout.splitlines() if line.startswith("{")]
    final = next((event for event in reversed(events) if event.get("type") == "result"), None)
    if final is None or final.get("is_error"):
        raise ValueError(f"No successful result: {process.stdout[-500:]}")
    content = re.sub(r"^```(?:json)?\s*|\s*```$", "", final.get("result", "").strip(), flags=re.I)
    start, end = content.find("["), content.rfind("]")
    repaired = json.loads(content[start:end + 1])
    if {item["number"] for item in repaired} != {item["number"] for item in fixes}:
        raise ValueError("Corrected question numbers do not match FIX list")
    for item in repaired:
        source = original[item["number"]]
        if item["officialAnswer"] != source["officialAnswer"] or set(item["choices"]) != LABELS or set(item["choiceExplanations"]) != LABELS:
            raise ValueError(f"Changed official answer or missing choice: {item['number']}")
    by_number = {item["number"]: item for item in rows}
    by_number.update({item["number"]: item for item in repaired})
    return [by_number[number] for number in sorted(by_number)]


def main() -> None:
    selected = sys.argv[1:]
    if not selected:
        raise SystemExit("Usage: denko2-revise-20250525.py 20250525-q01-10 [...]")
    REVIEWED.mkdir(parents=True, exist_ok=True)
    for batch_name in selected:
        if not re.fullmatch(r"20250525-q(?:0[1-9]|[1-4][0-9])-\d{2}", batch_name):
            raise ValueError(f"Only 2025 upper academic is in scope: {batch_name}")
        batch = json.loads((BATCHES / f"{batch_name}.json").read_text(encoding="utf-8"))
        source = {item["number"]: item for item in batch["questions"]}
        for part in (1, 2):
            first = batch["questions"][(part - 1) * 5]["number"]
            last = first + 4
            draft_path = BATCHES / f"{batch_name}-vision-part{part:02}.json"
            reviewed_path = REVIEWED / f"20250525-q{first:02}-{last:02}.json"
            review_path = RECEIPTS / f"{batch_name}-opus-review-part{part:02}.json"
            if not review_path.exists():
                raise FileNotFoundError(review_path)
            draft = json.loads((reviewed_path if reviewed_path.exists() else draft_path).read_text(encoding="utf-8"))
            findings = json.loads(review_path.read_text(encoding="utf-8"))["assessment"]
            result = repaired_rows(draft, findings, source)
            for item in result:
                item["reviewedFromCrop"] = source[item["number"]]["reviewCrop"]
                if item["number"] >= 31:
                    item["imageUrls"] = ["/images/denko2/2025-first/wiring-main.png"]
            reviewed_path.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            print(f"{reviewed_path.name}: {len(result)} candidates; {sum(x['status'] == 'FIX' for x in findings)} revised", flush=True)


if __name__ == "__main__":
    main()
