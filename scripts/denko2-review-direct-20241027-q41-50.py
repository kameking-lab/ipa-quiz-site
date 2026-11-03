"""Direct source-aware Opus review for 2024 lower academic Q41-50."""

from __future__ import annotations

from base64 import b64encode
from hashlib import sha256
import json
from pathlib import Path
import re
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
PAPER = "20241027"
REVIEWED = ROOT / "data/questions/denko2/reviewed"
BATCHES = ROOT / "data/raw_pdfs/denko2/review/batches"
OUT = ROOT / "docs/evidence/denko2-strict-20241027-q41-50"
SOURCE_PACKS = ROOT / "docs/evidence/denko2-sources/20241027"
WIRING = ROOT / "public/images/denko2/2024-second/wiring-diagram.png"
CLI = Path.home() / "AppData/Roaming/npm/claude.cmd"
ISSUE_KEYS = ("textIssues", "choiceIssues", "answerIssues", "explanationIssues", "visualIssues", "sourceIssues")
OFFICIAL_EXCERPTS = ROOT / "docs/evidence/denko2-strict-20240526/OFFICIAL-SOURCE-EXCERPTS.json"


def digest(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def canonical(value) -> str:
    return sha256(json.dumps(value, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()


def image(path: Path) -> dict:
    return {"type": "image", "source": {"type": "base64", "media_type": "image/png",
            "data": b64encode(path.read_bytes()).decode("ascii")}}


def parse_result(stdout: str) -> list[dict]:
    events = [json.loads(line) for line in stdout.splitlines() if line.startswith("{")]
    final = next((event for event in reversed(events) if event.get("type") == "result"), None)
    if final is None or final.get("is_error"):
        raise ValueError(f"No successful Claude result: {stdout[-1000:]}")
    value = re.sub(r"^```(?:json)?\s*|\s*```$", "", final.get("result", "").strip(), flags=re.I)
    start, end = value.find("["), value.rfind("]")
    if start < 0 or end < start:
        raise ValueError(f"No JSON array: {value[-1000:]}")
    result, _ = json.JSONDecoder().raw_decode(value[start:])
    return result


def review(numbers: list[int], round_name: str) -> Path:
    candidates = {item["number"]: item
                  for path in REVIEWED.glob(f"{PAPER}-q*.json")
                  for item in json.loads(path.read_text(encoding="utf-8"))
                  if item["number"] in numbers}
    sources = {item["number"]: item
               for path in BATCHES.glob(f"{PAPER}-q*.json")
               for item in json.loads(path.read_text(encoding="utf-8")).get("questions", [])
               if item["number"] in numbers}
    if set(candidates) != set(numbers) or set(sources) != set(numbers):
        raise ValueError("candidate/source coverage differs")
    ordered = [candidates[number] for number in numbers]
    rows = {str(number): digest(ROOT / sources[number]["reviewCrop"]) for number in numbers}
    figures: dict[str, str] = {}
    shared = {str(WIRING.relative_to(ROOT)).replace("\\", "/"): digest(WIRING)}
    for number in numbers:
        for url in candidates[number].get("imageUrls", []) + list(candidates[number].get("choiceImageUrls", {}).values()):
            path = ROOT / "public" / url.lstrip("/")
            key = str(path.relative_to(ROOT)).replace("\\", "/")
            if path == WIRING:
                shared[key] = digest(path)
            else:
                figures[key] = digest(path)
    hashes = {
        "draftSha256": canonical(ordered),
        "candidateSha256": {str(n): canonical(candidates[n]) for n in numbers},
        "rowSha256": rows,
        "detailFigureSha256": figures,
        "sharedFigureSha256": shared,
        "legalReceiptSha256": {},
        "sourcePackSha256": {
            str(n): digest(SOURCE_PACKS / f"q{n:02}.json")
            for n in numbers if (SOURCE_PACKS / f"q{n:02}.json").is_file()
        },
    }
    prompt = (
        "あなたは第二種電気工事士2024年度下期学科試験の最終監査者。候補JSONを公式問題の設問行原図、"
        "公式15頁共通配線図、全公開図と一問ずつ照合する。問題文の否定・数値・単位、イロハニ全肢、"
        "公式正答、総合解説、各肢固有の正誤理由、丸数字の位置・回路・心線数、写真器具の外観を厳密に検査する。"
        "sourceQuestionPdfUrl/sourceAnswerPdfUrlは試験センター公式問題・正答で、当該設問での器具分類・正答を"
        "直接裏付ける一次資料として扱う。法令・規格の独立した主張は候補のofficialReferenceUrlsをWebFetchし、"
        "必要ならe-gov.go.jp、meti.go.jp、mlit.go.jp、shiken.or.jp、jisc.go.jpの一次資料のみをWebSearchする。"
        "民間資料や記憶だけで確認しない。PASSは誤り・曖昧さ・要外部確認が一つもない場合だけ。"
        "statusがPASSならtextIssues,choiceIssues,answerIssues,explanationIssues,visualIssues,sourceIssuesを全て空配列にする。"
        "verifiedEvidenceには照合した公式原図・正答、配線図位置、一次資料URLと条項を具体的に書く。"
        "出力はJSON配列のみ。各要素はnumber,status(PASS/FIX),上記6配列,verifiedEvidenceを持つ。公式正答は変更しない。"
    )
    blocks: list[dict] = [{"type": "text", "text": prompt},
                          {"type": "text", "text": "公式問題15頁の共通配線図:"}, image(WIRING)]
    if any(n in numbers for n in (42, 49)) and OFFICIAL_EXCERPTS.is_file():
        evidence = json.loads(OFFICIAL_EXCERPTS.read_text(encoding="utf-8"))
        point = next(item for item in evidence["sources"] if item["url"].endswith("point2024.pdf"))
        pages = (24, 25, 26) if 49 in numbers else (24, 25)
        excerpts = "\n\n".join(f"[公式PDF p.{page}]\n{point['pages'][str(page)]}" for page in pages)
        blocks.append({"type": "text", "text":
                       f"試験センター公式資料 URL={point['url']} SHA256={point['sha256']}\n{excerpts}"})
    for number in numbers:
        candidate, source = candidates[number], sources[number]
        source_pack = SOURCE_PACKS / f"q{number:02}.json"
        if source_pack.is_file():
            blocks.append({"type": "text", "text":
                           f"問{number}の固定済み公式一次資料pack SHA256={digest(source_pack)}:\n" +
                           source_pack.read_text(encoding="utf-8")})
        blocks.append({"type": "text", "text":
                       f"問{number}。公式正答={source['officialAnswer']}。候補JSON=" +
                       json.dumps(candidate, ensure_ascii=False)})
        blocks.append(image(ROOT / source["reviewCrop"]))
        for url in candidate.get("imageUrls", []) + list(candidate.get("choiceImageUrls", {}).values()):
            path = ROOT / "public" / url.lstrip("/")
            if path.is_file() and path != WIRING:
                blocks += [{"type": "text", "text": f"問{number}の公開用図 {path.name}:"}, image(path)]
    request = {"type": "user", "message": {"role": "user", "content": blocks}}
    process = subprocess.run(
        [str(CLI), "-p", "--model", "opus", "--effort", "high", "--input-format", "stream-json",
         "--output-format", "stream-json", "--verbose", "--tools", "WebFetch,WebSearch"],
        input=json.dumps(request, ensure_ascii=False) + "\n", text=True, encoding="utf-8",
        capture_output=True, cwd=ROOT, timeout=900,
    )
    if process.returncode:
        raise RuntimeError((process.stderr or process.stdout)[-2000:])
    result = parse_result(process.stdout)
    if len(result) != len(numbers) or {item.get("number") for item in result} != set(numbers):
        raise ValueError("review coverage differs")
    for item in result:
        for key in ISSUE_KEYS:
            if not isinstance(item.get(key), list):
                raise ValueError(f"Q{item.get('number')} missing {key}")
        clean = all(not item[key] for key in ISSUE_KEYS)
        if (item.get("status") == "PASS") != clean:
            raise ValueError(f"Q{item.get('number')} PASS/issues contradiction")
        if not item.get("verifiedEvidence"):
            raise ValueError(f"Q{item.get('number')} no evidence")
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / f"{round_name}-q{'-'.join(f'{n:02}' for n in numbers)}-opus.json"
    path.write_text(json.dumps({"schemaVersion": 1, "paper": PAPER,
                                "reviewModel": "claude-opus-5-5", "inputHashes": hashes,
                                "assessment": result}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{path.name}: PASS={sum(i['status']=='PASS' for i in result)} FIX={sum(i['status']=='FIX' for i in result)}")
    return path


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("usage: script ROUND Q,Q,...")
    review([int(value) for value in sys.argv[2].split(",")], sys.argv[1])
