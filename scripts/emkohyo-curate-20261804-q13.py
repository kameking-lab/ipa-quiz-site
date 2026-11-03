"""Ground the visible-light absorbance choices in primary public sources."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261804-q11-15-draft.json"
data = json.loads(path.read_text(encoding="utf-8"))
item = data["questions"]["emkohyo-EM20261804-q13"]
famic = "https://www.famic.go.jp/ffis/feed/hourei/sub1_seibunkikaku.html"
aist = "https://unit.aist.go.jp/chugoku/kaihou-kiki/data/tottori/shokuhin/B-03-001.html"
environment = "https://www.env.go.jp/air/tech/seidokanri/outline/pdf/res2015_00.pdf"
jst = "https://koushien.jst.go.jp/koushien/pastexam/2021/files/1-1.pdf"
pmda = "https://www.pmda.go.jp/files/000274581.pdf"

item["overlay"]["sources"] = [
    {"title": "農林水産消費安全技術センター 飼料及び飼料添加物の成分規格等に関する省令", "url": famic},
    {"title": "産業技術総合研究所 中国地域公設研究機関の開放機器・紫外可視分光光度計", "url": aist},
    {"title": "環境省 平成27年度環境測定分析統一精度管理調査", "url": environment},
    {"title": "科学技術振興機構 第11回科学の甲子園全国大会・筆記競技", "url": jst},
    {"title": "厚生労働省 医薬部外品・化粧品の光安全性試験評価体系に関するガイダンス", "url": pmda},
]
item["overlay"]["choices"][0]["reason"] = (
    "この記述は正しいです。農林水産消費安全技術センターが公開する分析法は、"
    "可視部を測る光電分光光度計の光源としてタングステンランプを明記しています。"
    "したがって、光源が適さないという理由でこの肢を選ぶことはできません。"
)
item["overlay"]["choices"][1]["reason"] = (
    "この記述は正しいです。農林水産消費安全技術センターの分析法は、"
    "可視部の測定にガラス製または石英製のセルを用いると明記しています。"
    "石英セルは紫外部だけに限定されず、可視光の吸光度測定にも使えます。"
)
item["overlay"]["choices"][2]["reason"] = (
    "この記述は正しいです。環境省は吸光光度計の一般的な分析条件として、検出部に光電子増倍管などを挙げています。"
    "鳥取県産業技術センターの紫外可視分光光度計の公開仕様も同検出器を示します。"
    "ただし他の検出器も使われるので、全装置に必須という意味ではありません。"
)
item["overlay"]["choices"][3]["reason"] = (
    "この記述は正しいです。農林水産消費安全技術センター掲載の省令では、定量は通例、吸収極大波長で行います。"
    "科学の甲子園の公開競技問題は、錯体の見える色は吸収光の補色で、残った光が目に届くと説明しています。"
    "ゆえに測定する吸収波長の光の色と、溶液として見える色は異なります。"
)
item["overlay"]["choices"][4]["reason"] = (
    "この記述が誤りです。厚生労働省の通知に添付された光安全性評価ガイダンスは、吸光度を無次元、"
    "濃度をmol/L、光路長をcm、モル吸光係数をL mol⁻¹ cm⁻¹と示します。"
    "科学の甲子園の公開式A＝εclと合わせると、係数は濃度と長さの逆数の単位が必要で、"
    "設問のmol・L⁻¹・cmとは逆です。"
)
item["sourceEvidence"] = [
    {
        "url": famic,
        "excerpt": "光源としては、可視部の測定にあってはタングステンランプを、紫外部の測定にあっては水素放電管又は重水素放電管を用いる。",
        "choiceNumbers": [1],
    },
    {
        "url": famic,
        "excerpt": "紫外部の吸収測定にあっては石英製のセルを、可視部の吸収測定にあってはガラス製又は石英製のセルを用いる。",
        "choiceNumbers": [2],
    },
    {
        "url": aist,
        "excerpt": "◆検出器：光電子増倍管",
        "choiceNumbers": [3],
    },
    {
        "url": environment,
        "excerpt": "吸光光度計の分析条件として、以下に一般的な条件を例示する。これを参考にして適宜\n設定する。\n光源部\nタングステンランプ\n検出部\n光電子増倍管、充電器、フォトダイオード、光電管等（波長630 nm）",
        "choiceNumbers": [3],
    },
    {
        "url": famic,
        "excerpt": "また、通例、極大波長における一定濃度の溶液の吸光度を測定することにより、定量を行う。",
        "choiceNumbers": [4],
    },
    {
        "url": jst,
        "excerpt": "私たちが見ることができる錯体の色は，錯体が吸収した光の色の「補色」である。",
        "choiceNumbers": [4],
    },
    {
        "url": pmda,
        "excerpt": "ε: \nMEC（L mol-1 cm-1）\nC: \n被験物質のモル濃度（mol/L）\nd: \nセルの光路長（cm）",
        "choiceNumbers": [5],
    },
    {
        "url": pmda,
        "excerpt": "医薬部外品・化粧品の光安全性試験評価体系に関するガイダンスについて",
        "choiceNumbers": [5],
    },
    {
        "url": pmda,
        "excerpt": "厚生労働省医薬・生活衛生局医薬品審査管理課長",
        "choiceNumbers": [5],
    },
    {
        "url": jst,
        "excerpt": "A=－log10\nI\nI0\n＝εcl",
        "choiceNumbers": [5],
    },
]
item["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
