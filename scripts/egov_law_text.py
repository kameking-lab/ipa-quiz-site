"""Deterministic plain-text rendering of pinned e-Gov API v2 law_data JSON.

The pinned JSON bytes stay the evidence; this text is only a greppable view of
the same bytes so authors and reviewers can locate articles, items and tables.
"""
import json
from pathlib import Path

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


def text_view(local_path):
    """Write <sha>.txt beside a cached e-Gov law_data JSON; return its path or None."""
    path = Path(local_path)
    if path.suffix != ".json":
        return None
    target = path.with_suffix(".txt")
    if target.is_file():
        return str(target)
    try:
        text = render_law_json(path.read_bytes())
    except (KeyError, ValueError, TypeError):
        return None
    target.write_text(text, encoding="utf-8")
    return str(target)
