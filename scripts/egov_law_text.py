"""Deterministic plain-text views of pinned government sources (e-Gov JSON, HTML, PDF).

The pinned JSON bytes stay the evidence; this text is only a greppable view of
the same bytes so authors and reviewers can locate articles, items and tables.
"""
import html
import json
from pathlib import Path
import re
import shutil
import subprocess

BLOCK = {
    "LawTitle", "LawNum", "EnactStatement", "PartTitle", "ChapterTitle", "SectionTitle",
    "SubsectionTitle", "DivisionTitle", "ArticleCaption", "ArticleTitle", "Paragraph",
    "Item", "Subitem1", "Subitem2", "Subitem3", "Subitem4", "Subitem5", "TableRow",
    "SupplProvisionLabel", "AppdxTableTitle", "AppdxTable", "AppdxNote", "Remarks",
    "RemarksLabel", "Note", "TableStructTitle", "FigStruct", "Preamble",
}
SKIP = {"TOC"}
TITLE = {"ItemTitle", "ParagraphNum", "Subitem1Title", "Subitem2Title",
         "Subitem3Title", "Subitem4Title", "Subitem5Title"}


def _render(node, lines, current):
    if isinstance(node, str):
        current.append(node)
        return
    tag = node.get("tag", "")
    if tag in SKIP:
        return
    if tag == "Article":
        _flush(lines, current)
        lines.append("")
    if tag == "SupplProvision":
        _flush(lines, current)
        amend = node.get("attr", {}).get("AmendLawNum")
        lines.append("")
        lines.append("【附則" + (f" {amend}" if amend else "") + "】")
    block = tag in BLOCK
    if block:
        _flush(lines, current)
    for child in node.get("children", []):
        _render(child, lines, current)
        if tag in ("TableColumn",):
            current.append(" | ")
    if tag in TITLE:
        current.append("\u3000")
    if block:
        _flush(lines, current)


def _flush(lines, current):
    text = "".join(current).strip()
    if text:
        lines.append(text)
    current.clear()


def render_law_json(payload: bytes) -> str:
    data = json.loads(payload)
    rev = data.get("revision_info", {})
    header = [
        f"law_id: {data.get('law_info', {}).get('law_id')}",
        f"law_revision_id: {rev.get('law_revision_id')}",
        f"law_title: {rev.get('law_title')}",
        f"amendment_enforcement_date: {rev.get('amendment_enforcement_date')}",
        f"amendment_law_title: {rev.get('amendment_law_title')}",
        "",
    ]
    lines, current = [], []
    _render(data["law_full_text"], lines, current)
    _flush(lines, current)
    return "\n".join(header + lines) + "\n"


def render_html(payload: bytes) -> str:
    raw = payload.decode("utf-8", errors="replace")
    charset = re.search(r"charset=[\"']?([A-Za-z0-9_-]+)", raw[:3000])
    if charset and charset.group(1).lower().replace("_", "-") in ("shift-jis", "sjis", "x-sjis", "cp932"):
        raw = payload.decode("cp932", errors="replace")
    raw = re.sub(r"(?is)<(script|style)\b.*?</\1>", "", raw)
    raw = re.sub(r"(?i)<(br|/p|/div|/tr|/li|/h[1-6]|/dt|/dd)\b[^>]*>", "\n", raw)
    raw = re.sub(r"(?i)</t[dh]>", " | ", raw)
    text = html.unescape(re.sub(r"<[^>]+>", "", raw))
    lines = [re.sub(r"[ \t\u3000]+", " ", line).strip() for line in text.splitlines()]
    return "\n".join(line for line in lines if line) + "\n"


def text_view(local_path):
    """Write <sha>.txt beside a cached pinned source (e-Gov JSON, HTML or PDF).

    The pinned bytes remain the evidence; the text is a deterministic search aid."""
    path = Path(local_path)
    target = path.with_suffix(".txt")
    if target.is_file():
        return str(target)
    try:
        if path.suffix == ".json":
            text = render_law_json(path.read_bytes())
        elif path.suffix == ".html":
            text = render_html(path.read_bytes())
        elif path.suffix == ".pdf" and shutil.which("pdftotext"):
            run = subprocess.run(["pdftotext", "-layout", str(path), "-"], capture_output=True,
                                 timeout=120)
            if run.returncode:
                return None
            text = run.stdout.decode("utf-8", errors="replace")
        else:
            return None
    except (KeyError, ValueError, TypeError, subprocess.TimeoutExpired):
        return None
    if len(text.strip()) < 200:
        return None
    target.write_text(text, encoding="utf-8")
    return str(target)
