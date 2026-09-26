"""Extract the official answer keys (合格基準・正答一覧) of the SSSC welfare exams.

Usage: py -3.12 scripts/sssc-welfare-answer-keys.py --cache DIR --out reports/sssc-welfare-20260926/answer-keys.json
The 精神保健福祉士 key lists 専門科目 1-48 and 共通科目 1-84 separately; the common
section must equal the 社会福祉士 key for questions 1-84 (same paper).
"""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

import fitz


def lines_of(path: Path) -> list[str]:
    return [line.strip() for page in fitz.open(path) for line in page.get_text().split("\n") if line.strip()]


def parse(lines: list[str]) -> dict[int, list[int]]:
    keys: dict[int, list[int]] = {}
    i = 0
    while i < len(lines):
        if lines[i].replace(" ", "") != "問題番号":
            i += 1
            continue
        numbers = []
        i += 1
        while lines[i].replace(" ", "") != "正答":
            numbers.append(int(lines[i]))
            i += 1
        i += 1
        answers = lines[i : i + len(numbers)]
        i += len(numbers)
        for number, answer in zip(numbers, answers):
            assert number not in keys, number
            keys[number] = [int(x) for x in answer.split(",")]
    return keys


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--cache", required=True)
    parser.add_argument("--out", required=True)
    args = parser.parse_args()
    cache = Path(args.cache)
    files = {
        "kaigo": cache / "kaigo38/k_kijun_seitou.pdf",
        "shakai": cache / "shakai38/s_kijun_seitou.pdf",
        "seishin": cache / "seishin28/se_kijun_seitou.pdf",
    }
    kaigo = parse(lines_of(files["kaigo"]))
    shakai = parse(lines_of(files["shakai"]))
    seishin_lines = lines_of(files["seishin"])
    split = seishin_lines.index("【社会福祉士・精神保健福祉士共通科目】")
    seishin = parse(seishin_lines[:split])
    seishin_common = parse(seishin_lines[split:])
    assert sorted(kaigo) == list(range(1, 126))
    assert sorted(shakai) == list(range(1, 130))
    assert sorted(seishin) == list(range(1, 49))
    assert all(seishin_common[n] == shakai[n] for n in range(1, 85)) and len(seishin_common) == 84
    payload = {
        "sourceFiles": {name: {"file": path.name, "sha256": hashlib.sha256(path.read_bytes()).hexdigest()} for name, path in files.items()},
        "kaigo": {str(k): v for k, v in sorted(kaigo.items())},
        "shakai": {str(k): v for k, v in sorted(shakai.items())},
        "seishin": {str(k): v for k, v in sorted(seishin.items())},
        "seishinCommonEqualsShakai1to84": True,
    }
    Path(args.out).write_text(json.dumps(payload, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print({k: len(v) for k, v in [("kaigo", kaigo), ("shakai", shakai), ("seishin", seishin)]})


if __name__ == "__main__":
    main()
