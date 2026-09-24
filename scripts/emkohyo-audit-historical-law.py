"""Compare EM explanations' MHLW law excerpts with the law at exam date.

This is a pre-review warning receipt, never an approval. Current MHLW pages can
contain amendments that took effect after a published exam was administered.
"""

from datetime import datetime, timezone
from hashlib import sha256
import json
from pathlib import Path
import re
import sys
import unicodedata
from urllib.parse import parse_qs, urlparse

import requests


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/exam-library"
MHLW_TO_EGOV = {
    "74001000": "347AC0000000057",  # 労働安全衛生法
    "74002000": "347CO0000000318",  # 労働安全衛生法施行令
    "74003000": "347M50002000032",  # 労働安全衛生規則
    "74090000": "347M50002000036",  # 有機溶剤中毒予防規則
    "74094000": "347M50002000037",  # 鉛中毒予防規則
    "74097000": "347M50002000039",  # 特定化学物質障害予防規則
    "74101000": "347M50002000041",  # 電離放射線障害防止規則
    "74105000": "347M50002000042",  # 酸素欠乏症等防止規則
    "74107000": "354M50002000018",  # 粉じん障害防止規則
    "74158000": "350M50002000020",  # 作業環境測定法施行規則
    "74164000": "335AC0000000030",  # じん肺法
    "74aa6787": "417M60000100021",  # 石綿障害予防規則
}


def normalize(value: str) -> str:
    return re.sub(r"\s+", "", unicodedata.normalize("NFKC", value))


def law_text(node: object) -> str:
    if isinstance(node, str):
        return node
    if isinstance(node, dict):
        return " ".join(law_text(child) for child in node.get("children", []))
    return ""


def main() -> None:
    paper = sys.argv[1]
    catalog = json.loads((DATA / "official-catalog.json").read_text(encoding="utf-8"))
    item = next(x for x in catalog if x["id"] == paper and x["group"] == "emkohyo")
    asof = item["date"]
    review = DATA / "emkohyo-review"
    questions = {}
    for path in sorted(review.glob(f"{paper}-q*-draft.json")):
        questions.update(json.loads(path.read_text(encoding="utf-8"))["questions"])
    claims = []
    used = set()
    for id_, question in sorted(questions.items()):
        for item in question.get("sourceEvidence", []):
            source = item.get("url") or item.get("sourceUrl") or ""
            data_id = parse_qs(urlparse(source).query).get("dataId", [""])[0]
            if "mhlw.go.jp/web/t_doc" not in source or not data_id:
                continue
            used.add(data_id)
            claims.append({"questionId": id_, "mhlwUrl": source, "dataId": data_id,
                           "excerpt": item.get("excerpt") or item.get("exactSourceExcerpt") or ""})
    history = {}
    for data_id in sorted(used & MHLW_TO_EGOV.keys()):
        url = f"https://laws.e-gov.go.jp/api/2/law_data/{MHLW_TO_EGOV[data_id]}?asof={asof}"
        response = requests.get(url, timeout=60)
        response.raise_for_status()
        body = response.json()
        history[data_id] = {"url": url, "sha256": sha256(response.content).hexdigest(),
                            "revisionId": body["revision_info"]["law_revision_id"],
                            "text": normalize(law_text(body["law_full_text"]))}
    records = []
    for item in claims:
        record = {**item, "matchedAtExamDate": None}
        historical = history.get(item["dataId"])
        if historical:
            record["historicalUrl"] = historical["url"]
            record["historicalSha256"] = historical["sha256"]
            record["lawRevisionId"] = historical["revisionId"]
            record["matchedAtExamDate"] = normalize(item["excerpt"]) in historical["text"]
        records.append(record)
    output = {"paperId": paper, "examDate": asof,
              "checkedAt": datetime.now(timezone.utc).isoformat(),
              "mappingScope": "MHLW law/regulation pages only; notices and guidance are unclassified",
              "counts": {"mappedMatched": sum(x["matchedAtExamDate"] is True for x in records),
                         "mappedChangedOrFormatting": sum(x["matchedAtExamDate"] is False for x in records),
                         "unmapped": sum(x["matchedAtExamDate"] is None for x in records)},
              "claims": records,
              "acceptance": "none; every mismatch needs article-level exam-date review"}
    target = ROOT / f"docs/evidence/emkohyo-choice-sources/{paper}-historical-law-audit.json"
    target.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"output": str(target), **output["counts"]}, ensure_ascii=False))


if __name__ == "__main__":
    main()
