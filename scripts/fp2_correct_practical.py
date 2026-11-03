"""Correct practical solutions flagged by independent review, leaving uncertainty visible."""

from __future__ import annotations

import json
import re
import shutil
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "docs/evidence/fp2-two-year"
SOURCE = json.loads((ROOT / "data/questions/fp2/practical-2024-2025.json").read_text(encoding="utf-8"))
OUT = BASE / "practical-corrections"
OUT.mkdir(parents=True, exist_ok=True)


def load_drafts(edition: str) -> dict[int, dict]:
    records: dict[int, dict] = {}
    for path in sorted((BASE / "practical-explanation-drafts").glob(f"{edition}-q*.json")):
        for row in json.loads(path.read_text(encoding="utf-8")):
            records[row["number"]] = row
    return records


def main() -> None:
    cli = shutil.which("claude")
    if not cli:
        raise RuntimeError("Claude CLI unavailable")
    for edition, data in SOURCE.items():
        drafts = load_drafts(edition)
        for path in sorted((BASE / "practical-independent-review").glob(f"{edition}-q*.json")):
            target = OUT / path.name
            if target.exists():
                continue
            reviews = json.loads(path.read_text(encoding="utf-8"))
            original = {q["number"]: q for q in data["questions"]}
            wanted = [row for row in reviews if not row["approved"] or drafts[row["number"]]["needsReview"]]
            if not wanted:
                continue
            payload = [{
                "number": row["number"], "question": original[row["number"]]["body"],
                "officialAnswer": original[row["number"]]["modelAnswer"],
                "draft": drafts[row["number"]], "reviewIssues": row["issues"],
            } for row in wanted]
            instruction = (
                f"FP2級実技{edition}の解説を独立監査の指摘に従い修正する。法令基準日は{data['lawReferenceDate']}。"
                "公式模範解答は変更しない。数字1〜4選択式なら全肢の理由を明確にする。"
                "複数空欄・○×なら全小問の理由を示す。計算なら条件、式、端数処理を示す。"
                "出典URLを推測しない。画像や原典配置を見ないと判断できないことはcleared=false。"
                "JSON配列のみ。各行はnumber,explanation,choiceExplanations,cleared(boolean),remainingConcern(文字列)。"
                "問題と指摘:\n" + json.dumps(payload, ensure_ascii=False)
            )
            for attempt in range(1, 4):
                result = subprocess.run([cli, "-p", "--model", "opus", "--tools", "", "--output-format", "text"],
                                        input=instruction, text=True, capture_output=True,
                                        encoding="utf-8", timeout=900, cwd=ROOT)
                if result.returncode:
                    print(f"{path.name} attempt {attempt}: CLI {result.returncode}: {result.stderr[-200:]}", flush=True)
                    continue
                try:
                    clean = re.sub(r"\s*```$", "", re.sub(r"^```(?:json)?\s*", "", result.stdout.strip()))
                    rows = json.loads(clean)
                    if [row.get("number") for row in rows] != [row["number"] for row in wanted]:
                        raise ValueError("question numbers differ")
                    for row in rows:
                        numeric = bool(re.fullmatch(r"[1-4]", original[row["number"]]["modelAnswer"]))
                        if not isinstance(row.get("cleared"), bool) or not isinstance(row.get("explanation"), str):
                            raise ValueError("correction incomplete")
                        keys = set(row.get("choiceExplanations", {}))
                        if numeric and keys != set("1234"):
                            raise ValueError("choice reasons incomplete")
                        # Non-numeric practical tasks may label their parts ア〜エ.
                except (ValueError, json.JSONDecodeError) as error:
                    print(f"{path.name} attempt {attempt}: {error}", flush=True)
                    continue
                target.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
                print(f"corrected {path.name}: {sum(row['cleared'] for row in rows)}/{len(rows)} cleared", flush=True)
                break
            else:
                raise RuntimeError(f"Could not correct {path.name}")


if __name__ == "__main__":
    main()
