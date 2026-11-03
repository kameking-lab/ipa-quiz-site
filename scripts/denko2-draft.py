"""Generate non-public editorial drafts from verified PDF text batches.

This never changes the quiz registry. Diagram/photo/formula rows remain review
required even if the language model emits plausible text.
"""

from concurrent.futures import ThreadPoolExecutor, as_completed
import json
from pathlib import Path
import re
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
BATCHES = ROOT / "data/raw_pdfs/denko2/review/batches"
CLI = Path.home() / "AppData/Roaming/npm/claude.cmd"
LABELS = {"イ", "ロ", "ハ", "ニ"}


def prompt_for(batch: dict) -> str:
    return (
        f"あなたは第二種電気工事士試験の専門校閲者。以下は電気技術者試験センターの公式学科試験PDFから決定的手順で抽出した{len(batch['questions'])}問です。"
        "この回答は非公開の編集下書きです。原本の設問文と選択肢イ/ロ/ハ/ニを忠実に清書し、officialAnswerを絶対に変更しないでください。"
        "PDF抽出で失われた数式、図、写真、記号、配置関係は推測で埋めず、uncertaintyに具体的な欠損とレビュー対象を書いてください。"
        "各肢について正答なら根拠、誤答ならその肢固有の理由を1〜2文で述べてください。『公式正答ではないから』だけは禁止。"
        "数値計算は式・代入・単位を確認し、根拠がない法令の条項番号や規格数値を創作しないでください。"
        "choicesRawに数式・図が欠けている場合、選択肢を作らず空文字列とuncertaintyにしてください。"
        "出力はコードフェンスなしのJSON配列のみ。各要素はnumber,question,choices（イ/ロ/ハ/ニ）,officialAnswer,explanation,"
        f"choiceExplanations（イ/ロ/ハ/ニ）,uncertaintyのキーを持つ。{len(batch['questions'])}問を漏らさない。\n\n"
        + json.dumps(batch, ensure_ascii=False)
    )


def parse_response(response: str) -> list[dict]:
    start, end = response.find("["), response.rfind("]")
    if start < 0 or end < start:
        raise ValueError("No JSON array in response")
    result = json.loads(response[start:end + 1])
    if not isinstance(result, list):
        raise ValueError("Response is not an array")
    return result


def generate(path: Path, model: str) -> tuple[str, str]:
    output = path.with_name(path.stem + "-draft.json")
    qc_path = path.with_name(path.stem + "-qc.json")
    if output.exists() and qc_path.exists():
        return path.name, "existing"
    batch = json.loads(path.read_text(encoding="utf-8"))
    result = []
    # Ten questions and 40 independent explanations can exceed a single CLI
    # response's latency budget. Save two-question checkpoints for safe resume.
    for offset in range(0, len(batch["questions"]), 2):
        part_path = path.with_name(path.stem + f"-part{offset // 2 + 1:02}.json")
        if part_path.exists():
            part = json.loads(part_path.read_text(encoding="utf-8"))
        else:
            sub_batch = {**batch, "questions": batch["questions"][offset:offset + 2]}
            process = subprocess.run(
                [str(CLI), "-p", "--model", model, "--max-turns", "1", "--tools", ""],
                input=prompt_for(sub_batch), text=True, encoding="utf-8", capture_output=True,
                cwd=ROOT, timeout=150,
            )
            if process.returncode:
                detail = (process.stderr or process.stdout)[-500:]
                raise RuntimeError(f"{path.name} part {offset // 2 + 1}: Claude exit {process.returncode}: {detail}")
            part = parse_response(process.stdout)
            expected_part = {q["number"] for q in sub_batch["questions"]}
            if len(part) != len(expected_part) or {q.get("number") for q in part} != expected_part:
                raise ValueError(f"{path.name} part {offset // 2 + 1}: question coverage differs")
            part_path.write_text(json.dumps(part, ensure_ascii=False, indent=2), encoding="utf-8")
        result.extend(part)
    expected = {item["number"]: item for item in batch["questions"]}
    if len(result) != len(expected) or {item.get("number") for item in result} != set(expected):
        raise ValueError(f"{path.name}: question coverage differs")
    issues: list[str] = []
    for item in result:
        number = item["number"]
        if item.get("officialAnswer") != expected[number]["officialAnswer"]:
            raise ValueError(f"{path.name} Q{number}: changed official answer")
        if set(item.get("choices", {})) != LABELS or set(item.get("choiceExplanations", {})) != LABELS:
            issues.append(f"Q{number}: missing choice or explanation key")
        if any(not text for text in item.get("choiceExplanations", {}).values()):
            issues.append(f"Q{number}: empty per-choice explanation")
        if expected[number]["needsVisualReview"]:
            issues.append(f"Q{number}: original image/manual review required")
        if item.get("uncertainty"):
            issues.append(f"Q{number}: {item['uncertainty']}")
        if not item.get("question") or not item.get("explanation"):
            issues.append(f"Q{number}: empty question/explanation")
        if any(not text for text in item.get("choices", {}).values()):
            issues.append(f"Q{number}: empty choice text")
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    qc_path.write_text(json.dumps({"status": "editorial_review_required", "issues": issues}, ensure_ascii=False, indent=2), encoding="utf-8")
    return path.name, f"drafted; {len(issues)} review flags"


def main() -> None:
    model = sys.argv[1] if len(sys.argv) > 1 else "sonnet"
    years = set(sys.argv[2].split(",")) if len(sys.argv) > 2 else {"2024", "2025"}
    selected = [path for path in BATCHES.glob("*-q??-??.json") if path.name[:4] in years]
    with ThreadPoolExecutor(max_workers=2) as pool:
        futures = [pool.submit(generate, path, model) for path in sorted(selected)]
        for future in as_completed(futures):
            try:
                print(*future.result(), flush=True)
            except Exception as error:
                print(f"ERROR {error}", flush=True)


if __name__ == "__main__":
    main()
