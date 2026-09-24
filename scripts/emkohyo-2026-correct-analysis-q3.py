"""Pin the functional-group comparison to five Japanese government records."""

import json
from pathlib import Path


root = Path(__file__).resolve().parents[1]
file = root / "data/exam-library/emkohyo-review/emkohyo-EM20261804-q01-05-draft.json"
draft = json.loads(file.read_text(encoding="utf-8"))
question = draft["questions"]["emkohyo-EM20261804-q3"]
sources = [
    (1, "https://anzeninfo.mhlw.go.jp/anzen/gmsds/62-53-3.html",
     "厚生労働省 職場のあんぜんサイト アニリンSDS", "アミノベンゼン フェニルアミン ベンゼンアミン"),
    (2, "https://anzeninfo.mhlw.go.jp/anzen/gmsds/75-05-8.html",
     "厚生労働省 職場のあんぜんサイト アセトニトリルSDS", "シアノメタン エタンニトリル メチルシアニド"),
    (3, "https://anzeninfo.mhlw.go.jp/anzen/gmsds/108-88-3.html",
     "厚生労働省 職場のあんぜんサイト トルエンSDS", "1-メチルベンゼン、メチルベンゼン"),
    (4, "https://anzeninfo.mhlw.go.jp/anzen/gmsds/67-64-1.html",
     "厚生労働省 職場のあんぜんサイト アセトンSDS", "ジメチルケトン （Dimethyl ketone)"),
    (5, "https://www.env.go.jp/content/000164284.pdf",
     "環境省 資源循環分野報告書 p.99", "ジエチルエーテル（C2H5OC2H5）"),
]
question["overlay"]["sources"] = [{"title": title, "url": url} for _, url, title, _ in sources]
question["sourceEvidence"] = [
    {"url": url, "excerpt": excerpt, "choiceNumbers": [number]}
    for number, url, _, excerpt in sources
]
question["reviewIssues"] = ["政府資料抜粋は照合中。独立Opus審査まで公開保留。"]
file.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
