"""Create review-only FP2 explanation drafts using the existing Claude CLI.

Run: py -3.12 scripts/fp2_generate_explanations.py
The generated files require independent answer and source review before release.
"""

from __future__ import annotations

import json
import re
import shutil
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / "docs" / "evidence" / "fp2-two-year"
INPUT = json.loads((EVIDENCE / "gakka-extraction.json").read_text(encoding="utf-8"))
OUTPUT = EVIDENCE / "explanation-drafts"
OUTPUT.mkdir(parents=True, exist_ok=True)
KEYS = "アイウエ"


def make_prompt(edition: str, questions: list[dict]) -> str:
    payload = [{"number": q["number"], "question": q["stem"],
                "choices": {key: value for key, value in zip(KEYS, q["choices"], strict=True)},
                "correctChoice": KEYS[q["answer"] - 1]} for q in questions]
    date = INPUT[edition]["lawReferenceDate"]
    return (
        f"日本FP協会FP2級学科{edition}の公式問題を、試験指定の法令基準日{date}で解説する。"
        "過去問の選択肢に忠実に各肢の正誤理由を書く。正答は入力のcorrectChoiceを絶対に変更しない。"
        "曖昧・法改正・図表不足・自信が低い場合はneedsReview=trueにし、uncertaintyに理由を具体的に記す。"
        "架空の出典やURLを書かない。問題文のコピーを書き直さない。"
        "JSON配列だけ返し、各要素はnumber,explanation,choiceExplanations(ア,イ,ウ,エ),needsReview,uncertaintyの6項目。"
        "overall explanationは100字以内、各肢は120字以内で根拠となる事実・式を明確にする。"
        "データ:\n" + json.dumps(payload, ensure_ascii=False)
    )


def parse_response(raw: str) -> list[dict]:
    clean = raw.strip()
    clean = re.sub(r"^```(?:json)?\s*", "", clean)
    clean = re.sub(r"\s*```$", "", clean)
    return json.loads(clean)


def validate(rows: list[dict], questions: list[dict]) -> None:
    expected = [q["number"] for q in questions]
    if [r.get("number") for r in rows] != expected:
        raise ValueError("Question numbers or order differ")
    for row in rows:
        if set(row.get("choiceExplanations", {})) != set(KEYS):
            raise ValueError(f"Q{row['number']}: missing choice explanation")
        if any(not isinstance(row["choiceExplanations"][k], str) or len(row["choiceExplanations"][k]) < 12 for k in KEYS):
            raise ValueError(f"Q{row['number']}: short or empty reason")
        if len(row.get("explanation", "")) < 12 or not isinstance(row.get("needsReview"), bool):
            raise ValueError(f"Q{row['number']}: incomplete draft")


def main() -> None:
    claude_bin = shutil.which("claude")
    if not claude_bin:
        raise RuntimeError("Claude CLI is unavailable")
    for edition, values in INPUT.items():
        questions = values["questions"]
        for offset in range(0, len(questions), 8):
            batch = questions[offset : offset + 8]
            target = OUTPUT / f"{edition}-q{batch[0]['number']:02d}-{batch[-1]['number']:02d}.json"
            if target.exists():
                validate(json.loads(target.read_text(encoding="utf-8")), batch)
                continue
            prompt = make_prompt(edition, batch)
            for attempt in range(1, 4):
                result = subprocess.run(
                    [claude_bin, "-p", "--model", "sonnet", "--tools", "", "--output-format", "text"],
                    input=prompt, text=True, capture_output=True, encoding="utf-8", timeout=600, cwd=ROOT,
                )
                if result.returncode:
                    print(f"{edition} Q{batch[0]['number']}-{batch[-1]['number']} attempt {attempt}: CLI {result.returncode}: {result.stderr[-300:]}", flush=True)
                    continue
                try:
                    rows = parse_response(result.stdout)
                    validate(rows, batch)
                except (json.JSONDecodeError, ValueError) as error:
                    print(f"{edition} Q{batch[0]['number']}-{batch[-1]['number']} attempt {attempt}: {error}", flush=True)
                    continue
                target.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
                print(f"drafted {edition} Q{batch[0]['number']}-{batch[-1]['number']}", flush=True)
                break
            else:
                raise RuntimeError(f"Could not draft {edition} Q{batch[0]['number']}-{batch[-1]['number']}")


if __name__ == "__main__":
    main()
