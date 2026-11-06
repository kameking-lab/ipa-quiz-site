"""Build data/qualification-staging/caremanager/{2024,2025}.json and its manifest/answers/audit files.

Inputs (this folder):
- r7-transcription.json / r6-transcription.json : 第28回・第27回 60問の転記（スキャン画像から転記し、全問を画像と再照合）
- explanations-r7.json / explanations-r6.json   : 独自の全肢解説（別エージェントの独立レビュー PASS 後、FIX反映済み）
公式正答は transcription の officialAnswer（東京都PNG・山梨県PDFの正答番号表と、作業者が画像を見て独立に読んだ値で二重照合済み）。
"""
from __future__ import annotations

import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
OUT = ROOT / "data/qualification-staging/caremanager"

SITTINGS = {
    "r7": {
        "year": 2025, "round": 28, "examDate": "2025-10-12", "lawAsOf": "2025-10-12",
        "publisher": "東京都福祉局",
        "indexUrl": "https://www.fukushi.metro.tokyo.lg.jp/kourei/shikaku/r7_seitoukijyun",
        "questionUrl": "https://www.fukushi.metro.tokyo.lg.jp/documents/d/fukushi/r7shikenmondai",
        "answerUrls": [
            "https://www.fukushi.metro.tokyo.lg.jp/documents/d/fukushi/r7seitoubangou1-25",
            "https://www.fukushi.metro.tokyo.lg.jp/documents/d/fukushi/r7seitoubangou26-60",
        ],
        "files": [
            ("r7shikenmondai.pdf", "https://www.fukushi.metro.tokyo.lg.jp/documents/d/fukushi/r7shikenmondai", "892f293a94ed6f2cf69c39b3361b5640af22832aba7e4364bfbff7a3bcd8ecfe", "question"),
            ("r7seitoubangou1-25.png", "https://www.fukushi.metro.tokyo.lg.jp/documents/d/fukushi/r7seitoubangou1-25", "7b6fe46899e160b018fb075b946f1295477399a8d9f5f2100a8b4e57cbe1f98f", "answer"),
            ("r7seitoubangou26-60.png", "https://www.fukushi.metro.tokyo.lg.jp/documents/d/fukushi/r7seitoubangou26-60", "325669e0ff256e3bbdb2ce41c81eb8845522a640f9d8d604804725534a80f7ee", "answer"),
        ],
    },
    "r6": {
        "year": 2024, "round": 27, "examDate": "2024-10-13", "lawAsOf": "2024-10-13",
        "publisher": "山梨県",
        "indexUrl": "https://www.pref.yamanashi.jp/chouju/keamane/jukousiken/r06gouhitou.html",
        "questionUrl": "https://www.pref.yamanashi.jp/documents/118362/02_r06sikenmondai.pdf",
        "answerUrls": ["https://www.pref.yamanashi.jp/documents/118362/03_r06seitoubangou.pdf"],
        "files": [
            ("02_r06sikenmondai.pdf", "https://www.pref.yamanashi.jp/documents/118362/02_r06sikenmondai.pdf", "8484f2f49b073c7794e3357fdf841ae6199a507368f17748704c5d0ae0f8ede4", "question"),
            ("03_r06seitoubangou.pdf", "https://www.pref.yamanashi.jp/documents/118362/03_r06seitoubangou.pdf", "5a507999f7718684d74443fb53048075ee8153c1928bff39aaba09ea783c363a", "answer"),
        ],
    },
}

# 作業者が公式正答画像を目視で独立に読み取った値（transcription と全60問一致を確認）。
INDEPENDENT_KEYS = {
    "r7": "34 123 234 345 235 123 45 124 234 25 124 25 135 134 124 12 123 125 123 234 123 135 123 23 135 "
          "123 145 134 345 12 123 135 124 145 123 234 235 345 235 45 123 124 145 135 245 "
          "235 135 125 245 125 124 15 234 234 125 124 13 125 14 13",
    "r6": "234 34 23 24 13 124 135 145 15 124 235 134 234 45 25 13 125 13 123 125 145 145 134 24 235 "
          "124 123 145 125 135 135 135 124 134 134 125 123 245 34 234 123 25 15 135 234 "
          "234 134 135 234 235 245 134 345 125 13 135 245 145 235 234",
}

CHOICE_KEYS = ["1", "2", "3", "4", "5"]


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    manifest_files = []
    answers_out = {}
    total = 0
    for tag, meta in SITTINGS.items():
        t = json.loads((HERE / f"{tag}-transcription.json").read_text(encoding="utf-8"))
        ex = json.loads((HERE / f"explanations-{tag}.json").read_text(encoding="utf-8"))
        assert ex["reviewStatus"].startswith("INDEPENDENT_REVIEW_PASS")
        keys = INDEPENDENT_KEYS[tag].split()
        assert t["round"] == meta["round"] and len(t["questions"]) == 60 and len(keys) == 60
        records = []
        for q in t["questions"]:
            n = q["number"]
            ans = q["officialAnswer"]
            assert "".join(map(str, ans)) == keys[n - 1], (tag, n)
            assert len(q["choices"]) == 5 and q["requiredSelections"] == len(ans), (tag, n)
            assert f"{len(ans)}つ選べ" in q["stem"], (tag, n)
            e = ex["questions"][str(n)]
            for i, text in enumerate(e["choiceExplanations"]):
                assert text.startswith("正しい。" if i + 1 in ans else "誤り。"), (tag, n, i)
            sub = q.get("subsection") or next(
                (s["name"] for sec in t["sections"] for s in sec.get("subsections", []) if s["from"] <= n <= s["to"]),
                None,
            )
            category = sub or q["section"]
            records.append({
                "id": f"caremanager-{meta['year']}-q{n}",
                "slug": "caremanager",
                "year": meta["year"],
                "round": meta["round"],
                "examDate": meta["examDate"],
                "qNumber": n,
                "publicationStatus": "staging",
                "lawAsOf": meta["lawAsOf"],
                "section": q["section"],
                "category": category,
                "topicTags": e.get("topicTags", []),
                "question": q["stem"],
                "choices": dict(zip(CHOICE_KEYS, q["choices"])),
                "requiredSelections": len(ans),
                "officialAnswerNumbers": ans,
                "scoring": "select-all-required",
                "summary": e["summary"],
                "choiceExplanations": dict(zip(CHOICE_KEYS, e["choiceExplanations"])),
                "lawSensitive": bool(e.get("lawSensitive")),
                "primarySources": e.get("primarySources", []),
                "hasImage": False,
                "sourcePdfUrl": meta["questionUrl"],
                "sourceAnswerUrls": meta["answerUrls"],
                "sourcePage": q["pdfPage"],
                "sourceAttribution": f"出典：第{meta['round']}回介護支援専門員実務研修受講試験 問題{n}（{meta['publisher']}掲載）。解説は過去問AIの独自作成です。",
            })
        total += len(records)
        (OUT / f"{meta['year']}.json").write_text(json.dumps(records, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
        answers_out[str(meta["year"])] = {
            "round": meta["round"],
            "answerUrls": meta["answerUrls"],
            "answers": {str(q["number"]): q["officialAnswer"] for q in t["questions"]},
            "notes": "公式正答番号表に没問・全員正解等の注記なし。",
        }
        for filename, url, sha, kind in meta["files"]:
            manifest_files.append({"filename": filename, "url": url, "sha256": sha, "year": meta["year"], "round": meta["round"], "kind": kind})

    manifest = {
        "slug": "caremanager",
        "name": "介護支援専門員実務研修受講試験",
        "shortName": "ケアマネ",
        "publicationStatus": "staging",
        "publishable": False,
        "ownerRightsDecision": "2026-11-04: 権利の文言では止めない（オーナー決定）。転載条件の文言は報告に記録するだけ。",
        "checkedAt": "2026-11-06",
        "expectedQuestions": 120,
        "questionCount": total,
        "nationalCommonQuestions": True,
        "note": "全国共通問題。都道府県（東京都・山梨県）が掲載した公式PDF・正答表を出典にする。表示名に都道府県名は付けない。",
        "sittings": [
            {"year": m["year"], "round": m["round"], "examDate": m["examDate"], "publisher": m["publisher"], "indexUrl": m["indexUrl"]}
            for m in SITTINGS.values()
        ],
        "files": manifest_files,
    }
    (OUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (OUT / "official-answers.json").write_text(json.dumps(answers_out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    audit = {
        "slug": "caremanager",
        "checkedAt": "2026-11-06",
        "retrievedAt": "2026-11-06T22:38:43+09:00",
        "sources": [dict(f, sha256Verified=True) for f in manifest_files],
        "transcription": "問題PDFはスキャン画像（テキスト層なし）。150〜500dpiのページ画像から転記し、全60問×2回を画像と再照合。別エージェントの独立レビューで各回14〜18問を抜き取り照合し誤りなし。",
        "answers": "公式正答番号表（東京都PNG2枚・山梨県PDF1枚）から転記し、作業者が画像を見て独立に読み取った値と120問すべて一致。「Nつ選べ」の数と正答数も全問一致。",
        "explanations": "全600肢を独自作成。別エージェントの独立レビュー（一次資料照合）で 第28回 PASS57/FIX3、第27回 PASS56/FIX4、HOLD0。FIXはすべて反映済み。",
        "excluded": [],
        "notYetAvailable": "第29回（2026-10-11実施）は正答が合格発表（2026-11-24予定）まで未公表のため未収録。",
    }
    (OUT / "source-audit.json").write_text(json.dumps(audit, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {total} questions")


if __name__ == "__main__":
    main()
