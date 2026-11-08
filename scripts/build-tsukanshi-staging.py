"""Build the unpublished 通関士 staging set (第59回) and check it against the official answers.

Inputs (data/qualification-staging/tsukanshi/):
  sources/transcription-59.json   Official question text (pdftotext -layout of the customs PDFs,
                                  whitespace removed, tables re-typed as Markdown) and official answers.
  official-answers.json           Official answer table (59shiken_seikai.pdf), checked visually.
  editorial/59-<session>.json     Original explanations written by 過去問AI.
Output:
  2025.json                       One record per answer unit (語群の空欄ごと / 原問ごと).

Usage: python scripts/build-tsukanshi-staging.py [--check] [--session=<session>]
  --session verifies one session file without writing output.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "data" / "qualification-staging" / "tsukanshi"
KEYS = list("アイウエオカキクケコサシスセソ")
BLANKS = list("イロハニホ")
SESSIONS = {"通関業法": "tsukan-law", "関税法等": "customs-law", "通関実務": "tsukan-practical"}
PDF = {"通関業法": "01", "関税法等": "02", "通関実務": "03"}
LAST_UPDATED = "2026-11-06"
LAW_NOTE = "解説は第59回通関士試験（2025年10月5日実施）の出題時点の法令・通達に基づき過去問AIが独自に作成したもので、税関の解説ではありません。"

errors: list[str] = []


def fail(where: str, msg: str) -> None:
    errors.append(f"{where}: {msg}")


def load(p: Path):
    return json.loads(p.read_text(encoding="utf-8"))


def kind_of(x: dict) -> str:
    if len(x["choices"]) == 15:
        return "bank"
    if not x["choices"]:
        return "numeric"
    return "multi" if "すべてを選び" in x["stem"] else "single"


def build(only: str | None, check: bool) -> int:
    transcripts = load(BASE / "sources" / "transcription-59.json")
    official = load(BASE / "official-answers.json")["59"]
    eds: dict[tuple[str, int], dict] = {}
    for f in sorted((BASE / "editorial").glob("59-*.json")):
        for item in load(f)["questions"]:
            eds[(f.stem[3:], item["number"])] = item
    records = []
    for x in transcripts:
        subj, n = x["subject"], x["number"]
        session = SESSIONS[subj]
        if only and session != only:
            continue
        where = f"第59回 {subj} 第{n}問"
        ans = x["officialAnswers"]
        if official[subj][str(n)] != ans:
            fail(where, f"transcription answers {ans} != official {official[subj][str(n)]}")
        ed = eds.get((session, n))
        if ed is None:
            fail(where, "editorial missing")
            continue
        kind = kind_of(x)
        overview = (ed.get("overview") or "").strip()
        if len(overview) < 20:
            fail(where, "overview missing")
        refs = ed.get("references") or []
        if not refs:
            fail(where, "references missing")
        base = {
            "exam": "tsukanshi", "session": session, "year": 2025, "season": "annual", "qNumber": n,
            "subject": subj, "category": subj, "topicTags": [subj] + [t for t in ed.get("topicTags", []) if t != subj],
            "difficulty": ed.get("difficulty", 3), "hasImage": False,
            "sourcePdfUrl": f"https://www.customs.go.jp/tsukanshi/59_shiken/20251005tukanshi{PDF[subj]}.pdf",
            "sourceAnswerUrl": "https://www.customs.go.jp/tsukanshi/59_shiken/59shiken_seikai.pdf",
            "sourceAttribution": f"出典：税関 第59回通関士試験（2025年）{subj} 第{n}問・同正答及び配点。問題文の空白・表組み・解答表示を過去問AIが加工。解説は過去問AIの独自作成で税関とは関係ありません。",
            "license": "CUSTOMS-attributed", "publicAllowed": False, "explanationCoverage": "full",
            "lastUpdated": LAST_UPDATED, "lawReferenceDate": "2025-10-05",
            "officialReferenceUrls": ["https://www.customs.go.jp/tsukanshi/59_shiken.htm"], "references": refs,
        }
        stem = x["stem"]
        if kind == "bank":
            bex = ed.get("blankExplanations", {})
            word_of = {str(i + 1): w for i, w in enumerate(x["choices"].values())}
            answer_blank = {a: BLANKS[i] for i, a in enumerate(ans)}
            for i, b in enumerate(BLANKS):
                if len((bex.get(b) or "").strip()) < 20:
                    fail(where, f"blank explanation missing for {b}")
                    continue
                correct = ans[i]
                cex = {}
                for num, word in word_of.items():
                    key = KEYS[int(num) - 1]
                    if num == correct:
                        cex[key] = f"正解。{bex[b].strip()}"
                    elif num in answer_blank:
                        cex[key] = f"「{word}」は空欄（{answer_blank[num]}）に入る語句。空欄（{b}）には「{word_of[correct]}」が入る。{bex[b].strip()}"
                    else:
                        cex[key] = f"「{word}」はこの問題のどの空欄にも入らない。空欄（{b}）には「{word_of[correct]}」が入る。{bex[b].strip()}"
                rec = dict(base)
                rec.update({
                    "id": f"tsukanshi-2025-annual-{session}-q{n}-{i + 1}", "part": str(i + 1), "type": "multiple-choice",
                    "officialQuestionLabel": f"第{n}問（{b}）", "question": stem,
                    "questionNotice": f"原問の空欄「{b}」を解答してください。語群①〜⑮は画面で1〜15と表示します。",
                    "choices": {KEYS[int(k) - 1]: v for k, v in x["choices"].items()},
                    "answer": KEYS[int(correct) - 1], "officialAnswerNumber": correct,
                    "choiceExplanations": cex,
                    "explanation": f"{overview}\n\n空欄（{b}）：「{word_of[correct]}」（公式番号{correct}）。{bex[b].strip()}\n\n{LAW_NOTE}",
                })
                records.append(rec)
            continue
        if kind == "numeric":
            calc = (ed.get("calculation") or "").strip()
            if str(int(ans[0])) not in calc.replace(",", "").replace("，", ""):
                fail(where, f"calculation does not reach the official answer {int(ans[0])}")
            rec = dict(base)
            rec.update({
                "id": f"tsukanshi-2025-annual-{session}-q{n}", "type": "numeric", "question": stem,
                "officialQuestionLabel": f"第{n}問", "answer": str(int(ans[0])), "officialAnswerNumber": ans[0],
                "numericAnswer": {"format": "integer", "unit": "円"}, "isCalculation": True,
                "explanation": f"{overview}\n\n{calc}\n\n公式正答は「{ans[0]}」（解答欄の桁に合わせた表記）。\n\n{LAW_NOTE}",
            })
            records.append(rec)
            continue
        oex = ed.get("optionExplanations", {})
        sel = ed.get("optionSelected", {})
        for k in "12345":
            if len((oex.get(k) or "").strip()) < 20:
                fail(where, f"option explanation missing for {k}")
            if k not in sel:
                fail(where, f"optionSelected missing for {k}")
        chosen = sorted(k for k, v in sel.items() if v)
        want = sorted(a for a in ans if a != "0")
        if chosen != want:
            fail(where, f"optionSelected {chosen} != official {ans}")
        choices = {KEYS[int(k) - 1]: v for k, v in x["choices"].items()}
        cex = {KEYS[int(k) - 1]: oex.get(k, "").strip() for k in "12345"}
        stmt_lines = "\n".join(f"記述{k}：{oex.get(k, '').strip()}" for k in "12345")
        rec = dict(base)
        rec.update({"id": f"tsukanshi-2025-annual-{session}-q{n}", "type": "multiple-choice", "question": stem,
                    "officialQuestionLabel": f"第{n}問"})
        if kind == "multi":
            rec.update({"choices": choices, "answer": [KEYS[int(a) - 1] for a in want], "requiredSelections": len(want),
                        "officialAnswerNumber": ",".join(ans),
                        "questionNotice": f"原問は「すべてを選び」の形式です。この画面では正解の数（{len(want)}つ）を示して選択します。"})
        else:
            choices["カ"] = "０（該当する記述がない場合）"
            if ans == ["0"]:
                cex["カ"] = "正解。問いの条件に当てはまる記述が一つもないため「０」をマークする。"
            else:
                cex["カ"] = f"不正解。記述{ans[0]}が問いの条件に当てはまるため「０」には当たらない。"
            rec.update({"choices": choices, "answer": "カ" if ans == ["0"] else KEYS[int(ans[0]) - 1],
                        "officialAnswerNumber": ans[0],
                        "questionNotice": "原文の指示に従い、該当するものがない場合の解答番号0も選択できます。"})
        rec["choiceExplanations"] = cex
        rec["explanation"] = f"{overview}\n\n{stmt_lines}\n\n{LAW_NOTE}"
        records.append(rec)
    if only:
        return len(records)
    out = BASE / "2025.json"
    text = json.dumps(records, ensure_ascii=False, indent=1) + "\n"
    if check:
        if not out.exists() or out.read_text(encoding="utf-8") != text:
            fail("2025.json", "stale; rerun the build")
    else:
        out.write_text(text, encoding="utf-8")
    return len(records)


def main() -> int:
    only = next((a.split("=", 1)[1] for a in sys.argv if a.startswith("--session=")), None)
    n = build(only, "--check" in sys.argv)
    for e in errors:
        print("ERROR", e)
    print("records", n, "errors", len(errors))
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
