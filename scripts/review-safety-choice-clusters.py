"""Review all candidate questions in shared-evidence clusters, resume per question.

Read-only by default. --review calls the existing Claude CLI adapter. Results go
to an evidence ledger; this command NEVER writes published overlays. Run with the
target worktree's --root to inspect lckohyo or emkohyo without cherry-picking data.
"""
import argparse
from collections import Counter, defaultdict
import importlib.util
import json
from pathlib import Path
import sys

from safety_choice_review_gate import (candidate_issues, digest, make_receipt, receipt_current,
                                      reuse_candidate_key, source_snapshot)


def read(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def write(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_suffix(path.suffix + ".tmp")
    temp.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temp.replace(path)


def candidates(root, published):
    result = dict(published)
    conflicts = set()
    private = []
    for file in (root / ".cache/safety-choice-lckohyo").glob("*.candidate.json"):
        private.extend(read(file).items())
    for file in (root / "data/exam-library/emkohyo-review").glob("*-draft.json"):
        private.extend((qid, row.get("overlay")) for qid, row in read(file).get("questions", {}).items())
    for qid, overlay in private:
        if not isinstance(overlay, dict) or qid in published:
            continue
        if qid in result and result[qid] != overlay:
            conflicts.add(qid)
        else:
            result[qid] = overlay
    for qid in conflicts:
        result.pop(qid, None)
    return result, sorted(conflicts)


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    ap.add_argument("--group", choices=["lckohyo", "emkohyo"], required=True)
    ap.add_argument("--review", action="store_true")
    ap.add_argument("--max-batches", type=int, default=1)
    ap.add_argument("--batch-size", type=int, default=6)
    ap.add_argument("--model", default="opus")
    ap.add_argument("--ledger", type=Path)
    ap.add_argument("--plan", type=Path)
    args = ap.parse_args()
    if not 1 <= args.batch_size <= 8 or args.max_batches < 0:
        ap.error("batch-size 1..8; max-batches nonnegative")
    root = args.root.resolve()
    data = root / "data/exam-library"
    catalog = [p for p in read(data / "official-catalog.json") if p["group"] == args.group]
    years = sorted({p["date"][:4] for p in catalog}, reverse=True)[:2]
    catalog = [p for p in catalog if p["date"][:4] in years]
    ledger_path = args.ledger or root / f"docs/evidence/{args.group}-full-choice-review-ledger.json"
    ledger = read(ledger_path) if ledger_path.exists() else {}
    published = read(data / "choice-explanations.json")
    drafts, conflicts = candidates(root, published)
    packs = []
    for folder in (data / "source-packs", root / "docs/evidence/emkohyo-choice-sources",
                   root / "docs/evidence/emkohyo-2025-sources"):
        for path in folder.glob("**/*.json"):
            # Keep only source records, not audit summaries/hold indexes.
            value = read(path)
            if isinstance(value, dict) and ("sources" in value or "evidence" in value):
                packs.append({"path": str(path), "sha256": digest(value), "content": value})
    counts = Counter()
    groups = defaultdict(list)
    duplicates = defaultdict(list)
    missing_images = []
    static_holds = []
    for paper in catalog:
        for question in read(data / "papers" / (paper["id"] + ".json")):
            if question.get("answerAuthority") != "official" or question.get("choiceCount") != 5:
                continue
            qid = question["id"]
            counts["target"] += 1
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
            relevant = [p for p in packs if any(url and url in json.dumps(p["content"], ensure_ascii=False) for url in urls)]
            try:
                snapshot = source_snapshot(root, question, paper)
            except ValueError as exc:
                missing_images.append({"questionId": qid, "issue": str(exc)})
                counts["sourceHold"] += 1
                continue
            if receipt_current(ledger.get(qid, {}), snapshot, candidate, relevant):
                counts["fullReviewCurrent"] += 1
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
        return
    adapter_path = root / "scripts/complete-safety-choice-explanations.py"
    if not adapter_path.exists():
        adapter_path = Path(__file__).with_name("complete-safety-choice-explanations.py")
    spec = importlib.util.spec_from_file_location("safety_author_adapter", adapter_path)
    adapter = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(adapter)
    adapter.ROOT = root
    for batch in batches[:args.max_batches]:
        shared_evidence = {item["sha256"]: item for row in batch for item in row["evidence"]}
        payload = {"questions": [{k: v for k, v in row.items() if k != "evidence"}
                                 for row in batch], "sharedEvidence": list(shared_evidence.values())}
        prompt = ("独立レビュー。下記の全問・全5肢を政府一次資料と公式問題に照合しJSONのみ返す。"
                  "1問のサンプルから他問をPASSにしない。画像はローカルpublic配下のファイルをReadで見る。"
                  "各PDF/条項/出題時の適用を確認。元の正答との矛盾や未確認はHOLD。"
                  "キーは全question id。値はstatus(PASS/HOLD), issues(具体的理由の配列), "
                  "choiceChecks({1:PASS/HOLD,...,5:PASS/HOLD}), evidenceUrls(確認した政府URL配列), "
                  "officialAnswerChecked, originalTextChecked, imagesChecked, historicalApplicabilityChecked, "
                  "sourceSupportChecked(真偽値)。すべて確認した場合だけtrue。"
                  "根拠パックは探索の補助であり信頼せず原本を確認。ファイル編集禁止。\n"
                  + json.dumps(payload, ensure_ascii=False))
        token = digest(batch)[:16]
        # Existing CLI adapter fails closed on limit; no queued retries or paid fallback.
        review = adapter.call_claude(prompt, root / ".cache/safety-full-review" / token, args.model)
        if set(review) != {q["id"] for q in batch}:
            raise ValueError("Reviewer omitted or added IDs; no receipts accepted")
        for row in batch:
            ledger[row["id"]] = make_receipt(row["id"], row["snapshot"], row["candidate"],
                                             row["evidence"], review[row["id"]], args.model)
        write(ledger_path, ledger)
        print(json.dumps({"batch": token, "results": {row["id"]: ledger[row["id"]]["status"]
                                                       for row in batch}}, ensure_ascii=False), flush=True)


if __name__ == "__main__":
    main()
