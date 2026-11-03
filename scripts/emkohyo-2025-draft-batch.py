"""Create a private, unaccepted five-question choice-explanation candidate.

Usage: py -3.12 scripts/emkohyo-2025-draft-batch.py emkohyo-EM20251805 1 5
Candidates stay outside the public overlay until source-aware review.
"""

from hashlib import sha256
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys

from emkohyo_source_retrieval import retrieve


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/exam-library"
REVIEW = DATA / "emkohyo-review"
WINDOWS_CLI = Path.home() / "AppData/Roaming/npm/claude.cmd"
CLI = WINDOWS_CLI if WINDOWS_CLI.exists() else Path(shutil.which("claude") or "claude")
# Auxiliary background calls would add a second model to modelUsage.
CLI_ENV = {**os.environ, "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"}
MODEL_ID = "claude-opus-5-5"
MEASUREMENT = {"title": "厚生労働省 作業環境測定基準", "url": "https://www.mhlw.go.jp/web/t_doc?dataId=74087000"}
ORGANIC_METHOD = {"title": "厚生労働省 有機溶剤の測定技術に係る資料", "url": "https://www.mhlw.go.jp/shingi/2007/11/dl/s1101-11f.pdf"}
ORGANIC_CAS = {
    "酢酸メチル": "79-20-9", "メタノール": "67-56-1", "酢酸エチル": "141-78-6",
    "トルエン": "108-88-3", "テトラヒドロフラン": "109-99-9", "n-ヘキサン": "110-54-3",
    "シクロヘキサノン": "108-94-1", "シクロヘキサノール": "108-93-0",
    "2-ブタノール": "78-92-2", "イソプロピルアルコール": "67-63-0",
    "アセトン": "67-64-1", "二硫化炭素": "75-15-0", "エチルエーテル": "60-29-7",
    "N,N-ジメチルホルムアミド": "68-12-2",
}


def parse_result(stdout: str) -> tuple[object, str]:
    events = [json.loads(line) for line in stdout.splitlines() if line.startswith("{")]
    final = next((event for event in reversed(events) if event.get("type") == "result"), None)
    if final is None or final.get("is_error"):
        raise ValueError(f"No successful model response: {stdout[-1000:]}")
    models = [name for name in (final.get("modelUsage") or {}) if name.startswith("claude-")]
    if len(models) != 1 or not models[0].startswith(MODEL_ID):
        raise ValueError(f"Cannot prove the requested model from Claude modelUsage: {models}")
    resolved_model = models[0]
    if isinstance(final.get("structured_output"), dict):
        return final["structured_output"], resolved_model
    value = re.sub(r"^```(?:json)?\s*|\s*```$", "", final.get("result", "").strip(), flags=re.I)
    start, end = value.find("{"), value.rfind("}")
    if start < 0 or end < start:
        raise ValueError(f"No JSON object: {value[-1000:]}")
    return json.loads(value[start:end + 1]), resolved_model


def main() -> None:
    paper, first, last = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
    catalog = json.loads((DATA / "official-catalog.json").read_text(encoding="utf-8"))
    allowed = {item["id"]: item for item in catalog if item["group"] == "emkohyo"
               and item["date"][:4] in {"2025", "2026"}}
    if paper not in allowed or last - first != 4:
        raise ValueError("Use a 2025/2026 EM paper and exactly five question numbers")
    rows = json.loads((DATA / "papers" / f"{paper}.json").read_text(encoding="utf-8"))
    narratives = json.loads((DATA / "explanations.json").read_text(encoding="utf-8"))
    selected = [row for row in rows if first <= row["number"] <= last]
    if len(selected) != 5 or any(row["answerAuthority"] != "official" or row["choiceCount"] != 5 for row in selected):
        raise ValueError("Not five official five-choice questions")
    subject = allowed[paper]["subject"]
    subject_pack_file = ROOT / "docs/evidence/emkohyo-choice-sources/subject-packs" / f"{subject}.json"
    subject_pack = json.loads(subject_pack_file.read_text(encoding="utf-8"))
    sources = [{"title": source["title"], "url": source["url"]} for source in subject_pack["sources"]]
    supplemental = []
    if paper == "emkohyo-EM20251805":
        sds_pack_file = ROOT / "docs/evidence/emkohyo-2025-sources/EM20251805-q01-03.json"
        sds_pack = json.loads(sds_pack_file.read_text(encoding="utf-8"))
        for name, cas in ORGANIC_CAS.items():
            if any(name in row["text"] for row in selected):
                url = f"https://anzeninfo.mhlw.go.jp/anzen/gmsds/{cas}.html"
                source = next((item for item in sds_pack["governmentSds"] if item["url"] == url), None)
                if source:
                    sources.append({"title": source["title"], "url": url})
                    supplemental.append(source)
    request_items = [
        {"id": row["id"], "text": row["text"], "correctChoice": row["correctChoice"],
         "sourceHash": sha256(row["text"].encode("utf-8")).hexdigest(),
         "existingExplanation": narratives.get(row["id"], "")}
        for row in selected
    ]
    retrieved = retrieve(subject, request_items, per_question=5)
    if retrieved["missingCachedSources"]:
        raise ValueError(f"Build the pinned source cache first: {retrieved['missingCachedSources']}")
    arithmetic = []
    selected_ids = {item["id"] for item in request_items}
    evidence_dir = ROOT / "docs/evidence/emkohyo-choice-sources"
    for filename in ("EM20251805-q18-19-arithmetic-20260924.json",
                     "EM-calculation-spotchecks-20260924.json",
                     "EM2025-calculation-spotchecks-20260924.json",
                     "EM2025-radiation-arithmetic-20260924.json",
                     "EM2026-radiation-arithmetic-20260924.json",
                     "EM2026-simple-calculation-spotchecks-20260924.json",
                     "EM-dust-calculation-spotchecks-20260924.json"):
        evidence = json.loads((evidence_dir / filename).read_text(encoding="utf-8"))
        records = evidence["questions"]
        if isinstance(records, dict):
            records = [{"id": f"{evidence['paperId']}-q{number}",
                        "formula": evidence["formula"], **item}
                       for number, item in records.items()]
        arithmetic.extend({"id": item["id"], "formula": item["formula"],
                           "value": item.get("value", item.get("ppm")),
                           "unit": item.get("unit", "ppm"),
                           "officialChoice": item["officialChoice"],
                           "rowTextSha256": item["rowTextSha256"]}
                          for item in records if item["id"] in selected_ids)
    web = "--web" in sys.argv[4:]
    prompt = (
        "第一種作業環境測定士の公式5択問題について、問題原文と既存解説を根拠に、選択肢1〜5それぞれの正誤理由を作る。"
        "公式正答番号は必ず維持するが、既存解説の誤りや根拠不足は鵜呑みにしない。"
        "verdictはクイズで選んだときの採点を表す。正答番号だけcorrect、他4肢はincorrect。"
        "『誤っているものを選べ』なら、文自体が正しい4肢はverdict=incorrectにし、reasonに文の正しさを説明する。"
        "各肢の具体的理由は55文字以上。選択肢固有の条件・数値・用語を用い、5肢同じ定型文にしない。"
        + ("既存packで不足する論点だけWebSearch/WebFetchで.go.jp一次資料を補う。" if web
           else "添付の取得hash付き設問別一次資料抜粋を使う。不足する論点はreviewIssuesへ明記し、検索が必要と記す。")
        + "URLが実在しても本文を読んでいなければ確認済みとはしない。"
        "sourcesには下記候補または検索で発見した、実際にその設問の判断を支える政府ページだけを入れる。"
        "候補がない・内容を確認できない場合は無関係URLを飾りで入れずreviewIssuesで不足を明記する。"
        "各問題のsourceEvidenceは[{url,excerpt,choiceNumbers}]配列とし、採用URLごとの正確な原文抜粋（40字以内）と、"
        "それが支持する肢番号を配列で記す。少なくとも正答理由を直接支える抜粋を必須にする。"
        "掲載本文を直接確認できないURLはsourceEvidenceに含めず、reviewIssuesへ保留理由を記す。"
        "設問が組合せ表なら原文の各行と欄の対応を崩さない。計算なら全選択肢を独立検算する。"
        "架空の法律条項・物性値・測定手順を捏造しない。"
        "JSONオブジェクトのみ。キーは問題ID。各値はoverlay,sourceEvidence,reviewIssuesを持つ。"
        "overlayは sourceHash,correctChoice,summary(20字以上),choices(番号1〜5, verdict correct/incorrect, reason),"
        "sources(タイトル,url) の構造。reviewIssuesは配列。"
    )
    payload = (prompt + "\n問題: " + json.dumps(request_items, ensure_ascii=False)
               + "\n政府資料候補: " + json.dumps(sources, ensure_ascii=False)
               + "\n設問別一次資料抜粋: " + json.dumps(retrieved, ensure_ascii=False)
               + "\n物質別SDS: " + json.dumps(supplemental, ensure_ascii=False)
               + "\n独立計算の参考資料（算術のみ検証済み。各肢理由の承認ではない）: "
               + json.dumps(arithmetic, ensure_ascii=False))
    ids = [item["id"] for item in request_items]
    schema = {"type": "object", "properties": {id_: {"type": "object"} for id_ in ids},
              "required": ids, "additionalProperties": False}
    process = subprocess.run(
        [str(CLI), "-p", "--model", MODEL_ID, "--effort", "high", "--input-format", "stream-json",
         "--output-format", "stream-json", "--verbose", "--json-schema", json.dumps(schema),
         "--tools", "WebSearch,WebFetch" if web else ""],
        input=json.dumps({"type": "user", "message": {"role": "user", "content": [{"type": "text", "text": payload}]}},
                         ensure_ascii=False) + "\n",
        text=True, encoding="utf-8", capture_output=True, cwd=ROOT, env=CLI_ENV, timeout=900,
    )
    if process.returncode:
        raise RuntimeError((process.stderr or process.stdout)[-1000:])
    result, resolved_model = parse_result(process.stdout)
    if not isinstance(result, dict) or set(result) != {x["id"] for x in selected}:
        raise ValueError("Model omitted or added question IDs")
    REVIEW.mkdir(parents=True, exist_ok=True)
    out = REVIEW / f"{paper}-q{first:02}-{last:02}-draft.json"
    if out.exists():
        raise FileExistsError(out)
    out.write_text(json.dumps({"candidateModel": resolved_model, "requestedModel": MODEL_ID,
                               "paperId": paper,
                               "governmentSourceCandidates": sources,
                               "retrievedEvidence": retrieved, "questions": result},
                              ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{out}: drafted {len(result)}, issues {sum(bool(x.get('reviewIssues')) for x in result.values())}")


if __name__ == "__main__":
    main()
