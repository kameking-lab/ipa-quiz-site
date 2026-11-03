"""Build local, non-public original-versus-draft review pages for every paper.

The review pages are an aid to human verification. They do not grant approval or
change the public question registry.
"""

from collections import Counter
from html import escape
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REVIEW = ROOT / "data/raw_pdfs/denko2/review"
BATCHES = REVIEW / "batches"
LABELS = ("イ", "ロ", "ハ", "ニ")


def load_paper(paper: str) -> list[tuple[dict, dict | None]]:
    rows: list[tuple[dict, dict | None]] = []
    for batch_path in sorted(BATCHES.glob(f"{paper}-q??-??.json")):
        batch = json.loads(batch_path.read_text(encoding="utf-8"))
        drafts = {}
        draft_paths = sorted(batch_path.parent.glob(batch_path.stem + "-vision-part[0-9][0-9].json"))
        if not draft_paths:
            draft_paths = [batch_path.with_name(batch_path.stem + "-draft.json")]
        for draft_path in draft_paths:
            if not draft_path.exists():
                continue
            try:
                drafts.update({
                    item["number"]: item
                    for item in json.loads(draft_path.read_text(encoding="utf-8"))
                })
            except (ValueError, KeyError, TypeError):
                pass
        rows.extend((original, drafts.get(original["number"])) for original in batch["questions"])
    return rows


def block(title: str, text: str) -> str:
    return f"<div class='block'><b>{escape(title)}</b><p>{escape(text)}</p></div>"


def render(paper: str, rows: list[tuple[dict, dict | None]]) -> tuple[str, Counter]:
    counts = Counter(total=len(rows))
    sections = []
    for original, draft in rows:
        number = original["number"]
        crop = ROOT / original["reviewCrop"]
        image_url = crop.relative_to(REVIEW).as_posix()
        original_answer = original["officialAnswer"]
        issues = []
        if draft is None:
            issues.append("下書きなし")
            counts["draft_missing"] += 1
        else:
            counts["draft_present"] += 1
            if draft.get("officialAnswer") != original_answer:
                issues.append("公式正答と下書きが不一致")
                counts["wrong_answer"] += 1
            if draft.get("uncertainty"):
                issues.append(f"欠損・不確実: {draft['uncertainty']}")
                counts["uncertain"] += 1
            for label in LABELS:
                if not draft.get("choices", {}).get(label):
                    issues.append(f"{label} の選択肢が空")
                    counts["empty_choice"] += 1
                if not draft.get("choiceExplanations", {}).get(label):
                    issues.append(f"{label} の解説が空")
                    counts["empty_explanation"] += 1
        if original["needsVisualReview"]:
            issues.append("抽出で図・写真・記号が欠落した可能性")
            counts["visual_flag"] += 1
        draft_blocks = "<p>非公開下書きなし</p>"
        if draft is not None:
            choices = "".join(
                block(f"{label} 選択肢", str(draft.get("choices", {}).get(label, "")))
                + block(f"{label} 解説", str(draft.get("choiceExplanations", {}).get(label, "")))
                for label in LABELS
            )
            draft_blocks = (
                block("清書問題文", str(draft.get("question", "")))
                + block("総合解説", str(draft.get("explanation", "")))
                + "<div class='choices'>" + choices + "</div>"
            )
        issue_html = "".join(f"<li>{escape(issue)}</li>" for issue in issues)
        sections.append(
            f"<section id='q{number}'><h2>問{number}　公式正答: {original_answer}</h2>"
            + f"<img class='original' src='{escape(image_url)}' alt='公式問題 問{number}'>"
            + f"<ul class='issues'>{issue_html or '<li>自動フラグなし。全問で原本照合が必要。</li>'}</ul>"
            + draft_blocks + "</section>"
        )
    html = f"""<!doctype html><html lang='ja'><meta charset='utf-8'>
<title>二電工 {paper} 原本照合（非公開）</title>
<style>
body{{font-family:system-ui,sans-serif;max-width:1200px;margin:1.5rem auto;padding:0 1rem;color:#1a2633}}
nav{{position:sticky;top:0;background:#fff;padding:.7rem;border-bottom:1px solid #b9c8d7}}
nav a{{margin-right:.6rem}}section{{border-bottom:3px solid #bac8d7;padding:1rem 0 2rem}}
.original{{display:block;width:100%;height:auto;border:1px solid #778ca3;background:white}}
.issues{{background:#fff3d6;padding:1rem 1rem 1rem 2rem}}
.block{{border:1px solid #d5dce5;padding:.45rem;margin:.3rem 0;min-width:0}}
.block p{{white-space:pre-wrap;margin:.3rem 0}}
.choices{{display:grid;grid-template-columns:1fr 1fr;gap:.4rem}}
@media(max-width:700px){{.choices{{grid-template-columns:1fr}}}}
</style>
<h1>第二種電気工事士 {paper} 原本照合</h1>
<p>非公開レビュー用。公式画像で問題文・4肢・正答・理由を全件照合するまで公開しない。</p>
<nav>{''.join(f'<a href="#q{n}">{n}</a>' for n in range(1, len(rows)+1))}</nav>
{''.join(sections)}</html>"""
    return html, counts


def main() -> None:
    papers = sorted({path.name[:8] for path in BATCHES.glob("*-q??-??.json")})
    for paper in papers:
        html, counts = render(paper, load_paper(paper))
        output = REVIEW / f"{paper}-review.html"
        output.write_text(html, encoding="utf-8")
        print(f"{paper}: {dict(counts)} -> {output}")


if __name__ == "__main__":
    main()
