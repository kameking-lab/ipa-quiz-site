"""Independent source-aware review of a private EM choice-explanation candidate.

Usage: py -3.12 scripts/emkohyo-2025-review-batch.py emkohyo-EM20251805 1 3
"""

import base64
from hashlib import sha256
import json
from pathlib import Path
import re
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/exam-library"
REVIEW = DATA / "emkohyo-review"
CLI = Path.home() / "AppData/Roaming/npm/claude.cmd"
MODEL_ID = "claude-opus-5-5"


def parse(stdout: str) -> tuple[object, str]:
    events = [json.loads(line) for line in stdout.splitlines() if line.startswith("{")]
    final = next((event for event in reversed(events) if event.get("type") == "result"), None)
    if final is None or final.get("is_error"):
        raise ValueError(f"No successful model response: {stdout[-1000:]}")
    value = re.sub(r"^```(?:json)?\s*|\s*```$", "", final.get("result", "").strip(), flags=re.I)
    models = [name for name in (final.get("modelUsage") or {}) if name.startswith("claude-")]
    resolved_model = models[0] if len(models) == 1 else MODEL_ID
    return json.loads(value[value.find("{"):value.rfind("}") + 1]), resolved_model


def main() -> None:
    paper, first, last = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
    batch_first = (first - 1) // 5 * 5 + 1
    batch_last = batch_first + 4
    if (last - 1) // 5 * 5 + 1 != batch_first:
        raise ValueError("A direct review must stay within one five-question draft batch")
    draft_file = REVIEW / f"{paper}-q{batch_first:02}-{batch_last:02}-draft.json"
    draft = json.loads(draft_file.read_text(encoding="utf-8"))["questions"]
    rows = json.loads((DATA / "papers" / f"{paper}.json").read_text(encoding="utf-8"))
    ids = [f"{paper}-q{n}" for n in range(first, last + 1)]
    candidates = {id_: draft[id_]["overlay"] for id_ in ids}
    question_rows = {x["id"]: x for x in rows if x["id"] in ids}
    presentation_file = DATA / "presentation" / f"{paper}.json"
    presentation = json.loads(presentation_file.read_text(encoding="utf-8"))
    presented = {id_: presentation[id_] for id_ in ids}
    figure_hashes = {}
    image_blocks = []
    for id_ in ids:
        figure_hashes[id_] = {}
        for figure in presented[id_].get("figures", []):
            src = figure["src"]
            path = ROOT / "public" / src.lstrip("/")
            if not path.exists():
                raise FileNotFoundError(path)
            raw = path.read_bytes()
            figure_hashes[id_][src] = sha256(raw).hexdigest()
            image_blocks.append({"type": "text", "text": f"公式図表: {id_} {src} SHA256={figure_hashes[id_][src]}"})
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
    prompt = (
        "あなたは独立した第一種作業環境測定士試験の校閲者。現候補を公式問題原文・公式正答・添付の政府一次資料で厳密に照合する。"
        "問題文の選択肢1〜5との対応、解説の個別因果、数値・温度・単位、正誤判定を全件見る。"
        "文字起こしpresentationと添付した公式図表画像も見比べる。図表を見ずには判定できない肢を推測でPASSにしない。"
        "物性値の温度・単位が出典と整合するか、近似であるなら比較結論が支持されるか検査する。"
        "政府ページが理由を直接支えない場合sourceIssuesに記す。見出しのみの一般資料を根拠として通さない。"
        "出力はJSONオブジェクトのみ。キーは問題ID、値はstatus(PASS/FIX),textIssues,choiceIssues,reasonIssues,sourceIssues,needsExternalCheck。"
        "全issue項目は文字列配列。PASSなら全配列空。疑義は具体的に記す。"
    )
    payload = (prompt + "\n公式問題: " + json.dumps(question_rows, ensure_ascii=False)
               + "\n文字起こし・図表位置: " + json.dumps(presented, ensure_ascii=False)
               + "\n現候補: " + json.dumps(candidates, ensure_ascii=False)
               + "\n政府資料証拠: " + json.dumps(sources, ensure_ascii=False))
    content = [{"type": "text", "text": payload}, *image_blocks]
    process = subprocess.run(
        [str(CLI), "-p", "--model", MODEL_ID, "--effort", "high", "--input-format", "stream-json",
         "--output-format", "stream-json", "--verbose", "--tools", ""],
        input=json.dumps({"type": "user", "message": {"role": "user", "content": content}}, ensure_ascii=False) + "\n",
        text=True, encoding="utf-8", capture_output=True, cwd=ROOT, timeout=900,
    )
    if process.returncode:
        raise RuntimeError((process.stderr or process.stdout)[-1000:])
    result, resolved_model = parse(process.stdout)
    raw_out = REVIEW / f"{paper}-q{first:02}-{last:02}-raw-assessment.json"
    raw_out.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    if set(result) != set(ids):
        raise ValueError("Review omitted or added question IDs")
    keys = ("textIssues", "choiceIssues", "reasonIssues", "sourceIssues", "needsExternalCheck")
    for id_, item in result.items():
        if item.get("status") not in ("PASS", "FIX") or any(not isinstance(item.get(k), list) for k in keys):
            raise ValueError(f"Invalid review: {id_}")
        if item["status"] == "PASS" and any(item[k] for k in keys):
            item["status"] = "FIX"
    receipt = {"reviewModel": resolved_model, "requestedModel": MODEL_ID,
               "paperId": paper, "ids": ids,
               "figureSha256": figure_hashes,
               "candidateSha256": {id_: sha256(json.dumps(candidates[id_], ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest() for id_ in ids},
               "sourcePackSha256": sha256(source_file.read_bytes()).hexdigest(), "assessment": result}
    out = REVIEW / f"{paper}-q{first:02}-{last:02}-review.json"
    if out.exists():
        raise FileExistsError(out)
    out.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{out}: PASS {sum(x['status']=='PASS' for x in result.values())}/{len(result)}")


if __name__ == "__main__":
    main()
