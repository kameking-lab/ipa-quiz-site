"""Pure checks for provisional EM overlays; official answers are immutable."""

from hashlib import sha256
import re


INTERNAL_PATTERN = re.compile(r"HOLD|FIX|TODO|未確認|要確認|確認待ち|準備中|仮置き|根拠不足|調査中|要検索")
LINK_PATTERN = re.compile(r"https?://|\[[^\]]+\]\([^)]+\)|<a\b", re.I)


def government_url(url: str) -> bool:
    match = re.fullmatch(r"https://((?:[A-Za-z0-9-]+\.)+go\.jp)(?:/[^\s]*)?", url)
    return bool(match) and not match.group(1).lower().endswith("jstage.jst.go.jp")


def government_sources(sources: list[dict]) -> list[dict]:
    return [source for source in sources if government_url(source.get("url", ""))]


def candidate_launch_issues(row: dict, overlay: dict) -> list[str]:
    errors = []
    if overlay.get("sourceHash") != sha256(row["text"].encode("utf-8")).hexdigest():
        errors.append("sourceHash")
    if row.get("answerAuthority") != "official" or row.get("choiceCount") != 5:
        errors.append("officialFiveChoice")
    if overlay.get("correctChoice") != row.get("correctChoice"):
        errors.append("officialCorrectChoice")
    summary = overlay.get("summary")
    if not isinstance(summary, str) or len(summary.strip()) < 20 or INTERNAL_PATTERN.search(summary) or LINK_PATTERN.search(summary):
        errors.append("summary")
    choices = overlay.get("choices")
    if not isinstance(choices, list) or len(choices) != 5:
        errors.append("fiveChoices")
    else:
        numbers = [choice.get("number") for choice in choices if isinstance(choice, dict)]
        reasons = [choice.get("reason", "").strip() for choice in choices if isinstance(choice, dict)]
        if numbers != [1, 2, 3, 4, 5] or len(set(reasons)) != 5:
            errors.append("choiceNumbersOrDuplicateReasons")
        for choice in choices:
            if not isinstance(choice, dict):
                errors.append("invalidChoice")
                continue
            number = choice.get("number")
            reason = choice.get("reason")
            if choice.get("verdict") != ("correct" if number == row["correctChoice"] else "incorrect"):
                errors.append(f"choice{number}Verdict")
            if not isinstance(reason, str) or len(reason.strip()) < 55 or INTERNAL_PATTERN.search(reason) or LINK_PATTERN.search(reason):
                errors.append(f"choice{number}Reason")
    sources = overlay.get("sources")
    if not isinstance(sources, list) or any(not isinstance(source, dict) or not government_url(source.get("url", "")) for source in sources):
        errors.append("governmentOnlySources")
    elif len({source["url"] for source in sources}) != len(sources):
        errors.append("duplicateSources")
    if overlay.get("provisionalReview") is not True or not re.fullmatch(r"\d{4}-\d{2}-\d{2}", overlay.get("lastCheckedAt", "")):
        errors.append("provisionalMetadata")
    return errors
