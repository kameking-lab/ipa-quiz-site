"""Prepare review-only JCTC question drafts with Antigravity Gemini."""

from __future__ import annotations

import argparse
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCES = ROOT / "docs/evidence/zoen2-tsushin2"
OUTPUT = ROOT / "reports/zoen2-tsushin2-20260927/agy-drafts"
PATTERNS = {
    "zoen2": re.compile(r"〔問題\s*(\d+)〕"),
    "tsushin2": re.compile(r"【No\.\s*(\d+)】"),
}


def split_questions(exam: str) -> dict[int, str]:
    text = (SOURCES / f"{exam}-2026-extract.txt").read_text(encoding="utf-8")
    matches = list(PATTERNS[exam].finditer(text))
    expected = 40 if exam == "zoen2" else 65
    assert [int(match.group(1)) for match in matches] == list(range(1, expected + 1))
    return {
        int(match.group(1)): text[match.start() : matches[index + 1].start() if index + 1 < len(matches) else len(text)]
        for index, match in enumerate(matches)
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("exam", choices=PATTERNS)
    parser.add_argument("start", type=int)
    parser.add_argument("end", type=int)
    args = parser.parse_args()
    questions = split_questions(args.exam)
    selected = "\n\n".join(questions[number] for number in range(args.start, args.end + 1))
    name = "2級造園施工管理" if args.exam == "zoen2" else "2級電気通信工事施工管理"
    prompt = f"""あなたは試験問題の転記下書き係。モデルは Gemini、Claude は使わない。外部ツールを呼ばず、この入力だけを読んでください。
下記は全国建設研修センターが公表した令和8年度前期 {name} 第一次検定の公式PDFから、ルビを除いて自動抽出した未校正テキストです。
問{args.start}〜{args.end}を問題ごとに、番号・問題文・選択肢1〜4の文面を忠実に抽出し、各問の解答判定に必要な設問指示（適当/適当でない、全て選べ等）を落とさないでください。
図・表・空欄がありテキストだけでは再現できない場合は needsVisual=true、missingDetails に具体的な欠落内容を書き、推測で補わないでください。
PDFページ表記が抽出テキストにある場合だけ page を記録してください。解説や正答はこの入力にないので書かないでください。
JSON配列のみで返してください。各要素のキーは number, question, choices（4個の文字列。再現不可なら空文字）, needsVisual, missingDetails。原文にない断定はしないでください。

--- 公式PDF抽出テキスト ---
{selected}
"""
    OUTPUT.mkdir(parents=True, exist_ok=True)
    result = subprocess.run(
        ["agy", "--model", "gemini-3.1-pro-high", "--effort", "high", "--print", prompt],
        capture_output=True,
        text=True,
        encoding="utf-8",
        timeout=480,
    )
    path = OUTPUT / f"{args.exam}-{args.start:02d}-{args.end:02d}.txt"
    path.write_text(result.stdout, encoding="utf-8")
    if result.returncode:
        raise SystemExit(result.stderr or result.returncode)
    print(f"{path}: {len(result.stdout)} characters")
