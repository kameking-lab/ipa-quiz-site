"""Build verbatim question records for SSSC welfare exams.

Canonical characters come from the official exam PDF text layer (not OCR).
Structure (question boundaries, paragraph breaks, ruby readings) comes from the
official accessible HTML published by the same center. Every non-whitespace
character of the HTML is aligned to the PDF; the only tolerated differences are
listed in ALLOWED_* below and are logged in the output.
"""
from __future__ import annotations

import difflib
import glob
import hashlib
import html
import json
import re
import sys
from pathlib import Path

import fitz

ROOT = Path(".")  # overwritten by --cache
TRANS: list = []
CUR_EXAM = ""
KANJI = re.compile(r"[㐀-鿿々〆豈-﫿]")

# PDF -> HTML character pairs that are the same character in different
# typographic form. We keep the PDF form.
ALLOWED_REPLACE = {("，", "、"), ("〜", "～")}
# HTML-only characters: the PDF draws the combination dash as a rule/unmapped
# glyph. The center's own accessible text renders it as "－" and we keep that.
ALLOWED_HTML_ONLY = {"－"}


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


# ---------------------------------------------------------------- PDF side
def pdf_body(files: list[Path]):
    """Return (chars, ruby_by_index, page_of_index, file_of_index)."""
    chars: list[str] = []
    info: list[tuple[str, int]] = []
    ruby_over: dict[int, str] = {}
    global LINE_START
    LINE_START = {}
    for f in files:
        doc = fitz.open(f)
        for pi, page in enumerate(doc):
            raw = page.get_text("rawdict")
            body: list[tuple[int, tuple]] = []
            rubies: list[tuple[str, tuple]] = []
            lines_out: list[list[tuple[str, tuple]]] = []
            for b in raw["blocks"]:
                for l in b.get("lines", []):
                    if l["dir"] != (1.0, 0.0):
                        continue
                    line = []
                    for s in l["spans"]:
                        for c in s["chars"]:
                            if s["size"] < 7:
                                rubies.append((c["c"], c["bbox"]))
                            else:
                                line.append((c["c"], c["bbox"]))
                    if line:
                        lines_out.append(line)
            # merge segments that share a baseline into one visual line
            # (fitz splits a visual line at font changes such as bold runs)
            groups: list[list[list[tuple[str, tuple]]]] = []
            for seg in lines_out:
                y = seg[0][1][3]
                target = next((g for g in groups if abs(g[0][0][1][3] - y) < 3), None)
                if target is None:
                    groups.append([seg])
                else:
                    target.append(seg)
            lines_out = []
            for g in groups:
                g.sort(key=lambda s: s[0][1][0])
                lines_out.append([cb for s in g for cb in s])
            for line in lines_out:
                text = "".join(ch for ch, _ in line)
                if re.fullmatch(r"\s*\d+\s*", text):
                    continue  # page number
                first = next((bb for ch, bb in line if not ch.isspace()), line[0][1])
                LINE_START[len(chars)] = (round(first[0], 1), round(line[-1][1][2], 1), f.name, pi + 1)
                for ch, bb in line:
                    idx = len(chars)
                    chars.append(ch)
                    info.append((f.name, pi + 1))
                    body.append((idx, bb))
                chars.append("\n")
                info.append((f.name, pi + 1))
            # assign each ruby char to nearest kanji body char on the line below
            for rch, rbb in rubies:
                rc = (rbb[0] + rbb[2]) / 2
                best = None
                for idx, bb in body:
                    if not KANJI.match(chars[idx]):
                        continue
                    if not (rbb[3] - 6 <= bb[1] <= rbb[3] + 4):
                        continue
                    if bb[0] - 0.5 <= rc <= bb[2] + 0.5:
                        dist = 0.0
                    else:
                        dist = min(abs(rc - bb[0]), abs(rc - bb[2]))
                    if best is None or dist < best[0]:
                        best = (dist, idx, bb)
                if best is None or best[0] > 12:
                    raise SystemExit(f"orphan ruby {rch} in {f.name} p{pi+1}")
                ruby_over.setdefault(best[1], "")
                ruby_over[best[1]] += rch
    # ruby chars were appended in PDF order; sort per base char by x not needed
    return chars, ruby_over, info


# --------------------------------------------------------------- HTML side
def html_blocks(path: Path):
    t = path.read_text(encoding="utf-8")
    t = t[t.find('<div class="listen_exam">'):]
    t = re.sub(r"<h1>.*?</h1>", "", t, flags=re.S)
    t = t[: t.find('<a href') if '<a href' in t else len(t)]
    pat = re.compile(
        r"<dt\b[^>]*>(?P<dt>.*?)</dt>(?P<dtc>.*?)(?=<dd|</dl>)"
        r"|<(?P<tag>h2|h3|p|dd|li)\b[^>]*>(?P<body>.*?)</(?P=tag)>"
        r"|(?<=</dd>)\s*(?P<stray>[^<\s][^<]*?)\s*(?=</dl>)",
        flags=re.S,
    )
    blocks = []
    for m in pat.finditer(t):
        if m.group("dt") is not None:
            blocks.append(("dt", m.group("dt")))
            if re.sub(r"<[^>]+>", "", m.group("dtc")).strip():
                blocks.append(("dtcont", m.group("dtc")))
        elif m.group("stray") is not None:
            blocks.append(("dd", m.group("stray")))  # markup quirk: choice outside <dd>
        else:
            blocks.append((m.group("tag"), m.group("body")))
    return blocks


def html_text(fragment: str) -> str:
    """Keep <br> as \n, nbsp as \x00 (structural space), drop other tags."""
    fragment = re.sub(r"[\r\n]+", "", fragment)  # source formatting only
    fragment = re.sub(r"<br\s*/?>", "\n", fragment)
    fragment = re.sub(r"<[^>]+>", "", fragment)
    fragment = fragment.replace("&nbsp;", "\x00")
    return html.unescape(fragment)


class Aligner:
    def __init__(self, pdf_chars: list[str]):
        self.pdf = pdf_chars
        self.pdf_nonws = [i for i, c in enumerate(pdf_chars) if not c.isspace()]

    def align(self, html_chars: list[str]):
        a = "".join(self.pdf[i] for i in self.pdf_nonws)
        b = "".join(html_chars)
        sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
        mapping: list[int | None] = [None] * len(b)
        issues = []
        for op, i1, i2, j1, j2 in sm.get_opcodes():
            if op == "equal":
                for k in range(j2 - j1):
                    mapping[j1 + k] = self.pdf_nonws[i1 + k]
            elif op == "replace" and i2 - i1 == j2 - j1 and all((a[i1 + k], b[j1 + k]) in ALLOWED_REPLACE for k in range(i2 - i1)):
                for k in range(j2 - j1):
                    mapping[j1 + k] = self.pdf_nonws[i1 + k]
            else:
                issues.append((op, a[i1:i2], b[j1:j2], j1))
        return mapping, issues


def build(exam: str, cfg: dict):
    out_questions = []
    log = {"normalizations": [], "issues": []}
    for half in cfg["halves"]:
        pdf_files = [ROOT / cfg["dir"] / Path(p).name for p in half["pdfs"]]
        pdf_chars, ruby_over, info = pdf_body(pdf_files)
        blocks = html_blocks(ROOT / cfg["dir"] / half["html"])
        # Build fragments: list of dict(kind, raw_text)
        frags = []
        for tag, body in blocks:
            frags.append({"tag": tag, "text": html_text(body)})
        # Collect HTML non-ws chars (ruby readings removed) with back refs
        html_chars: list[str] = []
        refs: list[tuple[int, int]] = []  # (frag, pos)
        for fi, fr in enumerate(frags):
            text = fr["text"]
            depth = 0
            for pos, ch in enumerate(text):
                if ch == "｛":
                    depth += 1
                    continue
                if ch == "｝":
                    depth -= 1
                    continue
                if depth or ch.isspace() or ch == "\x00":
                    continue
                html_chars.append(ch)
                refs.append((fi, pos))
        mapping, issues = Aligner(pdf_chars).align(html_chars)
        tolerated = []
        for op, pa, hb, j1 in issues:
            fi = refs[j1][0] if j1 < len(refs) else None
            if op in ("insert", "replace") and set(hb) <= ALLOWED_HTML_ONLY and all(ord(c) < 0x20 for c in pa):
                tolerated.append({"op": op, "html": hb, "fragment": fi})
                continue
            if fi is not None and frags[fi]["tag"] in ("dt", "dd") and cfg.get("visual") and any(v["marker"] in frags[fi]["text"] or v["marker"] in frags[max(fi-1,0)]["text"] for v in cfg["visual"]):
                tolerated.append({"op": op, "pdf": pa[:80], "html": hb[:80], "fragment": fi, "reason": "visual-material question"})
                continue
            if "音声読み上げ用試験問題一覧" in hb or "はここまでです" in pa:
                continue
            log["issues"].append({"op": op, "pdf": pa[:120], "html": hb[:120], "fragment": fi})
        log["normalizations"].extend(tolerated)
        pos_map = {ref: m for ref, m in zip(refs, mapping)}

        def render(fi: int, start: int = 0) -> str:
            text = frags[fi]["text"]
            out = []
            prev_pdf = None
            prev_html_pos = None
            depth = 0
            ruby_buf = ""
            base_run: list[int] = []  # pdf indexes of current trailing kanji run
            force_space = False
            last_pdf = None
            html_br_since = False
            for pos in range(start, len(text)):
                ch = text[pos]
                if ch == "｛":
                    depth += 1
                    ruby_buf = ""
                    continue
                if ch == "｝":
                    depth -= 1
                    # verify ruby base against PDF
                    base_text = ""
                    k = len(out) - 1
                    while k >= 0 and KANJI.match(out[k]):
                        base_text = out[k] + base_text
                        k -= 1
                    pdf_idx = base_run[-len(base_text):] if base_text else []
                    pdf_reading = "".join(ruby_over.get(i, "") for i in pdf_idx)
                    before = base_run[-len(base_text) - 1] if len(base_run) > len(base_text) else None
                    ok = bool(base_text) and pdf_reading == ruby_buf and (before is None or before not in ruby_over)
                    if not ok:
                        log["issues"].append({"op": "ruby", "base": base_text, "html": ruby_buf, "pdf": pdf_reading, "fragment": fi})
                    else:
                        for i in pdf_idx:
                            ruby_over.pop(i, None)
                    out.append("｛" + ruby_buf + "｝")
                    base_run = []
                    continue
                if depth:
                    ruby_buf += ch
                    continue
                if ch == "\n":
                    html_br_since = True
                    out.append("\n")
                    prev_pdf = None
                    base_run = []
                    continue
                if ch.isspace() or ch == "\x00":
                    continue
                m = pos_map.get((fi, pos))
                # separator between previous and this char
                if force_space:
                    out.append(" ")
                    force_space = False
                elif out and out[-1] != "\n" and prev_html_pos is not None:
                    gap_html = text[prev_html_pos + 1 : pos]
                    gap_html = re.sub(r"｛[^｝]*｝", "", gap_html)
                    gap_pdf = "".join(pdf_chars[prev_pdf + 1 : m]) if (prev_pdf is not None and m is not None) else ""
                    if "　" in gap_pdf:
                        out.append("　")
                    elif " " in gap_html.replace("\x00", ""):
                        out.append(" ")
                    elif "\x00" in gap_html and not gap_pdf.strip("\n"):
                        # structural nbsp without PDF space: keep nothing but log
                        log["normalizations"].append({"op": "nbsp-without-pdf-space", "fragment": fi, "context": text[max(0,pos-8):pos+8]})
                    elif "\x00" in gap_html:
                        out.append("　")
                if m is None and ch != "－":
                    # HTML-only text of the visual-material question (no PDF glyphs):
                    # keep the center's accessible description as-is.
                    out.append(ch)
                    base_run = []
                elif m is None:
                    # tolerated HTML-only char: combination dash drawn as a rule in
                    # the PDF. Use the center's accessible-text spacing " － ".
                    if out and out[-1] in (" ", "　"):
                        out[-1] = " "
                    elif out and out[-1] != "\n":
                        out.append(" ")
                    out.append(ch)
                    force_space = True
                    base_run = []
                else:
                    if last_pdf is not None and "\n" in pdf_chars[last_pdf + 1 : m]:
                        gap = "".join(pdf_chars[last_pdf + 1 : m])
                        ls = last_pdf + 1 + gap.rfind("\n") + 1
                        while ls not in LINE_START and ls < m:
                            ls += 1
                        x0, _x1, fname, page = LINE_START.get(ls, (None, None, None, None))
                        prev_ls = max(k for k in LINE_START if k <= last_pdf)
                        TRANS.append({"exam": CUR_EXAM, "fragment": fi, "htmlBreak": html_br_since, "x0": x0,
                                      "prevX0": LINE_START[prev_ls][0], "prevX1": LINE_START[prev_ls][1],
                                      "file": fname, "page": page, "at": text[max(0, pos - 8):pos + 4]})
                        # PDF paragraph (1em first-line indent after a short line) that the
                        # accessible HTML runs together: keep the PDF paragraph break.
                        if (not html_br_since and x0 is not None and 100.5 <= x0 <= 103.5
                                and LINE_START[prev_ls][1] < 505 and frags[fi]["tag"] in ("dt", "dtcont", "dd")):
                            if out and out[-1] in (" ", "　"):
                                out.pop()
                            out.append("\n")
                            log["normalizations"].append({"op": "pdf-paragraph-added", "fragment": fi, "file": fname, "page": page, "at": text[max(0, pos - 8):pos + 4]})
                    last_pdf = m
                    html_br_since = False
                    pch = pdf_chars[m]
                    out.append(pch)
                    if KANJI.match(pch):
                        base_run.append(m)
                    else:
                        base_run = []
                    prev_pdf = m
                prev_html_pos = pos
            return "".join(out).strip("\n")

        # walk blocks into questions
        subject = None
        group_title = None
        pending_case = None  # (text, set(qnums))
        current = None
        for fi, fr in enumerate(frags):
            tag = fr["tag"]
            raw = fr["text"]
            if tag == "h2":
                t = raw.strip()
                if not t.startswith("＜"):
                    subject = t
                group_title = None
                continue
            if tag == "h3":
                group_title = render(fi)
                continue
            if tag == "p":
                text = render(fi)
                nums = [int(x) for x in re.findall(r"問題(\d+)", raw)]
                if "から" in raw and len(nums) == 2:
                    qset = set(range(nums[0], nums[1] + 1))
                else:
                    qset = set(nums)
                if group_title:
                    text = group_title + "\n" + text
                pending_case = (text, qset)
                continue
            if tag == "dt":
                m = re.match(r"\s*問題(\d+)\x00+", raw)
                if not m:
                    raise SystemExit(f"bad dt {raw[:40]}")
                num = int(m.group(1))
                current = {
                    "number": num,
                    "subject": subject,
                    "half": half["name"],
                    "stem": render(fi, m.end()),
                    "choices": [],
                    "notes": [],
                    "case": pending_case[0] if pending_case and num in pending_case[1] else None,
                    "pdf": [],
                }
                out_questions.append(current)
                continue
            if tag == "dtcont":
                current["stem"] += "\n" + render(fi)
                continue
            if tag == "dd":
                m = re.match(r"\s*([1-5１-５])\x00+", raw)
                if not m and not current["choices"]:
                    # markup quirk: stem continuation placed in <dd>
                    current["stem"] += "\n" + render(fi)
                    log["normalizations"].append({"op": "stem-continuation-in-dd", "number": current["number"]})
                    continue
                if not m:
                    raise SystemExit(f"bad dd {raw[:40]}")
                current["choices"].append(render(fi, m.end()))
                continue
            if tag == "li":
                # A note printed right after a case block (before its first question)
                # belongs to the case text, not to the previous question.
                previous = next(frags[k]["tag"] for k in range(fi - 1, -1, -1) if frags[k]["tag"] != "li")
                if previous == "p" and pending_case:
                    pending_case = (pending_case[0] + "\n" + render(fi), pending_case[1])
                    log["normalizations"].append({"op": "case-note", "fragment": fi})
                else:
                    current["notes"].append(render(fi))
                continue
        # attach PDF page provenance per question (first mapped char)
        for q in out_questions:
            if q["half"] != half["name"]:
                continue
        # leftover ruby not consumed
        for idx, reading in ruby_over.items():
            log["issues"].append({"op": "unconsumed-pdf-ruby", "base": pdf_chars[idx], "reading": reading, "where": info[idx]})
        # page provenance
        for fi, fr in enumerate(frags):
            if fr["tag"] != "dt":
                continue
        # map question number -> file/page via first stem char
        for (fi, pos), m in pos_map.items():
            pass
        qstart = {}
        for fi, fr in enumerate(frags):
            if fr["tag"] == "dt":
                num = int(re.match(r"\s*問題(\d+)", fr["text"]).group(1))
                ms = [pos_map[(fi, p)] for p in range(len(fr["text"])) if pos_map.get((fi, p)) is not None]
                if ms:
                    qstart[num] = info[ms[-1]]
        for q in out_questions:
            if q["half"] == half["name"] and q["number"] in qstart:
                q["pdfFile"], q["pdfPage"] = qstart[q["number"]]
    return out_questions, log


CONFIGS = {
    "kaigo": {
        "dir": "kaigo38",
        "visual": [{"marker": "視覚素材問題", "number": 49}],
        "halves": [
            {"name": "am", "html": "listen_am.html", "pdfs": [f"k_am_0{i}_38.pdf" for i in range(1, 7)]},
            {"name": "pm", "html": "listen_pm.html", "pdfs": [f"k_pm_0{i}_38.pdf" for i in range(1, 8)]},
        ],
    },
    "shakai": {
        "dir": "shakai38",
        "halves": [
            {"name": "am", "html": "listen_am.html", "pdfs": [f"sp_am_{i:02d}_38.pdf" for i in range(1, 13)]},
            {"name": "pm", "html": "listen_pm.html", "pdfs": [f"ss_pm_{i:02d}_38.pdf" for i in range(1, 8)]},
        ],
    },
    "seishin": {
        "dir": "seishin28",
        "halves": [
            {"name": "pm", "html": "listen_pm.html", "pdfs": [f"se_pm_{i:02d}_28.pdf" for i in range(1, 7)]},
        ],
    },
}

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("exam", choices=sorted(CONFIGS))
    parser.add_argument("--cache", required=True, help="folder holding kaigo38/, shakai38/, seishin28/ downloads")
    parser.add_argument("--out", required=True)
    args = parser.parse_args()
    ROOT = Path(args.cache)
    CUR_EXAM = args.exam
    qs, log = build(args.exam, CONFIGS[args.exam])
    if log["issues"]:
        for issue in log["issues"]:
            print("ISSUE", issue)
        raise SystemExit(f"{len(log['issues'])} unresolved PDF/HTML differences")
    files = sorted({p for h in CONFIGS[args.exam]["halves"] for p in h["pdfs"]})
    payload = {
        "exam": args.exam,
        "method": "PDF text layer (no OCR) aligned character-by-character with the center's accessible HTML",
        "sourceFiles": {name: sha256(ROOT / CONFIGS[args.exam]["dir"] / name) for name in files},
        "htmlFiles": {h["html"]: sha256(ROOT / CONFIGS[args.exam]["dir"] / h["html"]) for h in CONFIGS[args.exam]["halves"]},
        "normalizations": log["normalizations"],
        "questions": qs,
    }
    Path(args.out).write_text(json.dumps(payload, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(args.exam, len(qs), "questions,", len(log["normalizations"]), "logged normalizations, 0 issues")
