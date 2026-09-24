"""Shared Claude CLI invocation for Denken 3 model-assisted steps.

Every generation and review must resolve to first-party claude-opus-5-5 only.
The raw stream is written to the ignored private tree and mirrored into a
tracked evidence tree so a fresh checkout can re-verify receipt hashes.
"""

from __future__ import annotations

from hashlib import sha256
import json
import os
from pathlib import Path
import re
import shutil
import subprocess


ROOT = Path(__file__).resolve().parents[1]
MODEL = "claude-opus-5-5"
PRIVATE_RAW = ROOT / "data/raw_pdfs/denken3/review"
TRACKED_RAW = ROOT / "docs/evidence/denken3/raw"
# Parent-session variables that make the child CLI share or report into the
# caller's session; nonessential traffic would add non-Opus background calls.
_DROP_ENV = (
    "CLAUDECODE", "CLAUDE_CODE_SESSION_ID", "CLAUDE_CODE_CHILD_SESSION", "CLAUDE_CODE_MESSAGING_SOCKET",
    "CLAUDE_CODE_MESSAGING_TOKEN", "CLAUDE_CODE_TEE_SDK_STDOUT", "CLAUDE_CODE_USER_EMAIL",
    "CLAUDE_CODE_DIAGNOSTICS_FILE", "CLAUDE_AUTO_BACKGROUND_TASKS", "CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD",
    "CLAUDE_ADDITIONAL_DIRECTORIES", "CLAUDE_PID", "CLAUDE_EFFORT",
)


def cli() -> str:
    found = shutil.which("claude")
    if found:
        return found
    windows = Path.home() / "AppData/Roaming/npm/claude.cmd"
    if windows.is_file():
        return str(windows)
    raise FileNotFoundError("claude CLI not found")


def run(request: dict, effort: str, timeout: int) -> tuple[str, dict, str]:
    """Return (raw stdout, modelUsage, final result text); raise unless Opus-only."""
    env = {key: value for key, value in os.environ.items() if key not in _DROP_ENV}
    env["CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC"] = "1"
    process = subprocess.run(
        [cli(), "-p", "--model", MODEL, "--effort", effort, "--input-format", "stream-json",
         "--output-format", "stream-json", "--verbose", "--tools", ""],
        input=json.dumps(request, ensure_ascii=False) + "\n", text=True, encoding="utf-8",
        capture_output=True, cwd=ROOT, timeout=timeout, env=env,
    )
    if process.returncode:
        raise RuntimeError(f"Claude exit {process.returncode}: {(process.stderr or process.stdout)[-1500:]}")
    events = [json.loads(line) for line in process.stdout.splitlines() if line.startswith("{")]
    final = next((event for event in reversed(events) if event.get("type") == "result"), None)
    if final is None or final.get("is_error"):
        raise ValueError(f"No successful Claude result: {process.stdout[-1500:]}")
    model_usage = final.get("modelUsage") or {}
    models = [name for name in model_usage if name.startswith("claude-")]
    usage = model_usage.get(MODEL) or {}
    if models != [MODEL] or usage.get("canonicalModel") != MODEL or usage.get("provider") != "firstParty":
        raise ValueError(f"Cannot prove first-party {MODEL} from modelUsage: {models}")
    return process.stdout, model_usage, final.get("result", "")


def extract_json(text: str, opener: str) -> object:
    closer = "]" if opener == "[" else "}"
    value = re.sub(r"^```(?:json)?\s*|\s*```$", "", text.strip(), flags=re.I)
    start, end = value.find(opener), value.rfind(closer)
    if start < 0 or end < start:
        raise ValueError(f"No JSON {opener}{closer}: {value[-1500:]}")
    result, _ = json.JSONDecoder().raw_decode(value[start:])
    return result


def save_raw(private_path: Path, stdout: str) -> str:
    """Write raw stream privately and as a byte-identical tracked mirror; return SHA-256."""
    tracked = tracked_raw_path(private_path)
    for path in (private_path, tracked):
        if path.exists():
            raise FileExistsError(path)
    data = stdout.encode("utf-8")
    for path in (private_path, tracked):
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)
    return sha256(data).hexdigest()


def tracked_raw_path(private_path: Path) -> Path:
    return TRACKED_RAW / private_path.relative_to(PRIVATE_RAW)


def raw_file(private_path: Path) -> Path | None:
    """Private raw response, else its tracked mirror, else None."""
    for path in (private_path, tracked_raw_path(private_path)):
        if path.is_file():
            return path
    return None


def text_digests(path: Path) -> set[str]:
    """Digests of a text file under LF and CRLF checkouts (receipts predate a Windows→Linux move)."""
    lf = path.read_bytes().replace(b"\r\n", b"\n")
    return {sha256(lf).hexdigest(), sha256(lf.replace(b"\n", b"\r\n")).hexdigest()}


def image_block(path: Path) -> dict:
    from base64 import b64encode
    return {"type": "image", "source": {"type": "base64", "media_type": "image/png",
            "data": b64encode(path.read_bytes()).decode("ascii")}}


def egov_article(snapshot: dict, number: str) -> str:
    """Render only the main-provision article from an as-of e-Gov law snapshot."""
    body = next(child for child in snapshot["law_full_text"]["children"]
                if isinstance(child, dict) and child.get("tag") == "LawBody")
    main = next(child for child in body["children"]
                if isinstance(child, dict) and child.get("tag") == "MainProvision")
    pending = [main]
    articles = []
    while pending:
        node = pending.pop()
        if not isinstance(node, dict):
            continue
        if node.get("tag") == "Article" and node.get("attr", {}).get("Num") == number:
            articles.append(node)
        pending.extend(node.get("children", []))
    if len(articles) != 1:
        raise ValueError(f"e-Gov article {number}: found {len(articles)} main-provision matches")

    def flatten(node: object) -> str:
        if isinstance(node, str):
            return node
        if not isinstance(node, dict):
            return ""
        parts = [flatten(child) for child in node.get("children", [])]
        return ("\n" if node.get("tag") in {"Article", "Paragraph", "Item", "Subitem1"} else "").join(parts)

    return flatten(articles[0])


def reference_blocks(urls: list[str], label: str, hashes: dict[str, dict[str, str]]) -> list[dict]:
    """Attach SHA-pinned official reference pages/articles; unknown URLs are rejected."""
    import fitz
    manifest = {entry["url"]: entry for entry in
                json.loads((ROOT / "scripts/denken3-reference-manifest.json").read_text(encoding="utf-8"))}
    blocks: list[dict] = []
    for url in sorted({value.split("#", 1)[0] for value in urls}):
        entry = manifest.get(url)
        if entry is None:
            raise ValueError(f"Official reference lacks pinned source pages: {url}")
        if "localJson" in entry:
            path = ROOT / entry["localJson"]
            if sha256(path.read_bytes()).hexdigest() != entry["sha256"]:
                raise ValueError(f"e-Gov snapshot hash changed: {url}")
            snapshot = json.loads(path.read_text(encoding="utf-8"))
            if (snapshot["law_info"]["law_id"] != entry["lawId"] or
                    snapshot["revision_info"]["law_revision_id"] != entry["revisionId"]):
                raise ValueError(f"e-Gov law/revision changed: {url}")
            hashes.setdefault("referenceJsonSha256", {})[entry["localJson"]] = entry["sha256"]
            for number in entry["articles"]:
                blocks.append({"type": "text", "text":
                               f"{label} e-Gov法令API v2 施行時点={entry['asof']} {snapshot['revision_info']['law_title']} "
                               f"第{number}条 公式URL={url}\n{egov_article(snapshot, str(number))}"})
            continue
        pdf = ROOT / entry["localPdf"]
        if sha256(pdf.read_bytes()).hexdigest() != entry["sha256"]:
            raise ValueError(f"Official reference PDF hash changed: {url}")
        hashes.setdefault("referencePdfSha256", {})[entry["localPdf"]] = entry["sha256"]
        document = fitz.open(pdf)
        for page_number in entry["pages"]:
            rendered = PRIVATE_RAW / "references" / f"{pdf.stem}-p{page_number:03}.png"
            rendered.parent.mkdir(parents=True, exist_ok=True)
            if not rendered.exists():
                document[page_number - 1].get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False).save(rendered)
            hashes.setdefault("referencePageSha256", {})[rendered.relative_to(ROOT).as_posix()] = \
                sha256(rendered.read_bytes()).hexdigest()
            blocks += [{"type": "text", "text": f"{label} 公式参考資料 {entry['purpose']} URL={url} PDF第{page_number}頁:"},
                       image_block(rendered)]
    return blocks
