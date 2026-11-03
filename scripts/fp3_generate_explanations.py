"""Generate review-only FP3 all-choice explanation drafts with Claude CLI."""

from __future__ import annotations

import json
import re
import shutil
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / "docs" / "evidence" / "fp3-two-year"
OUTPUT = EVIDENCE / "explanation-drafts"
OUTPUT.mkdir(parents=True, exist_ok=True)
KEYS = "アイウエオ"


def clean_response(raw: str) -> list[dict]:
    text = re.sub(r"^```(?:json)?\s*", "", raw.strip())
    text = re.sub(r"\s*```$", "", text)
    return json.loads(text)


def validate(rows: list[dict], questions: list[dict]) -> None:
    if [row.get("number") for row in rows] != [q["number"] for q in questions]:
        raise ValueError("Question numbers or order differ")
    for row, question in zip(rows, questions, strict=True):
        expected = set(KEYS[: len(question["choices"])])
        if set(row.get("choiceExplanations", {})) != expected:
            raise ValueError(f"Q{row.get('number')}: explanation keys differ")
        if len(row.get("explanation", "")) < 12:
            raise ValueError(f"Q{row.get('number')}: short explanation")
        if not isinstance(row.get("needsReview"), bool):
            raise ValueError(f"Q{row.get('number')}: missing review flag")


def prompt_for(edition: str, section: str, law_date: str, questions: list[dict]) -> str:
    payload = []
    for question in questions:
        keys = KEYS[: len(question["choices"])]
        payload.append({
            "number": question["number"],
            "question": question["stem"],
            "choices": dict(zip(keys, question["choices"], strict=True)),
            "correctChoice": keys[question["answer"] - 1],
        })
    return (
        f"日本FP協会FP3級{section}{edition}公表分を、指定法令基準日{law_date}で解説する。"
        "正答は入力のcorrectChoiceを絶対に変更しない。全選択肢について、なぜ正しいか又は誤りかを具体的に説明する。"
        "現在法ではなく問題の法令基準日で判定する。図表や事例を読み取れない、制度改正の疑い、根拠に自信がない場合はneedsReview=trueにする。"
        "架空の法令、数値、URL、体験談を書かない。JSON配列だけ返す。"
        "各要素はnumber,explanation,choiceExplanations,needsReview,uncertainty。全体120字以内、各肢140字以内。"
        "入力:\n" + json.dumps(payload, ensure_ascii=False)
    )


def main() -> None:
    claude = shutil.which("claude")
    if not claude:
        raise RuntimeError("Claude CLI is unavailable")
    for section, filename in (("学科", "gakka-extraction.json"), ("実技", "jitsugi-extraction.json")):
        source = json.loads((EVIDENCE / filename).read_text(encoding="utf-8"))
        for edition, values in source.items():
            questions = values["questions"]
            for offset in range(0, len(questions), 8):
                batch = questions[offset : offset + 8]
                target = OUTPUT / f"{edition}-{filename[:6]}-q{batch[0]['number']:02d}-{batch[-1]['number']:02d}.json"
                if target.exists():
                    validate(json.loads(target.read_text(encoding="utf-8")), batch)
                    continue
                prompt = prompt_for(edition, section, values["lawReferenceDate"], batch)
                for attempt in range(1, 4):
                    result = subprocess.run(
                        [claude, "-p", "--model", "sonnet", "--tools", "", "--output-format", "text"],
                        input=prompt,
                        text=True,
                        capture_output=True,
                        encoding="utf-8",
                        timeout=600,
                        cwd=ROOT,
                    )
                    if result.returncode:
                        print(f"{target.name} attempt {attempt}: CLI {result.returncode}: {result.stderr[-300:]}", flush=True)
                        continue
                    try:
                        rows = clean_response(result.stdout)
                        validate(rows, batch)
                    except (json.JSONDecodeError, ValueError) as error:
                        print(f"{target.name} attempt {attempt}: {error}", flush=True)
                        continue
                    target.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
                    print(f"drafted {target.name}", flush=True)
                    break
                else:
                    raise RuntimeError(f"Could not draft {target.name}")


if __name__ == "__main__":
    main()
