"""Run a separate Opus visual audit of private Denken 3 transcription drafts.

Usage: py -3.12 scripts/denken3-independent-review.py 20240818 theory 1 [2 ...]
These private assessments are not acceptance receipts and never publish data.
"""

from base64 import b64encode
from hashlib import sha256
import json
from pathlib import Path
import re
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts/denken3-source-manifest.json"
REVIEW = ROOT / "data/raw_pdfs/denken3/review"
FIGURE_SPECS = ROOT / "scripts/denken3-figure-crops.json"
CLI = Path.home() / "AppData/Roaming/npm/claude.cmd"


def review(date: str, subject: str, numbers: list[int]) -> None:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    session = next(item for item in manifest["sessions"] if item["examDate"].replace("-", "") == date)
    paper = next(item for item in session["subjects"] if item["subject"] == subject)
    folder = REVIEW / date / subject
    page_map = json.loads((folder / "question-page-map.json").read_text(encoding="utf-8"))
    drafts = {}
    draft_hashes = {}
    figure_specs = json.loads(FIGURE_SPECS.read_text(encoding="utf-8")) if FIGURE_SPECS.exists() else []
    relevant_figures = [item for item in figure_specs if item["examDate"] == date and item["subject"] == subject
                        and item["questionNumber"] in numbers]
    figure_hashes = {}
    for item in relevant_figures:
        path = folder / "figures" / f"{item['id']}.png"
        figure_hashes[item["id"]] = sha256(path.read_bytes()).hexdigest()
    for number in numbers:
        path = folder / f"q{number:02}-vision-draft.json"
        drafts[number] = json.loads(path.read_text(encoding="utf-8"))
        draft_hashes[str(number)] = sha256(path.read_bytes()).hexdigest()
    stamp = "q" + "-".join(f"{number:02}" for number in numbers)
    out = folder / f"{stamp}-opus-review.json"
    if out.exists():
        old = json.loads(out.read_text(encoding="utf-8"))
        if old.get("draftSha256") == draft_hashes and old.get("figureSha256", {}) == figure_hashes:
            print(f"{out.name}: matching review exists", flush=True)
            return
        raise FileExistsError(f"Stale independent review; archive explicitly before rerun: {out}")
    prompt = (
        "あなたは電験三種の独立品質監査者。別モデルによる清書草稿を、添付の試験センター公式PDF原図と厳密に照合する。"
        "全問・全解答単位について、問題文の極性・数字・単位・式、(1)〜(5)全肢の順序と数式、図中の接続・向き・凡例、"
        "公式正答、解説の計算と因果、正答肢と誤答肢すべての理由を独立に検算。問題画像に次の問が写っていても無視。"
        "単なる『出典不足』や文体差はFIXにしないが、本文から選択肢の図形を理解できないなら必ず figureIssues に記す。"
        "図だけの切り出し画像があれば原図と比較し、必要な図・ラベルが全て入り、本文が混入せず、文字や線が欠けていないか検査する。"
        "草稿に出典URLが空なら架空の出典を補わない。規則条文や最新法令は画像だけでは確定しないので要外部確認とする。"
        "JSON配列のみを出力。各要素は number, status(PASS/FIX), textIssues, choiceIssues, explanationIssues,"
        "figureIssues, externalSourceIssues を持ち、issuesは具体的な差分だけを文字列配列にする。"
        "問題番号ごと必ず1件、細部に問題がなければ全issues空配列でPASS。"
    )
    blocks = [{"type": "text", "text": prompt}]
    for number in numbers:
        official = [item for item in paper["answerUnits"] if item["question"] == number]
        blocks.append({"type": "text", "text": f"問{number}の公式正答: {json.dumps(official, ensure_ascii=False)}\n別モデル草稿: {json.dumps(drafts[number], ensure_ascii=False)}"})
        for image_path in page_map["questions"][str(number)]["images"]:
            path = ROOT / image_path
            blocks.append({"type": "text", "text": f"問{number} 公式PDF p{path.stem[1:]}"})
            blocks.append({"type": "image", "source": {"type": "base64", "media_type": "image/png",
                                                       "data": b64encode(path.read_bytes()).decode("ascii")}})
        for item in relevant_figures:
            if item["questionNumber"] != number:
                continue
            path = folder / "figures" / f"{item['id']}.png"
            blocks.append({"type": "text", "text": f"問{number}の公開候補の図だけの切り出し {item['id']}。公式原図との一致、ラベル欠落、本文混入を検査する。"})
            blocks.append({"type": "image", "source": {"type": "base64", "media_type": "image/png",
                                                       "data": b64encode(path.read_bytes()).decode("ascii")}})
    request = {"type": "user", "message": {"role": "user", "content": blocks}}
    process = subprocess.run(
        [str(CLI), "-p", "--model", "opus", "--effort", "medium", "--input-format", "stream-json",
         "--output-format", "stream-json", "--verbose", "--tools", ""],
        input=json.dumps(request, ensure_ascii=False) + "\n", text=True, encoding="utf-8",
        capture_output=True, cwd=ROOT, timeout=600,
    )
    if process.returncode:
        raise RuntimeError(f"Claude exit {process.returncode}: {(process.stderr or process.stdout)[-1000:]}")
    events = [json.loads(line) for line in process.stdout.splitlines() if line.startswith("{")]
    final = next((event for event in reversed(events) if event.get("type") == "result"), None)
    if final is None or final.get("is_error"):
        raise ValueError(f"No successful Claude result: {process.stdout[-1000:]}")
    value = re.sub(r"^```(?:json)?\s*|\s*```$", "", final.get("result", "").strip(), flags=re.I)
    start, end = value.find("["), value.rfind("]")
    if start < 0 or end < start:
        raise ValueError(f"No JSON array: {value[-1000:]}")
    assessment = json.loads(value[start:end + 1])
    if len(assessment) != len(numbers) or {item.get("number") for item in assessment} != set(numbers):
        raise ValueError("Opus omitted or added a question")
    out.write_text(json.dumps({"reviewModel": "claude-opus-5-5", "draftSha256": draft_hashes,
                               "figureSha256": figure_hashes,
                               "sourceQuestionPdfSha256": paper["sha256"],
                               "sourceAnswerPdfSha256": session["officialAnswer"]["sha256"],
                               "assessment": assessment}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    passed = sum(item["status"] == "PASS" for item in assessment)
    print(f"{out.name}: PASS {passed}/{len(numbers)}, FIX {len(numbers)-passed}", flush=True)


def main() -> None:
    if len(sys.argv) < 4:
        raise SystemExit(__doc__)
    date, subject = sys.argv[1:3]
    numbers = [int(value) for value in sys.argv[3:]]
    review(date, subject, numbers)


if __name__ == "__main__":
    main()
