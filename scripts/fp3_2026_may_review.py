"""Blind solve and explain the official 2026 FP3 extraction with Opus 5.5.

Run `py -3.12 scripts/fp3_2026_may_review.py gakka 1 10`. Raw CLI JSON
receipts are retained and rejected unless Opus 5.5 was actually served.
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
EVIDENCE = ROOT / "docs" / "evidence" / "fp3-2026-may"
RECEIPTS = EVIDENCE / "receipts"
MODEL = "claude-opus-5-5"
KEYS = "アイウエ"
FIGURE_TEXT = {
    52: "公式図：土地200㎡が幅6mの公道に面する。建築面積100㎡、延べ面積150㎡の住宅。容積率の計算に使う面積は土地200㎡と延べ面積150㎡。",
    57: "公式親族図：被相続人Aの配偶者は妻B。父Cと母DはAより前に死亡。Aの兄Eと姉Fは父母の子で、Aの兄弟姉妹。Aに子の記載はない。",
}
PRACTICAL_FIGURE_TEXT = {
    9: "公式敷地図：土地300㎡、幅20m×奥行15m、前面道路の幅員6m。商業地域、指定建蔽率80%、指定容積率400%、前面道路幅員に対する法定乗数6/10。",
    18: "公式親族図：被相続人・森隆男の妻は綾子。子は幹夫（相続放棄）、夏帆、隆男より前に死亡した子（その子が真奈）。幹夫の子は寛太。相続放棄した幹夫の子は代襲しない。",
    19: "公式親族図：被相続人・藤田信二の妻は良枝。子は咲江、誠也、桜子（相続放棄）。相続税の基礎控除の法定相続人の数には相続放棄者も含める。",
}


def payload(question: dict, with_answer: bool, section: str) -> dict:
    row = {
        "number": question["number"],
        "question": question["stem"],
        "choices": dict(zip(KEYS[: len(question["choices"])], question["choices"], strict=True)),
    }
    figures = FIGURE_TEXT if section == "gakka" else PRACTICAL_FIGURE_TEXT
    if question["number"] in figures:
        row["figure"] = figures[question["number"]]
    if with_answer:
        row["officialAnswer"] = KEYS[question["answer"] - 1]
    return row


def parse_result(raw: dict) -> list[dict]:
    text = re.sub(r"^```(?:json)?\s*", "", raw["result"].strip())
    text = re.sub(r"\s*```$", "", text)
    return json.loads(text[text.index("[") : text.rindex("]") + 1])


def verified(raw: dict) -> bool:
    usage = raw.get("modelUsage", {}).get(MODEL) or {}
    return (
        not raw.get("is_error")
        and raw.get("terminal_reason") == "completed"
        and usage.get("canonicalModel") == MODEL
        and usage.get("provider") == "firstParty"
        and usage.get("outputTokens", 0) > 0
    )


def run(kind: str, prompt: str, target: Path, numbers: list[int]) -> list[dict]:
    if target.exists():
        raw = json.loads(target.read_text(encoding="utf-8"))
        if verified(raw):
            rows = parse_result(raw)
            if [row.get("number") for row in rows] == numbers:
                return rows
        raise ValueError(f"Existing receipt cannot be accepted: {target}")
    claude = shutil.which("claude")
    if not claude:
        raise RuntimeError("Claude CLI not found")
    result = subprocess.run(
        [claude, "-p", "--model", MODEL, "--tools", "", "--output-format", "json"],
        input=prompt,
        text=True,
        capture_output=True,
        encoding="utf-8",
        timeout=1200,
        cwd=ROOT,
    )
    if result.returncode:
        raise RuntimeError(f"{kind}: CLI {result.returncode}: {result.stderr[-500:]}")
    raw = json.loads(result.stdout)
    if not verified(raw):
        raise ValueError(f"{kind}: {MODEL} firstParty usage missing")
    rows = parse_result(raw)
    if [row.get("number") for row in rows] != numbers:
        raise ValueError(f"{kind}: question sequence differs")
    RECEIPTS.mkdir(parents=True, exist_ok=True)
    target.write_bytes(result.stdout.encode("utf-8"))
    index_file = RECEIPTS / "index.json"
    index = json.loads(index_file.read_text(encoding="utf-8")) if index_file.exists() else {}
    index[target.name] = {
        "kind": kind,
        "questions": numbers,
        "requestedModel": MODEL,
        "resolvedModel": raw["modelUsage"][MODEL]["canonicalModel"],
        "provider": raw["modelUsage"][MODEL]["provider"],
        "promptSha256": hashlib.sha256(prompt.encode()).hexdigest(),
        "receiptSha256": hashlib.sha256(target.read_bytes()).hexdigest(),
    }
    index_file.write_text(json.dumps(index, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return rows


def main() -> None:
    section, first, last = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
    if section not in {"gakka", "jitsugi"} or not (1 <= first <= last <= (60 if section == "gakka" else 20)):
        raise ValueError("Expected gakka 1..60 or jitsugi 1..20")
    source = json.loads((EVIDENCE / f"{section}-extraction.json").read_text(encoding="utf-8"))["202605"]
    questions = [q for q in source["questions"] if first <= q["number"] <= last]
    numbers = [q["number"] for q in questions]
    label = "学科" if section == "gakka" else "実技"
    lead = f"日本FP協会FP3級{label}2026年5月公表分を法令基準日{source['lawReferenceDate']}で扱う。"
    blind_prompt = lead + (
        "公式正答を見ずに独立して解く。PDFの図表や前提が入力に欠ける場合、推測せずconfident=false。"
        "JSON配列のみ。各要素はnumber,answer(ア/イ/ウ),confident(boolean),note(具体的理由)。\n"
        + json.dumps([payload(q, False, section) for q in questions], ensure_ascii=False)
    )
    explain_prompt = lead + (
        "officialAnswerを変えず、一般解説と各肢が正答・誤答になる具体的理由を書く。"
        "原図や前提が欠ける、公式正答と資料が矛盾する、基準日後改正と混同するおそれがある場合はneedsReview=true。"
        "架空の条文番号・数値・URLを作らない。正誤問題では二つの選択肢それぞれを説明する。"
        "JSON配列のみ。各要素はnumber,explanation,choiceExplanations(ア/イまたはア/イ/ウ),needsReview(boolean),uncertainty。\n"
        + json.dumps([payload(q, True, section) for q in questions], ensure_ascii=False)
    )
    stem = f"{section}-q{first:02d}-{last:02d}"
    solved = run("solve", blind_prompt, RECEIPTS / f"{stem}-solve.json", numbers)
    explained = run("explain", explain_prompt, RECEIPTS / f"{stem}-explain.json", numbers)
    for q, answer, draft in zip(questions, solved, explained, strict=True):
        official = KEYS[q["answer"] - 1]
        valid_keys = set(KEYS[: len(q["choices"])])
        if set(draft.get("choiceExplanations", {})) != valid_keys:
            raise ValueError(f"Q{q['number']}: explanation key mismatch")
        status = "PASS" if answer["answer"] == official and answer["confident"] and not draft["needsReview"] else "HOLD"
        print(f"{status} Q{q['number']}: official={official}, blind={answer['answer']}, {draft.get('uncertainty', '')}", flush=True)


if __name__ == "__main__":
    main()
