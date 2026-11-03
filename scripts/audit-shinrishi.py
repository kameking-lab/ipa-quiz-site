"""第8・9回の公式PDFと候補JSONを照合。Python標準ライブラリとpdftotextが必要。
python scripts/audit-shinrishi.py --source-dir /tmp/shinrishi
PDF未取得時は公式URLから取得する。生成問題・解説の生成は行わない。
"""
import argparse
import hashlib
import json
import re
import subprocess
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://www.jccpp.or.jp/files/items/222/File/"
FILES = {"answers": "03_gokaku_happyo_09.pdf", "am": "04_gokaku_happyo_09.pdf", "pm": "05_gokaku_happyo_09pm.pdf"}


def canonical(text):
    # 組版上の空白・制御文字、問27のベクター区切り線だけを除く。
    return re.sub(r"[\s\x08─]", "", text)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-dir", type=Path, required=True)
    parser.add_argument("--round", type=int, choices=(8, 9), default=9)
    parser.add_argument("--session", choices=("am", "all"), default="all")
    args = parser.parse_args()
    base = BASE if args.round == 9 else BASE.replace("/222/", "/132/")
    year = 2026 if args.round == 9 else 2025
    files = dict(FILES)
    if args.round == 8:
        files["pm"] = "05_gokaku_happyo_09.pdf"
    args.source_dir.mkdir(parents=True, exist_ok=True)
    texts, sources = {}, {}
    for session, filename in files.items():
        path = args.source_dir / filename
        if not path.exists():
            urllib.request.urlretrieve(base + filename, path)
        texts[session] = subprocess.check_output(["pdftotext", "-layout", str(path), "-"], stderr=subprocess.DEVNULL).decode()
        sources[session] = {"url": base + filename, "sha256": hashlib.sha256(path.read_bytes()).hexdigest()}
    # 正答表は問題番号の行と対応する正答行を独立に読み取る。
    lines = texts["answers"].splitlines()
    answers = {}
    for i, line in enumerate(lines):
        numbers = re.findall(r"問\s*(\d+)", line)
        if len(numbers) < 4:
            continue
        values = lines[i + 1].split()
        assert len(numbers) == len(values), (numbers, values)
        for number, value in zip(numbers, values):
            answers[int(number)] = [int(v) for v in value.split(",")]
    assert sorted(answers) == list(range(1, 155))
    questions = json.loads((ROOT / f"data/questions/shinrishi/{year}-annual.json").read_text())
    evidence = []
    for session in (("am",) if args.session == "am" else ("am", "pm")):
        pages = {}
        cleaned = []
        for page_number, page in enumerate(texts[session].split("\f"), 1):
            for match in re.finditer(r"^問(\d+)\s", page, re.M):
                pages[int(match[1])] = page_number
            cleaned.append(re.sub(r"^.*DKJM-.*$", "", page, flags=re.M))
        text = "\n".join(cleaned)
        matches = list(re.finditer(r"^問(\d+)\s+", text, re.M))
        assert len(matches) == 77
        for i, match in enumerate(matches):
            number = int(match[1])
            end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
            parts = re.split(r"[①②③④⑤]\s*", text[match.end():end])
            q = next(q for q in questions if q["qNumber"] == number)
            assert q["session"] == session
            assert canonical(q["question"]) == canonical(parts[0]), (number, "本文")
            assert [canonical(v) for v in q["choices"].values()] == [canonical(v) for v in parts[1:]], (number, "選択肢")
            actual = q["answer"] if isinstance(q["answer"], list) else [q["answer"]]
            assert ["アイウエオ".index(v) + 1 for v in actual] == answers[number], (number, "正答")
            assert q.get("requiredSelections", 1) == len(answers[number])
            assert q["sourcePdfUrl"] == base + files[session] + "#page=" + str(pages[number])
            evidence.append({"number": number, "session": session, "pdfPage": pages[number], "officialAnswer": answers[number], "textSha256": hashlib.sha256(canonical("".join(parts)).encode()).hexdigest()})
    assert len(questions) == len(evidence)
    result = {"round": args.round, "examDate": "2026-03-01" if args.round == 9 else "2025-03-02", "sources": sources, "questions": evidence, "checked": len(evidence)}
    destination = ROOT / f"reports/shinrishi-{args.round}-source-audit.json"
    destination.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
    print(f"公式PDF照合: {len(evidence)}問の本文・選択肢・正答・選択数・ページが一致")


if __name__ == "__main__":
    main()
