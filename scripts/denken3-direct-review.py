"""Run canonical source-aware direct review for selected Denken 3 answer units.

Usage:
  py -3.12 scripts/denken3-direct-review.py 20240818 theory round1 15a 15b 17a
"""

from __future__ import annotations

from base64 import b64encode
from hashlib import sha256
import json
from pathlib import Path
import re
import subprocess
import sys

import fitz


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts/denken3-source-manifest.json"
REVIEWED = ROOT / "data/questions/denken3/reviewed"
PRIVATE = ROOT / "data/raw_pdfs/denken3/review"
ANSWER_DIR = ROOT / "data/raw_pdfs/denken3"
OUT = ROOT / "docs/evidence/denken3/strict"
REFERENCE_MANIFEST = ROOT / "scripts/denken3-reference-manifest.json"
CLI = Path.home() / "AppData/Roaming/npm/claude.cmd"
ISSUES = ("textIssues", "choiceIssues", "answerIssues", "explanationIssues", "figureIssues", "sourceIssues")


def raw_digest(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def canonical(value: object) -> str:
    return sha256(json.dumps(value, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()


def image(path: Path) -> dict:
    return {"type": "image", "source": {"type": "base64", "media_type": "image/png",
            "data": b64encode(path.read_bytes()).decode("ascii")}}


def unit_key(number: int, part: str | None) -> str:
    return f"q{number:02}{part or ''}"


def parse_token(token: str) -> tuple[int, str | None]:
    match = re.fullmatch(r"(?:q)?(\d{1,2})([ab])?", token.lower())
    if not match:
        raise ValueError(f"Invalid unit token: {token}")
    return int(match.group(1)), match.group(2)


def parse_result(stdout: str) -> tuple[list[dict], dict]:
    events = [json.loads(line) for line in stdout.splitlines() if line.startswith("{")]
    final = next((event for event in reversed(events) if event.get("type") == "result"), None)
    if final is None or final.get("is_error"):
        raise ValueError(f"No successful Claude result: {stdout[-1500:]}")
    model_usage = final.get("modelUsage") or {}
    models = [name for name in model_usage if name.startswith("claude-")]
    if models != ["claude-opus-5-5"]:
        raise ValueError(f"Cannot prove requested model from Claude modelUsage: {models}")
    usage = model_usage["claude-opus-5-5"]
    if usage.get("canonicalModel") != "claude-opus-5-5" or not usage.get("provider"):
        raise ValueError(f"Claude modelUsage lacks canonical model/provider: {usage}")
    value = re.sub(r"^```(?:json)?\s*|\s*```$", "", final.get("result", "").strip(), flags=re.I)
    start, end = value.find("["), value.rfind("]")
    if start < 0 or end < start:
        raise ValueError(f"No JSON array: {value[-1500:]}")
    result, _ = json.JSONDecoder().raw_decode(value[start:])
    return result, model_usage


def main() -> None:
    if len(sys.argv) < 5:
        raise SystemExit(__doc__)
    date, subject, round_name = sys.argv[1:4]
    selected = [parse_token(value) for value in sys.argv[4:]]
    selected_keys = [unit_key(*value) for value in selected]
    if len(selected_keys) != len(set(selected_keys)):
        raise ValueError("Duplicate unit token")

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    session = next(item for item in manifest["sessions"] if item["examDate"].replace("-", "") == date)
    paper = next(item for item in session["subjects"] if item["subject"] == subject)
    page_map = json.loads((PRIVATE / date / subject / "question-page-map.json").read_text(encoding="utf-8"))
    candidates: dict[str, dict] = {}
    for path in sorted(REVIEWED.glob(f"{date}-{subject}-q*.json")):
        for item in json.loads(path.read_text(encoding="utf-8")):
            candidates[unit_key(item["questionNumber"], item.get("part"))] = item
    missing = set(selected_keys) - set(candidates)
    if missing:
        raise ValueError(f"Missing reviewed candidates: {sorted(missing)}")
    official = {unit_key(item["question"], item.get("part")): item for item in paper["answerUnits"]}
    if set(selected_keys) - set(official):
        raise ValueError("Selected official answer unit missing")

    selected_candidates = [candidates[key] for key in selected_keys]
    pages: dict[str, str] = {}
    figures: dict[str, str] = {}
    for number, _ in selected:
        for relative in page_map["questions"][str(number)]["images"]:
            path = ROOT / relative
            pages[str(path.relative_to(ROOT)).replace("\\", "/")] = raw_digest(path)
    for candidate in selected_candidates:
        for url in candidate.get("figureUrls", []) + list(candidate.get("choiceFigureUrls", {}).values()):
            path = ROOT / "public" / url.lstrip("/")
            figures[str(path.relative_to(ROOT)).replace("\\", "/")] = raw_digest(path)
    hashes = {
        "candidateSha256": {key: canonical(candidates[key]) for key in selected_keys},
        "officialPageSha256": pages,
        "figureSha256": figures,
        "sourceQuestionPdfSha256": paper["sha256"],
        "sourceAnswerPdfSha256": session["officialAnswer"]["sha256"],
        "officialAnswerUnitsSha256": canonical([official[key] for key in selected_keys]),
        "referencePdfSha256": {},
        "referencePageSha256": {},
    }

    prompt = (
        "あなたは第三種電気主任技術者試験の最終独立監査者。候補JSONを、添付した試験センター公式問題原図、"
        "manifest固定の公式正答、公開候補図と解答単位ごとに照合する。問題文・数式・極性・単位、(1)〜(5)全肢、"
        "公式正答、総合解説の計算・因果、正答肢と各誤答肢固有の理由、図の接続・向き・全ラベルを検算する。"
        "図が解答に必要なら公開候補図だけで理解できるかも検査する。公式ReferenceUrlsに独立主張がある場合、"
        "添付原図または添付した公式参考資料の原頁で検証できなければsourceIssuesに記録し、推測でPASSにしない。"
        "監査レシートのp番号は査読回次タグで、PDFページ番号ではない。PDFページはreviewedFromPageと添付原図から判断する。"
        "status=PASSは誤り・曖昧さ・外部確認事項が一つもない場合だけ。出力はJSON配列のみ。各要素は"
        "unitKey,questionNumber,part,status(PASS/FIX),textIssues,choiceIssues,answerIssues,explanationIssues,"
        "figureIssues,sourceIssues,verifiedEvidenceを持つ。issuesは必ず配列。公式正答は変更しない。"
    )
    blocks: list[dict] = [{"type": "text", "text": prompt}]
    for number in sorted({item[0] for item in selected}):
        blocks.append({"type": "text", "text": f"問{number}の公式問題原図:"})
        for relative in page_map["questions"][str(number)]["images"]:
            blocks.append(image(ROOT / relative))
    answer_image = ANSWER_DIR / f"answer-{date}.png"
    if answer_image.is_file():
        blocks += [{"type": "text", "text": "試験センター公式解答表の原図:"}, image(answer_image)]
    reference_manifest = {entry["url"]: entry for entry in json.loads(REFERENCE_MANIFEST.read_text(encoding="utf-8"))}
    referenced_urls = {url.split("#", 1)[0] for candidate in selected_candidates
                       for url in candidate.get("officialReferenceUrls", [])}
    for url in sorted(referenced_urls):
        if url not in reference_manifest:
            raise ValueError(f"Official reference lacks pinned source pages: {url}")
        entry = reference_manifest[url]
        pdf = ROOT / entry["localPdf"]
        if raw_digest(pdf) != entry["sha256"]:
            raise ValueError(f"Official reference PDF hash changed: {url}")
        hashes["referencePdfSha256"][entry["localPdf"]] = entry["sha256"]
        document = fitz.open(pdf)
        for page_number in entry["pages"]:
            destination = PRIVATE / "references" / f"{pdf.stem}-p{page_number:03}.png"
            destination.parent.mkdir(parents=True, exist_ok=True)
            if not destination.exists():
                document[page_number - 1].get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False).save(destination)
            relative = destination.relative_to(ROOT).as_posix()
            hashes["referencePageSha256"][relative] = raw_digest(destination)
            blocks += [{"type": "text", "text": f"公式参考資料 {entry['purpose']} URL={url} PDF第{page_number}頁:"},
                       image(destination)]
    for key in selected_keys:
        candidate = candidates[key]
        blocks.append({"type": "text", "text":
                       f"{key} 公式正答単位={json.dumps(official[key], ensure_ascii=False)}\n候補JSON=" +
                       json.dumps(candidate, ensure_ascii=False)})
        for url in candidate.get("figureUrls", []) + list(candidate.get("choiceFigureUrls", {}).values()):
            blocks += [{"type": "text", "text": f"{key} 公開候補図 {Path(url).name}:"},
                       image(ROOT / "public" / url.lstrip("/"))]
    request = {"type": "user", "message": {"role": "user", "content": blocks}}
    process = subprocess.run(
        [str(CLI), "-p", "--model", "claude-opus-5-5", "--effort", "high", "--input-format", "stream-json",
         "--output-format", "stream-json", "--verbose", "--tools", ""],
        input=json.dumps(request, ensure_ascii=False) + "\n", text=True, encoding="utf-8",
        capture_output=True, cwd=ROOT, timeout=900,
    )
    if process.returncode:
        raise RuntimeError((process.stderr or process.stdout)[-2000:])
    result, model_usage = parse_result(process.stdout)
    for item in result:
        if item.get("questionNumber") is not None:
            item["unitKey"] = unit_key(int(item["questionNumber"]), item.get("part") or None)
    if len(result) != len(selected_keys) or {item.get("unitKey") for item in result} != set(selected_keys):
        debug = OUT / f"{date}-{subject}-{round_name}-coverage-error.json"
        debug.parent.mkdir(parents=True, exist_ok=True)
        debug.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        raise ValueError(f"Review coverage differs; saved {debug}")
    for item in result:
        for key in ISSUES:
            if not isinstance(item.get(key), list):
                raise ValueError(f"{item.get('unitKey')} missing {key}")
        clean = all(not item[key] for key in ISSUES)
        if (item.get("status") == "PASS") != clean or not item.get("verifiedEvidence"):
            raise ValueError(f"{item.get('unitKey')} status/issues/evidence contradiction")
    OUT.mkdir(parents=True, exist_ok=True)
    stamp = "-".join(selected_keys)
    out = OUT / f"{date}-{subject}-{round_name}-{stamp}-opus.json"
    raw_out = PRIVATE / date / subject / f"{date}-{subject}-{round_name}-{stamp}-opus-raw.jsonl"
    if out.exists():
        raise FileExistsError(out)
    if raw_out.exists():
        raise FileExistsError(raw_out)
    raw_out.write_text(process.stdout, encoding="utf-8")
    out.write_text(json.dumps({"schemaVersion": 1, "examDate": date, "subject": subject,
                               "reviewModel": "claude-opus-5-5", "resolvedModel": "claude-opus-5-5",
                               "modelUsage": model_usage,
                               "rawResponseSha256": raw_digest(raw_out),
                               "inputRequestSha256": sha256((json.dumps(request, ensure_ascii=False) + "\n").encode("utf-8")).hexdigest(),
                               "inputHashes": hashes,
                               "assessment": result}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    passed = sum(item["status"] == "PASS" for item in result)
    print(f"{out.name}: PASS={passed} FIX={len(result)-passed}")


if __name__ == "__main__":
    main()
