"""Drive Denken 3 questions through draft → independent review → promote → strict review.

Usage: python scripts/denken3-pipeline.py DATE SUBJECT Q [Q ...] [--workers N] [--refs URL,...] [--refs-map FILE] [--note TEXT]

`--refs-map` is a JSON object {"question number": "URL,URL"} for per-question references.

Every model step is one of the receipted scripts (Opus 5.5 only). A question that
does not reach an independent PASS and a strict PASS within the round limits is
left on HOLD and reported; nothing is accepted by this driver itself.
"""

from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor, as_completed
import json
from pathlib import Path
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
PRIVATE = ROOT / "data/raw_pdfs/denken3/review"
STRICT = ROOT / "docs/evidence/denken3/strict"
REVIEWED = ROOT / "data/questions/denken3/reviewed"
INDEPENDENT_ROUNDS = 4
STRICT_ROUNDS = 3


def run(*args: str) -> str:
    process = subprocess.run([sys.executable, *args], cwd=ROOT, capture_output=True, text=True, encoding="utf-8")
    output = "\n".join(line for line in (process.stdout + process.stderr).splitlines() if "deprecated" not in line)
    if process.returncode:
        raise RuntimeError(f"{' '.join(args)} failed: {output[-1500:]}")
    return output


def status(date: str, subject: str, number: int) -> str | None:
    path = PRIVATE / date / subject / f"q{number:02}-opus-review.json"
    if not path.is_file():
        return None
    return next(item["status"] for item in json.loads(path.read_text(encoding="utf-8"))["assessment"]
                if item.get("number") == number)


def units(date: str, subject: str, number: int) -> list[str]:
    manifest = json.loads((ROOT / "scripts/denken3-source-manifest.json").read_text(encoding="utf-8"))
    session = next(item for item in manifest["sessions"] if item["examDate"].replace("-", "") == date)
    paper = next(item for item in session["subjects"] if item["subject"] == subject)
    return [f"{number}{unit['part'] or ''}" for unit in paper["answerUnits"] if unit["question"] == number]


def strict_receipt(date: str, subject: str, number: int, round_name: str) -> Path:
    stamp = "-".join(f"q{number:02}{token[len(str(number)):]}" for token in units(date, subject, number))
    return STRICT / f"{date}-{subject}-{round_name}-{stamp}-opus.json"


def drive(date: str, subject: str, number: int, refs: str, note: str = "") -> str:
    log = []
    draft = PRIVATE / date / subject / f"q{number:02}-vision-draft.json"
    for attempt in range(3):
        if draft.is_file():
            break
        try:
            run("scripts/denken3-vision-draft.py", date, subject, str(number))
        except RuntimeError as error:
            log.append(f"draft retry {attempt + 1}: {str(error)[-200:]}")
    if not draft.is_file():
        return f"q{number}: HOLD (no draft) {log}"
    name = f"{date}-{subject}-q{number:02}-{number:02}.json"
    for strict_round in range(1, STRICT_ROUNDS + 1):
        for _ in range(INDEPENDENT_ROUNDS):
            if status(date, subject, number) is None:
                run("scripts/denken3-independent-review.py", date, subject, str(number))
            if status(date, subject, number) == "PASS":
                break
            args = ["scripts/denken3-revise-draft.py", date, subject, str(number)]
            if refs:
                args += ["--refs", refs]
            if note:
                args += ["--note", note]
            run(*args)
            log.append("revised(independent)")
        if status(date, subject, number) != "PASS":
            return f"q{number}: HOLD (independent review not PASS) {log}"
        if not (REVIEWED / name).is_file():
            run("scripts/denken3-promote-reviewed.py", date, subject, str(number))
        round_name = f"s{strict_round}"
        receipt = strict_receipt(date, subject, number, round_name)
        while receipt.exists():  # an earlier driver run already used this round name
            strict_round += 10
            round_name = f"s{strict_round}"
            receipt = strict_receipt(date, subject, number, round_name)
        run("scripts/denken3-direct-review.py", date, subject, round_name, *units(date, subject, number))
        assessment = json.loads(receipt.read_text(encoding="utf-8"))["assessment"]
        if all(item["status"] == "PASS" for item in assessment):
            return f"q{number}: STRICT PASS ({round_name}) {log}"
        run("scripts/denken3-withdraw-candidate.py", date, subject, str(number))
        args = ["scripts/denken3-revise-draft.py", date, subject, str(number), "--strict",
                receipt.relative_to(ROOT).as_posix()]
        if refs:
            args += ["--refs", refs]
        if note:
            args += ["--note", note]
        run(*args)
        log.append(f"revised(strict {round_name})")
    return f"q{number}: HOLD (strict review not PASS) {log}"


def main() -> None:
    args = sys.argv[1:]
    workers, refs = 4, ""
    if "--workers" in args:
        index = args.index("--workers")
        workers = int(args[index + 1])
        del args[index:index + 2]
    note = ""
    if "--note" in args:
        index = args.index("--note")
        note = args[index + 1]
        del args[index:index + 2]
    refs_map: dict[str, str] = {}
    if "--refs-map" in args:
        index = args.index("--refs-map")
        refs_map = json.loads(Path(args[index + 1]).read_text(encoding="utf-8"))
        del args[index:index + 2]
    if "--refs" in args:
        index = args.index("--refs")
        refs = args[index + 1]
        del args[index:index + 2]
    date, subject, numbers = args[0], args[1], [int(value) for value in args[2:]]
    with ThreadPoolExecutor(max_workers=workers) as pool:
        jobs = {pool.submit(drive, date, subject, number, refs_map.get(str(number), refs), note): number for number in numbers}
        for job in as_completed(jobs):
            try:
                print(job.result(), flush=True)
            except Exception as error:  # noqa: BLE001 - report and keep other questions running
                print(f"q{jobs[job]}: HOLD (error) {str(error)[-600:]}", flush=True)


if __name__ == "__main__":
    main()
