"""Curate the 2025 UV-visible absorbance question from public primary sources."""

import json
from pathlib import Path


path = Path("data/exam-library/emkohyo-review/emkohyo-EM20251805-q16-20-draft.json")
data = json.loads(path.read_text(encoding="utf-8"))
entry = data["questions"]["emkohyo-EM20251805-q16"]
overlay = entry["overlay"]
overlay["summary"] = "吸光度は透過度 I/I₀ の逆数の常用対数、すなわち A=log₁₀(I₀/I)。肢5は比が逆。"
reasons = {
    1: "本肢の『通常200～1000 nm』は協会の公式正答で誤りとされていない装置範囲の目安であり、厳密な公定法の適用範囲を定義するものではない。厚生労働省の紫外可視吸光度測定法は通例200～800 nmだが、産業技術総合研究所の装置仕様は200～1100 nm、原子力規制委員会の吸光度測定部は200～1000 nmで、装置は800 nmを超えて測定できる。",
    2: "二重結合のうちC=Cは紫外線吸収の代表例である。農研機構の色素解説は、炭素同士の二重結合が紫外線を吸収し、共役二重結合が長くなると吸収波長が長くなると直接説明する。肢2を説明する具体例としてC=Cを挙げたもので、すべての二重結合やすべての化合物が同じ紫外波長で吸収するとの意味ではない。",
    3: "化合物によって吸収極大が複数あるという記述は正しい。国立科学博物館のフラボノイドの説明では、紫外から可視の領域に二つの吸収帯があり、第1表には例えばアピゲニンのBand Iが336 nm、Band IIが267 nmと示されている。したがって吸収極大は必ず一つということではない。",
    4: "石英製セルは紫外域でも可視域でも使える。農林水産消費安全技術センターの成分規格は紫外域に石英製、可視域にガラス製または石英製セルを指定する。さらに第十八改正日本薬局方第一追補は750～2500 nmの近赤外域の液体試料にも石英ガラスセルを用いる。各資料の規定から、石英は紫外・可視・近赤外にまたがって利用できる。",
    5: "吸光度は、透過度 t=I/I₀ の逆数を常用対数にした A=log₁₀(I₀/I)=-log₁₀(I/I₀)である。農林水産消費安全技術センター公開の成分規格もこの比を明示する。肢5はIとI₀が逆で、吸収によって透過光Iが弱まるほど負の値になる式なので誤り。これが公式正答である。",
}
for choice in overlay["choices"]:
    choice["reason"] = reasons[choice["number"]]

evidence = [
    ("https://www.aist.go.jp/aist_j/procure/supplyinfoold/detail/202410/8T72PU5O/5NL7B8CFSKVPTV7RWPDG.pdf", "測定波長は200～1,100㎚の範囲を満たすこと。", [1]),
    ("https://www.nra.go.jp/data/000374571.pdf", "波長範囲：200-1000 nm", [1]),
    ("https://www.mhlw.go.jp/web/t_doc?dataId=78334000&dataType=0&pageNo=62", "紫外可視吸光度測定法は、通例、波長200nmから800nmまでの範囲の光が、物質により吸収される度合いを測定", [1]),
    ("https://www.naro.go.jp/laboratory/nivfs/kiso/color_shikiso/index.html", "炭素と炭素の結合が二重結合の場合(C=C)、紫外線を吸収します。", [2]),
    ("https://www.kahaku.go.jp/research/db/botany/flavonoid/guide/index.php", "フラボノイドは紫外線領域～可視領域（190～700 nm）に２か所の吸収帯をもちます。", [3]),
    ("https://www.kahaku.go.jp/research/db/botany/flavonoid/guide/index.php", "フラボン アピゲニン 336 267", [3]),
    ("https://www.famic.go.jp/ffis/feed/hourei/sub1_seibunkikaku.html", "紫外部の吸収測定にあっては石英製のセルを、可視部の吸収測定にあってはガラス製又は石英製のセルを用いる。", [4]),
    ("https://www.mhlw.go.jp/content/11120000/001022457.pdf", "近赤外線は，可視光線と赤外線の間にあって，通例，750 ～ 2500 nm", [4]),
    ("https://www.mhlw.go.jp/content/11120000/001022457.pdf", "本法は，液体又は溶液試料に適用される方法であり，石英ガ ラスセル，フローセルなどに注入し", [4]),
    ("https://www.famic.go.jp/ffis/feed/hourei/sub1_seibunkikaku.html", "透過度の逆数の常用対数を吸光度（Ａ）という。", [5]),
]
entry["sourceEvidence"] = [
    {"url": url, "excerpt": excerpt, "choiceNumbers": numbers}
    for url, excerpt, numbers in evidence
]
titles = {
    "https://www.aist.go.jp/aist_j/procure/supplyinfoold/detail/202410/8T72PU5O/5NL7B8CFSKVPTV7RWPDG.pdf": "産業技術総合研究所 フロー分析用紫外可視分光光度計仕様書",
    "https://www.nra.go.jp/data/000374571.pdf": "原子力規制委員会 令和3年度蛍光吸光度分光測定装置の購入 仕様書",
    "https://www.mhlw.go.jp/web/t_doc?dataId=78334000&dataType=0&pageNo=62": "厚生労働省 食品、添加物等の規格基準 紫外可視吸光度測定法",
    "https://www.naro.go.jp/laboratory/nivfs/kiso/color_shikiso/index.html": "農研機構 色素の基礎知識",
    "https://www.kahaku.go.jp/research/db/botany/flavonoid/guide/index.php": "国立科学博物館 フラボノイドコレクション データの見方",
    "https://www.famic.go.jp/ffis/feed/hourei/sub1_seibunkikaku.html": "農林水産消費安全技術センター 飼料及び飼料添加物の成分規格等に関する省令",
    "https://www.mhlw.go.jp/content/11120000/001022457.pdf": "厚生労働省 第十八改正日本薬局方第一追補 近赤外吸収スペクトル測定法",
}
overlay["sources"] = [
    {"title": titles[url], "url": url} for url in dict.fromkeys(url for url, _, _ in evidence)
]
entry["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
