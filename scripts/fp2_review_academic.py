"""Independent Opus review of FP2 academic choice explanations.

This does not publish or silently rewrite a draft; failures enter a review queue.
"""

from __future__ import annotations

import json
import re
import shutil
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "docs/evidence/fp2-two-year"
RAW = json.loads((BASE / "gakka-extraction.json").read_text(encoding="utf-8"))
OUT = BASE / "academic-independent-review"
OUT.mkdir(parents=True, exist_ok=True)
KEYS = "アイウエ"


def prompt(edition: str, questions: list[dict], drafts: list[dict]) -> str:
    payload = []
    for question, draft in zip(questions, drafts, strict=True):
        payload.append({
            "number": question["number"], "question": question["stem"],
            "choices": {key: value for key, value in zip(KEYS, question["choices"], strict=True)},
            "officialAnswer": KEYS[question["answer"] - 1],
            "draft": draft,
        })
    return (
        f"FP2級学科{edition}の解説を独立に厳格監査する。試験の法令基準日は{RAW[edition]['lawReferenceDate']}。"
        "公式正答は入力済みであり変更しない。各肢の説明が原文のその肢を正しく説明し、公式正答と整合するか、"
        "計算・数字・法改正・図表依存を個別に確認する。断定できないものはapproved=false。"
        "URLを推測・創作しない。ソース探索用の具体的な日本語検索語だけ1〜2件提案する。"
        "JSON配列だけ返す。各要素はnumber,approved(boolean),issues(文字列配列),"
        "suggestedCorrection(問題なければ空文字),sourceQueries(文字列配列)。"
        "図表が必要で本文だけで検証できなければapproved=falseとする。\nデータ:\n"
        + json.dumps(payload, ensure_ascii=False)
    )


def parse(text: str) -> list[dict]:
    return json.loads(re.sub(r"\s*```$", "", re.sub(r"^```(?:json)?\s*", "", text.strip())))


def main() -> None:
    cli = shutil.which("claude")
    if not cli:
        raise RuntimeError("Claude CLI unavailable")
    for edition, values in RAW.items():
        originals = values["questions"]
        for offset in range(0, len(originals), 8):
            questions = originals[offset:offset + 8]
            first, last = questions[0]["number"], questions[-1]["number"]
            batch_name = f"{edition}-q{first:02d}-{last:02d}.json"
            draft_path = BASE / "explanation-drafts" / batch_name
            target = OUT / batch_name
            if target.exists():
                continue
            if not draft_path.exists():
                print(f"deferred {batch_name}: draft not ready", flush=True)
                continue
            drafts = json.loads(draft_path.read_text(encoding="utf-8"))
            for attempt in range(1, 4):
                result = subprocess.run([cli, "-p", "--model", "opus", "--tools", "", "--output-format", "text"],
                                        input=prompt(edition, questions, drafts), text=True, capture_output=True,
                                        encoding="utf-8", timeout=900, cwd=ROOT)
                if result.returncode:
                    print(f"{batch_name} attempt {attempt}: CLI {result.returncode}: {result.stderr[-200:]}", flush=True)
                    continue
                try:
                    rows = parse(result.stdout)
                    if [row.get("number") for row in rows] != [q["number"] for q in questions]:
                        raise ValueError("question numbers differ")
                    if any(not isinstance(row.get("approved"), bool) or not isinstance(row.get("issues"), list)
                           or not isinstance(row.get("sourceQueries"), list) for row in rows):
                        raise ValueError("incomplete review")
                except (ValueError, json.JSONDecodeError) as error:
                    print(f"{batch_name} attempt {attempt}: {error}", flush=True)
                    continue
                target.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
                print(f"reviewed {edition} Q{first}-{last}; flagged {sum(not row['approved'] for row in rows)}", flush=True)
                break
            else:
                raise RuntimeError(f"Could not review {batch_name}")


if __name__ == "__main__":
    main()
