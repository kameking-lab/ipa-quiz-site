"""Independent first-party Opus review of Denken 2 reviewed rows against the official pages.

For each question file under data/questions/denken2/reviewed/, render the pinned
official question pages and the official answer sheet, send them together with
the candidate rows to claude-opus-5-5 (tools disabled), and store a receipt that
pins the candidate canonical hashes, the PDF hashes and the rendered page hashes.

Usage: py -3.12 scripts/denken2-review.py [--only 20260830-law-q01 ...] [--force]
"""

from __future__ import annotations

import argparse
from hashlib import sha256
import json
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent))
import denken3_cli  # noqa: E402  (generic Opus-only CLI wrapper)

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts/denken2-source-manifest.json"
REVIEWED = ROOT / "data/questions/denken2/reviewed"
INPUT = ROOT / "docs/evidence/denken2/input"
RECEIPTS = ROOT / "docs/evidence/denken2/receipts"
RAW = ROOT / "docs/evidence/denken2/raw"
PAGES = ROOT / "data/raw_pdfs/denken2/pages"
ISSUES = ("textIssues", "choiceIssues", "answerIssues", "explanationIssues", "figureIssues", "sourceIssues")


def digest(data: bytes) -> str:
    return sha256(data).hexdigest()


def canonical(row: dict) -> str:
    return digest(json.dumps(row, ensure_ascii=False, sort_keys=True).encode("utf-8"))


def unit_key(row: dict) -> str:
    return f"q{row['questionNumber']:02}-{row['blank']}"


def pinned_pdf(url: str, expected: str) -> Path:
    path = INPUT / url.rsplit("/", 1)[1]
    if not path.is_file() or digest(path.read_bytes()) != expected:
        raise FileNotFoundError(f"pinned PDF missing or changed: {path}")
    return path


def render(pdf: Path, page: int) -> Path:
    import fitz
    target = PAGES / pdf.stem / f"p{page:02}.png"
    with fitz.open(pdf) as document:
        denken3_cli.render_page(document, page - 1, target)
    return target


def build_request(rows: list[dict], official: list[str], images: list[tuple[str, Path]], subject_label: str,
                  reference_date: str | None) -> dict:
    content: list[dict] = []
    for label, path in images:
        content.append({"type": "text", "text": label})
        content.append(denken3_cli.image_block(path))
    for row in rows:
        for url in row.get("figureUrls") or []:
            content.append({"type": "text", "text": f"公開用に切り出した図 {url}（{unit_key(row)} ほか同じ大問で共用）"})
            content.append(denken3_cli.image_block(ROOT / "public" / url.lstrip("/")))
            break
        else:
            continue
        break
    units = [{"unitKey": unit_key(row), **{k: row[k] for k in (
        "question", "choices", "officialAnswer", "explanation", "choiceExplanations", "figureUrls",
        "figureDescription", "officialReferenceUrls", "lawReferenceDate", "sourceAttribution")}} for row in rows]
    instructions = f"""あなたは電気主任技術者試験の過去問データの独立査読者です。添付は一般財団法人電気技術者試験センターが公表した
令和8年度（2026年8月30日実施）第二種電気主任技術者一次試験 {subject_label} の問題冊子の該当頁と，同試験の公式解答（全科目の表）です。
候補データは問{rows[0]['questionNumber']}の各空欄を1解答単位（unitKey=qNN-空欄番号）として作成したものです。
公式解答表の{subject_label}列から読み取った正答（manifest固定）: {json.dumps(official, ensure_ascii=False)}（空欄(1)〜(5)の順）。
{('法規の基準日は問題冊子の注3のとおり ' + reference_date + ' 現在の法令です。' ) if reference_date else ''}

各解答単位について次を厳格に照合してください。
1. textIssues: question の問題文が原本と語句・数値・記号・空欄番号の位置まで一致しているか（句読点の全角化，改行，［(n)］表記，末尾の「空欄(n)に当てはまる…」の付記，図の文字説明の追加は整形として許容）。
2. choiceIssues: choices が原本の解答群15個と記号(イ)〜(ヨ)の対応・語句まで一致しているか。
3. answerIssues: officialAnswer が公式解答表の該当欄と一致し，かつ問題文の内容として妥当か。
4. explanationIssues: explanation と choiceExplanations の15肢すべてが技術的・法令上正しく，正答肢を正しい理由で説明し，誤答肢ごとに当てはまらない理由を誤りなく述べているか。条文番号や数値の誤り，基準日時点で効力のない規定の記述，根拠のない断定があれば指摘。
5. figureIssues: figureUrls の図が原本の図と一致し欠けがないか，figureDescription が図と矛盾しないか（図のない問では空でよい）。
6. sourceIssues: sourceAttribution・officialReferenceUrls が不適切でないか。

問題がなければ PASS，一つでも修正が必要なら FIX とし，各 Issues 配列に具体的な修正内容を日本語で書いてください。
出力は次のJSONのみ: {{"assessment": [{{"unitKey": "q01-1", "status": "PASS", "textIssues": [], "choiceIssues": [], "answerIssues": [], "explanationIssues": [], "figureIssues": [], "sourceIssues": []}}, ...]}}

候補データ:
{json.dumps(units, ensure_ascii=False, indent=1)}"""
    content.append({"type": "text", "text": instructions})
    return {"type": "user", "message": {"role": "user", "content": content}}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", nargs="*", default=None)
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--effort", default="high")
    args = parser.parse_args()
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    session = manifest["sessions"][0]
    answer_pdf = pinned_pdf(session["officialAnswer"]["url"], session["officialAnswer"]["sha256"])
    answer_page = render(answer_pdf, 1)
    papers = {paper["subject"]: paper for paper in session["subjects"]}
    RECEIPTS.mkdir(parents=True, exist_ok=True)
    for path in sorted(REVIEWED.glob("*.json")):
        stem = path.stem
        if args.only and stem not in args.only:
            continue
        rows = json.loads(path.read_text(encoding="utf-8"))
        subject = rows[0]["subject"]
        paper = papers[subject]
        number = rows[0]["questionNumber"]
        unit = next(q for q in paper["questions"] if q["question"] == number)
        receipt_path = RECEIPTS / f"{stem}-opus.json"
        hashes = {unit_key(row): canonical(row) for row in rows}
        if receipt_path.exists() and not args.force:
            old = json.loads(receipt_path.read_text(encoding="utf-8"))
            if old["inputHashes"]["candidateSha256"] == hashes and all(a["status"] == "PASS" for a in old["assessment"]):
                print(f"{stem}: current PASS receipt, skip")
                continue
        question_pdf = pinned_pdf(paper["url"], paper["sha256"])
        pages = [(f"問題冊子 {paper['label']} PDF第{page}頁", render(question_pdf, page)) for page in rows[0]["reviewedFromPage"]]
        images = pages + [("公式解答（全科目）", answer_page)]
        request = build_request(rows, unit["blanks"], images, paper["label"], session.get("lawReferenceDate") if subject == "law" else None)
        stdout, usage, result = denken3_cli.run(request, args.effort, 1800)
        parsed = denken3_cli.extract_json(result, "{")
        assessment = parsed["assessment"]
        if sorted(a["unitKey"] for a in assessment) != sorted(hashes):
            raise ValueError(f"{stem}: assessment keys {[a['unitKey'] for a in assessment]} != {sorted(hashes)}")
        attempt = 1 + len(list(RAW.glob(f"{stem}-opus-raw-*.jsonl")))
        raw_path = RAW / f"{stem}-opus-raw-{attempt}.jsonl"
        raw_path.parent.mkdir(parents=True, exist_ok=True)
        raw_path.write_bytes(stdout.encode("utf-8"))
        receipt = {
            "reviewedFile": path.relative_to(ROOT).as_posix(),
            "resolvedModel": denken3_cli.MODEL,
            "modelUsage": usage,
            "effort": args.effort,
            "rawResponse": raw_path.relative_to(ROOT).as_posix(),
            "rawResponseSha256": digest(stdout.encode("utf-8")),
            "inputHashes": {
                "candidateSha256": hashes,
                "questionPdfSha256": paper["sha256"],
                "answerPdfSha256": session["officialAnswer"]["sha256"],
                "renderedPageSha256": {f"{p.parent.name}/{p.name}": digest(p.read_bytes()) for _, p in images},
                "officialBlanks": unit["blanks"],
            },
            "assessment": assessment,
        }
        receipt_path.write_text(json.dumps(receipt, ensure_ascii=False, indent=1) + "\n", encoding="utf-8", newline="\n")
        statuses = {a["unitKey"]: a["status"] for a in assessment}
        print(stem, statuses)
        for a in assessment:
            for name in ISSUES:
                for issue in a.get(name) or []:
                    print(f"  {a['unitKey']} {name}: {issue}")


if __name__ == "__main__":
    main()
