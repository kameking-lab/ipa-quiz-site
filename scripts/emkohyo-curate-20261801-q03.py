"""Add direct government glossary excerpts to 2026 general Q3."""

import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
path = root / "data/exam-library/emkohyo-review/emkohyo-EM20261801-q01-05-draft.json"
data = json.loads(path.read_text(encoding="utf-8"))
item = data["questions"]["emkohyo-EM20261801-q3"]
overlay = item["overlay"]
overlay["choices"][0]["reason"] = (
    "正しい記述。食品安全委員会は、閾値のない遺伝毒性発がん物質などで、生涯摂取したときのリスクが"
    "許容できる低い水準となるばく露量を実質安全量と説明する。発がんリスクを低く抑える目安として使うため、本肢は定義と一致する。"
)
overlay["choices"][2]["reason"] = (
    "正しい記述。LOELは影響が認められた最低量、NOELは影響が認められなかった最高量を示す。"
    "厚生労働省は慢性毒性試験で毒性影響が現れる量と現れない量を明らかにすると説明しており、"
    "両指標は慢性毒性の評価にも使える。ただし慢性毒性試験だけに限定される名称ではない。"
)
overlay["choices"][3]["reason"] = (
    "正しい記述。厚生労働省の用語解説は生殖毒性を、性的機能・妊孕性と児の発生・発達への有害影響として説明する。"
    "本肢の『性機能及び生殖能』と『子の発生』はそれぞれこの内容に対応するため、誤りではない。"
)
overlay["choices"][4]["reason"] = (
    "正しい記述。厚生労働省は変異原性を遺伝子に突然変異を起こす性質と説明し、"
    "発がん性の予測に使う試験として、ネズミチフス菌や大腸菌による復帰突然変異試験を挙げる。"
    "したがって細菌を使う変異原性試験が発がん性のスクリーニングに使われるという本肢は妥当である。"
)
overlay["sources"] = [
    {"title": "厚生労働省 職場のあんぜんサイト・有害性GHS関係用語解説", "url": "https://anzeninfo.mhlw.go.jp/user/anzen/kag/kag_yogo.html"},
    {"title": "食品安全委員会 用語集・毒性及び毒性試験", "url": "https://www.fsc.go.jp/yougoshu/kensaku_dokusei.html"},
    {"title": "厚生労働省 化学物質の審査及び規制の在り方・参考資料", "url": "https://www.mhlw.go.jp/shingi/2002/12/s1219-5c.html"},
]
item["sourceEvidence"] = [
    {"url": "https://www.fsc.go.jp/yougoshu/kensaku_dokusei.html", "excerpt": "閾値が存在しない遺伝毒性発がん物質等の毒性に対し、生涯にわたり摂取した場合のリスクが、許容できるレベルとなるようなばく露量", "choiceNumbers": [1]},
    {"url": "https://anzeninfo.mhlw.go.jp/user/anzen/kag/kag_yogo.html", "excerpt": "1回の投与で1群の実験動物の50％を死亡させると予想される投与量", "choiceNumbers": [2]},
    {"url": "https://anzeninfo.mhlw.go.jp/user/anzen/kag/kag_yogo.html", "excerpt": "毒性試験において何らかの影響が認められた最低のばく露量", "choiceNumbers": [3]},
    {"url": "https://anzeninfo.mhlw.go.jp/user/anzen/kag/kag_yogo.html", "excerpt": "毒性試験において影響が認められなかった最高のばく露量", "choiceNumbers": [3]},
    {"url": "https://anzeninfo.mhlw.go.jp/user/anzen/kag/kag_yogo.html", "excerpt": "被験物質を実験動物に長期間（化学物質の場合には12ヶ月以上）反復して投与", "choiceNumbers": [3]},
    {"url": "https://anzeninfo.mhlw.go.jp/user/anzen/kag/kag_yogo.html", "excerpt": "性的機能と妊孕性（妊娠能力）（sexual function and fertility）及び児の発生・発達", "choiceNumbers": [4]},
    {"url": "https://anzeninfo.mhlw.go.jp/user/anzen/kag/kag_yogo.html", "excerpt": "物質の発がん性スクリｰニング試験として変異原性の有無を探索する方法が種々開発されている", "choiceNumbers": [5]},
    {"url": "https://anzeninfo.mhlw.go.jp/user/anzen/kag/kag_yogo.html", "excerpt": "微生物を用いる復帰突然変異原性試験（エームス試験という。）", "choiceNumbers": [5]},
    {"url": "https://www.mhlw.go.jp/shingi/2002/12/s1219-5c.html", "excerpt": "細菌を用いる復帰突然変異試験（エームス試験）", "choiceNumbers": [5]},
    {"url": "https://www.mhlw.go.jp/shingi/2002/12/s1219-5c.html", "excerpt": "ネズミチフス菌及び大腸菌を使用し、復帰突然変異コロニー数の計測により突然変異誘発性を評価する", "choiceNumbers": [5]},
]
item["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
