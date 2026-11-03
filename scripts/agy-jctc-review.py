"""Run a fresh-context explanation review against the official answer key."""

from __future__ import annotations

import argparse
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / "reports/zoen2-tsushin2-20260927"

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("exam", choices=["zoen2", "tsushin2"])
    parser.add_argument("start", type=int)
    parser.add_argument("end", type=int)
    args = parser.parse_args()
    stem = f"{args.exam}-{args.start:02d}-{args.end:02d}.txt"
    draft = json.loads((REPORT / "agy-drafts" / stem).read_text(encoding="utf-8"))
    explanation = json.loads((REPORT / "agy-explanations" / stem).read_text(encoding="utf-8"))
    answers = json.loads((REPORT / "official-answers.json").read_text(encoding="utf-8"))[args.exam]
    by_number = {int(item["number"]): item for item in explanation}
    items = [
        {**question, "officialAnswerNumbers": answers[int(question["number"]) - 1], "proposedExplanation": by_number[int(question["number"])]}
        for question in draft
    ]
    prompt = f"""あなたは執筆とは独立した品質審査係です。以下の日本語資格試験の問題、公式正答番号、学習解説案について、選択肢ごとの説明が公式正答と矛盾していないかを厳しく点検してください。モデルは Gemini 3.1 Pro High。外部ツール不要。
法令の基準日や専門的数値は入力に根拠がなければ未確認としてください。図表が必要な問題や説明に疑義がある問題は PASS にしないでください。
各問について number, status (PASS/REVIEW), issues (文字列配列) の JSON 配列のみを返してください。疑義があれば具体的な文を指してください。説明を修正せず、QC結果のみです。
入力:
{json.dumps(items, ensure_ascii=False)}
"""
    result = subprocess.run(
        ["agy", "--model", "gemini-3.1-pro-high", "--effort", "high", "--print", prompt],
        capture_output=True,
        text=True,
        encoding="utf-8",
        timeout=480,
    )
    out_dir = REPORT / "agy-qc"
    out_dir.mkdir(parents=True, exist_ok=True)
    output = out_dir / stem
    output.write_text(result.stdout, encoding="utf-8")
    if result.returncode:
        raise SystemExit(result.stderr or result.returncode)
    print(f"{output}: {len(result.stdout)} characters")
