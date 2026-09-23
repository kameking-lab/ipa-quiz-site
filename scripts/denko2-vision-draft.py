"""Create non-public draft transcriptions/explanations from official row images.

Claude Code's subscribed CLI accepts image blocks through stream-json input.
These drafts are never imported into the public quiz without separate review.
"""

from base64 import b64encode
from concurrent.futures import ThreadPoolExecutor, as_completed
from hashlib import sha256
import json
from pathlib import Path
import re
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
BATCHES = ROOT / "data/raw_pdfs/denko2/review/batches"
CLI = Path.home() / "AppData/Roaming/npm/claude.cmd"
LABELS = {"イ", "ロ", "ハ", "ニ"}
CHUNK_SIZE = 5
BEFORE_FIX = ROOT / "data/raw_pdfs/denko2/review/crop-sha-before-page-bottom-fix.json"


def crop_hashes(questions: list[dict]) -> dict[str, str]:
    return {str(item["number"]): sha256((ROOT / item["reviewCrop"]).read_bytes()).hexdigest()
            for item in questions}


def archive_stale(path: Path) -> None:
    if not path.exists():
        return
    archive = path.with_name(path.stem + "-old-crop" + path.suffix)
    if archive.exists():
        raise FileExistsError(f"Stale archive already exists: {archive}")
    path.rename(archive)


def prompt_blocks(batch: dict) -> list[dict]:
    questions = batch["questions"]
    blocks: list[dict] = [{
        "type": "text",
        "text": (
            "あなたは第二種電気工事士試験の専門校閲者。続く画像は電気技術者試験センターの公式試験問題から設問行を切り出したもの。"
            "文字抽出ではなく画像そのものを原本として読み、各問題文・イ/ロ/ハ/ニの4肢を正確に清書してください。"
            "図・写真・回路・数式は画像から読み取れる範囲を説明し、判読不能なら推測せずuncertaintyに書いてください。"
            "各肢の解説はその肢固有の理由を述べ、公式正答だけを理由にしないでください。数値計算は式と単位を示してください。"
            "誤答値の由来を無理に推測・捏造しないでください。計算と照らしてなぜ一致しないかを具体的に示し、"
            "明確に一致する典型的な取り違えがある場合だけ一例として挙げてください。"
            "法令・規格の根拠を確認できない場合、具体的条項・数値を創作せずuncertaintyに書いてください。"
            "画像と根拠に不確実な点がなければuncertaintyは空文字列にし、出題者の意図に関する一般的な但し書きは書かないでください。"
            "返答はJSON配列のみ。各要素はnumber,question,choices(イ/ロ/ハ/ニ),officialAnswer,explanation,"
            "choiceExplanations(イ/ロ/ハ/ニ),diagramDescription,uncertaintyを持つ。"
            f"画像は{len(questions)}問。番号・公式正答を変更しない。"
        ),
    }]
    for item in questions:
        path = ROOT / item["reviewCrop"]
        blocks.append({"type": "text", "text": f"問{item['number']}。公式正答：{item['officialAnswer']}。次の画像が原本です。"})
        blocks.append({
            "type": "image",
            "source": {
                "type": "base64", "media_type": "image/png",
                "data": b64encode(path.read_bytes()).decode("ascii"),
            },
        })
    return blocks


def run_cli(batch: dict, model: str) -> str:
    payload = {"type": "user", "message": {"role": "user", "content": prompt_blocks(batch)}}
    process = subprocess.run(
        [str(CLI), "-p", "--model", model, "--effort", "low", "--input-format", "stream-json",
         "--output-format", "stream-json", "--verbose", "--tools", ""],
        input=json.dumps(payload, ensure_ascii=False) + "\n", text=True,
        encoding="utf-8", capture_output=True, cwd=ROOT, timeout=240,
    )
    if process.returncode:
        raise RuntimeError(f"Claude exit {process.returncode}: {(process.stderr or process.stdout)[-500:]}")
    results = [json.loads(line) for line in process.stdout.splitlines() if line.startswith("{")]
    final = next((event for event in reversed(results) if event.get("type") == "result"), None)
    if final is None or final.get("is_error"):
        raise ValueError(f"Claude result missing/error: {process.stdout[-500:]}")
    return final.get("result", "")


def parse_array(response: str) -> list[dict]:
    text = re.sub(r"^```(?:json)?\s*|\s*```$", "", response.strip(), flags=re.I)
    start, end = text.find("["), text.rfind("]")
    if start < 0 or end < start:
        raise ValueError("No JSON array in vision result")
    value = json.loads(text[start:end + 1])
    if not isinstance(value, list):
        raise ValueError("Vision result is not an array")
    return value


def draft_chunk(batch_path: Path, questions: list[dict], part: int, model: str) -> tuple[str, str]:
    output = batch_path.with_name(batch_path.stem + f"-vision-part{part:02}.json")
    qc_path = output.with_name(output.stem + "-qc.json")
    hashes = crop_hashes(questions)
    if output.exists():
        qc = json.loads(qc_path.read_text(encoding="utf-8")) if qc_path.exists() else {}
        if qc.get("sourceCropSha256") == hashes:
            return output.name, "existing, source hashes match"
        if "sourceCropSha256" not in qc and BEFORE_FIX.exists():
            old = json.loads(BEFORE_FIX.read_text(encoding="utf-8"))
            if all(old.get(str(Path(item["reviewCrop"]).relative_to("data/raw_pdfs/denko2/review"))) == hashes[str(item["number"])]
                   for item in questions):
                qc["sourceCropSha256"] = hashes
                qc_path.write_text(json.dumps(qc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
                return output.name, "existing, verified unchanged since draft"
        archive_stale(output)
        archive_stale(qc_path)
    parent = json.loads(batch_path.read_text(encoding="utf-8"))
    batch = {**parent, "questions": questions}
    result = parse_array(run_cli(batch, model))
    expected = {item["number"]: item for item in questions}
    if len(result) != len(expected) or {item.get("number") for item in result} != set(expected):
        raise ValueError(f"{output.name}: question coverage differs")
    issues: list[str] = []
    for item in result:
        original = expected[item["number"]]
        if item.get("officialAnswer") != original["officialAnswer"]:
            raise ValueError(f"{output.name} Q{item['number']}: official answer changed")
        if set(item.get("choices", {})) != LABELS or set(item.get("choiceExplanations", {})) != LABELS:
            issues.append(f"Q{item['number']}: missing choice/explanation key")
        if not item.get("question") or not item.get("explanation"):
            issues.append(f"Q{item['number']}: empty question/explanation")
        if any(not value for value in item.get("choices", {}).values()):
            issues.append(f"Q{item['number']}: empty choice text")
        if any(not value for value in item.get("choiceExplanations", {}).values()):
            issues.append(f"Q{item['number']}: empty choice explanation")
        if item.get("uncertainty"):
            issues.append(f"Q{item['number']}: {item['uncertainty']}")
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    qc_path.write_text(
        json.dumps({"status": "original_review_required", "model": model, "issues": issues,
                    "sourceCropSha256": hashes}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    return output.name, f"drafted {len(result)} questions; {len(issues)} flags"


def main() -> None:
    model = sys.argv[1] if len(sys.argv) > 1 else "sonnet"
    years = set(sys.argv[2].split(",")) if len(sys.argv) > 2 else {"2024", "2025"}
    selected = sorted(path for path in BATCHES.glob("*-q??-??.json") if path.name[:4] in years)
    jobs = []
    for path in selected:
        questions = json.loads(path.read_text(encoding="utf-8"))["questions"]
        jobs.extend((path, questions[offset:offset + CHUNK_SIZE], offset // CHUNK_SIZE + 1, model)
                    for offset in range(0, len(questions), CHUNK_SIZE))
    with ThreadPoolExecutor(max_workers=2) as pool:
        futures = [pool.submit(draft_chunk, *job) for job in jobs]
        for future in as_completed(futures):
            try:
                print(*future.result(), flush=True)
            except Exception as error:
                print(f"ERROR {error}", flush=True)


if __name__ == "__main__":
    main()
