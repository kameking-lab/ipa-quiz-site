"""Blind solve, draft and review FP2 2026年5月公表 Q11-60 with an explicitly selected claude-opus-5-5.

Each stage is a separate headless `claude -p --model claude-opus-5-5 --output-format json` call. The raw
CLI result object (including the actual `modelUsage`) is saved verbatim under model-calls/. A call counts
only when `modelUsage` names claude-opus-5-5 and nothing else; the receipt builder HOLDs otherwise.

Usage: python3 scripts/fp2_2026_may/opus_review.py [--workers N] [--only 11,12]
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import tempfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
EVIDENCE = ROOT / "docs" / "evidence" / "fp2-2026-may"
CALLS = EVIDENCE / "model-calls"
MODEL = "claude-opus-5-5"
KEYS = ["ア", "イ", "ウ", "エ"]
REVIEW_ROUNDS = 3
CATEGORY = {1: "ライフプランニングと資金計画", 2: "リスク管理", 3: "金融資産運用", 4: "タックスプランニング", 5: "不動産", 6: "相続・事業承継"}


def category(number: int) -> str:
    return CATEGORY[(number - 1) // 10 + 1]


def question_text(q: dict, law_date: str) -> str:
    choices = "\n".join(f"{key}. {text}" for key, text in zip(KEYS, q["choices"]))
    return (f"【出典】日本FP協会 2級ファイナンシャル・プランニング技能検定 学科試験（2026年5月公表分）問{q['number']}\n"
            f"【分野】{category(q['number'])}\n"
            f"【前提】問題文に特に断りのない限り、{law_date}現在施行の法令等に基づいて解答する。"
            "東日本大震災の被災者等に対する各種特例等は考慮しない。\n"
            f"【問題】\n{q['stem']}\n【選択肢】（原典の1)〜4)をア〜エに置換）\n{choices}")


SOLVE = """あなたはFP技能検定2級の専門家です。次の四答択一問題を、公式正答を見ずに自力で解いてください。
各選択肢の記述が前提の基準日時点で適切か不適切かを判断し、問われている条件（最も適切／最も不適切／計算結果など）に合う選択肢を1つ選びます。

{question}

出力は次のJSONだけを ```json フェンスで1つ返してください。
{{"answer": "ア|イ|ウ|エ", "perChoice": {{"ア": {{"statementIsAppropriate": true, "reason": "..."}}, "イ": ..., "ウ": ..., "エ": ...}}, "confidence": "high|medium|low"}}
計算問題では statementIsAppropriate を「その選択肢の数値が正しい計算結果か」として扱ってください。"""

DRAFT = """あなたはFP技能検定2級の学習サイトの解説執筆者です。次の問題の公式正答は「{answer}」です（原典の正解 {official}) をア〜エに置換）。
学習者向けに、公式正答と矛盾しない、根拠のある解説を書いてください。

{question}

執筆ルール:
- 事実・金額・期間・割合は{law_date}現在施行の法令等に基づくこと。基準日後に改正された制度は、基準日時点の内容で説明し、改正があれば lawDateNote に「どの改正で何が変わるか」を記す。
- choiceExplanations は各選択肢を単独で読んでも分かる1〜3文。冒頭で正誤を明示する：
  「最も適切」を問う問題 → 正答肢「適切な記述で、本問の正解です。」、他肢「誤りです。」または「不適切です。」
  「最も不適切」を問う問題 → 正答肢「不適切な記述で、本問の正解です。」、他肢「適切な記述です。」
  計算・組合せ問題 → 正答肢「正しい計算結果で、本問の正解です。」等、他肢は何が違うかを数値で示す。
- 他の選択肢を「ア」「イ」等の記号で参照しない（出題文自体の空欄（ア）（イ）を指す場合を除く）。
- explanation は正答の根拠と押さえるべき論点を2〜4文で。計算問題は式を示す。
- 推測で断定しない。確信できない点は concerns に書く。
- officialReferenceUrls には、WebSearchで実在を確認した政府の公式ページ（*.go.jp、e-Gov法令検索 laws.e-gov.go.jp を含む）のURLだけを0〜3件。民間サイト・協会サイトは入れない。純粋な計算問題は0件でよい。

出力は次のJSONだけを ```json フェンスで1つ返してください。
{{"explanation": "...", "choiceExplanations": {{"ア": "...", "イ": "...", "ウ": "...", "エ": "..."}},
 "topicTags": ["2〜3個の短い論点名"], "isCalculation": false, "difficulty": 2,
 "officialAnswerConsistent": true, "lawDateSensitive": false, "lawDateNote": "",
 "officialReferenceUrls": ["https://..."], "concerns": []}}"""

REVIEW = """あなたはFP技能検定2級の解説を公開前に検収する厳格な査読者です。次の問題と解説案を検証してください。
公式正答は「{answer}」です。{blind_note}

{question}

【解説案】
{draft}

検証項目:
1. 各選択肢解説が{law_date}現在施行の法令等に照らして事実として正しいか。金額・期間・割合・要件の誤りや、根拠のない断定がないか。必要ならWebSearchで確認する。
2. 公式正答と整合しているか。正答肢/誤答肢の正誤表示が問われ方（最も適切・最も不適切・計算）に合っているか。
3. 基準日{law_date}で答えが一意に定まるか（lawDateClear）。基準日後の改正の説明が誤っていないか。
4. 参照URLが解説の論点に対応する政府の公式ページか。

判定:
- PASS: そのまま公開可。
- FIX: 修正すれば公開可。修正後の全文を correctedExplanation / correctedChoiceExplanations（4肢すべて）に入れる。
- HOLD: 公式正答が基準日の法令で支持できない、問題が一意に解けない、または根拠を確認できない。

出力は次のJSONだけを ```json フェンスで1つ返してください。
{{"verdict": "PASS|FIX|HOLD", "officialAnswerSupported": true, "lawDateClear": true,
 "perChoice": {{"ア": {{"ok": true, "issue": ""}}, "イ": ..., "ウ": ..., "エ": ...}}, "explanationOk": true,
 "referenceUrlsOk": true, "issues": [], "correctedExplanation": null, "correctedChoiceExplanations": null,
 "correctedOfficialReferenceUrls": null}}
FIXでは、公開される全文（explanation と4肢すべて）を修正後の形で返すこと。参照URLを差し替える場合は、WebSearchで実在を確認した政府の公式ページだけを correctedOfficialReferenceUrls に入れること。
軽微な言い回しの好みだけでFIXにしない。事実誤り・不正確な要件・根拠のない断定・誤ったURLがなければPASSとする。"""


def call(prompt: str, name: str, tools: str) -> dict:
    target = CALLS / f"{name}.json"
    if target.exists():
        cached = json.loads(target.read_text(encoding="utf-8"))
        same_request = cached.get("request", {}).get("prompt") == prompt
        if same_request and not cached.get("is_error") and parse_json(cached.get("result", "")) is not None:
            return cached
    env = {**os.environ, "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"}
    args = ["claude", "-p", prompt, "--model", MODEL, "--output-format", "json", "--tools", tools,
            "--strict-mcp-config", "--setting-sources", ""]
    if tools:
        args += ["--allowedTools", tools]
    with tempfile.TemporaryDirectory() as cwd:
        done = subprocess.run(args, capture_output=True, text=True, timeout=900, env=env, cwd=cwd)
    if done.returncode != 0:
        raise RuntimeError(f"{name}: claude exited {done.returncode}: {done.stderr[:400]}")
    raw = json.loads(done.stdout)
    record = {"request": {"model": MODEL, "tools": tools, "prompt": prompt}, **raw}
    target.write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return record


def parse_json(text: str) -> dict | None:
    match = re.search(r"```json\s*(\{.*\})\s*```", text, re.S)
    try:
        return json.loads(match.group(1)) if match else None
    except json.JSONDecodeError:
        return None


def run_question(q: dict, law_date: str) -> str:
    number = q["number"]
    answer = KEYS[q["answer"] - 1]
    text = question_text(q, law_date)
    solve = parse_json(call(SOLVE.format(question=text), f"q{number:02d}-1-solve", "")["result"])
    draft_raw = call(DRAFT.format(question=text, answer=answer, official=q["answer"], law_date=law_date),
                     f"q{number:02d}-2-draft", "WebSearch")
    draft = parse_json(draft_raw["result"])
    if not solve or not draft:
        return f"Q{number}: unparseable solve/draft"
    blind_note = ("" if solve.get("answer") == answer else
                  f"注意：独立に解いた別回答は「{solve.get('answer')}」で公式正答と異なる。どちらが基準日の法令で正しいか必ず判断すること。")
    current = {k: draft.get(k) for k in ["explanation", "choiceExplanations", "officialReferenceUrls"]}
    verdicts = []
    for round_no in range(1, REVIEW_ROUNDS + 1):
        review = parse_json(call(REVIEW.format(question=text, answer=answer, blind_note=blind_note, law_date=law_date,
                                               draft=json.dumps(current, ensure_ascii=False, indent=1)),
                                 f"q{number:02d}-3-review-r{round_no}", "WebSearch")["result"])
        if not review:
            verdicts.append("unparseable")
            break
        verdicts.append(review.get("verdict"))
        if review.get("verdict") != "FIX" or not review.get("correctedChoiceExplanations"):
            break
        current = {"explanation": review.get("correctedExplanation") or current["explanation"],
                   "choiceExplanations": review["correctedChoiceExplanations"],
                   "officialReferenceUrls": review.get("correctedOfficialReferenceUrls") or current["officialReferenceUrls"]}
    return f"Q{number}: solve={solve.get('answer')} official={answer} review={'→'.join(map(str, verdicts))}"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--workers", type=int, default=6)
    parser.add_argument("--only", default="")
    args = parser.parse_args()
    extraction = json.loads((EVIDENCE / "extraction.json").read_text(encoding="utf-8"))
    law_date = extraction["coverStatement"]["lawReferenceDate"]
    only = {int(x) for x in args.only.split(",") if x}
    questions = [q for q in extraction["questions"] if not only or q["number"] in only]
    CALLS.mkdir(parents=True, exist_ok=True)

    def safe(q: dict) -> str:
        try:
            return run_question(q, law_date)
        except Exception as error:  # keep other questions running; the receipt builder HOLDs missing calls
            return f"Q{q['number']}: ERROR {error}"

    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        for line in pool.map(safe, questions):
            print(line, flush=True)


if __name__ == "__main__":
    main()
