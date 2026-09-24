"""Revise one private draft with Opus from the latest review issues (never publishes).

Usage: python scripts/denken3-revise-draft.py 20250323 law 12 [--refs URL[,URL...]] [--note TEXT]

The previous draft and its FIX review are archived under the private tree, and
the new draft records the review it answered plus the Opus receipt that wrote it.
`--refs` attaches SHA-pinned manifest references the model may cite; `--note`
adds an operator-verified hint (e.g. a crop that was replaced) as plain context.
"""

from __future__ import annotations

from hashlib import sha256
import json
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent))
import denken3_cli  # noqa: E402


ROOT = denken3_cli.ROOT
MANIFEST = ROOT / "scripts/denken3-source-manifest.json"
REVIEW = denken3_cli.PRIVATE_RAW
FIGURE_SPECS = ROOT / "scripts/denken3-figure-crops.json"


def sha(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def archive(path: Path, folder: Path, version: int) -> Path:
    target = folder / "archive" / f"{path.stem}-v{version}{path.suffix}"
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists():
        raise FileExistsError(target)
    path.rename(target)
    return target


def main() -> None:
    args = sys.argv[1:]
    refs: list[str] = []
    note = ""
    if "--refs" in args:
        index = args.index("--refs")
        refs = [value for value in args[index + 1].split(",") if value]
        del args[index:index + 2]
    if "--note" in args:
        index = args.index("--note")
        note = args[index + 1]
        del args[index:index + 2]
    if len(args) != 3:
        raise SystemExit(__doc__)
    date, subject, number = args[0], args[1], int(args[2])
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    session = next(item for item in manifest["sessions"] if item["examDate"].replace("-", "") == date)
    paper = next(item for item in session["subjects"] if item["subject"] == subject)
    folder = REVIEW / date / subject
    page_map = json.loads((folder / "question-page-map.json").read_text(encoding="utf-8"))
    draft_path = folder / f"q{number:02}-vision-draft.json"
    review_path = folder / f"q{number:02}-opus-review.json"
    draft = json.loads(draft_path.read_text(encoding="utf-8"))
    review = json.loads(review_path.read_text(encoding="utf-8"))
    if review["draftSha256"].get(str(number)) != sha(draft_path):
        raise ValueError("Latest review does not match the current draft")
    assessment = next(item for item in review["assessment"] if item.get("number") == number)
    if assessment["status"] == "PASS" and not note and not refs:
        raise SystemExit("Current draft already PASS; nothing to revise")
    official = [item for item in paper["answerUnits"] if item["question"] == number]
    specs = json.loads(FIGURE_SPECS.read_text(encoding="utf-8"))
    figures = [item for item in specs if item["examDate"] == date and item["subject"] == subject
               and item["questionNumber"] == number]
    public = {key: value for key, value in draft.items() if key in ("questionNumber", "sharedContext", "units")}
    all_refs = sorted({url for unit in draft["units"] for url in unit.get("officialReferenceUrls", [])} | set(refs))
    prompt = (
        "あなたは第三種電気主任技術者試験の問題データ編集者。添付の試験センター公式問題原図と公式正答を一次資料として、"
        "現行草稿を独立監査の指摘に従って修正し、修正後の完全な草稿JSONオブジェクトだけを出力する。"
        "指摘は鵜呑みにせず原図・正答・計算・添付資料で検証し、正しい指摘は全て反映し、誤った指摘は反映せずuncertaintyに理由を書く。"
        "問題文・数値・単位・(1)〜(5)全肢は原図どおり。公式正答は変更しない。正答肢と各誤答肢固有の理由を全5肢に書く。"
        "図は文字で捏造せず figureDescription に図の範囲とラベルを原図どおり記す。"
        "officialReferenceUrls には添付資料として実際に示されたURLだけを入れ、その資料で確認できる主張だけに使う。"
        "添付資料で確認できない法令・規格上の主張は書かない。uncertainty は未解消の不確実性があれば具体的に書き、なければ『なし』。"
        "出力キーは questionNumber, sharedContext, units。units要素は part, question, choices(1〜5), officialAnswer,"
        "explanation, choiceExplanations(1〜5), figureDescription, officialReferenceUrls, uncertainty。"
    )
    blocks: list[dict] = [{"type": "text", "text": prompt + "\n公式正答単位: " + json.dumps(official, ensure_ascii=False)}]
    for relative in page_map["questions"][str(number)]["images"]:
        blocks += [{"type": "text", "text": f"問{number}の公式PDF {Path(relative).stem}"}, denken3_cli.image_block(ROOT / relative)]
    figure_hashes = {}
    for item in figures:
        path = folder / "figures" / f"{item['id']}.png"
        figure_hashes[item["id"]] = sha(path)
        blocks += [{"type": "text", "text": f"公開用に原図から切り出した図 {item['id']}（{item.get('content', '')}）"},
                   denken3_cli.image_block(path)]
    hashes: dict[str, dict[str, str]] = {}
    blocks += denken3_cli.reference_blocks(all_refs, f"問{number}", hashes)
    blocks.append({"type": "text", "text": "現行草稿: " + json.dumps(public, ensure_ascii=False)})
    blocks.append({"type": "text", "text": "独立監査の指摘: " + json.dumps(assessment, ensure_ascii=False)})
    if note:
        blocks.append({"type": "text", "text": "作業者メモ（原図で確認済みの事実のみ）: " + note})
    request = {"type": "user", "message": {"role": "user", "content": blocks}}
    stdout, model_usage, text = denken3_cli.run(request, "high", 900)
    result = denken3_cli.extract_json(text, "{")
    if result.get("questionNumber") != number or len(result.get("units", [])) != len(official):
        raise ValueError("Revision omitted/added answer units")
    if {(u.get("part"), u.get("officialAnswer")) for u in result["units"]} != {(u["part"], u["answer"]) for u in official}:
        raise ValueError("Revision changed an official answer")
    for unit in result["units"]:
        if set(unit.get("choices", {})) != {"1", "2", "3", "4", "5"} or set(unit.get("choiceExplanations", {})) != {"1", "2", "3", "4", "5"}:
            raise ValueError("Revision lost choices/reasons")
        stale = set(unit.get("officialReferenceUrls", [])) - set(all_refs)
        if stale:
            raise ValueError(f"Revision cited unattached references: {stale}")
        old = next(item for item in draft["units"] if item.get("part") == unit.get("part"))
        unit["needsReview"] = True
        for key in ("sourceQuestionPdfUrl", "sourceAnswerPdfUrl", "reviewedFromPage"):
            unit[key] = old[key]
    version = len(draft.get("revisionHistory", [])) + 1
    raw_out = folder / f"q{number:02}-revise-v{version}-raw.jsonl"
    raw_sha = denken3_cli.save_raw(raw_out, stdout)
    old_draft_sha = sha(draft_path)
    old_review_sha = sha(review_path)
    archived_draft = archive(draft_path, folder, version)
    archived_review = archive(review_path, folder, version)
    review_raw = review_path.with_name(f"{review_path.stem}-raw.jsonl")
    archive(denken3_cli.tracked_raw_path(review_raw), denken3_cli.tracked_raw_path(folder), version)
    archive(review_raw, folder, version)
    for key in ("draftModel", "resolvedModel", "modelUsage", "rawResponseSha256", "inputRequestSha256",
                "sourceQuestionPdfSha256", "sourceAnswerPdfSha256", "sourcePageImageSha256"):
        if key in draft:
            result[key] = draft[key]
    result["revisionHistory"] = draft.get("revisionHistory", []) + [{
        "version": version, "model": denken3_cli.MODEL, "resolvedModel": denken3_cli.MODEL,
        "modelUsage": model_usage, "rawResponseSha256": raw_sha,
        "inputRequestSha256": sha256((json.dumps(request, ensure_ascii=False) + "\n").encode("utf-8")).hexdigest(),
        "previousDraftSha256": old_draft_sha, "previousDraft": archived_draft.relative_to(ROOT).as_posix(),
        "answeredReviewSha256": old_review_sha, "answeredReview": archived_review.relative_to(ROOT).as_posix(),
        "figureSha256": figure_hashes, "referenceHashes": hashes, "operatorNote": note,
    }]
    draft_path.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{date} {subject} q{number}: revised to v{version + 1}", flush=True)


if __name__ == "__main__":
    main()
