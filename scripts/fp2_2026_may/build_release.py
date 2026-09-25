"""Build per-question receipts for FP2 2026年5月公表 Q11-60 and release the contiguous verified run from Q11.

A question is VERIFIED only when every gate passes; otherwise it is HOLD with reasons. Release stops at the
first HOLD, so the published array is always Q11..Qn without gaps.
"""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[2]
EVIDENCE = ROOT / "docs" / "evidence" / "fp2-2026-may"
CALLS = EVIDENCE / "model-calls"
RECEIPTS = EVIDENCE / "receipts"
URL_CACHE = EVIDENCE / "reference-url-checks.json"
FIGURES = ROOT / "data" / "questions" / "fp2" / "academic-figures-2026-may.json"
OUTPUT = ROOT / "data" / "questions" / "fp2" / "academic-2026-may.json"
PDF = ROOT / ".cache" / "fp2-official" / "g2_202605_qa.pdf"
MODEL = "claude-opus-5-5"
KEYS = ["ア", "イ", "ウ", "エ"]
CATEGORY = ["ライフプランニングと資金計画", "リスク管理", "金融資産運用", "タックスプランニング", "不動産", "相続・事業承継"]
LAST_UPDATED = "2026-09-25"
# Pages with vector drawings/raster images that were checked against the render: the graphics belong to the
# listed figure question; the other question on the page has no figure (Q28's two drawings are rule lines).
FIGURE_AUDIT = {13: "page 8 graphics are Q14's table", 28: "page 17 has two rule lines only, no table or diagram",
                54: "page 31 graphics are Q55's family diagram", 60: "page 34 graphics are Q59's table"}
SOFT_404 = re.compile(r"表示できません|見つかりません|Not Found|404|エラー|存在しません")


def parse_json(text: str) -> dict | None:
    match = re.search(r"```json\s*(\{.*\})\s*```", text or "", re.S)
    try:
        return json.loads(match.group(1)) if match else None
    except json.JSONDecodeError:
        return None


def load_call(name: str) -> dict | None:
    path = CALLS / f"{name}.json"
    return json.loads(path.read_text(encoding="utf-8")) if path.exists() else None


def normalize_url(url: str) -> str:
    """e-Gov links point at the law itself; drop revision/occasion selectors copied from search results."""
    match = re.match(r"https://laws\.e-gov\.go\.jp/law/([0-9A-Z]+)", url)
    return f"https://laws.e-gov.go.jp/law/{match.group(1)}" if match else url


def review_sources(records: dict, stages: list[str]) -> list[str]:
    """Web pages the final reviewer's WebSearch cited (the CLI appends them as a Sources list)."""
    final = next((records[s] for s in reversed(stages) if records.get(s) and s.startswith("3-review")), None)
    tail = (final or {}).get("result", "").rpartition("Sources:")[2]
    return re.findall(r"\]\((https?://[^)\s]+)\)", tail)


def usage_gate(record: dict) -> tuple[bool, str]:
    usage = record.get("modelUsage") or {}
    if record.get("is_error"):
        return False, "call returned is_error"
    if list(usage) != [MODEL]:
        return False, f"modelUsage models {sorted(usage)} != [{MODEL}]"
    if usage[MODEL].get("outputTokens", 0) <= 0:
        return False, "opus produced no output tokens"
    return True, ""


def check_url(url: str, cache: dict) -> dict:
    if url in cache:
        return cache[url]
    host = urlparse(url).hostname or ""
    result: dict = {"url": url, "host": host}
    if not (host.endswith(".go.jp") and url.startswith("https://")):
        result.update(ok=False, reason="not an https government (*.go.jp) page")
    elif host == "laws.e-gov.go.jp":
        law_id = re.search(r"/law/([0-9A-Z]+)", url)
        if not law_id:
            result.update(ok=False, reason="no e-Gov law id")
        else:
            api = f"https://laws.e-gov.go.jp/api/2/law_data/{law_id.group(1)}?response_format=json&omit_amendment_suppl_provision=true"
            done = subprocess.run(["curl", "-sS", "-L", "--max-time", "40", api], capture_output=True)
            try:
                title = json.loads(done.stdout)["revision_info"]["law_title"]
                result.update(ok=True, status=200, title=title, verifiedBy="e-Gov API v2 law_data")
            except (KeyError, TypeError, json.JSONDecodeError):
                result.update(ok=False, reason="e-Gov API did not return the law")
    else:
        done = subprocess.run(["curl", "-sS", "-L", "--max-time", "40", "-o", "-", "-w", "\n%{http_code} %{content_type}", url],
                              capture_output=True)
        body, _, meta = done.stdout.rpartition(b"\n")
        status, _, ctype = meta.decode("ascii", "replace").partition(" ")
        title = ""
        if "pdf" in ctype:
            title = "(PDF)" if body.startswith(b"%PDF") else ""
        else:
            for encoding in ("utf-8", "cp932", "euc-jp"):
                try:
                    text = body.decode(encoding)
                    break
                except UnicodeDecodeError:
                    continue
            else:
                text = body.decode("utf-8", "replace")
            match = re.search(r"<title[^>]*>(.*?)</title>", text, re.S | re.I)
            title = re.sub(r"\s+", " ", match.group(1)).strip() if match else ""
        ok = status == "200" and bool(title) and not SOFT_404.search(title)
        result.update(ok=ok, status=int(status) if status.isdigit() else None, contentType=ctype, title=title)
        if not ok:
            result["reason"] = "HTTP status, empty title or not-found page"
    cache[url] = result
    return result


def main() -> None:
    extraction = json.loads((EVIDENCE / "extraction.json").read_text(encoding="utf-8"))
    figures = json.loads(FIGURES.read_text(encoding="utf-8"))
    law_date = extraction["coverStatement"]["lawReferenceDate"]
    pdf_hash = hashlib.sha256(PDF.read_bytes()).hexdigest()
    if pdf_hash != extraction["source"]["questionAnswerPdf"]["sha256"]:
        raise SystemExit("cached PDF does not match pinned hash")
    url_cache = json.loads(URL_CACHE.read_text(encoding="utf-8")) if URL_CACHE.exists() else {}
    RECEIPTS.mkdir(parents=True, exist_ok=True)

    receipts = []
    published = []
    releasing = True
    for q in extraction["questions"]:
        number = q["number"]
        answer = KEYS[q["answer"] - 1]
        holds: list[str] = []
        if not all(q["extractorChecks"].values()):
            holds.append(f"extractor mismatch: {q['extractorChecks']}")
        needs_figure = q["pageVectorDrawings"] > 0 or q["pageRasterImages"] > 0
        figure_urls = [panel["url"] for panel in figures.get(str(number), [])]
        if q["figure"] and not figure_urls:
            holds.append("figure required but not rendered")
        if needs_figure and not q["figure"] and number not in FIGURE_AUDIT:
            holds.append("page has graphics without a figure audit")
        if figure_urls and not all((ROOT / "public" / url.lstrip("/")).exists() for url in figure_urls):
            holds.append("figure file missing")

        calls = []
        stages = ["1-solve", "2-draft"] + [f"3-review-r{i}" for i in (1, 2, 3)]
        records = {stage: load_call(f"q{number:02d}-{stage}") for stage in stages}
        for stage, record in records.items():
            if record is None:
                continue
            ok, reason = usage_gate(record)
            calls.append({"file": f"model-calls/q{number:02d}-{stage}.json", "stage": stage,
                          "requestedModel": record.get("request", {}).get("model"), "modelUsage": record.get("modelUsage"),
                          "total_cost_usd": record.get("total_cost_usd"), "session_id": record.get("session_id"),
                          "is_error": record.get("is_error"), "opusOnly": ok})
            if not ok:
                holds.append(f"{stage}: {reason}")
        solve = parse_json((records["1-solve"] or {}).get("result"))
        draft = parse_json((records["2-draft"] or {}).get("result"))
        reviews = [(stage, parse_json(records[stage]["result"])) for stage in stages[2:] if records[stage]]
        if not solve:
            holds.append("blind solve missing")
        if not draft:
            holds.append("draft missing")
        if not reviews or reviews[-1][1] is None:
            holds.append("review missing")

        final_review = reviews[-1][1] if reviews and reviews[-1][1] else {}
        verdicts = [r.get("verdict") if r else None for _, r in reviews]
        if final_review and final_review.get("verdict") != "PASS":
            holds.append(f"review not PASS after {len(reviews)} round(s): {verdicts}")
        if final_review and not final_review.get("officialAnswerSupported"):
            holds.append("reviewer does not support the official answer")
        if final_review:
            bad_choices = [k for k in KEYS if not (final_review.get("perChoice") or {}).get(k, {}).get("ok")]
            if bad_choices:
                holds.append(f"final review flags choice explanations {bad_choices} as unsupported or wrong")
            if not final_review.get("explanationOk"):
                holds.append("final review flags the general explanation")
            if not final_review.get("referenceUrlsOk"):
                holds.append("final review flags the reference URLs")
        if final_review and not final_review.get("lawDateClear"):
            holds.append(f"law reference date {law_date} does not settle the answer")
        blind_answer = solve.get("answer") if solve else None
        if draft and not draft.get("officialAnswerConsistent", False):
            holds.append("drafter flagged the official answer as inconsistent")

        # The text that the final PASS reviewed is the draft with every earlier FIX applied.
        content = {k: (draft or {}).get(k) for k in ["explanation", "choiceExplanations", "officialReferenceUrls"]}
        for _, review in reviews[:-1]:
            if review and review.get("verdict") == "FIX" and review.get("correctedChoiceExplanations"):
                content = {"explanation": review.get("correctedExplanation") or content["explanation"],
                           "choiceExplanations": review["correctedChoiceExplanations"],
                           "officialReferenceUrls": review.get("correctedOfficialReferenceUrls") or content["officialReferenceUrls"]}
        explanations = content.get("choiceExplanations") or {}
        if sorted(explanations) != KEYS or not all(len(str(explanations[k]).strip()) > 10 for k in explanations):
            holds.append("choice explanations incomplete")
        if not str(content.get("explanation") or "").strip():
            holds.append("general explanation missing")
        url_checks = [check_url(url, url_cache) for url in dict.fromkeys(
            normalize_url(u) for u in (content.get("officialReferenceUrls") or []))]
        verified_urls = [c["url"] for c in url_checks if c["ok"]]
        dropped_urls = [c["url"] for c in url_checks if not c["ok"]]

        status = "VERIFIED" if not holds else "HOLD"
        receipt = {
            "question": number,
            "status": status,
            "holdReasons": holds,
            "released": False,
            "source": {"pdfUrl": extraction["source"]["questionAnswerPdf"]["url"], "sha256": pdf_hash,
                       "pdfPage": q["sourcePage"], "reuseTerms": extraction["source"]["reuseTerms"]},
            "transcription": {"stemSha256": hashlib.sha256(q["stem"].encode()).hexdigest(),
                              "choicesSha256": hashlib.sha256("\n".join(q["choices"]).encode()).hexdigest(),
                              "extractorChecks": q["extractorChecks"], "choiceCount": len(q["choices"])},
            "officialAnswer": {"pdfNotation": f"正解 {q['answer']})", "key": answer},
            "figure": {"pageVectorDrawings": q["pageVectorDrawings"], "pageRasterImages": q["pageRasterImages"],
                       "required": q["figure"], "imageUrls": figure_urls, "transcribedFromRender": q["figureTranscribedFromRender"],
                       "audit": FIGURE_AUDIT.get(number)},
            "lawReferenceDate": {"value": law_date, "basis": "cover page 注意事項2: 問題文に特に断りのない限り、2025年4月1日現在施行の法令等",
                                 "reviewerLawDateClear": final_review.get("lawDateClear")},
            "judgment": {"blindSolveAnswer": blind_answer, "blindSolveAgrees": blind_answer == answer,
                         "reviewVerdicts": verdicts, "finalReviewIssues": final_review.get("issues", []),
                         "draftConcerns": (draft or {}).get("concerns", []),
                         "draftLawDateNote(unpublished)": (draft or {}).get("lawDateNote", "")},
            "referenceUrlChecks": url_checks,
            "referenceUrlsDropped": dropped_urls,
            "finalReviewWebSources": review_sources(records, stages),
            "modelCalls": calls,
        }
        if status == "VERIFIED" and releasing:
            receipt["released"] = True
            has_image = bool(figure_urls)
            attribution = ("出典：日本FP協会 2級ファイナンシャル・プランニング技能検定 学科試験（2026年5月公表分）を加工して作成。"
                           "改行・空白を整形し、選択肢番号1〜4をア〜エへ置換。")
            if has_image:
                attribution += "図表は原典の該当箇所を画像化し、内容を文字でも併記。"
            attribution += "解説は当サイト作成。"
            item = {
                "id": f"fp2-2026-published-gakka-q{number}", "exam": "fp2", "session": "gakka", "year": 2026,
                "season": "published", "qNumber": number, "type": "multiple-choice",
                "category": CATEGORY[(number - 1) // 10],
                "topicTags": (draft or {}).get("topicTags", [])[:3],
                "difficulty": int((draft or {}).get("difficulty") or 2),
                "question": q["stem"],
                "choices": dict(zip(KEYS, q["choices"])),
                "answer": answer,
                "explanation": content["explanation"].strip(),
                "choiceExplanations": {k: str(explanations[k]).strip() for k in KEYS},
                "hasImage": has_image,
            }
            if has_image:
                item["imageUrls"] = figure_urls
            if (draft or {}).get("isCalculation"):
                item["isCalculation"] = True
            item.update({
                "sourcePdfUrl": extraction["source"]["questionAnswerPdf"]["url"],
                "sourceAnswerUrl": extraction["source"]["questionAnswerPdf"]["url"],
                "sourceAttribution": attribution,
            })
            if verified_urls:
                item["officialReferenceUrls"] = verified_urls
            item.update({"license": "JAFP-reuse-with-attribution", "lawReferenceDate": law_date, "lastUpdated": LAST_UPDATED})
            published.append(item)
        else:
            releasing = False
        (RECEIPTS / f"q{number:02d}.json").write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        receipts.append(receipt)

    URL_CACHE.write_text(json.dumps(url_cache, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    OUTPUT.write_text(json.dumps(published, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    summary = {
        "range": "Q11-Q60",
        "lawReferenceDate": law_date,
        "pdfSha256": pdf_hash,
        "verified": [r["question"] for r in receipts if r["status"] == "VERIFIED"],
        "hold": {str(r["question"]): r["holdReasons"] for r in receipts if r["status"] == "HOLD"},
        "released": [r["question"] for r in receipts if r["released"]],
        "modelCallCount": sum(len(r["modelCalls"]) for r in receipts),
        "modelCostUsd": round(sum((c["total_cost_usd"] or 0) for r in receipts for c in r["modelCalls"]), 4),
    }
    (EVIDENCE / "summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({k: summary[k] for k in ["verified", "released", "modelCallCount", "modelCostUsd"]}, ensure_ascii=False))
    for number, reasons in summary["hold"].items():
        print(f"HOLD Q{number}: {reasons}")


if __name__ == "__main__":
    main()
