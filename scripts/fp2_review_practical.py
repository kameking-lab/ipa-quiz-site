"""Independent review of each FP2 practical worked solution and option reason."""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "docs/evidence/fp2-two-year"
SOURCE = json.loads((ROOT / "data/questions/fp2/practical-2024-2025.json").read_text(encoding="utf-8"))
DRAFTS = BASE / "practical-explanation-drafts"
OUT = BASE / "practical-independent-review"
OUT.mkdir(parents=True, exist_ok=True)


def load_drafts(edition: str) -> dict[int, dict]:
    records: dict[int, dict] = {}
    for path in sorted(DRAFTS.glob(f"{edition}-q*.json")):
        for row in json.loads(path.read_text(encoding="utf-8")):
            number = row["number"]
            if number in records:
                raise ValueError(f"duplicate practical draft {edition} Q{number}")
            records[number] = row
    return records


def prompt(edition: str, questions: list[dict], drafts: list[dict]) -> str:
    payload = [{
        "number": q["number"], "question": q["body"], "officialAnswer": q["modelAnswer"],
        "draft": draft,
    } for q, draft in zip(questions, drafts, strict=True)]
    return (
        f"日本FP協会FP2級実技{edition}の全設問の解法を独立監査する。法令基準日は{SOURCE[edition]['lawReferenceDate']}。"
        "設問本文のOCR、公式模範解答、解説草稿を照合する。公式解答は変更しない。"
        "計算問題は式・単位・端数処理・条件、○×/複数空欄は全小問の理由、数字1〜4選択式は全4肢の理由を監査する。"
        "図表の配置が本文から確定しない、法令の時点差が不明、選択肢の理由が説明不足ならapproved=false。"
        "出典URLは推測・創作しない。JSON配列だけ返す。"
        "各要素はnumber,approved(boolean),issues(文字列配列),suggestedCorrection(文字列),sourceQueries(文字列配列)。"
        "問題と草稿:\n" + json.dumps(payload, ensure_ascii=False)
    )


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
        drafts = load_drafts(edition)
        for offset in range(0, 40, 6):
            questions = data["questions"][offset:offset + 6]
            first, last = questions[0]["number"], questions[-1]["number"]
            target = OUT / f"{edition}-q{first:02d}-{last:02d}.json"
            if target.exists():
                continue
            if any(q["number"] not in drafts for q in questions):
                print(f"deferred {edition} Q{first}-{last}: draft not ready", flush=True)
                continue
            prompt_text = prompt(edition, questions, [drafts[q["number"]] for q in questions])
            for attempt in range(1, 4):
                result = subprocess.run([cli, "-p", "--model", "opus", "--tools", "", "--output-format", "text"],
                                        input=prompt_text, text=True, capture_output=True,
                                        encoding="utf-8", timeout=900, cwd=ROOT)
                if result.returncode:
                    print(f"{edition} Q{first}-{last} attempt {attempt}: CLI {result.returncode}: {result.stderr[-200:]}", flush=True)
                    continue
                try:
                    clean = re.sub(r"\s*```$", "", re.sub(r"^```(?:json)?\s*", "", result.stdout.strip()))
                    rows = json.loads(clean)
                    if [row.get("number") for row in rows] != [q["number"] for q in questions]:
                        raise ValueError("question numbers differ")
                    if any(not isinstance(row.get("approved"), bool) or not isinstance(row.get("issues"), list)
                           or not isinstance(row.get("sourceQueries"), list) for row in rows):
                        raise ValueError("incomplete review")
                except (ValueError, json.JSONDecodeError) as error:
                    print(f"{edition} Q{first}-{last} attempt {attempt}: {error}", flush=True)
                    continue
                target.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
                print(f"reviewed {edition} Q{first}-{last}; flagged {sum(not row['approved'] for row in rows)}", flush=True)
                break
            else:
                raise RuntimeError(f"Could not review {edition} Q{first}-{last}")


if __name__ == "__main__":
    main()
