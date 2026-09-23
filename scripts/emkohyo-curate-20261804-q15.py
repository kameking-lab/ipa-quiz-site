"""Ground the atomic absorption choices in ministry and agency sources."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261804-q11-15-draft.json"
data = json.loads(path.read_text(encoding="utf-8"))
item = data["questions"]["emkohyo-EM20261804-q15"]
mhlw = "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/shokuhin/syokuten/dl/8e01.pdf"
aist = "https://unit.aist.go.jp/chugoku/kaihou-kiki/data/tottori/kikai/B-02-088.html"
jaea = "https://jopss.jaea.go.jp/pdfdata/PNC-TN841-71-36.pdf"
fsc_final = "https://www.fsc.go.jp/fsciis/attachedFile/download?fileId=201&retrievalId=kya20030703091"
env = "https://www.env.go.jp/hourei/05/000178.html"
item["overlay"]["sources"] = [
    {"title": "厚生労働省 食品、添加物等の規格基準・原子吸光光度法", "url": mhlw},
    {"title": "産業技術総合研究所掲載・鳥取県産業技術センターの原子吸光光度計", "url": aist},
    {"title": "環境省 底質調査方法・重水素ランプによるバックグラウンド補正", "url": env},
    {"title": "動力炉・核燃料開発事業団の原子吸光分析報告（現JAEA公開）", "url": jaea},
    {"title": "食品安全委員会 清涼飲料水評価書・六価クロム", "url": fsc_final},
]
item["overlay"]["choices"][0]["reason"] = (
    "文自体は正しい。厚生労働省が示す原子吸光光度法の装置説明では、光源部に中空陰極ランプなどを用いると明記される。"
    "原子吸光では測定元素に固有の波長の光を原子蒸気へ照射する必要があり、"
    "この装置の光源部に中空陰極ランプを置くという設問の記述は、同省の装置説明と一致する。"
)
item["overlay"]["choices"][1]["reason"] = (
    "文自体は正しい。産総研が掲載する鳥取県産業技術センターの機器仕様は、"
    "重水素ランプを連続スペクトル光源補正に使用すると明記する。環境省の底質調査方法は、"
    "水銀測定で揮発性有機物が測定波長の光を吸収する妨害に対し、重水素ランプによる補正を示す。"
    "中空陰極ランプと重水素ランプの指示値の差を利用する水銀測定の操作例があり、記述は正しい。"
)
item["overlay"]["choices"][2]["reason"] = (
    "文自体は正しい。動力炉・核燃料開発事業団の原子吸光分析報告（現在JAEAが公開）は、"
    "試料を炎に導入して熱解離した原子の大部分が基底状態にあると説明する。"
    "原子吸光法はその基底状態原子が特有波長の光を吸収する現象を測るため、"
    "目的原子のほとんどが基底状態という記述は正しい。"
)
item["overlay"]["choices"][3]["reason"] = (
    "文自体は正しい。食品安全委員会の評価書では、炭素管に大電流を流し、"
    "生じたジュール熱で炉温を上げて原子化するものをグラファイト炉原子化法と呼ぶ。"
    "したがって炉への通電で発生するジュール熱を使うという説明は原理に合う。"
)
item["overlay"]["choices"][4]["reason"] = (
    "これが誤りの記述。原子吸光の吸光度は光路中の基底状態原子の吸収に対応し、"
    "厚生労働省の測定法も濃度の異なる標準液から検量線を作って被検元素量を求める。"
    "原子番号そのものに比例するわけではなく、同一元素でも濃度が変われば吸光度は変わる。"
)
item["sourceEvidence"] = [
    {"url": mhlw, "excerpt": "光源部には中空陰極ランプ", "choiceNumbers": [1]},
    {"url": mhlw, "excerpt": "基底状態の原子が特有波長の光を吸収", "choiceNumbers": [3, 5]},
    {"url": mhlw, "excerpt": "3種以上の濃度の異なる標準液を調製", "choiceNumbers": [5]},
    {"url": aist, "excerpt": "連続スペクトル光源補正（重水素ランプ）", "choiceNumbers": [2]},
    {"url": env, "excerpt": "重水素ランプなどによるバックグラウンド補正", "choiceNumbers": [2]},
    {"url": env, "excerpt": "ベンゼン、アセトンなどは２５３．７nmの光を吸収して正の誤差", "choiceNumbers": [2]},
    {"url": env, "excerpt": "水銀中空陰極ランプと重水素ランプを用いて指示値の差", "choiceNumbers": [2]},
    {"url": fsc_final, "excerpt": "発生したジュール", "choiceNumbers": [4]},
    {"url": fsc_final, "excerpt": "グラファイト炉原子化法", "choiceNumbers": [4]},
]
item["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
