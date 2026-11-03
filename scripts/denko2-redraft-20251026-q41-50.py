"""Redraft the ten visual wiring questions against source rows and whole wiring maps."""

from base64 import b64encode
import json
from pathlib import Path
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
CLI = Path.home() / "AppData/Roaming/npm/claude.cmd"
BATCH = ROOT / "data/raw_pdfs/denko2/review/batches/20251026-q41-50.json"
OUT = ROOT / "data/raw_pdfs/denko2/review/batches"
ROW = ROOT / "data/raw_pdfs/denko2/review/20251026"
PUBLIC = ROOT / "public/images/denko2/2025-second"
MAPS = {
    "firstFloor": PUBLIC / "wiring-first-floor.png",
    "secondFloor": PUBLIC / "wiring-second-floor.png",
    "panel": PUBLIC / "wiring-panel.png",
}


def image(path: Path) -> dict:
    return {"type": "image", "source": {"type": "base64", "media_type": "image/png",
                                       "data": b64encode(path.read_bytes()).decode("ascii")}}


def run(first: int, last: int) -> None:
    batch = json.loads(BATCH.read_text(encoding="utf-8"))
    sources = [item for item in batch["questions"] if first <= item["number"] <= last]
    draft = json.loads((OUT / f"20251026-q41-50-vision-part{1 if first == 41 else 2:02}.json").read_text(encoding="utf-8"))
    blocks = [{"type": "text", "text": (
        "あなたは第二種電気工事士の原本校閲者。次の公式問題画像は本文の右側にイ・ロ・ハ・ニの写真と回路図が並ぶ。"
        "対応する建物全体の配線図も添付する。既存draftは誤りを多く含むため原本画像と配線図で必ず訂正する。"
        "各問題の質問本文を一字一句に近くテキスト化し、4肢は写真中の器具・構成・本数を正確なテキストで明示する。"
        "写真は別途図表として表示される。解説は配線図の該当丸数字を見て、なぜ正答か、誤答4肢がなぜ違うか具体的に。"
        "Q41は⑪のボックスと電線分岐を数え、コネクタ写真の色だけから接続線数を捏造しない。"
        "Q42/Q43は⑫/⑬の記号と現物写真を直接対応させる。Q44は⑭の分電盤記号と銘板を照合する。"
        "Q45は単品ケーブルか複数本かと心線数を区別する。Q46/Q47は写真に印字された小/中/○と個数を精確に転記し、⑯/⑰を結線図で数える。"
        "Q48は写真下の各接点回路図を照合し、配線図に無いスイッチを正答として理由づける。"
        "Q49/Q50は写真で器具名を特定し、2階配線または全配線図に必要か判定する。"
        "公式正答を変更しないが、それだけを根拠にしない。不明ならuncertaintyに残す。"
        "回答はJSON配列のみ。各問number,question,choices(イ/ロ/ハ/ニ),officialAnswer,explanation,"
        "choiceExplanations(4肢),diagramDescription,uncertaintyを出す。推定・可能性という曖昧な解説は禁止。"
    )}]
    for key, path in MAPS.items():
        blocks += [{"type": "text", "text": f"公式共通配線図: {key}"}, image(path)]
    for source in sources:
        number = source["number"]
        blocks += [{"type": "text", "text": f"問{number}公式正答={source['officialAnswer']}。既存draft（要検証）={json.dumps(next(item for item in draft if item['number']==number), ensure_ascii=False)}"},
                   image(ROW / f"q{number:02}.png")]
    payload = {"type": "user", "message": {"role": "user", "content": blocks}}
    process = subprocess.run([str(CLI), "-p", "--model", "opus", "--effort", "high", "--input-format", "stream-json",
                              "--output-format", "stream-json", "--verbose", "--tools", ""],
                             input=json.dumps(payload, ensure_ascii=False) + "\n", text=True, encoding="utf-8",
                             capture_output=True, cwd=ROOT, timeout=600)
    if process.returncode:
        raise RuntimeError(f"Claude exit {process.returncode}: {(process.stderr or process.stdout)[-500:]}")
    events = [json.loads(line) for line in process.stdout.splitlines() if line.startswith("{")]
    result = next((item for item in reversed(events) if item.get("type") == "result"), None)
    if result is None or result.get("is_error"):
        raise ValueError(f"No successful result: {process.stdout[-500:]}")
    text = re.sub(r"^```(?:json)?\s*|\s*```$", "", result["result"].strip(), flags=re.I)
    items = json.loads(text[text.find("["):text.rfind("]") + 1])
    if [item["number"] for item in items] != list(range(first, last + 1)):
        raise ValueError("Incomplete output")
    for item in items:
        source = next(value for value in sources if value["number"] == item["number"])
        if item["officialAnswer"] != source["officialAnswer"]:
            raise ValueError(f"Official answer changed: {item['number']}")
        if set(item["choices"]) != {"イ", "ロ", "ハ", "ニ"} or set(item["choiceExplanations"]) != {"イ", "ロ", "ハ", "ニ"}:
            raise ValueError(f"Missing four choices or reasons: {item['number']}")
    path = OUT / f"20251026-q41-50-redraft-part{1 if first == 41 else 2:02}.json"
    path.write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{path.name}: {len(items)} original-image redrafts, {sum(bool(item['uncertainty']) for item in items)} uncertainty flags")


if __name__ == "__main__":
    if sys.argv[1:] == ["part01"]:
        run(41, 45)
    elif sys.argv[1:] == ["part02"]:
        run(46, 50)
    else:
        raise SystemExit("Usage: denko2-redraft-20251026-q41-50.py part01|part02")
