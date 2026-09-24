"""Per-question review receipts for safety explanations; no publication writes.

Receipts are invalidated by source text, answer, image bytes, publication date,
candidate or evidence changes. A cluster review must assess every question and
every choice; a sampled PASS can never authorize its neighbours.
"""
from hashlib import sha256
import json
from pathlib import Path
import re
from urllib.parse import urlparse

GOV_ROOTS = ("e-gov.go.jp", "mhlw.go.jp", "mlit.go.jp", "meti.go.jp",
             "mext.go.jp", "env.go.jp", "maff.go.jp", "cao.go.jp",
             "nra.go.jp", "jma.go.jp", "jisc.go.jp", "fdma.go.jp",
             "npa.go.jp", "stat.go.jp")


def digest(value):
    return sha256(json.dumps(value, ensure_ascii=False, sort_keys=True,
                             separators=(",", ":")).encode()).hexdigest()


def government_url(url):
    try:
        p = urlparse(url)
        return (p.scheme == "https" and not p.username and not p.password
                and p.port is None and p.hostname is not None
                and bool(re.fullmatch(r"(?:[a-z0-9-]+\.)+go\.jp", p.hostname)))
    except (TypeError, ValueError):
        return False


def source_snapshot(root, question, paper):
    root = Path(root).resolve()
    images = []
    for url in question.get("images", []):
        image = (root / "public" / url.lstrip("/")).resolve()
        if not image.is_relative_to(root / "public") or not image.is_file():
            raise ValueError(f"Missing/unsafe source image: {url}")
        images.append({"url": url, "sha256": sha256(image.read_bytes()).hexdigest()})
    return {"question": question, "images": images,
            "paper": {key: paper.get(key) for key in
                      ("id", "date", "dateKind", "subject", "pdfUrl", "pdfSha256")}}


def receipt_key(snapshot, candidate, evidence):
    return {"sourceSha256": digest(snapshot), "candidateSha256": digest(candidate),
            "evidenceSha256": digest(evidence)}


def validate_assessment(assessment, candidate):
    errors = []
    if not isinstance(assessment, dict):
        return ["assessment missing"]
    if assessment.get("status") != "PASS" or assessment.get("issues") != []:
        errors.append("not a clean PASS")
    expected = {str(i) for i in range(1, 6)}
    choices = assessment.get("choiceChecks")
    if not isinstance(choices, dict) or set(choices) != expected:
        errors.append("every choice requires an explicit check")
    elif any(value != "PASS" for value in choices.values()):
        errors.append("one or more choice checks did not pass")
    for flag in ("officialAnswerChecked", "originalTextChecked", "imagesChecked",
                 "historicalApplicabilityChecked", "sourceSupportChecked"):
        if assessment.get(flag) is not True:
            errors.append(f"{flag} missing")
    citations = assessment.get("evidenceUrls")
    cited_urls = {row.get("url") for row in candidate.get("sources", [])}
    if (not isinstance(citations, list) or not citations
            or not all(government_url(url) for url in citations)
            or not cited_urls.issubset(set(citations))):
        errors.append("review must verify every displayed government source")
    return errors


def valid_model_proof(model_proof):
    if not isinstance(model_proof, dict):
        return False
    model = model_proof.get("resolvedModel")
    usage = model_proof.get("modelUsage")
    row = usage.get(model, {}) if isinstance(usage, dict) else {}
    return (model_proof.get("requestedModel") == "claude-opus-5-5"
            and model == "claude-opus-5-5"
            and model_proof.get("provider") == "firstParty"
            and isinstance(usage, dict)
            and set(usage) == {"claude-opus-5-5"}
            and row.get("canonicalModel") == "claude-opus-5-5"
            and row.get("provider") == "firstParty")


def make_receipt(question_id, snapshot, candidate, evidence, assessment, model_proof):
    errors = validate_assessment(assessment, candidate)
    if not valid_model_proof(model_proof):
        errors.append("review model proof is not verified firstParty claude-opus-5-5")
    return {"schemaVersion": 2, "questionId": question_id,
            **receipt_key(snapshot, candidate, evidence),
            "status": "HOLD" if errors else "PASS", "gateIssues": errors,
            "assessment": assessment, **model_proof}


def receipt_current(receipt, snapshot, candidate, evidence):
    return (receipt.get("schemaVersion") == 2 and receipt.get("status") == "PASS"
            and valid_model_proof(receipt)
            and all(receipt.get(k) == v for k, v in
                    receipt_key(snapshot, candidate, evidence).items())
            and not validate_assessment(receipt.get("assessment"), candidate))


def reuse_candidate_key(question):
    """Only a discovery key. Image/year applicability must be separately reviewed."""
    return digest({key: question.get(key) for key in
                   ("text", "correctChoice", "choiceCount", "answerAuthority")})


def candidate_issues(question, candidate, group):
    """Cheap failures stay out of expensive model review. Mirrors publication minima."""
    errors = []
    if candidate.get("sourceHash") != sha256(question["text"].encode()).hexdigest():
        errors.append("stale source hash")
    if candidate.get("correctChoice") != question["correctChoice"]:
        errors.append("official answer mismatch")
    if not isinstance(candidate.get("summary"), str) or len(candidate["summary"].strip()) < 20:
        errors.append("summary too short")
    choices = candidate.get("choices")
    if (not isinstance(choices, list) or len(choices) != 5
            or any(not isinstance(c, dict) for c in choices)):
        return errors + ["five structured choices required"]
    if [c.get("number") for c in choices] != list(range(1, 6)):
        errors.append("choice order/number mismatch")
    minimum = 55 if group == "emkohyo" else 40
    reasons = []
    for c in choices:
        n = c.get("number")
        if c.get("verdict") != ("correct" if n == question["correctChoice"] else "incorrect"):
            errors.append(f"choice {n} verdict mismatch")
        reason = c.get("reason")
        if not isinstance(reason, str) or len(reason.strip()) < minimum:
            errors.append(f"choice {n} short reason")
        else:
            reasons.append(reason.strip())
    if len(reasons) != len(set(reasons)):
        errors.append("duplicate reasons")
    sources = candidate.get("sources")
    if not isinstance(sources, list) or not sources:
        errors.append("sources missing")
    else:
        for source in sources:
            url = source.get("url") if isinstance(source, dict) else None
            if not government_url(url):
                errors.append("invalid government source")
            elif group == "lckohyo":
                host = urlparse(url).hostname
                if not any(host == r or host.endswith("." + r) for r in GOV_ROOTS):
                    errors.append("source outside existing lck ministry policy")
    return errors
