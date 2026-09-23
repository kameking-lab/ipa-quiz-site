"""Turn the audited 2024 lower-session drafts into publishable reviewed data.

The official row image remains the source of truth.  The wiring diagram on
page 15 is supplied as additional context for questions 31-50.  Claude fixes
the concrete defects found by the earlier Opus audit and identifies tight
figure/photo crops; the script then emits deterministic reviewed JSON and
figure-only PNGs.  Nothing produced here opens the publication gate.
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
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
BATCHES = ROOT / "data/raw_pdfs/denko2/review/batches"
RAW_ROOT = Path(r"C:/Users/kanet/20260522/ipa-denko2-20260923/data/raw_pdfs/denko2")
REVIEWED = ROOT / "data/questions/denko2/reviewed"
AUDITS = ROOT / "docs/evidence/denko2-independent"
PUBLIC = ROOT / "public/images/denko2/2024-second"
CLI = Path.home() / "AppData/Roaming/npm/claude.cmd"
LABELS = {"イ", "ロ", "ハ", "ニ"}
LAW_URL = "https://elaws.e-gov.go.jp/document?lawid=335AC0000000139"
RULE_URL = "https://elaws.e-gov.go.jp/document?lawid=335M50000400097"
INTERPRETATION_URL = "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/20231226-2.pdf"
ALLOWED_REFERENCES = {LAW_URL, RULE_URL, INTERPRETATION_URL}


def page15_image() -> Path:
    target = PUBLIC / "wiring-diagram.png"
    if target.exists():
        return target
    PUBLIC.mkdir(parents=True, exist_ok=True)
    pdf = fitz.open(RAW_ROOT / "20241027_q01.pdf")
    page = pdf[14]
    # Page 15 is itself the common drawing for questions 31-50.  Remove only
    # outer paper margins; all labels 1-20 and the legend remain visible.
    clip = fitz.Rect(22, 28, page.rect.width - 22, page.rect.height - 28)
    page.get_pixmap(matrix=fitz.Matrix(3, 3), clip=clip, alpha=False).save(target)
    return target


def image_block(path: Path) -> dict:
    return {
        "type": "image",
        "source": {
            "type": "base64",
            "media_type": "image/png",
            "data": b64encode(path.read_bytes()).decode("ascii"),
        },
    }


def parse_array(text: str) -> list[dict]:
    text = re.sub(r"^```(?:json)?\s*|\s*```$", "", text.strip(), flags=re.I)
    start, end = text.find("["), text.rfind("]")
    if start < 0 or end < start:
        raise ValueError("Claude response contains no JSON array")
    value = json.loads(text[start:end + 1])
    if not isinstance(value, list):
        raise ValueError("Claude response is not a JSON array")
    return value


def claude(blocks: list[dict], model: str) -> list[dict]:
    request = {"type": "user", "message": {"role": "user", "content": blocks}}
    process = subprocess.run(
        [str(CLI), "-p", "--model", model, "--effort", "high",
         "--input-format", "stream-json", "--output-format", "stream-json",
         "--verbose", "--tools", ""],
        input=json.dumps(request, ensure_ascii=False) + "\n",
        text=True, encoding="utf-8", capture_output=True, cwd=ROOT, timeout=480,
    )
    if process.returncode:
        raise RuntimeError((process.stderr or process.stdout)[-1000:])
    events = [json.loads(line) for line in process.stdout.splitlines() if line.startswith("{")]
    result = next((event for event in reversed(events) if event.get("type") == "result"), None)
    if result is None or result.get("is_error"):
        raise ValueError(f"Claude failed: {process.stdout[-1000:]}")
    return parse_array(result.get("result", ""))


def finalize_part(batch_stem: str, part: int, model: str, wiring: Path) -> str:
    batch_path = BATCHES / f"{batch_stem}.json"
    batch = json.loads(batch_path.read_text(encoding="utf-8"))
    source = batch["questions"][(part - 1) * 5:part * 5]
    draft_path = BATCHES / f"{batch_stem}-vision-part{part:02}.json"
    draft = json.loads(draft_path.read_text(encoding="utf-8"))
    audit_path = AUDITS / f"{batch_stem}-opus-review-part{part:02}.json"
    audit = json.loads(audit_path.read_text(encoding="utf-8"))
    first, last = source[0]["number"], source[-1]["number"]
    output = REVIEWED / f"20241027-q{first:02}-{last:02}.json"
    if output.exists():
        return f"{output.name}: existing reviewed output"

    prompt = (
        "あなたは第二種電気工事士の最終編集者。公式設問行画像を絶対の原本とし、"
        "下書きと独立監査の具体的指摘を反映して5問を完成させる。問題文とイロハニの順番、"
        "公式正答は変更しない。各肢の説明はその肢固有の正誤理由を具体的に書き、根拠のない"
        "誤答由来を作らない。図・写真選択肢は見た目を区別できる簡潔な日本語にする。"
        "問題31-50では追加画像が公式15頁の共通配線図であり、丸数字の位置と回路を必ず照合する。"
        "法令問題だけofficialReferenceUrlsを付け、次の一次資料URLから該当するものだけを使う: "
        f"{LAW_URL}, {RULE_URL}, {INTERPRETATION_URL}。"
        "出力はJSON配列のみ。各要素はnumber,question,choices(イ/ロ/ハ/ニ),officialAnswer,"
        "explanation,choiceExplanations(イ/ロ/ハ/ニ),diagramDescription,uncertainty(解消して空文字),"
        "officialReferenceUrls,visualCropsを持つ。visualCropsは公開に必要な図・写真だけを元の設問行PNG"
        "から切る矩形で、{kind,box:[left,top,right,bottom]}の配列。座標は提示する画像のピクセル座標。"
        "問題文・通常の文字選択肢だけを画像化しない。図や写真を含む選択肢は四肢をまとめて切ってよい。"
        "共通配線図は別途表示するのでvisualCropsへ入れない。"
    )
    blocks: list[dict] = [{"type": "text", "text": prompt}]
    by_number = {item["number"]: item for item in draft}
    audit_by_number = {item["number"]: item for item in audit["assessment"]}
    if first >= 31:
        blocks.append({"type": "text", "text": "次は公式15頁の共通配線図。丸数字1-20を参照する。"})
        blocks.append(image_block(wiring))
    for item in source:
        number = item["number"]
        row = ROOT / item["reviewCrop"]
        with Image.open(row) as image:
            size = image.size
        blocks.append({
            "type": "text",
            "text": (
                f"問{number}。公式正答={item['officialAnswer']}。設問行PNGサイズ={size[0]}x{size[1]}。"
                f"下書き={json.dumps(by_number[number], ensure_ascii=False)}。"
                f"独立監査={json.dumps(audit_by_number[number], ensure_ascii=False)}。"
            ),
        })
        blocks.append(image_block(row))

    result = claude(blocks, model)
    expected = {item["number"]: item for item in source}
    if len(result) != 5 or {item.get("number") for item in result} != set(expected):
        raise ValueError(f"{output.name}: expected five exact question numbers")
    PUBLIC.mkdir(parents=True, exist_ok=True)
    for item in result:
        number = item["number"]
        official = expected[number]
        if item.get("officialAnswer") != official["officialAnswer"]:
            raise ValueError(f"Q{number}: official answer changed")
        if set(item.get("choices", {})) != LABELS or set(item.get("choiceExplanations", {})) != LABELS:
            raise ValueError(f"Q{number}: incomplete choices or explanations")
        if item.get("uncertainty"):
            raise ValueError(f"Q{number}: unresolved uncertainty: {item['uncertainty']}")
        references = item.get("officialReferenceUrls", [])
        if any(url not in ALLOWED_REFERENCES for url in references):
            raise ValueError(f"Q{number}: unapproved official reference")
        row = ROOT / official["reviewCrop"]
        image_urls: list[str] = []
        with Image.open(row) as image:
            width, height = image.size
            for index, crop in enumerate(item.pop("visualCrops", []), 1):
                box = [int(value) for value in crop.get("box", [])]
                if len(box) == 4:
                    # Vision coordinates can overshoot a border by a few pixels.
                    # Clamping is deterministic and cannot add text outside the row.
                    box = [max(0, min(width, box[0])), max(0, min(height, box[1])),
                           max(0, min(width, box[2])), max(0, min(height, box[3]))]
                if len(box) != 4 or not (box[0] < box[2] and box[1] < box[3]):
                    raise ValueError(f"Q{number}: invalid visual crop {box} for {width}x{height}")
                target = PUBLIC / f"q{number}-{index}.png"
                image.crop(tuple(box)).save(target, optimize=True)
                image_urls.append("/images/denko2/2024-second/" + target.name)
        if number >= 31:
            image_urls.insert(0, "/images/denko2/2024-second/wiring-diagram.png")
        if image_urls:
            item["imageUrls"] = image_urls
        item["reviewedFromCrop"] = official["reviewCrop"]
    REVIEWED.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    input_hash = sha256((draft_path.read_bytes() + audit_path.read_bytes())).hexdigest()
    return f"{output.name}: finalized 5 questions, input {input_hash[:12]}"


def main() -> None:
    model = sys.argv[1] if len(sys.argv) > 1 else "sonnet"
    starts = [int(value) for value in sys.argv[2].split(",")] if len(sys.argv) > 2 else [1, 11, 21, 31, 41]
    wiring = page15_image()
    for start in starts:
        stem = f"20241027-q{start:02}-{start + 9:02}"
        for part in (1, 2):
            print(finalize_part(stem, part, model, wiring), flush=True)


if __name__ == "__main__":
    main()
