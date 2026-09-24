"""Curate the 2025 organic-solvent standard-solution question with official sources."""

import json
from pathlib import Path


path = Path("data/exam-library/emkohyo-review/emkohyo-EM20251805-q16-20-draft.json")
data = json.loads(path.read_text(encoding="utf-8"))
entry = data["questions"]["emkohyo-EM20251805-q20"]
overlay = entry["overlay"]
overlay["summary"] = (
    "肢2のメスシリンダーは、正確な体積で標準液を調製する器具として不適切。"
    "メスピペットまで一律に不適切とする意味ではない。"
)
reasons = {
    1: "分析対象の標準物質を試料の脱着溶媒で段階的に希釈し、検量線に必要な濃度系列を作る手順は適切である。厚生労働省の揮発性有機化合物の空気測定法では、試料の抽出と標準溶液の希釈に二硫化炭素を使う。試料液と標準液の溶媒条件をそろえるため、この肢は誤りではない。",
    2: "正確な体積を要する標準液の調製にメスシリンダーを挙げた点が不適切である。農林水産消費安全技術センターの分析法総則は、体積を『正確に』量るときはホールピペット・ビュレット・メスフラスコを、数量が『約』のときはメスシリンダー等の簡易計量器を使うと区別する。メスピペットを正確な採取に用いる公定例もあり、一律に排除しない。",
    3: "比較的濃い標準原液を冷暗所に保管し、検量線作成の際に必要な濃度へ希釈する方法は適切である。環境省の測定マニュアルは標準原液を冷暗所に保存し、検量線用標準液を使用の都度調製すると明記する。保存可能な条件と期間は物質ごとに確認する必要があり、この肢は誤りではない。",
    4: "標準液の保存可能期間を一律に決めることはできず、対象物質と溶媒の組合せ、濃度、保存条件に応じて安定性を確認する。環境省の水質分析の公定法でも、アセトニトリル中のチウラム原液は直ちに冷凍保存して90日、ヘキサン中のチオベンカルブ原液は同じく冷凍保存して180日を限度とする例がある。本肢は正しい。",
    5: "未知試料の濃度が検量線の最低濃度から最高濃度までに入るよう標準液を調製するのは適切である。厚生労働省の揮発性有機化合物の空気測定法も、試料の測定値が検量線の直線範囲を外れた場合には検量線を作り直して再測定すると定める。範囲外をそのまま外挿しないため、この肢は正しい。",
}
for choice in overlay["choices"]:
    choice["reason"] = reasons[choice["number"]]

evidence = [
    ("https://www.mhlw.go.jp/houdou/0107/h0724-1c1.html", "標準原液の一定量を二硫化炭素を用いて10倍に希釈する。", [1]),
    ("https://www.mhlw.go.jp/houdou/0107/h0724-1c1.html", "捕集管から吸着剤を抽出瓶に取り出し、二硫化炭素1mlを加えて栓をし", [1]),
    ("https://www.famic.go.jp/ffis/fert/sub6_data/bunsekihou.html", "体積の場合にはホールピペット、ビュレットまたはメスフラスコを用いて正しく量ることをいう。また重さ及び体積の数量の前に「約」と記載してある場合には、簡易な計量器（上皿はかり、メスシリンダーなど）を用いて量るものとする。", [2]),
    ("https://www.env.go.jp/hourei/05/000106.html", "ホルムアルデヒド標準溶液0.25mLをメスピペットを用いて透明摺り合わせ全量フラスコ50mLに正確に採り", [2]),
    ("https://www.env.go.jp/content/900539427.pdf", "標準原液は密封褐色試薬瓶に入れ、1 ヶ月を限度として冷暗所に保存する。また、検量線作成用の標準液は使用の都度調製する。", [3]),
    ("https://www.env.go.jp/kijun/wt_a05.html", "チオベンカルブ標準原液(1mg／ml) チオベンカルブ標準品0.100gを全量フラスコ100mlに採り、ヘキサンを標線まで加えたもの(この原液は調製後、直ちに冷凍保存する。保存期間は180日を限度とする。)", [4]),
    ("https://www.env.go.jp/kijun/wt_a04.html", "チウラム標準原液(1mg／ml) チウラム標準品0.1gを採り、少量のアセトニトリルに溶かし、全量フラスコ100mlに移し、アセトニトリルを標線まで加えたもの(この原液は調製後、直ちに冷凍保存する。保存期間は90日を限度とする。)", [4]),
    ("https://www.mhlw.go.jp/houdou/0107/h0724-1c1.html", "試料空気の測定値が作成した検量線の直線範囲からはずれている場合は、分析の諸条件を検討したうえで検量線を作成し直し、再度測定する。", [5]),
]
entry["sourceEvidence"] = [
    {"url": url, "excerpt": excerpt, "choiceNumbers": numbers}
    for url, excerpt, numbers in evidence
]
titles = {
    "https://www.mhlw.go.jp/houdou/0107/h0724-1c1.html": "厚生労働省 室内空気中化学物質の標準的測定方法",
    "https://www.famic.go.jp/ffis/fert/sub6_data/bunsekihou.html": "農林水産消費安全技術センター 肥料分析法 総則",
    "https://www.env.go.jp/hourei/05/000106.html": "環境省 水質汚濁に係る環境基準についての一部を改正する件の施行等について（通知）",
    "https://www.env.go.jp/content/900539427.pdf": "環境省 要調査項目等調査マニュアル",
    "https://www.env.go.jp/kijun/wt_a05.html": "環境省 水質環境基準 付表5",
    "https://www.env.go.jp/kijun/wt_a04.html": "環境省 水質環境基準 付表4",
}
overlay["sources"] = [
    {"title": titles[url], "url": url} for url in dict.fromkeys(url for url, _, _ in evidence)
]
entry["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
