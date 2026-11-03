"""Repair explanations flagged by the independent FP2 academic review."""

from __future__ import annotations

import json
import re
import shutil
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "docs/evidence/fp2-two-year"
RAW = json.loads((BASE / "gakka-extraction.json").read_text(encoding="utf-8"))
OUT = BASE / "academic-corrections"
OUT.mkdir(parents=True, exist_ok=True)
KEYS = "アイウエ"


def prompt_for(edition: str, originals: list[dict], drafts: list[dict], reviews: list[dict]) -> str:
    payload = []
    for original, draft, review in zip(originals, drafts, reviews, strict=True):
        if review["approved"] and not draft["needsReview"]:
            continue
        payload.append({
            "number": original["number"], "stem": original["stem"],
            "choices": {key: value for key, value in zip(KEYS, original["choices"], strict=True)},
            "officialAnswer": KEYS[original["answer"] - 1],
            "draft": draft, "reviewIssues": review["issues"],
        })
    return (
        f"FP2級学科{edition}、法令基準日{RAW[edition]['lawReferenceDate']}。独立査読で指摘された解説を修正する。"
        "公式正答は変更しない。各肢は原文に忠実に80〜120字で正誤理由を示す。"
        "JSON配列のみ。各行はnumber,explanation,choiceExplanations(ア,イ,ウ,エ),"
        "cleared(boolean),remainingConcern(文字列)を持つ。"
        "指摘が解消できない、図表や制度の確証がない場合はcleared=falseにして理由を書く。"
        "根拠URLは創作しない。問題と指摘:\n" + json.dumps(payload, ensure_ascii=False)
    )


def main() -> None:
    cli = shutil.which("claude")
    if not cli:
        raise RuntimeError("Claude CLI unavailable")
    for edition, data in RAW.items():
        questions = data["questions"]
        for offset in range(0, len(questions), 8):
            batch = questions[offset:offset + 8]
            first, last = batch[0]["number"], batch[-1]["number"]
            name = f"{edition}-q{first:02d}-{last:02d}.json"
            draft_path = BASE / "explanation-drafts" / name
            review_path = BASE / "academic-independent-review" / name
            target = OUT / name
            if target.exists() or not (draft_path.exists() and review_path.exists()):
                continue
            drafts = json.loads(draft_path.read_text(encoding="utf-8"))
            reviews = json.loads(review_path.read_text(encoding="utf-8"))
            wanted = [q["number"] for q, d, r in zip(batch, drafts, reviews, strict=True)
                      if not r["approved"] or d["needsReview"]]
            if not wanted:
                continue
            for attempt in range(1, 4):
                result = subprocess.run([cli, "-p", "--model", "opus", "--tools", "", "--output-format", "text"],
                                        input=prompt_for(edition, batch, drafts, reviews), text=True,
                                        capture_output=True, encoding="utf-8", timeout=900, cwd=ROOT)
                if result.returncode:
                    print(f"{name} attempt {attempt}: CLI {result.returncode}: {result.stderr[-200:]}", flush=True)
                    continue
                try:
                    clean = re.sub(r"\s*```$", "", re.sub(r"^```(?:json)?\s*", "", result.stdout.strip()))
                    rows = json.loads(clean)
                    if [row.get("number") for row in rows] != wanted:
                        raise ValueError("numbers do not match flagged rows")
                    if any(set(row.get("choiceExplanations", {})) != set(KEYS)
                           or not isinstance(row.get("cleared"), bool) for row in rows):
                        raise ValueError("incomplete correction")
                except (ValueError, json.JSONDecodeError) as error:
                    print(f"{name} attempt {attempt}: {error}", flush=True)
                    continue
                target.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
                print(f"corrected {name}: {sum(row['cleared'] for row in rows)}/{len(rows)} cleared", flush=True)
                break
            else:
                raise RuntimeError(f"Could not correct {name}")


if __name__ == "__main__":
    main()
