"""Create a private, unaccepted five-question choice-explanation candidate.

Usage: py -3.12 scripts/emkohyo-2025-draft-batch.py emkohyo-EM20251805 1 5
Candidates stay outside the public overlay until source-aware review.
"""

from hashlib import sha256
import json
from pathlib import Path
import re
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/exam-library"
REVIEW = DATA / "emkohyo-review"
CLI = Path.home() / "AppData/Roaming/npm/claude.cmd"
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


def parse_result(stdout: str) -> object:
    events = [json.loads(line) for line in stdout.splitlines() if line.startswith("{")]
    final = next((event for event in reversed(events) if event.get("type") == "result"), None)
    if final is None or final.get("is_error"):
        raise ValueError(f"No successful model response: {stdout[-1000:]}")
    value = re.sub(r"^```(?:json)?\s*|\s*```$", "", final.get("result", "").strip(), flags=re.I)
    start, end = value.find("{"), value.rfind("}")
    if start < 0 or end < start:
        raise ValueError(f"No JSON object: {value[-1000:]}")
    return json.loads(value[start:end + 1])


def main() -> None:
    paper, first, last = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
    catalog = json.loads((DATA / "official-catalog.json").read_text(encoding="utf-8"))
    allowed = {item["id"] for item in catalog if item["group"] == "emkohyo"
               and item["date"][:4] in {"2025", "2026"}}
    if paper not in allowed or last - first != 4:
        raise ValueError("Use a 2025/2026 EM paper and exactly five question numbers")
    rows = json.loads((DATA / "papers" / f"{paper}.json").read_text(encoding="utf-8"))
    narratives = json.loads((DATA / "explanations.json").read_text(encoding="utf-8"))
    selected = [row for row in rows if first <= row["number"] <= last]
    if len(selected) != 5 or any(row["answerAuthority"] != "official" or row["choiceCount"] != 5 for row in selected):
        raise ValueError("Not five official five-choice questions")
    sources = [MEASUREMENT]
    if paper == "emkohyo-EM20251805":
        sources.append(ORGANIC_METHOD)
        for name, cas in ORGANIC_CAS.items():
            if any(name in row["text"] for row in selected):
                sources.append({"title": f"厚生労働省 モデルSDS {name}",
                                "url": f"https://anzeninfo.mhlw.go.jp/anzen/gmsds/{cas}.html"})
    request_items = [
        {"id": row["id"], "text": row["text"], "correctChoice": row["correctChoice"],
         "sourceHash": sha256(row["text"].encode("utf-8")).hexdigest(),
         "existingExplanation": narratives.get(row["id"], "")}
        for row in selected
    ]
    prompt = (
        "第一種作業環境測定士の公式5択問題について、問題原文と既存解説を根拠に、選択肢1〜5それぞれの正誤理由を作る。"
        "公式正答番号は必ず維持するが、既存解説の誤りや根拠不足は鵜呑みにしない。"
        "各肢の具体的理由は55文字以上。選択肢固有の条件・数値・用語を用い、5肢同じ定型文にしない。"
        "WebSearch/WebFetchで厚労省・e-Gov・環境省・原子力規制委員会など.go.jpの一次資料を調べ、"
        "具体的な判断根拠を確認する。URLが実在しても本文を読んでいなければ確認済みとはしない。"
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
    payload = prompt + "\n問題: " + json.dumps(request_items, ensure_ascii=False) + "\n政府資料候補: " + json.dumps(sources, ensure_ascii=False)
    process = subprocess.run(
        [str(CLI), "-p", "--model", "opus", "--effort", "high", "--input-format", "stream-json",
         "--output-format", "stream-json", "--verbose", "--tools", "WebSearch,WebFetch"],
        input=json.dumps({"type": "user", "message": {"role": "user", "content": [{"type": "text", "text": payload}]}},
                         ensure_ascii=False) + "\n",
        text=True, encoding="utf-8", capture_output=True, cwd=ROOT, timeout=900,
    )
    if process.returncode:
        raise RuntimeError((process.stderr or process.stdout)[-1000:])
    result = parse_result(process.stdout)
    if not isinstance(result, dict) or set(result) != {x["id"] for x in selected}:
        raise ValueError("Model omitted or added question IDs")
    REVIEW.mkdir(parents=True, exist_ok=True)
    out = REVIEW / f"{paper}-q{first:02}-{last:02}-draft.json"
    if out.exists():
        raise FileExistsError(out)
    out.write_text(json.dumps({"candidateModel": "claude-opus-5-5", "paperId": paper,
                               "governmentSourceCandidates": sources, "questions": result},
                              ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{out}: drafted {len(result)}, issues {sum(bool(x.get('reviewIssues')) for x in result.values())}")


if __name__ == "__main__":
    main()
