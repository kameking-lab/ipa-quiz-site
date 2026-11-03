"""Curate Q17 against the MHLW method table; leave review to Opus."""

import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
path = root / "data/exam-library/emkohyo-review/emkohyo-EM20251805-q16-20-draft.json"
data = json.loads(path.read_text(encoding="utf-8"))
item = data["questions"]["emkohyo-EM20251805-q17"]
overlay = item["overlay"]
overlay["summary"] = "厚生労働省の測定法一覧は二硫化炭素の捕集液をジエチルアミンと酢酸銅の混合エタノール溶液、分析波長を420 nmとする。"
reasons = {
    1: "ピリジン溶液・530 nmという組合せは、厚生労働省の二硫化炭素測定法一覧にあるジエチルアミンと酢酸銅の混合エタノール捕集液・420 nmと両方とも異なる。このため本問の空欄には入らない。",
    2: "2,4-ジニトロフェニルヒドラジン溶液・530 nmは、厚生労働省が二硫化炭素の吸光光度分析法に示すジエチルアミンと酢酸銅の混合エタノール捕集液・420 nmと一致しない。㋑と㋩が違うため除外できる。",
    3: "塩酸ヒドロキシルアミン溶液・510 nmは、厚生労働省が二硫化炭素の測定法に示すジエチルアミンと酢酸銅の混合エタノール捕集液・420 nmと一致しない。したがって㋑と㋩の時点で除外できる。",
    4: "厚生労働省の2008年審議会資料の表は、二硫化炭素をジエチルアミンと酢酸銅の混合エタノール溶液に液体捕集し、ジエチルアミン銅法の420 nmで測ると示す。この方法名が本肢の『ジエチルアミン銅溶液』との対応を示す。色の表現は同表にないため、ここでは公式正答と㋑・㋩の一致を根拠に判別する。",
    5: "㋺の黄金色と㋩の420 nmは肢4と同じだが、㋑のジエチルジチオカルバミン酸ナトリウム溶液だけが異なる。厚生労働省の2008年審議会資料に示された捕集液はジエチルアミンと酢酸銅の混合エタノール溶液なので、本問の組合せにはならない。",
}
for choice in overlay["choices"]:
    choice["reason"] = reasons[choice["number"]]
overlay["sources"] = [
    {"title": "厚生労働省 作業環境測定基準", "url": "https://www.mhlw.go.jp/web/t_doc?dataId=74087000"},
    {"title": "厚生労働省 2008年審議会資料・二硫化炭素測定方法一覧（p.2）", "url": "https://www.mhlw.go.jp/shingi/2008/02/dl/s0228-5i_0001.pdf"},
]
item["sourceEvidence"] = [{
    "url": "https://www.mhlw.go.jp/web/t_doc?dataId=74087000",
    "excerpt": "二硫化炭素 液体捕集方法、固体捕集方法又は直接捕集方法",
    "choiceNumbers": [1, 2, 3, 4, 5],
}]
item["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

map_path = root / "docs/evidence/emkohyo-choice-sources/source-page-images.json"
image_map = json.loads(map_path.read_text(encoding="utf-8"))
image_map["emkohyo-EM20251805-q17-17"] = [{
    "path": "docs/evidence/emkohyo-choice-sources/EM20251805-q17-mhlw-method-table-p2.png",
    "sha256": "fb0e065ebfb5561c13f9db352762a6e56e57c5270dcbbf45a38582bc5d9ef1a8",
    "description": "厚生労働省2008年審議会資料p.2：二硫化炭素の捕集液とジエチルアミン銅法420nm。PDF SHA256=ccaac9632aba8138ec49bb1e84049e957593336ab8f1f69d841f2d5ece268402",
}]
map_path.write_text(json.dumps(image_map, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
