"""Shared contract for provisional lckohyo per-choice explanation waves.

A provisional wave is a launch-first overlay: every choice gets a concise
Japanese reason generated from the frozen question text, the official answer
and the existing general explanation. It deliberately does not claim the
government-source strict review that choice-explanations.json requires, and it
is written to its own shard so parallel waves never touch the same file.
"""

from hashlib import sha256
import json
from pathlib import Path
import re
import unicodedata

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/exam-library"
SHARD_DIR = DATA / "provisional-choice-explanations"
EVIDENCE_ROOT = ROOT / "docs/evidence/lckohyo-provisional-choice-waves"
MODEL = "claude-opus-5-5"

WAVES = {
    "lckohyo-wave-a": ["LC20251101"] + [f"LC202521{n:02d}" for n in range(2, 11)],
}

# Wording that marks an unfinished or internal-review record rather than
# learner-facing text.
FORBIDDEN = re.compile(
    r"HOLD|FIX|TODO|TBD|未確認|要確認|確認中|要検証|準備中|今後追加|解説を作成できません"
    r"|内部メモ|レビュー|reviewer|provisional|暫定|https?://|www\.|<[a-z/]|\]\(",
    re.I)
QUOTE = re.compile(r"「([^」]*)」|『([^』]*)』|“([^”]*)”|\"([^\"]*)\"")
ARTICLE = re.compile(r"第?[0-9０-９一二三四五六七八九十百]+条(?!件)(?:の[0-9０-９一二三四五六七八九十]+)?")
MIN_REASON, MAX_REASON = 25, 260


def read(path):
    return json.loads(Path(path).read_text(encoding="utf-8-sig"))


def write(path, value):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def digest(value):
    if not isinstance(value, str):
        value = json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    return sha256(value.encode("utf-8")).hexdigest()


def shard_path(wave):
    return SHARD_DIR / f"{wave}.json"


def normalize(text):
    return re.sub(r"\s+", "", unicodedata.normalize("NFKC", text))


def question_fingerprint(question, presentation):
    """Hash of everything a reason depends on: text, answer contract and choices."""
    return digest({
        "text": question["text"],
        "answerAuthority": question["answerAuthority"],
        "correctChoice": question["correctChoice"],
        "choiceCount": question["choiceCount"],
        "prompt": presentation["prompt"],
        "choices": [[c["number"], c["text"]] for c in presentation["choices"]],
    })


def load_wave(wave, data=DATA):
    """Return (targets, excluded) for the wave's papers.

    targets maps question ID to its question, presentation and legacy general
    explanation. excluded maps IDs that cannot carry five choice entries to
    the reason (descriptive questions have no choices or official key, and
    IDs that already have a strict-reviewed overlay entry keep that entry).
    """
    data = Path(data)
    explanations = read(data / "explanations.json")
    strict = read(data / "choice-explanations.json")
    targets, excluded = {}, {}
    for paper in WAVES[wave]:
        questions = read(data / "papers" / f"lckohyo-{paper}.json")
        presentation = read(data / "presentation" / f"lckohyo-{paper}.json")
        for question in questions:
            qid = question["id"]
            if question["answerAuthority"] != "official" or question["choiceCount"] != 5:
                excluded[qid] = (f"{question['answerAuthority']} question with "
                                 f"{question['choiceCount']} choices; no official choice key")
                continue
            if qid in strict:
                excluded[qid] = "strict-reviewed entry in choice-explanations.json preserved"
                continue
            targets[qid] = {"paper": paper, "question": question,
                            "presentation": presentation[qid],
                            "legacy": explanations.get(qid)}
    return targets, excluded


def source_corpus(target):
    parts = [target["question"]["text"], target["presentation"]["prompt"]]
    parts += [c["text"] for c in target["presentation"]["choices"]]
    if isinstance(target["legacy"], str):
        parts.append(target["legacy"])
    return normalize("\n".join(parts))


def record_issues(qid, target, record, receipts=None):
    """Deterministic gate for one provisional record."""
    issues = []
    question, presentation = target["question"], target["presentation"]
    if not isinstance(record, dict):
        return [f"{qid}: record is not an object"]
    if record.get("sourceHash") != sha256(question["text"].encode("utf-8")).hexdigest():
        issues.append("stale sourceHash")
    if record.get("questionFingerprint") != question_fingerprint(question, presentation):
        issues.append("stale questionFingerprint")
    if record.get("correctChoice") != question["correctChoice"]:
        issues.append("correctChoice does not match official answer")
    legacy = target["legacy"]
    if not isinstance(legacy, str) or record.get("basedOnLegacyExplanationHash") != digest(legacy):
        issues.append("basedOnLegacyExplanationHash does not match explanations.json")
    if record.get("provisionalReview") is not True:
        issues.append("provisionalReview must be true")
    corpus = source_corpus(target)
    choices = record.get("choices")
    if not isinstance(choices, list) or [c.get("number") if isinstance(c, dict) else None
                                         for c in choices] != [1, 2, 3, 4, 5]:
        issues.append("choices must be numbered 1..5 in order")
        choices = [c for c in choices if isinstance(c, dict)] if isinstance(choices, list) else []
    reasons = []
    for choice in choices:
        number, reason = choice.get("number"), choice.get("reason")
        expected = "correct" if number == question["correctChoice"] else "incorrect"
        if choice.get("verdict") != expected:
            issues.append(f"choice {number} verdict must be {expected}")
        if set(choice) != {"number", "verdict", "reason"}:
            issues.append(f"choice {number} has unexpected fields")
        if not isinstance(reason, str) or not reason.strip():
            issues.append(f"choice {number} empty reason")
            continue
        reasons.append(normalize(reason))
        if not MIN_REASON <= len(reason.strip()) <= MAX_REASON:
            issues.append(f"choice {number} reason length {len(reason.strip())}")
        if FORBIDDEN.search(reason):
            issues.append(f"choice {number} contains internal or placeholder wording")
        for match in QUOTE.finditer(reason):
            quoted = normalize(next(g for g in match.groups() if g is not None))
            if quoted and quoted not in corpus:
                issues.append(f"choice {number} quotes text absent from the question")
        for article in ARTICLE.findall(reason):
            if normalize(article).lstrip("第") not in corpus:
                issues.append(f"choice {number} cites article {article} absent from sources")
    if len(set(reasons)) != len(reasons):
        issues.append("duplicate choice reasons")
    if receipts is not None:
        receipt = receipts.get(record.get("generationBatch"))
        if receipt is None or qid not in receipt.get("ids", []):
            issues.append("generation batch receipt missing or does not list this ID")
        elif receipt_issues(receipt):
            issues.append("generation batch receipt invalid: " + "; ".join(receipt_issues(receipt)))
    return [f"{qid}: {issue}" for issue in issues]


def receipt_issues(receipt):
    issues = []
    proof = receipt.get("modelProof", {})
    usage = proof.get("modelUsage")
    if proof.get("requestedModel") != MODEL or proof.get("assistantModels") != [MODEL]:
        issues.append("assistant model is not exactly " + MODEL)
    if not isinstance(usage, dict) or set(usage) != {MODEL}:
        issues.append("modelUsage is not exactly " + MODEL)
    elif usage[MODEL].get("provider") != "firstParty" or usage[MODEL].get("canonicalModel") != MODEL:
        issues.append("modelUsage provider/canonical model mismatch")
    for key in ("promptSha256", "resultSha256"):
        if not re.fullmatch(r"[0-9a-f]{64}", str(receipt.get(key, ""))):
            issues.append(f"missing {key}")
    return issues


def load_receipts(wave, root=ROOT):
    directory = Path(root) / "docs/evidence/lckohyo-provisional-choice-waves" / wave
    return {path.stem: read(path) for path in sorted(directory.glob("*.json"))}


def validate_shard(wave, shard, targets, excluded, receipts=None):
    issues = []
    meta = shard.get("meta", {}) if isinstance(shard, dict) else {}
    entries = shard.get("entries") if isinstance(shard, dict) else None
    if not isinstance(entries, dict):
        return ["shard entries missing"]
    if meta.get("wave") != wave or meta.get("papers") != WAVES[wave]:
        issues.append("shard meta wave/papers mismatch")
    if meta.get("provisionalReview") is not True or meta.get("governmentSourceStrictReview") is not False:
        issues.append("shard meta must declare provisional review without strict source review")
    if meta.get("excluded") != excluded:
        issues.append("shard meta excluded IDs do not match structurally impossible IDs")
    missing, extra = set(targets) - set(entries), set(entries) - set(targets)
    if missing:
        issues.append(f"missing IDs: {sorted(missing)}")
    if extra:
        issues.append(f"unexpected IDs: {sorted(extra)}")
    for qid in sorted(set(entries) & set(targets)):
        issues += record_issues(qid, targets[qid], entries[qid], receipts)
    return issues
