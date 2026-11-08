"""Build and verify the unpublished staging sets for 司法試験・予備試験 短答式.

Inputs (per slug = shiho-tanto | yobi-tanto):
  data/qualification-staging/<slug>/sources/<year>-<subject>.json
      Text layer of the official MOJ question PDF split per question, with the
      official answers (by answer-sheet No.) parsed from the official answer PDF.
  data/qualification-staging/<slug>/editorial/<year>-<subject>.json
      Transcription structure and original explanations written by 過去問AI.

Output:
  data/qualification-staging/<slug>/<year>.json  (one record per answer-sheet unit)

Every printed text in the editorial file (stem, statements, options) must be a
whitespace-insensitive substring of the official text layer. Answers always come
from the official answer table, never from the editorial file; the editorial
truth judgments are cross-checked against them.

Usage: python scripts/build-moj-tanto-staging.py [--check] [--subject=<slug>:<year>-<subject>]
  --subject verifies one subject without writing any output (safe for parallel authors).
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STAGING = ROOT / "data" / "qualification-staging"
SLUGS = ["shiho-tanto", "yobi-tanto"]
KEYS = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ", "サ", "シ", "ス", "セ", "ソ", "タ"]
SUBJECT_ORDER = ["constitution", "admin-law", "civil-law", "commercial-law", "civil-procedure", "criminal-law", "criminal-procedure", "liberal-arts"]
EXAM_NAME = {"shiho-tanto": "司法試験", "yobi-tanto": "司法試験予備試験"}
ERA = {2026: "令和8年", 2025: "令和7年"}
LAW_SUBJECTS = {"constitution", "admin-law", "civil-law", "commercial-law", "civil-procedure", "criminal-law", "criminal-procedure"}
LAST_UPDATED = "2026-11-06"

errors: list[str] = []
warnings: list[str] = []


def z2h(s: str) -> str:
    return s.translate(str.maketrans("０１２３４５６７８９", "0123456789"))


def norm(s: str) -> str:
    s = re.sub(r"\s+", "", s)
    s = re.sub(r"［(?:No\.|№|Ｎｏ．)[０-９0-9]+］", "", s)
    s = re.sub(r"（解答欄は[^）]*）", "", s)
    s = s.replace("〇", "○")
    return s


def fail(where: str, msg: str) -> None:
    errors.append(f"{where}: {msg}")


def warn(where: str, msg: str) -> None:
    warnings.append(f"{where}: {msg}")


def load(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def load_editorial(slug: str, year: int, subject: str) -> dict | None:
    """Merge editorial/<year>-<subject>.json and any <year>-<subject>.part*.json."""
    folder = STAGING / slug / "editorial"
    files = sorted(folder.glob(f"{year}-{subject}.json")) + sorted(folder.glob(f"{year}-{subject}.part*.json"))
    if not files:
        return None
    merged: dict = {"questions": [], "excluded": []}
    for f in files:
        data = load(f)
        merged["questions"].extend(data.get("questions", []))
        merged["excluded"].extend(data.get("excluded", []))
    qs = [x["q"] for x in merged["questions"]]
    dup = sorted({q for q in qs if qs.count(q) > 1})
    if dup:
        fail(f"{slug} {year}-{subject}", f"question written twice across editorial files: {dup}")
    return merged


def resolve(slug: str, year: int, subject: str, q: int, seen=None):
    seen = seen or set()
    key = (slug, year, subject, q)
    if key in seen:
        raise ValueError(f"sameAs cycle at {key}")
    seen.add(key)
    ed = load_editorial(slug, year, subject) or {"questions": []}
    item = next((x for x in ed["questions"] if x["q"] == q), None)
    if item is None:
        raise KeyError(f"editorial missing {key}")
    if "sameAs" in item:
        ref = item["sameAs"]
        return resolve(ref["exam"], ref["year"], ref["subjectSlug"], ref["q"], seen)
    return item


def verbatim(where: str, text: str, raw_norm: str) -> None:
    if not text or not text.strip():
        fail(where, "empty printed text")
        return
    if norm(text) not in raw_norm:
        fail(where, f"not verbatim in official text: {text[:40]}…")


def parse_marks(option: str) -> dict[str, bool] | None:
    pairs = re.findall(r"([ア-オ])\s*([○〇×])", option)
    if len(pairs) < 2:
        return None
    return {k: v in "○〇" for k, v in pairs}


def build_unit_records(slug: str, year: int, subject_slug: str, packet: dict, src: dict, ed: dict) -> list[dict]:
    where = f"{slug} {year} {subject_slug} 第{src['q']}問"
    raw_norm = norm(src["raw"])
    fmt = ed.get("format")
    nos = src["nos"]
    official = [str(src["officialAnswers"][str(n)]) for n in nos]
    statements = ed.get("statements", [])
    labels = [s["label"] for s in statements]
    if len(set(labels)) != len(labels):
        fail(where, "duplicate statement labels")
    verbatim(where + " stem", ed.get("stem", ""), raw_norm)
    for s in statements:
        verbatim(f"{where} 記述{s['label']}", s["text"], raw_norm)
    st_ex = ed.get("statementExplanations", {})
    for lab in labels:
        if len((st_ex.get(lab) or "").strip()) < 25:
            fail(where, f"statement explanation missing/short for {lab}")
    if subject_slug in LAW_SUBJECTS:
        for lab in labels:
            t = st_ex.get(lab, "")
            if not re.search(r"条|判|決定|判例|最高裁|法|学説|見解|説", t):
                warn(where, f"記述{lab} explanation has no legal basis keyword")
    overview = (ed.get("overview") or "").strip()
    if len(overview) < 20:
        fail(where, "overview missing")
    refs = ed.get("references") or []
    if subject_slug in LAW_SUBJECTS and not refs:
        fail(where, "references missing")
    exam_name = EXAM_NAME[slug]
    subject = packet["subject"]
    law_note = (
        f"解説は{ERA[year]}{exam_name}（短答式）の出題時点の法令・判例を前提に過去問AIが独自に作成したもので、法務省の解説ではありません。"
        if subject_slug in LAW_SUBJECTS
        else f"解説は過去問AIが独自に作成したもので、法務省の解説ではありません。"
    )
    attribution = (
        f"出典：法務省 {ERA[year]}{exam_name} 短答式試験問題（{subject}）第{src['q']}問・同正解及び配点。"
        "問題文は公式PDFから文字起こしし、解答欄ごとに設問を分けて表示。解説は過去問AIの独自作成。"
    )
    base = {
        "exam": slug,
        "session": subject_slug,
        "year": year,
        "season": "annual",
        "qNumber": src["q"],
        "subject": subject,
        "category": subject,
        "topicTags": [subject] + [t for t in ed.get("topicTags", []) if t != subject],
        "difficulty": ed.get("difficulty", 3),
        "type": "multiple-choice",
        "hasImage": False,
        "sourcePdfUrl": src["sourcePdfUrl"],
        "sourceAnswerUrl": src["sourceAnswerUrl"],
        "sourceAttribution": attribution,
        "license": "MOJ-attributed",
        "publicAllowed": False,
        "explanationCoverage": "full",
        "lastUpdated": LAST_UPDATED,
        "lawReferenceDate": packet["examDate"],
        "sourcePage": [src["pageStart"], src["pageEnd"]],
        "officialPoints": src["points"],
        "references": refs,
    }
    if ed.get("transcriptionNotes"):
        base["transcriptionNote"] = ed["transcriptionNotes"]
    stem = ed["stem"].strip()
    appendix = (ed.get("appendix") or "").strip()
    if appendix:
        # Printed after the options (e.g. 参照条文); verbatim like the rest.
        verbatim(where + " appendix", appendix, raw_norm)
    # Coverage: nothing printed in the official question may be silently dropped.
    rest = raw_norm
    pieces = [ed.get("stem", ""), appendix] + [s["text"] for s in statements] + [o["text"] for o in ed.get("options", [])]
    for piece in sorted(pieces, key=len, reverse=True):
        if piece:
            rest = rest.replace(norm(piece), "", 1)
    rest = re.sub(r"^〔第[０-９0-9]+問〕（配点：[０-９0-9]+）", "", rest)
    rest = re.sub(r"[１-９0-9]+．|[ア-コ]．|[①-⑳]|[，、。]", "", rest)
    if len(rest) > 12:
        fail(where, f"official text not covered by the transcription: {rest[:60]}…")
    records: list[dict] = []

    if fmt == "per-statement":
        labels_map = ed.get("answerLabels") or {}
        if set(labels_map) != {"1", "2"}:
            fail(where, "answerLabels must define 1 and 2")
        if len(statements) != len(nos):
            fail(where, f"{len(statements)} statements vs {len(nos)} answer Nos")
            return []
        verdicts = ed.get("statementVerdicts", {})
        for i, (s, no, off) in enumerate(zip(statements, nos, official)):
            lab = s["label"]
            if str(verdicts.get(lab)) != off:
                fail(where, f"記述{lab} verdict {verdicts.get(lab)} != official {off} (No.{no})")
            if off not in ("1", "2"):
                fail(where, f"official answer {off} not 1/2")
                continue
            correct = "ア" if off == "1" else "イ"
            wrong = "イ" if correct == "ア" else "ア"
            ex = st_ex.get(lab, "").strip()
            choice_ex = {
                correct: f"正解。{ex}",
                wrong: f"不正解。正解は{off}（{labels_map[off]}）。{ex}",
            }
            rec = dict(base)
            rec.update({
                "id": f"{slug}-{year}-annual-{subject_slug}-q{src['q']}-{i + 1}",
                "part": str(i + 1),
                "officialQuestionLabel": f"第{src['q']}問［No.{no}］",
                "question": f"{stem}\n\n{lab}．{s['text'].strip()}" + (f"\n\n{appendix}" if appendix else ""),
                "questionNotice": f"原問は記述{'・'.join(labels)}を解答欄［No.{nos[0]}］〜［No.{nos[-1]}］で個別に解答します。この設問は記述{lab}（［No.{no}］）です。",
                "choices": {"ア": labels_map["1"], "イ": labels_map["2"]},
                "answer": correct,
                "officialAnswerNumber": off,
                "choiceExplanations": choice_ex,
                "explanation": f"{overview}\n\n記述{lab}：{ex}\n\n{law_note}",
            })
            records.append(rec)
        return records

    options = ed.get("options", [])
    if not options:
        fail(where, "options missing")
        return []
    opt_keys = [o["key"] for o in options]
    if opt_keys != [str(i + 1) for i in range(len(options))]:
        fail(where, f"option keys must be 1..n, got {opt_keys}")
    for o in options:
        verbatim(f"{where} 肢{o['key']}", o["text"], raw_norm)
    opt_ex = ed.get("optionExplanations", {})
    for k in opt_keys:
        if len((opt_ex.get(k) or "").strip()) < 15:
            fail(where, f"option explanation missing/short for {k}")
    key_of = {o["key"]: KEYS[i] for i, o in enumerate(options)}
    truth = ed.get("statementTruth", {})
    question_text = stem
    if statements:
        question_text += "\n" + "\n".join(f"{s['label']}．{s['text'].strip()}" for s in statements)
    if appendix:
        question_text += f"\n\n{appendix}"
    stmt_lines = "\n".join(f"記述{lab}：{st_ex[lab].strip()}" for lab in labels if lab in st_ex)
    explanation = overview + (f"\n\n{stmt_lines}" if stmt_lines else "") + f"\n\n{law_note}"
    rec = dict(base)
    rec.update({
        "id": f"{slug}-{year}-annual-{subject_slug}-q{src['q']}",
        "question": question_text,
        "choices": {key_of[o["key"]]: o["text"].strip() for o in options},
        "choiceExplanations": {key_of[k]: opt_ex[k].strip() for k in opt_keys if k in opt_ex},
        "explanation": explanation,
    })
    if fmt == "single":
        if len(nos) != 1:
            fail(where, f"single format but {len(nos)} Nos")
            return []
        off = official[0]
        if off not in key_of:
            fail(where, f"official answer {off} not among options")
            return []
        rec.update({"answer": key_of[off], "officialAnswerNumber": off, "officialQuestionLabel": f"第{src['q']}問［No.{nos[0]}］"})
        # Consistency between editorial truth and the official option.
        ans_text = next(o["text"] for o in options if o["key"] == off)
        marks = parse_marks(ans_text)
        if marks and truth:
            for k, v in marks.items():
                if k in truth and truth[k] != v:
                    fail(where, f"official option {off} marks {k}={'○' if v else '×'} but statementTruth says {truth[k]}")
        polarity = ed.get("combinationPolarity")  # "true" | "false" | None
        if polarity in ("true", "false") and truth:
            members = re.findall(r"[ア-オ]", ans_text)
            want = polarity == "true"
            for m in members:
                if m in truth and truth[m] != want:
                    fail(where, f"official option {off} includes {m} but statementTruth[{m}]={truth[m]}")
            for lab, v in truth.items():
                if lab not in members and v == want and ed.get("combinationExact", True):
                    warn(where, f"statement {lab} also has truth {v} but is outside official combination {members}")
        if ed.get("countOf") in ("true", "false") and truth:
            want = ed["countOf"] == "true"
            n = sum(1 for v in truth.values() if v == want)
            m = re.search(r"([0-9０-９])\s*個", ans_text)
            if m and int(z2h(m.group(1))) != n:
                fail(where, f"count option {ans_text} but statementTruth gives {n}")
        if truth and not (marks or polarity or ed.get("countOf")) and statements:
            warn(where, "statementTruth given but no automatic consistency rule applied")
    elif fmt == "multi":
        req = ed.get("requiredSelections")
        if req != len(nos):
            fail(where, f"requiredSelections {req} != Nos {len(nos)}")
            return []
        answers = sorted(set(official))
        if len(answers) != len(nos):
            fail(where, f"official answers not distinct: {official}")
        for off in answers:
            if off not in key_of:
                fail(where, f"official answer {off} not among options")
                return []
        truth_opts = ed.get("optionTruth", {})
        selecting = ed.get("selects")  # "true" | "false"
        if truth_opts and selecting in ("true", "false"):
            want = selecting == "true"
            chosen = sorted(k for k, v in truth_opts.items() if v == want)
            if chosen != answers:
                fail(where, f"optionTruth selects {chosen} but official {answers}")
        rec.update({
            "answer": [key_of[a] for a in answers],
            "requiredSelections": req,
            "officialAnswerNumber": "・".join(answers),
            "officialQuestionLabel": f"第{src['q']}問［No.{nos[0]}］〜［No.{nos[-1]}］（順不同）",
            "questionNotice": f"{req}つ選ぶ問題です（原問の解答欄［No.{nos[0]}］〜［No.{nos[-1]}］、順不同）。",
        })
    else:
        fail(where, f"unknown format {fmt}")
        return []
    return [rec]


def build(slug: str, check_only: bool, only: str | None = None) -> int:
    base = STAGING / slug
    src_dir = base / "sources"
    if not src_dir.exists():
        return 0
    by_year: dict[int, list[dict]] = {}
    for sp in sorted(src_dir.glob("*.json")):
        if only and f"{slug}:{sp.stem}" != only:
            continue
        year_s, subject_slug = sp.stem.split("-", 1)
        year = int(year_s)
        packet = load(sp)
        ed_file = load_editorial(slug, year, subject_slug)
        if ed_file is None:
            warn(f"{slug} {sp.stem}", "editorial not written yet; subject skipped")
            continue
        listed = {x["q"] for x in ed_file["questions"]}
        excluded = {x["q"]: x for x in ed_file.get("excluded", [])}
        for src in packet["questions"]:
            q = src["q"]
            if q in excluded:
                continue
            if q not in listed:
                fail(f"{slug} {sp.stem} 第{q}問", "not in editorial and not excluded")
                continue
            ed = resolve(slug, year, subject_slug, q)
            own = next(x for x in ed_file["questions"] if x["q"] == q)
            if "sameAs" in own:
                ref = own["sameAs"]
                ref_packet = load(STAGING / ref["exam"] / "sources" / f"{ref['year']}-{ref['subjectSlug']}.json")
                ref_src = next(x for x in ref_packet["questions"] if x["q"] == ref["q"])
                a = re.sub(r"^〔第[０-９0-9]+問〕", "", norm(src["raw"]))
                b = re.sub(r"^〔第[０-９0-9]+問〕", "", norm(ref_src["raw"]))
                if a != b:
                    fail(f"{slug} {sp.stem} 第{q}問", "sameAs target text differs")
            recs = build_unit_records(slug, year, subject_slug, packet, src, ed)
            if "sameAs" in own:
                for r in recs:
                    r["sharedWith"] = f"{own['sameAs']['exam']}-{own['sameAs']['year']}-{own['sameAs']['subjectSlug']}-q{own['sameAs']['q']}"
            by_year.setdefault(year, []).extend(recs)
    total = 0
    for year, recs in sorted(by_year.items()):
        recs.sort(key=lambda r: (SUBJECT_ORDER.index(r["session"]), r["qNumber"], int(r.get("part", "0"))))
        ids = [r["id"] for r in recs]
        if len(ids) != len(set(ids)):
            fail(f"{slug} {year}", "duplicate ids")
        total += len(recs)
        out = base / f"{year}.json"
        text = json.dumps(recs, ensure_ascii=False, indent=1) + "\n"
        if only:
            continue  # single-subject verification never writes output
        if check_only:
            if not out.exists() or out.read_text(encoding="utf-8") != text:
                fail(f"{slug} {year}", f"{out.name} is stale; rerun the build")
        else:
            out.write_text(text, encoding="utf-8")
    return total


def main() -> int:
    check = "--check" in sys.argv
    only = next((a.split("=", 1)[1] for a in sys.argv if a.startswith("--subject=")), None)
    counts = {slug: build(slug, check, only) for slug in SLUGS}
    for w in warnings:
        print("WARN", w)
    for e in errors:
        print("ERROR", e)
    print("records", counts, "errors", len(errors), "warnings", len(warnings))
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
