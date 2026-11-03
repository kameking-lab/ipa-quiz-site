"""Ground the DNPH formaldehyde question in MHLW analytical methods."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20251807-q06-10-draft.json"
draft = json.loads(path.read_text(encoding="utf-8"))
entry = draft["questions"]["emkohyo-EM20251807-q7"]
standard = "https://www.mhlw.go.jp/web/t_doc?dataId=74087000"
gcmethod = "https://www.mhlw.go.jp/file/05-Shingikai-11201000-Roudoukijunkyoku-Soumuka/0000120122.pdf"
dnph = "https://www.mhlw.go.jp/content/11120000/001385599.pdf"
principle = "https://www.nies.go.jp/pr/publications/tokubetu/setsumei/sr-039-2001b.html"
presentation_path = ROOT / "data/exam-library/presentation/emkohyo-EM20251807.json"
presentation = json.loads(presentation_path.read_text(encoding="utf-8"))
for choice in presentation["emkohyo-EM20251807-q7"].get("choices", []):
    choice["text"] = choice["text"].replace("4,4' -ジアミノ", "4,4'-ジアミノ")
presentation_path.write_text(json.dumps(presentation, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
entry["overlay"]["summary"] = (
    "厚労省の作業環境測定法検討資料は、ホルムアルデヒドのDNPH捕集・アセトニトリル脱着・"
    "GC-MS分析を検討している。該当するのは肢3。"
)
entry["overlay"]["choices"][0]["reason"] = (
    "DDVPはリン酸エステルで、アルデヒドやケトンのカルボニル基を持たない。環境省資料は"
    "カルボニル化合物とDNPHの反応でヒドラゾン誘導体を作ると示す。問われたDNPH誘導体として"
    "捕集する対象ではないため、肢1は該当しない。"
)
entry["overlay"]["choices"][1]["reason"] = (
    "MOCAは芳香族ジアミンで、アルデヒドやケトンのカルボニル基を持たない。"
    "環境省資料が示すDNPHとカルボニル化合物の反応に該当せず、厚労省がホルムアルデヒドに"
    "検討したDNPHヒドラゾンの捕集・抽出法の対象ではない。"
)
entry["overlay"]["choices"][2]["reason"] = (
    "ホルムアルデヒドはアルデヒドであり、厚労省の作業環境測定法資料は、DNPH管による捕集、"
    "アセトニトリル脱着、GC-MS分析の組合せを検討・検証したと記す。回収率等にはなお検討の余地があるが、"
    "問の分析法として該当するのは肢3である。"
)
entry["overlay"]["choices"][3]["reason"] = (
    "酸化プロピレンは環状エーテルのエポキシドで、アルデヒドやケトンのカルボニル基を持たない。"
    "環境省資料が示すDNPHの反応相手ではなく、問のDNPHヒドラゾン誘導体としての捕集には該当しない。"
)
entry["overlay"]["choices"][4]["reason"] = (
    "1,1-ジメチルヒドラジンはアルデヒドではない。厚労省の作業環境測定基準では"
    "固体捕集・高速液体クロマトグラフ分析方法を指定しており、問われたGC-MS法にも一致しない。"
    "したがって肢5は該当しない。"
)
entry["overlay"]["sources"] = [
    {"title": "厚生労働省・作業環境測定基準", "url": standard},
    {"title": "厚生労働省・室内空気中ホルムアルデヒドの測定方法（DNPH捕集・アセトニトリル抽出）", "url": dnph},
    {"title": "厚生労働省・ホルムアルデヒドの作業環境測定方法検証（DNPH管・GC-MS）", "url": gcmethod},
    {"title": "国立環境研究所・アルデヒド類のDNPH誘導体化とヒドラゾン分析", "url": principle},
]
entry["sourceEvidence"] = [
    {"url": standard, "excerpt": "ホルムアルデヒド 固体捕集方法 ガスクロマトグラフ分析方法", "choiceNumbers": [3]},
    {"url": standard, "excerpt": "一・一―ジメチルヒドラジン 固体捕集方法 高速液体クロマトグラフ分析方法", "choiceNumbers": [5]},
    {"url": standard, "excerpt": "酸化プロピレン 固体捕集方法 ガスクロマトグラフ分析方法", "choiceNumbers": [4]},
    {"url": standard, "excerpt": "ジメチル―二・二―ジクロロビニルホスフェイト(別名DDVP) 固体捕集方法", "choiceNumbers": [1]},
    {"url": standard, "excerpt": "三・三′―ジクロロ―四・四′―ジアミノジフェニルメタン 固体捕集方法", "choiceNumbers": [2]},
    {"url": dnph, "excerpt": "空気中ホルムアルデヒドを DNPH 捕集剤に吸着すると共に誘導体化させる", "choiceNumbers": [1, 2, 3, 4, 5]},
    {"url": dnph, "excerpt": "これをアセトニトリルで溶出させ", "choiceNumbers": [3]},
    {"url": gcmethod, "excerpt": "DNPH(ジニトロフェニルヒドラゾン)管を用いる固体捕集方法－ガスクロマトグラフ質量分析方法", "choiceNumbers": [3]},
    {"url": gcmethod, "excerpt": "アセトニトリル 5mL(内標準含む)とした", "choiceNumbers": [3]},
    {"url": principle, "excerpt": "アルデヒド類をＤＮＰＨと反応させて捕集し、誘導体化して生成したヒドラゾン", "choiceNumbers": [1, 2, 3, 4, 5]},
]
entry["reviewIssues"] = []
path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
