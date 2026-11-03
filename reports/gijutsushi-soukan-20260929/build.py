"""技術士第二次試験 総合技術監理部門 択一式（Ⅰ－1）令和7・8年度の取り込み。

Usage (py -3.12, from the repository root):
  reports/gijutsushi-soukan-20260929/build.py source    # passA + 裁定 -> source-transcription.json
  reports/gijutsushi-soukan-20260929/build.py batches   # explanations/<round>/batchN.json (10問ずつ)
  reports/gijutsushi-soukan-20260929/build.py data      # data/questions/soukan/<year>-annual.json

転記は passA・passB（独立の2回転記、別解像度）と passC（原本との1字照合）の3系統。
passA と passB の差分は transcription/diff-report.json、裁定は ADJUDICATION に記録する。
表示用の整形（図の文章化・規格番号の空白）は DISPLAY_EDITS に限定し、文言は変えない。
"""
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
KEYS = ["ア", "イ", "ウ", "エ", "オ"]

ROUNDS = {
    "R08": {
        "year": 2026, "label": "令和8年度", "lawReferenceDate": "2026-04-01",
        "lawReferenceDateJa": "令和8（2026）年4月1日",
        "pdf": "https://www.engineer.or.jp/c_topics/011/attached/attach_11991_1.pdf",
        "answer": "https://www.engineer.or.jp/c_topics/003/attached/attach_3935_2.pdf",
    },
    "R07": {
        "year": 2025, "label": "令和7年度", "lawReferenceDate": "2025-04-01",
        "lawReferenceDateJa": "令和7（2025）年4月1日",
        "pdf": "https://www.engineer.or.jp/c_topics/011/attached/attach_11181_1.pdf",
        "answer": "https://www.engineer.or.jp/c_topics/003/attached/attach_3935_3.pdf",
    },
}
INDEX_URL = "https://www.engineer.or.jp/c_categories/index02022241.html"
ANSWER_INDEX_URL = "https://www.engineer.or.jp/c_topics/003/003935.html"
EXAM = "技術士第二次試験 総合技術監理部門 必須科目Ⅰ－1（択一式）"

# passA と passB が食い違った箇所の裁定（原本PDFを400dpiで切り出して確認）。
ADJUDICATION = [
    {"round": "R07", "number": 16, "field": "choice3", "from": "ほど、", "to": "ほど，",
     "basis": "400dpi 切り出しで全角コンマ。passB と一致"},
    {"round": "R08", "number": 31, "field": "stem", "from": "［　］", "to": "［　　］", "all": True,
     "basis": "空欄枠の表記を統一（R08 問6と同じ）"},
    {"round": "R08", "number": 40, "field": "stem", "from": "［　］", "to": "［　　］", "all": True,
     "basis": "空欄枠の表記を統一（R08 問6と同じ）"},
    {"round": "R08", "number": 37, "field": "stem", "from": "—", "to": "―", "all": True,
     "basis": "原本は全角幅のダッシュ。法令表記に合わせ U+2015"},
]
# R07 問33 の「CO₂」（passB）は仕様どおり半角 2（passA）を採る。R08 問6 の空欄枠は passA の「［　　］」を採る。

LADDER = (
    "\n\n図「住民参加の梯子」（原図の各段を表に書き直したもの）\n\n"
    "| 段 | 名称 | 区分 |\n| --- | --- | --- |\n"
    "| 8 | 住民直接管理 | 住民パワーの行使 |\n| 7 | （ア） | 住民パワーの行使 |\n| 6 | （イ） | 住民パワーの行使 |\n"
    "| 5 | 懐柔 | 形式だけの参加 |\n| 4 | （ウ） | 形式だけの参加 |\n| 3 | （エ） | 形式だけの参加 |\n"
    "| 2 | （オ） | 非参加 |\n| 1 | 世論操作 | 非参加 |"
)
DISPLAY_EDITS = {
    ("R07", 19): [("表各機種の", "表　各機種の")],
    ("R07", 20): [("ISO／IEC27001", "ISO／IEC 27001"), ("JISQ27001", "JIS Q 27001"), ("ISO／IEC15408", "ISO／IEC 15408")],
    ("R08", 17): [("__APPEND__", LADDER)],
    ("R08", 25): [("__APPEND__",
                   "\n\n（原図：縦軸が稼働台数、横軸が年数。稼働台数は生産開始の0台から生産終了（y1年後）のn台まで直線的に増え、"
                   "生産終了から現在（その y2年後）まではn台で一定。）")],
}


def load(p):
    return json.loads(Path(p).read_text(encoding="utf-8"))


def dump(p, obj):
    Path(p).parent.mkdir(parents=True, exist_ok=True)
    Path(p).write_text(json.dumps(obj, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")


def read_pass(name):
    out, pre = {}, {}
    for f in sorted((HERE / "transcription" / name).glob("R0*.json")):
        d = load(f)
        if d.get("preamble"):
            pre[d["year"]] = d["preamble"]
        for q in d["questions"]:
            out.setdefault(d["year"], {})[q["number"]] = q
    return out, pre


def cmd_source():
    qa, pre = read_pass("passA")
    for adj in ADJUDICATION:
        q = qa[adj["round"]][adj["number"]]
        field = adj["field"]
        if field == "stem":
            assert adj["from"] in q["stem"], adj
            q["stem"] = q["stem"].replace(adj["from"], adj["to"])
        else:
            i = int(field.removeprefix("choice")) - 1
            assert adj["from"] in q["choices"][i], adj
            q["choices"][i] = q["choices"][i].replace(adj["from"], adj["to"])
    keys = load(HERE / "answer-keys.json")
    rounds = {}
    for r, meta in ROUNDS.items():
        nums = sorted(qa[r])
        assert nums == list(range(1, 41)), (r, nums)
        rounds[r] = {**meta, "preamble": pre[r], "questions": [
            {**{k: qa[r][n][k] for k in ("number", "pages", "stem", "choiceHeaders", "choices", "hasFigure", "figureNote")},
             "officialAnswer": int(keys[r][str(n)])} for n in nums]}
    dump(HERE / "source-transcription.json", {
        "exam": EXAM, "indexUrl": INDEX_URL, "answerIndexUrl": ANSWER_INDEX_URL,
        "method": "passA/passB 独立転記（150dpi/200dpi）→機械差分→原本切り出しで裁定→passC 1字照合（指摘0件）",
        "adjudication": ADJUDICATION, "rounds": rounds})
    dump(HERE / "display-edits.json", [{"round": r, "number": n, "from": a, "to": b}
                                       for (r, n), edits in DISPLAY_EDITS.items() for a, b in edits])
    print("source-transcription.json", {r: len(v["questions"]) for r, v in rounds.items()})


def render(r, q):
    stem, raw = q["stem"], list(q["choices"])
    for old, new in DISPLAY_EDITS.get((r, q["number"]), []):
        if old == "__APPEND__":
            stem += new
            continue
        hit = old in stem or any(old in c for c in raw)
        assert hit, (r, q["number"], old)
        stem = stem.replace(old, new)
        raw = [c.replace(old, new) for c in raw]
    heads = q["choiceHeaders"]
    choices = []
    for c in raw:
        if heads:
            cells = c.split(" ")
            assert len(cells) == len(heads), (r, q["number"], c)
            c = "／".join(f"{h}：{v}" for h, v in zip(heads, cells))
        choices.append(c)
    return stem, choices


def cmd_batches():
    src = load(HERE / "source-transcription.json")
    for r, meta in src["rounds"].items():
        qs = meta["questions"]
        for b in range(4):
            part = qs[b * 10:(b + 1) * 10]
            batch = {"exam": EXAM, "round": f"{meta['label']}技術士第二次試験", "preamble": meta["preamble"],
                     "lawReferenceDateJa": meta["lawReferenceDateJa"], "questions": []}
            for q in part:
                stem, choices = render(r, q)
                batch["questions"].append({"number": q["number"], "question": stem,
                                           "choices": {str(i + 1): c for i, c in enumerate(choices)},
                                           "officialAnswer": q["officialAnswer"]})
            dump(HERE / "explanations" / r / f"batch{b + 1}.json", batch)
    print("batches written")


def lawNotice(meta):
    return f"\n\n※問題冊子が示す基準日（{meta['lawReferenceDateJa']}）時点の法令・制度・指針に基づく解説です。その後の改正・改訂に注意してください。"


def cmd_data():
    src = load(HERE / "source-transcription.json")
    today = "2026-09-29"
    for r, meta in src["rounds"].items():
        final = load(HERE / "explanations" / f"{r}-final.json")
        out, withheld = [], []
        for q in meta["questions"]:
            n = str(q["number"])
            if n not in final["explanations"]:
                withheld.append({"number": q["number"], "reason": final["held"].get(n, "査読PASSなし")})
                continue
            e = final["explanations"][n]
            stem, choices = render(r, q)
            ans = KEYS[q["officialAnswer"] - 1]
            label = f"Ⅰ－1－{q['number']}"
            item = {
                "id": f"soukan-{meta['year']}-annual-gakka-q{q['number']}",
                "exam": "soukan", "session": "gakka", "year": meta["year"], "season": "annual",
                "qNumber": q["number"], "subject": "必須科目Ⅰ－1（択一式）",
                "officialAnswerNumber": str(q["officialAnswer"]),
                "type": "multiple-choice", "category": e["category"],
                "topicTags": [e["category"], f"{meta['label']}"],
                "difficulty": 3, "question": stem,
                "choices": {KEYS[i]: c for i, c in enumerate(choices)},
                "answer": ans, "explanation": e["summary"] + (lawNotice(meta) if e["lawSensitive"] else ""),
                "choiceExplanations": {KEYS[i]: t for i, t in enumerate(e["choiceExplanations"])},
                "explanationCoverage": "full", "hasImage": False,
                "sourcePdfUrl": meta["pdf"], "sourceAnswerUrl": meta["answer"],
                "sourceAttribution": (f"出典：公益社団法人日本技術士会 {meta['label']}技術士第二次試験 総合技術監理部門 "
                                      f"必須科目 択一式 {label}（問題・正答）。解説は過去問AIの独自作成で、日本技術士会とは関係ありません。"),
                "officialReferenceUrls": [INDEX_URL, ANSWER_INDEX_URL],
                "license": "IPEJ-attributed", "needsReview": False,
                "lastUpdated": today, "lawReferenceDate": meta["lawReferenceDate"],
            }
            out.append(item)
        dump(ROOT / "data" / "questions" / "soukan" / f"{meta['year']}-annual.json", out)
        dump(HERE / f"withheld-{r}.json", withheld)
        print(r, len(out), "published", len(withheld), "withheld", [w["number"] for w in withheld])


if __name__ == "__main__":
    {"source": cmd_source, "batches": cmd_batches, "data": cmd_data}[sys.argv[1]]()
