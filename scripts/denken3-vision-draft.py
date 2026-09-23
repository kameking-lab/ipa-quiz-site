"""Transcribe one SHA-pinned official question into a private, unreviewed draft.

Usage: py -3.12 scripts/denken3-vision-draft.py 20240818 theory 1 [2 ...]
The output is deliberately kept below the ignored raw-PDF tree. It cannot be
loaded by the site or the full-coverage acceptance gate.
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
MANIFEST = ROOT / "scripts/denken3-source-manifest.json"
REVIEW = ROOT / "data/raw_pdfs/denken3/review"
CLI = Path.home() / "AppData/Roaming/npm/claude.cmd"


def parse_json_result(stdout: str) -> dict:
    events = [json.loads(line) for line in stdout.splitlines() if line.startswith("{")]
    final = next((event for event in reversed(events) if event.get("type") == "result"), None)
    if final is None or final.get("is_error"):
        raise ValueError(f"No successful Claude result: {stdout[-1000:]}")
    value = re.sub(r"^```(?:json)?\s*|\s*```$", "", final.get("result", "").strip(), flags=re.I)
    start, end = value.find("{"), value.rfind("}")
    if start < 0 or end < start:
        raise ValueError(f"No JSON object in Claude result: {value[-1000:]}")
    return json.loads(value[start:end + 1])


def draft(date: str, subject: str, number: int) -> None:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    session = next(item for item in manifest["sessions"] if item["examDate"].replace("-", "") == date)
    paper = next(item for item in session["subjects"] if item["subject"] == subject)
    page_map = json.loads((REVIEW / date / subject / "question-page-map.json").read_text(encoding="utf-8"))
    info = page_map["questions"][str(number)]
    units = [item for item in paper["answerUnits"] if item["question"] == number]
    out = REVIEW / date / subject / f"q{number:02}-vision-draft.json"
    if out.exists():
        print(f"{date} {subject} q{number}: draft exists; skip", flush=True)
        return
    prompt = (
        "電験三種の公式問題PDFを、読みやすい問題データへ忠実に文字起こしする。添付画像は該当問の原本ページ。"
        "次問が同じページにある場合、それは含めない。問題文の極性、数値、単位、数式、(1)〜(5)の全肢を原図どおりに記録。"
        "A/B問題なら(a)と(b)を別々の解答単位とし、共通条件を両方のquestionで読めるようにする。"
        "図は文字だけで代替できないので figureDescription に図の範囲・ラベル・必要性を記す。図を捏造しない。"
        "公式正答を与えるが、解説は自分で計算・検証してから記述し、正答肢だけでなく全5肢の理由を書く。"
        "各肢理由に根拠のない推測を入れない。判読・計算・出典に不確実性があれば uncertainty に具体的に記す。"
        "政府の一次資料URLを確実に特定できない場合 officialReferenceUrls は空配列にし、架空のURLを書かない。"
        "出力はJSONオブジェクトのみ。キーは questionNumber, sharedContext, units。units は指定した公式解答単位の数と一致。"
        "各units要素は part(null または a/b), question, choices(キー1〜5), officialAnswer(文字列),"
        "explanation, choiceExplanations(キー1〜5), figureDescription, officialReferenceUrls, uncertainty。"
        "数式は可能な限りUnicodeのプレーンテキストで明瞭に書く。原図の内容と自分の推論を混同しない。"
    )
    blocks = [{"type": "text", "text": prompt + "\n公式の解答単位: " + json.dumps(units, ensure_ascii=False)}]
    for image_path in info["images"]:
        path = ROOT / image_path
        blocks.append({"type": "text", "text": f"問{number}の公式PDF p{path.stem[1:]}"})
        blocks.append({"type": "image", "source": {"type": "base64", "media_type": "image/png",
                                                   "data": b64encode(path.read_bytes()).decode("ascii")}})
    request = {"type": "user", "message": {"role": "user", "content": blocks}}
    process = subprocess.run(
        [str(CLI), "-p", "--model", "sonnet", "--effort", "medium", "--input-format", "stream-json",
         "--output-format", "stream-json", "--verbose", "--tools", ""],
        input=json.dumps(request, ensure_ascii=False) + "\n", text=True, encoding="utf-8",
        capture_output=True, cwd=ROOT, timeout=420,
    )
    if process.returncode:
        raise RuntimeError(f"Claude exit {process.returncode}: {(process.stderr or process.stdout)[-1000:]}")
    result = parse_json_result(process.stdout)
    if result.get("questionNumber") != number or len(result.get("units", [])) != len(units):
        raise ValueError(f"Vision result omitted/added answer units: {date} {subject} q{number}")
    expected = {(item["part"], item["answer"]) for item in units}
    actual = {(item.get("part"), item.get("officialAnswer")) for item in result["units"]}
    if actual != expected:
        raise ValueError(f"Vision result changed official answer: {date} {subject} q{number}: {actual} != {expected}")
    for row in result["units"]:
        if set(row.get("choices", {})) != {"1", "2", "3", "4", "5"}:
            raise ValueError(f"Vision result missing choices: {date} {subject} q{number}")
        if set(row.get("choiceExplanations", {})) != {"1", "2", "3", "4", "5"}:
            raise ValueError(f"Vision result missing reasons: {date} {subject} q{number}")
        row["needsReview"] = True
        row["sourceQuestionPdfUrl"] = paper["url"]
        row["sourceAnswerPdfUrl"] = session["officialAnswer"]["url"]
        row["reviewedFromPage"] = info["pdfPages"]
    result["draftModel"] = "claude-sonnet-4-6"
    result["sourceQuestionPdfSha256"] = paper["sha256"]
    result["sourceAnswerPdfSha256"] = session["officialAnswer"]["sha256"]
    result["sourcePageImageSha256"] = {path: sha256((ROOT / path).read_bytes()).hexdigest() for path in info["images"]}
    out.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{date} {subject} q{number}: {len(units)} private units drafted", flush=True)


def main() -> None:
    if len(sys.argv) < 4:
        raise SystemExit(__doc__)
    date, subject = sys.argv[1:3]
    numbers = [int(item) for item in sys.argv[3:]]
    with ThreadPoolExecutor(max_workers=min(3, len(numbers))) as pool:
        jobs = {pool.submit(draft, date, subject, number): number for number in numbers}
        errors = []
        for job in as_completed(jobs):
            try:
                job.result()
            except Exception as exc:
                errors.append(f"q{jobs[job]}: {exc}")
        if errors:
            raise RuntimeError("Vision draft failures: " + "; ".join(errors))


if __name__ == "__main__":
    main()
