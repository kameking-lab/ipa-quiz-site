import json, re, unicodedata
from pathlib import Path

HERE = Path(__file__).resolve().parent
CIRCLES = ["①", "②", "③", "④"]

def fw(s):
    """Fold halfwidth digits to fullwidth (exam uses fullwidth digits in prose)."""
    return s

def load_pages(name):
    return json.loads((HERE / f"{name}.passA.json").read_text(encoding="utf-8"))

CATS = {
    1: "法及び関係法令に関すること",
    28: "貸付け及び貸付けに付随する取引に関する法令及び実務に関すること",
    43: "資金需要者等の保護に関すること",
    48: "財務及び会計に関すること",
}

def category_for(n):
    cat = None
    for start, name in sorted(CATS.items()):
        if n >= start:
            cat = name
    return cat

def parse_page(raw, n):
    # strip page-number line "- N-" or "-N-"
    text = raw
    text = re.sub(r"^-\s*\S+\s*-\s*\n", "", text)
    # strip category heading line if present
    for name in CATS.values():
        text = text.replace(name + "\n", "")
    # strip leading 【問題　N】 marker (various spacing / half-or-full-width digits)
    m = re.match(r"[\s 　]*【問題[\s　]*\S+?[\s　]*】[\s　]*\n?", text)
    if not m:
        raise ValueError(f"could not find question marker for Q{n}: {text[:60]!r}")
    marker_num = re.sub(r"[^\d０-９]", "", m.group(0))
    expected = str(n)
    got_norm = unicodedata.normalize("NFKC", marker_num)
    if got_norm != expected:
        raise ValueError(f"question marker number mismatch Q{n}: found {marker_num!r}")
    text = text[m.end():]
    text = text.strip("\n")

    # find choice markers ①②③④ - each should appear exactly once
    positions = []
    for c in CIRCLES:
        idx = text.rfind(c)
        if idx == -1:
            raise ValueError(f"missing {c} in Q{n}")
        positions.append((idx, c))
    positions.sort()
    idxs = [p[0] for p in positions]
    if idxs != sorted(idxs) or [p[1] for p in positions] != CIRCLES:
        raise ValueError(f"choice markers out of order Q{n}: {positions}")

    stem = text[:positions[0][0]].strip("\n")
    chunks = []
    for i in range(4):
        start = positions[i][0] + 1
        end = positions[i+1][0] if i < 3 else len(text)
        chunks.append(text[start:end])

    # Detect trailing footnote-definition block(s) after choice 4, e.g.
    # "。\n(注１)　加入貸金業者とは、...をいう。\n(注２)　...". A *definition*
    # marker is "(注...)" immediately followed by a full-width space (　);
    # an inline superscript *reference* inside a choice's own sentence (e.g.
    # "...指定信用情報機関\n(注２)に資金需要者等...") has no such space and must
    # stay part of the choice text.
    footnote = None
    last = chunks[3]
    m = re.search(r"\(注[^)]*\)　", last)
    if m:
        footnote = last[m.start():].strip("\n")
        chunks[3] = last[:m.start()]

    choices = []
    for c in chunks:
        c = c.strip("\n")
        c = c.strip()
        c = join_wrapped(c)
        choices.append(c)

    stem = join_wrapped(stem)
    if footnote:
        footnote = join_wrapped(footnote)

    return {"number": n, "stem": stem, "choices": choices, "footnote": footnote, "category": category_for(n)}

LETTER_RE = re.compile(r"^[ａｂｃｄｅ]　")

def join_wrapped(text):
    """Join PDF line-wrap breaks into continuous prose, keeping a line break
    only before each lettered sub-item (a/b/c/d.../e) marker."""
    lines = text.split("\n")
    out = []
    for line in lines:
        if not line:
            continue
        if out and LETTER_RE.match(line):
            out.append("\n" + line)
        elif out:
            out[-1] = out[-1] + line
        else:
            out.append(line)
    return "".join(out)

def parse_paper(name):
    pages = load_pages(name)
    out = []
    for n in range(1, 51):
        raw = pages[n]
        q = parse_page(raw, n)
        out.append(q)
    return out

if __name__ == "__main__":
    for name in ["exam_paper_20th.pdf", "exam_paper_19th.pdf"]:
        qs = parse_paper(name)
        (HERE / f"{name}.parsed.json").write_text(json.dumps(qs, ensure_ascii=False, indent=1), encoding="utf-8")
        print(name, "parsed", len(qs))
        footnoted = [q["number"] for q in qs if q["footnote"]]
        print(" footnotes:", footnoted)
