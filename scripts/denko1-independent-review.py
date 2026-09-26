"""Ask Opus to independently inspect Denko1 candidates against the official rows.

Usage: py -3.12 scripts/denko1-independent-review.py 20260401-q01-10 [--questions=3,4]

Each run reviews one 10-question batch in two parts of five. The receipt pins
the candidate JSON, the official row crop, every published figure and every
primary-source law receipt by sha256, and records the model id reported by the
Claude CLI itself. A receipt whose input hashes no longer match is archived and
re-run, never edited.
"""

from base64 import b64encode
from hashlib import sha256
import json
from pathlib import Path
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
BATCHES = ROOT / "data/raw_pdfs/denko1/review/batches"
REVIEWED = ROOT / "data/questions/denko1/reviewed"
RECEIPTS = ROOT / "docs/evidence/denko1-independent"
LAW = ROOT / "docs/evidence/denko1-law"
CLI = Path.home() / "AppData/Roaming/npm/claude.cmd"


def rel(path: Path) -> str:
    return str(path.relative_to(ROOT)).replace("\\", "/")


def canonical(value) -> str:
    return sha256(json.dumps(value, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()


def text_digest(path: Path) -> str:
    return sha256(path.read_bytes().replace(b"\r\n", b"\n").replace(b"\r", b"\n")).hexdigest()


def image_block(path: Path) -> dict:
    return {"type": "image", "source": {"type": "base64", "media_type": "image/png",
                                         "data": b64encode(path.read_bytes()).decode("ascii")}}


def input_hashes(stem: str, originals: list[dict], drafts: list[dict]) -> dict:
    figures = {}
    for item in drafts:
        for url in item.get("imageUrls", []) + list(item.get("choiceImageUrls", {}).values()):
            path = ROOT / "public" / url.lstrip("/")
            figures[rel(path)] = sha256(path.read_bytes()).hexdigest()
    laws = {}
    for item in drafts:
        path = LAW / f"{stem[:8]}-q{item['number']:02}.json"
        if path.exists():
            laws[rel(path)] = text_digest(path)
    return {
        "draftSha256": canonical(drafts),
        "candidateSha256": {str(item["number"]): canonical(item) for item in drafts},
        "rowSha256": {str(item["number"]): sha256((ROOT / item["reviewCrop"]).read_bytes()).hexdigest() for item in originals},
        "figureSha256": figures,
        "legalReceiptSha256": laws,
    }


PROMPT = (
    "あなたは第一種電気工事士試験の独立品質監査者。各問について、試験センター公式問題PDFの該当行の画像(問題文と4つの答え)と、"
    "別の担当者が清書したJSONを突き合わせる。JSONのchoicesのイ・ロ・ハ・ニは公式の答えの記号と同じ対応である。"
    "問題文の数値・単位・極性・条件、図の読み取り(diagramDescriptionと共通図・設問図)、イロハニ全肢の文字と順番、公式正答との整合、"
    "解説とchoiceExplanations(4肢すべて)の数式・因果関係・用語を厳しく検査する。図や写真が選択肢の場合、choicesの文字説明が図の内容と一致するかも確認する。"
    "誤答の由来を推測して書いた説明に計算矛盾があれば必ず指摘する。"
    "法令・解釈の条項や数値の真偽は画像だけで判定しない。添付した一次資料照合receipt(経済産業省『電気設備の技術基準の解釈』PDF、e-Gov法令、自治体の施工マニュアル・共通仕様書、製造者カタログの原文句をsha256付きで機械照合済み)"
    "が該当条項と数値を検証しているなら、その点についてlawNeedsExternalCheckは空にする。receiptで照合されていない法令・規程の断定だけを要確認とする。"
    "ただし公式正答そのものと、技術的な一般知識(機器の名称・原理・構造・用途)はlawNeedsExternalCheckの対象外とし、誤りがあればexplanationIssuesに書く。"
    "出力はJSON配列のみ。各問についてnumber,status(PASS又はFIX),textIssues,choiceIssues,explanationIssues,figureIssues,lawNeedsExternalCheckを持つ。"
    "issue各フィールドは文字列配列。PASSとするのは全ての配列が空の場合だけ。実際の誤り・未確認事項があればFIXにし、単なる文体の好みはissueに書かない。"
    "問題が無い問も必ず1件出力する。一般論は書かず、元画像とJSONの具体的な差分を書く。"
)


def check(batch_path: Path, part: int, selected: set[int] | None = None) -> str:
    batch = json.loads(batch_path.read_text(encoding="utf-8"))
    originals = batch["questions"][(part - 1) * 5:part * 5]
    first, last = originals[0]["number"], originals[-1]["number"]
    draft_path = REVIEWED / f"{batch_path.stem[:8]}-q{first:02}-{last:02}.json"
    drafts = json.loads(draft_path.read_text(encoding="utf-8"))
    if selected is not None:
        originals = [item for item in originals if item["number"] in selected]
        drafts = [item for item in drafts if item["number"] in selected]
        if not originals:
            return f"{batch_path.stem} part{part:02}: no selected questions"
    if [item["number"] for item in originals] != [item["number"] for item in drafts]:
        raise ValueError("Draft and official row numbering differs")
    for source, draft in zip(originals, drafts):
        if source["officialAnswer"] != draft["officialAnswer"]:
            raise ValueError(f"Q{source['number']}: draft answer differs from the official answer")
    RECEIPTS.mkdir(parents=True, exist_ok=True)
    suffix = f"-fix-q{'-'.join(str(item['number']) for item in originals)}" if selected is not None else ""
    output = RECEIPTS / f"{batch_path.stem}-opus-review-part{part:02}{suffix}.json"
    hashes = input_hashes(batch_path.stem, originals, drafts)
    if output.exists():
        previous = json.loads(output.read_text(encoding="utf-8"))
        if previous.get("inputHashes") == hashes:
            return f"{output.name}: existing and input hashes match"
        archive = RECEIPTS / "archive"
        archive.mkdir(parents=True, exist_ok=True)
        stale = archive / f"{output.stem}-old-{canonical(previous.get('inputHashes', {}))[:12]}.json"
        if stale.exists():
            raise FileExistsError(stale)
        output.rename(stale)

    blocks: list[dict] = [{"type": "text", "text": PROMPT}]
    shared_sent: set[str] = set()
    for source, draft in zip(originals, drafts):
        number = source["number"]
        blocks.append({"type": "text", "text": f"問{number}。公式正答={source['officialAnswer']}。清書JSON={json.dumps(draft, ensure_ascii=False)}"})
        blocks.append({"type": "text", "text": f"問{number}の公式問題PDFの該当行(問題文と答え)の画像:"})
        blocks.append(image_block(ROOT / source["reviewCrop"]))
        law = LAW / f"{batch_path.stem[:8]}-q{number:02}.json"
        if law.exists():
            blocks.append({"type": "text", "text": f"問{number}の一次資料照合receipt: {law.read_text(encoding='utf-8')}"})
        for url in draft.get("imageUrls", []):
            path = ROOT / "public" / url.lstrip("/")
            if url in shared_sent:
                blocks.append({"type": "text", "text": f"問{number}の図は前に添付した共通図 {path.name} と同じ。"})
                continue
            shared_sent.add(url)
            blocks.append({"type": "text", "text": f"問{number}の公開用の図(公式PDFから切り出し): {path.name}"})
            blocks.append(image_block(path))
        for kana, url in draft.get("choiceImageUrls", {}).items():
            path = ROOT / "public" / url.lstrip("/")
            blocks.append({"type": "text", "text": f"問{number}の選択肢{kana}の公開用の図(公式PDFから切り出し、記号イロハニの文字は除去): {path.name}"})
            blocks.append(image_block(path))
    request = {"type": "user", "message": {"role": "user", "content": blocks}}
    process = subprocess.run(
        [str(CLI), "-p", "--model", "opus", "--effort", "high", "--input-format", "stream-json",
         "--output-format", "stream-json", "--verbose", "--tools", ""],
        input=json.dumps(request, ensure_ascii=False) + "\n", text=True, encoding="utf-8",
        capture_output=True, cwd=ROOT, timeout=900,
    )
    if process.returncode:
        raise RuntimeError(f"Claude exit {process.returncode}: {(process.stderr or process.stdout)[-800:]}")
    events = [json.loads(line) for line in process.stdout.splitlines() if line.startswith("{")]
    init = next((event for event in events if event.get("type") == "system" and event.get("subtype") == "init"), {})
    models = sorted({event["message"]["model"] for event in events
                     if event.get("type") == "assistant" and isinstance(event.get("message"), dict) and event["message"].get("model")})
    final = next((event for event in reversed(events) if event.get("type") == "result"), None)
    if final is None or final.get("is_error"):
        raise ValueError(f"No successful result: {process.stdout[-800:]}")
    text = re.sub(r"^```(?:json)?\s*|\s*```$", "", final.get("result", "").strip(), flags=re.I)
    start, end = text.find("["), text.rfind("]")
    if start < 0 or end < start:
        raise ValueError(f"No JSON array: {text[-800:]}")
    result = json.loads(text[start:end + 1])
    if sorted(item.get("number") for item in result) != sorted(item["number"] for item in originals):
        raise ValueError("Opus review omitted or added a question")
    receipt = {
        "inputHashes": hashes,
        "reviewModel": models[0] if len(models) == 1 else models,
        "cliInitModel": init.get("model"),
        "sessionId": final.get("session_id"),
        "assessment": sorted(result, key=lambda item: item["number"]),
    }
    output.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    passed = sum(item.get("status") == "PASS" for item in result)
    return f"{output.name}: {passed}/{len(result)} pass (model {receipt['reviewModel']})"


def main() -> None:
    selected_batch = sys.argv[1] if len(sys.argv) > 1 else "20260401-q01-10"
    questions = None
    for arg in sys.argv[2:]:
        if arg.startswith("--questions="):
            questions = {int(value) for value in arg.split("=", 1)[1].split(",")}
    parts = [1, 2]
    for arg in sys.argv[2:]:
        if arg.startswith("--part="):
            parts = [int(arg.split("=", 1)[1])]
    for part in parts:
        print(check(BATCHES / f"{selected_batch}.json", part, questions), flush=True)


if __name__ == "__main__":
    main()
