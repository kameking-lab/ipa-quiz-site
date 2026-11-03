"""Draft reasoning for all 160 FP2 practical questions using the existing CLI.

These are review artifacts. The official model answer is never changed.
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = json.loads((ROOT / "data/questions/fp2/practical-2024-2025.json").read_text(encoding="utf-8"))
OUTPUT = ROOT / "docs/evidence/fp2-two-year/practical-explanation-drafts"
OUTPUT.mkdir(parents=True, exist_ok=True)


def prompt_for(edition: str, rows: list[dict]) -> str:
    payload = [{"number": q["number"], "body": q["body"], "officialAnswer": q["modelAnswer"],
                "fourChoice": bool(re.fullmatch(r"[1-4]", q["modelAnswer"]))} for q in rows]
    return (
        f"日本FP協会FP2級実技{edition}（資産設計提案業務）の公式設問を、法令基準日{SOURCE[edition]['lawReferenceDate']}で解説する。"
        "出力はJSON配列のみ。各要素はnumber,explanation,choiceExplanations,needsReview,uncertainty。"
        "officialAnswerは入力にある公式模範解答であり、変更しない。"
        "explanationは解法・根拠・計算式を具体的に180字以内で示す。"
        "fourChoice=trueならchoiceExplanationsに1,2,3,4それぞれの正誤理由を80字以内で記す。"
        "fourChoice=falseならchoiceExplanationsを空オブジェクトにし、複数空欄や○×の各解答の根拠をexplanationで示す。"
        "図表・資料の配置が必要で本文OCRから確認できない、古い法令や数値に不確かさがある場合はneedsReview=true、uncertaintyに具体的理由を書く。"
        "未確認の資料やURLを創作しない。公式解答と矛盾する理由を書かない。\nデータ:\n"
        + json.dumps(payload, ensure_ascii=False)
    )


def parse(text: str) -> list[dict]:
    return json.loads(re.sub(r"\s*```$", "", re.sub(r"^```(?:json)?\s*", "", text.strip())))


def validate(drafts: list[dict], source: list[dict]) -> None:
    if [row.get("number") for row in drafts] != [row["number"] for row in source]:
        raise ValueError("question numbers do not match")
    for row, original in zip(drafts, source, strict=True):
        if not isinstance(row.get("explanation"), str) or len(row["explanation"]) < 18:
            raise ValueError(f"Q{row['number']} lacks explanation")
        if not isinstance(row.get("needsReview"), bool):
            raise ValueError(f"Q{row['number']} lacks review flag")
        keys = set(row.get("choiceExplanations", {}))
        expected = set("1234") if re.fullmatch(r"[1-4]", original["modelAnswer"]) else set()
        if keys != expected:
            raise ValueError(f"Q{row['number']} choice reasons {keys} != {expected}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--edition", choices=list(SOURCE))
    args = parser.parse_args()
    cli = shutil.which("claude")
    if not cli:
        raise RuntimeError("Claude CLI unavailable")
    for edition, data in SOURCE.items():
        if args.edition and edition != args.edition:
            continue
        questions = data["questions"]
        for offset in range(0, len(questions), 3):
            batch = questions[offset:offset + 3]
            target = OUTPUT / f"{edition}-q{batch[0]['number']:02d}-{batch[-1]['number']:02d}.json"
            if target.exists():
                validate(json.loads(target.read_text(encoding="utf-8")), batch)
                continue
            for attempt in range(1, 4):
                result = subprocess.run([cli, "-p", "--model", "sonnet", "--tools", "", "--output-format", "text"],
                                        input=prompt_for(edition, batch), text=True, capture_output=True,
                                        encoding="utf-8", timeout=900, cwd=ROOT)
                if result.returncode:
                    print(f"{edition} Q{batch[0]['number']}-{batch[-1]['number']} attempt {attempt}: CLI {result.returncode}: {result.stderr[-200:]}", flush=True)
                    continue
                try:
                    drafts = parse(result.stdout)
                    validate(drafts, batch)
                except (ValueError, json.JSONDecodeError) as error:
                    print(f"{edition} Q{batch[0]['number']}-{batch[-1]['number']} attempt {attempt}: {error}", flush=True)
                    continue
                target.write_text(json.dumps(drafts, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
                print(f"drafted {edition} Q{batch[0]['number']}-{batch[-1]['number']}", flush=True)
                break
            else:
                raise RuntimeError(f"Could not draft {edition} Q{batch[0]['number']}-{batch[-1]['number']}")


if __name__ == "__main__":
    main()
