"""Ask Opus 5.5 to independently inspect every non-public draft against official rows.

This is a second reviewer, not an acceptance gate by itself. A separate receipt
records corrections, figure-only crops and government-source checks.
"""

from base64 import b64encode
from hashlib import sha256
import json
from pathlib import Path
import re
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
BATCHES = ROOT / "data/raw_pdfs/denko2/review/batches"
REVIEWED = ROOT / "data/questions/denko2/reviewed"
RECEIPTS = ROOT / "docs/evidence/denko2-independent"
CLI = Path.home() / "AppData/Roaming/npm/claude.cmd"
SHARED_FIGURES = {
    "20240526": [ROOT / "public/images/denko2/2024-first/wiring-main.png",
                 ROOT / "public/images/denko2/2024-first/wiring-panels.png"],
    "20250525": [ROOT / "public/images/denko2/2025-first/wiring-main.png"],
}


def draft_for(batch_path: Path, part: int) -> tuple[list[dict], Path]:
    original = json.loads(batch_path.read_text(encoding="utf-8"))["questions"][(part - 1) * 5:part * 5]
    first, last = original[0]["number"], original[-1]["number"]
    reviewed_path = REVIEWED / f"{batch_path.stem[:8]}-q{first:02}-{last:02}.json"
    path = reviewed_path if reviewed_path.exists() else batch_path.with_name(batch_path.stem + f"-vision-part{part:02}.json")
    return json.loads(path.read_text(encoding="utf-8")), path


def check(batch_path: Path, part: int, selected: set[int] | None = None) -> str:
    batch = json.loads(batch_path.read_text(encoding="utf-8"))
    original = batch["questions"][(part - 1) * 5:part * 5]
    draft, draft_path = draft_for(batch_path, part)
    if selected is not None:
        original = [item for item in original if item["number"] in selected]
        draft = [item for item in draft if item["number"] in selected]
        if not original:
            return f"{batch_path.stem} part{part:02}: no selected questions"
    if {item["number"] for item in original} != {item["number"] for item in draft}:
        raise ValueError("Draft and official row numbering differs")
    RECEIPTS.mkdir(parents=True, exist_ok=True)
    suffix = f"-fix-q{'-'.join(str(item['number']) for item in original)}" if selected is not None else ""
    output = RECEIPTS / (batch_path.stem + f"-opus-review-part{part:02}{suffix}.json")
    hashes = {
        "draftSha256": sha256(json.dumps(draft, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest(),
        "candidateSha256": {
            str(item["number"]): sha256(json.dumps(item, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()
            for item in draft
        },
        "rowSha256": {str(item["number"]): sha256((ROOT / item["reviewCrop"]).read_bytes()).hexdigest()
                      for item in original},
    }
    shared_figures = SHARED_FIGURES.get(batch_path.stem[:8], []) if any(item["number"] >= 31 for item in original) else []
    if shared_figures:
        hashes["sharedFigureSha256"] = {str(path.relative_to(ROOT)).replace("\\", "/"): sha256(path.read_bytes()).hexdigest()
                                        for path in shared_figures}
    detail_figures = {}
    for item in draft:
        for image_url in item.get("imageUrls", []) + list(item.get("choiceImageUrls", {}).values()):
            path = ROOT / "public" / image_url.lstrip("/")
            if path not in shared_figures:
                detail_figures[str(path.relative_to(ROOT)).replace("\\", "/")] = sha256(path.read_bytes()).hexdigest()
    if detail_figures:
        hashes["detailFigureSha256"] = detail_figures
    source_packs = {
        str(item["number"]): ROOT / f"docs/evidence/denko2-sources/20250525/q{item['number']:02}.json"
        for item in original
    }
    hashes["sourcePackSha256"] = {
        number: sha256(path.read_bytes()).hexdigest()
        for number, path in source_packs.items() if path.exists()
    }
    hashes["sourceFigureSha256"] = {}
    for number, path in source_packs.items():
        if path.exists():
            source_pack = json.loads(path.read_text(encoding="utf-8"))
            if source_pack.get("sourceFigurePath"):
                figure = ROOT / source_pack["sourceFigurePath"]
                hashes["sourceFigureSha256"][number] = sha256(figure.read_bytes()).hexdigest()
    if output.exists():
        previous = json.loads(output.read_text(encoding="utf-8"))
        if previous.get("inputHashes") == hashes:
            return f"{output.name}: existing and input hashes match"
        old_sha = sha256(json.dumps(previous.get("inputHashes", {}), sort_keys=True).encode("utf-8")).hexdigest()[:12]
        archive = BATCHES / "independent-archive"
        archive.mkdir(parents=True, exist_ok=True)
        stale = archive / (output.stem + f"-old-{old_sha}.json")
        if stale.exists():
            raise FileExistsError(stale)
        output.rename(stale)

    prompt = (
        "あなたは第二種電気工事士の独立品質監査者。問題原本の画像と、別モデルが清書したJSONを突き合わせる。"
        "全ての問について問題文の極性・数値・単位・図の接続、イロハニ全肢の文字と順番、公式正答との整合、"
        "解説と4つの肢別理由の数式・因果関係を厳しく検査。推測した誤答の由来に計算矛盾があれば必ず指摘する。"
        "規則条項の真偽は画像だけで判定せず、添付した一次資料の原文がある場合はそれを照合する。"
        "一次資料がなく条項を確認できない場合はlawNeedsExternalCheckに必ず残す。問題・図面は掲載許諾を別途取得済みであり、公開権利は本監査の対象外としてissueに挙げない。"
        "出力はJSON配列のみ。各問についてnumber,status(PASS又はFIX),textIssues,choiceIssues,"
        "explanationIssues,figureIssues,lawNeedsExternalCheckを持つ。issue各フィールドは文字列配列。"
        "PASSとするのは全てのissue/NeedsExternalCheck配列が空の場合だけ。改善提案が実際の誤り・未確認事項ならFIXにし、"
        "単なる文体の好みはissueに書かない。ミスが無い問も必ず1件出力。一般論は書かず、元画像とJSONの具体的差分を書く。"
    )
    blocks = [{"type": "text", "text": prompt}]
    for source in original:
        number = source["number"]
        candidate = next(item for item in draft if item["number"] == number)
        blocks.append({"type": "text", "text": f"問{number}。公式正答={source['officialAnswer']}。清書JSON={json.dumps(candidate, ensure_ascii=False)}"})
        source_pack = ROOT / f"docs/evidence/denko2-sources/20250525/q{number:02}.json"
        if source_pack.exists():
            proof = json.loads(source_pack.read_text(encoding="utf-8"))
            blocks.append({"type": "text", "text": f"問{number}の一次資料照合パック={json.dumps(proof, ensure_ascii=False)}"})
            if proof.get("sourceFigurePath"):
                figure = ROOT / proof["sourceFigurePath"]
                blocks.append({"type": "text", "text": f"問{number}の一次資料の図記号表（原PDFより抽出）: {figure.name}"})
                blocks.append({"type": "image", "source": {"type": "base64", "media_type": "image/png",
                                                         "data": b64encode(figure.read_bytes()).decode("ascii")}})
        blocks.append({"type": "image", "source": {"type": "base64", "media_type": "image/png",
                                                 "data": b64encode((ROOT / source["reviewCrop"]).read_bytes()).decode("ascii")}})
        detail_urls = candidate.get("imageUrls", []) + list(candidate.get("choiceImageUrls", {}).values())
        for image_url in detail_urls:
            path = ROOT / "public" / image_url.lstrip("/")
            if path in shared_figures:
                continue
            blocks.append({"type": "text", "text": f"問{number}の図記号拡大図（原本PDFから図だけ切り出し）: {path.name}"})
            blocks.append({"type": "image", "source": {"type": "base64", "media_type": "image/png",
                                                     "data": b64encode(path.read_bytes()).decode("ascii")}})
    for path in shared_figures:
        blocks.append({"type": "text", "text": f"公式問題PDFの共通配線図のみ（別頁）。参照画像: {path.name}。丸数字①〜⑳の矢印を辿って設問と照合すること。"})
        blocks.append({"type": "image", "source": {"type": "base64", "media_type": "image/png",
                                                 "data": b64encode(path.read_bytes()).decode("ascii")}})
    request = {"type": "user", "message": {"role": "user", "content": blocks}}
    process = subprocess.run(
        [str(CLI), "-p", "--model", "opus", "--effort", "medium", "--input-format", "stream-json",
         "--output-format", "stream-json", "--verbose", "--tools", ""],
        input=json.dumps(request, ensure_ascii=False) + "\n", text=True, encoding="utf-8",
        capture_output=True, cwd=ROOT, timeout=360,
    )
    if process.returncode:
        raise RuntimeError(f"Claude exit {process.returncode}: {(process.stderr or process.stdout)[-500:]}")
    events = [json.loads(line) for line in process.stdout.splitlines() if line.startswith("{")]
    final = next((event for event in reversed(events) if event.get("type") == "result"), None)
    if final is None or final.get("is_error"):
        raise ValueError(f"No successful result: {process.stdout[-500:]}")
    text = re.sub(r"^```(?:json)?\s*|\s*```$", "", final.get("result", "").strip(), flags=re.I)
    start, end = text.find("["), text.rfind("]")
    if start < 0 or end < start:
        raise ValueError(f"No JSON array: {text[-500:]}")
    result = json.loads(text[start:end + 1])
    if len(result) != len(original) or {item.get("number") for item in result} != {item["number"] for item in original}:
        raise ValueError("Opus review omitted or added a question")
    output.write_text(json.dumps({"inputHashes": hashes, "reviewModel": "claude-opus-5-5",
                                  "assessment": result}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return f"{output.name}: {sum(item['status'] == 'PASS' for item in result)}/{len(result)} pass; {sum(item['status'] == 'FIX' for item in result)} fix"


def main() -> None:
    selected = sys.argv[1] if len(sys.argv) > 1 else "20240526-q01-10"
    path = BATCHES / f"{selected}.json"
    questions = None
    if len(sys.argv) > 2 and sys.argv[2].startswith("--questions="):
        questions = {int(value) for value in sys.argv[2].split("=", 1)[1].split(",")}
    for part in (1, 2):
        print(check(path, part, questions), flush=True)


if __name__ == "__main__":
    main()
