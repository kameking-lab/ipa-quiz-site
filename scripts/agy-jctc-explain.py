"""Draft learning explanations with Antigravity Gemini for reviewed text items."""

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
    draft = json.loads((REPORT / "agy-drafts" / f"{args.exam}-{args.start:02d}-{args.end:02d}.txt").read_text(encoding="utf-8"))
    answers = json.loads((REPORT / "official-answers.json").read_text(encoding="utf-8"))[args.exam]
    selected = [
        {**item, "officialAnswerNumbers": answers[item["number"] - 1]}
        for item in draft
    ]
    name = "2級造園施工管理" if args.exam == "zoen2" else "2級電気通信工事施工管理"
    prompt = f"""あなたは {name} の学習用解説の下書き係。Antigravity Gemini 3.1 Pro High として回答し、外部ツールは使わないでください。
入力はJCTC公式PDFから転記した未校正の問題・選択肢と、公式正答PDFで照合した正答番号です。
各問について、公式正答を尊重し、結論1〜3文と各選択肢の正誤理由を各1〜2文で作成してください。
公開前に独立QCが必要なため、確証のない法令数値や設計基準を断定せず、疑義は reviewFlag に具体的に記載してください。正答とあなたの解釈が食い違う場合、公式正答を変えず reviewFlag に争点を書いてください。
needsVisual=true の場合、図表を見ていないので説明を推測しないで、reviewFlag=図表確認必須、explanation/choiceExplanations は空欄にしてください。
出力は JSON 配列のみ。各要素 number, explanation, choiceExplanations（4個の文字列）, reviewFlag のキーを持たせてください。

入力JSON:
{json.dumps(selected, ensure_ascii=False)}
"""
    result = subprocess.run(
        ["agy", "--model", "gemini-3.1-pro-high", "--effort", "high", "--print", prompt],
        capture_output=True,
        text=True,
        encoding="utf-8",
        timeout=480,
    )
    out_dir = REPORT / "agy-explanations"
    out_dir.mkdir(parents=True, exist_ok=True)
    output = out_dir / f"{args.exam}-{args.start:02d}-{args.end:02d}.txt"
    output.write_text(result.stdout, encoding="utf-8")
    if result.returncode:
        raise SystemExit(result.stderr or result.returncode)
    print(f"{output}: {len(result.stdout)} characters")
