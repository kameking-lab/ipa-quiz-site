"""Verify the pinned accepted artifacts without network or credentials."""
import hashlib
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
report = root / "reports/qkishou-20261103"
files = json.loads((report / "FILES.json").read_text(encoding="utf-8"))
assert len(files) == 145
for item in files:
    payload = (root / item["path"]).read_bytes()
    if item["path"].endswith((".ts", ".tsx", ".json", ".md", ".html", ".gitignore")):
        payload = payload.replace(b"\r\n", b"\n")
    assert len(payload) == item["bytes"], item["path"]
    assert hashlib.sha256(payload).hexdigest() == item["sha256"], item["path"]
source = json.loads((root / "data/qualification-staging/kisho-65-66-private/source-pages.json").read_text(encoding="utf-8"))
expected = {65: {"ippan": 15, "senmon": 15, "pm1": 7, "pm2": 3},
            66: {"ippan": 15, "senmon": 15, "pm1": 5, "pm2": 3}}
for round_number, sessions in expected.items():
    for session, count in sessions.items():
        numbers = sorted(q["qNumber"] for q in source["questions"] if q["round"] == round_number and q["session"] == session)
        assert numbers == list(range(1, count + 1)), (round_number, session, numbers)
assert len(source["questions"]) == 78
assert len(source["answerFields"]) == 237
assert len(source["assets"]) == 130
print("PASS: 145 artifact hashes; round65=40 / round66=38; 237 fields / 130 assets")
