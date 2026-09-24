"""Verify Q29's four PSE classifications against current official e-Gov XML."""

from datetime import datetime, timezone
from hashlib import sha256
import json
from pathlib import Path
import requests
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
URL = "https://laws.e-gov.go.jp/api/1/lawdata/337CO0000000324"
PAGE = "https://laws.e-gov.go.jp/law/337CO0000000324/"
raw = requests.get(URL, timeout=30)
raw.raise_for_status()
tables = ET.fromstring(raw.content).findall(".//AppdxTable")
if len(tables) != 2:
    raise ValueError("Expected enforcement order Tables 1 and 2")
specified, non_specified = ("".join(table.itertext()) for table in tables)

checks = {
    "イ": {
        "table": "別表第一",
        "clauses": [
            "三　配線器具であつて、次に掲げるもの（定格電圧が一〇〇ボルト以上三〇〇ボルト以下",
            "交流の電路に使用するものに限り",
            "（二）　開閉器であつて、次に掲げるもの（定格電流が一〇〇アンペア以下",
            "５　配線用遮断器",
        ],
        "applies": "通常の交流100/200V配線用遮断器なら、設問の20Aは100A以下。設問は電圧を明示しないため適用範囲を注記。",
    },
    "ロ": {
        "table": "別表第二",
        "clauses": ["（四二）　換気扇（定格消費電力が三〇〇ワット以下"],
        "applies": "30Wは300W以下。",
    },
    "ハ": {
        "table": "別表第二",
        "clauses": ["二　電線管類及びその附属品", "（一）　電線管（可撓とう電線管を含み、内径が一二〇ミリメートル以下"],
        "applies": "外径19mmの管の内径は19mm未満で、120mm以下。",
    },
    "ニ": {
        "table": "別表第二",
        "clauses": ["七　電熱器具であつて、次に掲げるもの（定格電圧が一〇〇ボルト以上三〇〇ボルト以下及び定格消費電力が一〇キロワット以下", "（九）　電気ストーブ"],
        "applies": "1kWは10kW以下。",
    },
}

for label, proof in checks.items():
    text = specified if proof["table"] == "別表第一" else non_specified
    for clause in proof["clauses"]:
        if clause not in text:
            raise ValueError(f"Official e-Gov XML lacks {label}: {clause}")

receipt = {
    "schemaVersion": 1,
    "question": "20251026-q29",
    "status": "official-source-verified",
    "checkedAtUtc": datetime.now(timezone.utc).isoformat(),
    "sourceUrl": PAGE,
    "apiUrl": URL,
    "apiResponseSha256": sha256(raw.content).hexdigest(),
    "source": "電気用品安全法施行令 別表第一・別表第二",
    "checks": checks,
    "unresolved": [],
}
output = ROOT / "docs/evidence/denko2-law/20251026-q29.json"
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Verified 4/4 classifications from {PAGE}")
