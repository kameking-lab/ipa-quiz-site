"""Ask Gemini 3.1 Pro High for independent editorial QC of the 1級造園 pilot."""

from __future__ import annotations

import json
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / "reports/zoen1-20260927"
SOURCE = ROOT / "data/questions/zoen1/2026-september.json"


def main() -> None:
    data = json.loads(SOURCE.read_text(encoding="utf-8"))
    entries = [
        {"paper": paper["paper"], "questionPdfUrl": paper["questionUrl"], **item}
        for paper in data["papers"]
        for item in paper["questions"]
    ]
    prompt = f"""あなたは執筆とは独立した1級造園施工管理技術検定の品質審査係です。Gemini 3.1 Pro High で厳しく審査してください。
令和8年度第一次検定・問題A/Bの下記9問について、正答番号は全国建設研修センター公式正答表から採録されています。問題文・選択肢はルビと改行を整理した公式PDFの文字起こしです。
各問の総合解説と選択肢別解説が、設問の「適当」「適当でない」や公式正答と論理的に一致するか、専門事実に疑義がないかを独立に確認してください。特に問題B No.24〜26は全正答を選ぶ形式です。図表や共通条件がないために説明できない場合も指摘してください。根拠がない専門的な断定はPASSにしないでください。
出力は各問の paper, number, status(PASS/REVIEW), issues(具体的な日本語文字列の配列), recommendedFixes(配列) を含むJSON配列のみ。書き換えを直接行わないでください。
公式正答PDF: {data['answerUrl']}
入力: {json.dumps(entries, ensure_ascii=False)}
"""
    result = subprocess.run(
        ["agy", "--model", "gemini-3.1-pro-high", "--effort", "high", "--print", prompt],
        capture_output=True,
        text=True,
        encoding="utf-8",
        timeout=480,
    )
    if result.returncode:
        # Do not echo arbitrary CLI stderr, which may contain account data.
        print(f"AGY review unavailable (exit {result.returncode}); retry after quota reset")
        raise SystemExit(result.returncode)
    output = REPORT / "agy-independent-qc.json"
    output.write_text(result.stdout, encoding="utf-8")
    print(f"Gemini 3.1 Pro High review saved: {output}, {len(result.stdout)} characters")


if __name__ == "__main__":
    main()
