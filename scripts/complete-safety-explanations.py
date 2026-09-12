"""Resumeable, source-grounded explanation drafting through the user's Claude subscription.

Only explanation strings are merged. Question text and official answer keys are never edited.
Each batch keeps its input, full response and accepted output for editorial review.
"""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import concurrent.futures

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/exam-library"
LOG = ROOT / "logs/safety-explanations-complete"


def read(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def write(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def fingerprint(q):
    # Only literally identical extracted text + grading may share an explanation.
    return (q["text"], q["answerAuthority"], q["correctChoice"])


def parse_answer(content, expected_ids):
    """Accept a complete JSON object even if the CLI prepends a status sentence."""
    decoder = json.JSONDecoder()
    for start, character in enumerate(content):
        if character != "{":
            continue
        try:
            result, _ = decoder.raw_decode(content[start:])
        except json.JSONDecodeError:
            continue
        if isinstance(result, dict) and set(result) == expected_ids:
            return result
    raise ValueError("No complete answer object matching the requested IDs")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--batch-size", type=int, default=12)
    parser.add_argument("--max-batches", type=int, default=100)
    parser.add_argument("--model", default="opus")
    parser.add_argument("--workers", type=int, default=3)
    parser.add_argument("--skip-first", type=int, default=0)
    parser.add_argument("--draft-only", action="store_true")
    args = parser.parse_args()
    LOG.mkdir(parents=True, exist_ok=True)
    catalog = {p["id"]: p for p in read(DATA / "official-catalog.json")}
    questions = []
    for path in sorted((DATA / "papers").glob("*.json")):
        paper = catalog[path.stem]
        questions.extend(dict(q, subject=paper["subject"], date=paper["date"], pdfUrl=paper["pdfUrl"]) for q in read(path))
    explanations = read(DATA / "explanations.json")
    question_map = {q["id"]: q for q in questions}
    for accepted_file in LOG.glob("*.accepted.json"):
        source = {q["id"]: q for q in read(accepted_file.with_name(accepted_file.name.replace(".accepted.json", ".input.json")))}
        for qid, explanation in read(accepted_file).items():
            if qid not in question_map or qid not in source or fingerprint(question_map[qid]) != fingerprint(source[qid]):
                raise SystemExit(f"Stale accepted draft: {qid}")
            explanations[qid] = explanation
    legacy_root = ROOT.parent / "safe-ai-site/web/src/data/exam-library"
    legacy = read(legacy_root / "explanations.json")
    legacy_questions = {q["id"]: q for p in (legacy_root / "papers").glob("*.json") for q in read(p)}
    reused = []
    for q in questions:
        prior = legacy_questions.get(q["id"])
        if q["id"] not in explanations and q["id"] in legacy and prior and fingerprint(q) == fingerprint(prior):
            explanations[q["id"]] = legacy[q["id"]]
            reused.append(q["id"])
    write(LOG / "reused-verified-identical.json", reused)
    by_fingerprint = {fingerprint(q): explanations[q["id"]] for q in questions if q["id"] in explanations}
    for q in questions:
        if fingerprint(q) in by_fingerprint:
            explanations.setdefault(q["id"], by_fingerprint[fingerprint(q)])
    if not args.draft_only:
        write(DATA / "explanations.json", explanations)
    missing = []
    seen = set()
    reservation_file = LOG / "reserved-authoring.json"
    reserved = {qid for ids in read(reservation_file).values() for qid in ids} if reservation_file.exists() else set()
    for q in questions:
        if q["id"] not in explanations and fingerprint(q) not in seen and q["id"] not in reserved:
            missing.append(q)
            seen.add(fingerprint(q))
    print(json.dumps({"existing": len(explanations), "reused": len(reused), "uniqueMissing": len(missing)}), flush=True)
    batches = []
    cursor = args.skip_first
    while cursor < len(missing) and len(batches) < args.max_batches:
        # A descriptive question may contain many independent subproblems; do
        # not treat it as the same token workload as one multiple-choice item.
        descriptive = missing[cursor]["answerAuthority"] == "descriptive"
        limit = min(4, args.batch_size) if descriptive else args.batch_size
        end = cursor
        while end < len(missing) and end - cursor < limit and (missing[end]["answerAuthority"] == "descriptive") == descriptive:
            end += 1
        batches.append((cursor, missing[cursor:end]))
        cursor = end

    def generate(item):
        start, batch = item
        token = hashlib.sha256("|".join(q["id"] for q in batch).encode()).hexdigest()[:12]
        prefix = LOG / token
        write(prefix.with_suffix(".input.json"), batch)
        prompt = f"""あなたは日本の労働安全衛生試験教材の執筆者です。添付 JSON の全 {len(batch)} 問について、問題固有の日本語解説を作成してください。
原文・公式正答は入力が正本です。予測問題や既存の類題と取り違えないこと。
必須品質:
- 1問につき原則250〜650字。記述の複数小問は必要なだけ長くし、各小問の解き方・必要な計算式・根拠を記す。
- official の問題は correctChoice の選択肢がなぜ設問条件を満たすかを具体的に説明。『誤っている』設問では誤記を正しい内容に訂正する。主な他の選択肢との違いも説明する。
- unconfirmed は公式正答がないため『公式正答』と決して呼ばず、自力で解いて『解答の考え方』として根拠・計算過程・結論を示す。採点キーを作らない。
- descriptive は具体的な参考解答と小問ごとの論点・計算過程。汎用的な勉強法や問題の言い換えでは不可。
- 問題固有の数値・単位・対象物名を使う。『準備中』『今後追加』『資料を確認してください』だけで逃げない。
- 法令の細かい数値や条文・医学・安全の不確かな点は一次資料で調査する。参考に使える local 公式 e-Gov スナップショット: ../safe-ai-site/web/src/data/laws-fulltext/*.json。ネットは mhlw.go.jp / laws.e-gov.go.jp / jniosh.johas.go.jp / exam.or.jp など一次資料のみ。出題当時の条件と現在の改正を混同しない。
- 図や表が必要なら images の先頭 / を public/ に置き換えたローカル画像を Read で見てから計算・解説する。数式抽出が崩れている場合も原図を読む。問題PDFの再ダウンロードは不要。ローカル原図を優先し、全文PDFを再度レンダリングして時間を使わない。
- 調査は解答を左右する不確かな論点に絞る。既に裏付けを得た事項を再検索し続けない。法令のファイルはまずGrep/Globで必要条文を特定し、巨大な全文を無差別に読み込まない。
- 確認していない資料を確認済みと称したり、架空の出典URLを作らない。
- 返答は純粋な JSON オブジェクト {{\"question-id\": \"解説文字列\"}} のみ。全件のidを正確に保持。必要なら解説末尾に実際に確認した一次資料のURLを付ける。コードフェンス不要。
- ファイル編集・コミット・投稿はしない。この生成結果は別工程で検証する。
入力:
{json.dumps(batch, ensure_ascii=False)}
"""
        prefix.with_suffix(".prompt.txt").write_text(prompt, encoding="utf-8")
        print(f"Generating {start + 1}-{start + len(batch)} / {len(missing)} ({token})", flush=True)
        env = dict(os.environ, CLAUDE_CODE_MAX_OUTPUT_TOKENS="64000")
        # Invoke the native CLI directly so a timeout stops the actual worker,
        # not merely a cmd wrapper with a still-running grandchild.
        native_cli = Path(os.environ["APPDATA"]) / "npm/node_modules/@anthropic-ai/claude-code/bin/claude.exe"
        command = [str(native_cli), "-p", "--model", args.model, "--effort", "high",
                   "--output-format", "stream-json", "--verbose", "--allowedTools", "Read,Glob,Grep,WebSearch,WebFetch",
                   "--tools", "Read,Glob,Grep,WebSearch,WebFetch"]
        try:
            with prefix.with_suffix(".raw.jsonl").open("w", encoding="utf-8") as output, prefix.with_suffix(".stderr.txt").open("w", encoding="utf-8") as errors:
                run = subprocess.run(command, input=prompt, text=True, encoding="utf-8", errors="replace",
                                     cwd=ROOT, stdout=output, stderr=errors, timeout=1800, env=env)
        except subprocess.TimeoutExpired as exc:
            prefix.with_suffix(".error.txt").write_text(str(exc), encoding="utf-8")
            raise SystemExit("Batch timed out; no unvalidated content merged")
        raw = prefix.with_suffix(".raw.jsonl").read_text(encoding="utf-8")
        if run.returncode or re.search(r"You've hit your limit|usage limit|rate limit exceeded", raw, re.I):
            raise SystemExit(f"Claude unavailable: batch {token}; see log (no paid fallback)")
        responses = [json.loads(line) for line in raw.splitlines() if line.strip()]
        response = next(row for row in reversed(responses) if row.get("type") == "result")
        content = response.get("result", "")
        content = re.sub(r"^```(?:json)?\s*|\s*```$", "", content.strip())
        result = parse_answer(content, {q["id"] for q in batch})
        if set(result) != {q["id"] for q in batch}:
            raise SystemExit(f"Incomplete IDs: {token}")
        for q in batch:
            explanation = result[q["id"]]
            if not isinstance(explanation, str) or len(explanation) < 120 or re.search(r"準備中|今後追加|解説を作成できません", explanation):
                raise SystemExit(f"Placeholder/short content: {q['id']}")
        write(prefix.with_suffix(".accepted.json"), result)
        return batch, result

    # Workers only write uniquely named draft files. This thread alone merges the
    # publication JSON; at most three subscription requests are active at once.
    pool = concurrent.futures.ThreadPoolExecutor(max_workers=max(1, min(3, args.workers)))
    jobs = iter(batches)
    pending = {pool.submit(generate, item) for item in [next(jobs, None) for _ in range(args.workers)] if item}
    try:
        while pending:
            done, pending = concurrent.futures.wait(pending, return_when=concurrent.futures.FIRST_COMPLETED)
            for future in done:
                batch, result = future.result()
                explanations.update(result)
                by_fingerprint.update({fingerprint(q): result[q["id"]] for q in batch})
                for q in questions:
                    if fingerprint(q) in by_fingerprint:
                        explanations.setdefault(q["id"], by_fingerprint[fingerprint(q)])
                if not args.draft_only:
                    write(DATA / "explanations.json", explanations)
                print(f"Coverage {len(explanations)}/{len(questions)}", flush=True)
                item = next(jobs, None)
                if item:
                    pending.add(pool.submit(generate, item))
    finally:
        pool.shutdown(wait=True, cancel_futures=True)


if __name__ == "__main__":
    main()
