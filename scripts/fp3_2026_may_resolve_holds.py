"""Independent source-grounded Opus 5.5 recheck of held 2026 FP3 items."""

from __future__ import annotations

import hashlib
import json
import shutil
import subprocess
import sys
from pathlib import Path

from fp3_2026_may_review import EVIDENCE, MODEL, parse_result, verified

ROOT = Path(__file__).resolve().parents[1]
RECEIPTS = EVIDENCE / "receipts"
SOURCE = {
    "gakka-20": {
        "url": "https://www.nta.go.jp/users/gensen/2025kiso/",
        "evidence": "国税庁：令和7年度改正は原則2025年12月1日施行、令和7年分以後の所得税に適用。改正後の基礎控除額は所得132万円以下95万円、132万円超336万円以下88万円、336万円超489万円以下68万円、489万円超655万円以下63万円、655万円超2350万円以下58万円、2350万円超は別額。改正前48万円等。",
        "reviewFocus": "試験の法令基準日2025-04-01と令和7年分の税額適用を混同せず、一律58万円という命題を評価する。",
    },
    "gakka-35": {
        "url": "https://www.jfc.go.jp/n/finance/ippan/pdf/kyouiku_maruwakari.pdf",
        "evidence": "日本政策金融公庫の現行公式パンフレット3ページ：国の教育ローンは固定金利で最長20年。公式試験2026年5月公表分の正答はウ（固定金利、20年）。現在公開される公庫PDFには2026-01-01の表記があり、2025-04-01時点の条件変更履歴はこの資料からは確認できない。",
        "reviewFocus": "確定している公式試験正答と公庫の現行条件を優先し、基準日当時も同条件だったという未立証の断言を避けるべきか判定する。",
    },
    "jitsugi-2": {
        "url": "https://www.jafp.or.jp/exam/mohan/files/j3_202605_q.pdf",
        "evidence": "公式問題PDF2ページの原表を目視確認：アは3年後の基本生活費、イは1年後の年間収支、ウは4年後の金融資産残高。基本生活費基準年260万円、変動率2%。1年後の収入合計716万円、支出合計513万円。3年後金融資産残高837万円、4年後年間収支67万円、運用率1%。選択肢はア276、イ203、ウ904。公式正答はウ。",
        "reviewFocus": "原表の列位置の不確かさは解消した。計算と各肢理由を独立再検証する。",
    },
}


def main() -> None:
    key = sys.argv[1]
    section, number_str = key.split("-")
    number = int(number_str)
    info = SOURCE[key]
    questions = json.loads((EVIDENCE / f"{section}-extraction.json").read_text(encoding="utf-8"))["202605"]["questions"]
    q = next(item for item in questions if item["number"] == number)
    prompt = (
        "日本FP協会の2026年5月公表FP3級問題。前回の推論でHOLDになった問だけを独立再審査する。"
        "公式正答、一次資料の確認済み抜粋と原図確認情報を渡す。推測で穴埋めせず、基準日2025-04-01に注意。"
        "JSON配列のみ。number, answer(ア/イ/ウ), confident(boolean), explanation, choiceExplanations(全肢), "
        "needsReview(boolean), uncertainty, sourceUse を返す。根拠で不足が残るならneedsReview=true。\n"
        + json.dumps({"question": q, "officialAnswer": "アイウ"[q["answer"] - 1], **info}, ensure_ascii=False)
    )
    target = RECEIPTS / f"{key}-resolution.json"
    if target.exists():
        raw = json.loads(target.read_text(encoding="utf-8"))
    else:
        cmd = shutil.which("claude")
        if not cmd:
            raise RuntimeError("Claude CLI unavailable")
        result = subprocess.run(
            [cmd, "-p", "--model", MODEL, "--tools", "", "--output-format", "json"],
            input=prompt,
            text=True,
            capture_output=True,
            encoding="utf-8",
            timeout=1200,
            cwd=ROOT,
        )
        if result.returncode:
            raise RuntimeError(result.stderr[-1000:])
        raw = json.loads(result.stdout)
        if not verified(raw):
            raise RuntimeError("Requested Opus 5.5 was not served")
        target.write_bytes(result.stdout.encode("utf-8"))
        index_file = RECEIPTS / "index.json"
        index = json.loads(index_file.read_text(encoding="utf-8"))
        index[target.name] = {
            "kind": "source-grounded-resolution",
            "questions": [number],
            "requestedModel": MODEL,
            "resolvedModel": raw["modelUsage"][MODEL]["canonicalModel"],
            "provider": raw["modelUsage"][MODEL]["provider"],
            "promptSha256": hashlib.sha256(prompt.encode()).hexdigest(),
            "receiptSha256": hashlib.sha256(target.read_bytes()).hexdigest(),
            "sourceUrl": info["url"],
        }
        index_file.write_text(json.dumps(index, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    if not verified(raw):
        raise RuntimeError("Unverified receipt")
    rows = parse_result(raw)
    if len(rows) != 1 or rows[0]["number"] != number:
        raise RuntimeError("Question mismatch")
    print(json.dumps(rows[0], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
