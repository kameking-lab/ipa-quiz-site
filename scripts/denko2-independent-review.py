"""Ask Opus 5.5 to independently inspect every non-public draft against official rows.

This is a second reviewer, not an acceptance gate by itself. A separate receipt
records corrections, figure-only crops and government-source checks.
"""

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
RECEIPTS = ROOT / "docs/evidence/denko2-independent"
CLI = Path.home() / "AppData/Roaming/npm/claude.cmd"


def draft_for(batch_path: Path, part: int) -> tuple[list[dict], Path]:
    if batch_path.stem == "20240526-q01-10":
        suffix = "q01-05" if part == 1 else "q06-10"
        path = REVIEWED / f"20240526-{suffix}.json"
    else:
        path = batch_path.with_name(batch_path.stem + f"-vision-part{part:02}.json")
    return json.loads(path.read_text(encoding="utf-8")), path


def check(batch_path: Path, part: int) -> str:
    batch = json.loads(batch_path.read_text(encoding="utf-8"))
    original = batch["questions"][(part - 1) * 5:part * 5]
    draft, draft_path = draft_for(batch_path, part)
    if {item["number"] for item in original} != {item["number"] for item in draft}:
        raise ValueError("Draft and official row numbering differs")
    RECEIPTS.mkdir(parents=True, exist_ok=True)
    output = RECEIPTS / (batch_path.stem + f"-opus-review-part{part:02}.json")
    hashes = {
        "draftSha256": sha256(draft_path.read_bytes()).hexdigest(),
        "rowSha256": {str(item["number"]): sha256((ROOT / item["reviewCrop"]).read_bytes()).hexdigest()
                      for item in original},
    }
    if output.exists():
        previous = json.loads(output.read_text(encoding="utf-8"))
        if previous.get("inputHashes") == hashes:
            return f"{output.name}: existing and input hashes match"
        old_sha = previous.get("inputHashes", {}).get("draftSha256", "unknown")[:12]
        archive = BATCHES / "independent-archive"
        archive.mkdir(parents=True, exist_ok=True)
        stale = archive / (output.stem + f"-old-{old_sha}.json")
        if stale.exists():
            raise FileExistsError(stale)
        output.rename(stale)

    prompt = (
        "あなたは第二種電気工事士の独立品質監査者。問題原本の画像と、別モデルが清書したJSONを突き合わせる。"
        "全ての問について問題文の極性・数値・単位・図の接続、イロハニ全肢の文字と順番、公式正答との整合、"
        "解説と4つの肢別理由の数式・因果関係を厳しく検査。推測した誤答の由来に計算矛盾があれば必ず指摘する。"
        "規則条項の真偽は画像だけで判定せず、要確認と明記。問題文全文画像を公開できると判断しない。"
        "出力はJSON配列のみ。各問についてnumber,status(PASS又はFIX),textIssues,choiceIssues,"
        "explanationIssues,figureIssues,lawNeedsExternalCheckを持つ。issue各フィールドは文字列配列。"
        "ミスが無い問も必ず1件出力。一般論は書かず、元画像とJSONの具体的差分を書く。"
    )
    blocks = [{"type": "text", "text": prompt}]
    for source in original:
        number = source["number"]
        candidate = next(item for item in draft if item["number"] == number)
        blocks.append({"type": "text", "text": f"問{number}。公式正答={source['officialAnswer']}。清書JSON={json.dumps(candidate, ensure_ascii=False)}"})
        blocks.append({"type": "image", "source": {"type": "base64", "media_type": "image/png",
                                                 "data": b64encode((ROOT / source["reviewCrop"]).read_bytes()).decode("ascii")}})
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
    text = re.sub(r"^```(?:json)?\s*|\s*```$", "", final.get("result", "").strip(), flags=re.I)
    start, end = text.find("["), text.rfind("]")
    if start < 0 or end < start:
        raise ValueError(f"No JSON array: {text[-500:]}")
    result = json.loads(text[start:end + 1])
    if len(result) != len(original) or {item.get("number") for item in result} != {item["number"] for item in original}:
        raise ValueError("Opus review omitted or added a question")
    output.write_text(json.dumps({"inputHashes": hashes, "reviewModel": "claude-opus-5-5",
                                  "assessment": result}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return f"{output.name}: {sum(item['status'] == 'PASS' for item in result)}/{len(result)} pass; {sum(item['status'] == 'FIX' for item in result)} fix"


def main() -> None:
    selected = sys.argv[1] if len(sys.argv) > 1 else "20240526-q01-10"
    path = BATCHES / f"{selected}.json"
    for part in (1, 2):
        print(check(path, part), flush=True)


if __name__ == "__main__":
    main()
