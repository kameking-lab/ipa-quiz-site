"""Generate a provisional lckohyo per-choice explanation wave shard.

Usage: python3 scripts/generate-lck-provisional-choice-wave.py lckohyo-wave-a [--jobs 6]

Each batch is one `claude -p` call pinned to MODEL with no tools. The raw
stream stays in .cache; a committed receipt keeps the model proof, modelUsage
and prompt/result hashes. Verdicts come from the official answer key, never
from the model. Rerunning skips batches whose receipt and records are current.
"""

import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile

sys.path.insert(0, str(Path(__file__).resolve().parent))
from lck_provisional_wave import (EVIDENCE_ROOT, MODEL, ROOT, digest, load_receipts, load_wave,  # noqa: E402
                                  question_fingerprint, read, record_issues, receipt_issues,
                                  shard_path, write, WAVES)
from hashlib import sha256  # noqa: E402

CACHE = ROOT / ".cache/lckohyo-provisional-choice-waves"
BATCH_SIZE = 8

PROMPT_HEAD = """あなたは労働安全コンサルタント試験（産業安全・労働衛生 等）の過去問教材の解説執筆者です。
以下の各問について、選択肢1〜5それぞれに「その選択肢を選ぶことが正解／不正解である理由」を日本語で簡潔に書いてください。

厳守事項:
- 公式正答（officialCorrectChoice）は確定事項です。これと矛盾する判断・疑義・保留を書かないこと。
- 設問の問い方（「適切でないもの」「誤っているもの」「正しいもの」等）に合わせ、正答の選択肢は「なぜそれを選ぶのが正しいか」、それ以外は「なぜそれを選ぶのは誤りか」を説明する。
- 既存の総合解説（legacyExplanation）と設問文・選択肢の内容に沿って書く。存在を確認できない数値・条文番号・通達名・出典を新たに持ち込まない。
- 鉤括弧「」『』での引用は、選択肢文または設問文の文言をそのまま抜き出す場合に限る。
- 1選択肢あたり40〜150字程度、です・ます調ではなく常体（〜である／〜する）で書く。
- URL、Markdown、HOLD・FIX・要確認・未確認・暫定などの作業メモ、執筆者の独白は書かない。
- 5つの理由はそれぞれ内容の異なる文にする。

出力は JSON オブジェクトのみ（前後に説明文を付けない）。形式:
{"<question id>": {"reasons": ["選択肢1の理由", "選択肢2の理由", "選択肢3の理由", "選択肢4の理由", "選択肢5の理由"]}, ...}

問題:
"""


def batches(targets):
    by_paper = {}
    for qid, target in targets.items():
        by_paper.setdefault(target["paper"], []).append(qid)
    for paper, ids in by_paper.items():
        ids.sort(key=lambda qid: targets[qid]["question"]["number"])
        for start in range(0, len(ids), BATCH_SIZE):
            chunk = ids[start:start + BATCH_SIZE]
            yield f"{paper}-q{targets[chunk[0]]['question']['number']:02d}", chunk


def build_prompt(targets, ids):
    items = []
    for qid in ids:
        target = targets[qid]
        items.append({
            "id": qid,
            "question": target["presentation"]["prompt"],
            "choices": {str(c["number"]): c["text"] for c in target["presentation"]["choices"]},
            "officialCorrectChoice": target["question"]["correctChoice"],
            "legacyExplanation": target["legacy"],
        })
    return PROMPT_HEAD + json.dumps(items, ensure_ascii=False, indent=1)


def extract_json(content, expected):
    decoder = json.JSONDecoder()
    for start, character in enumerate(content):
        if character != "{":
            continue
        try:
            value, _ = decoder.raw_decode(content[start:])
        except json.JSONDecodeError:
            continue
        if isinstance(value, dict) and set(value) == expected:
            return value
    raise ValueError("no JSON object with exactly the requested IDs")


def call_claude(prompt, prefix):
    prefix.parent.mkdir(parents=True, exist_ok=True)
    env = dict(os.environ, CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC="1",
               CLAUDE_CODE_MAX_OUTPUT_TOKENS="32000")
    command = ["claude", "-p", "--model", MODEL, "--output-format", "stream-json",
               "--verbose", "--tools", ""]
    raw_path = prefix.with_suffix(".raw.jsonl")
    with raw_path.open("w", encoding="utf-8") as out, \
            prefix.with_suffix(".stderr.txt").open("w", encoding="utf-8") as err:
        run = subprocess.run(command, input=prompt, text=True, stdout=out, stderr=err,
                             cwd=tempfile.gettempdir(), env=env, timeout=1800)
    rows = [json.loads(line) for line in raw_path.read_text(encoding="utf-8").splitlines()
            if line.strip()]
    result = next((row for row in reversed(rows) if row.get("type") == "result"), None)
    if run.returncode or not result or result.get("subtype") != "success":
        raise RuntimeError(f"claude failed for {prefix.name}")
    assistant = sorted({row["message"]["model"] for row in rows
                        if row.get("type") == "assistant" and isinstance(row.get("message"), dict)
                        and row["message"].get("model")})
    proof = {"requestedModel": MODEL, "assistantModels": assistant,
             "modelUsage": result.get("modelUsage"), "cliVersion": next((row["claude_code_version"] for row in rows if row.get("claude_code_version")), None)}
    return result.get("result", ""), proof


def generate_batch(wave, batch_id, ids, targets):
    prompt = build_prompt(targets, ids)
    last_error = None
    for attempt in range(3):
        content, proof = call_claude(prompt, CACHE / wave / f"{batch_id}-a{attempt}")
        try:
            parsed = extract_json(content, set(ids))
        except ValueError as error:
            last_error = error
            continue
        receipt = {
            "wave": wave, "batch": batch_id, "ids": ids,
            "generatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
            "attempt": attempt, "promptSha256": digest(prompt),
            "resultSha256": sha256(content.encode("utf-8")).hexdigest(), "modelProof": proof,
        }
        if receipt_issues(receipt):
            raise RuntimeError(f"{batch_id}: {receipt_issues(receipt)}")
        records, issues = {}, []
        for qid in ids:
            target = targets[qid]
            reasons = parsed[qid].get("reasons") if isinstance(parsed[qid], dict) else None
            if not isinstance(reasons, list) or len(reasons) != 5:
                issues.append(f"{qid}: expected five reasons")
                continue
            records[qid] = make_record(target, reasons, batch_id)
            issues += record_issues(qid, target, records[qid], {batch_id: receipt})
        if not issues:
            return receipt, records
        last_error = RuntimeError("; ".join(issues))
    raise RuntimeError(f"{batch_id}: {last_error}")


def make_record(target, reasons, batch_id):
    question = target["question"]
    return {
        "sourceHash": sha256(question["text"].encode("utf-8")).hexdigest(),
        "questionFingerprint": question_fingerprint(question, target["presentation"]),
        "correctChoice": question["correctChoice"],
        "basedOnLegacyExplanationHash": digest(target["legacy"]),
        "provisionalReview": True,
        "generationBatch": batch_id,
        "choices": [{"number": n, "verdict": "correct" if n == question["correctChoice"] else "incorrect",
                     "reason": str(reason).strip()} for n, reason in enumerate(reasons, 1)],
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("wave", choices=sorted(WAVES))
    parser.add_argument("--jobs", type=int, default=6)
    parser.add_argument("--only", nargs="*", help="limit to these batch IDs")
    args = parser.parse_args()
    targets, excluded = load_wave(args.wave)
    path = shard_path(args.wave)
    entries = read(path)["entries"] if path.exists() else {}
    receipts = load_receipts(args.wave)
    pending = [(batch_id, ids) for batch_id, ids in batches(targets)
               if any(qid not in entries or record_issues(qid, targets[qid], entries[qid], receipts)
                      for qid in ids) and (not args.only or batch_id in args.only)]
    print(f"{len(targets)} targets, {len(excluded)} excluded, {len(pending)} batches pending")
    failures = []

    def save():
        write(path, {"meta": {"wave": args.wave, "papers": WAVES[args.wave], "model": MODEL,
                              "provisionalReview": True, "governmentSourceStrictReview": False,
                              "excluded": excluded},
                     "entries": {qid: entries[qid] for qid in sorted(
                         entries, key=lambda q: (targets[q]["paper"], targets[q]["question"]["number"]))
                         if qid in targets}})

    with ThreadPoolExecutor(max_workers=args.jobs) as pool:
        futures = {pool.submit(generate_batch, args.wave, batch_id, ids, targets): batch_id
                   for batch_id, ids in pending}
        for future in as_completed(futures):
            batch_id = futures[future]
            try:
                receipt, records = future.result()
            except Exception as error:  # keep other batches going; rerun resumes
                failures.append(f"{batch_id}: {error}")
                print("FAIL", failures[-1], flush=True)
                continue
            write(EVIDENCE_ROOT / args.wave / f"{batch_id}.json", receipt)
            entries.update(records)
            save()
            print("ok", batch_id, flush=True)
    save()
    if failures:
        sys.exit(f"{len(failures)} batches failed; rerun to resume")


if __name__ == "__main__":
    main()
