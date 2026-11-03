"""Source-aware strict audit for the 2024 first electrician paper.

PASS is valid only when every issue array is empty.  The reviewer may use only
official Japanese-government sources when checking laws, standards excerpts,
and public-work symbol tables.
"""

from __future__ import annotations

from base64 import b64encode
from hashlib import sha256
import json
from pathlib import Path
import re
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
REVIEWED = ROOT / "data/questions/denko2/reviewed"
BATCHES = ROOT / "data/raw_pdfs/denko2/review/batches"
OUT = ROOT / "docs/evidence/denko2-strict-20240526"
CLI = Path.home() / "AppData/Roaming/npm/claude.cmd"
WIRING = ROOT / "public/images/denko2/2024-first/wiring-main.png"
ISSUE_KEYS = ("textIssues", "choiceIssues", "answerIssues", "explanationIssues", "visualIssues", "sourceIssues")
LOCAL_EVIDENCE = ROOT / "docs/evidence/denko2-strict-20240526/OFFICIAL-SOURCE-EXCERPTS.json"
JISC_C8303_EVIDENCE = ROOT / "docs/evidence/denko2-strict-20240526/JISC-C8303-SOURCE.json"
METI_BEPPYOU4_EVIDENCE = ROOT / "docs/evidence/denko2-strict-20240526/METI-BEPPYOU4-EXCERPT.json"
JISC_C8430_EVIDENCE = ROOT / "docs/evidence/denko2-strict-20240526/JISC-C8430-SOURCE.json"
MLIT_STANDARD_EVIDENCE = ROOT / "docs/evidence/denko2-strict-20240526/MLIT-ELECTRICAL-STANDARD-2025.json"
METI_PAGES = {
    8: [145, 146], 9: [147, 148], 10: [148, 149], 12: [145, 146],
    16: [156, 158, 160, 161],
    20: [160, 161], 21: [154, 156, 158], 22: [164, 165], 23: [153, 154],
    26: [31, 32, 33, 44, 45], 36: [31, 32, 33, 39],
    38: [36, 37],
}
POINT_PAGES = {19: [24, 25], 46: [24, 25, 26], 48: [24, 25], 49: [24, 25]}
PSE_PAGES = {29: [1, 4, 5, 6, 8, 9]}


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
    if not isinstance(result, list):
        raise ValueError("Review result is not an array")
    return result


def load_rows(numbers: list[int]) -> tuple[dict[int, dict], dict[int, dict], dict[int, Path]]:
    candidates: dict[int, dict] = {}
    candidate_paths: dict[int, Path] = {}
    for path in REVIEWED.glob("20240526-q*.json"):
        for row in json.loads(path.read_text(encoding="utf-8")):
            if row["number"] in numbers:
                candidates[row["number"]] = row
                candidate_paths[row["number"]] = path
    sources: dict[int, dict] = {}
    for path in BATCHES.glob("20240526-q*.json"):
        data = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(data, dict) or not isinstance(data.get("questions"), list):
            continue
        for row in data.get("questions", []):
            if row["number"] in numbers:
                sources[row["number"]] = row
    if set(candidates) != set(numbers) or set(sources) != set(numbers):
        raise ValueError(f"Missing rows: candidates={set(numbers)-set(candidates)} sources={set(numbers)-set(sources)}")
    return candidates, sources, candidate_paths


def review(numbers: list[int], round_name: str) -> Path:
    candidates, sources, _ = load_rows(numbers)
    OUT.mkdir(parents=True, exist_ok=True)
    name = f"{round_name}-q{'-'.join(f'{n:02}' for n in numbers)}-opus.json"
    output = OUT / name
    hashes = {
        "candidateSha256": {str(n): sha256(json.dumps(candidates[n], ensure_ascii=False, sort_keys=True).encode()).hexdigest() for n in numbers},
        "sourceCropSha256": {str(n): sha256((ROOT / sources[n]["reviewCrop"]).read_bytes()).hexdigest() for n in numbers},
    }
    prompt = (
        "あなたは第二種電気工事士2024年度上期の最終監査者。候補JSONを公式問題の原図と一問ずつ照合し、"
        "問題文、否定、数値、単位、イロハニ全肢、公式正答、総合解説、全肢理由、図表を厳密に検査する。"
        "法令・図記号・器具仕様の主張は、候補のofficialReferenceUrlsをWebFetchし、必要なら官公庁ドメイン"
        "（meti.go.jp、mlit.go.jp、e-gov.go.jp、shiken.or.jp）の一次資料だけをWebSearchして確認する。"
        "民間サイトや記憶だけで法令確認を完了しない。sourceQuestionPdfUrl/sourceAnswerPdfUrlは試験センターの"
        "公式問題・正答であり、図記号・器具写真の本問での分類を直接裏付ける一次資料として扱う。"
        "supplementalOfficialSourceUrlsは試験センターが公開した公式技術資料である。添付のofficial local excerptは、"
        "記載URLから取得したPDFをSHA固定して抽出した本文なので、WebFetchが"
        "403でも一次資料確認に使用できる。参照URLが主張を直接裏付けない場合はsourceIssuesへ記す。"
        "問題31以降は添付する公式共通配線図の丸数字位置と候補の図切出しも照合する。"
        "PASSは誤り・曖昧さ・要外部確認が一つもない場合だけ。statusがPASSならtextIssues,choiceIssues,"
        "answerIssues,explanationIssues,visualIssues,sourceIssuesを必ず全て空配列にする。確認不能もPASSにしない。"
        "verifiedEvidenceには確認した一次資料URLと、裏付けた条項・図表を簡潔に記す（文字列。問題に法令主張が"
        "なければ『公式原図と公式正答を照合』）。出力はJSON配列のみ。各要素はnumber,status(PASS/FIX),"
        "上記6配列,verifiedEvidenceを持つ。公式正答は変更しない。"
    )
    blocks: list[dict] = [{"type": "text", "text": prompt}]
    if LOCAL_EVIDENCE.is_file():
        evidence = json.loads(LOCAL_EVIDENCE.read_text(encoding="utf-8"))["sources"]
        requests: dict[str, set[int]] = {}
        for n in numbers:
            if n in METI_PAGES:
                requests.setdefault("20231226-2.pdf", set()).update(METI_PAGES[n])
            if n in POINT_PAGES:
                requests.setdefault("point2024.pdf", set()).update(POINT_PAGES[n])
            if n in PSE_PAGES:
                requests.setdefault("hanbai.pdf", set()).update(PSE_PAGES[n])
        for source in evidence:
            name = source["url"].rsplit("/", 1)[-1]
            if name not in requests:
                continue
            excerpts = "\n\n".join(f"[PDF p.{p}]\n{source['pages'][str(p)]}" for p in sorted(requests[name]) if str(p) in source["pages"])
            blocks.append({"type": "text", "text": f"official local excerpt URL={source['url']} SHA256={source['sha256']}\n{excerpts}"})
    if 33 in numbers and JISC_C8303_EVIDENCE.is_file():
        jis = json.loads(JISC_C8303_EVIDENCE.read_text(encoding="utf-8"))
        excerpts = "\n\n".join(
            f"[JIS PDF p.{p}]\n{jis['pageText'][str(p)]}"
            for p in jis["relevantPages"]
        )
        blocks.append({"type": "text", "text": (
            f"JISC公式音声PDF {jis['jisNumber']}『{jis['title']}』。取得経路={jis['retrievalUrl']} "
            f"SHA256={jis['sha256']}。次の本文は同じ公式PDFから抽出。\n{excerpts}"
        )})
        if METI_BEPPYOU4_EVIDENCE.is_file():
            meti = json.loads(METI_BEPPYOU4_EVIDENCE.read_text(encoding="utf-8"))
            blocks.append({"type": "text", "text": (
                f"METI公式別表第四の該当4行。URL={meti['sourceUrl']} "
                f"excerptSHA256={meti['excerptSha256']} retrieval={meti['retrievalMethod']}\n"
                + json.dumps(meti["relevantRows"], ensure_ascii=False)
            )})
    if any(number in {42, 43} for number in numbers) and JISC_C8430_EVIDENCE.is_file():
        jis = json.loads(JISC_C8430_EVIDENCE.read_text(encoding="utf-8"))
        excerpts = "\n\n".join(
            f"[JIS PDF p.{p}]\n{jis['pageText'][str(p)]}"
            for p in jis["relevantPages"]
        )
        blocks.append({"type": "text", "text": (
            f"JISC公式音声PDF {jis['jisNumber']}『{jis['title']}』。取得経路={jis['retrievalUrl']} "
            f"SHA256={jis['sha256']}。次の本文は同じ公式PDFから抽出。\n{excerpts}"
        )})
    if any(number in {16, 42, 43} for number in numbers) and MLIT_STANDARD_EVIDENCE.is_file():
        mlit = json.loads(MLIT_STANDARD_EVIDENCE.read_text(encoding="utf-8"))
        requested_pages: set[int] = set()
        if 16 in numbers:
            requested_pages.add(22)
        if any(number in {42, 43} for number in numbers):
            requested_pages.update({21, 71, 72, 82})
        excerpts = "\n\n".join(
            f"[MLIT PDF p.{p}]\n{mlit['pageText'][str(p)]}"
            for p in sorted(requested_pages)
        )
        blocks.append({"type": "text", "text": (
            f"国土交通省公式『{mlit['title']}』。URL={mlit['sourceUrl']} "
            f"SHA256={mlit['sha256']}。次の本文は同じ公式PDFから抽出。\n{excerpts}"
        )})
    if any(n >= 31 for n in numbers):
        blocks += [{"type": "text", "text": "公式問題PDFの15頁共通配線図:"}, image(WIRING)]
    for n in numbers:
        row = candidates[n]
        blocks.append({"type": "text", "text": f"問{n}。公式正答={sources[n]['officialAnswer']}。候補JSON=" + json.dumps(row, ensure_ascii=False)})
        blocks.append(image(ROOT / sources[n]["reviewCrop"]))
        for url in row.get("imageUrls", []) + list(row.get("choiceImageUrls", {}).values()):
            path = ROOT / "public" / url.lstrip("/")
            if path.is_file():
                blocks += [{"type": "text", "text": f"問{n}の公開用図切出し {path.name}:"}, image(path)]
    request = {"type": "user", "message": {"role": "user", "content": blocks}}
    process = subprocess.run(
        [str(CLI), "-p", "--model", "opus", "--effort", "high", "--input-format", "stream-json",
         "--output-format", "stream-json", "--verbose", "--tools", "WebFetch,WebSearch"],
        input=json.dumps(request, ensure_ascii=False) + "\n", text=True, encoding="utf-8",
        capture_output=True, cwd=ROOT, timeout=900,
    )
    if process.returncode:
        raise RuntimeError((process.stderr or process.stdout)[-2000:])
    rows = parse_result(process.stdout)
    if {row.get("number") for row in rows} != set(numbers) or len(rows) != len(numbers):
        raise ValueError("Review coverage differs")
    for row in rows:
        for key in ISSUE_KEYS:
            if not isinstance(row.get(key), list):
                raise ValueError(f"Missing array {key}: Q{row.get('number')}")
        clean = all(not row[key] for key in ISSUE_KEYS)
        if (row.get("status") == "PASS") != clean:
            raise ValueError(f"PASS/issue contradiction: Q{row.get('number')}")
        if not row.get("verifiedEvidence"):
            raise ValueError(f"No evidence: Q{row.get('number')}")
    output.write_text(json.dumps({"schemaVersion": 1, "reviewModel": "claude-opus-5-5",
                                  "inputHashes": hashes, "assessment": rows}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{output.name}: PASS={sum(r['status']=='PASS' for r in rows)} FIX={sum(r['status']=='FIX' for r in rows)}")
    return output


if __name__ == "__main__":
    if len(sys.argv) < 3:
        raise SystemExit("usage: script ROUND Q,Q,...")
    review([int(value) for value in sys.argv[2].split(",")], sys.argv[1])
