"""Independent source-aware review of a private EM choice-explanation candidate.

Usage: py -3.12 scripts/emkohyo-2025-review-batch.py emkohyo-EM20251805 1 3
"""

import base64
from hashlib import sha256
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
from urllib.parse import urlparse

from emkohyo_portable_hash import matches_text_sha256, text_sha256


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/exam-library"
REVIEW = DATA / "emkohyo-review"
WINDOWS_CLI = Path.home() / "AppData/Roaming/npm/claude.cmd"
CLI = WINDOWS_CLI if WINDOWS_CLI.exists() else Path(shutil.which("claude") or "claude")
# Auxiliary background calls would add a second model to modelUsage.
CLI_ENV = {**os.environ, "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"}
MODEL_ID = "claude-opus-5-5"


def parse(stdout: str) -> tuple[object, str, dict, str]:
    events = [json.loads(line) for line in stdout.splitlines() if line.startswith("{")]
    final = next((event for event in reversed(events) if event.get("type") == "result"), None)
    if final is None or final.get("is_error"):
        raise ValueError(f"No successful model response: {stdout[-1000:]}")
    value = re.sub(r"^```(?:json)?\s*|\s*```$", "", final.get("result", "").strip(), flags=re.I)
    models = [name for name in (final.get("modelUsage") or {}) if name.startswith("claude-")]
    if models != [MODEL_ID]:
        raise ValueError(f"Cannot prove the requested model from Claude modelUsage: {models}")
    resolved_model = models[0]
    usage = final["modelUsage"][resolved_model]
    if usage.get("canonicalModel") != MODEL_ID or not usage.get("provider"):
        raise ValueError(f"Claude modelUsage lacks exact canonical model and provider: {usage}")
    return (json.loads(value[value.find("{"):value.rfind("}") + 1]), resolved_model,
            final["modelUsage"], final.get("result", ""))


def main() -> None:
    paper, first, last = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
    out = REVIEW / f"{paper}-q{first:02}-{last:02}-review.json"
    raw_out = REVIEW / f"{paper}-q{first:02}-{last:02}-raw-assessment.json"
    response_out = REVIEW / f"{paper}-q{first:02}-{last:02}-raw-response.txt"
    if out.exists() or raw_out.exists() or response_out.exists():
        raise FileExistsError(f"Archive the previous review before rerunning: {out}")
    batch_first = (first - 1) // 5 * 5 + 1
    batch_last = batch_first + 4
    if (last - 1) // 5 * 5 + 1 != batch_first:
        raise ValueError("A direct review must stay within one five-question draft batch")
    draft_file = REVIEW / f"{paper}-q{batch_first:02}-{batch_last:02}-draft.json"
    draft = json.loads(draft_file.read_text(encoding="utf-8"))["questions"]
    rows = json.loads((DATA / "papers" / f"{paper}.json").read_text(encoding="utf-8"))
    catalog = json.loads((DATA / "official-catalog.json").read_text(encoding="utf-8"))
    paper_meta = next(item for item in catalog if item["id"] == paper)
    ids = [f"{paper}-q{n}" for n in range(first, last + 1)]
    candidates = {id_: draft[id_]["overlay"] for id_ in ids}
    question_rows = {x["id"]: x for x in rows if x["id"] in ids}
    presentation_file = DATA / "presentation" / f"{paper}.json"
    presentation = json.loads(presentation_file.read_text(encoding="utf-8"))
    presented = {id_: presentation[id_] for id_ in ids}
    figure_hashes = {}
    row_image_hashes = {}
    image_blocks = []
    seen_images = set()
    for id_ in ids:
        figure_hashes[id_] = {}
        row_image_hashes[id_] = {}
        for kind, sources in (
            ("公式問題原図", question_rows[id_].get("images", [])),
            ("図表切出し", [figure["src"] for figure in presented[id_].get("figures", [])]),
        ):
            for src in sources:
                path = ROOT / "public" / src.lstrip("/")
                if not path.exists():
                    raise FileNotFoundError(path)
                raw = path.read_bytes()
                digest = sha256(raw).hexdigest()
                (row_image_hashes if kind == "公式問題原図" else figure_hashes)[id_][src] = digest
                if src not in seen_images:
                    seen_images.add(src)
                    image_blocks.append({"type": "text", "text": f"{kind}: {id_} {src} SHA256={digest}"})
                    image_blocks.append({"type": "image", "source": {"type": "base64",
                                                                   "media_type": "image/webp",
                                                                   "data": base64.b64encode(raw).decode("ascii")}})
    focused_source = ROOT / f"docs/evidence/emkohyo-choice-sources/{paper}-q{first:02}-{last:02}.json"
    if focused_source.exists():
        source_file = focused_source
    elif paper == "emkohyo-EM20251805" and first == 1 and last == 3:
        source_file = ROOT / "docs/evidence/emkohyo-2025-sources/EM20251805-q01-03.json"
    else:
        source_file = ROOT / f"docs/evidence/emkohyo-choice-sources/{paper}-q{batch_first:02}-{batch_last:02}.json"
    sources = json.loads(source_file.read_text(encoding="utf-8"))
    if sources.get("paperId") == paper and "draftSha256" in sources:
        if sources.get("range") != [first, last]:
            raise ValueError(f"Source pack range differs from review range: {source_file}")
        if not matches_text_sha256(draft_file, sources["draftSha256"]):
            raise ValueError(f"Source pack is stale for current draft: {source_file}")
        if sources.get("missingEvidenceQuestions") or sources.get("unverifiedExcerpts"):
            raise ValueError(f"Source pack has unresolved evidence: {source_file}")
        if not sources.get("claimedExcerpts"):
            raise ValueError(f"Source pack has no direct excerpts: {source_file}")
        for source in sources.get("sources", []):
            host = urlparse(source.get("url", "")).hostname or ""
            if not host.endswith(".go.jp") or source.get("status") != 200:
                raise ValueError(f"Non-government or unreachable source in {source_file}: {host}")
    else:
        raise ValueError(f"Source pack lacks candidate hash and range pins: {source_file}")
    source_page_image_hashes = {}
    official_page_image_hashes = {}
    for source_image in sources.get("officialPageImages", []):
        if source_image.get("officialPdfSha256") != paper_meta["pdfSha256"]:
            raise ValueError("High-resolution official crop is not pinned to the catalogued PDF")
        path = ROOT / source_image["path"]
        raw = path.read_bytes()
        digest = sha256(raw).hexdigest()
        if digest != source_image["sha256"]:
            raise ValueError(f"High-resolution official crop changed: {path}")
        official_page_image_hashes[source_image["path"]] = digest
        image_blocks.append({"type": "text", "text":
                             f"同一公式PDFの高解像度原図: {source_image['description']} "
                             f"{source_image['path']} SHA256={digest}。"
                             "原図中の丸印は公表正答を示す印であり、問題文ではない。"})
        image_blocks.append({"type": "image", "source": {"type": "base64",
                        "media_type": "image/png", "data": base64.b64encode(raw).decode("ascii")}})
    for source_image in sources.get("sourcePageImages", []):
        path = ROOT / source_image["path"]
        raw = path.read_bytes()
        digest = sha256(raw).hexdigest()
        if digest != source_image["sha256"]:
            raise ValueError(f"Government source table image changed: {path}")
        source_page_image_hashes[source_image["path"]] = digest
        image_blocks.append({"type": "text", "text":
                             f"政府資料の原表: {source_image['description']} "
                             f"{source_image['path']} SHA256={digest}"})
        image_blocks.append({"type": "image", "source": {"type": "base64",
                        "media_type": "image/png", "data": base64.b64encode(raw).decode("ascii")}})
    prompt = (
        "あなたは独立した第一種作業環境測定士試験の校閲者。現候補を公式問題原文・公式正答・添付の政府一次資料で厳密に照合する。"
        "問題文の選択肢1〜5との対応、解説の個別因果、数値・温度・単位、正誤判定を全件見る。"
        "文字起こしpresentationを公式問題原図と照合し、図表切出しとの対応も見る。画像を見ずには判定できない肢を推測でPASSにしない。"
        "公式問題原図のrow.imagesは査読専用でユーザー画面に表示されない。ユーザー画面はpresentation.prompt、choices、figuresだけを表示する。"
        "原図に公表正答の丸印があっても、presentation.figuresにその画像が無ければ解答漏えいとは判定しない。"
        "物性値の温度・単位が出典と整合するか、近似であるなら比較結論が支持されるか検査する。"
        "政府ページが理由を直接支えない場合sourceIssuesに記す。見出しのみの一般資料を根拠として通さない。"
        "出力はJSONオブジェクトのみ。キーは問題ID、値はstatus(PASS/FIX),textIssues,choiceIssues,reasonIssues,sourceIssues,needsExternalCheck。"
        "textIssues、choiceIssues、reasonIssues、sourceIssues、needsExternalCheckは、いずれも必ず文字列配列で出力する。"
        "特にneedsExternalCheckをfalseやnullにしない。PASSなら5配列すべて[]。疑義は具体的に記す。"
    )
    payload = (prompt + "\n公式試験日・原典: " + json.dumps(
                   {key: paper_meta[key] for key in ("id", "label", "date", "pdfUrl", "pdfSha256")},
                   ensure_ascii=False)
               + "\n公式問題: " + json.dumps(question_rows, ensure_ascii=False)
               + "\n文字起こし・図表位置: " + json.dumps(presented, ensure_ascii=False)
               + "\n現候補: " + json.dumps(candidates, ensure_ascii=False)
               + "\n政府資料証拠: " + json.dumps(sources, ensure_ascii=False))
    content = [{"type": "text", "text": payload}, *image_blocks]
    process = subprocess.run(
        [str(CLI), "-p", "--model", MODEL_ID, "--effort", "high", "--input-format", "stream-json",
         "--output-format", "stream-json", "--verbose", "--tools", ""],
        input=json.dumps({"type": "user", "message": {"role": "user", "content": content}}, ensure_ascii=False) + "\n",
        text=True, encoding="utf-8", capture_output=True, cwd=ROOT, env=CLI_ENV, timeout=900,
    )
    if process.returncode:
        raise RuntimeError((process.stderr or process.stdout)[-1000:])
    result, resolved_model, model_usage, raw_response = parse(process.stdout)
    # The verbatim model text is kept so the receipt's response hash is checkable.
    response_out.write_bytes(raw_response.encode("utf-8"))
    raw_out.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    if set(result) != set(ids):
        raise ValueError("Review omitted or added question IDs")
    keys = ("textIssues", "choiceIssues", "reasonIssues", "sourceIssues", "needsExternalCheck")
    for id_, item in result.items():
        if item.get("status") not in ("PASS", "FIX") or any(not isinstance(item.get(k), list) for k in keys):
            raise ValueError(f"Invalid review: {id_}")
        if item["status"] == "PASS" and any(item[k] for k in keys):
            item["status"] = "FIX"
    usage_record = model_usage[resolved_model]
    receipt = {"reviewModel": resolved_model, "requestedModel": MODEL_ID,
               "canonicalModel": usage_record.get("canonicalModel", resolved_model),
               "provider": usage_record.get("provider"),
               "modelUsage": model_usage,
               "rawResponsePath": response_out.relative_to(ROOT).as_posix(),
               "rawResponseSha256": sha256(raw_response.encode("utf-8")).hexdigest(),
               "paperId": paper, "ids": ids,
               "figureSha256": figure_hashes, "officialRowImageSha256": row_image_hashes,
               "officialPageImageSha256": official_page_image_hashes,
               "governmentSourceImageSha256": source_page_image_hashes,
               "candidateSha256": {id_: sha256(json.dumps(candidates[id_], ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest() for id_ in ids},
               "sourcePackPath": source_file.relative_to(ROOT).as_posix(),
               "sourcePackSha256": text_sha256(source_file), "assessment": result}
    out.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{out}: PASS {sum(x['status']=='PASS' for x in result.values())}/{len(result)}")


if __name__ == "__main__":
    main()
