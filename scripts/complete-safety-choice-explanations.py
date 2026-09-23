"""Resumable 2025/2026 lckohyo five-choice candidate authoring.

This command never publishes generated candidates. Each question and all five
choices require a current full-review receipt before separate promotion.
"""

import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
from hashlib import sha256
import json
import os
from pathlib import Path
import re
import subprocess
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/exam-library"
LOG = ROOT / ".cache/safety-choice-lckohyo"
EVIDENCE = ROOT / "docs/evidence/lckohyo-choice-batches"
OUTPUT = DATA / "choice-explanations.json"
CONTRACT = DATA / "coverage-contract.json"
FORBIDDEN = re.compile(r"準備中|今後追加|解説を作成できません|https?://|\[[^]]+\]\([^)]+\)|<a\b", re.I)
GOVERNMENT_ROOTS = (
    "e-gov.go.jp", "mhlw.go.jp", "mext.go.jp", "mlit.go.jp", "meti.go.jp",
    "maff.go.jp", "env.go.jp", "cao.go.jp", "nra.go.jp", "jma.go.jp",
    "jisc.go.jp", "fdma.go.jp", "npa.go.jp", "stat.go.jp",
)
def read(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def write(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def fingerprint(question):
    """Reuse requires exact original text, official answer and choice contract."""
    return (question["text"], question["answerAuthority"], question["correctChoice"], question["choiceCount"])


def government_url(url):
    if not isinstance(url, str) or url != url.strip():
        return False
    try:
        parsed = urlparse(url)
        return (parsed.scheme == "https" and parsed.hostname is not None
                and any(parsed.hostname == root or parsed.hostname.endswith("." + root)
                        for root in GOVERNMENT_ROOTS) and not parsed.username
                and not parsed.password and parsed.port is None)
    except ValueError:
        return False


def validate_overlay(question, overlay):
    issues = []
    qid = question["id"]
    digest = sha256(question["text"].encode("utf-8")).hexdigest()
    if question["answerAuthority"] != "official" or question["choiceCount"] != 5:
        issues.append("not an official five-choice question")
    if not isinstance(overlay, dict):
        return [f"{qid}: overlay is not an object"]
    if overlay.get("sourceHash") != digest:
        issues.append("stale source hash")
    if overlay.get("correctChoice") != question["correctChoice"]:
        issues.append("answer mismatch")
    summary = overlay.get("summary")
    if not isinstance(summary, str) or len(summary.strip()) < 20 or FORBIDDEN.search(summary):
        issues.append("short, placeholder or linked summary")
    choices = overlay.get("choices")
    if not isinstance(choices, list) or len(choices) != 5:
        issues.append("not five choices")
    else:
        if {item.get("number") for item in choices if isinstance(item, dict)} != set(range(1, 6)):
            issues.append("choice numbers incomplete")
        reasons = []
        for item in choices:
            if not isinstance(item, dict):
                issues.append("invalid choice row")
                continue
            number, reason = item.get("number"), item.get("reason")
            if item.get("verdict") != ("correct" if number == question["correctChoice"] else "incorrect"):
                issues.append(f"choice {number} verdict mismatch")
            if not isinstance(reason, str) or len(reason.strip()) < 40 or FORBIDDEN.search(reason):
                issues.append(f"choice {number} short, placeholder or linked reason")
            else:
                reasons.append(reason.strip())
        if len(set(reasons)) != 5:
            issues.append("duplicate choice reasons")
    sources = overlay.get("sources")
    if not isinstance(sources, list) or not sources:
        issues.append("missing government sources")
    else:
        urls = []
        for source in sources:
            if (not isinstance(source, dict) or not isinstance(source.get("title"), str)
                    or not source["title"].strip() or not government_url(source.get("url"))):
                issues.append("non-government or invalid source")
            else:
                urls.append(source["url"])
        if len(set(urls)) != len(urls):
            issues.append("duplicate sources")
    return [f"{qid}: {issue}" for issue in issues]


def extract_json(content, expected_ids=None):
    decoder = json.JSONDecoder()
    for start, character in enumerate(content):
        if character != "{":
            continue
        try:
            result, _ = decoder.raw_decode(content[start:])
        except json.JSONDecodeError:
            continue
        if isinstance(result, dict) and (expected_ids is None or set(result) == expected_ids):
            return result
    raise ValueError("No complete JSON object matching the requested IDs")


def call_claude(prompt, prefix, model, return_model=False):
    cli = Path(os.environ["APPDATA"]) / "npm/node_modules/@anthropic-ai/claude-code/bin/claude.exe"
    if not cli.exists():
        raise RuntimeError(f"Claude CLI missing: {cli}")
    prefix.parent.mkdir(parents=True, exist_ok=True)
    prefix.with_suffix(".prompt.txt").write_text(prompt, encoding="utf-8")
    env = dict(os.environ, CLAUDE_CODE_MAX_OUTPUT_TOKENS="64000")
    command = [str(cli), "-p", "--model", model, "--effort", "high", "--output-format", "stream-json",
               "--verbose", "--allowedTools", "Read,Glob,Grep,WebSearch,WebFetch",
               "--tools", "Read,Glob,Grep,WebSearch,WebFetch"]
    with prefix.with_suffix(".raw.jsonl").open("w", encoding="utf-8") as output, prefix.with_suffix(".stderr.txt").open("w", encoding="utf-8") as errors:
        run = subprocess.run(command, input=prompt, text=True, encoding="utf-8", errors="replace",
                             cwd=ROOT, stdout=output, stderr=errors, timeout=1800, env=env)
    raw = prefix.with_suffix(".raw.jsonl").read_text(encoding="utf-8")
    if run.returncode or re.search(r"You've hit your limit|usage limit|rate limit exceeded", raw, re.I):
        raise RuntimeError(f"Claude unavailable; no paid fallback: {prefix}")
    responses = [json.loads(line) for line in raw.splitlines() if line.strip()]
    result_row = next(row for row in reversed(responses) if row.get("type") == "result")
    if result_row.get("subtype") != "success":
        raise RuntimeError(f"Claude did not complete successfully: {prefix}")
    content = result_row.get("result", "")
    result = extract_json(content)
    model_ids = {row.get("message", {}).get("model") for row in responses
                 if row.get("type") == "assistant" and isinstance(row.get("message"), dict)}
    model_ids.discard(None)
    if model_ids != {model}:
        raise RuntimeError(f"Unexpected Claude model ID {model_ids}; expected {model}")
    return (result, model) if return_model else result


def source_hints(batch):
    subjects = {question["subject"] for question in batch}
    if len(subjects) != 1:
        raise ValueError("A batch must stay within one qualification subject")
    subject = next(iter(subjects))
    path = DATA / "source-packs" / f"lckohyo-subject-{sha256(subject.encode()).hexdigest()[:12]}.json"
    if not path.exists():
        return []
    pack = read(path)
    if pack["subject"] != subject:
        raise ValueError(f"Source pack subject mismatch: {path}")
    return [{"title": item["title"], "url": item["url"], "locators": item["locators"],
             "retrievalSha256": item["retrieval"]["sha256"]} for item in pack["sources"][:24]]


def batch_prompt(batch):
    hints = source_hints(batch)
    return f"""あなたは日本の免許試験教材の執筆者です。次の{len(batch)}問についてJSONだけを返してください。既存のplainExplanationは草稿であり、正誤の正本はquestion.textとcorrectChoiceおよび公式PDFの○印です。
各問は {{"question-id": {{"correctChoice": 数値, "summary": 20字以上, "choices": [{{"number":1,"verdict":"correctまたはincorrect","reason":"各肢固有の40字以上の理由"}}を1～5], "sources":[{{"title":"政府資料の正確なタイトル","url":"https://...go.jp/..."}}]}} }} の形。sourceHashは付けず、採用時に原文から機械計算します。
verdictは『その肢を解答として選ぶと正解か』であり、『誤っているもの』を選ぶ設問の正答肢もcorrectです。残り4肢それぞれについて、なぜ選ばないかをその肢の語句・数値・条件に即して説明します。丸写し、理由の使い回し、未確認条文、架空URL、一般論は不可。
根拠URLはe-Gov、厚生労働省等の日本政府のHTTPS *.go.jpに限定。協会PDFは設問と正答の確認用でありsourcesに入れません。法令は出題時点と現行を混同せず、条・項・号を一次資料で確認してください。図表参照の問題では添付されたimagesや公式PDF原図を確認してください。全件のIDを返し、不確かな事項は最後に別文でなく該当reasonに慎重な確定事実だけを書いてください。確認できない問があれば空欄で量産せずJSONの外で理由を報告してください。ファイル編集・投稿・コミットは禁止。
同一資格の既検証source-pack候補（取得ハッシュは同一資料を探すためのもので、この問題への適用を保証しない）。該当条文・頁・出題時点が一致するものだけを使い、足りなければ政府一次資料を新規探索すること。JIS固有の数値を法令だけで代用しない: {json.dumps(hints, ensure_ascii=False)}
入力JSON: {json.dumps(batch, ensure_ascii=False)}
"""


def review_prompt(sample, overlay):
    return f"""独立の厳格レビュー。次の1問の公式PDFにある○正答、原文の各選択肢、5つの個別解説、sourcesの実在と条文該当箇所をe-Gov/厚労省等の一次資料で直接照合してください。作者の確認済みという主張は信用しないでください。出題当時の規定と現行法を区別してください。ファイル編集は禁止です。
返答は JSONのみ: {{"status":"PASSまたはFIX","issues":[],"evidenceUrls":["実際に確認したgo.jp URL"]}}。未確認が1点でもあればFIX、issuesに選択肢番号と具体的な訂正を記す。汎用の採点コメントは不要。
問題と既存草稿: {json.dumps(sample, ensure_ascii=False)}
候補解説: {json.dumps(overlay, ensure_ascii=False)}
"""


def author_candidate(item, model):
    batch, token = item
    prefix = LOG / token
    write(prefix.with_suffix(".input.json"), batch)
    expected = {q["id"] for q in batch}
    candidate_file = prefix.with_suffix(".candidate.json")
    if candidate_file.exists():
        candidate = read(candidate_file)
    else:
        raw = call_claude(batch_prompt(batch), prefix.with_name(token + "-author"), model)
        if set(raw) != expected:
            raise ValueError(f"{token}: incomplete IDs")
        candidate = {}
        for q in batch:
            overlay = raw[q["id"]]
            if isinstance(overlay, dict):
                overlay["sourceHash"] = sha256(q["text"].encode("utf-8")).hexdigest()
            candidate[q["id"]] = overlay
        write(candidate_file, candidate)
    if set(candidate) != expected:
        raise ValueError(f"{token}: candidate IDs do not match the input")
    for q in batch:
        overlay = candidate[q["id"]]
        issues = validate_overlay(q, overlay)
        if issues:
            raise ValueError("; ".join(issues))
    return batch, candidate, token


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--generate", action="store_true", help="Run Claude authoring; default is read-only coverage")
    parser.add_argument("--batch-size", type=int, default=6)
    parser.add_argument("--max-batches", type=int, default=1)
    parser.add_argument("--skip-first", type=int, default=0, help="Skip this many unique missing questions after a held batch")
    parser.add_argument("--retry-holds", action="store_true", help="Explicitly retry batches previously held for source/quality issues")
    parser.add_argument("--workers", type=int, default=3)
    parser.add_argument("--model", default="claude-opus-5-5")
    parser.add_argument("--paper-id", help="Author one complete paper at a time; global coverage still audited")
    args = parser.parse_args()
    if not 5 <= args.batch_size <= 8 or not 1 <= args.workers <= 3 or args.max_batches < 0 or args.skip_first < 0:
        parser.error("batch-size must be 5..8, workers 1..3, max-batches nonnegative")
    LOG.mkdir(parents=True, exist_ok=True)
    contract = read(CONTRACT)
    target_ids = contract["structuredChoiceExplanations"]["targetPaperIds"]
    target_counts = contract["structuredChoiceExplanations"]["targetOfficialFiveChoiceByYear"]
    if len(target_ids) != len(set(target_ids)):
        raise SystemExit("Duplicate paper in target coverage contract")
    catalog = {paper["id"]: paper for paper in read(DATA / "official-catalog.json")}
    question_map = {}
    paper_counts = {"2025": 0, "2026": 0}
    for paper_id in target_ids:
        path = DATA / "papers" / f"{paper_id}.json"
        if not path.exists() or paper_id not in catalog:
            raise SystemExit(f"Missing target paper: {paper_id}")
        year = paper_id.split("LC", 1)[1][:4]
        if year not in paper_counts:
            raise SystemExit(f"Unexpected target year: {paper_id}")
        paper = catalog[paper_id]
        for q in read(path):
            if q["answerAuthority"] == "official" and q["choiceCount"] == 5:
                question_map[q["id"]] = dict(q, subject=paper["subject"], pdfUrl=paper["pdfUrl"])
                paper_counts[year] += 1
    if paper_counts != target_counts:
        raise SystemExit(f"Target paper counts drifted: {paper_counts} != {target_counts}")
    if args.paper_id and not any(qid.startswith(args.paper_id + "-q") for qid in question_map):
        parser.error("paper-id must name a 2025/2026 lckohyo paper")
    narratives = read(DATA / "explanations.json")
    overlays = read(OUTPUT)
    for qid, q in question_map.items():
        if qid in overlays:
            issues = validate_overlay(q, overlays[qid])
            if issues:
                raise SystemExit("; ".join(issues))
    selected_ids = [qid for qid in question_map if not args.paper_id or qid.startswith(args.paper_id + "-q")]
    missing = []
    for qid, q in question_map.items():
        if args.paper_id and not qid.startswith(args.paper_id + "-q"):
            continue
        if qid not in overlays:
            missing.append(dict(q, plainExplanation=narratives[qid]))
    structured_count = sum(qid in overlays for qid in question_map)
    selected_structured = sum(qid in overlays for qid in selected_ids)
    print(json.dumps({"officialChoiceQuestions": len(question_map), "structured": structured_count,
                      "selectedQuestions": len(selected_ids),
                      "selectedStructured": selected_structured,
                      "uniqueMissing": len(missing), "paperFilter": args.paper_id, "model": args.model}, ensure_ascii=False), flush=True)
    if not args.generate:
        return
    batches = []
    pending = missing[args.skip_first:]
    paper_groups = {}
    for question in pending:
        paper_groups.setdefault(question["id"].rsplit("-q", 1)[0], []).append(question)
    for paper_questions in paper_groups.values():
        for start in range(0, len(paper_questions), args.batch_size):
            if len(batches) >= args.max_batches:
                break
            batch = paper_questions[start:start + args.batch_size]
            if len(batch) < 5:
                # Merge short tails with the preceding same-paper batch, if it fits.
                if batches and batches[-1][0][0]["id"].rsplit("-q", 1)[0] == batch[0]["id"].rsplit("-q", 1)[0] and len(batches[-1][0]) + len(batch) <= 8:
                    previous, _ = batches.pop()
                    batch = previous + batch
                else:
                    print(f"SMALL TAIL {batch[0]['id']}: {len(batch)} questions remain in this paper", flush=True)
            token = sha256("|".join(q["id"] for q in batch).encode()).hexdigest()[:12]
            if (LOG / f"{token}.hold.txt").exists() and not args.retry_holds:
                print(f"SKIP HELD {token}: {batch[0]['id']}..{batch[-1]['id']}", flush=True)
                continue
            batches.append((batch, token))
        if len(batches) >= args.max_batches:
            break
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        future_map = {pool.submit(author_candidate, item, args.model): item[1] for item in batches}
        for future in as_completed(future_map):
            token = future_map[future]
            try:
                batch, result, _ = future.result()
            except Exception as exc:
                (LOG / f"{token}.hold.txt").write_text(str(exc), encoding="utf-8")
                print(f"HOLD {token}: {exc}", flush=True)
                continue
            print(f"CANDIDATE {token}: {len(batch)} authored; requires full per-question review", flush=True)


if __name__ == "__main__":
    main()
