"""Promote independently PASSed private rows and diagram crops into versioned data.

This is deliberately a per-question gate. A whole-paper receipt and the global
320-unit gate are separate and remain closed until every question passes.
"""

from hashlib import sha256
import json
from pathlib import Path
import shutil
import sys


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts/denken3-source-manifest.json"
SPECS = ROOT / "scripts/denken3-figure-crops.json"
PRIVATE = ROOT / "data/raw_pdfs/denken3/review"
REVIEWED = ROOT / "data/questions/denken3/reviewed"
PUBLIC = ROOT / "public/images/denken3"
EVIDENCE = ROOT / "docs/evidence/denken3/partial"
GENERATION = ROOT / "docs/evidence/denken3/generation"


def sha(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def current_review(folder: Path, number: int, draft_hash: str, figure_hashes: dict[str, str]) -> tuple[Path, dict]:
    candidates = []
    for path in folder.glob("q*-opus-review.json"):
        receipt = json.loads(path.read_text(encoding="utf-8"))
        item = next((row for row in receipt.get("assessment", []) if row.get("number") == number), None)
        if item is not None:
            candidates.append((path.stat().st_mtime_ns, path, receipt, item))
    if not candidates:
        raise ValueError(f"No independent review: {folder} q{number}")
    _, path, receipt, assessment = max(candidates, key=lambda item: item[0])
    usage = (receipt.get("modelUsage") or {}).get("claude-opus-5-5") or {}
    raw_path = path.with_name(f"{path.stem}-raw.jsonl")
    if (receipt.get("resolvedModel") != "claude-opus-5-5" or
            usage.get("canonicalModel") != "claude-opus-5-5" or usage.get("provider") != "firstParty" or
            not raw_path.is_file() or sha(raw_path) != receipt.get("rawResponseSha256")):
        raise ValueError(f"Cannot prove exact Opus review/raw response: {path}")
    if assessment["status"] != "PASS":
        raise ValueError(f"Latest independent review is not PASS: {path} q{number}")
    if receipt["draftSha256"][str(number)] != draft_hash:
        raise ValueError(f"Draft changed after independent review: {folder} q{number}")
    for key, value in figure_hashes.items():
        if receipt.get("figureSha256", {}).get(key) != value:
            raise ValueError(f"Figure changed/unreviewed: {folder} q{number} {key}")
    return path, assessment


def promote(date: str, subject: str, numbers: list[int]) -> None:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    specs = json.loads(SPECS.read_text(encoding="utf-8"))
    session = next(item for item in manifest["sessions"] if item["examDate"].replace("-", "") == date)
    paper = next(item for item in session["subjects"] if item["subject"] == subject)
    folder = PRIVATE / date / subject
    target_folder = REVIEWED
    target_folder.mkdir(parents=True, exist_ok=True)
    asset_folder = PUBLIC / date / subject
    asset_folder.mkdir(parents=True, exist_ok=True)
    rows = []
    proofs = []
    for number in numbers:
        draft_path = folder / f"q{number:02}-vision-draft.json"
        draft = json.loads(draft_path.read_text(encoding="utf-8"))
        official = [item for item in paper["answerUnits"] if item["question"] == number]
        figures = [item for item in specs if item["examDate"] == date and item["subject"] == subject
                   and item["questionNumber"] == number]
        figure_hashes = {item["id"]: sha(folder / "figures" / f"{item['id']}.png") for item in figures}
        receipt_path, assessment = current_review(folder, number, sha(draft_path), figure_hashes)
        if len(draft["units"]) != len(official):
            raise ValueError(f"Answer-unit count differs: {date} {subject} q{number}")
        copied = {}
        for item in figures:
            source = folder / "figures" / f"{item['id']}.png"
            destination = asset_folder / source.name
            if destination.exists() and sha(destination) != sha(source):
                raise ValueError(f"Existing published asset differs: {destination}")
            shutil.copyfile(source, destination)
            copied[item["id"]] = "/" + str(destination.relative_to(ROOT / "public")).replace("\\", "/")
        for candidate in draft["units"]:
            answer = next(item for item in official if item["part"] == candidate.get("part"))
            if candidate["officialAnswer"] != answer["answer"]:
                raise ValueError(f"Wrong official answer: {date} {subject} q{number}")
            row = dict(candidate)
            row["questionNumber"] = number
            row["fiscalYear"] = session["fiscalYear"]
            row["term"] = session["term"]
            row["examDate"] = session["examDate"]
            row["subject"] = subject
            row["scoringPoints"] = answer["points"]
            row["sourceAttribution"] = f"出典：令和{session['fiscalYear'] - 2018}年度{'上期' if session['term'] == 'upper' else '下期'}第三種電気主任技術者試験 {paper['label']}科目 問{number}" + (f"({row['part']})" if row["part"] else "") + "。問題文・選択肢を読みやすく整形。"
            row["figureUrls"] = [copied[item["id"]] for item in figures
                                 if "choice-" not in item["id"] and item.get("part") in (None, row["part"])]
            row["choiceFigureUrls"] = {item["id"].rsplit("choice-", 1)[-1]: copied[item["id"]]
                                      for item in figures if "choice-" in item["id"]}
            row["needsReview"] = False
            rows.append(row)
        mirror = GENERATION / date / subject
        mirror.mkdir(parents=True, exist_ok=True)
        # Tracked copies of the Opus generation/review receipts (modelUsage, raw SHA, revision chain).
        shutil.copyfile(draft_path, mirror / draft_path.name)
        shutil.copyfile(receipt_path, mirror / receipt_path.name)
        proofs.append({"number": number, "sourceDraftSha256": sha(draft_path),
                       "opusReceipt": str(receipt_path.relative_to(ROOT)).replace("\\", "/"),
                       "opusReceiptSha256": sha(receipt_path), "assessment": assessment,
                       "figureSha256": figure_hashes})
    first, last = min(numbers), max(numbers)
    if numbers != list(range(first, last + 1)):
        raise ValueError("Promote a contiguous question range")
    target = target_folder / f"{date}-{subject}-q{first:02}-{last:02}.json"
    evidence = EVIDENCE / f"{date}-{subject}-q{first:02}-{last:02}.json"
    if target.exists() or evidence.exists():
        raise FileExistsError("Accepted rows are immutable; use a deliberate correction revision")
    target.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    evidence.parent.mkdir(parents=True, exist_ok=True)
    evidence.write_text(json.dumps({"status": "partial-accepted", "date": date, "subject": subject,
                                    "questionCount": len(numbers), "answerUnitCount": len(rows),
                                    "choiceCount": len(rows) * 5, "sourceQuestionPdfSha256": paper["sha256"],
                                    "sourceAnswerPdfSha256": session["officialAnswer"]["sha256"],
                                    "reviewedDataSha256": sha(target), "questions": proofs},
                                   ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{target.name}: {len(numbers)} questions / {len(rows)} units / {len(rows)*5} choices partial-accepted")


def main() -> None:
    if len(sys.argv) < 4:
        raise SystemExit(__doc__)
    promote(sys.argv[1], sys.argv[2], [int(item) for item in sys.argv[3:]])


if __name__ == "__main__":
    main()
