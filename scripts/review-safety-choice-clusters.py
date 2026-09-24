"""Review all candidate questions in shared-evidence clusters, resume per question.

Read-only by default. --review calls the existing Claude CLI adapter. Results go
to an evidence ledger; this command NEVER writes published overlays. Run with the
target worktree's --root to inspect lckohyo or emkohyo without cherry-picking data.
"""
import argparse
from collections import Counter, defaultdict
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date
from hashlib import sha256
import importlib.util
import json
from pathlib import Path
import re
import subprocess
import sys
from urllib.parse import urlparse

import requests

from safety_choice_review_gate import (candidate_issues, digest, make_receipt, receipt_current,
                                      receipt_key, reuse_candidate_key, source_snapshot)


def read(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def write(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_suffix(path.suffix + ".tmp")
    temp.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temp.replace(path)


def verified_official_pdf(root, paper):
    """Only hand a reviewer bytes matching the catalog's original PDF digest."""
    expected = paper.get("pdfSha256", "")
    if not re.fullmatch(r"[0-9a-f]{64}", expected):
        raise ValueError(f"Missing original PDF SHA-256: {paper.get('id')}")
    cache = root / ".cache/safety-full-review/official-pdfs" / f"{expected}.pdf"
    if cache.is_file():
        if sha256(cache.read_bytes()).hexdigest() == expected:
            return cache
        cache.unlink()
    url = paper.get("pdfUrl", "")
    if not url.startswith("https://www.exam.or.jp/"):
        raise ValueError(f"Unexpected official PDF host: {url}")
    response = requests.get(url, timeout=60)
    response.raise_for_status()
    payload = response.content
    if len(payload) > 32 * 1024 * 1024 or sha256(payload).hexdigest() != expected:
        raise ValueError(f"Official PDF content mismatch: {paper['id']}")
    cache.parent.mkdir(parents=True, exist_ok=True)
    cache.write_bytes(payload)
    return cache


def verified_government_source(root, source):
    """Cache the exact government bytes pinned by the source-pack receipt."""
    retrieval = source.get("retrieval", {})
    expected = retrieval.get("sha256", "")
    url = retrieval.get("retrievalUrl", "")
    parsed = urlparse(url)
    if (parsed.scheme != "https" or parsed.hostname is None
            or not parsed.hostname.endswith(".go.jp")
            or parsed.username or parsed.password or parsed.port is not None
            or not re.fullmatch(r"[0-9a-f]{64}", expected)):
        raise ValueError(f"Invalid pinned government source: {source.get('url')}")
    content_type = retrieval.get("contentType", "").lower()
    suffix = ".pdf" if "pdf" in content_type else ".json" if "json" in content_type else ".html"
    cache = root / ".cache/safety-full-review/government-sources" / f"{expected}{suffix}"
    if cache.is_file():
        if sha256(cache.read_bytes()).hexdigest() == expected:
            return cache
        cache.unlink()
    response = requests.get(url, timeout=90)
    response.raise_for_status()
    payload = response.content
    if (len(payload) != retrieval.get("bytes")
            or len(payload) > 32 * 1024 * 1024
            or sha256(payload).hexdigest() != expected):
        raise ValueError(f"Government source content mismatch: {source.get('url')}")
    cache.parent.mkdir(parents=True, exist_ok=True)
    cache.write_bytes(payload)
    return cache


def pin_candidate_sources(root, drafts, existing_packs, group):
    """Persist byte receipts for candidate citations absent from accepted packs."""
    path = root / f"docs/evidence/{group}-candidate-source-pins.json"
    previous = read(path) if path.exists() else {"sources": []}
    pinned = {source["url"]: source for source in previous.get("sources", [])}
    known = {source.get("url") for pack in existing_packs
             for source in pack["content"].get("sources", [])}
    grouped = defaultdict(lambda: {"titles": set(), "questionIds": set()})
    for qid, candidate in drafts.items():
        for source in candidate.get("sources", []):
            grouped[source.get("url")]["titles"].add(source.get("title", ""))
            grouped[source.get("url")]["questionIds"].add(qid)
    for url, references in sorted(grouped.items()):
        if url in known:
            continue
        parsed = urlparse(url)
        if (parsed.scheme != "https" or parsed.hostname is None
                or not parsed.hostname.endswith(".go.jp")
                or parsed.username or parsed.password or parsed.port is not None):
            raise ValueError(f"Cannot pin non-government candidate source: {url}")
        retrieval_url = parsed._replace(fragment="").geturl()
        current = pinned.get(url)
        if current and current.get("retrieval", {}).get("retrievalUrl") == retrieval_url:
            continue
        response = requests.get(retrieval_url, timeout=90)
        response.raise_for_status()
        payload = response.content
        if len(payload) < 300 or len(payload) > 32 * 1024 * 1024:
            raise ValueError(f"Candidate source is not substantive: {url}")
        content_type = response.headers.get("Content-Type", "application/octet-stream")
        receipt = {"retrievalUrl": retrieval_url, "retrievedOn": date.today().isoformat(),
                   "sha256": sha256(payload).hexdigest(), "bytes": len(payload),
                   "contentType": content_type}
        pinned[url] = {"url": url, "title": sorted(references["titles"])[0],
                       "locators": [], "relevantQuestionIds": sorted(references["questionIds"]),
                       "retrieval": receipt}
        suffix = ".pdf" if "pdf" in content_type.lower() else ".json" if "json" in content_type.lower() else ".html"
        cache = root / ".cache/safety-full-review/government-sources" / f"{receipt['sha256']}{suffix}"
        cache.parent.mkdir(parents=True, exist_ok=True)
        cache.write_bytes(payload)
    sources = [pinned[url] for url in sorted(pinned)]
    # A read-only resume does not retrieve new bytes. Preserve its exact pack
    # (including retrieval date) so midnight alone cannot invalidate reviews.
    if previous.get("sources") == sources and path.exists():
        value = previous
    else:
        value = {"retrievedOn": date.today().isoformat(),
                 "notice": "Candidate evidence only; question-level Opus review is still required.",
                 "sources": sources}
        write(path, value)
    return {"path": str(path), "sha256": digest(value), "content": value}


def refresh_question_sources(root, drafts, question_ids, group):
    """Create an immutable current-byte pack scoped to explicitly named questions."""
    rows = defaultdict(lambda: {"titles": set(), "questionIds": set()})
    for qid in question_ids:
        if qid not in drafts:
            raise ValueError(f"Cannot refresh missing candidate: {qid}")
        for source in drafts[qid].get("sources", []):
            rows[source["url"]]["titles"].add(source.get("title", ""))
            rows[source["url"]]["questionIds"].add(qid)
    token = digest(sorted(question_ids))[:16]
    path = root / f"docs/evidence/{group}-current-source-pins/{token}.json"
    if path.exists():
        value = read(path)
        return {"path": str(path), "sha256": digest(value), "content": value}
    sources = []
    for url, references in sorted(rows.items()):
        parsed = urlparse(url)
        if (parsed.scheme != "https" or parsed.hostname is None
                or not parsed.hostname.endswith(".go.jp")
                or parsed.username or parsed.password or parsed.port is not None):
            raise ValueError(f"Cannot refresh non-government source: {url}")
        retrieval_url = parsed._replace(fragment="").geturl()
        response = requests.get(retrieval_url, timeout=90)
        response.raise_for_status()
        payload = response.content
        if len(payload) < 300 or len(payload) > 32 * 1024 * 1024:
            raise ValueError(f"Refreshed source is not substantive: {url}")
        content_type = response.headers.get("Content-Type", "application/octet-stream")
        receipt = {"retrievalUrl": retrieval_url, "retrievedOn": date.today().isoformat(),
                   "sha256": sha256(payload).hexdigest(), "bytes": len(payload),
                   "contentType": content_type}
        sources.append({"url": url, "title": sorted(references["titles"])[0],
                        "locators": [], "relevantQuestionIds": sorted(references["questionIds"]),
                        "retrieval": receipt})
        suffix = ".pdf" if "pdf" in content_type.lower() else ".json" if "json" in content_type.lower() else ".html"
        cache = root / ".cache/safety-full-review/government-sources" / f"{receipt['sha256']}{suffix}"
        cache.parent.mkdir(parents=True, exist_ok=True)
        cache.write_bytes(payload)
    value = {"schemaVersion": 1, "group": group,
             "questionIds": sorted(question_ids), "retrievedOn": date.today().isoformat(),
             "notice": "Question-scoped current source bytes; no applicability is inferred.",
             "sources": sources}
    write(path, value)
    return {"path": str(path), "sha256": digest(value), "content": value}


def evidence_for_question(packs, question_id, urls):
    result = []
    for pack in packs:
        sources = pack["content"].get("sources", [])
        if any(source.get("url") in urls
               and (not source.get("relevantQuestionIds")
                    or question_id in source["relevantQuestionIds"])
               for source in sources):
            result.append(pack)
    return result


def candidates(root, published, selections):
    result = dict(published)
    conflicts = set()
    matched = set()
    private = []
    for file in (root / ".cache/safety-choice-lckohyo").glob("*.candidate.json"):
        private.extend((qid, overlay, file.name) for qid, overlay in read(file).items())
    for file in (root / "data/exam-library/emkohyo-review").glob("*-draft.json"):
        private.extend((qid, row.get("overlay"), file.name)
                       for qid, row in read(file).get("questions", {}).items())
    for qid, overlay, filename in private:
        if not isinstance(overlay, dict) or (qid in published and qid not in selections):
            continue
        selected = selections.get(qid)
        if selected and (filename != selected.get("file")
                         or digest(overlay) != selected.get("sha256")):
            continue
        if selected:
            matched.add(qid)
        if selected and qid in published:
            result[qid] = overlay
            continue
        if qid in result and result[qid] != overlay:
            conflicts.add(qid)
        else:
            result[qid] = overlay
    for qid, selected in selections.items():
        if qid not in matched:
            conflicts.add(qid)
    for qid in conflicts:
        result.pop(qid, None)
    return result, sorted(conflicts)


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    ap.add_argument("--group", choices=["lckohyo", "emkohyo"], required=True)
    ap.add_argument("--review", action="store_true")
    ap.add_argument("--promote-reviewed", action="store_true",
                    help="Publish only questions with current full five-choice PASS receipts")
    ap.add_argument("--retry-holds", action="store_true",
                    help="Retry unchanged full-review HOLD receipts")
    ap.add_argument("--workers", type=int, default=3)
    ap.add_argument("--max-batches", type=int, default=1)
    ap.add_argument("--batch-size", type=int, default=6)
    ap.add_argument("--model", default="claude-opus-5-5")
    ap.add_argument("--refresh-source-questions",
                    help="Comma-separated question IDs for one immutable current-byte source pack")
    ap.add_argument("--ledger", type=Path)
    ap.add_argument("--plan", type=Path)
    args = ap.parse_args()
    if not 1 <= args.batch_size <= 8 or args.max_batches < 0 or not 1 <= args.workers <= 3:
        ap.error("batch-size 1..8; workers 1..3; max-batches nonnegative")
    if args.review and args.promote_reviewed:
        ap.error("review and promotion are separate resume checkpoints")
    root = args.root.resolve()
    data = root / "data/exam-library"
    selection_file = root / f"docs/evidence/{args.group}-choice-candidate-selections.json"
    selections = read(selection_file) if selection_file.exists() else {}
    catalog = [p for p in read(data / "official-catalog.json") if p["group"] == args.group]
    years = sorted({p["date"][:4] for p in catalog}, reverse=True)[:2]
    catalog = [p for p in catalog if p["date"][:4] in years]
    ledger_path = args.ledger or root / f"docs/evidence/{args.group}-full-choice-review-ledger.json"
    ledger = read(ledger_path) if ledger_path.exists() else {}
    published = read(data / "choice-explanations.json")
    drafts, conflicts = candidates(root, published, selections)
    packs = []
    for folder in (data / "source-packs", root / "docs/evidence/emkohyo-choice-sources",
                   root / "docs/evidence/emkohyo-2025-sources"):
        for path in folder.glob("**/*.json"):
            # Keep only source records, not audit summaries/hold indexes.
            value = read(path)
            if isinstance(value, dict) and ("sources" in value or "evidence" in value):
                packs.append({"path": str(path), "sha256": digest(value), "content": value})
    target_prefixes = tuple(paper["id"] + "-q" for paper in catalog)
    target_drafts = {qid: candidate for qid, candidate in drafts.items()
                     if qid.startswith(target_prefixes)}
    refresh_folder = root / f"docs/evidence/{args.group}-current-source-pins"
    for path in refresh_folder.glob("*.json"):
        value = read(path)
        packs.append({"path": str(path), "sha256": digest(value), "content": value})
    if args.refresh_source_questions:
        refresh_ids = [qid.strip() for qid in args.refresh_source_questions.split(",") if qid.strip()]
        refreshed = refresh_question_sources(root, target_drafts, refresh_ids, args.group)
        if all(pack["path"] != refreshed["path"] for pack in packs):
            packs.append(refreshed)
    # Question-scoped packs must be visible before extending the shared candidate
    # pack, otherwise adding one candidate invalidates unrelated receipts.
    packs.append(pin_candidate_sources(root, target_drafts, packs, args.group))
    counts = Counter()
    groups = defaultdict(list)
    duplicates = defaultdict(list)
    missing_images = []
    static_holds = []
    ready = {}
    verified_ids = set()
    paper_targets = defaultdict(set)
    for paper in catalog:
        for question in read(data / "papers" / (paper["id"] + ".json")):
            if question.get("answerAuthority") != "official" or question.get("choiceCount") != 5:
                continue
            qid = question["id"]
            counts["target"] += 1
            paper_targets[paper["id"]].add(qid)
            duplicates[reuse_candidate_key(question)].append(qid)
            if qid not in drafts:
                counts["candidateMissing"] += 1
                continue
            candidate = drafts[qid]
            problems = candidate_issues(question, candidate, args.group)
            if problems:
                counts["staticHold"] += 1
                static_holds.append({"questionId": qid, "issues": problems})
                continue
            urls = sorted({x.get("url", "") for x in candidate.get("sources", [])})
            relevant = evidence_for_question(packs, qid, urls)
            try:
                snapshot = source_snapshot(root, question, paper)
            except ValueError as exc:
                missing_images.append({"questionId": qid, "issue": str(exc)})
                counts["sourceHold"] += 1
                continue
            if receipt_current(ledger.get(qid, {}), snapshot, candidate, relevant):
                counts["fullReviewCurrent"] += 1
                verified_ids.add(qid)
                if published.get(qid) != candidate:
                    ready[qid] = candidate
                continue
            previous = ledger.get(qid, {})
            if (previous.get("status") == "HOLD"
                    and all(previous.get(k) == v for k, v in
                            receipt_key(snapshot, candidate, relevant).items())
                    and not args.retry_holds):
                counts["reviewHold"] += 1
                continue
            counts["reviewPending"] += 1
            groups[paper["subject"]].append({"id": qid, "snapshot": snapshot,
                "candidate": candidate, "evidence": relevant})
    batches = []
    for _, rows in sorted(groups.items()):
        # Cluster adjacent questions by shared citations, but allow sparse URL
        # sets to share one review request. Each still receives its own verdict.
        rows.sort(key=lambda row: (tuple(sorted(s["url"] for s in row["candidate"]["sources"])), row["id"]))
        batches.extend(rows[i:i + args.batch_size] for i in range(0, len(rows), args.batch_size))
    plan = {"group": args.group, "years": years, "counts": dict(counts),
            "clusterBatches": len(batches), "candidateConflicts": conflicts,
            "sourceHolds": missing_images,
            "staticHolds": static_holds,
            "exactTextReuseCandidates": [ids for ids in duplicates.values() if len(ids) > 1],
            "notice": "Reuse groups are candidates only; image/date/legal applicability is not inferred.",
            "batches": [[row["id"] for row in batch] for batch in batches]}
    if args.plan:
        write(args.plan, plan)
    print(json.dumps({k: v for k, v in plan.items() if k not in
                      ("batches", "exactTextReuseCandidates", "sourceHolds", "staticHolds")}, ensure_ascii=False), flush=True)
    if not args.review:
        if args.promote_reviewed:
            if args.group != "lckohyo":
                raise SystemExit("Only lckohyo promotion is implemented in this worktree")
            before = dict(published)
            published.update(ready)
            if ready:
                published_path = data / "choice-explanations.json"
                write(published_path, published)
                check = subprocess.run(["node", str(root / "scripts/validate-safety-exams.mjs"),
                                        "--require-explanations"], cwd=root,
                                       capture_output=True, text=True, encoding="utf-8")
                if check.returncode:
                    write(published_path, before)
                    raise SystemExit("Validation failed; publication restored: " +
                                     check.stdout[-2000:] + check.stderr[-1000:])
            contract_path = data / "coverage-contract.json"
            contract = read(contract_path)
            required = contract["structuredChoiceExplanations"]["requiredPaperIds"]
            closed = []
            current_ids = {qid for qid in published if qid in verified_ids}
            for paper_id, ids in paper_targets.items():
                if ids <= current_ids and paper_id not in required:
                    required.append(paper_id)
                    closed.append(paper_id)
            if closed:
                write(contract_path, contract)
            print(json.dumps({"promoted": len(ready), "fullReviewCurrent":
                              counts["fullReviewCurrent"], "papersClosed": closed},
                             ensure_ascii=False), flush=True)
        return
    adapter_path = root / "scripts/complete-safety-choice-explanations.py"
    if not adapter_path.exists():
        adapter_path = Path(__file__).with_name("complete-safety-choice-explanations.py")
    spec = importlib.util.spec_from_file_location("safety_author_adapter", adapter_path)
    adapter = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(adapter)
    adapter.ROOT = root
    pdf_paths = {}
    for batch in batches[:args.max_batches]:
        for row in batch:
            paper = row["snapshot"]["paper"]
            if paper["id"] not in pdf_paths:
                pdf_paths[paper["id"]] = verified_official_pdf(root, paper)
    def review_batch(batch):
        shared_evidence = {item["sha256"]: item for row in batch for item in row["evidence"]}
        questions = []
        for row in batch:
            source_records = {source.get("url"): source
                              for item in row["evidence"]
                              for source in item["content"].get("sources", [])}
            local_sources = []
            for cited in row["candidate"].get("sources", []):
                source = source_records.get(cited.get("url"))
                if source is None:
                    raise ValueError(f"No SHA-pinned source bytes for {row['id']}: {cited.get('url')}")
                local_sources.append({"url": cited["url"], "title": source.get("title"),
                                      "locators": source.get("locators", []),
                                      "sha256": source["retrieval"]["sha256"],
                                      "localPath": str(verified_government_source(root, source))})
            questions.append(dict({k: v for k, v in row.items() if k != "evidence"},
                                  officialPdfLocalPath=str(pdf_paths[row["snapshot"]["paper"]["id"]]),
                                  governmentSourceFiles=local_sources))
        payload = {"questions": questions, "sharedEvidence": list(shared_evidence.values())}
        prompt = ("独立レビュー。下記の全問・全5肢を政府一次資料と公式問題に照合しJSONのみ返す。"
                  "1問のサンプルから他問をPASSにしない。画像はローカルpublic配下のファイルをReadで見る。"
                  "各PDF/条項/出題時の適用を確認。元の正答との矛盾や未確認はHOLD。"
                  "キーは全question id。値はstatus(PASS/HOLD), issues(具体的理由の配列), "
                  "choiceChecks({1:PASS/HOLD,...,5:PASS/HOLD}), evidenceUrls(確認した政府URL配列), "
                  "officialAnswerChecked, originalTextChecked, imagesChecked, historicalApplicabilityChecked, "
                  "sourceSupportChecked(真偽値)。すべて確認した場合だけtrue。"
                  "evidenceUrlsにはcandidate.sourcesの全URLをそのまま含め、公式問題PDFのexam.or.jp URLは"
                  "governmentSourceFilesではないため含めない。"
                  "根拠パックは探索の補助であり信頼せず原本を確認。ファイル編集禁止。\n"
                  + json.dumps(payload, ensure_ascii=False))
        token = digest(batch)[:16]
        # Existing CLI adapter fails closed on limit; no queued retries or paid fallback.
        review, model_proof = adapter.call_claude(
            prompt, root / ".cache/safety-full-review" / token,
            args.model, return_model=True, tools=("Read", "Glob", "Grep"))
        if set(review) != {q["id"] for q in batch}:
            raise ValueError("Reviewer omitted or added IDs; no receipts accepted")
        receipts = {}
        for row in batch:
            receipts[row["id"]] = make_receipt(row["id"], row["snapshot"], row["candidate"],
                                               row["evidence"], review[row["id"]], model_proof)
        return token, receipts

    failures = []
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        pending = {pool.submit(review_batch, batch): batch for batch in batches[:args.max_batches]}
        for future in as_completed(pending):
            try:
                token, receipts = future.result()
            except Exception as exc:
                failures.append(str(exc))
                print(json.dumps({"reviewError": str(exc),
                                  "questionIds": [row["id"] for row in pending[future]]},
                                 ensure_ascii=False), flush=True)
                continue
            ledger.update(receipts)
            write(ledger_path, ledger)
            print(json.dumps({"batch": token, "results": {qid: row["status"]
                                                       for qid, row in receipts.items()},
                              "model": args.model}, ensure_ascii=False), flush=True)
    if failures:
        raise SystemExit(f"{len(failures)} review batches failed; completed receipts saved")


if __name__ == "__main__":
    main()
