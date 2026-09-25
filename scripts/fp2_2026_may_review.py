"""Opus review for FP2 2026-05 academic questions, keeping the raw CLI receipts.

Run: python3 scripts/fp2_2026_may_review.py 11 20
Two calls per batch, both with `--model claude-opus-5-5`:
  solve   - official answer withheld; the model answers independently.
  explain - official answer given; the model drafts explanations and flags doubt.
The CLI's JSON output is stored byte-for-byte under receipts/. A receipt only
counts when its raw modelUsage has claude-opus-5-5 served by firstParty.
"""

from __future__ import annotations

import hashlib
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / "docs" / "evidence" / "fp2-2026-may"
RECEIPTS = EVIDENCE / "receipts"
MODEL = "claude-opus-5-5"
KEYS = "アイウエ"
# Tables and diagrams shown as official images. The CLI runs without tools, so the
# reviewer gets this structured transcription (checked against the rendered image).
FIGURE_TEXT = {
    14: "〈資料〉所得税における生命保険料控除の対象となる保険料（表）\n"
        "旧制度の対象：一般の生命保険料10万円／介護医療保険料 該当なし（斜線）／個人年金保険料10万円\n"
        "新制度の対象：一般の生命保険料―／介護医療保険料―／個人年金保険料10万円",
    55: "〈親族関係図〉被相続人Ａさんと妻Ｂさんは夫婦。Ａさん夫婦の子は実子Ｃさん（相続放棄）と養子Ｄさん。"
        "実子Ｃさんには配偶者がいて、その子が孫Ｅさんと孫Ｆさん。",
    59: "表（宅地等の区分／本特例の対象となる限度面積／減額割合）\n"
        "特定事業用宅地等：（ア）／80％\n特定居住用宅地等：330㎡／（イ）\n特定同族会社事業用宅地等：（ウ）／80％",
}


def payload(question: dict, with_answer: bool) -> dict:
    row = {
        "number": question["number"],
        "question": question["stem"],
        "choices": dict(zip(KEYS, question["choices"], strict=True)),
    }
    if question["number"] in FIGURE_TEXT:
        row["figure"] = FIGURE_TEXT[question["number"]]
    if with_answer:
        row["officialAnswer"] = KEYS[question["answer"] - 1]
    return row


def solve_prompt(law_date: str, questions: list[dict]) -> str:
    return (
        "あなたはFP2級の出題を検証する専門家です。日本FP協会2級学科試験（2026年5月公表分）の問題を、"
        f"試験指定の法令基準日{law_date}現在施行の法令等に基づいて独力で解いてください。"
        "公式正答は与えていません。推測で埋めず、基準日時点の制度で判断が分かれる、または確信が持てない場合は"
        "confident=falseとし、理由をnoteに具体的に書いてください。"
        "JSON配列だけを返し、各要素はnumber, answer(ア/イ/ウ/エ), confident(boolean), note(80字以内)の4項目。\n"
        "データ:\n" + json.dumps([payload(q, False) for q in questions], ensure_ascii=False)
    )


def explain_prompt(law_date: str, questions: list[dict]) -> str:
    return (
        "あなたはFP2級の解説を監修する専門家です。日本FP協会2級学科試験（2026年5月公表分）の公式問題と公式正答について、"
        f"試験指定の法令基準日{law_date}現在施行の法令等に基づき学習者向け解説を書いてください。"
        "officialAnswerは変更しない。公式正答に疑義がある、図表・前提が不足する、基準日時点の制度が確認できない、"
        "または基準日後の改正で学習者が誤解しうる場合はneedsReview=trueとし、uncertaintyに具体的理由を書く。"
        "基準日後の改正は解説本文で『基準日時点では』と明示して補足してよい。架空の条文番号・URL・数値を書かない。"
        "計算問題は式と数値を示す。各肢は正誤と根拠を書き、正答肢には『本問の正解』と明記する。"
        "『最も不適切』を問う問題では、適切な肢は『適切な記述なので本問の正解ではありません』の趣旨を示す。"
        "JSON配列だけを返し、各要素はnumber, explanation(250字以内), choiceExplanations(ア,イ,ウ,エ 各160字以内), "
        "topicTags(2〜3語), difficulty(1〜5), isCalculation(boolean), needsReview(boolean), uncertainty(文字列、無ければ空)の8項目。\n"
        "データ:\n" + json.dumps([payload(q, True) for q in questions], ensure_ascii=False)
    )


def parse_result(text: str) -> list[dict]:
    clean = re.sub(r"^```(?:json)?\s*", "", text.strip())
    clean = re.sub(r"\s*```$", "", clean)
    start = clean.index("[")
    return json.loads(clean[start : clean.rindex("]") + 1])


def verify_receipt(raw: dict) -> dict:
    """Return the Opus usage row; raise unless the CLI really served claude-opus-5-5 first-party."""
    usage = raw.get("modelUsage", {}).get(MODEL)
    if not usage or usage.get("provider") != "firstParty" or usage.get("outputTokens", 0) <= 0:
        raise ValueError(f"Receipt lacks first-party {MODEL} usage: {list(raw.get('modelUsage', {}))}")
    if raw.get("is_error") or raw.get("subtype") != "success":
        raise ValueError(f"CLI error result: {raw.get('subtype')}")
    return usage


def run(kind: str, prompt: str, target: Path, numbers: list[int]) -> list[dict]:
    if target.exists():
        raw = json.loads(target.read_text(encoding="utf-8"))
        verify_receipt(raw)
        return parse_result(raw["result"])
    claude_bin = shutil.which("claude")
    if not claude_bin:
        raise RuntimeError("Claude CLI is unavailable")
    for attempt in range(1, 4):
        result = subprocess.run(
            [claude_bin, "-p", "--model", MODEL, "--tools", "", "--output-format", "json"],
            input=prompt, text=True, capture_output=True, encoding="utf-8", timeout=1200, cwd=ROOT,
        )
        if result.returncode:
            print(f"{kind} attempt {attempt}: CLI {result.returncode}: {result.stderr[-300:]}", flush=True)
            continue
        raw = json.loads(result.stdout)
        verify_receipt(raw)
        rows = parse_result(raw["result"])
        if [row.get("number") for row in rows] != numbers:
            print(f"{kind} attempt {attempt}: numbers {[r.get('number') for r in rows]}", flush=True)
            continue
        RECEIPTS.mkdir(parents=True, exist_ok=True)
        target.write_text(result.stdout, encoding="utf-8")
        index_path = RECEIPTS / "index.json"
        index = json.loads(index_path.read_text(encoding="utf-8")) if index_path.exists() else {}
        index[target.name] = {
            "kind": kind,
            "questions": numbers,
            "requestedModel": MODEL,
            "promptSha256": hashlib.sha256(prompt.encode("utf-8")).hexdigest(),
            "receiptSha256": hashlib.sha256(result.stdout.encode("utf-8")).hexdigest(),
        }
        index_path.write_text(json.dumps(index, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        return rows
    raise RuntimeError(f"{kind} failed for {numbers}")


def main() -> None:
    first, last = int(sys.argv[1]), int(sys.argv[2])
    extraction = json.loads((EVIDENCE / "extraction.json").read_text(encoding="utf-8"))
    law_date = extraction["lawReferenceDate"]
    questions = [q for q in extraction["questions"] if first <= q["number"] <= last]
    numbers = [q["number"] for q in questions]
    stem = f"q{first:02d}-{last:02d}"
    solved = run("solve", solve_prompt(law_date, questions), RECEIPTS / f"{stem}-solve.json", numbers)
    drafts = run("explain", explain_prompt(law_date, questions), RECEIPTS / f"{stem}-explain.json", numbers)
    for question, solve, draft in zip(questions, solved, drafts, strict=True):
        official = KEYS[question["answer"] - 1]
        flag = "OK " if solve["answer"] == official and solve["confident"] and not draft["needsReview"] else "CHK"
        print(f"{flag} Q{question['number']}: official={official} blind={solve['answer']} confident={solve['confident']} "
              f"needsReview={draft['needsReview']} {solve.get('note', '')} | {draft.get('uncertainty', '')}")


if __name__ == "__main__":
    main()
